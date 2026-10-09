<template>
  <a-card
    class="general-card"
    title="帮助文档"
    :header-style="{ paddingBottom: 0 }"
    :body-style="{ paddingTop: '5px' }"
    style="height: 166px"
  >
    <template #extra>
      <a-link href="https://continew.top" target="_blank" rel="noopener">更多</a-link>
    </template>
    <a-row>
      <a-col v-for="link in links" :key="link.text" :span="12">
        <a-link
          :href="link.url"
          target="_blank"
          rel="noopener"
        >
          {{ link.text }}
        </a-link>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
const links = [
  { text: '项目简介', url: 'https://continew.top/docs/admin/introduction' },
  { text: '快速开始', url: 'https://continew.top/docs/admin' },
  { text: '常见问题', url: 'https://continew.top/docs/admin/reference/faq' },
  { text: '更新日志', url: 'https://continew.top/docs/admin/reference/changelog' },
  { text: '贡献指南', url: 'https://github.com/continew-org/continew-admin/blob/dev/CONTRIBUTING.md' },
  { text: '赞助支持 💖', url: 'https://continew.top/sponsor' },
]
</script>

<style lang="less" scoped>
.arco-card-body .arco-link {
  margin: 5px 0;
  color: rgb(var(--gray-8));
}
</style>
