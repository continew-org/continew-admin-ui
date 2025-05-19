<template>
  <GiTable
    v-model:selected-keys="selectedKeys"
    row-key="id"
    :data="dataList"
    :columns="columns"
    :loading="loading"
    :scroll="{ x: '100%', y: '100%', minWidth: 800 }"
    :pagination="pagination"
    :disabled-tools="['size', 'setting']"
    :row-selection="{ type: 'checkbox', showCheckedAll: true }"
    @select="select"
    @select-all="selectAll"
    @refresh="search"
  >
    <template #toolbar-left>
      <a-input-search v-model="queryForm.title" placeholder="搜索标题" allow-clear @search="search" />
      <a-select
        v-model="queryForm.isRead"
        placeholder="请选择状态"
        allow-clear
        style="width: 150px"
        @change="search"
      >
        <a-option :value="false">未读</a-option>
        <a-option :value="true">已读</a-option>
      </a-select>
      <a-button @click="reset">
        <template #icon><icon-refresh /></template>
        <template #default>重置</template>
      </a-button>
    </template>
    <template #toolbar-right>
      <a-button type="primary" status="danger" :disabled="!selectedKeys.length" :title="!selectedKeys.length ? '请选择' : ''" @click="onDelete">
        <template #icon><icon-delete /></template>
        删除
      </a-button>
      <a-button type="primary" :disabled="!selectedKeys.length" :title="!selectedKeys.length ? '请选择' : ''" @click="onRead">
        标记为已读
      </a-button>
      <a-button type="primary" :disabled="selectedKeys.length > 0" :title="!selectedKeys.length ? '请选择' : ''" @click="onReadAll">
        全部已读
      </a-button>
    </template>
    <template #title="{ record }">
      <a-tooltip :content="record.content"><span>{{ record.title }}</span></a-tooltip>
    </template>
    <template #isRead="{ record }">
      <a-tag :color="record.isRead ? '' : 'arcoblue'">
        {{ record.isRead ? '已读' : '未读' }}
      </a-tag>
    </template>
    <template #type="{ record }">
      <GiCellTag :value="record.type" :dict="message_type" />
    </template>
  </GiTable>
</template>

<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'
import { Message, Modal } from '@arco-design/web-vue'
import { type MessageQuery, deleteMessage, listMessage, readAllMessage, readMessage } from '@/apis'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import mittBus from '@/utils/mitt'

defineOptions({ name: 'SystemMessage' })

const { message_type } = useDict('message_type')

const queryForm = reactive<MessageQuery>({
  sort: ['createTime,desc'],
})
// 表格更新回调
const onSuccess = () => {
  mittBus.emit('count-refresh')
}
const {
  tableData: dataList,
  loading,
  pagination,
  selectedKeys,
  select,
  selectAll,
  search,
  handleDelete,
} = useTable((page) => listMessage({ ...queryForm, ...page }), { immediate: true, onSuccess })

const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
  },
  { title: '标题', dataIndex: 'title', slotName: 'title', minWidth: 100, ellipsis: true, tooltip: true },
  { title: '状态', dataIndex: 'isRead', slotName: 'isRead', minWidth: 100, align: 'center' },
  { title: '时间', dataIndex: 'createTime', width: 180 },
  { title: '类型', dataIndex: 'type', slotName: 'type', width: 180, ellipsis: true, tooltip: true },
]

// 重置
const reset = () => {
  queryForm.title = undefined
  queryForm.type = undefined
  queryForm.isRead = undefined
  search()
}

// 删除
const onDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择数据')
  }
  return handleDelete(() => deleteMessage(selectedKeys.value), { showModal: true, content: `是否确定删除所选的${selectedKeys.value.length}条消息？`, multiple: true })
}

// 标记为已读
const onRead = async () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择数据')
  }
  await readMessage(selectedKeys.value)
  Message.success('操作成功')
  search()
}

// 全部已读
const onReadAll = async () => {
  Modal.warning({
    title: '全部已读',
    content: '确定要标记全部消息为已读吗？',
    hideCancel: false,
    maskClosable: false,
    onOk: async () => {
      await readAllMessage()
      Message.success('操作成功')
      search()
    },
  })
}
</script>

<style scoped lang="scss"></style>
