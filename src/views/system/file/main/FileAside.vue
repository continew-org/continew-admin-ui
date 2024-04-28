<template>
  <div>
    <a-card title="文件管理" :bordered="false" :body-style="{ padding: 0 }">
      <a-menu :default-open-keys="['0']" :selected-keys="[selectedKey]">
        <a-sub-menu key="0">
          <template #icon>
            <icon-apps></icon-apps>
          </template>
          <template #title>文件类型</template>
          <a-menu-item v-for="item in FileTypeList" :key="item.value.toString()" @click="onClickItem(item)">
            <template #icon>
              <GiSvgIcon :size="28" :name="item.icon"></GiSvgIcon>
            </template>
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { FileTypeList, type FileTypeListItem } from '@/constant/file'

const route = useRoute()
const router = useRouter()

const selectedKey = ref('0')

// 监听路由变化
watch(
  () => route.query,
  () => {
    if (route.query.type) {
      selectedKey.value = route.query.type as string
    }
  },
  {
    immediate: true
  }
)

// 点击事件
const onClickItem = (item: FileTypeListItem) => {
  router.push({ name: 'SystemFile', query: { type: item.value } })
}
</script>

<style lang="scss" scoped>
:deep(.arco-card) {
  .arco-card-header {
    border-bottom-style: dashed;
    margin: 0 16px;
    padding-left: 0;
    padding-right: 0;
  }
}

:deep(.arco-progress) {
  .arco-progress-line,
  .arco-progress-line-bar-buffer,
  .arco-progress-line-bar {
    border-radius: 0;
  }
}

.percent {
  margin-top: 10px;
  padding: 14px 12px;
  box-sizing: border-box;
  background-color: var(--color-bg-1);
}
</style>
