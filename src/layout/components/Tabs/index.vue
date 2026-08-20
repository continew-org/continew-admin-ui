<template>
  <div v-if="appStore.tab" class="tabs">
    <a-tabs
      editable
      hide-content
      size="medium"
      :type="appStore.tabMode"
      :active-key="route.path"
      @tab-click="handleTabClick($event as string)"
      @delete="tabsStore.closeCurrent($event as string)"
    >
      <a-tab-pane
        v-for="item of tabsStore.tabList"
        :key="item.path"
        :title="(item.meta?.title as string)"
        :closable="Boolean(!item.meta?.affix)"
      >
        <template #title>
          <a-dropdown trigger="contextMenu">
            <span @contextmenu="(e) => handleContextMenu(e, item.path)">
              {{ item.meta?.title }}
            </span>
            <template #content>
              <a-doption @click="reload">
                <template #icon>
                  <icon-refresh class="reload-icon" :class="{ 'reload-icon--spin': loading }" />
                </template>
                <template #default>重新加载</template>
              </a-doption>
              <a-doption @click="tabsStore.closeCurrent(currentContextPath)">
                <template #icon>
                  <icon-close />
                </template>
                <template #default>关闭当前</template>
              </a-doption>
              <a-doption @click="tabsStore.closeLeft(currentContextPath)">
                <template #icon>
                  <icon-to-left />
                </template>
                <template #default>关闭左侧</template>
              </a-doption>
              <a-doption @click="tabsStore.closeRight(currentContextPath)">
                <template #icon>
                  <icon-to-right />
                </template>
                <template #default>关闭右侧</template>
              </a-doption>
              <a-doption @click="tabsStore.closeOther(currentContextPath)">
                <template #icon>
                  <icon-close />
                </template>
                <template #default>关闭其他</template>
              </a-doption>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>
      <template #extra>
        <ReloadIcon></ReloadIcon>
        <a-dropdown trigger="hover">
          <a-button type="text">
            <template #icon>
              <icon-more-vertical />
            </template>
          </a-button>
          <template #content>
            <a-doption @click="tabsStore.closeCurrent(route.path)">
              <template #icon>
                <icon-close />
              </template>
              <template #default>关闭当前</template>
            </a-doption>
            <a-doption @click="tabsStore.closeLeft(currentContextPath)">
              <template #icon>
                <icon-to-left />
              </template>
              <template #default>关闭左侧</template>
            </a-doption>
            <a-doption @click="tabsStore.closeRight(currentContextPath)">
              <template #icon>
                <icon-to-right />
              </template>
              <template #default>关闭右侧</template>
            </a-doption>
            <a-doption @click="tabsStore.closeOther(route.path)">
              <template #icon>
                <icon-close />
              </template>
              <template #default>关闭其他</template>
            </a-doption>
            <a-doption @click="tabsStore.closeAll">
              <template #icon>
                <icon-minus />
              </template>
              <template #default>关闭全部</template>
            </a-doption>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import ReloadIcon from './ReloadIcon.vue'
import { useAppStore, useTabsStore } from '@/stores'
import { useRouteListener } from '@/hooks'

defineOptions({ name: 'Tabs' })

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const tabsStore = useTabsStore()
const { listenerRouteChange } = useRouteListener()

// 菜单获取的路径
const currentContextPath = ref('')

// Initialize tabs
tabsStore.init()

/** 监听路由变化 */
listenerRouteChange(({ to }) => {
  if (to.name) {
    const rawTo = toRaw(to)
    tabsStore.addTabItem(rawTo)
    tabsStore.addCacheItem(rawTo)
  }
})

const handleTabClick = (key: string | number) => {
  const obj = tabsStore.tabList.find((i) => i.path === key)
  obj ? router.push(obj.fullPath || obj.path) : router.push(String(key))
}

const handleContextMenu = (e: MouseEvent, path: string) => {
  if (!path) return
  e.preventDefault()
  currentContextPath.value = path
}

const loading = ref(false)
// 重新加载
const reload = () => {
  if (loading.value) return
  loading.value = true
  tabsStore.reloadPage()
  setTimeout(() => {
    loading.value = false
  }, 600)
}
</script>

<style scoped lang="scss">
:deep(.arco-tabs-nav-tab) {
  .arco-tabs-tab {
    svg {
      width: 0;
      transition: all 0.15s;
    }

    &:hover {
      svg {
        width: 1em;
      }
    }
  }

  &:not(.arco-tabs-nav-tab-scroll) {
    .arco-tabs-tab:first-child {
      border-left: 0;
    }
  }
}

:deep(.arco-dropdown-option-icon) {
  color: var(--color-text-3);
}

.tabs {
  padding: 5px 0;
  background-color: var(--color-bg-1);
  position: relative;
}

.reload-icon {
  cursor: pointer;

  &--spin {
    animation-name: arco-loading-circle;
    animation-duration: 0.6s;
  }
}
</style>
