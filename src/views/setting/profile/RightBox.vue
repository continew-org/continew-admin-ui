<template>
  <a-card title="登录方式" bordered class="gradient-card">
    <div class="mode-list">
      <div v-for="item in modeList" :key="item.title" class="mode-item">
        <div class="mode-item-box">
          <div class="mode-item-box__icon">
            <GiSvgIcon :name="item.icon" :size="48" />
          </div>
          <div class="mode-item-box__content">
            <div class="title">
              <div>{{ item.title }}</div>
              <div style="margin-left: 10px">
                <icon-check-circle-fill v-if="item.status" :size="14" class="success" />
                <icon-exclamation-circle-fill v-else :size="14" class="warning" />
                <span style="font-size: 12px" :class="item.status ? 'success' : 'warning'">{{
                  item.status ? '已绑定' : '未绑定'
                }}</span>
              </div>
            </div>
            <div class="mode-item-box__subtitle">{{ item.subtitle }}</div>
          </div>
        </div>
        <div>
          <a-button
            v-if="item.jumpMode == 'modal'"
            class="btn"
            :type="item.status ? 'secondary' : 'primary'"
            @click="openVerifyModel(item.type, item.status)"
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
import { socialAuth, getSocialAccount, unbindSocialAccount } from '@/apis'
import type { ModeItem } from './type'
import { useUserStore } from '@/stores'
import VerifyModel from '../components/VerifyModel.vue'

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
    title: '绑定手机',
    icon: userInfo.value.phone ? 'tel' : 'tel-unbind',
    subtitle: `${userInfo.value.phone || '绑定后'}，可通过手机验证码快捷登录`,
    type: 'phone',
    jumpMode: 'modal',
    status: !!userInfo.value.phone
  },
  {
    title: '绑定邮箱',
    icon: userInfo.value.email ? 'mail' : 'mail-unbind',
    subtitle: `${userInfo.value.email || '绑定后'}，可通过邮箱验证码进行登录`,
    type: 'email',
    jumpMode: 'modal',
    status: !!userInfo.value.email
  },
  {
    title: '绑定 Gitee',
    icon: 'gitee',
    subtitle: '绑定后，可通过 Gitee 进行登录',
    jumpMode: 'link',
    type: 'gitee',
    status: socialList.value.some((el) => el == 'gitee')
  },
  {
    title: '绑定 GitHub',
    icon: 'github',
    subtitle: '绑定后，可通过 GitHub 进行登录',
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

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.mode-list {
  .mode-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    &-box {
      display: flex;
      align-items: center;
      &__icon {
        margin-right: 10px;
      }
      &__content {
        div {
          line-height: 26px;
        }
        .title {
          display: flex;
          align-items: center;
        }
      }
    }
    .btn {
      height: 28px;
      margin-left: 10px;
      width: 56px;
    }
  }
}
</style>
