## [v3.1.0](https://github.com/Charles7c/continew-admin-ui/compare/v3.0.1...v3.1.0) (2024-06-16)

### ✨ 新特性

* 系统配置新增安全设置功能 ([395a564](https://github.com/Charles7c/continew-admin-ui/commit/395a5642afbe3bac8b6b3f161949264a874033ba))
* useTable 支持 “无分页” 列表 ([1421412](https://github.com/Charles7c/continew-admin-ui/commit/1421412d678c926868b06ae8adeba292f390d3b1))
* 图片文件支持缩略图 (GitHub#17) ([c82dc90](https://github.com/Charles7c/continew-admin-ui/commit/c82dc9083bf7dbb9cccdd7c4daff6fe743eb9a0c))
* 在线用户增加最后活跃时间显示 ([fff4de5](https://github.com/Charles7c/continew-admin-ui/commit/fff4de56f30d3e3f777bd45b2f77be61bba3a555)) ([4eef0db](https://github.com/Charles7c/continew-admin-ui/commit/4eef0db9f93cb73e10113c8f69ad547f502db621))
* 新增行为验证码，行为验证码重新上线 (Gitee#7) ([778b3c6](https://github.com/Charles7c/continew-admin-ui/commit/778b3c677fee14071d49355980936b52d16a7313))
* 新增消息中心 ([fdd4b9a](https://github.com/Charles7c/continew-admin-ui/commit/fdd4b9a4dfcb600e8455c5c402fc6f818b6f1507))
* 新增 WebSocket 消息通知 (GitHub#20) ([adc6f64](https://github.com/Charles7c/continew-admin-ui/commit/adc6f643b3ba481313b3f23e876eb4836d8753b4)) ([56b1fdd](https://github.com/Charles7c/continew-admin-ui/commit/56b1fdd75521b08334b25e2d03f7cbcfe2014360)) ([c104ba5](https://github.com/Charles7c/continew-admin-ui/commit/c104ba5445f1c990b08ec5fd3a8cf1d783d65c76))
* 新增邮件配置 (Gitee#8) ([1ebfd11](https://github.com/Charles7c/continew-admin-ui/commit/1ebfd115eb4f488a7a9464415ce061f9ad36eca0)) ([45cbabf](https://github.com/Charles7c/continew-admin-ui/commit/45cbabf54503210305f7e74382fa7c4d702c359c)) ([66f89b4](https://github.com/Charles7c/continew-admin-ui/commit/66f89b44d897b7e6874b9882e8708cadf5ab60aa)) ([6e520a3](https://github.com/Charles7c/continew-admin-ui/commit/6e520a30720c418b7484f37c1736f189613e83ce))
* 文件管理增加复制文件 URL 按钮 ([5c6d311](https://github.com/Charles7c/continew-admin-ui/commit/5c6d3119eb4aab0f679aaeadcead7f96f6f1ea22))
* 新增版权条显示配置 ([0f3d927](https://gitee.com/continew/continew-admin-ui/commit/0f3d927f9894e296e5dde83feb1738206c44b5b1)) ([d7e29e2](https://gitee.com/continew/continew-admin-ui/commit/d7e29e238ee31301807275be1147824295995650))
* 新增密码过期修改页面逻辑 ([921d9c6](https://github.com/charles7c/continew-admin-ui/commit/921d9c63e955711473e1c911f59da4711cdc1197))
* 新增前端简略版本更新提示 ([03d05e1](https://github.com/charles7c/continew-admin-ui/commit/03d05e1821a0360afa724d86ce34a51aedb9c07e))

### 💎 功能优化

- 路由多级缓存调整为扁平化方案 ([5f3dd93](https://github.com/Charles7c/continew-admin-ui/commit/5f3dd93376ed62c803d6e26965f43812c86abee8))
- 优化 ESLint 配置并更正问题代码（eslint src --fix） ([5d9fedc](https://github.com/Charles7c/continew-admin-ui/commit/5d9fedc35406e00d88d8921ffe04b99a7c49cb8e))
- 代码生成预览调整为以文件树结构形式显示 (Gitee#5) ([c9198b3](https://github.com/Charles7c/continew-admin-ui/commit/c9198b315c25cb3e8fd7f769b543e98e131f878c))
- 优化公告和字典项响应式窗口效果 ([4c2f36f](https://github.com/Charles7c/continew-admin-ui/commit/4c2f36fe6b5254a613cabd686501e891cd8c7d1c))
- 优化个人中心部分代码 ([eb11cae](https://github.com/Charles7c/continew-admin-ui/commit/eb11cae635ff4a0661603509cec4e85a462f5a63))
- 更换 ESLint 配置为 @antfu/eslint-config ([bfc8e42](https://github.com/Charles7c/continew-admin-ui/commit/bfc8e42bad6777243fdca9bf37b0d95a92c75159))
- 代码生成预览样式调整 (Gitee#6) ([fe656af](https://github.com/Charles7c/continew-admin-ui/commit/fe656af1aa1afbc290cf6a6121347106adf5df60)) ([cc0840e](https://github.com/Charles7c/continew-admin-ui/commit/cc0840e2ae7f25f25432c6a01781ac1a8112eea7))
- 启动项目时，控制台增加应用信息打印 ([52e7682](https://github.com/Charles7c/continew-admin-ui/commit/52e7682a4786ae6e3fae49dcbd8ee473f30d2cb5))
- 优化部分弹框响应式效果 ([c1c5f7f](https://github.com/Charles7c/continew-admin-ui/commit/c1c5f7f632827286982fdc0b9235cb115298e541))
- 优化文件管理部分显示效果 ([7a2c66e](https://github.com/Charles7c/continew-admin-ui/commit/7a2c66e6463eb50d8c7bee0dcd21c396fe642ceb))
- 优化重置路由实现 ([7c1106e](https://github.com/Charles7c/continew-admin-ui/commit/7c1106e8c26d3dc3c2ecee93f9f98bc56a171720))
- 优化 copy 组件使用 ([c369b88](https://github.com/Charles7c/continew-admin-ui/commit/c369b88185c85bb7782383617fd6debf1f6c16d9)) ([a8b5d97](https://github.com/Charles7c/continew-admin-ui/commit/a8b5d97bfa0ed256205284deb7364bf50e18927a))
- 优化用户角色名称展示 ([d4b9057](https://github.com/Charles7c/continew-admin-ui/commit/d4b9057554f7bbe58d45429529d7279182100616))
- 优化删除弹窗按钮样式 ([c2806c4](https://github.com/Charles7c/continew-admin-ui/commit/c2806c469695adbe3ef1950957a33d48059c6cb6))
- 优化表格页面样式及表格纵向滚动条 ([861f620](https://github.com/Charles7c/continew-admin-ui/commit/861f6203cc0ebcdd7087434c9d8bafccf4360812))
- 重构字典管理（左树右表） ([a175120](https://github.com/Charles7c/continew-admin-ui/commit/a175120d699f5da099e7f027a6c5f0fba26705d8)) ([aac5899](https://github.com/Charles7c/continew-admin-ui/commit/aac5899fe0a01fe0e91ffc1904c94ac9ecaa4885))
- 重构用户管理部门树，支持部门管理 ([ca05fab](https://github.com/Charles7c/continew-admin-ui/commit/ca05fabdec277965057f7901317edefca74cb258)) ([1be08f1](https://github.com/Charles7c/continew-admin-ui/commit/1be08f10010654dc675d67b792f1fc870df5961e)) ([f8ded4b](https://github.com/Charles7c/continew-admin-ui/commit/f8ded4b491a22369d43ff3e76f75c771130c4f1c))
- 优化表格列表显示 ([ed7be3e](https://github.com/Charles7c/continew-admin-ui/commit/ed7be3ef25a91d66bcd33bae6176ecb81c85ec44))
- 优化文件管理分页 ([00da9ac](https://github.com/Charles7c/continew-admin-ui/commit/00da9acdd09e4f2f8233ec22ae37408f9a027674))
- 优化系统配置加载与切换问题 ([605ac4d](https://github.com/Charles7c/continew-admin-ui/commit/605ac4d0865e2b7471583f3e0b5a14993bf25104))
- 优化全局 loading 及 empty 配置 ([7e329fc](https://github.com/Charles7c/continew-admin-ui/commit/7e329fcffacc58cb626b3b7a71a53d8decc170f7))
- 适配系统参数 API 新的使用方式 ([1909b6e](https://github.com/Charles7c/continew-admin-ui/commit/1909b6e907f8d8dd00d8e59eff8c2125914cad3f))
- 存储管理S3存储配置填充默认域名 (GitHub#21) ([5897bde](https://github.com/Charles7c/continew-admin-ui/commit/5897bde0c45dd61a94ac9bcf85b55f12a7fe5133))
- 优化个人中心部分默认显示效果 ([f2206b7](https://github.com/Charles7c/continew-admin-ui/commit/f2206b78012d594010bc6cee47a95a9ebab1ad1b))
- 调整对话框默认可拖拽，表格默认可调整列宽 ([5581d3f](https://github.com/Charles7c/continew-admin-ui/commit/5581d3fd8910997d61ca6e281cec50caef264ca3))
- 目录下仅有一个菜单时平铺展示 ([dc4ae0f](https://github.com/Charles7c/continew-admin-ui/commit/dc4ae0fb34a940030f4fc1841ede3557ccccb58c))


### 🐛 问题修复

- 修复用户列表禁用列错误 ([1e5a50c](https://github.com/Charles7c/continew-admin-ui/commit/1e5a50c37bc8dbc18d917e523b0a215a510f57db))
- 修复菜单管理列表滚动问题 ([5101dd1](https://github.com/Charles7c/continew-admin-ui/commit/5101dd12d9769d8927afb40619fb68d696c22a82))
- 修复打包部署后或 preview 模式下，布局切换及页签显示异常 ([68d8f0f](https://github.com/Charles7c/continew-admin-ui/commit/68d8f0f5b36be162a0c64d500d845388c239c4a7))
- 修复文件管理图表加载错误 ([d1af509](https://github.com/Charles7c/continew-admin-ui/commit/d1af509a1aaa7d1a6982f3dcdadb7202b71b9475))
- 字典编码不允许修改 ([0a6cd6e](https://github.com/Charles7c/continew-admin-ui/commit/0a6cd6ef989309a450a810852cbd74e35ed29b6a))
- 修复字典重复请求问题 ([6705027](https://github.com/Charles7c/continew-admin-ui/commit/6705027273e098cde57792743c3a0bdacb559449)) ([30222b0](https://github.com/Charles7c/continew-admin-ui/commit/30222b08ab6539552f3679f4cb9442f477f4df55))
- 代码生成配置表单校验错误自动跳转回错误 tab ([a015d9f](https://github.com/Charles7c/continew-admin-ui/commit/a015d9f843cb72aeb99674a271914044a4e00794))
- 修复文件管理左侧‘全部’查询问题 ([d6c5b89](https://github.com/Charles7c/continew-admin-ui/commit/d6c5b8988c84d6d33474d51162bad12973b86c91))
- 修复导出报 400 的问题 ([377a1ff](https://github.com/Charles7c/continew-admin-ui/commit/377a1ff1b74fa357545c3298e5b9c480b0f3f0d3))
- 修复用户管理排序参数错误 ([bcbe106](https://github.com/Charles7c/continew-admin-ui/commit/bcbe10660fbfdab5a7c7b17c9353aba3adc12638))
- 修复初始值使用错误 ([fd55ad4](https://github.com/Charles7c/continew-admin-ui/commit/fd55ad422888f74ea2deda679172db0cff923c9f))
- 修复第三方登录错误 ([a775b86](https://github.com/Charles7c/continew-admin-ui/commit/a775b86e2e0973a16e6b9a1945acbd904773b876))
- 修复验证码长度限制错误 ([8702be4](https://github.com/Charles7c/continew-admin-ui/commit/8702be45ed64dde39f443c2e5570fd2474821e6b))

## [v3.0.1](https://github.com/Charles7c/continew-admin-ui/compare/v3.0.0...v3.0.1) (2024-05-03)

### ✨ 新特性

* 新增表格全屏、尺寸工具 ([b8a84a3](https://github.com/Charles7c/continew-admin-ui/commit/b8a84a3a0890d4f6d0e39ecbe50c4f645bd0f106))
* 新增验证码超时显示效果，超时后显示已过期请刷新 (GitHub#14) ([f99c8f1](https://github.com/Charles7c/continew-admin-ui/commit/f99c8f1b5a521f987b2822352f976fb0b1dc93b3))
* 文件管理增加资源统计，统计总存储量、各类型文件存储占用 (GitHub#15) ([c70d1ad](https://github.com/Charles7c/continew-admin-ui/commit/c70d1adbf922d28853bf4e6cf8cc4e14ad5b0ac7))

### 💎 功能优化

- 统一性别约束/统一上级部门为必填 ([5264cf2](https://github.com/Charles7c/continew-admin-ui/commit/5264cf226fa3acd1398d9309e6a97d4d45b64850))
- 一级部门不能修改上级部门 ([b2a1658](https://github.com/Charles7c/continew-admin-ui/commit/b2a1658e3730078cf2fbeb3032c23c0922544594))
- 优化根据选中部门查询用户的点击效果 ([ca25285](https://github.com/Charles7c/continew-admin-ui/commit/ca252852373840b000c1f65ab925d18335a71fcb)) ([99c37d7](https://github.com/Charles7c/continew-admin-ui/commit/99c37d7de4a245836f89c29cf4b638032efae31f))
- 登录页面，H5 端排版更换 ([05ab89d](https://github.com/Charles7c/continew-admin-ui/commit/05ab89d03fe6401994698ad9ecdeb8540ec49553))
- 优化 queryForm 的 Query 类型使用 ([5b71369](https://github.com/Charles7c/continew-admin-ui/commit/5b713692516db586f2d401a163192c62a963137a))


### 🐛 问题修复

- 修复 Markdown 样式加载错误，改为全局统一加载 (GitHub#9) ([64648d0](https://github.com/Charles7c/continew-admin-ui/commit/64648d0c1d897d6e426199e7924ede9dfb40e8b8))
- 修复由于文件组件名称错误导致的侧边栏筛选功能失效 ([81dbea8](https://github.com/Charles7c/continew-admin-ui/commit/81dbea879377054e3646c2d07b51c3352501bbce))
- 修复文件管理数据不刷新和批量操作选中问题 (GitHub#13) ([724f60e](https://github.com/Charles7c/continew-admin-ui/commit/724f60eaf6b076cfb165ca0b1028c461146495ad))
- 修复文件重命名时不能回显原值的问题 ([3dfa97e](https://github.com/Charles7c/continew-admin-ui/commit/3dfa97e785acb42edd3798117f7e8eea326b4b64))
- 修复修改公告时保存按钮点击无效的问题 ([c0a5c2d](https://github.com/Charles7c/continew-admin-ui/commit/c0a5c2dffe50905b8610fbd066b8eecd5a4cbe89))
- 修复账号管理、安全设置路由处理错误 ([c0c5ba8](https://github.com/Charles7c/continew-admin-ui/commit/c0c5ba8efdab009e7e38ad9a8f68a655aba28718))
- 修复首页卡片显示问题 ([39465dc](https://github.com/Charles7c/continew-admin-ui/commit/39465dcaa38c9d79c820583a1dd82978e5588dec))
- 修复 H5 下登录页面错位显示 ([9d570a8](https://github.com/Charles7c/continew-admin-ui/commit/9d570a808ce1a15a1513eac0e9ec355d683febef))

## v3.0.0 (2024-04-27)

### ✨ 新特性

* 基于 Gi-Demo 前端模板开发的全新 3.0 前端，重新定义新 UI，提供更为舒适的前端开发体验
- 个人中心：支持基础信息修改、安全设置（密码修改、邮箱绑定、手机号绑定（并提供行为验证码、短信限流等安全处理）、第三方账号绑定/解绑）、头像裁剪上传等能力
- 用户管理：提供系统用户的新增维护，支持禁用登录及重置指定用户密码
- 角色管理：对权限与菜单进行分配，可根据部门设置角色的数据权限
- 菜单管理：已实现菜单动态路由，后端可配置化，支持多级菜单
- 部门管理：可配置系统组织架构，以树形表格展示
- 公告管理：提供公告的发布、查看和删除等功能。管理员可以在后台发布公告，并可以设置公告的生效时间、终止时间，以 markdown-it 为内核渲染 Markdown 格式内容显示
- 消息管理：提供消息查看、标记已读、全部已读、删除等功能（适配对接导航栏站内信功能）（v3.1 重构，v2.5 版可用）
- 字典管理：提供对系统公用数据字典的维护，例如：公告类型，支持字典标签背景色和排序等配置
- 文件管理：提供文件上传、下载、预览（目前支持图片、音视频）、重命名、切换视图（列表、网格）等功能
- 存储管理：提供文件存储库新增、编辑、删除等功能，支持本地存储、兼容 S3 协议存储
- 系统配置：提供修改系统标题、Logo、favicon 等基础配置功能，以方便用户系统与其自身品牌形象保持一致（v3.1 支持邮件配置）
- 代码生成：提供根据数据库表自动生成相应的前后端 CRUD 代码的功能
- 在线用户：管理当前登录用户，可一键踢下线
- 系统日志：提供登录日志、操作日志管理功能，可查看指定日志的详细请求及响应信息

