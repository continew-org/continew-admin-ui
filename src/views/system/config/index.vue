<template>
  <div class="gi_page">
    <a-card class="general-card" title="系统配置">
      <a-tabs v-model:active-key="activeKey" position="right" @change="change">
        <a-tab-pane key="1" title="基础配置">
          <BasicSetting />
        </a-tab-pane>
        <a-tab-pane key="2" title="邮件配置">
          <MailSetting />
        </a-tab-pane>
        <a-tab-pane key="3" title="安全配置">
          <SecuritySetting />
        </a-tab-pane>
      </a-tabs>
      <!-- <keep-alive>
        <component :is="PanMap[activeKey]" />
      </keep-alive> -->
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import BasicSetting from './components/BasicSetting.vue'
import MailSetting from './components/MailSetting.vue'
import SecuritySetting from './components/SecuritySetting.vue'

defineOptions({ name: 'SystemConfig' })
// const PanMap: Record<string, Component> = {
//   1: BasicSetting,
//   2: MailSetting,
//   3: SecuritySetting
// }
const route = useRoute()
const router = useRouter()
const activeKey = ref('1')
watch(
  () => route.query,
  () => {
    if (route.query.tabKey) {
      activeKey.value = String(route.query.tabKey)
    }
  },
  { immediate: true }
)
const change = (key: string | number) => {
  activeKey.value = key as string
  router.replace({ path: route.path, query: { tabKey: key } })
}
</script>

<style scoped lang="less">
:deep(.arco-tabs-content) {
  padding-top: 5px;
}

:deep(.arco-tabs-tab) {
  background-color: var(--color-fill-2);
}
</style>
