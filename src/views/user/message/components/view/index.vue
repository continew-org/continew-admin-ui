<template>
  <div ref="containerRef" class="detail">
    <div class="detail_header">
      <a-affix :target="(containerRef as HTMLElement)">
        <a-page-header title="通知公告" subtitle="查看" @back="onBack">
        </a-page-header>
      </a-affix>
    </div>
    <div class="detail_content">
      <h1 class="title">{{ form?.title }}</h1>
      <div class="info">
        <a-space>
          <span>
            <icon-user class="icon" />
            <span class="label">发布人：</span>
            <span>{{ form?.createUserString }}</span>
          </span>
          <a-divider direction="vertical" />
          <span>
            <icon-history class="icon" />
            <span class="label">发布时间：</span>
            <span>{{ form?.publishTime }}</span>
          </span>
          <a-divider v-if="form?.updateTime" direction="vertical" />
          <span v-if="form?.updateTime">
            <icon-schedule class="icon" />
            <span>更新时间：</span>
            <span>{{ form?.updateTime }}</span>
          </span>
        </a-space>
      </div>
      <div style="flex: 1;">
        <AiEditor v-model="form.content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AiEditor from './components/index.vue'
import { getUserNotice } from '@/apis/system/user-message'
import { useTabsStore } from '@/stores'
import { useResetReactive } from '@/hooks'

defineOptions({ name: 'UserNotice' })

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()

const { id } = route.query
const containerRef = ref<HTMLElement | null>()
const [form, resetForm] = useResetReactive({
  title: '',
  createUserString: '',
  publishTime: '',
  content: '',
})

// 回退
const onBack = () => {
  tabsStore.closeCurrent(route.path)
  router.push({ path: '/user/message', query: { tab: 'notice' } })
}

// 打开
const onOpen = async (id: string) => {
  resetForm()
  const { data } = await getUserNotice(id)
  Object.assign(form, data)
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
