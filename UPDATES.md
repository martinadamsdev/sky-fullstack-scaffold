# 项目更新日志

## 2024-12-03 - 主要更新

### 🚀 使用 Biome 替换 Prettier + ESLint

**原因:**
- Biome 比 ESLint 快 50 倍以上
- 统一的 linting 和 formatting 工具
- 更好的 TypeScript 支持
- 零配置开箱即用

**变更:**
- ✅ 添加 `@biomejs/biome` ^1.9.4
- ✅ 移除 `prettier` 和 `eslint`（Next.js 项目除外）
- ✅ 创建 `biome.json` 配置文件
- ✅ 创建 `.editorconfig` 文件
- ✅ 配置 VS Code 集成 (`.vscode/settings.json`)
- ✅ 更新所有 package.json 脚本
- ✅ 创建 Biome 迁移文档 (`docs/BIOME_MIGRATION.md`)

**新增命令:**
```bash
bun lint              # 代码检查
bun lint:fix          # 自动修复
bun format            # 代码格式化
bun check             # 完整检查
bun check:fix         # 自动修复 + 格式化
```

---

### 📦 创建共享包体系

为了提高代码复用和维护性，创建了 4 个共享包：

#### 1. @shalom/types - TypeScript 类型定义

**位置:** `packages/types/`

**内容:**
- User 相关类型
- API Response 类型
- Auth 类型
- Query 类型
- HTTP 类型

**使用:**
```typescript
import type { User, ApiResponse } from '@shalom/types'
```

#### 2. @shalom/utils - 工具函数库

**位置:** `packages/utils/`

**功能模块:**
- **字符串工具**: capitalize, kebabCase, camelCase, slugify, etc.
- **日期工具**: formatISO, getRelativeTime, addDays, etc.
- **对象工具**: deepClone, pick, omit, deepMerge, etc.
- **数组工具**: unique, chunk, shuffle, groupBy, sortBy, etc.
- **验证工具**: isEmail, isPhone, isIDCard, isStrongPassword, etc.
- **格式化工具**: formatCurrency, formatFileSize, maskString, etc.

**使用:**
```typescript
import { capitalize, isEmail, formatCurrency } from '@shalom/utils'
```

#### 3. @shalom/config - 配置常量

**位置:** `packages/config/`

**配置项:**
- API 配置
- 分页配置
- 文件上传配置
- 验证规则配置
- 缓存配置
- 限流配置
- 日期格式配置
- 语言配置
- 应用元数据

**使用:**
```typescript
import { API_CONFIG, PAGINATION, VALIDATION } from '@shalom/config'
```

#### 4. @shalom/ui - React 组件库

**位置:** `packages/ui/`

**组件:**
- Button - 按钮组件
- Input - 输入框组件
- Card - 卡片组件
- Loading - 加载指示器组件

**特点:**
- 基于 Tailwind CSS
- 完整 TypeScript 类型
- 支持多种变体和尺寸

**使用:**
```tsx
import { Button, Input, Card } from '@shalom/ui'

<Button variant="primary" size="md">点击我</Button>
```

---

### ⚡️ TypeScript 升级

**变更:**
- 所有项目从 `typescript` 迁移到 `@typescript/native-preview`
- 极大提升编译速度
- 原生 TypeScript 编译器

**影响范围:**
- 根项目
- apps/web
- apps/admin
- apps/mobile
- packages/types
- packages/utils
- packages/config
- packages/ui

---

## 技术栈对比

### 之前
```
- ESLint + Prettier (代码检查 + 格式化)
- typescript (标准 TS 编译器)
- 无共享包
```

### 现在
```
- Biome (统一的检查 + 格式化)
- @typescript/native-preview (极速编译)
- 4 个共享包 (types, utils, config, ui)
```

---

## 性能提升

- **代码检查速度**: 提升 50 倍以上 (Biome vs ESLint)
- **TypeScript 编译**: 显著提升 (native-preview)
- **开发体验**: 保存时自动格式化 + lint

---

## 文件结构更新

```
shalom/
├── packages/
│   ├── types/          # NEW - TypeScript 类型
│   ├── utils/          # NEW - 工具函数
│   ├── config/         # NEW - 配置常量
│   ├── ui/             # NEW - React 组件
│   └── deployment/
├── biome.json          # NEW - Biome 配置
├── .editorconfig       # NEW - 编辑器配置
├── .vscode/
│   ├── settings.json   # NEW - VS Code 设置
│   └── extensions.json # NEW - 推荐扩展
└── docs/
    └── BIOME_MIGRATION.md  # NEW - Biome 迁移指南
```

---

## 下一步工作

### 推荐
- [ ] 在应用中使用共享包
- [ ] 添加更多通用组件到 @shalom/ui
- [ ] 扩展 @shalom/utils 工具函数
- [ ] 配置 Husky pre-commit hooks

### 可选
- [ ] 添加单元测试
- [ ] 配置 CI/CD
- [ ] 添加 Storybook 文档
- [ ] 实现主题系统

---

## 迁移指南

### 使用共享包

1. **类型定义**
```typescript
// 之前
interface User {
  id: string
  email: string
  name: string
}

// 现在
import type { User } from '@shalom/types'
```

2. **工具函数**
```typescript
// 之前 - 每个项目自己实现
function formatCurrency(amount: number) {
  return `¥${amount.toFixed(2)}`
}

// 现在 - 使用共享工具
import { formatCurrency } from '@shalom/utils'
```

3. **配置常量**
```typescript
// 之前 - 硬编码
const PAGE_SIZE = 20

// 现在 - 使用共享配置
import { PAGINATION } from '@shalom/config'
const pageSize = PAGINATION.DEFAULT_PAGE_SIZE
```

4. **UI 组件**
```tsx
// 之前 - 每个项目自己实现
const Button = ({ children }) => <button>{children}</button>

// 现在 - 使用共享组件
import { Button } from '@shalom/ui'
<Button variant="primary">点击我</Button>
```

---

## 相关文档

- [Biome 迁移指南](./docs/BIOME_MIGRATION.md)
- [项目结构说明](./PROJECT_STRUCTURE.md)
- [贡献指南](./CONTRIBUTING.md)
- [@shalom/types README](./packages/types/README.md)
- [@shalom/utils README](./packages/utils/README.md)
- [@shalom/config README](./packages/config/README.md)
- [@shalom/ui README](./packages/ui/README.md)
