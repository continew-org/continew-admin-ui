<template>
  <GiSvgIcon v-if="props.svgIcon" :name="props.svgIcon" :size="18"></GiSvgIcon>
  <component v-else-if="props.icon" :is="props.icon" style="height: 18px; width: 18px"></component>
</template>

<script lang="ts" setup>
interface Props {
  svgIcon?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="scss" scoped></style>
