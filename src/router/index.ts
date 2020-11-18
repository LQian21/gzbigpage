import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext, Router } from 'vue-router'
import store from '@/store/index'
import { requestPostData } from '../http/http'
import Home from '../views/Home.vue'
import qs from 'qs'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/allview'
  },
  {
    path: '/allview',
    name: 'allview',
    component: () => import('@/views/provider.all.view.vue')
  },
  {
    path: '/keypointview',
    name: 'keypointview',
    component: () => import('@/views/provider.keypoint.view.vue')
  },
  {
    path: '/detailview',
    name: 'detailview',
    component: () => import('@/views/provider.detail.view.vue')
  }
]
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (process.env.NODE_ENV === 'development' && to.name === 'Home') {
    try {
      const a = await requestPostData('/login', qs.stringify({ account: 10000, sct: 'c4ca4238a0b923820dcc509a6f75849b', yzm: '' }))
    } catch (error) {
      console.log(error)
    }
  }
  //   store.commit('setCurrentPage', to.name)
  next()
})
router.afterEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  store.commit('setCurrentPage', to.name)
})
export default router
