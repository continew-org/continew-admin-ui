<template>
  <section class="system-logo" :class="{ collapsed: props.collapsed }" @click="toHome">
    <img v-if="logo" class="logo" :src="logo" alt="logo" />
    <img v-else class="logo" src="/logo.svg" alt="logo" />
    <span class="system-name">{{ title }}</span>
  </section>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'

const props = withDefaults(defineProps<Props>(), {
  collapsed: false
})
const appStore = useAppStore()
const title = computed(() => appStore.getTitle())
const logo = computed(() => appStore.getLogo())

interface Props {
  collapsed?: boolean
}
const router = useRouter()
// 跳转首页
const toHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.system-logo {
  height: 56px;
  padding: 0 12px;
  color: var(--color-text-1);
  font-size: 20px;
  line-height: 1;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  &.collapsed {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .system-name {
      display: none;
    }
  }
  .logo {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    transition: all 0.2s;
    overflow: hidden;
    flex-shrink: 0;
  }
  .system-name {
    padding-left: 6px;
    white-space: nowrap;
    transition: color 0.3s;
    &:hover {
      color: $color-theme !important;
      cursor: pointer;
    }
  }
}
</style>
