<template>
  <a-card title="安全设置" bordered class="gradient-card">
    <div v-for="item in modeList" :key="item.title">
      <div class="item">
        <div class="icon-wrapper"><GiSvgIcon :name="item.icon" :size="26" /></div>
        <div class="info">
          <div class="info-top">
            <span class="label">{{ item.title }}</span>
            <span class="bind">
              <icon-check-circle-fill v-if="item.status" :size="14" class="success" />
              <icon-exclamation-circle-fill v-else :size="14" class="warning" />
              <span style="font-size: 12px" :class="item.status ? 'success' : 'warning'">{{ item.statusString }}</span>
            </span>
          </div>
          <div class="info-desc">
            <span class="value">{{ item.value }}</span>
            {{ item.subtitle }}
          </div>
        </div>
        <div class="btn-wrapper">
          <a-button
            v-if="item.jumpMode === 'modal'"
            class="btn"
            :type="item.status ? 'secondary' : 'primary'"
            @click="onUpdate(item.type, item.status)"
          >
            {{ ['password'].includes(item.type) || item.status ? '修改' : '绑定' }}
          </a-button>
        </div>
      </div>
    </div>
  </a-card>

  <VerifyModel ref="verifyModelRef" />
</template>

<script lang="ts" setup>
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
    value: userInfo.value.phone,
    subtitle: `${userInfo.value.phone ? '' : '手机号'}可用于登录、身份验证、密码找回、通知接收`,
    type: 'phone',
    jumpMode: 'modal',
    status: !!userInfo.value.phone,
    statusString: userInfo.value.phone ? '已绑定' : '未绑定'
  },
  {
    title: '安全邮箱',
    icon: 'email-color',
    value: userInfo.value.email,
    subtitle: `${userInfo.value.email ? '' : '邮箱'}可用于登录、身份验证、密码找回、通知接收`,
    type: 'email',
    jumpMode: 'modal',
    status: !!userInfo.value.email,
    statusString: userInfo.value.email ? '已绑定' : '未绑定'
  },
  {
    title: '登录密码',
    icon: 'password-color',
    subtitle: userInfo.value.pwdResetTime ? `为了您的账号安全，建议定期修改密码` : '请设置密码，可通过账号+密码登录',
    type: 'password',
    jumpMode: 'modal',
    status: !!userInfo.value.pwdResetTime,
    statusString: userInfo.value.pwdResetTime ? '已设置' : '未设置'
  }
]

const verifyModelRef = ref<InstanceType<typeof VerifyModel>>()
// 修改
const onUpdate = (type: string) => {
  verifyModelRef.value?.open(type)
}
</script>

<style lang="scss" scoped></style>
