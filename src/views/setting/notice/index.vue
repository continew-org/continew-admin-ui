<template>
  <div class="page"></div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

defineOptions({ name: 'Notification' })

const route = useRoute()
const form = reactive({ name: '' })
</script>

<style lang="scss" scoped>
.page {
  padding: $padding;
  background-color: var(--color-bg-1);
}
</style>
