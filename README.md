# ContiNew Admin UI

<a href="https://github.com/Charles7c/continew-admin-ui/blob/dev/LICENSE" target="_blank">
<img src="https://img.shields.io/badge/License-Apache--2.0-blue.svg" alt="License" />
</a>
<a href="https://github.com/Charles7c/continew-admin-ui" target="_blank">
<img src="https://img.shields.io/badge/SNAPSHOT-v2.3.0-%23ff3f59.svg" alt="Release" />
</a>
<a href="https://github.com/Charles7c/continew-admin" target="_blank">
<img src="https://img.shields.io/github/stars/Charles7c/continew-admin?style=social" alt="GitHub stars" />
</a>
<a href="https://github.com/Charles7c/continew-admin" target="_blank">
<img src="https://img.shields.io/github/forks/Charles7c/continew-admin?style=social" alt="GitHub forks" />
</a>
<a href="https://gitee.com/Charles7c/continew-admin" target="_blank">
<img src="https://gitee.com/Charles7c/continew-admin/badge/star.svg?theme=white" alt="Gitee stars" />
</a>
<a href="https://gitee.com/Charles7c/continew-admin" target="_blank">
<img src="https://gitee.com/Charles7c/continew-admin/badge/fork.svg?theme=white" alt="Gitee forks" />
</a>
<a href="https://github.com/Charles7c/continew-admin-ui" target="_blank">
<img src="https://img.shields.io/badge/Vue-3.3.7-%236CB52D.svg" alt="Release" />
</a>
<a href="https://github.com/Charles7c/continew-admin-ui" target="_blank">
<img src="https://img.shields.io/badge/Arco Design Vue-2.53.3-%236CB52D.svg" alt="Release" />
</a>
<a href="https://github.com/Charles7c/continew-admin-ui" target="_blank">
<img src="https://img.shields.io/badge/TypeScript-5.3.3-%236CB52D.svg" alt="Release" />
</a>
<a href="https://github.com/Charles7c/continew-admin-ui" target="_blank">
<img src="https://img.shields.io/badge/Vite-4.5.1-%236CB52D.svg" alt="Release" />
</a>

