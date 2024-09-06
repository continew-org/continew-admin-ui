<template>
  <div class="table-page">
    <GiTable
      title="任务日志"
      row-key="id"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1500 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      @refresh="search"
    >
      <template #custom-left>
        <a-select
          v-model="queryForm.groupName"
          placeholder="请选择任务组"
          :options="groupList"
          style="width: 200px"
          @change="search"
        />
        <a-input v-model="queryForm.jobName" placeholder="请输入任务名称" allow-clear @change="search" />
        <a-select
          v-model="queryForm.taskBatchStatus"
          placeholder="请选择状态"
          :options="job_execute_status_enum"
          allow-clear
          style="width: 150px"
          @change="search"
        />
        <DateRangePicker v-model="queryForm.datetimeRange" :allow-clear="false" @change="search" />
        <a-button @click="reset">重置</a-button>
      </template>
      <template #taskBatchStatus="{ record }">
        <GiCellTag :value="record.taskBatchStatus" :dict="job_execute_status_enum" />
      </template>
      <template #operationReason="{ record }">
        <GiCellTag :value="record.operationReason" :dict="job_execute_reason_enum" />
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link @click="onDetail(record)">详情</a-link>
          <a-popconfirm content="是否确定停止本次执行?" type="warning" @ok="onStop(record)">
            <a-link v-if="record.taskBatchStatus === 2" v-permission="['schedule:log:stop']" status="danger">停止</a-link>
          </a-popconfirm>
          <a-popconfirm content="是否确定重试本次执行?" type="warning" @ok="onRetry(record)">
            <a-link
              v-if="record.taskBatchStatus === 4 || record.taskBatchStatus === 5 || record.taskBatchStatus === 6"
              v-permission="['schedule:log:retry']"
              status="danger"
            >
              重试
            </a-link>
          </a-popconfirm>
        </a-space>
      </template>
    </GiTable>

    <JobLogDetailModal ref="JobLogDetailModalRef" />
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import JobLogDetailModal from './LogDetailModal.vue'
import { type JobLogQuery, type JobLogResp, listGroup, listJobLog, retryJob, stopJob } from '@/apis/schedule'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'ScheduleLog' })

const { job_execute_reason_enum, job_execute_status_enum } = useDict('job_execute_reason_enum', 'job_execute_status_enum')

const queryForm = reactive<JobLogQuery>({
  datetimeRange: [
    dayjs().subtract(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ]
})
const {
  tableData: dataList,
  pagination,
  loading,
  search
} = useTable((page) => listJobLog({ ...queryForm, ...page }), { immediate: false })

const columns: TableInstanceColumns[] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize)
  },
  { title: '任务组', dataIndex: 'groupName', width: 80, ellipsis: true, tooltip: true },
  { title: '任务名称', dataIndex: 'jobName', width: 80, ellipsis: true, tooltip: true },
  { title: '调度时间', dataIndex: 'createDt', width: 80 },
  { title: '执行状态', dataIndex: 'taskBatchStatus', slotName: 'taskBatchStatus', width: 50, align: 'center' },
  { title: '执行备注', dataIndex: 'operationReason', slotName: 'operationReason', width: 80, ellipsis: true, tooltip: true },
  { title: '执行时间', dataIndex: 'executionAt', width: 80 },
  {
    title: '操作',
    slotName: 'action',
    width: 60,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['schedule:log:stop', 'schedule:log:retry'])
  }
]

const groupList = ref()
// 查询任务组列表
const getGroupList = async () => {
  const { data } = await listGroup()
  groupList.value = data?.map((item: string) => ({
    label: item,
    value: item
  }))
}

// 重置
const reset = () => {
  queryForm.taskBatchStatus = undefined
  queryForm.datetimeRange = [
    dayjs().subtract(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ]
  search()
}

// 停止
const onStop = (record: JobLogResp) => {
  stopJob(record.id).then(() => {
    Message.success('停止成功')
  })
}

// 重试
const onRetry = (record: JobLogResp) => {
  retryJob(record.id).then(() => {
    Message.success('重试成功')
  })
}

const JobLogDetailModalRef = ref<InstanceType<typeof JobLogDetailModal>>()
// 查看日志详情
const onDetail = (record: JobLogResp) => {
  JobLogDetailModalRef.value?.onDetail(record)
}

const route = useRoute()
onMounted(() => {
  if (route.query) {
    queryForm.jobId = route.query.jobId ? Number.parseInt(route.query.jobId as string, 10) : undefined
    queryForm.groupName = route.query.groupName ? route.query.groupName : undefined
    queryForm.jobName = route.query.jobName ? route.query.jobName : undefined
  }
  getGroupList()
  search()
})
</script>

<style scoped lang="scss"></style>
