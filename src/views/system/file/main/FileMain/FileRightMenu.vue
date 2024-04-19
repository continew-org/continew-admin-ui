<template>
  <GiOption :class="{ shadow: props.shadow }">
    <GiOptionItem label="重命名" @click="onClickItem('rename')"> </GiOptionItem>
    <GiOptionItem label="详情" @click="onClickItem('detail')"> </GiOptionItem>
    <GiOptionItem label="下载" @click="onClickItem('download')"></GiOptionItem>
    <GiOptionItem label="删除" @click="onClickItem('delete')"> </GiOptionItem>
  </GiOption>
</template>

<script setup lang="ts">
import GiOption from '@/components/GiOption/index.vue'
import GiOptionItem from '@/components/GiOptionItem/index.vue'
import type { FileItem } from '@/apis'

interface Props {
  data?: FileItem
  shadow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  shadow: true
})

const emit = defineEmits<{
  (e: 'click', mode: string): void
}>()

const onClickItem = (mode: string) => {
  emit('click', mode)
}
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
  background: var(--color-bg-popup);
}
</style>
