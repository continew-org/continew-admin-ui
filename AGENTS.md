# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

`CLAUDE.md` and `AGENTS.md` are mirror files. Whenever either file changes, apply the identical change to the other file and verify that their contents remain byte-for-byte identical（标题文件名除外）.

## 项目概述

ContiNew Admin UI 是基于 Gi Demo 前端模板开发的 ContiNew Admin 前端适配项目，是一个高质量多租户中后台管理系统的前端部分。技术栈：Vue 3.5 + Arco Design Vue 2.57 + TypeScript 5 + Vite 5 + Pinia。后端对应项目为 continew-admin（Spring Boot 3 + Sa-Token），本前端通过 REST API 与之交互。

## 常用命令

- `pnpm dev`：启动开发服务器（默认端口 5173，自动打开浏览器）。开发环境通过 Vite proxy 代理 `VITE_API_PREFIX` 到 `VITE_API_BASE_URL`。
- `pnpm build`：类型检查（vue-tsc）+ 生产构建，输出到 `dist/`。生产构建会 drop console/debugger，静态资源按类型分目录（static/js、static/[ext]）。
- `pnpm build:test`：以 test 模式构建（使用 `.env.test`，启用 Mock 打包）。
- `pnpm preview`：预览构建产物，端口 5050。
- `pnpm typecheck`：仅运行 `vue-tsc --noEmit` 类型检查，不产出文件。
- `pnpm lint` / `pnpm lint:fix`：基于 `@antfu/eslint-config` 的 ESLint 检查 / 自动修复。配置见 `eslint.config.js`。
- `pnpm bootstrap`：使用 npmmirror 源安装依赖（首次拉取项目用）。

注：项目未配置单元测试框架；通过 `simple-git-hooks` + `lint-staged` 在 pre-commit 时对暂存文件执行 `eslint --fix`。依赖管理使用 pnpm（有 `pnpm.onlyBuiltDependencies` 白名单）。

## 架构与核心约定

### 路径别名与自动导入

- 别名：`@` → `src/`，`~` → 项目根。tsconfig `paths` 仅声明 `@/*`。
- `unplugin-auto-import`：Vue、Vue Router 的 API 及 Vue 3.5 新 API（`useTemplateRef`、`onWatcherCleanup`、`useId`）自动导入，无需手动 import。类型声明生成于 `src/types/auto-imports.d.ts`。
- `unplugin-vue-components`：`src/components` 下的组件自动按需导入（含 `.vue` 与 `.tsx`），声明生成于 `src/types/components.d.ts`。因此 `GiTable`、`GiForm`、`GiPageLayout`、`GiCell*` 等业务组件在模板中直接使用即可，不要重复 import（业务子组件如 `AddDrawer` 仍需显式导入）。
- SCSS 全局变量：`vite.config.ts` 配置 `additionalData: @use "@/styles/var.scss" as *;`，所有 `.scss` 文件可直接使用 `$color-theme`、`$color-text-1` 等变量。

### 路由体系（动态路由 + 守卫）

路由分三类，定义于 `src/router/route.ts`：
- `systemRoutes`：系统级固定路由（登录、仪表盘、个人中心、关于项目等），在 router 创建时即注册。
- `constantRoutes`：兜底路由（redirect 中转页、403/404）。
- 动态路由：登录后由 `useRouteStore.generateRoutes()` 调用 `getUserRoute()` 从后端拉取菜单树，经 `formatAsyncRoutes` 转换（component 字符串 → 真实模块）后 `router.addRoute` 注入。

关键机制（`src/router/`）：
- `asyncModules.ts`：用 `import.meta.glob('@/views/**/*.vue')` 收集所有 views 下的页面模块为映射表，供动态路由的 `component` 字符串匹配。新增页面须放在 `src/views/` 下，文件路径即对应后端返回的 component 字段值（如 `system/user/index`）。
- `guard.ts`：`setupRouterGuard` 处理登录态校验、白名单（`/login`、`/social/callback`、`/pwdExpired`）、动态路由生成、密码过期跳转；生产环境还会比对首页 ETag/Last-Modified 检测版本更新并弹窗提示。`hasRouteFlag` 防止重复生成路由，`resetHasRouteFlag()` 在登出时重置。
- `route.ts` 中 `Layout` 为布局根组件，动态路由的 `component: 'Layout'` 或 `'ParentView'` 会映射到对应组件（见 `stores/modules/route.ts` 的 `layoutComponentMap`）。
- 多级路由（≥3 层）会被 `flatMultiLevelRoutes` 降级为二级，以兼容 keep-alive。
- `RouteMeta`（`src/types/router.d.ts`）扩展了 `title`、`icon`、`hidden`、`keepAlive`、`affix`、`showInTabs`、`activeMenu`、`sort` 等字段，控制菜单/页签/缓存行为。

