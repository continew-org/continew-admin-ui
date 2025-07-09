<template>
  <a-layout class="layout layout-default" :class="{ mobile: isMobile }">
    <Asider></Asider>
    <a-layout class="layout-default-right">
      <Header></Header>
      <Tabs></Tabs>
      <Main></Main>
      <GiFooter v-if="appStore.copyrightDisplay" />
    </a-layout>

    <!-- 公告弹窗 -->
    <NoticePopup ref="noticePopupRef" />
  </a-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Asider from './components/Asider/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main.vue'
import Tabs from './components/Tabs/index.vue'
import GiFooter from '@/components/GiFooter/index.vue'
import NoticePopup from '@/views/user/message/components/NoticePopup.vue'
import { useAppStore } from '@/stores'
import { useDevice } from '@/hooks'
import { getToken } from '@/utils/auth'

defineOptions({ name: 'LayoutDefault' })
const appStore = useAppStore()
const { isMobile } = useDevice()

// 公告弹窗引用
const noticePopupRef = ref<InstanceType<typeof NoticePopup>>()

// 检查并显示未读公告
const checkAndShowNotices = () => {
  const token = getToken()

  // 如果有token，检查未读公告
  if (token) {
    setTimeout(() => {
      noticePopupRef.value?.open()
    }, 1000) // 延迟1秒显示，让页面先加载完成
  }
}

onMounted(() => {
  checkAndShowNotices()
})
</script>

<style scoped lang="scss">
.layout {
  height: 100%;
}

.layout-default {
  flex-direction: row;

  &-right {
    overflow: hidden;
  }
}
</style>
