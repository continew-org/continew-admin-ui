<template>
  <div class="gi_page">
    <a-card class="general-card" title="系统配置">
      <a-tabs default-active-key="1" type="rounded">
        <a-tab-pane key="1" title="基础配置">
          <BasicSetting />
        </a-tab-pane>
        <a-tab-pane key="2" title="邮件配置(暂未开放)" disabled></a-tab-pane>
        <a-tab-pane key="3" title="安全设置">
          <SecuritySetting />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import BasicSetting from './components/BasicSetting.vue'
import SecuritySetting from './components/SecuritySetting.vue'

defineOptions({ name: 'SystemConfig' })
</script>

<style scoped lang="less">
:deep(.arco-tabs-content) {
  padding-top: 5px;
}
</style>
