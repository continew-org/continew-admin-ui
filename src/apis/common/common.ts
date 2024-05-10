import type { TreeNodeData } from '@arco-design/web-vue'
import http from '@/utils/http'
import type { LabelValueState } from '@/types/global'
import type { OptionQuery } from '@/apis'

const BASE_URL = '/common'

/** @desc 查询部门树 */
export function listDeptTree(query: { description: string }) {
  return http.get<TreeNodeData[]>(`${BASE_URL}/tree/dept`, query)
}

/** @desc 查询菜单树 */
export function listMenuTree(query: { description: string }) {
  return http.get<TreeNodeData[]>(`${BASE_URL}/tree/menu`, query)
}

/** @desc 查询角色列表 */
export function listRoleDict(query?: { name: string, status: number }) {
  return http.get<LabelValueState[]>(`${BASE_URL}/dict/role`, query)
}

/** @desc 查询字典列表 */
export function listCommonDict(code: string) {
  return http.get<LabelValueState[]>(`${BASE_URL}/dict/${code}`)
}

/** @desc 查询参数列表 */
export function listOptionDict(query: OptionQuery) {
  return http.get<LabelValueState[]>(`${BASE_URL}/dict/option`, query)
}

/** @desc 上传文件 */
export function uploadFile(data: FormData) {
  return http.post(`${BASE_URL}/file`, data)
}
