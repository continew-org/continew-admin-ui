<template>
  <a-modal
    v-model:visible="visible"
    title="重置密码"
    :mask-closable="false"
    :esc-to-close="false"
    :modal-style="{ maxWidth: '520px' }"
    width="90%"
    draggable
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { resetUserPwd } from '@/apis'
import { type Columns, GiForm } from '@/components/GiForm'
import { useForm } from '@/hooks'
import { encryptByRsa } from '@/utils/encrypt'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()
const dataId = ref('')
const formRef = ref<InstanceType<typeof GiForm>>()

const options: Options = {
  form: {},
  col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  btns: { hide: true }
}

const columns: Columns = [
  { label: '密码', field: 'newPassword', type: 'input-password', rules: [{ required: true, message: '请输入密码' }] }
]

const { form, resetForm } = useForm({})

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
}

const visible = ref(false)
// 重置
const onReset = (id: string) => {
  reset()
  dataId.value = id
  visible.value = true
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) return false
    await resetUserPwd({ newPassword: encryptByRsa(form.newPassword) || '' }, dataId.value)
    Message.success('重置成功')
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

defineExpose({ onReset })
</script>
