import http from '@/utils/http'

const BASE_URL = '/system/smsRecord'

export interface SmsRecordResp {
  id: string
  configId: string
  phone: string
  params: string
  status: string
  resMsg: string
  createUser: string
  createTime: string
  updateUser: string
  updateTime: string
  createUserString: string
  updateUserString: string
  disabled: boolean
}
export interface SmsRecordDetailResp {
  id: string
  configId: string
  phone: string
  params: string
  status: string
  resMsg: string
  createUser: string
  createTime: string
  updateUser: string
  updateTime: string
  createUserString: string
  updateUserString: string
}
export interface SmsRecordQuery {
  configId: string | undefined
  phone: string | undefined
  status: string | undefined
  sort: Array<string>
}
export interface SmsRecordPageQuery extends SmsRecordQuery, PageQuery {}

/** @desc 查询短信记录列表 */
export function listSmsRecord(query: SmsRecordPageQuery) {
  return http.get<PageRes<SmsRecordResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询短信记录详情 */
export function getSmsRecord(id: string) {
  return http.get<SmsRecordDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增短信记录 */
export function addSmsRecord(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改短信记录 */
export function updateSmsRecord(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除短信记录 */
export function deleteSmsRecord(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出短信记录 */
export function exportSmsRecord(query: SmsRecordQuery) {
  return http.download(`${BASE_URL}/export`, query)
}
