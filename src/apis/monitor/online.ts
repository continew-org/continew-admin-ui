import http from '@/utils/http'
import type * as Monitor from './type'

const BASE_URL = '/monitor/online/user'

/** @desc 查询在线用户列表 */
export function listOnlineUser(query: Monitor.OnlineUserQuery) {
  return http.get<PageRes<Monitor.OnlineUserResp[]>>(`${BASE_URL}`, query)
}

/** @desc 强退在线用户 */
export function kickout(token: string) {
  return http.del(`${BASE_URL}/${token}`)
}
