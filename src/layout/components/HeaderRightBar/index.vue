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
            <icon-fullscreen v-if="!isFullscreen" :size="18" />
            <icon-fullscreen-exit v-else :size="18" />
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
            <span>个人中心</span>
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
import { useFullscreen } from '@vueuse/core'
import SettingDrawer from './SettingDrawer.vue'
import Message from './Message.vue'
import { useUserStore } from '@/stores'
import { isMobile } from '@/utils'

defineOptions({ name: 'HeaderRight' })

const { isFullscreen, toggle } = useFullscreen()

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

const checkPasswordExpired = () => {
  if (!userStore.pwdExpiredShow || !userStore.userInfo.pwdExpired) {
    return
  }
  Modal.confirm({
    title: '提示',
    content: '密码已过期，需要跳转到修改密码页面？',
    hideCancel: false,
    closable: true,
    onBeforeOk: async () => {
      try {
        await router.push({ path: '/setting/profile' })
        return true
      } catch (error) {
        return false
      }
    },
    onCancel: () => {
      // 当前登录会话不再提示
      userStore.pwdExpiredShow = false
    }
  })
}

onMounted(() => {
  checkPasswordExpired()
})
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
