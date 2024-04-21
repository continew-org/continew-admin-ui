import http from '@/utils/http'
import type * as System from './type'

const BASE_URL = '/system/user'

/** @desc 查询用户列表 */
export function listUser(query: System.UserPageQuery) {
  return http.get<PageRes<System.UserResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询用户详情 */
export function getUser(id: string) {
  return http.get<System.UserDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增用户 */
export function addUser(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改用户 */
export function updateUser(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除用户 */
export function deleteUser(ids: string | Array<string>) {
  return http.del(`${BASE_URL}/${ids}`)
}

/** @desc 导出用户 */
export function exportUser(query: System.UserQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}

/** @desc 重置密码 */
export function resetUserPwd(data: any, id: string) {
  return http.patch(`${BASE_URL}/${id}/password`, data)
}

/** @desc 修改用户基础信息 */
export function updateUserBaseInfo(data: { nickname?: string; gender?: number }) {
  return http.patch(`${BASE_URL}/basic/info`, data)
}

/** @desc 修改邮箱 */
export function updateUserEmail(data: { newEmail: string; captcha: string; currentPassword: string }) {
  return http.patch(`${BASE_URL}/email`, data)
}
/**@desc 绑定三方账号 */
export function bindSocialAccount(source: string, data: any) {
  return http.post(`${BASE_URL}/social/${source}`, data)
}
/**@desc 获取绑定的三方账号 */
export function getSocialAccount() {
  return http.get<System.BindSocialAccountRes[]>(`${BASE_URL}/social`)
}
/**@desc 解绑三方账号 */
export function unbindSocialAccount(source: string) {
  return http.del(`${BASE_URL}/social/${source}`)
}
