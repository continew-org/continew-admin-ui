<template>
  <div class="ocr-file-grid">
    <a-grid :cols="{ xs: 4, sm: 4, md: 5, lg: 6, xl: 6, xxl: 6 }" :col-gap="12" :row-gap="12">
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
          <div class="file-grid-item" @click.stop="handleClickFile(item)" @dblclick="handleDblclickFile(item)">
            <section class="file-grid-item__wrapper">
              <div class="file-icon">
                <FileImage :data="item" :title="item.originalName" />
              </div>
              <p class="gi_line_1 file-name">{{ item.originalName }}</p>
            </section>
          </div>
        </a-grid-item>
        <template #content>
          <FileRightMenu :data="item" @click="handleRightMenuClick($event, item)" />
        </template>
      </a-trigger>
    </a-grid>
  </div>
</template>

<script setup lang="ts">
import FileRightMenu from '@/views/system/file/main/FileMain/FileRightMenu.vue'
import FileImage from '@/views/system/file/main/FileMain/FileImage.vue'
import type { FileItem } from '@/apis/system'

defineOptions({ name: 'OcrFileGrid' })

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

const handleClickFile = (item: FileItem) => emit('click', item)
const handleDblclickFile = (item: FileItem) => emit('dblclick', item)
const handleRightMenuClick = (mode: string, item: FileItem) => emit('right-menu-click', mode, item)
</script>

<style scoped lang="scss">
.ocr-file-grid {
  flex: 1;
  margin-top: 12px;
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
