/** 任务类型 */
export interface JobResp {
  id: number
  groupName: string
  jobName: string
  description?: string
  triggerType: number
  triggerInterval: string | number
  executorType: number
  taskType: number
  executorInfo: string
  argsStr?: string
  argsType?: string
  routeKey: number
  blockStrategy: number
  executorTimeout: number
  maxRetryTimes: number
  retryInterval: number
  parallelNum: number
  jobStatus: number
  nextTriggerAt?: Date
  createDt?: Date
  updateDt?: Date
}
export interface JobQuery {
  groupName: string
  jobName?: string
  jobStatus?: number
}
export interface JobPageQuery extends JobQuery, PageQuery {}

/** 任务日志类型 */
export interface JobLogResp {
  id: number
  groupName: string
  jobName: string
  jobId: number
  taskBatchStatus: number
  operationReason: number
  executorType: number
  executorInfo: string
  executionAt: string
  createDt: string
}
export interface JobLogQuery {
  jobId?: number
  groupName?: string
  jobName?: string
  taskBatchStatus?: number
  datetimeRange?: Array<string>
}
export interface JobLogPageQuery extends JobLogQuery, PageQuery {}

/** 任务实例类型 */
export interface JobInstanceResp {
  id: number
  groupName: string
  jobId: number
  taskBatchId: number
  taskStatus: number
  retryCount: number
  resultMessage: string
  clientInfo: string
}
export interface JobInstanceQuery {
  jobId?: string | number
  taskBatchId?: number | string
}

/** 任务实例日志类型 */
export interface JobInstanceLogResp {
  id: number
  message: any[]
  finished: number
  fromIndex: number
  nextStartId: number
}
export interface JobInstanceLogQuery {
  taskBatchId: number
  jobId: number
  taskId: number
  startId: number
  fromIndex: number
  size: number
}
