<template>
  <div class="ocr-result-content">
    <!-- OCR 可视化图像 -->
    <div v-if="data.ocrImage" class="ocr-image-section">
      <div class="section-title">
        <icon-image />
        <span>OCR 识别结果图</span>
      </div>
      <div class="image-container">
        <img :src="`data:image/jpeg;base64,${data.ocrImage}`" alt="OCR 结果" />
      </div>
    </div>

    <!-- 文本识别结果列表 -->
    <div v-if="hasTextResults" class="text-results-section">
      <div class="section-header">
        <div class="section-title">
          <icon-file-text />
          <span>文本识别结果</span>
          <a-tag size="small" color="arcoblue">{{ textCount }} 条</a-tag>
        </div>
        <a-button size="small" @click="toggleSelectMode">
          <template #icon><icon-check-circle /></template>
          {{ selectMode ? '完成' : '选择文本' }}
        </a-button>
      </div>

      <a-checkbox-group v-if="selectMode" v-model="selectedTexts" class="checkbox-group">
        <div
          v-for="(text, index) in textResults"
          :key="index"
          class="text-item selectable"
          :class="{ selected: selectedTexts.includes(index) }"
          @click="toggleTextSelection(index)"
        >
          <a-checkbox :value="index" />
          <span class="text-index">{{ index + 1 }}.</span>
          <span class="text-content">{{ text.text }}</span>
          <a-tag size="small" :color="getScoreColor(text.score)">{{ (text.score * 100).toFixed(1) }}%</a-tag>
        </div>
      </a-checkbox-group>

      <div v-else class="text-list">
        <div
          v-for="(text, index) in textResults"
          :key="index"
          class="text-item"
          @click="handleTextClick(text, index)"
        >
          <span class="text-index">{{ index + 1 }}.</span>
          <span class="text-content">{{ text.text || '(空)' }}</span>
          <a-tag size="small" :color="getScoreColor(text.score)">{{ (text.score * 100).toFixed(1) }}%</a-tag>
        </div>
      </div>

      <!-- 选中操作栏 -->
      <div v-if="selectMode && selectedTexts.length > 0" class="selection-actions">
        <a-space>
          <span class="selection-info">已选择 {{ selectedTexts.length }} 条</span>
          <a-button size="small" type="primary" @click="copySelectedTexts">
            <template #icon><icon-copy /></template>
            复制选中
          </a-button>
          <a-button size="small" @click="selectedTexts = []">
            <template #icon><icon-close-circle /></template>
            取消选择
          </a-button>
        </a-space>
      </div>
    </div>

    <!-- 无结果提示 -->
    <a-empty v-else description="未检测到文本内容" />
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { OcrPageResult } from '@/apis/ocr'

interface TextResult {
  text: string
  score: number
  index: number
}

defineOptions({ name: 'OcrResultContent' })

const props = defineProps<{
  data: OcrPageResult
}>()

const selectMode = ref(false)
const selectedTexts = ref<number[]>([])

/** 是否有文本结果 */
const hasTextResults = computed(() => {
  const texts = props.data.prunedResult.rec_texts || []
  return texts.some((t: string) => t && t.trim())
})

/** 文本结果列表 */
const textResults = computed<TextResult[]>(() => {
  const texts = props.data.prunedResult.rec_texts || []
  const scores = props.data.prunedResult.rec_scores || []
  return texts.map((text: string, index: number) => ({
    text: text || '',
    score: scores[index] || 0,
    index,
  }))
})

/** 文本数量 */
const textCount = computed(() => textResults.value.length)

/** 根据置信度获取标签颜色 */
function getScoreColor(score: number): string {
  if (score >= 0.9) return 'green'
  if (score >= 0.7) return 'blue'
  if (score >= 0.5) return 'orange'
  return 'red'
}

/** 切换选择模式 */
function toggleSelectMode() {
  selectMode.value = !selectMode.value
  if (!selectMode.value) {
    selectedTexts.value = []
  }
}

/** 切换文本选择 */
function toggleTextSelection(index: number) {
  const idx = selectedTexts.value.indexOf(index)
  if (idx > -1) {
    selectedTexts.value.splice(idx, 1)
  } else {
    selectedTexts.value.push(index)
  }
}

/** 点击文本 */
function handleTextClick(text: TextResult, index: number) {
  if (selectMode.value) {
    toggleTextSelection(index)
  } else {
    // 复制单条文本
    copyText(text.text)
  }
}

/** 复制文本 */
function copyText(content: string) {
  if (!content) {
    Message.warning('文本内容为空')
    return
  }
  navigator.clipboard.writeText(content).then(() => {
    Message.success('已复制到剪贴板')
  }).catch(() => {
    Message.error('复制失败')
  })
}

/** 复制选中文本 */
function copySelectedTexts() {
  const texts = selectedTexts.value
    .sort((a, b) => a - b)
    .map((index) => textResults.value[index].text)
    .filter((t) => t)

  if (texts.length === 0) {
    Message.warning('请选择要复制的文本')
    return
  }

  const content = texts.join('\n')
  copyText(content)
}
</script>

<style scoped lang="scss">
.ocr-result-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;

  .section-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    color: var(--color-text-1);
    margin-bottom: 8px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  // OCR 图像区域
  .ocr-image-section {
    .image-container {
      width: 100%;
      border: 1px solid var(--color-border-2);
      border-radius: 4px;
      overflow: hidden;
      background: var(--color-bg-2);

      img {
        width: 100%;
        height: auto;
        display: block;
        max-height: 300px;
        object-fit: contain;
      }
    }
  }

  // 文本结果区域
  .text-results-section {
    .text-list,
    .checkbox-group {
      .text-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: var(--color-bg-1);
        border: 1px solid var(--color-border-2);
        border-radius: 4px;
        margin-bottom: 6px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: var(--color-bg-2);
          border-color: var(--color-primary-light-3);
        }

        .text-index {
          color: var(--color-text-3);
          font-size: 12px;
          min-width: 24px;
        }

        .text-content {
          flex: 1;
          color: var(--color-text-1);
          word-break: break-all;
          line-height: 1.5;
        }

        &.selectable {
          padding: 6px 12px;

          .arco-checkbox {
            flex-shrink: 0;
          }
        }

        &.selected {
          background: var(--color-primary-light-1);
          border-color: var(--color-primary-light-4);
        }
      }
    }

    .selection-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 8px 0;
      border-top: 1px solid var(--color-border-2);
      margin-top: 8px;

      .selection-info {
        font-size: 13px;
        color: var(--color-text-3);
      }
    }
  }
}
</style>
