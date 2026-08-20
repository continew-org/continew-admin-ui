<template>
  <a-modal
    v-model:visible="visible"
    :width="width >= 1350 ? 1350 : '100%'"
    :on-before-close="onClose"
    :footer="false"
    esc-to-close="esc-to-close"
    @close="onClose"
  >
    <template #title>
      {{ modalTitle }}
      <div class="toolbar">
        <a-tooltip position="tl" content="在新标签页打开">
          <icon-launch style="cursor: pointer" @click="onOpen" />
        </a-tooltip>
      </div>
    </template>
    <a-spin :loading="loading" class="w-full mt--10">
      <a-card class="preview-content">
        <VueOfficePdf
          v-if="filePreview.fileInfo?.fileType === 'pdf'"
          :src="filePreview.fileInfo?.data"
          class="h-full"
          @rendered="renderedHandler"
          @error="errorHandler"
        />
        <VueOfficeDocx
          v-else-if="WordTypes.includes(filePreview.fileInfo?.fileType || '')"
          :src="filePreview.fileInfo?.data"
          class="h-full"
          @rendered="renderedHandler"
          @error="errorHandler"
        />
        <VueOfficeExcel
          v-else-if="ExcelTypes.includes(filePreview.fileInfo?.fileType || '')"
          :src="filePreview.fileInfo?.data"
          style="height: 80vh; width: 100%"
          :options="filePreview.excelConfig"
          @rendered="renderedHandler"
          @error="errorHandler"
        />
      </a-card>
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import VueOfficePdf from '@vue-office/pdf'
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import type { FilePreview } from '@/components/FilePreview/type'
import { ExcelTypes, WordTypes } from '@/constant/file'

const visible = ref<boolean>(false)
const loading = ref<boolean>(false)
const { width } = useWindowSize()

// 用于关闭弹框时销毁,释放内存
const blobUrl = ref<string>('')

// 文件预览对象
const filePreview = reactive<FilePreview>({
  fileInfo: {},
  excelConfig: {},
})
// 弹框标题
const modalTitle = computed(() => {
  const { fileName } = filePreview.fileInfo || {}
  // fileName 已经包含扩展名，直接显示
  return fileName || '文件预览'
})

// 预览
const onPreview = (previewInfo: FilePreview) => {
  filePreview.fileInfo = previewInfo.fileInfo
  visible.value = true
  loading.value = true
}

const renderedHandler = () => {
  loading.value = false
}
const errorHandler = () => {
  loading.value = false
  Message.error('文件加载失败')
}

// 新标签页打开
const onOpen = () => {
  const data = filePreview.fileInfo?.data

  if (!data) {
    console.error('没有数据提供')
    return
  }

  let url: string | null = null

  if (typeof data === 'string') {
    // 如果是字符串，假设它是一个 URL，直接使用
    url = data
  } else if (data instanceof Blob || data instanceof ArrayBuffer) {
    // 如果之前创建了 Blob URL，先释放
    if (blobUrl.value) {
      URL.revokeObjectURL(blobUrl.value)
    }

    // 如果是 Blob 或 ArrayBuffer，则将其转换为 Blob
    const blob = data instanceof Blob ? data : new Blob([data])
    url = URL.createObjectURL(blob)
    blobUrl.value = url
  } else {
    console.error('不支持的类型')
    return
  }

  // 打开生成的 URL
  window.open(url)
}
// 关闭弹框
const onClose = () => {
  Object.assign(filePreview, {
    fileInfo: {},
    excelConfig: {},
  })
  loading.value = false
  visible.value = false

  // 关闭时释放 Blob URL
  if (blobUrl.value) {
    URL.revokeObjectURL(blobUrl.value)
    blobUrl.value = ''
  }
}

onUnmounted(() => {
  if (blobUrl.value) {
    URL.revokeObjectURL(blobUrl.value)
  }
})

defineExpose({ onPreview })
</script>

<style scoped lang="scss">
.h-full {
  height: 100vh;
}

.card {
  background: white !important;
  padding-bottom: 5px;
}

.toolbar {
  position: absolute;
  float: right;
  right: 50px;
  top: 10px;
}
</style>
