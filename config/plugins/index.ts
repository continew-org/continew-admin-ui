import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import appInfo from './app-info'
import createDevtools from './devtools'
import createAutoImport from './auto-import'
import createComponents from './components'
import createSvgIcon from './svg-icon'
import createMock from './mock'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [appInfo(), vue(), vueJsx()]
  vitePlugins.push(createDevtools(viteEnv))
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createMock(viteEnv, isBuild))
  return vitePlugins
}
