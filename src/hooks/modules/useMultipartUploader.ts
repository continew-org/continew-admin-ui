// 分片上传通用 hooks，支持多文件/多分片并发、暂停、恢复、取消、重试等
import { computed, onUnmounted, ref } from 'vue'
import { throttle } from 'lodash-es'
import { Message } from '@arco-design/web-vue'
import {
  cancelUpload,
  completeMultipartUpload,
  initMultipartUpload,
  uploadPart,
} from '@/apis/system/multipart-upload'

// 文件上传任务对象类型
export interface FileTask {
  uid: string // 唯一标识
  file: File // 文件对象
  relativePath: string // 相对路径（支持文件夹结构）
  parentPath: string // 文件夹根路径
  status: 'waiting' | 'uploading' | 'paused' | 'completed' | 'failed' | 'cancelled' // 状态
  progress: number // 上传进度（0-1）
  uploadedChunks: number[] // 已上传分片编号
  totalChunks: number // 总分片数
  chunkSize: number // 分片大小（由后端返回）
  fileName: string // 文件名
  fileType: string // 文件类型
  fileSize: number // 文件大小
  fileMd5?: string // 文件MD5
  uploadId?: string // 分片上传ID
  path?: string // 文件路径（由后端返回）
  partETags: Array<{ partNumber: number, eTag: string }> // 分片ETag列表
  errorMessage?: string // 错误信息
  abortController?: AbortController // 请求中断控制器
  _uploading?: boolean // 标记是否正在上传（内部控制）
  _pause?: () => void // 暂停方法
  _resume?: () => void // 继续方法
  _cancel?: () => void // 取消方法
  _retryCount?: Map<number, number> // 分片重试次数记录
}

/**
 * useMultipartUploader - 通用分片上传 hooks
 * @param props.maxConcurrentFiles   最大同时上传文件数（全局并发）
 * @param props.maxConcurrentChunks  每个文件分片上传最大并发数
 * @param props.maxUploadWorkers     最大上传Worker数量（基于CPU核心数）
 * @returns 上传相关响应式状态与操作方法
 */
