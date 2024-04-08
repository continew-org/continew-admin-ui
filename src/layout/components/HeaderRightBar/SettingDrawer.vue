<template>
  <a-drawer v-model:visible="visible" title="项目配置" width="300px" unmount-on-close :footer="false">
    <a-space :size="15" direction="vertical" fill>
      <a-divider orientation="center">系统布局</a-divider>
      <a-row justify="center">
        <a-space>
          <a-badge>
            <template #content>
              <icon-check-circle-fill
                v-if="appStore.layout === 'left'"
                style="color: rgb(var(--success-6))"
                :size="16"
              ></icon-check-circle-fill>
            </template>
            <LayoutItem mode="left" @click="appStore.layout = 'left'"></LayoutItem>
            <p class="layout-text">默认布局</p>
          </a-badge>
          <a-badge>
            <template #content>
              <icon-check-circle-fill
                v-if="appStore.layout === 'mix'"
                :size="16"
                style="color: rgb(var(--success-6))"
              ></icon-check-circle-fill>
            </template>
            <LayoutItem mode="mix" @click="appStore.layout = 'mix'"></LayoutItem>
            <p class="layout-text">混合布局</p>
          </a-badge>
        </a-space>
      </a-row>

      <a-divider orientation="center">系统主题</a-divider>
      <a-row justify="center">
        <ColorPicker
          theme="dark"
          :color="appStore.themeColor"
          :sucker-hide="true"
          :colors-default="defaultColorList"
          @changeColor="changeColor"
        ></ColorPicker>
      </a-row>

      <a-divider orientation="center">界面显示</a-divider>

      <a-descriptions :column="1" :align="{ value: 'right' }" :value-style="{ paddingRight: 0 }">
        <a-descriptions-item label="页签显示">
          <a-switch v-model="appStore.tab" />
        </a-descriptions-item>
        <a-descriptions-item label="页签风格">
          <a-select
            v-model="appStore.tabMode"
            placeholder="请选择"
            :options="tabModeList"
            :disabled="!appStore.tab"
            :trigger-props="{ autoFitPopupMinWidth: true }"
            :style="{ width: '120px' }"
          >
          </a-select>
        </a-descriptions-item>
        <a-descriptions-item label="动画显示">
          <a-switch v-model="appStore.animate" />
        </a-descriptions-item>
        <a-descriptions-item label="动画显示">
          <a-select
            v-model="appStore.animateMode"
            placeholder="请选择"
            :options="animateModeList"
            :disabled="!appStore.animate"
            :style="{ width: '120px' }"
          >
          </a-select>
        </a-descriptions-item>
        <a-descriptions-item label="深色菜单">
          <a-switch v-model="appStore.menuDark" />
        </a-descriptions-item>
        <a-descriptions-item label="手风琴效果">
          <a-switch v-model="appStore.menuAccordion" />
        </a-descriptions-item>
      </a-descriptions>
    </a-space>
  </a-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
import LayoutItem from './components/LayoutItem.vue'

defineOptions({ name: 'SettingDrawer' })
const appStore = useAppStore()
const visible = ref(false)

const tabModeList: App.TabItem[] = [
  { label: '卡片', value: 'card' },
  { label: '间隔卡片', value: 'card-gutter' },
  { label: '圆角', value: 'rounded' }
]

const animateModeList: App.AnimateItem[] = [
  { label: '默认', value: 'zoom-fade' },
  { label: '滑动', value: 'fade-slide' },
  { label: '渐变', value: 'fade' },
  { label: '底部滑出', value: 'fade-bottom' },
  { label: '缩放消退', value: 'fade-scale' }
]

const open = () => {
  visible.value = true
}

defineExpose({ open })

// 默认显示的主题色列表
const defaultColorList = [
  '#165DFF',
  '#409EFF',
  '#18A058',
  '#2d8cf0',
  '#007AFF',
  '#5ac8fa',
  '#5856D6',
  '#536dfe',
  '#9c27b0',
  '#AF52DE',
  '#0096c7',
  '#00C1D4',
  '#43a047',
  '#e53935',
  '#f4511e',
  '#6d4c41'
]

type ColorObj = {
  hex: string
  hsv: { h: number; s: number; v: number }
  rgba: { r: number; g: number; b: number; a: number }
}

// 改变主题色
const changeColor = (colorObj: ColorObj) => {
  if (!/^#[0-9A-Za-z]{6}/.test(colorObj.hex)) return
  appStore.setThemeColor(colorObj.hex)
}
</script>

<style lang="scss" scoped>
:deep(.arco-descriptions-item-label-block) {
  color: var(--color-text-1);
}

.layout-text {
  font-size: 12px;
  text-align: center;
  color: var(--color-text-2);
  margin-top: 4px;
}
</style>
