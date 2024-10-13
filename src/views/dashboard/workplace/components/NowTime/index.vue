<template>
  <div v-if="time" class="now-time">
    <p class="now-time__time gi_line_1">{{ time }}</p>
  </div>
</template>

<script setup lang="ts">
import Dayjs from 'dayjs'

defineOptions({ name: 'NowTime' })
const time = ref('')

// 获取现在时间
const getFormatNowTime = () => {
  const weekList = ['日', '一', '二', '三', '四', '五', '六']
  return `${Dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')} 星期${weekList[Dayjs(new Date()).day()]}`
}

// 初始化时间
const initTime = () => {
  time.value = getFormatNowTime()
  setInterval(() => {
    time.value = getFormatNowTime()
  }, 1000)
}

initTime()
</script>

<style lang="scss" scoped>
@import url('@/assets/fonts/font.css');
.now-time {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: DINPro-Medium;
  color: var(--color-text-1);
  &__time {
    margin-left: 6px;
  }
}
</style>
