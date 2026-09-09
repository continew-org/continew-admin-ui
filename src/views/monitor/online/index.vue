<template>
  <GiPageLayout>
    <GiTable
      row-key="sessionId"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      @refresh="search"
    >
      <template #toolbar-left>
        <a-input-search v-model="queryForm.nickname" placeholder="搜索用户名/昵称" allow-clear @search="search" />
        <DateRangePicker v-model="queryForm.loginTime" @change="search" />
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <template #default>重置</template>
        </a-button>
      </template>
      <template #nickname="{ record }">{{ record.nickname }}({{ record.username }})</template>
      <template #action="{ record }">
        <a-space>
          <a-popconfirm
            type="warning"
            content="是否确定强退该用户？"
            :ok-button-props="{ status: 'danger' }"
            @ok="handleKickout(record.sessionId)"
          >
            <a-link
              v-permission="['monitor:online:kickout']"
              status="danger"
              :title="isCurrentSession(record.sessionId) ? '不能强退自己' : '强退'"
              :disabled="isCurrentSession(record.sessionId)"
            >
              强退
            </a-link>
          </a-popconfirm>
        </a-space>
      </template>
    </GiTable>
  </GiPageLayout>
</template>

<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import { type OnlineUserQuery, kickout, listOnlineUser } from '@/apis/monitor'
import DateRangePicker from '@/components/DateRangePicker/index.vue'
import { getSessionId } from '@/features/auth-session/access-token'
import { useTable } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'

defineOptions({ name: 'MonitorOnline' })

const queryForm = reactive<OnlineUserQuery>({})

// 服务端同样禁止强退自己；这里提前禁用按钮，避免用户点击后才收到错误提示。
const isCurrentSession = (sessionId: string) => {
  const currentSessionId = getSessionId()
  return !!currentSessionId && currentSessionId === sessionId
}

const {
  tableData: dataList,
  loading,
  pagination,
  search,
} = useTable((page) => listOnlineUser({ ...queryForm, ...page }), { immediate: true })
const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
  },
  { title: '用户昵称', dataIndex: 'nickname', slotName: 'nickname', ellipsis: true, tooltip: true },
  { title: '登录 IP', dataIndex: 'ip', ellipsis: true, tooltip: true },
  { title: '登录地点', dataIndex: 'address', ellipsis: true, tooltip: true },
  { title: '浏览器', dataIndex: 'browser', ellipsis: true, tooltip: true },
  { title: '终端系统', dataIndex: 'os', ellipsis: true, tooltip: true },
  { title: '登录时间', dataIndex: 'loginTime', width: 180 },
  { title: '最后刷新时间', dataIndex: 'lastRefreshTime', width: 180 },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['monitor:online:kickout']),
  },
]

// 重置
const reset = () => {
  queryForm.nickname = undefined
  queryForm.loginTime = undefined
  search()
}

// 强退
const handleKickout = (sessionId: string) => {
  kickout(sessionId).then(() => {
    search()
    Message.success('强退成功')
  })
}
</script>

<style scoped lang="scss"></style>
