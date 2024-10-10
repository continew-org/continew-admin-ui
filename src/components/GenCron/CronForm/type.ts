// cron 参数类型
export interface CronPropType {
  modelValue: string
  disabled: boolean
  hideSecond: boolean
  hideYear: boolean
  placeholder: string
  callback: (expression: string, timestamp: number, validated: boolean) => void
}
