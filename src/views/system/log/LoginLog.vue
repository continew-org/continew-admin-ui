<template>
  <GiTable
    row-key="id"
    :data="dataList"
    :columns="columns"
    :loading="loading"
    :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
    :pagination="pagination"
    @filterChange="filterChange"
    :disabledTools="['setting']"
    @refresh="search"
  >
    <template #custom-left>
      <a-input v-model="queryForm.createUserString" placeholder="请输入登录用户" allow-clear @change="search">
        <template #prefix><icon-search /></template>
      </a-input>
      <a-input v-model="queryForm.ip" placeholder="请输入登录 IP 或地点" allow-clear @change="search">
        <template #prefix><icon-search /></template>
      </a-input>
      <DateRangePicker v-model="queryForm.createTime" @change="search" />
      <a-button @click="reset">重置</a-button>
    </template>
    <template #custom-right>
      <a-tooltip content="导出">
        <a-button @click="onExportFile">
          <template #icon>
            <icon-download />
          </template>
        </a-button>
      </a-tooltip>
    </template>
    <template #status="{ record }">
      <a-tag v-if="record.status === 1" color="green">
        <GiDot type="success" style="width: 5px; height: 5px" />
        <span style="margin-left: 5px">成功</span>
      </a-tag>
      <a-tooltip v-else :content="record.errorMsg">
        <a-tag color="red" style="cursor: pointer">
          <GiDot type="danger" style="width: 5px; height: 5px" />
          <span style="margin-left: 5px">失败</span>
        </a-tag>
      </a-tooltip>
    </template>
  </GiTable>
</template>

<script setup lang="ts">
import { listLog,exportLog } from '@/apis'
import type { TableInstance } from '@arco-design/web-vue'
import DateRangePicker from '@/components/DateRangePicker/index.vue'
import { useTable } from '@/hooks'
import {useDownload} from '@/hooks'
defineOptions({ name: 'LoginLog' })
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
  { title: '登录时间', dataIndex: 'createTime', width: 180 },
  { title: '用户昵称', dataIndex: 'createUserString', ellipsis: true, tooltip: true },
  { title: '登录行为', dataIndex: 'description' },
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
      filter: () =>{return true},
      alignLeft: true
    }
  },
  { title: '登录 IP', dataIndex: 'ip', ellipsis: true, tooltip: true },
  { title: '登录地点', dataIndex: 'address', ellipsis: true, tooltip: true },
  { title: '浏览器', dataIndex: 'browser', ellipsis: true, tooltip: true },
  { title: '终端系统', dataIndex: 'os', ellipsis: true, tooltip: true }
]
//导出登录日志
const onExportFile = ()=>{
  useDownload(()=>exportLog(queryForm))
}
const queryForm = reactive({
  module: '登录',
  ip: undefined,
  createUserString: undefined,
  createTime: undefined,
  status: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search
} = useTable((p) => listLog({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.ip = undefined
  queryForm.createUserString = undefined
  queryForm.createTime = undefined
  queryForm.status = undefined
  search()
}
</script>

<style lang="scss" scoped></style>
