<template>
  <span v-if="!dictItem"></span>
  <span v-else-if="!dictItem.extend">{{ dictItem.label }}</span>
  <a-tag v-else-if="dictItem.extend === 'primary'" color="arcoblue">{{ dictItem.label }}</a-tag>
  <a-tag v-else-if="dictItem.extend === 'success'" color="green">{{ dictItem.label }}</a-tag>
  <a-tag v-else-if="dictItem.extend === 'warning'" color="orangered">{{ dictItem.label }}</a-tag>
  <a-tag v-else-if="dictItem.extend === 'error'" color="red">{{ dictItem.label }}</a-tag>
  <a-tag v-else-if="dictItem.extend === 'default'" color="gray">{{ dictItem.label }}</a-tag>
  <a-tag v-else :color="dictItem.extend">{{ dictItem.label }}</a-tag>
</template>

<script lang="ts" setup>
import type { LabelValueState } from '@/types/global'
import type { GiCellTagType } from '@/components/GiCell/type'

defineOptions({ name: 'GiCellTag' })
const props = withDefaults(defineProps<Partial<GiCellTagType>>(), {
  dict: [{
    label: '',
    value: ''
  }],
  value: ''
})

const dictItem = computed((): LabelValueState => {
  try {
    return props.dict.find(
      (d) => d.value === String(props.value) || d.value === Number(props.value)
    ) || { label: '', value: '' }
  } catch (error) {
    return { label: '', value: '' }
  }
})
</script>

<style lang="scss" scoped></style>
