import type { ISystemState } from './main/system/types'
import type { ILoginState } from './login/types'

export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}
// 交叉类型 将两个类型结合在一起
export type IStoreType = IRootState & IRootWithModule
