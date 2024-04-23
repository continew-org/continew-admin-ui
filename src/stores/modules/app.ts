import { defineStore } from 'pinia'
import { listOptionDict, type BasicConfigResp } from '@/apis'
import { computed, reactive, toRefs } from 'vue'
import { generate, getRgbStr } from '@arco-design/color'
import defaultSettings from '@/config/setting.json'

const storeSetup = () => {
  // App配置
  const settingConfig = reactive({ ...defaultSettings }) as App.SettingConfig
  // 页面切换动画类名
  const transitionName = computed(() => (settingConfig.animate ? settingConfig.animateMode : ''))

  // 深色菜单主题色变量
  const themeCSSVar = computed<Record<string, string>>(() => {
    const obj: Record<string, string> = {}
    const list = generate(settingConfig.themeColor, { list: true, dark: true })
    list.forEach((color: string, index: number) => {
      obj[`--primary-${index + 1}`] = getRgbStr(color)
    })
    return obj
  })

  // 切换主题 暗黑模式|简白模式
  const toggleTheme = (dark: boolean) => {
    if (dark) {
      settingConfig.theme = 'dark'
      document.body.setAttribute('arco-theme', 'dark')
    } else {
      settingConfig.theme = 'light'
      document.body.removeAttribute('arco-theme')
    }
    setThemeColor(settingConfig.themeColor)
  }

  // 设置主题色
  const setThemeColor = (color: string) => {
    if (!color) return
    settingConfig.themeColor = color
    const list = generate(settingConfig.themeColor, { list: true, dark: settingConfig.theme === 'dark' })
    list.forEach((color: string, index: number) => {
      const rgbStr = getRgbStr(color)
      document.body.style.setProperty(`--primary-${index + 1}`, rgbStr)
    })
  }

  // 初始化主题
  const initTheme = () => {
    if (!settingConfig.themeColor) return
    setThemeColor(settingConfig.themeColor)
  }

  // 设置左侧菜单折叠状态
  const setMenuCollapse = (collapsed: boolean) => {
    settingConfig.menuCollapse = collapsed
  }

  // 系统配置配置
  const siteConfig = reactive({}) as BasicConfigResp
  // 初始化系统配置
  const initSiteConfig = () => {
    listOptionDict({
      code: ['site_favicon', 'site_logo', 'site_title', 'site_copyright']
    }).then((res) => {
      const resMap = new Map()
      res.data.forEach((item) => {
        resMap.set(item.label, item.value)
      })
      siteConfig.site_logo = resMap.get('site_logo')
      siteConfig.site_favicon = resMap.get('site_favicon')
      siteConfig.site_title = resMap.get('site_title')
      siteConfig.site_copyright = resMap.get('site_copyright')
      document.title = resMap.get('site_title')
      document
        .querySelector('link[rel="shortcut icon"]')
        ?.setAttribute('href', resMap.get('site_favicon') || '/favicon.ico')
    })
  }

  // 设置系统配置
  const setSiteConfig = (config: BasicConfigResp) => {
    Object.assign(siteConfig, config)
    document.title = config.site_title || ''
    document.querySelector('link[rel="shortcut icon"]')?.setAttribute('href', config.site_favicon || '/favicon.ico')
  }

  const getFavicon = () => {
    return siteConfig.site_favicon
  }

  const getLogo = () => {
    return siteConfig.site_logo
  }

  const getTitle = () => {
    return siteConfig.site_title
  }

  const getCopyright = () => {
    return siteConfig.site_copyright
  }

  return {
    ...toRefs(settingConfig),
    ...toRefs(siteConfig),
    transitionName,
    themeCSSVar,
    toggleTheme,
    setThemeColor,
    initTheme,
    setMenuCollapse,
    initSiteConfig,
    setSiteConfig,
    getFavicon,
    getLogo,
    getTitle,
    getCopyright
  }
}

export const useAppStore = defineStore('app', storeSetup, { persist: true })
