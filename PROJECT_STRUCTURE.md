# Shalom 项目结构总览

## 目录结构

```
shalom-monorepo/
├── .git/                       # Git 仓库
├── .gitignore                  # Git 忽略文件配置
├── .env.example                # 全局环境变量模板
├── package.json                # Workspace 根配置
├── bunfig.toml                 # Bun 全局配置
├── tsconfig.json               # TypeScript 全局配置
├── README.md                   # 项目主文档
├── PROJECT_STRUCTURE.md        # 项目结构文档 (本文件)
│
├── apps/                       # 应用目录
│   ├── api/                    # API 服务
│   │   ├── src/
│   │   │   ├── index.ts        # 入口文件
│   │   │   ├── db/             # 数据库相关
│   │   │   ├── lib/            # 工具库
│   │   │   └── routes/         # 路由
│   │   ├── drizzle/            # 数据库迁移文件
│   │   ├── uploads/            # 文件上传目录
│   │   ├── package.json        # @shalom/api
│   │   ├── tsconfig.json
│   │   ├── drizzle.config.ts
│   │   ├── .env.example
│   │   ├── .gitignore
│   │   └── README.md
│   │
│   ├── web/                    # Web 前端
│   │   ├── src/
│   │   │   └── app/            # Next.js App Router
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       └── globals.css
│   │   ├── public/             # 静态资源
│   │   ├── package.json        # @shalom/web
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   ├── postcss.config.js
│   │   ├── .env.example
│   │   └── .gitignore
│   │
│   ├── admin/                  # 管理后台
│   │   ├── src/
│   │   │   └── app/            # Next.js App Router
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       └── globals.css
│   │   ├── public/             # 静态资源
│   │   ├── package.json        # @shalom/admin
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   ├── postcss.config.js
│   │   ├── .env.example
│   │   └── .gitignore
│   │
│   ├── mobile/                 # 移动端 H5
│   │   ├── src/
│   │   │   └── app/            # Next.js App Router
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       └── globals.css
│   │   ├── public/             # 静态资源
│   │   ├── package.json        # @shalom/mobile
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   ├── postcss.config.js
│   │   ├── .env.example
│   │   └── .gitignore
│   │
│   └── miniprogram/            # 微信小程序
│       ├── pages/              # 小程序页面
│       ├── components/         # 小程序组件
│       ├── utils/              # 工具函数
│       ├── app.json            # 小程序配置
│       ├── app.ts              # 入口文件
│       ├── project.config.json # 项目配置
│       └── package.json        # @shalom/miniprogram
│
└── packages/                   # 共享包目录
    └── deployment/             # 部署配置
        ├── docker/             # Docker 配置
        │   ├── api.Dockerfile
        │   ├── web.Dockerfile
        │   ├── admin.Dockerfile
        │   └── mobile.Dockerfile
        ├── k8s/                # Kubernetes 配置 (计划)
        │   ├── api-deployment.yaml
        │   ├── postgres-statefulset.yaml
        │   ├── redis-deployment.yaml
        │   └── ingress.yaml
        ├── scripts/            # 部署脚本 (计划)
        │   ├── deploy.sh
        │   ├── backup.sh
        │   └── restore.sh
        ├── docker-compose.yml  # Docker Compose 配置
        ├── package.json        # @shalom/deployment
        └── README.md           # 部署文档
```

## 技术栈概览

### 后端 API (apps/api)
- **Runtime**: Bun 1.x
- **Framework**: ElysiaJS (最新版)
- **Database**: PostgreSQL 18
- **ORM**: Drizzle ORM
- **Cache**: Redis 8
- **Auth**: Better Auth
- **Email**: React Email
- **GraphQL**: Apollo + GraphQL Tools
- **API Docs**: OpenAPI/Swagger
- **Monitoring**: OpenTelemetry

### 前端应用 (apps/web, apps/admin, apps/mobile)
- **Framework**: Next.js 14
- **UI Library**: Tailwind CSS v4.1.17
- **State Management**: Zustand 4.x
- **Data Fetching**: TanStack Query 5.x
- **API Client**: Eden Treaty (ElysiaJS)
- **Form**: React Hook Form (admin)
- **Validation**: Zod (admin)

### 微信小程序 (apps/miniprogram)
- **Framework**: 原生微信小程序
- **UI Library**: TDesign MiniProgram

### 基础设施
- **Package Manager**: Bun
- **Monorepo**: Bun Workspaces
- **TypeScript**: 5.3+
- **Container**: Docker
- **Orchestration**: Docker Compose / Kubernetes

