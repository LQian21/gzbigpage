import { requestPostData } from '../../http/http'
import { AxiosResponse } from 'axios'
import { pageChartsConfig } from '../installchart'
import { getDatesParams, getDatesParamsNew } from '../../utils/commFun'
import store from '../../store/index'
import { inintChartsUpdate } from '../installchart'
import { updatePage2PieData } from '../providerAllView/update.page.chart'
import { Store } from 'vuex'
// import { encodeUrl } from '../static'
//取供应商接口
const getProvider = '/bigScreen/guiz/supplierIndexData/supplierList'
//取图形的指标接口，图形编码从上到下，从左到右0101，0102（总览图：01，重点图：02，详情图：03）
const getEncode = '/bigScreen/guiz/supplierIndexData/indexGroups'
//取指标值的接口
const encodeUrl = '/bigScreen/guiz/supplierIndexData/indexValues'
//请求和返回值类型，err统一类型后端暂未定义
// interface ProviderRes { //供应商返回类型
//     accountCode: string
//     monthId: string
//     ywlx: string
//     xh: string
//     gysbm: string
//     gysmc: string
//   }
//   interface encodeRes { //指标返回类型
//     idxGroup: string
//     idxCde: string
//     idxName: string
//     xh: string
//   }
interface ResponseBody {
  code?: number | string | null
  data: ResData[]
}
interface ResData {
  accountCode: string
  monthId: string
  ywlx: string
  gysbm: string
  idxCde?: string
  idxCode?: string
  gysmc?: string
  gysjc?: string
  idxValue?: string
  xh?: string
  idxName?: string
}
type Prama = ResData[]

//left-top 图表的数据更新逻辑
function handleLeftTopChart(resData: AxiosResponse<ResponseBody>, providerList: any, encodeList: any) {
  const providerListRqu: any = providerList.data.data.map((ele: any) => ele.gysjc)
  const config = pageChartsConfig.providerKeypointView.child['keypoint-view-top-left']
  //纵坐标数据
  config.yAxis.data = providerListRqu
  //列账金额
  const series1: any = resData.data
  const series1Data = series1.data.filter((val: any) => val.idxCode === 'ZDGYS_0001')
  config.series[0].data = series1Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series2: any = resData.data
  const series2Data = series2.data.filter((val: any) => val.idxCode === 'ZDGYS_0002')
  config.series[1].data = series2Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series3: any = resData.data
  const series3Data = series3.data.filter((val: any) => val.idxCode === 'ZDGYS_0003')
  config.series[2].data = series3Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  //纵坐标对应的serice数据
}

//right-top 图表的数据更新逻辑
function handleRightTopChart(resData: AxiosResponse<ResponseBody>, providerList: any, encodeList: any) {
  const providerListRqu: any = providerList.data.data.map((ele: any) => ele.gysjc)
  const config = pageChartsConfig.providerKeypointView.child['keypoint-view-top-right']
  //横坐标数据
  config.xAxis.data = providerListRqu
  //法律诉讼
  const series1Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0004')
  config.series[0].data = series1Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series2Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0005')
  config.series[1].data = series2Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series3Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0006')
  config.series[2].data = series3Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  //纵坐标对应的serice数据
}

//bottom-center 图表的数据更新逻辑
function handleBtCenterChart(resData: AxiosResponse<ResponseBody>, providerList: any, encodeList: any) {
  const providerListRqu: any = providerList.data.data.map((ele: any) => ele.gysjc)
  const config = pageChartsConfig.providerKeypointView.child['keypoint-view-bottom-center']
  //横坐标数据
  config.xAxis.data = providerListRqu
  const series1Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0007')
  config.series[0].data = series1Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series2Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0008')
  config.series[1].data = series2Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series3Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0009')
  config.series[2].data = series3Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series4Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0010')
  config.series[0].data = series1Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series5Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0011')
  config.series[1].data = series2Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series6Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0012')
  config.series[2].data = series3Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series7Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0013')
  config.series[0].data = series1Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series8Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0014')
  config.series[1].data = series2Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series9Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0015')
  config.series[2].data = series3Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series10Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0016')
  config.series[0].data = series1Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  //纵坐标对应的serice数据
}

//bottom-right 图表的数据更新逻辑
function handleBtRightChart(resData: AxiosResponse<ResponseBody>, providerList: any, encodeList: any) {
  const providerListRqu: any = providerList.data.data.map((ele: any) => ele.gysjc)
  const config = pageChartsConfig.providerKeypointView.child['keypoint-view-bottom-right']
  //横坐标数据
  config.xAxis.data = providerListRqu
  const series1Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0017')
  config.series[0].data = series1Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series2Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0018')
  config.series[1].data = series2Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
  const series3Data = resData.data.data.filter((val: any) => val.idxCode === 'ZDGYS_0019')
  config.series[2].data = series3Data.map((val: any) => {
    val.name = val.gysjc
    val.value = val.idxValue
    return val
  })
}

