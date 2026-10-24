/** 在线用户类型 */
export interface OnlineUserResp {
  id: number
  sessionId: string
  username: string
  nickname: string
  clientType: string
  clientId: string
  ip: string
  address: string
  browser: string
  os: string
  loginTime: string
  lastRefreshTime: string
  /** 最后活跃时间（只统计业务请求，不含 WebSocket 消息与令牌刷新） */
  lastActiveTime: string
  /** 会话到期时间（绝对有效期） */
  sessionExpireTime: string
  /** 预计因闲置失效的时间，未配置闲置失效时为 null */
  idleExpireTime: string | null
  /** 是否已闲置超时（服务端判定，不要用本地时钟比较） */
  idleExpired: boolean
  /** 是否在线 */
  online: boolean
  /** 最后活跃时间是否精确，false 表示按最近刷新时间推算 */
  activeTimeExact: boolean
}
export interface OnlineUserQuery {
  nickname?: string
  loginTime?: string
  /** 是否在线，不传表示不过滤 */
  online?: boolean
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
