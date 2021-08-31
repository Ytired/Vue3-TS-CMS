import type { Module } from 'vuex'
import type { ILoginState } from './types'
import type { IRootState } from '../types'
import type { IAccount } from '@/service/login/types'
import { accountLoginRequest, requestUserInfoById } from '@/service/login/login'
import localCache from '@/utils/cache'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  actions: {
    async accountLoginAction({ commit }, payLoad: IAccount) {
      // 实现登录
      const loginResult = await accountLoginRequest(payLoad)
      const { id, token } = loginResult.data
      // 提交token
      commit('changeToken', token)
      // 将token保存到本地
      localCache.setCache('token', token)

      // 请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log(userInfoResult)
    }
  },
  mutations: {
    // 保存token
    changeToken(state, token: string) {
      state.token = token
    }
  },
  getters: {}
}

export default loginModule
