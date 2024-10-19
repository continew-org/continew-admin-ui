<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :style="{
        background: isDark
          ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
          : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
      }"
    >
      <div class="content-wrap">
        <div class="content">
          <a-statistic
            title="统计示例"
            :value="count"
            :value-from="0"
            animation
            show-group-separator
          />
          <div class="desc">
            <a-typography-text type="secondary" class="label">较昨日</a-typography-text>
            <a-typography-text v-if="growth > 0" type="success" :title="`${growth}%`">
              {{ growth }}
              <icon-arrow-rise />
            </a-typography-text>
            <a-typography-text v-else type="danger" :title="`${growth}%`">
              {{ growth }}
              <icon-arrow-fall />
            </a-typography-text>
          </div>
        </div>
        <div class="chart">
          <Chart v-if="!loading" :option="chartOption" />
        </div>
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import { useChart } from '@/hooks'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const isDark = computed(() => appStore.theme === 'dark')

const count = ref(0)
const growth = ref(0)
const xAxis = ref<string[]>([])
const chartData = ref<number[]>([])
const { chartOption } = useChart((isDark: EChartsOption) => {
  return {
    grid: {
      left: 0,
      right: 30,
      top: 10,
      bottom: 0
    },
    xAxis: {
      type: 'category',
      data: xAxis.value
    },
    yAxis: {
      show: false
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    series: [
      {
        name: '示例',
        data: chartData.value,
        type: 'line',
        showSymbol: false,
        smooth: true,
        lineStyle: {
          color: '#246EFF',
          width: 2,
          type: 'dashed'
        }
      }
    ]
  }
})

const loading = ref(false)
// 查询图表数据
const getChartData = async () => {
  try {
    loading.value = true
    xAxis.value = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    count.value = 88888
    growth.value = 88.8
    chartData.value = [4, 5, 6, 2, 3, 4, 25, 21, 6, 7, 8, 1]
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getChartData()
})
</script>

<style scoped lang="less">
:deep(.arco-card) {
  border-radius: 4px;
}
:deep(.arco-card-body) {
  width: 100%;
  height: 134px;
  padding: 0;
}
.content-wrap {
  width: 100%;
  padding: 16px;
  white-space: nowrap;
}
:deep(.content) {
  float: left;
  width: 108px;
  height: 102px;
}
:deep(.arco-statistic) {
  .arco-statistic-title {
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
  }
  .arco-statistic-content {
    margin-top: 10px;
  }
}

.chart {
  float: right;
  width: calc(100% - 108px);
  height: 90px;
  vertical-align: bottom;
}

.label {
  padding-right: 8px;
  font-size: 12px;
}
</style>
