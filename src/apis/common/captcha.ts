import http from '@/utils/http'
import type * as Common from './type'

const BASE_URL = '/captcha'

/** @desc 获取图片验证码 */
export function getImageCaptcha() {
  return http.get<Common.ImageCaptchaResp>(`${BASE_URL}/img`)
}

/** @desc 获取短信验证码 */
export function getSmsCaptcha(query: { phone: string }) {
  return http.get<boolean>(`${BASE_URL}/sms`, query)
}

/** @desc 获取邮箱验证码 */
export function getEmailCaptcha(query: { email: string }) {
  return http.get<boolean>(`${BASE_URL}/mail`, query)
}
