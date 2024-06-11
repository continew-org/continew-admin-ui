<template>
  <div class="message">
    <a-list :loading="loading">
      <template #header>通知</template>
      <a-list-item v-for="item in messageList" :key="item.id">
        <div class="content-wrapper" @click="open">
          <div class="content">{{ item.title }}</div>
          <div class="date">{{ item.createTime }}</div>
        </div>
      </a-list-item>
      <template #footer>
        <a class="more-btn" @click="open">查看更多
          <icon-right />
        </a>
        <a class="read-all-btn" @click="readAll">全部已读</a>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { type MessageResp, listMessage, readMessage } from '@/apis'

const emit = defineEmits<{
  (e: 'readall-success'): void
}>()

const queryParam = reactive({
  isRead: false,
  sort: ['createTime,desc'],
  page: 1,
  size: 5
})

const messageList = ref<MessageResp[]>()
const loading = ref(false)
// 查询消息数据
const getMessageData = async () => {
  try {
    loading.value = true
    const { data } = await listMessage(queryParam)
    messageList.value = data.list
  } finally {
    loading.value = false
  }
}

// 打开消息中心
const open = () => {
  window.open('/setting/message')
}

// 全部已读
const readAll = async () => {
  await readMessage()
  await getMessageData()
  emit('readall-success')
}

onMounted(() => {
  getMessageData()
})
</script>

<style lang="scss" scoped>
.message {
  height: auto;
  max-height: calc(100% - 51px);
  width: 300px;

  .content-wrapper {
    padding: 10px;
    border-radius: var(--border-radius-medium);
    cursor: pointer;
    .content {
      font-size: 12px;
      height: 20px;
      max-width: 265px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 265px;
    }
    .date {
      color: var(--color-text-4);
      font-size: 12px;
      margin-top: 4px;
    }

    &:hover {
      background-color: var(--color-bg-4);
      color: rgb(var(--arcoblue-6));
    }
  }

  :deep(.arco-list) {
    border-radius: var(--border-radius-medium);
    .arco-list-header {
      font-size: 13px;
      padding: 9px 12px;
    }

    .arco-list-content {
      max-height: 184px;

      .arco-list-item {
        padding: 6px;
      }
    }

    .arco-list-footer {
      font-size: 12px;
      color: rgb(var(--arcoblue-6));
      padding: 9px 12px;
      display: flex;

      .more-btn {
        margin-right: auto;
      }
    }
  }
}
</style>
