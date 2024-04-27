<template>
  <a-card title="登录方式" bordered class="gradient-card">
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
          <a-button
            v-if="item.jumpMode == 'modal'"
            class="btn"
            :type="item.status ? 'secondary' : 'primary'"
            @click="onUpdate(item.type, item.status)"
          >
            {{ item.status ? '修改' : '绑定' }}
          </a-button>
          <a-button
            v-else-if="item.jumpMode == 'link'"
            class="btn"
            :type="item.status ? 'secondary' : 'primary'"
            @click="onBinding(item.type, item.status)"
          >
            {{ item.status ? '解绑' : '绑定' }}
          </a-button>
        </div>
      </div>
    </div>
  </a-card>
  <VerifyModel ref="verifyModelRef" />
</template>

<script setup lang="ts">
import { socialAuth, listUserSocial, unbindSocialAccount } from '@/apis'
import type { ModeItem } from '../type'
import VerifyModel from '../components/VerifyModel.vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const socialList = ref<any>([])
const modeList = ref<ModeItem[]>([])
modeList.value = [
  {
    title: '绑定手机',
    icon: 'phone-color',
    value: `${userInfo.value.phone + ' ' || '绑定后，'}`,
    subtitle: `可通过手机验证码快捷登录`,
    type: 'phone',
    jumpMode: 'modal',
    status: !!userInfo.value.phone
  },
  {
    title: '绑定邮箱',
    icon: 'email-color',
    value: `${userInfo.value.email + ' ' || '绑定后，'}`,
    subtitle: `可通过邮箱验证码进行登录`,
    type: 'email',
    jumpMode: 'modal',
    status: !!userInfo.value.email
  },
  {
    title: '绑定 Gitee',
    icon: 'gitee',
    subtitle: `${socialList.value.some((el) => el == 'gitee') ? '' : '绑定后，'}可通过 Gitee 进行登录`,
    jumpMode: 'link',
    type: 'gitee',
    status: socialList.value.some((el) => el == 'gitee')
  },
  {
    title: '绑定 GitHub',
    icon: 'github',
    subtitle: `${socialList.value.some((el) => el == 'gitee') ? '' : '绑定后，'}可通过 GitHub 进行登录`,
    type: 'github',
    jumpMode: 'link',
    status: socialList.value.some((el) => el == 'github')
  }
]

// 绑定
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

const verifyModelRef = ref<InstanceType<typeof VerifyModel>>()
// 修改
const onUpdate = (type: string) => {
  verifyModelRef.value?.open(type)
}

// 初始化数据
const initData = () => {
  listUserSocial().then((res) => {
    socialList.value = res.data.map((el) => el.source)
  })
}

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped></style>
