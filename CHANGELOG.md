## [v4.2.0](https://github.com/continew-org/continew-admin-ui/compare/v4.1.0...v4.2.0) (2026-10-11)

### ✨ 新特性

- 【system/auth】新增 Refresh Token 支持 ([4bc497e8](https://github.com/continew-org/continew-admin-ui/commit/4bc497e887ea79e9bf8561fcbd3c21a13e5988c4)) (GitHub#89@luoqiz)
- 【system/file】新增分片上传高级配置选项，支持自动单文件或分片上传策略 ([e08fb8a3](https://github.com/continew-org/continew-admin-ui/commit/e08fb8a34fd81ad7e3d9d0681ad3d802e6bc928f)) @liquor
- 【system/file】新增上传前重复文件检测，避免同一目录下重复上传相同文件 ([dc8b35de](https://github.com/continew-org/continew-admin-ui/commit/dc8b35deb5976c9f1eff3bf324700909cb2f2112)) @fjwupeng
- 【system/client】客户端管理扩展登录配置 ([7f982b8b](https://github.com/continew-org/continew-admin-ui/commit/7f982b8b539f5c9900110e1f917033af12e9fc9f)) @KAI

### 💎 功能优化

- 清零 ESLint 存量问题并校准 caughtErrors 规则口径 ([9f3ce625](https://github.com/continew-org/continew-admin-ui/commit/9f3ce6258823b09b8b67ffec1379b20955fd6fd3)) @Charles7c
- 【layout】更新 LayoutTop 组件，优化菜单样式和交互逻辑（同步 Gi-Demo） ([effcea20](https://github.com/continew-org/continew-admin-ui/commit/effcea209bf5f56b944160b9be08e30eb5797490)) @KAI
- 优化客户端配置代码 ([8c3dc809](https://github.com/continew-org/continew-admin-ui/commit/8c3dc80909e64ce8371d17c1d0a4bc13d40218d9)) @Charles7c

### 🐛 问题修复

- 在线用户强退后刷新列表，客户端配置校验对齐后端规则 ([a484e318](https://github.com/continew-org/continew-admin-ui/commit/a484e3188da5ab451e5d5422c1b1303fee876796)) @Charles7c
- 【views】修复代码生成后无成功提示的问题 ([945f463b](https://github.com/continew-org/continew-admin-ui/commit/945f463bb41120a1e20137a72672838961269095)) @Charles7c
- 【components】修复 GiTable 固定列拖拽后叠层 ([1d14a1c4](https://github.com/continew-org/continew-admin-ui/commit/1d14a1c4d6cf24e1f3f291d44165ff7f741b0a0b)) (GitHub#88@MoLi-MoChou)
- 【styles】迁移 SCSS @import 到 @use 消除 Dart Sass 3.0 弃用警告 ([e8fcbe7a](https://github.com/continew-org/continew-admin-ui/commit/e8fcbe7aa447f7d8adeb6b57d3eacd547ba05b2b)) @Charles7c
- 修复菜单切换面包屑展示异常 ([c81be19d](https://github.com/continew-org/continew-admin-ui/commit/c81be19d08615adf4ea5b6bbe3d4b900573ee6f7)) @KAI
- 修复切换页签不切换菜单激活状态问题 ([96108434](https://github.com/continew-org/continew-admin-ui/commit/9610843425c5482f67b8f89b83d79a6f27b5db8c)) @KAI
- 修复 JsonViewer 参数类型错误的问题 ([7d014d6d](https://github.com/continew-org/continew-admin-ui/commit/7d014d6d946d66f6ba83c2de39f53862464f5ae9)) @ali-pay
- 修复图片验证码不居中显示的问题 ([ca30f95e](https://github.com/continew-org/continew-admin-ui/commit/ca30f95e67e5288cc744690de0bc67f4bb7be988)) @ali-pay
- 优化圆角标签栏上下边距（PR By Gitee@bigtomato1） ([48e6eccd](https://github.com/continew-org/continew-admin-ui/commit/48e6eccd1a94bb71d187cd1defd796bb65c922e4)) @Charles7c

## [v4.1.0](https://github.com/continew-org/continew-admin-ui/compare/v4.0.0...v4.1.0) (2025-11-17)

### ✨ 新特性

- 新增分片文件上传 (Gitee#69@kiki1373639299) ([a3ce4b5](https://github.com/continew-org/continew-admin-ui/commit/a3ce4b508a0d146d62163185a4d71a9c1425eaf7))
- 新增微信开放平台登录及绑定按钮 ([0f73944](https://github.com/continew-org/continew-admin-ui/commit/0f739442ac57fc230210c195904e12d1402be3b7))
- 支持双列布局等更多布局选项并优化布局切换功能（同步gi-demo） (GitCode#11@kiki1373639299) ([704aacc](https://github.com/continew-org/continew-admin-ui/commit/704aacc38f655fc55b11ca4d64380334392cc073)) ([e5c9d2f](https://github.com/continew-org/continew-admin-ui/commit/e5c9d2f12f1a76e7b5186c59f0accbc774c63509)) ([e72e2ed](https://github.com/continew-org/continew-admin-ui/commit/e72e2ed1f8fbca2283d71f293afd34c02e5232d2)) ([1a0429d](https://github.com/continew-org/continew-admin-ui/commit/1a0429dfb696b1fa0d24a015fce5b4e745b5cf38))
- 新增支持文件回收站 ([7e2c2ba](https://github.com/continew-org/continew-admin-ui/commit/7e2c2ba647a963c4d60aaeb68bcebf9566a84cfb))

### 💎 功能优化

- 优化操作日志json预览效果 ([eea9a93](https://github.com/continew-org/continew-admin-ui/commit/eea9a93ae681af42a1338d44d6f5192ba9097639))
- 优化 useDownload 函数，如果指定了文件名则直接使用 ([986c03e](https://github.com/continew-org/continew-admin-ui/commit/986c03e69fb8f21c7de84532d433e7c7ba5f6735))
- 简化命名，例如：UserAddDrawer => AddDrawer ([c57a0a2](https://github.com/continew-org/continew-admin-ui/commit/c57a0a21951b32e6a7ff889fb4da89344aa0eb0b))
- 统一表格操作按钮最大数量为 3，超过 2 个则显示更多 ([eddd7c5](https://github.com/continew-org/continew-admin-ui/commit/eddd7c5fc6943e918ab3cfd19e0da4e528b43ff3))
- v-model.trim => v-model（外国用户输入单词无法直接在首尾输入空格） ([4aeb795](https://github.com/continew-org/continew-admin-ui/commit/4aeb795db03c276463d9fa6dd5fdc34091d99de0))
- 修改存储配置时，保持Secret Key为空将不更改 ([f0b24cc](https://github.com/continew-org/continew-admin-ui/commit/f0b24cc18afc8ee0cef185a385270b098cdd0b4f))
- 移除登录页h5时第三方登录对租户开启的判断 (GitCode#10@kiki1373639299) ([619ee77](https://github.com/continew-org/continew-admin-ui/commit/619ee77fb4a756ddef40fe276a988110742a8c0a))

### 🐛 问题修复

- 系统内置用户，禁用分配角色功能 (GitCode#6@lishuyanla) ([1b1cbb8](https://github.com/continew-org/continew-admin-ui/commit/1b1cbb862789340ab580ef4a50126951be4bc491))
- 修复操作日志列表根据状态筛选不生效的问题 (GitHub#76@ali-pay) ([8ddc1ff](https://github.com/continew-org/continew-admin-ui/commit/8ddc1ff516caa1a784ab8fc56ab4db51eabbd88b))
- 修复个人中心角色信息展示错误 ([b1805dc](https://github.com/continew-org/continew-admin-ui/commit/b1805dc41beca98012c8bc292fbd67659dfaa91c))
- 补充UserInfo定义的新增字段 (GitCode#9@maqiang9527) ([d85ac20](https://github.com/continew-org/continew-admin-ui/commit/d85ac20d7e642c0fa43051010a7f62f09871ed3a))
- 修复腾讯云短信配置缺失问题，配置腾讯云短信，需要增加输入 sdkAppId 配置项 ([6477a6d](https://github.com/continew-org/continew-admin-ui/commit/6477a6de3e5d8a332ef020f4b2958702d494b958))
- 修复混合布局模式下详情页左侧菜单消失问题 (GitCode#12@kiki1373639299) ([069175b](https://github.com/continew-org/continew-admin-ui/commit/069175bf1648bc42371bbae58d56c9245ad8bbe0))
- 修复重命名文件夹后，文件管理目录导航显示错误 (GitHub#78@ppxb) ([26e3738](https://github.com/continew-org/continew-admin-ui/commit/26e3738b74fe22f31ff2d8c0c0863e9c10b5e1ce))

## [v4.0.0](https://github.com/continew-org/continew-admin-ui/compare/v3.7.0...v4.0.0) (2025-07-27)

### ✨ 新特性

- 新增多租户模块 (GitHub#75@xtanyu) ([e662565](https://github.com/continew-org/continew-admin-ui/commit/e66256581e5826e03aaad5170cb7de10f5ceabf7)) ([c7a1c1d](https://github.com/continew-org/continew-admin-ui/commit/c7a1c1deba13baa0718aba4f6f3eca7c0cd3e3de)) ([2c60203](https://github.com/continew-org/continew-admin-ui/commit/2c602033bdabbaafc75bcc37a40f809b61469881)) ([6a96eee](https://github.com/continew-org/continew-admin-ui/commit/6a96eee9e965871ded7063fab60d52921865a4b4)) ([112c27e](https://github.com/continew-org/continew-admin-ui/commit/112c27e49c2310910fa97f6b3f000e090fda73d7)) ([87bcf33](https://github.com/continew-org/continew-admin-ui/commit/87bcf33940dc37a9d8a62e0d0bf316e26cee01e8)) ([d4397ff](https://github.com/continew-org/continew-admin-ui/commit/d4397ffd570635c72eb1e214f9aaa9d8256f9dfc)) ([e63bedc](https://github.com/continew-org/continew-admin-ui/commit/e63bedc11b9ea6f59a8afe4284135b42a4dc65e2)) ([3e49bce](https://github.com/continew-org/continew-admin-ui/commit/3e49bce38e1b8d4ae2e181079e07c175b911fea7)) ([a72d122](https://github.com/continew-org/continew-admin-ui/commit/a72d12227ece9882eb5b0f8ccc378eae814fbeac)) ([0c594c1](https://github.com/continew-org/continew-admin-ui/commit/0c594c167e3b57911f09b2c7f43bb7873d462a4e))
- 优化登录后的页面重定向逻辑 ([aaefb7f](https://github.com/continew-org/continew-admin-ui/commit/aaefb7f8e4b45c120dc3da2dc8f8671c058409b3))
- 菜单列表增加路由地址和权限标识搜索功能 (GitCode#5@onekr-billy) ([900a2af](https://github.com/continew-org/continew-admin-ui/commit/900a2afdb7b369a14c914dcbb08ed48f094af1e9))
- 新增查询角色权限树列表接口（替换角色分配权限的菜单树列表接口） ([87e6dea](https://github.com/continew-org/continew-admin-ui/commit/87e6deab4d5f96146e6bfdd4a4b1704be321f813))

### 💎 功能优化

- 统一加载图标 ([bb3c082](https://github.com/continew-org/continew-admin-ui/commit/bb3c082146805c664bb8a8d6ffadea9983f942f2))
- 优化通知公告相关页面的回退逻辑 ([633f9aa](https://github.com/continew-org/continew-admin-ui/commit/633f9aaa4a27dab2ffa9f580edfb807e6987c75f))
- 优化角色权限代码 ([8090861](https://github.com/continew-org/continew-admin-ui/commit/8090861bc6cc8951268e8e758b798f1a9463376f))
- 将 common 目录下的 common.ts 文件移动到 system 目录下 ([60c6df2](https://github.com/continew-org/continew-admin-ui/commit/60c6df25747f348201d41d054812f0d935000752))
- 更新短信配置和日志接口的 URL ([53aeebe](https://github.com/continew-org/continew-admin-ui/commit/53aeebeb4dd534bec2ad3cfcb09317cc6d8aad44))
- 适配后端部分字典接口变化 ([d7937e7](https://github.com/continew-org/continew-admin-ui/commit/d7937e79054f2b7fd2c32fb2b47f7a27b14b1229))
- 优化用户表单和菜单列表页面 ([dca7379](https://github.com/continew-org/continew-admin-ui/commit/dca7379c201ae665044d2756aba2c48aba18eaac))
- 关于菜单增加更新日志内嵌菜单，移除在线文档外链菜单 ([f3dea88](https://github.com/continew-org/continew-admin-ui/commit/f3dea886adb6591dd7f8d81f835723d2a71c1e09))
- 暂时下线查询日志详情功能（Snail Job 日志详情 API 变更为 WebSocket 模式） ([5050126](https://github.com/continew-org/continew-admin-ui/commit/5050126892b8488011aeaf45c37ed99ad22a8a27))

### 🐛 问题修复

- 修复用户角色列表单击行选中功能失效的问题 ([8b7ef16](https://github.com/continew-org/continew-admin-ui/commit/8b7ef16687d02d5671201418e0e122c0426b8176))
- 修复邮箱配置的启用SSL加密开关初始值错误的问题 (GitCode#4@ali_pay) ([ca304f3](https://github.com/continew-org/continew-admin-ui/commit/ca304f30dcb7cd70ec06477b33147d4c3a205d7a))
- 修复混合布局下的菜单过多不能滚动的问题 (GitHub#71@yingshi-7) ([4873418](https://github.com/continew-org/continew-admin-ui/commit/4873418561f746122d8bcee565b937c2d9b1e988))
- code generator preview issue (GitHub#73@ppxb) ([fdfa0cd](https://github.com/continew-org/continew-admin-ui/commit/fdfa0cd2d5b9b586fb3ca4838647a8e68c9865c5))
- 调整水印 z-index，以修复表格全屏或表单弹出时水印无法覆盖的问题 ([afd1bb7](https://github.com/continew-org/continew-admin-ui/commit/afd1bb7017b8a28b690eee842d69ae1bc35037b2)) ([4cf763e](https://github.com/continew-org/continew-admin-ui/commit/4cf763e8174601c629a09403272621c69ff4b179))
- 弹窗报错信息和主题模式的按钮存在显示问题 ([41f458d](https://github.com/continew-org/continew-admin-ui/commit/41f458d2b0fbc9bc155fd7af8cbe52a7fdf19323))
-  修复修改部门时上级部门选择的问题 (Gitee#61@lishuyanla) ([47e2dfa](https://github.com/continew-org/continew-admin-ui/commit/47e2dfaff030e181f1a2626218f20efd5f7025cc))
- 修复字典项权限标识不一致的问题 (GitCode#5@onekr-billy) ([3ea79ec](https://github.com/continew-org/continew-admin-ui/commit/3ea79ec7e08e70144970d9761d86e564a3f0e806))
- 系统内置角色不允许修改权限 ([4b0aea5](https://github.com/continew-org/continew-admin-ui/commit/4b0aea536c20afd4733c811bd9d8e34cde199ce3))

## [v3.7.0](https://github.com/continew-org/continew-admin-ui/compare/v3.6.0...v3.7.0) (2025-06-13)

### ✨ 新特性

- 文件管理支持目录层级 (GitHub#60@luoqiz) ([70e2de3](https://github.com/continew-org/continew-admin-ui/commit/70e2de3250f887fedbc75b73b1822e666b8a5001))
- 添加消息中心入口 ([dd15042](https://github.com/continew-org/continew-admin-ui/commit/dd1504204c649a36b1266bd46c68d0ad3007e315))
- 短信渠道支持数据字典配置 (GitHub#62@Top2Hub) ([55ce849](https://github.com/continew-org/continew-admin-ui/commit/55ce849b2eb95639e1096d5bc2f78a7e410c11b1))
- 短信配置新增设为默认功能 ([b05ec99](https://github.com/continew-org/continew-admin-ui/commit/b05ec99d35b7491310a74d3d04751eed292a61b2))
- 新增文件夹导航、计算文件夹大小功能 ([abdd773](https://github.com/continew-org/continew-admin-ui/commit/abdd773886f216ea8de19e78b89b12ac99743d41))
- 重构公告及消息，公告支持系统消息推送提醒、定时发布、置顶、记录读取状态 ([abf3f13](https://github.com/continew-org/continew-admin-ui/commit/abf3f130416c7eb512851ccf9d68191faef938ee)) ([e2d436f](https://github.com/continew-org/continew-admin-ui/commit/e2d436fb3083652dda1ba0c4e05ee47f4536ac9b))

### 💎 功能优化

- 还原 终端 => 客户端（终端容易被误解） ([471f30e](https://github.com/continew-org/continew-admin-ui/commit/471f30e1e7464f32157b70c3cbd964d5c8286306))
- 统一部分搜索栏 ([d927d8f](https://github.com/continew-org/continew-admin-ui/commit/d927d8f58a536c8b30629c556e592b7fa2d28b38))
- 短信配置、客户端配置状态表单项调整为统一风格 ([5768d55](https://github.com/continew-org/continew-admin-ui/commit/5768d556546853e43c92360ca1fed7c3a3d2d013)) ([c9fe54c](https://github.com/continew-org/continew-admin-ui/commit/c9fe54c2d65d86fde45d8d073ea00c160c84460b))
- 调整 GiCellTags 折叠项水平居中样式 (Gitee#59@lzzz0359) ([1940f6a](https://github.com/continew-org/continew-admin-ui/commit/1940f6aaa179014c604e902331b24b0ef35f4c65))
- 重构文件管理相关代码 ([b680ee3](https://github.com/continew-org/continew-admin-ui/commit/b680ee3fac93224b46effecf5d3e25d778d2ec16)) ([5511c87](https://github.com/continew-org/continew-admin-ui/commit/5511c877731ea6868d4eaa324efe5f1252855143)) ([2018cf0](https://github.com/continew-org/continew-admin-ui/commit/2018cf0eade0e906532d08fe4344950dd297e97e))
- 调整接口文档菜单图标 ([9faee31](https://github.com/continew-org/continew-admin-ui/commit/9faee319dd2814b8e7ad600f2ecfe1cb782fd2c0))

### 🐛 问题修复

- 修复消息中心已读计数更新问题 ([50cd13e](https://github.com/continew-org/continew-admin-ui/commit/50cd13e2e54b50e88339164707d1bdcdd5716946))
- 修复全部已读调用接口错误 ([cd1b0b8](https://github.com/continew-org/continew-admin-ui/commit/cd1b0b8c0922d19072c677c8e60205a984c58605))
- 修复GiForm中DateRangePicker无法正确赋值 (Gitee#58@chengangi) ([a8986b9](https://github.com/continew-org/continew-admin-ui/commit/a8986b93a8e4327dad3bd3171fc76dde1a761d43))
- 修复字典项如果不选择颜色，就不会显示标签的问题 ([70e3b6d](https://github.com/continew-org/continew-admin-ui/commit/70e3b6dace0de619a86242d741e3ec9c04e5b863))
- 修复文件批量删除接口传参错误 ([dc66e9e](https://github.com/continew-org/continew-admin-ui/commit/dc66e9e62cf644309cddccb7757fd12a6450b25b))
- 修复导入用户上传组件button拼写错误 (Gitee#60@lzzz0359) ([86fb09e](https://github.com/continew-org/continew-admin-ui/commit/86fb09efaaa88299a72c62dd7a1587c918bb2e90))
- 修复菜单快捷搜索问题 (GitHub#67@oldR) ([f66f80f](https://github.com/continew-org/continew-admin-ui/commit/f66f80fc56de84bc846a068736d11849bd210163))
- 修复全选时一级菜单未提交服务端的问题 (GitHub#68@oldR) ([aa14c41](https://github.com/continew-org/continew-admin-ui/commit/aa14c41df05d702cd62a4e84cf69319a4f76d685))
- 修复加载图标样式错乱 ([47f4ca6](https://github.com/continew-org/continew-admin-ui/commit/47f4ca611e398bc860b4eaf8ab5d2ed0e1c10521))
- 修复部分行为验证码使用错误 ([8c100e5](https://github.com/continew-org/continew-admin-ui/commit/8c100e5753778b78a7cad03da06e59bafb4dbcee))
- 修复消息已读后计数未更新的问题 ([fa1291b](https://github.com/continew-org/continew-admin-ui/commit/fa1291bda2d43f3692dc1f441f4d4b3934d620f4))


## [v3.6.0](https://github.com/continew-org/continew-admin-ui/compare/v3.5.0...v3.6.0) (2025-04-13)

### ✨ 新特性

* 添加字典和菜单缓存清除功能 ([13a7262](https://github.com/continew-org/continew-admin-ui/commit/13a7262172d3e48cb26989b7dfa5b453664f5dde))
- 新增短信配置 (GitHub#54@luoqiz) ([bb1a66f](https://github.com/continew-org/continew-admin-ui/commit/bb1a66f74073303df37c241e82366ff044f10660)) ([470b0d5](https://github.com/continew-org/continew-admin-ui/commit/470b0d56f93dbb8a2117f4da507861f102a937a3))
- 优化 GiTable（同步 GiDemo 更新） ([eaabe47](https://github.com/continew-org/continew-admin-ui/commit/eaabe47546db19ba602a7a959e5a98fe2119c4cb)) ([7d4beb0](https://github.com/continew-org/continew-admin-ui/commit/7d4beb028321766af0fff3c85c72f220b1467fd5)) ([cb297d2](https://github.com/continew-org/continew-admin-ui/commit/cb297d2b9f932e23a923d029c916fe0992234328))
- 增强列设置功能 (Gitee#52@ki1373639299) ([11d5457](https://github.com/continew-org/continew-admin-ui/commit/11d54572e934197d333feaa33579c773ebcf0c1a))
- 为定时任务添加内置 Cron 表达式（优化了用户输入体验，提供了常用的定时任务执行周期模板） ([1be5d97](https://github.com/continew-org/continew-admin-ui/commit/1be5d97fa22010e039cdff35810eae80e4d8e18c))
- 为 dayjs 添加中文语言包，以支持中文显示 ([e1fe183](https://github.com/continew-org/continew-admin-ui/commit/e1fe1835899275dfbdedb21597154cb79b2d5ff8))
- 新增折叠侧边栏功能，并使用 GiPageLayout 优化用户、角色、字典管理 ([32c6c16](https://github.com/continew-org/continew-admin-ui/commit/32c6c1636202a9c38cc68b093eafc0d9b3786157))
- 重构个人消息中心，支持展示个人公告，并优化相关地址 ([89d0d9e](https://github.com/continew-org/continew-admin-ui/commit/89d0d9ebb1d8aae705baf4f1805a1d3fb0cff5cc))
- add collapse mask and remove animation (GitHub#58@ppxb) ([576faac](https://github.com/continew-org/continew-admin-ui/commit/576faac21bf731461bc596513f34d64b13ed9377))

### 💎 功能优化

- 添加文件路径和md5值 (GitHub#52@luoqiz) ([30821b5](https://github.com/continew-org/continew-admin-ui/commit/30821b551ca21c6bd13b2e1e0efdefd098ded099))
- 优化角色权限节点关联及独立切换效果 ([657c83b](https://github.com/continew-org/continew-admin-ui/commit/657c83bf19b7d2997ddaf7466203441d56041765))
- 优化表单组件的字数限制逻辑 ([348c497](https://github.com/continew-org/continew-admin-ui/commit/348c49787618fabd23a040c77c4db53e4301bc61))
- 优化 GiForm、GiEditTable（同步 GiDemo 更新） ([436cc6b](https://github.com/continew-org/continew-admin-ui/commit/436cc6bdfc2d4389b60181cadf6faf3c5a49cf7c))
- 优化字典项颜色选择功能 ([2af9195](https://github.com/continew-org/continew-admin-ui/commit/2af9195081dd183a9548c6e77f9405f499b49ae1))
- 适配后端权限码调整 ([b135b49](https://github.com/continew-org/continew-admin-ui/commit/b135b49a8796d54f861ca411b0e0428fe0ce11b4))
- 优化 HTTP 错误提示显示时长 ([4b1486a](https://github.com/continew-org/continew-admin-ui/commit/4b1486a158866cfb76eed1c6d48e8b505ac9b95f))
- 使用 GiPageLayout 组件替换 gi_table_page 样式 ([db79f8c](https://github.com/continew-org/continew-admin-ui/commit/db79f8c15fb206e7df059147d181b30339a84599))
- 优化是否默认操作禁用逻辑 ([ec43ba4](https://github.com/continew-org/continew-admin-ui/commit/ec43ba4c8fd39ddae440447f0fc5ae1cb76c694b))
- 修改头像接口调整为 Patch 请求方式 (Gitee#56@httpsjt) ([40280da](https://github.com/continew-org/continew-admin-ui/commit/40280da314710e2b7f17d7bc5d66cded0048d507))
- 优化 GiPageLayout 组件布局 header 移动端适配 ([0c77f52](https://github.com/continew-org/continew-admin-ui/commit/0c77f52edaec02fae4aea5f43b9f34722358ae8f))
- 重构系统配置布局，融合存储、短信、终端等配置 ([f77f714](https://github.com/continew-org/continew-admin-ui/commit/f77f714bc099bb503f8ca9c60d749b42697d32d3))
- 移除终端部分配置字段 ([987dddf](https://github.com/continew-org/continew-admin-ui/commit/987dddf55af3c0d5e3cb25209fdafa3ea6baec79))
- 适配后端删除接口重构，由 URL 传参重构为请求体传参 ([62a4f5f](https://github.com/continew-org/continew-admin-ui/commit/62a4f5faf46c5304504b659ad83bb15087a7680c))

- 调整表单项在不同屏幕下的布局方式 ([11800f0](https://github.com/continew-org/continew-admin-ui/commit/11800f02eec85d640229a87babf4a53b25041d60))
- 去除字典管理误输入的特殊字符 ([53d0fb9](https://github.com/continew-org/continew-admin-ui/commit/53d0fb91cb4d20159250f630569810c56b8b8dc9))
- 优化用户管理查询表单 ([4b073ef](https://github.com/continew-org/continew-admin-ui/commit/4b073ef5aab24cbb3afc4c340730cdbc6c803c95))
- 优化消息页面移动端样式 ([0289b6b](https://github.com/continew-org/continew-admin-ui/commit/0289b6b25de67ed4f940f4fb669226e2c4ae40f3))
- 修复消息列表列定义拼写错误 ([25bec61](https://github.com/continew-org/continew-admin-ui/commit/25bec617c071caf78c8e7279971322d44de5f3d1))
- vite代理调整 ([9f5845e](https://github.com/continew-org/continew-admin-ui/commit/9f5845e3b34801cca0fd83bc7e6c7b5bc57c361e))
- 将硬编码的 API 接口文档地址替换为环境变量 ([55e36d3](https://github.com/continew-org/continew-admin-ui/commit/55e36d345996b2a5f44ef8d04bb7a5b6e1ef8ad3))
- 优化通知公告跳转消息中心的方式 (Gitee#57@ki1373639299) ([e8bbfcc](https://github.com/continew-org/continew-admin-ui/commit/e8bbfcc402d4a61e51a99245ac72761101257b00))
- change tab pane style (GitHub#58@ppxb) ([3159e2c](https://github.com/continew-org/continew-admin-ui/commit/3159e2ce04c61e44d6c52795ebc40e59ca599f7d))
- 调整默认布局为混合布局 ([8ad0886](https://github.com/continew-org/continew-admin-ui/commit/8ad088615ffd5eb85a872da4757231d7a31230c2))

### 🐛 问题修复

- 还原深浅主题切换 ([be7c310](https://github.com/continew-org/continew-admin-ui/commit/be7c310f72d714c18d35d3866850ed0be7928558))
- 修复账号登录记住我不起作用 (GitHub#51@Acyco) ([7bb46a4](https://github.com/continew-org/continew-admin-ui/commit/7bb46a424c6870fe8d673e26ceafb39f88ac53a7))
- 添加快速操作权限控制 ([6e9884e](https://github.com/continew-org/continew-admin-ui/commit/6e9884eabcca0119d8b0c2374859c12ed1af25a8))
- 修复导出文件后台抛出异常仍继续下载文件，不进行通知提示 (GitHub#53@Acyco) ([0f8c9ae](https://github.com/continew-org/continew-admin-ui/commit/0f8c9aec2503dcbe1828ab9b54ab07e31baee45e))
- 修复客户端添加表单布局 ([43b9793](https://github.com/continew-org/continew-admin-ui/commit/43b9793d0e1a489306b8daf3ff51b31f1ee995fc))
- 修复菜单栏上方的系统名称包含 j、g 等，字母底部显示不全的问题 ([f0ba88e](https://github.com/continew-org/continew-admin-ui/commit/f0ba88eb54a20b3e39e302662d83ab60b6f3e337))
- 菜单类型添加权限标识字段 ([4bd083e](https://github.com/continew-org/continew-admin-ui/commit/4bd083eb91f8ad05b1b41d22f289f50dc35cf3af))
- 修复清空最后一页数据后列表空白，分页条消失的问题 ([4a3b5f7](https://github.com/continew-org/continew-admin-ui/commit/4a3b5f7eda6f659d4b9f57658b97c2588db6347a))
- 修复角色权限禁用逻辑 ([c0623ab](https://github.com/continew-org/continew-admin-ui/commit/c0623abba813f12117add08a908e40f5c4f541d1))
- pnpm v10 approve-builds issue (GitHub#58@ppxb) ([b944a73](https://github.com/continew-org/continew-admin-ui/commit/b944a73cecd2ae64605077cebd284dc6443f89a4))
- blocks missing gap (GitHub#58@ppxb) ([c457883](https://github.com/continew-org/continew-admin-ui/commit/c457883ac17d95d8f6906dcc9a3036ae37be636a))
- double click search inpurt cause error issue (GitHub#59@ppxb) ([8e6dd50](https://github.com/continew-org/continew-admin-ui/commit/8e6dd50f2f6305de1b25523e8d7b7936917ac780))
- 修复文件管理数量刷新问题 ([de44df6](https://github.com/continew-org/continew-admin-ui/commit/de44df6a5c84e90a5cfebf447ad21ca47c3a805e))

### 📦 依赖升级

- Arco Design Vue 2.56.0 => 2.57.0 ([bf3fa91](https://github.com/continew-org/continew-admin-ui/commit/bf3fa919fe0da2701bafa30724a9cc2f83fc5087))

## [v3.5.0](https://github.com/continew-org/continew-admin-ui/compare/v3.4.1...v3.5.0) (2025-03-05)

### ✨ 新特性

* 新增应用配置开关属性，迁移主题配置至 `src/config/setting.ts`，新增色弱模式与哀悼模式 ([Gitee#40](https://gitee.com/continew/continew-admin-ui/pulls/40)) ([f64a716](https://github.com/continew-org/continew-admin-ui/commit/f64a7163e5f40da0e838f1ff0659042f874183a0)) ([22fb597](https://github.com/continew-org/continew-admin-ui/commit/22fb597ac863f095c74fb9a24febf7490f1d2e07))
* 【generator】代码生成、预览支持批量 ([f292db5](https://github.com/continew-org/continew-admin-ui/commit/f292db55af7c7ee21949c7109537a96dbf6443cc))
* 路由菜单组件路径新增下拉选择 ([Gitee#41](https://gitee.com/continew/continew-admin-ui/pulls/41)) ([438c2af](https://github.com/continew-org/continew-admin-ui/commit/438c2af4a656b37a61cc5b102f9aab87b14bb6bd))
* 🔥新增终端管理 ([Gitee#43](https://gitee.com/continew/continew-admin-ui/pulls/43)) ([bc3a5cf](https://github.com/continew-org/continew-admin-ui/commit/bc3a5cff910e8f136151a49ccc34fbbf75d7d642)) ([6ff3072](https://github.com/continew-org/continew-admin-ui/commit/6ff307251fd1fcd69347d300533f1c5724add29f)) ([dc6e0a4](https://github.com/continew-org/continew-admin-ui/commit/dc6e0a4ff6d44ed2f7eca6adbc775f728e6ea3b7))
* 🔥新增分割面板组件（左树右表） ([Gitee#44](https://gitee.com/continew/continew-admin-ui/pulls/44)) ([b98febc](https://github.com/continew-org/continew-admin-ui/commit/b98febcff5e3ecece213ab1689e5d1c03d4ab6b9)) ([8c55504](https://github.com/continew-org/continew-admin-ui/commit/8c55504bf8e94ab27dddeef81dbc834eb91289a9)) ([046f1f7](https://github.com/continew-org/continew-admin-ui/commit/046f1f7492a13b7a018fc6e05581b3e5bc37a96d)) ([28ac501](https://github.com/continew-org/continew-admin-ui/commit/28ac501f4af419e3de198d04b081a9d82f396997)) ([5ab7cdd](https://github.com/continew-org/continew-admin-ui/commit/5ab7cdd1e0781ba2af363d0739e48a92ea7ce9ba))
* 部门管理新增组织架构视图 ([Gitee#45](https://gitee.com/continew/continew-admin-ui/pulls/45)) ([4b61e40](https://github.com/continew-org/continew-admin-ui/commit/4b61e4027e770b63e6301335d5add390d9afef50))
* 【generator】源项目内生成代码 ([GitHub#44](https://github.com/continew-org/continew-admin-ui/pull/44)) ([14cc54d](https://github.com/continew-org/continew-admin-ui/commit/14cc54d97f9958fd6f3d60739fe46523a2a837d2))
* 新增左树右表布局组件GiLeftRightPane封装，分割面板组件GiSplitPaneButton封装，以及代码优化（同步 GiDemo 更新） ([ccfec21](https://github.com/continew-org/continew-admin-ui/commit/ccfec2155f4a27452f090e14c172e05984ad7423))
* add search component ([GitHub#49](https://github.com/continew-org/continew-admin-ui/pull/49)) ([21d0b1e](https://github.com/continew-org/continew-admin-ui/commit/21d0b1e3fb78fa94469d3a01dd921e68b02f22a1)) ([b04a85f](https://github.com/continew-org/continew-admin-ui/commit/b04a85fbc5c80f095c20216455182170e2f495af))

### 💎 功能优化

- 优化菜单表单布局 ([84be614](https://github.com/continew-org/continew-admin-ui/commit/84be614d4c6e640d1c18faecda6c405e2356d082))
- http util and route store ([GitHub#43](https://github.com/continew-org/continew-admin-ui/pull/43)) ([d3aeca8](https://github.com/continew-org/continew-admin-ui/commit/d3aeca81d850d4d13af7fec3c6a7a4690068200c))
- 优化字典操作按钮显示逻辑 ([113c6e3](https://github.com/continew-org/continew-admin-ui/commit/113c6e3a718f50ad5195846d4e0cc44a81950982))
- 重命名表格样式（同步 GiDemo 更新） ([df73245](https://github.com/continew-org/continew-admin-ui/commit/df732455d0a79eac6ecdee7eda4c85b16065bb7f))
- GiForm 新增 show 属性配置，优先级比 hide 高（同步 GiDemo 更新） ([6595a77](https://github.com/continew-org/continew-admin-ui/commit/6595a77317ee922d60354a004d45e7c27f08789d))
- 🔥使用左树右表重构角色管理，角色详情增加用户管理，功能权限扁平化 ([cfa20ac](https://github.com/continew-org/continew-admin-ui/commit/cfa20ac765eb5638f1687ede91a8efb78d6a5d99)) ([bc063e6](https://github.com/continew-org/continew-admin-ui/commit/bc063e624c7fd15657354df9c2eafdea1012ebd0))
- 优化树列表更多按钮样式（PR by 番茄大佬） ([3b1f1aa](https://github.com/continew-org/continew-admin-ui/commit/3b1f1aaee47083f84f41557a00364d94c964b44e))
- 🔥优化系统配置 ([fbec732](https://github.com/continew-org/continew-admin-ui/commit/fbec7321079717cda709230e1be145131e922466))
- 🔥优化 GiForm（同步 GiDemo 更新） ([47769f9](https://github.com/continew-org/continew-admin-ui/commit/47769f9ad84d66c53787f1d307aafc0f938a7b33)) ([d1e5ecf](https://github.com/continew-org/continew-admin-ui/commit/d1e5ecf81d7122ccd0eceb162578ebddc4105b72))
- 完善部分输入表单项字符长度限制 ([e8249bc](https://github.com/continew-org/continew-admin-ui/commit/e8249bc4d2343078849d7f22b9d1f67629c5ec08))
- 🔥重构存储管理页面，分页列表 => 无分页卡片 ([25da301](https://github.com/continew-org/continew-admin-ui/commit/25da3019a3d9e7e5fd733dbb340b80f67da31ba9))

### 🐛 问题修复

- 🔥修复 AccountLogin 组件多次初始化的问题（图形验证码接口被调用 2 次） ([6b4f0d1](https://github.com/continew-org/continew-admin-ui/commit/6b4f0d1e99ffd6f53201eea412b6cb42ab7d0b84))
- 修复 GiTable 插槽类型不完全问题（同步 GiDemo 更新） ([4b5536a](https://github.com/continew-org/continew-admin-ui/commit/4b5536a0b2d1c100785ca9fef3a51f0c8d632efb))
- 【schedule】修复无法打开 CRON 生成器的问题 ([7f503f3](https://github.com/continew-org/continew-admin-ui/commit/7f503f3af35a34f0e097031961cf39787a7c1faf))
- 消除面包屑组件的控制台警告（同步 GiDemo 更新） ([53fd8a4](https://github.com/continew-org/continew-admin-ui/commit/53fd8a465a1dfd89fdf856ab2f17e8ada790fbd8))
- 🔥验证码过期时间对比改为服务器时间 ([GitHub#39](https://github.com/continew-org/continew-admin-ui/pull/39)) ([f157130](https://github.com/continew-org/continew-admin-ui/commit/f157130b2340fd963249192e0873b4fcd3038d33))
- divider background in dark mode ([GitHub#40](https://github.com/continew-org/continew-admin-ui/pull/40)) ([eb48157](https://github.com/continew-org/continew-admin-ui/commit/eb481572adcd786072b0e33aa42dcb743788296c))
- 🔥修复文件无法直接下载问题 ([91092f1](https://github.com/continew-org/continew-admin-ui/commit/91092f1cf3355da69ada5fd5edd2a17b6c747d1e))
- dark toggle and usedict with fix dict can't persist ([GitHub#47](https://github.com/continew-org/continew-admin-ui/pull/47)) ([1c743fb](https://github.com/continew-org/continew-admin-ui/commit/1c743fb0978d470b014f9ec6e5986e82888a8950)) ([00b47da](https://github.com/continew-org/continew-admin-ui/commit/00b47dae6fece3b4ec1ae46a7a084d32d83838e0))
- 修复Sass的@import规则已弃用警告问题 ([Gitee#47](https://gitee.com/continew/continew-admin-ui/pulls/47)) ([d28b92e](https://github.com/continew-org/continew-admin-ui/commit/d28b92ee898beb89e380c6f61b5d2e822ac0ea89))

## [v3.4.1](https://github.com/continew-org/continew-admin-ui/compare/v3.4.0...v3.4.1) (2024-12-08)

### ✨ 新特性

* 标签页新增重新加载、关闭左侧操作 ([b030921](https://github.com/continew-org/continew-admin-ui/commit/b030921189e9093f07369cebebdfa8b12b3fb153))
* 新增关于项目菜单（该菜单从动态路由调整为静态，且不再需要鉴权） ([7fa4297](https://github.com/continew-org/continew-admin-ui/commit/7fa42975cfa32e1fb8eeca26e3a06be2e10d2aa3)) ([2191335](https://github.com/continew-org/continew-admin-ui/commit/21913350e7d8dfd0a06464efcf27d2d234270ab0))
* GiForm 支持 label 自定义渲染，以及插槽自定义渲染（同步 GiDemo 更新） ([c2463fc](https://github.com/continew-org/continew-admin-ui/commit/c2463fc4502acbd9274f1080f86a74ca43951927))
* 新增验证码配置开关 ([4cd892e](https://github.com/continew-org/continew-admin-ui/commit/4cd892e288c08b04f038bf6034c14ec022c0e919)) ([51a2168](https://github.com/continew-org/continew-admin-ui/commit/51a21688223346877f00f5142e277682e5774158)) (Gitee#37@@aiming317)
* 面包屑新增过渡动画效果（同步 GiDemo 更新） ([abacb26](https://github.com/continew-org/continew-admin-ui/commit/abacb267aaf96516480255f509b07b32d44abd27))

### 💎 功能优化

- 拆分并调整路由守卫，优化顶部进度条展示 ([e8941ad](https://github.com/continew-org/continew-admin-ui/commit/e8941adde4c5156bbe7f2d95f013add353aee61b))
- 移除部分异步组件加载 ([61ef692](https://github.com/continew-org/continew-admin-ui/commit/61ef692c8398b4f352f52f11a82d64dd9f7fa8e3))
- 重构系统配置页面 ([930227e](https://github.com/continew-org/continew-admin-ui/commit/930227ea0cc6f17545841a5548a91202fa0bc2a1))
- useForm => useResetReactive（同步 GiDemo 更新） ([6c45483](https://github.com/continew-org/continew-admin-ui/commit/6c45483fae53677c57b9dc0c6a1e4c42b659d151)) ([7fe3ffe](https://github.com/continew-org/continew-admin-ui/commit/7fe3ffe9dab318d744d2dd8d7d1e793efdbc97d1))
- 优化搜索输入框 input => input-search ([7402de5](https://github.com/continew-org/continew-admin-ui/commit/7402de5695140b5d4a6228fd37ef23c793c8e5e7))
- 优化系统日志、系统配置标签样式 ([b82ca81](https://github.com/continew-org/continew-admin-ui/commit/b82ca81b79b56bfa728b7c467d151724b43792b2))
- 调整 eslint.config.js ([99f8edb](https://github.com/continew-org/continew-admin-ui/commit/99f8edb7295f913e36cd28c41ac4a6b536c982d9))
- 角色功能权限第三级扁平化处理 ([43dd512](https://github.com/continew-org/continew-admin-ui/commit/43dd512b8a359d794a2ad48dd4e05c22f7223391)) (Gitee#38@kiki1373639299)
- 优化路由守卫代码（同步 GiDemo 更新） ([7c509fa](https://github.com/continew-org/continew-admin-ui/commit/7c509fa7372de5bf60895bc5e5b66cc6355c8d97))

### 🐛 问题修复

- 修复 GiCellTags 组件的空数据问题 ([068d959](https://github.com/continew-org/continew-admin-ui/commit/068d959d0380f85053d6f001621990309c904519)) (Gitee#35@CoderZone)
- 修复快捷操作代码生成链接错误 ([246d638](https://github.com/continew-org/continew-admin-ui/commit/246d638a8f66bd5a98091bd12cc78f4a2083dd04))
- 修复行为验证码接口重复请求问题 ([be4356f](https://github.com/continew-org/continew-admin-ui/commit/be4356fa041108c46eade7e1f81897346338026b))
- 修复用户选择器超级管理员回显异常的问题 ([3f871e1](https://github.com/continew-org/continew-admin-ui/commit/3f871e102acee6481bfe3fb095279063713fe6e5)) (Gitee#36@kiki1373639299)

## [v3.4.0](https://github.com/continew-org/continew-admin-ui/compare/v3.3.0...v3.4.0) (2024-11-18)

### ✨ 新特性

* 新增全局水印配置 支持开启全局水印，支持设置水印信息（不设置则默认显示昵称+用户名） ([8d8d79e](https://github.com/continew-org/continew-admin-ui/commit/8d8d79e5686a7b87bf6d5b28983585bcc4ccd897)) (Gitee#19)
* 支持可视化生成 Cron 表达式 ([adcb9fe](https://github.com/continew-org/continew-admin-ui/commit/adcb9fed2a5388a1e86f6e86119f361e73d5d15f)) ([33020be](https://github.com/continew-org/continew-admin-ui/commit/33020beb36d22b34bb7ca7ae2d7f59272192211f)) ([6fde089](https://github.com/continew-org/continew-admin-ui/commit/6fde089ba62ea3b8659a872fa149bd517b7ab205)) ([921950b](https://github.com/continew-org/continew-admin-ui/commit/921950b7508befffe6d7414ff6d308340cb1004b)) (Gitee#23、24)
* 新增分析页（拆分仪表盘路由为工作台和分析页） ([2e15cf2](https://github.com/continew-org/continew-admin-ui/commit/2e15cf2d48a8359b4e8455539da8149758db2db9)) ([455f269](https://github.com/continew-org/continew-admin-ui/commit/455f2695c836559f4f1d23d59b2b862691af1c8a)) ([8a3f456](https://github.com/continew-org/continew-admin-ui/commit/8a3f456e547b57c3405dac52c8bb40b20df79a94)) ([6e39681](https://github.com/continew-org/continew-admin-ui/commit/6e39681f960ff271e6df01a129bbc7ff211799bd)) ([abb6d59](https://github.com/continew-org/continew-admin-ui/commit/abb6d59783645785ac5611523329ad36a9b6631b)) ([798dda9](https://github.com/continew-org/continew-admin-ui/commit/798dda94407c8d6d106fa72621e09ee01c110dd1))
* 重构工作台 ([7970940](https://github.com/continew-org/continew-admin-ui/commit/7970940f50791d81b793ceaebaaf9a68bc5d8e30)) ([b13f2ca](https://github.com/continew-org/continew-admin-ui/commit/b13f2ca91da004cb993a04fcb9f87004bb02b5c3)) ([fd1dfcf](https://github.com/continew-org/continew-admin-ui/commit/fd1dfcf3f484db0362dae58f6272b11573452451))
* 使用 vue-office 重构文件预览（移除KKFileView） ([51aceac](https://github.com/continew-org/continew-admin-ui/commit/51aceac988fcdc4a5795bd8cc8dffd7dcc7f7c39)) (Gitee#25)
* 公告支持设置通知范围，新增用户选择器组件 ([354b6bc](https://github.com/continew-org/continew-admin-ui/commit/354b6bc6d57c43951db512e9599549d32cdedc9c)) ([5ade6bc](https://github.com/continew-org/continew-admin-ui/commit/5ade6bcecf8c89ebc4260e7292cbbdfc5ac30fec)) ([233bd62](https://github.com/continew-org/continew-admin-ui/commit/233bd62babe6660193835b6bb30ae7d169b032ba)) ([84148b6](https://github.com/continew-org/continew-admin-ui/commit/84148b6a68d0701efc6efb900d1da4d7a6b49bd8)) ([5de731d](https://github.com/continew-org/continew-admin-ui/commit/5de731dab48eb38ca3430a6bcfd807ab36c17a7b)) (GitCode#1)
* 角色管理增加分配角色功能 ([2f30df5](https://github.com/continew-org/continew-admin-ui/commit/2f30df528caaca664db24ddb80dd4dbb8a378b43)) ([449e512](https://github.com/continew-org/continew-admin-ui/commit/449e5128d74569cd74d0779a17cbcaf1d8390fe6)) (GitHub#33) 
* 调整默认头像规则，由基于性别的固定头像调整为基于昵称展示（背景颜色基于昵称计算随机） ([00c909e](https://github.com/continew-org/continew-admin-ui/commit/00c909e6f1e1767e69024620e99f71f98f2cf474))
* 新增能力开放模块应用管理功能 ([26291a1](https://github.com/continew-org/continew-admin-ui/commit/26291a1e444e3d63a5532e25bcaa4ea6a3d17125)) ([2b7c099](https://github.com/continew-org/continew-admin-ui/commit/2b7c09966fc3f8b059c4f587845149f5b1ea14c7)) (Gitee#27)
* 新增 GiEditTable 编辑表格组件（同步 GiDemo 更新） ([b46235b](https://github.com/continew-org/continew-admin-ui/commit/b46235b7ede5991d3582e68db9ab65515867798e))
* GiTable 表格组件插槽支持插槽类型提示（同步 GiDemo 更新） ([88864d8](https://github.com/continew-org/continew-admin-ui/commit/88864d8c5df55941a50ef23ac2c3d1030b61b47f))
* tab栏增加右键菜单 Closes #IA5RD4 ([169a304](https://github.com/continew-org/continew-admin-ui/commit/169a3049c479bd001e5cb5cff4eb20010e3c66ad)) (Gitee#31)
* 用户管理新增分配角色功能 ([3b74b5c](https://github.com/continew-org/continew-admin-ui/commit/3b74b5c7bfc9617f55565800349f4be51712e805))

### 💎 功能优化

- 完善部分限制字数输入框的限制提示 ([bb246f4](https://github.com/continew-org/continew-admin-ui/commit/bb246f45289f8899ebd5d2dfe1d5bc3be5ba880a))
- 优化公告相关样式 ([5ebdaa0](https://github.com/continew-org/continew-admin-ui/commit/5ebdaa045391c14fbc3456d18f5f1320123e5032)) ([33bf31b](https://github.com/continew-org/continew-admin-ui/commit/33bf31b048638b5a64a7acc3d8eb1e790cd38fa2))
- 重构部门管理、菜单管理树列表过滤（前端过滤） ([d881b93](https://github.com/continew-org/continew-admin-ui/commit/d881b93c7814d6cd92fb81717ab690dd1ac8c732))
- 优化表格工具栏样式 ([ff87940](https://github.com/continew-org/continew-admin-ui/commit/ff879405d76e91c2985536540ff49081e5e631b4))
- 重构用户管理搜索栏（支持多条件展开及折叠） ([50a6d17](https://github.com/continew-org/continew-admin-ui/commit/50a6d17516ab214d2b198b57c4b014360bc596ed)) ([84ad0d5](https://github.com/continew-org/continew-admin-ui/commit/84ad0d55b025fa96c2d83d732b87a496273abe1c))
- 优化表格 slot 命名 ([6a77168](https://github.com/continew-org/continew-admin-ui/commit/6a771686454917324604b1b456a27a96227229ed))
- 优化部分代码 ([1382346](https://github.com/continew-org/continew-admin-ui/commit/13823461d2d0175be1ed37f0a4a5f40f7c055160)) ([f650a6f](https://github.com/continew-org/continew-admin-ui/commit/f650a6f3aedd529e1c7e27fec50cfcca580918fe)) ([ce09f73](https://github.com/continew-org/continew-admin-ui/commit/ce09f737c3f8e8c8e0bcd834c8fbef0cc664be65)) ([4edbe54](https://github.com/continew-org/continew-admin-ui/commit/4edbe54fe37f49fda0b4a5eed16916db02742c43)) ([0bd0ff5](https://github.com/continew-org/continew-admin-ui/commit/0bd0ff5e21c11af30c5188d45ce4896faaebcf0c))
- 调整新增字典按钮位置 ([47a5c44](https://github.com/continew-org/continew-admin-ui/commit/47a5c448895cd5bc793c0f6c9baf5cf15c3c1297))
- 调整字典的操作菜单弹出方式，由右键弹出调整为点击更多按钮弹出 ([e29cf88](https://github.com/continew-org/continew-admin-ui/commit/e29cf88d1c7ea8115819eb528cbeb9c4e5a6d6ba)) ([795932e](https://github.com/continew-org/continew-admin-ui/commit/795932e440737e060c536726d0d3e81f89966ab1))
- 优化 GiForm 组件代码（同步 GiDemo 更新） ([ad31d9f](https://github.com/continew-org/continew-admin-ui/commit/ad31d9f2ffe9372f6bc5108b305086a700ca61de)) ([ae08678](https://github.com/continew-org/continew-admin-ui/commit/ae08678fa103850ba63d3bfeb70033e9f0f4c5ff))
- 优化部分链接样式 ([c6daf41](https://github.com/continew-org/continew-admin-ui/commit/c6daf41a2e418454b873c67252eed2f808b68bd3))
- GiForm 组件替换为 Grid 布局（同步 GiDemo 更新） ([4b90247](https://github.com/continew-org/continew-admin-ui/commit/4b902475dd5e1894329ca00d2d50f12e304856c0))
- 默认选中第一个字典 ([34d4faa](https://github.com/continew-org/continew-admin-ui/commit/34d4faa0903288aa7e71604f832cd1a04864790c))
- 调整 eslint.config.js，优化代码格式 ([9e5dff1](https://github.com/continew-org/continew-admin-ui/commit/9e5dff144b31d39f479bd7d377338323c8551ffb))
- 优化导入用户部分界面及接口路径 ([881c7e7](https://github.com/continew-org/continew-admin-ui/commit/881c7e720e5a753115a4121276333ff121a8d741))
- 文件管理、分析页、代码生成等部分组件调整为异步加载 ([2caedd1](https://github.com/continew-org/continew-admin-ui/commit/2caedd165f55b577c921a6527132666e2c9a48a0)) (Gitee#29)
- 重构代码生成列表 ([293718f](https://github.com/continew-org/continew-admin-ui/commit/293718f670d3e214acced99db2eaf48b35856e45))
- 调整 html lang="en" 为 zh-CN ([cefb954](https://github.com/continew-org/continew-admin-ui/commit/cefb95479113a1cace7f075d2045048d84716780)) (Gitee#33)
- 调整查询系统配置参数接口地址 ([0116432](https://github.com/continew-org/continew-admin-ui/commit/011643226cbc88651665c01b2a7b84d58f2f1176))
- 进度条由请求时调整为切换路由显示 ([f702e03](https://github.com/continew-org/continew-admin-ui/commit/f702e03124199b004fe77b7c1c34f01f711b1ed5))

### 🐛 问题修复

- 消除控制台 Sass 警告 ([e2fe1ab](https://github.com/continew-org/continew-admin-ui/commit/e2fe1ab814e80da4bf641710826ec062c0168392)) (Gitee#20)
- 修复定时任务不显示堆栈异常的情况 ([44ef909](https://github.com/continew-org/continew-admin-ui/commit/44ef90917f28217ae1db151bbfa46380d1d1fd34)) (Gitee#22)
- 在useTable选项中将paginationOption设置为可选 ([07294cc](https://github.com/continew-org/continew-admin-ui/commit/07294cce14c5a77de1b4e7f9a40f25951978bc97)) (Gitee#22)
- 修复tab页只剩一个的时候无法关闭的问题 ([0594ae9](https://github.com/continew-org/continew-admin-ui/commit/0594ae91c74fbc19c0bd7ccd2ad6f7f67597d32a))
- 修复系统名太长会使菜单栏右侧黑边过长的问题 ([d1d29df](https://github.com/continew-org/continew-admin-ui/commit/d1d29dfce64abeee08ac924e64ec38950ccd0da6))
- 固定vue-tsc版本，避免typescript5.0.4版本冲突 ([2648497](https://github.com/continew-org/continew-admin-ui/commit/2648497f2acc90c76f4246b5c7e249b8277559e7)) (GitHub#28)
- 修复主页公告弹窗MD显示 ([40bfcd5](https://github.com/continew-org/continew-admin-ui/commit/40bfcd5f0d6a8019b2ded0730145d944970cb314)) (GitHub#29)
- 修复搜索图标不生效,并支持模糊搜索 ([6e9b322](https://github.com/continew-org/continew-admin-ui/commit/6e9b32295dc8270e18716b6d7918fe20b6d40d06)) (GitHub#30)
- 修复选择上级菜单过滤失效的问题 ([777f371](https://github.com/continew-org/continew-admin-ui/commit/777f371ffcf763b5f5a958a9e7fad1bd2737d275))
- 修复了开发环境下，点击使用了GiTable菜单自动刷新页面的问题 ([20bbf6c](https://github.com/continew-org/continew-admin-ui/commit/20bbf6c6af8c755af84806c675e40951a55fb6a9)) (Gitee#26)
- 修复获取短信、邮箱验证码缺失行为验证码参数错误 ([1cb0172](https://github.com/continew-org/continew-admin-ui/commit/1cb01720589cba3f8944eebb35457d30ee4658f8))
- 修复浏览器控制台报错 ([880fb1d](https://github.com/continew-org/continew-admin-ui/commit/880fb1d55d3a7e91f54dd9840f26f0e4c44fbc06))
- 优化部分表格列宽度样式 ([b908f14](https://github.com/continew-org/continew-admin-ui/commit/b908f14b33c1578ac6da88fb6c74b762b4197664))
- 修复公告显示及详情页跳转错误 ([6b265f7](https://github.com/continew-org/continew-admin-ui/commit/6b265f74bba52647470bd63f7c82968f2d988c41))
- 还原滚动条样式 ([8568ac1](https://github.com/continew-org/continew-admin-ui/commit/8568ac1a2ea2e7e8287ee04d6f7361c54b578d96))
- 补充重构邮箱登录后遗漏的行为验证码 ([2735dcf](https://github.com/continew-org/continew-admin-ui/commit/2735dcf93921c738ee8ffb375d37b2d81ae5121f))

## [v3.3.0](https://github.com/continew-org/continew-admin-ui/compare/v3.2.0...v3.3.0) (2024-09-09)

### ✨ 新特性

* GiForm 新增年\月\季度\周\范围、颜色选择器支持 ([ad53e1d](https://github.com/continew-org/continew-admin-ui/commit/ad53e1d419d8012fbeedc3f26943d3b36b133ee3))
* GiTag 组件功能扩展，提供 color 属性，用于自定义颜色 ([050a171](https://github.com/continew-org/continew-admin-ui/commit/050a171e91ae8f62aeb17d108ccb4a3c7c49eb4b))
* 代码生成字段配置列表支持拖拽排序 ([fcbc3eb](https://github.com/continew-org/continew-admin-ui/commit/fcbc3ebbff5cdbb555e594d73c94dce643c8e8ec))
* 代码生成字段配置支持选择关联字典 ([6574181](https://github.com/continew-org/continew-admin-ui/commit/65741811103a848a38f0f637df02fb677b82f205))
* 代码生成字段配置支持自定义名称、类型 ([b29960f](https://github.com/continew-org/continew-admin-ui/commit/b29960f3f534b3a83f62ec7c64f6302a1daf52bf))
* 修改角色功能权限、数据权限支持衔接新增角色时的父子联动 ([5cfb0d7](https://github.com/continew-org/continew-admin-ui/commit/5cfb0d795a000393514109fdf057ce0c654dc0a9)) ([0f35d29](https://github.com/continew-org/continew-admin-ui/commit/0f35d292addd7498bcdeca432b3ae0591b613c30))

### 💎 功能优化

- 适配后端接口响应 code 数据类型变动 ([f321030](https://github.com/continew-org/continew-admin-ui/commit/f321030c4c8b4f4493388fc73152a56f31bb2a6d))
- 使用分步表单重构新增角色交互 (Gitee#18) ([fe25e1c](https://github.com/continew-org/continew-admin-ui/commit/fe25e1c698078a7ba609b24c730d00029429014c)) ([80de5b0](https://github.com/continew-org/continew-admin-ui/commit/80de5b0e5e13a5ad1a1cf816bbbc223a9d392e74))
- 优化 apis 导入，随着模块和接口的增加，方便维护 ([8a80db0](https://github.com/continew-org/continew-admin-ui/commit/8a80db0f92a2c271594c8027559591f40c27f39b))
- 优化 GiForm 组件代码 ([948158f](https://github.com/continew-org/continew-admin-ui/commit/948158f1fa65fe92bc3040fb0b70550a6ecefa0f))
- 优化部分代码 ([cb03111](https://github.com/continew-org/continew-admin-ui/commit/cb03111c22164365f2e5198d5162bff172492ffe))
- 消除搜索框歧义，明确可输入项 ([ab7ef15](https://github.com/continew-org/continew-admin-ui/commit/ab7ef153abe510aa1d32b27de2d630426d369d94))

### 🐛 问题修复

- 修复 Mix 布局下面包屑显示不全的问题 ([917cd43](https://github.com/continew-org/continew-admin-ui/commit/917cd43a0866a90b81b5af0d11ecc1c457b01f6b))
- 修复用户管理，字典管理上一下二布局影响table表格溢出不显示问题 ([23ca50c](https://github.com/continew-org/continew-admin-ui/commit/23ca50c99dad206a97058006b071d1e921fca225))
- 修复切换 tab 页签后参数丢失的问题 ([13181bb](https://github.com/continew-org/continew-admin-ui/commit/13181bbb8980eab8c1acc2da01d6027818e05c82))
- 修复侧边栏宽度塌陷错误 ([1b01ced](https://github.com/continew-org/continew-admin-ui/commit/1b01cedae9f30e69fa7393e89223d382ca01a306))
- 修复修改密码后不弹出跳转提示的问题 ([3f41306](https://github.com/continew-org/continew-admin-ui/commit/3f4130615498b2aa863f75577597b9a6500a192b))
- 修复用户管理列设置未能正确禁用列的问题 ([eec9610](https://github.com/continew-org/continew-admin-ui/commit/eec9610e7004bc18dbc96dcf401d8d47ef275ce5))

## [v3.2.0](https://github.com/continew-org/continew-admin-ui/compare/v3.1.0...v3.2.0) (2024-08-05)

### ✨ 新特性

* 新增用户批量导入功能 (GitHub#23) ([f72b4b8](https://github.com/continew-org/continew-admin-ui/commit/f72b4b8d563acd6d2829018be0d079a835911f18))
* 新增任务调度模块 SnailJob（灵活，可靠和快速的分布式任务重试和分布式任务调度平台） (Gitee#13) ([e8c1d4b](https://github.com/continew-org/continew-admin-ui/commit/e8c1d4b69b10a53f4adfaf8a2fd4b8280de965c7)) ([d7fc693](https://github.com/continew-org/continew-admin-ui/commit/d7fc693650259d8ad50aaf69504b991343f4694b)) ([edadea9](https://github.com/continew-org/continew-admin-ui/commit/edadea91edc74a7f95b67e7401aa7efb439f6ffd)) ([0a596f3](https://github.com/continew-org/continew-admin-ui/commit/0a596f3fdccc9fcecdb3d550889cb006450b30a3)) ([ff405d1](https://github.com/continew-org/continew-admin-ui/commit/ff405d12ab441f64c29b986fccb91caf727a5811))
* 系统配置-基础配置 logo 及 favicon 改为 base64 存储 (Gitee#16) ([881c1ee](https://github.com/continew-org/continew-admin-ui/commit/881c1ee1e41805d5728648b1a72e50480199216b))
* 新增支持 KKFileView 文件预览功能，需要自行部署文件预览服务器 (Gitee#17) ([99fa570](https://github.com/continew-org/continew-admin-ui/commit/99fa5709ee03a6f368c8297a7306c02872adfcb2))
* 新增单页面通知公告编辑与查看 ([90693cb](https://github.com/continew-org/continew-admin-ui/commit/90693cb25d061af9d15b4579cf82db80a38cfc40))

### 💎 功能优化

- 优化部分代码格式 ([ed085c9](https://github.com/continew-org/continew-admin-ui/commit/ed085c92bdbf61bae6334ceaee4a3b7e5c605065))
- 优化部分命名 ([805ae65](https://github.com/continew-org/continew-admin-ui/commit/805ae65556e7969cd0a1ac0ddee24b9a2c0be0ff))
- 移除滚动条样式 ([b154375](https://github.com/continew-org/continew-admin-ui/commit/b15437537b0b8948e6ede22830852cd3eb778e84))
- 回退用户管理部门树组件（此树查询不应该校验功能权限） ([ee6a6e4](https://github.com/continew-org/continew-admin-ui/commit/ee6a6e437d8f0806137ab49252c8d6f34337d3cd))
- 优化子路由设置 ([f54caed](https://github.com/continew-org/continew-admin-ui/commit/f54caed4da38dc329c52e3e07419fca31f56bee7))
- 路由切换时检测前端版本更新（原为定时器检测） ([5fdfada](https://github.com/continew-org/continew-admin-ui/commit/5fdfada11d6813ae2728797e0c5ef81387c39c6d))

### 🐛 问题修复

- 修复部分路由错误 ([92e773e](https://github.com/continew-org/continew-admin-ui/commit/92e773e621657946aab3a9149208139d98cac996))
- 修复通知公告重叠问题 ([3364cb1](https://github.com/continew-org/continew-admin-ui/commit/3364cb185855541246a93f8663efe197597df170))
- 解决代码生成页面丢失目录层级问题 (Gitee#12) ([fe08683](https://github.com/continew-org/continew-admin-ui/commit/fe086830dd6a50a0bbf7d1d59563b85a3bfa401c))
- 修复表格固定操作列滚动时的错位样式问题 (Gitee#14) ([ce297c0](https://github.com/continew-org/continew-admin-ui/commit/ce297c0904f00ef6f93a9772b149f817a91a3f2a))
- 修复文件管理没有文件时控制台报错 ([bad6e30](https://github.com/continew-org/continew-admin-ui/commit/bad6e30e4133507cd6e44de9f525c25d3ebc1adb))

## [v3.1.0](https://github.com/continew-org/continew-admin-ui/compare/v3.0.1...v3.1.0) (2024-06-16)

### ✨ 新特性

* 系统配置新增安全设置功能 ([395a564](https://github.com/continew-org/continew-admin-ui/commit/395a5642afbe3bac8b6b3f161949264a874033ba))
* useTable 支持 “无分页” 列表 ([1421412](https://github.com/continew-org/continew-admin-ui/commit/1421412d678c926868b06ae8adeba292f390d3b1))
* 图片文件支持缩略图 (GitHub#17) ([c82dc90](https://github.com/continew-org/continew-admin-ui/commit/c82dc9083bf7dbb9cccdd7c4daff6fe743eb9a0c))
* 在线用户增加最后活跃时间显示 ([fff4de5](https://github.com/continew-org/continew-admin-ui/commit/fff4de56f30d3e3f777bd45b2f77be61bba3a555)) ([4eef0db](https://github.com/continew-org/continew-admin-ui/commit/4eef0db9f93cb73e10113c8f69ad547f502db621))
* 新增行为验证码，行为验证码重新上线 (Gitee#7) ([778b3c6](https://github.com/continew-org/continew-admin-ui/commit/778b3c677fee14071d49355980936b52d16a7313))
* 新增消息中心 ([fdd4b9a](https://github.com/continew-org/continew-admin-ui/commit/fdd4b9a4dfcb600e8455c5c402fc6f818b6f1507))
* 新增 WebSocket 消息通知 (GitHub#20) ([adc6f64](https://github.com/continew-org/continew-admin-ui/commit/adc6f643b3ba481313b3f23e876eb4836d8753b4)) ([56b1fdd](https://github.com/continew-org/continew-admin-ui/commit/56b1fdd75521b08334b25e2d03f7cbcfe2014360)) ([c104ba5](https://github.com/continew-org/continew-admin-ui/commit/c104ba5445f1c990b08ec5fd3a8cf1d783d65c76))
* 新增邮件配置 (Gitee#8) ([1ebfd11](https://github.com/continew-org/continew-admin-ui/commit/1ebfd115eb4f488a7a9464415ce061f9ad36eca0)) ([45cbabf](https://github.com/continew-org/continew-admin-ui/commit/45cbabf54503210305f7e74382fa7c4d702c359c)) ([66f89b4](https://github.com/continew-org/continew-admin-ui/commit/66f89b44d897b7e6874b9882e8708cadf5ab60aa)) ([6e520a3](https://github.com/continew-org/continew-admin-ui/commit/6e520a30720c418b7484f37c1736f189613e83ce))
* 文件管理增加复制文件 URL 按钮 ([5c6d311](https://github.com/continew-org/continew-admin-ui/commit/5c6d3119eb4aab0f679aaeadcead7f96f6f1ea22))
* 新增版权条显示配置 ([0f3d927](https://gitee.com/continew/continew-admin-ui/commit/0f3d927f9894e296e5dde83feb1738206c44b5b1)) ([d7e29e2](https://gitee.com/continew/continew-admin-ui/commit/d7e29e238ee31301807275be1147824295995650))
* 新增密码过期修改页面逻辑 ([921d9c6](https://github.com/continew-org/continew-admin-ui/commit/921d9c63e955711473e1c911f59da4711cdc1197))
* 新增前端简略版本更新提示 ([03d05e1](https://github.com/continew-org/continew-admin-ui/commit/03d05e1821a0360afa724d86ce34a51aedb9c07e))

### 💎 功能优化

- 路由多级缓存调整为扁平化方案 ([5f3dd93](https://github.com/continew-org/continew-admin-ui/commit/5f3dd93376ed62c803d6e26965f43812c86abee8))
- 优化 ESLint 配置并更正问题代码（eslint src --fix） ([5d9fedc](https://github.com/continew-org/continew-admin-ui/commit/5d9fedc35406e00d88d8921ffe04b99a7c49cb8e))
- 代码生成预览调整为以文件树结构形式显示 (Gitee#5) ([c9198b3](https://github.com/continew-org/continew-admin-ui/commit/c9198b315c25cb3e8fd7f769b543e98e131f878c))
- 优化公告和字典项响应式窗口效果 ([4c2f36f](https://github.com/continew-org/continew-admin-ui/commit/4c2f36fe6b5254a613cabd686501e891cd8c7d1c))
- 优化个人中心部分代码 ([eb11cae](https://github.com/continew-org/continew-admin-ui/commit/eb11cae635ff4a0661603509cec4e85a462f5a63))
- 更换 ESLint 配置为 @antfu/eslint-config ([bfc8e42](https://github.com/continew-org/continew-admin-ui/commit/bfc8e42bad6777243fdca9bf37b0d95a92c75159))
- 代码生成预览样式调整 (Gitee#6) ([fe656af](https://github.com/continew-org/continew-admin-ui/commit/fe656af1aa1afbc290cf6a6121347106adf5df60)) ([cc0840e](https://github.com/continew-org/continew-admin-ui/commit/cc0840e2ae7f25f25432c6a01781ac1a8112eea7))
- 启动项目时，控制台增加应用信息打印 ([52e7682](https://github.com/continew-org/continew-admin-ui/commit/52e7682a4786ae6e3fae49dcbd8ee473f30d2cb5))
- 优化部分弹框响应式效果 ([c1c5f7f](https://github.com/continew-org/continew-admin-ui/commit/c1c5f7f632827286982fdc0b9235cb115298e541))
- 优化文件管理部分显示效果 ([7a2c66e](https://github.com/continew-org/continew-admin-ui/commit/7a2c66e6463eb50d8c7bee0dcd21c396fe642ceb))
- 优化重置路由实现 ([7c1106e](https://github.com/continew-org/continew-admin-ui/commit/7c1106e8c26d3dc3c2ecee93f9f98bc56a171720))
- 优化 copy 组件使用 ([c369b88](https://github.com/continew-org/continew-admin-ui/commit/c369b88185c85bb7782383617fd6debf1f6c16d9)) ([a8b5d97](https://github.com/continew-org/continew-admin-ui/commit/a8b5d97bfa0ed256205284deb7364bf50e18927a))
- 优化用户角色名称展示 ([d4b9057](https://github.com/continew-org/continew-admin-ui/commit/d4b9057554f7bbe58d45429529d7279182100616))
- 优化删除弹窗按钮样式 ([c2806c4](https://github.com/continew-org/continew-admin-ui/commit/c2806c469695adbe3ef1950957a33d48059c6cb6))
- 优化表格页面样式及表格纵向滚动条 ([861f620](https://github.com/continew-org/continew-admin-ui/commit/861f6203cc0ebcdd7087434c9d8bafccf4360812))
- 重构字典管理（左树右表） ([a175120](https://github.com/continew-org/continew-admin-ui/commit/a175120d699f5da099e7f027a6c5f0fba26705d8)) ([aac5899](https://github.com/continew-org/continew-admin-ui/commit/aac5899fe0a01fe0e91ffc1904c94ac9ecaa4885))
- 重构用户管理部门树，支持部门管理 ([ca05fab](https://github.com/continew-org/continew-admin-ui/commit/ca05fabdec277965057f7901317edefca74cb258)) ([1be08f1](https://github.com/continew-org/continew-admin-ui/commit/1be08f10010654dc675d67b792f1fc870df5961e)) ([f8ded4b](https://github.com/continew-org/continew-admin-ui/commit/f8ded4b491a22369d43ff3e76f75c771130c4f1c))
- 优化表格列表显示 ([ed7be3e](https://github.com/continew-org/continew-admin-ui/commit/ed7be3ef25a91d66bcd33bae6176ecb81c85ec44))
- 优化文件管理分页 ([00da9ac](https://github.com/continew-org/continew-admin-ui/commit/00da9acdd09e4f2f8233ec22ae37408f9a027674))
- 优化系统配置加载与切换问题 ([605ac4d](https://github.com/continew-org/continew-admin-ui/commit/605ac4d0865e2b7471583f3e0b5a14993bf25104))
- 优化全局 loading 及 empty 配置 ([7e329fc](https://github.com/continew-org/continew-admin-ui/commit/7e329fcffacc58cb626b3b7a71a53d8decc170f7))
- 适配系统参数 API 新的使用方式 ([1909b6e](https://github.com/continew-org/continew-admin-ui/commit/1909b6e907f8d8dd00d8e59eff8c2125914cad3f))
- 存储管理S3存储配置填充默认域名 (GitHub#21) ([5897bde](https://github.com/continew-org/continew-admin-ui/commit/5897bde0c45dd61a94ac9bcf85b55f12a7fe5133))
- 优化个人中心部分默认显示效果 ([f2206b7](https://github.com/continew-org/continew-admin-ui/commit/f2206b78012d594010bc6cee47a95a9ebab1ad1b))
- 调整对话框默认可拖拽，表格默认可调整列宽 ([5581d3f](https://github.com/continew-org/continew-admin-ui/commit/5581d3fd8910997d61ca6e281cec50caef264ca3))
- 目录下仅有一个菜单时平铺展示 ([dc4ae0f](https://github.com/continew-org/continew-admin-ui/commit/dc4ae0fb34a940030f4fc1841ede3557ccccb58c))


### 🐛 问题修复

- 修复用户列表禁用列错误 ([1e5a50c](https://github.com/continew-org/continew-admin-ui/commit/1e5a50c37bc8dbc18d917e523b0a215a510f57db))
- 修复菜单管理列表滚动问题 ([5101dd1](https://github.com/continew-org/continew-admin-ui/commit/5101dd12d9769d8927afb40619fb68d696c22a82))
- 修复打包部署后或 preview 模式下，布局切换及页签显示异常 ([68d8f0f](https://github.com/continew-org/continew-admin-ui/commit/68d8f0f5b36be162a0c64d500d845388c239c4a7))
- 修复文件管理图表加载错误 ([d1af509](https://github.com/continew-org/continew-admin-ui/commit/d1af509a1aaa7d1a6982f3dcdadb7202b71b9475))
- 字典编码不允许修改 ([0a6cd6e](https://github.com/continew-org/continew-admin-ui/commit/0a6cd6ef989309a450a810852cbd74e35ed29b6a))
- 修复字典重复请求问题 ([6705027](https://github.com/continew-org/continew-admin-ui/commit/6705027273e098cde57792743c3a0bdacb559449)) ([30222b0](https://github.com/continew-org/continew-admin-ui/commit/30222b08ab6539552f3679f4cb9442f477f4df55))
- 代码生成配置表单校验错误自动跳转回错误 tab ([a015d9f](https://github.com/continew-org/continew-admin-ui/commit/a015d9f843cb72aeb99674a271914044a4e00794))
- 修复文件管理左侧‘全部’查询问题 ([d6c5b89](https://github.com/continew-org/continew-admin-ui/commit/d6c5b8988c84d6d33474d51162bad12973b86c91))
- 修复导出报 400 的问题 ([377a1ff](https://github.com/continew-org/continew-admin-ui/commit/377a1ff1b74fa357545c3298e5b9c480b0f3f0d3))
- 修复用户管理排序参数错误 ([bcbe106](https://github.com/continew-org/continew-admin-ui/commit/bcbe10660fbfdab5a7c7b17c9353aba3adc12638))
- 修复初始值使用错误 ([fd55ad4](https://github.com/continew-org/continew-admin-ui/commit/fd55ad422888f74ea2deda679172db0cff923c9f))
- 修复第三方登录错误 ([a775b86](https://github.com/continew-org/continew-admin-ui/commit/a775b86e2e0973a16e6b9a1945acbd904773b876))
- 修复验证码长度限制错误 ([8702be4](https://github.com/continew-org/continew-admin-ui/commit/8702be45ed64dde39f443c2e5570fd2474821e6b))

## [v3.0.1](https://github.com/continew-org/continew-admin-ui/compare/v3.0.0...v3.0.1) (2024-05-03)

### ✨ 新特性

* 新增表格全屏、尺寸工具 ([b8a84a3](https://github.com/continew-org/continew-admin-ui/commit/b8a84a3a0890d4f6d0e39ecbe50c4f645bd0f106))
* 新增验证码超时显示效果，超时后显示已过期请刷新 (GitHub#14) ([f99c8f1](https://github.com/continew-org/continew-admin-ui/commit/f99c8f1b5a521f987b2822352f976fb0b1dc93b3))
* 文件管理增加资源统计，统计总存储量、各类型文件存储占用 (GitHub#15) ([c70d1ad](https://github.com/continew-org/continew-admin-ui/commit/c70d1adbf922d28853bf4e6cf8cc4e14ad5b0ac7))

### 💎 功能优化

- 统一性别约束/统一上级部门为必填 ([5264cf2](https://github.com/continew-org/continew-admin-ui/commit/5264cf226fa3acd1398d9309e6a97d4d45b64850))
- 一级部门不能修改上级部门 ([b2a1658](https://github.com/continew-org/continew-admin-ui/commit/b2a1658e3730078cf2fbeb3032c23c0922544594))
- 优化根据选中部门查询用户的点击效果 ([ca25285](https://github.com/continew-org/continew-admin-ui/commit/ca252852373840b000c1f65ab925d18335a71fcb)) ([99c37d7](https://github.com/continew-org/continew-admin-ui/commit/99c37d7de4a245836f89c29cf4b638032efae31f))
- 登录页面，H5 端排版更换 ([05ab89d](https://github.com/continew-org/continew-admin-ui/commit/05ab89d03fe6401994698ad9ecdeb8540ec49553))
- 优化 queryForm 的 Query 类型使用 ([5b71369](https://github.com/continew-org/continew-admin-ui/commit/5b713692516db586f2d401a163192c62a963137a))


### 🐛 问题修复

- 修复 Markdown 样式加载错误，改为全局统一加载 (GitHub#9) ([64648d0](https://github.com/continew-org/continew-admin-ui/commit/64648d0c1d897d6e426199e7924ede9dfb40e8b8))
- 修复由于文件组件名称错误导致的侧边栏筛选功能失效 ([81dbea8](https://github.com/continew-org/continew-admin-ui/commit/81dbea879377054e3646c2d07b51c3352501bbce))
- 修复文件管理数据不刷新和批量操作选中问题 (GitHub#13) ([724f60e](https://github.com/continew-org/continew-admin-ui/commit/724f60eaf6b076cfb165ca0b1028c461146495ad))
- 修复文件重命名时不能回显原值的问题 ([3dfa97e](https://github.com/continew-org/continew-admin-ui/commit/3dfa97e785acb42edd3798117f7e8eea326b4b64))
- 修复修改公告时保存按钮点击无效的问题 ([c0a5c2d](https://github.com/continew-org/continew-admin-ui/commit/c0a5c2dffe50905b8610fbd066b8eecd5a4cbe89))
- 修复账号管理、安全设置路由处理错误 ([c0c5ba8](https://github.com/continew-org/continew-admin-ui/commit/c0c5ba8efdab009e7e38ad9a8f68a655aba28718))
- 修复首页卡片显示问题 ([39465dc](https://github.com/continew-org/continew-admin-ui/commit/39465dcaa38c9d79c820583a1dd82978e5588dec))
- 修复 H5 下登录页面错位显示 ([9d570a8](https://github.com/continew-org/continew-admin-ui/commit/9d570a808ce1a15a1513eac0e9ec355d683febef))

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

