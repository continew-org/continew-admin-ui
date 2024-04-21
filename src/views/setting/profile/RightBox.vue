<template>
  <Card>
    <template #header> 登录方式 </template>
    <template #body>
      <div class="mode-list">
        <div v-for="item in modeList" :key="item.title" class="mode-item">
          <div class="mode-item-box">
            <div class="mode-item-icon">
              <GiSvgIcon :name="item.icon" :size="50" />
            </div>
            <div class="mode-item-content">
              <div class="mode-item-title">
                <div>{{ item.title }}</div>
                <div style="margin-left: 10px">
                  <GiSvgIcon :name="item.status ? 'success' : 'warning'" :size="14" /><span
                    style="margin-left: 5px; font-size: 12px"
                    >{{ item.status ? '已绑定' : '未绑定' }}</span
                  >
                </div>
              </div>
              <div class="mode-item-subtitle">{{ item.subtitle }}</div>
            </div>
          </div>
          <div class="model-item-btn">
            <a-button @click="openVerifyModel(item.type, item.status)" v-if="item.jumpMode == 'modal'">{{
              item.status ? '修改' : '绑定'
            }}</a-button>
            <a-button @click="onBinding(item.type, item.status)" v-else-if="item.jumpMode == 'link'">{{
              item.status ? '解绑' : '绑定'
            }}</a-button>
          </div>
        </div>
      </div>
    </template>
  </Card>
  <VerifyModel ref="verifyModelRef" />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import Card from '../components/Card.vue'
import VerifyModel from '../components/VerifyModel.vue'
import { socialAuth, getSocialAccount, unbindSocialAccount } from '@/apis'
interface ModeItem {
  title: string
  icon: string
  subtitle: string
  type: 'phone' | 'email' | 'gitee' | 'github'
  jumpMode: 'link' | 'modal'
  status: boolean
}
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const verifyModelRef = ref<InstanceType<typeof VerifyModel>>()
const openVerifyModel = (type: 'phone' | 'email') => {
  verifyModelRef.value?.open(type)
}
const socialList = ref<any>([])
const modeList = ref<ModeItem[]>([])
modeList.value = [
  {
    title: '绑定手机号',
    icon: 'Tel',
    subtitle: `${userInfo.value.phone || '绑定后'},可通过手机验证码快捷登录`,
    type: 'phone',
    jumpMode: 'modal',
    status: userInfo.value.phone ? true : false
  },
  {
    title: '绑定邮箱',
    icon: 'Mail',
    subtitle: `${userInfo.value.email || '绑定后'},可通过邮箱验证码进行登录`,
    type: 'email',
    jumpMode: 'modal',
    status: userInfo.value.email ? true : false
  },
  {
    title: '绑定Gitee',
    icon: 'gitee',
    subtitle: '绑定后，可通过Gitee进行登录',
    jumpMode: 'link',
    type: 'gitee',
    status: socialList.value.some((el) => el == 'gitee')
  },
  {
    title: '绑定GitHub',
    icon: 'github',
    subtitle: '绑定后，可通过github进行登录',
    type: 'github',
    jumpMode: 'link',
    status: socialList.value.some((el) => el == 'github')
  }
]
const initData = () => {
  getSocialAccount().then((res) => {
    socialList.value = res.data.map((el) => el.source)
  })
}
onMounted(() => {
  initData()
})
const onBinding = (type: string, status: boolean) => {
  if (!status) {
    socialAuth(type).then((res) => {
      window.open(res.data.authorizeUrl, '_self')
    })
  } else {
    unbindSocialAccount(type).then((res) => {
      if (res.code == 200) {
        userStore.getInfo()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.mode-list {
  .mode-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .mode-item-box {
      display: flex;
      align-items: center;
      .mode-item-icon {
        margin-right: 10px;
      }
      .mode-item-content > div {
        line-height: 26px;
      }
      .mode-item-content .mode-item-title {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
