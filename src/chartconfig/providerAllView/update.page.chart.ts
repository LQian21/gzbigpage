import { requestPostData } from '../../http/http'
import { AxiosResponse } from 'axios'
import { pageChartsConfig } from '../installchart'
import { getDatesParams } from '../../utils/commFun'
import store from '../../store/index'
import { inintChartsUpdate } from '../installchart'
// import { encodeUrl } from '../static'

//取图形的指标接口，图形编码从上到下，从左到右
const getEncode = '/channelBigScreen/modInfoList'
//取指标值的接口
const encodeUrl = '/channelBigScreen/modIdxVOList'
//请求和返回值类型，err统一类型后端暂未定义
//指标返回类型
interface EncodeType {
  chartCode: string
  idxCde: string
  idxOrd: string
}
interface ViewEEncodeRes {
  viewCode: string
  chnlType: string
  chartCode: string
  chartOrd: string
  idxs: EncodeType[]
}
//指标值返回类型
interface ResponseBody {
  code?: number | string | null
  data: ResData[]
}
interface ResData {
  chartCode: string
  idxCde: string
  rptType?: string
  accountCode: string
  periodDate: string
  idxValue?: string
  idxName?: string
  idxOrd?: string
}
type Prama = ResData[]

//left-top图表请求数据逻辑
function handleLeftTopChart(resData: AxiosResponse<ResponseBody>) {
  const config = pageChartsConfig.providerAllView.child['all-view-left-top']
  console.log(resData)
}

//统一请求函数
const updateProviderAllView = async (_this: Record<string, any>) => {
  //全局统一参数
  // const date = store.state.selectDate
  const date = '202007'
  const citycode = store.state.cityCode
  const businesstype = store.state.buniessType
  //图1用原来接口，先请求该图对应指标
  let pageAllviewEncode
  try {
    pageAllviewEncode = await requestPostData<Record<string, string>, { data: ViewEEncodeRes[] }, unknown>(getEncode, { viewCode: '2001', chnlType: '00' })
  } catch (error) {
    _this.$message.error('指标加载失败,请刷新重试！')
  }
  //left-top图表请求数据逻辑
  const leftTopParam: Prama = []
  const leffTop = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, leftTopParam)
  //left-bottom图表请求数据逻辑
  const leffBottomParam: Prama = []
  const leffBottom = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, leffBottomParam)

  //请求实际数据的promise数组
  const reqArr = [leffTop, leffBottom]
  Promise.all(reqArr)
    .then(([resLeffTop, resLeffBottom]) => {
      _this.$message.success('数据加载成功！')
      handleLeftTopChart(resLeffTop)
      setTimeout(() => {
        inintChartsUpdate('providerAllView')
      }, 0)
    })
    .catch((err) => {
      _this.$message.error('指标数据加载失败,请刷新重试！')
      console.log(err)
    })
    .finally(() => {
      store.commit('setIsLoading', false)
    })
}

export { updateProviderAllView }
