import type { Module } from 'vuex'
import type { ILoginState } from './types'
import type { IRootState } from '../types'
import type { IAccount } from '@/service/login/types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    // 保存token
    changeToken(state, token: string) {
      state.token = token
    },
    // 保存用户信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 保存用户菜单信息
    chageUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 将userMenus的数据生成为routes
      const routes = mapMenusToRoutes(userMenus)

      // 将routes添加到router.main.children
      routes.forEach(route => router.addRoute('main', route))
    }
  },
  actions: {
    async accountLoginAction({ commit }, payLoad: IAccount) {
      // 实现登录
      const loginResult = await accountLoginRequest(payLoad)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('chageUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      // 页面刷新重新提交token
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      // 页面刷新重新提交userInfo
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      // 页面刷新重新提交userMenus
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('chageUserMenus', userMenus)
      }
    }
  },
  getters: {}
}

export default loginModule
