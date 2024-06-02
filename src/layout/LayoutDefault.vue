<template>
  <a-layout class="layout layout-default">
    <Asider></Asider>
    <a-layout class="layout-default-right">
      <Header></Header>
      <Tabs></Tabs>
      <Main></Main>
      <GiFooter v-if="appStore.copyrightDisplay" />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Asider from './components/Asider/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main.vue'
import Tabs from './components/Tabs/index.vue'
import GiFooter from '@/components/GiFooter/index.vue'
import { useAppStore } from '@/stores'

defineOptions({ name: 'LayoutDefault' })
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}

.layout-default {
  flex-direction: row;

  &-right {
    overflow: hidden;
  }
}
</style>
