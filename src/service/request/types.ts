import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export declare interface J_RequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (error: any) => any
}

// 继承来自AxiosRequestConfig所有属性
export declare interface J_RequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  // 添加型属性
  interceptors?: J_RequestInterceptors<T>
  showLoading?: boolean
}
