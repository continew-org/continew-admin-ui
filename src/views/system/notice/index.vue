<template>
  <div class="table-page">
    <GiTable
      row-key="id"
      title="通知公告"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      :disabled-column-keys="['title']"
      @refresh="search"
    >
      <template #custom-left>
        <a-input v-model="queryForm.title" placeholder="请输入公告标题" allow-clear @change="search">
          <template #prefix><icon-search /></template>
        </a-input>
        <a-select
          v-model="queryForm.type"
          :options="notice_type"
          placeholder="请选择类型"
          allow-clear
          style="width: 150px"
          @change="search"
        />
        <a-button @click="reset">重置</a-button>
      </template>
      <template #custom-right>
        <a-button v-permission="['system:notice:add']" type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
      </template>
      <template #title="{ record }">
        <a-link @click="onDetail(record)">{{ record.title }}</a-link>
      </template>
      <template #type="{ record }">
        <GiCellTag :value="record.type" :dict="notice_type" />
      </template>
      <template #status="{ record }">
        <GiCellTag :value="record.status" :dict="notice_status_enum" />
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link v-permission="['system:notice:update']" @click="onUpdate(record)">修改</a-link>
          <a-link v-permission="['system:notice:delete']" status="danger" @click="onDelete(record)"> 删除 </a-link>
        </a-space>
      </template>
    </GiTable>
    <NoticeAddModal ref="NoticeAddModalRef" @save-success="search" />
    <NoticeDetailModal ref="NoticeDetailModalRef" />
  </div>
</template>

<script lang="ts" setup>
import NoticeAddModal from './NoticeAddModal.vue'
import NoticeDetailModal from './NoticeDetailModal.vue'
import { type NoticeQuery, type NoticeResp, deleteNotice, listNotice } from '@/apis'
import type { TableInstanceColumns } from '@/components/GiTable/type'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'SystemNotice' })

const { notice_type, notice_status_enum } = useDict('notice_type', 'notice_status_enum')

const queryForm = reactive<NoticeQuery>({
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((page) => listNotice({ ...queryForm, ...page }), { immediate: true })

const columns: TableInstanceColumns[] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize)
  },
  { title: '标题', dataIndex: 'title', slotName: 'title', width: 200, ellipsis: true, tooltip: true },
  { title: '类型', slotName: 'type', align: 'center' },
  { title: '状态', slotName: 'status', align: 'center' },
  { title: '生效时间', dataIndex: 'effectiveTime', width: 180 },
  { title: '终止时间', dataIndex: 'terminateTime', width: 180 },
  { title: '创建人', dataIndex: 'createUserString', show: false, ellipsis: true, tooltip: true },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  {
    title: '操作',
    slotName: 'action',
    width: 130,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:notice:update', 'system:notice:delete'])
  }
]

// 重置
const reset = () => {
  queryForm.title = undefined
  queryForm.type = undefined
  search()
}

// 删除
const onDelete = (item: NoticeResp) => {
  return handleDelete(() => deleteNotice(item.id), {
    content: `是否确定删除公告 [${item.title}]？`,
    showModal: true
  })
}

const NoticeAddModalRef = ref<InstanceType<typeof NoticeAddModal>>()
// 新增
const onAdd = () => {
  NoticeAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (item: NoticeResp) => {
  NoticeAddModalRef.value?.onUpdate(item.id)
}

const NoticeDetailModalRef = ref<InstanceType<typeof NoticeDetailModal>>()
// 详情
const onDetail = (item: NoticeResp) => {
  NoticeDetailModalRef.value?.onDetail(item.id)
}
</script>

<style lang="scss" scoped></style>
