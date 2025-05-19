<template>
  <GiPageLayout>
    <GiTable
      row-key="id"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      :disabled-column-keys="['name']"
      @refresh="search"
    >
      <template #toolbar-left>
        <a-input-search v-model="queryForm.configId" placeholder="请输入配置 ID" allow-clear @search="search" />
        <a-input-search v-model="queryForm.phone" placeholder="搜索手机号" allow-clear @search="search" />
        <a-select
          v-model="queryForm.status"
          :options="success_failure_status_enum"
          placeholder="请选择发送状态"
          allow-clear
          style="width: 150px"
          @change="search"
        />
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <template #default>重置</template>
        </a-button>
      </template>
      <template #toolbar-right>
        <a-button v-permission="['system:SmsLog:export']" @click="onExport">
          <template #icon><icon-download /></template>
          <template #default>导出</template>
        </a-button>
      </template>
      <template #status="{ record }">
        <GiCellTag :value="record.status" :dict="success_failure_status_enum" />
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link
            v-permission="['system:smsLog:delete']"
            status="danger"
            :disabled="record.disabled"
            :title="record.disabled ? '不可删除' : '删除'"
            @click="onDelete(record)"
          >
            删除
          </a-link>
        </a-space>
      </template>
    </GiTable>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { TableInstance } from '@arco-design/web-vue'
import { type SmsLogQuery, type SmsLogResp, deleteSmsLog, exportSmsLog, listSmsLog } from '@/apis/system/smsLog'
import { useDownload, useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'SystemSmsLog' })

const route = useRoute()

const { success_failure_status_enum } = useDict('success_failure_status_enum')

const queryForm = reactive<SmsLogQuery>({
  configId: undefined,
  phone: undefined,
  status: undefined,
  sort: ['id,desc'],
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete,
} = useTable((page) => listSmsLog({ ...queryForm, ...page }), { immediate: false })
const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
    fixed: !isMobile() ? 'left' : undefined,
  },
  { title: '手机号', dataIndex: 'phone', slotName: 'phone' },
  { title: '参数配置', dataIndex: 'params', slotName: 'params' },
  { title: '发送状态', dataIndex: 'status', slotName: 'status' },
  { title: '返回数据', dataIndex: 'resMsg', slotName: 'resMsg', width: 260 },
  { title: '操作人', dataIndex: 'createUserString', slotName: 'createUser' },
  { title: '操作时间', dataIndex: 'createTime', slotName: 'createTime' },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    width: 160,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:smsLog:delete']),
  },
]

// 重置
const reset = () => {
  queryForm.configId = undefined
  queryForm.phone = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (record: SmsLogResp) => {
  return handleDelete(() => deleteSmsLog(record.id), {
    content: `是否确定删除该条数据？`,
    showModal: true,
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportSmsLog(queryForm))
}

onMounted(() => {
  queryForm.configId = route.query!.configId as string
  search()
})
</script>

<style scoped lang="scss"></style>
