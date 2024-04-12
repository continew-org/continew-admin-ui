import { updateFile, type FileItem } from '@/apis'
import { ref, h } from 'vue'
import { Modal, Message } from '@arco-design/web-vue'
import ModalContent from './ModalContent.vue'

export function openFileRenameModal(data: FileItem) {
  const ModalContentRef = ref<InstanceType<typeof ModalContent>>()
  return Modal.open({
    title: '重命名',
    modalAnimationName: 'el-fade',
    modalStyle: { maxWidth: '450px' },
    width: '90%',
    content: () =>
      h(ModalContent, {
        ref: (e) => {
          ModalContentRef.value = e as any
        }
      }),
    onBeforeOk: async () => {
      const isInvalid = await ModalContentRef.value?.formRef?.validate()
      if (isInvalid) return false
      await updateFile({ name: data.name }, data.id)
      Message.success('重命名成功')
      return true
    }
  })
}
