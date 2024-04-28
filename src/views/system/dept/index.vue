<template>
  <div class="gi_page">
    <a-card title="部门管理" class="general-card">
      <GiTable
        ref="tableRef"
        row-key="id"
        :data="dataList"
        :columns="columns"
        :loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
        :pagination="false"
        :disabledTools="['size']"
        :disabledColumnKeys="['name']"
        @refresh="search"
      >
        <template #expand-icon="{ expanded }">
          <IconDown v-if="expanded" />
          <IconRight v-else />
        </template>
        <template #custom-left>
          <a-input v-model="queryForm.description" placeholder="请输入关键词" allow-clear @change="search">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-select
            v-model="queryForm.status"
            :options="DisEnableStatusList"
            placeholder="请选择状态"
            allow-clear
            style="width: 150px"
            @change="search"
          />
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-button v-permission="['system:dept:add']" type="primary" @click="onAdd()">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-tooltip content="导出">
            <a-button v-permission="['system:dept:export']" class="gi_hover_btn-border" @click="onExport">
              <template #icon>
                <icon-download />
              </template>
            </a-button>
          </a-tooltip>
        </template>
        <template #status="{ record }">
          <GiCellStatus :status="record.status" />
        </template>
        <template #isSystem="{ record }">
          <a-tag v-if="record.isSystem" color="red" size="small">是</a-tag>
          <a-tag v-else color="arcoblue" size="small">否</a-tag>
        </template>
        <template #action="{ record }">
          <a-space>
            <a-link v-permission="['system:dept:update']" @click="onUpdate(record)">修改</a-link>
            <a-link v-permission="['system:dept:add']" @click="onAdd(record.id)">新增</a-link>
            <a-popconfirm
              type="warning"
              content="是否确定删除该条数据？"
              :ok-button-props="{ status: 'danger' }"
              @ok="onDelete(record)"
            >
              <a-link
                v-permission="['system:dept:delete']"
                status="danger"
                :title="record.isSystem ? '系统内置数据不能删除' : undefined"
                :disabled="record.disabled"
              >
                删除
              </a-link>
            </a-popconfirm>
          </a-space>
        </template>
      </GiTable>
    </a-card>

    <DeptAddModal ref="DeptAddModalRef" @save-success="search" />
  </div>
</template>

<script setup lang="ts">
import { listDept, deleteDept, exportDept, type DeptResp, type DeptQuery } from '@/apis'
import DeptAddModal from './DeptAddModal.vue'
import { Message } from '@arco-design/web-vue'
import type GiTable from '@/components/GiTable/index.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useDownload } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'
import { DisEnableStatusList } from '@/constant/common'

defineOptions({ name: 'SystemDept' })

const columns: TableInstanceColumns[] = [
  { title: '名称', dataIndex: 'name', width: 170, ellipsis: true, tooltip: true },
  { title: '状态', slotName: 'status', align: 'center' },
  { title: '排序', dataIndex: 'sort', align: 'center', show: false },
  { title: '系统内置', slotName: 'isSystem', align: 'center', show: false },
  { title: '描述', dataIndex: 'description', ellipsis: true, tooltip: true },
  { title: '创建人', dataIndex: 'createUserString', ellipsis: true, tooltip: true, show: false },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '修改人', dataIndex: 'updateUserString', ellipsis: true, tooltip: true, show: false },
  { title: '修改时间', dataIndex: 'updateTime', width: 180, show: false },
  {
    title: '操作',
    slotName: 'action',
    width: 180,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:dept:update', 'system:dept:delete', 'system:dept:add'])
  }
]

const queryForm = reactive({
  description: undefined,
  status: undefined,
  sort: ['parentId,asc', 'sort,asc', 'createTime,desc']
})

const dataList = ref<DeptResp[]>([])
const loading = ref(false)
const tableRef = ref<InstanceType<typeof GiTable>>()
// 查询列表数据
const getDataList = async (query: DeptQuery = { ...queryForm }) => {
  try {
    loading.value = true
    const res = await listDept(query)
    dataList.value = res.data
    await nextTick(() => {
      tableRef.value?.tableRef?.expandAll(true)
    })
  } finally {
    loading.value = false
  }
}

// 查询
const search = () => {
  getDataList()
}

// 重置
const reset = () => {
  queryForm.description = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = async (item: DeptResp) => {
  await deleteDept(item.id)
  Message.success('删除成功')
  search()
}

// 导出
const onExport = () => {
  useDownload(() => exportDept(queryForm))
}

const DeptAddModalRef = ref<InstanceType<typeof DeptAddModal>>()
// 新增
const onAdd = (parentId?: string) => {
  DeptAddModalRef.value?.onAdd(parentId)
}

// 修改
const onUpdate = (item: DeptResp) => {
  DeptAddModalRef.value?.onUpdate(item.id)
}

onMounted(() => {
  search()
})
</script>

<style lang="scss" scoped></style>
