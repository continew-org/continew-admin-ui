<template>
  <div class="ocr-file-list">
    <a-table
      row-key="id"
      :scroll="{ x: '100%', y: '100%', minWidth: 400 }"
      :data="props.data"
      :bordered="false"
      :pagination="false"
    >
      <template #columns>
        <a-table-column title="名称">
          <template #cell="{ record }">
            <a-trigger
              trigger="contextMenu"
              align-point
              animation-name="slide-dynamic-origin"
              auto-fit-transform-origin
              position="bl"
              update-at-scroll
              scroll-to-close
            >
              <section class="file-name" @click="handleClick(record)" @dblclick="handleDblclickFile(record)">
                <div class="file-image">
                  <FileImage :data="record" />
                </div>
                <a-typography-paragraph :copyable="record.type !== 0" :copy-text="record.url">
                  <template #copy-tooltip>复制链接</template>
                  {{ record.originalName }}
                </a-typography-paragraph>
              </section>
              <template #content>
                <FileRightMenu :data="record" @click="handleRightMenuClick($event, record)" />
              </template>
            </a-trigger>
          </template>
        </a-table-column>
        <a-table-column title="大小" :width="120">
          <template #cell="{ record }">
            <span v-if="record.type === 0">
              <a-link v-if="record.size === null" @click="calculateDirSize(record)">计算</a-link>
              <span v-else>{{ formatFileSize(record.size) }}</span>
            </span>
            <span v-else>{{ formatFileSize(record.size) }}</span>
          </template>
        </a-table-column>
        <a-table-column title="操作" :width="80" align="center">
          <template #cell="{ record }">
            <a-popover trigger="click" position="bottom" :content-style="{ padding: 0, marginTop: 0 }">
              <a-button type="text" @click.stop><icon-more :size="16" /></a-button>
              <template #content>
                <FileRightMenu
                  :data="record"
                  :file-info="record"
                  :shadow="false"
                  @click="handleRightMenuClick($event, record)"
                />
              </template>
            </a-popover>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import FileRightMenu from '@/views/system/file/main/FileMain/FileRightMenu.vue'
import FileImage from '@/views/system/file/main/FileMain/FileImage.vue'
import { type FileItem, calcDirSize as apiCalcDirSize } from '@/apis/system'
import { formatFileSize } from '@/utils'

defineOptions({ name: 'OcrFileList' })

const props = withDefaults(
  defineProps<{
    data?: FileItem[]
  }>(),
  { data: () => [] },
)

const emit = defineEmits<{
  (e: 'click', record: FileItem): void
  (e: 'dblclick', record: FileItem): void
  (e: 'right-menu-click', mode: string, item: FileItem): void
}>()

const calculateDirSize = async (record: FileItem) => {
  if (record.type !== 0) return
  try {
    const { data } = await apiCalcDirSize(record.id)
    record.size = data.size
  } catch {
    Message.error('计算失败，请重试')
  }
}

const handleClick = (record: FileItem) => emit('click', record)
const handleDblclickFile = (item: FileItem) => emit('dblclick', item)
const handleRightMenuClick = (mode: string, item: FileItem) => emit('right-menu-click', mode, item)
</script>

<style scoped lang="scss">
:deep(.arco-table-td .arco-table-cell) {
  padding-top: 0;
  padding-bottom: 0;
}
.ocr-file-list {
  width: 100%;
  padding-top: 12px;
  overflow: hidden;
  .file-name {
    height: 100%;
    display: flex;
    align-items: center;
    padding-top: 6px;
    padding-bottom: 6px;
    cursor: pointer;
  }
  .file-image {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
}
</style>
