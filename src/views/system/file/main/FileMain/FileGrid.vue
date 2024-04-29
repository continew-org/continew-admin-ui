<template>
  <div class="file-grid">
    <a-grid :cols="{ xs: 4, sm: 4, md: 5, lg: 7, xl: 8, xxl: 9 }" :col-gap="12" :row-gap="12">
      <a-trigger
        v-for="item in data"
        :key="item.id"
        trigger="contextMenu"
        align-point
        animation-name="slide-dynamic-origin"
        auto-fit-transform-origin
        position="bl"
        update-at-scroll
        scroll-to-close
      >
        <a-grid-item>
          <div class="file-grid-item" @click.stop="handleClickFile(item)">
            <section class="file-grid-item__wrapper">
              <div class="file-icon">
                <FileImage :data="item" :title="item.name"></FileImage>
              </div>
              <p class="gi_line_1 file-name">{{ getFileName(item) }}</p>
            </section>
            <!-- 勾选模式 -->
            <section
              v-show="props.isBatchMode"
              class="check-mode"
              :class="{ checked: props.selectedFileIds.includes(item.id) }"
              @click.stop="handleCheckFile(item)"
            >
              <a-checkbox class="checkbox" :model-value="props.selectedFileIds.includes(item.id)"></a-checkbox>
            </section>
          </div>
        </a-grid-item>
        <template #content>
          <FileRightMenu :data="item" @click="handleRightMenuClick($event, item)"></FileRightMenu>
        </template>
      </a-trigger>
    </a-grid>
  </div>
</template>

<script setup lang="ts">
import FileImage from './FileImage.vue'
import FileRightMenu from './FileRightMenu.vue'
import type { FileItem } from '@/apis'

interface Props {
  data?: FileItem[]
  selectedFileIds?: string[]
  isBatchMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [], // 文件数据
  selectedFileIds: () => [], // 批量模式下选中的文件id数组
  isBatchMode: false // 是否是批量模式
})

const emit = defineEmits<{
  (e: 'click', record: FileItem): void
  (e: 'select', record: FileItem): void
  (e: 'right-menu-click', mode: string, item: FileItem): void
}>()

// 文件名称带后缀
const getFileName = (item: FileItem) => {
  return `${item.name}${item.extension ? `.${item.extension}` : ''}`
}

// 点击事件
const handleClickFile = (item: FileItem) => {
  emit('click', item)
}

// 选中事件
const handleCheckFile = (item: FileItem) => {
  emit('select', item)
}

// 右键菜单点击事件
const handleRightMenuClick = (mode: string, item: FileItem) => {
  emit('right-menu-click', mode, item)
}
</script>

<style lang="scss" scoped>
.file-grid {
  flex: 1;
  margin-top: 12px;
  // overflow: scroll;
  background: var(--color-bg-2);
}

.file-grid-item {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:hover {
    background: var(--color-primary-light-1);
  }
  &:active {
    svg,
    img {
      transform: scale(0.9);
    }
  }
  .check-mode {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 9;
    &.checked {
      background: none;
    }
    .checkbox {
      position: absolute;
      top: 5px;
      left: 5px;
      padding-left: 0;
    }
  }
  &__wrapper {
    width: 76%;
    max-width: 100px;
    height: 100%;
    position: relative;
    overflow: hidden;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .file-icon {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      overflow: hidden;
      > img {
        width: auto;
        height: 100%;
        transition: all 0.3s;
      }
      > svg {
        height: 100%;
        transition: all 0.3s;
      }
    }
    .file-name {
      width: 100%;
      font-size: 12px;
      margin-top: 8px;
      padding: 0 5px;
      text-align: center;
      box-sizing: border-box;
    }
  }
}
</style>
