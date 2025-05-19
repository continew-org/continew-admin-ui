<template>
  <GiPageLayout
    :margin="true"
    :default-collapsed="false"
    :header-style="isDesktop ? { padding: 0, borderBottomWidth: 0 } : { borderBottomWidth: '1px' } "
  >
    <template v-if="isDesktop" #left>
      <a-tabs v-model:active-key="activeKey" type="rounded" position="left" hide-content size="large" @change="change">
        <a-tab-pane v-for="(item) in menuList" :key="item.key">
          <template #title>
            <div style="display: flex; align-items: center">
              <GiSvgIcon :name="item.icon" :size="18" style="margin-right: 4px" />
              {{ item.name }}
            </div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </template>
    <template #header>
      <a-tabs v-if="!isDesktop" v-model:active-key="activeKey" type="rounded" position="top" size="large" @change="change">
        <a-tab-pane v-for="(item) in menuList" :key="item.key" :title="item.name">
          <template #title>
            <div style="display: flex; align-items: center">
              <GiSvgIcon :name="item.icon" :size="18" style="margin-right: 4px" />
              {{ item.name }}
            </div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </template>
    <transition name="fade-slide" mode="out-in" appear>
      <component :is="menuList.find((item) => item.key === activeKey)?.value"></component>
    </transition>
  </GiPageLayout>
</template>

<script setup lang="tsx">
import { useRoute, useRouter } from 'vue-router'
import SiteConfig from './site/index.vue'
import SecurityConfig from './security/index.vue'
import LoginConfig from './login/index.vue'
import MailConfig from './mail/index.vue'
import SmsConfig from './sms/index.vue'
import StorageConfig from './storage/index.vue'
import ClientConfig from './client/index.vue'
import { useDevice } from '@/hooks'
import has from '@/utils/has'

defineOptions({ name: 'SystemConfig' })

const { isDesktop } = useDevice()

const data = [
  { name: '网站配置', key: 'site', icon: 'apps', permissions: ['system:siteConfig:get'], value: SiteConfig },
  { name: '安全配置', key: 'security', icon: 'safe', permissions: ['system:securityConfig:get'], value: SecurityConfig },
  { name: '登录配置', key: 'login', icon: 'lock', permissions: ['system:loginConfig:get'], value: LoginConfig },
  { name: '邮件配置', key: 'mail', icon: 'email', permissions: ['system:mailConfig:get'], value: MailConfig },
  { name: '短信配置', key: 'sms', icon: 'message', permissions: ['system:smsConfig:list'], value: SmsConfig },
  { name: '存储配置', key: 'storage', icon: 'storage', permissions: ['system:storage:list'], value: StorageConfig },
  { name: '客户端配置', key: 'client', icon: 'mobile', permissions: ['system:client:list'], value: ClientConfig },
]

const menuList = computed(() => {
  return data.filter((item) => {
    return has.hasPermOr(item.permissions)
  })
})

const route = useRoute()
const router = useRouter()
const activeKey = ref(menuList.value[0].key)
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
.gi_page {
  padding-top: 0;
}

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
  overflow: hidden;
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
