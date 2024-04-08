<template>
  <a-layout class="main">
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName(route)" mode="out-in" appear>
        <keep-alive :include="(tabsStore.cacheList as string[])">
          <component :is="Component" :key="route.matched?.[1]?.path" />
        </keep-alive>
      </transition>
    </router-view>
  </a-layout>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useAppStore, useTabsStore } from '@/stores'

defineOptions({ name: 'Main' })
const appStore = useAppStore()
const tabsStore = useTabsStore()

// 过渡动画
const transitionName = computed(() => {
  return function (route: RouteLocationNormalizedLoaded) {
    if (route?.matched?.[1]?.meta?.animation === false) {
      return ''
    }
    return appStore.transitionName
  }
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
</style>
