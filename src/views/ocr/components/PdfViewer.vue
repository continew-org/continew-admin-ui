<template>
  <div class="pdf-viewer">
    <!-- 空状态 -->
    <a-card v-if="!pdfUrl && !imageUrl" :bordered="false" class="pdf-viewer__empty">
      <a-empty description="请从左侧选择 PDF 或图片预览" />
    </a-card>

    <!-- 图片预览 -->
    <template v-else-if="imageUrl">
      <div class="pdf-viewer__content pdf-viewer__content--image">
        <img :src="imageUrl" class="pdf-viewer__img" alt="预览" />
      </div>
    </template>

    <!-- PDF 预览 -->
    <template v-else>
      <!-- 工具栏 -->
      <div class="pdf-viewer__toolbar">
        <div class="toolbar-left">
          <!-- 翻页控制 -->
          <a-space :size="8">
            <a-button-group size="small">
              <a-tooltip content="第一页">
                <a-button :disabled="currentPage <= 1" @click="goToFirstPage">
                  <template #icon><icon-step-backward /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip content="上一页">
                <a-button :disabled="currentPage <= 1" @click="prevPage">
                  <template #icon><icon-left /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip content="下一页">
                <a-button :disabled="currentPage >= totalPages" @click="nextPage">
                  <template #icon><icon-right /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip content="最后一页">
                <a-button :disabled="currentPage >= totalPages" @click="goToLastPage">
                  <template #icon><icon-step-forward /></template>
                </a-button>
              </a-tooltip>
            </a-button-group>

            <!-- 页码输入 -->
            <div class="page-input">
              <a-input-number
                v-model="inputPage"
                :min="1"
                :max="totalPages"
                size="small"
                style="width: 64px;"
                @press-enter="jumpToPage"
              />
              <span class="page-separator">/</span>
              <span class="page-total">{{ totalPages }}</span>
            </div>
          </a-space>
        </div>

        <div class="toolbar-center">
          <!-- 缩放控制 -->
          <a-space :size="8">
            <a-tooltip content="缩小">
              <a-button size="small" :disabled="scale <= 0.25" @click="zoomOut">
                <template #icon><icon-minus /></template>
              </a-button>
            </a-tooltip>
            <a-tooltip content="缩放比例">
              <a-dropdown @select="onScaleSelect">
                <a-button size="small" style="min-width: 80px;">
                  {{ Math.round(scale * 100) }}%
                  <template #icon><icon-down /></template>
                </a-button>
                <template #content>
                  <a-doption :value="0.25">25%</a-doption>
                  <a-doption :value="0.5">50%</a-doption>
                  <a-doption :value="0.75">75%</a-doption>
                  <a-doption :value="1">100%</a-doption>
                  <a-doption :value="1.25">125%</a-doption>
                  <a-doption :value="1.5">150%</a-doption>
                  <a-doption :value="2">200%</a-doption>
                  <a-doption :value="3">300%</a-doption>
                  <a-doption :value="4">400%</a-doption>
                </template>
              </a-dropdown>
            </a-tooltip>
            <a-tooltip content="放大">
              <a-button size="small" :disabled="scale >= 4" @click="zoomIn">
                <template #icon><icon-plus /></template>
              </a-button>
            </a-tooltip>
            <a-button-group size="small">
              <a-tooltip content="适应宽度">
                <a-button @click="fitWidth">
                  <template #icon><icon-expand /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip content="适应页面">
                <a-button @click="fitPage">
                  <template #icon><icon-shrink /></template>
                </a-button>
              </a-tooltip>
            </a-button-group>
          </a-space>
        </div>

        <div class="toolbar-right">
          <!-- 其他操作 -->
          <a-space :size="8">
            <a-tooltip content="旋转">
              <a-button size="small" @click="rotatePage">
                <template #icon><icon-sync /></template>
              </a-button>
            </a-tooltip>
            <a-tooltip content="打印">
              <a-button size="small" @click="printPdf">
                <template #icon><icon-printer /></template>
              </a-button>
            </a-tooltip>
            <a-tooltip content="下载">
              <a-button size="small" @click="downloadPdf">
                <template #icon><icon-download /></template>
              </a-button>
            </a-tooltip>
            <a-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
              <a-button size="small" @click="toggleFullscreen">
                <template #icon>
                  <component :is="isFullscreen ? 'icon-fullscreen-exit' : 'icon-fullscreen'" />
                </template>
              </a-button>
            </a-tooltip>
          </a-space>
        </div>
      </div>

      <!-- PDF 内容区 -->
      <div
        ref="viewerContainer"
        class="pdf-viewer__content"
        :class="{ 'pdf-viewer__content--fullscreen': isFullscreen }"
      >
        <canvas ref="pdfCanvas" class="pdf-viewer__canvas" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import * as pdfjsLib from 'pdfjs-dist'
import { Message } from '@arco-design/web-vue'
import http from '@/utils/http'
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist'

