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
import { oneDark } from '@codemirror/theme-one-dark'

interface Props {
  type?: 'javascript' | 'vue'
  codeJson: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'javascript',
  codeJson: ''
})

const visible = ref(false)
const open = () => {
  visible.value = true
}
defineExpose({ open })

const defaultConfig = {
  tabSize: 2,
  basic: true,
  dark: true,
  readonly: true
}
const config = defaultConfig

const codeValue = computed(() => props.codeJson)
const extensions = computed(() => {
  const arr = [oneDark]
  if (props.type === 'javascript') {
    arr.push(javascript())
  }
  if (props.type === 'vue') {
    arr.push(vue())
  }
  return arr
})
</script>

<style lang="scss" scoped>
:deep(.ͼ1 .cm-scroller) {
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
}
</style>
