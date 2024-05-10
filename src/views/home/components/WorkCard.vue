<template>
  <a-card title="工作台" :bordered="false" class="card">
    <template #extra>
      <NowTime />
    </template>
    <a-row align="center" wrap :gutter="[{ xs: 0, sm: 14, md: 14, lg: 14, xl: 14, xxl: 14 }, 16]" class="content">
      <a-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16" :xxl="18">
        <a-space size="medium">
          <a-avatar :size="68">
            <img :src="userStore.avatar" alt="avatar" />
          </a-avatar>
          <div class="welcome">
            <p class="hello">{{ goodTimeText() }}！{{ userStore.name }}</p>
            <p>北海虽赊，扶摇可接；东隅已逝，桑榆非晚。</p>
          </div>
        </a-space>
      </a-col>
      <a-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8" :xxl="6" style="margin: -8px -7px">
        <a-row justify="end">
          <SupportCard v-if="isDesktop" />
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import NowTime from './NowTime/index.vue'
import SupportCard from './SupportCard.vue'
import { useDevice } from '@/hooks'
import { useUserStore } from '@/stores'
import { goodTimeText } from '@/utils'

const { isDesktop } = useDevice()
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
:deep(.arco-statistic-title) {
  margin-bottom: 0;
}

.card {
  .content {
    padding: 8px 20px;
    .welcome {
      margin: 8px 0;
      color: $color-text-3;
      .hello {
        font-size: 1.25rem;
        color: $color-text-1;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
