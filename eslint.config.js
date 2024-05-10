import antfu from '@antfu/eslint-config'

// https://github.com/antfu/eslint-config
export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      'README.md',
      'src/types/shims-vue.d.ts'
    ]
  },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': [2, {
        order: [['script', 'template'], 'style']
      }], // 强制组件顶级元素的顺序
      'vue/html-self-closing': [0, {
        html: {
          void: 'never',
          normal: 'always',
          component: 'never'
        }
      }], // 强制自结束样式
      'vue/custom-event-name-casing': [2, 'kebab-case'], // 对自定义事件名称强制使用特定大小写
      'vue/singleline-html-element-content-newline': 0, // 要求在单行元素的内容前后换行
      'vue/first-attribute-linebreak': 0, // 强制第一个属性的位置
      'vue/define-macros-order': [2, {
        order: ['defineOptions', 'defineModel', 'defineProps', 'defineEmits', 'defineSlots'],
        defineExposeLast: false
      }], // 强制执行定义限制和定义弹出编译器宏的顺序
      'vue/html-indent': 0, // 在《模板》中强制一致的缩进
      'vue/html-closing-bracket-newline': 0 // 要求或不允许在标记的右括号前换行
    }
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      'curly': [0, 'all'], // 对所有控制语句强制使用一致的大括号样式
      'dot-notation': 0, // 尽可能强制使用点表示法。 在 JavaScript 中，可以使用点表示法 (foo.bar) 或方括号表示法 (foo["bar"]) 访问属性
      'no-new': 0, // 不允许在赋值或比较之外使用 new 运算符
      // 'no-console': 2, // 禁止使用 console
      'no-process-env': 0,
      'style/arrow-parens': [2, 'always'], // 箭头函数参数需要括号
      'style/brace-style': [2, '1tbs', { allowSingleLine: true }], // 对块执行一致的大括号样式
      'style/comma-dangle': [2, 'never'], // 要求或不允许尾随逗号
      'ts/consistent-type-definitions': 0,
      'node/prefer-global/process': 0,
      'antfu/top-level-function': 0,
      'antfu/if-newline': 0
    }
  }
)
