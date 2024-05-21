<template>
  <div class="file-main">
    <a-row justify="space-between" class="file-main__search">
      <!-- 左侧区域 -->
      <a-space wrap>
        <a-dropdown>
          <a-upload :show-file-list="false" :custom-request="handleUpload">
            <template #upload-button>
              <a-button type="primary" shape="round">
                <template #icon>
                  <icon-upload />
                </template>
                <template #default>上传</template>
              </a-button>
            </template>
          </a-upload>
        </a-dropdown>

        <a-input-group>
          <a-input v-model="queryForm.name" placeholder="请输入文件名" allow-clear style="width: 200px" @change="search" />
          <a-button type="primary" @click="search">
            <template #icon>
              <icon-search />
            </template>
            <template #default>查询</template>
          </a-button>
        </a-input-group>
      </a-space>

      <!-- 右侧区域 -->
      <a-space wrap>
        <a-button v-if="isBatchMode" :disabled="!selectedFileIds.length" type="primary" status="danger"
          @click="handleMulDelete">
          <template #icon>
            <icon-delete />
          </template>
        </a-button>
        <a-button type="primary" @click="isBatchMode = !isBatchMode">
          <template #icon>
            <icon-select-all />
          </template>
          <template #default>{{ isBatchMode ? '取消批量' : '批量操作' }}</template>
        </a-button>
        <a-button-group>
          <a-tooltip content="视图">
            <a-button class="gi_hover_btn-border" @click="toggleMode">
              <template #icon>
                <icon-list v-if="mode === 'grid'" />
                <icon-apps v-else />
              </template>
            </a-button>
          </a-tooltip>
        </a-button-group>
      </a-space>
    </a-row>

    <!-- 文件列表-宫格模式 -->
    <a-spin id="fileMain" class="file-main__list" :loading="loading">
      <FileGrid v-show="fileList.length && mode === 'grid'" :data="fileList" :is-batch-mode="isBatchMode"
        :selected-file-ids="selectedFileIds" @click="handleClickFile" @select="handleSelectFile"
        @right-menu-click="handleRightMenuClick"></FileGrid>

      <!-- 文件列表-列表模式 -->
      <FileList v-show="fileList.length && mode === 'list'" :data="fileList" :is-batch-mode="isBatchMode"
        :selected-file-ids="selectedFileIds" @click="handleClickFile" @select="handleSelectFile"
        @right-menu-click="handleRightMenuClick"></FileList>

      <a-empty v-if="!fileList.length" />
    </a-spin>
    <div class="pagination">
      <a-pagination v-bind="pagination" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message, Modal, type RequestOption } from '@arco-design/web-vue'
import { api as viewerApi } from 'v-viewer'
import {
  openFileDetailModal,
  openFileRenameModal,
  previewFileAudioModal,
  previewFileVideoModal
} from '../../components/index'
import FileGrid from './FileGrid.vue'
import useFileManage from './useFileManage'
import { useTable } from '@/hooks'
import { type FileItem, type FileQuery, deleteFile, listFile, uploadFile } from '@/apis'
import { ImageTypes } from '@/constant/file'
import 'viewerjs/dist/viewer.css'
import { downloadByUrl } from '@/utils/downloadFile'

const FileList = defineAsyncComponent(() => import('./FileList.vue'))
const route = useRoute()
const { mode, selectedFileIds, toggleMode, addSelectedFileItem } = useFileManage()

const queryForm = reactive<FileQuery>({
  name: undefined,
  type: route.query.type?.toString() !== '0' ? route.query.type?.toString() : undefined,
  sort: ['updateTime,desc']
})
const paginationOption = reactive({
  defaultPageSize: 30,
  defaultSizeOptions: [30, 40, 50, 100, 120]
})
const isBatchMode = ref(false)
const {
  tableData: fileList,
  loading,
  pagination,
  search
} = useTable((page) => listFile({ ...queryForm, ...page }), { immediate: false, paginationOption })

// 点击文件
const handleClickFile = (item: FileItem) => {
  if (ImageTypes.includes(item.extension)) {
    if (item.url) {
      const imgList: string[] = fileList.value.filter((i) => ImageTypes.includes(i.extension)).map((a) => a.url || '')
      const index = imgList.findIndex((i) => i === item.url)
      if (imgList.length) {
        viewerApi({
          options: {
            initialViewIndex: index
          },
          images: imgList
        })
      }
    }
  }
  if (item.extension === 'mp4') {
    previewFileVideoModal(item)
  }
  if (item.extension === 'mp3') {
    previewFileAudioModal(item)
  }
}

// 右键菜单
const handleRightMenuClick = async (mode: string, fileInfo: FileItem) => {
  if (mode === 'delete') {
    Modal.warning({
      title: '提示',
      content: `是否确定删除文件 [${fileInfo.name}]？`,
      hideCancel: false,
      okButtonProps: { status: 'danger' },
      onOk: async () => {
        await deleteFile(fileInfo.id)
        Message.success('删除成功')
        search()
      }
    })
  } else if (mode === 'rename') {
    openFileRenameModal(fileInfo, search)
  } else if (mode === 'detail') {
    openFileDetailModal(fileInfo)
  } else if (mode === 'download') {
    const res = await downloadByUrl({
      url: fileInfo.url,
      target: '_self',
      fileName: `${fileInfo.name}.${fileInfo.extension}`
    })
    res ? Message.success('下载成功') : Message.error('下载失败')
    search()
  }
}

// 勾选文件
const handleSelectFile = (item: FileItem) => {
  addSelectedFileItem(item)
}

// 批量删除
const handleMulDelete = () => {
  Modal.warning({
    title: '提示',
    content: `是否确定删除所选的${selectedFileIds.value.length}个文件？`,
    hideCancel: false,
    onOk: async () => {
      await deleteFile(selectedFileIds.value)
      Message.success('删除成功')
      search()
    }
  })
}

// 上传
const handleUpload = (options: RequestOption) => {
  const controller = new AbortController()
    ; (async function requestWrap() {
    const { onProgress, onError, onSuccess, fileItem, name = 'file' } = options
    onProgress(20)
    const formData = new FormData()
    formData.append(name as string, fileItem.file as Blob)
    try {
      const res = await uploadFile(formData)
      Message.success('上传成功')
      onSuccess(res)
      search()
    } catch (error) {
      onError(error)
    }
  })()
  return {
    abort() {
      controller.abort()
    }
  }
}

onBeforeRouteUpdate((to) => {
  if (!to.query.type) return
  if (to.query.type === '0') {
    queryForm.type = undefined
  } else {
    queryForm.type = to.query.type?.toString()
  }

  search()
})

onMounted(() => {
  search()
})
</script>

<style lang="scss" scoped>
.file-main {
  height: 100%;
  background: var(--color-bg-1);
  border-radius: $radius-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__search {
    border-bottom: 1px dashed var(--color-border-3);
    margin: 16px $padding 0;
  }

  &__list {
    flex: 1;
    padding: 0 $padding $padding;
    box-sizing: border-box;
    // overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .pagination {
    padding: 0 var(--padding) var(--padding);

    :deep(.arco-pagination) {
      justify-content: end;
    }
  }
}
</style>
