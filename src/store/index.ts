import { createStore } from 'vuex'
import type { IRootState } from './types'
import login from './login/login'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: '小羊',
      age: 21
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export default store
