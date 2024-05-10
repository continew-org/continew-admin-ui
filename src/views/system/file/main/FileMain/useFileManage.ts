import { computed, ref } from 'vue'
import type { FileItem } from '@/apis'

type Mode = 'grid' | 'list'

export default function () {
  const mode = ref<Mode>('grid')
  const selectedFileList = ref<FileItem[]>([]) // 已选的文件列表
  const selectedFileIds = computed(() => selectedFileList.value.map((i) => i.id))

  // 切换视图
  const toggleMode = () => {
    mode.value = mode.value === 'grid' ? 'list' : 'grid'
  }

  // 添加选择的文件
  const addSelectedFileItem = (item: FileItem) => {
    if (selectedFileIds.value.includes(item.id)) {
      const index = selectedFileList.value.findIndex((i) => i.id === item.id)
      selectedFileList.value.splice(index, 1)
    } else {
      selectedFileList.value.push(item)
    }
  }

  return {
    mode,
    selectedFileList,
    selectedFileIds,
    toggleMode,
    addSelectedFileItem
  }
}
