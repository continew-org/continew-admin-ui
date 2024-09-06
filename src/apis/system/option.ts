import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/option'

/** @desc 查询参数列表 */
export function listOption(query: T.OptionQuery) {
  return http.get<T.OptionResp[]>(`${BASE_URL}`, query)
}

/** @desc 修改参数 */
export function updateOption(data: any) {
  return http.put(`${BASE_URL}`, data)
}

/** @desc 重置参数 */
export function resetOptionValue(query: T.OptionQuery) {
  return http.patch(`${BASE_URL}/value`, query)
}
