<template>
  <div class="ocr-file-panel">
    <a-card :bordered="false" :body-style="{ padding: 0 }" class="ocr-file-panel__card">
      <!-- 面包屑 -->
      <div class="ocr-file-panel__breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item @click="handleBreadcrumbClick({ name: 'OCR 文件', path: OCR_TARGET_DIR })">
            OCR 文件
          </a-breadcrumb-item>
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumbList"
            :key="index"
            @click="handleBreadcrumbClick(item)"
          >
            {{ item.name }}
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <!-- 工具栏 -->
      <div class="ocr-file-panel__toolbar">
        <a-dropdown trigger="click">
          <a-button type="primary" size="small">
            <template #icon><icon-upload /></template>
            导入文件
          </a-button>
          <template #content>
            <a-upload :show-file-list="false" :custom-request="handleUpload" style="display: block;">
              <template #upload-button>
                <a-button type="text" style="width: 100%; text-align: left;">普通上传</a-button>
              </template>
            </a-upload>
            <a-button type="text" style="width: 100%; text-align: left;" @click="multipartVisible = true">
              分片上传
            </a-button>
            <a-divider style="margin: 0;" />
            <a-button type="text" style="width: 100%; text-align: left;" @click="showCreateDirModal">
              <template #icon><icon-folder /></template>
              新建文件夹
            </a-button>
          </template>
        </a-dropdown>
      </div>

      <!-- 文件列表 -->
      <a-spin class="ocr-file-panel__list" :loading="loading">
        <OcrFileList
          v-show="fileList.length && mode === 'list'"
          :data="fileList"
          @click="handleClickFile"
          @dblclick="handleDblclickFile"
          @right-menu-click="handleRightMenuClick"
        />
        <OcrFileGrid
          v-show="fileList.length && mode === 'grid'"
          :data="fileList"
          @click="handleClickFile"
          @dblclick="handleDblclickFile"
          @right-menu-click="handleRightMenuClick"
        />
        <a-empty v-if="!fileList.length && !loading" description="暂无文件，可上传或新建文件夹" />
      </a-spin>

      <div class="ocr-file-panel__footer">
        <a-button type="text" size="small" @click="toggleMode">
          <template #icon><icon-list v-if="mode === 'grid'" /><icon-apps v-else /></template>
          切换视图
        </a-button>
      </div>
    </a-card>

    <!-- 分片上传 -->
    <a-modal v-model:visible="multipartVisible" title="分片上传" :width="1100" :footer="false" @close="search">
      <MultipartUpload
        v-if="multipartVisible"
        :root-path="queryForm.parentPath ?? OCR_TARGET_DIR"
        :chunk-size="5 * 1024 * 1024"
        :max-concurrent-files="3"
      />
    </a-modal>

    <!-- 新建文件夹 -->
    <a-modal v-model:visible="createDirVisible" title="新建文件夹" @ok="handleCreateDir" @cancel="createDirVisible = false">
      <a-input v-model="newDirName" placeholder="请输入文件夹名称" allow-clear />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { Message, Modal, type RequestOption } from '@arco-design/web-vue'
import OcrFileList from './OcrFileList.vue'
import OcrFileGrid from './OcrFileGrid.vue'
import {
  openFileDetailModal,
  openFileRenameModal,
} from '@/views/system/file/components/index'
import { createDir, deleteFile, listFile, uploadFile } from '@/apis/system/file'
import type { FileItem, FileQuery } from '@/apis/system'
import { ImageTypes } from '@/constant/file'
import { useTable } from '@/hooks'
import { downloadByUrl } from '@/utils/downloadFile'
import MultipartUpload from '@/components/MultipartUpload/index.vue'

defineOptions({ name: 'OcrFilePanel' })

/** OCR 文件存储根目录，与系统其他文件隔离 */
const OCR_TARGET_DIR = '/ocr-files'

const emit = defineEmits<{
  (e: 'select-file', file: FileItem): void
}>()

const mode = ref<'grid' | 'list'>('list')
const pathNameMap = ref<Map<string, string>>(new Map())
const multipartVisible = ref(false)
const createDirVisible = ref(false)
const newDirName = ref('')

const queryForm = reactive<FileQuery & { parentPath: string }>({
  parentPath: OCR_TARGET_DIR,
  sort: ['type,asc', 'updateTime,desc'],
})

