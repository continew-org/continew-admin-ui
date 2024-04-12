import type { FileItem } from '@/apis'
import { h } from 'vue'
import { Modal } from '@arco-design/web-vue'
import ModalContent from './ModalContent.vue'

/** 打开 详情 弹窗 */
export function openFileDetailModal(fileItem: FileItem) {
  return Modal.open({
    title: fileItem.extension ? `${fileItem.name}.${fileItem.extension}` : `${fileItem.name}`,
    titleAlign: 'start',
    modalAnimationName: 'el-fade',
    modalStyle: { maxWidth: '320px' },
    width: '90%',
    footer: false,
    content: () => h(ModalContent, { data: fileItem })
  })
}
