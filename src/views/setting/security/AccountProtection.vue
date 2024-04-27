<template>
  <a-card title="账号保护" bordered class="gradient-card">
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
                item.status ? '已开启' : '未开启'
              }}</span>
            </span>
          </div>
          <div class="info-desc">
            {{ item.subtitle }}
          </div>
        </div>
        <div class="btn-wrapper">
          <a-switch disabled title="未开放" />
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import type { ModeItem } from '../type'

const modeList = ref<ModeItem[]>([])
modeList.value = [
  {
    title: '登录保护',
    icon: 'protect',
    subtitle: '开启登录保护后，账号登录需进行二次身份验证',
    status: false
  },
  {
    title: '操作保护',
    icon: 'protect',
    subtitle: '进行敏感操作时需进行二次身份校验',
    status: false
  }
]
</script>

<style lang="scss" scoped></style>
