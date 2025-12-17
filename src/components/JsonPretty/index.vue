<template>
  <div class="json_pretty_container">
    <JsonViewer :expand-depth="5" :value="JSONObject" :theme="currentThemeClass" sort />
    <icon-copy class="copy_icon" @click="onCopy(JSONObject)" />
  </div>
</template>

<script setup lang="ts">
import JsonViewer from 'vue-json-viewer'
import { useTheme } from '@arco-design/web-vue/es/watermark/hooks/use-theme'
import { copyText } from '@/utils'

defineOptions({ name: 'JsonPretty', inheritAttrs: false })

const props = defineProps<{
  json: string
}>()
const JSONObject = computed(() => JSON.parse(props?.json))

// 拷贝
const onCopy = (data: object) => {
  copyText(JSON.stringify(data))
}
// 监听主题变化
const { theme } = useTheme()
const currentThemeClass = computed(() => (theme.value === 'dark' ? 'vscode-dark' : 'vscode-light'))
</script>

<style scoped lang="scss">
@use "./json-them.scss";
.json_pretty_container {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .copy_icon {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
