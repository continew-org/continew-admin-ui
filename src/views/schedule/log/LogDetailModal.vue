<template>
  <a-modal
    v-model:visible="visible"
    title="任务日志详情"
    :width="width >= 1500 ? 1500 : '100%'"
    :footer="false"
  >
    <a-layout style="height: 500px">
      <a-layout-sider :resize-directions="['right']">
        <a-tabs size="large" position="left">
          <a-tab-pane v-for="item in dataList" :key="item.id">
            <template #title>
              <span @click="onLogDetail(item)">{{ item.clientInfo.split('@')[1] }}</span>
            </template>
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
      <a-layout-content>
        <GiCodeView :code-json="content" />
      </a-layout-content>
    </a-layout>
  </a-modal>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { type JobInstanceQuery, type JobInstanceResp, type JobLogResp, listJobInstance, listJobInstanceLog } from '@/apis'
import dayjs from "dayjs";

const { width } = useWindowSize()
const queryForm = reactive<JobInstanceQuery>({})
const dataList = ref<JobInstanceResp[]>([])
const loading = ref(false)
// 查询列表数据
const getInstanceList = async (query: JobInstanceQuery = { ...queryForm }) => {
  try {
    loading.value = true
    const res = await listJobInstance(query)
    dataList.value = res.data
  } finally {
    loading.value = false
  }
}

const visible = ref(false)
// 详情
const onDetail = (record: JobLogResp) => {
  visible.value = true
  // 更新 queryForm
  queryForm.jobId = record.jobId
  queryForm.taskBatchId = record.id
  getInstanceList()
}

// 格式化日志
const formatLog = (log: any) => {
  const date = new Date(Number.parseInt(log.time_stamp))
  return `${dayjs(date).format('YYYY-MM-DD HH:mm:ss')} ${log.level} [${log.thread}] ${log.location} - ${log.message}`
}

const content = ref('')
// 日志输出
const onLogDetail = async (record: JobInstanceResp) => {
  // todo startId根据第一次查询 如果有返回!=0则需要在查一次
  const res = await listJobInstanceLog({
    taskBatchId: record.taskBatchId,
    jobId: record.jobId,
    taskId: record.id,
    startId: 0,
    fromIndex: 0,
    size: 50
  })
  content.value = res.data.message.map(formatLog).join('\n')
}

defineExpose({ onDetail })
</script>

<style scoped lang="scss"></style>
