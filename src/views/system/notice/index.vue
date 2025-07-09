<template>
  <GiPageLayout>
    <GiTable
      row-key="id"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      :disabled-column-keys="['title']"
      @refresh="search"
    >
      <template #toolbar-left>
        <a-input-search v-model="queryForm.title" placeholder="搜索标题" allow-clear @search="search" />
        <a-select
          v-model="queryForm.type"
          :options="notice_type"
          placeholder="请选择分类"
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
        <a-button v-permission="['system:notice:create']" type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <template #default>新增</template>
        </a-button>
      </template>
      <template #noticeScope="{ record }">
        <GiCellTag :value="record.noticeScope" :dict="notice_scope_enum" />
      </template>
      <template #noticeMethods="{ record }">
        <span v-if="!record.noticeMethods">无</span>
        <GiCellTags v-else :data="formatNoticeMethods(record.noticeMethods)" />
      </template>
      <template #type="{ record }">
        <GiCellTag :value="record.type" :dict="notice_type" />
      </template>
      <template #status="{ record }">
        <GiCellTag :value="record.status" :dict="notice_status_enum" />
      </template>
      <template #isTiming="{ record }">
        <a-tag v-if="record.isTiming" color="arcoblue">是</a-tag>
        <a-tag v-else color="red">否</a-tag>
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link v-permission="['system:notice:get']" title="详情" @click="onDetail(record)">详情</a-link>
          <a-link v-permission="['system:notice:view']" title="预览" @click="onView(record)">查看</a-link>
          <a-dropdown>
            <a-button v-if="has.hasPermOr(['system:notice:update', 'system:notice:delete'])" type="text" size="mini" title="更多">
              <template #icon>
                <icon-more :size="16" />
              </template>
            </a-button>
            <template #content>
              <a-doption v-permission="['system:notice:update']">
                <a-link title="修改" @click="onUpdate(record)">修改</a-link>
              </a-doption>
              <a-doption v-permission="['system:notice:delete']">
                <a-link status="danger" title="删除" @click="onDelete(record)">删除</a-link>
              </a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </template>
    </GiTable>

    <NoticeDetailDrawer ref="NoticeDetailDrawerRef" />
  </GiPageLayout>
</template>

<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'
import NoticeDetailDrawer from './NoticeDetailDrawer.vue'
import { type NoticeQuery, type NoticeResp, deleteNotice, listNotice } from '@/apis/system'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'SystemNotice' })

const { notice_type, notice_scope_enum, notice_method_enum, notice_status_enum } = useDict('notice_type', 'notice_scope_enum', 'notice_method_enum', 'notice_status_enum')

const router = useRouter()
const queryForm = reactive<NoticeQuery>({
  sort: ['id,desc'],
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete,
} = useTable((page) => listNotice({ ...queryForm, ...page }), { immediate: true })
const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
  },
  { title: '公告标题', dataIndex: 'title', slotName: 'title', maxWidth: 180, ellipsis: true, tooltip: true },
  { title: '发布人', dataIndex: 'createUserString', maxWidth: 120, ellipsis: true, tooltip: true },
  { title: '通知范围', dataIndex: 'noticeScope', slotName: 'noticeScope', width: 110, align: 'center' },
  { title: '通知方式', dataIndex: 'noticeMethods', slotName: 'noticeMethods', maxWidth: 165, ellipsis: true, tooltip: true },
  { title: '分类', dataIndex: 'type', slotName: 'type', maxWidth: 100, align: 'center' },
  { title: '状态', dataIndex: 'status', slotName: 'status', maxWidth: 100, align: 'center' },
  { title: '是否定时', dataIndex: 'isTiming', slotName: 'isTiming', width: 110, align: 'center' },
  { title: '发布时间', dataIndex: 'publishTime', slotName: 'publishTime', width: 180 },
  { title: '是否置顶', dataIndex: 'isTop', slotName: 'isTop', show: false, maxWidth: 100, align: 'center' },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    width: 160,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['system:notice:get', 'system:notice:view', 'system:notice:update', 'system:notice:delete']),
  },
]

// 重置
const reset = () => {
  queryForm.title = undefined
  queryForm.type = undefined
  search()
}

// 删除
const onDelete = (record: NoticeResp) => {
  return handleDelete(() => deleteNotice(record.id), {
    content: `是否确定删除公告「${record.title}」？`,
    showModal: true,
  })
}

// 新增
const onAdd = () => {
  router.push({ path: '/system/notice/add' })
}

// 修改
const onUpdate = (record: NoticeResp) => {
  router.push({ path: '/system/notice/add', query: { id: record.id, type: 'update' } })
}

const NoticeDetailDrawerRef = ref<InstanceType<typeof NoticeDetailDrawer>>()
// 详情
const onDetail = (record: NoticeResp) => {
  NoticeDetailDrawerRef.value?.onOpen(record.id)
}

// 查看
const onView = (record: NoticeResp) => {
  router.push({ path: '/system/notice/view', query: { id: record.id } })
}

// 格式化通知方式（转换为GiCellTags所需格式）
const formatNoticeMethods = (noticeMethods: string[]) => {
  return noticeMethods.map((method) => {
    const dictItem = notice_method_enum.value.find((item) => item.value === method)
    return dictItem?.label || method
  })
}
</script>

<style scoped lang="scss"></style>
