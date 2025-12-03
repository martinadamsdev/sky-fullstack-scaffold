# 项目工具链配置指南

本文档说明项目中配置的开发工具链及其使用方法。

## 📦 已配置的工具

### 1. Biome - 代码检查和格式化

**安装:** `@biomejs/biome` ^1.9.4

**配置文件:** `biome.json`

**功能:**
- 代码检查 (Linting)
- 代码格式化 (Formatting)
- 导入排序 (Import Organization)

**可用命令:**
```bash
bun lint              # 检查代码问题
bun lint:fix          # 自动修复代码问题
bun format            # 格式化代码
bun check             # 完整检查 (lint + format)
bun check:fix         # 自动修复 + 格式化
```

**特点:**
- 比 ESLint 快 50 倍以上
- 统一的 linting 和 formatting
- 零配置开箱即用
- 完整的 TypeScript 支持

---

### 2. Husky - Git Hooks 管理

**安装:** `husky` ^9.1.7

**配置文件:** `.husky/` 目录

**已配置的 Hooks:**

#### pre-commit
在提交前自动运行 lint-staged 检查暂存的文件

```bash
# .husky/pre-commit
bunx lint-staged
```

#### commit-msg
验证提交信息是否符合 Angular 规范

```bash
# .husky/commit-msg
bunx commitlint --edit $1
```

**工作流程:**
1. 执行 `git commit`
2. pre-commit hook 运行代码检查
3. commit-msg hook 验证提交信息格式
4. 全部通过后才允许提交

---

### 3. lint-staged - 暂存文件检查

**安装:** `lint-staged` ^16.2.7

**配置文件:** `.lintstagedrc.json`

**配置内容:**
```json
{
  "*.{js,jsx,ts,tsx,json,css,md}": [
    "biome check --write --no-errors-on-unmatched"
  ]
}
```

**功能:**
- 只检查 git 暂存区的文件
- 自动格式化并修复问题
- 提高 commit 速度

---

### 4. commitlint - 提交信息验证

**安装:**
- `@commitlint/cli` ^19.6.1
- `@commitlint/config-conventional` ^19.6.0

**配置文件:** `.commitlintrc.json`

**规范:** Angular Commit Convention

**提交信息格式:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型:**
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构代码
- `perf`: 性能优化
- `test`: 测试相关
- `build`: 构建系统或依赖更新
- `ci`: CI 配置更新
- `chore`: 其他杂项

**示例:**
```bash
# 好的提交信息 ✅
git commit -m "feat(auth): add JWT token validation"
git commit -m "fix(api): resolve database connection timeout"
git commit -m "docs: update installation guide"

# 错误的提交信息 ❌
git commit -m "update code"
git commit -m "Fix bug"
git commit -m "Added new feature"
```

---

### 5. Changesets - 版本管理

**安装:** `@changesets/cli` ^2.29.8

**配置文件:** `.changeset/config.json`

**可用命令:**
```bash
bun changeset          # 创建 changeset
bun version            # 更新版本号
bun release            # 发布包
```

**工作流程:**

#### 1. 创建 Changeset
当你完成一个功能或修复后:
```bash
bun changeset
```

系统会提示:
1. 选择要更新的包
2. 选择版本升级类型 (major/minor/patch)
3. 描述更改内容

#### 2. 更新版本
准备发布时:
```bash
bun version
```

这会:
- 更新所有相关包的版本号
- 生成 CHANGELOG.md
- 删除已处理的 changesets

#### 3. 发布包
```bash
bun release
```

这会:
- 构建所有包
- 发布到 npm registry

**版本类型说明:**
- `major`: 破坏性更新 (1.0.0 → 2.0.0)
- `minor`: 新功能 (1.0.0 → 1.1.0)
- `patch`: Bug 修复 (1.0.0 → 1.0.1)

---

## 🚀 日常开发流程

### 编写代码
```bash
# 开发过程中随时可以手动格式化
bun format
bun check:fix
```

### 提交代码
```bash
# 1. 添加文件到暂存区
git add .

# 2. 提交 (会自动运行检查)
git commit -m "feat(ui): add new button component"

# 提交信息必须符合 Angular 规范,否则会被拒绝
```

### 如果提交被拒绝

**场景 1: 代码格式问题**
```bash
# 自动修复代码格式
bun check:fix

# 重新提交
git add .
git commit -m "feat(ui): add new button component"
```

**场景 2: 提交信息格式错误**
```bash
# 使用正确的格式重新提交
git commit -m "feat(ui): add new button component"
```

### 版本发布流程

```bash
# 1. 创建 changeset
bun changeset

# 2. 提交 changeset
git add .
git commit -m "chore: add changeset for new feature"

# 3. 准备发布时,更新版本
bun version

# 4. 提交版本更新
git add .
git commit -m "chore: release new version"

# 5. 发布
bun release
```

---

## 📝 最佳实践

### 提交信息
1. **使用英文**:提交信息使用英文书写
2. **简洁明了**: subject 不超过 100 字符
3. **描述清楚**: 说明"做了什么"而不是"怎么做"
4. **使用现在时**: "add" 而不是 "added"

### 代码格式
1. **提交前检查**: commit 前会自动检查,但建议手动运行
2. **保持一致**: 使用统一的代码风格
3. **及时修复**: 不要忽略 linter 警告

### 版本管理
1. **及时创建 changeset**: 完成功能后立即创建
2. **准确描述更改**: changeset 描述要清晰
3. **选择正确的版本类型**: 根据语义化版本规范选择

---

## 🛠️ 故障排查

### Husky hooks 不工作

```bash
# 重新安装 Husky
bun install
```

### lint-staged 失败

```bash
# 手动运行检查查看具体错误
bun check .

# 修复后重新提交
git add .
git commit -m "..."
```

### commitlint 验证失败

检查提交信息是否符合格式:
- 必须有 type (feat, fix, docs 等)
- type 后可选 scope,用括号包裹
- 必须有冒号和空格
- subject 首字母小写
- subject 不能以句号结尾

---

## 📚 相关文档

- [Biome 官方文档](https://biomejs.dev/)
- [Husky 官方文档](https://typicode.github.io/husky/)
- [Conventional Commits 规范](https://www.conventionalcommits.org/)
- [Changesets 文档](https://github.com/changesets/changesets)
- [Angular Commit 规范](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)

---

## 🎯 配置总结

| 工具 | 用途 | 配置文件 |
|------|------|----------|
| Biome | 代码检查 + 格式化 | `biome.json` |
| Husky | Git Hooks 管理 | `.husky/` |
| lint-staged | 暂存文件检查 | `.lintstagedrc.json` |
| commitlint | 提交信息验证 | `.commitlintrc.json` |
| Changesets | 版本管理 | `.changeset/config.json` |

所有工具已配置完成并可以正常使用! 🎉
