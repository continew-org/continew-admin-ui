import { useBreakpoint } from '@/hooks'

type BreakpointMap = {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

export function useBreakpointIndex(callback: (v: number) => void, breakpointObj?: BreakpointMap) {
  const { breakpoint } = useBreakpoint()

  watch(
    () => breakpoint.value,
    (v) => {
      const def = { xs: 0, sm: 0, md: 0, lg: 1, xl: 1, xxl: 2 }
      const obj = breakpointObj || def
      callback(obj[v as keyof typeof obj])
    },
    { immediate: true }
  )
}
