<template>
  <GiTable
    row-key="id"
    :data="dataList"
    :columns="columns"
    :loading="loading"
    :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
    :pagination="pagination"
    column-resizable
    @filterChange="filterChange"
    :disabledTools="['setting']"
    @refresh="search"
  >
    <template #custom-left>
      <a-input v-model="queryForm.createUserString" placeholder="请输入操作人" allow-clear @change="search">
        <template #prefix><icon-search /></template>
      </a-input>
      <a-input v-model="queryForm.ip" placeholder="请输入操作 IP 或地点" allow-clear @change="search">
        <template #prefix><icon-search /></template>
      </a-input>
      <DateRangePicker v-model="queryForm.createTime" @change="search" />
      <a-button @click="reset">重置</a-button>
    </template>
    <template #custom-right>
      <a-tooltip content="导出" @click="onExportFile">
        <a-button>
          <template #icon>
            <icon-download />
          </template>
        </a-button>
      </a-tooltip>
    </template>
    <template #createTime="{ record }">
      <a-link @click="openDetail(record)">{{ record.createTime }}</a-link>
    </template>
    <template #status="{ record }">
      <a-tag v-if="record.status === 1" color="green">
        <GiDot type="success" style="width: 5px; height: 5px"></GiDot>
        <span style="margin-left: 5px">成功</span>
      </a-tag>
      <a-tooltip v-else :content="record.errorMsg">
        <a-tag color="red" style="cursor: pointer">
          <GiDot type="danger" style="width: 5px; height: 5px"></GiDot>
          <span style="margin-left: 5px">失败</span>
        </a-tag>
      </a-tooltip>
    </template>
    <template #timeTaken="{ record }">
      <a-tag v-if="record.timeTaken > 500" color="red">{{ record.timeTaken }}ms</a-tag>
      <a-tag v-else-if="record.timeTaken > 200" color="orange">{{ record.timeTaken }}ms</a-tag>
      <a-tag v-else color="green">{{ record.timeTaken }} ms</a-tag>
    </template>
  </GiTable>

  <OperationLogDetailDrawer ref="OperationLogDetailDrawerRef" />
</template>

<script setup lang="ts">
import { listLog, type LogResp,exportOperateLog } from '@/apis'
import type { TableInstance } from '@arco-design/web-vue'
import DateRangePicker from '@/components/DateRangePicker/index.vue'
import OperationLogDetailDrawer from './OperationLogDetailDrawer.vue'
import { useDownload, useTable } from '@/hooks'

defineOptions({ name: 'OperationLog' })
const filterChange = (values,record)=>{
  try {
    const slotName = columns[values.split('_').pop()].slotName as string
    const value = record.join(',')
    queryForm[slotName] = value
    search()
  } catch (error) {
    search()
  }
}
const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize)
  },
  { title: '操作时间', slotName: 'createTime', width: 180 },
  { title: '操作人', dataIndex: 'createUserString', ellipsis: true, tooltip: true },
  { title: '操作内容', dataIndex: 'description', ellipsis: true, tooltip: true },
  { title: '所属模块', dataIndex: 'module', align: 'center', ellipsis: true, tooltip: true },
  {
    title: '状态',
    slotName: 'status',
    align: 'center',
    filterable: {
      filters: [
        {
          text: '成功',
          value: '1'
        },
        {
          text: '失败',
          value: '2'
        }
      ],
      filter: () => true,
      alignLeft: true
    }
  },
  { title: '操作 IP', dataIndex: 'ip', ellipsis: true, tooltip: true },
  { title: '操作地点', dataIndex: 'address', ellipsis: true, tooltip: true },
  { title: '耗时', slotName: 'timeTaken', align: 'center' },
  { title: '浏览器', dataIndex: 'browser', ellipsis: true, tooltip: true },
  { title: '终端系统', dataIndex: 'os', ellipsis: true, tooltip: true }
]
//导出操作日志
const onExportFile = ()=>{
  useDownload(exportOperateLog,'',queryForm)
}
const queryForm = reactive({
  description: undefined,
  ip: undefined,
  createUserString: undefined,
  createTime: undefined,
  status: undefined,
  sort: ['createTime,desc']
})

const {
  loading,
  tableData: dataList,
  pagination,
  search
} = useTable((p) => listLog({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置查询
const reset = () => {
  queryForm.description = undefined
  queryForm.ip = undefined
  queryForm.createUserString = undefined
  queryForm.createTime = undefined
  queryForm.status = undefined
  search()
}

const OperationLogDetailDrawerRef = ref<InstanceType<typeof OperationLogDetailDrawer>>()
// 查询详情
const openDetail = (item: LogResp) => {
  OperationLogDetailDrawerRef.value?.open(item.id)
}
</script>

<style lang="scss" scoped></style>
