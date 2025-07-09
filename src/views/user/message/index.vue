<template>
  <GiPageLayout :margin="true" :default-collapsed="false" :header-style="isDesktop ? { borderBottomWidth: 0 } : { borderBottomWidth: '1px' } ">
    <template v-if="isDesktop" #left>
      <a-tabs v-model:active-key="activeKey" type="rounded" position="left" hide-content size="large" @change="change">
        <a-tab-pane v-for="item in tabItems" :key="item.key">
          <template #title>
            <TabPaneTitle :title="item.title" :count="item.count" />
          </template>
        </a-tab-pane>
      </a-tabs>
    </template>
    <template #header>
      <a-tabs v-if="!isDesktop" v-model:active-key="activeKey" type="rounded" position="top" size="large" @change="change">
        <a-tab-pane v-for="item in tabItems" :key="item.key">
          <template #title>
            <TabPaneTitle :title="item.title" :count="item.count" />
          </template>
        </a-tab-pane>
      </a-tabs>
    </template>
    <component :is="menuList.find((item) => item.key === activeKey)?.value"></component>
  </GiPageLayout>
</template>

<script setup lang="tsx">
import { useRoute, useRouter } from 'vue-router'
import MyMessage from './components/MyMessage.vue'
import MyNotice from './components/MyNotice.vue'
import { useDevice } from '@/hooks'
import {
  getUnreadMessageCount,
  getUnreadNoticeCount,
} from '@/apis'
import mittBus from '@/utils/mitt'

defineOptions({ name: 'UserMessage' })

const TabPaneTitle = defineComponent({
  props: {
    title: { type: String, required: true },
    count: { type: Number, default: 0 },
  },
  setup(props) {
    return () => (
      <div class="tab-pane-item">
        <div>{props.title}</div>
        <a-badge count={props.count} max-count={99} />
      </div>
    )
  },
})

const { isDesktop } = useDevice()

const unreadMessageCount = ref(0)
const unreadNoticeCount = ref(0)

const tabItems = computed(() => [
  { key: 'msg', title: '我的消息', count: unreadMessageCount.value },
  { key: 'notice', title: '我的公告', count: unreadNoticeCount.value },
])

const getMessageData = async () => {
  const { data } = await getUnreadMessageCount()
  unreadMessageCount.value = data.total
}

const getNoticeData = async () => {
  const { data } = await getUnreadNoticeCount()
  unreadNoticeCount.value = data.total
}

onMounted(() => {
  getMessageData()
  getNoticeData()
  mittBus.on('count-refresh', () => {
    getMessageData()
    getNoticeData()
  })
})

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
.tab-pane-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

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

:deep(.arco-tabs-nav-type-rounded .arco-tabs-tab){
  border-radius: 8px;
}

:deep(.arco-tabs-tab-title){
  width: 100%;
}
</style>
