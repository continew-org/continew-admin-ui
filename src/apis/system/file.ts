import type * as System from './type'
import http from '@/utils/http'

const BASE_URL = '/system/file'

/** @desc 查询文件列表 */
export function listFile(query: System.FilePageQuery) {
  return http.get<PageRes<System.FileItem[]>>(`${BASE_URL}`, query)
}

/** @desc 修改文件 */
export function updateFile(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除文件 */
export function deleteFile(ids: string | Array<string>) {
  return http.del(`${BASE_URL}/${ids}`)
}

/** @desc 查询文件资源统计统计 */
export function getFileStatistics() {
  return http.get<System.FileStatisticsResp>(`${BASE_URL}/statistics`)
}
