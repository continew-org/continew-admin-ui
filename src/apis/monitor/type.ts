/** 在线用户类型 */
export interface OnlineUserResp {
  id: string
  description: string
  module: string
  timeTaken: number
  ip: string
  address: string
  browser: string
  os: string
  status: number
  errorMsg: string
  createUserString: string
  createTime: string
}

export interface OnlineUserQuery extends PageQuery {
  nickname?: string
  loginTime?: string
}
