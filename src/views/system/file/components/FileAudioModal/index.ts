import type { Component } from 'vue'
import { createApp } from 'vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import ArcoVue from '@arco-design/web-vue'
import ModalContent from './ModalContent.vue'
import type { FileItem } from '@/apis'

function createModal<T extends { callback?: () => void }>(component: Component, options?: T) {
  // 创建一个挂载容器
  const el: HTMLElement = document.createElement('div')
  // 挂载组件
  document.body.appendChild(el)

  // 实例化组件, createApp 第二个参数是 props
  const instance = createApp(component, {
    ...options,
    onClose: () => {
      setTimeout(() => {
        instance.unmount()
        document.body.removeChild(el)
        options?.callback && options?.callback()
      }, 350)
    }
  })

  instance.use(ArcoVue)
  instance.use(ArcoVueIcon)
  instance.mount(el)
}
type TFileOptions = { data: FileItem, callback?: () => void }

/** 预览 音频文件 弹窗 */
let fileAudioId = ''
export function previewFileAudioModal(data: FileItem) {
  if (fileAudioId) return // 防止重复打开
  fileAudioId = data.id
  return createModal<TFileOptions>(ModalContent, {
    data,
    // 关闭的回调
    callback: () => {
      fileAudioId = ''
    }
  })
}
