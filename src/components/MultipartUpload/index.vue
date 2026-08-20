<template>
  <a-row :gutter="16" class="multipart-uploader-responsive-row">
    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div
        class="multipart-uploader-table-flex"
        :class="{ dragover: isDragOver }"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
      >
        <!-- 文件/文件夹选择和全局操作按钮 -->
        <div class="upload-select-area-flex">
          <div class="upload-btns-left">
            <a-button @click="triggerFileInput">选择文件</a-button>
            <a-button style="margin-left: 8px;" @click="triggerFolderInput">选择文件夹</a-button>
            <input ref="fileInput" type="file" multiple style="display: none" @change="onFileChange" />
            <input ref="folderInput" type="file" webkitdirectory directory style="display: none" @change="onFolderChange" />
          </div>
          <div class="upload-btns-right">
            <a-button type="primary" @click="startAllUpload">开始上传</a-button>
            <a-button style="margin-left: 8px;" status="danger" @click="clearAllTasks">清空</a-button>
          </div>
        </div>
        <div class="upload-config-overview">
          <div class="upload-config-title">默认存储上传策略</div>
          <a-spin :loading="loadingUploadConfig">
            <div v-if="defaultUploadConfig" class="upload-config-grid">
              <div class="upload-config-item"><span class="label">类型</span><span class="value">{{ storageTypeLabel }}</span></div>
              <div class="upload-config-item"><span class="label">分片阈值</span><span class="value">{{ thresholdMb }} MB</span></div>
              <div class="upload-config-item"><span class="label">分片大小</span><span class="value">{{ partSizeMb }} MB</span></div>
              <div v-if="isLocalStorage" class="upload-config-item upload-config-item-full"><span class="label">本地分片临时目录</span><span class="value">{{ defaultUploadConfig.multipartTempDir || '-' }}</span></div>
            </div>
          </a-spin>
        </div>
        <div style="margin-bottom: 8px; color: #888; font-size: 13px;">
          支持拖拽文件到此区域上传（文件夹请使用"选择文件夹"按钮）
          <br />
          <small style="color: #999;">系统会根据默认存储分片阈值自动选择单文件上传或分片上传</small>
        </div>
        <!-- 表格区域 -->
        <div class="gi-table-flex-body">
          <div class="gi-table-flex-container">
            <a-table
              :data="fileTasks"
              :columns="columns"
              row-key="uid"
              :scroll="{ y: '100%' }"
              :pagination="pagination"
              style="height: 100%; background: transparent;"
            >
              <template #progress="{ record }">
                <template v-if="md5CalculatingTaskUid === record.uid">
                  <span style="color: #888;">正在计算MD5...</span>
                </template>
                <template v-else>
                  <a-progress :percent="record.progress" :animation="true" size="large" />
                </template>
              </template>
              <template #status="{ record }">
                <div>
                  <a-tag :color="statusColor(record.status)" size="small">{{ statusText(record.status) }}</a-tag>
                  <div v-if="record.status === 'failed' && record.errorMessage" class="upload-status-error">
                    {{ record.errorMessage }}
                  </div>
                </div>
              </template>
              <template #actions="{ record }">
                <a-space>
                  <a-tooltip v-if="record.status === 'waiting'" content="开始">
                    <a-button size="mini" type="text" @click="startTask(record)"><IconPlayArrow /></a-button>
                  </a-tooltip>
                  <a-tooltip v-if="record.status === 'uploading'" content="暂停">
                    <a-button size="mini" type="text" @click="pauseTask(record)"><IconPause /></a-button>
                  </a-tooltip>
                  <a-tooltip v-if="record.status === 'paused'" content="继续">
                    <a-button size="mini" type="text" @click="resumeTask(record)"><IconPlayArrow /></a-button>
                  </a-tooltip>
                  <a-tooltip v-if="record.status === 'failed'" content="重试">
                    <a-button size="mini" type="text" @click="retryTask(record)"><IconRefresh /></a-button>
                  </a-tooltip>
                  <a-tooltip content="取消">
                    <a-button v-if="record.status !== 'completed' && record.status !== 'cancelled'" size="mini" type="text" @click="cancelTask(record)"><IconClose /></a-button>
                  </a-tooltip>
                  <a-tooltip content="删除">
                    <a-button size="mini" type="text" status="danger" @click="removeTask(record)"><IconDelete /></a-button>
                  </a-tooltip>
                </a-space>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { computed, h, onMounted, ref, resolveComponent } from 'vue'
import { IconClose, IconDelete, IconPause, IconPlayArrow, IconRefresh } from '@arco-design/web-vue/es/icon'
import { useMultipartUploader } from '@/hooks/modules/useMultipartUploader'
import { getFilesFromDataTransferItems, isFileSystemAccessAPISupported } from '@/utils/drag-drop-file-util'
import type { StorageType } from '@/apis/system/type'

