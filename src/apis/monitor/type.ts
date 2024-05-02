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
export interface OnlineUserQuery {
  nickname?: string
  loginTime?: string
  sort: Array<string>
}
export interface OnlineUserPageQuery extends OnlineUserQuery, PageQuery {}

/** 系统日志类型 */
export interface LogResp {
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
export interface LogDetailResp extends LogResp {
  traceId: string
  requestUrl: string
  requestMethod: string
  requestHeaders: string
  requestBody: string
  statusCode: number
  responseHeaders: string
  responseBody: string
}
export interface LogQuery {
  description?: string
  module?: string
  ip?: string
  createUserString?: string
  createTime: Array<string>
  status?: number
  sort: Array<string>
}
export interface LogPageQuery extends LogQuery, PageQuery {}
