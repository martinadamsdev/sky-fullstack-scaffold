# @shalom/utils

共享工具函数库，提供常用的 JavaScript/TypeScript 实用函数。

## 安装

在 workspace 中的其他包可以直接引用：

```json
{
  "dependencies": {
    "@shalom/utils": "workspace:*"
  }
}
```

## 使用

```typescript
import {
  capitalize,
  formatCurrency,
  isEmail,
  unique,
  deepMerge,
} from '@shalom/utils'

// 字符串工具
capitalize('hello') // 'Hello'

// 格式化工具
formatCurrency(1234.56) // '¥1,234.56'

// 验证工具
isEmail('user@example.com') // true

// 数组工具
unique([1, 2, 2, 3]) // [1, 2, 3]

// 对象工具
deepMerge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
```

## API 文档

### 字符串工具 (string.ts)

- `capitalize(str)` - 首字母大写
- `kebabCase(str)` - 转换为 kebab-case
- `camelCase(str)` - 转换为 camelCase
- `pascalCase(str)` - 转换为 PascalCase
- `truncate(str, length, suffix)` - 截断字符串
- `randomString(length)` - 生成随机字符串
- `slugify(str)` - 生成 URL 友好的 slug

### 日期工具 (date.ts)

- `formatISO(date)` - 格式化为 ISO 字符串
- `formatLocale(date, locale)` - 格式化为本地化字符串
- `getRelativeTime(date, locale)` - 获取相对时间（如"2小时前"）
- `isToday(date)` - 判断是否为今天
- `addDays(date, days)` - 增加天数
- `subDays(date, days)` - 减少天数

### 对象工具 (object.ts)

- `deepClone(obj)` - 深拷贝对象
- `pick(obj, keys)` - 选择指定键
- `omit(obj, keys)` - 排除指定键
- `isEmpty(obj)` - 判断对象是否为空
- `deepMerge(target, ...sources)` - 深度合并对象

### 数组工具 (array.ts)

- `unique(arr)` - 数组去重
- `chunk(arr, size)` - 数组分块
- `shuffle(arr)` - 随机打乱数组
- `sample(arr)` - 随机获取一个元素
- `groupBy(arr, key)` - 按键分组
- `sortBy(arr, key, order)` - 按键排序

### 验证工具 (validation.ts)

- `isEmail(email)` - 验证邮箱
- `isURL(url)` - 验证URL
- `isPhone(phone)` - 验证中国手机号
- `isIDCard(id)` - 验证中国身份证号
- `isStrongPassword(password)` - 验证强密码
- `isNumeric(str)` - 判断是否为数字
- `isEmptyValue(value)` - 判断值是否为空

### 格式化工具 (format.ts)

- `formatNumber(num)` - 格式化数字（千分位）
- `formatCurrency(amount)` - 格式化货币
- `formatFileSize(bytes)` - 格式化文件大小
- `formatPercent(value, decimals)` - 格式化百分比
- `maskString(str, startVisible, endVisible, mask)` - 遮罩敏感信息
- `formatPhone(phone)` - 格式化手机号

## 开发

```bash
# 构建
bun run build

# 测试
bun run test

# 清理
bun run clean
```

## 添加新工具

1. 在 `src/` 目录下创建新文件或在现有文件中添加函数
2. 在 `src/index.ts` 中导出
3. 更新本 README 文档
4. 添加单元测试

## 类型支持

所有函数都提供完整的 TypeScript 类型定义。
