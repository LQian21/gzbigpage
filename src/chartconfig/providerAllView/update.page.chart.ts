import { requestPostData } from '../../http/http'
import { AxiosResponse } from 'axios'
import { pageChartsConfig } from '../installchart'
import { getDatesParams } from '../../utils/commFun'
import store from '../../store/index'
import { inintChartsUpdate } from '../installchart'
import { GZProvinceCityItem, GZProvinceCityEnum, indexdata } from '../static'
import mapConfig from '../map'

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
const typeMap: Record<string, string> = {
  all: '00',
  asset: '01',
  cost: '02',
  income: '03',
  other: '04'
}
//left-top图表请求数据逻辑
function handleLeftTopChart(resData: AxiosResponse<ResponseBody>, pageAllviewEncode: ViewEEncodeRes[]) {
  const config = pageChartsConfig.providerAllView.child['all-view-left-top']
  const label = ['成本类', '工程采购类', '合作分成类', '其他']
  config.series[0].data = resData.data.data.map((val: ResData, index) => {
    return {
      name: val.idxName,
      value: val.idxValue
    }
  })
}
//top-all总体指标
function handleLeftTopAll(resData: AxiosResponse<ResponseBody>, pageAllviewEncode: ViewEEncodeRes[]) {
  const data: Record<string, any>[] = resData.data.data
  store.commit('setAllviewItems', data)
  //   console.log(resData.data.data)
}
//right-top图表请求数据逻辑
function handleRightTopChart(resData: AxiosResponse<ResponseBody>, pageAllviewEncode: ViewEEncodeRes[]) {
  const config = pageChartsConfig.providerAllView.child['all-view-right-top']
  const label = ['新签合同额', '列账', '付款', '余额']
  const x: string[] = []
  const y: string[] = []
  resData.data.data.map((val: ResData, index) => {
    if (Number(val.idxOrd) % 2 !== 0) {
      x.push(val.idxValue as string)
    } else {
      y.push(val.idxValue as string)
    }
  })
  config.series[0].data = x
  config.series[1].data = y
}
//left-bootom图表请求数据逻辑
function handleLeftBottomChart(resData: AxiosResponse<ResponseBody>, pageAllviewEncode: ViewEEncodeRes[]) {
  const config = pageChartsConfig.providerAllView.child['all-view-left-bottom']
  const label = ['房地产', '汽车', '通讯设备', '土木工程', '软件和技术服务', '批发占比']
  config.series[0].data = resData.data.data.map((val: ResData, index) => {
    return {
      name: label[index],
      value: val.idxValue
    }
  })
}
//center-bootom图表请求数据逻辑
function handleCenterBottomChart(resData: AxiosResponse<ResponseBody>, pageAllviewEncode: ViewEEncodeRes[]) {
  const config = pageChartsConfig.providerAllView.child['all-view-center-bottom']
  const label = ['公开招标', '邀请招标', '单一采购（公示）', '邀请询价', '邀请竞争谈判', '公开比选', '公开询价', '单一采购（非公示）', '公开竞争谈判', '电商采购']
  config.series[0].data = resData.data.data.map((val: ResData, index) => {
    return {
      name: label[index],
      value: val.idxValue
    }
  })
}
//right-bootom图表请求数据逻辑
function handleRightBottomChart(resData: AxiosResponse<ResponseBody>, pageAllviewEncode: ViewEEncodeRes[]) {
  const config = pageChartsConfig.providerAllView.child['all-view-right-bottom']
  const label = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  config.series[0].data = resData.data.data.map((val: ResData, index) => {
    return {
      name: label[index],
      value: val.idxValue
    }
  })
}
//地图请求数据逻辑
function handleMapChart(resData: AxiosResponse<ResponseBody>) {
  console.log('map', resData.data)
  const data = resData.data.data.map((val: ResData) => {
    const t: Record<string, any> = {}
    t.name = GZProvinceCityEnum[val.accountCode]
    t.value = val.idxValue
    t.value2 = val.accountCode
    return t
  })
  mapConfig.series[0].data = data
}
//统一请求函数
const updateProviderAllView = async (_this: Record<string, any>) => {
  //全局统一参数
  const date = store.state.selectDate
  //   const date = '2020-07'
  const citycode = store.state.cityCode
  const businesstype = store.state.buniessType

  try {
    //图1用原来接口，先请求该图对应指标
    // const pageAllviewEncode = await requestPostData<Record<string, string>, { data: ViewEEncodeRes[] }, any>(getEncode, { viewCode: '2001', chnlType: typeMap[businesstype] })
    const pageAllviewEncode: any = { data: { data: indexdata } }
    //left-top图表请求数据逻辑
    const encondelefttop = pageAllviewEncode.data.data[0].idxs.map((ele: EncodeType) => ele.idxCde)
    const chartCode = pageAllviewEncode.data.data[0].chartCode
    const paramLeftTop = JSON.parse(getDatesParams([date], [citycode], encondelefttop, businesstype, chartCode))
    const leffTop = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, paramLeftTop)

    //中间总体指标
    const encondetopall = pageAllviewEncode.data.data[1].idxs.map((ele: EncodeType) => ele.idxCde)
    const chartCodeTopAll = pageAllviewEncode.data.data[1].chartCode
    const paramTopAll = JSON.parse(getDatesParams([date], [citycode], encondetopall, businesstype, chartCodeTopAll))
    const topAll = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, paramTopAll)

    //right-top图表请求数据逻辑
    const enconderighttop = pageAllviewEncode.data.data[3].idxs.map((ele: EncodeType) => ele.idxCde)
    const chartCodeRightTop = pageAllviewEncode.data.data[3].chartCode
    const rightParam: Prama = JSON.parse(getDatesParams([date], [citycode], enconderighttop, businesstype, chartCodeRightTop))
    const rightTopPro = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, rightParam)

    //left-bottom图表请求数据逻辑
    const encondeleftbottom = pageAllviewEncode.data.data[4].idxs.map((ele: EncodeType) => ele.idxCde)
    const chartCodeLeftBottom = pageAllviewEncode.data.data[4].chartCode
    const leftBottomParam: Prama = JSON.parse(getDatesParams([date], [citycode], encondeleftbottom, businesstype, chartCodeLeftBottom))
    const leftBottomPro = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, leftBottomParam)

    //center-bottom图表请求数据逻辑
    const encondecenterbottom = pageAllviewEncode.data.data[5].idxs.map((ele: EncodeType) => ele.idxCde)
    const chartCodeCenterBottom = pageAllviewEncode.data.data[5].chartCode
    const centerBottomParam: Prama = JSON.parse(getDatesParams([date], [citycode], encondecenterbottom, businesstype, chartCodeCenterBottom))
    const centerBottomPro = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, centerBottomParam)
    //right-bottom图表请求数据逻辑
    const curDate: Date = new Date()
    const dateList: string[] = Array.from({ length: 12 }, (v, k) => {
      const d = k + 1 > 9 ? k + 1 : '0' + (k + 1)
      return curDate.getFullYear() + '-' + d
    })
    const enconderightbottom = pageAllviewEncode.data.data[6].idxs.map((ele: EncodeType) => ele.idxCde)
    const chartCodeRightBottom = pageAllviewEncode.data.data[6].chartCode
    const rightBottomParam: Prama = JSON.parse(getDatesParams(dateList, [citycode], enconderightbottom, businesstype, chartCodeRightBottom))
    const rightBottomPro = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, rightBottomParam)

    //地图数据
    const mapcncode = pageAllviewEncode.data.data[2].idxs.map((ele: EncodeType) => ele.idxCde)
    const chartCodeMap = pageAllviewEncode.data.data[2].chartCode
    const citycodelist = Object.keys(GZProvinceCityItem)
    const mapParam: Prama = JSON.parse(getDatesParams([date], citycodelist, mapcncode, businesstype, chartCodeMap))
    const mapPro = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, mapParam)
    //请求实际数据的promise数组
    const reqArr = [leffTop, topAll, rightTopPro, leftBottomPro, centerBottomPro, rightBottomPro, mapPro]
    Promise.all(reqArr)
      .then(([resLeffTop, topAll, rightTopPro, leftBottomPro, centerBottomPro, rightBottomPro, mapPro]) => {
        _this.$message.success('数据加载成功！')
        handleLeftTopChart(resLeffTop, pageAllviewEncode.data.data)
        handleLeftTopAll(topAll, pageAllviewEncode.data.data)
        handleRightTopChart(rightTopPro, pageAllviewEncode.data.data)
        handleLeftBottomChart(leftBottomPro, pageAllviewEncode.data.data)
        handleCenterBottomChart(centerBottomPro, pageAllviewEncode.data.data)
        handleRightBottomChart(rightBottomPro, pageAllviewEncode.data.data)
        handleMapChart(mapPro)
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
  } catch (error) {
    _this.$message.error('指标加载失败,请刷新重试！')
  }
}
//重点页面饼图加载，采用老的指标取值方式，所以写在第一个页面
function updatePage2PieData() {
  //   const date = '2020-07'
  const date = store.state.selectDate
  const citycode = store.state.cityCode
  const businesstype = store.state.buniessType
  requestPostData<Record<string, string>, { data: ViewEEncodeRes[] }, unknown>(getEncode, { viewCode: '2002', chnlType: typeMap[businesstype] }).then((res) => {
    const update2pie = res.data.data[0].idxs.map((ele: EncodeType) => ele.idxCde)
    const chartCode = res.data.data[0].chartCode
    const update2pieParam = JSON.parse(getDatesParams([date], [citycode], update2pie, businesstype, chartCode))
    requestPostData<Prama, ResponseBody, unknown>(encodeUrl, update2pieParam).then((resData) => {
      const config = pageChartsConfig.providerKeypointView.child['keypoint-view-bottom-left']
      const label = ['房地产', '汽车', '通讯设备', '土木工程', '软件和技术服务', '批发']
      config.series[0].data = resData.data.data.map((val: ResData, index) => {
        return {
          name: label[index],
          value: val.idxValue
        }
      })
    })
  })
}
export { updateProviderAllView, updatePage2PieData }
