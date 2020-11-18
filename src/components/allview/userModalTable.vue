<template>
  <a-modal v-model:visible="show" wrapClassName="table-modal-list-box" width="75%">
    <a-table :columns="columns" :data-source="data" :pagination="false" :scroll="{ y: 240 }">
      <template v-slot:redtext="{ text }">
        <i class="red-text">{{ text }}</i>
      </template>
    </a-table>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, watchEffect, ref, computed, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { requestPostData } from '../../http/http'
import store from '../../store'
export default defineComponent({
  name: 'userModalTable',
  props: {
    isShowTabe: {
      type: Boolean,
      required: true,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    //this对象
    const instance = getCurrentInstance() as ComponentInternalInstance //vue的this实例
    const _this = instance.appContext.config.globalProperties //全局对象属性
    //显示弹框
    const show = ref(false)
    const pageType = ref('')
    watchEffect(() => {
      const { isShowTabe, type } = props
      show.value = isShowTabe
      pageType.value = type
    })
    const columns1: any = [
      {
        title: '序号',
        dataIndex: 'xh',
        width: 50
      },
      {
        title: '供应商编码',
        dataIndex: 'gysbm',
        width: 120
      },
      {
        title: '供应商名称',
        dataIndex: 'gysmc'
      },
      {
        title: '法律诉讼',
        dataIndex: 'flss',
        slots: { customRender: 'redtext' }
      },
      {
        title: '失信信息',
        dataIndex: 'sxxx'
      },
      {
        title: '行政处罚',
        dataIndex: 'xzcf'
      },
      {
        title: '经营异常',
        dataIndex: 'jyyc'
      }
    ]
    const columns2: any = [
      {
        title: '序号',
        dataIndex: 'xh',
        width: 50
      },
      {
        title: '供应商编码',
        dataIndex: 'gysbm',
        width: 120
      },
      {
        title: '供应商名称',
        dataIndex: 'gysmc'
      },
      {
        title: '合同编号',
        dataIndex: 'contractCode'
      },
      {
        title: '合同名称',
        dataIndex: 'contractName'
      },
      {
        title: '合同签约金额',
        dataIndex: 'tradeSum'
      },
      {
        title: '合同累计列账金额',
        dataIndex: 'lzSum'
      },
      {
        title: '合同累计付款金额',
        dataIndex: 'fkSum'
      }
    ]
    const columns3: any = [
      {
        title: '序号',
        dataIndex: 'xh',
        width: 50
      },
      {
        title: '供应商编码',
        dataIndex: 'gysbm',
        width: 120
      },
      {
        title: '供应商名称',
        dataIndex: 'gysmc'
      },
      {
        title: '上年列账金额',
        dataIndex: 'snlzSum'
      },
      {
        title: '本年列账金额',
        dataIndex: 'bnlzSum',
        slots: { customRender: 'redtext' }
      },
      {
        title: '本年已付款金额',
        dataIndex: 'bnfkSum'
      },
      {
        title: '未清偿挂账首笔（最早）时间',
        dataIndex: 'wqcFirst'
      }
    ]
    const columns4: any = [
      {
        title: '指标名称',
        dataIndex: 'idxName'
      },

      {
        title: '分值',
        dataIndex: 'score'
      },
      {
        title: '实际得分',
        dataIndex: 'actualScore',
        slots: { customRender: 'redtext' }
      }
    ]
    //请求弹框内容
    const date = computed(() => {
      return store.state.selectDate
    })
    const cityCode = computed(() => {
      return store.state.cityCode
    })

    //弹框数据

    const data = ref([])
    const columns = ref([])
    watch(show, (nval, oval) => {
      context.emit('change', nval)
      const type = pageType.value
      data.value = []
      if (type === 'provider_num') {
        columns.value = columns1
        requestPostData('/bigScreen/guiz/popup/supplierList', { accountCode: cityCode.value, monthId: date.value })
          .then((res) => {
            const resdata: any = res.data
            data.value = resdata.data
          })
          .catch((e) => {
            _this.$message.error('需要关注供应商数据加载失败！')
          })
      }
      if (type === 'contract_num') {
        columns.value = columns2
        requestPostData('/bigScreen/guiz/popup/contractList', { accountCode: cityCode.value, monthId: '2020-07' })
          .then((res) => {
            const resdata: any = res.data
            data.value = resdata.data
          })
          .catch((e) => {
            _this.$message.error('需要关注合同数据加载失败！')
          })
      }
      if (type === 'bill_num') {
        columns.value = columns3
        requestPostData('/bigScreen/guiz/popup/billList', { accountCode: cityCode.value, monthId: '2020-07' })
          .then((res) => {
            const resdata: any = res.data
            data.value = resdata.data
          })
          .catch((e) => {
            _this.$message.error('需要列账数据加载失败！')
          })
      }
      if (type === 'score_num') {
        columns.value = columns4
        requestPostData('/bigScreen/guiz/popup/scoreList', { accountCode: cityCode.value, monthId: '2020-07' })
          .then((res) => {
            const resdata: any = res.data
            data.value = resdata.data
          })
          .catch((e) => {
            _this.$message.error('分数加载失败！')
          })
      }
    })
    return {
      show,
      columns,
      data
    }
  }
})
</script>
<style lang="scss">
//元素在body下的最外层，没有被createApp实例成vue对象里的元素，所以不需要/deep/ ::v-deep之类的穿透，也不生效
.table-modal-list-box {
  .ant-modal .ant-modal-content {
    background-color: #0e154c;
    .ant-modal-close-icon {
      color: #333c87;
    }
    .ant-modal-close-x {
      height: 40px;
      width: 50px;
      line-height: 40px;
    }
    .ant-modal-body {
      padding-top: 35px;
    }
  }
  .ant-modal-footer {
    display: none;
  }
  .ant-table-content {
    .ant-table-header {
      background-color: #243082;
    }
    ant-table-body .ant-table-body {
      background-color: #243082;
    }
    .ant-table-thead > tr > th {
      background-color: #243082;
      color: #fff;
      border-bottom-color: rgba(0, 0, 0, 0);
    }
    .ant-table-tbody > tr > td {
      background-color: #0e154c;
      border-bottom-color: rgba(0, 0, 0, 0);
      color: #17d5d3;
    }
    .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td,
    .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td,
    .ant-table-thead > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td,
    .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
      background-color: #323f8e;
    }
  }
  .ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body {
    background-color: #0e154c;
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 10px 10px;
    text-align: center;
  }
  .ant-table-tbody {
    .red-text {
      color: #ff4b72;
    }
  }
  .ant-table-placeholder {
    background-color: #177fd5;
    border: none;
  }
}
</style>