📚 [在线文档](https://doc.charles7c.top) | 🚀 [演示地址](https://cnadmin.charles7c.top)（账号/密码：admin/admin123）

## 简介

ContiNew Admin（Continue New Admin）持续迭代优化的前后端分离中后台管理系统框架。开箱即用，持续提供舒适的开发体验，依托开源协作模式，提升技术透明度、放大集体智慧、共创优秀实践，源源不断地为企业级项目开发提供助力。

当前采用的技术栈：Spring Boot3（Java17）、Vue3 & Arco Design、Sa-Token、MyBatis Plus、Redisson、Liquibase、JustAuth、Easy Excel、Hutool、TypeScript、Vite4 等。

## 项目源码

|       | 前端源码                                   | 后端源码                                |
| ----- | -------------------------------------------- | ----------------------------------------- |
| GitHub | [github.com/Charles7c/continew-admin-ui](https://github.com/Charles7c/continew-admin-ui) | [github.com/Charles7c/continew-admin](https://github.com/Charles7c/continew-admin) |
| Gitee | [gitee.com/Charles7c/continew-admin-ui](https://gitee.com/Charles7c/continew-admin-ui) | [gitee.com/Charles7c/continew-admin](https://gitee.com/Charles7c/continew-admin) |

##  系统功能

> **Note**
> 更多功能和优化正在赶来💦，最新项目计划、进展请进群或关注 [任务清单](https://doc.charles7c.top/admin/intro/require.html#任务清单) 和 [更新日志](https://doc.charles7c.top/admin/other/changelog.html)。

- 个人中心：支持基础信息修改、安全设置（密码修改、邮箱绑定、手机号绑定（并提供行为验证码、短信限流等安全处理）、第三方账号绑定/解绑）、头像裁剪上传、个人操作日志查看
- 用户管理：提供用户的相关配置，新增用户后，默认密码为 123456
- 部门管理：可配置系统组织架构，树形表格展示
- 角色管理：对权限与菜单进行分配，可根据部门设置角色的数据权限
- 菜单管理：已实现菜单动态路由，后端可配置化，支持多级菜单
- 公告管理：提供公告的发布、查看和删除等功能。管理员可以在后台发布公告，并可以设置公告的生效时间、终止时间，以 markdown-it 为内核渲染 Markdown 格式内容显示
- 消息管理：提供消息查看、标记已读、全部已读、删除等功能（适配对接导航栏站内信功能）
- 字典管理：提供对系统公用数据字典的维护，例如：公告类型，支持字典标签背景色和排序等配置
- 文件管理：提供文件上传、下载、预览（目前支持图片、音视频）、重命名、切换视图（列表、网格）等功能
- 存储库管理：提供文件存储库新增、编辑、删除、导出等功能
- 系统配置：提供修改系统标题、Logo、favicon 等基础配置功能，以方便用户系统与其自身品牌形象保持一致（暂未开放高级配置）
- 代码生成：提供根据数据库表自动生成相应的前后端 CRUD 代码的功能
- 在线用户：管理当前登录用户，可一键踢下线
- 日志管理：提供在线用户监控、登录日志监控、操作日志监控和系统日志监控等监控功能

## 快速开始

> **Note**
> 更详细的流程，请查看在线文档[《快速开始》](https://doc.charles7c.top/admin/intro/quick-start.html#%E5%89%8D%E7%AB%AF)。

```bash
# 1.克隆本项目
git clone https://github.com/Charles7c/continew-admin.git

# 2.在 IDE（Visual Studio Code/WebStorm）中打开前端项目 continew-admin-ui

# 3.安装 pnpm，配置淘宝源
npm install -g pnpm
pnpm config set registry https://registry.npm.taobao.org

# 4.安装依赖
pnpm i

# 5.启动程序
# 5.1 启动成功：访问 http://localhost:5173/
pnpm dev

# 6.部署
# 6.1 Docker 部署
#   6.1.1 服务器安装好 docker 及 docker-compose（参考：https://blog.charles7c.top/categories/fragments/2022/10/31/CentOS%E5%AE%89%E8%A3%85Docker）
#   6.1.2 执行 pnpm build 进行项目打包，将 dist 目录下的所有文件放到 /docker/continew-admin/html 目录下
#   6.1.3 将 docker 目录上传到服务器 / 目录下，并授权（chmod -R 777 /docker）
#   6.1.4 修改 docker-compose.yml 中的 MySQL 配置、Redis 配置、continew-admin-server 配置、Nginx 配置
#   6.1.5 执行 docker-compose up -d 创建并后台运行所有容器
# 6.2 其他方式部署
```

## 核心技术栈

| 名称                                                         | 版本   | 简介                                                         |
| :----------------------------------------------------------- | :----- | :----------------------------------------------------------- |
| <a href="https://cn.vuejs.org/" target="_blank">Vue</a>      | 3.3.7  | 渐进式 JavaScript 框架，易学易用，性能出色，适用场景丰富的 Web 前端框架。 |
| <a href="https://arco.design/vue/docs/start" target="_blank">Arco Design</a> | 2.53.3 | 字节跳动推出的前端 UI 框架，年轻化的色彩和组件设计。         |
| <a href="https://www.typescriptlang.org/zh/" target="_blank">TypeScript</a> | 5.3.3  | TypeScript 是微软开发的一个开源的编程语言，通过在 JavaScript 的基础上添加静态类型定义构建而成。 |
| <a href="https://cn.vitejs.dev/" target="_blank">Vite</a>    | 4.5.1  | 下一代的前端工具链，为开发提供极速响应。                     |

## 项目结构

```bash
continew-admin-ui
  ├─ config               # 全局 Vite 配置
  ├─ public               # 公共静态资源（favicon.ico、logo.svg）
  ├─ src
  │  ├─ api               # 请求接口
  │  │  ├─ demo             # 示例模块
  │  │  ├─ auth             # 认证模块
  │  │  ├─ common           # 公共模块
  │  │  ├─ monitor          # 系统监控模块
  │  │  ├─ system           # 系统管理模块
  │  │  └─ tool             # 系统工具模块
  │  ├─ assets            # 静态资源
  │  │  ├─ icons            # 图标资源
  │  │  ├─ images           # 图片资源
  │  │  └─ style            # 样式资源
  │  ├─ components        # 通用业务组件
  │  ├─ config            # 全局配置（包含 echarts 主题）
  │  │  └─ settings.json    # 配置文件
  │  ├─ directives        # 指令集（如需，可自行补充）
  │  ├─ hooks             # 全局 hooks
  │  ├─ layout            # 布局
  │  ├─ locale            # 国际化语言包
  │  ├─ mock              # 模拟数据
  │  ├─ router            # 路由配置
  │  ├─ store             # 状态管理中心
  │  ├─ types             # TypeScript 类型
  │  ├─ utils             # 工具库（mock 全局开启/关闭）
  │  ├─ views             # 页面模板
  │  │  ├─ demo             # Arco Design 相关示例模块
  │  │  ├─ dashboard        # 仪表盘模块
  │  │  ├─ login            # 登录模块
  │  │  ├─ monitor          # 系统监控模块
  │  │  │  ├─ log              # 日志管理
  │  │  │  │  ├─ login            # 登录日志
  │  │  │  │  ├─ operation        # 操作日志
  │  │  │  │  └─ system           # 系统日志
  │  │  │  └─ online           # 在线用户
  │  │  └─ system           # 系统管理模块
  │  │    ├─ announcement     # 公告管理
  │  │    ├─ config           # 系统配置
  │  │    ├─ dept             # 部门管理
  │  │    ├─ dict             # 字典管理
  │  │    ├─ menu             # 菜单管理
  │  │    ├─ message          # 消息管理
  │  │    ├─ role             # 角色管理
  │  │    └─ user             # 用户模块
  │  │      └─ center           # 个人中心
  │  ├─ App.vue
  │  └─ main.ts           # 入口文件
  ├─ .env.development
  ├─ .env.production
  ├─ index.html
  ├─ package.json
  └─ tsconfig.json
```

## 鸣谢

### 鸣谢

感谢参与贡献的每一位小伙伴🥰

<a href="https://github.com/Charles7c/continew-admin/graphs/contributors">
	<img src="https://contrib.rocks/image?repo=Charles7c/continew-admin" />
</a>

### 特别鸣谢

- 感谢 <a href="https://www.jetbrains.com/" target="_blank">JetBrains</a> 提供的 <a href="https://www.jetbrains.com/shop/eform/opensource" target="_blank">非商业开源软件开发授权</a> 
- 感谢 <a href="http://pro.arco.design/" target="_blank">Arco Design Pro</a> 开箱即用的中后台前端解决方案
- 感谢 [Gi Admin Pro](https://gitee.com/lin0716/gi-demo)，致敬各位作者为开源前端模板领域作出的贡献
  - e.g. 扩展于 Gi Admin Pro 项目开源的文件管理组件
- 感谢项目使用或未使用到的每一款开源组件，致敬各位开源先驱 :fire:

## License

- 遵循 <a href="https://github.com/Charles7c/continew-admin-ui/blob/dev/LICENSE" target="_blank">Apache-2.0</a> 开源许可协议
- Copyright © 2022-present <a href="https://blog.charles7c.top" target="_blank">Charles7c</a>
