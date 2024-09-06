import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/storage'

/** @desc 查询存储列表 */
export function listStorage(query: T.StoragePageQuery) {
  return http.get<PageRes<T.StorageResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询存储详情 */
export function getStorage(id: string) {
  return http.get<T.StorageResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增存储 */
export function addStorage(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改存储 */
export function updateStorage(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除存储 */
export function deleteStorage(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}
