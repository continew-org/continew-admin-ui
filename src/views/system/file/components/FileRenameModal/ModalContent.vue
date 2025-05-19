<template>
  <a-row justify="center" align="center" style="padding: 0 5%">
    <a-form ref="formRef" :model="form" auto-label-width class="w-full">
      <a-form-item
        label="名称"
        field="originalName"
        :rules="[{ required: true, message: '请输入名称' }]"
        style="margin-bottom: 0"
      >
        <a-input v-model="form.originalName" placeholder="请输入名称" allow-clear />
      </a-form-item>
    </a-form>
  </a-row>
</template>

<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import type { FileItem } from '@/apis/system'

interface Props {
  data: FileItem
}
const props = withDefaults(defineProps<Props>(), {})

const formRef = ref<FormInstance>()
const form = reactive({
  originalName: props.data?.originalName || '',
})

defineExpose({ formRef })
</script>

<style scoped lang="scss"></style>
