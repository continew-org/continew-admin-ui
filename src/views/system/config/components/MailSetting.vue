<template>
  <a-space wrap :size="30">
    <a-form ref="formRef" :model="form" :rules="rules" auto-label-width label-align="left"
      :layout="width >= 500 ? 'horizontal' : 'vertical'" :disabled="!isUpdate" scroll-to-first-error>
      <a-list :bordered="false" :loading="loading">
        <a-form-item field="MAIL_PROTOCOL" :label="mailConfig.MAIL_PROTOCOL.name" hide-asterisk>
          <a-select v-model.trim="form.MAIL_PROTOCOL">
            <a-option label="SMTP" value="smtp" />
          </a-select>
        </a-form-item>
        <a-form-item field="MAIL_HOST" :label="mailConfig.MAIL_HOST.name" hide-asterisk>
          <a-input v-model.trim="form.MAIL_HOST" />
        </a-form-item>
        <a-form-item field="MAIL_PORT" :label="mailConfig.MAIL_PORT.name" hide-asterisk>
          <a-input-number v-model="form.MAIL_PORT" :min="0" />
        </a-form-item>
        <a-form-item field="MAIL_USERNAME" :label="mailConfig.MAIL_USERNAME.name" hide-asterisk>
          <a-input v-model.trim="form.MAIL_USERNAME" />
        </a-form-item>
        <a-form-item field="MAIL_PASSWORD" :label="mailConfig.MAIL_PASSWORD?.name" hide-asterisk>
          <a-input-password v-model.trim="form.MAIL_PASSWORD" />
        </a-form-item>
        <a-form-item field="MAIL_SSL_ENABLED" :label="mailConfig.MAIL_SSL_ENABLED?.name" hide-asterisk>
          <a-radio-group v-model:model-value="form.MAIL_SSL_ENABLED">
            <a-radio value="1">启用</a-radio>
            <a-radio value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="form.MAIL_SSL_ENABLED === '1'" field="MAIL_SSL_PORT" :label="mailConfig.MAIL_SSL_PORT.name"
          hide-asterisk>
          <a-input-number v-model="form.MAIL_SSL_PORT" :min="0" />
        </a-form-item>
        <a-space>
          <a-button v-if="!isUpdate" v-permission="['system:config:update']" type="primary" @click="onUpdate">
            <template #icon><icon-edit /></template>修改
          </a-button>
          <a-button v-if="!isUpdate" v-permission="['system:config:reset']" @click="onResetValue">
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
      </a-list>
    </a-form>
  </a-space>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { type FormInstance, Message, Modal } from '@arco-design/web-vue'
import {
  type MailConfig,
  type OptionResp,
  listOption,
  resetOptionValue,
  updateOption
} from '@/apis'
import { useForm } from '@/hooks'

defineOptions({ name: 'MailSetting' })
const { width } = useWindowSize()
const loading = ref<boolean>(false)
const formRef = ref<FormInstance>()
const { form } = useForm({
  MAIL_PROTOCOL: '',
  MAIL_HOST: '',
  MAIL_PORT: 0,
  MAIL_USERNAME: '',
  MAIL_PASSWORD: '',
  MAIL_SSL_ENABLED: '',
  MAIL_SSL_PORT: 0
})
const rules: FormInstance['rules'] = {
  MAIL_HOST: [{ required: true, message: '请输入值' }],
  MAIL_PORT: [{ required: true, message: '请输入值' }],
  MAIL_USERNAME: [{ required: true, message: '请输入值' }],
  MAIL_PASSWORD: [{ required: true, message: '请输入值' }],
  MAIL_SSL_PORT: [{ required: true, message: '请输入值' }]
}

const mailConfig = ref<MailConfig>({
  MAIL_PROTOCOL: {},
  MAIL_HOST: {},
  MAIL_PORT: {},
  MAIL_USERNAME: {},
  MAIL_PASSWORD: {},
  MAIL_SSL_ENABLED: {},
  MAIL_SSL_PORT: {}
})

// 重置
const reset = () => {
  formRef.value?.resetFields()
  form.MAIL_PROTOCOL = mailConfig.value.MAIL_PROTOCOL.value || ''
  form.MAIL_HOST = mailConfig.value.MAIL_HOST.value || ''
  form.MAIL_PORT = mailConfig.value.MAIL_PORT.value || 0
  form.MAIL_USERNAME = mailConfig.value.MAIL_USERNAME.value || ''
  form.MAIL_PASSWORD = mailConfig.value.MAIL_PASSWORD?.value || ''
  form.MAIL_SSL_ENABLED = mailConfig.value.MAIL_SSL_ENABLED.value || ''
  form.MAIL_SSL_PORT = mailConfig.value.MAIL_SSL_PORT.value || 0
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
  category: 'MAIL'
}
// 查询列表数据
const getDataList = async () => {
  loading.value = true
  const { data } = await listOption(queryForm)
  mailConfig.value = data.reduce((obj: MailConfig, option: OptionResp) => {
    obj[option.code] = { ...option, value: ['MAIL_PORT', 'MAIL_SSL_PORT'].includes(option.code) ? Number.parseInt(option.value) : option.value }
    return obj
  }, {})
  handleCancel()
  loading.value = false
}

// 保存
const handleSave = async () => {
  const isInvalid = await formRef.value?.validate()
  if (isInvalid) return false
  await updateOption(
    Object.entries(form).map(([key, value]) => {
      return { id: mailConfig.value[key].id, code: key, value }
    })
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
    content: '确认恢复邮件配置为默认值吗？',
    hideCancel: false,
    maskClosable: false,
    onOk: handleResetValue
  })
}

onMounted(() => {
  getDataList()
})
</script>

<style lang="scss" scoped>
:deep(.arco-form-item.arco-form-item-has-help) {
  margin-bottom: 5px;
}
</style>
