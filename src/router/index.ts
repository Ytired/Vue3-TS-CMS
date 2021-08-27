import { createRouter, createWebHashHistory } from 'vue-router'
// 导入类型
import type { RouteRecordRaw } from 'vue-router'

// 路由懒加载
const login = () =>
  import(/* webpackChunkName: "login-chunk" */ '@/views/login/login.vue')
const main = () =>
  import(/* webpackChunkName: "main-chunk" */ '@/views/main/main.vue')

// 创建路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: './login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/main',
    component: main
  }
]

// 创建router对象
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导出
export default router
