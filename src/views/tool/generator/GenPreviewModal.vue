<template>
  <a-modal
    v-model:visible="visible"
    title="生成预览"
    :mask-closable="false"
    :esc-to-close="false"
    width="90%"
    :footer="false"
  >
    <div>
      <a-scrollbar style="height: 700px; overflow: auto">
        <a-link style="position: absolute; right: 20px; top: 50px; z-index: 999" @click="onCopy">
          <template #icon>
            <icon-copy size="large" />
          </template>
          复制
        </a-link>
        <a-tabs size="large" @tab-click="onTabClick">
          <a-tab-pane v-for="item in genPreviewList" :key="item.fileName" :title="item.fileName">
            <GiCodeView
              :type="'vue' === item.fileName.split('.')[1] ? 'vue' : 'javascript'"
              :code-json="item.content"
            />
          </a-tab-pane>
        </a-tabs>
      </a-scrollbar>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { genPreview, type GeneratePreviewResp } from '@/apis'
import { Message } from '@arco-design/web-vue'
import { useClipboard } from '@vueuse/core'

const { copy, copied } = useClipboard()
const copyCodeContent = ref()
const genPreviewList = ref<GeneratePreviewResp[]>([])

const visible = ref(false)
// 打开
const onPreview = async (tableName: string) => {
  const res = await genPreview(tableName)
  genPreviewList.value = res.data
  copyCodeContent.value = genPreviewList.value[0].content
  visible.value = true
}

// 点击 Tab
const onTabClick = (key: any) => {
  copyCodeContent.value = genPreviewList.value.filter((p) => p.fileName === key)[0].content
}

// 复制
const onCopy = () => {
  copy(copyCodeContent.value)
}
watch(copied, () => {
  if (copied.value) {
    Message.success('复制成功')
  }
})

defineExpose({ onPreview })
</script>
