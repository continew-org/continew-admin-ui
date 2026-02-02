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
                  <template #icon><IconBackwardIcon /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip content="上一页">
                <a-button :disabled="currentPage <= 1" @click="prevPage">
                  <template #icon><IconLeftIcon /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip content="下一页">
                <a-button :disabled="currentPage >= totalPages" @click="nextPage">
                  <template #icon><IconRightIcon /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip content="最后一页">
                <a-button :disabled="currentPage >= totalPages" @click="goToLastPage">
                  <template #icon><IconForwardIcon /></template>
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



        <div class="toolbar-right">
          <!-- OCR 操作 -->
          <a-space :size="8">
            <a-button type="primary" size="small" :loading="ocrLoading" @click="startOcr">
              <template #icon><IconRobotIcon /></template>
              {{ ocrLoading ? '识别中...' : '开始识别' }}
            </a-button>
            <a-divider direction="vertical" />
            <!-- 其他操作 -->
            <a-tooltip content="旋转">
              <a-button size="small" @click="rotatePage">
                <template #icon><IconSyncIcon /></template>
              </a-button>
            </a-tooltip>
            <a-tooltip content="打印">
              <a-button size="small" @click="printPdf">
                <template #icon><IconPrinterIcon /></template>
              </a-button>
            </a-tooltip>
            <a-tooltip content="下载">
              <a-button size="small" @click="downloadPdf">
                <template #icon><IconDownloadIcon /></template>
              </a-button>
            </a-tooltip>
            <a-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
              <a-button size="small" @click="toggleFullscreen">
                <template #icon>
                  <component :is="isFullscreen ? IconFullscreenExitIcon : IconFullscreenIcon" />
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
        @scroll="onScroll"
      >
        <div class="pdf-viewer__pages">
          <div
            v-for="pageNum in totalPages"
            :key="pageNum"
            :ref="(el) => setPageRef(el as HTMLElement, pageNum)"
            class="pdf-viewer__page-wrapper"
          >
            <canvas
              :ref="(el) => setCanvasRef(el as HTMLCanvasElement, pageNum)"
              class="pdf-viewer__canvas"
            />
            <div v-if="!renderedPages.has(pageNum)" class="pdf-viewer__page-loading">
              <a-spin :size="24" />
              <span>加载中...</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import * as pdfjsLib from 'pdfjs-dist'
import { Message } from '@arco-design/web-vue'
import http from '@/utils/http'
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist'
import {
  IconBackward,
  IconLeft,
  IconRight,
  IconForward,
  IconRobot,
  IconSync,
  IconPrinter,
  IconDownload,
  IconFullscreen,
  IconFullscreenExit,
} from '@arco-design/web-vue/es/icon'

defineOptions({ name: 'PdfViewer' })

const props = withDefaults(
  defineProps<{
    pdfUrl?: string | null
    imageUrl?: string | null
  }>(),
  { pdfUrl: null, imageUrl: null },
)

// 注册图标组件
const IconBackwardIcon = IconBackward
const IconLeftIcon = IconLeft
const IconRightIcon = IconRight
const IconForwardIcon = IconForward
const IconRobotIcon = IconRobot
const IconSyncIcon = IconSync
const IconPrinterIcon = IconPrinter
const IconDownloadIcon = IconDownload
const IconFullscreenIcon = IconFullscreen
const IconFullscreenExitIcon = IconFullscreenExit

const emit = defineEmits<{
  (e: 'start-ocr', fileData: string | string[], fileType: number): void
  (e: 'update-ocr-loading', loading: boolean): void
  (e: 'update-page', page: number): void
}>()

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
const ocrLoading = ref(false)

// DOM 引用
const viewerContainer = ref<HTMLElement | null>(null)
const pageRefs = new Map<number, HTMLElement>()
const canvasRefs = new Map<number, HTMLCanvasElement>()
const renderedPages = ref<Set<number>>(new Set())

// 设置页面和 canvas 引用
const setPageRef = (el: HTMLElement | null, pageNum: number) => {
  if (el) {
    pageRefs.set(pageNum, el)
  }
}

const setCanvasRef = (el: HTMLCanvasElement | null, pageNum: number) => {
  if (el) {
    canvasRefs.set(pageNum, el)
  }
}

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
  if (!pdfDocument.value) return

  const canvas = canvasRefs.get(pageNum)
  if (!canvas) return

  // 如果已经渲染过，跳过
  if (renderedPages.value.has(pageNum)) return

  try {
    const page: PDFPageProxy = await pdfDocument.value.getPage(pageNum)
    const viewport = page.getViewport({ scale: scale.value, rotation: rotation.value })

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
    renderedPages.value.add(pageNum)
  } catch (error) {
    console.error('页面渲染失败:', error)
  }
}

// 重新渲染所有已渲染的页面（用于缩放/旋转后）
async function reRenderAllPages(): Promise<void> {
  if (!pdfDocument.value) return

  // 清除渲染状态
  renderedPages.value.clear()

  // 优先渲染当前页
  await renderPage(currentPage.value)

  // 渲染其他页面
  for (let i = 1; i <= totalPages.value; i++) {
    if (i !== currentPage.value) {
      await renderPage(i)
    }
  }
}

// 渲染所有页面（首次加载）
async function renderAllPages(): Promise<void> {
  if (!pdfDocument.value) return

  // 等待 DOM 更新
  await nextTick()

  // 优先渲染第一页
  await renderPage(1)

  // 异步渲染其他页面
  for (let i = 2; i <= totalPages.value; i++) {
    // 使用 requestAnimationFrame 避免阻塞 UI
    await new Promise<void>((resolve) => {
      requestAnimationFrame(async () => {
        await renderPage(i)
        resolve()
      })
    })
  }
}

