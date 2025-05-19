import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/file'

/** @desc 上传文件 */
export function uploadFile(data: FormData) {
  return http.post(`${BASE_URL}/upload`, data)
}

/** @desc 查询文件列表 */
export function listFile(query: T.FilePageQuery) {
  return http.get<PageRes<T.FileItem[]>>(`${BASE_URL}`, query)
}

/** @desc 修改文件 */
export function updateFile(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除文件 */
export function deleteFile(ids: string[]) {
  return http.del(`${BASE_URL}`, { ids })
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
export function createDir(parentPath: string, name: string) {
  return http.post<T.FileItem>(`${BASE_URL}/dir`, { parentPath, originalName: name })
}

/** @desc 查询文件夹大小 */
export function calcDirSize(id: string) {
  return http.get<T.FileDirCalcSizeResp>(`${BASE_URL}/dir/${id}/size`)
}
