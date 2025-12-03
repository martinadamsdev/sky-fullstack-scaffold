import {
  format,
  formatISO as formatISOFns,
  formatDistanceToNow,
  isToday as isTodayFns,
  addDays as addDaysFns,
  subDays as subDaysFns,
  parseISO,
  isValid,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns'
import { zhCN } from 'date-fns/locale'

/**
 * Format date to ISO string
 */
export function formatISO(date: Date | string | number): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return formatISOFns(dateObj)
}

/**
 * Format date with custom pattern
 * @param date - Date to format
 * @param pattern - Format pattern (e.g., 'yyyy-MM-dd', 'yyyy-MM-dd HH:mm:ss')
 * @param locale - Locale for formatting (default: 'zh-CN')
 */
export function formatDate(
  date: Date | string | number,
  pattern = 'yyyy-MM-dd HH:mm:ss',
  locale: 'zh-CN' | 'en-US' = 'zh-CN',
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return format(dateObj, pattern, {
    locale: locale === 'zh-CN' ? zhCN : undefined,
  })
}

/**
 * Format date to locale string
 */
export function formatLocale(
  date: Date | string | number,
  locale = 'zh-CN',
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return dateObj.toLocaleString(locale)
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export function getRelativeTime(
  date: Date | string | number,
  locale: 'zh-CN' | 'en-US' = 'zh-CN',
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale: locale === 'zh-CN' ? zhCN : undefined,
  })
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return isTodayFns(dateObj)
}

/**
 * Check if date is valid
 */
export function isValidDate(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return isValid(dateObj)
}

/**
 * Add days to date
 */
export function addDays(date: Date | string | number, days: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return addDaysFns(dateObj, days)
}

/**
 * Subtract days from date
 */
export function subDays(date: Date | string | number, days: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return subDaysFns(dateObj, days)
}

/**
 * Get start of day
 */
export function getStartOfDay(date: Date | string | number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return startOfDay(dateObj)
}

/**
 * Get end of day
 */
export function getEndOfDay(date: Date | string | number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return endOfDay(dateObj)
}

/**
 * Get start of week
 */
export function getStartOfWeek(date: Date | string | number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return startOfWeek(dateObj, { weekStartsOn: 1 }) // Monday
}

/**
 * Get end of week
 */
export function getEndOfWeek(date: Date | string | number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return endOfWeek(dateObj, { weekStartsOn: 1 }) // Monday
}

/**
 * Get start of month
 */
export function getStartOfMonth(date: Date | string | number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return startOfMonth(dateObj)
}

/**
 * Get end of month
 */
export function getEndOfMonth(date: Date | string | number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return endOfMonth(dateObj)
}

/**
 * Get difference in days between two dates
 */
export function getDaysDiff(
  dateLeft: Date | string | number,
  dateRight: Date | string | number,
): number {
  const leftObj =
    typeof dateLeft === 'string' ? parseISO(dateLeft) : new Date(dateLeft)
  const rightObj =
    typeof dateRight === 'string' ? parseISO(dateRight) : new Date(dateRight)
  return differenceInDays(leftObj, rightObj)
}

/**
 * Get difference in hours between two dates
 */
export function getHoursDiff(
  dateLeft: Date | string | number,
  dateRight: Date | string | number,
): number {
  const leftObj =
    typeof dateLeft === 'string' ? parseISO(dateLeft) : new Date(dateLeft)
  const rightObj =
    typeof dateRight === 'string' ? parseISO(dateRight) : new Date(dateRight)
  return differenceInHours(leftObj, rightObj)
}

/**
 * Get difference in minutes between two dates
 */
export function getMinutesDiff(
  dateLeft: Date | string | number,
  dateRight: Date | string | number,
): number {
  const leftObj =
    typeof dateLeft === 'string' ? parseISO(dateLeft) : new Date(dateLeft)
  const rightObj =
    typeof dateRight === 'string' ? parseISO(dateRight) : new Date(dateRight)
  return differenceInMinutes(leftObj, rightObj)
}

// Re-export commonly used date-fns functions
export {
  parseISO,
  format,
  formatDistanceToNow,
  addDays as addDaysFns,
  subDays as subDaysFns,
}
