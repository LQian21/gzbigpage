import { requestPostData } from '../../http/http'
import { AxiosResponse } from 'axios'
import { pageChartsConfig } from '../installchart'
import { getDatesParams, getDatesParamsNew, getMonthsArr } from '../../utils/commFun'
import store from '../../store/index'
import { inintChartsUpdate } from '../installchart'
// import { encodeUrl } from '../static'
//取供应商接口
const getProvider = '/bigScreen/guiz/supplierIndexData/supplierList'
//取图形的指标接口，图形编码从上到下，从左到右0101，0102（总览图：01，重点图：02，详情图：03）
const getEncode = '/bigScreen/guiz/supplierIndexData/indexGroups'
//取指标值的接口
const encodeUrl = '/bigScreen/guiz/supplierIndexData/indexValues'
//请求和返回值类型，err统一类型后端暂未定义
interface ResponseBody {
  code?: number | string | null
  data: ResData[]
}
interface ResData {
  accountCode: string
  monthId: string
  ywlx: string
  gysbm: string
  idxCde: string
  idxCode?: string
  gysmc?: string
  idxValue?: string
  xh?: string
  idxName?: string
}
type Prama = ResData[]

const curDate: Date = new Date()
const defDate: string = curDate.getFullYear() + (curDate.getMonth() > 8 ? '-' + curDate.getMonth() + 1 : '-0' + (curDate.getMonth() + 1))
// const curentYears: number[] = [curDate.getFullYear() - 2, curDate.getFullYear() - 1, curDate.getFullYear()]
//top图表的数据更新逻辑
function handleTopTable(resData: AxiosResponse<ResponseBody>, encodeList: Record<string, any>, currentProvider: any) {
  console.log(resData, encodeList)

  const encode = encodeList['encode01'].data.data
  const gysbm: string = currentProvider.gysbm
  const gysmc: string = currentProvider.gysmc as string
  encode.map((val: Record<string, any>) => {
    const t = resData.data.data.find((ele) => ele.idxCode === val.idxCde) as Record<string, any>
    val.value = t.idxValue
    if (val.idxName === '注册资本') {
      val.name = val.idxName + '(万)'
    } else if (val.idxName === '实缴资本') {
      val.name = val.idxName + '(万)'
    } else if (val.idxName === '资本差异') {
      val.name = val.idxName + '(%)'
    } else if (val.idxName === '法律诉讼') {
      val.name = val.idxName + '(次)'
    } else if (val.idxName === '不良记录') {
      val.name = val.idxName + '(笔)'
    } else {
      val.name = val.idxName
    }
    return val
  })
  encode.unshift({ name: '供应商名称', value: gysmc })
  encode.unshift({ name: '供应商编码', value: gysbm })
  store.commit('setDetailTabledate', encode)
}
function handleCenterLeft(resData: AxiosResponse<ResponseBody>, encodeList: Record<string, any>) {
  const encode = encodeList['encode02'].data.data
  const config = pageChartsConfig.providerDetailView.child['detail-view-top-left']
  const legend = encode.map((val: Record<string, any>) => val.idxName.replace('_合同金额', ''))
  const serises = encode.map((val: Record<string, any>) => {
    const t = {
      name: val.idxName.replace('_合同金额', ''),
      type: 'bar',
      stack: 'y',
      data: [] as any
    }
    const data = resData.data.data ? resData.data.data.filter((ele) => ele.idxCode === val.idxCde) : []
    const data2 = data.map((e) => {
      const t: any = e
      t.value = e.idxValue
      t.name = e.idxName
      return t
    })
    t.data = data2
    return t
  })
  config.legend.data = legend
  config.series = serises
  //   console.log('center-left', resData, encode)
}
//处理center-center
function handleCenter(resData: AxiosResponse<ResponseBody>) {
  const config = pageChartsConfig.providerDetailView.child['detail-view-top-center']
  config.series[2].data[0].value = resData.data.data[0].idxValue
}
//处理center-right
function handleCenterRight(resData: AxiosResponse<ResponseBody>, encodeList: Record<string, any>) {
  const config = pageChartsConfig.providerDetailView.child['detail-view-top-right']
  const encodes = encodeList['encode04'].data.data
  const indicator = encodes.map((val: Record<string, any>) => {
    val.name = val.idxName
    val.max = 1
    return val
  })
  const data = resData.data.data.map((val) => val.idxValue)
  config.indicator = indicator
  config.series[0].data[0] = data
  console.log(resData.data.data)
}
//处理bottom-left
function handleBottomLeft(resData: AxiosResponse<ResponseBody>, encodeList: Record<string, any>) {
  const config = pageChartsConfig.providerDetailView.child['detail-view-bottom-left']
  //   const encodes = encodeList['encode05'].data.data
  const data = resData.data.data.map((val) => val.idxValue)
  config.series[0].data = data
}
//处理bottom-right
function handleBottomRight(resData: AxiosResponse<ResponseBody>, encodeList: Record<string, any>) {
  const config = pageChartsConfig.providerDetailView.child['detail-view-bottom-right']
  const encodes = encodeList['encode06'].data.data
  const encode1 = encodes[0].idxCde
  const encode2 = encodes[1].idxCde
  const data1: Record<string, any>[] = []
  const data2: Record<string, any>[] = []
  resData.data.data.forEach((val) => {
    if (val.idxCode === encode1) {
      data1.push({ name: val.idxName, value: val.idxValue })
    }
    if (val.idxCode === encode2) {
      data2.push({ name: val.idxName, value: val.idxValue })
    }
  })
  config.series[0].data = data1
  config.series[1].data = data2
}
function handleAllDataRequest(_this: Record<string, any>, reqArr: Promise<AxiosResponse<ResponseBody>>[], providerList: any, encodeList: Record<string, any>, currentProvider: any) {
  Promise.all(reqArr)
    .then(([resTop, centerLeft, center, centerRight, bottomLeft, bottomRight]) => {
      _this.$message.success('数据加载成功！')
      handleTopTable(resTop, encodeList, currentProvider)
      handleCenterLeft(centerLeft, encodeList)
      handleCenter(center)
      handleCenterRight(centerRight, encodeList)
      handleBottomLeft(bottomLeft, encodeList)
      handleBottomRight(bottomRight, encodeList)
      setTimeout(() => {
        inintChartsUpdate('providerDetailView')
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

const updateProviderDetailView = async (_this: Record<string, any>) => {
  //全局统一参数
  const date = store.state.selectDate
  const citycode = store.state.cityCode
  const businesstype = store.state.buniessType
  //   console.log(_this.$route.params)
  const currentProviderJcStr: string | null = window.sessionStorage.getItem('keypointProvider')
  let currentProviderJc: any
  if (currentProviderJcStr) {
    currentProviderJc = JSON.parse(currentProviderJcStr as string)
  } else {
    _this.$message.error('当前不存在供应商，请重新进入或刷新页面！')
    return
  }
  //   const currentProviderJc: any = store.state.keypointProvider
  //   const currentProvider = _this.$route.params.provider
  //   const currentProvider = { accountCode: 'A52', gysbm: 'G000117879', gysjc: '贵通服', gysmc: '贵州省通信产业服务有限公司', monthId: '2020-07', xh: '1', ywlx: 'all' }
  try {
    //请求供应商编码和名称
    const providerList = await requestPostData<Record<string, string>, ResponseBody, unknown>(getProvider, { accountCode: citycode, monthId: date, ywlx: businesstype })
    //这里filter取到的是数组，[0]取第一位
    const currentProvider: any = providerList.data.data.filter((ele: any) => ele.gysjc === currentProviderJc.gysjc)[0]
    if (!providerList.data.data || providerList.data.data.length === 0) {
      _this.$message.error('供应商列表加载失败！')
      store.commit('setIsLoading', false)
      return
    }
    if (!currentProvider) {
      _this.$message.error('供应商简称检索失败！')
      store.commit('setIsLoading', false)
      return
    }
    //获取该页面所有图表的指标编码
    Promise.all([
      requestPostData<{ idxGroup: string }, ResponseBody, unknown>(getEncode, { idxGroup: '0301' }),
      requestPostData<{ idxGroup: string }, ResponseBody, unknown>(getEncode, { idxGroup: '0302' }),
      requestPostData<{ idxGroup: string }, ResponseBody, unknown>(getEncode, { idxGroup: '0303' }),
      requestPostData<{ idxGroup: string }, ResponseBody, unknown>(getEncode, { idxGroup: '0304' }),
      requestPostData<{ idxGroup: string }, ResponseBody, unknown>(getEncode, { idxGroup: '0305' }),
      requestPostData<{ idxGroup: string }, ResponseBody, unknown>(getEncode, { idxGroup: '0306' })
    ])
      .then(([encode01, encode02, encode03, encode04, encode05, encode06]) => {
        const t_this = _this
        const encodeMap = {
          encode01,
          encode02,
          encode03,
          encode04,
          encode05,
          encode06
        }
        //top图表请求参数
        const encodetop = encode01.data.data.map((val) => val.idxCde)
        const topParam: Prama = JSON.parse(getDatesParamsNew([date], [citycode], encodetop, [currentProvider.gysbm], businesstype))
        const topPro = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, topParam)
        //center-eft图表请求参数
        const encodecenterleft = encode02.data.data.map((val) => val.idxCde)
        const dateArr: string[] = [String(curDate.getFullYear() - 2 + '-12'), String(curDate.getFullYear() - 1 + '-12'), date]
        const centerLeftParam: Prama = JSON.parse(getDatesParamsNew(dateArr, [citycode], encodecenterleft, [currentProvider.gysbm], businesstype))
        const centerLeftPro = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, centerLeftParam)
        //center-center图表请求参数
        const encodeCenter = encode03.data.data.map((val) => val.idxCde)
        const centerParam: Prama = JSON.parse(getDatesParamsNew([date], [citycode], encodeCenter, [currentProvider.gysbm], businesstype))
        const centerPro = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, centerParam)
        //center-right图表请求参数
        const encodecenterright = encode04.data.data.map((val) => val.idxCde)
        const centerRightParam: Prama = JSON.parse(getDatesParamsNew([date], [citycode], encodecenterright, [currentProvider.gysbm], businesstype))
        const centerRightPro = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, centerRightParam)
        //bottom-left图表请求参数
        const encodebottomleft = encode05.data.data.map((val) => val.idxCde)
        const encodeBottomParam: Prama = JSON.parse(getDatesParamsNew([date], [citycode], encodebottomleft, [currentProvider.gysbm], businesstype))
        const bottomLeftPro = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, encodeBottomParam)
        //bottom-right图表请求参数
        const encodebottomright = encode06.data.data.map((val) => val.idxCde)
        const dateList: string[] = Array.from({ length: 12 }, (v, k) => {
          const d = k + 1 > 9 ? k + 1 : '0' + (k + 1)
          return curDate.getFullYear() + '-' + d
        })
        const encodeBottomRightParam: Prama = JSON.parse(getDatesParamsNew(dateList, [citycode], encodebottomright, [currentProvider.gysbm], businesstype))
        const bottomRightPro = requestPostData<Prama, ResponseBody, unknown>(encodeUrl, encodeBottomRightParam)

        const reqArr = [topPro, centerLeftPro, centerPro, centerRightPro, bottomLeftPro, bottomRightPro]
        handleAllDataRequest(t_this, reqArr, providerList, encodeMap, currentProvider)
      })
      .catch((e) => {
        _this.$message.error('指标加载失败,请刷新重试！')
      })
      .finally(() => {
        store.commit('setIsLoading', false)
      })
  } catch (error) {
    _this.$message.error('供应商编码加载过程失败！')
  }
}

export { updateProviderDetailView }
