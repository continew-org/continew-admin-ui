<template>
  <div class="gi_page">
    <a-row wrap :gutter="16" align="stretch">
      <a-col :xs="24" :sm="24" :md="10" :lg="10" :xl="7" :xxl="7">
        <LeftBox />
      </a-col>
      <a-col :xs="24" :sm="24" :md="14" :lg="14" :xl="17" :xxl="17">
        <div>
          <PasswordPolicy />
        </div>
        <div style="margin-top: 16px">
          <RightBox />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import LeftBox from './BasicInfo.vue'
import RightBox from './Social.vue'
import PasswordPolicy from './Security.vue'

defineOptions({ name: 'SettingProfile' })
</script>

<style lang="scss" scoped>
.gi_page {
  background-color: var(--color-bg-1);
}
</style>
