import type * as Tool from './type'
import http from '@/utils/http'

const BASE_URL = '/generator'

/** @desc 查询代码生成列表 */
export function listGenerator(query: Tool.TablePageQuery) {
  return http.get<PageRes<Tool.TableResp[]>>(`${BASE_URL}/table`, query)
}

/** @desc 查询字段配置列表 */
export function listFieldConfig(tableName: string, requireSync: boolean) {
  return http.get<Tool.FieldConfigResp[]>(`${BASE_URL}/field/${tableName}?requireSync=${requireSync}`)
}

/** @desc 查询生成配置信息 */
export function getGenConfig(tableName: string) {
  return http.get<Tool.GenConfigResp>(`${BASE_URL}/config/${tableName}`)
}

/** @desc 保存配置信息 */
export function saveGenConfig(tableName: string, req: Tool.GeneratorConfigResp) {
  return http.post(`${BASE_URL}/config/${tableName}`, req)
}

/** @desc 生成预览 */
export function genPreview(tableName: string) {
  return http.get<Tool.GeneratePreviewResp[]>(`${BASE_URL}/preview/${tableName}`)
}

/** @desc 生成代码 */
export function generate(tableNames: Array<string>) {
  return http.requestNative({
    url: `${BASE_URL}/${tableNames}`,
    method: 'post',
    responseType: 'blob'
  })
}
