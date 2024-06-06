<template>
  <a-spin :loading="loading" :tip="isLogin() ? '绑定中...' : '登录中...'">
    <div></div>
  </a-spin>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useRoute, useRouter } from 'vue-router'
import { bindSocialAccount } from '@/apis'
import { useUserStore } from '@/stores'
import { isLogin } from '@/utils/auth'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const source = route.query.source as string
const loading = ref(false)

// 三方账号登录
const handleSocialLogin = () => {
  if (loading.value) return
  loading.value = true
  const { redirect, ...othersQuery } = router.currentRoute.value.query
  userStore
    .socialLogin(source, othersQuery)
    .then(() => {
      router.push({
        path: (redirect as string) || '/',
        query: {
          ...othersQuery
        }
      })
      Message.success('欢迎使用')
    })
    .catch(() => {
      router.push({
        name: 'Login',
        query: {
          ...othersQuery
        }
      })
    })
    .finally(() => {
      loading.value = false
    })
}

// 绑定三方账号
const handleBindSocial = () => {
  if (loading.value) return
  loading.value = true
  const { ...othersQuery } = router.currentRoute.value.query
  bindSocialAccount(source, othersQuery)
    .then(() => {
      router.push({
        path: '/setting/profile',
        query: {
          ...othersQuery
        }
      })
      Message.success('绑定成功')
    })
    .catch(() => {
      router.push({
        path: '/setting/profile',
        query: {
          ...othersQuery
        }
      })
    })
    .finally(() => {
      loading.value = false
    })
}

if (isLogin()) {
  handleBindSocial()
} else {
  handleSocialLogin()
}
</script>

<style scoped lang="less">
:deep(.arco-spin-mask) {
  background-color: transparent;
}

div {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 50%;
  top: 45%;
  margin-left: -50px;
  margin-top: -50px;
}
</style>
