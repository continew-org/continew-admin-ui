/** 系统部门类型 */
export interface DeptResp {
  id: string
  name: string
  sort: number
  status: 1 | 2
  isSystem: boolean
  description: string
  createUserString: string
  createTime: string
  updateUserString: string
  updateTime: string
  parentId: string
  children: DeptResp[]
}
export interface DeptQuery {
  description?: string
  status?: number
  sort?: Array<string>
}

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
// 系统日志分页查询条件
export interface PageLogQuery extends PageQuery,LogQuery{}
// 系统日志查询条件
export interface LogQuery{
  description?: string
  module?: string
  ip?: string
  createUserString?: string
  createTime?: string
  status?: number
}

/** 系统存储类型 */
export type StorageResp = {
  id: string
  name: string
  code: string
  type: number
  accessKey: string
  secretKey: string
  endpoint: string
  bucketName: string
  domain: string
  description: string
  isDefault: boolean
  sort: number
  status: number
  createUserString: string
  createTime: string
  updateUserString: string
  updateTime: string
}
export interface StorageQuery extends PageQuery {
  description?: string
  status?: number
}