<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="(tabsStore.cacheList as string[])">
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/stores'

defineOptions({ name: 'ParentView' })

const tabsStore = useTabsStore()
</script>

<style lang="scss" scoped></style>
