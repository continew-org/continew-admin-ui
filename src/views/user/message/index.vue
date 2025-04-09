<template>
  <GiPageLayout :margin="true" :default-collapsed="false">
    <template v-if="isDesktop" #left>
      <a-tabs v-model:active-key="activeKey" position="left" hide-content size="large" @change="change">
        <a-tab-pane v-for="(item) in menuList" :key="item.key" :title="item.name"></a-tab-pane>
      </a-tabs>
    </template>
    <a-tabs v-if="!isDesktop" v-model:active-key="activeKey" type="card-gutter" position="top" size="large" @change="change">
      <a-tab-pane v-for="(item) in menuList" :key="item.key" :title="item.name"></a-tab-pane>
    </a-tabs>
    <transition name="fade-slide" mode="out-in" appear>
      <component :is="menuList.find((item) => item.key === activeKey)?.value"></component>
    </transition>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import MyMessage from './components/MyMessage.vue'
import MyNotice from './components/MyNotice.vue'
import { useDevice } from '@/hooks'

defineOptions({ name: 'UserMessage' })

const { isDesktop } = useDevice()

const menuList = [
  { name: '我的消息', key: 'msg', value: MyMessage },
  { name: '我的公告', key: 'notice', value: MyNotice },
]

const route = useRoute()
const router = useRouter()
const activeKey = ref('msg')
watch(
  () => route.query,
  () => {
    if (route.query.tab) {
      activeKey.value = String(route.query.tab)
    }
  },
  { immediate: true },
)
const change = (key: string | number) => {
  activeKey.value = key as string
  router.replace({ path: route.path, query: { tab: key } })
}
</script>

<style scoped lang="scss">
:deep(.arco-tabs-nav-vertical.arco-tabs-nav-type-line .arco-tabs-tab) {
  margin: 0;
  padding: 8px 16px;

  &:hover {
    background: var(--color-fill-1);

    .arco-tabs-tab-title {
      &::before {
        display: none !important;
      }
    }
  }

  &.arco-tabs-tab-active {
    background: rgba(var(--primary-6), 0.08);
  }
}

:deep(.arco-tabs-nav-vertical::before) {
  left: 0;
  display: none;
}

:deep(.arco-tabs-nav-vertical .arco-tabs-nav-ink) {
  left: 0;
}

:deep(.arco-tabs-nav-vertical) {
  float: none;
  flex-direction: row;
}

:deep(.arco-tabs .arco-tabs-nav-type-card-gutter .arco-tabs-tab-active) {
  box-shadow: inset 0 2px 0 rgb(var(--primary-6)), inset -1px 0 0 var(--color-border-2),
  inset 1px 0 0 var(--color-border-2);
  position: relative;
}

:deep(.arco-tabs-nav-type-card-gutter .arco-tabs-tab) {
  border-radius: var(--border-radius-medium) var(--border-radius-medium) 0 0;
}

:deep(.arco-tabs-type-card-gutter > .arco-tabs-content) {
  border: none;
}

:deep(.arco-tabs-nav::before) {
  left: -20px;
  right: -20px;
}

:deep(.arco-tabs) {
  overflow: visible;
}

:deep(.arco-tabs-nav) {
  overflow: visible;
}
</style>
