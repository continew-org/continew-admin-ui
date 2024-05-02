<template>
  <a-modal
    v-model:visible="visible"
    :title="'字典项管理(' + dictCode + ')'"
    title-align="start"
    :mask-closable="false"
    :esc-to-close="false"
    :modal-style="{ maxWidth: '780px' }"
    width="90%"
    ok-text="关闭"
    hide-cancel
  >
    <GiTable
      ref="tableRef"
      row-key="id"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 800 }"
      :pagination="pagination"
      :disabledTools="['size']"
      :disabledColumnKeys="['label']"
      @refresh="search"
    >
      <template #custom-left>
        <a-button type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
      </template>
      <template #custom-right>
        <a-input v-model="queryForm.description" placeholder="请输入关键词" allow-clear @change="search">
          <template #prefix><icon-search /></template>
        </a-input>
        <a-button @click="reset">重置</a-button>
      </template>
      <template #label="{ record }">
        <a-tag :color="record.color">{{ record.label }}</a-tag>
      </template>
      <template #status="{ record }">
        <GiCellStatus :status="record.status" />
      </template>
      <template #action="{ record }">
        <a-space>
          <template #split>
            <a-divider direction="vertical" :margin="0" />
          </template>
          <a-link @click="onUpdate(record)">修改</a-link>
          <a-popconfirm
            type="warning"
            content="是否确定删除该条数据？"
            :ok-button-props="{ status: 'danger' }"
            @ok="onDelete(record)"
          >
            <a-link status="danger">删除</a-link>
          </a-popconfirm>
        </a-space>
      </template>
    </GiTable>

    <DictItemAddModal ref="DictItemAddModalRef" @save-success="search" />
  </a-modal>
</template>

<script lang="ts" setup>
import { listDictItem, deleteDictItem, type DictItemResp, type DictItemQuery } from '@/apis'
import DictItemAddModal from './DictItemAddModal.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable } from '@/hooks'
import { isMobile } from '@/utils'

const columns: TableInstanceColumns[] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize)
  },
  { title: '标签', dataIndex: 'label', slotName: 'label' },
  { title: '值', dataIndex: 'value', ellipsis: true, tooltip: true },
  { title: '状态', slotName: 'status', align: 'center' },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 90,
    align: 'center',
    sortable: {
      sortDirections: ['ascend', 'descend']
    },
    show: false
  },
  { title: '描述', dataIndex: 'description', ellipsis: true, tooltip: true },
  { title: '创建人', dataIndex: 'createUserString', ellipsis: true, tooltip: true, show: false },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '修改人', dataIndex: 'updateUserString', ellipsis: true, tooltip: true, show: false },
  { title: '修改时间', dataIndex: 'updateTime', width: 180, show: false },
  { title: '操作', slotName: 'action', width: 130, align: 'center', fixed: !isMobile() ? 'right' : undefined }
]

const queryForm = reactive<DictItemQuery>({
  sort: ['createTime,desc']
})

const dictId = ref('')
const dictCode = ref('')
const visible = ref(false)
// 打开
const open = (id: string, code: string) => {
  dataList.value = []
  dictId.value = id
  dictCode.value = code
  visible.value = true
  search()
}
defineExpose({ open })

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listDictItem({ ...queryForm, dictId: dictId.value, page: p.page, size: p.size }), {
  immediate: true
})

// 重置
const reset = () => {
  queryForm.description = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (item: DictItemResp) => {
  return handleDelete(() => deleteDictItem(item.id), { content: `是否确定删除 [${item.label}]？`, showModal: false })
}

const DictItemAddModalRef = ref<InstanceType<typeof DictItemAddModal>>()
// 新增
const onAdd = () => {
  DictItemAddModalRef.value?.onAdd(dictId.value)
}

// 修改
const onUpdate = (item: DictItemResp) => {
  DictItemAddModalRef.value?.onUpdate(item.id)
}
</script>

<style lang="scss" scoped></style>
