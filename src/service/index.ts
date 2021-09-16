// service统一出口
import J_Request from './request'
import { baseURL, timeout } from './request/config'
import localCache from '@/utils/cache'

const j_Request = new J_Request({
  baseURL, //请求地址
  timeout, //超时时间
  // 实例拦截器配置
  interceptors: {
    // 配置请求拦截器
    requestInterceptors: config => {
      // 携带token
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    // 配置请求失败拦截器
    requestInterceptorsCatch: error => error,
    // 配置相应拦截器
    responseInterceptors: res => res,
    // 配置响应失败拦截器
    responseInterceptorsCatch: error => error
  }
})

export default j_Request
