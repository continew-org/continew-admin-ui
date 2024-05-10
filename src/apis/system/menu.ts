import type * as System from './type'
import http from '@/utils/http'

const BASE_URL = '/system/menu'

/** @desc 查询菜单列表 */
export function listMenu(query: System.MenuQuery) {
  return http.get<System.MenuResp[]>(`${BASE_URL}/tree`, query)
}

/** @desc 查询菜单详情 */
export function getMenu(id: string) {
  return http.get<System.MenuResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增菜单 */
export function addMenu(data: any) {
  return http.post<boolean>(`${BASE_URL}`, data)
}

/** @desc 修改菜单 */
export function updateMenu(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除菜单 */
export function deleteMenu(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}
