<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { type SmsRecordQuery, type SmsRecordResp, deleteSmsRecord, exportSmsRecord, listSmsRecord } from '@/apis/system/smsRecord'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useDownload, useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'SmsRecord' })

const route = useRoute()

const { success_failure_status_enum } = useDict('success_failure_status_enum')

const queryForm = reactive<SmsRecordQuery>({
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
} = useTable((page) => listSmsRecord({ ...queryForm, ...page }), { immediate: false })
const columns = ref<TableInstanceColumns[]>([
  // { title: 'ID', dataIndex: 'id', slotName: 'id' },
  // { title: '配置id', dataIndex: 'configId', slotName: 'configId' },
  { title: '手机号', dataIndex: 'phone', slotName: 'phone' },
  { title: '参数配置', dataIndex: 'params', slotName: 'params' },
  { title: '发送状态', dataIndex: 'status', slotName: 'status' },
  { title: '返回数据', dataIndex: 'resMsg', slotName: 'resMsg', width: 260 },
  { title: '创建人', dataIndex: 'createUserString', slotName: 'createUser' },
  { title: '创建时间', dataIndex: 'createTime', slotName: 'createTime' },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    width: 160,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:smsRecord:detail', 'system:smsRecord:update', 'system:smsRecord:delete']),
  },
])

// 重置
const reset = () => {
  queryForm.configId = undefined
  queryForm.phone = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (record: SmsRecordResp) => {
  return handleDelete(() => deleteSmsRecord(record.id), {
    content: `是否确定删除该条数据？`,
    showModal: true,
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportSmsRecord(queryForm))
}

onMounted(() => {
  queryForm.configId = route.query!.id as string
  search()
})
</script>

<template>
  <div class="gi_table_page">
    <GiTable
      title="短信记录"
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
        <a-input-search v-model="queryForm.configId" placeholder="请输入配置id" disabled @search="search" />
        <a-input-search v-model="queryForm.phone" placeholder="请输入手机号" allow-clear @search="search" />
        <a-input-search v-model="queryForm.status" placeholder="请输入发送状态" allow-clear @search="search" />
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <template #default>重置</template>
        </a-button>
      </template>
      <template #toolbar-right>
        <a-button v-permission="['system:smsRecord:export']" @click="onExport">
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
            v-permission="['system:smsRecord:delete']"
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
  </div>
</template>

<style scoped lang="scss"></style>
