<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :style="{
        background: isDark
          ? 'linear-gradient(180deg, #312565 0%, #201936 100%)'
          : 'linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%)',
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
const chartData = ref<number[]>([])
const { chartOption } = useChart((isDark: EChartsOption) => {
  return {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    legend: {
      show: true,
      top: 'center',
      right: '20%',
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        color: '#4E5969'
      }
    },
    tooltip: {
      show: true
    },
    series: [
      {
        name: '总计',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['30%', '50%'],
        label: {
          show: false
        },
        data: chartData.value
      }
    ]
  }
})

const loading = ref(false)
const colors = ['#8D4EDA', '#00B2FF', '#86DF6C']
// 查询图表数据
const getChartData = async () => {
  try {
    loading.value = true
    count.value = 88888
    growth.value = 88.8
    const data = [30, 20, 10]
    data.forEach((item, index) => {
      chartData.value.push({
        name: `示例${index + 1}`,
        value: item,
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
