<template>
  <div class="setting" :class="{ 'setting--h5': !isDesktop }">
    <div class="setting__tabs">
      <a-tabs hide-content size="medium" :active-key="selectedKeys" @change="(key) => toPage(String(key))">
        <a-tab-pane v-for="item in list" :key="item.path" :title="item.name"> </a-tab-pane>
      </a-tabs>
    </div>

    <div class="setting__main">
      <div class="setting__main__menu">
        <a-menu :selected-keys="selectedKeys">
          <a-menu-item v-for="item in list" :key="item.path" @click="toPage(item.path)">
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="setting__main__content">
        <ParentView></ParentView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDevice } from '@/hooks'

defineOptions({ name: 'Setting' })

const route = useRoute()
const router = useRouter()
const { isDesktop } = useDevice()

const selectedKeys = ref('')
watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = newPath
  },
  { immediate: true }
)

const list = [
  { name: '基本信息', value: 1, path: '/setting/profile' },
  { name: '安全设置', value: 2, path: '/setting/security' },
  { name: '消息中心', value: 3, path: '/setting/notice' }
]

const toPage = (path: string) => {
  router.push({ path: path })
  selectedKeys.value = path
}
</script>

<style lang="scss" scoped>
.setting {
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &__tabs {
    display: none;
    background-color: var(--color-bg-1);
  }

  &__main {
    flex: 1;
    overflow: hidden;
    display: flex;
    &__menu {
      width: 200px;
      margin-top: $margin;
      margin-left: $margin;
    }
    &__content {
      flex: 1;
      height: 100%;
      padding: $margin;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}

.setting--h5 {
  flex-direction: column;
  .setting__tabs {
    display: block;
  }
  .setting__main__menu {
    display: none;
  }
}

:deep(.arco-menu-vertical .arco-menu-inner) {
  padding: 8px;
}
</style>
