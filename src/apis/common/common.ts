import http from '@/utils/http'
import type { LabelValueState } from '@/types/global'
import type { TreeNodeData } from '@arco-design/web-vue'

const BASE_URL = '/common'

/** @desc 查询部门树 */
export function listDeptTree(query: { description: string }) {
  return http.get<TreeNodeData[]>(`${BASE_URL}/tree/dept`, query)
}

/** @desc 查询角色列表 */
export function listRoleDict(query?: { name: string; status: number }) {
  return http.get<LabelValueState[]>(`${BASE_URL}/dict/role`, query)
}

/** @desc 查询字典列表 */
export function listCommonDict(code: string) {
  return http.get<LabelValueState[]>(`${BASE_URL}/dict/${code}`)
}
