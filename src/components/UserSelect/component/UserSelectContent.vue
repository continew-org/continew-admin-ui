<template>
  <div class="container">
    <a-row :gutter="16">
      <a-col :span="24" :md="5" class="section">
        <a-input v-model="searchKey" placeholder="请输入部门名称" allow-clear>
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
        <a-tree
            ref="treeRef"
            :data="treeData"
            block-node
            @select="handleDeptSelect"
        />
      </a-col>

      <a-col :span="24" :md="14" class="section">
        <GiTable
            v-model:selectedKeys="selectedKeys"
            style="min-height: 600px;"
            row-key="id"
            :data="dataList"
            :columns="tableColumns"
            :loading="loading"
            :scroll="{ x: '100%', y: '100%' }"
            :pagination="pagination"
            :disabled-tools="['size', 'fullscreen', 'setting', 'refresh']"
            :row-selection="{ type: props.multiple ? 'checkbox' : 'radio', showCheckedAll: true }"
            @select="onRowSelect"
            @select-all="onTableSelectAll"
            @refresh="search"
        >
          <template #top>
            <div>
              <a-space class="mt-5">
                <a-input v-model="queryForm.description" placeholder="用户名/昵称/描述" />
                <a-button @click="search">
                  <template #icon>
                    <icon-search />
                  </template>
                </a-button>
                <a-button @click="onRefresh">
                  <template #icon>
                    <icon-refresh />
                  </template>
                </a-button>
              </a-space>
            </div>
            <a-alert class="mt-5">
              <template v-if="selectedKeys.length > 0">
                已选中{{ selectedKeys.length }}条记录(可跨页)
              </template>
              <template v-else>
                未选中任何项目
              </template>
              <template v-if="selectedKeys.length > 0" #action>
                <a-link @click="onClearSelected">清空</a-link>
              </template>
            </a-alert>
          </template>

          <template #status="{ record }">
            <GiCellStatus :status="record.status" />
          </template>
        </GiTable>
      </a-col>

      <a-col :span="24" :md="5" class="section">
        <a-card title="已选用户">
          <a-table :columns="rightColumn" :data="selectedData">
            <template #action="{ record }">
              <a-button @click="handleDeleteSelectUser(record)">
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
import type { TreeNodeData } from '@arco-design/web-vue'
import { useDept } from '@/hooks/app'
import { useTable } from '@/hooks'
import { listAllUser, listUser } from '@/apis'
import type { UserItem, UserSelectPropType } from '@/components/UserSelect/type'

const props = withDefaults(defineProps<UserSelectPropType & { selectedUsers: string | string[] }>(), {
  multiple: false,
  selectedUsers: () => []
})

const emit = defineEmits(['update:selectedUsers'])

// 查询表单引用
const queryForm = ref({ description: '' })

// 部门树引用
const treeRef = ref()
const selectedKeys = ref<string[]>([])
const selectedDeptId = ref<string>('')
const selectedData = ref<any[]>([])

const { tableData: dataList, loading, pagination, search } = useTable(
  (page) => listUser({ ...queryForm.value, deptId: selectedDeptId.value, sort: [], ...page }),
  { immediate: false, formatResult: (data) => data.map((i) => ({ ...i, disabled: false })) }
)

// 刷新表单
const onRefresh = () => {
  queryForm.value.description = ''
  search()
}

// 使用 useDept 钩子获取部门列表数据
const { deptList, getDeptList } = useDept({
  onSuccess: () => {
    nextTick(() => treeRef.value?.expandAll(true))
  }
})

// 部门树过滤函数
const deptTreeSearch = (keyword: string, data: TreeNodeData[]): TreeNodeData[] => {
  return data
    .map((item) => ({
      ...item,
      children: item.children ? deptTreeSearch(keyword, item.children) : []
    }))
    .filter(
      (item) =>
        item.title?.toLowerCase().includes(keyword.toLowerCase()) || item.children?.length
    )
}

// 过滤树数据
const searchKey = ref('')
const treeData = computed(() => {
  return searchKey.value ? deptTreeSearch(searchKey.value, deptList.value) : deptList.value
})

// 表格列定义
const tableColumns = [
  { title: '昵称', dataIndex: 'nickname' },
  { title: '部门', dataIndex: 'deptName' },
  { title: '角色', dataIndex: 'roleNames' },
  { title: '手机号', dataIndex: 'phone' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '状态', dataIndex: 'status', slotName: 'status' }
]

// 右侧已选用户列定义
const rightColumn = [
  { title: '昵称', dataIndex: 'nickname' },
  { title: '操作', dataIndex: 'action', slotName: 'action' }
]

// 处理部门选择
const handleDeptSelect = (keys: Array<any>) => {
  selectedDeptId.value = keys[0] || ''
  search()
}

const emitSelectedUsers = () => {
  emit('update:selectedUsers', selectedKeys.value)
}
// 从选中列表中移除用户
const handleDeleteSelectUser = (user: UserItem) => {
  selectedData.value = selectedData.value.filter((item) => item.id !== user.id)
  selectedKeys.value = selectedData.value.map((item) => item.id)
  emitSelectedUsers()
}

// 行选择事件
const onRowSelect = (rowKeys: string[], rowKey: string, record: UserItem) => {
  selectedData.value = props.multiple
    ? rowKeys.includes(rowKey)
      ? [...selectedData.value, record]
      : selectedData.value.filter((item) => item.id !== rowKey)
    : [record]

  selectedKeys.value = selectedData.value.map((item) => item.id)
  emitSelectedUsers()
}
// 全选事件
const onTableSelectAll = (checked: boolean) => {
  selectedData.value = checked
    ? [...selectedData.value, ...dataList.value.filter((item) => !selectedKeys.value.includes(item.id))]
    : []
  selectedKeys.value = selectedData.value.map((item) => item.id)
  emitSelectedUsers()
}

// 清空所有选中数据
const onClearSelected = () => {
  selectedData.value = []
  selectedKeys.value = []
  emitSelectedUsers()
}

// 初始化函数
const init = (selectUsers: string[]) => {
  getDeptList()
  search()
  if (selectUsers && selectUsers.length > 0) {
    // admin的id是number 不是string 类型 所以处理一下
    listAllUser({ userIds: selectUsers }).then((dataList) => {
      selectedData.value = dataList.data.map((data) => {
        return { ...data, id: `${data.id}` }
      })
    })
  }
}

watch(() => props.selectedUsers, (newValue) => {
  const newSelectedKeys = Array.isArray(newValue) ? newValue : [newValue]
  selectedKeys.value = newSelectedKeys.filter(Boolean)
  selectedData.value = dataList.value.filter((item) => selectedKeys.value.includes(item.id))
}, { immediate: true })

defineExpose({ init, onClearSelected })
</script>

<style scoped>
.container {
  padding: 20px;
}

.section {
  margin-bottom: 20px;
}

.mt-5 {
  margin-top: 5px;
}
</style>
