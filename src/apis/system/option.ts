import type * as System from './type'
import http from '@/utils/http'

const BASE_URL = '/system/option'

/** @desc 查询参数列表 */
export function listOption(query: System.OptionQuery) {
  return http.get<System.OptionResp[]>(`${BASE_URL}`, query)
}

/** @desc 修改参数 */
export function updateOption(data: any) {
  return http.put(`${BASE_URL}`, data)
}

/** @desc 重置参数 */
export function resetOptionValue(query: System.OptionQuery) {
  return http.patch(`${BASE_URL}/value`, query)
}
