import { reactive } from 'vue'
import _ from 'lodash'

export function useForm<F extends object>(initValue: F) {
  const getInitValue = () => _.cloneDeep(initValue)

  const form = reactive(getInitValue())

  const resetForm = () => {
    for (const key in form) {
      delete form[key]
    }
    Object.assign(form, getInitValue())
  }

  return { form, resetForm }
}
