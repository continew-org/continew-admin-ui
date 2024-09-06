import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/role'

/** @desc 查询角色列表 */
export function listRole(query: T.RolePageQuery) {
  return http.get<PageRes<T.RoleResp[]>>(`${BASE_URL}`, query)
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
