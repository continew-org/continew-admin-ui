<template>
  <div class="message">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" disabled>
        <template #title>通知(1)</template>
      </a-tab-pane>
      <a-tab-pane key="2" disabled>
        <template #title>关注(1)</template>
      </a-tab-pane>
      <a-tab-pane key="3" disabled>
        <template #title>待办(2)</template>
      </a-tab-pane>
    </a-tabs>

    <section>
      <a-comment
        v-for="(item, index) in list"
        :key="index"
        :author="item.name"
        :content="item.content"
        :datetime="item.datetime"
      >
        <template #actions></template>
        <template #avatar>
          <a-avatar><img :src="item.avatar" alt="avatar" /></a-avatar>
        </template>
      </a-comment>
    </section>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Message' })

const list = [
  {
    name: 'Socrates',
    datetime: '1小时之前',
    content: 'v3.1.0 重构消息通知',
    avatar: 'https://lolicode.gitee.io/scui-doc/demo/img/avatar2.gif'
  }
]
</script>

<style lang="scss" scoped></style>
