import option1 from './providerAllView/left.top.pie'
import option3 from './providerAllView/left.bottom.pie'
import option4 from './providerAllView/center.bottom.pillar'
import option5 from './providerAllView/right.top.pillar'
import option6 from './providerAllView/right.bottom'

import option7 from './providerDetailView/top.left'
import option8 from './providerDetailView/top.center'
import option9 from './providerDetailView/top.right'
import option10 from './providerDetailView/bottom.left'
import option11 from './providerDetailView/bottom.right'

import option12 from './providerKeypointView/top.left'
import option2 from './providerKeypointView/top.right.bar'
import option13 from './providerKeypointView/bottom.left'
import option14 from './providerKeypointView/bottom.center'
import option15 from './providerKeypointView/bottom.right'

import mapConfig from './map'

import { onMounted } from 'vue'
import echarts from 'echarts'
import store from '../store'

export interface PageView<T> {
  child: T
  page?: string
  title?: string
}
export type PageName = 'providerAllView' | 'providerDetailView' | 'providerKeypointView'
interface FuncPstringVoid {
  (page: PageName): void
}
export const pageChartsConfig: Record<PageName, PageView<Record<string, any>>> = {
  providerAllView: {
    child: {
      'all-view-left-top': option1,
      'all-view-left-bottom': option3,
      'all-view-center-bottom': option4,
      'all-view-right-top': option5,
      'all-view-right-bottom': option6,
      'all-view-center-map': mapConfig
    },
    page: ''
  },
  providerDetailView: {
    child: {
      'detail-view-top-left': option7,
      'detail-view-top-center': option8,
      'detail-view-top-right': option9,
      'detail-view-bottom-left': option10,
      'detail-view-bottom-right': option11
    },
    page: ''
  },
  providerKeypointView: {
    child: {
      'keypoint-view-top-left': option12,
      'keypoint-view-top-right': option2,
      'keypoint-view-bottom-left': option13,
      'keypoint-view-bottom-center': option14,
      'keypoint-view-bottom-right': option15
    },
    page: ''
  }
}
const inintCharts: FuncPstringVoid = (page: PageName) => {
  const currentPage = pageChartsConfig[page]['child']
  onMounted(() => {
    Object.keys(currentPage).forEach((val: string) => {
      const box = echarts.init(document.getElementById(val) as HTMLDivElement)
      currentPage[val] && box.setOption(currentPage[val])
    })
  })
}
const inintChartsUpdate: FuncPstringVoid = (page: PageName) => {
  const currentPage = pageChartsConfig[page]['child']
  Object.keys(currentPage).forEach((val: string) => {
    const box = echarts.init(document.getElementById(val) as HTMLDivElement)
    currentPage[val] && box.setOption(currentPage[val])
    if (page === 'providerKeypointView') {
      if (val === 'keypoint-view-top-left') {
        box.off('click')
        box.on('click', 'yAxis.category', function(params: any) {
          console.log(params)
          store.commit('setKeypointProvider', { gysjc: params.value })
        })
      }
      if (val === 'keypoint-view-top-right') {
        box.off('click')
        box.on('click', 'xAxis.category', function(params: any) {
          console.log(params)
          store.commit('setKeypointProvider', { gysjc: params.value })
        })
      }
      if (val === 'keypoint-view-bottom-center') {
        box.off('click')
        box.on('click', 'xAxis.category', function(params: any) {
          console.log(params)
          store.commit('setKeypointProvider', { gysjc: params.value })
        })
      }
    }
    if (page === 'providerAllView' && val === 'all-view-center-map') {
      box.off('click')
      box.on('click', function(params: any) {
        console.log(params)
        store.commit('setCityCode', params.data.value2)
      })
    }
  })
}
export { inintCharts, inintChartsUpdate }
