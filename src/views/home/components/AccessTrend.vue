<template>
  <a-card title="访问趋势" :bordered="false" class="gi_card_title">
    <template #extra>
      <a-radio-group type="button" size="small" default-value="1">
        <a-radio value="1">近7天</a-radio>
        <a-radio value="2">近30天</a-radio>
      </a-radio-group>
    </template>
    <VCharts :option="option" autoresize :style="{ height: '289px' }"></VCharts>
  </a-card>
</template>

<script lang="ts" setup>
import VCharts from 'vue-echarts'
import { graphic } from 'echarts'
import { useChart } from '@/hooks'
// import { ToolTipFormatterParams } from '@/types/echarts';

const xData = ref<string[]>([])
const yData = ref<number[]>([])

function graphicFactory(side: AnyObject) {
  return {
    type: 'text',
    bottom: '8',
    ...side,
    style: {
      text: '',
      textAlign: 'center',
      fill: '#4E5969',
      fontSize: 12
    }
  }
}
const graphicElements = ref([graphicFactory({ left: '2.6%' }), graphicFactory({ right: 0 })])
const { option } = useChart(() => {
  return {
    grid: {
      left: '40',
      right: '0',
      top: '10',
      bottom: '30'
    },
    xAxis: {
      type: 'category',
      offset: 2,
      data: xData.value,
      boundaryGap: false,
      axisLabel: {
        color: '#4E5969',
        formatter(value: number, idx: number) {
          if (idx === 0) return ''
          if (idx === xData.value.length - 1) return ''
          return `${value}`
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        interval: (idx: number) => {
          if (idx === 0) return false
          if (idx === xData.value.length - 1) return false
          return true
        },
        lineStyle: {
          color: '#E5E8EF'
        }
      },
      axisPointer: {
        show: true,
        lineStyle: {
          color: '#23ADFF',
          width: 2
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        formatter(value: any, idx: number) {
          if (idx === 0) return value
          return `${value}k`
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#E5E8EF'
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        const [firstElement] = params as any[]
        return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>总内容量</span><span class="tooltip-value">${(
              Number(firstElement.value) * 10000
            ).toLocaleString()}</span></div>
          </div>`
      },
      className: 'echarts-tooltip-diy'
    },
    graphic: {
      elements: graphicElements.value
    },
    series: [
      {
        name: '浏览量(PV)',
        data: yData.value,
        type: 'line',
        smooth: true,
        // symbol: 'circle',
        symbolSize: 12,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2
          }
        },
        lineStyle: {
          width: 3,
          color: new graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: 'rgba(30, 231, 255, 1)'
            },
            {
              offset: 0.5,
              color: 'rgba(36, 154, 255, 1)'
            },
            {
              offset: 1,
              color: 'rgba(111, 66, 251, 1)'
            }
          ])
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(17, 126, 255, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(17, 128, 255, 0)'
            }
          ])
        }
      },
      {
        name: 'IP数',
        data: yData.value,
        type: 'line',
        smooth: true,
        color: '#00B2FF',
        symbolSize: 12,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#E2F2FF'
          }
        }
      }
    ]
  }
})

const getChartData = () => {
  try {
    const values = [100, 200, 150, 30, 100, 50, 10, 80]
    const year = new Date().getFullYear()
    const data = values.map((i, n) => {
      const m = n + 1
      const month = m >= 10 ? m : `0${m}`
      return { y: i, x: `${year}-${month}` }
    })
    data.forEach((item: any, index: number) => {
      xData.value.push(item.x)
      yData.value.push(item.y)
      if (index === 0) {
        graphicElements.value[0].style.text = item.x
      }
      if (index === data.length - 1) {
        graphicElements.value[1].style.text = item.x
      }
    })
  } catch (err) {
    // you can report use errorHandler or other
  }
}
getChartData()
</script>
