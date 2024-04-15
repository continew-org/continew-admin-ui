import { defineStore } from 'pinia'
import { computed, reactive, toRefs } from 'vue'
import { generate, getRgbStr } from '@arco-design/color'
import defaultSettings from '@/config/setting.json'
import type { BasicConfigRecordResp } from '@/apis'
import { listOption } from '@/apis'

const storeSetup = () => {
  // App配置
  const settingConfig = reactive({ ...defaultSettings }) as App.SettingConfig
  // 系统配置
  const webConfig = reactive({}) as BasicConfigRecordResp

  const getLogo = () => {
    return webConfig.site_logo;
  }
  const getFavicon = () => {
    return webConfig.site_favicon
  }
  const getTitle = () => {
    return webConfig.site_title
  }
  const getCopyright = () => {
    return webConfig.site_copyright
  }

  // 初始化系统配置
  const initWebConfig = () => {
     listOption({
      code: ['site_title', 'site_copyright', 'site_favicon', 'site_logo']
    }).then((res) => {
      const resMap = new Map()
      res.data.forEach((item) => {
        resMap.set(item.label, item.value)
      })
       webConfig.site_title=resMap.get('site_title');
       webConfig.site_copyright=resMap.get('site_copyright');
       webConfig.site_logo=resMap.get('site_logo');
       webConfig.site_favicon=resMap.get('site_favicon');
      document.title = resMap.get('site_title')
      document
        .querySelector('link[rel="shortcut icon"]')
        ?.setAttribute('href', resMap.get('site_favicon') || 'https://cnadmin.charles7c.top/favicon.ico')
    })
  }

  // 保存系统配置
  const saveWebConfig = (config: BasicConfigRecordResp) => {
    Object.assign(webConfig,config)
    document.title = config.site_title || ''
    document
      .querySelector('link[rel="shortcut icon"]')
      ?.setAttribute('href', config.site_favicon || 'https://cnadmin.charles7c.top/favicon.ico')
  }

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

  return {
    ...toRefs(settingConfig),
    ...toRefs(webConfig),
    transitionName,
    themeCSSVar,
    toggleTheme,
    setThemeColor,
    initTheme,
    setMenuCollapse,
    getLogo,
    getFavicon,
    getTitle,
    getCopyright,
    initWebConfig,
    saveWebConfig
  }
}

export const useAppStore = defineStore('app', storeSetup, {persist: true})
