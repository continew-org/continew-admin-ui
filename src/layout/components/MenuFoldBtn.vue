<template>
  <a-button size="mini" class="gi_hover_btn menu-fold-btn" @click="onClick">
    <template #icon>
      <icon-menu-fold v-if="!appStore.menuCollapse" :size="18" :stroke-width="3" />
      <icon-menu-unfold v-else :size="18" :stroke-width="3" />
    </template>
  </a-button>

  <div
    class="drawer"
    :class="{ 'app-menu-dark': appStore.menuDark }"
    :style="appStore.menuDark ? appStore.themeCSSVar : undefined"
  >
    <a-drawer
      v-model:visible="visible"
      placement="left"
      :header="false"
      :footer="false"
      :render-to-body="false"
      :drawer-style="{
        'border-right': '1px solid var(--color-border-2)',
        'box-sizing': 'border-box',
        'background-color': 'var(--color-bg-1)'
      }"
    >
      <Logo :collapsed="false"></Logo>
      <Menu class="menu w-full" @menu-item-click-after="visible = false"></Menu>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores'
import Logo from '@/layout/components/Logo.vue'
import Menu from '@/layout/components/Menu/index.vue'
import { useDevice } from '@/hooks'

defineOptions({ name: 'MenuFoldBtn' })
const appStore = useAppStore()
const { isDesktop } = useDevice()
const visible = ref(false)

const onClick = () => {
  if (isDesktop.value) {
    appStore.setMenuCollapse(!appStore.menuCollapse)
  } else {
    visible.value = !visible.value
  }
}
</script>

<style lang="scss" scoped>
.menu-fold-btn {
  background-color: var(--color-secondary-hover) !important;
  flex-shrink: 0;
}

.drawer {
  .menu {
    flex: 1;
    overflow: hidden;
    background-color: inherit;
  }
  :deep(.arco-drawer-body) {
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
