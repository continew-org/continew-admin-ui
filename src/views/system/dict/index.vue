<template>
  <div class="table-page">
    <a-row justify="space-between" align="center" class="header">
      <a-space wrap>
        <slot name="custom-title">
          <div class="title">字典管理</div>
        </slot>
      </a-space>
    </a-row>
    <a-row align="stretch" :gutter="14" class="h-full">
      <a-col :xs="0" :sm="8" :md="7" :lg="6" :xl="5" :xxl="4" flex="260px" class="h-full ov-hidden">
        <DictTree placeholder="请输入关键词" @node-click="handleSelectDict" />
      </a-col>
      <a-col :xs="24" :sm="16" :md="17" :lg="18" :xl="19" :xxl="20" flex="1" class="h-full ov-hidden">
        <GiTable
          row-key="id"
          :data="dataList"
          :columns="columns"
          :loading="loading"
          :scroll="{ x: '100%', y: '100%', minWidth: 600 }"
          :pagination="pagination"
          :disabled-tools="['size']"
          :disabled-column-keys="['label']"
          @refresh="search"
        >
          <template #custom-left>
            <a-input v-model="queryForm.description" placeholder="请输入关键词" allow-clear @change="search">
              <template #prefix><icon-search /></template>
            </a-input>
            <a-button @click="reset">重置</a-button>
          </template>
          <template #custom-right>
            <a-button v-permission="['system:dict:item:add']" type="primary" @click="onAdd">
              <template #icon><icon-plus /></template>
              <span>新增</span>
            </a-button>
          </template>
          <template #label="{ record }">
            <a-tag :color="record.color">{{ record.label }}</a-tag>
          </template>
          <template #status="{ record }">
            <GiCellStatus :status="record.status" />
          </template>
          <template #action="{ record }">
            <a-space>
              <a-link v-permission="['system:dict:item:update']" @click="onUpdate(record)">修改</a-link>
              <a-link
                v-permission="['system:dict:item:delete']"
                status="danger"
                @click="onDelete(record)"
              >
                删除
              </a-link>
            </a-space>
          </template>
        </GiTable>
      </a-col>
    </a-row>

    <DictItemAddModal ref="DictItemAddModalRef" @save-success="search" />
  </div>
</template>

<script setup lang="ts">
import DictTree from './tree/index.vue'
import DictItemAddModal from './DictItemAddModal.vue'
import { type DictItemQuery, type DictItemResp, deleteDictItem, listDictItem } from '@/apis'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'SystemDict' })

const queryForm = reactive<DictItemQuery>({
  dictId: '',
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((page) => listDictItem({ ...queryForm, ...page }), { immediate: false })

const columns: TableInstanceColumns[] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize)
  },
  { title: '标签', dataIndex: 'label', slotName: 'label', width: 100, align: 'center' },
  { title: '值', dataIndex: 'value', width: 100, align: 'center', ellipsis: true, tooltip: true },
  { title: '状态', slotName: 'status', width: 80, align: 'center' },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 90,
    align: 'center',
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  { title: '描述', dataIndex: 'description', width: 130, ellipsis: true, tooltip: true },
  { title: '创建人', dataIndex: 'createUserString', width: 140, ellipsis: true, tooltip: true, show: false },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '修改人', dataIndex: 'updateUserString', width: 140, ellipsis: true, tooltip: true, show: false },
  { title: '修改时间', dataIndex: 'updateTime', width: 180, show: false },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:dict:item:update', 'system:dict:item:delete'])
  }
]

// 重置
const reset = () => {
  queryForm.description = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (item: DictItemResp) => {
  return handleDelete(() => deleteDictItem(item.id), { content: `是否确定删除 [${item.label}]？`, showModal: true })
}

// 根据选中字典查询
const handleSelectDict = (keys: Array<any>) => {
  queryForm.dictId = keys.length === 1 ? keys[0] : undefined
  search()
}

const DictItemAddModalRef = ref<InstanceType<typeof DictItemAddModal>>()
// 新增
const onAdd = () => {
  DictItemAddModalRef.value?.onAdd(queryForm.dictId)
}

// 修改
const onUpdate = (item: DictItemResp) => {
  DictItemAddModalRef.value?.onUpdate(item.id)
}
</script>

<style lang="scss" scoped></style>
