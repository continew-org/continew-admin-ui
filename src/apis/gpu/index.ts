import request from '@/utils/http'

export interface GpuBalanceInfo {
  recharge: number
  monthlyUsage: number
}

export interface GpuStats {
  total: number
  used: number
  idle: number
  usageRate: number
}

export interface GpuOverviewResp {
  balance: GpuBalanceInfo
  stats: GpuStats
}

export interface GpuServerNode {
  id: string
  name: string
  gpus: Array<0 | 1>
}

export interface GpuAllocationItem {
  name: string
  gpuCount: number
}

export interface GpuVramPoint {
  timestamp: string
  usagePercent: number
}

export interface GpuTasksParams {
  page: number
  size: number
}

export interface GpuTaskItem {
  id: string
  name: string
  model: string
  gpuCount: number
  status: 'pending' | 'running' | 'completed' | 'failed'
  startTime: string
  progress: number
}

export interface GpuTasksResp {
  list: GpuTaskItem[]
  total: number
}

export interface CreateGpuTaskReq {
  name: string
  model: string
  gpuCount: number
}

export const getGpuOverview = () => {
  return request.get<GpuOverviewResp>('/gpu/dashboard/overview')
}

export const getGpuServers = () => {
  return request.get<GpuServerNode[]>('/gpu/dashboard/servers')
}

export const getGpuAllocation = () => {
  return request.get<GpuAllocationItem[]>('/gpu/dashboard/allocation')
}

export const getGpuVramHistory = (params: { limit: number }) => {
  return request.get<GpuVramPoint[]>('/gpu/dashboard/vram/history', { params })
}

export const getGpuVramSnapshot = () => {
  return request.get<GpuVramPoint>('/gpu/dashboard/vram/snapshot')
}

export const getGpuTasks = (params: GpuTasksParams) => {
  return request.get<GpuTasksResp>('/gpu/tasks', { params })
}

export const createGpuTask = (data: CreateGpuTaskReq) => {
  return request.post('/gpu/tasks', data)
}

export const startGpuTask = (taskId: string) => {
  return request.post(`/gpu/tasks/${taskId}/start`)
}

export const stopGpuTask = (taskId: string) => {
  return request.post(`/gpu/tasks/${taskId}/stop`)
}

export const deleteGpuTask = (taskId: string) => {
  return request.del(`/gpu/tasks/${taskId}`)
}

