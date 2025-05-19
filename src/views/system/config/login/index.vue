<template>
  <div class="gi_page">
    <a-spin :loading="loading">
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        auto-label-width
        label-align="left"
        :layout="width >= 500 ? 'horizontal' : 'vertical'"
        :disabled="!isUpdate"
        scroll-to-first-error
      >
        <a-form-item
          field="LOGIN_CAPTCHA_ENABLED"
          :label="loginConfig.LOGIN_CAPTCHA_ENABLED.name"
        >
          <a-switch
            v-model="form.LOGIN_CAPTCHA_ENABLED"
            type="round"
            :checked-value="1"
            :unchecked-value="0"
          >
            <template #checked>是</template>
            <template #unchecked>否</template>
          </a-switch>
        </a-form-item>
        <a-space style="margin-bottom: 16px">
          <a-button v-if="!isUpdate" v-permission="['system:loginConfig:update']" type="primary" @click="onUpdate">
            <template #icon><icon-edit /></template>修改
          </a-button>
          <a-button v-if="!isUpdate" v-permission="['system:loginConfig:update']" @click="onResetValue">
            <template #icon><icon-undo /></template>恢复默认
          </a-button>
          <a-button v-if="isUpdate" type="primary" @click="handleSave">
            <template #icon><icon-save /></template>保存
          </a-button>
          <a-button v-if="isUpdate" @click="reset">
            <template #icon><icon-refresh /></template>重置
          </a-button>
          <a-button v-if="isUpdate" @click="handleCancel">
            <template #icon><icon-undo /></template>取消
          </a-button>
        </a-space>
      </a-form>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { type FormInstance, Message, Modal } from '@arco-design/web-vue'
import { type LoginConfig, type OptionResp, listOption, resetOptionValue, updateOption } from '@/apis/system'
import { useResetReactive } from '@/hooks'

defineOptions({ name: 'SystemLoginConfig' })
const { width } = useWindowSize()

const loading = ref<boolean>(false)
const formRef = ref<FormInstance>()
const [form] = useResetReactive({
  LOGIN_CAPTCHA_ENABLED: 1,
})
const rules: FormInstance['rules'] = {
  LOGIN_CAPTCHA_ENABLED: [{ required: true, message: '请选择' }],
}

const loginConfig = ref<LoginConfig>({
  LOGIN_CAPTCHA_ENABLED: {},
})

// 重置
const reset = () => {
  formRef.value?.resetFields()
  form.LOGIN_CAPTCHA_ENABLED = loginConfig.value.LOGIN_CAPTCHA_ENABLED.value || 0
}

const isUpdate = ref(false)
// 修改
const onUpdate = () => {
  isUpdate.value = true
}

// 取消
const handleCancel = () => {
  reset()
  isUpdate.value = false
}

const queryForm = {
  category: 'LOGIN',
}
// 查询列表数据
const getDataList = async () => {
  try {
    loading.value = true
    const { data } = await listOption(queryForm)
    loginConfig.value = data.reduce((obj: LoginConfig, option: OptionResp) => {
      obj[option.code] = { ...option, value: Number.parseInt(option.value) }
      return obj
    }, {})
    handleCancel()
  } finally {
    loading.value = false
  }
}

// 保存
const handleSave = async () => {
  const isInvalid = await formRef.value?.validate()
  if (isInvalid) return false
  await updateOption(
    Object.entries(form).map(([key, value]) => {
      return { id: loginConfig.value[key].id, code: key, value }
    }),
  )
  await getDataList()
  Message.success('保存成功')
}

// 恢复默认
const handleResetValue = async () => {
  await resetOptionValue(queryForm)
  Message.success('恢复成功')
  await getDataList()
}
const onResetValue = () => {
  Modal.warning({
    title: '警告',
    content: '确认恢复登录配置为默认值吗？',
    hideCancel: false,
    maskClosable: false,
    onOk: handleResetValue,
  })
}

onMounted(() => {
  getDataList()
})
</script>

<style scoped lang="scss">
:deep(.arco-form-item.arco-form-item-has-help) {
  margin-bottom: 5px;
}

.input-width {
  width: 200px;
}
</style>
