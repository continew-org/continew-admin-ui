<template>
  <div class="gi_page container">
    <a-space direction="vertical" :size="14" fill>
      <div>
        <DataOverview />
      </div>
      <div>
        <a-grid :cols="24" :col-gap="14" :row-gap="14">
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 18, xxl: 18 }">
            <AccessTrend />
          </a-grid-item>
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
            <Os style="margin-bottom: 16px" />
            <Browser />
          </a-grid-item>
        </a-grid>
      </div>
      <div>
        <a-grid :cols="24" :col-gap="16" :row-gap="16">
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 18, xxl: 18 }">
            <AccessTimeslot />
          </a-grid-item>
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
            <Module />
          </a-grid-item>
        </a-grid>
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import DataOverview from './components/DataOverview/index.vue'
import AccessTrend from './components/AccessTrend.vue'
import Os from './components/Os.vue'
import Browser from './components/Browser.vue'
import Module from './components/Module.vue'
import AccessTimeslot from './components/AccessTimeslot.vue'

defineOptions({ name: 'Analysis' })
</script>

<style lang="scss" scoped>
</style>
