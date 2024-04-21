<template>
  <Card style="height: 600px">
    <template #header> 主账号信息 </template>
    <template #body>
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
            <span style="margin-left: 10px">{{ userInfo.id }}</span>
          </div>
        </section>
        <footer>
          <div class="footer_item">
            <div>
              <span style="margin-right: 10px">安全手机</span>
              <span>{{ userInfo.phone }}</span>
            </div>
            <div>
              <span
                ><GiSvgIcon :name="userInfo.email ? 'success' : 'warning'" :size="14" /><span
                  style="margin-left: 5px; font-size: 12px"
                  >{{ userInfo.phone ? '已绑定' : '未绑定' }}</span
                ></span
              >
              <a-divider direction="vertical" />
              <icon-edit :size="16" class="btn" @click="openVerifyModel('phone')" />
            </div>
          </div>
          <div class="footer_item">
            <div>
              <span style="margin-right: 10px">安全邮箱</span>
              <span>{{ userInfo.email }}</span>
            </div>
            <div>
              <span
                ><GiSvgIcon :name="userInfo.email ? 'success' : 'warning'" :size="14" /><span
                  style="margin-left: 5px; font-size: 12px"
                  >{{ userInfo.email ? '已绑定' : '未绑定' }}</span
                ></span
              >
              <a-divider direction="vertical" />
              <icon-edit :size="16" class="btn" @click="openVerifyModel('email')" />
            </div>
          </div>
        </footer>
      </div>
    </template>
    <template #footer>
      <div class="footer">注册于 {{ userInfo.registrationDate }}</div>
    </template>
  </Card>
  <VerifyModel ref="verifyModelRef" />
</template>
<script setup lang="ts">
import Card from '../components/Card.vue'
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
  height: 100%;
  .btn {
    cursor: pointer;
  }
  & > section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar > img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .name {
      font-size: 20px;
      margin: 20px 0;
    }
  }
  & > footer .footer_item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    font-size: 12px;
  }
}
.footer {
  padding: 15px 28px;
  text-align: center;
  border-top: 1px solid var(--color-neutral-2);
}
</style>
