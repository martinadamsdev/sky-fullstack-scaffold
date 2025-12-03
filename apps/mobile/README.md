# Shalom Mobile

移动端 H5 应用。

## 技术栈

待定，可选方案：

- **React + Vite** + 移动端 UI 框架
- **Vue 3 + Vite** + 移动端 UI 框架
- **Taro** (多端统一开发)
- **uni-app** (多端统一开发)

## 推荐技术栈

### React + Vite + Ant Design Mobile

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "antd-mobile": "^5.34.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.4.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0"
  }
}
```

### Vue 3 + Vite + Vant

```json
{
  "dependencies": {
    "vue": "^3.3.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0",
    "vant": "^4.8.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-vue": "^5.0.0"
  }
}
```

## 功能模块

- [ ] 用户认证（登录/注册）
- [ ] 首页
- [ ] 个人中心
- [ ] 设置
- [ ] 扫码功能
- [ ] 地理定位
- [ ] 推送通知

## 快速开始

```bash
# 安装依赖
bun install

# 开发模式
bun run dev

# 构建
bun run build

# 预览生产构建
bun run preview
```

## 环境变量

创建 `.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Shalom Mobile
```

## 项目结构

```
apps/mobile/
├── src/
│   ├── pages/           # 页面组件
│   ├── components/      # 通用组件
│   ├── hooks/          # React Hooks
│   ├── lib/            # 工具函数
│   ├── stores/         # 状态管理
│   ├── styles/         # 样式文件
│   ├── App.tsx
│   └── main.tsx
├── public/             # 静态资源
├── index.html
├── vite.config.ts
└── package.json
```

## API 集成

使用 Eden Treaty 类型安全的 API 客户端：

```typescript
import { treaty } from '@elysiajs/eden';
import type { App } from '@shalom/api';

const client = treaty<App>(import.meta.env.VITE_API_URL);

// 类型安全的 API 调用
const { data, error } = await client.api.users.me.get();
```

## 移动端 UI 组件库

### Ant Design Mobile (React)

```typescript
import { Button, Toast } from 'antd-mobile';

const MyComponent = () => {
  const handleClick = () => {
    Toast.show('点击成功');
  };

  return <Button onClick={handleClick}>点击我</Button>;
};
```

### Vant (Vue)

```vue
<template>
  <van-button type="primary" @click="handleClick">
    点击我
  </van-button>
</template>

<script setup lang="ts">
import { showToast } from 'vant';

const handleClick = () => {
  showToast('点击成功');
};
</script>
```

## 移动端适配

### Viewport 配置

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### REM 适配

使用 `postcss-pxtorem`:

```javascript
// vite.config.ts
import pxtorem from 'postcss-pxtorem';

export default {
  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 37.5, // 基于 375px 设计稿
          propList: ['*'],
        }),
      ],
    },
  },
};
```

### 安全区域

```css
/* 适配 iPhone 刘海屏 */
.safe-area {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

## PWA 支持

添加 PWA 功能：

```javascript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Shalom Mobile',
        short_name: 'Shalom',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
};
```

## 性能优化

### 路由懒加载

```typescript
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
```

### 图片优化

```typescript
// 使用 WebP 格式
<img src="image.webp" alt="..." loading="lazy" />

// 响应式图片
<img
  srcSet="image-320w.jpg 320w, image-640w.jpg 640w, image-1280w.jpg 1280w"
  sizes="(max-width: 640px) 100vw, 640px"
  src="image-640w.jpg"
  alt="..."
/>
```

### 虚拟列表

对于长列表使用虚拟滚动：

```typescript
import { VirtualList } from 'antd-mobile';

<VirtualList
  data={items}
  itemHeight={50}
  renderItem={(item) => <div>{item.name}</div>}
/>
```

## 原生能力集成

### 扫码

```typescript
// 使用 html5-qrcode
import { Html5Qrcode } from 'html5-qrcode';

const scanner = new Html5Qrcode('reader');
scanner.start(
  { facingMode: 'environment' },
  { fps: 10, qrbox: 250 },
  (decodedText) => {
    console.log('扫码结果:', decodedText);
  }
);
```

### 地理定位

```typescript
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('位置:', position.coords);
    },
    (error) => {
      console.error('定位失败:', error);
    }
  );
}
```

### 推送通知

```typescript
if ('Notification' in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      new Notification('欢迎使用 Shalom Mobile!');
    }
  });
}
```

## 调试

### vConsole

```typescript
// 开发环境显示 vConsole
if (import.meta.env.DEV) {
  import('vconsole').then(({ default: VConsole }) => {
    new VConsole();
  });
}
```

### 真机调试

- iOS: Safari 开发者工具
- Android: Chrome DevTools (chrome://inspect)

## 部署

### 静态托管

```bash
# 构建
bun run build

# 部署到 Vercel/Netlify/Cloudflare Pages
```

### Docker

```dockerfile
FROM oven/bun:1 as builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 最佳实践

1. **性能优先**: 移动端网络环境较差，优化加载速度
2. **触摸友好**: 适当增大点击区域（最小 44px）
3. **减少请求**: 合并资源，使用缓存
4. **离线支持**: 考虑 PWA 离线功能
5. **响应式设计**: 适配不同屏幕尺寸

## License

MIT
