<template>
  <a-card
    class="general-card"
    title="公告"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '15px 20px 13px 20px' }"
  >
    <template #extra>
      <a-link @click="open">更多</a-link>
    </template>
    <a-skeleton v-if="loading" :loading="loading" :animation="true">
      <a-skeleton-line :rows="5" />
    </a-skeleton>
    <div v-else>
      <a-empty v-if="dataList.length === 0">暂无公告</a-empty>
      <div v-else>
        <div v-for="(item, idx) in dataList" :key="idx" class="item">
          <GiCellTag :value="item.type" :dict="notice_type" />
          <a-link class="item-content" @click="onDetail(item.id)">
            <a-typography-paragraph
              :ellipsis="{
                rows: 1,
                showTooltip: true,
                css: true,
              }"
            >
              {{ item.title }}
            </a-typography-paragraph>
          </a-link>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { type DashboardNoticeResp, listDashboardNotice } from '@/apis'
import { useDict } from '@/hooks/app'

const { notice_type } = useDict('notice_type')

const dataList = ref<DashboardNoticeResp[]>([])
const loading = ref(false)
// 查询列表数据
const getDataList = async () => {
  try {
    loading.value = true
    const res = await listDashboardNotice()
    dataList.value = res.data
  } finally {
    loading.value = false
  }
}

const router = useRouter()
// 详情
const onDetail = (id: number) => {
  router.push({ path: '/user/notice', query: { id } })
}

// 打开消息中心
const open = () => {
  router.push({ path: '/user/message', query: { tab: 'notice' } })
}

onMounted(() => {
  getDataList()
})
</script>

<style scoped lang="less">
:deep(.arco-typography) {
  color: var(--color-text-2);
}

.item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  margin-bottom: 4px;
  .item-content {
    flex: 1;
    justify-content: flex-start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 4px;
    color: var(--color-text-2);
    text-decoration: none;
    font-size: 13px;
    cursor: pointer;
  }
}
</style>
