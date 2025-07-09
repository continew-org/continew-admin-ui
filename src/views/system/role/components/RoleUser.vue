<template>
  <GiTable
    v-model:selected-keys="selectedKeys"
    row-key="id"
    :data="dataList"
    :columns="columns"
    :loading="loading"
    :scroll="{ x: '100%', y: '100%', minWidth: 600 }"
    :pagination="pagination"
    :disabled-tools="['size', 'setting', 'fullscreen']"
    :disabled-column-keys="['nickname']"
    :row-selection="{ type: 'checkbox', showCheckedAll: true }"
    @select="select"
    @select-all="selectAll"
    @refresh="reset"
  >
    <template #toolbar-left>
      <a-button v-permission="['system:role:assign']" type="primary" @click="onAssign">
        <template #icon><icon-plus /></template>
        <template #default>分配角色</template>
      </a-button>
      <a-button v-permission="['system:role:unassign']" type="primary" status="danger" :disabled="!selectedKeys.length" :title="!selectedKeys.length ? '请选择' : ''" @click="onMulDelete">
        <template #icon><icon-delete /></template>
        <template #default>取消分配</template>
      </a-button>
    </template>
    <template #toolbar-right>
      <a-input-search v-model="queryForm.description" placeholder="搜索用户名/昵称/描述" allow-clear @search="search" />
      <a-button @click="reset">
        <template #icon>
          <icon-refresh />
        </template>
        <template #default>重置</template>
      </a-button>
    </template>
    <template #gender="{ record }">
      <GiCellGender :gender="record.gender" />
    </template>
    <template #roleNames="{ record }">
      <GiCellTags :data="record.roleNames" />
    </template>
    <template #status="{ record }">
      <GiCellStatus :status="record.status" />
    </template>
    <template #action="{ record }">
      <a-space>
        <a-link
          v-permission="['system:role:unassign']"
          status="danger"
          :disabled="record.disabled"
          :title="record.disabled ? '该用户为系统内置用户不能取消分配' : '取消分配'"
          @click="onDelete(record)"
        >
          取消分配
        </a-link>
      </a-space>
    </template>
  </GiTable>

  <RoleAssignModal ref="RoleAssignModalRef" @save-success="search" />
</template>

<script lang='tsx' setup>
import type { TableInstance } from '@arco-design/web-vue'
import { Message, Modal } from '@arco-design/web-vue'
import RoleAssignModal from '../RoleAssignModal.vue'
import { useResetReactive, useTable } from '@/hooks'
import { type RoleUserQuery, type RoleUserResp, listRoleUser, unassignFromUsers } from '@/apis/system/role'
import { isMobile } from '@/utils'
import has from '@/utils/has'

const props = withDefaults(defineProps<Props>(), {
  roleId: '',
})

interface Props {
  roleId: string
}

const [queryForm, resetForm] = useResetReactive<RoleUserQuery>({
  sort: ['t1.id,desc'],
})
const {
  tableData: dataList,
  loading,
  pagination,
  search,
  selectedKeys,
  select,
  selectAll,
  handleDelete,
} = useTable((page) => listRoleUser(props.roleId, { ...queryForm, ...page }), { immediate: false })
const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
    fixed: !isMobile() ? 'left' : undefined,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    slotName: 'nickname',
    minWidth: 130,
    ellipsis: true,
    tooltip: true,
    fixed: !isMobile() ? 'left' : undefined,
  },
  { title: '用户名', dataIndex: 'username', slotName: 'username', minWidth: 120, ellipsis: true, tooltip: true },
  { title: '状态', dataIndex: 'status', slotName: 'status', align: 'center' },
  { title: '性别', dataIndex: 'gender', slotName: 'gender', align: 'center' },
  { title: '所属部门', dataIndex: 'deptName', minWidth: 140, ellipsis: true, tooltip: true },
  { title: '角色', dataIndex: 'roleNames', slotName: 'roleNames', minWidth: 165 },
  { title: '描述', dataIndex: 'description', minWidth: 130, ellipsis: true, tooltip: true },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    width: 100,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr([
      'system:role:unassign',
    ]),
  },
]

// 重置
const reset = () => {
  resetForm()
  search()
}

// 批量删除
const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择数据')
  }
  Modal.warning({
    title: '提示',
    content: `是否确定取消分配角色给所选的${selectedKeys.value.length}个用户？`,
    hideCancel: false,
    onOk: async () => {
      await unassignFromUsers(selectedKeys.value)
      Message.success('取消成功')
      search()
    },
  })
}

// 删除
const onDelete = (record: RoleUserResp) => {
  return handleDelete(() => unassignFromUsers([record.id]), {
    content: `是否确定取消分配角色给用户「${record.nickname}(${record.username})」？`,
    successTip: '取消成功',
    showModal: true,
  })
}

const RoleAssignModalRef = ref<InstanceType<typeof RoleAssignModal>>()
// 分配
const onAssign = () => {
  RoleAssignModalRef.value?.onOpen(props.roleId)
}

// 监听 roleId 的变化
watch(
  () => props.roleId,
  async (newRoleId) => {
    if (newRoleId) {
      search()
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss"></style>
