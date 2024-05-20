/** 图形验证码类型 */
export interface ImageCaptchaResp {
  uuid: string
  img: string
  expireTime: number
}

/** 仪表盘访问趋势类型 */
export interface DashboardAccessTrendResp {
  date: string
  pvCount: number
  ipCount: number
}

/** 仪表盘公告类型 */
export interface DashboardNoticeResp {
  id: number
  title: string
  type: number
}

/* 行为验证码类型 */
export interface BehaviorCaptchaResp {
  originalImageBase64: string
  point: {
    x: number
    y: number
  }
  jigsawImageBase64: string
  token: string
  secretKey: string
  wordList: string[]
}

export interface CheckBehaviorCaptchaResp {
  repCode: string
  repMsg: string
}
