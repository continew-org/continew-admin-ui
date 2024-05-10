import { createApp } from 'vue'
import ArcoVue, { Card, Modal } from '@arco-design/web-vue'
import '@/styles/arco-ui/index.less'
import 'md-editor-v3/lib/style.css'
// import '@arco-themes/vue-gi-demo/index.less'
// import '@arco-design/web-vue/dist/arco.css'

// 额外引入 Arco Design Icon图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import router from './router'

import '@/router/permission'

// 使用动画库
import 'animate.css/animate.min.css'

// 自定义过渡动画
import '@/styles/css/transition.css'

// 导入全局scss主文件
import '@/styles/index.scss'

// 支持SVG
import 'virtual:svg-icons-register'

// 自定义指令
import directives from './directives'
import pinia from '@/stores'

// 对特定组件进行默认配置
Card.props.bordered = false

const app = createApp(App)
Modal._context = app._context

app.use(router)
app.use(pinia)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(directives)

app.mount('#app')
