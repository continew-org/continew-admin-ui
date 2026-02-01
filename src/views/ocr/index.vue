<template>
  <a-row align="stretch" :gutter="14" class="ocr-page">
    <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="5" :xxl="4" flex="20%" class="ocr-page__aside">
      <OcrFilePanel @select-file="onSelectFile" />
    </a-col>
    <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="9" :xxl="8" flex="40%" class="ocr-page__preview">
      <PdfViewer
        :pdf-url="currentPdfUrl"
        :image-url="currentImageUrl"
        @start-ocr="handleStartOcr"
      />
    </a-col>
    <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="10" :xxl="12" flex="40%" class="ocr-page__result">
      <OcrResultPanel ref="ocrResultRef" @update-loading="updateOcrLoading" />
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import OcrFilePanel from './components/OcrFilePanel.vue'
import PdfViewer from './components/PdfViewer.vue'
import OcrResultPanel from './components/OcrResultPanel.vue'
import type { FileItem } from '@/apis/system'
import { ImageTypes } from '@/constant/file'

defineOptions({ name: 'Ocr' })

const currentPdfUrl = ref<string | null>(null)
const currentImageUrl = ref<string | null>(null)
const ocrResultRef = ref<InstanceType<typeof OcrResultPanel>>()

function onSelectFile(file: FileItem) {
  if (!file?.url) {
    currentPdfUrl.value = null
    currentImageUrl.value = null
    ocrResultRef.value?.clearResult()
    return
  }
  const ext = file.extension?.toLowerCase()
  if (ext === 'pdf') {
    currentPdfUrl.value = file.url
    currentImageUrl.value = null
  } else if (ImageTypes.includes(ext)) {
    currentImageUrl.value = file.url
    currentPdfUrl.value = null
  } else {
    currentPdfUrl.value = null
    currentImageUrl.value = null
  }
  ocrResultRef.value?.clearResult()
}

function handleStartOcr(fileData: string | string[], fileType: number) {
  ocrResultRef.value?.startOcr(fileData, fileType)
}

function updateOcrLoading() {
  // 可以在这里添加全局加载状态的更新逻辑
}
</script>

<style scoped lang="scss">
.ocr-page {
  flex: 1;
  padding: $margin;
  overflow: hidden;
  min-height: 0;
  height: 100%;

  .arco-col {
    min-height: 0;
    overflow: hidden;
    height: 100%;
  }

  &__aside,
  &__preview,
  &__result {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
}
</style>
