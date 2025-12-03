# Shalom API

基于 ElysiaJS 和 Bun 构建的高性能 API 服务。

## 技术栈

- **Runtime**: Bun
- **Framework**: ElysiaJS
- **Database**: PostgreSQL 18
- **ORM**: Drizzle ORM
- **Cache**: Redis 8
- **Auth**: Better Auth

## 功能特性

### 核心功能
- ✅ RESTful API
- ✅ GraphQL API (Apollo)
- ✅ WebSocket 支持 (Eden Treaty)
- ✅ JWT 认证
- ✅ Bearer Token 认证
- ✅ Email/Password 认证
- ✅ 社交登录支持

### 中间件 & 插件
- ✅ CORS
- ✅ Swagger/OpenAPI 文档
- ✅ Server Timing
- ✅ 静态文件服务
- ✅ 定时任务 (Cron)
- ✅ OpenTelemetry 监控

## 快速开始

### 1. 安装依赖

```bash
bun install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并填写配置：

```bash
cp .env.example .env
```

必填项：
- `DATABASE_URL`: PostgreSQL 连接字符串
- `REDIS_URL`: Redis 连接字符串
- `AUTH_SECRET`: 认证密钥（至少 32 字符）
- `JWT_SECRET`: JWT 密钥

### 3. 初始化数据库

```bash
# 生成 migration
bun run db:generate

# 执行 migration
bun run db:migrate

# 或直接推送 schema (开发环境)
bun run db:push
```

### 4. 启动开发服务器

```bash
bun run dev
```

服务将在 http://localhost:3000 启动

## 可用脚本

```bash
# 开发模式（热重载）
bun run dev

# 生产模式
bun run start

# 测试
bun test

# 数据库操作
bun run db:generate    # 生成 migration
bun run db:migrate     # 执行 migration
bun run db:push        # 直接推送 schema
bun run db:studio      # 打开 Drizzle Studio
```

## API 文档

启动服务后访问：

- **Swagger UI**: http://localhost:3000/swagger
- **Health Check**: http://localhost:3000/health

## 项目结构

```
apps/api/
├── src/
│   ├── db/
│   │   ├── schema/          # Drizzle schema 定义
│   │   │   ├── index.ts
│   │   │   └── users.ts
│   │   └── index.ts         # 数据库连接
│   ├── lib/
│   │   ├── auth.ts          # Better Auth 配置
│   │   └── redis.ts         # Redis 连接
│   ├── routes/
│   │   ├── auth.ts          # 认证路由
│   │   └── health.ts        # 健康检查
│   └── index.ts             # 应用入口
├── drizzle/                 # Migration 文件
├── uploads/                 # 上传文件目录
├── .env.example
├── drizzle.config.ts
├── package.json
└── tsconfig.json
```

## 数据库 Schema

当前包含的表：

- `users` - 用户信息
- `sessions` - 会话管理
- `accounts` - 第三方账号关联
- `verifications` - 邮箱验证等

添加新表：

1. 在 `src/db/schema/` 创建新文件
2. 在 `src/db/schema/index.ts` 导出
3. 运行 `bun run db:generate`
4. 运行 `bun run db:migrate`

## 认证

使用 Better Auth 提供：

- Email/Password 登录
- 会话管理
- 邮箱验证
- 密码重置

### API 端点

所有认证端点都在 `/api/auth/*` 下：

```bash
# 注册
POST /api/auth/sign-up
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}

# 登录
POST /api/auth/sign-in
{
  "email": "user@example.com",
  "password": "password123"
}

# 登出
POST /api/auth/sign-out

# 获取当前用户
GET /api/auth/session
```

## Redis 使用

```typescript
import { redis } from './lib/redis';

// 设置值
await redis.set('key', 'value', 'EX', 3600); // 1 小时过期

// 获取值
const value = await redis.get('key');

// 删除
await redis.del('key');
```

## 定时任务

添加定时任务示例：

```typescript
import { Elysia } from 'elysia';
import { cron } from '@elysiajs/cron';

app.use(
  cron({
    name: 'heartbeat',
    pattern: '*/30 * * * * *', // 每 30 秒
    run() {
      console.log('Heartbeat');
    },
  })
);
```

## GraphQL

GraphQL 端点: `/graphql`

配置在 `src/index.ts` 中通过 `@elysiajs/apollo` 插件。

## WebSocket

使用 Eden Treaty 客户端连接 WebSocket：

```typescript
// 服务端
app.ws('/ws', {
  message(ws, message) {
    ws.send('Hello from server!');
  },
});

// 客户端
import { treaty } from '@elysiajs/eden';
const client = treaty<App>('localhost:3000');
const ws = client.ws.subscribe();
```

## 测试

```bash
# 运行所有测试
bun test

# 运行特定测试文件
bun test src/routes/auth.test.ts

# 监听模式
bun test --watch
```

测试示例：

```typescript
import { describe, expect, it } from 'bun:test';
import { app } from './index';

describe('Health Check', () => {
  it('should return ok', async () => {
    const response = await app
      .handle(new Request('http://localhost/health'))
      .then((res) => res.json());

    expect(response.status).toBe('ok');
  });
});
```

## 部署

### Docker

```dockerfile
FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["bun", "run", "start"]
```

### 环境变量

生产环境必须配置：
- `NODE_ENV=production`
- `DATABASE_URL`
- `REDIS_URL`
- `AUTH_SECRET`
- `JWT_SECRET`

## 监控

使用 OpenTelemetry 进行监控，配置环境变量：

```env
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
OTEL_SERVICE_NAME=shalom-api
```

## 性能优化

- Bun 原生支持 TypeScript，无需编译
- 使用 Redis 缓存频繁查询
- 数据库查询使用 Drizzle ORM 的类型安全查询
- Server Timing 中间件监控性能瓶颈

## 问题排查

### 数据库连接失败
检查 `DATABASE_URL` 格式：
```
postgresql://user:password@host:port/database
```

### Redis 连接失败
检查 Redis 是否运行：
```bash
redis-cli ping
```

### 端口被占用
修改 `.env` 中的 `PORT` 变量

## 相关文档

- [ElysiaJS 文档](https://elysiajs.com)
- [Drizzle ORM 文档](https://orm.drizzle.team)
- [Better Auth 文档](https://better-auth.com)
- [Bun 文档](https://bun.sh/docs)

## License

MIT
