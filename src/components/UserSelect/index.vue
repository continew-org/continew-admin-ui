<template>
  <div class="container">
    <a-row :gutter="16">
      <a-col :span="24" :md="17">
        <GiTable
          v-model:selectedKeys="selectedKeys"
          row-key="id"
          :data="dataList"
          :columns="listColumns"
          :loading="loading"
          :scroll="{ x: '100%', y: '100%', minWidth: 500 }"
          style="max-height: 600px"
          :pagination="pagination"
          :disabled-tools="['size', 'fullscreen', 'setting', 'refresh']"
          :row-selection="{ type: props.multiple ? 'checkbox' : 'radio', showCheckedAll: true }"
          @select="onSelect"
          @select-all="onSelectAll"
          @refresh="search"
        >
          <template #top>
            <a-space wrap :size="[8, 8]">
              <a-input-search v-model="queryForm.description" placeholder="搜索用户名/昵称/描述" allow-clear @search="search" />
              <a-tree-select
                v-model="queryForm.deptId"
                :data="deptList"
                placeholder="请选择所属部门"
                allow-clear
                allow-search
                :filter-tree-node="filterDeptOptions"
                @change="search"
              />
              <a-button @click="reset">
                <template #icon>
                  <icon-refresh />
                </template>
                <template #default>重置</template>
              </a-button>
            </a-space>
            <a-alert>
              <template v-if="selectedKeys.length > 0">
                已选中 {{ selectedKeys.length }} 条记录(可跨页)
              </template>
              <template v-else>未选中任何记录</template>
              <template v-if="selectedKeys.length > 0" #action>
                <a-link @click="onClearSelected">清空</a-link>
              </template>
            </a-alert>
          </template>

          <template #gender="{ record }">
            <GiCellGender :gender="record.gender" />
          </template>
          <template #status="{ record }">
            <GiCellStatus :status="record.status" />
          </template>
        </GiTable>
      </a-col>
      <a-col :span="24" :md="7" class="section">
        <a-card>
          <template #title>已选择: {{ selectedKeys.length }}</template>
          <a-table :columns="selectedColumns" :data="[...selectedData.values()]" :pagination="paginationOptions">
            <template #nickname="{ record }">
              {{ record.nickname }}({{ record.username }})
            </template>
            <template #action="{ record }">
              <a-button status="danger" size="mini" @click="handleDeleteSelectedUser(record)">
                <icon-delete />
              </a-button>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import type { TableInstance, TreeNodeData } from '@arco-design/web-vue'

import { type UserQuery, type UserResp, listAllUser, listUser } from '@/apis'
import { type Options, useTable } from '@/hooks'
import { useDept } from '@/hooks/app'
import { isMobile } from '@/utils'

const props = withDefaults(defineProps<Props>(), {
  multiple: true,
  value: () => [],
})

const emit = defineEmits<{
  (e: 'select-user', keys: Array<any>): void
}>()

interface Props {
  multiple?: boolean
  value: string | string[]
  roleId?: string
}

// 查询表单
const queryForm = reactive<UserQuery>({
  sort: ['t1.createTime,desc', 't1.id,desc'],
  roleId: props.roleId,
})

// 用户列表
const { tableData: dataList, loading, pagination, search } = useTable(
  (page) => listUser({ ...queryForm, ...page }),
  { immediate: true, formatResult: (data) => data.map((i) => ({ ...i, id: `${i?.id}`, disabled: false })) },
)

// 表格列定义
const listColumns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
    fixed: !isMobile() ? 'left' : undefined,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    slotName: 'nickname',
    minWidth: 140,
    ellipsis: true,
    tooltip: true,
    fixed: !isMobile() ? 'left' : undefined,
  },
  { title: '用户名', dataIndex: 'username', slotName: 'username', minWidth: 140, ellipsis: true, tooltip: true },
  { title: '状态', slotName: 'status', align: 'center' },
  { title: '性别', dataIndex: 'gender', slotName: 'gender', align: 'center' },
  { title: '所属部门', dataIndex: 'deptName', minWidth: 180, ellipsis: true, tooltip: true },
  { title: '描述', dataIndex: 'description', minWidth: 130, ellipsis: true, tooltip: true },
]

