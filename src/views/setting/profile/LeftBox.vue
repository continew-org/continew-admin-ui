<template>
  <a-card title="基本信息" bordered class="gradient-card">
    <div class="body">
      <section>
        <div class="avatar">
          <img :src="userStore.avatar" alt="avatar" />
        </div>
        <div class="name">
          <span style="margin-right: 10px">{{ userInfo.nickname }}</span>
          <icon-edit :size="16" class="btn" @click="onUpdate" />
        </div>
        <div class="id">
          <GiSvgIcon name="id" :size="16" />
          <span>{{ userInfo.id }}</span>
        </div>
      </section>
      <footer>
        <a-descriptions column="4" size="large">
          <a-descriptions-item :span="4">
            <template #label> <icon-user /><span style="margin-left: 5px">用户名</span></template>
            {{ userInfo.username }}
            <icon-man v-if="userInfo.gender === 1" style="color: #19bbf1" />
            <icon-woman v-else-if="userInfo.gender === 2" style="color: #fa7fa9" />
          </a-descriptions-item>
          <a-descriptions-item :span="4">
            <template #label> <icon-phone /><span style="margin-left: 5px">手机</span></template>
            {{ userInfo.phone }}
          </a-descriptions-item>
          <a-descriptions-item :span="4">
            <template #label> <icon-email /><span style="margin-left: 5px">邮箱</span></template>
            {{ userInfo.email }}
          </a-descriptions-item>
          <a-descriptions-item :span="4">
            <template #label> <icon-mind-mapping /><span style="margin-left: 5px">部门</span></template>
            {{ userInfo.deptName }}
          </a-descriptions-item>
          <a-descriptions-item :span="4">
            <template #label> <icon-user-group /><span style="margin-left: 5px">角色</span></template>
            {{ userInfo.roles.join('，') }}
          </a-descriptions-item>
        </a-descriptions>
      </footer>
    </div>
    <div class="footer">注册于 {{ userInfo.registrationDate }}</div>
  </a-card>

  <a-modal v-model:visible="visible" title="修改基本信息" @before-ok="save" @close="reset">
    <GiForm ref="formRef" v-model="form" :options="options" :columns="columns" />
  </a-modal>
</template>

<script setup lang="ts">
import { updateUserBaseInfo, updateUserPassword } from '@/apis'
import { Message } from '@arco-design/web-vue'
import { type Columns, GiForm } from '@/components/GiForm'
import { useForm } from '@/hooks'
import { useUserStore } from '@/stores'
import { encryptByRsa } from '@/utils/encrypt'

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
    label: '昵称',
    field: 'nickname',
    type: 'input',
    rules: [{ required: true, message: '请输入昵称' }]
  },
  {
    label: '性别',
    field: 'gender',
    type: 'radio-group',
    options: [
      { label: '男', value: 1 },
      { label: '女', value: 2 },
      { label: '未知', value: 0, disabled: true }
    ],
    rules: [{ required: true, message: '请选择性别' }]
  }
]

const { form, resetForm } = useForm({
  nickname: userInfo.value.nickname,
  gender: userInfo.value.gender
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
    await updateUserBaseInfo(form)
    Message.success('修改成功')
    // 修改成功后，重新获取用户信息
    await userStore.getInfo()
    return true
  } catch (error) {
    return false
  }
}
</script>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;
  padding: 28px 10px 20px 10px;
  .btn {
    cursor: pointer;
  }

  & > section {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px 0 50px;
    .avatar > img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .name {
      font-size: 20px;
      margin: 20px 0;
    }
    .id {
      span {
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        padding: 0 6px;
        color: var(--color-text-3);
      }
    }
  }

  & > footer .footer_item {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 12px;
  }
}

.footer {
  margin: 0 -16px;
  padding-top: 16px;
  font-size: 12px;
  text-align: center;
  border-top: 1px solid var(--color-border-2);
}
</style>
