import axios from 'axios'
// 导入接口
import type { AxiosInstance } from 'axios'
import type { J_RequestConfig, J_RequestInterceptors } from './types'

class J_Request {
  // 实例变量
  public instance: AxiosInstance
  public interceptors?: J_RequestInterceptors

  // 构造器
  constructor(config: J_RequestConfig) {
    // 创建实例
    this.instance = axios.create(config)
    // 将值保存起来
    this.interceptors = config.interceptors
    // 请求拦截器
    this.instance.interceptors.request.use(
      // 可选链操作
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      // 可选连操作
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      config => {
        console.log('请求🐷🐷🐷')
        return config
      },
      error => {
        console.log('请求🐷🐷🐷', error)
        return error
      }
    )
    this.instance.interceptors.response.use(
      res => {
        console.log('响应🐷🐷🐷')
        return res
      },
      error => {
        console.log('响应🐷🐷🐷', error)
        return error
      }
    )
  }

  // 请求
  request(config: J_RequestConfig): void {
    // 单独的请求拦截处理
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }
    // 发送请求
    this.instance.request(config).then(res => {
      // 单独的响应拦截处理
      if (config.interceptors?.responseInterceptors) {
        res = config.interceptors?.responseInterceptors(res)
      }
      console.log(res)
    })
  }
}

export default J_Request
