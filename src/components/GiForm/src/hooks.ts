import { reactive } from 'vue'
import _ from 'lodash'
import type { Columns, ColumnsItem, ColumnsItemPropsKey } from './type'
import { Message } from '@arco-design/web-vue'

export function useGiForm(initValue: Columns) {
  const getInitValue = () => _.cloneDeep(initValue)

  const columns = reactive(getInitValue())

  const resetColumns = () => {
    Object.assign(columns, getInitValue())
  }

  const setValue = <T>(field: string, key: keyof ColumnsItem, value: T) => {
    if (!columns.length) return
    const obj = columns.find((i) => i.field === field)
    if (obj) {
      obj[key] = value as never
    } else {
      Message.warning(`没有这个field属性值-${field}，请检查！`)
    }
  }

  const setPropsValue = <T>(field: string, key: ColumnsItemPropsKey, value: T) => {
    if (!columns.length) return
    const obj = columns.find((i) => i.field === field)
    if (obj) {
      if (!obj.props) {
        obj.props = {}
      }
      obj.props[key as keyof ColumnsItem['props']] = value as never
    } else {
      Message.warning(`没有这个field属性值-${field}，请检查！`)
    }
  }

  return {
    /** 配置项 */
    columns,
    /** 重置 columns */
    resetColumns,
    /** 设置 columns 某个对象属性的值 */
    setValue,
    /** 设置 columns.props 某个属性的值 */
    setPropsValue
  }
}
