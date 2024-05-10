<template>
  <div class="content">
    <icon-copy :size="16" @click="copyText" />
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

interface Props {
  value: any
}
const props = withDefaults(defineProps<Props>(), {})
const copyText = () => {
  const textarea = document.createElement('textarea')
  textarea.value = props.value
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  Message.success('复制成功')
}
</script>

<style scoped lang="scss">
.content {
  display: inline-block;
  margin-left: 5px;
  cursor: pointer;
}
</style>
