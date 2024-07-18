<template>
  <a-drawer v-model:visible="visible" title="任务详情" :width="width >= 600 ? 600 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="ID" :span="2">
        <a-typography-paragraph copyable>{{ dataDetail?.id }}</a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="任务组">{{ dataDetail?.groupName }}</a-descriptions-item>
      <a-descriptions-item label="任务名称">{{ dataDetail?.jobName }}</a-descriptions-item>
      <a-descriptions-item label="触发类型">
        <GiCellTag :value="dataDetail?.triggerType" :dict="job_trigger_type_enum" />
      </a-descriptions-item>
      <a-descriptions-item v-if="dataDetail?.triggerType === 1" label="CRON">{{ dataDetail?.triggerInterval }}</a-descriptions-item>
      <a-descriptions-item v-else-if="dataDetail?.triggerType === 2" label="间隔时长">{{ dataDetail?.triggerInterval }} 秒</a-descriptions-item>
      <a-descriptions-item label="任务类型">
        <GiCellTag :value="dataDetail?.taskType" :dict="job_task_type_enum" />
      </a-descriptions-item>
      <a-descriptions-item label="执行器名称">{{ dataDetail?.executorInfo }}</a-descriptions-item>
      <a-descriptions-item label="任务参数">{{ dataDetail?.argsStr }}</a-descriptions-item>
      <a-descriptions-item label="路由策略">
        <GiCellTag :value="dataDetail?.routeKey" :dict="job_route_strategy_enum" />
      </a-descriptions-item>
      <a-descriptions-item label="阻塞策略">
        <GiCellTag :value="dataDetail?.blockStrategy" :dict="job_block_strategy_enum" />
      </a-descriptions-item>
      <a-descriptions-item label="超时时间">{{ dataDetail?.executorTimeout }} 秒</a-descriptions-item>
      <a-descriptions-item label="最大重试次数">{{ dataDetail?.maxRetryTimes }}</a-descriptions-item>
      <a-descriptions-item label="重试间隔">{{ dataDetail?.retryInterval }} 秒</a-descriptions-item>
      <a-descriptions-item label="并行数">{{ dataDetail?.parallelNum }}</a-descriptions-item>
      <a-descriptions-item label="任务状态">
        <GiCellTag :value="dataDetail?.jobStatus" :dict="job_status_enum" />
      </a-descriptions-item>
      <a-descriptions-item label="描述" :span="2">{{ dataDetail?.description }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import type { JobResp } from '@/apis'
import { useDict } from '@/hooks/app'

const { width } = useWindowSize()
const { job_status_enum, job_trigger_type_enum, job_task_type_enum, job_route_strategy_enum, job_block_strategy_enum } = useDict(
  'job_status_enum',
  'job_trigger_type_enum',
  'job_task_type_enum',
  'job_route_strategy_enum',
  'job_block_strategy_enum'
)

const visible = ref(false)
const dataDetail = ref<JobResp>()
// 详情
const onDetail = (record: JobResp) => {
  dataDetail.value = record
  visible.value = true
}

defineExpose({ onDetail })
</script>
