<template>
  <GiPageLayout>
    <GiTable
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
      <template #toolbar-left>
        <a-input-search v-model="queryForm.name" placeholder="搜索名称" allow-clear @search="search" />
        <a-input-search v-model="queryForm.accessKey" placeholder="搜索 Access Key" allow-clear @search="search" />
        <a-select
          v-model="queryForm.supplier"
          :options="sms_supplier_enum"
          placeholder="请选择厂商"
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
        <a-button v-permission="['system:smsConfig:create']" type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <template #default>新增</template>
        </a-button>
      </template>
      <template #supplier="{ record }">
        <GiCellTag :value="record.supplier" :dict="sms_supplier_enum" />
      </template>
      <template #accessKey="{ record }">
        <CellCopy :content="record.accessKey" />
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link v-permission="['system:smsLog:list']" title="发送记录" @click="onLog(record)">发送记录</a-link>
          <a-link v-permission="['system:smsConfig:update']" title="修改" @click="onUpdate(record)">修改</a-link>
          <a-link
            v-permission="['system:smsConfig:delete']"
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

    <SmsConfigAddModal ref="SmsConfigAddModalRef" @save-success="search" />
  </GiPageLayout>
</template>

<script setup lang="tsx">
import type { TableInstance } from '@arco-design/web-vue'
import SmsConfigAddModal from './SmsConfigAddModal.vue'
import { type SmsConfigQuery, type SmsConfigResp, deleteSmsConfig, listSmsConfig } from '@/apis/system/smsConfig'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { isMobile } from '@/utils'
import has from '@/utils/has'
import GiCellStatus from '@/components/GiCell/GiCellStatus.vue'

defineOptions({ name: 'SystemSmsConfig' })

const { sms_supplier_enum } = useDict('sms_supplier_enum')

const queryForm = reactive<SmsConfigQuery>({
  name: undefined,
  supplier: undefined,
  accessKey: undefined,
  sort: ['id,desc'],
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete,
} = useTable((page) => listSmsConfig({ ...queryForm, ...page }), { immediate: true })
const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
    fixed: !isMobile() ? 'left' : undefined,
  },
  { title: '名称', dataIndex: 'name', slotName: 'name', width: 120, fixed: !isMobile() ? 'left' : undefined },
  { title: '厂商', dataIndex: 'supplier', slotName: 'supplier', width: 100 },
  { title: 'Access Key', dataIndex: 'accessKey', slotName: 'accessKey', width: 200, ellipsis: true, tooltip: true },
  { title: 'Secret Key', dataIndex: 'secretKey', slotName: 'secretKey', width: 200, ellipsis: true, tooltip: true },
  { title: '短信签名', dataIndex: 'signature', slotName: 'signature', width: 200, ellipsis: true, tooltip: true },
  { title: '模板 ID', dataIndex: 'templateId', slotName: 'templateId', width: 100, align: 'center' },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
    width: 100,
    align: 'center',
    render: ({ record }) => {
      return <GiCellStatus status={record.status} />
    },
  },
  { title: '负载均衡权重', dataIndex: 'weight', slotName: 'weight', width: 150, align: 'center' },
  {
    title: '重试间隔',
    dataIndex: 'retryInterval',
    slotName: 'retryInterval',
    width: 120,
    align: 'center',
    render: ({ record }) => record.retryInterval ? `${record.retryInterval} 秒` : record.retryInterval,
  },
  { title: '重试次数', dataIndex: 'maxRetries', slotName: 'maxRetries', width: 100, align: 'center' },
  { title: '发送上限', dataIndex: 'maximum', slotName: 'maximum', width: 100, align: 'center' },
  { title: '创建人', dataIndex: 'createUserString', width: 140, ellipsis: true, tooltip: true, show: false },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '修改人', dataIndex: 'updateUserString', width: 140, ellipsis: true, tooltip: true, show: false },
  { title: '修改时间', dataIndex: 'updateTime', width: 180, show: false },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    width: 200,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:smsLog:list', 'system:smsConfig:update', 'system:smsConfig:delete']),
  },
]

// 重置
const reset = () => {
  queryForm.name = undefined
  queryForm.supplier = undefined
  queryForm.accessKey = undefined
  search()
}

// 删除
const onDelete = (record: SmsConfigResp) => {
  return handleDelete(() => deleteSmsConfig(record.id), {
    content: `是否确定删除配置「${record.name}」？`,
    showModal: true,
  })
}

const SmsConfigAddModalRef = ref<InstanceType<typeof SmsConfigAddModal>>()
// 新增
const onAdd = () => {
  SmsConfigAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (record: SmsConfigResp) => {
  SmsConfigAddModalRef.value?.onUpdate(record.id)
}

const router = useRouter()
// 发送记录
const onLog = (record: SmsConfigResp) => {
  router.push({
    path: '/system/sms/log',
    query: { configId: record.id },
  })
}
</script>

<style scoped lang="scss"></style>
