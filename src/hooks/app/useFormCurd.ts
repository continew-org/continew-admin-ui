import { type Ref, computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type FormInstance, Message, Modal } from '@arco-design/web-vue'
import { isEqual } from 'lodash-es'

type Option<T> = {
  key?: string
  formRef?: Ref<FormInstance>
  initApi: () => Promise<ApiRes<T>>
  detailApi: (form: T) => Promise<ApiRes<T>>
  addApi: (form: T) => Promise<ApiRes<T>>
  editApi: (form: T) => Promise<ApiRes<T>>
  onError?: (error: any) => void
  onSuccess?: (result: T) => void
  addToEdit?: boolean // 新增成功调到编辑
}

export function useFormCurd<T = any>(option: Option<T>) {
  const route = useRoute()
  const router = useRouter()

  const form = reactive({})
  const originForm = reactive({}) // 原始表单数据
  const isEdit = computed(() => !!route.query[option?.key || 'id'])
  const isChanged = ref(false) // 表单的数据是否改变过
  const loading = ref(false)
  const saveLoading = ref(false) // 保存按钮的加载状态
  const title = computed(() => (isEdit.value ? '编辑' : '新增'))

  const initForm = async () => {
    try {
      loading.value = true
      const res = isEdit.value ? await option.detailApi(form as T) : await option.initApi()
      if (res.success) {
        Object.assign(form, res.data)
        Object.assign(originForm, res.data)
        isChanged.value = false
      }
    } catch (error) {
      option.onError && option.onError(error)
    } finally {
      loading.value = false
    }
  }

  initForm()

  watch(
    () => route.query,
    () => {
      initForm()
    }
  )

  watch(
    () => form,
    (newVal) => {
      // console.log('newVal', toRaw(newVal))
      // console.log('originForm', toRaw(originForm))
      if (!isEqual(newVal, originForm)) {
        isChanged.value = true
      }
    },
    { immediate: true, deep: true }
  )

  const save = async () => {
    try {
      const valid = await option?.formRef?.value?.validate()
      if (valid) return
      saveLoading.value = true
      const res = isEdit.value ? await option.editApi(form as T) : await option.addApi(form as T)
      if (res.success) {
        Message.success(isEdit.value ? '修改成功' : '新增成功')
        if (!isEdit.value && option.addToEdit === true) {
          router.replace({ path: route.fullPath, query: { [option.key as string]: res.data[option.key as string] } })
        }
        option.onSuccess && option.onSuccess(res.data)
      }
    } catch (error) {
      option.onError && option.onError(error)
    } finally {
      saveLoading.value = false
    }
  }

  const back = () => {
    if (isChanged.value) {
      Modal.warning({
        title: '提示',
        content: '您确定丢弃更改的内容吗？',
        hideCancel: false,
        onOk: () => {
          router.back()
        }
      })
    } else {
      router.back()
    }
  }

  const reset = () => {
    option?.formRef?.value?.resetFields()
  }

  return { form: form as T, title, loading, isEdit, back, save, saveLoading, reset }
}
