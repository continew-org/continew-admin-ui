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
      <VCharts :option="chartOption" autoresize :style="{ height: `${chartHeight}px`, width: '100%' }" />
      <div class="chart-legend">
        <div
          v-for="item in legendItems"
          :key="item.key"
          class="chart-legend-item"
          :class="{ 'is-inactive': !item.active }"
          :title="`类型：${item.name || '未知类型'}`"
          @click="toggleLegend(item.key)"
        >
          <span class="chart-legend-dot" :style="{ backgroundColor: item.color }" />
          <span class="chart-legend-name">{{ item.name || '未知类型' }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import VCharts from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { FileTypeList } from '@/constant/file'
import { useChart } from '@/hooks'
import { type FileStatisticsResp, getFileStatistics } from '@/apis/system'
import { formatFileSize } from '@/utils'
import mittBus from '@/utils/mitt'

use([TitleComponent, TooltipComponent, PieChart, CanvasRenderer])

const totalData = ref<FileStatisticsResp>({
  type: '',
  size: 0,
  number: 0,
  unit: '',
  data: [],
})
const chartData = ref<Array<{ key: string, name: string, value: number, size: string }>>([])
const statisticValueStyle = { 'color': '#5856D6', 'font-size': '18px' }
const chartHeight = 135
const chartColors = ['#165DFF', '#36CFC9', '#F7BA1E', '#722ED1', '#00B42A', '#F53F3F', '#86909C', '#FF7D00']
const hiddenLegendMap = ref<Record<string, boolean>>({})
const legendItems = computed(() => {
  return chartData.value.map((item, index) => ({
    ...item,
    color: chartColors[index % chartColors.length],
    active: !hiddenLegendMap.value[item.key],
  }))
})
const pieData = computed(() => {
  return legendItems.value
    .filter((item) => item.active)
    .map((item) => ({
      name: item.name,
      value: item.value,
      size: item.size,
      itemStyle: {
        color: item.color,
      },
    }))
})

const toggleLegend = (key: string) => {
  const nextHiddenMap = {
    ...hiddenLegendMap.value,
    [key]: !hiddenLegendMap.value[key],
  }
  const visibleCount = chartData.value.filter((item) => !nextHiddenMap[item.key]).length
  // 至少保留一个分类显示，避免整张图被全部隐藏。
  if (visibleCount <= 0) {
    return
  }
  hiddenLegendMap.value = nextHiddenMap
}

const { chartOption } = useChart(() => {
  return {
    color: chartColors,
    tooltip: {
      show: true,
      appendToBody: true,
      confine: false,
      extraCssText: 'z-index: 9999;',
      formatter(params) {
        const name = params?.name || '未知类型'
        const count = params?.value ?? 0
        const size = params?.data?.size || '-'
        const percent = typeof params?.percent === 'number' ? `${params.percent}%` : '-'
        return `类型：${name}<br/>数量：${count}<br/>占比：${percent}<br/>容量：${size}`
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        label: {
          show: false,
          position: 'center',
        },
        data: pieData.value,
      },
    ],
  }
})

const loading = ref(false)
const getStatisticsData = async () => {
  try {
    loading.value = true
    chartData.value = []
    hiddenLegendMap.value = {}
    const { data: resData } = await getFileStatistics()
    const formatSize = formatFileSize(resData.size).split(' ')
    totalData.value = {
      type: '',
      size: Number.parseFloat(formatSize[0]),
      number: resData.number ?? 0,
      unit: formatSize[1],
      data: [],
    }
    resData.data?.forEach((fs: FileStatisticsResp, index: number) => {
      const matchedItem = FileTypeList.find((item) => item.value === fs.type)
      chartData.value.unshift({
        key: fs.type || `unknown-${index}`,
        name: matchedItem ? matchedItem.name : '',
        value: fs.number,
        size: formatFileSize(fs.size),
      })
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getStatisticsData()
  mittBus.on('file-total-refresh', () => {
    getStatisticsData()
  })
})
</script>

<style scoped lang="scss">
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

.chart-legend {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px 10px;
}

.chart-legend-item {
  display: flex;
  align-items: center;
  color: var(--color-text-2);
  font-size: 12px;
  line-height: 18px;
  min-width: 0;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s ease;
}

.chart-legend-item.is-inactive {
  opacity: 0.45;
}

.chart-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
  flex: 0 0 auto;
}

.chart-legend-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.arco-divider-horizontal) {
  margin: 20px 0 0 0;
}
</style>
