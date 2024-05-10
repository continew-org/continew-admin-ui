import type * as Monitor from './type'
import http from '@/utils/http'

const BASE_URL = '/system/log'

/** @desc 查询日志列表 */
export function listLog(query: Monitor.LogPageQuery) {
  return http.get<PageRes<Monitor.LogResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询日志详情 */
export function getLog(id: string) {
  return http.get<Monitor.LogDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 导出登录日志 */
export function exportLoginLog(query: Monitor.LogQuery) {
  return http.download<any>(`${BASE_URL}/export/login`, query)
}

/** @desc 导出操作日志 */
export function exportOperationLog(query: Monitor.LogQuery) {
  return http.download<any>(`${BASE_URL}/export/operation`, query)
}
