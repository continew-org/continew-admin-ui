<template>
  <a-form-item>
    <a-radio v-model="radioValue" :label="1">
      ?
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="2">
      指定
      <a-select v-model="checkboxList" clearable placeholder="可多选" multiple style="width:100%">
        <a-option v-for="item in 7" :key="item" :value="item - 1">{{ item === 0 ? '日' : item }}</a-option>
      </a-select>
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="3">
      周期从
      <a-select v-model="cycle01" clearable placeholder="起始星期" style="width:100%">
        <a-option v-for="item in 7" :key="item" :value="item - 1">{{ item === 0 ? '日' : item }}</a-option>
      </a-select>
      -
      <a-select v-model="cycle02" clearable placeholder="结束星期" style="width:100%">
        <a-option v-for="item in 7" :key="item" :value="item - 1">{{ item === 0 ? '日' : item }}</a-option>
      </a-select>
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="4">
      每月
      <a-select v-model="weekDay" clearable placeholder="星期" style="width:100%">
        <a-option v-for="item in 7" :key="item" :value="item - 1">{{ item === 0 ? '日' : item }}</a-option>
      </a-select>
      的第
      <a-input-number v-model="weekNum" :min="1" :max="5" />
      个工作日
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
  },
  cron: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const radioValue = ref(1)
const checkboxList = ref([])
const cycle01 = ref(0)
const cycle02 = ref(0)
const weekDay = ref(0)
const weekNum = ref(1)

const checkboxString = computed(() => {
  const str = checkboxList.value.join()
  return str === '' ? '?' : str
})

const cycleTotal = computed(() => {
  const cycle01Val = props.check(cycle01.value, 0, 6)
  const cycle02Val = props.check(cycle02.value, cycle01Val ? cycle01Val + 1 : 1, 6)
  return `${cycle01Val}-${cycle02Val}`
})

const weekDayCheck = computed(() => {
  const weekDayVal = props.check(weekDay.value, 0, 6)
  return weekDayVal
})

const emitUpdate = (value) => {
  emit('update:modelValue', value)
}

watch(radioValue, () => {
  if (radioValue.value !== 1 && props.cron.day !== '?') {
    props.cron.day = '?'
  }
  switch (radioValue.value) {
    case 1:
      emitUpdate('?')
      break
    case 2:
      emitUpdate(checkboxString.value)
      break
    case 3:
      emitUpdate(cycleTotal.value)
      break
    case 4:
      emitUpdate(`${weekDayCheck.value}#${weekNum.value}`)
      break
  }
})

watch(checkboxString, () => {
  emitUpdate(checkboxString.value)
})

watch(cycleTotal, () => {
  emitUpdate(cycleTotal.value)
})

watch(weekDayCheck, () => {
  emitUpdate(`${weekDayCheck.value}#${weekNum.value}`)
})
</script>