### 状态管理（Pinia）

Store 位于 `src/stores/modules/`，通过 `src/stores/index.ts` 统一导出，使用 `pinia-plugin-persistedstate` 持久化：
- `app`：主题（light/dark）、主题色、布局模式（mix/top/default/columns）、页签、动画、菜单折叠等；`persist: true`（全量持久化，默认 localStorage）。负责 `initTheme()` 与 `initSiteConfig()`（从后端拉站点配置：title/logo/favicon/版权/备案）。
- `user`：用户信息、token、roles、permissions。仅持久化 `token`、`roles`、`permissions`、`pwdExpiredShow`（localStorage）。登录方式：account/email/phone/social，均带 `clientId`（来自 `VITE_CLIENT_ID`）。
- `route`：动态路由表，`persist: true`。
- `tenant`：多租户开关与 tenantId，持久化到 localStorage。请求头 `X-Tenant-Id` 在 http 拦截器注入。
- `dict`：字典缓存（内存，不持久化）。
- `tabs`：多页签管理。

### HTTP 请求层

`src/utils/http.ts` 是统一请求入口，默认导出 `{ get, post, put, patch, del, request, requestNative, download }`：
- `baseURL` 取 `VITE_API_PREFIX`（开发用代理前缀）或 `VITE_API_BASE_URL`。
- 请求拦截器：注入 `Authorization: Bearer <token>` 与 `X-Tenant-Id`（当租户启用）。
- 响应拦截器：约定后端返回 `{ code, data, msg, success, timestamp }`（`ApiRes<T>`）。`success=false` 时按 msg 长度自动选择 Message（短）或 Notification（长）提示；`code === '401'` 弹 Modal 引导重新登录；blob 响应单独处理（下载错误时解析 JSON）。
- `download` 方法返回原始 `AxiosResponse`，配合 `useDownload` hook 处理文件下载。
- API 模块组织于 `src/apis/<module>/`，每个模块含 `index.ts`（聚合导出）、具体资源文件、`type.ts`（请求/响应类型）。典型 API 函数签名：`http.get<PageRes<T.UserResp[]>>(BASE_URL, query)`。全局类型 `ApiRes`、`PageRes`、`PageQuery` 定义于 `src/types/api.d.ts`。

### 业务组件体系（Gi* 系列）

`src/components/` 下以 `Gi` 前缀的业务组件是列表页开发核心，均自动导入：
- `GiTable`：封装 Arco Table，集成工具栏（列设置、密度、刷新）、分页、插槽（`#top` 放搜索表单、`#toolbar-left/right` 放操作按钮、`#<dataIndex>` 自定义列）。配合 `useTable` hook 使用。
- `GiForm`：基于 columns 配置驱动的表单，`ColumnItem[]` 描述字段（type/field/label/span/props）。常作为 `GiTable` 的 `#top` 搜索区。
- `GiPageLayout`：页面布局容器，支持 `#left` 侧栏插槽（如部门树）。
- `GiCell*`（Avatar/Gender/Status/Tags 等）：表格单元格渲染组件。
- `GiSplitPane`、`GiLeftRightPane`、`GiIframe`、`GiCodeView`、`GiEditTable`、`GiIconSelector`、`GiSvgIcon`、`GiDot`、`GiTag`、`GiSpace`、`GiFooter`、`GiOption*`、`GiThemeBtn` 等。

### Hooks

`src/hooks/modules/` 提供 12 个组合式函数，经 `src/hooks/index.ts` 导出：
- `useTable`：列表页核心，封装分页、加载、多选、查询（search 重置页码为 1）、刷新（refresh 保留页码）、删除（handleDelete 带二次确认 + 自动页码修正）。接收一个 `(page) => Promise<ApiRes<PageRes<T[]>>>` 的 API 函数。
- `usePagination`、`useDownload`、`useResetReactive`（返回 `[state, reset]` 元组）、`useRequest`、`useLoading`、`useChart`、`useDevice`、`useBreakpoint`、`useMultipartUploader`、`useRouteListener`（配合 `setRouteEmitter` 通知路由变化）。

### 权限控制

- 指令：`v-permission="['system:user:create']"`、`v-role="['admin']"`（`src/directives/permission/`），无权限元素从 DOM 移除。
- 编程式：`src/utils/has.ts` 默认导出对象，提供 `hasPerm`、`hasPermOr`、`hasPermAnd`、`hasRole`、`hasRoleOr`、`hasRoleAnd`。超级管理员权限标识 `*:*:*`，超级角色 `role_admin`。
- 权限标识格式：`模块:资源:操作`（如 `system:user:create`），与后端菜单表 `permission` 字段一致。
- 路由级权限：动态路由由后端按用户角色过滤后返回，前端不二次拦截。

### 认证与多租户

