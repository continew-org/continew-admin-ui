<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :width="width >= 600 ? '80%' : '100%'"
    draggable
    @before-ok="save"
    @close="reset"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      layout="vertical"
      :label-col-style="{ width: '75px' }"
      size="large"
    >
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="标题" field="title">
            <a-input v-model="form.title" placeholder="请输入标题" allow-clear :max-length="150" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="类型" field="type">
            <a-select v-model="form.type" :options="notice_type" placeholder="请选择类型" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="生效时间" field="effectiveTime" tooltip="默认立即生效">
            <a-date-picker
              v-model="form.effectiveTime"
              placeholder="请选择生效时间"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="终止时间" field="terminateTime" tooltip="默认无终止">
            <a-date-picker
              v-model="form.terminateTime"
              placeholder="请选择终止时间"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="内容" field="content">
            <MdEditor v-model="form.content" :toolbars="toolbars" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { type FormInstance, Message } from '@arco-design/web-vue'
import { MdEditor } from 'md-editor-v3'
import { useWindowSize } from '@vueuse/core'
import { addNotice, getNotice, updateNotice } from '@/apis'
import { useForm } from '@/hooks'
import { useDict } from '@/hooks/app'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()
const { width } = useWindowSize()
const { notice_type } = useDict('notice_type')

const dataId = ref('')
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改公告' : '新增公告'))

const toolbars = [
  'bold',
  'underline',
  'italic',
  'strikeThrough',
  '-',
  'title',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  0,
  1,
  2,
  3,
  '-',
  'revoke',
  'next',
  '=',
  'prettier',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'previewOnly'
]

const formRef = ref<FormInstance>()
const rules: FormInstance['rules'] = {
  title: [{ required: true, message: '请输入标题' }],
  type: [{ required: true, message: '选择类型' }],
  content: [{ required: true, message: '请输入内容' }]
}

const { form, resetForm } = useForm({})

// 重置
const reset = () => {
  formRef.value?.resetFields()
  resetForm()
}

const visible = ref(false)
// 新增
const onAdd = () => {
  reset()
  dataId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const res = await getNotice(id)
  Object.assign(form, res.data)
  visible.value = true
}

// 保存
const save = async () => {
  const isInvalid = await formRef.value?.validate()
  if (isInvalid) return false
  try {
    if (isUpdate.value) {
      await updateNotice(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addNotice(form)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

defineExpose({ onAdd, onUpdate })
</script>

<style lang="scss" scoped></style>
