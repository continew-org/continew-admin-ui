<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" title="终端">
      <div class="chart">
        <Chart v-if="!loading" :option="chartOption" style="height: 190px" />
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import { useChart } from '@/hooks'
import { type DashboardChartCommonResp, getAnalysisOs as getData } from '@/apis/common'

const xAxis = ref<string[]>([])
const chartData = ref([])
const { chartOption } = useChart((isDark: EChartsOption) => {
  return {
    legend: {
      data: xAxis.value,
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      textStyle: {
        color: isDark ? 'rgba(255,255,255,0.7)' : '#4E5969'
      },
      itemStyle: {
        borderWidth: 0
      }
    },
    tooltip: {
      show: true,
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '42%'],
        label: {
          formatter: '{d}% ',
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969'
        },
        itemStyle: {
          borderColor: isDark ? '#000' : '#fff',
          borderWidth: 1
        },
        data: chartData.value
      }
    ]
  }
})

const loading = ref(false)
const colors = ['#246EFF', '#00B2FF', '#81E2FF', '#846BCE', '#86DF6C']
// 查询图表数据
const getChartData = async () => {
  try {
    loading.value = true
    const { data } = await getData()
    data.forEach((item: DashboardChartCommonResp, index: number) => {
      xAxis.value.push(item.name)
      chartData.value.push({
        ...item,
        itemStyle: {
          color: data.length > 1 && index === data.length - 1 ? colors[colors.length - 1] : colors[index]
        }
      })
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
