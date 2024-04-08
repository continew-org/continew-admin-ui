<template>
  <div class="layout-item" :class="`layout-item-${mode}`" @click="emit('click')"></div>
</template>

<script setup lang="ts">
interface Props {
  mode: 'left' | 'top' | 'mix'
}

withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
.layout-item {
  width: 60px;
  height: 50px;
  background-color: var(--color-fill-3);
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  &::before {
    content: '';
    width: 12px;
    height: 100%;
    background-color: rgb(var(--gray-9));
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }
  &::after {
    content: '';
    width: 100%;
    height: 10px;
    background-color: rgb(var(--gray-9));
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }
  &-left {
    &::before {
      display: block;
    }
  }
  &-top {
    &::after {
      display: block;
    }
  }
  &-mix {
    &::before,
    &::after {
      display: block;
    }
  }
}
</style>
