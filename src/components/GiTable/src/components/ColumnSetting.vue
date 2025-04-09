<template>
  <a-popover
    v-model:open="popoverVisible"
    trigger="click"
    position="br"
    :content-style="{ minWidth: '240px', padding: '6px 8px 10px' }"
    @open="handleOpen"
  >
    <a-button>
      <template #icon><icon-settings /></template>
    </a-button>
    <template #content>
      <!-- 顶部控制区域 -->
      <div class="gi-table__setting-header">
        <div class="gi-table__setting-select-all">
          <a-checkbox
            :model-value="isAllSelected"
            :indeterminate="isIndeterminate"
            @change="handleSelectAll"
          >
            全选
          </a-checkbox>
        </div>
        <div class="gi-table__setting-reset">
          <a-link @click="handleReset">重置</a-link>
        </div>
      </div>

      <a-divider :margin="6" />

      <!-- 列拖拽排序区域 -->
      <div class="gi-table__draggable">
        <VueDraggable v-model="localColumns" :animation="150" @end="handleDragEnd">
          <div
            v-for="item in localColumns"
            :key="item.key"
            class="gi-table__draggable-item"
          >
            <div class="gi-table__draggable-item-move">
              <icon-drag-dot-vertical />
            </div>
            <a-checkbox
              v-model="item.show"
              :disabled="item.disabled"
              @change="() => handleColumnChange(item)"
            >
              {{ item.title }}
            </a-checkbox>
            <div class="gi-table__draggable-item-fixed">
              <a-tooltip content="左固定">
                <icon-pushpin
                  class="gi-table__fixed-icon"
                  :class="[
                    {
                      'gi-table__fixed-icon--active': item.fixed === 'left',
                      'gi-table__fixed-icon--disabled': !item.show,
                    },
                  ]"
                  @click="handleFixedColumn(item, 'left')"
                />
              </a-tooltip>
              <a-tooltip content="右固定">
                <icon-pushpin
                  class="gi-table__fixed-icon"
                  :class="[
                    {
                      'gi-table__fixed-icon--active': item.fixed === 'right',
                      'gi-table__fixed-icon--disabled': !item.show,
                    },
                  ]"
                  :rotate="270"
                  @click="handleFixedColumn(item, 'right')"
                />
              </a-tooltip>
            </div>
          </div>
        </VueDraggable>
      </div>
      <a-divider :margin="6" />

      <!-- 底部保存按钮 -->
      <a-row justify="center">
        <a-button type="primary" long @click="handleSave">
          保存
        </a-button>
      </a-row>
    </template>
  </a-popover>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { VueDraggable } from 'vue-draggable-plus'
import { Message } from '@arco-design/web-vue'
import type { TableColumnData } from '@arco-design/web-vue'

interface ColumnItem {
  title: string
  key: string
  dataIndex?: string
  show: boolean
  disabled: boolean
  fixed?: 'left' | 'right'
  width?: number
}

const props = defineProps<{
  columns: TableColumnData[]
  disabledKeys: string[]
  tableId?: string
}>()

const emit = defineEmits<{
  (e: 'update:columns', columns: TableColumnData[]): void
  (e: 'visible-columns-change', columns: TableColumnData[]): void
}>()

const route = useRoute()
const popoverVisible = ref(false)
const localColumns = ref<ColumnItem[]>([])
// 保存原始列配置
const originalColumns = ref<TableColumnData[]>([])

// 提取列排序逻辑
const sortColumnsByLocalOrder = (columns: TableColumnData[]) => {
  const keyOrderMap = new Map(
    localColumns.value.map((col, index) => [col.key, index]),
  )

  return columns.sort((a, b) => {
    const keyA = a.dataIndex || (typeof a.title === 'string' ? a.title : '')
    const keyB = b.dataIndex || (typeof b.title === 'string' ? b.title : '')
    const orderA = keyOrderMap.get(keyA) ?? 999
    const orderB = keyOrderMap.get(keyB) ?? 999
    return orderA - orderB
  })
}

// 更新列变化
const emitColumnsChange = () => {
  // 将当前列设置应用到原始列
  const updatedColumns = props.columns.map((originalCol) => {
    const key = originalCol.dataIndex || (typeof originalCol.title === 'string' ? originalCol.title : '')
    const localCol = localColumns.value.find((col) => col.key === key)

    if (localCol) {
      return {
        ...originalCol,
        show: localCol.show,
        fixed: localCol.fixed,
        width: localCol.width || originalCol.width,
      }
    }
    return originalCol
  })

  // 根据拖拽后的顺序重新排序列
  const sortedColumns = sortColumnsByLocalOrder(updatedColumns)

  emit('update:columns', sortedColumns)
}

// 缓存可选列
const selectableColumns = computed(() => {
  return localColumns.value.filter((col) => !col.disabled)
})

// 计算全选状态
const isAllSelected = computed(() => {
  if (selectableColumns.value.length === 0) return false
  return selectableColumns.value.every((col) => col.show)
})