defineOptions({ name: 'PdfViewer' })

const props = withDefaults(
  defineProps<{
    pdfUrl?: string | null
    imageUrl?: string | null
  }>(),
  { pdfUrl: null, imageUrl: null },
)

// 设置 PDF.js Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

// 状态管理（pdfDocument 用 shallowRef，避免 Vue 的 Proxy 破坏 pdfjs-dist 内部私有字段）
const loading = ref(true)
const loadingProgress = ref(0)
const pdfDocument = shallowRef<PDFDocumentProxy | null>(null)
const currentPage = ref(1)
const totalPages = ref(0)
const inputPage = ref(1)
const scale = ref(1)
const rotation = ref(0)
const isFullscreen = ref(false)

// DOM 引用
const viewerContainer = ref<HTMLElement | null>(null)
const pdfCanvas = ref<HTMLCanvasElement | null>(null)

// Blob URL 管理
const blobUrlRef = ref<string | null>(null)
let currentPdfTask: any = null

// 加载 PDF 文档
async function loadPdfDocument(url: string): Promise<PDFDocumentProxy | null> {
  try {
    loadingProgress.value = 0

    // 如果是相对路径，先转成 Blob URL
    const effectiveUrl = url.startsWith('/') ? await fetchPdfAsBlob(url) : url

    const loadingTask = pdfjsLib.getDocument({
      url: effectiveUrl,
      onProgress: (progress: { loaded: number; total: number }) => {
        if (progress.loaded && progress.total) {
          loadingProgress.value = Math.round((progress.loaded / progress.total) * 100)
        }
      },
    } as any)
    currentPdfTask = loadingTask

    const pdf = await loadingTask.promise
    return pdf
  } catch (error) {
    console.error('PDF 加载失败:', error)
    Message.error('PDF 加载失败，请检查文件是否损坏')
    return null
  }
}

// 获取 PDF Blob URL
async function fetchPdfAsBlob(url: string): Promise<string> {
  try {
    const { data } = await http.get<Blob>(url, { responseType: 'blob' })
    if (blobUrlRef.value) {
      URL.revokeObjectURL(blobUrlRef.value)
    }
    blobUrlRef.value = URL.createObjectURL(data)
    return blobUrlRef.value
  } catch (error) {
    console.error('获取 PDF 失败:', error)
    return url
  }
}

// 渲染指定页面
async function renderPage(pageNum: number): Promise<void> {
  if (!pdfDocument.value || !pdfCanvas.value) return

  try {
    const page: PDFPageProxy = await pdfDocument.value.getPage(pageNum)
    const viewport = page.getViewport({ scale: scale.value, rotation: rotation.value })

    const canvas = pdfCanvas.value
    const context = canvas.getContext('2d')
    if (!context) return

    // 设置画布尺寸
    canvas.height = viewport.height
    canvas.width = viewport.width

    const renderContext = {
      canvasContext: context,
      viewport,
    }

    await page.render(renderContext).promise
  } catch (error) {
    console.error('页面渲染失败:', error)
  }
}

// 翻页操作
const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    inputPage.value = currentPage.value
    await renderPage(currentPage.value)
  }
}

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    inputPage.value = currentPage.value
    await renderPage(currentPage.value)
  }
}

const goToFirstPage = async () => {
  if (currentPage.value !== 1) {
    currentPage.value = 1
    inputPage.value = 1
    await renderPage(1)
  }
}

const goToLastPage = async () => {
  if (currentPage.value !== totalPages.value) {
    currentPage.value = totalPages.value
    inputPage.value = totalPages.value
    await renderPage(totalPages.value)
  }
}

const jumpToPage = async () => {
  const page = Math.max(1, Math.min(Number(inputPage.value) || 1, totalPages.value))
  currentPage.value = page
  inputPage.value = page
  await renderPage(page)
}

// 缩放操作
const zoomIn = async () => {
  if (scale.value < 4) {
    scale.value = Math.min(4, scale.value + 0.25)
    await renderPage(currentPage.value)
  }
}

const zoomOut = async () => {
  if (scale.value > 0.25) {
    scale.value = Math.max(0.25, scale.value - 0.25)
    await renderPage(currentPage.value)
  }
}

const onScaleSelect = async (value: number) => {
  scale.value = value
  await renderPage(currentPage.value)
}

const fitWidth = async () => {
  if (!pdfDocument.value || !pdfCanvas.value || !viewerContainer.value) return

  try {
    const page = await pdfDocument.value.getPage(currentPage.value)
    const viewport = page.getViewport({ scale: 1, rotation: rotation.value })

    const containerWidth = viewerContainer.value.clientWidth - 40 // 减去 padding
    scale.value = containerWidth / viewport.width

    await renderPage(currentPage.value)
  } catch (error) {
    console.error('适应宽度失败:', error)
  }
}

