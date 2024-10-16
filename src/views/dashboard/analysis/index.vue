<template>
  <div class="gi_page container">
    <a-space direction="vertical" :size="16" fill>
      <div>
        <a-grid :cols="24" :col-gap="16" :row-gap="16">
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 16, xxl: 16 }">
            <AccessTrend />
          </a-grid-item>
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 8, xxl: 8 }">
            <PopularModule />
          </a-grid-item>
        </a-grid>
      </div>
      <div>
        <PieItem />
      </div>
      <div>
        <AccessPeriod />
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import AccessTrend from './components/AccessTrend.vue'
import PopularModule from './components/PopularModule.vue'
import PieItem from './components/PieItem.vue'
import AccessPeriod from './components/AccessPeriod.vue'

defineOptions({ name: 'Analysis' })
</script>

<style lang="scss" scoped>
</style>
