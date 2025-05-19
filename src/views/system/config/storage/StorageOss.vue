<template>
  <div class="list-wrap">
    <a-row class="list-row" :gutter="24">
      <a-col
        v-if="has.hasPermOr(['system:storage:create'])"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        :xxl="6"
        class="list-col"
        style="min-height: 162px"
      >
        <CardAdd :type="2" @save-success="search" />
      </a-col>
      <a-empty v-if="!data.length && !has.hasPermOr(['system:storage:create'])" />
      <a-col
        v-for="item in data"
        :key="item.id"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        :xxl="6"
        class="list-col"
        style="min-height: 162px"
      >
        <CardBlock
          :loading="loading"
          :data="item"
          @save-success="search"
        >
          <template #content>
            <a-skeleton v-if="loading" :animation="true">
              <a-skeleton-line :widths="['60%']" :rows="3" />
            </a-skeleton>
            <a-descriptions v-else :column="1">
              <a-descriptions-item label="Access Key"><CellCopy :content="item.accessKey" /></a-descriptions-item>
              <a-descriptions-item label="Endpoint">{{ item.endpoint }}</a-descriptions-item>
              <a-descriptions-item label="Bucket">{{ item.bucketName }}</a-descriptions-item>
              <a-descriptions-item label="自定义域名">{{ item.domain }}</a-descriptions-item>
            </a-descriptions>
          </template>
        </CardBlock>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import CardAdd from './components/CardAdd.vue'
import CardBlock from './components/CardBlock.vue'
import type { StorageResp } from '@/apis'
import has from '@/utils/has'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array<StorageResp>,
    default: () => [],
  },
})

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const search = () => {
  emit('save-success')
}
</script>

<style scoped lang="scss">

</style>
