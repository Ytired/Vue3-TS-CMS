import { createRouter, createWebHashHistory } from 'vue-router'
// 导入类型
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'

// 路由懒加载
const login = () =>
  import(/* webpackChunkName: "login-chunk" */ '@/views/login/login.vue')
const main = () =>
  import(/* webpackChunkName: "main-chunk" */ '@/views/main/main.vue')
const notFound = () => import('@/views/not-found/not-found.vue')

// 创建路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/main',
    name: 'main',
    component: main,
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: notFound
  }
]

// 创建router对象
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导航守卫
router.beforeEach(to => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

// 导出
export default router
