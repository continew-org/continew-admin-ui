import type * as A from '@arco-design/web-vue'
import type { VNode } from 'vue'

export type ColumnItemType =
  | 'input'
  | 'input-number'
  | 'input-tag'
  | 'textarea'
  | 'select'
  | 'tree-select'
  | 'radio-group'
  | 'checkbox-group'
  | 'date-picker'
  | 'year-picker'
  | 'quarter-picker'
  | 'month-picker'
  | 'week-picker'
  | 'time-picker'
  | 'range-picker'
  | 'color-picker'
  | 'rate'
  | 'switch'
  | 'slider'
  | 'cascader'
  | 'upload'
  | 'auto-complete'
  | 'mention'
  | ''

export type ComponentProps =
  & A.InputInstance['$props']
  & A.InputNumberInstance['$props']
  & A.InputTagInstance['$props']
  & A.TextareaInstance['$props']
  & A.SelectInstance['$props']
  & A.TreeSelectInstance['$props']
  & A.RadioGroupInstance['$props']
  & A.CheckboxGroupInstance['$props']
  & A.DatePickerInstance['$props']
  & A.YearPickerInstance['$props']
  & A.QuarterPickerInstance['$props']
  & A.MonthPickerInstance['$props']
  & A.WeekPickerInstance['$props']
  & A.TimePickerInstance['$props']
  & A.RangePickerInstance['$props']
  & A.ColorPickerInstance['$props']
  & A.RateInstance['$props']
  & A.SwitchInstance['$props']
  & A.SliderInstance['$props']
  & A.CascaderInstance['$props']
  & A.UploadInstance['$props']
  & A.AutoCompleteInstance['$props']
  & A.MentionInstance['$props']

interface ColumnItemProps extends Partial<Omit<ComponentProps, 'placeholder'>> {
  placeholder?: string | string[]
}

export interface ColumnItem {
  type?: ColumnItemType
  title: string
  dataIndex: string
  required?: boolean
  rules?: A.FormItemInstance['$props']['rules'] // 表单校验规则
  props?: ColumnItemProps
  columnProps?: Partial<Omit<A.TableColumnInstance['$props'], 'title'>> & { title?: string | (() => VNode) }
  formItemProps?: A.FormItemInstance['$props']
  slotName?: string
}

export type Disabled<T> = boolean | ((e: { row: T, rowIndex: number, col: ColumnItem }) => boolean)
