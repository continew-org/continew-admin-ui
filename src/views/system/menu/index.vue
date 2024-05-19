<template>
  <div class="table-page">
    <GiTable
      ref="tableRef"
      title="菜单管理"
      row-key="id"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1700 }"
      :pagination="false"
      :disabled-column-keys="['title']"
      @refresh="search"
    >
      <template #expand-icon="{ expanded }">
        <IconDown v-if="expanded" />
        <IconRight v-else />
      </template>
      <template #custom-left>
        <a-input v-model="queryForm.title" placeholder="请输入菜单标题" allow-clear @change="search">
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
        <a-button v-permission="['system:menu:add']" type="primary" @click="onAdd()">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
        <a-tooltip content="展开/折叠">
          <a-button class="gi_hover_btn-border" @click="onExpanded">
            <template #icon>
              <icon-list v-if="!isExpanded" />
              <icon-mind-mapping v-else />
            </template>
          </a-button>
        </a-tooltip>
      </template>
      <template #title="{ record }">
        <GiSvgIcon :name="record.icon" :size="15" />
        <span style="margin-left: 5px; vertical-align: middle">{{ record.title }}</span>
      </template>
      <template #type="{ record }">
        <a-tag v-if="record.type === 1" color="arcoblue">目录</a-tag>
        <a-tag v-if="record.type === 2" color="green">菜单</a-tag>
        <a-tag v-if="record.type === 3">按钮</a-tag>
      </template>
      <template #status="{ record }">
        <GiCellStatus :status="record.status" />
      </template>
      <template #isExternal="{ record }">
        <a-tag v-if="record.isExternal" color="arcoblue" size="small">是</a-tag>
        <a-tag v-else color="red" size="small">否</a-tag>
      </template>
      <template #isHidden="{ record }">
        <a-tag v-if="record.isHidden" color="arcoblue" size="small">是</a-tag>
        <a-tag v-else color="red" size="small">否</a-tag>
      </template>
      <template #isCache="{ record }">
        <a-tag v-if="record.isCache" color="arcoblue" size="small">是</a-tag>
        <a-tag v-else color="red" size="small">否</a-tag>
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link v-permission="['system:menu:update']" @click="onUpdate(record)">修改</a-link>
          <a-link v-permission="['system:menu:add']" :disabled="![1, 2].includes(record.type)" @click="onAdd(record.id)">
            新增
          </a-link>
          <a-link v-permission="['system:menu:delete']" status="danger" @click="onDelete(record)">删除</a-link>
        </a-space>
      </template>
    </GiTable>

    <MenuAddModal ref="MenuAddModalRef" :menus="dataList" @save-success="search" />
  </div>
</template>

<script setup lang="ts">
import MenuAddModal from './MenuAddModal.vue'
import { type MenuQuery, type MenuResp, deleteMenu, listMenu } from '@/apis'
import type GiTable from '@/components/GiTable/index.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { DisEnableStatusList } from '@/constant/common'
import { isMobile } from '@/utils'
import has from '@/utils/has'
import { useTable } from '@/hooks'

defineOptions({ name: 'SystemMenu' })

const queryForm = reactive<MenuQuery>({
  sort: ['parentId,asc', 'sort,asc', 'createTime,desc']
})

const {
  tableData: dataList,
  loading,
  search,
  handleDelete
} = useTable(() => listMenu(queryForm), { immediate: true })

const columns: TableInstanceColumns[] = [
  { title: '菜单标题', dataIndex: 'title', slotName: 'title', width: 170, fixed: !isMobile() ? 'left' : undefined },
  { title: '类型', slotName: 'type', align: 'center' },
  { title: '状态', slotName: 'status', align: 'center' },
  { title: '排序', dataIndex: 'sort', align: 'center', show: false },
  { title: '路由地址', dataIndex: 'path', ellipsis: true, tooltip: true },
  { title: '组件名称', dataIndex: 'name', ellipsis: true, tooltip: true },
  { title: '组件路径', dataIndex: 'component', width: 180, ellipsis: true, tooltip: true },
  { title: '权限标识', dataIndex: 'permission', width: 180, ellipsis: true, tooltip: true },
  { title: '外链', slotName: 'isExternal', align: 'center' },
  { title: '隐藏', slotName: 'isHidden', align: 'center' },
  { title: '缓存', slotName: 'isCache', align: 'center' },
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
    show: has.hasPermOr(['system:menu:update', 'system:menu:delete', 'system:menu:add'])
  }
]

// 重置
const reset = () => {
  queryForm.title = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (item: MenuResp) => {
  return handleDelete(() => deleteMenu(item.id), {
    content: `是否确定删除 [${item.title}]？`,
    showModal: true
  })
}

const isExpanded = ref(false)
const tableRef = ref<InstanceType<typeof GiTable>>()
// 展开/折叠
const onExpanded = () => {
  isExpanded.value = !isExpanded.value
  tableRef.value?.tableRef?.expandAll(isExpanded.value)
}

const MenuAddModalRef = ref<InstanceType<typeof MenuAddModal>>()
// 新增
const onAdd = (parentId?: string) => {
  MenuAddModalRef.value?.onAdd(parentId)
}

// 修改
const onUpdate = (item: MenuResp) => {
  MenuAddModalRef.value?.onUpdate(item.id)
}
</script>

<style lang="scss" scoped></style>
