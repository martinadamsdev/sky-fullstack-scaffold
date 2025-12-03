# Biome 迁移指南

本项目已从 Prettier + ESLint 迁移到 Biome，这是一个更快、更现代的代码检查和格式化工具。

## 为什么选择 Biome？

- ⚡️ **极快的速度**: 比 ESLint 快 50 倍以上
- 🔧 **统一工具**: 同时提供 linting 和 formatting
- 📦 **零配置**: 开箱即用的合理默认值
- 🎯 **TypeScript 原生**: 完美支持 TypeScript
- 🔄 **自动修复**: 智能修复大多数问题
- 💡 **清晰的错误提示**: 更好的错误信息和建议

## 配置文件

### biome.json

项目根目录的 `biome.json` 包含了所有 Biome 配置：

- **Linter**: 代码检查规则
- **Formatter**: 代码格式化规则
- **Organizer**: 自动整理 imports

### .editorconfig

EditorConfig 文件确保编辑器设置一致。

### VS Code 设置

`.vscode/settings.json` 配置了：
- 保存时自动格式化
- 保存时自动修复问题
- 保存时自动整理 imports

## 可用命令

### 全局命令（根目录）

```bash
# 代码检查
bun lint              # 检查所有文件
bun lint:fix          # 自动修复问题

# 代码格式化
bun format            # 格式化所有文件

# 完整检查（推荐）
bun check             # lint + format 检查
bun check:fix         # 自动修复 + 格式化
```

### 子项目命令

每个子项目（web, admin, mobile）都可以单独运行：

```bash
cd apps/web
bun lint              # 只检查当前项目
```

## VS Code 扩展

推荐安装 Biome 扩展：

1. 打开 VS Code
2. 安装 `biomejs.biome` 扩展
3. 重启 VS Code

扩展会自动：
- 在保存时格式化代码
- 在保存时修复问题
- 在保存时整理 imports
- 显示实时的代码问题

## 迁移清单

✅ 已完成的迁移工作：

- [x] 移除 Prettier 依赖
- [x] 移除 ESLint 依赖
- [x] 移除 `.prettierrc` 和 `.prettierignore`
- [x] 添加 Biome 依赖
- [x] 创建 `biome.json` 配置
- [x] 创建 `.editorconfig`
- [x] 更新所有 package.json 脚本
- [x] 配置 VS Code 设置
- [x] 更新文档

## 常见任务

### 格式化单个文件

```bash
bunx biome format --write path/to/file.ts
```

### 检查单个文件

```bash
bunx biome lint path/to/file.ts
```

### 检查并修复

```bash
bunx biome check --write path/to/file.ts
```

### CI/CD 集成

在 CI 中检查代码质量：

```bash
# 检查（不修复）
bun check

# 这会失败如果有问题
```

## 配置说明

### Linter 规则

我们启用了以下规则组：

- `recommended`: Biome 推荐的规则
- `correctness`: 代码正确性检查
- `suspicious`: 可疑代码检查
- `style`: 代码风格检查
- `complexity`: 复杂度检查
- `a11y`: 无障碍检查（React 组件）

### Formatter 规则

- **缩进**: 2 个空格
- **行宽**: 80 字符
- **引号**: 单引号（JSX 使用双引号）
- **分号**: 按需添加
- **尾随逗号**: ES5 标准
- **括号**: 按需添加

## 忽略文件

在 `biome.json` 中配置了忽略规则：

```json
{
  "files": {
    "ignore": [
      "node_modules",
      "dist",
      "build",
      ".next",
      "coverage",
      "drizzle"
    ]
  }
}
```

## 禁用特定规则

在文件中禁用规则：

```typescript
// biome-ignore lint/suspicious/noExplicitAny: 这里需要 any 类型
const data: any = {}
```

在整个文件禁用：

```typescript
/* biome-ignore lint/suspicious/noExplicitAny: 整个文件允许 any */
```

## 与 Git 集成

建议添加 pre-commit hook：

```bash
# 安装 husky
bun add -D husky

# 初始化
bunx husky init

# 添加 pre-commit hook
echo "bun check:fix" > .husky/pre-commit
```

## 性能对比

| 工具 | 时间（秒） | 相对速度 |
|------|-----------|---------|
| ESLint | ~10s | 1x |
| Prettier | ~3s | 3x |
| Biome | ~0.2s | 50x |

## 故障排查

### Biome 命令找不到

```bash
# 确保已安装
bun install

# 使用 bunx 运行
bunx biome --help
```

### VS Code 扩展不工作

1. 检查是否安装了 `biomejs.biome` 扩展
2. 重启 VS Code
3. 检查 `.vscode/settings.json` 配置

### 配置不生效

1. 确保 `biome.json` 在项目根目录
2. 重启 VS Code
3. 运行 `bunx biome check --verbose` 查看详情

## 参考资料

- [Biome 官方文档](https://biomejs.dev/)
- [Biome 规则列表](https://biomejs.dev/linter/rules/)
- [VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
