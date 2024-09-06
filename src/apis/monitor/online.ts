import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/monitor/online'

/** @desc 查询在线用户列表 */
export function listOnlineUser(query: T.OnlineUserPageQuery) {
  return http.get<PageRes<T.OnlineUserResp[]>>(`${BASE_URL}`, query)
}

/** @desc 强退在线用户 */
export function kickout(token: string) {
  return http.del(`${BASE_URL}/${token}`)
}
