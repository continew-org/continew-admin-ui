import { ref, toRefs } from 'vue'
import { listCommonDict } from '@/apis'
import { useDictStore } from '@/stores'

const dictStore = useDictStore()
const tmpCodeZone: string[] = []
export function useDict(...codes: Array<string>) {
  const res = ref<any>({})
  return (() => {
    codes.forEach((code) => {
      res.value[code] = []
      const dict = dictStore.getDict(code)
      if (dict) {
        res.value[code] = dict
      } else {
        if (!tmpCodeZone.includes(code)) {
          // 防止多次触发
          tmpCodeZone.push(code)
          listCommonDict(code).then((resp) => {
            res.value[code] = resp.data
            dictStore.setDict(code, res.value[code])
            tmpCodeZone.splice(tmpCodeZone.indexOf(code), 1)
          }).catch(() => {
            tmpCodeZone.splice(tmpCodeZone.indexOf(code), 1)
          })
        } else {
          res.value[code] = computed(() => {
            return dictStore.getDict(code)
          })
        }
      }
    })
    return toRefs(res.value)
  })()
}
