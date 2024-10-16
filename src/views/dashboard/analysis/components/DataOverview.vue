<template>
  <a-card class="general-card" title="数据总览" :header-style="{ paddingBottom: '12px' }">
    <a-grid :cols="24" :col-gap="12" :row-gap="12">
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
        <ChainItem
          title="访问次数"
          quota="visitors"
          chart-type="line"
          :card-style="{
            background: isDark
              ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
        <ChainItem
          title="独立访客"
          quota="published"
          chart-type="bar"
          :card-style="{
            background: isDark
              ? ' linear-gradient(180deg, #3D492E 0%, #263827 100%)'
              : 'linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%)',
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
        <ChainItem
          title="终端"
          quota="comment"
          chart-type="line"
          :card-style="{
            background: isDark
              ? 'linear-gradient(180deg, #294B94 0%, #0F275C 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
        <ChainItem
          title="浏览器"
          quota="share"
          chart-type="pie"
          :card-style="{
            background: isDark
              ? 'linear-gradient(180deg, #312565 0%, #201936 100%)'
              : 'linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%)',
          }"
        />
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script setup lang="ts">
import ChainItem from './PieItem.vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const isDark = computed(() => appStore.theme === 'dark')
</script>
