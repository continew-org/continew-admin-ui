import type * as System from './type'
import http from '@/utils/http'

const BASE_URL = '/system/dict'

/** @desc 查询字典列表 */
export function listDict(query: System.DictQuery) {
  return http.get<System.DictResp[]>(`${BASE_URL}/list`, query)
}

/** @desc 查询字典详情 */
export function getDict(id: string) {
  return http.get<System.DictResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增字典 */
export function addDict(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改字典 */
export function updateDict(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除字典 */
export function deleteDict(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 查询字典项列表 */
export function listDictItem(query: System.DictItemPageQuery) {
  return http.get<PageRes<System.DictItemResp[]>>(`${BASE_URL}/item`, query)
}

/** @desc 查询字典项详情 */
export function getDictItem(id: string) {
  return http.get<System.DictItemResp>(`${BASE_URL}/item/${id}`)
}

/** @desc 新增字典项 */
export function addDictItem(data: any) {
  return http.post(`${BASE_URL}/item`, data)
}

/** @desc 修改字典项 */
export function updateDictItem(data: any, id: string) {
  return http.put(`${BASE_URL}/item/${id}`, data)
}

/** @desc 删除字典项 */
export function deleteDictItem(id: string) {
  return http.del(`${BASE_URL}/item/${id}`)
}
