<template>
  <div class="gi_table_page">
    <a-tabs v-model:active-key="activeKey" type="card-gutter" size="large" @change="change">
      <a-tab-pane key="site">
        <template #title><icon-apps /> 网站配置</template>
      </a-tab-pane>
      <a-tab-pane key="security">
        <template #title><icon-safe /> 安全配置</template>
      </a-tab-pane>
      <a-tab-pane key="mail">
        <template #title><icon-email /> 邮件配置</template>
      </a-tab-pane>
      <a-tab-pane key="login">
        <template #title><icon-lock /> 登录配置</template>
      </a-tab-pane>
    </a-tabs>
    <keep-alive>
      <component :is="PanMap[activeKey]" />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import SiteSetting from './components/SiteSetting.vue'
import SecuritySetting from './components/SecuritySetting.vue'
import MailSetting from './components/MailSetting.vue'
import LoginSetting from './components/LoginSetting.vue'

defineOptions({ name: 'SystemConfig' })

const PanMap: Record<string, Component> = {
  site: SiteSetting,
  security: SecuritySetting,
  mail: MailSetting,
  login: LoginSetting,
}

const route = useRoute()
const router = useRouter()
const activeKey = ref('site')
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
.gi_table_page {
  overflow-y: auto;

  :deep(.arco-tabs) {
    overflow: visible;
  }
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
