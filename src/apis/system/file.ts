import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/file'

/** @desc 查询文件列表 */
export function listFile(query: T.FilePageQuery) {
  return http.get<PageRes<T.FileItem[]>>(`${BASE_URL}`, query)
}

/** @desc 修改文件 */
export function updateFile(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除文件 */
export function deleteFile(id: string) {
  return http.del(`${BASE_URL}`, { ids: [id] })
}

/** @desc 查询文件资源统计统计 */
export function getFileStatistics() {
  return http.get<T.FileStatisticsResp>(`${BASE_URL}/statistics`)
}

/** @desc 根据sha256检测文件是否已经在服务器存在 */
export function checkFile(sha256: string) {
  return http.get<T.FileItem>(`${BASE_URL}/check`, { fileHash: sha256 })
}

/** @desc 创建文件夹 */
export function createDir(path: string, name: string) {
  return http.post<T.FileItem>(`${BASE_URL}/createDir`, { parentPath: path, name })
}
