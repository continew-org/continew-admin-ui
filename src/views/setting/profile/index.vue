<template>
  <div class="user">
    <div class="user__info">
      <a-row justify="space-between">
        <a-col :span="7" style="padding-right: 20px">
          <LeftBox />
        </a-col>
        <a-col :span="17">
          <RightBox />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/stores'
import RightBox from './RightBox.vue'
import LeftBox from './LeftBox.vue'
defineOptions({ name: 'Profile' })

const route = useRoute()
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.user {
  // background-color: var(--color-bg-1);
  &__alert {
    padding: $padding;
    padding-bottom: 0;
  }
  &__info {
    box-sizing: border-box;
    overflow: hidden;
    // display: flex;
  }
}
</style>
