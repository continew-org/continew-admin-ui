<template>
  <a-row justify="center" align="center">
    <div style="height: 100px">
      <FileImage :data="data" style="border-radius: 5px" />
    </div>
  </a-row>
  <a-row style="margin-top: 15px">
    <a-descriptions :column="1" layout="inline-vertical">
      <a-descriptions-item label="名称">
        <a-typography-paragraph :copyable="data.type !== 0" :copy-text="data.url">
          <template #copy-tooltip>复制链接</template>
          {{ data.originalName }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="大小">
        <span v-if="data.type === 0" v-permission="['system:file:calcDirSize']">
          <a-link
            v-if="isCalculating || calculatedSize === null"
            :disabled="isCalculating"
            @click="calculateDirSize"
          >
            {{ isCalculating ? '计算中...' : '计算' }}
          </a-link>
          <span v-else>
            {{ formatFileSize(calculatedSize) }}
          </span>
        </span>
        <span v-else>{{ formatFileSize(data.size) }}</span>
      </a-descriptions-item>
      <a-descriptions-item label="路径">{{ `${data.parentPath === '/' ? '' : data.parentPath}/${data.name}` }}</a-descriptions-item>
      <a-descriptions-item v-if="data.sha256" label="SHA256">
        <a-typography-paragraph copyable :copy-text="data.sha256">
          <template #copy-tooltip>复制</template>
          {{ data.sha256 }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="上传时间">{{ data.createTime }}</a-descriptions-item>
      <a-descriptions-item v-if="data?.updateTime" label="修改时间">{{ data?.updateTime }}</a-descriptions-item>
      <a-descriptions-item label="存储名称">{{ data.storageName }}</a-descriptions-item>
    </a-descriptions>
  </a-row>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import FileImage from '../../main/FileMain/FileImage.vue'
import { type FileItem, calcDirSize } from '@/apis/system'
import { formatFileSize } from '@/utils'

interface Props {
  data: FileItem
}

const props = withDefaults(defineProps<Props>(), {})
const isCalculating = ref(false)
const calculatedSize = ref<number | null>(null)
// 计算文件夹大小
const calculateDirSize = async () => {
  if (isCalculating.value || props.data.type !== 0) return
  isCalculating.value = true
  try {
    const { data } = await calcDirSize(props.data.id)
    calculatedSize.value = data.size
  } catch (err) {
    Message.error('计算失败，请重试')
  } finally {
    isCalculating.value = false
  }
}
</script>

<style lang="less" scoped>
.label {
  color: var(--color-text-2);
}
:deep(.arco-form-item) {
  margin-bottom: 0;
}
:deep(.arco-form-item-label-col > label) {
  white-space: nowrap;
}
:deep(.arco-descriptions-title) {
  font-size: 14px;
}
:deep(.arco-descriptions-item-label-inline) {
  font-size: 12px;
}
:deep(.arco-descriptions-item-value-inline) {
  font-size: 12px;
  margin-bottom: 10px;
}
</style>
