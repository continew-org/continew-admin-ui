<template>
  <CodeMirror
    :model-value="codeValue"
    :tab-size="config.tabSize"
    :basic="config.basic"
    :dark="config.dark"
    :readonly="config.readonly"
    :extensions="extensions"
  />
</template>

<script lang="ts" setup>
import CodeMirror from 'vue-codemirror6'
import { javascript } from '@codemirror/lang-javascript'
import { vue } from '@codemirror/lang-vue'
import { githubLight } from '@ddietr/codemirror-themes/github-light'
import { oneDark } from '@codemirror/theme-one-dark'
import { useAppStore } from '@/stores'

const props = withDefaults(defineProps<Props>(), {
  type: 'javascript',
  codeJson: ''
})
const appStore = useAppStore()
const isDark = computed(() => appStore.theme === 'dark')

interface Props {
  type?: 'javascript' | 'vue'
  codeJson: string
}
const defaultConfig = {
  tabSize: 2,
  basic: true,
  dark: true,
  readonly: true
}
const config = defaultConfig

const codeValue = computed(() => props.codeJson)
const visible = ref(false)
// 打开
const open = () => {
  visible.value = true
}

const extensions = computed(() => {
  const arr = [isDark.value ? oneDark : githubLight]
  if (props.type === 'javascript') {
    arr.push(javascript())
  }
  if (props.type === 'vue') {
    arr.push(vue())
  }
  return arr
})

defineExpose({ open })
</script>

<style lang="scss" scoped>
:deep(.ͼ1 .cm-scroller) {
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
}
</style>
