<template>
  <div class="gi_page">
    <a-row wrap :gutter="16">
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12">
        <BasicsSetting />
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12">
        <SessionSetting />
      </a-col>
    </a-row>
    <a-row wrap :gutter="16" style="margin-top: 16px">
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12">
        <PasswordPolicy />
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12">
        <AccountProtection />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import BasicsSetting from './BasicsSetting.vue'
import SessionSetting from './SessionSetting.vue'
import PasswordPolicy from './PasswordPolicy.vue'
import AccountProtection from './AccountProtection.vue'

defineOptions({ name: 'SettingSecurity' })
</script>

<style lang="scss" scoped>
.gi_page {
  background-color: var(--color-bg-1);
  .flex_box {
    display: flex;
    margin-bottom: 20px;
    .flex_item_container {
      width: 100%;
      height: 100%;
    }
    & .flex_item_container:first-child {
      margin-right: 20px;
    }
  }
}
</style>
