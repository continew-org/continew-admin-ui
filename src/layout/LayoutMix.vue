<!--
  @file LayoutMix 组件
  @description 混合布局组件，支持顶部导航和左侧菜单组合的布局方式
-->
<template>
  <div class="layout-mix">
    <!-- 左侧菜单区域 -->
    <section
      v-if="isDesktop" class="layout-mix-left" :class="{ 'app-menu-dark': appStore.menuDark }"
      :style="appStore.menuDark ? appStore.themeCSSVar : undefined"
    >
      <Logo :collapsed="appStore.menuCollapse" />
      <Menu :menus="twoLevelMenus" :menu-style="{ flex: 1 }" />
      <WwAds class="ads" />
    </section>

    <!-- 右侧内容区域 -->
    <section class="layout-mix-right">
      <header class="header">
        <MenuFoldBtn />
        <a-menu
          v-if="isDesktop" mode="horizontal" :selected-keys="activeMenu" :auto-open-selected="false"
          :trigger-props="menuTriggerProps" @menu-item-click="handleMenuItemClickByPath"
        >
          <a-menu-item v-for="item in oneLevelMenus" :key="item.path">
            <template #icon>
              <GiSvgIcon :name="getMenuIcon(item) || ''" :size="24" />
            </template>
            <span>{{ item.meta?.title || item.children?.[0]?.meta?.title || '' }}</span>
          </a-menu-item>
        </a-menu>
        <HeaderRightBar />
      </header>
      <Tabs v-if="appStore.tab" />
      <Main />
      <GiFooter v-if="appStore.copyrightDisplay" />
    </section>

    <!-- 公告弹窗 -->
    <NoticePopup ref="noticePopupRef" />
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import HeaderRightBar from './components/HeaderRightBar/index.vue'
import Logo from './components/Logo.vue'
import Main from './components/Main.vue'
import Menu from './components/Menu/index.vue'
import MenuFoldBtn from './components/MenuFoldBtn.vue'
import Tabs from './components/Tabs/index.vue'
import { useAppStore } from '@/stores'
import { useLevelMenu } from '@/layout/hooks/useLevelMenu'
import { useDevice } from '@/hooks'
import { getAccessToken } from '@/features/auth-session/access-token'

import WwAds from '@/layout/components/WwAds.vue'
import NoticePopup from '@/views/user/message/components/NoticePopup.vue'

/** 组件名称 */
defineOptions({ name: 'LayoutMix' })

const appStore = useAppStore()
const { isDesktop } = useDevice()

/** 菜单配置 */
const menuTriggerProps = {
  animationName: 'slide-dynamic-origin',
}

const { oneLevelMenus, twoLevelMenus, oneLevelMenuActiveRoute, getOneLevelMenus, handleMenuItemClickByPath } = useLevelMenu()
getOneLevelMenus()

const activeMenu = computed(() => [oneLevelMenuActiveRoute.value?.path ?? ''])

// 公告弹窗引用
const noticePopupRef = ref<InstanceType<typeof NoticePopup>>()

// 检查并显示未读公告
const checkAndShowNotices = () => {
  const accessToken = getAccessToken()

  // 如果有token，检查未读公告
  if (accessToken) {
    setTimeout(() => {
      noticePopupRef.value?.open()
    }, 1000) // 延迟1秒显示，让页面先加载完成
  }
}
const getMenuIcon = (item: RouteRecordRaw) => {
  return item.meta?.icon || item.children?.[0]?.meta?.icon
}
onMounted(() => {
  checkAndShowNotices()
})
</script>

<style lang="scss" scoped>
:deep(.arco-menu-pop) {
  white-space: nowrap;
}

:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {

  // Menu菜单组件修改
  .arco-menu-icon {
    padding: 10px 0;
    margin-right: 0;
  }

  .arco-menu-has-icon {
    justify-content: center;
    padding: 0;
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
  display: flex;
  align-items: stretch;
  height: 100%;
  overflow: hidden;

  &-left {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--color-bg-1);
    border-right: 1px solid var(--color-border);
  }

  &-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 $padding;
  overflow: hidden;
  color: var(--color-text-1);
  background: var(--color-bg-1);
  border-bottom: 1px solid var(--color-border);
}
</style>
