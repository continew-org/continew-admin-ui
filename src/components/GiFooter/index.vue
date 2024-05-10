<template>
  <div class="gi-footer">{{ appStore.getCopyright() }}</div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores'

defineOptions({ name: 'GiFooter' })

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.gi-footer {
  height: 50px;
  font-size: 12px;
  color: var(--color-text-3);
  margin-top: 12px;
  border-top: 1px dashed var(--color-neutral-3);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
