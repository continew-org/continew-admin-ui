<template>
  <a-row align="stretch" :gutter="rowGutter" class="gi-page-layout" :class="getClass">
    <a-col v-if="slots.left" v-show="!isCollapsed" class="gi-page-col" v-bind="props.leftColProps" :sm="10" :md="7" :lg="6" :xl="5" :xxl="4">
      <div class="gi-page-layout__left" :style="props.leftStyle">
        <slot name="left"></slot>
      </div>
    </a-col>
    <div v-if="slots.left" class="gi-page-layout__divider" :class="{ none: isCollapsed || !isDesktop }">
      <div v-if="defaultCollapsed" class="gi-split-button" :class="{ none: isCollapsed || !isDesktop }" :style="isCollapsed ? 'left:0px' : 'left:-12px'" @click="toggleCollapsed">
        <icon-right v-if="isCollapsed" />
        <icon-left v-else />
      </div>
    </div>

    <a-col class="gi-page-col" :sm="16" :md="17" :lg="18" :xl="19" :xxl="20" flex="1" v-bind="props.rightColProps">
      <div v-if="slots.header" class="gi-page-layout__header" :style="{ ...props.headerStyle, display: !isDesktop && !isCollapsed ? 'none' : '' }">
        <slot name="header"></slot>
      </div>

      <div class="gi-page-layout__body" :style="props.bodyStyle">
        <div v-if="!isDesktop && !isCollapsed" class="gi-page-layout__mask"></div>
        <slot></slot>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang='ts'>
import type { ColProps } from '@arco-design/web-vue'
import type { CSSProperties } from 'vue'
import { useBreakpoint, useDevice } from '@/hooks'

defineOptions({ name: 'GiPageLayout' })

const props = withDefaults(defineProps<Props>(), {
  margin: true,
  padding: true,
  gutter: false,
  defaultCollapsed: true,
  leftColProps: () => ({}),
  rightColProps: () => ({}),
  leftStyle: () => ({}),
  headerStyle: () => ({}),
  bodyStyle: () => ({}),
})

/** 组件插槽定义 */
defineSlots<{
  header: () => void
  left: () => void
  default: () => void
}>()

const { isDesktop } = useDevice()
const getClass = computed(() => {
  return {
    'gi-page-layout--margin': props.margin,
    'gi-page-layout--padding': props.padding,
    'gi-page-layout--gutter': !!props.gutter,
  }
})

const rowGutter = computed(() => {
  if (typeof props.gutter === 'boolean') {
    return props.gutter ? 14 : undefined
  }
  return props.gutter
})

/** 组件属性定义 */
interface Props {
  margin?: boolean
  padding?: boolean
  gutter?: boolean | number
  defaultCollapsed?: boolean
  leftColProps?: ColProps
  rightColProps?: ColProps
  leftStyle?: CSSProperties
  headerStyle?: CSSProperties
  bodyStyle?: CSSProperties
}

const slots = useSlots()
const isCollapsed = ref(false)
const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
}

const { breakpoint } = useBreakpoint()
watch(() => breakpoint.value, (val) => {
  isCollapsed.value = ['xs'].includes(val)
}, { immediate: true })
</script>

<style lang='scss' scoped>
.gi-page-layout {
  flex: 1;
  height: 100%;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  background-color: var(--color-bg-1);
  position: relative;

  &--margin {
    margin: $margin;
  }

  &--padding {

    .gi-page-layout__left,
    .gi-page-layout__header,
    .gi-page-layout__body {
      padding: $padding;
    }

    .gi-page-layout__header {
      padding-bottom: 0;
    }
  }

  &--gutter {
    .gi-page-layout__body-left {
      border-right: none;
    }
  }

  .gi-page-col {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}

.gi-page-layout__left {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.gi-page-layout__header {
  border-bottom: 1px solid var(--color-border);
  box-sizing: border-box;
}

.gi-page-layout__body {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.gi-page-layout__divider {
  position: relative;
  width: 1px;
  background-color: var(--color-border);
}

.gi-page-layout__divider.none {
  width: 0;
}

.gi-split-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
  background-color: var(--color-bg-1);
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  left: -12px;
  overflow: hidden;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

.gi-page-layout__mask{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(20px);
  z-index: 20;
}

.gi-split-button.none {
  left: -12px;
}
</style>
