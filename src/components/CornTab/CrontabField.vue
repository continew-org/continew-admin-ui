<template>
  <a-form-item>
    <a-radio v-model="radioValue" :label="1">
      *
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="2">
      周期从
      <a-input-number v-model="cycle01" :min="0" :max="58" />
      -
      <a-input-number v-model="cycle02" :min="cycle01 ? cycle01 + 1 : 1" :max="59" />
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="3">
      从
      <a-input-number v-model="average01" :min="0" :max="58" />
      开始，每
      <a-input-number v-model="average02" :min="1" :max="59 - average01 || 0" />
      执行一次
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="4">
      指定
      <a-select v-model="checkboxList" clearable placeholder="可多选" multiple style="width:100%">
        <a-option v-for="item in 60" :key="item" :value="item - 1">{{ item - 1 }}</a-option>
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
const cycle01 = ref(0)
const cycle02 = ref(1)
const average01 = ref(0)
const average02 = ref(1)
const checkboxList = ref([])

const cycleTotal = computed(() => {
  const cycle01Val = props.check(cycle01.value, 0, 58)
  const cycle02Val = props.check(cycle02.value, cycle01Val ? cycle01Val + 1 : 1, 59)
  return `${cycle01Val}-${cycle02Val}`
})

const averageTotal = computed(() => {
  const average01Val = props.check(average01.value, 0, 58)
  const average02Val = props.check(average02.value, 1, 59 - average01Val || 0)
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
