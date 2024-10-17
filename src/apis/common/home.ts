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

/** @desc 查询访问时段分析 */
export function getAnalysisTimeslot() {
  return http.get<T.DashboardChartCommonResp[]>(`${BASE_URL}/analysis/timeslot`)
}

/** @desc 查询模块分析 */
export function getAnalysisModule() {
  return http.get<T.DashboardChartCommonResp[]>(`${BASE_URL}/analysis/module`)
}

/** @desc 查询终端分析 */
export function getAnalysisOs() {
  return http.get<T.DashboardChartCommonResp[]>(`${BASE_URL}/analysis/os`)
}

/** @desc 查询浏览器分析 */
export function getAnalysisBrowser() {
  return http.get<T.DashboardChartCommonResp[]>(`${BASE_URL}/analysis/browser`)
}
