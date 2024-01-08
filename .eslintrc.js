// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    // Parser that checks the content of the <script> tag
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'browser': true,
    'node': true,
    'vue/setup-compiler-macros': true,
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: [
    // Airbnb JavaScript Style Guide https://github.com/airbnb/javascript
    'airbnb-base',
    'plugin:vue/vue3-essential', // vue3语法规则
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  },
  /*
   * 'off' 或 0：关闭规则
   * 'warn' 或 1：打开的规则作为警告（不影响代码执行）
   * 'error' 或 2：规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'warn',
    // Vue: Recommended rules to be closed or modify
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    // Vue: Add extra rules
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/no-v-text': 'warn',
    'vue/padding-line-between-blocks': 'warn',
    'vue/require-direct-export': 'warn',
    'vue/multi-word-component-names': 'off',
    // Allow @ts-ignore comment
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'prefer-regex-literals': 'off',
    'import/no-extraneous-dependencies': 'off',
    'camelcase': 'off',
  },
};
