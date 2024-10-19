<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" title="热门模块 (Top10)">
      <div class="chart">
        <Chart v-if="!loading" :option="chartOption" style="width: 100%; height: 355px" />
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import { useChart } from '@/hooks'
import { type DashboardChartCommonResp, getAnalysisModule as getData } from '@/apis/common'

const yAxis = ref<string[]>([])
const chartData = ref([])
const { chartOption } = useChart((isDark: EChartsOption) => {
  return {
    grid: {
      left: 55,
      right: 20,
      top: 0,
      bottom: 20
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        formatter(value: number, idx: number) {
          if (idx === 0) return String(value)
          return `${Number(value) / 1000}k`
        }
      },
      splitLine: {
        lineStyle: {
          color: isDark ? '#484849' : '#E5E8EF'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: yAxis.value,
      axisLabel: {
        show: true,
        color: '#4E5969'
      },
      axisTick: {
        show: true,
        length: 2,
        lineStyle: {
          color: '#A9AEB8'
        },
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: isDark ? '#484849' : '#A9AEB8'
        }
      }
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    series: [
      {
        data: chartData.value,
        type: 'bar',
        barWidth: 7,
        itemStyle: {
          color: '#4086FF',
          borderRadius: 4
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
    const { data } = await getData()
    data.forEach((item: DashboardChartCommonResp) => {
      yAxis.value.unshift(item.name)
      chartData.value.unshift(item.value)
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getChartData()
})
</script>

<style scoped lang="less">
</style>
