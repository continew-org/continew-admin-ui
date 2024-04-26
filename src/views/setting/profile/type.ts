export interface ModeItem {
  title: string
  icon: string
  subtitle: string
  type: 'phone' | 'email' | 'gitee' | 'github'
  jumpMode: 'link' | 'modal'
  status: boolean
}
