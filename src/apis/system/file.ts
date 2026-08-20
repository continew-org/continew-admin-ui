import type { AxiosRequestConfig } from 'axios'
import type * as T from './type'
import http from '@/utils/http'

export type * from './type'

const BASE_URL = '/system/file'
const RECYCLE_URL = `${BASE_URL}/recycle`

/** @desc 上传文件 */
export function uploadFile(data: FormData, config?: AxiosRequestConfig) {
  return http.post<T.FileUploadResp>(`${BASE_URL}/upload`, data, config)
}

/** @desc 查询默认存储上传配置 */
export function getDefaultUploadConfig() {
  return http.get<T.FileUploadConfigResp>(`${BASE_URL}/upload/config/default`)
}

/** @desc 查询单文件上传进度 */
export function getUploadProgress(uploadTaskId: string) {
  return http.get<T.FileUploadProgressResp>(`${BASE_URL}/upload/progress/${uploadTaskId}`)
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

/** @desc 查询回收站文件列表 */
export function listRecycleFiles(query: T.FilePageQuery) {
  return http.get<PageRes<T.FileItem[]>>(`${RECYCLE_URL}`, query)
}

/** @desc 还原回收站文件 */
export function restoreRecycleFile(id: string) {
  return http.put(`${RECYCLE_URL}/restore/${id}`)
}

/** @desc 删除回收站文件 */
export function deleteRecycleFile(id: string) {
  return http.del(`${RECYCLE_URL}/${id}`)
}

/** @desc 清空回收站 */
export function cleanRecycleBin() {
  return http.del(`${RECYCLE_URL}/clean`)
}