// 右侧已选用户列定义
const selectedColumns = [
  { title: '用户', dataIndex: 'nickname', slotName: 'nickname', minWidth: 140, ellipsis: true, tooltip: true },
  { title: '操作', dataIndex: 'action', slotName: 'action', align: 'center', width: 90 },
]
const paginationOptions: Options = {
  defaultPageSize: 10,
  defaultSizeOptions: [10, 20, 30, 40, 50],
}

// 重置
const reset = () => {
  queryForm.description = undefined
  queryForm.deptId = undefined
  search()
}

// 选中用户 ID
const selectedKeys = ref<string[]>([])
// 选中用户信息
const selectedData = ref<Map<string, UserResp>>(new Map())

const emitSelectUser = () => {
  emit('select-user', selectedKeys.value)
}

// 单选
const onSelect = (rowKeys: string[], rowKey: string, record: UserResp) => {
  if (props.multiple) {
    if (rowKeys.includes(rowKey)) {
      // 选中时，添加到 Map
      selectedData.value.set(rowKey, record)
      selectedKeys.value = Array.from(selectedData.value.keys())
    } else {
      // 取消选中时，从 Map 移除
      selectedData.value.delete(rowKey)
      selectedKeys.value = Array.from(selectedData.value.keys())
    }
  } else {
    selectedData.value.clear()
    selectedKeys.value = []
    if (rowKeys.includes(rowKey)) {
      selectedData.value.set(rowKey, record)
      selectedKeys.value = [rowKey]
    }
  }
  emitSelectUser()
}

// 全选
const onSelectAll = (checked: boolean) => {
  if (checked) {
    // 全选时，将所有数据添加到 Map
    dataList.value.forEach((item) => {
      selectedData.value.set(item.id, item)
    })
    selectedKeys.value = Array.from(selectedData.value.keys())
  } else {
    // 取消全选时，清空 Map
    dataList.value.forEach((item) => {
      selectedData.value.delete(item.id)
    })
    selectedKeys.value = Array.from(selectedData.value.keys())
  }
  emitSelectUser()
}

// 从选中列表中移除用户
const handleDeleteSelectedUser = (user: UserResp) => {
  selectedData.value.delete(user.id)
  selectedKeys.value = Array.from(selectedData.value.keys())
  emitSelectUser()
}

// 清空所有选中数据
const onClearSelected = () => {
  selectedData.value.clear()
  selectedKeys.value = []
  emitSelectUser()
}

// 部门列表
const { deptList, getDeptList } = useDept()
// 过滤部门
const filterDeptOptions = (searchKey: string, nodeData: TreeNodeData) => {
  if (nodeData.title) {
    return nodeData.title.toLowerCase().includes(searchKey.toLowerCase())
  }
  return false
}

onMounted(async () => {
  await getDeptList()
  // 过滤已选择的用户
  if (props.value && props.value.length > 0) {
    const { data } = await listAllUser({ userIds: props.value })
    if (props.multiple) {
      // 使用 Map 存储用户，避免重复
      data.map((i) => ({ ...i, id: `${i?.id}`, disabled: false })).forEach((item) => {
        if (props.value.includes(item.id)) {
          selectedData.value.set(item.id, item)
        }
      })
      selectedKeys.value = Array.from(selectedData.value.keys())
    } else {
      const user = data.find((item) => props.value[0] === item.id)
      if (user) {
        selectedData.value.set(user.id, user)
        selectedKeys.value = [user.id]
      }
    }
  }
})

defineExpose({ onClearSelected })
</script>

<style scoped>
:deep(.arco-row-align-start) {
  align-items: normal;
}

.container {
  padding: 0 20px;
}
</style>
