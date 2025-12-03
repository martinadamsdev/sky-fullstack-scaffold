// User types
export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserInput {
  email: string
  name: string
  password: string
}

export interface UpdateUserInput {
  name?: string
  email?: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
}

export interface ApiError {
  message: string
  code: string
  details?: Record<string, unknown>
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

// Auth types
export interface LoginInput {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface RegisterInput extends CreateUserInput {}

export interface JWTPayload {
  userId: string
  email: string
  iat: number
  exp: number
}

// Query types
export interface QueryOptions {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, unknown>
}

// HTTP types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface HttpError extends Error {
  statusCode: number
  code: string
}
