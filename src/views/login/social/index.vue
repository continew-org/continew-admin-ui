<template>
  <a-spin :loading="loading" :tip="isLogin() ? '绑定中。。。' : '登录中。。。'">
    <div></div>
  </a-spin>
</template>
<script setup lang="ts">
import { isLogin } from '@/utils/auth'
import { bindSocialAccount } from '@/apis'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentInstance, ref } from 'vue'
const { proxy } = getCurrentInstance() as any
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const source = route.query.source as string

/**
 * 绑定第三方账号
 */
const handleBindSocial = () => {
  if (loading.value) return
  loading.value = true
  const { redirect, ...othersQuery } = router.currentRoute.value.query
  bindSocialAccount(source, othersQuery)
    .then((res) => {
      router.push({
        path: '/setting/profile',
        query: {
          tab: 'security-setting'
        }
      })
      proxy.$message.success(res.msg)
    })
    .catch(() => {
      router.push({
        path: '/setting/profile',
        query: {
          tab: 'security-setting'
        }
      })
    })
    .finally(() => {
      loading.value = false
    })
}

if (isLogin()) {
  handleBindSocial()
}
</script>

<script lang="ts">
export default {
  name: 'SocialCallback'
}
</script>

<style scoped lang="less">
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
