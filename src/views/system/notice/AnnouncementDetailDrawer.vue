<template>
  <a-drawer v-model:visible="visible" title="公告详情" :width="width >= 900 ? 900 : '100%'" :footer="false">
    <div>
      <h1>{{ dataDetail.title }}</h1>
      <GiCellTag :value="dataDetail.type" :dict="announcement_type" />
      <span class="time-span">{{ dataDetail.effectiveTime }} - {{ dataDetail.terminateTime }}</span>
      <a-divider />
      <a-card hoverable bordered>
        <MdPreview :editorId="dataDetail.id" :modelValue="dataDetail.content" />
        <MdCatalog :editorId="dataDetail.id" :scrollElement="scrollElement" />
      </a-card>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
import { getAnnouncement, type AnnouncementResp } from '@/apis'
import { useWindowSize } from '@vueuse/core'
import { MdPreview, MdCatalog } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { useDict } from '@/hooks/app'
const { width } = useWindowSize()
const scrollElement = document.documentElement
const dataId = ref('')
const dataDetail = ref<AnnouncementResp>({})
const { announcement_type } = useDict('announcement_type')
// 查询详情
const getDataDetail = async () => {
  const res = await getAnnouncement(dataId.value)
  dataDetail.value = res.data
}

const visible = ref(false)
// 详情
const onDetail = async (id: string) => {
  dataId.value = id
  await getDataDetail()
  visible.value = true
}

defineExpose({ onDetail })
</script>

<style lang="scss" scoped>
.time-span {
  margin-left: 10px;
  font-size: 12px;
  color: #737a87;
}
</style>
