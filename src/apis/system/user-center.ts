import type * as System from './type'
import http from '@/utils/http'

const BASE_URL = '/system/user'

/** @desc 上传头像 */
export function uploadAvatar(data: FormData) {
  return http.post(`${BASE_URL}/avatar`, data)
}

/** @desc 修改用户基本信息 */
export function updateUserBaseInfo(data: { nickname: string, gender: number }) {
  return http.patch(`${BASE_URL}/basic/info`, data)
}

/** @desc 修改密码 */
export function updateUserPassword(data: { oldPassword: string, newPassword: string }) {
  return http.patch(`${BASE_URL}/password`, data)
}

/** @desc 修改手机号 */
export function updateUserPhone(data: { phone: string, captcha: string, oldPassword: string }) {
  return http.patch(`${BASE_URL}/phone`, data)
}

/** @desc 修改邮箱 */
export function updateUserEmail(data: { email: string, captcha: string, oldPassword: string }) {
  return http.patch(`${BASE_URL}/email`, data)
}

/** @desc 获取绑定的三方账号 */
export function listUserSocial() {
  return http.get<System.BindSocialAccountRes[]>(`${BASE_URL}/social`)
}

/** @desc 绑定三方账号 */
export function bindSocialAccount(source: string, data: any) {
  return http.post(`${BASE_URL}/social/${source}`, data)
}

/** @desc 解绑三方账号 */
export function unbindSocialAccount(source: string) {
  return http.del(`${BASE_URL}/social/${source}`)
}
