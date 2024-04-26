<template>
  <a-row justify="end" align="center">
    <a-space size="medium">
      <!-- 项目配置 -->
      <a-tooltip content="项目配置" position="bl">
        <a-button size="mini" class="gi_hover_btn" @click="SettingDrawerRef?.open">
          <template #icon>
            <icon-settings :size="18" />
          </template>
        </a-button>
      </a-tooltip>

      <!-- 消息通知 -->
      <a-popover position="bottom" trigger="click">
        <a-badge :count="9" dot>
          <a-button size="mini" class="gi_hover_btn">
            <template #icon>
              <icon-notification :size="18" />
            </template>
          </a-button>
        </a-badge>
        <template #content>
          <Message></Message>
        </template>
      </a-popover>

      <!-- 全屏切换组件 -->
      <a-tooltip v-if="!isMobile()" content="全屏切换" position="bottom">
        <a-button size="mini" class="gi_hover_btn" @click="toggle">
          <template #icon>
            <icon-fullscreen :size="18" v-if="!isFullscreen" />
            <icon-fullscreen-exit :size="18" v-else />
          </template>
        </a-button>
      </a-tooltip>

      <!-- 暗黑模式切换 -->
      <a-tooltip content="主题切换" position="bottom">
        <GiThemeBtn></GiThemeBtn>
      </a-tooltip>

      <!-- 管理员账户 -->
      <a-dropdown trigger="hover">
        <a-row align="center" :wrap="false" class="user">
          <!-- 管理员头像 -->
          <a-avatar :size="32">
            <img :src="userStore.avatar" alt="avatar" />
          </a-avatar>
          <span class="username">{{ userStore.name }}</span>
          <icon-down />
        </a-row>
        <template #content>
          <a-doption @click="router.push('/setting/profile')">
            <span>账号管理</span>
          </a-doption>
          <a-doption @click="router.push('/setting/security')">
            <span>安全设置</span>
          </a-doption>
          <a-divider :margin="0" />
          <a-doption @click="logout">
            <span>退出登录</span>
          </a-doption>
        </template>
      </a-dropdown>
    </a-space>
  </a-row>

  <SettingDrawer ref="SettingDrawerRef"></SettingDrawer>
</template>

<script setup lang="ts">
import { Modal } from '@arco-design/web-vue'
import { useUserStore } from '@/stores'
import SettingDrawer from './SettingDrawer.vue'
import Message from './Message.vue'
import { isMobile } from '@/utils'
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()

defineOptions({ name: 'HeaderRight' })
const router = useRouter()
const userStore = useUserStore()
const SettingDrawerRef = ref<InstanceType<typeof SettingDrawer>>()

// 退出登录
const logout = () => {
  Modal.warning({
    title: '提示',
    content: '确认退出登录？',
    hideCancel: false,
    closable: true,
    onBeforeOk: async () => {
      try {
        await userStore.logout()
        router.replace('/login')
        return true
      } catch (error) {
        return false
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}

.user {
  cursor: pointer;
  color: var(--color-text-1);
  .username {
    margin-left: 10px;
    white-space: nowrap;
  }
  .arco-icon-down {
    transition: all 0.3s;
    margin-left: 2px;
  }
}
</style>
