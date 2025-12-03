# Docker 本地开发环境指南

本指南说明如何使用 Docker Compose 搭建 API 项目的本地开发环境。

## 📦 包含的服务

### 核心服务 (默认启动)
- **PostgreSQL 18**: 主数据库
- **Redis 8**: 缓存和会话存储

### 可选工具 (使用 `--profile tools` 启动)
- **pgAdmin 4**: PostgreSQL 数据库管理界面
- **Redis Commander**: Redis 可视化管理工具

## 🚀 快速开始

### 1. 前置要求

确保已安装:
- [Docker Desktop](https://www.docker.com/products/docker-desktop) 或 Docker Engine
- Docker Compose (通常随 Docker Desktop 一起安装)

验证安装:
```bash
docker --version
docker compose version
```

### 2. 启动服务

```bash
# 启动核心服务 (PostgreSQL + Redis)
bun run docker:up

# 或使用 docker compose 命令
docker compose up -d
```

### 3. 验证服务状态

```bash
# 查看运行中的容器
bun run docker:ps

# 查看日志
bun run docker:logs
```

### 4. 配置环境变量

复制 `.env.example` 到 `.env`:
```bash
cp .env.example .env
```

默认配置已经适配 Docker 环境,无需修改即可使用。

### 5. 初始化数据库

```bash
# 生成数据库迁移
bun run db:generate

# 执行迁移
bun run db:migrate

# 或直接推送 schema (开发环境)
bun run db:push
```

### 6. 启动开发服务器

```bash
bun run dev
```

## 📝 可用命令

### Docker 管理命令

```bash
# 启动所有服务
bun run docker:up

# 停止所有服务 (保留数据)
bun run docker:down

# 重启所有服务
bun run docker:restart

# 查看服务状态
bun run docker:ps

# 查看实时日志
bun run docker:logs

# 启动包含管理工具的服务
bun run docker:tools

# 完全清理 (删除容器和数据卷)
bun run docker:clean
```

### 数据库命令

```bash
# 生成迁移文件
bun run db:generate

# 执行迁移
bun run db:migrate

# 直接推送 schema 到数据库
bun run db:push

# 打开 Drizzle Studio
bun run db:studio
```

## 🔌 服务端口

### 核心服务
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`

### 管理工具 (需要 `--profile tools`)
- **pgAdmin**: http://localhost:5050
- **Redis Commander**: http://localhost:8081

## 🔐 默认凭据

### PostgreSQL
- **数据库**: `shalom`
- **用户名**: `postgres`
- **密码**: `postgres`
- **连接字符串**: `postgresql://postgres:postgres@localhost:5432/shalom`

### Redis
- **密码**: `redis_password`
- **连接字符串**: `redis://localhost:6379`

### pgAdmin (管理工具)
- **邮箱**: `admin@shalom.com`
- **密码**: `admin`

### Redis Commander (管理工具)
- 无需登录,直接访问

## 🛠️ 常见操作

### 启动管理工具

```bash
# 启动 pgAdmin 和 Redis Commander
bun run docker:tools

# 访问管理界面
# pgAdmin: http://localhost:5050
# Redis Commander: http://localhost:8081
```

### 在 pgAdmin 中添加服务器

1. 访问 http://localhost:5050
2. 登录 (admin@shalom.com / admin)
3. 右键 "Servers" → "Register" → "Server"
4. 配置:
   - **General** tab:
     - Name: `Shalom Local`
   - **Connection** tab:
     - Host: `postgres` (容器名称)
     - Port: `5432`
     - Database: `shalom`
     - Username: `postgres`
     - Password: `postgres`

### 查看 PostgreSQL 日志

```bash
docker compose logs -f postgres
```

### 查看 Redis 日志

```bash
docker compose logs -f redis
```

### 进入容器内部

```bash
# PostgreSQL
docker compose exec postgres psql -U postgres -d shalom

# Redis
docker compose exec redis redis-cli -a redis_password
```

### 备份数据库

```bash
# 导出数据库
docker compose exec postgres pg_dump -U postgres shalom > backup.sql

# 导入数据库
docker compose exec -T postgres psql -U postgres shalom < backup.sql
```

### 清理 Redis 缓存

```bash
docker compose exec redis redis-cli -a redis_password FLUSHALL
```

## 🔍 故障排查

### 端口已被占用

如果遇到端口冲突错误,检查端口使用情况:

```bash
# macOS/Linux
lsof -i :5432
lsof -i :6379

# Windows
netstat -ano | findstr :5432
netstat -ano | findstr :6379
```

解决方案:
1. 停止占用端口的程序
2. 或修改 `docker-compose.yml` 中的端口映射

### 容器启动失败

查看详细错误信息:
```bash
docker compose logs
```

### 数据库连接失败

1. 确认容器正在运行:
   ```bash
   bun run docker:ps
   ```

2. 检查健康状态:
   ```bash
   docker compose ps
   ```

3. 测试连接:
   ```bash
   docker compose exec postgres pg_isready -U postgres
   ```

### 完全重置环境

```bash
# 停止并删除所有容器和数据
bun run docker:clean

# 重新启动
bun run docker:up
```

## 📂 数据持久化

数据存储在 Docker volumes 中,即使容器删除数据也不会丢失:

- `postgres_data`: PostgreSQL 数据
- `redis_data`: Redis 数据
- `pgadmin_data`: pgAdmin 配置

查看 volumes:
```bash
docker volume ls | grep shalom
```

删除 volumes (⚠️ 会永久删除数据):
```bash
docker volume rm shalom-api_postgres_data
docker volume rm shalom-api_redis_data
```

## 🔧 自定义配置

### 修改 PostgreSQL 配置

编辑 `docker/postgres/init.sql` 添加初始化脚本。

### 修改 Redis 配置

在 `docker-compose.yml` 中修改 Redis 的 `command`:
```yaml
command: redis-server --requirepass redis_password --appendonly yes --maxmemory 256mb
```

### 添加更多服务

编辑 `docker-compose.yml`,例如添加 Minio (对象存储):
```yaml
minio:
  image: minio/minio:latest
  container_name: shalom-minio
  ports:
    - '9000:9000'
    - '9001:9001'
  environment:
    MINIO_ROOT_USER: minioadmin
    MINIO_ROOT_PASSWORD: minioadmin
  command: server /data --console-address ":9001"
  volumes:
    - minio_data:/data
```

## 🌐 网络

所有服务运行在同一个 Docker 网络 `shalom-network` 中,可以通过容器名称互相访问:

- API 容器可以通过 `postgres:5432` 访问数据库
- API 容器可以通过 `redis:6379` 访问 Redis

## 📚 参考资料

- [Docker Compose 文档](https://docs.docker.com/compose/)
- [PostgreSQL Docker 镜像](https://hub.docker.com/_/postgres)
- [Redis Docker 镜像](https://hub.docker.com/_/redis)
- [Drizzle ORM 文档](https://orm.drizzle.team/)

## ⚡ 性能优化

### 开发环境优化

在 `.env` 中设置:
```env
# PostgreSQL
PG_MAX_CONNECTIONS=20
PG_SHARED_BUFFERS=256MB

# Redis
REDIS_MAXMEMORY=256mb
REDIS_MAXMEMORY_POLICY=allkeys-lru
```

### 生产环境

生产环境建议使用托管服务:
- PostgreSQL: Supabase, AWS RDS, Railway
- Redis: Upstash, Redis Cloud, AWS ElastiCache

## 🐛 调试技巧

### 启用 PostgreSQL 查询日志

修改 `docker-compose.yml`:
```yaml
postgres:
  command: postgres -c log_statement=all
```

### 监控 Redis 命令

```bash
docker compose exec redis redis-cli -a redis_password MONITOR
```

## 🎯 最佳实践

1. **定期备份数据**: 使用 `pg_dump` 备份重要数据
2. **不要在生产环境使用默认密码**: 修改 `.env` 中的密码
3. **使用 .env 管理敏感信息**: 不要提交 `.env` 到版本控制
4. **定期更新镜像**: `docker compose pull` 获取最新镜像
5. **监控资源使用**: `docker stats` 查看容器资源占用

---

如有问题,请在项目 issues 中反馈: https://gitlab.sky-flux.cn/dollars/shalom/-/issues
