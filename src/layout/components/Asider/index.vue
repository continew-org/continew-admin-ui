<template>
  <div
    v-if="isDesktop"
    class="asider"
    :class="{ 'app-menu-dark': appStore.menuDark }"
    :style="appStore.menuDark ? appStore.themeCSSVar : undefined"
  >
    <Logo :collapsed="appStore.menuCollapse"></Logo>
    <a-layout-sider
      class="menu"
      collapsible
      breakpoint="xl"
      hide-trigger
      :width="220"
      :collapsed="appStore.menuCollapse"
      @collapse="handleCollapse"
    >
      <a-scrollbar outer-class="h-full" style="height: 100%; overflow: auto">
        <Menu></Menu>
      </a-scrollbar>
    </a-layout-sider>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import Menu from '../Menu/index.vue'
import Logo from '../Logo.vue'
import { useDevice } from '@/hooks'

defineOptions({ name: 'Asider' })
const appStore = useAppStore()
const { isDesktop } = useDevice()

const handleCollapse = (isCollapsed: boolean) => {
  appStore.menuCollapse = isCollapsed
}
</script>

<style lang="scss" scoped>
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

:deep(.arco-layout-sider-children) {
  overflow: hidden;
}

.asider {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border-2);
  box-sizing: border-box;
  color: var(--color-text-1);
  background-color: var(--color-bg-1);
  .menu {
    flex: 1;
    overflow: hidden;
    background-color: inherit;
  }
}
</style>
