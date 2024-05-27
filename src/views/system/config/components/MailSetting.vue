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
        <a-form-item field="MAIL_PROTOCOL" :label="mailProtocol?.name" :disabled="true">
          <a-select v-model.trim="form.MAIL_PROTOCOL">
            <a-option value="smtp" label="smtp" />
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6">
        <a-form-item field="MAIL_HOST" :label="mailHost?.name">
          <a-input v-model.trim="form.MAIL_HOST" />
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
        <a-form-item field="MAIL_SSL_ENABLE" :label="mailSslEnable?.name">
          <a-radio-group v-model:model-value="form.MAIL_SSL_ENABLE">
            <a-radio value="1">启用</a-radio>
            <a-radio value="2">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6">
        <a-form-item v-if="form.MAIL_SSL_ENABLE === '1'" field="MAIL_SSL_PORT" :label="mailSslPort?.name" :disabled="isUpdate ? form.MAIL_SSL_ENABLE === '2' : !isUpdate">
          <a-input v-model.number="form.MAIL_SSL_PORT" />
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
  MAIL_PROTOCOL: '',
  MAIL_HOST: '',
  MAIL_SMTP_PORT: '',
  MAIL_SMTP_USERNAME: '',
  MAIL_SMTP_PASSWORD: '',
  MAIL_FROM: '',
  MAIL_SSL_ENABLE: '',
  MAIL_SSL_PORT: ''
})
// 表单初始化
onMounted(() => {
  getDataList() // 获取配置
})
const { width } = useWindowSize()

const mailProtocol = ref<OptionResp>()
const mailHost = ref<OptionResp>()
const mailPort = ref<OptionResp>()
const mailUsername = ref<OptionResp>()
const mailPassword = ref<OptionResp>()
const mailFrom = ref<OptionResp>()
const mailSslEnable = ref<OptionResp>()
const mailSslPort = ref<OptionResp>()
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
  code: ['MAIL_FROM', 'MAIL_SMTP_PASSWORD', 'MAIL_SMTP_PORT', 'MAIL_PROTOCOL', 'MAIL_HOST', 'MAIL_SMTP_USERNAME', 'MAIL_SSL_ENABLE', 'MAIL_SSL_PORT']
})
// 接收参数类型
const dataList = ref<OptionResp[]>([])
// 从数据库中获取配置
const getDataList = async () => {
  const res = await listOption(queryForm)
  dataList.value = res.data
  mailProtocol.value = dataList.value.find((option) => option.code === 'MAIL_PROTOCOL')
  mailHost.value = dataList.value.find((option) => option.code === 'MAIL_HOST')
  mailPort.value = dataList.value.find((option) => option.code === 'MAIL_SMTP_PORT')
  mailUsername.value = dataList.value.find((option) => option.code === 'MAIL_SMTP_USERNAME')
  mailPassword.value = dataList.value.find((option) => option.code === 'MAIL_SMTP_PASSWORD')
  mailFrom.value = dataList.value.find((option) => option.code === 'MAIL_FROM')
  mailSslEnable.value = dataList.value.find((option) => option.code === 'MAIL_SSL_ENABLE')
  mailSslPort.value = dataList.value.find((option) => option.code === 'MAIL_SSL_PORT')
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
  form.MAIL_PROTOCOL = mailProtocol.value?.value || ''
  form.MAIL_HOST = mailHost.value?.value || ''
  form.MAIL_SMTP_PORT = mailPort.value?.value || ''
  form.MAIL_SMTP_USERNAME = mailUsername.value?.value || ''
  form.MAIL_SMTP_PASSWORD = mailPassword.value?.value || ''
  form.MAIL_FROM = mailFrom.value?.value || ''
  form.MAIL_SSL_ENABLE = mailSslEnable.value?.value || ''
  form.MAIL_SSL_PORT = mailSslPort.value?.value || ''
}
</script>

<style lang="scss" scoped>

</style>
