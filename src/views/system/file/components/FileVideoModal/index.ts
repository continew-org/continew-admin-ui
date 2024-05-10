import { h } from 'vue'
import { Modal } from '@arco-design/web-vue'
import ModalContent from './ModalContent.vue'
import type { FileItem } from '@/apis'

export function previewFileVideoModal(data: FileItem) {
  return Modal.open({
    title: '视频播放',
    width: 'auto',
    modalStyle: {},
    content: () => h(ModalContent, { data })
  })
}
