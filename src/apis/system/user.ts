import type * as T from './type'
import http from '@/utils/http'

const BASE_URL = '/system/user'

/** @desc 查询用户列表 */
export function listUser(query: T.UserPageQuery) {
  return http.get<PageRes<T.UserResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询所有用户列表 */
export function listAllUser(query: Partial<T.UserPageQuery>) {
  return http.get<T.UserResp[]>(`${BASE_URL}/list`, query)
}

/** @desc 查询用户详情 */
export function getUser(id: string) {
  return http.get<T.UserDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增用户 */
export function addUser(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改用户 */
export function updateUser(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除用户 */
export function deleteUser(id: string) {
  return http.del(`${BASE_URL}`, { ids: [id] })
}

/** @desc 导出用户 */
export function exportUser(query: T.UserQuery) {
  return http.download(`${BASE_URL}/export`, query)
}

/** @desc 下载用户导入模板 */
export function downloadUserImportTemplate() {
  return http.download(`${BASE_URL}/import/template`)
}

/** @desc 解析用户导入数据 */
export function parseImportUser(data: FormData) {
  return http.post(`${BASE_URL}/import/parse`, data)
}

/** @desc 导入用户 */
export function importUser(data: any) {
  return http.post(`${BASE_URL}/import`, data)
}

/** @desc 重置密码 */
export function resetUserPwd(data: any, id: string) {
  return http.patch(`${BASE_URL}/${id}/password`, data)
}

/** @desc 分配角色 */
export function updateUserRole(data: { roleIds: string[] }, id: string) {
  return http.patch(`${BASE_URL}/${id}/role`, data)
}
