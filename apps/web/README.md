# Shalom Web

Web 前端应用。

## 技术栈

待定，可选方案：

- **React + Next.js 14** (App Router)
- **Vue 3 + Nuxt 3**
- **SolidJS + SolidStart**
- **Svelte + SvelteKit**

## 推荐技术栈

### Next.js 14 方案

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.4.0"
  }
}
```

### Nuxt 3 方案

```json
{
  "dependencies": {
    "nuxt": "^3.8.0",
    "@pinia/nuxt": "^0.5.0"
  }
}
```

## 功能模块

- [ ] 用户认证（登录/注册）
- [ ] 首页
- [ ] 用户中心
- [ ] 设置页面

## 快速开始

```bash
# 安装依赖
bun install

# 开发模式
bun run dev

# 构建
bun run build

# 预览生产构建
bun run start
```

## 环境变量

创建 `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## 项目结构

```
apps/web/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 组件
│   ├── lib/             # 工具函数
│   ├── hooks/           # React Hooks
│   └── styles/          # 样式文件
├── public/              # 静态资源
├── .env.local
├── package.json
└── next.config.js
```

## API 集成

使用 Eden Treaty 类型安全的 API 客户端：

```typescript
import { treaty } from '@elysiajs/eden';
import type { App } from '@shalom/api';

const client = treaty<App>(process.env.NEXT_PUBLIC_API_URL!);

// 类型安全的 API 调用
const { data, error } = await client.api.users.index.get();
```

## 状态管理

推荐使用 Zustand：

```typescript
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

## UI 组件库

推荐选项：
- **shadcn/ui** - 可定制的组件
- **Ant Design** - 企业级 UI
- **Material-UI** - Google Material Design
- **Chakra UI** - 简单易用

## 部署

### Vercel (推荐)

```bash
vercel deploy
```

### Docker

```dockerfile
FROM oven/bun:1 as builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:1
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
RUN bun install --production
EXPOSE 3001
CMD ["bun", "run", "start"]
```

## License

MIT
