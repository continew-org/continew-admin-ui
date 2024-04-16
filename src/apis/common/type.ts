/** 图形验证码类型 */
export interface ImageCaptchaResp {
  uuid: string
  img: string
}

/** 仪表盘访问趋势 */
export interface DashboardAccessTrendResp {
  date: string
  pvCount: number
  ipCount: number
}
