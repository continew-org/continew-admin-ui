<!--
  @file GiIconBox 组件 - 图标容器
  @description 提供可自定义的图标容器，支持不同颜色、尺寸和形状
-->
<template>
  <div class="gi-icon-box" :class="getClass" :style="getStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type CSSProperties, computed } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  color: '#165DFF',
  size: 20,
  shape: 'square',
})

/** 预设状态颜色 */
const STATUS_COLORS = ['primary', 'success', 'warning', 'danger'] as const

/** 形状类型 */
type ShapeType = 'square' | 'round'

/** 颜色类型 */
type ColorType = typeof STATUS_COLORS[number] | string

/** 组件属性定义 */
interface Props {
  /**
   * 背景颜色
   * @description 支持预设状态颜色或自定义颜色值
   * @default '#165DFF'
   */
  color?: ColorType
  /**
   * 容器尺寸
   * @description 单位为像素
   * @default 20
   */
  size?: number
  /**
   * 容器形状
   * @description square-方形，round-圆形
   * @default 'square'
   */
  shape?: ShapeType
}

/** 计算容器的 class */
const getClass = computed(() => {
  const classes = [
    STATUS_COLORS.includes(props.color as typeof STATUS_COLORS[number])
    && `gi-icon-box--${props.color}`,
    props.shape && `gi-icon-box__shape--${props.shape}`,
  ].filter(Boolean)

  return classes.join(' ')
})

/** 计算容器的样式 */
const getStyle = computed((): CSSProperties => {
  const style: CSSProperties = {}

  // 处理自定义颜色
  if (!STATUS_COLORS.includes(props.color as typeof STATUS_COLORS[number])) {
    style.backgroundColor = props.color
  }

  // 处理自定义尺寸
  if (props.size !== 20) {
    style.width = `${props.size}px`
    style.height = `${props.size}px`
  }

  return style
})
</script>

<style lang="scss" scoped>
.gi-icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: #fff;
  transition: all 0.2s ease;

  // 状态颜色
  &--primary {
    background-color: rgba(var(--primary-6));
  }

  &--success {
    background-color: rgba(var(--success-6));
  }

  &--warning {
    background-color: rgba(var(--warning-6));
  }

  &--danger {
    background-color: rgba(var(--danger-6));
  }

  // 形状样式
  &__shape {
    &--square {
      border-radius: 4px;
    }

    &--round {
      border-radius: 50%;
    }
  }
}
</style>
