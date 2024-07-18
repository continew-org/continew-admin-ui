<template>
  <a-tabs default-active-key="1" type="card">
    <a-tab-pane key="1" tab="秒">
      <CrontabField v-model="cron.second" :check="checkNumber" />
    </a-tab-pane>
    <a-tab-pane key="2" tab="分">
      <CrontabField v-model="cron.minute" :check="checkNumber" />
    </a-tab-pane>
    <a-tab-pane key="3" tab="时">
      <CrontabField v-model="cron.hour" :check="checkNumber" />
    </a-tab-pane>
    <a-tab-pane key="4" tab="日">
      <CrontabDay v-model="cron.day" :check="checkNumber" :cron="cron" />
    </a-tab-pane>
    <a-tab-pane key="5" tab="月">
      <CrontabMonth v-model="cron.month" :check="checkNumber" />
    </a-tab-pane>
    <a-tab-pane key="6" tab="星期">
      <CrontabWeek v-model="cron.week" :check="checkNumber" :cron="cron" />
    </a-tab-pane>
    <a-tab-pane key="7" tab="年">
      <CrontabYear v-model="cron.year" :check="checkNumber" />
    </a-tab-pane>
  </a-tabs>

  <div class="cron-result">
    <p>Cron 表达式:</p>
    <code class="cron-expression">{{ cronExpression }}</code>
  </div>

  <div v-if="cronExpression">
    <!--      <button @click="parseCronExpression">解析表达式</button> -->
    <button @click="generateCronExpression">生成表达式</button>
  </div>
  <div v-if="parsedCron">
    <p>解析结果:</p>
    <pre>{{ parsedCron }}</pre>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import CrontabField from './CrontabField.vue' // Import the CrontabField component
import CrontabDay from './CrontabDay.vue' // Import the CrontabDay component
import CrontabMonth from './CrontabMonth.vue' // Import the CrontabMonth component
import CrontabWeek from './CrontabWeek.vue' // Import the CrontabWeek component
import CrontabYear from './CrontabYear.vue' // Import the CrontabYear component

const cron = ref({
  second: '*',
  minute: '*',
  hour: '*',
  day: '*',
  month: '*',
  week: '?',
  year: '*'
})

const cronExpression = computed(() => {
  return `${cron.value.second} ${cron.value.minute} ${cron.value.hour} ${cron.value.day} ${cron.value.month} ${cron.value.week} ${cron.value.year}`
})

const parsedCron = ref(null)

const checkNumber = (value, min, max, defaultValue = null) => {
  if (value === '' || value === undefined || value === null || Number.isNaN(value)) {
    return defaultValue
  }
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}

const parseCronExpression = () => {
  // 使用第三方库或自定义函数解析 Cron 表达式
  // 例如：
  const parsed = parseCron(cronExpression.value) // 替换为实际解析函数
  parsedCron.value = parsed
}

const generateCronExpression = () => {
  // 使用自定义函数根据选项生成 Cron 表达式
  // 例如：
  const generatedExpression = generateCronFromOptions(cron.value) // 替换为实际生成函数
  cron.value = generatedExpression
}

// // 解析 Cron 表达式的函数
// function parseCron(expression) {
//   // ... 解析逻辑
//   // 返回解析后的结果，例如一个包含各个字段信息的数组或对象
//   return {
//     second: '0-59',
//     minute: '0-59',
//     hour: '0-23',
//     day: '1-31',
//     month: '1-12',
//     week: '0-6',
//     year: '*'
//   }
// }

// 根据选项生成 Cron 表达式的函数
function generateCronFromOptions(options) {
  // ... 生成逻辑
  // 返回生成的 Cron 表达式字符串
  return `${options.second} ${options.minute} ${options.hour} ${options.day} ${options.month} ${options.week} ${options.year}`
}
</script>

<style scoped>
.cron-generator {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
}

.cron-section {
  display: flex;
  align-items: center;
}

label {
  margin-right: 1rem;
}

.cron-result {
  margin-top: 2rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
}

.cron-expression {
  display: block;
  font-family: monospace;
  margin-top: 0.5rem;
}
</style>
