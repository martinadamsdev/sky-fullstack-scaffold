# Shalom Monorepo

基于 Bun workspace 的 monorepo 项目，包含小程序、Web、Admin 后台和 API 服务。

## 项目结构

```
shalom-monorepo/
├── apps/
│   ├── miniprogram/    # 微信小程序 (TDesign)
│   ├── mobile/         # 移动端 H5
│   ├── web/            # Web 前端
│   ├── admin/          # 管理后台
│   └── api/            # API 服务 (ElysiaJS)
└── packages/
    └── deployment/     # 部署配置
```

## 技术栈

### API (apps/api)
- **Runtime**: Bun
- **Framework**: ElysiaJS
- **Database**: PostgreSQL 18
- **ORM**: Drizzle ORM
- **Cache**: Redis 8
- **Auth**: Better Auth
- **Plugins**:
  - CORS
  - Cron (定时任务)
  - Bearer Auth
  - GraphQL Apollo
  - JWT
  - OpenAPI
  - OpenTelemetry
  - Server Timing
  - Static Files
  - WebSocket (Eden Treaty)

### Web & Admin
- TBD (React/Next.js/Vue/Nuxt 等)

### MiniProgram
- 微信小程序
- TDesign MiniProgram UI

## 快速开始

### 安装依赖

```bash
bun install
```

### 开发

```bash
# 启动所有服务
bun dev

# 启动特定服务
bun dev:api        # API 服务
bun dev:web        # Web 前端
bun dev:admin      # 管理后台
bun dev:mobile     # 移动端 H5
```

### 数据库

```bash
# 生成 migration
bun db:generate

# 执行 migration
bun db:migrate

# 直接推送 schema (开发环境)
bun db:push

# 打开 Drizzle Studio
bun db:studio
```

## 环境变量

在 `apps/api` 下创建 `.env` 文件：

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/shalom

# Redis
REDIS_URL=redis://localhost:6379

# Better Auth
AUTH_SECRET=your-secret-key
AUTH_URL=http://localhost:3000

# Server
PORT=3000
NODE_ENV=development
```

## 开发指南

### API 开发
参考 `apps/api/README.md`

### 前端开发
参考各应用目录下的 README.md

## 测试

```bash
bun test
```

## 构建

```bash
bun build
```

## 部署

参考 `packages/deployment/README.md`

## License

MIT
