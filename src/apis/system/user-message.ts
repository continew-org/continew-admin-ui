import type * as T from './type'
import http from '@/utils/http'

const BASE_URL = '/user/message'

/** @desc 分页查询用户公告 */
export function listUserNotice(query: T.NoticePageQuery) {
  return http.get<PageRes<T.NoticeResp[]>>(`${BASE_URL}/notice`, query)
}

/** @desc 获取用户公告详情 */
export function getUserNotice(id: number) {
  return http.get<T.NoticeResp>(`${BASE_URL}/notice/${id}`)
}
