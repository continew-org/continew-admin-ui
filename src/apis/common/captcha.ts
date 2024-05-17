import type * as Common from './type'
import http from '@/utils/http'

const BASE_URL = '/captcha'

/** @desc 获取图片验证码 */
export function getImageCaptcha() {
  return http.get<Common.ImageCaptchaResp>(`${BASE_URL}/image`)
}

/** @desc 获取短信验证码 */
export function getSmsCaptcha(query: { phone: string }) {
  return http.get<boolean>(`${BASE_URL}/sms`, query)
}

/** @desc 获取邮箱验证码 */
export function getEmailCaptcha(query: { email: string }) {
  return http.get<boolean>(`${BASE_URL}/mail`, query)
}

/** @desc 获取行为验证码 */
export function getBehaviorCaptcha(req: any) {
  return http.get<Common.BehaviorCaptchaResp>(`${BASE_URL}/behavior`, req)
}

/** @desc 校验行为验证码 */
export function checkBehaviorCaptcha(req: any) {
  return http.post<Common.CheckBehaviorCaptchaResp>(`${BASE_URL}/behavior`, req)
}
