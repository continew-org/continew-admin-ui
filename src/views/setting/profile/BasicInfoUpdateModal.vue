<template>
  <a-modal
    v-model:visible="visible"
    title="修改基本信息"
    :mask-closable="false"
    :esc-to-close="false"
    :width="width >= 500 ? 500 : '100%'"
    draggable
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'
import { updateUserBaseInfo } from '@/apis'
import { type Columns, GiForm } from '@/components/GiForm'
import { useForm } from '@/hooks'
import { useUserStore } from '@/stores'

const { width } = useWindowSize()

const options: Options = {
  form: {},
  col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  btns: { hide: true }
}

const columns: Columns = [
  {
    label: '昵称',
    field: 'nickname',
    type: 'input',
    rules: [{ required: true, message: '请输入昵称' }]
  },
  {
    label: '性别',
    field: 'gender',
    type: 'radio-group',
    options: [
      { label: '男', value: 1 },
      { label: '女', value: 2 },
      { label: '未知', value: 0, disabled: true }
    ],
    rules: [{ required: true, message: '请选择性别' }]
  }
]

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const { form, resetForm } = useForm({
  nickname: userInfo.value.nickname,
  gender: userInfo.value.gender
})

const formRef = ref<InstanceType<typeof GiForm>>()
// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
}

const visible = ref(false)
// 修改
const onUpdate = async () => {
  reset()
  visible.value = true
}

// 保存
const save = async () => {
  const isInvalid = await formRef.value?.formRef?.validate()
  if (isInvalid) return false
  try {
    await updateUserBaseInfo(form)
    Message.success('修改成功')
    // 修改成功后，重新获取用户信息
    await userStore.getInfo()
    return true
  } catch (error) {
    return false
  }
}

defineExpose({ onUpdate })
</script>
