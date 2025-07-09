<template>
  <GiTable
    v-model:selected-keys="selectedKeys"
    row-key="id"
    :data="dataList"
    :columns="columns"
    :loading="loading"
    :scroll="{ x: '100%', y: '100%', minWidth: 800 }"
    :pagination="pagination"
    :disabled-tools="['size', 'setting', 'fullscreen']"
    :row-selection="{ type: 'checkbox', showCheckedAll: true }"
    @select="select"
    @select-all="selectAll"
    @refresh="search"
  >
    <template #toolbar-left>
      <a-input-search v-model="queryForm.title" placeholder="搜索标题" allow-clear @search="search" />
      <a-select
        v-model="queryForm.type"
        placeholder="请选择类型"
        allow-clear
        style="width: 150px"
        :options="message_type_enum"
        @change="search"
      >
      </a-select>
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
        标记已读
      </a-button>
      <a-button type="primary" :disabled="selectedKeys.length > 0" :title="!selectedKeys.length ? '请选择' : ''" @click="onReadAll">
        全部已读
      </a-button>
    </template>
    <template #title="{ record }">
      <a-link @click="showMessageDetail(record)">
        <a-typography-paragraph
          class="link-text"
          :ellipsis="{
            rows: 1,
            showTooltip: true,
            css: true,
          }"
        >
          {{ record.title }}
        </a-typography-paragraph>
      </a-link>
    </template>
    <template #type="{ record }">
      <GiCellTag :value="record.type" :dict="message_type_enum" />
    </template>
    <template #isRead="{ record }">
      <a-tag :color="record.isRead ? '' : 'arcoblue'">
        {{ record.isRead ? '已读' : '未读' }}
      </a-tag>
    </template>
  </GiTable>

  <!-- 消息详情弹窗 -->
  <a-modal
    v-model:visible="messageDetailVisible"
    :width="width >= 500 ? 500 : '100%'"
    :footer="false"
    :mask-closable="true"
    class="message-detail-modal"
  >
    <template #title>{{ currentMessage?.title }}</template>
    <div class="message-detail-content">
      <div class="message-content">{{ currentMessage?.content }}</div>
      <div class="message-footer">
        <div class="time-info">
          <icon-clock-circle class="time-icon" />
          <span class="time-label">发送时间：</span>
          <span class="time-value">{{ currentMessage?.createTime }}</span>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'
import { Message, Modal } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import {
  type MessageQuery,
  type MessageResp,
  deleteMessage,
  getUserMessage,
  listMessage,
  readAllMessage,
  readMessage,
} from '@/apis'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import mittBus from '@/utils/mitt'

defineOptions({ name: 'UserMyMessage' })

const { width } = useWindowSize()
const { message_type_enum } = useDict('message_type_enum')

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
  { title: '类型', dataIndex: 'type', slotName: 'type', width: 180, ellipsis: true, tooltip: true },
  { title: '状态', dataIndex: 'isRead', slotName: 'isRead', minWidth: 100, align: 'center' },
  { title: '时间', dataIndex: 'createTime', width: 180 },
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

const messageDetailVisible = ref(false)
const currentMessage = ref<MessageResp>()
// 显示消息详情
const showMessageDetail = async (record: any) => {
  messageDetailVisible.value = true
  const { data } = await getUserMessage(record.id)
  currentMessage.value = data
  record.isRead = currentMessage.value?.isRead
  onSuccess()
}
</script>

<style scoped lang="scss">
.link-text {
  margin-bottom: 0;
  font-weight: 500;

  :deep(.arco-typography) {
    margin-bottom: 0;
  }
}

:deep(.message-detail-modal) {
  .arco-modal-header {
    border-bottom: 1px solid var(--color-border-2);
    padding: 20px 24px 16px;

    .arco-modal-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-1);
    }
  }

  .arco-modal-body {
    padding: 24px;
  }
}

.message-detail-content {
  .message-content {
    margin-bottom: 24px;
    line-height: 1.6;
    color: var(--color-text-1);
    font-size: 14px;
    min-height: 80px;
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  .message-footer {
    .time-info {
      display: flex;
      align-items: center;
      gap: 6px;

      .time-icon {
        font-size: 14px;
        color: var(--color-text-3);
      }

      .time-label {
        font-size: 13px;
        color: var(--color-text-3);
      }

      .time-value {
        font-size: 13px;
        color: var(--color-text-2);
        font-weight: 500;
      }
    }
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--color-border-2);
  background-color: var(--color-bg-1);

  .arco-btn {
    display: flex;
    align-items: center;
    gap: 4px;

    .btn-icon {
      font-size: 14px;
    }
  }
}
</style>
