<template>
  <LayoutMix v-if="appStore.layout === 'mix'"></LayoutMix>
  <LayoutDefault v-else></LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from './LayoutDefault.vue'
import LayoutMix from './LayoutMix.vue'
import { useAppStore } from '@/stores'

defineOptions({ name: 'Layout' })
const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
