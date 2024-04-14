import http from '@/utils/http'
import type * as System from './type'

const BASE_URL = '/system/option'

/** @desc 获取系统配置参数 */
export function list(params: System.OptionQuery) {
  return http.get<System.OptionResp[]>(`${BASE_URL}`, params)
}

/** @desc 保存系统参数 */
export function save(req: System.OptionReq[]) {
  return http.patch(`${BASE_URL}`, req)
}

/** @desc 重置系统参数 */
export function resetValue(params: System.OptionQuery) {
  return http.patch(`${BASE_URL}/value`, params)
}
