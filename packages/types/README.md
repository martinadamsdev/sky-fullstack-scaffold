# @shalom/types

共享 TypeScript 类型定义，供所有应用使用。

## 安装

在 workspace 中的其他包可以直接引用：

```json
{
  "dependencies": {
    "@shalom/types": "workspace:*"
  }
}
```

## 使用

```typescript
import type { User, ApiResponse, LoginInput } from '@shalom/types'

// 使用类型
const user: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
}

// API 响应
const response: ApiResponse<User> = {
  success: true,
  data: user,
}
```

## 可用类型

### User 相关
- `User` - 用户对象
- `CreateUserInput` - 创建用户输入
- `UpdateUserInput` - 更新用户输入

### API 相关
- `ApiResponse<T>` - 标准 API 响应
- `ApiError` - API 错误
- `PaginatedResponse<T>` - 分页响应

### Auth 相关
- `LoginInput` - 登录输入
- `LoginResponse` - 登录响应
- `RegisterInput` - 注册输入
- `JWTPayload` - JWT 载荷

### Query 相关
- `QueryOptions` - 查询选项

### HTTP 相关
- `HttpMethod` - HTTP 方法
- `HttpError` - HTTP 错误

## 开发

```bash
# 构建
bun run build

# 清理
bun run clean
```
