<template>
  <section class="percent">
    <a-space class="statistic-space" align="center" size="medium" fill>
      <template #split>
        <a-divider direction="vertical" />
      </template>
      <a-statistic class="statistic-item" title="容量" :value="totalData.size" :value-style="statisticValueStyle">
        <template #suffix>{{ totalData.unit }}</template>
      </a-statistic>
      <a-statistic class="statistic-item" title="数量" :value="totalData.number" :value-style="statisticValueStyle" />
    </a-space>
    <a-divider />
    <VCharts :option="option" autoresize :style="{ height: '320px' }" />
  </section>
</template>

<script setup lang="ts">
import VCharts from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer])
import { statisticsFile, type FileStatisticsResp } from '@/apis'
import { FileTypeList } from '@/constant/file'
import { useChart } from '@/hooks'
import { formatFileSize } from '@/utils'

const totalData = ref<FileStatisticsResp>({})
const chartData = ref<Array<FileStatisticsResp>>([])
const statisticValueStyle = { color: '#5856D6', 'font-size': '18px' }
const { option } = useChart(() => {
  return {
    grid: {},
    legend: {},
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold',
            formatter: function (params) {
              return params.name + '\n' + params.value + '\n' + params.data.size
            }
          }
        },
        labelLine: {
          show: false
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
    totalData.value = {}
    const { data: resData } = await statisticsFile()
    const formatSize = formatFileSize(resData.size).split(' ')
    totalData.value = {
      size: parseFloat(formatSize[0]),
      number: resData.number,
      unit: formatSize[1]
    }
    console.log(totalData.value)
    resData.data.forEach((fs: FileStatisticsResp) => {
      const matchedItem = FileTypeList.find((item) => item.value == fs.type)
      console.log(matchedItem)
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
  padding: 14px 12px;
  box-sizing: border-box;
  background-color: var(--color-bg-1);
}
</style>
