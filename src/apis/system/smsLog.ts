import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/smsLog'

/** @desc 查询短信日志列表 */
export function listSmsLog(query: T.SmsLogPageQuery) {
  return http.get<PageRes<T.SmsLogResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询短信日志详情 */
export function getSmsLog(id: string) {
  return http.get<T.SmsLogResp>(`${BASE_URL}/${id}`)
}

/** @desc 删除短信日志 */
export function deleteSmsLog(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出短信日志 */
export function exportSmsLog(query: T.SmsLogQuery) {
  return http.download(`${BASE_URL}/export`, query)
}
