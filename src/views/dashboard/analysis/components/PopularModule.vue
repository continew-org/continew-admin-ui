<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '17px 20px 20px 20px' }"
    >
      <template #title>热门模块（Top7）</template>
      <a-space direction="vertical" :size="10" fill>
        <a-table
          :data="dataList"
          :pagination="false"
          :bordered="false"
          :scroll="{ x: '100%' }"
        >
          <template #columns>
            <a-table-column title="排名">
              <template #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
            </a-table-column>
            <a-table-column title="模块">
              <template #cell="{ record }">
                <a-typography-paragraph
                  :ellipsis="{
                    rows: 1,
                  }"
                >
                  {{ record.module }}
                </a-typography-paragraph>
              </template>
            </a-table-column>
            <a-table-column title="总浏览量" data-index="pvCount" />
            <a-table-column
              title="日涨幅"
              :sortable="{
                sortDirections: ['ascend', 'descend'],
              }"
            >
              <template #cell="{ record }">
                <div class="increases-cell">
                  <span>{{ record.newPvFromYesterday }}%</span>
                  <icon-caret-up
                    v-if="record.newPvFromYesterday > 0"
                    style="color: rgb(var(--red-6)); font-size: 8px"
                  />
                  <icon-caret-down
                    v-if="record.newPvFromYesterday < 0"
                    style="color: rgb(var(--green-6)); font-size: 8px"
                  />
                </div>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-space>
    </a-card>
  </a-spin>
</template>

<script setup lang="ts">
import type { TableData } from '@arco-design/web-vue'
import { listPopularModule } from '@/apis'

const dataList = ref<TableData[]>()
const loading = ref(false)
/**
 * 查询列表
 */
const getDataList = async () => {
  try {
    loading.value = true
    const { data } = await listPopularModule()
    dataList.value = data
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getDataList()
})
</script>
