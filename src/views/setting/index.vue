<template>
  <div class="setting" :class="{ 'setting--h5': !isDesktop }">
    <div class="setting__main">
      <div class="setting__main__content">
        <ParentView></ParentView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDevice } from '@/hooks'

defineOptions({ name: 'Setting' })

const { isDesktop } = useDevice()
</script>

<style lang="scss" scoped>
.setting {
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
    overflow: hidden;
    display: flex;
    &__content {
      flex: 1;
      height: 100%;
      padding: $margin;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}

.setting--h5 {
  flex-direction: column;
}
</style>
