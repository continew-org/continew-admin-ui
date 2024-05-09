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
          <span class="sub-text-value">小写字母</span>
          <span class="sub-text-value">数字</span>
          <span class="sub-text-value" v-if="securityConfig.password_special_char.value == 1">特殊字符</span>
        </div>
        <div class="sub-text" v-if="securityConfig.password_contain_name.value == 1">
          密码不能包含<span class="sub-text-value">正反序用户名</span>
        </div>
        <div class="sub-text">
          密码长度至少
          <span class="sub-text-value">
            {{ securityConfig.password_min_length.value }}
          </span>
          位
        </div>
        <div class="sub-text">
          <div v-if="securityConfig.password_expiration_days.value == 0">未设置密码有效期</div>
          <div v-else>
            密码有效期
            <span class="sub-text-value">
              {{ securityConfig.password_expiration_days.value }}
            </span>
            天
          </div>
        </div>
        <div class="sub-text">
          连续密码错误可重试
          <span class="sub-text-value">
            {{ securityConfig.password_error_count.value }}
          </span>
          次
        </div>
        <div class="sub-text">
          超过错误密码重试次数账号将被锁定
          <span class="sub-text-value">
            {{ securityConfig.password_lock_minutes.value }}
          </span>
          分钟
        </div>
      </div>
    </div>
  </a-card>

  <a-modal v-model:visible="visible" title="修改密码" @before-ok="save" @close="reset">
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns" />
  </a-modal>
</template>

<script lang="ts" setup>
import { listOption, type OptionResp, type SecurityConfigResp, updateUserPassword } from '@/apis'
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
    rules: [{ required: true, message: '密码长度不正确', maxLength: 32, minLength: 6 }],
    hide: () => {
      return userInfo.pwdResetTime
    }
  },
  {
    label: '新密码',
    field: 'newPassword',
    type: 'input-password',
    rules: [{ required: true, message: '密码长度不正确', maxLength: 32, minLength: 6 }]
  },
  {
    label: '确认新密码',
    field: 'rePassword',
    type: 'input-password',
    rules: [{ required: true, message: '密码长度不正确', maxLength: 32, minLength: 6 }],
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
  if (form.newPassword !== form.rePassword) {
    Message.error('两次新密码不一致')
    return false
  }
  if (form.newPassword === form.oldPassword) {
    Message.error('新密码与旧密码不能相同')
    return false
  }
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

const securityConfig = ref<SecurityConfigResp>({
  password_contain_name: {},
  password_error_count: {},
  password_expiration_days: {},
  password_lock_minutes: {},
  password_min_length: {},
  password_special_char: {},
  password_update_interval: {}
})

// 查询列表数据
const getDataList = async () => {
  const { data } = await listOption({ code: Object.keys(securityConfig.value) })
  securityConfig.value = data.reduce((obj: SecurityConfigResp, option: OptionResp) => {
    obj[option.code] = { ...option, value: parseInt(option.value) }
    return obj
  }, {})
}
onMounted(() => {
  getDataList()
})
</script>

<style lang="scss" scoped></style>
