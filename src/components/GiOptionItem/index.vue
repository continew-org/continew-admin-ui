<template>
  <li
    class="gi-option-item"
    :class="{ 'gi-option-item--more': props.more, 'gi-option-item--active': props.active }"
    @click="handleClick"
  >
    <div class="gi-option-item__wrapper">
      <span class="gi-option-item__icon">
        <slot v-if="props.icon" name="icon">
          <GiSvgIcon :name="props.icon"></GiSvgIcon>
        </slot>
      </span>
      <slot>
        <span class="gi-option-item__label">{{ props.label }}</span>
      </slot>
    </div>
    <IconRight v-if="props.more" />
  </li>
</template>

<script setup lang="ts">
defineOptions({ name: 'GiOptionItem' })

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  label: '',
  more: false,
  active: false
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

interface Props {
  icon?: string
  label?: string
  more?: boolean
  active?: boolean
}

const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.gi-option-item {
  padding: 0 5px 0 10px;
  height: 34px;
  line-height: 34px;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  color: var(--color-text-2);
  font-size: 14px;
  cursor: pointer;
  &__wrapper {
    display: flex;
    align-items: center;
  }
  &__icon {
    margin-right: 8px;
    display: flex;
    align-items: center;
  }
  &--active,
  &:hover {
    color: rgb(var(--primary-6));
    background: var(--color-primary-light-1);
  }
  &--more {
    justify-content: space-between;
  }
}
</style>
