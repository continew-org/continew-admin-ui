import http from '@/utils/http'
import type * as Common from './type'

const BASE_URL = '/captcha'

/** @desc 获取图片验证码 */
export function getImageCaptcha() {
  return http.get<Common.ImageCaptchaResp>(`${BASE_URL}/img`)
}