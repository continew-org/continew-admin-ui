<template>
  <div class="gi_page">
    <a-card title="角色管理" class="general-card">
      <GiTable
        row-key="id"
        :data="dataList"
        :columns="columns"
        :loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
        :pagination="pagination"
        :disabledColumnKeys="['name']"
        @refresh="search"
      >
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
          <a-button v-permission="['system:role:add']" type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
        </template>
        <template #name="{ record }">
          <a-link @click="onDetail(record)">{{ record.name }}</a-link>
        </template>
        <template #status="{ record }">
          <GiCellStatus :status="record.status" />
        </template>
        <template #dataScope="{ record }">
          <GiCellTag :value="record.dataScope" :dict="data_scope_enum" />
        </template>
        <template #isSystem="{ record }">
          <a-tag v-if="record.isSystem" color="red" size="small">是</a-tag>
          <a-tag v-else color="arcoblue" size="small">否</a-tag>
        </template>
        <template #action="{ record }">
          <a-space>
            <a-link v-permission="['system:role:update']" @click="onUpdate(record)">修改</a-link>
            <a-link
              v-permission="['system:role:delete']"
              status="danger"
              :title="record.isSystem ? '系统内置数据不能删除' : undefined"
              :disabled="record.disabled"
              @click="onDelete(record)"
            >
              删除
            </a-link>
          </a-space>
        </template>
      </GiTable>

      <RoleAddModal ref="RoleAddModalRef" @save-success="search" />
      <RoleDetailDrawer ref="RoleDetailDrawerRef" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { listRole, deleteRole, type RoleResp } from '@/apis'
import RoleAddModal from './RoleAddModal.vue'
import RoleDetailDrawer from './RoleDetailDrawer.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { isMobile } from '@/utils'
import has from '@/utils/has'
import { DisEnableStatusList } from '@/constant/common'

defineOptions({ name: 'SystemRole' })

const { data_scope_enum } = useDict('data_scope_enum')

const columns: TableInstanceColumns[] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize)
  },
  { title: '名称', dataIndex: 'name', slotName: 'name', ellipsis: true, tooltip: true },
  { title: '编码', dataIndex: 'code', ellipsis: true, tooltip: true },
  { title: '状态', slotName: 'status', align: 'center' },
  { title: '数据权限', dataIndex: 'dataScope', slotName: 'dataScope', ellipsis: true, tooltip: true },
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
    width: 200,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:role:update', 'system:role:delete'])
  }
]

const queryForm = reactive({
  description: undefined,
  status: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listRole({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.description = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (item: RoleResp) => {
  return handleDelete(() => deleteRole(item.id), { content: `是否确定删除角色 [${item.name}]？`, showModal: true })
}

const RoleAddModalRef = ref<InstanceType<typeof RoleAddModal>>()
// 新增
const onAdd = () => {
  RoleAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (item: RoleResp) => {
  RoleAddModalRef.value?.onUpdate(item.id)
}

const RoleDetailDrawerRef = ref<InstanceType<typeof RoleDetailDrawer>>()
// 详情
const onDetail = (item: RoleResp) => {
  RoleDetailDrawerRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
