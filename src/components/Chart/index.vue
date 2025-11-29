<template>
  <VCharts ref="chart" :option="option" :autoresize="autoResize" :style="{ width, height }" />
</template>

<script setup lang="ts">
import { registerMap, use } from 'echarts/core'
import { ScatterChart, LineChart, PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VCharts from 'vue-echarts'
import worldMap from './world.json'
import chinaMap from './china.json'

// 注册必要的组件和渲染器
use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ScatterChart,
  LineChart,
  PieChart,
  CanvasRenderer,
])

defineProps({
  option: {
    type: Object,
    default() {
      return {}
    },
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
})

registerMap('world', worldMap)
registerMap('china', chinaMap)

const chart = ref(null)
defineExpose({
  chart,
})
</script>

<style scoped lang="less"></style>
