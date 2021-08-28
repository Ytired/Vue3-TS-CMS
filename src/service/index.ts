// service统一出口
import J_Request from './request'
import { baseURL, timeout } from './request/config'

const j_Request = new J_Request({
  baseURL, //请求地址
  timeout, //超时时间
  // 拦截器配置
  interceptors: {
    requestInterceptors: config => {
      console.log('请求成功拦截~')
      return config
    },
    requestInterceptorsCatch: error => {
      console.log('请求失败~', error)
      return error
    },
    responseInterceptors: res => {
      console.log('响应成功拦截~')
      return res
    },
    responseInterceptorsCatch: error => {
      console.log('响应失败~', error)
      return error
    }
  }
})

export default j_Request
