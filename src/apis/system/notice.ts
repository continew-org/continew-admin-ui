import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/notice'

/** @desc 查询公告列表 */
export function listNotice(query: T.NoticePageQuery) {
  return http.get<PageRes<T.NoticeResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询公告详情 */
export function getNotice(id: string) {
  return http.get<T.NoticeResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增公告 */
export function addNotice(data: any) {
  return http.post(BASE_URL, data)
}

/** @desc 修改公告 */
export function updateNotice(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除公告 */
export function deleteNotice(ids: string | Array<number>) {
  return http.del(`${BASE_URL}/${ids}`)
}
