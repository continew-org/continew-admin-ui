<template>
  <a-drawer v-model:visible="visible" title="公告详情" :width="width >= 500 ? 500 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="ID" :span="2">
        <a-typography-paragraph copyable>{{ dataDetail?.id }}</a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="标题">{{ dataDetail?.title }}</a-descriptions-item>
      <a-descriptions-item label="分类"><GiCellTag :value="dataDetail?.type" :dict="notice_type" /></a-descriptions-item>
      <a-descriptions-item label="通知范围"><GiCellTag :value="dataDetail?.noticeScope" :dict="notice_scope_enum" /></a-descriptions-item>
      <a-descriptions-item label="通知方式">
        <span v-if="!dataDetail?.noticeMethods">无</span>
        <GiCellTags v-else :data="formatNoticeMethods(dataDetail?.noticeMethods)" />
      </a-descriptions-item>
      <a-descriptions-item label="是否定时">{{ dataDetail?.isTiming ? '是' : '否' }}</a-descriptions-item>
      <a-descriptions-item label="发布时间">{{ dataDetail?.publishTime }}</a-descriptions-item>
      <a-descriptions-item label="是否置顶">{{ dataDetail?.isTop ? '是' : '否' }}</a-descriptions-item>
      <a-descriptions-item label="状态"><GiCellTag :value="dataDetail?.status" :dict="notice_status_enum" /></a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
      <a-descriptions-item label="修改时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { type NoticeDetailResp, getNotice as getDetail } from '@/apis/system/notice'
import { useDict } from '@/hooks/app'

const { width } = useWindowSize()

const dataId = ref('')
const dataDetail = ref<NoticeDetailResp>()
const visible = ref(false)
const { notice_type, notice_scope_enum, notice_method_enum, notice_status_enum } = useDict('notice_type', 'notice_scope_enum', 'notice_method_enum', 'notice_status_enum')

// 格式化通知方式（转换为GiCellTags所需格式）
const formatNoticeMethods = (noticeMethods: string[]) => {
  return noticeMethods.map((method) => {
    const dictItem = notice_method_enum.value.find((item) => item.value === method)
    return dictItem?.label || method
  })
}
// 查询详情
const getDataDetail = async () => {
  const { data } = await getDetail(dataId.value)
  dataDetail.value = data
}

// 打开
const onOpen = async (id: string) => {
  dataId.value = id
  await getDataDetail()
  visible.value = true
}

defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