const paginationOption = reactive({ defaultPageSize: 50, defaultSizeOptions: [30, 50, 100] })
const { tableData: fileList, loading, pagination, search } = useTable(
  (page) => listFile({ ...queryForm, ...page } as any),
  { immediate: true, paginationOption },
)

const breadcrumbList = computed(() => {
  const path = queryForm.parentPath || OCR_TARGET_DIR
  if (path === OCR_TARGET_DIR) return []
  const base = OCR_TARGET_DIR.replace(/\/$/, '')
  const relative = path.startsWith(base) ? path.slice(base.length).replace(/^\//, '') : ''
  const parts = relative ? relative.split('/').filter(Boolean) : []
  return parts.map((part, index) => {
    const fullPath = parts.length === index + 1 ? path : `${base}/${parts.slice(0, index + 1).join('/')}`
    const displayName = pathNameMap.value.get(fullPath) || part
    return { name: displayName, path: fullPath }
  })
})

function handleBreadcrumbClick(item: { path: string }) {
  queryForm.parentPath = item.path
  search()
}

function toggleMode() {
  mode.value = mode.value === 'grid' ? 'list' : 'grid'
}

function showCreateDirModal() {
  newDirName.value = ''
  createDirVisible.value = true
}

async function handleCreateDir() {
  if (!newDirName.value?.trim()) {
    Message.warning('请输入文件夹名称')
    return
  }
  await createDir(queryForm.parentPath || OCR_TARGET_DIR, newDirName.value.trim())
  Message.success('创建成功')
  createDirVisible.value = false
  newDirName.value = ''
  search()
}

function handleClickFile(item: FileItem) {
  if (item.type === 0) return
  const ext = item.extension?.toLowerCase()
  if (ext === 'pdf' || ImageTypes.includes(ext)) {
    emit('select-file', item)
  }
}

function handleDblclickFile(item: FileItem) {
  if (item.type === 0) {
    const path = `${item.parentPath === '/' ? '' : item.parentPath}/${item.name}`
    pathNameMap.value.set(path, item.originalName)
    queryForm.parentPath = path
    search()
  } else {
    const ext = item.extension?.toLowerCase()
    if (ext === 'pdf' || ImageTypes.includes(ext)) {
      emit('select-file', item)
    }
  }
}

function handleRightMenuClick(action: string, fileInfo: FileItem) {
  if (action === 'delete') {
    Modal.warning({
      title: '提示',
      content: `是否确定删除${fileInfo.type === 0 ? '文件夹' : '文件'}「${fileInfo.originalName}」？`,
      hideCancel: false,
      okButtonProps: { status: 'danger' },
      onOk: async () => {
        await deleteFile([fileInfo.id])
        Message.success('删除成功')
        search()
      },
    })
  } else if (action === 'rename') {
    openFileRenameModal(fileInfo, search)
  } else if (action === 'detail') {
    openFileDetailModal(fileInfo)
  } else if (action === 'download' && fileInfo.type !== 0) {
    downloadByUrl({
      url: fileInfo.url,
      target: '_self',
      fileName: fileInfo.originalName,
    }).then((res) => {
      res ? Message.success('下载成功') : Message.error('下载失败')
    })
  }
}

function handleUpload(options: RequestOption) {
  const { onProgress, onError, onSuccess, fileItem, name = 'file' } = options
  onProgress(20)
  const formData = new FormData()
  formData.append('parentPath', queryForm.parentPath || OCR_TARGET_DIR)
  formData.append(name as string, fileItem.file as Blob)
  uploadFile(formData)
    .then((res) => {
      Message.success('上传成功')
      onSuccess(res)
      search()
    })
    .catch(onError)
}
</script>

<style scoped lang="scss">
.ocr-file-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__card {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    :deep(.arco-card-body) {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  }

  &__breadcrumb {
    padding: 8px 12px;
    border-bottom: 1px solid var(--color-border-2);
    background: var(--color-bg-2);

    :deep(.arco-breadcrumb-item) {
      cursor: pointer;
      &:hover { color: var(--color-primary); }
    }
  }

  &__toolbar {
    padding: 8px 12px;
    border-bottom: 1px solid var(--color-border-2);
  }

  &__list {
    flex: 1;
    overflow: auto;
    padding: 8px;
  }

  &__footer {
    padding: 4px 8px;
    border-top: 1px solid var(--color-border-2);
  }
}
</style>
