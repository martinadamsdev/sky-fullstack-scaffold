# Shalom Admin

管理后台应用。

## 技术栈

待定，可选方案：

- **React + Next.js 14** + Admin UI 框架
- **Vue 3 + Nuxt 3** + Admin UI 框架
- **React Admin**
- **Refine**

## 推荐技术栈

### Next.js + Refine

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@refinedev/core": "^4.0.0",
    "@refinedev/nextjs-router": "^5.0.0",
    "@refinedev/antd": "^5.0.0",
    "antd": "^5.0.0"
  }
}
```

### React Admin

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-admin": "^4.16.0",
    "ra-data-simple-rest": "^4.16.0"
  }
}
```

## 功能模块

- [ ] 仪表盘
- [ ] 用户管理（CRUD）
- [ ] 内容管理
- [ ] 系统设置
- [ ] 权限管理
- [ ] 日志查看
- [ ] 数据统计

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
NEXT_PUBLIC_ADMIN_URL=http://localhost:3002
```

## 项目结构

```
apps/admin/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 组件
│   ├── resources/        # 资源管理（用户、内容等）
│   ├── lib/             # 工具函数
│   └── styles/          # 样式文件
├── public/              # 静态资源
├── .env.local
├── package.json
└── next.config.js
```

## 权限控制

推荐使用 CASL 或 Casbin：

```typescript
import { defineAbility } from '@casl/ability';

export const defineAbilitiesFor = (user: User) => {
  return defineAbility((can, cannot) => {
    if (user.role === 'admin') {
      can('manage', 'all');
    } else if (user.role === 'editor') {
      can('read', 'all');
      can('create', 'Post');
      can('update', 'Post', { authorId: user.id });
    } else {
      can('read', 'Post');
    }
  });
};
```

## API 集成

使用 Eden Treaty 或 React Admin Data Provider：

```typescript
import { treaty } from '@elysiajs/eden';
import type { App } from '@shalom/api';

const client = treaty<App>(process.env.NEXT_PUBLIC_API_URL!);

// 获取用户列表
const { data: users } = await client.api.users.index.get();

// 创建用户
await client.api.users.index.post({
  email: 'user@example.com',
  name: 'User Name',
});
```

## UI 组件库

推荐选项：
- **Ant Design** - 功能完整的企业级 UI
- **Material-UI** - Google Material Design
- **Mantine** - 现代化组件库
- **Chakra UI** - 简单易用

## 常用功能

### 数据表格

```typescript
import { Table } from 'antd';

const UserTable = () => {
  const { data, loading } = useUsers();

  return (
    <Table
      dataSource={data}
      loading={loading}
      columns={[
        { title: 'ID', dataIndex: 'id' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Created At', dataIndex: 'createdAt' },
      ]}
    />
  );
};
```

### 表单

```typescript
import { Form, Input, Button } from 'antd';

const UserForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
```

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
EXPOSE 3002
CMD ["bun", "run", "start"]
```

## 安全性

- ✅ 使用 JWT 或 Session 认证
- ✅ 实现 RBAC 权限控制
- ✅ 添加 CSRF 保护
- ✅ 限制 API 访问频率
- ✅ 日志记录管理员操作
- ✅ 定期备份数据

## 最佳实践

1. **分离关注点**: 将业务逻辑、UI 和数据获取分离
2. **类型安全**: 使用 TypeScript 和 Eden Treaty
3. **错误处理**: 优雅处理 API 错误
4. **加载状态**: 提供良好的加载反馈
5. **响应式设计**: 支持移动端访问

## License

MIT
