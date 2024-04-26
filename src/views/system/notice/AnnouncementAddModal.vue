<template>
  <a-modal
    :title="title"
    :visible="visible"
    width="80%"
    :mask-closable="false"
    :esc-to-close="false"
    unmount-on-close
    render-to-body
    @before-ok="save"
    @close="reset"
    @cancel="reset"
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
            <a-input v-model="form.title" placeholder="请输入标题" :max-length="150" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="类型" field="type">
            <a-select v-model="form.type" :options="announcement_type" placeholder="请选择类型" />
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
            <v-md-editor
              v-model="form.content"
              height="400px"
              left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"
              placeholder="请输入内容"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { addAnnouncement, updateAnnouncement, getAnnouncement } from '@/apis'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { useForm } from '@/hooks'
import { useDict } from '@/hooks/app'

const { announcement_type } = useDict('announcement_type')

const visible = ref(false)
const announcementId = ref('')
const isUpdate = computed(() => !!announcementId.value)
const title = computed(() => (isUpdate.value ? '修改公告' : '新增公告'))
const formRef = ref<FormInstance>()

const rules: FormInstance['rules'] = {
  title: [{ required: true, message: '请输入名称' }],
  type: [{ required: true, message: '选择类型' }],
  content: [{ required: true, message: '请输入内容' }]
}

const { form, resetForm } = useForm({
  title: '',
  content: '',
  type: '',
  effectiveTime: undefined,
  terminateTime: undefined
})

// 重置
const reset = () => {
  formRef.value?.resetFields()
  resetForm()
  visible.value = false
}

// 新增
const onAdd = () => {
  reset()
  announcementId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  announcementId.value = id
  const res = await getAnnouncement(id)
  Object.assign(form, res.data)
  visible.value = true
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updateAnnouncement(form, announcementId.value)
      Message.success('修改成功')
    } else {
      await addAnnouncement(form)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

defineExpose({ onAdd, onUpdate })
</script>

<style lang="scss" scoped>
fieldset {
  padding: 15px 15px 0 15px;
  margin-bottom: 15px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
}

fieldset legend {
  color: rgb(var(--gray-10));
  padding: 2px 5px 2px 5px;
  border: 1px solid var(--color-neutral-3);
  border-radius: 3px;
}
</style>
