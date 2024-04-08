import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 设置该路由在侧边栏和面包屑中展示的名字 */
    title?: string
    /** 设置该路由的图标, 记得将svg导入 @/icons/svg */
    svgIcon?: string
    /** 设置该路由的图标, 直接使用Arco Design的Icon(与svgIcon同时设置时, svgIcon将优先生效)*/
    icon?: string
    /**  默认false, 设置true的时候该路由不会在侧边栏出现 */
    hidden?: boolean
    /** 默认true, 如果设置为false, 则不会在面包屑中显示 */
    breadcrumb?: false
    /** 默认true, 如果设置为false, 它则不会显示在Tab栏中 */
    showInTabs?: boolean
    /** 默认false, 如果设置为true, 它则会固定在Tab栏中, 例如首页 */
    affix?: boolean
    /**
     * 当一个路由下面的children声明的路由大于1个时, 自动会变成嵌套的模式
     * 只有一个时, 会将那个子路由当做根路由显示在侧边栏
     * 若想不管路由下面的children声明的个数都显示你的根路由
     * 可以设置alwaysShow: true, 这样就会忽略之前定义的规则, 一直显示根路由
     */
    alwaysShow?: boolean
    /**
     * 示例: activeMenu: "/xxx/xxx"
     * 当设置了该属性进入路由时, 则会高亮activeMenu属性对应的侧边栏
     * 该属性适合使用在有hidden: true属性的路由上
     */
    activeMenu?: string
    /**
     * 是否缓存该路由页面
     * 默认为false, 为true时代表需要缓存, 此时该路由和该页面都需要设置一致的name
     */
    keepAlive?: boolean
    /** 默认路由参数 */
    query?: string
    noShowingChildren?: boolean
    /** 设置该路由进入的权限, 支持多个权限叠加 */
    roles?: string[]
    /** 路由切换是否使用动画 */
    animation?: boolean
    /** 排序 */
    sort?: number
  }
}
