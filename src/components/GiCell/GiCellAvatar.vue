<template>
  <a-space fill>
    <a-avatar :size="24" shape="circle">
      <img :src="props.avatar" alt="avatar" />
    </a-avatar>
    <a-link v-if="props.isLink" @click="emit('click')">
      <a-typography-paragraph
        class="link-text"
        :ellipsis="{
          rows: 1,
          showTooltip: true,
          css: true,
        }"
      >
        {{ props.name }}
      </a-typography-paragraph>
    </a-link>
    <span v-else>{{ props.name }}</span>
  </a-space>
</template>

<script lang="ts" setup>
defineOptions({ name: 'GiCellAvatar' })

const props = withDefaults(defineProps<Props>(), {
  avatar: '',
  name: '',
  isLink: false // 是否可以点击
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

interface Props {
  avatar: string
  name: string
  isLink?: boolean
}
</script>

<style lang="scss" scoped></style>
