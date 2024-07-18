import type * as Schedule from './type'
import http from '@/utils/http'

const BASE_URL = '/schedule/log'

/** @desc 查询任务日志列表 */
export function listJobLog(query: Schedule.JobLogPageQuery) {
  return http.get<PageRes<Schedule.JobLogResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询任务日志详情 */
export function getJobLogDetail(id: number) {
  return http.get<boolean>(`${BASE_URL}/${id}`)
}

/** @desc 停止任务 */
export function stopJob(id: number) {
  return http.post(`${BASE_URL}/stop/${id}`)
}

/** @desc 重试任务 */
export function retryJob(id: number) {
  return http.post(`${BASE_URL}/retry/${id}`)
}

/** @desc 查询任务实例列表 */
export function listJobInstance(query: Schedule.JobInstanceQuery) {
  return http.get<Schedule.JobInstanceResp[]>(`${BASE_URL}/instance`, query)
}

/** @desc 查询任务实例日志列表 */
export function listJobInstanceLog(query: Schedule.JobInstanceLogQuery) {
  return http.get<Schedule.JobInstanceLogResp>(`${BASE_URL}/instance/log`, query)
}
