# Shalom Monorepo

基于 Bun workspace 的全栈 monorepo 项目，包含微信小程序、Web、Admin 后台和 API 服务。

## 项目结构

```
shalom/
├── apps/
│   ├── api/            # API 服务 (ElysiaJS + Bun)
│   ├── web/            # Web 前端 (Next.js)
│   ├── admin/          # 管理后台 (Next.js)
│   ├── mobile/         # 移动端 H5 (Next.js)
│   └── miniprogram/    # 微信小程序 (TDesign)
├── packages/
│   └── deployment/     # 部署配置 (Docker, K8s)
├── package.json        # Workspace 配置
├── bunfig.toml         # Bun 全局配置
├── tsconfig.json       # TypeScript 全局配置
└── .env.example        # 环境变量模板
```

## 技术栈

### API (apps/api)
- **Runtime**: Bun
- **Framework**: ElysiaJS
- **Database**: PostgreSQL 18
- **ORM**: Drizzle ORM
- **Cache**: Redis 8
- **Auth**: Better Auth
- **Plugins**: CORS, Cron, JWT, GraphQL, OpenAPI, WebSocket

### Web & Admin & Mobile (apps/web, apps/admin, apps/mobile)
- **Framework**: Next.js 14
- **UI**: Tailwind CSS v4.1.17
- **State**: Zustand
- **Data Fetching**: TanStack Query + Eden Treaty

### MiniProgram (apps/miniprogram)
- **Platform**: 微信小程序
- **UI**: TDesign MiniProgram

## 快速开始

### 前置要求

- [Bun](https://bun.sh) >= 1.0.0
- [Docker](https://www.docker.com/) (可选，用于运行数据库)

### 安装依赖

```bash
bun install
```

### 启动开发环境

#### 1. 启动数据库服务

```bash
cd packages/deployment
docker-compose up -d postgres redis
```

#### 2. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，填入必要的配置
```

#### 3. 运行数据库迁移

```bash
bun db:migrate
```

#### 4. 启动开发服务器

```bash
# 启动所有服务
bun dev

# 或者启动特定服务
bun dev:api        # API 服务 (http://localhost:3000)
bun dev:web        # Web 前端 (http://localhost:3001)
bun dev:admin      # 管理后台 (http://localhost:3002)
bun dev:mobile     # 移动端 H5 (http://localhost:3003)
```

## 可用脚本

### 开发

```bash
bun dev              # 启动所有服务
bun dev:api          # 启动 API 服务
bun dev:web          # 启动 Web 前端
bun dev:admin        # 启动管理后台
bun dev:mobile       # 启动移动端 H5
```

### 构建

```bash
bun build            # 构建所有项目
bun build:api        # 构建 API 服务
bun build:web        # 构建 Web 前端
bun build:admin      # 构建管理后台
bun build:mobile     # 构建移动端 H5
```

### 测试

```bash
bun test             # 运行所有测试
bun test:api         # 运行 API 测试
bun test:web         # 运行 Web 测试
bun test:admin       # 运行 Admin 测试
bun test:mobile      # 运行 Mobile 测试
```

### 数据库

```bash
bun db:generate      # 生成数据库 migration
bun db:migrate       # 执行数据库 migration
bun db:push          # 直接推送 schema (开发环境)
bun db:studio        # 打开 Drizzle Studio
```

### 代码质量

```bash
bun typecheck        # TypeScript 类型检查
bun lint             # 代码检查
bun format           # 代码格式化
bun clean            # 清理构建产物和依赖
```

## 服务端口

| 服务 | 端口 | 描述 |
|------|------|------|
| API | 3000 | ElysiaJS API 服务 |
| Web | 3001 | Web 前端应用 |
| Admin | 3002 | 管理后台 |
| Mobile | 3003 | 移动端 H5 |
| PostgreSQL | 5432 | 数据库 |
| Redis | 6379 | 缓存 |

## 环境变量

参考 `.env.example` 文件配置必要的环境变量。

主要配置项：

- `DATABASE_URL`: PostgreSQL 连接字符串
- `REDIS_URL`: Redis 连接字符串
- `AUTH_SECRET`: Better Auth 密钥
- `JWT_SECRET`: JWT 密钥
- `NEXT_PUBLIC_API_URL`: API 服务地址

## 项目文档

- [API 开发指南](./apps/api/README.md)
- [部署指南](./packages/deployment/README.md)

## 部署

### Docker Compose

```bash
cd packages/deployment
docker-compose up -d
```

### Kubernetes

```bash
kubectl apply -f packages/deployment/k8s/
```

参考 [部署文档](./packages/deployment/README.md) 了解更多部署选项。

## 开发指南

### 添加新包

在 `apps/` 或 `packages/` 目录下创建新项目：

```bash
mkdir apps/new-app
cd apps/new-app
bun init
```

确保在 `package.json` 中设置正确的 name：

```json
{
  "name": "@shalom/new-app"
}
```

### 跨包引用

由于使用 Bun workspace，可以直接引用其他包：

```typescript
import { something } from '@shalom/api'
```

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 提交前运行 `bun typecheck` 和 `bun lint`
- 保持代码格式一致 (`bun format`)

## 故障排查

### 端口被占用

```bash
# 查看占用端口的进程
lsof -i :3000
```

### 数据库连接失败

```bash
# 检查数据库状态
docker ps | grep postgres

# 查看数据库日志
docker logs shalom-postgres
```

### 依赖安装失败

```bash
# 清理缓存并重新安装
bun clean
rm -rf node_modules bun.lockb
bun install
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 许可证

MIT

## 联系方式

- 项目链接: [https://github.com/yourusername/shalom](https://github.com/yourusername/shalom)
- 问题反馈: [Issues](https://github.com/yourusername/shalom/issues)
