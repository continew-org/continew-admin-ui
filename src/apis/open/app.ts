import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/open/app'

/** @desc 查询应用列表 */
export function listApp(query: T.AppPageQuery) {
  return http.get<PageRes<T.AppResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询应用详情 */
export function getApp(id: string) {
  return http.get<T.AppResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增应用 */
export function addApp(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改应用 */
export function updateApp(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除应用 */
export function deleteApp(id: string) {
  return http.del(`${BASE_URL}`, { ids: [id] })
}

/** @desc 导出应用 */
export function exportApp(query: T.AppQuery) {
  return http.download(`${BASE_URL}/export`, query)
}

/** @desc 获取密钥 */
export function getAppSecret(id: string) {
  return http.get(`${BASE_URL}/${id}/secret`)
}

/** @desc 重置密钥 */
export function resetAppSecret(id: string) {
  return http.patch(`${BASE_URL}/${id}/secret`)
}
