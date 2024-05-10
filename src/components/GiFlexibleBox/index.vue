<template>
  <div ref="BoxRef" class="gi-flexible-box" :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineOptions({ name: 'GiFlexibleBox' })

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  direction: 'right'
})

interface Props {
  modelValue: boolean
  direction: 'left' | 'right'
}

const BoxRef = ref<HTMLElement | null>()

const style = computed(() => {
  const obj: CSSProperties = {}
  obj[`margin-${props.direction}`]
    = !props.modelValue && BoxRef.value && BoxRef.value.clientWidth ? `-${BoxRef.value.clientWidth}px` : 0
  return obj
})
</script>

<style lang="scss" scoped>
.gi-flexible-box {
  transition: all 0.36s;
}
</style>
