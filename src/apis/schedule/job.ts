import type * as Schedule from './type'
import http from '@/utils/http'

const BASE_URL = '/schedule/job'

/** @desc 查询任务组列表 */
export function listGroup() {
  return http.get(`${BASE_URL}/group`)
}

/** @desc 查询任务列表 */
export function listJob(query: Schedule.JobPageQuery) {
  return http.get<PageRes<Schedule.JobResp[]>>(`${BASE_URL}`, query)
}

/** @desc 新增任务 */
export function addJob(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改任务 */
export function updateJob(data: any, id: number) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 修改任务状态 */
export function updateJobStatus(data: any, id: number) {
  return http.patch(`${BASE_URL}/${id}/status`, data)
}

/** @desc 删除任务 */
export function deleteJob(id: number) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 执行任务 */
export function triggerJob(id: number) {
  return http.post(`${BASE_URL}/trigger/${id}`)
}
