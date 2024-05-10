<template>
  <a-card title="快捷操作" :bordered="false" size="medium" class="card gi_card_title">
    <a-card-grid v-for="(item, index) in list" :key="item.name" class="card-grid-item" :style="{ width: '33.33%' }">
      <a-card :bordered="false" hoverable>
        <a-row justify="center" align="center" :class="`animated-fade-up-${index + 1}`">
          <a-space direction="vertical" align="center" class="wrapper" @click="router.replace({ path: item.path })">
            <component :is="item.icon" :size="30" class="icon"></component>
            <a-typography-text class="text">{{ item.name }}</a-typography-text>
          </a-space>
        </a-row>
      </a-card>
    </a-card-grid>
  </a-card>
</template>

<script setup lang="ts">
const router = useRouter()

const list = [
  { name: '用户管理', icon: 'icon-user', path: '/system/user' },
  { name: '角色管理', icon: 'icon-user-group', path: '/system/role' },
  { name: '菜单管理', icon: 'icon-menu', path: '/system/menu' },
  { name: '文件管理', icon: 'icon-file', path: '/system/file' },
  { name: '系统配置', icon: 'icon-desktop', path: '/system/config' },
  { name: '系统日志', icon: 'icon-history', path: '/monitor/log' }
]
</script>

<style lang="scss" scoped>
.card {
  overflow: hidden;
  :deep(.arco-card-header) {
    border: none;
  }
  .card-grid-item {
    cursor: pointer;
  }

  :deep(.text) {
    font-size: 12px;
    text-align: center;
    color: rgb(var(--gray-8));
  }

  :deep(.wrapper) {
    margin-bottom: 8px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      .text {
        margin-bottom: 0;
      }
    }
    &:hover {
      .icon {
        color: rgb(var(--arcoblue-6));
      }
      .text {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  :deep(.icon) {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
    color: rgb(var(--gray-8));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
  }
}
</style>
