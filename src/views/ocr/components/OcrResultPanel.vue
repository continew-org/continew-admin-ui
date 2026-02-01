<template>
  <div class="ocr-result-panel">
    <a-card title="OCR 结果" :bordered="false">
      <template #extra>
        <a-space v-if="ocrResults.length > 0">
          <a-button size="small" @click="exportResult">
            <template #icon><icon-download /></template>
            导出结果
          </a-button>
          <a-button size="small" @click="clearResult">
            <template #icon><icon-delete /></template>
            清空
          </a-button>
        </a-space>
      </template>

      <a-spin :loading="loading" class="result-spin">
        <div v-if="ocrResults.length === 0 && !loading" class="empty-state">
          <a-empty description="请选择文件并点击开始识别" />
        </div>

        <div v-else class="result-content">
          <!-- 页签切换（多页 PDF） -->
          <a-tabs v-if="ocrResults.length > 1" v-model:active-key="currentPage" type="line">
            <a-tab-pane v-for="(result, index) in ocrResults" :key="index" :title="`第 ${index + 1} 页`">
              <OcrResultContent :data="result" />
            </a-tab-pane>
          </a-tabs>

          <!-- 单页结果 -->
          <OcrResultContent v-else-if="ocrResults.length === 1" :data="ocrResults[0]" />

          <!-- 原始结果（调试用） -->
          <a-collapse v-if="showRawData" class="raw-data-collapse">
            <a-collapse-item header="原始数据" key="raw">
              <pre>{{ JSON.stringify(ocrResults[currentPage], null, 2) }}</pre>
            </a-collapse-item>
          </a-collapse>
        </div>
      </a-spin>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { ocrInfer } from '@/apis/ocr'
import type { OcrPageResult } from '@/apis/ocr'
import OcrResultContent from './OcrResultContent.vue'

defineOptions({ name: 'OcrResultPanel' })

const emit = defineEmits<{
  (e: 'update-loading', loading: boolean): void
}>()

const loading = ref(false)
const ocrResults = ref<OcrPageResult[]>([])
const currentPage = ref(0)
const showRawData = ref(false)

/** 启动 OCR 识别 */
async function startOcr(fileData: string | string[], fileType: number) {
  try {
    loading.value = true
    emit('update-loading', true)

    // 处理图片
    if (fileType === 1) {
      const response = await ocrInfer({
        file: fileData as string,
        fileType: 1,
        visualize: true,
      })

      if (response.errorCode === 0 && response.result) {
        ocrResults.value = response.result.ocrResults
        Message.success(`识别成功，共 ${ocrResults.value.length} 页`)
      } else {
        Message.error(response.errorMsg || '识别失败')
      }
    }
    // 处理 PDF（多页图片数组）
    else if (fileType === 0) {
      const pages = fileData as string[]
      const results: OcrPageResult[] = []

      // 逐页识别
      for (let i = 0; i < pages.length; i++) {
        try {
          const response = await ocrInfer({
            file: pages[i],
            fileType: 1, // PDF 转换后的图片
            visualize: true,
          })

          if (response.errorCode === 0 && response.result && response.result.ocrResults.length > 0) {
            results.push(response.result.ocrResults[0])
          }
        } catch (error: any) {
          console.error(`第 ${i + 1} 页识别失败:`, error)
        }
      }

      if (results.length > 0) {
        ocrResults.value = results
        Message.success(`识别成功，共 ${results.length} 页`)
      } else {
        Message.error('PDF 识别失败')
      }
    }
  } catch (error: any) {
    console.error('OCR 识别失败:', error)
    Message.error(error.message || 'OCR 服务连接失败，请检查服务是否启动')
  } finally {
    loading.value = false
    emit('update-loading', false)
  }
}

/** 清空结果 */
function clearResult() {
  ocrResults.value = []
  currentPage.value = 0
}

/** 导出结果 */
function exportResult() {
  if (ocrResults.value.length === 0) {
    Message.warning('暂无识别结果')
    return
  }

  const texts: string[] = []
  ocrResults.value.forEach((page, pageIndex) => {
    const pageTexts = page.prunedResult.rec_texts || []
    if (pageTexts.length > 0) {
      texts.push(`=== 第 ${pageIndex + 1} 页 ===`)
      texts.push(...pageTexts)
      texts.push('')
    }
  })

  const content = texts.join('\n')
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `ocr_result_${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)
  Message.success('导出成功')
}

/** 暴露方法给父组件 */
defineExpose({
  startOcr,
  clearResult,
})
</script>

<style scoped lang="scss">
.ocr-result-panel {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  :deep(.arco-card) {
    height: 100%;
    display: flex;
    flex-direction: column;

    .arco-card-body {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
  }

  .result-spin {
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;

    :deep(.arco-spin-body) {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
    }
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 200px;
  }

  .result-content {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;

    :deep(.arco-tabs) {
      display: flex;
      flex-direction: column;
      min-height: 0;

      .arco-tabs-nav {
        flex-shrink: 0;
      }

      .arco-tabs-content {
        .arco-tabs-pane {
          min-height: 0;
        }
      }
    }
  }

  .raw-data-collapse {
    margin-top: 12px;
    border-top: 1px solid var(--color-border-2);
    padding-top: 12px;

    pre {
      max-height: 200px;
      overflow: auto;
      font-size: 12px;
      background: var(--color-fill-2);
      padding: 8px;
      border-radius: 4px;
    }
  }
}
</style>
