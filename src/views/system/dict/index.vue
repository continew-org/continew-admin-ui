<template>
  <div class="table-page">
    <GiTable
      row-key="id"
      title="字典管理"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      :disabled-column-keys="['name']"
      @refresh="search"
    >
      <template #custom-left>
        <a-input v-model="queryForm.description" placeholder="请输入关键词" allow-clear @change="search">
          <template #prefix><icon-search /></template>
        </a-input>
        <a-button @click="reset">重置</a-button>
      </template>
      <template #custom-right>
        <a-button v-permission="['system:dict:add']" type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
      </template>
      <template #isSystem="{ record }">
        <a-tag v-if="record.isSystem" color="red">是</a-tag>
        <a-tag v-else color="arcoblue">否</a-tag>
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link @click="onViewDictItem(record)">管理</a-link>
          <a-link v-permission="['system:dict:update']" @click="onUpdate(record)">修改</a-link>
          <a-link
            v-permission="['system:dict:delete']"
            status="danger"
            :title="record.isSystem ? '系统内置数据不能删除' : '删除'"
            :disabled="record.disabled"
            @click="onDelete(record)"
          >
            删除
          </a-link>
        </a-space>
      </template>
    </GiTable>

    <DictAddModal ref="DictAddModalRef" @save-success="search" />
    <DictItemModal ref="DictItemModalRef" />
  </div>
</template>

<script setup lang="ts">
import DictAddModal from './DictAddModal.vue'
import { type DictQuery, type DictResp, deleteDict, listDict } from '@/apis'
import DictItemModal from '@/views/system/dict/item/index.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'SystemDict' })

const queryForm = reactive<DictQuery>({
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((page) => listDict({ ...queryForm, ...page }), { immediate: true })

const columns: TableInstanceColumns[] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize)
  },
  { title: '名称', dataIndex: 'name', ellipsis: true, tooltip: true },
  { title: '编码', dataIndex: 'code', width: 170, ellipsis: true, tooltip: true },
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
    show: has.hasPermOr(['system:dict:update', 'system:dict:delete'])
  }
]

// 重置
const reset = () => {
  queryForm.description = undefined
  search()
}

// 删除
const onDelete = (item: DictResp) => {
  return handleDelete(() => deleteDict(item.id), { content: `是否确定删除字典 [${item.name}]？`, showModal: true })
}

const DictAddModalRef = ref<InstanceType<typeof DictAddModal>>()
// 新增
const onAdd = () => {
  DictAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (item: DictResp) => {
  DictAddModalRef.value?.onUpdate(item.id)
}

const DictItemModalRef = ref<InstanceType<typeof DictItemModal>>()
// 查看字典项
const onViewDictItem = (item: DictResp) => {
  DictItemModalRef.value?.open(item.id, item.code)
}
</script>

<style lang="scss" scoped></style>
