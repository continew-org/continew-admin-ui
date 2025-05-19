<template>
  <GiPageLayout :margin="false" :body-style="{ padding: 0 }">
    <div class="gi_page">
      <a-tabs v-model:active-key="activeKey" type="rounded" @change="change">
        <a-tab-pane key="all">
          <template #title>全部</template>
          <a-card title="本地存储" :bordered="false" class="gi_card_title">
            <StorageLocal :data="dataMap['1']" :loading="loading" @save-success="getDataList" />
          </a-card>
          <a-card title="对象存储" :bordered="false" class="gi_card_title">
            <StorageOss :data="dataMap['2']" :loading="loading" @save-success="getDataList" />
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="1">
          <template #title>本地存储</template>
          <StorageLocal :data="dataMap['1']" :loading="loading" @save-success="getDataList" />
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #title>对象存储</template>
          <StorageOss :data="dataMap['2']" :loading="loading" @save-success="getDataList" />
        </a-tab-pane>
        <template #extra>
          <a-input-search
            v-model="queryForm.description"
            placeholder="搜索名称/编码"
            style="width: 240px;"
            allow-clear
            @search="getDataList"
          />
        </template>
      </a-tabs>
    </div>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { groupBy } from 'xe-utils'
import StorageLocal from './StorageLocal.vue'
import StorageOss from './StorageOss.vue'
import { type StorageQuery, type StorageResp, listStorage } from '@/apis'

defineOptions({ name: 'SystemStorage' })

const queryForm = reactive<StorageQuery>({
  sort: ['createTime,desc'],
})

const loading = ref(false)
const dataMap = ref<Record<string, StorageResp[]>>({})
// 查询列表
const getDataList = async () => {
  try {
    loading.value = true
    const { data } = await listStorage(queryForm)
    dataMap.value = groupBy(data, 'type')
  } finally {
    loading.value = false
  }
}

const activeKey = ref('all')
const change = (key: string | number) => {
  activeKey.value = key as string
  queryForm.type = key === 'all' ? undefined : key
  getDataList()
}

onMounted(() => {
  getDataList()
})
</script>

<style scoped lang="scss">
.gi_page {
  padding: 0;
}

.block-title {
  font-size: 14px;
  margin-bottom: 12px;
}

:deep(.gi_card_title > .arco-card-body) {
  padding: 0;
}
</style>
