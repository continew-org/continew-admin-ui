import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/dashboard'

/** @desc 查询访问趋势 */
export function listDashboardAccessTrend(days: number) {
  return http.get<T.DashboardAccessTrendResp[]>(`${BASE_URL}/access/trend/${days}`)
}

/** @desc 查询公告列表 */
export function listDashboardNotice() {
  return http.get<T.DashboardNoticeResp[]>(`${BASE_URL}/notice`)
}
