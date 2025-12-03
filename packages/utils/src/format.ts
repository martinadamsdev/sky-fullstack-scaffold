/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN')
}

/**
 * Format currency (CNY)
 */
export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Mask sensitive information (e.g., phone, email, ID card)
 */
export function maskString(
  str: string,
  startVisible = 3,
  endVisible = 4,
  mask = '*',
): string {
  if (str.length <= startVisible + endVisible) return str
  const start = str.slice(0, startVisible)
  const end = str.slice(-endVisible)
  const middle = mask.repeat(str.length - startVisible - endVisible)
  return `${start}${middle}${end}`
}

/**
 * Format phone number (add spaces)
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
}
