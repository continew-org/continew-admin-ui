<template>
  <div class="page">
    <div class="flex_box">
      <div class="flex_item_container">
        <BasicsSetting />
      </div>
      <div class="flex_item_container">
        <SessionSetting />
      </div>
    </div>
    <div class="flex_box">
      <div class="flex_item_container">
        <PasswordPolicy />
      </div>
      <div class="flex_item_container">
        <AccountProtection />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import BasicsSetting from './BasicsSetting.vue'
import SessionSetting from './SessionSetting.vue'
import PasswordPolicy from './PasswordPolicy.vue'
import AccountProtection from './AccountProtection.vue'
defineOptions({ name: 'Security' })

const route = useRoute()
const form = reactive({ name: '' })
</script>

<style lang="scss" scoped>
.page {
  padding: $padding;
  background-color: var(--color-bg-1);
  .flex_box {
    display: flex;
    margin-bottom: 20px;
    height: 100%;
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
