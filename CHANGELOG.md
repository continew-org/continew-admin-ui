## v2.5.0 (2024-03-23)

### ✨ 新特性

* 新增代码批量生成功能 ([2353caf](https://github.com/Charles7c/continew-admin-ui/commit/2353caffa9ddfbf8c0f9657c1f2e89b14eff38db))

### 💎 功能优化

- 调整代码生成 API 地址 ([b4bb469](https://github.com/Charles7c/continew-admin-ui/commit/b4bb4693dfd694bcc5f10be32cf7d405af92367e))
- 适配部分 API 响应格式调整为 kv 格式的变化 ([6f5c35e](https://github.com/Charles7c/continew-admin-ui/commit/6f5c35ea77b1e3880bca477ec027d074915341e8))
- 调整文件管理配置存储库按钮风格 ([aeafc2e](https://github.com/Charles7c/continew-admin-ui/commit/aeafc2ece2012b53bfe8ff6c64fed9ad73f9d188))
- 代码生成字段配置增加字段排序信息 ([e9d3865](https://github.com/Charles7c/continew-admin-ui/commit/e9d38658920f49e0bb0600e779621c44d388057e))
- 优化部分 ref API 使用方式 ([e6fa9f6](https://github.com/Charles7c/continew-admin-ui/commit/e6fa9f60a927f639b8b7f6145982a395506b3150))
- 重构代码生成功能，由指定路径生成模式调整为下载模式，更方便复杂场景 ([7792cd3](https://github.com/Charles7c/continew-admin-ui/commit/7792cd398f6c4a2d10187cb548ba687dc8f62c84))

## v2.4.0 (2024-02-16)

### ✨ 新特性

* 系统日志详情新增 traceId 链路号显示 ([7359823](https://github.com/Charles7c/continew-admin-ui/commit/735982373a13889340970623bce544dafc574cdb))

### 💎 功能优化

- 取消用户默认密码，改为表单填写密码 ([e519d74](https://github.com/Charles7c/continew-admin-ui/commit/e519d746c92596d0b4a568aef26218b8c4c1e4f4)) ([dd1127e](https://github.com/Charles7c/continew-admin-ui/commit/dd1127e2b8ddfad70e67fca5502505fb269236cc))
- 部分 ID 列 => 序号列 ([678aa92](https://github.com/Charles7c/continew-admin-ui/commit/678aa92457dc172a300e78e9523ab0fe50715947))

### 🐛 问题修复

- 修复暗黑模式下返回到登录页面时的部分样式错乱 ([65e564d](https://github.com/Charles7c/continew-admin-ui/commit/65e564dc67c06a18bc543d032d430718ae620cb9))

## v2.3.0 (2024-01-21)

### ✨ 新特性

* 引入 unplugin-auto-import，减少重复性 Vue 函数引入 ([b56f029](https://github.com/Charles7c/continew-admin-ui/commit/b56f029e680dc86f8bba174d80ef90ed11f9f25c))

### 💎 功能优化

- 优化部分弹窗提示 ([74b03bc](https://github.com/Charles7c/continew-admin-ui/commit/74b03bc3f62e90e987ff9b1a72fedaa903f85b1e))
- 优化部分字段名称 ([b2aa711](https://github.com/Charles7c/continew-admin-ui/commit/b2aa7114bca66c7c9ab9e71a7f757390cf2a4e54))
- ESLint 配置语义化 ([cd34761](https://github.com/Charles7c/continew-admin-ui/commit/cd3476107ef69f0889473abee416db3ad29701e7))
- 调整 Vue 组件内 script 标签到 template 标签之前 ([01dd38f](https://github.com/Charles7c/continew-admin-ui/commit/01dd38f8abccf5d88d8cd0d73df438f3389de7f7))

### 🐛 问题修复

- 修复 fieldset 在暗黑模式的样式问题 ([470fad3](https://github.com/Charles7c/continew-admin-ui/commit/470fad3a0bfd3fbd343252a49078b28b779d1be5))
