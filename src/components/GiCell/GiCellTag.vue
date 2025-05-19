<template>
  <span v-if="!dictItem"></span>
  <span v-else-if="!dictItem.extra">{{ dictItem.label }}</span>
  <a-tag v-else-if="dictItem.extra === 'primary'" color="arcoblue">{{ dictItem.label }}</a-tag>
  <a-tag v-else-if="dictItem.extra === 'success'" color="green">{{ dictItem.label }}</a-tag>
  <a-tag v-else-if="dictItem.extra === 'warning'" color="orangered">{{ dictItem.label }}</a-tag>
  <a-tag v-else-if="dictItem.extra === 'error'" color="red">{{ dictItem.label }}</a-tag>
  <a-tag v-else-if="dictItem.extra === 'default'" color="gray">{{ dictItem.label }}</a-tag>
</template>

<script setup lang="ts">
import type { LabelValueState } from '@/types/global'
import type { GiCellTagType } from '@/components/GiCell/type'

defineOptions({ name: 'GiCellTag' })
const props = withDefaults(defineProps<Partial<GiCellTagType>>(), {
  dict: [{
    label: '',
    value: '',
  }],
  value: '',
})

const dictItem = computed((): LabelValueState => {
  try {
    return props.dict.find(
      (d) => d.value === String(props.value) || d.value === Number(props.value),
    ) || { label: '', value: '' }
  } catch (error) {
    return { label: '', value: '' }
  }
})
</script>

<style scoped lang="scss"></style>
