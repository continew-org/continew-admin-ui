<template>
  <a-modal v-model:visible="visible" :title="title" @before-ok="save" @close="reset">
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns">
      <template #captcha>
        <a-input v-model="form.captcha" placeholder="请输入验证码" :max-length="4" allow-clear style="flex: 1 1" />
        <a-button
          class="captcha-btn"
          :loading="captchaLoading"
          :disabled="captchaDisable"
          size="large"
          @click="onCaptcha"
        >
          {{ captchaBtnName }}
        </a-button>
      </template>
    </GiForm>
  </a-modal>
</template>

<script setup lang="ts">
// import { getSmsCaptcha, getEmailCaptcha, updateUserEmail, updateUserPhone } from '@/apis'
import { Message } from '@arco-design/web-vue'
// import { encryptByRsa } from '@/utils/encrypt'
import { useUserStore } from '@/stores'
import { type Columns, GiForm } from '@/components/GiForm'
import { useForm } from '@/hooks'
import * as Regexp from '@/utils/regexp'

const verifyType = ref()
const title = computed(() => (verifyType.value === 'phone' ? '修改手机号' : '修改邮箱'))
const formRef = ref<InstanceType<typeof GiForm>>()

const options: Options = {
  form: {},
  col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  btns: { hide: true }
}

const columns: Columns = [
  {
    label: '手机号',
    field: 'newPhone',
    type: 'input',
    rules: [
      { required: true, message: '请输入手机号' },
      { match: Regexp.Phone, message: '请输入正确的手机号' }
    ],
    hide: () => {
      return verifyType.value !== 'phone'
    }
  },
  {
    label: '邮箱',
    field: 'email',
    type: 'input',
    rules: [
      { required: true, message: '请输入邮箱' },
      { match: Regexp.Email, message: '请输入正确的邮箱' }
    ],
    hide: () => {
      return verifyType.value !== 'email'
    }
  },
  {
    label: '验证码',
    field: 'captcha',
    type: 'input',
    rules: [{ required: true, message: '请输入验证码' }]
  },
  {
    label: '当前密码',
    field: 'currentPassword',
    type: 'input',
    rules: [{ required: true, message: '请输入当前密码' }]
  }
]

const { form, resetForm } = useForm({
  newPhone: '',
  captcha: '',
  currentPassword: '',
  email: ''
})

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
  resetCaptcha()
}

const captchaTimer = ref()
const captchaTime = ref(60)
const captchaBtnName = ref('获取验证码')
const captchaDisable = ref(false)
// 重置验证码
const resetCaptcha = () => {
  window.clearInterval(captchaTimer.value)
  captchaTime.value = 60
  captchaBtnName.value = '获取验证码'
  captchaDisable.value = false
}

const captchaLoading = ref(false)
// 获取验证码
const onCaptcha = async () => {
  const isInvalid = await formRef.value?.formRef?.validateField(verifyType.value === 'phone' ? 'newPhone' : 'email')
  if (isInvalid) return false
  // 发送验证码
  try {
    captchaLoading.value = true
    captchaBtnName.value = '发送中...'
    if (verifyType.value === 'phone') {
      // await getSmsCaptcha({
      //   phone: form.newPhone
      // })
    } else if (verifyType.value === 'email') {
      // await getEmailCaptcha({
      //   email: form.email
      // })
    }
    captchaLoading.value = false
    captchaDisable.value = true
    captchaBtnName.value = `获取验证码(${(captchaTime.value -= 1)}s)`
    // Message.success('发送成功')
    Message.success('仅提供效果演示，实际使用请查看代码取消相关注释')
    captchaTimer.value = window.setInterval(() => {
      captchaTime.value -= 1
      captchaBtnName.value = `获取验证码(${captchaTime.value}s)`
      if (captchaTime.value <= 0) {
        resetCaptcha()
      }
    }, 1000)
  } catch (error) {
    resetCaptcha()
  } finally {
    captchaLoading.value = false
  }
}

const userStore = useUserStore()
// 保存
const save = async () => {
  const isInvalid = await formRef.value?.formRef?.validate()
  if (isInvalid) return false
  try {
    if (verifyType.value === 'phone') {
      // await updateUserEmail({
      //   newEmail: form.email,
      //   captcha: form.captcha,
      //   currentPassword: encryptByRsa(form.currentPassword) as string
      // })
    } else if (verifyType.value === 'email') {
      // await updateUserPhone({
      //   newPhone: form.email,
      //   captcha: form.captcha,
      //   currentPassword: encryptByRsa(form.currentPassword) as string
      // })
    }
    Message.success('修改成功')
    // 修改成功后，重新获取用户信息
    await userStore.getInfo()
    return true
  } catch (error) {
    return false
  }
}

const visible = ref(false)
// 打开弹框
const open = (type: string) => {
  verifyType.value = type
  visible.value = true
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
.captcha-btn {
  margin-left: 12px;
  min-width: 98px;
  border-radius: 4px;
}
</style>
