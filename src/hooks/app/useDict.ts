import { ref, toRefs } from 'vue'
import { listCommonDict } from '@/apis'
import { useDictStore } from '@/stores'

export function useDict(...codes: Array<string>) {
  const res = ref<any>({})
  return (() => {
    const dictStore = useDictStore()
    codes.forEach((code) => {
      res.value[code] = []
      const dict = dictStore.getDict(code)
      if (dict) {
        res.value[code] = dict
      } else {
        listCommonDict(code).then((resp) => {
          res.value[code] = resp.data
          dictStore.setDict(code, res.value[code])
        })
      }
    })
    return toRefs(res.value)
  })()
}
