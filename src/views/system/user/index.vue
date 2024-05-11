<template>
  <div class="gi_page">
    <a-card title="用户管理" class="general-card">
      <a-row :gutter="16">
        <a-col :xs="0" :md="4" :lg="4" :xl="4" :xxl="4">
          <a-input v-model="deptName" placeholder="请输入部门名称" allow-clear style="margin-bottom: 10px">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-tree
            ref="treeRef"
            :data="deptList"
            :selected-keys="selectedKeys"
            default-expand-all
            show-line
            block-node
            @select="handleSelectDept"
          >
          </a-tree>
        </a-col>
        <a-col :xs="24" :md="20" :lg="20" :xl="20" :xxl="20">
          <GiTable
            row-key="id"
            :data="dataList"
            :columns="columns"
            :loading="loading"
            :scroll="{ x: '100%', y: '100%', minWidth: 1500 }"
            :pagination="pagination"
            :disabled-tools="['size']"
            :disabled-column-keys="['username']"
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
              <a-button v-permission="['system:user:add']" type="primary" @click="onAdd">
                <template #icon><icon-plus /></template>
                <span>新增</span>
              </a-button>
              <a-tooltip content="导出">
                <a-button v-permission="['system:user:export']" class="gi_hover_btn-border" @click="onExport">
                  <template #icon>
                    <icon-download />
                  </template>
                </a-button>
              </a-tooltip>
            </template>
            <template #username="{ record }">
              <GiCellAvatar
                :avatar="getAvatar(record.avatar, record.gender)"
                :name="record.username"
                is-link
                @click="onDetail(record)"
              />
            </template>
            <template #gender="{ record }">
              <GiCellGender :gender="record.gender" />
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
                <a-link v-permission="['system:user:update']" @click="onUpdate(record)">修改</a-link>
                <a-link
                  v-permission="['system:user:delete']"
                  status="danger"
                  :title="record.isSystem ? '系统内置数据不能删除' : '删除'"
                  :disabled="record.disabled"
                  @click="onDelete(record)"
                >
                  删除
                </a-link>
                <a-dropdown>
                  <a-link v-if="has.hasPermOr(['system:user:resetPwd'])" type="text">更多</a-link>
                  <template #content>
                    <a-doption v-permission="['system:user:resetPwd']" @click="onResetPwd(record)">重置密码</a-doption>
                  </template>
                </a-dropdown>
              </a-space>
            </template>
          </GiTable>
        </a-col>
      </a-row>
    </a-card>

    <UserAddModal ref="UserAddModalRef" @save-success="search" />
    <UserDetailDrawer ref="UserDetailDrawerRef" />
    <UserResetPwdModal ref="UserResetPwdModalRef" />
  </div>
</template>

<script setup lang="ts">
import type { TreeInstance } from '@arco-design/web-vue'
import UserAddModal from './UserAddModal.vue'
import UserDetailDrawer from './UserDetailDrawer.vue'
import UserResetPwdModal from './UserResetPwdModal.vue'
import { type UserQuery, type UserResp, deleteUser, exportUser, listUser } from '@/apis'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useDownload, useTable } from '@/hooks'
import { useDept } from '@/hooks/app'
import { isMobile } from '@/utils'
import getAvatar from '@/utils/avatar'
import has from '@/utils/has'
import { DisEnableStatusList } from '@/constant/common'

defineOptions({ name: 'SystemUser' })

const queryForm = reactive<UserQuery>({
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listUser({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

const columns: TableInstanceColumns[] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
    fixed: !isMobile() ? 'left' : undefined
  },
  {
    title: '用户名',
    slotName: 'username',
    width: 140,
    ellipsis: true,
    tooltip: true,
    fixed: !isMobile() ? 'left' : undefined
  },
  { title: '昵称', dataIndex: 'nickname', width: 120, ellipsis: true, tooltip: true },
  { title: '状态', slotName: 'status', align: 'center' },
  { title: '性别', slotName: 'gender', align: 'center' },
  { title: '所属部门', dataIndex: 'deptName', ellipsis: true, tooltip: true },
  { title: '手机号', dataIndex: 'phone', width: 170, ellipsis: true, tooltip: true },
  { title: '邮箱', dataIndex: 'email', width: 170, ellipsis: true, tooltip: true },
  { title: '系统内置', slotName: 'isSystem', width: 100, align: 'center', show: false },
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
    show: has.hasPermOr(['system:user:update', 'system:user:delete', 'system:user:resetPwd'])
  }
]

// 重置
const reset = () => {
  queryForm.description = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (item: UserResp) => {
  return handleDelete(() => deleteUser(item.id), {
    content: `是否确定删除 [${item.nickname}(${item.username})]？`,
    showModal: true
  })
}

// 导出
const onExport = () => {
  useDownload(() => exportUser(queryForm))
}

const treeRef = ref<TreeInstance>()
const deptName = ref('')
// 查询部门列表
const { deptList, getDeptList } = useDept({
  onSuccess: () => {
    nextTick(() => {
      treeRef.value?.expandAll(true)
      queryForm.deptId = deptList.value[0]?.key as string
      search()
    })
  }
})
const selectedKeys = computed(() => {
  return [queryForm.deptId ? queryForm.deptId : '']
})
watch(deptName, (val) => {
  getDeptList(val)
})

// 根据选中部门查询
const handleSelectDept = (keys: Array<any>) => {
  queryForm.deptId = keys.length === 1 ? keys[0] : undefined
  search()
}

const UserAddModalRef = ref<InstanceType<typeof UserAddModal>>()
// 新增
const onAdd = () => {
  UserAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (item: UserResp) => {
  UserAddModalRef.value?.onUpdate(item.id)
}

const UserDetailDrawerRef = ref<InstanceType<typeof UserDetailDrawer>>()
// 详情
const onDetail = (item: UserResp) => {
  UserDetailDrawerRef.value?.onDetail(item.id)
}

const UserResetPwdModalRef = ref<InstanceType<typeof UserResetPwdModal>>()
// 重置密码
const onResetPwd = (item: UserResp) => {
  UserResetPwdModalRef.value?.onReset(item.id)
}

onMounted(() => {
  getDeptList()
})
</script>

<style lang="scss" scoped></style>
