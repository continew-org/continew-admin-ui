<template>
  <a-row justify="center" align="center" style="padding: 0 5%">
    <a-form ref="formRef" :model="form" auto-label-width class="w-full">
      <a-form-item
        label="文件名称"
        field="name"
        :rules="[{ required: true, message: '请输入文件名称' }]"
        style="margin-bottom: 0"
      >
        <a-input v-model="form.name" placeholder="请输入文件名称" allow-clear />
      </a-form-item>
    </a-form>
  </a-row>
</template>

<script lang="ts" setup>
import type { FormInstance } from '@arco-design/web-vue'
import type { FileItem } from '@/apis'

interface Props {
  data: FileItem
}
const props = withDefaults(defineProps<Props>(), {})

const formRef = ref<FormInstance>()
const form = reactive({
  name: props.data?.name || ''
})

defineExpose({ formRef })
</script>

<style lang="scss" scoped></style>
