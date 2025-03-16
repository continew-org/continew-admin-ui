import http from '@/utils/http'

const BASE_URL = '/system/smsConfig'

export interface SmsConfigResp {
  id: string
  name: string
  supplier: string
  accessKeyId: string
  accessKeySecret: string
  signature: string
  templateId: string
  weight: string
  retryInterval: string
  maxRetries: string
  maximum: string
  supplierConfig: string
  isEnable: string
  createUser: string
  createTime: string
  updateUser: string
  updateTime: string
  createUserString: string
  updateUserString: string
  disabled: boolean
}
export interface SmsConfigDetailResp {
  id: string
  name: string
  supplier: string
  accessKeyId: string
  accessKeySecret: string
  signature: string
  templateId: string
  weight: string
  retryInterval: string
  maxRetries: string
  maximum: string
  supplierConfig: string
  isEnable: string
  createUser: string
  createTime: string
  updateUser: string
  updateTime: string
  createUserString: string
  updateUserString: string
}
export interface SmsConfigQuery {
  name: string | undefined
  supplier: string | undefined
  accessKeyId: string | undefined
  signature: string | undefined
  templateId: string | undefined
  isEnable: string | undefined
  sort: Array<string>
}
export interface SmsConfigPageQuery extends SmsConfigQuery, PageQuery {}

/** @desc 查询短信服务配置列表 */
export function listSmsConfig(query: SmsConfigPageQuery) {
  return http.get<PageRes<SmsConfigResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询短信服务配置详情 */
export function getSmsConfig(id: string) {
  return http.get<SmsConfigDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增短信服务配置 */
export function addSmsConfig(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改短信服务配置 */
export function updateSmsConfig(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除短信服务配置 */
export function deleteSmsConfig(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出短信服务配置 */
export function exportSmsConfig(query: SmsConfigQuery) {
  return http.download(`${BASE_URL}/export`, query)
}
