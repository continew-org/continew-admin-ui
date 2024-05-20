import type { TableData, TableInstance } from '@arco-design/web-vue'
import { Message, Modal } from '@arco-design/web-vue'
import type { Options as paginationOptions } from './usePagination'
import { usePagination } from '@/hooks'

interface Options<T> {
  formatResult?: (data: T[]) => any
  onSuccess?: () => void
  immediate?: boolean
  rowKey?: keyof T
  paginationOption: paginationOptions
}

type PaginationParams = { page: number, size: number }
type Api<T> = (params: PaginationParams) => Promise<ApiRes<PageRes<T[]>>> | Promise<ApiRes<T[]>>

export function useTable<T>(api: Api<T>, options?: Options<T>) {
  const { formatResult, onSuccess, immediate, rowKey } = options || {}
  const { pagination, setTotal } = usePagination(() => getTableData(), options?.paginationOption)
  const loading = ref(false)
  const tableData = ref<T[]>([])

  async function getTableData() {
    try {
      loading.value = true
      const res = await api({ page: pagination.current, size: pagination.pageSize })
      const data = !Array.isArray(res.data) ? res.data.list : res.data
      tableData.value = formatResult ? formatResult(data) : data
      const total = !Array.isArray(res.data) ? res.data.total : data.length
      setTotal(total)
      onSuccess && onSuccess()
    } finally {
      loading.value = false
    }
  }

  // 是否立即触发
  const isImmediate = immediate ?? true
  isImmediate && getTableData()

  // 多选
  const selectedKeys = ref<(string | number)[]>([])
  const select: TableInstance['onSelect'] = (rowKeys) => {
    selectedKeys.value = rowKeys
  }

  // 全选
  const selectAll: TableInstance['onSelectAll'] = (checked) => {
    const key = rowKey ?? 'id'
    const arr = (tableData.value as TableData[]).filter((i) => !(i?.disabled ?? false))
    selectedKeys.value = checked ? arr.map((i) => i[key as string]) : []
  }

  // 查询
  const search = () => {
    selectedKeys.value = []
    pagination.onChange(1)
  }

  // 删除
  const handleDelete = async <T>(
    deleteApi: () => Promise<ApiRes<T>>,
    options?: { title?: string, content?: string, successTip?: string, showModal?: boolean }
  ): Promise<boolean | undefined> => {
    const onDelete = async () => {
      try {
        const res = await deleteApi()
        if (res.success) {
          Message.success(options?.successTip || '删除成功')
          selectedKeys.value = []
          getTableData()
        }
        return res.success
      } catch (error) {
        return false
      }
    }
    const flag = options?.showModal ?? true // 是否显示对话框
    if (!flag) {
      return onDelete()
    }
    Modal.warning({
      title: options?.title || '提示',
      content: options?.content || '是否确定删除该条数据？',
      okButtonProps: { status: 'danger' },
      hideCancel: false,
      maskClosable: false,
      onBeforeOk: onDelete
    })
  }

  return { loading, tableData, getTableData, search, pagination, selectedKeys, select, selectAll, handleDelete }
}
