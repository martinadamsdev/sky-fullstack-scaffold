# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- 初始化 Bun workspace monorepo 结构
- 配置 API 服务 (ElysiaJS + Bun)
  - PostgreSQL 18 + Drizzle ORM
  - Redis 8 缓存
  - Better Auth 认证
  - JWT 支持
  - GraphQL Apollo
  - OpenAPI/Swagger 文档
  - WebSocket 支持
- 配置 Web 前端 (Next.js 14)
  - Tailwind CSS v4.1.17
  - TanStack Query
  - Zustand 状态管理
  - Eden Treaty API 客户端
- 配置 Admin 后台 (Next.js 14)
  - Tailwind CSS v4.1.17
  - React Hook Form
  - Zod 验证
- 配置 Mobile H5 (Next.js 14)
  - Tailwind CSS v4.1.17
  - 移动端优化
- 微信小程序 (TDesign UI)
- Docker Compose 开发环境
  - PostgreSQL 容器
  - Redis 容器
  - API 服务容器
- 部署配置
  - Dockerfile for all services
  - Kubernetes manifests
  - Nginx 配置示例

### Documentation
- 项目主 README
- 项目结构文档 (PROJECT_STRUCTURE.md)
- 贡献指南 (CONTRIBUTING.md)
- API 开发文档
- 部署文档

### Configuration
- 全局 TypeScript 配置 (tsconfig.json)
- Bun 工作区配置 (bunfig.toml)
- 环境变量模板 (.env.example)
- Git 忽略规则 (.gitignore)
- Prettier 代码格式化
- ESLint 代码检查

## [0.1.0] - 2024-12-03

### Added
- 项目初始化
- 基础脚手架搭建
