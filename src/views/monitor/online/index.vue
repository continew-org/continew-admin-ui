<template>
  <GiPageLayout>
    <GiTable
      row-key="sessionId"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1700 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      @refresh="search"
    >
      <template #toolbar-left>
        <a-input-search v-model="queryForm.nickname" placeholder="搜索用户名/昵称" allow-clear @search="search" />
        <a-select
          v-model="queryForm.online"
          placeholder="全部状态"
          allow-clear
          style="width: 130px"
          @change="handleOnlineChange"
        >
          <a-option :value="true">在线</a-option>
          <a-option :value="false">闲置</a-option>
        </a-select>
        <DateRangePicker v-model="queryForm.loginTime" @change="search" />
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <template #default>重置</template>
        </a-button>
      </template>
      <template #nickname="{ record }">{{ record.nickname }}({{ record.username }})</template>
      <template #lastActiveTime="{ record }">
        {{ record.activeTimeExact ? record.lastActiveTime : `约 ${record.lastActiveTime}` }}
      </template>
      <template #expireTime="{ record }">
        <a-tooltip v-if="record.idleExpired" :content="`会话已于 ${record.idleExpireTime} 超出闲置阈值，下一次刷新时撤销`">
          <span style="color: var(--color-danger-light-4)">已超时</span>
        </a-tooltip>
        <template v-else>{{ record.idleExpireTime || record.sessionExpireTime }}</template>
      </template>
      <template #status="{ record }">
        <a-tag v-if="record.idleExpired" color="red">闲置超时待失效</a-tag>
        <a-tag v-else-if="record.online" color="green">在线</a-tag>
        <a-tag v-else color="orange">闲置</a-tag>
      </template>
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
  refresh,
} = useTable((page) => listOnlineUser({ ...queryForm, ...page }), { immediate: true })
const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
  },
  { title: '用户昵称', dataIndex: 'nickname', slotName: 'nickname', width: 200, ellipsis: true, tooltip: true },
  { title: '登录 IP', dataIndex: 'ip', width: 150, ellipsis: true, tooltip: true },
  { title: '登录地点', dataIndex: 'address', width: 130, ellipsis: true, tooltip: true },
  { title: '浏览器', dataIndex: 'browser', width: 140, ellipsis: true, tooltip: true },
  { title: '终端系统', dataIndex: 'os', width: 120, ellipsis: true, tooltip: true },
  { title: '登录时间', dataIndex: 'loginTime', width: 180 },
  { title: '最后活跃', dataIndex: 'lastActiveTime', slotName: 'lastActiveTime', width: 200 },
  { title: '预计失效', dataIndex: 'idleExpireTime', slotName: 'expireTime', width: 180 },
  { title: '状态', dataIndex: 'online', slotName: 'status', width: 150, align: 'center' },
  { title: '最近令牌刷新', dataIndex: 'lastRefreshTime', width: 180 },
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
  queryForm.online = undefined
  search()
}

// 切换在线状态筛选：当前已在第 1 页时页码不会变化，必须直接刷新，否则会停在旧的查询结果上
const handleOnlineChange = () => {
  if (pagination.current === 1) {
    refresh()
  } else {
    search()
  }
}

// 强退
const handleKickout = (sessionId: string) => {
  kickout(sessionId).then(() => {
    // search() 仅在页码变化时重新查询；当前已在第 1 页时必须直接拉取数据才会移除被踢行
    refresh()
    Message.success('强退成功')
  })
}
</script>

<style scoped lang="scss"></style>
