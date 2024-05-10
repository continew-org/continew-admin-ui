<template>
  <a-card title="公告" :bordered="false" class="gi_card_title">
    <template #extra>
      <a-link href="/#/system/notice">更多</a-link>
    </template>
    <a-empty v-if="dataList.length === 0">暂无公告</a-empty>
    <a-comment
      v-for="(item, index) in dataList"
      :key="index"
      align="right"
      :class="`animated-fade-up-${index}`"
      style="overflow: hidden"
    >
      <template #content>
        <div class="content">
          <GiCellTag :value="item.type" :dict="notice_type" />
          <p>
            <a-link @click="onDetail(item.id)">{{ item.title }}</a-link>
          </p>
        </div>
      </template>
    </a-comment>
  </a-card>

  <NoticeDetailModal ref="NoticeDetailModalRef" />
</template>

<script setup lang="ts">
import { type DashboardNoticeResp, listDashboardNotice } from '@/apis'
import { useDict } from '@/hooks/app'
import NoticeDetailModal from '@/views/system/notice/NoticeDetailModal.vue'

const { notice_type } = useDict('notice_type')

const dataList = ref<DashboardNoticeResp[]>([])
// 查询列表数据
const getDataList = async () => {
  const res = await listDashboardNotice()
  dataList.value = res.data
}

const NoticeDetailModalRef = ref<InstanceType<typeof NoticeDetailModal>>()
// 详情
const onDetail = (id: string) => {
  NoticeDetailModalRef.value?.onDetail(id)
}

onMounted(() => {
  getDataList()
})
</script>

<style lang="scss" scoped>
:deep(.arco-comment:not(:first-of-type), .arco-comment-inner-comment) {
  margin-top: 10px;
}
:deep(.arco-comment-content) {
  font-size: 14px;
  color: var(--color-text-1);
}
:deep(.arco-comment-datetime) {
  color: var(--color-text-4);
}

.content {
  display: flex;
  align-items: center;
  > p {
    margin-left: 6px;
  }
}

.arco-link {
  color: rgb(var(--gray-8));
}

.icon {
  margin-right: 3px;
}

.update-time-row {
  text-align: right;
}
</style>
