<template>
  <div class="gi_page">
    <a-card title="公告" class="general-card">
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
          <a-input v-model="queryForm.title" placeholder="请输入公告标题" allow-clear @change="search">
            <template #prefix>
              <icon-search />
            </template>
          </a-input>
          <a-select
            v-model="queryForm.status"
            :options="announcement_type"
            placeholder="请选择类型"
            allow-clear
            style="width: 150px"
            @change="search"
          />
          <a-button @click="reset">重置</a-button>
        </template>
        <template #custom-right>
          <a-button v-permission="['system:notice:add']" type="primary" @click="onAdd">
            <template #icon>
              <icon-plus />
            </template>
            <span>新增</span>
          </a-button>
        </template>
        <template #title="{ record }">
          <a-link @click="openDetail(record)">{{ record.title }}</a-link>
        </template>
        <template #type="{ record }">
          <GiCellTag :value="record.type" :dict="announcement_type" />
        </template>
        <template #status="{ record }">
          <GiCellTag :value="record.status" :dict="announcement_status_enum" />
        </template>
        <template #action="{ record }">
          <a-space>
            <a-link v-permission="['system:notice:update']" @click="onUpdate(record)">修改</a-link>
            <a-link v-permission="['system:notice:delete']" status="danger" @click="onDelete(record)"> 删除 </a-link>
          </a-space>
        </template>
      </GiTable>
    </a-card>
  </div>

  <AnnouncementAddModal ref="AnnouncementAddModalRef" @save-success="search" />
</template>
<script lang="ts" setup>
import { listAnnouncement, delAnnouncement, type AnnouncementResp } from '@/apis'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { isMobile } from '@/utils'
import AnnouncementAddModal from './AnnouncementAddModal.vue'
import type { TableInstanceColumns } from '@/components/GiTable/type'

defineOptions({ name: 'Announcement' })

const { announcement_type, announcement_status_enum } = useDict('announcement_type', 'announcement_status_enum')
const columns: TableInstanceColumns[] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize)
  },
  { title: '标题', dataIndex: 'title', slotName: 'title', ellipsis: true, tooltip: true },
  { title: '类型', slotName: 'type', align: 'center' },
  { title: '状态', slotName: 'status', align: 'center' },
  { title: '生效时间', dataIndex: 'effectiveTime', width: 180 },
  { title: '终止时间', dataIndex: 'terminateTime', width: 180 },
  { title: '创建人', dataIndex: 'createUserString', show: false, ellipsis: true, tooltip: true },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', slotName: 'action', width: 200, align: 'center', fixed: !isMobile() ? 'right' : undefined }
]

const queryForm = reactive({
  title: undefined,
  status: undefined,
  sort: ['createTime,desc']
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete
} = useTable((p) => listAnnouncement({ ...queryForm, page: p.page, size: p.size }), { immediate: true })

// 重置
const reset = () => {
  queryForm.title = undefined
  queryForm.status = undefined
  search()
}

// 删除
const onDelete = (item: AnnouncementResp) => {
  return handleDelete(() => delAnnouncement(item.id), {
    content: `是否确定删除公告 [${item.title}]？`,
    showModal: true
  })
}

const AnnouncementAddModalRef = ref<InstanceType<typeof AnnouncementAddModal>>()

// 新增
const onAdd = () => {
  AnnouncementAddModalRef.value?.onAdd()
}

// 修改
const onUpdate = (item: AnnouncementResp) => {
  AnnouncementAddModalRef.value?.onUpdate(item.id)
}

// 打开详情
const openDetail = (item: AnnouncementResp) => {
  // RoleDetailDrawerRef.value?.open(item.id)
}
</script>

<style scoped lang="less">
:deep(.github-markdown-body) {
  padding: 16px 32px 5px;
}

:deep(.arco-form-item-label-tooltip) {
  margin-left: 3px;
}

.meta-data {
  font-size: 15px;
  text-align: center;
}

.icon {
  margin-right: 3px;
}

.update-time-row {
  text-align: right;
}
</style>

<style scoped lang="less">
:deep(.github-markdown-body) {
  padding: 16px 32px 5px;
}

:deep(.arco-form-item-label-tooltip) {
  margin-left: 3px;
}

.meta-data {
  font-size: 15px;
  text-align: center;
}

.icon {
  margin-right: 3px;
}

.update-time-row {
  text-align: right;
}
</style>
