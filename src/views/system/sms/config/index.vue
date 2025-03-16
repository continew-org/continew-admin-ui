<script setup lang="ts">
import { reactive, ref } from 'vue'
import SmsConfigAddModal from './SmsConfigAddModal.vue'
import { type SmsConfigQuery, type SmsConfigResp, deleteSmsConfig, exportSmsConfig, listSmsConfig } from '@/apis/system/smsConfig'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useDownload, useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'SmsConfig' })

const { dis_enable_status_enum, sms_supplier_enum } = useDict('dis_enable_status_enum', 'sms_supplier_enum')

const queryForm = reactive<SmsConfigQuery>({
  name: undefined,
  supplier: undefined,
  accessKeyId: undefined,
  signature: undefined,
  templateId: undefined,
  isEnable: undefined,
  sort: ['id,desc'],
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete,
} = useTable((page) => listSmsConfig({ ...queryForm, ...page }), { immediate: true })
const columns = ref<TableInstanceColumns[]>([
  // { title: 'ID', dataIndex: 'id', slotName: 'id' },
  { title: '名称', dataIndex: 'name', slotName: 'name', width: 120 },
  { title: '厂商名称', dataIndex: 'supplier', slotName: 'supplier' },
  { title: 'API Key', dataIndex: 'accessKeyId', slotName: 'accessKeyId' },
  { title: 'API Secret', dataIndex: 'accessKeySecret', slotName: 'accessKeySecret' },
  { title: '短信签名', dataIndex: 'signature', slotName: 'signature' },
  { title: '模板 ID', dataIndex: 'templateId', slotName: 'templateId' },
  { title: '负载均衡权重', dataIndex: 'weight', slotName: 'weight' },
  { title: '自动重试间隔时间（秒）', dataIndex: 'retryInterval', slotName: 'retryInterval' },
  { title: '短信重试次数', dataIndex: 'maxRetries', slotName: 'maxRetries' },
  { title: '发送数量上限', dataIndex: 'maximum', slotName: 'maximum' },
  { title: '厂商独立配置', dataIndex: 'supplierConfig', slotName: 'supplierConfig' },
  { title: '是否启用', dataIndex: 'isEnable', slotName: 'isEnable' },
  { title: '创建人', dataIndex: 'createUserString', slotName: 'createUser' },
  { title: '创建时间', dataIndex: 'createTime', slotName: 'createTime' },
  { title: '修改人', dataIndex: 'updateUserString', slotName: 'updateUser' },
  { title: '修改时间', dataIndex: 'updateTime', slotName: 'updateTime' },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    width: 200,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:smsConfig:detail', 'system:smsConfig:update', 'system:smsConfig:delete']),
  },
])

// 重置
const reset = () => {
  queryForm.name = undefined
  queryForm.supplier = undefined
  queryForm.accessKeyId = undefined
  queryForm.signature = undefined
  queryForm.templateId = undefined
  queryForm.isEnable = undefined
  search()
}

// 删除
const onDelete = (record: SmsConfigResp) => {
  return handleDelete(() => deleteSmsConfig(record.id), {
    content: `是否确定删除该条数据？`,
    showModal: true,
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportSmsConfig(queryForm))
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

// 跳转到短信记录页面
const showRecord = (record: SmsConfigResp) => {
  router.push({
    path: '/system/sms/record',
    query: { id: record.id },
  })
}
</script>

<template>
  <div class="gi_table_page">
    <GiTable
      title="短信服务配置管理"
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
        <a-input-search v-model="queryForm.name" placeholder="请输入名称" allow-clear @search="search" />
        <a-select
          v-model="queryForm.supplier"
          :options="sms_supplier_enum"
          placeholder="请选择厂商名称标识"
          allow-clear
          style="width: 150px"
          @change="search"
        />
        <a-input-search v-model="queryForm.accessKeyId" placeholder="请输入Access Key 或 API Key" allow-clear @search="search" />
        <a-input-search v-model="queryForm.signature" placeholder="请输入短信签名" allow-clear @search="search" />
        <a-input-search v-model="queryForm.templateId" placeholder="请输入模板 ID" allow-clear @search="search" />
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <template #default>重置</template>
        </a-button>
      </template>
      <template #toolbar-right>
        <a-button v-permission="['system:smsConfig:add']" type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <template #default>新增</template>
        </a-button>
        <a-button v-permission="['system:smsConfig:export']" @click="onExport">
          <template #icon><icon-download /></template>
          <template #default>导出</template>
        </a-button>
      </template>
      <template #supplier="{ record }">
        <GiCellTag :value="record.supplier" :dict="sms_supplier_enum" />
      </template>
      <template #isEnable="{ record }">
        <GiCellTag :value="record.isEnable" :dict="dis_enable_status_enum" />
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link v-permission="['system:smsRecord:list']" title="发送记录" @click="showRecord(record)">发送记录</a-link>
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
  </div>
</template>

<style scoped lang="scss"></style>
