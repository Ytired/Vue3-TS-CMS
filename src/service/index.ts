// service统一出口
import J_Request from './request'
import { baseURL, timeout } from './request/config'
import localCache from '@/utils/cache'

const j_Request = new J_Request({
  baseURL, //请求地址
  timeout, //超时时间
  // 实例拦截器配置
  interceptors: {
    requestInterceptors: config => {
      // 携带token
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorsCatch: error => {
      return error
    },
    responseInterceptors: res => {
      return res
    },
    responseInterceptorsCatch: error => {
      return error
    }
  }
})

export default j_Request
