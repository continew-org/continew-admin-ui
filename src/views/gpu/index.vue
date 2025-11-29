<template>
  <GiPageLayout :body-style="{ overflow: 'auto' }">
    <a-space direction="vertical" :size="16" fill>
      <a-space direction="vertical" :size="16" fill>
        <a-card class="balance-card" :bordered="false">
          <div class="balance-card__header">
            <div>
              <h3>用量信息</h3>
              <p>所有日期均按 UTC 时间显示，数据可能有 5 分钟延迟。</p>
            </div>
            <a-space :size="12">
              <a-button type="primary">去充值</a-button>
              <a-button type="text" status="warning">余额预警已开启（去设置）</a-button>
            </a-space>
          </div>
          <a-row :gutter="16">
            <a-col :xs="24" :md="12">
              <div class="balance-card__item">
                <span class="label">充值余额</span>
                <span class="value">
                  ¥{{ balanceInfo.recharge.toFixed(2) }}
                  <small>CNY</small>
                </span>
              </div>
            </a-col>
            <a-col :xs="24" :md="12">
              <div class="balance-card__item">
                <span class="label">本月消费</span>
                <span class="value">
                  ¥{{ balanceInfo.monthlyUsage.toFixed(2) }}
                  <small>CNY</small>
                </span>
              </div>
            </a-col>
          </a-row>
        </a-card>

        <a-card class="gpu-overview" :bordered="false">
          <a-row :gutter="16">
            <a-col :span="6">
              <a-statistic
                title="总GPU数量"
                :value="gpuStats.total"
                :value-style="{ color: '#1890ff' }"
              >
                <template #suffix>
                  <span>个</span>
                </template>
              </a-statistic>
            </a-col>
            <a-col :span="6">
              <a-statistic
                title="使用中"
                :value="gpuStats.used"
                :value-style="{ color: '#52c41a' }"
              >
                <template #suffix>
                  <span>个</span>
                </template>
              </a-statistic>
            </a-col>
            <a-col :span="6">
              <a-statistic
                title="空闲"
                :value="gpuStats.idle"
                :value-style="{ color: '#faad14' }"
              >
                <template #suffix>
                  <span>个</span>
                </template>
              </a-statistic>
            </a-col>
            <a-col :span="6">
              <a-statistic
                title="使用率"
                :value="gpuStats.usageRate"
                :value-style="{ color: '#ff4d4f' }"
              >
                <template #suffix>
                  <span>%</span>
                </template>
              </a-statistic>
            </a-col>
          </a-row>
        </a-card>
      </a-space>

      <!-- 图表1: 算力拓扑图 -->
      <a-card title="算力拓扑图" :bordered="false">
        <Chart :option="topologyOption" style="width: 100%; height: 400px" />
      </a-card>

      <!-- 图表2: 实时显存监控 -->
      <a-card title="实时显存监控" :bordered="false">
        <Chart :option="vramOption" style="width: 100%; height: 350px" />
      </a-card>

      <!-- 图表3: 资源分配饼图 -->
      <a-card title="资源分配" :bordered="false">
        <Chart :option="pieOption" style="width: 100%; height: 350px" />
      </a-card>

      <!-- 训练任务列表 -->
      <GiTable
      row-key="id"
      :data="taskList"
      :columns="columns"
      :loading="tableLoading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1200 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      @refresh="handleRefresh"
    >
      <template #toolbar-left>
        <a-button type="primary" @click="handleCreateTask">
          <template #icon>
            <icon-plus />
          </template>
          <template #default>创建训练任务</template>
        </a-button>
      </template>
      <template #status="{ record }">
        <a-tag :color="getStatusColor(record.status)">
          {{ getStatusText(record.status) }}
        </a-tag>
      </template>
      <template #progress="{ record }">
        <a-progress
          :percent="record.progress"
          :status="record.status === 'failed' ? 'error' : undefined"
        />
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link @click="handleView(record)">查看</a-link>
          <a-link
            v-if="record.status === 'running'"
            status="danger"
            @click="handleStop(record)"
          >
            停止
          </a-link>
          <a-link
            v-if="record.status === 'pending'"
            status="success"
            @click="handleStart(record)"
          >
            启动
          </a-link>
          <a-link status="danger" @click="handleDelete(record)">删除</a-link>
        </a-space>
      </template>
      </GiTable>
    </a-space>

    <!-- 创建训练任务弹窗 -->
    <a-modal
      v-model:visible="createVisible"
      title="创建训练任务"
      :mask-closable="false"
      :esc-to-close="false"
      :ok-loading="createSubmitting"
      @ok="handleCreateTaskSubmit"
    >
      <a-form :model="createForm" layout="vertical">
        <a-form-item label="任务名称" field="name" required>
          <a-input v-model="createForm.name" placeholder="请输入任务名称" />
        </a-form-item>
        <a-form-item label="模型" field="model" required>
          <a-select
            v-model="createForm.model"
            placeholder="请选择模型"
            :options="[
              { label: 'LLaMA-3', value: 'llama-3' },
              { label: 'GPT-4', value: 'gpt-4' },
              { label: 'BERT Large', value: 'bert-large' },
            ]"
          />
        </a-form-item>
        <a-form-item label="GPU 数量" field="gpuCount" required>
          <a-input-number
            v-model="createForm.gpuCount"
            :min="1"
            :max="gpuStats.total || 8"
            style="width: 100%"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { Message, Modal } from '@arco-design/web-vue'