const fitPage = async () => {
  if (!pdfDocument.value || !pdfCanvas.value || !viewerContainer.value) return

  try {
    const page = await pdfDocument.value.getPage(currentPage.value)
    const viewport = page.getViewport({ scale: 1, rotation: rotation.value })

    const containerWidth = viewerContainer.value.clientWidth - 40
    const containerHeight = viewerContainer.value.clientHeight - 40

    const scaleX = containerWidth / viewport.width
    const scaleY = containerHeight / viewport.height
    scale.value = Math.min(scaleX, scaleY)

    await renderPage(currentPage.value)
  } catch (error) {
    console.error('适应页面失败:', error)
  }
}

// 旋转操作
const rotatePage = async () => {
  rotation.value = (rotation.value + 90) % 360
  await renderPage(currentPage.value)
}

// 打印
const printPdf = () => {
  if (blobUrlRef.value) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = blobUrlRef.value
    document.body.appendChild(iframe)
    iframe.onload = () => {
      iframe.contentWindow?.print()
      setTimeout(() => document.body.removeChild(iframe), 1000)
    }
  } else if (props.pdfUrl) {
    window.open(props.pdfUrl, '_blank')
  }
}

// 下载
const downloadPdf = async () => {
  let url = props.pdfUrl
  if (props.pdfUrl?.startsWith('/')) {
    url = await fetchPdfAsBlob(props.pdfUrl)
  }
  if (url) {
    const link = document.createElement('a')
    link.href = url
    link.download = `document_${Date.now()}.pdf`
    link.click()
  }
}

// 全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    viewerContainer.value?.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

// 监听全屏变化
document.addEventListener('fullscreenchange', () => {
  isFullscreen.value = !!document.fullscreenElement
})

// 监听 PDF URL 变化
watch(
  () => props.pdfUrl,
  async (url) => {
    // 清理资源
    if (currentPdfTask) {
      try {
        currentPdfTask.destroy()
      } catch (e) {
        // ignore
      }
      currentPdfTask = null
    }
    if (blobUrlRef.value) {
      URL.revokeObjectURL(blobUrlRef.value)
      blobUrlRef.value = null
    }

    if (!url) {
      pdfDocument.value = null
      loading.value = false
      return
    }

    loading.value = true
    loadingProgress.value = 0

    try {
      const pdf = await loadPdfDocument(url)
      if (pdf) {
        pdfDocument.value = pdf
        totalPages.value = pdf.numPages
        currentPage.value = 1
        inputPage.value = 1
        scale.value = 1
        rotation.value = 0

        // 首次渲染第一页
        await renderPage(1)
      }
    } catch (error) {
      console.error('加载 PDF 失败:', error)
    } finally {
      loading.value = false
    }
  },
)

// 组件卸载时清理资源
onUnmounted(() => {
  if (currentPdfTask) {
    try {
      currentPdfTask.destroy()
    } catch (e) {
      // ignore
    }
  }
  if (blobUrlRef.value) {
    URL.revokeObjectURL(blobUrlRef.value)
  }
})

// 键盘快捷键
onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!props.pdfUrl || loading.value) return

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        prevPage()
        break
      case 'ArrowRight':
        e.preventDefault()
        nextPage()
        break
      case 'ArrowUp':
        e.preventDefault()
        e.ctrlKey ? zoomIn() : goToFirstPage()
        break
      case 'ArrowDown':
        e.preventDefault()
        e.ctrlKey ? zoomOut() : goToLastPage()
        break
      case 'Home':
        e.preventDefault()
        goToFirstPage()
        break
      case 'End':
        e.preventDefault()
        goToLastPage()
        break
      case '+':
      case '=':
        e.preventDefault()
        zoomIn()
        break
      case '-':
        e.preventDefault()
        zoomOut()
        break
      case 'r':
      case 'R':
        e.preventDefault()
        rotatePage()
        break
      case 'p':
      case 'P':
        e.preventDefault()
        printPdf()
        break
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
})
</script>

<style scoped lang="scss">
.pdf-viewer {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-fill-2);

  &__empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(.arco-card-body) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__toolbar {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border-2);
    gap: 12px;

    .toolbar-left,
    .toolbar-center,
    .toolbar-right {
      display: flex;
      align-items: center;
    }

    .page-input {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 0 8px;
      border-left: 1px solid var(--color-border-2);
      border-right: 1px solid var(--color-border-2);

      .page-separator {
        font-size: 12px;
        color: var(--color-text-2);
      }

      .page-total {
        font-size: 12px;
        color: var(--color-text-2);
      }
    }
  }

  &__content {
    flex: 1;
    overflow: auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 20px;
    background: var(--color-fill-3);
    position: relative;

    &--fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
    }

    &--image {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__canvas {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: white;
    max-width: 100%;
  }

  &__img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}

// 响应式
@media (max-width: 768px) {
  .pdf-viewer {
    &__toolbar {
      flex-direction: column;
      gap: 8px;

      .toolbar-left,
      .toolbar-center,
      .toolbar-right {
        width: 100%;
        justify-content: center;
      }
    }
  }
}
</style>
