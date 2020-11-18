<template>
  <div class="provider-allview">
    <div class="left-top frame-back-box">
      <h2 class="chart-title">供应商业务类型情况统计图</h2>
      <div class="chart-box" id="all-view-left-top"></div>
    </div>
    <div class="left-bottom frame-back-box">
      <h2 class="chart-title">供应商行业类型情况统计图</h2>
      <div class="chart-box" id="all-view-left-bottom"></div>
    </div>
    <div class="center-list">
      <ul>
        <li class="item">
          <p class="text"><i>供应商总数</i> <i>需关注供应商</i></p>
          <p class="number">
            <span class="lum-1"
              ><i class="num">{{ labelItems[0] && labelItems[0].idxValue }}</i
              ><i class="unit">个</i></span
            >
            <span class="lum-2 active" @click="showModalTable('provider_num')"
              ><i class="num">{{ labelItems[1] && labelItems[1].idxValue }}</i
              ><i class="unit">个</i></span
            >
          </p>
        </li>
        <li class="item">
          <p class="text"><i>新签合同额</i> <i>需关注合同</i></p>
          <p class="number">
            <span class="lum-1"
              ><i class="num">{{ labelItems[2] && (labelItems[2].idxValue / 10000).toFixed(1) }}</i
              ><i class="unit">万</i></span
            >
            <span class="lum-2 active" @click="showModalTable('contract_num')"
              ><i class="num">{{ labelItems[3] && labelItems[3].idxValue }}</i
              ><i class="unit">个</i></span
            >
          </p>
        </li>
        <li class="item">
          <p class="text"><i>列账总额</i> <i>需关注列账数</i></p>
          <p class="number">
            <span class="lum-1"
              ><i class="num">{{ labelItems[4] && (labelItems[4].idxValue / 100000000).toFixed(3) }}</i
              ><i class="unit">亿</i></span
            >
            <span class="lum-2 active" @click="showModalTable('bill_num')"
              ><i class="num">{{ labelItems[5] && (labelItems[5].idxValue / 100000000).toFixed(3) }}</i
              ><i class="unit">亿</i></span
            >
          </p>
        </li>
        <li class="item">
          <p class="text"><i>已付金额</i> <i>余额</i></p>
          <p class="number">
            <span class="lum-1"
              ><i class="num">{{ labelItems[6] && (labelItems[4].idxValue / 100000000).toFixed(3) }}</i
              ><i class="unit">亿</i></span
            >
            <span class="lum-2"
              ><i class="num">{{ labelItems[7] && (labelItems[7].idxValue / 100000000).toFixed(3) }}</i
              ><i class="unit">亿</i></span
            >
          </p>
        </li>
      </ul>
    </div>
    <div class="center-map" id="all-view-center-map"></div>
    <div class="center-bottom frame-back-box">
      <h2 class="chart-title">列账采购方式统计图</h2>
      <div class="chart-unit-text" style="top:30px;">单位：万元</div>
      <div class="chart-box" id="all-view-center-bottom"></div>
    </div>
    <div class="right-top frame-back-box">
      <h2 class="chart-title keypoint_part" @click="toKeyPointPage()">重点供应商在整个公司的占比堆积图</h2>
      <div class="chart-unit-text">单位：万元</div>
      <div class="chart-box" id="all-view-right-top"></div>
    </div>
    <div class="right-bottom frame-back-box">
      <h2 class="chart-title">列账趋势分析图</h2>
      <div class="chart-unit-text">单位：万元</div>
      <div class="chart-box" id="all-view-right-bottom"></div>
    </div>
    <userModalTable :isShowTabe="showTable" :type="tableType" @change="showStatusChange"></userModalTable>
  </div>
</template>

