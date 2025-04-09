<!-- 未完善 -->
<template>
  <div ref="divRef" class="container">
    <div class="aie-container">
      <div class="aie-header-panel" style="display: none;">
        <div class="aie-container-header"></div>
      </div>
      <div class="aie-main">
        <div class="aie-container-panel">
          <div class="aie-container-main"></div>
        </div>
      </div>
      <div class="aie-container-footer" style="display: none;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AiEditor, type AiEditorOptions } from 'aieditor'
import 'aieditor/dist/style.css'
import { useAppStore } from '@/stores'

defineOptions({ name: 'AiEditor' })
const props = defineProps<{
  modelValue: string
  options?: AiEditorOptions
}>()
const aieditor = ref<AiEditor | null>(null)
const appStore = useAppStore()
const divRef = ref<any>()

const editorConfig = reactive<AiEditorOptions>({
  element: '',
  theme: appStore.theme,
  placeholder: '请输入内容',
  content: '',
  editable: false,
})
const init = () => {
  aieditor.value?.destroy()
  aieditor.value = new AiEditor(editorConfig)
}
watch(() => props.modelValue, (value) => {
  if (value !== aieditor.value?.getHtml()) {
    editorConfig.content = value
    init()
  }
})
watch(() => appStore.theme, (value) => {
  editorConfig.theme = value
  init()
})

// 挂载阶段
onMounted(() => {
  editorConfig.element = divRef.value
  init()
})
// 销毁阶段
onUnmounted(() => {
  aieditor.value?.destroy()
})
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.aie-header-panel {
  position: sticky;
  // top: 51px;
  z-index: 1;
}

.aie-header-panel aie-header>div {
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}

.aie-container {
  border: none !important;
}

.aie-container-panel {
  width: calc(100% - 2rem - 2px);
  max-width: 826.77px;
  margin: 0rem auto;
  border: 1px solid var(--color-border-1);
  background-color: var() rgba($color: var(--color-bg-1), $alpha: 1.0);
  height: 100%;
  padding: 1rem;
  z-index: 99;
  overflow: auto;
  box-sizing: border-box;
}

.aie-main {
  position: relative;
  overflow: hidden;
  flex: 1;
  box-sizing: border-box;
  padding: 1rem 0px;
  background-color: var(--color-bg-1);
}

.aie-directory {
  position: absolute;
  top: 30px;
  left: 10px;
  width: 260px;
  z-index: 0;

}

.aie-title1 {
  font-size: 14px;
  font-weight: 500;
}
</style>
