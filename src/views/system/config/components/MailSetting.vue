<template>
  <a-form ref="formRef"
          :model="form"
          :auto-label-width="true"
          label-align="left"
          :rules="rules"
          size="small"
          :layout="width >= 500 ? 'horizontal' : 'vertical' "
          scroll-to-first-error
          style="margin-top: 30px"
          :disabled="!isUpdate">
    <a-row>
      <a-col :span="6">
        <a-form-item field="MAIL_SEND_TYPE" :label="mailSendType?.name" :disabled="true">
          <a-select v-model.trim="form.MAIL_SEND_TYPE">
            <a-option value="SMTP" label="SMTP" />
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6">
        <a-form-item field="MAIL_SMTP_SERVER" :label="mailServer?.name">
          <a-input v-model.trim="form.MAIL_SMTP_SERVER" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6">
        <a-form-item field="MAIL_SMTP_PORT" :label="mailPort?.name">
          <a-input v-model.number="form.MAIL_SMTP_PORT" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6">
        <a-form-item field="MAIL_SMTP_USERNAME" :label="mailUsername?.name">
          <a-input v-model.trim="form.MAIL_SMTP_USERNAME" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6">
        <a-form-item field="MAIL_SMTP_PASSWORD" :label="mailPassword?.name">
          <a-input v-model.trim="form.MAIL_SMTP_PASSWORD" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6">
        <a-form-item field="MAIL_SMTP_VERIFY_TYPE" :label="mailVerifyType?.name" :disabled="true">
          <a-select v-model.trim="form.MAIL_SMTP_VERIFY_TYPE">
            <a-option value="SSL" label="SSL" />
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6">
        <a-form-item field="MAIL_FROM" :label="mailFrom?.name">
          <a-input v-model.trim="form.MAIL_FROM" />
        </a-form-item>
      </a-col>
    </a-row>
    <div style="margin-top: 20px">
      <a-space>
        <a-button v-if="!isUpdate" v-permission="['system:config:reset']" @click="onResetValue">
          <template #icon>
            <icon-undo />
          </template>
          恢复默认
        </a-button>
        <a-button v-if="!isUpdate" v-permission="['system:config:update']" type="primary" @click="onUpdate">
          <template #icon>
            <icon-edit />
          </template>
          修改
        </a-button>
        <a-button v-if="isUpdate" type="primary" @click="handleSave">
          <template #icon>
            <icon-save />
          </template>
          保存
        </a-button>
        <a-button v-if="isUpdate" @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          重置
        </a-button>
        <a-button v-if="isUpdate" @click="handleCancel">
          <template #icon>
            <icon-undo />
          </template>
          取消
        </a-button>
      </a-space>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { type FormInstance, Message, Modal } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { useForm } from '@/hooks'
import { type MailConfig, type OptionResp, listOption, resetOptionValue, updateOption } from '@/apis'

defineOptions({ name: 'MailSetting' })
const formRef = ref<FormInstance>()

const { form } = useForm<MailConfig>({
  MAIL_SEND_TYPE: '',
  MAIL_SMTP_SERVER: '',
  MAIL_SMTP_PORT: '',
  MAIL_SMTP_USERNAME: '',
  MAIL_SMTP_PASSWORD: '',
  MAIL_SMTP_VERIFY_TYPE: '',
  MAIL_FROM: ''
})
// 表单初始化
onMounted(() => {
  getDataList()
})
const { width } = useWindowSize()

const mailSendType = ref<OptionResp>()
const mailServer = ref<OptionResp>()
const mailPort = ref<OptionResp>()
const mailUsername = ref<OptionResp>()
const mailPassword = ref<OptionResp>()
const mailVerifyType = ref<OptionResp>()
const mailFrom = ref<OptionResp>()
// 参数校验规则
const rules: FormInstance['rules'] = {
  SITE_TITLE: [{ required: true, message: '请输入系统标题' }],
  SITE_COPYRIGHT: [{ required: true, message: '请输入版权信息' }]
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
// 保存
const handleSave = async () => {
  const isInvalid = await formRef.value?.validate()
  if (isInvalid) return false
  await updateOption(
      Object.entries(form).map((item) => {
        return {
          code: item[0],
          value: item[1]
        }
      })
  )
  // appStore.setSiteConfig(form)
  await getDataList()
  Message.success('保存成功')
}
// 查询参数
const queryForm = reactive({
  code: ['MAIL_FROM', 'MAIL_SMTP_PASSWORD', 'MAIL_SMTP_PORT', 'MAIL_SEND_TYPE', 'MAIL_SMTP_SERVER', 'MAIL_SMTP_USERNAME', 'MAIL_SMTP_VERIFY_TYPE']
})
// 接收参数类型
const dataList = ref<OptionResp[]>([])
// 从数据库中获取配置
const getDataList = async () => {
  const res = await listOption(queryForm)
  dataList.value = res.data
  mailSendType.value = dataList.value.find((option) => option.code === 'MAIL_SEND_TYPE')
  mailServer.value = dataList.value.find((option) => option.code === 'MAIL_SMTP_SERVER')
  mailPort.value = dataList.value.find((option) => option.code === 'MAIL_SMTP_PORT')
  mailUsername.value = dataList.value.find((option) => option.code === 'MAIL_SMTP_USERNAME')
  mailPassword.value = dataList.value.find((option) => option.code === 'MAIL_SMTP_PASSWORD')
  mailVerifyType.value = dataList.value.find((option) => option.code === 'MAIL_SMTP_VERIFY_TYPE')
  mailFrom.value = dataList.value.find((option) => option.code === 'MAIL_FROM')
  reset()
}

const handleResetValue = async () => {
  await resetOptionValue(queryForm)
  Message.success('恢复成功')
  await getDataList()
  // appStore.setSiteConfig(form)
}
const onResetValue = () => {
  Modal.warning({
    title: '警告',
    content: '确认恢复基础配置为默认值吗？',
    hideCancel: false,
    maskClosable: false,
    onOk: handleResetValue
  })
}
const reset = () => {
  form.MAIL_SEND_TYPE = mailSendType.value?.value || ''
  form.MAIL_SMTP_SERVER = mailServer.value?.value || ''
  form.MAIL_SMTP_PORT = mailPort.value?.value || ''
  form.MAIL_SMTP_USERNAME = mailUsername.value?.value || ''
  form.MAIL_SMTP_PASSWORD = mailPassword.value?.value || ''
  form.MAIL_SMTP_VERIFY_TYPE = mailVerifyType.value?.value || ''
  form.MAIL_FROM = mailFrom.value?.value || ''
}
</script>

<style lang="scss" scoped>

</style>
