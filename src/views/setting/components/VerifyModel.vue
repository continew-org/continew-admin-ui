<template>
  <a-modal v-model:visible="visible" :title="title" @before-ok="save" @cancel="handleCancel">
    <a-form :model="form" ref="formRef">
      <a-form-item
        field="newPhone"
        label="新手机号"
        :rules="[{ required: true, match: Regexp.Phone, message: '请输入正确的手机号' }]"
        v-if="verifyType === 'phone'"
      >
        <a-input v-model="form.newPhone" />
      </a-form-item>
      <a-form-item
        field="email"
        label="邮箱"
        v-if="verifyType === 'email'"
        :rules="[{ required: true, match: Regexp.Email, message: '请输入正确的邮箱' }]"
      >
        <a-input v-model="form.email" />
      </a-form-item>
      <a-form-item field="verifyCode" label="验证码" :rules="[{ required: true, message: '请输入正确的验证码' }]">
        <a-input v-model="form.captcha" />
        <a-button type="outline" @click="onSendCaptcha">发送验证码</a-button>
      </a-form-item>
      <a-form-item
        field="currentPassword"
        label="当前密码"
        :rules="[
          { required: true, message: '请输入当前密码' },
          { match: Regexp.Password, message: '请输入格式的密码' }
        ]"
      >
        <a-input v-model="form.currentPassword" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { getSmsCaptcha, getEmailCaptcha, updateUserEmail } from '@/apis'
import { encryptByRsa } from '@/utils/encrypt'
import * as Regexp from '@/utils/regexp'
import { Message, type Modal } from '@arco-design/web-vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const visible = ref<boolean>(false)
const form = reactive({
  newPhone: '',
  captcha: '',
  currentPassword: '',
  email: ''
})
const formRef = ref()
const verifyType = ref()
const title = computed(() => {
  return verifyType.value === 'phone' ? '修改手机号' : '修改邮箱'
})
const onSendCaptcha = () => {
  formRef.value.validateField(verifyType.value === 'phone' ? 'newPhone' : 'email', (validate) => {
    if (!validate) {
      // 发送验证码
      if (verifyType.value === 'phone') {
        //手机号
        getSmsCaptcha({ phone: form.newPhone }).then((res) => {
          console.log(res)
        })
      } else if (verifyType.value === 'email') {
        //邮箱
        getEmailCaptcha({ email: form.email }).then((res) => {
          console.log(res)
        })
      }
    }
  })
}
const save: InstanceType<typeof Modal>['onBeforeOk'] = async () => {
  const flag = await formRef.value?.validate()
  if (flag) return false
  try {
    const res = await updateUserEmail({
      newEmail: form.email,
      captcha: form.captcha,
      currentPassword: encryptByRsa(form.currentPassword) as string
    })
    if (res.code === 200) {
      Message.success('修改成功')
      visible.value = false
      // 修改成功后，重新获取用户信息
      userStore.getInfo()
      return true
    }
  } catch (error) {
    return false
  }
  // return await saveApi()
}
const handleCancel = () => {
  formRef.value?.resetFields()
  visible.value = false
}
const open = (type: string) => {
  verifyType.value = type
  visible.value = true
}
defineExpose({
  open
})
</script>