import type { TableColumnData } from '@arco-design/web-vue'
import type { EChartsOption } from 'echarts'
import { useChart } from '@/hooks'
import Chart from '@/components/Chart/index.vue'
import {
  createGpuTask,
  deleteGpuTask,
  getGpuAllocation,
  getGpuOverview,
  getGpuServers,
  getGpuTasks,
  getGpuVramHistory,
  getGpuVramSnapshot,
  startGpuTask,
  stopGpuTask,
} from '@/apis/gpu'
import type {
  GpuAllocationItem,
  GpuBalanceInfo,
  GpuServerNode,
  GpuStats,
  GpuTaskItem,
  GpuVramPoint,
} from '@/apis/gpu'
import { createRechargeOrder, type CreateRechargeOrderReq } from '@/apis/billing'
import { useRouter } from 'vue-router'

defineOptions({ name: 'GpuTraining' })

const router = useRouter()
const tableLoading = ref(false)
const balanceInfo = reactive<GpuBalanceInfo>({
  recharge: 0,
  monthlyUsage: 0,
})
const gpuStats = reactive<GpuStats>({
  total: 0,
  used: 0,
  idle: 0,
  usageRate: 0,
})
const serverNodes = ref<GpuServerNode[]>([])
const allocationData = ref<GpuAllocationItem[]>([])
const createVisible = ref(false)
const createSubmitting = ref(false)
const createForm = reactive<{ name: string; model: string; gpuCount: number }>({
  name: '',
  model: '',
  gpuCount: 1,
})

// 图表1: 算力拓扑图 - 使用散点图绘制服务器节点和GPU点
const { chartOption: topologyOption } = useChart((isDark: EChartsOption) => {
  const serverData: any[] = []
  const gpuData: any[] = []
  const columns = Math.min(Math.max(serverNodes.value.length, 1), 4)
  const columnGap = columns > 1 ? 70 / (columns - 1) : 0

  serverNodes.value.forEach((server, serverIdx) => {
    const baseX = columns > 1 ? 15 + (serverIdx % columns) * columnGap : 50
    const baseY = 75 - Math.floor(serverIdx / columns) * 25

    serverData.push({
      name: server.name,
      value: [baseX, baseY],
      symbolSize: 60,
      symbol: 'rect',
      itemStyle: {
        color: isDark ? '#2a2a2a' : '#f5f5f5',
        borderColor: isDark ? '#555' : '#d9d9d9',
        borderWidth: 2,
      },
    })

    if (!server.gpus?.length) return
    const radius = 10
    server.gpus.forEach((gpuStatus, gpuIdx) => {
      const angle = (Math.PI * 2 * gpuIdx) / server.gpus.length
      const posX = baseX + radius * Math.cos(angle)
      const posY = baseY + radius * Math.sin(angle)
      gpuData.push({
        name: `${server.name} GPU${gpuIdx + 1}`,
        value: [posX, posY],
        symbolSize: 14,
        symbol: 'circle',
        itemStyle: {
          color: gpuStatus === 0 ? '#52c41a' : '#ff4d4f',
        },
        status: gpuStatus === 0 ? '空闲' : '训练中',
      })
    })
  })

  return {
    grid: {
      left: '10%',
      right: '10%',
      top: '15%',
      bottom: '15%',
    },
    tooltip: {
      trigger: 'item',
      formatter(params: any) {
        if (params.seriesName === 'GPU节点') {
          return `${params.data.name}<br/>状态: ${params.data.status}`
        }
        return params.data.name
      },
    },
    xAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 100,
    },
    series: [
      {
        name: '服务器节点',
        type: 'scatter',
        data: serverData,
        label: {
          show: true,
          position: 'bottom',
          formatter: '{b}',
          fontSize: 12,
          color: '#4E5969',
        },
        z: 1,
      },
      {
        name: 'GPU节点',
        type: 'scatter',
        data: gpuData,
        label: {
          show: false,
        },
        z: 2,
      },
    ],
  }
})

