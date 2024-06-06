<template>
  <a-card title="第三方账号" bordered class="gradient-card">
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
            v-if="item.jumpMode === 'modal'"
            class="btn"
            :type="item.status ? 'secondary' : 'primary'"
            @click="onUpdate(item.type, item.status)"
          >
            {{ item.status ? '修改' : '绑定' }}
          </a-button>
          <a-button
            v-else-if="item.jumpMode === 'link'"
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
import { Message } from '@arco-design/web-vue'
import type { ModeItem } from '../type'
import VerifyModel from '../components/VerifyModel.vue'
import { listUserSocial, socialAuth, unbindSocialAccount } from '@/apis'

const socialList = ref<any>([])
const modeList = ref<ModeItem[]>([])

// 初始化数据
const initData = () => {
  listUserSocial().then((res) => {
    socialList.value = res.data.map((el) => el.source)
    modeList.value = [
      {
        title: '绑定 Gitee',
        icon: 'gitee',
        subtitle: `${socialList.value.includes('GITEE') ? '' : '绑定后，'}可通过 Gitee 进行登录`,
        jumpMode: 'link',
        type: 'gitee',
        status: socialList.value.includes('GITEE')
      },
      {
        title: '绑定 GitHub',
        icon: 'github',
        subtitle: `${socialList.value.includes('GITHUB') ? '' : '绑定后，'}可通过 GitHub 进行登录`,
        type: 'github',
        jumpMode: 'link',
        status: socialList.value.includes('GITHUB')
      }
    ]
  })
}

// 绑定
const onBinding = (type: string, status: boolean) => {
  if (!status) {
    socialAuth(type).then((res) => {
      window.open(res.data.authorizeUrl, '_self')
    })
  } else {
    unbindSocialAccount(type).then(() => {
      initData()
      Message.success('解绑成功')
    })
  }
}

const verifyModelRef = ref<InstanceType<typeof VerifyModel>>()
// 修改
const onUpdate = (type: string) => {
  verifyModelRef.value?.open(type)
}

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped></style>
