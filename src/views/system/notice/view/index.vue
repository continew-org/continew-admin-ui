<template>
  <div ref="containerRef" class="detail">
    <div class="detail_header">
      <a-affix :target="(containerRef as HTMLElement)">
        <a-page-header title="通知公告" subtitle="查看" @back="onBack">
        </a-page-header>
      </a-affix>
    </div>
    <div class="detail_content">
      <h1 class="title">{{ dataDetail?.title }}</h1>
      <div class="info">
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
            <span>{{ dataDetail?.publishTime }}</span>
          </span>
          <a-divider v-if="dataDetail?.updateTime" direction="vertical" />
          <span v-if="dataDetail?.updateTime">
            <icon-schedule class="icon" />
            <span>更新时间：</span>
            <span>{{ dataDetail?.updateTime }}</span>
          </span>
        </a-space>
      </div>
      <div style="flex: 1;">
        <AiEditor v-model="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AiEditor from './components/index.vue'
import { type NoticeResp, getNotice } from '@/apis/system/notice'
import { useTabsStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()

const { id } = route.query
const containerRef = ref<HTMLElement | null>()
const dataDetail = ref<NoticeResp>()
const content = computed(() => dataDetail.value?.content)

// 回退
const onBack = () => {
  tabsStore.closeCurrent(route.path)
  router.push('/system/notice')
}

// 打开
const onOpen = async (id: string) => {
  const { data } = await getNotice(id)
  dataDetail.value = data
}

onMounted(() => {
  onOpen(id as string)
})
</script>

<style scoped lang="scss">
.detail_content {
    .title {
        text-align: center;
    }

    .info {
        text-align: center;
    }

    .icon {
      margin-right: 3px;
    }
}
</style>
