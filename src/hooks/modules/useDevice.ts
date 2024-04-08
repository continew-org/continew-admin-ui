import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

/**
 * 响应式布局容器固定宽度
 *
 * 大屏（>=1200px）
 * 中屏（>=992px）
 * 小屏（>=768px）
 */
export function useDevice() {
  const { width } = useWindowSize()
  const isDesktop = computed(() => width.value > 768)
  const isMobile = computed(() => !isDesktop.value)

  return { isMobile, isDesktop }
}
