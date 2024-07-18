<template>
  <a-form-item>
    <a-radio v-model="radioValue" :label="1">
      *
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="2">
      周期从
      <a-input-number v-model="cycle01" :min="1970" :max="2099" /> -
      <a-input-number v-model="cycle02" :min="cycle01 ? cycle01 + 1 : 1971" :max="2099" /> 年
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="3">
      从
      <a-input-number v-model="average01" :min="1970" :max="2098" /> 年开始，每
      <a-input-number v-model="average02" :min="1" :max="2099 - average01 || 0" /> 年执行一次
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="4">
      指定
      <a-select v-model="checkboxList" clearable placeholder="可多选" multiple style="width:100%">
        <a-option v-for="item in 130" :key="item" :value="item + 1970">{{ item + 1970 }}</a-option>
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
const cycle01 = ref(1970)
const cycle02 = ref(1971)
const average01 = ref(1970)
const average02 = ref(1)
const checkboxList = ref([])

const cycleTotal = computed(() => {
  const cycle01Val = props.check(cycle01.value, 1970, 2099)
  const cycle02Val = props.check(cycle02.value, cycle01Val ? cycle01Val + 1 : 1971, 2099)
  return `${cycle01Val}-${cycle02Val}`
})

const averageTotal = computed(() => {
  const average01Val = props.check(average01.value, 1970, 2098)
  const average02Val = props.check(average02.value, 1, 2099 - average01Val || 0)
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
