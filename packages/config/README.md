# @shalom/config

共享配置常量，供所有应用使用。

## 安装

在 workspace 中的其他包可以直接引用：

```json
{
  "dependencies": {
    "@shalom/config": "workspace:*"
  }
}
```

## 使用

```typescript
import {
  API_CONFIG,
  PAGINATION,
  FILE_UPLOAD,
  VALIDATION,
  APP_METADATA,
} from '@shalom/config'

// API 配置
console.log(API_CONFIG.BASE_URL) // http://localhost:3000

// 分页配置
const pageSize = PAGINATION.DEFAULT_PAGE_SIZE // 20

// 文件上传配置
const maxSize = FILE_UPLOAD.MAX_SIZE // 10485760 (10MB)

// 验证配置
const minLength = VALIDATION.PASSWORD_MIN_LENGTH // 8

// 应用元数据
const appName = APP_METADATA.NAME // Shalom
```

## 可用配置

### API_CONFIG
- `BASE_URL` - API 基础 URL
- `TIMEOUT` - 请求超时时间
- `RETRY_ATTEMPTS` - 重试次数

### PAGINATION
- `DEFAULT_PAGE_SIZE` - 默认每页数量
- `MAX_PAGE_SIZE` - 最大每页数量
- `MIN_PAGE_SIZE` - 最小每页数量

### FILE_UPLOAD
- `MAX_SIZE` - 最大文件大小
- `ALLOWED_IMAGE_TYPES` - 允许的图片类型
- `ALLOWED_DOCUMENT_TYPES` - 允许的文档类型

### VALIDATION
- `PASSWORD_MIN_LENGTH` - 密码最小长度
- `PASSWORD_MAX_LENGTH` - 密码最大长度
- `USERNAME_MIN_LENGTH` - 用户名最小长度
- `USERNAME_MAX_LENGTH` - 用户名最大长度

### CACHE
- `USER_TTL` - 用户缓存过期时间
- `TOKEN_TTL` - Token 缓存过期时间
- `DEFAULT_TTL` - 默认缓存过期时间

### RATE_LIMIT
- `MAX_REQUESTS_PER_MINUTE` - 每分钟最大请求数
- `MAX_REQUESTS_PER_HOUR` - 每小时最大请求数

### DATE_FORMATS
- `DISPLAY` - 显示格式
- `DATE_ONLY` - 仅日期格式
- `TIME_ONLY` - 仅时间格式

### LOCALES
- `DEFAULT` - 默认语言
- `SUPPORTED` - 支持的语言列表

### APP_METADATA
- `NAME` - 应用名称
- `DESCRIPTION` - 应用描述
- `VERSION` - 应用版本

## 环境变量

某些配置支持通过环境变量覆盖：

- `NEXT_PUBLIC_API_URL` - API 基础 URL
- `NEXT_PUBLIC_APP_NAME` - 应用名称

## 开发

```bash
# 构建
bun run build

# 清理
bun run clean
```
