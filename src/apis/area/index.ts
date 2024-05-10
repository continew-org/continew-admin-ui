import type * as Area from './type'
import http from '@/utils/http'

/** @desc 获取地区列表 */
export const getAreaList = (params: { type: 'province' | 'city' | 'area', code?: string }) => {
  return http.get<Area.AreaItem>('/area/list', params)
}