// 计算半选状态
const isIndeterminate = computed(() => {
  if (selectableColumns.value.length === 0) return false
  const selectedCount = selectableColumns.value.filter((col) => col.show).length
  return selectedCount > 0 && selectedCount < selectableColumns.value.length
})

// 全选/取消全选处理
const handleSelectAll = (checked: boolean) => {
  selectableColumns.value.forEach((col) => {
    col.show = checked
    if (!checked) {
      col.fixed = undefined
    }
  })
  emitColumnsChange()
}

/** 获取存储键 */
const getStorageKey = computed(() => {
  const pathKey = route.path.replace(/\//g, ':')
  return props.tableId
    ? `table-columns-settings-${pathKey}:${props.tableId}`
    : `table-columns-settings-${pathKey}`
})

// 计算可见列
const visibleColumns = computed(() => {
  // 首先根据 show 属性过滤要显示的列
  const showColumns = props.columns
    .filter((col) => {
      const key = col.dataIndex || (typeof col.title === 'string' ? col.title : '')
      const localCol = localColumns.value.find((item) => item.key === key)
      return localCol?.show !== false
    })
    .map((col) => {
      const key = col.dataIndex || (typeof col.title === 'string' ? col.title : '')
      const localCol = localColumns.value.find((item) => item.key === key)

      if (localCol) {
        return {
          ...col,
          fixed: localCol.fixed,
          width: localCol.width || col.width,
        }
      }
      return col
    })

  // 根据拖拽后的顺序重新排序列
  const sortedShowColumns = sortColumnsByLocalOrder(showColumns)

  // 然后根据固定状态进行排序（左固定 -> 未固定 -> 右固定）
  const leftFixedColumns = sortedShowColumns.filter((col) => col.fixed === 'left')
  const unfixedColumns = sortedShowColumns.filter((col) => !col.fixed)
  const rightFixedColumns = sortedShowColumns.filter((col) => col.fixed === 'right')

  // 返回排序后的列
  return [...leftFixedColumns, ...unfixedColumns, ...rightFixedColumns]
})

// 监听本地列变化，发出可见列变化事件
watch([localColumns], () => {
  if (localColumns.value.length > 0) {
    emit('visible-columns-change', visibleColumns.value)
  }
}, { immediate: true, deep: true })

// 将列转换为本地列格式
const transformColumns = (columns = props.columns) => {
  if (!columns || columns.length === 0) {
    return []
  }

  // 按固定位置分类列
  const leftColumns: ColumnItem[] = []
  const centerColumns: ColumnItem[] = []
  const rightColumns: ColumnItem[] = []

  columns.forEach((column) => {
    const key = column.dataIndex || (typeof column.title === 'string' ? column.title : '')
    const item: ColumnItem = {
      key,
      dataIndex: column.dataIndex as string,
      title: typeof column.title === 'string' ? column.title : String(key),
      show: column.show ?? true,
      disabled: props.disabledKeys.includes(key),
      fixed: typeof column.fixed === 'boolean' ? 'left' : column.fixed as 'left' | 'right' | undefined,
      width: column.width as number,
    }

    if (item.fixed === 'left') {
      leftColumns.push(item)
    } else if (item.fixed === 'right') {
      rightColumns.push(item)
    } else {
      centerColumns.push(item)
    }
  })

  // 组合列表：左固定 + 中间 + 右固定
  return [...leftColumns, ...centerColumns, ...rightColumns]
}

// 从localStorage恢复设置
const loadSettingsFromStorage = () => {
  try {
    const settingsJson = localStorage.getItem(getStorageKey.value)
    if (!settingsJson) return false

    const settings = JSON.parse(settingsJson)
    if (!settings || !settings.columns || !Array.isArray(settings.columns)) return false

    // 获取原始列
    const columnsMap = new Map(
      props.columns.map((col) => [
        col.dataIndex || (typeof col.title === 'string' ? col.title : ''),
        col,
      ]),
    )

    // 按固定位置分类列
    const leftColumns: ColumnItem[] = []
    const centerColumns: ColumnItem[] = []
    const rightColumns: ColumnItem[] = []

    settings.columns.forEach((item: ColumnItem) => {
      const originalColumn = columnsMap.get(item.key)
      if (originalColumn) {
        const newItem: ColumnItem = {
          ...item,
          title: typeof originalColumn.title === 'string' ? originalColumn.title : String(item.key),
          dataIndex: originalColumn.dataIndex as string,
          disabled: props.disabledKeys.includes(item.key),
          width: item.width || originalColumn.width as number,
        }

        if (newItem.fixed === 'left') {
          leftColumns.push(newItem)
        } else if (newItem.fixed === 'right') {
          rightColumns.push(newItem)
        } else {
          centerColumns.push(newItem)
        }
      }
    })

    // 组合列表：左固定 + 中间 + 右固定
    localColumns.value = [...leftColumns, ...centerColumns, ...rightColumns]

    // 检查是否有新增的列，将它们添加到末尾
    const existingKeys = new Set(localColumns.value.map((col) => col.key))
    const newColumns = props.columns
      .filter((col) => {
        const key = col.dataIndex || (typeof col.title === 'string' ? col.title : '')
        return !existingKeys.has(key)
      })
      .map((col) => {
        const key = col.dataIndex || (typeof col.title === 'string' ? col.title : '')
        return {
          key,
          dataIndex: col.dataIndex as string,
          title: typeof col.title === 'string' ? col.title : String(key),
          show: col.show ?? true,
          disabled: props.disabledKeys.includes(key),
          fixed: typeof col.fixed === 'boolean' ? 'left' : col.fixed as 'left' | 'right' | undefined,
          width: col.width as number,
        }
      })

    if (newColumns.length > 0) {
      localColumns.value = [...localColumns.value, ...newColumns]
    }

    // 发送更新事件
    emitColumnsChange()
    return true
  } catch (e) {
    console.error('Failed to load column settings from localStorage', e)
    return false
  }
}

// 初始化列表和原始列配置
watch(() => props.columns, (newColumns) => {
  if (newColumns && newColumns.length > 0) {
    // 第一次接收到非空列数据时，保存原始配置
    if (originalColumns.value.length === 0) {
      originalColumns.value = JSON.parse(JSON.stringify(newColumns))
    }

    // 如果本地列数组为空，初始化本地列
    if (localColumns.value.length === 0) {
      localColumns.value = transformColumns()
    }
  }
}, { immediate: true })

// 处理popover打开事件
const handleOpen = () => {
  if (!localColumns.value.length) {
    localColumns.value = transformColumns()
  }
}

// 处理拖拽结束
const handleDragEnd = () => {
  emitColumnsChange()
}

// 处理单列变更
const handleColumnChange = (item: ColumnItem) => {
  // 如果是隐藏列，取消固定
  if (!item.show) {
    item.fixed = undefined
  }
  emitColumnsChange()
}

// 处理列固定
const handleFixedColumn = (item: ColumnItem, position: 'left' | 'right') => {
  // 如果列没有显示，则不能固定
  if (!item.show) return

  // 检查列是否已经固定在当前位置，是则取消固定
  const isCurrentlyFixed = item.fixed === position

  // 只修改当前列的固定状态，不改变位置
  item.fixed = isCurrentlyFixed ? undefined : position

  // 如果被固定但没有宽度，设置默认宽度100
  if (item.fixed && !item.width) {
    item.width = 100
  }

  // 发出列变更事件
  emitColumnsChange()
}

// 重置
const handleReset = () => {
  try {
    // 清除本地存储
    localStorage.removeItem(getStorageKey.value)

    // 使用原始列配置重新创建本地列
    if (originalColumns.value.length > 0) {
      // 将原始列配置重新应用（深拷贝避免共享引用）
      const columnsToReset = JSON.parse(JSON.stringify(originalColumns.value))

      // 使用父组件传入的列更新内部状态
      emit('update:columns', columnsToReset)

      // 更新本地列配置
      localColumns.value = transformColumns(columnsToReset)
    } else {
      // 如果没有原始配置，则使用当前props
      localColumns.value = transformColumns()
    }

    // 发送更新事件
    emitColumnsChange()

    // 显示成功消息
    Message.success('已重置表格列')
  } catch (e) {
    console.error('Failed to reset column settings', e)
    Message.error('重置表格列失败')
  }
}

// 保存
const handleSave = () => {
  if (!getStorageKey.value) return
  try {
    const settings = {
      columns: localColumns.value,
    }
    localStorage.setItem(getStorageKey.value, JSON.stringify(settings))
    popoverVisible.value = false
    Message.success('保存成功')
  } catch (e) {
    console.error('Failed to save column settings', e)
    Message.error('保存失败')
  }
}

// 初始化时加载存储设置
onMounted(() => {
  loadSettingsFromStorage()
})

// 导出供外部使用
defineExpose({
  visibleColumns,
  resetColumns: handleReset,
  saveColumns: handleSave,
})
</script>

<style lang="scss" scoped>
.gi-table {
  &__setting-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    &-select-all {
      font-size: 14px;
    }

    &-reset {
      font-size: 14px;
    }
  }

  &__draggable {
    padding: 1px 0;
    max-height: 250px;
    box-sizing: border-box;
    overflow: hidden auto;
  }

  &__draggable-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px 0;

    &:hover {
      background-color: var(--color-fill-2);
    }

    &-move {
      padding: 0 4px;
      cursor: move;
    }

    &-fixed {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }

  &__fixed-icon {
    cursor: pointer;
    font-size: 16px;
    color: var(--color-text-3);
    transition: all 0.2s ease;
    padding: 4px;
    border-radius: 2px;

    &--active {
      color: rgb(var(--primary-6));
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover:not(&--disabled) {
      color: rgb(var(--primary-6));
      background-color: var(--color-fill-2);
    }
  }
}
</style>
