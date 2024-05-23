import { h } from 'vue'
import { Modal } from '@arco-design/web-vue'
import ModalContent from './ModalContent.vue'
import type { FileItem } from '@/apis'

/** 打开 详情 弹窗 */
export function openFileDetailModal(fileItem: FileItem) {
  return Modal.open({
    title: '文件详情',
    titleAlign: 'start',
    modalAnimationName: 'el-fade',
    modalStyle: { maxWidth: '320px' },
    width: '90%',
    footer: false,
    content: () => h(ModalContent, { data: fileItem })
  })
}
