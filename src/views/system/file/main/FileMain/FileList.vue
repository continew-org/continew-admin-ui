<template>
  <div class="file-list">
    <a-table
      row-key="id"
      :scroll="{ x: '100%', y: '100%', minWidth: 800 }"
      :data="props.data"
      :bordered="false"
      :pagination="false"
      :row-selection="isBatchMode ? rowSelection : undefined"
      :selected-keys="selectedFileIds"
      column-resizable
      @select="select"
      @select-all="selectAll"
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
                  <FileImage :data="record"></FileImage>
                </div>
                <a-typography-paragraph :copyable="record.type !== 0" :copy-text="record.url">
                  <template #copy-tooltip>复制链接</template>
                  {{ record.originalName }}
                </a-typography-paragraph>
              </section>
              <template v-if="has.hasPermOr(['system:file:update', 'system:file:get', 'system:file:download', 'system:file:delete'])" #content>
                <FileRightMenu :data="record" @click="handleRightMenuClick($event, record)"></FileRightMenu>
              </template>
            </a-trigger>
          </template>
        </a-table-column>
        <a-table-column title="大小" data-index="size" :width="160">
          <template #cell="{ record }">
            <span v-if="record.type === 0" v-permission="['system:file:calcDirSize']">
              <a-link v-if="record.size === null" @click="calculateDirSize(record)">计算</a-link>
              <span v-else>
                {{ formatFileSize(record.size) }}
              </span>
            </span>
            <span v-else>{{ formatFileSize(record.size) }}</span>
          </template>
        </a-table-column>
        <a-table-column title="存储名称" data-index="storageName" :width="200" />
        <a-table-column title="修改时间" data-index="updateTime" :width="200" />
        <a-table-column v-if="has.hasPermOr(['system:file:update', 'system:file:get', 'system:file:download', 'system:file:delete'])" title="操作" :width="120" align="center">
          <template #cell="{ record }">
            <a-popover trigger="click" position="bottom" :content-style="{ 'padding': 0, 'margin-top': 0 }">
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
import { Message, type TableInstance, type TableRowSelection } from '@arco-design/web-vue'
import FileRightMenu from './FileRightMenu.vue'
import { type FileItem, calcDirSize } from '@/apis/system'
import { formatFileSize } from '@/utils'
import has from '@/utils/has'

const props = withDefaults(defineProps<Props>(), {
  data: () => [], // 文件数据
  selectedFileIds: () => [],
  isBatchMode: false, // 是否是批量模式
})

const emit = defineEmits<{
  (e: 'click', record: FileItem): void
  (e: 'dblclick', record: FileItem): void
  (e: 'select', record: FileItem): void
  (e: 'select-all', checked: boolean): void
  (e: 'right-menu-click', mode: string, item: FileItem): void
}>()

const FileImage = defineAsyncComponent(() => import('./FileImage.vue'))

interface Props {
  data?: FileItem[]
  selectedFileIds?: string[]
  isBatchMode?: boolean
}

const rowSelection: TableRowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
})

// 计算文件夹大小
const calculateDirSize = async (record: FileItem) => {
  if (record.type !== 0) return
  try {
    const { data } = await calcDirSize(record.id)
    record.size = data.size
  } catch (err) {
    Message.error('计算失败，请重试')
  }
}

// 多选 - 点击单个复选框
const select: TableInstance['onSelect'] = (_rowKeys, _rowKey, record: unknown) => {
  // 只有点击具体行的复选框时才触发（点击表头全选时 record 为 undefined）
  if (record) {
    emit('select', record as FileItem)
  }
}

// 全选 - 点击表头全选复选框
const selectAll: TableInstance['onSelectAll'] = (checked: boolean) => {
  emit('select-all', checked)
}

// 单击事件
const handleClick = (record: unknown) => {
  emit('click', record as FileItem)
}

// 双击事件
const handleDblclickFile = (item: FileItem) => {
  emit('dblclick', item)
}

// 右键菜单点击事件
const handleRightMenuClick = (mode: string, item: FileItem) => {
  emit('right-menu-click', mode, item)
}
</script>

<style scoped lang="scss">
:deep(.arco-table-td .arco-table-cell) {
  padding-top: 0;
  padding-bottom: 0;
}
.file-list {
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
