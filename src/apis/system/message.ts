import type * as System from './type'
import http from '@/utils/http'

const BASE_URL = '/system/message'

/** @desc 查询消息列表 */
export function listMessage(query: System.MessagePageQuery) {
  return http.get<PageRes<System.MessageResp[]>>(`${BASE_URL}`, query)
}

/** @desc 删除消息 */
export function deleteMessage(ids: string | Array<string>) {
  return http.del(`${BASE_URL}/${ids}`)
}

/** @desc 标记已读 */
export function readMessage(ids?: string | Array<string>) {
  return http.patch(`${BASE_URL}/read`, ids)
}

/** @desc 查询未读消息数量 */
export function getUnreadMessageCount() {
  return http.get(`${BASE_URL}/unread`)
}
