<template>
  <a-card title="基本信息" bordered class="gradient-card">
    <div class="body">
      <section>
        <div class="avatar">
          <img :src="userStore.avatar" alt="avatar" />
        </div>
        <div class="name">
          <span style="margin-right: 10px">{{ userInfo.nickname }}</span>
          <icon-edit :size="16" class="btn" @click="onEditNickName" />
        </div>
        <div class="id">
          <GiSvgIcon name="id" :size="16" />
          <span>{{ userInfo.id }}</span>
        </div>
      </section>
      <footer>
        <a-descriptions column="4" size="large">
          <a-descriptions-item label="性别" :span="4">
            {{ userInfo.nickname }}
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
            {{ userInfo.nickname }}
          </a-descriptions-item>
          <a-descriptions-item :span="4">
            <template #label> <icon-user-group /><span style="margin-left: 5px">角色</span></template>
            {{ userInfo.nickname }}
          </a-descriptions-item>
        </a-descriptions>
      </footer>
    </div>
    <div class="footer">注册于 {{ userInfo.registrationDate }}</div>
  </a-card>
  <VerifyModel ref="verifyModelRef" />
</template>

<script setup lang="ts">
import { updateUserBaseInfo } from '@/apis'
import VerifyModel from '../components/VerifyModel.vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const verifyModelRef = ref<InstanceType<typeof VerifyModel>>()
const onEditNickName = () => {
  userStore.editNickNameVisible = true
}
const openVerifyModel = (type: 'phone' | 'email') => {
  verifyModelRef.value?.open(type)
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
