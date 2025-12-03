/**
 * Validate email address
 */
export function isEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Validate URL
 */
export function isURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate Chinese phone number
 */
export function isPhone(phone: string): boolean {
  const regex = /^1[3-9]\d{9}$/
  return regex.test(phone)
}

/**
 * Validate Chinese ID card
 */
export function isIDCard(id: string): boolean {
  const regex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return regex.test(id)
}

/**
 * Validate password strength
 * At least 8 characters, contains uppercase, lowercase, and number
 */
export function isStrongPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return regex.test(password)
}

/**
 * Check if string is numeric
 */
export function isNumeric(str: string): boolean {
  return !Number.isNaN(Number(str))
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}