// 组件props定义
const props = defineProps<{
  extraParams?: Record<string, any>
  maxConcurrentFiles?: number
  maxConcurrentChunks?: number
  maxUploadWorkers?: number
  rootPath?: string
}>()
// 文件/文件夹选择input引用
const fileInput = ref<HTMLInputElement | null>(null)
const folderInput = ref<HTMLInputElement | null>(null)
// 拖拽高亮状态
const isDragOver = ref(false)
const pagination = {
  pageSize: 10,
  showTotal: true,
  showJumper: true,
  position: ['bottomCenter'],
}

// 文件大小格式化工具
function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

// 表格列定义
const columns = [
  {
    title: '名称',
    dataIndex: 'fileName',
    ellipsis: true,
    render: ({ record }) => h(
      resolveComponent('a-tooltip'),
      { content: record.fileName, placement: 'top' },
      () => h('span', record.fileName),
    ),
  },
  {
    title: '文件目录',
    dataIndex: 'relativePath',
    ellipsis: true,
    render: ({ record }) => {
      // 显示完整路径
      const displayPath = record.parentPath

      // 确保路径格式正确
      if (record.relativePath && record.relativePath !== '/') {
        // 对于文件夹上传，relativePath格式为：folderName/file.txt
        // 我们只需要显示parentPath，因为它已经包含了正确的路径
        const pathParts = record.relativePath.split('/')
        if (pathParts.length > 1) {
          // 如果是文件夹内的文件，只显示parentPath
          // parentPath已经是/test/upload这样的格式
        }
      }

      return h(
        resolveComponent('a-tooltip'),
        { content: displayPath, placement: 'top' },
        () => h('span', displayPath),
      )
    },
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
    ellipsis: true,
    render: ({ record }) => h(
      resolveComponent('a-tooltip'),
      { content: record.fileType, placement: 'top' },
      () => h('span', record.fileType),
    ),
  },
  {
    title: '文件大小',
    dataIndex: 'fileSize',
    ellipsis: true,
    render: ({ record }) => formatFileSize(record.fileSize),
    width: 120,
  },
  { title: '进度', slotName: 'progress', width: 140 },
  { title: '状态', slotName: 'status', width: 220 },
  { title: '操作', slotName: 'actions', width: 150 },
]

// 使用 useMultipartUploader composable
const {
  fileTasks,
  uploadingCount: _uploadingCount,
  maxConcurrent: _maxConcurrent,
  maxChunkConcurrent: _maxChunkConcurrent,
  defaultUploadConfig,
  loadingUploadConfig,
  refreshDefaultUploadConfig,
  startAllUpload,
  addFiles,
  pauseTask,
  resumeTask,
  cancelTask,
  startTask,
  retryTask,
  clearAllTasks,
  removeTask,
  formatFileSize: _formatFileSize,
  md5CalculatingTaskUid,
} = useMultipartUploader({
  maxConcurrentFiles: props.maxConcurrentFiles,
  maxConcurrentChunks: props.maxConcurrentChunks,
  maxUploadWorkers: props.maxUploadWorkers,
  rootPath: props.rootPath,
})

const toMb = (bytes?: number | null) => {
  if (!bytes || bytes <= 0) return 0
  return Number((bytes / 1024 / 1024).toFixed(2))
}
const STORAGE_TYPE_LOCAL: StorageType = 1
const STORAGE_TYPE_OSS: StorageType = 2

const thresholdMb = computed(() => toMb(defaultUploadConfig.value?.multipartUploadThreshold))
const partSizeMb = computed(() => toMb(defaultUploadConfig.value?.multipartUploadPartSize))
const isLocalStorage = computed(() => defaultUploadConfig.value?.storageType === STORAGE_TYPE_LOCAL)
const storageTypeLabel = computed(() => {
  if (defaultUploadConfig.value?.storageType === STORAGE_TYPE_LOCAL) return '本地存储'
  if (defaultUploadConfig.value?.storageType === STORAGE_TYPE_OSS) return '对象存储'
  return '未知'
})

onMounted(() => {
  refreshDefaultUploadConfig()
})

