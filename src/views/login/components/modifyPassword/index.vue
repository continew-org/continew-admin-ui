<template>
  <a-form
    ref="formRef" :model="form" :rules="rules" layout="vertical" :label-col-style="{ lineHeight: '10px' }"
    :wrapper-col-style="{ flex: 1 }" size="large" @submit="onModify"
  >
    <a-form-item field="oldPassword" label="当前密码">
      <a-input-password v-model="form.oldPassword" placeholder="请输入当前密码" allow-clear />
    </a-form-item>
    <a-form-item field="newPassword" label="新密码">
      <a-input-password v-model="form.newPassword" placeholder="请输入新密码" allow-clear />
    </a-form-item>
    <a-form-item field="confirmPassword" label="确认密码">
      <a-input-password v-model="form.confirmPassword" placeholder="请再次输入新密码" allow-clear />
    </a-form-item>
    <a-form-item>
      <a-space direction="vertical" fill class="w-full">
        <a-button class="btn" type="primary" :loading="loading" html-type="submit" size="large" long>
          立即修改
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { type FormInstance, Message } from '@arco-design/web-vue'
import { updateUserPassword } from '@/apis/system'
import { encryptByRsa } from '@/utils/encrypt'
import { useUserStore } from '@/stores'

interface Form {
  oldPassword: string
  newPassword: string
  confirmPassword?: string
}
const formRef = ref<FormInstance>()
const form = reactive<Form>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const rules: FormInstance['rules'] = {
  oldPassword: [
    { required: true, message: '请输入当前密码' },
  ],
  newPassword: [{ required: true, message: '请输入新密码' }, {
    validator: (value, cd) => {
      return new Promise((resolve) => {
        if (value === form.oldPassword) {
          cd('新密码不能与旧密码相同')
        }
        resolve(true)
      })
    },
  }],
  confirmPassword: [{ required: true, message: '请再次输入新密码' }, {
    validator: (value, cd) => {
      return new Promise((resolve) => {
        if (value !== form.newPassword) {
          cd('两次密码不一致')
        }
        resolve(true)
      })
    },
  }],
}
const router = useRouter()
const loading = ref(false)

// 登录
const onModify = async () => {
  const isInvalid = await formRef.value?.validate()
  if (isInvalid) return
  try {
    loading.value = true
    const params = {
      oldPassword: encryptByRsa(form.oldPassword) || '',
      newPassword: encryptByRsa(form.newPassword) || '',
    }
    await updateUserPassword(params)
    Message.success('密码修改成功，请使用新密码重新登录')
    // 后端改密后会踢出全部会话，必须清理本地登录态再跳转，
    // 否则会带着已失效的 Access Token 触发一轮 401
    await useUserStore().logoutCallBack()
    await router.replace('/login')
  } catch (error) {

  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
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
