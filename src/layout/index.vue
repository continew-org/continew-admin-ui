<template>
  <LayoutMix v-if="appStore.layout === 'mix'"></LayoutMix>
  <LayoutDefault v-else></LayoutDefault>
</template>

<script setup lang="ts">
import { Button, Notification, Space } from '@arco-design/web-vue'
import LayoutDefault from './LayoutDefault.vue'
import LayoutMix from './LayoutMix.vue'
import { useAppStore } from '@/stores'

defineOptions({ name: 'Layout' })
const appStore = useAppStore()
let versionTag: string | null = null // 版本标识
let timer: NodeJS.Timeout | undefined // 定时器
// 更新
const onUpdateSystem = (id: string) => {
  Notification.remove(id)
  window.location.reload()
}
// 关闭更新弹窗
const onCloseUpdateSystem = (id: string) => {
  Notification.remove(id)
}
// 提示用户更新弹窗
const handleNotification = () => {
  const id = `updateModel`
  Notification.info({
    id,
    title: '新版本更新',
    content: '当前系统检测到有新的版本，请及时更新',
    duration: 0,
    closable: true,
    position: 'bottomRight',
    footer: () => {
      return h(Space, {}, () => [h(Button, { type: 'primary', onClick: () => onUpdateSystem(id) }, '更新'), h(Button, { type: 'secondary', onClick: () => onCloseUpdateSystem(id) }, '关闭')])
    }
  })
}

/**
 * 获取首页的 ETag 或 Last-Modified 值，作为当前版本标识
 * @returns {Promise<string|null>} 返回 ETag 或 Last-Modified 值
 */
const getVersionTag = async () => {
  const response = await fetch('/', {
    cache: 'no-cache'
  })
  return response.headers.get('etag') || response.headers.get('last-modified')
}

/**
 * 比较当前的 ETag 或 Last-Modified 值与最新获取的值
 */
const compareTag = async () => {
  const newVersionTag = await getVersionTag()
  if (versionTag === null) {
    versionTag = newVersionTag
  } else if (versionTag !== newVersionTag) {
    // 如果 ETag 或 Last-Modified 发生变化，则认为有更新
    // 清除定时器
    clearInterval(timer)
    // 提示用户更新
    handleNotification()
  }
}

onMounted(() => {
  // 每60秒检查一次是否有新的 ETag 或 Last-Modified 值
  timer = setInterval(compareTag, 6000)
})
onUnmounted(() => {
  // 清除定时器
  clearInterval(timer)
})
</script>

<style lang="scss" scoped></style>
