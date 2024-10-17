<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" title="模块分析" :header-style="{ paddingBottom: '12px' }">
      <div class="chart">
        <Chart v-if="!loading" style="height: 210px" :option="option" />
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import { useChart } from '@/hooks'
import { type DashboardChartCommonResp, getAnalysisModule as getData } from '@/apis/common'

const xAxis = ref<string[]>([])
const dataList = ref([])
const { option } = useChart((isDark) => {
  return {
    legend: {
      bottom: 'center',
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
        radius: ['50%', '70%'],
        center: ['50%', '45%'],
        label: {
          formatter: '{d}% ',
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969'
        },
        itemStyle: {
          borderColor: isDark ? '#000' : '#fff',
          borderWidth: 1
        },
        data: dataList.value
      }
    ]
  }
})

const loading = ref(false)
const colors = ['#249EFF', '#846BCE', '#21CCFF', '#0E42D2', '#86DF6C']
// 查询图表数据
const getChartData = async () => {
  try {
    loading.value = true
    const { data } = await getData()
    data.forEach((item: DashboardChartCommonResp, index) => {
      xAxis.value.push(item.name)
      dataList.value.push({
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
