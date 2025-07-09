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
    <GiForm ref="formRef" v-model="form" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'
import { updateUserBaseInfo } from '@/apis/system'
import { type ColumnItem, GiForm } from '@/components/GiForm'
import { useUserStore } from '@/stores'
import { useResetReactive } from '@/hooks'

const { width } = useWindowSize()
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
const visible = ref(false)
const formRef = ref<InstanceType<typeof GiForm>>()

const [form, resetForm] = useResetReactive(() => ({
  nickname: userInfo.value.nickname,
  gender: userInfo.value.gender,
}))

const columns: ColumnItem[] = reactive([
  {
    label: '昵称',
    field: 'nickname',
    type: 'input',
    span: 24,
    rules: [{ required: true, message: '请输入昵称' }],
  },
  {
    label: '性别',
    field: 'gender',
    type: 'radio-group',
    span: 24,
    props: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
        { label: '未知', value: 0, disabled: true },
      ],
    },
    rules: [{ required: true, message: '请选择性别' }],
  },
])

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
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

// 修改
const onUpdate = async () => {
  reset()
  visible.value = true
}

defineExpose({ onUpdate })
</script>
