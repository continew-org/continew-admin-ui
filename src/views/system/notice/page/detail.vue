<template>
    <div ref="containerRef" class="detail">
        <div class="detail_header">
            <a-affix :target="(containerRef as HTMLElement)">
                <a-page-header title="通知公告" subtitle="查看" @back="onBack">
                </a-page-header>
            </a-affix>
        </div>
        <div class="detail_content" style="display: flex; flex-direction: column;">
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
                        <span>{{ form?.effectiveTime ? form?.effectiveTime : form?.createTime
                            }}</span>
                    </span>
                </a-space>
            </div>
            <div style="flex: 1;">
                <AiEditor v-model="form.content" />
            </div>
        </div>
    </div>
</template>

<script setup lang="tsx">
import AiEditor from '../components/detail/index.vue'
import { useTabsStore } from '@/stores'
import { getNotice } from '@/apis'
import { useForm } from '@/hooks'

const containerRef = ref<HTMLElement | null>()
const tabsStore = useTabsStore()
const route = useRoute()
const { id } = route.query
const { form, resetForm } = useForm({
  title: '',
  createUserString: '',
  effectiveTime: '',
  createTime: '',
  content: ''
})

// 修改
const onDetail = async (id: string) => {
  resetForm()
  const res = await getNotice(id)
  Object.assign(form, res.data)
}
const onBack = () => {
  tabsStore.closeCurrent(route.path)
}

onMounted(() => {
  onDetail(id as string)
})
</script>

<style scoped lang="scss">
.detail_content {
    .title {
        text-align: center;
    }

    .info {
        text-align: right;
        padding: 20px;
    }
}
</style>
