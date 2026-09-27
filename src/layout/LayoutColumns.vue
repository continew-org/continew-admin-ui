<template>
  <div class="layout-columns">
    <div v-show="isDesktop" class="layout-columns__left">
      <!-- 左侧一级菜单区域 -->
      <OneLevelMenu :menus="oneLevelMenus" @menu-click="handleMenuItemClickByItem"></OneLevelMenu>

      <!-- 左侧二级菜单区域 -->
      <div v-if="twoLevelMenus.length > 0" class="layout-columns__right-menu" :class="{ collapse: appStore.menuCollapse }">
        <!-- 系统标题 -->
        <div class="layout-columns__title">
          <span v-show="!appStore.menuCollapse" class="system-name gi_line_1">{{ appStore.getTitle() }}</span>
        </div>
        <Menu
          v-if="twoLevelMenus.length >= 1 || oneLevelMenuActiveRoute?.meta?.alwaysShow === true"
          class="layout-columns__menu" :menus="twoLevelMenus" :menu-style="menuStyle"
        />
      </div>
    </div>

    <section class="layout-columns__content">
      <Header />
      <Tabs v-if="appStore.tab" />
      <Main />
      <GiFooter v-if="appStore.copyrightDisplay" />
    </section>

    <!-- 公告弹窗 -->
    <NoticePopup ref="noticePopupRef" />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header/index.vue'
import Main from './components/Main.vue'
import Menu from './components/Menu/index.vue'
import OneLevelMenu from './components/OneLevelMenu/index.vue'
import Tabs from './components/Tabs/index.vue'
import { useAppStore } from '@/stores'
import { useLevelMenu } from '@/layout/hooks/useLevelMenu'
import { useDevice } from '@/hooks'
import NoticePopup from '@/views/user/message/components/NoticePopup.vue'
import { getAccessToken } from '@/features/auth-session/access-token'

defineOptions({ name: 'LayoutColumns' })

const appStore = useAppStore()
const { isDesktop } = useDevice()

const { oneLevelMenus, twoLevelMenus, oneLevelMenuActiveRoute, getOneLevelMenus, handleMenuItemClickByItem } = useLevelMenu()
getOneLevelMenus()
// 菜单样式 - 根据折叠状态动态调整宽度
const menuStyle = computed(() => {
  return {
    width: appStore.menuCollapse ? '48px' : '200px',
  }
})
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
onMounted(() => {
  checkAndShowNotices()
})
</script>

<style lang="scss" scoped>
.layout-columns {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__left {
    display: flex;
    height: 100%;
    overflow: hidden;
    background-color: var(--color-bg-1);
  }

  &__right-menu {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--color-bg-1);
    width: 200px;
    transition: width 0.3s ease-in-out;
    &.collapse {
      width: 48px;
    }
  }

  &__title {
    height: 56px;
    padding: 0 12px;
    color: var(--color-text-1);
    font-size: 20px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease-in-out;

    .system-name {
      padding-left: 6px;
      white-space: nowrap;
      transition: all 0.3s ease-in-out;
      line-height: 1.5;
      display: inline-flex;
      align-items: center;
      opacity: 1;
      transform: translateX(0);

      &:hover {
        color: $color-theme !important;
        cursor: pointer;
      }

      .layout-columns__right-menu.collapse & {
        opacity: 0;
        transform: translateX(-20px);
      }
    }
  }
  &__menu {
    flex: 1;
    overflow: auto;
    border-right: 1px solid var(--color-border-2);
    transition: all 0.3s ease-in-out;
    width: 100%;
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
