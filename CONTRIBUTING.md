# 贡献指南

感谢你对 Shalom 项目的关注！我们欢迎各种形式的贡献。

## 开发环境设置

### 前置要求

- [Bun](https://bun.sh) >= 1.0.0
- [Docker](https://www.docker.com/) (用于本地数据库)
- [Git](https://git-scm.com/)

### 初始化项目

```bash
# 克隆仓库
git clone https://github.com/yourusername/shalom.git
cd shalom

# 安装依赖
bun install

# 启动数据库
cd packages/deployment
docker-compose up -d postgres redis
cd ../..

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 运行数据库迁移
bun db:migrate

# 启动开发服务器
bun dev
```

## 开发工作流

### 1. 创建分支

```bash
# 从 main 分支创建新分支
git checkout -b feature/your-feature-name

# 或者修复 bug
git checkout -b fix/your-bug-fix
```

### 2. 开发

```bash
# 启动你需要的服务
bun dev:api      # API 服务
bun dev:web      # Web 前端
bun dev:admin    # Admin 后台
bun dev:mobile   # Mobile H5

# 或者全部启动
bun dev
```

### 3. 代码质量检查

在提交代码前，确保通过以下检查：

```bash
# TypeScript 类型检查
bun typecheck

# 代码检查
bun lint

# 代码格式化
bun format

# 运行测试
bun test
```

### 4. 提交代码

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 功能
git commit -m "feat(api): add user authentication"

# 修复
git commit -m "fix(web): resolve login redirect issue"

# 文档
git commit -m "docs: update README with new setup instructions"

# 样式
git commit -m "style(admin): format code with prettier"

# 重构
git commit -m "refactor(api): simplify auth middleware"

# 测试
git commit -m "test(web): add login component tests"

# 构建
git commit -m "build: update dependencies"

# CI/CD
git commit -m "ci: add GitHub Actions workflow"
```

提交类型：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式化（不影响代码逻辑）
- `refactor`: 重构（既不是新功能也不是 bug 修复）
- `test`: 测试
- `build`: 构建系统或外部依赖
- `ci`: CI/CD 配置
- `chore`: 其他不修改 src 或 test 的更改
- `perf`: 性能优化

### 5. 推送和创建 PR

```bash
# 推送到远程
git push origin feature/your-feature-name

# 在 GitHub 上创建 Pull Request
```

## 代码规范

### TypeScript

- 使用 TypeScript 编写所有代码
- 启用 `strict` 模式
- 避免使用 `any`，使用 `unknown` 替代
- 为公共 API 添加 JSDoc 注释

```typescript
/**
 * 获取用户信息
 * @param userId - 用户 ID
 * @returns 用户对象
 * @throws {NotFoundError} 用户不存在时抛出
 */
export async function getUser(userId: string): Promise<User> {
  // ...
}
```

### 命名规范

- **文件名**: kebab-case (例如: `user-service.ts`)
- **组件**: PascalCase (例如: `UserProfile.tsx`)
- **变量/函数**: camelCase (例如: `getUserById`)
- **常量**: UPPER_SNAKE_CASE (例如: `MAX_RETRY_COUNT`)
- **类型/接口**: PascalCase (例如: `UserProfile`)

### 代码组织

```typescript
// 1. 导入（按类型分组）
import { type } from 'external-package'
import { localModule } from './local-module'

// 2. 类型定义
interface User {
  id: string
  name: string
}

// 3. 常量
const MAX_USERS = 100

// 4. 函数/组件
export function getUser() {
  // ...
}

// 5. 导出
export type { User }
```

### React/Next.js 规范

- 使用函数组件和 Hooks
- 保持组件小而专注
- 使用 TypeScript 类型
- 避免内联样式，使用 Tailwind CSS

```tsx
import { type FC } from 'react'

interface UserCardProps {
  user: User
  onEdit?: (user: User) => void
}

export const UserCard: FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      {onEdit && (
        <button onClick={() => onEdit(user)}>Edit</button>
      )}
    </div>
  )
}
```

### API 开发规范

- 使用 REST 风格的 URL
- 返回合适的 HTTP 状态码
- 统一的错误处理
- API 版本控制

```typescript
// ✅ 好的做法
app.get('/api/users/:id', async ({ params }) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, params.id)
  })

  if (!user) {
    throw new NotFoundError('User not found')
  }

  return user
})

// ❌ 不好的做法
app.get('/getUser', async ({ query }) => {
  return db.query.users.findFirst({
    where: eq(users.id, query.id)
  })
})
```

## 测试

### 单元测试

```typescript
import { describe, it, expect } from 'bun:test'
import { add } from './math'

describe('Math utilities', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})
```

### API 测试

```typescript
import { describe, it, expect } from 'bun:test'
import { app } from './index'

describe('API endpoints', () => {
  it('should return user by id', async () => {
    const response = await app.handle(
      new Request('http://localhost/api/users/1')
    )

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('id', '1')
  })
})
```

## 数据库迁移

### 创建迁移

```bash
# 1. 修改 schema
# 编辑 apps/api/src/db/schema/index.ts

# 2. 生成迁移文件
bun db:generate

# 3. 查看生成的 SQL
# 检查 apps/api/drizzle/*.sql

# 4. 执行迁移
bun db:migrate

# 5. 验证
bun db:studio
```

### Schema 规范

```typescript
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
```

## 文档

- 为新功能添加文档
- 更新相关的 README
- 添加代码注释说明复杂逻辑
- 提供使用示例

## Pull Request 指南

### PR 标题

使用与 commit message 相同的格式：

```
feat(api): add user authentication
fix(web): resolve login redirect issue
docs: update contributing guide
```

### PR 描述

```markdown
## 概述
简要描述这个 PR 做了什么

## 改动
- 添加了 XXX 功能
- 修复了 XXX 问题
- 重构了 XXX 模块

## 测试
- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试完成

## 截图
（如果有 UI 改动，添加截图）

## 相关 Issue
Closes #123
```

### Code Review

- 保持 PR 小而专注
- 及时响应 review 意见
- 不要强制推送已经被 review 的 commit

## 发布流程

我们使用 semantic versioning (语义化版本)：

- `1.0.0` - 主版本号（破坏性更改）
- `0.1.0` - 次版本号（新功能）
- `0.0.1` - 补丁版本号（Bug 修复）

## 问题反馈

如果遇到问题：

1. 查看 [已知问题](https://github.com/yourusername/shalom/issues)
2. 搜索现有的 issue
3. 如果没有相关 issue，创建新的 issue

创建 issue 时请包含：
- 清晰的标题
- 详细的描述
- 复现步骤
- 预期行为
- 实际行为
- 环境信息（OS, Bun 版本等）
- 相关日志或截图

## 获取帮助

- 📧 Email: support@shalom.com
- 💬 Discord: [链接]
- 📖 文档: [链接]

## 许可证

提交代码即表示你同意该代码使用 MIT 许可证。
