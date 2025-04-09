<template>
  <a-modal
    v-model:visible="visible"
    title="重置密码"
    :mask-closable="false"
    :esc-to-close="false"
    :width="width >= 500 ? 500 : '100%'"
    draggable
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { resetUserPwd } from '@/apis/system'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import { encryptByRsa } from '@/utils/encrypt'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()
const dataId = ref('')
const visible = ref(false)
const formRef = ref<InstanceType<typeof GiForm>>()

const [form, resetForm] = useResetReactive({})

const columns: ColumnItem[] = reactive([
  { label: '密码', field: 'newPassword', type: 'input-password', span: 24, required: true },
])

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
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

// 打开
const onOpen = (id: string) => {
  reset()
  dataId.value = id
  visible.value = true
}

defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
