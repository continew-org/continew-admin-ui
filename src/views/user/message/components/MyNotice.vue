<template>
  <GiTable
    row-key="id"
    :data="dataList"
    :columns="columns"
    :loading="loading"
    :scroll="{ x: '100%', y: '100%' }"
    :pagination="pagination"
    :disabled-tools="['size', 'setting']"
    @refresh="search"
  >
    <template #toolbar-left>
      <a-input-search v-model="queryForm.title" placeholder="搜索标题" allow-clear @search="search" />
      <a-select
        v-model="queryForm.type"
        :options="notice_type"
        placeholder="请选择类型"
        allow-clear
        style="width: 150px"
        @change="search"
      />
      <a-button @click="reset">
        <template #icon><icon-refresh /></template>
        <template #default>重置</template>
      </a-button>
    </template>
    <template #title="{ record }">
      <a-link @click="onView(record)">
        <a-typography-paragraph
          class="link-text"
          :ellipsis="{
            rows: 1,
            showTooltip: true,
            css: true,
          }"
        >
          {{ record.title }}
        </a-typography-paragraph>
      </a-link>
    </template>
    <template #type="{ record }">
      <GiCellTag :value="record.type" :dict="notice_type" />
    </template>
    <template #isRead="{ record }">
      <a-tag :color="record.isRead ? '' : 'arcoblue'">
        {{ record.isRead ? '已读' : '未读' }}
      </a-tag>
    </template>
  </GiTable>
</template>

<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'
import { type NoticeQuery, type NoticeResp, listUserNotice } from '@/apis/system'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'

defineOptions({ name: 'UserMyNotice' })

const { notice_type } = useDict('notice_type')

const queryForm = reactive<NoticeQuery>({
  sort: ['createTime,desc'],
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
} = useTable((page) => listUserNotice({ ...queryForm, ...page }), { immediate: true })

const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
  },
  { title: '公告标题', dataIndex: 'title', slotName: 'title', ellipsis: true, tooltip: true },
  { title: '分类', dataIndex: 'type', slotName: 'type', align: 'center' },
  { title: '状态', dataIndex: 'isRead', slotName: 'isRead', align: 'center' },
  { title: '发布人', dataIndex: 'createUserString', ellipsis: true, tooltip: true },
  { title: '发布时间', dataIndex: 'publishTime', width: 180 },
]

// 重置
const reset = () => {
  queryForm.title = undefined
  queryForm.type = undefined
  search()
}

const router = useRouter()
// 查看
const onView = (record: NoticeResp) => {
  router.push({ path: '/user/notice', query: { id: record.id } })
}
</script>

<style scoped lang="scss"></style>
