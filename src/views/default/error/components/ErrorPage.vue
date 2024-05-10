<template>
  <div class="error-page">
    <section class="error__container">
      <div class="error__img">
        <component :is="IconMap[props.code]" class="error__icon"></component>
      </div>

      <div class="error__tip">
        <div class="error__tip--a">抱歉!</div>
        <div class="error__tip--b">当前页面不存在...</div>
        <div class="error__tip--c">请检查您输入的网址是否正确，或点击下面的按钮返回首页</div>
        <a-button type="primary" shape="round" size="large" @click="back">返回首页</a-button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import Icon403 from '@/components/icons/Icon403.vue'
import Icon404 from '@/components/icons/Icon404.vue'
import Icon500 from '@/components/icons/Icon500.vue'

defineOptions({ name: 'ErrorPage' })

const props = withDefaults(defineProps<Props>(), {
  code: 403
})
interface Props {
  code: number
}
const IconMap: Record<number, Component> = {
  403: Icon403,
  404: Icon404,
  500: Icon500
}

const router = useRouter()
// 返回首页
const back = () => {
  router.replace({ path: '/' })
}
</script>

<style lang="scss" scoped>
.error-page {
  width: 100%;
  height: 100%;
  background: var(--color-bg-1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__img {
    width: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__icon {
    max-width: 90%;
    height: 50vh;
  }
  &__tip {
    display: flex;
    flex-direction: column;
    align-items: center;
    &--a {
      margin-bottom: 20px;
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: rgb(var(--primary-6));
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &--b {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      line-height: 24px;
      color: var(--color-text-1);
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &--c {
      padding: 0 30px;
      margin-bottom: 20px;
      font-size: 13px;
      text-align: center;
      line-height: 20px;
      color: var(--color-text-2);
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
  }
}
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
