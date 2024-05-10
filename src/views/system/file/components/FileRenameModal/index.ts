import { h, ref } from 'vue'
import { Message, Modal } from '@arco-design/web-vue'
import ModalContent from './ModalContent.vue'
import { type FileItem, updateFile } from '@/apis'

export function openFileRenameModal(data: FileItem, callback?: () => void) {
  const ModalContentRef = ref<InstanceType<typeof ModalContent>>()
  return Modal.open({
    title: '重命名',
    modalAnimationName: 'el-fade',
    modalStyle: { maxWidth: '450px' },
    width: '90%',
    content: () =>
      h(ModalContent, {
        data,
        ref: (e) => {
          ModalContentRef.value = e as any
        }
      }),
    onBeforeOk: async () => {
      const isInvalid = await ModalContentRef.value?.formRef?.validate()
      const modelParams = ModalContentRef.value?.formRef?.model
      if (isInvalid) return false
      await updateFile({ name: modelParams?.name }, data.id)
      Message.success('重命名成功')
      if (callback) {
        callback()
      }
      return true
    }
  })
}
