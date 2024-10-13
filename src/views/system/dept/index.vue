<template>
  <div class="table-page">
    <GiTable
      ref="tableRef"
      row-key="id"
      title="部门管理"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :pagination="false"
      :disabled-tools="['size']"
      :disabled-column-keys="['name']"
      @refresh="search"
    >
      <template #expand-icon="{ expanded }">
        <IconDown v-if="expanded" />
        <IconRight v-else />
      </template>
      <template #toolbar-left>
        <a-input v-model="name" placeholder="请输入名称" allow-clear @change="search">
          <template #prefix><icon-search /></template>
        </a-input>
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <template #default>重置</template>
        </a-button>
      </template>
      <template #toolbar-right>
        <a-button v-permission="['system:dept:add']" type="primary" @click="onAdd()">
          <template #icon><icon-plus /></template>
          <template #default>新增</template>
        </a-button>
        <a-button v-permission="['system:dept:export']" @click="onExport">
          <template #icon><icon-download /></template>
          <template #default>导出</template>
        </a-button>
      </template>
      <template #status="{ record }">
        <GiCellStatus :status="record.status" />
      </template>
      <template #isSystem="{ record }">
        <a-tag v-if="record.isSystem" color="red" size="small">是</a-tag>
        <a-tag v-else color="arcoblue" size="small">否</a-tag>
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link v-permission="['system:dept:update']" @click="onUpdate(record)">修改</a-link>
          <a-link v-permission="['system:dept:add']" @click="onAdd(record.id)">新增</a-link>
          <a-link
            v-permission="['system:dept:delete']"
            status="danger"
            :title="record.isSystem ? '系统内置数据不能删除' : undefined"
            :disabled="record.isSystem"
            @click="onDelete(record)"
          >
            删除
          </a-link>
        </a-space>
      </template>
    </GiTable>

    <DeptAddModal ref="DeptAddModalRef" @save-success="search" />
  </div>
</template>

<script setup lang="ts">
import DeptAddModal from './DeptAddModal.vue'
import { type DeptQuery, type DeptResp, deleteDept, exportDept, listDept } from '@/apis/system'
import type GiTable from '@/components/GiTable/index.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useDownload, useTable } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'SystemDept' })

const tableRef = ref<InstanceType<typeof GiTable>>()
const queryForm = reactive<DeptQuery>({})
const {
  tableData,
  loading,
  search,
  handleDelete
} = useTable(() => listDept(queryForm), {
  immediate: true,
  onSuccess: () => {
    nextTick(() => {
      tableRef.value?.tableRef?.expandAll(true)
    })
  }
})

// 过滤树
const name = ref('')
const searchData = (name: string) => {
  const loop = (data: DeptResp[]) => {
    const result = [] as DeptResp[]
    data.forEach((item: DeptResp) => {
      if (item.name?.toLowerCase().includes(name.toLowerCase())) {
        result.push({ ...item })
      } else if (item.children) {
        const filterData = loop(item.children)
        if (filterData.length) {
          result.push({
            ...item,
            children: filterData
          })
        }
      }
    })
    return result
  }
  return loop(tableData.value)
}

const dataList = computed(() => {
  if (!name.value) return tableData.value
  return searchData(name.value)
})

const columns: TableInstanceColumns[] = [
  { title: '名称', dataIndex: 'name', width: 170, ellipsis: true, tooltip: true },
  { title: '状态', slotName: 'status', align: 'center' },
  { title: '排序', dataIndex: 'sort', align: 'center', show: false },
  { title: '系统内置', slotName: 'isSystem', align: 'center', show: false },
  { title: '描述', dataIndex: 'description', ellipsis: true, tooltip: true },
  { title: '创建人', dataIndex: 'createUserString', ellipsis: true, tooltip: true, show: false },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '修改人', dataIndex: 'updateUserString', ellipsis: true, tooltip: true, show: false },
  { title: '修改时间', dataIndex: 'updateTime', width: 180, show: false },
  {
    title: '操作',
    slotName: 'action',
    width: 180,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:dept:update', 'system:dept:delete', 'system:dept:add'])
  }
]

// 重置
const reset = () => {
  name.value = ''
}

// 删除
const onDelete = (record: DeptResp) => {
  return handleDelete(() => deleteDept(record.id), {
    content: `是否确定删除 [${record.name}]？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportDept(queryForm))
}

const DeptAddModalRef = ref<InstanceType<typeof DeptAddModal>>()
// 新增
const onAdd = (parentId?: string) => {
  DeptAddModalRef.value?.onAdd(parentId)
}

// 修改
const onUpdate = (record: DeptResp) => {
  DeptAddModalRef.value?.onUpdate(record.id)
}
</script>

<style lang="scss" scoped></style>
