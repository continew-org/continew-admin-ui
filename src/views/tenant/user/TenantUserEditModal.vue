<template>
  <a-modal
    v-model:visible="visible"
    title="修改租户登录信息"
    :mask-closable="false"
    :esc-to-close="false"
    draggable
    :width="width >= 500 ? 500 : '100%'"
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { getTenantLoginUser, updateTenantLoginUser } from '@/apis/tenant/tenant'
import { type Columns, GiForm, type Options } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import { encryptByRsa } from '@/utils/encrypt'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const dataId = ref('')
const visible = ref(false)
const formRef = ref<InstanceType<typeof GiForm>>()

const options: Options = {
  form: { size: 'large' },
  btns: { hide: true },
}

const [form, resetForm] = useResetReactive({
  plaintextPwd: undefined,
})

const columns: Columns = reactive([
  {
    label: '登陆用户',
    field: 'username',
    type: 'input',
    span: 24,
    props: {
      placeholder: '请输入用户名',
      maxLength: 64,
      showWordLimit: true,
    },
    rules: [{ required: true, message: '请输入登陆用户名' }],
  },
  {
    label: '登陆密码',
    field: 'plaintextPwd',
    type: 'input-password',
    span: 24,
    props: {
      placeholder: '请输入密码',
      maxLength: 32,
      showWordLimit: true,
    },
  },
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
    await updateTenantLoginUser({
      tenantId: dataId.value,
      username: form.username,
      password: encryptByRsa(form.plaintextPwd) || '',
    })
    Message.success('修改成功')
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

const open = async (id: string) => {
  reset()
  dataId.value = id
  const { data } = await getTenantLoginUser(id)
  Object.assign(form, { username: data })
  visible.value = true
}

defineExpose({ open })
</script>

<style scoped lang="scss"></style>
