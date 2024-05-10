import type * as System from './type'
import http from '@/utils/http'

const BASE_URL = '/system/dept'

/** @desc 查询部门列表 */
export function listDept(query: System.DeptQuery) {
  return http.get<System.DeptResp[]>(`${BASE_URL}/tree`, query)
}

/** @desc 查询部门详情 */
export function getDept(id: string) {
  return http.get<System.DeptResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增部门 */
export function addDept(data: any) {
  return http.post<boolean>(`${BASE_URL}`, data)
}

/** @desc 修改部门 */
export function updateDept(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除部门 */
export function deleteDept(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出部门 */
export function exportDept(query: System.DeptQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
