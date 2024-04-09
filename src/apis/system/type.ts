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
export interface LogQuery extends PageQuery {
  description?: string
  module?: string
  ip?: string
  createUserString?: string
  createTime?: string
  status?: number
}
