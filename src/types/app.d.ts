declare namespace App {
  /** 系统配置 */
  interface SettingConfig {
    theme: 'light' | 'dark' // 主题
    themeColor: string // 主题色
    tab: boolean // 是否显示页签
    tabMode: TabType // 页签风格
    animate: boolean // 是否显示动画
    animateMode: AnimateType // 动画类名
    menuCollapse: boolean // 左侧菜单折叠状态
    menuAccordion: boolean // 左侧菜单手风琴效果
    menuDark: boolean // 菜单深色模式
    layout: 'left' | 'mix'
  }
  /** 导航页签的样式类型 */
  type TabType = 'card' | 'card-gutter' | 'rounded'
  interface TabItem {
    label: string
    value: TabType
  }
  /** 页面切换动画类型 */
  type AnimateType = 'zoom-fade' | 'slide-dynamic-origin' | 'fade-slide' | 'fade' | 'fade-bottom' | 'fade-scale'
  interface AnimateItem {
    label: string
    value: AnimateType
  }
}
