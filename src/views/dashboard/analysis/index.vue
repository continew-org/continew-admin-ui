<template>
  <div class="gi_page container">
    <a-space direction="vertical" :size="16" fill>
      <div>
        <AccessTrend />
      </div>
      <div>
        <a-grid :cols="24" :col-gap="16" :row-gap="16">
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 8, xxl: 8 }">
            <ModuleItem />
          </a-grid-item>
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 8, xxl: 8 }">
            <OsItem />
          </a-grid-item>
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 8, xxl: 8 }">
            <BrowserItem />
          </a-grid-item>
        </a-grid>
      </div>
      <div>
        <AccessTimeslot />
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import AccessTrend from './components/AccessTrend.vue'
import ModuleItem from './components/ModuleItem.vue'
import OsItem from './components/OsItem.vue'
import BrowserItem from './components/BrowserItem.vue'
import AccessTimeslot from './components/AccessTimeslot.vue'

defineOptions({ name: 'Analysis' })
</script>

<style lang="scss" scoped>
</style>
