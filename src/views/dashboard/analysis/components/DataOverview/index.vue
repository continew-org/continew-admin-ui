<template>
  <a-card class="general-card" title="数据总览">
    <a-grid :cols="24" :col-gap="12" :row-gap="12">
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
        <Pv />
      </a-grid-item>
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
        <Ip />
      </a-grid-item>
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
        <Demo1 />
      </a-grid-item>
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
        <Demo2 />
      </a-grid-item>
    </a-grid>
    <template #extra>
      <slot name="extra"></slot>
    </template>
  </a-card>
</template>

<script lang="ts" setup>
import Pv from './Pv.vue'
import Ip from './Ip.vue'
import Demo1 from './Demo1.vue'
import Demo2 from './Demo2.vue'
</script>

<style scoped lang="less"></style>
