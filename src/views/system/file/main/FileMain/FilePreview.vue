<template>
  <div>
    <a-modal
        v-model:visible="visible"
        :title="title"
        :mask-closable="false"
        :esc-to-close="false"
        width="90%"
        draggable
    >
      <div class="modal-content">
        <div class="modal-header">
          <!--          <a-button type="primary" @click="onPrintFile"> -->
          <!--            <template #icon> -->
          <!--              <icon-printer /> -->
          <!--            </template> -->
          <!--            <template #default> -->
          <!--              打印 -->
          <!--            </template> -->
          <!--          </a-button> -->
          <a-button type="primary" status="success" @click="onDownloadFile">
            <template #icon>
              <icon-download />
            </template>
            下载
          </a-button>
        </div>
        <div class="iframe-container">
          <iframe :src="previewUrl" />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FileItem } from '@/apis/system'
import { encodeByBase64 } from '@/utils/encrypt'

const emit = defineEmits(['download'])

const visible = ref(false)
const title = ref('文件预览')
const fileObject = ref<FileItem>()
const isLoading = ref(false)
const error = ref('')
const previewUrl = ref('')

// 显示弹窗
function show(fileItem: FileItem) {
  fileObject.value = fileItem
  visible.value = true
  title.value = `${fileItem.name}.${fileItem.extension}`
  isLoading.value = true
  error.value = ''

  previewUrl.value = `${import.meta.env.FILE_VIEW_SERVER_URL}/onlinePreview?url=${encodeURIComponent(encodeByBase64(fileItem.url))}`
}

// 打印文件
// const onPrintFile = () => {
// }
// 下载文件
const onDownloadFile = () => {
  emit('download', fileObject.value)
}
defineExpose({
  show
})
</script>

<style scoped lang="scss">
.modal-content {
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #e8e8e8;
}

.iframe-container {
  overflow: hidden;
  flex: 1;
  height: calc(80vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
}

iframe {
  width: 100%;
  height: 100%;
}
</style>