## 端口分配

| 服务 | 端口 | 用途 |
|------|------|------|
| API | 3000 | ElysiaJS API 服务 |
| Web | 3001 | Web 前端应用 |
| Admin | 3002 | 管理后台 |
| Mobile | 3003 | 移动端 H5 |
| PostgreSQL | 5432 | 主数据库 |
| Redis | 6379 | 缓存服务 |

## 数据流

```
┌─────────────┐
│ MiniProgram │
│   (WeChat)  │
└──────┬──────┘
       │
       │ API Calls
       ↓
┌──────────────────────────────────────┐
│                                      │
│  Frontend Apps (Next.js)             │
│  ┌─────────┬─────────┬─────────┐   │
│  │   Web   │  Admin  │  Mobile │   │
│  │  :3001  │  :3002  │  :3003  │   │
│  └────┬────┴────┬────┴────┬────┘   │
│       │         │         │         │
└───────┼─────────┼─────────┼─────────┘
        │         │         │
        │    Eden Treaty    │
        │  (Type-safe API)  │
        ↓         ↓         ↓
    ┌────────────────────────┐
    │    API Server (Bun)    │
    │   ElysiaJS :3000       │
    │  ┌──────────────────┐  │
    │  │  Better Auth     │  │
    │  │  GraphQL Apollo  │  │
    │  │  JWT             │  │
    │  │  OpenAPI         │  │
    │  └──────────────────┘  │
    └───┬────────────────┬───┘
        │                │
        ↓                ↓
  ┌──────────┐    ┌──────────┐
  │PostgreSQL│    │  Redis   │
  │   :5432  │    │  :6379   │
  └──────────┘    └──────────┘
```

## 开发工作流

1. **安装依赖**
   ```bash
   bun install
   ```

2. **启动数据库**
   ```bash
   cd packages/deployment
   docker-compose up -d postgres redis
   ```

3. **配置环境变量**
   ```bash
   cp .env.example .env
   # 编辑 .env 文件
   ```

4. **运行迁移**
   ```bash
   bun db:migrate
   ```

5. **启动开发服务器**
   ```bash
   bun dev          # 全部
   bun dev:api      # 仅 API
   bun dev:web      # 仅 Web
   bun dev:admin    # 仅 Admin
   bun dev:mobile   # 仅 Mobile
   ```

## 部署流程

### Docker Compose (推荐用于开发/测试)
```bash
cd packages/deployment
docker-compose up -d
```

### Kubernetes (推荐用于生产)
```bash
kubectl apply -f packages/deployment/k8s/
```

### Serverless
- Web/Admin/Mobile → Vercel/Netlify
- API → Cloudflare Workers (需要适配器)

## 包依赖关系

```
┌─────────────────────────────────────┐
│         Root Workspace              │
│         (package.json)              │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       ↓               ↓
┌─────────────┐  ┌─────────────┐
│    apps/*   │  │  packages/* │
└─────────────┘  └─────────────┘
       │               │
       ├── @shalom/api
       ├── @shalom/web
       ├── @shalom/admin
       ├── @shalom/mobile
       ├── @shalom/miniprogram
       └── @shalom/deployment
```

## 配置文件说明

### 根目录配置
- `package.json` - Workspace 和全局脚本
- `bunfig.toml` - Bun 配置 (workspace, install, run)
- `tsconfig.json` - TypeScript 基础配置
- `.env.example` - 环境变量模板
- `.gitignore` - Git 忽略规则

### 各应用配置
每个应用都有独立的：
- `package.json` - 依赖和脚本
- `tsconfig.json` - TS 配置 (继承根配置)
- `.env.example` - 应用环境变量
- `.gitignore` - 应用忽略规则

## 下一步计划

- [ ] 添加 Biome 代码检查和格式化
- [ ] 配置 Husky Git Hooks
- [ ] 添加 Changesets 版本管理
- [ ] 实现 shared packages (utils, types, ui)
- [ ] 配置 GitHub Actions CI/CD
- [ ] 完善 Kubernetes 配置
- [ ] 添加 E2E 测试 (Playwright)
- [ ] 配置 Sentry 错误追踪
- [ ] 添加性能监控 (OpenTelemetry)
- [ ] 实现日志聚合 (ELK/Loki)

## 相关文档

- [根目录 README](./README.md) - 项目介绍和快速开始
- [API 文档](./apps/api/README.md) - API 开发指南
- [部署文档](./packages/deployment/README.md) - 部署指南
