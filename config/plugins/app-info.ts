import boxen from 'boxen'
import picocolors from 'picocolors'
import type { Plugin } from 'vite'

export default function appInfo(): Plugin {
  return {
    name: 'appInfo',
    apply: 'serve',
    async buildStart() {
      const { bold, green, cyan, bgGreen, underline } = picocolors
      // eslint-disable-next-line no-console
      console.log(
        boxen(
          `${bold(green(`${bgGreen('ContiNew Admin v3.1.0-SNAPSHOT')}`))}\n${cyan('在线文档：')}${underline('https://continew.top')}\n${cyan('持续迭代优化的前后端分离中后台管理系统框架。')}`,
          {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            textAlignment: 'center'
          }
        )
      )
    }
  }
}
