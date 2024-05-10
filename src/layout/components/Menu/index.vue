<template>
  <a-menu
    :mode="mode"
    :selected-keys="activeMenu"
    :auto-open-selected="autoOpenSelected"
    :accordion="appStore.menuAccordion"
    :breakpoint="appStore.layout === 'mix' ? 'xl' : undefined"
    :trigger-props="{ animationName: 'slide-dynamic-origin' }"
    :collapsed="!isDesktop ? false : appStore.menuCollapse"
    :style="menuStyle"
    @menu-item-click="onMenuItemClick"
    @collapse="onCollapse"
  >
    <MenuItem v-for="(item, index) in sidebarRoutes" :key="item.path + index" :item="item"></MenuItem>
  </a-menu>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import type { CSSProperties } from 'vue'
import MenuItem from './MenuItem.vue'
import { useAppStore, useRouteStore } from '@/stores'
import { isExternal } from '@/utils/validate'
import { useDevice } from '@/hooks'

defineOptions({ name: 'AppMenu' })
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'menu-item-click-after'): void
}>()

interface Props {
  menus?: RouteRecordRaw[]
  menuStyle?: CSSProperties
}

const { isDesktop } = useDevice()
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const routeStore = useRouteStore()
const sidebarRoutes = computed(() => (props.menus ? props.menus : routeStore.routes))

// 菜单垂直模式/水平模式
const mode = computed(() => {
  if (!['left', 'mix'].includes(appStore.layout)) {
    return 'horizontal'
  } else {
    return 'vertical'
  }
})

// 是否默认展开选中的菜单
const autoOpenSelected = computed(() => {
  return ['left', 'mix'].includes(appStore.layout)
})

// 当前页面激活菜单路径，先从路由里面找
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) {
    return [meta.activeMenu]
  }
  return [path]
})

// 菜单项点击事件
const onMenuItemClick = (key: string) => {
  if (isExternal(key)) {
    window.open(key)
    return
  }
  router.push({ path: key })
  emit('menu-item-click-after')
}

// 折叠状态改变时触发
const onCollapse = (collapsed: boolean) => {
  if (appStore.layout === 'mix') {
    appStore.menuCollapse = collapsed
  }
}
</script>

<style lang="scss" scoped></style>
