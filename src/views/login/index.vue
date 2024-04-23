<template>
  <div class="login">
    <a-row align="stretch" class="login-box">
      <a-col :xs="0" :sm="12" :md="13">
        <div class="login-left">
          <img class="login-left__img" src="@/assets/images/banner.png" alt="banner" />
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :md="11">
        <div class="login-right">
          <a-form
            ref="formRef"
            :model="form"
            :rules="rules"
            :style="{ width: '84%' }"
            :label-col-style="{ display: 'none' }"
            :wrapper-col-style="{ flex: 1 }"
            size="large"
            @submit="handleLogin"
          >
            <h3 class="login-right__title">
              <img v-if="webLogo" class="logo" :src="webLogo" alt="logo" height="33" />
              <img v-else class="logo" src="/logo.svg" alt="logo" />
              <span>{{ appStore.getTitle() }}</span>
            </h3>
            <a-form-item field="username">
              <a-input v-model="form.username" placeholder="请输入用户名" allow-clear>
                <template #prefix><icon-user :stroke-width="1" :style="{ fontSize: '16px' }" /></template>
              </a-input>
            </a-form-item>
            <a-form-item field="password">
              <a-input-password v-model="form.password" placeholder="请输入密码">
                <template #prefix><icon-lock :stroke-width="1" :style="{ fontSize: '16px' }" /></template>
              </a-input-password>
            </a-form-item>
            <a-form-item field="captcha" hide-label>
              <a-input v-model="form.captcha" placeholder="请输入验证码" :max-length="4" allow-clear style="flex: 1 1">
                <template #prefix><icon-check-circle :stroke-width="1" :style="{ fontSize: '16px' }" /></template>
              </a-input>
              <img :src="captchaImgBase64" alt="验证码" class="captcha" @click="getCaptcha" />
            </a-form-item>
            <a-form-item>
              <a-row justify="space-between" align="center" class="w-full">
                <a-checkbox v-model="loginConfig.rememberMe">记住我</a-checkbox>
                <a-link>忘记密码</a-link>
              </a-row>
            </a-form-item>
            <a-form-item>
              <a-space direction="vertical" fill class="w-full">
                <a-button type="primary" size="large" long :loading="loading" html-type="submit">登录</a-button>
              </a-space>
            </a-form-item>
            <div class="login-right__oauth">
              <a-divider orientation="center">其他登录方式</a-divider>
              <div class="list">
                <a class="item" title="使用 Gitee 账号登录" @click="onOauth('gitee')">
                  <GiSvgIcon name="gitee" :size="24" />
                </a>
                <a class="item" title="使用 GitHub 账号登录" @click="onOauth('github')">
                  <GiSvgIcon name="github" :size="24" />
                </a>
              </div>
            </div>
          </a-form>
        </div>
      </a-col>
    </a-row>

    <GiThemeBtn class="theme-btn" />
    <LoginBg />

    <!--    <div class="footer">
      <div class="beian">
        <div class="below text" v-html="appStore.getCopyright()"></div>
      </div>
    </div>-->
  </div>
</template>

<script setup lang="ts">
import { getImageCaptcha, socialAuth } from '@/apis'
import { Message, type FormInstance } from '@arco-design/web-vue'
import LoginBg from './components/LoginBg/index.vue'
import { useAppStore, useUserStore } from '@/stores'
import { useStorage } from '@vueuse/core'
import { useLoading } from '@/hooks'
import { encryptByRsa } from '@/utils/encrypt'

const appStore = useAppStore()

computed(() => appStore.getTitle())
const webLogo = computed(() => appStore.getLogo())

defineOptions({ name: 'Login' })

const loginConfig = useStorage('login-config', {
  rememberMe: true,
  username: 'admin', // 演示默认值
  password: 'admin123' // 演示默认值
  // username: debug ? 'admin' : '', // 演示默认值
  // password: debug ? 'admin123' : '', // 演示默认值
})

const formRef = ref<FormInstance>()
const form = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password,
  captcha: '',
  uuid: ''
})

const rules: FormInstance['rules'] = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  captcha: [{ required: true, message: '请输入验证码' }]
}

const userStore = useUserStore()
const router = useRouter()
const { loading, setLoading } = useLoading()
// 登录
const handleLogin = async () => {
  try {
    const isInvalid = await formRef.value?.validate()
    if (isInvalid) return
    setLoading(true)
    await userStore.accountLogin({
      username: form.username,
      password: encryptByRsa(form.password) || '',
      captcha: form.captcha,
      uuid: form.uuid
    })
    const { redirect, ...othersQuery } = router.currentRoute.value.query
    router.push({
      path: (redirect as string) || '/',
      query: {
        ...othersQuery
      }
    })
    const { rememberMe } = loginConfig.value
    loginConfig.value.username = rememberMe ? form.username : ''
    Message.success('欢迎使用')
  } catch (error) {
    getCaptcha()
    form.captcha = ''
  } finally {
    setLoading(false)
  }
}

const captchaImgBase64 = ref()
// 获取验证码
const getCaptcha = () => {
  getImageCaptcha().then((res) => {
    form.uuid = res.data.uuid
    captchaImgBase64.value = res.data.img
  })
}

// 第三方登录授权
const onOauth = async (source: string) => {
  const { data } = await socialAuth(source)
  window.location.href = data.authorizeUrl
}

onMounted(() => {
  getCaptcha()
})
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-5);
  &-box {
    width: 86%;
    max-width: 820px;
    height: 480px;
    display: flex;
    z-index: 999;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.08);
  }
}

.login-left {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(60deg, rgb(var(--primary-6)), rgb(var(--primary-3)));
  &__img {
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    transition: all 0.3s;
    object-fit: cover;
  }
}

.login-right {
  width: 100%;
  height: 100%;
  background: var(--color-bg-1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  box-sizing: border-box;
  &__title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      width: 32px;
      height: 32px;
      margin-right: 6px;
    }
  }
  .arco-input-wrapper,
  :deep(.arco-select-view-single) {
    height: 40px;
    border-radius: 4px;
    font-size: 13px;
  }
  .arco-input-wrapper.arco-input-error {
    background-color: rgb(var(--danger-1));
    border-color: rgb(var(--danger-4));
  }
  .arco-input-wrapper :deep(.arco-input) {
    font-size: 13px;
    color: var(--color-text-1);
  }
  &__oauth {
    margin-bottom: 20px;
    :deep(.arco-divider-text) {
      color: var(--color-text-4);
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
    }
    :deep(.arco-divider-horizontal) {
      border-bottom: 1px solid rgb(229, 230, 235);
    }
    .list {
      align-items: center;
      display: flex;
      justify-content: center;
      width: 100%;
      .item {
        margin-right: 15px;
      }
    }
  }
}

.theme-btn {
  position: fixed;
  top: 20px;
  left: 30px;
  z-index: 9999;
}

.captcha {
  width: 111px;
  height: 36px;
  margin: 0 0 0 5px;
  cursor: pointer;
}

.footer {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  .beian {
    .text {
      color: #41464f;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.2px;
      line-height: 20px;
      text-align: center;
    }
    .below {
      align-items: center;
      display: flex;
    }
  }
}
</style>
