import type { App } from 'vue'
import hasPerm from './permission/hasPerm'
import hasRole from './permission/hasRole'

export default {
  install(Vue: App) {
    Vue.directive('permission', hasPerm)
    Vue.directive('role', hasRole)
  }
}