// 图表2: 实时显存监控折线图
const vramTimeData = ref<string[]>([])
const vramUsageData = ref<number[]>([])
const VRAM_HISTORY_LIMIT = 60

const { chartOption: vramOption } = useChart((isDark: EChartsOption) => {
  return {
    grid: {
      left: '50',
      right: '20',
      top: '30',
      bottom: '40',
    },
    tooltip: {
      trigger: 'axis',
      formatter(params: any) {
        const data = params[0]
        return `${data.axisValue}<br/>显存占用率: ${data.value}%`
      },
    },
    xAxis: {
      type: 'category',
      data: vramTimeData.value,
      boundaryGap: false,
      axisLabel: {
        color: '#4E5969',
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      name: '显存占用率 (%)',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value}%',
      },
    },
    series: [
      {
        name: '显存占用率',
        type: 'line',
        data: vramUsageData.value,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2,
          color: '#246EFF',
        },
        itemStyle: {
          color: '#246EFF',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(36, 110, 255, 0.3)' },
              { offset: 1, color: 'rgba(36, 110, 255, 0.05)' },
            ],
          },
        },
      },
    ],
  }
})

const appendVramPoint = (point: GpuVramPoint | undefined) => {
  if (!point) return
  vramTimeData.value.push(point.timestamp)
  vramUsageData.value.push(point.usagePercent)
  if (vramTimeData.value.length > VRAM_HISTORY_LIMIT) {
    vramTimeData.value.shift()
    vramUsageData.value.shift()
  }
}

const { chartOption: pieOption } = useChart(() => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} GPU ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
    },
    series: [
      {
        name: 'GPU分配',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}\n{c} GPU',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        data:
          allocationData.value.length > 0
            ? allocationData.value.map((item) => ({
              value: item.gpuCount,
              name: item.name,
            }))
            : [{ value: 0, name: '暂无数据' }],
      },
    ],
  }
})

const taskList = ref<GpuTaskItem[]>([])

const columns: TableColumnData[] = [
  {
    title: '任务名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '模型',
    dataIndex: 'model',
    width: 150,
  },
  {
    title: 'GPU数量',
    dataIndex: 'gpuCount',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
    width: 120,
  },
  {
    title: '进度',
    dataIndex: 'progress',
    slotName: 'progress',
    width: 200,
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    width: 180,
  },
  {
    title: '操作',
    slotName: 'action',
    width: 200,
    fixed: 'right',
  },
]

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: true,
  showPageSize: true,
  onChange(page: number) {
    pagination.current = page
    fetchTasks()
  },
  onPageSizeChange(size: number) {
    pagination.pageSize = size
    pagination.current = 1
    fetchTasks()
  },
})

const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    pending: 'orange',
    running: 'blue',
    completed: 'green',
    failed: 'red',
  }
  return colorMap[status] || 'gray'
}

const getStatusText = (status: string) => {
  const textMap: Record<string, string> = {
    pending: '等待中',
    running: '运行中',
    completed: '已完成',
    failed: '失败',
  }
  return textMap[status] || '未知'
}

const fetchOverview = async () => {
  try {
    const { data } = await getGpuOverview()
    Object.assign(balanceInfo, data.balance)
    Object.assign(gpuStats, data.stats)
  } catch (error) {
    Message.error('获取用量信息失败')
  }
}

const fetchServers = async () => {
  try {
    const { data } = await getGpuServers()
    serverNodes.value = data
  } catch (error) {
    Message.error('获取算力拓扑数据失败')
  }
}

