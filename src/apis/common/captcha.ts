import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/captcha'

/** @desc 获取图片验证码 */
export function getImageCaptcha() {
  return http.get<T.ImageCaptchaResp>(`${BASE_URL}/image`)
}

/** @desc 获取短信验证码 */
export function getSmsCaptcha(phone: string, captchaReq: T.BehaviorCaptchaReq) {
  return http.get<boolean>(`${BASE_URL}/sms?phone=${phone}&captchaVerification=${encodeURIComponent(captchaReq.captchaVerification || '')}`)
}

/** @desc 获取邮箱验证码 */
export function getEmailCaptcha(email: string, captchaReq: T.BehaviorCaptchaReq) {
  return http.get<boolean>(`${BASE_URL}/mail?email=${email}&captchaVerification=${encodeURIComponent(captchaReq.captchaVerification || '')}`)
}

/** @desc 获取行为验证码 */
export function getBehaviorCaptcha(req: any) {
  return http.get<T.BehaviorCaptchaResp>(`${BASE_URL}/behavior`, req)
}

/** @desc 校验行为验证码 */
export function checkBehaviorCaptcha(req: any) {
  return http.post<T.CheckBehaviorCaptchaResp>(`${BASE_URL}/behavior`, req)
}
