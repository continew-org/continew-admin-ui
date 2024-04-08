import http from '@/utils/http'
import type * as Area from './type'

/** @desc 获取地区列表 */
export const getAreaList = (params: { type: 'province' | 'city' | 'area'; code?: string }) => {
  return http.get<Area.AreaItem>('/area/list', params)
}