// 触发文件选择
function triggerFileInput() {
  fileInput.value?.click()
}
// 触发文件夹选择
function triggerFolderInput() {
  folderInput.value?.click()
}
// 文件选择事件处理
function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  // 移除 clearAllTasks()，改为追加模式
  // 普通文件上传路径 = rootPath
  addFiles(Array.from(files), props.rootPath || '', false)
  // 不要自动 startAllUpload()
  ;(e.target as HTMLInputElement).value = ''
}
// 文件夹选择事件处理
function onFolderChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  // 移除 clearAllTasks()，改为追加模式
  // 带目录文件上传路径 = rootPath
  // 文件夹上传时，webkitRelativePath会自动包含文件夹路径
  addFiles(Array.from(files), props.rootPath || '', true)
  // 不要自动 startAllUpload()
  ;(e.target as HTMLInputElement).value = ''
}
// 拖拽进入区域
function onDragOver(_e: DragEvent) {
  isDragOver.value = true
}
// 拖拽离开区域
function onDragLeave(_e: DragEvent) {
  isDragOver.value = false
}
// 拖拽释放文件/文件夹
async function onDrop(e: DragEvent) {
  isDragOver.value = false
  e.preventDefault()

  let files: File[]
  if (isFileSystemAccessAPISupported()) {
    files = await getFilesFromDataTransferItems(e.dataTransfer!.items)
    addFiles(files, props.rootPath || '', true)
  } else {
    files = Array.from(e.dataTransfer?.files || [])
    // 验证文件的有效性
    const validFiles = files.filter((file) => {
      return !(!file || file.size === 0)
    })
    if (validFiles.length === 0) {
      return
    }
    // 检查是否有文件夹结构
    const hasFolder = validFiles.some((f) => {
      if ((f as any).webkitRelativePath) {
        return true
      }
      return f.name.includes('/') || f.name.includes('\\')
    })
    addFiles(validFiles, props.rootPath || '', hasFolder)
  }
}
// 状态文本映射
function statusText(status: string) {
  switch (status) {
    case 'waiting': return '等待中'
    case 'uploading': return '上传中'
    case 'paused': return '已暂停'
    case 'completed': return '已完成'
    case 'failed': return '失败'
    case 'cancelled': return '已取消'
    default: return status
  }
}
// 状态颜色映射
function statusColor(status: string) {
  switch (status) {
    case 'waiting': return '#909399'
    case 'uploading': return '#409EFF'
    case 'paused': return '#E6A23C'
    case 'completed': return '#67C23A'
    case 'failed': return '#F56C6C'
    case 'cancelled': return '#C0C4CC'
    default: return '#909399'
  }
}
</script>

<style lang="scss" scoped>
.multipart-uploader-table-flex {
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0000000d;
  border: 2px dashed #e5e6eb;
  transition: border-color 0.2s, background 0.2s;
  width: 100%;
  min-width: 0;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 700px;
}
.multipart-uploader-table-flex.dragover {
  border: 2px dashed #409eff;
}
.upload-select-area-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.upload-config-overview {
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--color-fill-1);
}
.upload-config-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-1);
  margin-bottom: 8px;
}
.upload-config-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px 12px;
}
.upload-config-item {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;
  color: var(--color-text-2);
}
.upload-config-item-full {
  grid-column: 1 / -1;
}
.upload-config-item .label {
  color: var(--color-text-3);
}
.upload-config-item .value {
  color: var(--color-text-1);
  word-break: break-all;
}
.upload-btns-left {
  display: flex;
  align-items: center;
}
.upload-btns-right {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.upload-select-area {
  margin-bottom: 16px;
}
.gi-table-flex-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  border-radius: 8px;
  box-shadow: 0 1px 4px #0001;
  padding: 8px 0 0 0;
}
.gi-table-flex-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  height: 100%;
  background: transparent;
}
:deep(.arco-table) {
  flex: 1;
  min-height: 400px;
  height: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
}
:deep(.arco-table-th) {
  font-weight: 500;
}
:deep(.arco-table-td) {
  max-width: 320px;
  min-width: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
:deep(.arco-table-td:nth-child(1)),
:deep(.arco-table-th:nth-child(1)) {
  min-width: 150px;
  max-width: 280px;
}
:deep(.arco-table-td:nth-child(2)),
:deep(.arco-table-th:nth-child(2)) {
  min-width: 130px;
  max-width: 220px;
}
:deep(.arco-table-td:last-child),
:deep(.arco-table-th:last-child) {
  min-width: 120px;
  max-width: 160px;
}
/* 状态列需要展示错误详情，允许换行并避免把整行撑宽 */
:deep(.arco-table-td:nth-child(6)),
:deep(.arco-table-th:nth-child(6)) {
  min-width: 160px;
  max-width: 220px;
}
:deep(.arco-table-td:nth-child(6)) {
  white-space: normal;
  overflow: visible;
}
.upload-status-error {
  margin-top: 4px;
  font-size: 12px;
  color: #f56c6c;
  line-height: 1.35;
  white-space: normal;
  word-break: break-all;
  overflow-wrap: anywhere;
}
:deep(.arco-table-element):has(tbody .arco-table-tr-empty) {
  height: 100%;
}
:deep(.arco-table-pagination) {
  margin-top: auto !important;
  padding-bottom: 8px;
}
.multipart-uploader-responsive-row {
  width: 100%;
  margin: 0;
}
@media (max-width: 1200px) {
  .multipart-uploader-table-flex {
    min-width: 100%;
    max-width: 100%;
    padding: 12px;
  }
}
@media (max-width: 900px) {
  .multipart-uploader-table-flex {
    min-width: 100%;
    max-width: 100%;
    padding: 6px;
  }
  .gi-table-flex-body {
    min-height: 200px;
    height: 300px;
    padding: 0;
  }
}
@media (max-width: 600px) {
  .multipart-uploader-table-flex {
    min-width: 100vw;
    max-width: 100vw;
    border-radius: 0;
    padding: 2px;
  }
  .gi-table-flex-body {
    min-height: 120px;
    height: 180px;
    padding: 0;
  }
  .upload-select-area-flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .upload-config-grid {
    grid-template-columns: 1fr;
  }
  .upload-btns-right {
    margin-left: 0;
  }
}
</style>
