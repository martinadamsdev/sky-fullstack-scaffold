# @shalom/ui

共享 UI 组件库，基于 React 和 Tailwind CSS。

## 安装

在 workspace 中的其他包可以直接引用：

```json
{
  "dependencies": {
    "@shalom/ui": "workspace:*"
  }
}
```

## 使用

```tsx
import { Button, Input, Card, Loading } from '@shalom/ui'

function App() {
  return (
    <Card title="登录">
      <Input
        label="邮箱"
        type="email"
        placeholder="请输入邮箱"
      />
      <Input
        label="密码"
        type="password"
        placeholder="请输入密码"
        error="密码不能为空"
      />
      <Button variant="primary" loading={false}>
        登录
      </Button>
    </Card>
  )
}
```

## 组件

### Button

按钮组件。

**Props:**
- `variant` - 样式变体: `'primary' | 'secondary' | 'outline' | 'ghost'`
- `size` - 尺寸: `'sm' | 'md' | 'lg'`
- `loading` - 加载状态
- 继承所有原生 button 属性

**示例:**
```tsx
<Button variant="primary" size="md">
  点击我
</Button>

<Button variant="outline" loading={true}>
  加载中...
</Button>
```

### Input

输入框组件。

**Props:**
- `label` - 标签文本
- `error` - 错误信息
- `helperText` - 帮助文本
- 继承所有原生 input 属性

**示例:**
```tsx
<Input
  label="用户名"
  placeholder="请输入用户名"
  helperText="用户名长度为 3-30 个字符"
/>

<Input
  label="邮箱"
  type="email"
  error="邮箱格式不正确"
/>
```

### Card

卡片组件。

**Props:**
- `title` - 卡片标题
- `footer` - 卡片底部内容
- `children` - 卡片内容
- 继承所有原生 div 属性

**示例:**
```tsx
<Card
  title="用户信息"
  footer={<Button>保存</Button>}
>
  <p>这里是卡片内容</p>
</Card>
```

### Loading

加载指示器组件。

**Props:**
- `size` - 尺寸: `'sm' | 'md' | 'lg'`
- `text` - 加载提示文本

**示例:**
```tsx
<Loading size="md" text="加载中..." />
```

## 样式

组件使用 Tailwind CSS 编写。确保在你的项目中配置了 Tailwind CSS。

```css
/* 在你的全局 CSS 中 */
@import "tailwindcss";
```

## 开发

```bash
# 构建
bun run build

# 清理
bun run clean
```

## 添加新组件

1. 在 `src/components/` 创建新组件
2. 在 `src/index.ts` 中导出
3. 更新本 README 文档

## TypeScript

所有组件都提供完整的 TypeScript 类型定义。
