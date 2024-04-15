<template>
  <div class="gi_page">
    <a-card title="用户管理" class="general-card">
      <a-row :gutter="16">
        <a-col :xs="0" :md="4" :lg="4" :xl="4" :xxl="4">
          <a-input v-model="deptName" placeholder="请输入部门名称" allow-clear style="margin-bottom: 10px">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-tree ref="treeRef" :data="deptList" default-expand-all show-line block-node @select="handleSelectDept">
          </a-tree>
        </a-col>

        <a-col :xs="24" :md="20" :lg="20" :xl="20" :xxl="20">
          <GiTable
            ref="tableRef"
            row-key="id"
            :data="dataList"
            :columns="columns"
            :loading="loading"
            :scroll="{ x: '100%', y: '100%', minWidth: 1500 }"
            :pagination="pagination"
            :disabledColumnKeys="['nickname']"
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
              <a-button type="primary" @click="onAdd">
                <template #icon><icon-plus /></template>
                <span>新增</span>
              </a-button>
              <a-tooltip content="导出">
                <a-button @click="onExport">
                  <template #icon>
                    <icon-download />
                  </template>
                </a-button>
              </a-tooltip>
            </template>
            <template #nickname="{ record }">
              <GiCellAvatar
                :avatar="getAvatar(record.avatar, record.gender)"
                :name="record.nickname"
                is-link
                @click="openDetail(record)"
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
                <template #split>
                  <a-divider direction="vertical" :margin="0" />
                </template>
                <a-link @click="onUpdate(record)">修改</a-link>
                <a-link
                  status="danger"
                  :title="record.isSystem ? '系统内置数据不能删除' : '删除'"
                  :disabled="record.disabled"
                  @click="onDelete(record)"
                >
                  删除
                </a-link>
                <a-dropdown>
                  <a-button type="text">更多</a-button>
                  <template #content>
                    <a-doption @click="onResetPwd(record)">重置密码</a-doption>
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
import { listUser, deleteUser, exportUser, type UserResp } from '@/apis'
import type { TableInstance, TreeInstance } from '@arco-design/web-vue'
import UserAddModal from './UserAddModal.vue'
import UserDetailDrawer from './UserDetailDrawer.vue'
import UserResetPwdModal from './UserResetPwdModal.vue'
import { useTable, useDownload } from '@/hooks'
import { useDept } from '@/hooks/app'
import { isMobile } from '@/utils'
import getAvatar from '@/utils/avatar'
import { DisEnableStatusList } from '@/constant/common'

defineOptions({ name: 'User' })

const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
    fixed: !isMobile() ? 'left' : undefined
  },
  {
    title: '昵称',
    slotName: 'nickname',
    width: 170,
    ellipsis: true,
    tooltip: true,
    fixed: !isMobile() ? 'left' : undefined
  },
  { title: '用户名', dataIndex: 'username', width: 120, ellipsis: true, tooltip: true },
  { title: '状态', slotName: 'status', align: 'center' },
  { title: '性别', slotName: 'gender', align: 'center' },
  { title: '手机号', dataIndex: 'phone', width: 170, ellipsis: true, tooltip: true },
  { title: '邮箱', dataIndex: 'email', width: 170, ellipsis: true, tooltip: true },
  { title: '所属部门', dataIndex: 'deptName', ellipsis: true, tooltip: true },
  { title: '系统内置', slotName: 'isSystem', width: 100, align: 'center', show: false },
  { title: '描述', dataIndex: 'description', ellipsis: true, tooltip: true },
  { title: '创建人', dataIndex: 'createUserString', show: false, ellipsis: true, tooltip: true },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '修改人', dataIndex: 'updateUserString', show: false, ellipsis: true, tooltip: true },
  { title: '修改时间', dataIndex: 'updateTime', width: 180, show: false },
  { title: '操作', slotName: 'action', width: 200, align: 'center', fixed: !isMobile() ? 'right' : undefined }
]

const queryForm = reactive({
  description: undefined,
  status: undefined,
  deptId: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listUser({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.description = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (item: UserResp) => {
  return handleDelete(() => deleteUser(item.id), {
    content: `是否确定删除用户 [${item.nickname}(${item.username})]？`,
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
    })
  }
})
watch(deptName, (val) => {
  getDeptList(val)
})

// 根据选中部门查询
const handleSelectDept = (keys: Array<any>) => {
  if (queryForm.deptId === keys[0]) {
    queryForm.deptId = undefined
    // 如已选中，再次点击则取消选中
    treeRef.value?.selectNode(keys, false)
  } else {
    queryForm.deptId = keys.length === 1 ? keys[0] : undefined
  }
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
// 打开详情
const openDetail = (item: UserResp) => {
  UserDetailDrawerRef.value?.open(item.id)
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
