import { reactive } from 'vue'
import { cloneDeep } from 'lodash-es'

export function useForm<F extends object>(initValue: F) {
  const getInitValue = () => cloneDeep(initValue)

  const form = reactive(getInitValue())

  const resetForm = () => {
    for (const key in form) {
      delete form[key]
    }
    Object.assign(form, getInitValue())
  }

  return { form, resetForm }
}
