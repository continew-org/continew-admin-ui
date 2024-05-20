<template>
  <a-form
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-col-style="{ display: 'none' }"
    :wrapper-col-style="{ flex: 1 }"
    size="large"
    @submit="handleLogin"
  >
    <a-form-item field="phone" hide-label>
      <a-input v-model="form.phone" placeholder="请输入手机号" :max-length="11" allow-clear />
    </a-form-item>
    <a-form-item field="captcha" hide-label>
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
    </a-form-item>
    <a-form-item>
      <a-space direction="vertical" fill class="w-full">
        <a-button disabled class="btn" type="primary" :loading="loading" html-type="submit" size="large" long>立即登录</a-button
        >
      </a-space>
    </a-form-item>
  </a-form>
  <Verify
    ref="VerifyRef"
    :captcha-type="captchaType"
    :mode="captchaMode"
    :img-size="{ width: '330px', height: '155px' }"
    @success="getCaptcha"
  />
</template>

<script setup lang="ts">
// import { getSmsCaptcha } from '@/apis'
import { type FormInstance, Message } from '@arco-design/web-vue'
import { useUserStore } from '@/stores'
import * as Regexp from '@/utils/regexp'

const formRef = ref<FormInstance>()
const form = reactive({
  phone: '',
  captcha: ''
})

const rules: FormInstance['rules'] = {
  phone: [
    { required: true, message: '请输入手机号' },
    { match: Regexp.Phone, message: '请输入正确的手机号' }
  ],
  captcha: [{ required: true, message: '请输入验证码' }]
}

const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)
// 登录
const handleLogin = async () => {
  const isInvalid = await formRef.value?.validate()
  if (isInvalid) return
  try {
    loading.value = true
    await userStore.phoneLogin(form)
    const { redirect, ...othersQuery } = router.currentRoute.value.query
    router.push({
      path: (redirect as string) || '/',
      query: {
        ...othersQuery
      }
    })
    Message.success('欢迎使用')
  } catch (error) {
    form.captcha = ''
  } finally {
    loading.value = false
  }
}

const VerifyRef = ref<InstanceType<any>>()
const captchaType = ref('blockPuzzle')
const captchaMode = ref('pop')
const captchaLoading = ref(false)
// 弹出行为验证码
const onCaptcha = async () => {
  if (captchaLoading.value) return
  const isInvalid = await formRef.value?.validateField('phone')
  if (isInvalid) return
  VerifyRef.value.show()
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

// 获取验证码
const getCaptcha = async () => {
  try {
    captchaLoading.value = true
    captchaBtnName.value = '发送中...'
    // await getSmsCaptcha({
    //   phone: form.phone
    // })
    captchaLoading.value = false
    captchaDisable.value = true
    captchaBtnName.value = `获取验证码(${(captchaTime.value -= 1)}s)`
    // Message.success('短信发送成功')
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
</script>

<style lang="scss" scoped>
.arco-input-wrapper,
:deep(.arco-select-view-single) {
  height: 40px;
  border-radius: 4px;
  font-size: 13px;
}

.arco-input-wrapper.arco-input-error {
  background-color: rgb(var(--danger-1));
  border-color: rgb(var(--danger-3));
}
.arco-input-wrapper.arco-input-error:hover {
  background-color: rgb(var(--danger-1));
  border-color: rgb(var(--danger-6));
}

.arco-input-wrapper :deep(.arco-input) {
  font-size: 13px;
  color: var(--color-text-1);
}
.arco-input-wrapper:hover {
  border-color: rgb(var(--arcoblue-6));
}

.captcha-btn {
  height: 40px;
  margin-left: 12px;
  min-width: 98px;
  border-radius: 4px;
}

.btn {
  height: 40px;
}
</style>
