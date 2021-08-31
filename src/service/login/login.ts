import j_Request from '../index'
import type { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/'
}

// 用户登录请求
export function accountLoginRequest(account: IAccount) {
  console.log('111', account)
  return j_Request.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 请求用户信息
export function requestUserInfoById(id: number) {
  return j_Request.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}
