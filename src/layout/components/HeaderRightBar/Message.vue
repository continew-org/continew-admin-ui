<template>
  <div class="message">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <template #title>通知(1)</template>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>关注(1)</template>
      </a-tab-pane>
      <a-tab-pane key="3">
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
          <a-avatar><img :src="item.avatar" /></a-avatar>
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
    content: 'Comment body content.',
    avatar: 'https://lolicode.gitee.io/scui-doc/demo/img/avatar2.gif'
  },
  {
    name: '木木糖醇',
    datetime: '2小时之前',
    content: '关注了你',
    avatar: 'https://s1.ax1x.com/2022/06/14/XhteeO.jpg'
  },
  {
    name: '徐欣',
    datetime: '2个半小时之前',
    content: '收藏了你的文章',
    avatar: 'https://s1.ax1x.com/2022/06/14/XhtSwF.jpg'
  }
]
</script>

<style lang="scss" scoped></style>
