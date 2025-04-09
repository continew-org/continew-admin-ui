import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/role'

/** @desc 查询角色列表 */
export function listRole(query: T.RoleQuery) {
  return http.get<T.RoleResp[]>(`${BASE_URL}/list`, query)
}

/** @desc 查询角色详情 */
export function getRole(id: string) {
  return http.get<T.RoleDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增角色 */
export function addRole(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改角色 */
export function updateRole(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除角色 */
export function deleteRole(ids: string | Array<string>) {
  return http.del(`${BASE_URL}/${ids}`)
}

/** @desc 修改角色权限 */
export function updateRolePermission(id: string, data: any) {
  return http.put(`${BASE_URL}/${id}/permission`, data)
}

/** @desc 查询角色关联用户 */
export function listRoleUser(id: string, query: T.RoleUserPageQuery) {
  return http.get<PageRes<T.RoleUserResp[]>>(`${BASE_URL}/${id}/user`, query)
}

/** @desc 分配角色给用户 */
export function assignToUsers(id: string, userIds: Array<string>) {
  return http.post(`${BASE_URL}/${id}/user`, userIds)
}

/** @desc 取消分配角色给用户 */
export function unassignFromUsers(userRoleIds: Array<string | number>) {
  return http.del(`${BASE_URL}/user`, userRoleIds)
}

/** @desc 查询角色关联用户 ID */
export function listRoleUserId(id: string) {
  return http.get(`${BASE_URL}/${id}/user/id`)
}
