<template>
  <a-modal v-model:visible="visible" :width="width >= 600 ? '70%' : '100%'" :footer="false" draggable @close="reset">
    <a-typography :style="{ marginTop: '-40px', textAlign: 'center' }">
      <a-typography-title>
        {{ dataDetail?.title }}
      </a-typography-title>
      <a-typography-paragraph>
        <div class="meta-data">
          <a-space>
            <span>
              <icon-user class="icon" />
              <span class="label">发布人：</span>
              <span>{{ dataDetail?.createUserString }}</span>
            </span>
            <a-divider direction="vertical" />
            <span>
              <icon-history class="icon" />
              <span class="label">发布时间：</span>
              <span>{{ dataDetail?.effectiveTime ? dataDetail?.effectiveTime : dataDetail?.createTime }}</span>
            </span>
          </a-space>
        </div>
      </a-typography-paragraph>
    </a-typography>
    <a-divider />
    <MdPreview :editor-id="dataDetail?.id" :model-value="dataDetail?.content" />
    <a-divider />
    <div v-if="dataDetail?.updateTime" class="update-time-row">
      <span>
        <icon-schedule class="icon" />
        <span>最后更新于：</span>
        <span>{{ dataDetail?.updateTime }}</span>
      </span>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3'
import { useWindowSize } from '@vueuse/core'
import { type NoticeResp, getNotice } from '@/apis'

const { width } = useWindowSize()
const dataDetail = ref<NoticeResp>()
const visible = ref(false)
// 详情
const onDetail = async (id: string) => {
  const res = await getNotice(id)
  dataDetail.value = res.data
  visible.value = true
}

// 重置
const reset = () => {
  dataDetail.value = {}
}

defineExpose({ onDetail })
</script>

<style lang="scss" scoped>
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
