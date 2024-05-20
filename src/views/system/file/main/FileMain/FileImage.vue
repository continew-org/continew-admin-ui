<template>
  <img v-if="isImage" class="file-image" :src="props.data.thumbnailUrl" alt="" />
  <GiSvgIcon v-else size="100%" :name="getFileImg"></GiSvgIcon>
</template>

<script setup lang="ts">
import { FileIcon, ImageTypes } from '@/constant/file'
import type { FileItem } from '@/apis'

interface Props {
  data: FileItem
}

const props = withDefaults(defineProps<Props>(), {})

// 是否是图片类型文件
const isImage = computed(() => {
  const extension = props.data.extension.toLowerCase()
  return ImageTypes.includes(extension)
})

// 获取文件图标，如果是图片就显示图片
const getFileImg = computed<string>(() => {
  const extension = props.data.extension.toLowerCase()
  if (ImageTypes.includes(extension)) {
    return props.data.url || ''
  }
  if (!Object.keys(FileIcon).includes(extension)) {
    return FileIcon['other']
  }
  return FileIcon[extension]
})
</script>

<style lang="scss" scoped>
.file-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
