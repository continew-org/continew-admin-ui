<template>
  <section class="percent">
    <a-space class="statistic-space" align="center" size="medium" fill>
      <template #split>
        <a-divider direction="vertical" />
      </template>
      <a-statistic class="statistic-item" title="存储量" :value="totalData.size" :value-style="statisticValueStyle">
        <template #suffix>&nbsp;{{ totalData.unit }}</template>
      </a-statistic>
      <a-statistic class="statistic-item" title="数量" :value="totalData.number" :value-style="statisticValueStyle" />
    </a-space>
    <div v-if="chartData.length > 0">
      <a-divider />
      <VCharts :option="option" autoresize :style="{ height: '120px', width: '150px' }" />
    </div>
  </section>
</template>

<script setup lang="ts">
import VCharts from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { FileTypeList } from '@/constant/file'
import { useChart } from '@/hooks'
import { type FileStatisticsResp, getFileStatistics } from '@/apis'
import { formatFileSize } from '@/utils'

use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

const totalData = ref<FileStatisticsResp>({
  type: '',
  size: 0,
  number: 0,
  unit: '',
  data: []
})
const chartData = ref<Array<{ name: string, value: number, size: string }>>([])
const statisticValueStyle = { 'color': '#5856D6', 'font-size': '18px' }
const { option } = useChart(() => {
  return {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    legend: {
      show: true,
      bottom: -5,
      icon: 'circle',
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        color: '#4E5969'
      }
    },
    tooltip: {
      show: true,
      formatter(params) {
        return `总计：${params.value}<br>${params.data.size}`
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        label: {
          show: false,
          position: 'center'
        },
        data: chartData.value
      }
    ]
  }
})

const loading = ref(false)
const getStatisticsData = async () => {
  try {
    loading.value = true
    chartData.value = []
    const { data: resData } = await getFileStatistics()
    const formatSize = formatFileSize(resData.size).split(' ')
    totalData.value = {
      type: '',
      size: Number.parseFloat(formatSize[0]),
      number: resData.number ?? 0,
      unit: formatSize[1],
      data: []
    }
    resData.data.forEach((fs: FileStatisticsResp) => {
      const matchedItem = FileTypeList.find((item) => item.value === fs.type)
      chartData.value.unshift({
        name: matchedItem ? matchedItem.name : '',
        value: fs.number,
        size: formatFileSize(fs.size)
      })
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getStatisticsData()
})
</script>

<style lang="scss" scoped>
.statistic-space {
  display: flex;
  justify-content: center;
  align-items: center;
}

.statistic-item {
  text-align: center;
}

.percent {
  margin-top: 10px;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--color-bg-1);
}

:deep(.arco-divider-horizontal) {
  margin: 20px 0 0 0;
}
</style>
