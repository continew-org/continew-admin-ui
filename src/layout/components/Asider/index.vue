<template>
  <div
    v-if="isDesktop" class="asider" :class="{ 'app-menu-dark': appStore.menuDark }"
    :style="appStore.menuDark ? appStore.themeCSSVar : undefined"
  >
    <a-layout-sider
      class="menu" collapsible breakpoint="xl" hide-trigger :width="230"
      :collapsed="appStore.menuCollapse" @collapse="handleCollapse"
    >
      <Logo :collapsed="appStore.menuCollapse"></Logo>
      <a-scrollbar outer-class="menu-scroll-view" style="height: 100%; overflow: auto">
        <Menu></Menu>
      </a-scrollbar>
      <WwAds class="ads" />
    </a-layout-sider>
  </div>
</template>

<script setup lang="ts">
import Menu from '../Menu/index.vue'
import Logo from '../Logo.vue'
import WwAds from '../WwAds.vue'
import { useAppStore } from '@/stores'
import { useDevice } from '@/hooks'

defineOptions({ name: 'Asider' })
const appStore = useAppStore()
const { isDesktop } = useDevice()

const handleCollapse = (isCollapsed: boolean) => {
  appStore.menuCollapse = isCollapsed
}
</script>

<style scoped lang="scss">
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
  display: flex;
  flex-direction: column;
}

.asider {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border-2);
  box-sizing: border-box;
  color: var(--color-text-1);
  background-color: var(--color-bg-1);

  .menu-scroll-view {
    flex: 1;
    overflow: hidden;
  }

  .menu {
    flex: 1;
    overflow: hidden;
    background-color: inherit;
  }
}
</style>
