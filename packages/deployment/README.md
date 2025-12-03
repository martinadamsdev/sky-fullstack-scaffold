# Shalom Deployment

部署配置和脚本。

## 支持的部署方式

- Docker / Docker Compose
- Kubernetes
- Serverless (Vercel, Netlify, Cloudflare)
- 传统服务器 (PM2, Systemd)

## Docker Compose 部署

### 快速开始

```bash
cd packages/deployment
docker-compose up -d
```

### 服务

- **api**: API 服务 (端口 3000)
- **postgres**: PostgreSQL 18 (端口 5432)
- **redis**: Redis 8 (端口 6379)
- **web**: Web 前端 (端口 3001)
- **admin**: 管理后台 (端口 3002)
- **mobile**: 移动端 H5 (端口 3003)

## 项目结构

```
packages/deployment/
├── docker/
│   ├── api.Dockerfile
│   ├── web.Dockerfile
│   ├── admin.Dockerfile
│   └── mobile.Dockerfile
├── k8s/
│   ├── api-deployment.yaml
│   ├── postgres-statefulset.yaml
│   ├── redis-deployment.yaml
│   └── ingress.yaml
├── scripts/
│   ├── deploy.sh
│   ├── backup.sh
│   └── restore.sh
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

## Docker Compose 配置

### 开发环境

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:18-alpine
    environment:
      POSTGRES_DB: shalom
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:8-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  api:
    build:
      context: ../../apps/api
      dockerfile: ../../packages/deployment/docker/api.Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/shalom
      REDIS_URL: redis://redis:6379
    volumes:
      - ../../apps/api:/app
      - /app/node_modules

volumes:
  postgres_data:
  redis_data:
```

### 生产环境

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Kubernetes 部署

### 前置要求

- kubectl 配置完成
- Helm 3.x (可选)

### 部署步骤

```bash
# 创建命名空间
kubectl create namespace shalom

# 创建配置
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secrets.yaml

# 部署数据库
kubectl apply -f k8s/postgres-statefulset.yaml
kubectl apply -f k8s/redis-deployment.yaml

# 部署应用
kubectl apply -f k8s/api-deployment.yaml
kubectl apply -f k8s/web-deployment.yaml
kubectl apply -f k8s/admin-deployment.yaml

# 配置 Ingress
kubectl apply -f k8s/ingress.yaml
```

### 监控部署状态

```bash
kubectl get pods -n shalom
kubectl logs -f deployment/api -n shalom
```

## 环境变量

### API (.env)

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Redis
REDIS_URL=redis://host:6379

# Auth
AUTH_SECRET=your-secret-key
JWT_SECRET=your-jwt-secret

# Server
PORT=3000
NODE_ENV=production
```

### 前端应用 (.env)

```env
NEXT_PUBLIC_API_URL=https://api.shalom.com
NEXT_PUBLIC_APP_URL=https://shalom.com
```

## 数据库迁移

### 自动迁移

在容器启动时自动运行：

```dockerfile
# Dockerfile
CMD ["sh", "-c", "bun run db:migrate && bun run start"]
```

### 手动迁移

```bash
# 进入 API 容器
docker exec -it shalom-api sh

# 运行迁移
bun run db:migrate
```

## 备份和恢复

### 数据库备份

```bash
# 备份
./scripts/backup.sh

# 恢复
./scripts/restore.sh backup-2024-01-01.sql
```

### Redis 备份

```bash
# 触发 Redis 保存
docker exec shalom-redis redis-cli BGSAVE

# 复制 RDB 文件
docker cp shalom-redis:/data/dump.rdb ./backup/
```

## 监控和日志

### 日志查看

```bash
# Docker Compose
docker-compose logs -f api

# Kubernetes
kubectl logs -f deployment/api -n shalom
```

### 健康检查

```bash
# API 健康检查
curl http://localhost:3000/health

# 数据库健康检查
curl http://localhost:3000/health/db

# Redis 健康检查
curl http://localhost:3000/health/redis
```

### Prometheus 指标

```yaml
# docker-compose.yml
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
```

## Serverless 部署

### Vercel

```bash
# 部署 Web/Admin/Mobile
cd apps/web
vercel deploy --prod
```

### Cloudflare Workers (API)

需要使用 Cloudflare Workers 适配器。

## PM2 部署

### 配置

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'shalom-api',
      script: 'bun',
      args: 'run start',
      cwd: './apps/api',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
```

### 命令

```bash
# 启动
pm2 start ecosystem.config.js

# 重启
pm2 restart shalom-api

# 查看日志
pm2 logs shalom-api

# 监控
pm2 monit
```

## Nginx 配置

```nginx
# /etc/nginx/sites-available/shalom
upstream api {
    server 127.0.0.1:3000;
}

upstream web {
    server 127.0.0.1:3001;
}

server {
    listen 80;
    server_name shalom.com;

    location / {
        proxy_pass http://web;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name api.shalom.com;

    location / {
        proxy_pass http://api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## SSL 证书

### Let's Encrypt (Certbot)

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d shalom.com -d api.shalom.com

# 自动续期
sudo certbot renew --dry-run
```

## 性能优化

### API 缓存

```typescript
// 使用 Redis 缓存
app.get('/api/data', async ({ redis }) => {
  const cached = await redis.get('data');
  if (cached) return JSON.parse(cached);

  const data = await fetchData();
  await redis.set('data', JSON.stringify(data), 'EX', 3600);
  return data;
});
```

### CDN 配置

- 静态资源使用 CDN (Cloudflare, AWS CloudFront)
- API 使用边缘节点
- 图片使用图床服务 (Cloudinary, ImageKit)

## 安全建议

- ✅ 使用 HTTPS
- ✅ 配置防火墙
- ✅ 限制数据库访问
- ✅ 定期更新依赖
- ✅ 启用日志审计
- ✅ 使用密钥管理服务
- ✅ 配置 CORS 白名单
- ✅ 启用 Rate Limiting

## CI/CD

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test
      - run: bun run build
      - name: Deploy
        run: ./packages/deployment/scripts/deploy.sh
```

## 故障排查

### 常见问题

**Q: 数据库连接失败**
```bash
# 检查数据库是否运行
docker ps | grep postgres
# 检查连接字符串
echo $DATABASE_URL
```

**Q: Redis 连接失败**
```bash
# 测试 Redis 连接
redis-cli -h host -p 6379 ping
```

**Q: 端口被占用**
```bash
# 查找占用端口的进程
lsof -i :3000
# 或
netstat -tulpn | grep 3000
```

## 回滚

```bash
# Docker
docker-compose down
docker-compose up -d --force-recreate

# Kubernetes
kubectl rollout undo deployment/api -n shalom

# PM2
pm2 restart shalom-api
```

## 相关文档

- [Docker 文档](https://docs.docker.com)
- [Kubernetes 文档](https://kubernetes.io/docs)
- [Nginx 文档](https://nginx.org/en/docs)
- [PM2 文档](https://pm2.keymetrics.io/docs)

## License

MIT
