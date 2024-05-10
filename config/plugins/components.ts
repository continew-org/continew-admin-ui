import components from 'unplugin-vue-components/vite'

export default function createComponents() {
  return components({
    // 指定组件位置，默认是 src/components 自动导入自定义组件
    dirs: ['src/components'],
    extensions: ['vue', 'tsx'],
    // 配置文件生成位置
    dts: './src/types/components.d.ts'
  })
}
