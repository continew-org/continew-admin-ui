<template>
  <Card style="height: 100%">
    <template #header>基本设置</template>
    <template #body>
      <div class="mode-item" v-for="item in modeList" :key="item.title">
        <div class="mode-item-content">
          <div class="icon"><GiSvgIcon :name="item.icon" :size="36" /></div>
          <div>
            <div style="font-size: 14px; font-weight: 500; line-height: 28px; display: flex; align-items: center">
              <span>{{ item.title }}</span>
              <div style="margin-left: 10px">
                <GiSvgIcon :name="item.status ? 'success' : 'warning'" :size="14" /><span
                  style="margin-left: 5px; font-size: 12px"
                  >{{ item.status ? '已开启' : '未开启' }}</span
                >
              </div>
            </div>
            <div style="font-size: 12px">{{ item.subtitle }}</div>
          </div>
        </div>
        <div>
          <a-button @click="openVerifyModel(item.type)">修改</a-button>
        </div>
      </div>
    </template>
  </Card>
  <VerifyModel ref="verifyModelRef" />
</template>
<script setup lang="ts">
import Card from '../components/Card.vue'
import VerifyModel from '../components/VerifyModel.vue'
interface ModeItem {
  title: string
  icon: string
  subtitle: string
  type: 'phone' | 'email'
  status: boolean
}
const modeList = ref<ModeItem[]>([])
modeList.value = [
  { title: '绑定手机号', icon: 'tel', subtitle: '+86******88888可通过手机验证码快捷登录', type: 'phone', status: true },
  { title: '绑定邮箱', icon: 'mail', subtitle: '邮箱可用于身份验证、密码找回、通知接收', type: 'email', status: true }
]
const verifyModelRef = ref<InstanceType<typeof VerifyModel>>()
const openVerifyModel = (type: 'phone' | 'email') => {
  verifyModelRef.value?.open(type)
}
</script>
<style lang="scss" scoped>
.mode-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .mode-item-content {
    display: flex;
    align-items: center;
    .icon {
      margin-right: 10px;
    }
  }
}
</style>