const fetchAllocation = async () => {
  try {
    const { data } = await getGpuAllocation()
    allocationData.value = data
  } catch (error) {
    Message.error('获取资源分配数据失败')
  }
}

const fetchVramHistory = async () => {
  try {
    const { data } = await getGpuVramHistory({ limit: 30 })
    vramTimeData.value = []
    vramUsageData.value = []
    data.forEach((point) => appendVramPoint(point))
  } catch (error) {
    Message.error('获取显存监控数据失败')
  }
}

const fetchVramSnapshot = async () => {
  try {
    const { data } = await getGpuVramSnapshot()
    appendVramPoint(data)
  } catch (error) {
    console.error('实时显存监控更新失败', error)
  }
}

let vramUpdateTimer: ReturnType<typeof setInterval> | null = null
const startVramPolling = () => {
  if (vramUpdateTimer) return
  vramUpdateTimer = setInterval(() => {
    fetchVramSnapshot()
  }, 5000)
}

const stopVramPolling = () => {
  if (vramUpdateTimer) {
    clearInterval(vramUpdateTimer)
    vramUpdateTimer = null
  }
}

const fetchTasks = async () => {
  tableLoading.value = true
  try {
    const { data } = await getGpuTasks({ page: pagination.current, size: pagination.pageSize })
    taskList.value = data.list
    pagination.total = data.total
  } catch (error) {
    Message.error('获取训练任务列表失败')
  } finally {
    tableLoading.value = false
  }
}

const reloadDashboard = async () => {
  await Promise.all([fetchOverview(), fetchServers(), fetchAllocation(), fetchVramHistory()])
}

const handleCreateTask = () => {
  createForm.name = ''
  createForm.model = ''
  createForm.gpuCount = 1
  createVisible.value = true
}

const handleCreateTaskSubmit = async () => {
  if (!createForm.name || !createForm.model || !createForm.gpuCount) {
    Message.warning('请完善任务信息')
    return
  }
  createSubmitting.value = true
  try {
    await createGpuTask({
      name: createForm.name,
      model: createForm.model,
      gpuCount: createForm.gpuCount,
    })
    Message.success('创建训练任务成功')
    createVisible.value = false
    fetchTasks()
  } finally {
    createSubmitting.value = false
  }
}

const handleRefresh = async () => {
  await Promise.all([reloadDashboard(), fetchTasks()])
  Message.success('刷新成功')
}

const handleView = (record: GpuTaskItem) => {
  Message.info(`查看任务: ${record.name}`)
}

const handleStart = (record: GpuTaskItem) => {
  Modal.confirm({
    title: '确认启动',
    content: `确定要启动任务 "${record.name}" 吗？`,
    async onOk() {
      await startGpuTask(record.id)
      Message.success('任务已启动')
      fetchTasks()
    },
  })
}

const handleStop = (record: GpuTaskItem) => {
  Modal.confirm({
    title: '确认停止',
    content: `确定要停止任务 "${record.name}" 吗？`,
    async onOk() {
      await stopGpuTask(record.id)
      Message.success('任务已停止')
      fetchTasks()
    },
  })
}

const handleDelete = (record: GpuTaskItem) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除任务 "${record.name}" 吗？`,
    async onOk() {
      await deleteGpuTask(record.id)
      Message.success('删除成功')
      fetchTasks()
    },
  })
}

onMounted(() => {
  reloadDashboard().then(() => {
    startVramPolling()
  })
  fetchTasks()
})

onUnmounted(() => {
  stopVramPolling()
})
</script>

<style lang="scss" scoped>
.gpu-overview {
  margin-bottom: 16px;

  :deep(.arco-statistic-title) {
    font-size: 14px;
  }

  :deep(.arco-statistic-value) {
    font-size: 24px;
  }
}

.balance-card {
  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 4px 0 0;
    color: var(--color-text-2);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__item {
    padding: 16px;
    border: 1px solid var(--color-fill-3);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .label {
      color: var(--color-text-2);
      font-size: 14px;
    }

    .value {
      font-size: 24px;
      font-weight: 600;
      color: var(--color-text-1);

      small {
        font-size: 14px;
        margin-left: 4px;
        color: var(--color-text-2);
      }
    }
  }
}
</style>
