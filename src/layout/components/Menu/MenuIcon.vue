<template>
  <GiSvgIcon :name="props.icon" :size="18" />
</template>

<script lang="ts" setup>
interface Props {
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="scss" scoped></style>