// 滚动监听，更新当前页码
let scrollTimeout: ReturnType<typeof setTimeout> | null = null
const onScroll = () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  scrollTimeout = setTimeout(() => {
    updateCurrentPageFromScroll()
  }, 100)
}

// 根据滚动位置更新当前页码
function updateCurrentPageFromScroll(): void {
  if (!viewerContainer.value) return

  const container = viewerContainer.value
  const containerTop = container.scrollTop
  const containerHeight = container.clientHeight

  let closestPage = 1
  let closestDistance = Infinity

  for (let i = 1; i <= totalPages.value; i++) {
    const pageEl = pageRefs.get(i)
    if (!pageEl) continue

    const pageTop = pageEl.offsetTop - container.offsetTop
    const pageCenter = pageTop + pageEl.clientHeight / 2
    const viewCenter = containerTop + containerHeight / 2
    const distance = Math.abs(pageCenter - viewCenter)

    if (distance < closestDistance) {
      closestDistance = distance
      closestPage = i
    }
  }

  if (currentPage.value !== closestPage) {
    currentPage.value = closestPage
    inputPage.value = closestPage
    emit('update-page', closestPage)
  }
}

// 滚动到指定页面
function scrollToPage(pageNum: number): void {
  const pageEl = pageRefs.get(pageNum)
  if (pageEl && viewerContainer.value) {
    pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 翻页操作
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    inputPage.value = currentPage.value
    scrollToPage(currentPage.value)
    emit('update-page', currentPage.value)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    inputPage.value = currentPage.value
    scrollToPage(currentPage.value)
    emit('update-page', currentPage.value)
  }
}

const goToFirstPage = () => {
  if (currentPage.value !== 1) {
    currentPage.value = 1
    inputPage.value = 1
    scrollToPage(1)
    emit('update-page', 1)
  }
}

const goToLastPage = () => {
  if (currentPage.value !== totalPages.value) {
    currentPage.value = totalPages.value
    inputPage.value = totalPages.value
    scrollToPage(totalPages.value)
    emit('update-page', totalPages.value)
  }
}

const jumpToPage = () => {
  const page = Math.max(1, Math.min(Number(inputPage.value) || 1, totalPages.value))
  currentPage.value = page
  inputPage.value = page
  scrollToPage(page)
  emit('update-page', page)
}

// 缩放操作
// 旋转操作
const rotatePage = async () => {
  rotation.value = (rotation.value + 90) % 360
  await reRenderAllPages()
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

// 开始 OCR 识别
const startOcr = async () => {
  // 处理图片
  if (props.imageUrl) {
    emit('start-ocr', props.imageUrl, 1)
    return
  }

  // 处理 PDF：将所有页面转换为 Base64 图片
  if (props.pdfUrl && pdfDocument.value) {
    const pages: string[] = []
    ocrLoading.value = true

    try {
      // 逐页转换为 Base64（去除 data:image/png;base64, 前缀）
      for (let pageNum = 1; pageNum <= totalPages.value; pageNum++) {
        const canvas = canvasRefs.get(pageNum)
        if (!canvas) {
          await renderPage(pageNum)
          // 重新获取 canvas
          const newCanvas = canvasRefs.get(pageNum)
          if (!newCanvas) {
            continue
          }
          const dataUrl = newCanvas.toDataURL('image/png')
          pages.push(dataUrl.split(',')[1]) // 去除前缀，只保留纯 Base64
        } else {
          const dataUrl = canvas.toDataURL('image/png')
          pages.push(dataUrl.split(',')[1]) // 去除前缀，只保留纯 Base64
        }
      }

      if (pages.length > 0) {
        emit('start-ocr', pages, 0) // 0 表示 PDF
      } else {
        Message.warning('PDF 页面未渲染完成，请稍后再试')
      }
    } catch (error: any) {
      Message.error('PDF 转图片失败: ' + error.message)
    } finally {
      ocrLoading.value = false
    }
    return
  }

  Message.warning('请先选择要识别的文件')
}

// 监听 OCR 加载状态
watch(
  () => props.pdfUrl || props.imageUrl,
  () => {
    ocrLoading.value = false
  },
)

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

    // 清理引用和渲染状态
    pageRefs.clear()
    canvasRefs.clear()
    renderedPages.value.clear()

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

        // 渲染所有页面（优先第一页）
        await renderAllPages()
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

/** 暴露方法给父组件 */
defineExpose({
  goToPage: (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      inputPage.value = page
      scrollToPage(page)
    }
  },
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
      case 'Home':
        e.preventDefault()
        goToFirstPage()
        break
      case 'End':
        e.preventDefault()
        goToLastPage()
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
    min-height: 0; // 关键：确保 flex 子元素可以滚动
    overflow: auto;
    overflow-y: scroll; // 始终显示垂直滚动条
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 20px;
    background: var(--color-fill-3);
    position: relative;

    // 自定义滚动条样式
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: var(--color-fill-2);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-neutral-5);
      border-radius: 4px;

      &:hover {
        background: var(--color-neutral-6);
      }
    }

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

  &__pages {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding-bottom: 20px;
  }

  &__page-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__page-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: white;
    color: var(--color-text-3);
    font-size: 12px;
    min-height: 200px;
    min-width: 150px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
