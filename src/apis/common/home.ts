import type * as Common from './type'
import http from '@/utils/http'

const BASE_URL = '/dashboard'

/** @desc 查询访问趋势 */
export function listDashboardAccessTrend(days: number) {
  return http.get<Common.DashboardAccessTrendResp[]>(`${BASE_URL}/access/trend/${days}`)
}

/** @desc 查询公告列表 */
export function listDashboardNotice() {
  return http.get<Common.DashboardNoticeResp[]>(`${BASE_URL}/notice`)
}
