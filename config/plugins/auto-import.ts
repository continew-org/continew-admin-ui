import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return autoImport({
    // 自动导入 vue 相关函数，如: ref、reactive、toRef等
    imports: [
      'vue',
      'vue-router',
      'pinia'
    ],
    dts: './src/types/auto-imports.d.ts'
  })
}