- Token 存 localStorage（`src/utils/auth.ts` 的 `TOKEN_KEY = 'token'`）。
- 登录流程：`useUserStore.accountLogin` 等 → 后端返回 token + tenantId → `setToken` + `setTenantId` → 路由守卫触发 `getInfo` 拉用户信息 + `generateRoutes` 生成动态路由。
- 租户：`useTenantStore.needInputTenantCode` 判断是否需要登录页输入租户编码；请求头 `X-Tenant-Id` 全局注入。
- 客户端 ID：`VITE_CLIENT_ID` 环境变量，登录时透传后端（多端认证管理）。

### 布局系统

`src/layout/index.vue` 根据 `appStore.layout` 动态切换四种布局（异步组件）：`LayoutMix`（混合，默认）、`LayoutTop`（顶部）、`LayoutDefault`（左侧）、`LayoutColumns`（分栏）。布局子组件位于 `src/layout/components/`，hooks 位于 `src/layout/hooks/`。

### 环境变量

三个环境文件，变量须以 `VITE_` 开头（`FILE` 前缀也会暴露到客户端）：
- `VITE_API_PREFIX`：开发/测试环境的接口代理前缀（如 `/dev-api`），生产环境留空则直接用 `VITE_API_BASE_URL`。
- `VITE_API_BASE_URL`：后端地址。
- `VITE_API_WS_URL`：WebSocket 地址。
- `VITE_BASE`：应用 base 路径。
- `VITE_BUILD_MOCK`：生产构建是否打包 Mock。
- `VITE_OPEN_DEVTOOLS`：是否开启 Vue DevTools。
- `VITE_APP_SETTING`：是否显示应用配置面板。
- `VITE_CLIENT_ID`：客户端认证 ID。

### Mock

`src/mock/` 下放置 Mock 文件，由 `vite-plugin-mock` 加载。开发环境默认启用（`localEnabled: true`），生产构建按 `VITE_BUILD_MOCK` 决定（`prodEnabled`）。Mock 生产入口通过 `injectCode` 注入 `setupProdMockServer()`。

### 样式体系

- `src/styles/var.scss`：全局 SCSS 变量（颜色映射到 Arco CSS 变量，如 `$color-theme: rgb(var(--primary-6))`），由 Vite `additionalData` 全局注入。
- `src/styles/arco-ui/`：Arco Design 组件样式覆盖（less）。
- `src/styles/index.scss`：全局样式入口，在 `main.ts` 中 import。
- 主题色通过 `@arco-design/color` 的 `generate` 动态生成 `--primary-1` ~ `--primary-10` CSS 变量，由 `useAppStore.setThemeColor` 写入 `document.body`。
- 暗黑模式：`document.body` 设置 `arco-theme="dark"` 属性。

### Vite 插件

插件配置位于 `config/plugins/`：`app-info`（启动时打印项目信息）、`vue`、`vue-jsx`、`devtools`、`auto-import`、`components`、`svg-icon`（SVG 雪碧图，图标放 `src/assets/icons/svg/`，用 `<gi-svg-icon name="xxx" />` 或 `icon-xxx` 引用）、`mock`。

### 代码规范（ESLint）

基于 `@antfu/eslint-config`，关键覆盖（`eslint.config.js`）：
- Vue block 顺序：`[['script','template'],'style']`（script/template 可互换，style 必须最后）。
- `defineOptions`、`defineModel`、`defineProps`、`defineEmits`、`defineSlots` 宏顺序固定，`defineExpose` 必须最后。
- 箭头函数参数必须加括号；大括号风格 1tbs（允许单行）。
- 忽略：`**/*.md`、`.github`、`.image`、`src/types/shims-vue.d.ts`。
- 组件命名：使用 `defineOptions({ name: 'XxxYyy' })` 显式命名，便于 keep-alive 与 devtools 识别。

### 新增业务模块的典型流程

1. `src/apis/<module>/`：新增 `xxx.ts`（API 函数）、`type.ts`（类型）、在 `index.ts` 聚合导出，并在 `src/apis/index.ts` 透传。
2. `src/views/<module>/xxx/`：新增 `index.vue`（列表页，用 `GiPageLayout` + `GiTable` + `GiForm` + `useTable`）、`AddDrawer.vue`/`AddModal.vue`（新增/编辑）、`DetailDrawer.vue`（详情）等子组件。
3. 路由与菜单由后端菜单管理配置（component 字段对应 views 路径），前端无需手动改路由文件。
4. 权限标识遵循 `模块:资源:操作` 格式，在按钮上加 `v-permission`。
5. 列表页参考 `src/views/system/user/index.vue` 的写法（queryForm + columns + useTable + 子组件 ref 调用）。

## Agent skills

### Issue tracker

Issues live as GitHub issues in `continew-org/continew-admin-ui`; use the `gh` CLI for all operations. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
