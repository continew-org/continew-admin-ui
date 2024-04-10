import http from '@/utils/http'
import type * as System from './type'

const BASE_URL = '/system/log'

/** @desc 查询日志列表 */
export function listLog(query: System.LogQuery) {
  return http.get<PageRes<System.LogResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询日志详情 */
export function getLog(id: string) {
  return http.get<System.LogDetailResp>(`${BASE_URL}/${id}`)
}
/** @desc 导出日志列表 */
export function exportLog(query: System.LogQuery) {
  return http.download<any>(`${BASE_URL}/export/login`, query)
}
/**@desc 导出操作日志 */
export function exportOperateLog(query: System.LogQuery) {
  return http.download<any>(`${BASE_URL}/export/operation`, query)
}