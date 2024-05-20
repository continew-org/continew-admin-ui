<template>
  <GiTable
    row-key="id"
    :data="dataList"
    :columns="columns"
    :loading="loading"
    :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
    :pagination="pagination"
    column-resizable
    :disabled-tools="['size', 'setting']"
    @filter-change="filterChange"
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
      <a-tooltip content="导出">
        <a-button v-permission="['monitor:log:export']" class="gi_hover_btn-border" @click="onExport">
          <template #icon>
            <icon-download />
          </template>
        </a-button>
      </a-tooltip>
    </template>
    <template #createTime="{ record }">
      <a-link @click="onDetail(record)">{{ record.createTime }}</a-link>
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
import dayjs from 'dayjs'
import OperationLogDetailDrawer from './OperationLogDetailDrawer.vue'
import { type LogQuery, type LogResp, exportOperationLog, listLog } from '@/apis'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import DateRangePicker from '@/components/DateRangePicker/index.vue'
import { useDownload, useTable } from '@/hooks'

defineOptions({ name: 'OperationLog' })

const queryForm = reactive<LogQuery>({
  createTime: [
    dayjs().subtract(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ],
  sort: ['createTime,desc']
})

const {
  loading,
  tableData: dataList,
  pagination,
  search
} = useTable((page) => listLog({ ...queryForm, ...page }), { immediate: true })

const columns: TableInstanceColumns[] = [
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

// 重置
const reset = () => {
  queryForm.description = undefined
  queryForm.ip = undefined
  queryForm.createUserString = undefined
  queryForm.createTime = [
    dayjs().subtract(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ]
  queryForm.status = undefined
  search()
}

// 过滤查询
const filterChange = (dataIndex, filteredValues) => {
  try {
    const slotName = columns[dataIndex.split('_').pop()].slotName as string
    queryForm[slotName] = filteredValues.join(',')
    search()
  } catch (error) {
    search()
  }
}

// 导出
const onExport = () => {
  useDownload(() => exportOperationLog(queryForm))
}

const OperationLogDetailDrawerRef = ref<InstanceType<typeof OperationLogDetailDrawer>>()
// 详情
const onDetail = (item: LogResp) => {
  OperationLogDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
