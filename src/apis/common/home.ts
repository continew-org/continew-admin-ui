import http from '@/utils/http'
import type * as Common from './type'

const BASE_URL = '/dashboard'

/** @desc 查询访问趋势 */
export function listAccessTrend(days: number) {
  return http.get<Common.DashboardAccessTrendResp[]>(`${BASE_URL}/access/trend/${days}`)
}
