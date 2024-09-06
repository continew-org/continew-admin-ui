import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/log'

/** @desc 查询日志列表 */
export function listLog(query: T.LogPageQuery) {
  return http.get<PageRes<T.LogResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询日志详情 */
export function getLog(id: string) {
  return http.get<T.LogDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 导出登录日志 */
export function exportLoginLog(query: T.LogQuery) {
  return http.download<any>(`${BASE_URL}/export/login`, query)
}

/** @desc 导出操作日志 */
export function exportOperationLog(query: T.LogQuery) {
  return http.download<any>(`${BASE_URL}/export/operation`, query)
}
