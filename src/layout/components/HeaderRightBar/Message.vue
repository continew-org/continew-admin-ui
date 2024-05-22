<template>
  <div class="message">
    <a-list>
      <template #header>通知</template>
      <a-list-item v-for="item in props.data" :key="item.id">
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
import { readMessage } from '@/apis'

const props = defineProps({
  data: {
    type: Array as PropType<any>, // 简化数据结构以便测试
    required: true
  },
  fetch: {
    type: Function, // 简化数据结构以便测试
    required: true
  }
})

// 打开消息中心
const open = () => {
  window.open('/#/setting/message')
}

// 全部已读
const readAll = async () => {
  await readMessage()
  props.fetch()
}
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
    }

    &:active {
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