function handleAllDataRequest(_this: Record<string, any>, reqArr: Promise<AxiosResponse<ResponseBody>>[], providerList: any, encodeList: Record<string, any>) {
  Promise.all(reqArr)
    .then(([resLeffTop, resRightTop, resBtCenter, resBtRight]) => {
      _this.$message.success('数据加载成功！')
      handleLeftTopChart(resLeffTop, providerList, encodeList)
      handleRightTopChart(resRightTop, providerList, encodeList)
      handleBtCenterChart(resBtCenter, providerList, encodeList)
      handleBtRightChart(resBtRight, providerList, encodeList)
      setTimeout(() => {
        inintChartsUpdate('providerKeypointView')
      }, 0)
    })
    .catch((err) => {
      _this.$message.error(err)
      _this.$message.error('指标数据加载失败,请刷新重试！')
      console.log(err)
    })
    .finally(() => {
      store.commit('setIsLoading', false)
    })
}
//全局统一参数
// const citycode = store.getters.getCityCode
// const businesstype = store.state.buniessType
// const date = window.sessionStorage.getItem("selectDate") as string

const updateProviderKeypointView = async (_this: Record<string, any>) => {
  //   const date = _this.$route.query.date || store.state.selectDate
  //   const citycode = _this.$route.query.city || store.getters.getCityCode
  //   const businesstype = _this.$route.query.type || store.state.buniessType
  const date = store.state.selectDate
  const citycode = store.getters.getCityCode
  const businesstype = store.state.buniessType
  let providerList: AxiosResponse<ResponseBody>

  try {
    //请求供应商编码和名称
    providerList = await requestPostData<Record<string, string>, ResponseBody, unknown>(getProvider, { accountCode: citycode, monthId: date, ywlx: businesstype })
    if (!(providerList.data.data && providerList.data.data.length > 0)) {
      _this.$message.error('本月暂无供应商！')
      store.commit('setIsLoading', false)
      return
    }
  } catch (error) {
    _this.$message.error('供应商编码加载失败,请刷新重试！')
  }

  //旧的指标加载饼图的数据
  updatePage2PieData()
  //获取该页面所有图表的指标编码

  Promise.all([
    requestPostData<{ idxGroup: string }, ResponseBody, unknown>(getEncode, { idxGroup: '0201' }),
    requestPostData<{ idxGroup: string }, ResponseBody, unknown>(getEncode, { idxGroup: '0202' }),
    // requestPostData<{ idxGroup: string }, ResponseBody, unknown>(getEncode, { idxGroup: '0203' }),
    requestPostData<{ idxGroup: string }, ResponseBody, unknown>(getEncode, { idxGroup: '0204' }),
    requestPostData<{ idxGroup: string }, ResponseBody, unknown>(getEncode, { idxGroup: '0205' })
  ])
    .then(([encode01, encode02, encode04, encode05]) => {
      const t_this = _this
      const encodeMap = {
        encode01,
        encode02,
        // encode03,
        encode04,
        encode05
      }
      //left-top图表请求参数
      const providerListRqu = providerList.data.data.map((ele) => ele.gysbm)
      const t: any = encode01.data
      const encodetopleft = t.data.map((v: any) => v.idxCde)

      const p = getDatesParamsNew([date], [citycode], encodetopleft, providerListRqu, businesstype)
      const leftTopParam: Prama = JSON.parse(p)

      const leffTop = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, leftTopParam)

      //right-top图表请求参数
      const encodetopright = encode02.data.data.map((v: any) => v.idxCde)
      const p2 = getDatesParamsNew([date], [citycode], encodetopright, providerListRqu, businesstype)
      const rightTopParam: Prama = JSON.parse(p2)
      const rightTop = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, rightTopParam)

      //left-bottom图表请求参数
      // const leftBottomParam: Prama = []
      // const leffBottom = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, leftBottomParam)

      //bottom-center图表请求参数
      const encodebtcenter = encode04.data.data.map((v: any) => v.idxCde)
      const p4 = getDatesParamsNew([date], [citycode], encodebtcenter, providerListRqu, businesstype)
      const btCenterParam: Prama = JSON.parse(p4)
      const btCenter = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, btCenterParam)

      //bottom-right图表请求参数
      const encodebtright = encode05.data.data.map((v: any) => v.idxCde)
      const p5 = getDatesParamsNew([date], [citycode], encodebtright, providerListRqu, businesstype)
      const btRightParam: Prama = JSON.parse(p5)
      const btRight = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, btRightParam)

      const reqArr = [leffTop, rightTop, btCenter, btRight]
      handleAllDataRequest(t_this, reqArr, providerList, encodeMap)
    })
    .catch((e) => {
      console.log(e)
      _this.$message.error('指标加载失败,请刷新重试！')
    })
    .finally(() => {
      store.commit('setIsLoading', false)
    })
}

export { updateProviderKeypointView }
