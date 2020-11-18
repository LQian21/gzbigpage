import { createStore } from 'vuex'
import { getQueryVariable } from '../utils/commFun'

export type PageType = 'allview' | 'detailview' | 'keypointview'
const curDate: Date = new Date()
const defDate =
  window.sessionStorage.getItem('selectDate') ||
  (curDate.getMonth() === 0 ? curDate.getFullYear() - 1 + '-12' : curDate.getFullYear() + (curDate.getMonth() > 8 ? '-' + (curDate.getMonth() + 1) : '-0' + (curDate.getMonth() + 1)))
const defCity = window.sessionStorage.getItem('cityCode') || 'A52'
const defType = window.sessionStorage.getItem('buniessType') || 'all'
const defProvider = window.sessionStorage.getItem('keypointProvider') || ''
window.sessionStorage.setItem('cityCode', defCity as string)
window.sessionStorage.setItem('selectDate', defDate)
window.sessionStorage.setItem('buniessType', defType as string)
window.sessionStorage.setItem('keypointProvider', defProvider)

export default createStore({
  state: {
    currntPage: 'allview',
    cityCode: defCity,
    selectDate: defDate,
    buniessType: defType,
    detailTabledate: {},
    allviewItems: {},
    keypointProvider: {},
    isLoading: false
  },
  getters: {
    getCityCode(state) {
      return state.cityCode
    }
  },
  mutations: {
    setCurrentPage(state, curpage: PageType) {
      state.currntPage = curpage
    },
    setCityCode(state, city: string) {
      state.cityCode = city
      window.sessionStorage.setItem('cityCode', city)
    },
    setSelectDate(state, date: string) {
      state.selectDate = date
      window.sessionStorage.setItem('selectDate', date)
    },
    setBuniessType(state, type: string) {
      state.buniessType = type
      window.sessionStorage.setItem('buniessType', type)
    },
    setDetailTabledate(state, data: Record<string, string>[]) {
      state.detailTabledate = data
    },
    setAllviewItems(state, data: Record<string, string>[]) {
      state.allviewItems = data
    },
    setKeypointProvider(state, data: any) {
      state.keypointProvider = data
      const sessionData = JSON.stringify(data)
      window.sessionStorage.setItem('keypointProvider', sessionData)
    },
    setIsLoading(state, load: boolean) {
      state.isLoading = load
    }
  },
  actions: {},
  modules: {}
})
