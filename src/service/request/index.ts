import axios from 'axios'

// 导入接口
import type { AxiosInstance } from 'axios'
import type { J_RequestConfig, J_RequestInterceptors } from './types'

import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEAFULT_LOADING = true

class J_Request {
  // 实例变量
  public instance: AxiosInstance
  public interceptors?: J_RequestInterceptors
  public showLoading: boolean
  public loading?: ILoadingInstance

  // 构造器
  constructor(config: J_RequestConfig) {
    // 创建实例
    this.instance = axios.create(config)

    // 保存基本配置
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    // 使用请求拦截器 取出实例化传入的配置
    this.instance.interceptors.request.use(
      // 可选链操作
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    // 使用响应拦截器 取出实例化传入的配置
    this.instance.interceptors.response.use(
      // 可选连操作
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      config => {
        // 判断是否显示loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载中🚀🚀🚀客官请稍后~',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      error => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      res => {
        // 将loading移除
        this.loading?.close()

        const data = res.data

        if (data.returnCode === '-1001') {
          console.log('请求失败~,错误信息')
        } else {
          return data
        }
      },
      error => {
        // 将loading移除
        this.loading?.close()
        if (error.response.status === 404) {
          console.log('404的错误~')
        }
        return error
      }
    )
  }

  // 请求
  request<T>(config: J_RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单独的请求拦截处理
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }

      // 关闭loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      // 发送请求
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 单独的响应拦截处理
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors?.responseInterceptors(res)
          }
          // 将showLoading设置为true  不然会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          // 返回res
          resolve(res)
        })
        .catch(err => {
          // 将showLoading设置为true  不然会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }
  // get请求
  get<T>(config: J_RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  // post请求
  post<T>(config: J_RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  // patch请求
  patch<T>(config: J_RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
  // delete请求
  delete<T>(config: J_RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default J_Request
