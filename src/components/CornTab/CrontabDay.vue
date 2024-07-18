<template>
  <a-form-item>
    <a-radio v-model="radioValue" :label="1">
      日，允许的通配符[, - * ? / L W]
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="2">
      不指定
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="3">
      周期从
      <a-input-number v-model="cycle01" :min="1" :max="30" /> -
      <a-input-number v-model="cycle02" :min="cycle01 ? cycle01 + 1 : 2" :max="31" /> 日
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="4">
      从
      <a-input-number v-model="average01" :min="1" :max="30" /> 号开始，每
      <a-input-number v-model="average02" :min="1" :max="31 - average01 || 1" /> 日执行一次
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="5">
      每月
      <a-input-number v-model="workday" :min="1" :max="31" /> 号最近的那个工作日
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="6">
      本月最后一天
    </a-radio>
  </a-form-item>

  <a-form-item>
    <a-radio v-model="radioValue" :label="7">
      指定
      <a-select v-model="checkboxList" clearable placeholder="可多选" multiple style="width:100%">
        <a-option v-for="item in 31" :key="item" :value="item">{{ item }}</a-option>
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
  },
  cron: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const radioValue = ref(1)
const workday = ref(1)
const cycle01 = ref(1)
const cycle02 = ref(2)
const average01 = ref(1)
const average02 = ref(1)
const checkboxList = ref([])

const cycleTotal = computed(() => {
  const cycle01Val = props.check(cycle01.value, 1, 30)
  const cycle02Val = props.check(cycle02.value, cycle01Val ? cycle01Val + 1 : 2, 31, 31)
  return `${cycle01Val}-${cycle02Val}`
})

const averageTotal = computed(() => {
  const average01Val = props.check(average01.value, 1, 30)
  const average02Val = props.check(average02.value, 1, 31 - average01Val || 0)
  return `${average01Val}/${average02Val}`
})

const workdayCheck = computed(() => {
  const workdayVal = props.check(workday.value, 1, 31)
  return workdayVal
})

const checkboxString = computed(() => {
  const str = checkboxList.value.join()
  return str === '' ? '*' : str
})

const emitUpdate = (value) => {
  emit('update:modelValue', value)
}

watch(radioValue, () => {
  if (radioValue.value !== 2 && props.cron.week !== '?') {
    props.cron.week = '?'
  }
  switch (radioValue.value) {
    case 1:
      emitUpdate('*')
      break
    case 2:
      emitUpdate('?')
      break
    case 3:
      emitUpdate(cycleTotal.value)
      break
    case 4:
      emitUpdate(averageTotal.value)
      break
    case 5:
      emitUpdate(`${workdayCheck.value}W`)
      break
    case 6:
      emitUpdate('L')
      break
    case 7:
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

watch(workdayCheck, () => {
  emitUpdate(`${workdayCheck.value}W`)
})

watch(checkboxString, () => {
  emitUpdate(checkboxString.value)
})
</script>
