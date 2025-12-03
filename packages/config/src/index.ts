/**
 * Application configuration constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 5,
} as const

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword'],
} as const

// Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
} as const

// Cache
export const CACHE = {
  USER_TTL: 3600, // 1 hour
  TOKEN_TTL: 86400, // 24 hours
  DEFAULT_TTL: 300, // 5 minutes
} as const

// Rate Limiting
export const RATE_LIMIT = {
  MAX_REQUESTS_PER_MINUTE: 60,
  MAX_REQUESTS_PER_HOUR: 1000,
} as const

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'YYYY-MM-DD HH:mm:ss',
  DATE_ONLY: 'YYYY-MM-DD',
  TIME_ONLY: 'HH:mm:ss',
} as const

// Locales
export const LOCALES = {
  DEFAULT: 'zh-CN',
  SUPPORTED: ['zh-CN', 'en-US'],
} as const

// App Metadata
export const APP_METADATA = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Shalom',
  DESCRIPTION: 'Shalom Platform',
  VERSION: '1.0.0',
} as const
