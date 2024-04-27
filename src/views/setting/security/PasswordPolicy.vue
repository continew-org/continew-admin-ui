<template>
  <a-card title="密码策略" bordered class="gradient-card">
    <div class="item">
      <div class="icon-wrapper"><GiSvgIcon name="password" :size="26" /></div>
      <div class="info">
        <div class="info-top">
          <span class="label">登录密码</span>
        </div>
        <div class="info-desc">为了您的账号安全，建议定期修改密码</div>
      </div>
      <div class="btn-wrapper">
        <a-button class="btn" @click="onUpdate">修改</a-button>
      </div>
    </div>
    <div class="detail">
      <div class="sub-text-wrapper">
        <div class="sub-text">
          密码至少包含
          <span class="sub-text-value">大写字母</span>
          <span class="sub-text-value">大写字母</span>
          <span class="sub-text-value">小写字母</span>
          <span class="sub-text-value">数字</span>
          <span class="sub-text-value">特殊字符</span>3种
        </div>
        <div class="sub-text">限制密码长度至少为<span class="sub-text-value">6</span>位</div>
        <div class="sub-text">未设置密码有效期</div>
        <div class="sub-text">新密码不能与历史前<span class="sub-text-value">N</span>次密码重复</div>
        <div class="sub-text">1小时内密码错误可重试<span class="sub-text-value">N</span>次</div>
        <div class="sub-text">超过错误密码重试次数账号将被锁定<span class="sub-text-value">N</span>分钟</div>
        <a-link class="link">修改规则（未开放）</a-link>
      </div>
    </div>
  </a-card>

  <a-modal v-model:visible="visible" title="修改密码" @before-ok="save" @close="reset">
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns" />
  </a-modal>
</template>

<script lang="ts" setup>
import { updateUserPassword } from '@/apis'
import { Message } from '@arco-design/web-vue'
import { encryptByRsa } from '@/utils/encrypt'
import { type Columns, GiForm } from '@/components/GiForm'
import { useForm } from '@/hooks'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const formRef = ref<InstanceType<typeof GiForm>>()

const options: Options = {
  form: {},
  col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  btns: { hide: true }
}

const columns: Columns = [
  {
    label: '当前密码',
    field: 'oldPassword',
    type: 'input-password',
    rules: [{ required: true, message: '请输入当前密码' }],
    hide: () => {
      return userInfo.pwdResetTime
    }
  },
  {
    label: '新密码',
    field: 'newPassword',
    type: 'input-password',
    rules: [{ required: true, message: '请输入新密码' }]
  },
  {
    label: '确认新密码',
    field: 'rePassword',
    type: 'input-password',
    rules: [{ required: true, message: '请再次输入新密码' }],
    props: {
      placeholder: '请再次输入新密码'
    }
  }
]

const { form, resetForm } = useForm({
  oldPassword: '',
  newPassword: '',
  rePassword: ''
})

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
    await updateUserPassword({
      oldPassword: encryptByRsa(form.oldPassword) || '',
      newPassword: encryptByRsa(form.newPassword) || ''
    })
    Message.success('修改成功')
    return true
  } catch (error) {
    return false
  }
}
</script>

<style lang="scss" scoped></style>
