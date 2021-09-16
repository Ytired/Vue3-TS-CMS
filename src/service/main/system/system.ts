import yjRequest from '../../index'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return yjRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
