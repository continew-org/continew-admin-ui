<template>
  <div class="ocr-result-content">
    <!-- 文本识别结果 - 基于坐标布局 -->
    <div v-if="hasTextResults" class="text-results-section">
      <div class="section-header">
        <div class="section-title">
          <icon-file-text />
          <span>文本识别结果</span>
          <a-tag size="small" color="arcoblue">{{ textCount }} 条</a-tag>
        </div>
        <div class="confidence-badge">
          <span class="confidence-label">平均置信度</span>
          <span class="confidence-value" :style="{ color: avgConfidenceColor }">
            {{ (avgConfidence * 100).toFixed(1) }}%
          </span>
        </div>
      </div>

      <!-- 文档容器 - 基于坐标绝对定位 -->
      <div class="document-wrapper">
        <div class="document-container" :style="containerStyle">
          <div
            v-for="(item, index) in layoutItems"
            :key="index"
            class="text-block"
            :style="item.style"
            :title="`置信度: ${(item.score * 100).toFixed(1)}%`"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>

    <!-- 无结果提示 -->
    <a-empty v-else description="未检测到文本内容" />
  </div>
</template>

<script setup lang="ts">
import type { OcrPageResult } from '@/apis/ocr'

interface LayoutItem {
  text: string
  score: number
  style: Record<string, string>
}

defineOptions({ name: 'OcrResultContent' })

const props = defineProps<{
  data: OcrPageResult
}>()

const zoom = ref(1)

/** 是否有文本结果 */
const hasTextResults = computed(() => {
  const texts = props.data.prunedResult.rec_texts || []
  return texts.some((t: string) => t && t.trim())
})

/** 文本结果列表 */
const textResults = computed(() => {
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

/** 平均置信度 */
const avgConfidence = computed(() => {
  const scores = textResults.value.map((item) => item.score)
  if (scores.length === 0) return 0
  return scores.reduce((a, b) => a + b, 0) / scores.length
})

/** 平均置信度颜色 */
const avgConfidenceColor = computed(() => {
  const score = avgConfidence.value
  if (score >= 0.9) return '#00b42a'
  if (score >= 0.7) return '#165dff'
  if (score >= 0.5) return '#ff7d00'
  return '#f53f3f'
})

/** 基于坐标的布局项 */
const layoutItems = computed(() => {
  const texts = props.data.prunedResult.rec_texts || []
  const scores = props.data.prunedResult.rec_scores || []
  const polys = props.data.prunedResult.dt_polys as number[][][] | undefined || []

  return texts.map((text: string, index: number): LayoutItem => {
    const poly = polys[index]
    const score = scores[index] || 0

    if (!poly || poly.length < 4) {
      return {
        text: text || '',
        score,
        style: {
          left: '0',
          top: `${index * 24}px`,
          position: 'relative',
        },
      }
    }

    // 计算边界框 (dt_polys 是 4 点坐标 [[x1,y1], [x2,y2], [x3,y3], [x4,y4]])
    const xCoords = poly.map((p) => p[0])
    const yCoords = poly.map((p) => p[1])
    const minX = Math.min(...xCoords)
    const minY = Math.min(...yCoords)
    const maxY = Math.max(...yCoords)

  // 根据文本框高度分档设置字体大小
  const boxHeight = maxY - minY
  let fontSize = '13px'
  if (boxHeight > 40) {
    fontSize = '20px' // 大标题
  } else if (boxHeight > 25) {
    fontSize = '16px' // 小标题
  } else {
    fontSize = '13px' // 正文
  }

    return {
      text: text || '',
      score,
      style: {
        left: `${minX}px`,
        top: `${minY}px`,
        position: 'absolute',
        fontSize: `${fontSize}px`,
        whiteSpace: 'nowrap',
      },
    }
  })
})

/** 文档容器样式 */
const containerStyle = computed(() => {
  const polys = props.data.prunedResult.dt_polys as number[][][] | undefined || []

  let maxWidth = 800
  let maxHeight = 1132

  if (polys.length > 0) {
    const allX = polys.flatMap((poly) => poly.map((p) => p[0]))
    const allY = polys.flatMap((poly) => poly.map((p) => p[1]))
    maxWidth = Math.max(...allX, 800)
    maxHeight = Math.max(...allY, 1132)
  }

  return {
    width: `${maxWidth}px`,
    height: `${maxHeight}px`,
    transform: `scale(${zoom.value})`,
    transformOrigin: 'top left',
  }
})
</script>

<style scoped lang="scss">
.ocr-result-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  height: 100%;
  min-height: 0;

  .section-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    color: var(--color-text-1);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: var(--color-fill-1);
    border-radius: 4px;
  }

  .confidence-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    background: var(--color-bg-2);
    border-radius: 12px;

    .confidence-label {
      font-size: 12px;
      color: var(--color-text-3);
    }

    .confidence-value {
      font-size: 14px;
      font-weight: 600;
    }
  }

  // 文本结果区域
  .text-results-section {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  }

  // 文档容器
  .document-wrapper {
    flex: 1;
    min-height: 0;
    overflow: auto;
    background: var(--color-bg-2);
    border: 1px solid var(--color-border-2);
    border-radius: 4px;
    padding: 16px;
  }

  .document-container {
    position: relative;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  // 文本块
  .text-block {
    position: absolute;
    line-height: 1.2;
    color: var(--color-text-1);
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 2px;
    transition: all 0.2s;

    &:hover {
      background: var(--color-primary-light-1);
    }
  }
}
</style>
