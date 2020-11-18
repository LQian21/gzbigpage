<template>
  <div class="provider-detailview">
    <div class="container top-box">
      <h2 class="chart-title"><i>基本</i> <i>信息</i></h2>
      <ul>
        <li class="th">
          <span class="item" v-for="item in tabledata" :key="item">{{ item.name }}</span>
        </li>
        <li class="td">
          <span class="item" v-for="item in tabledata" :key="item">{{ item.value }}</span>
        </li>
      </ul>
    </div>
    <div class="container center-box">
      <div class="center-left frame-back-box">
        <h2 class="chart-title">近3年采购来源渠道分析图</h2>
        <div class="chart-box" id="detail-view-top-left"></div>
      </div>
      <div class="center-center frame-back-box" @click="showModalTable('score_num')">
        <h2 class="chart-title">综合指标得分情况（满分100）</h2>
        <div class="chart-box" id="detail-view-top-center"></div>
      </div>
      <div class="center-right frame-back-box">
        <h2 class="chart-title">关键指标雷达图</h2>
        <div class="chart-box" id="detail-view-top-right"></div>
      </div>
    </div>
    <div class="container bottom-box">
      <div class="bottom-left frame-back-box">
        <h2 class="chart-title">账龄金额统计分析图</h2>
        <div class="chart-box" id="detail-view-bottom-left"></div>
      </div>
      <div class="bottom-right frame-back-box">
        <h2 class="chart-title">全年度列账与付款情况分析</h2>
        <div class="chart-box" id="detail-view-bottom-right"></div>
      </div>
    </div>
    <userModalTable :isShowTabe="showTable" :type="tableType" @change="showStatusChange"></userModalTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import userModalTable from '../components/allview/userModalTable.vue'
import { OneArgVoidFun } from '../utils/commFun'
import { inintCharts } from '../chartconfig/installchart'
import store from '../store/index'
export default defineComponent({
  name: '',
  components: {
    userModalTable
  },
  setup() {
    const thTexts: string[] = ['供应商编码', '供应商名称', '法人代表', '注册资本（万）', '实缴资本（万）', '资本差异（%）', '信用信息', '法律纠纷（次）', '不良记录（笔）']
    const data: number[] = Array.from({ length: 9 }, (v, k) => k)
    const tabledata = computed(() => {
      return store.state.detailTabledate
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
    //挂载图表
    inintCharts('providerDetailView')
    return {
      thTexts,
      data,
      tabledata,
      showTable,
      tableType,
      showModalTable,
      showStatusChange
    }
  }
})
</script>
<style lang="scss" scoped>
.provider-detailview {
  .top-box {
    height: 140px;
    background: url('../assets/box_top_back.jpg') no-repeat;
    background-size: contain;
    display: flex;
    ul {
      flex: 1;
      padding: 20px 30px 20px 15px;
      .th {
        height: 50%;
        display: flex;
        align-items: center;
        background-color: #173fb0;
        & .item:nth-child(2) {
          flex: 1;
        }
      }
      .td {
        display: flex;
        height: 50%;
        align-items: center;
        background-color: rgba(23, 64, 176, 0.411);
        & .item:nth-child(2) {
          flex: 1;
        }
      }
      .item {
        min-width: 170px;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .chart-title {
      width: 70px;
      height: 100%;
      font-size: 22px;

      color: #fff;
      margin-bottom: 0;
      padding-top: 55px;
      padding-left: 15px;
      text-shadow: 5px 7px 5px rgba(0, 0, 0, 0.24), 5px 9px 5px rgba(0, 0, 0, 0.521);
      position: relative;
      i {
        font-weight: bold;
      }
      &::before {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 2px;
        background-color: rgba(13, 60, 140, 0.836);
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        right: 1px;
        top: 25px;
        width: 4px;
        height: 35px;
        background-color: #0d9bff;
      }
    }
  }
  .center-box {
    height: 380px;
    margin-top: 20px;
    display: flex;
    & > div {
      flex: 1;
    }
    .center-center {
      margin: 0 25px;
    }
  }
  .bottom-box {
    height: 380px;
    margin-top: 20px;
    display: flex;
    .bottom-left {
      width: 800px;
    }
    .bottom-right {
      margin-left: 20px;
      flex: 1;
    }
  }
}
</style>
