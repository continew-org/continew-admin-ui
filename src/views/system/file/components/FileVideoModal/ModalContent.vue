<template>
  <div id="videoId"></div>
</template>

<script lang="ts" setup>
import Player from 'xgplayer'
import type { FileItem } from '@/apis'

interface Props {
  data: FileItem
}
const props = withDefaults(defineProps<Props>(), {})

onMounted(() => {
  new Player({
    id: 'videoId',
    url: props.data?.url ?? '',
    lang: 'zh-cn',
    autoplay: true,
    closeVideoClick: true,
    videoInit: true
  })
})
</script>

<style lang="scss" scoped></style>