<script lang="ts">
import userModalTable from '../components/allview/userModalTable.vue'
import { defineComponent, ref, onMounted, getCurrentInstance, ComponentInternalInstance, computed, watch } from 'vue'
import { OneArgVoidFun } from '../utils/commFun'
import { useRouter } from 'vue-router'
import echarts from 'echarts'
import mapConfig from '../chartconfig/map'
import { inintCharts } from '../chartconfig/installchart'
import store from '../store'
import { requestPostData } from '../http/http'
// import gzMapJson from 'echarts/map/json/province/guizhou.json'
const gzMapJson = require('echarts/map/json/province/guizhou.json')
export default defineComponent({
  name: 'providerAllView',
  components: {
    userModalTable
  },
  setup(props, context) {
    const instance = getCurrentInstance() as ComponentInternalInstance //vue的this实例
    const _this = instance.appContext.config.globalProperties //全局对象属性
    //头部的一排label值
    const labelItems = computed(() => {
      return store.state.allviewItems
    })
    //显示弹框内容，业务写在弹框的业务组件里
    const showTable = ref(false)
    const tableType = ref('')
    const showModalTable: OneArgVoidFun<string> = (type) => {
      console.log(type, showTable.value)
      tableType.value = type
      showTable.value = true
    }
    const showStatusChange: OneArgVoidFun<boolean> = (val) => {
      showTable.value = val
    }
    //注册地图
    const regiseterMap: () => void = () => {
      echarts.registerMap('guizhou', gzMapJson)
      //   const mapBox = echarts.init(document.getElementById('all-view-center-map') as HTMLCanvasElement)
      //   mapBox.setOption(mapConfig)
    }
    onMounted(() => {
      regiseterMap()
    })
    //选择同步地图
    const cityValue = computed(() => {
      return store.state.cityCode
    })
    watch(cityValue, (nv, ov) => {
      requestPostData('/channel/map/assembleJsonObject', { parentOrgCode: nv })
        .then((res) => {
          const resdata = res.data as any
          if (!resdata.features) {
            const mapBox = echarts.init(document.getElementById('all-view-center-map') as HTMLCanvasElement)
            mapBox.clear()
            _this.$message.warning('没有加载到对应地图！')
          } else {
            echarts.registerMap('guizhou', res.data as any)
            const mapBox = echarts.init(document.getElementById('all-view-center-map') as HTMLCanvasElement)
            mapBox.clear()
            if (nv === 'A52') {
              mapBox.setOption(mapConfig)
            } else {
              const config = JSON.parse(JSON.stringify(mapConfig))
              config.series[0].data = []
              config.series[1].data = []
              mapBox.setOption(config)
            }
          }
        })
        .catch((e) => {
          console.log(e)
        })
    })
    //挂载图表
    inintCharts('providerAllView')
    //跳转重点页面
    const router = useRouter()
    const toKeyPointPage: () => void = () => {
      //   const { href } = router.resolve({ name: 'keypointview', params: { date: store.state.selectDate, type: store.state.buniessType, city: store.state.cityCode } })
      const { href } = router.resolve({ name: 'keypointview', query: { date: store.state.selectDate, type: store.state.buniessType, city: store.state.cityCode } })
      window.open(href, '_blank')
      //   router.push({ name: 'keypointview', query: { date: store.state.selectDate, type: store.state.buniessType, city: store.state.cityCode } })
    }
    return {
      showTable,
      tableType,
      showModalTable,
      showStatusChange,
      labelItems,
      toKeyPointPage
    }
  }
})
</script>
<style lang="scss" scoped>
.provider-allview {
  position: relative;
  & > div {
    position: absolute;
  }
  .left-top {
    left: 0;
    top: 0;
    width: 455px;
    height: 460px;
  }
  .left-bottom {
    left: 0;
    top: 480px;
    width: 455px;
    height: 460px;
  }
  .right-top {
    right: 0;
    top: 0;
    width: 455px;
    height: 460px;
    .keypoint_part {
      position: relative;
      cursor: pointer;
      &:hover {
        color: transparent;
        -webkit-background-clip: text;
        background-image: -webkit-linear-gradient(bottom, #17d3ba, #afebf7);
      }
      &:hover::after {
        content: '';
        display: block;
        position: absolute;
        height: 2px;
        width: 80%;
        background-color: #17d3ba;
        left: 6%;
        bottom: 8px;
      }
    }
  }
  .right-bottom {
    right: 0;
    top: 480px;
    width: 455px;
    height: 460px;
  }
  .center-list {
    left: 480px;
    top: 20px;
    width: 900px;
    height: 105px;
    ul {
      display: flex;
      height: 100%;
      .item {
        flex: 1;
        height: 100%;
        background: url('../assets/item_back.jpg') no-repeat;
        background-size: cover;
        .text {
          height: 20px;
          line-height: 20px;
          margin-left: 20px;
          margin-top: 25px;
          margin-bottom: 0;
          font-size: 17px;
          letter-spacing: -2px;
          i {
            font-weight: bold;
            display: inline-block;
            text-shadow: 2px 5px 3px rgba(0, 0, 0, 0.35), 5px 5px 3px rgba(0, 0, 0, 0.705);
          }
          i:nth-child(1) {
            width: 75px;
          }
          i:nth-child(2) {
            margin-left: 15px;
          }
        }
        .number {
          height: 40px;
          line-height: 40px;
          margin-bottom: 0;
          margin-left: 20px;
          .lum-1 {
            display: inline-block;
            width: 80px;
            white-space: nowrap;
          }
          .lum-2 {
            margin-left: 15px;
            display: inline-block;
            cursor: pointer;
          }
          .active {
            position: relative;
            &:hover {
              color: transparent;
              -webkit-background-clip: text;
              background-image: -webkit-linear-gradient(bottom, #17d3ba, #afebf7);
            }
            &:hover::after {
              content: '';
              display: block;
              position: absolute;
              height: 2px;
              width: 100%;
              background-color: #17d3ba;
              left: 0;
              bottom: 8px;
            }
          }
          .num {
            font-size: 28px;
            font-weight: bold;
          }
          .unit {
            margin-left: 3px;
            font-size: 15px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .center-map {
    left: 480px;
    top: 130px;
    width: 900px;
    height: 500px;
  }
  .center-bottom {
    left: 480px;
    top: 640px;
    width: 900px;
    height: 300px;
  }
}
</style>
