<template>
  <a-form-item>
    <a-radio v-model="radioValue" :label="1">
      月，允许的通配符[, - * /]
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="2">
      周期从
      <a-input-number v-model="cycle01" :min="1" :max="11" /> -
      <a-input-number v-model="cycle02" :min="cycle01 ? cycle01 + 1 : 2" :max="12" /> 月
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="3">
      从
      <a-input-number v-model="average01" :min="1" :max="11" /> 月开始，每
      <a-input-number v-model="average02" :min="1" :max="12 - average01 || 0" /> 月执行一次
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="4">
      指定
      <a-select v-model="checkboxList" clearable placeholder="可多选" multiple style="width:100%">
        <a-option v-for="item in 12" :key="item" :value="item">{{ item }}</a-option>
      </a-select>
    </a-radio>
  </a-form-item>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  check: {
    type: Function,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const radioValue = ref(1)
const cycle01 = ref(1)
const cycle02 = ref(2)
const average01 = ref(1)
const average02 = ref(1)
const checkboxList = ref([])

const cycleTotal = computed(() => {
  const cycle01Val = props.check(cycle01.value, 1, 11)
  const cycle02Val = props.check(cycle02.value, cycle01Val ? cycle01Val + 1 : 2, 12)
  return `${cycle01Val}-${cycle02Val}`
})

const averageTotal = computed(() => {
  const average01Val = props.check(average01.value, 1, 11)
  const average02Val = props.check(average02.value, 1, 12 - average01Val || 0)
  return `${average01Val}/${average02Val}`
})

const checkboxString = computed(() => {
  const str = checkboxList.value.join()
  return str === '' ? '*' : str
})

const emitUpdate = (value) => {
  emit('update:modelValue', value)
}

watch(radioValue, () => {
  switch (radioValue.value) {
    case 1:
      emitUpdate('*')
      break
    case 2:
      emitUpdate(cycleTotal.value)
      break
    case 3:
      emitUpdate(averageTotal.value)
      break
    case 4:
      emitUpdate(checkboxString.value)
      break
  }
})

watch(cycleTotal, () => {
  emitUpdate(cycleTotal.value)
})

watch(averageTotal, () => {
  emitUpdate(averageTotal.value)
})

watch(checkboxString, () => {
  emitUpdate(checkboxString.value)
})
</script>
