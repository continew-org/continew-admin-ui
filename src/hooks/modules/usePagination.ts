import { reactive, toRefs, watch } from 'vue'
import { useBreakpoint } from '@/hooks'

type Callback = () => void

export type Options = {
  defaultPageSize: number
  defaultSizeOptions: number[]
}

export function usePagination(callback: Callback, options: Options = { defaultPageSize: 10, defaultSizeOptions: [10, 20, 30, 40, 50] }) {
  const { breakpoint } = useBreakpoint()

  const pagination = reactive({
    showPageSize: true,
    showTotal: true,
    current: 1,
    pageSize: options.defaultPageSize,
    pageSizeOptions: options.defaultSizeOptions,
    total: 0,
    simple: false,
    onChange: (size: number) => {
      pagination.current = size
      callback && callback()
    },
    onPageSizeChange: (size: number) => {
      pagination.current = 1
      pagination.pageSize = size
      callback && callback()
    }
  })

  watch(
    () => breakpoint.value,
    () => {
      pagination.simple = ['xs'].includes(breakpoint.value)
      pagination.showTotal = !['xs'].includes(breakpoint.value)
    },
    { immediate: true }
  )

  const changeCurrent = pagination.onChange
  const changePageSize = pagination.onPageSizeChange
  function setTotal(value: number) {
    pagination.total = value
  }

  const { current, pageSize, total } = toRefs(pagination)

  return {
    current,
    pageSize,
    total,
    pagination,
    changeCurrent,
    changePageSize,
    setTotal
  }
}
