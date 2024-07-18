<template>
  <div class="table-page">
    <GiTable
      title="任务管理"
      row-key="id"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1500 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      :disabled-column-keys="['name']"
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
        <a-select v-model="queryForm.jobStatus" placeholder="请选择任务状态" :options="job_status_enum" allow-clear style="width: 150px" @change="search" />
        <a-button @click="reset">重置</a-button>
      </template>
      <template #custom-right>
        <a-button v-permission="['schedule:job:add']" type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
      </template>
      <template #jobName="{ record }">
        <a-link @click="onDetail(record)">{{ record.jobName }}</a-link>
      </template>
      <template #triggerType="{ record }">
        <GiCellTag :value="record.triggerType" :dict="job_trigger_type_enum" />:&nbsp;
        <span v-if="record.triggerType === 2">{{ record.triggerInterval }} 秒</span>
        <span v-else>{{ record.triggerInterval }}</span>
      </template>
      <template #taskType="{ record }">
        <GiCellTag :value="record.taskType" :dict="job_task_type_enum" />
        {{ record.executorInfo }}
      </template>
      <template #jobStatus="{ record }">
        <a-switch
          v-model="record.jobStatus"
          :checked-value="1"
          :unchecked-value="0"
          :disabled="!has.hasPerm('tool:job:update')"
          @change="onUpdateStatus(record)"
        />
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link @click="onLog(record)">日志</a-link>
          <a-popconfirm content="是否确定立即执行一次任务?" type="warning" @ok="onTrigger(record)">
            <a-link v-permission="['schedule:job:trigger']">执行</a-link>
          </a-popconfirm>
          <a-link v-permission="['schedule:job:update']" @click="onUpdate(record)">修改</a-link>
          <a-link v-permission="['schedule:job:delete']" status="danger" @click="onDelete(record)">删除</a-link>
        </a-space>
      </template>
    </GiTable>

    <JobAddModal ref="JobAddModalRef" @save-success="reset" />
    <JobDetailDrawer ref="JobDetailDrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import JobAddModal from './JobAddModal.vue'
import JobDetailDrawer from './JobDetailDrawer.vue'
import { type JobQuery, type JobResp, deleteJob, listGroup, listJob, triggerJob, updateJobStatus } from '@/apis'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'ScheduleJob' })

const { job_status_enum, job_trigger_type_enum, job_task_type_enum } = useDict('job_status_enum', 'job_trigger_type_enum', 'job_task_type_enum')

const queryForm = reactive<JobQuery>({
  groupName: ''
})
const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((page) => listJob({ ...queryForm, ...page }), { immediate: false })

const columns: TableInstanceColumns[] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize)
  },
  { title: '任务名称', dataIndex: 'jobName', slotName: 'jobName', width: 100, ellipsis: true, tooltip: true },
  { title: '调度类型', dataIndex: 'triggerType', slotName: 'triggerType', width: 130 },
  { title: '任务类型', dataIndex: 'taskType', slotName: 'taskType', width: 130, ellipsis: true, tooltip: true },
  { title: '状态', dataIndex: 'jobStatus', width: 60, align: 'center', slotName: 'jobStatus' },
  { title: '描述', dataIndex: 'description', width: 130, ellipsis: true, tooltip: true },
  { title: '创建时间', dataIndex: 'createDt', width: 180 },
  { title: '修改时间', dataIndex: 'updateDt', width: 180, show: false },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['schedule:job:trigger', 'schedule:job:update', 'schedule:job:delete'])
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
  queryForm.groupName = groupList.value[0].label
  search()
}

// 重置
const reset = () => {
  queryForm.jobName = undefined
  queryForm.jobStatus = undefined
  search()
}

// 删除
const onDelete = (record: JobResp) => {
  return handleDelete(() => deleteJob(record.id), {
    content: `是否确定删除任务 [${record.jobName}]？`,
    showModal: true
  })
}

// 修改状态
const onUpdateStatus = (record: JobResp) => {
  const msg = record.jobStatus === 1 ? '启用成功' : '禁用成功'
  updateJobStatus({ jobStatus: record.jobStatus }, record.id)
    .then(() => {
      Message.success(msg)
    }).catch(() => {
      record.jobStatus = record.jobStatus === 1 ? 0 : 1
    })
}

// 执行
const onTrigger = (record: JobResp) => {
  triggerJob(record.id).then(() => {
    Message.success('执行请求已下发')
  })
}

const JobAddModalRef = ref<InstanceType<typeof JobAddModal>>()
// 新增
const onAdd = () => {
  JobAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (record: JobResp) => {
  JobAddModalRef.value?.onUpdate(record)
}

const JobDetailDrawerRef = ref<InstanceType<typeof JobDetailDrawer>>()
// 详情
const onDetail = (record: JobResp) => {
  JobDetailDrawerRef.value?.onDetail(record)
}

const router = useRouter()
// 日志
const onLog = (record: JobResp) => {
  router.push({ path: '/schedule/log', query: { jobId: record.id, jobName: record.jobName, groupName: record.groupName } })
}

onMounted(() => {
  getGroupList()
})
</script>

<style scoped lang="scss"></style>
