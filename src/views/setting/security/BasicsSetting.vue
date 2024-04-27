<template>
  <a-card title="基本设置" bordered class="gradient-card">
    <div v-for="item in modeList" :key="item.title">
      <div class="item">
        <div class="icon-wrapper"><GiSvgIcon :name="item.icon" :size="26" /></div>
        <div class="info">
          <div class="info-top">
            <span class="label">{{ item.title }}</span>
            <span class="bind">
              <icon-check-circle-fill v-if="item.status" :size="14" class="success" />
              <icon-exclamation-circle-fill v-else :size="14" class="warning" />
              <span style="font-size: 12px" :class="item.status ? 'success' : 'warning'">{{
                item.status ? '已绑定' : '未绑定'
              }}</span>
            </span>
          </div>
          <div class="info-desc">
            <span class="value">{{ item.value }}</span>
            {{ item.subtitle }}
          </div>
        </div>
        <div class="btn-wrapper">
          <a-button class="btn" :type="item.status ? 'secondary' : 'primary'" @click="onUpdate(item.type)">
            {{ item.status ? '修改' : '绑定' }}
          </a-button>
        </div>
      </div>
    </div>
  </a-card>
  <VerifyModel ref="verifyModelRef" />
</template>

<script setup lang="ts">
import type { ModeItem } from '../type'
import VerifyModel from '../components/VerifyModel.vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const modeList = ref<ModeItem[]>([])
modeList.value = [
  {
    title: '安全手机',
    icon: 'phone-color',
    value: `${userInfo.value.phone + ' ' || '手机号'}`,
    subtitle: `可用于身份验证、密码找回、通知接收`,
    type: 'phone',
    status: !!userInfo.value.phone
  },
  {
    title: '安全邮箱',
    icon: 'email-color',
    value: `${userInfo.value.email + ' ' || '邮箱'}`,
    subtitle: `可用于身份验证、密码找回、通知接收`,
    type: 'email',
    status: !!userInfo.value.email
  }
]

const verifyModelRef = ref<InstanceType<typeof VerifyModel>>()
// 修改
const onUpdate = (type: string) => {
  verifyModelRef.value?.open(type)
}
</script>

<style lang="scss" scoped>
.mode-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .mode-item-content {
    display: flex;
    .icon {
      margin-right: 10px;
    }
  }
}
</style>