export function useMultipartUploader(props: {
  maxConcurrentFiles?: number
  maxConcurrentChunks?: number
  maxUploadWorkers?: number
  rootPath?: string
}) {
  // 获取CPU核心数，用于控制Worker数量
  const getCpuCores = () => {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
      return navigator.hardwareConcurrency
    }
    return 2 // 默认2个核心
  }

  // 所有上传任务列表
  const fileTasks = ref<FileTask[]>([])
  // 当前正在上传的文件数量
  const uploadingCount = computed(() => fileTasks.value.filter((t) => t.status === 'uploading').length)
  // 最大并发上传文件数
  const maxConcurrent = computed(() => props.maxConcurrentFiles ?? getCpuCores())
  // 每个文件分片上传最大并发数
  const maxChunkConcurrent = computed(() => props.maxConcurrentChunks ?? getCpuCores())
  // 最大上传Worker数量
  const maxUploadWorkers = computed(() => props.maxUploadWorkers ?? getCpuCores() / 2)

  // 本地队列管理
  const uploadQueue = ref<Array<{ task: FileTask, chunkNumber: number }>>([])
  const activeUploads = ref<Set<string>>(new Set()) // 正在上传的分片ID集合

  const md5CalculatingTaskUid = ref<string | null>(null) // MD5计算中的任务ID
  const performanceStats = ref<{
    md5StartTime: number
    md5EndTime: number
    uploadStartTime: number
    uploadEndTime: number
    totalTime: number
  } | null>(null)

  // MD5 Worker实例
  let md5Worker: Worker | null = null

  /** 节流的进度更新函数 */
  const updateTaskProgress = throttle((task: FileTask, totalChunks: number) => {
    const currentFinishedChunks = task.uploadedChunks.length
    if (totalChunks > 0) {
      task.progress = Number(Math.min(currentFinishedChunks / totalChunks, 1).toFixed(2))
    } else {
      task.progress = 0
    }
  }, 150)

  /**
   * 初始化MD5 Worker
   */
  function initMd5Worker() {
    if (typeof Worker !== 'undefined' && !md5Worker) {
      // eslint-disable-next-line no-console
      console.log('[Hooks] 初始化MD5 Worker...')
      md5Worker = new Worker(new URL('../../utils/md5-worker.ts', import.meta.url), { type: 'module' })
      md5Worker.onmessage = function (e) {
        const { type, taskId, md5, error } = e.data

        if (type === 'complete' && md5) {
          const task = fileTasks.value.find((t) => t.uid === taskId)
          if (task) {
            task.fileMd5 = md5
            md5CalculatingTaskUid.value = null
            // eslint-disable-next-line no-console
            console.log(`[Hooks] MD5计算完成: ${task.fileName}, MD5: ${md5}`)
          }
        } else if (type === 'error') {
          console.error('MD5计算失败:', error)
          md5CalculatingTaskUid.value = null
        }
      }
    }
  }

  /**
   * 计算文件MD5（使用Web Worker - 优化版本）
   */
  function calcFileMd5(file: File, taskUid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!md5Worker) {
        initMd5Worker()
      }

      if (md5Worker) {
        md5CalculatingTaskUid.value = taskUid

        // 记录MD5计算开始时间
        performanceStats.value = {
          md5StartTime: Date.now(),
          md5EndTime: 0,
          uploadStartTime: 0,
          uploadEndTime: 0,
          totalTime: 0,
        }

        // 根据文件大小动态调整分块和分片大小（优化：使用更小的分片以降低内存占用）
        let blockSize: number
        let chunkSize: number

        if (file.size > 500 * 1024 * 1024) {
          // 超大文件（> 500MB）
          blockSize = 50 * 1024 * 1024 // 50MB块
          chunkSize = 5 * 1024 * 1024 // 5MB分片
        } else if (file.size > 100 * 1024 * 1024) {
          // 大文件（100MB - 500MB）
          blockSize = 30 * 1024 * 1024 // 30MB块
          chunkSize = 3 * 1024 * 1024 // 3MB分片
        } else if (file.size > 10 * 1024 * 1024) {
          // 中等文件（10MB - 100MB）
          blockSize = 10 * 1024 * 1024 // 10MB块
          chunkSize = 1 * 1024 * 1024 // 1MB分片
        } else {
          // 小文件（< 10MB）
          blockSize = 5 * 1024 * 1024 // 5MB块
          chunkSize = 512 * 1024 // 512KB分片
        }

        // eslint-disable-next-line no-console
        console.log(`[Hooks] 发送文件到Worker: ${file.name}, 大小: ${(file.size / 1024 / 1024).toFixed(2)}MB, 块大小: ${(blockSize / 1024 / 1024).toFixed(2)}MB, 分片大小: ${(chunkSize / 1024 / 1024).toFixed(2)}MB`)

        md5Worker.postMessage({
          file,
          taskId: taskUid,
          blockSize,
          chunkSize,
        })

        // 监听完成事件
        const handleComplete = (e: MessageEvent) => {
          const { type, taskId, md5 } = e.data
          if (type === 'complete' && taskId === taskUid) {
            md5Worker?.removeEventListener('message', handleComplete)

            // 记录MD5计算结束时间
            if (performanceStats.value) {
              performanceStats.value.md5EndTime = Date.now()
              const md5Time = performanceStats.value.md5EndTime - performanceStats.value.md5StartTime
              // eslint-disable-next-line no-console
              console.log(`MD5计算完成，耗时: ${md5Time}ms，文件大小: ${formatFileSize(file.size)}`)
            }

            resolve(md5)
          }
        }

        md5Worker.addEventListener('message', handleComplete)
      } else {
        reject(new Error('Web Worker not supported'))
      }
    })
  }

  /**
   * 添加分片到上传队列
   */
  function addChunkToQueue(task: FileTask, chunkNumber: number) {
    const chunkId = `${task.uid}-${chunkNumber}`
    if (!activeUploads.value.has(chunkId)) {
      uploadQueue.value.push({ task, chunkNumber })
      // eslint-disable-next-line no-console
      console.log(`添加分片到队列: ${task.fileName} - 分片${chunkNumber}`)
      processUploadQueue()
    }
  }

  /**
   * 处理上传队列 - 优化版本
   */
  function processUploadQueue() {
    // eslint-disable-next-line no-console
    console.log(`[Hooks] 处理上传队列，队列长度: ${uploadQueue.value.length}, 活跃上传数: ${activeUploads.value.size}`)
    // 智能队列处理：优先处理小文件的分片，避免大文件阻塞
    const sortedQueue = [...uploadQueue.value].sort((a, b) => {
      // 优先处理已完成更多分片的文件
      const aProgress = a.task.uploadedChunks.length / a.task.totalChunks
      const bProgress = b.task.uploadedChunks.length / b.task.totalChunks
      return bProgress - aProgress
    })

    while (sortedQueue.length > 0 && activeUploads.value.size < maxUploadWorkers.value) {
      const { task, chunkNumber } = sortedQueue.shift()!
      const chunkId = `${task.uid}-${chunkNumber}`

      // eslint-disable-next-line no-console
      console.log(`[Hooks] 检查分片: ${task.fileName} - 分片${chunkNumber}, 任务状态: ${task.status}`)
      if (task.status === 'uploading' && !activeUploads.value.has(chunkId)) {
        // eslint-disable-next-line no-console
        console.log(`[Hooks] 开始上传分片: ${task.fileName} - 分片${chunkNumber}`)
        activeUploads.value.add(chunkId)
        uploadChunk(task, chunkNumber)

        // 从原始队列中移除已处理的项目
        const index = uploadQueue.value.findIndex((item) =>
          item.task.uid === task.uid && item.chunkNumber === chunkNumber,
        )
        if (index > -1) {
          uploadQueue.value.splice(index, 1)
        }
      } else {
        // eslint-disable-next-line no-console
        console.log(`[Hooks] 跳过分片: ${task.fileName} - 分片${chunkNumber}, 原因: 状态不是uploading或已在活跃上传中`)
      }
    }
  }

  /**
   * 上传单个分片
   */
  async function uploadChunk(task: FileTask, chunkNumber: number) {
    const chunkId = `${task.uid}-${chunkNumber}`

    try {
      const start = (chunkNumber - 1) * task.chunkSize
      const end = Math.min(start + task.chunkSize, task.fileSize)
      const chunkBlob = task.file.slice(start, end)

      // 创建 AbortController 用于中断请求
      if (!task.abortController) {
        task.abortController = new AbortController()
      }

      const res = await uploadPart({
        uploadId: task.uploadId!,
        partNumber: chunkNumber,
        file: chunkBlob,
        path: task.path!,
      }, task.abortController.signal)

      // 检查上传是否成功
      if (res.data && res.data.success) {
        // 保存ETag
        task.partETags.push({
          partNumber: chunkNumber,
          eTag: res.data.partETag,
        })

        // 更新已上传分片列表
        if (!task.uploadedChunks.includes(chunkNumber)) {
          task.uploadedChunks.push(chunkNumber)
        }

        updateTaskProgress(task, task.totalChunks)

        // 检查是否所有分片都上传完成
        if (task.uploadedChunks.length >= task.totalChunks) {
          await completeMultipartUpload({
            uploadId: task.uploadId!,
            partETags: task.partETags,
          })
          task.status = 'completed'
          task.progress = 1
          startNextTasks()
        }
      } else {
        // 上传失败，抛出错误
        const errorMessage = res.data?.errorMessage || '分片上传失败'
        throw new Error(`分片${chunkNumber}上传失败: ${errorMessage}`)
      }
    } catch (error) {
      // 检查是否是取消请求导致的错误
      if (error instanceof Error && error.name === 'AbortError') {
        // eslint-disable-next-line no-console
        console.log(`分片上传被取消: ${task.fileName} - 分片${chunkNumber}`)
        return
      }

      console.error(`分片上传失败: ${task.fileName} - 分片${chunkNumber}`, error)

      // 检查任务是否已经被取消或暂停
      if (task.status === 'cancelled' || task.status === 'paused') {
        // eslint-disable-next-line no-console
        console.log(`任务 ${task.fileName} 已被取消或暂停，跳过错误处理`)
        return
      }

      // 检查是否是网络错误或服务器错误
      const isNetworkError = error instanceof TypeError
        || (error as any)?.message?.includes('Network')
        || (error as any)?.message?.includes('fetch')

      const isServerError = (error as any)?.response?.status >= 500
        || (error as any)?.response?.status === 429

      if (isNetworkError || isServerError) {
        // 初始化重试计数器
        if (!task._retryCount) {
          task._retryCount = new Map()
        }

        const currentRetryCount = task._retryCount.get(chunkNumber) || 0
        const maxRetries = 3 // 最大重试3次

        if (currentRetryCount < maxRetries) {
          // 网络错误或服务器错误，将分片重新加入队列进行重试
          // eslint-disable-next-line no-console
          console.log(`分片 ${chunkNumber} 上传失败，第${currentRetryCount + 1}次重试: ${task.fileName}`)

          // 更新重试次数
          task._retryCount.set(chunkNumber, currentRetryCount + 1)

          // 延迟重试，避免立即重试
          setTimeout(() => {
            if (task.status === 'uploading' && !activeUploads.value.has(chunkId)) {
              addChunkToQueue(task, chunkNumber)
            }
          }, 2000 * (currentRetryCount + 1)) // 递增延迟：2秒、4秒、6秒
        } else {
          // 超过最大重试次数，标记任务失败
          // eslint-disable-next-line no-console
          console.log(`分片 ${chunkNumber} 重试次数超过限制，标记任务失败: ${task.fileName}`)
          task.status = 'failed'
          task.errorMessage = `分片 ${chunkNumber} 重试次数超过限制`

          // 清理队列中该任务的所有分片
          uploadQueue.value = uploadQueue.value.filter((item) => item.task.uid !== task.uid)

          // 清理正在上传的分片
          const activeChunkIds = Array.from(activeUploads.value).filter((id) => id.startsWith(task.uid))
          activeChunkIds.forEach((id) => activeUploads.value.delete(id))

          // 启动下一个任务
          startNextTasks()
        }
      } else {
        // 其他错误（如认证错误、参数错误等），标记任务失败
        // eslint-disable-next-line no-console
        console.log(`任务 ${task.fileName} 遇到不可恢复的错误，标记为失败`)
        task.status = 'failed'
        task.errorMessage = (error as Error)?.message || '上传失败'

        // 清理队列中该任务的所有分片
        uploadQueue.value = uploadQueue.value.filter((item) => item.task.uid !== task.uid)

        // 清理正在上传的分片
        const activeChunkIds = Array.from(activeUploads.value).filter((id) => id.startsWith(task.uid))
        activeChunkIds.forEach((id) => activeUploads.value.delete(id))

        // 启动下一个任务
        startNextTasks()
      }
    } finally {
      activeUploads.value.delete(chunkId)
      processUploadQueue() // 继续处理队列
    }
  }

  /**
   * 分片上传核心逻辑，处理单个文件的分片上传、并发、暂停、恢复、取消等
   * @param task FileTask
   */
  async function uploadFileTask(task: FileTask) {
    try {
      // eslint-disable-next-line no-console
      console.log(`[Hooks] 开始上传任务: ${task.fileName}, 当前状态: ${task.status}`)
      // 1. 初始化分片上传，获取 uploadId
      if (!task.uploadId) {
        // eslint-disable-next-line no-console
        console.log(`[Hooks] 任务 ${task.fileName} 没有 uploadId，准备调用 initMultipartUpload`)
        // 若没有MD5，先计算
        if (!task.fileMd5) {
          // eslint-disable-next-line no-console
          console.log(`[Hooks] 任务 ${task.fileName} 没有 MD5，开始计算...`)
          task.fileMd5 = await calcFileMd5(task.file, task.uid)
        }

        // eslint-disable-next-line no-console
        console.log(`[Hooks] 调用 initMultipartUpload: ${task.fileName}, MD5: ${task.fileMd5}, 路径: ${task.parentPath}`)

        // 确保parentPath不是空字符串，如果是则使用"/"
        const parentPath = task.parentPath && task.parentPath !== '' ? task.parentPath : '/'

        try {
          const res = await initMultipartUpload({
            fileName: task.fileName,
            fileSize: task.fileSize,
            fileMd5: task.fileMd5,
            parentPath,
            metaData: {
              contentType: task.fileType,
              originalName: task.fileName,
            },
          })

          if (res && res.data) {
            // eslint-disable-next-line no-console
            console.log(`[Hooks] initMultipartUpload 成功: ${task.fileName}, uploadId: ${res.data.uploadId}`)
            task.uploadId = res.data.uploadId
            task.chunkSize = res.data.partSize
            task.path = res.data.path

            // 处理断点续传：如果后端返回了已上传的分片编号
            if (res.data.uploadedPartNumbers && res.data.uploadedPartNumbers.length > 0) {
              // eslint-disable-next-line no-console
              console.log(`[Hooks] 发现已上传分片: ${task.fileName}, 已上传分片: ${res.data.uploadedPartNumbers.join(',')}`)
              // 将已上传的分片编号添加到任务中
              task.uploadedChunks = [...res.data.uploadedPartNumbers]

              // 计算当前进度
              const totalChunks = Math.ceil(task.fileSize / task.chunkSize)
              updateTaskProgress(task, totalChunks)

              // eslint-disable-next-line no-console
              console.log(`[Hooks] 断点续传进度: ${task.fileName}, 进度: ${(task.progress * 100).toFixed(1)}%`)
            }
          } else {
            throw new Error('初始化分片上传失败：服务器返回数据为空')
          }
        } catch (error: any) {
          // 处理特定错误类型
          const errorMsg = error?.response?.data?.message || error?.message || '未知错误'

          if (errorMsg.includes('文件名已存在')) {
            task.status = 'failed'
            task.errorMessage = '文件名已存在'
            Message.error(`文件 "${task.fileName}" 已存在，请勿重复上传`)
          } else if (errorMsg.includes('不支持的文件类型')) {
            task.status = 'failed'
            task.errorMessage = '不支持的文件类型'
            Message.error(`文件 "${task.fileName}" 类型不支持`)
          } else {
            task.status = 'failed'
            task.errorMessage = `初始化失败: ${errorMsg}`
            Message.error(`文件 "${task.fileName}" 上传失败：${errorMsg}`)
          }

          task._uploading = false
          startNextTasks()
          return
        }
      }

      // 2. 计算总分片数
      const totalChunks = Math.ceil(task.fileSize / task.chunkSize)
      task.totalChunks = totalChunks

      // eslint-disable-next-line no-console
      console.log(`[Hooks] 计算总分片数: ${task.fileName}, 总分片数: ${totalChunks}, 分片大小: ${task.chunkSize}`)

      // 检查是否有断点续传的分片
      const hasResumeData = task.uploadedChunks.length > 0

      if (!hasResumeData) {
        // 如果没有断点续传数据，重新初始化
        task.uploadedChunks = []
        task.partETags = []
        task.progress = 0
      } else {
        // 有断点续传数据，计算当前进度
        // eslint-disable-next-line no-console
        console.log(`[Hooks] 发现断点续传数据: ${task.fileName}, 已上传分片: ${task.uploadedChunks.join(',')}`)
        updateTaskProgress(task, task.totalChunks)
      }

      // 将所有未完成的分片添加到队列
      // eslint-disable-next-line no-console
      console.log(`[Hooks] 开始添加分片到队列: ${task.fileName}`)
      for (let i = 1; i <= totalChunks; i++) {
        // 只添加未上传的分片
        if (!task.uploadedChunks.includes(i)) {
          addChunkToQueue(task, i)
        }
      }
      // eslint-disable-next-line no-console
      console.log(`[Hooks] 分片添加完成: ${task.fileName}, 队列长度: ${uploadQueue.value.length}`)

      // 挂载暂停/取消控制方法到 task
      task._pause = () => {
        task.status = 'paused'
        // 暂停时清空队列中该任务的分片
        uploadQueue.value = uploadQueue.value.filter((item) => item.task.uid !== task.uid)
        // 清理正在上传的分片
        const activeChunkIds = Array.from(activeUploads.value).filter((id) => id.startsWith(task.uid))
        activeChunkIds.forEach((id) => activeUploads.value.delete(id))
      }

      task._resume = () => {
        if (task.status === 'paused') {
          task.status = 'uploading'
          // 重新添加未完成的分片到队列
          for (let i = 1; i <= task.totalChunks; i++) {
            if (!task.uploadedChunks.includes(i)) {
              addChunkToQueue(task, i)
            }
          }
        }
      }

      task._cancel = () => {
        task.status = 'cancelled'
        // 中断所有正在进行的请求
        if (task.abortController) {
          task.abortController.abort()
        }
        // 清空队列中该任务的分片
        uploadQueue.value = uploadQueue.value.filter((item) => item.task.uid !== task.uid)
        // 清理正在上传的分片
        const activeChunkIds = Array.from(activeUploads.value).filter((id) => id.startsWith(task.uid))
        activeChunkIds.forEach((id) => activeUploads.value.delete(id))
        if (task.uploadId) {
          cancelUpload({ uploadId: task.uploadId })
        }
      }
    } catch (error: any) {
      // 捕获并处理所有未处理的异常
      const errorMsg = error?.message || '未知错误'
      // eslint-disable-next-line no-console
      console.error(`[Hooks] 上传任务异常: ${task.fileName}, 错误: ${errorMsg}`, error)

      if (task.status !== 'failed') {
        task.status = 'failed'
        task.errorMessage = `上传失败: ${errorMsg}`
      }

      task._uploading = false
      startNextTasks()
    }
  }

  /**
   * 启动下一个可用的上传任务（受最大并发数限制）
   */
  function startNextTasks() {
    let available = maxConcurrent.value - uploadingCount.value
    for (const task of fileTasks.value) {
      if (available <= 0) break
      if ((task.status === 'waiting' || task.status === 'uploading') && !task._uploading) {
        task.status = 'uploading'
        task._uploading = true
        available--
        uploadFileTask(task)
      }
    }
  }

  /**
   * 全部开始上传（将所有 waiting 状态任务置为 uploading 并启动并发上传）
   */
  function startAllUpload() {
    // eslint-disable-next-line no-console
    console.log('[Hooks] 开始上传按钮被点击，准备启动所有等待中的任务')
    // eslint-disable-next-line no-console
    console.log('[Hooks] 当前任务列表:', fileTasks.value.map((t) => ({ name: t.fileName, status: t.status })))
    for (const task of fileTasks.value) {
      if (task.status === 'waiting' || task.status === 'paused') {
        task._uploading = false // 标记尚未调度
        // 如果是暂停状态，需要重新激活
        if (task.status === 'paused') {
          task.status = 'uploading'
        }
      }
    }
    startNextTasks()
  }

  /**
   * 添加文件/文件夹到上传队列
   * @param files File[]
   * @param parentPath 父目录
   * @param isFolder 是否为文件夹
   */
  function addFiles(files: File[], parentPath: string, isFolder = false) {
    // 验证文件的有效性
    const validFiles = files.filter((file) => {
      if (!file) {
        return false
      }
      if (file.size === 0) {
        return false
      }
      if (!file.name || file.name.trim() === '') {
        return false
      }
      return true
    })

    if (validFiles.length === 0) {
      return
    }

    // 检测文件名重复（同一目录下文件名不能重复）
    const duplicateFileKeys = new Set<string>()
    const newFileKeys = new Set<string>()
    const fileKeyMap = new Map<File, string>()

    for (const file of validFiles) {
      const relativePath = (file as any).webkitRelativePath || '/'
      let parent = ''

      if (isFolder) {
        if (relativePath && relativePath !== '/') {
          parent = props.rootPath || parentPath || '/'
          if (parent.length > 1 && parent.endsWith('/')) {
            parent = parent.slice(0, -1)
          }
          const pathParts = relativePath.split('/')
          pathParts.pop()
          const folderPath = pathParts.join('/')
          if (folderPath) {
            parent = `${parent}/${folderPath}`
          }
        } else {
          parent = props.rootPath || parentPath || '/'
        }
      } else {
        parent = props.rootPath || parentPath || '/'
      }

      if (parent.length > 1 && parent.endsWith('/')) {
        parent = parent.slice(0, -1)
      }

      const fileKey = `${parent}/${file.name}`
      fileKeyMap.set(file, fileKey)

      // 检查是否与已有任务重复
      const existsInTasks = fileTasks.value.some(
        (task) => task.parentPath === parent && task.fileName === file.name,
      )

      // 检查是否与本次添加的文件重复
      const existsInNewFiles = newFileKeys.has(fileKey)

      if (existsInTasks || existsInNewFiles) {
        duplicateFileKeys.add(fileKey)
      } else {
        newFileKeys.add(fileKey)
      }
    }

    // 如果有重复文件，提示用户并跳过
    if (duplicateFileKeys.size > 0) {
      const duplicateNames = [...duplicateFileKeys].map((k) => k.split('/').pop()).join(', ')
      Message.warning(`以下文件已存在，已跳过：${duplicateNames}`)
      // 过滤掉重复的文件（基于完整路径）
      const uniqueFiles = validFiles.filter((file) => !duplicateFileKeys.has(fileKeyMap.get(file)!))
      if (uniqueFiles.length === 0) {
        return
      }
      // 继续处理不重复的文件
      validFiles.length = 0
      validFiles.push(...uniqueFiles)
    }

    for (const file of validFiles) {
      const relativePath = (file as any).webkitRelativePath || '/'
      let parent = ''

      // 调试：查看 webkitRelativePath 的实际内容
      // eslint-disable-next-line no-console
      console.log('文件路径调试:', {
        fileName: file.name,
        webkitRelativePath: relativePath,
        isFolder,
      })

      if (isFolder) {
        // 文件夹上传：如果有webkitRelativePath，则路径为 rootPath + webkitRelativePath
        // 如果没有webkitRelativePath，则路径为 rootPath
        if (relativePath && relativePath !== '/') {
          // 有webkitRelativePath的情况，例如：folder/file.txt
          parent = props.rootPath || parentPath || '/'
          // 确保路径格式正确，去除结尾的斜杠
          if (parent.length > 1 && parent.endsWith('/')) {
            parent = parent.slice(0, -1)
          }

          // 从 webkitRelativePath 中提取文件夹路径（去掉文件名）
          const pathParts = relativePath.split('/')
          // 去掉最后一个部分（文件名），只保留文件夹路径
          pathParts.pop()
          const folderPath = pathParts.join('/') // 重新组合文件夹路径

          // 组合路径：rootPath + 文件夹路径
          if (folderPath) {
            parent = `${parent}/${folderPath}`
          }
        } else {
          // 没有webkitRelativePath的情况，直接使用rootPath
          parent = props.rootPath || parentPath || '/'
        }
      } else {
        // 普通文件上传：直接使用rootPath
        parent = props.rootPath || parentPath || '/'
      }

      // 去除 parentPath 结尾的 /
      if (parent.length > 1 && parent.endsWith('/')) {
        parent = parent.slice(0, -1)
      }

      // 确保路径不以双斜杠开头
      if (parent.startsWith('//')) {
        parent = parent.substring(1)
      }

      // eslint-disable-next-line no-console
      console.log('最终路径:', {
        fileName: file.name,
        parentPath: parent,
        relativePath,
      })

      const task: FileTask = {
        uid: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        file,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        relativePath,
        parentPath: parent,
        status: 'waiting',
        progress: 0,
        uploadedChunks: [],
        totalChunks: 0,
        chunkSize: 0, // 初始化时设为0，后续由后端返回
        fileMd5: '',
        path: '', // 初始化时设为空，后续由后端返回
        partETags: [],
        errorMessage: '', // 初始化错误信息
        abortController: new AbortController(), // 初始化请求中断控制器
        _retryCount: new Map(), // 初始化重试计数器
      }

      // 立即开始计算MD5，但不自动开始上传
      calcFileMd5(file, task.uid).then((md5) => {
        task.fileMd5 = md5
      }).catch((_error) => {
        task.status = 'failed'
      })

      fileTasks.value.push(task)
    }
  }

  // 暂停单个任务
  function pauseTask(task: FileTask) {
    // eslint-disable-next-line no-console
    console.log(`暂停任务: ${task.fileName}`)
    task._pause?.()
  }

  // 恢复单个任务
  function resumeTask(task: FileTask) {
    // eslint-disable-next-line no-console
    console.log(`[Hooks] 继续任务: ${task.fileName}, 当前状态: ${task.status}`)
    task._resume?.()
    if (task.status === 'paused') {
      task._uploading = false
      startNextTasks()
    }
  }

  // 取消单个任务
  function cancelTask(task: FileTask) {
    // eslint-disable-next-line no-console
    console.log(`取消任务: ${task.fileName}`)

    // 中断所有正在进行的请求
    if (task.abortController) {
      task.abortController.abort()
      // eslint-disable-next-line no-console
      console.log(`已中断任务 ${task.fileName} 的所有请求`)
    }

    task._cancel?.()
  }

  // 启动单个任务
  function startTask(task: FileTask) {
    if (task.status === 'waiting') {
      task.status = 'uploading'
      task._uploading = false
      startNextTasks()
    }
  }

  // 失败重试单个任务
  function retryTask(task: FileTask) {
    if (task.status === 'failed') {
      task.status = 'uploading'
      task.progress = 0
      // 重试时保留已上传的分片信息，支持断点续传
      // task.uploadedChunks = [] // 注释掉，保留断点续传数据
      // task.partETags = [] // 注释掉，保留断点续传数据
      task._uploading = false
      task._retryCount = new Map() // 重置重试计数器
      task.errorMessage = '' // 清除错误信息
      task.abortController = new AbortController() // 重新创建请求中断控制器
      startNextTasks()
    }
  }

  // 清空所有上传任务
  function clearAllTasks() {
    fileTasks.value = []
  }

  // 删除单个任务
  function removeTask(task: FileTask) {
    // 先取消任务
    if (task.status === 'uploading' || task.status === 'waiting' || task.status === 'paused') {
      task._cancel?.()
    }
    // 清理队列中的分片
    uploadQueue.value = uploadQueue.value.filter((item) => item.task.uid !== task.uid)
    // 清理正在上传的分片
    const activeChunkIds = Array.from(activeUploads.value).filter((id) => id.startsWith(task.uid))
    activeChunkIds.forEach((id) => activeUploads.value.delete(id))
    // 从任务列表中移除
    fileTasks.value = fileTasks.value.filter((t) => t.uid !== task.uid)
  }

  // 文件大小格式化工具
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
  }

  // 组件销毁时，终止所有上传任务和Worker
  onUnmounted(() => {
    fileTasks.value.forEach((task) => {
      if (task.status === 'uploading' || task.status === 'waiting' || task.status === 'paused') {
        pauseTask(task)
      }
    })

    if (md5Worker) {
      md5Worker.terminate()
      md5Worker = null
    }
  })

  return {
    fileTasks,
    uploadingCount,
    maxConcurrent,
    maxChunkConcurrent,
    uploadFileTask,
    startNextTasks,
    startAllUpload,
    addFiles,
    pauseTask,
    resumeTask,
    cancelTask,
    startTask,
    retryTask,
    clearAllTasks,
    removeTask,
    formatFileSize,
    md5CalculatingTaskUid,
  }
}
