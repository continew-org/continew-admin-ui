<template>
  <a-card title="公告" :bordered="false" size="medium" class="gi_card_title">
    <template #extra>
      <a-link>更多</a-link>
    </template>
    <a-comment
      v-for="(item, index) in list"
      :key="index"
      align="right"
      :class="`animated-fade-up-${index}`"
      style="overflow: hidden"
    >
      <template #content>
        <div class="content">
          <a-tag v-if="item.type === 1" color="blue" size="small">通知</a-tag>
          <a-tag v-if="item.type === 2" color="orangered" size="small">活动</a-tag>
          <a-tag v-if="item.type === 3" color="cyan" size="small">消息</a-tag>
          <p>{{ item.content }}</p>
        </div>
      </template>
    </a-comment>
  </a-card>
</template>

<script setup lang="ts">
const list = [
  { type: 1, content: 'v2.4.0 版本发布公告🎉' },
  { type: 1, content: 'v2.3.0 版本发布公告🎉' },
  { type: 1, content: 'v2.2.0 版本发布公告🎉' },
  { type: 2, content: '作者喊你来贡献代码了~' },
  { type: 2, content: '作者喊你来提需求了~' }
]
</script>

<style lang="scss" scoped>
:deep(.arco-comment:not(:first-of-type), .arco-comment-inner-comment) {
  margin-top: 10px;
}
:deep(.arco-comment-content) {
  font-size: 14px;
  color: var(--color-text-1);
}
:deep(.arco-comment-datetime) {
  color: var(--color-text-4);
}

.content {
  display: flex;
  align-items: center;
  > p {
    margin-left: 6px;
  }
}
</style>
