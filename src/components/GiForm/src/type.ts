import type * as A from '@arco-design/web-vue'

export type FormType =
  | 'input'
  | 'select'
  | 'radio-group'
  | 'checkbox-group'
  | 'textarea'
  | 'date-picker'
  | 'time-picker'
  | 'input-number'
  | 'rate'
  | 'switch'
  | 'slider'
  | 'cascader'
  | 'tree-select'
  | 'input-password'

export type ColumnsItemPropsKey =
  | keyof A.InputInstance['$props']
  | keyof A.SelectInstance['$props']
  | keyof A.TextareaInstance['$props']
  | keyof A.DatePickerInstance['$props']
  | keyof A.TimePickerInstance['$props']
  | keyof A.RadioGroupInstance['$props']
  | keyof A.CheckboxGroupInstance['$props']
  | keyof A.InputNumberInstance['$props']
  | keyof A.RateInstance['$props']
  | keyof A.SwitchInstance['$props']
  | keyof A.SliderInstance['$props']
  | keyof A.CascaderInstance['$props']
  | keyof A.TreeSelectInstance['$props']

export type ColumnsItemHide<F> = boolean | ((form: F) => boolean)
export type ColumnsItemDisabled<F> = boolean | ((form: F) => boolean)
export type ColumnsItemRequest<F = any> = (form: F) => Promise<any>
export type ColumnsItemFormat<T = any> = (
  res: T
) =>
| A.SelectInstance['$props']['options']
| A.RadioGroupInstance['$props']['options']
| A.CheckboxGroupInstance['$props']['options']
| A.CascaderInstance['$props']['options']
| A.TreeSelectInstance['$props']['data']

export type ColumnsItemOptionsOrData =
  | A.SelectInstance['$props']['options']
  | A.RadioGroupInstance['$props']['options']
  | A.CheckboxGroupInstance['$props']['options']
  | A.CascaderInstance['$props']['options']
  | A.TreeSelectInstance['$props']['data']

export interface ColumnsItem<F = any> {
  type?: FormType // 类型
  label?: A.FormItemInstance['label'] // 标签
  field: A.FormItemInstance['field'] // 字段(必须唯一)
  span?: number // 栅格占位格数
  col?: A.ColProps // a-col的props, 响应式布局, 优先级大于span
  item?: Omit<A.FormItemInstance['$props'], 'label' | 'field'> // a-form-item的props
  props?:
    | A.InputInstance['$props']
    | A.SelectInstance['$props']
    | A.TextareaInstance['$props']
    | A.DatePickerInstance['$props']
    | A.TimePickerInstance['$props']
    | A.RadioGroupInstance['$props']
    | A.CheckboxGroupInstance['$props']
    | A.InputNumberInstance['$props']
    | A.RateInstance['$props']
    | A.SwitchInstance['$props']
    | A.SliderInstance['$props']
    | A.CascaderInstance['$props']
    | A.TreeSelectInstance['$props']
  rules?: A.FormItemInstance['$props']['rules'] // 表单校验规则
  // 下拉列表|复选框组|单选框组|级联选择组件的options
  options?:
    | A.SelectInstance['$props']['options']
    | A.RadioGroupInstance['$props']['options']
    | A.CheckboxGroupInstance['$props']['options']
    | A.CascaderInstance['$props']['options']
  // 下拉树组件的data
  data?: A.TreeSelectInstance['$props']['data']
  hide?: ColumnsItemHide<F> // 是否隐藏
  disabled?: ColumnsItemDisabled<F> // 是否禁用
  request?: ColumnsItemRequest<F> // 接口请求api
  resultFormat?: ColumnsItemFormat // 结果集格式化
  init?: boolean // 初始化请求
  cascader?: string[] // 级联的field字段列表
}

export interface Options {
  form: Omit<A.FormInstance['$props'], 'model'>
  row?: Partial<typeof import('@arco-design/web-vue')['Row']['__defaults']>
  col?: A.ColProps
  btns?: { hide?: boolean, span?: number, col?: A.ColProps, searchBtnText?: string }
  fold?: { enable?: boolean, index?: number, defaultCollapsed?: boolean }
}

export type Columns<F = any> = ColumnsItem<F>[]
