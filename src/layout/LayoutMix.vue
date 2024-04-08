<template>
  <div class="layout-mix">
    <section
      v-if="isDesktop"
      class="layout-mix-left"
      :class="{ 'app-menu-dark': appStore.menuDark }"
      :style="appStore.menuDark ? appStore.themeCSSVar : undefined"
    >
      <Logo :collapsed="appStore.menuCollapse"></Logo>
      <Menu :menus="leftMenus" :menu-style="{ width: '200px', flex: 1 }"></Menu>
    </section>

    <section class="layout-mix-right">
      <header class="header">
        <MenuFoldBtn></MenuFoldBtn>
        <a-menu
          v-if="isDesktop"
          mode="horizontal"
          :selected-keys="activeMenu"
          :auto-open-selected="false"
          :trigger-props="{ animationName: 'slide-dynamic-origin' }"
          @menu-item-click="onMenuItemClick"
        >
          <a-menu-item v-for="item in topMenus" :key="item.path">
            <template #icon>
              <GiSvgIcon
                v-if="getMenuIcon(item, 'svgIcon')"
                :name="getMenuIcon(item, 'svgIcon')"
                :size="24"
              ></GiSvgIcon>
              <template v-else>
                <component v-if="getMenuIcon(item, 'svgIcon')" :is="getMenuIcon(item, 'icon')"></component>
              </template>
            </template>
            <span>{{ item.meta?.title || item.children?.[0]?.meta?.title || '' }}</span>
          </a-menu-item>
        </a-menu>
        <HeaderRightBar></HeaderRightBar>
      </header>

      <Tabs></Tabs>
      <Main></Main>
    </section>
  </div>
</template>

<script setup lang="ts">
import Main from './components/Main.vue'
import Tabs from './components/Tabs/index.vue'
import Menu from './components/Menu/index.vue'
import HeaderRightBar from './components/HeaderRightBar/index.vue'
import Logo from './components/Logo.vue'
import MenuFoldBtn from './components/MenuFoldBtn.vue'
import { useAppStore, useRouteStore } from '@/stores'
import type { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import { searchTree } from 'xe-utils'
import { filterTree } from '@/utils'
import { useDevice } from '@/hooks'

defineOptions({ name: 'LayoutMix' })
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const routeStore = useRouteStore()
const { isDesktop } = useDevice()
// 过滤是菜单的路由
const menuRoutes = filterTree(routeStore.routes, (i) => i.meta?.hidden === false)

// 顶部一级菜单
const topMenus = ref<RouteRecordRaw[]>([])
topMenus.value = JSON.parse(JSON.stringify(menuRoutes))
console.log('topMenus', toRaw(topMenus.value))

const getMenuIcon = (item: RouteRecordRaw, key: 'svgIcon' | 'icon') => {
  return item.meta?.[key] || item.children?.[0].meta?.[key]
}

const onMenuItemClick = (key: string) => {
  if (isExternal(key)) {
    window.open(key)
    return
  }
  setTimeout(() => getLeftMenus(key))
  const obj = topMenus.value.find((i) => i.path === key)
  if (obj && obj.redirect === 'noRedirect') return
  router.push({ path: key })
}

// 克隆是菜单的路由
const cloneMenuRoutes: RouteRecordRaw[] = JSON.parse(JSON.stringify(menuRoutes))
// 顶部一级菜单选中的
const activeMenu = ref<string[]>([])
// 左侧的菜单
const leftMenus = ref<RouteRecordRaw[]>([])
// 获取左侧菜单
const getLeftMenus = (key: string) => {
  const arr = searchTree(cloneMenuRoutes, (i) => i.path === key, { children: 'children' })
  const rootPath = arr.length ? arr[0].path : ''
  const obj = cloneMenuRoutes.find((i) => i.path === rootPath)
  activeMenu.value = obj ? [obj.path] : ['']
  leftMenus.value = obj ? (obj.children as RouteRecordRaw[]) : []
}

watch(
  () => route.path,
  (newPath) => {
    nextTick(() => {
      getLeftMenus(newPath)
    })
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
:deep(.arco-menu-pop) {
  white-space: nowrap;
}

:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
  // Menu菜单组件修改
  .arco-menu-icon {
    margin-right: 0;
    padding: 10px 0;
  }
  .arco-menu-has-icon {
    padding: 0;
    justify-content: center;
  }
  .arco-menu-title {
    display: none;
  }
}

:deep(.arco-menu-horizontal) {
  flex: 1;
  overflow: hidden;
  .arco-menu-inner {
    padding-left: 0;
    .arco-menu-overflow-wrap {
      white-space: nowrap;
    }
  }
}

.layout-mix {
  height: 100%;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  &-left {
    border-right: 1px solid var(--color-border);
    background-color: var(--color-bg-1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  &-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}

.header {
  padding: 0 $padding;
  height: 56px;
  color: var(--color-text-1);
  background: var(--color-bg-1);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
</style>
