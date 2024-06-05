interface AnyObject {
  [key: string]: unknown
}

interface Options {
  label: string
  value: unknown
}

/** 键值对类型 */
export interface LabelValueState {
  label: string
  value: any
  extend?: string
}

/** 字典类型 */
export interface DictState {
  code: string
  items: Array<LabelValueState>
}

/** 状态（1：启用；2：禁用） */
type Status = 1 | 2

/** 性别（1：男；2：女；0：未知） */
type Gender = 1 | 2 | 0
