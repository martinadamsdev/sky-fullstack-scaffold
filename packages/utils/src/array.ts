/**
 * Remove duplicates from array
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

/**
 * Shuffle array randomly
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Get random item from array
 */
export function sample<T>(arr: T[]): T | undefined {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Group array by key
 */
export function groupBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string),
): Record<string, T[]> {
  return arr.reduce(
    (groups, item) => {
      const groupKey =
        typeof key === 'function' ? key(item) : String(item[key])
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(item)
      return groups
    },
    {} as Record<string, T[]>,
  )
}

/**
 * Sort array by key
 */
export function sortBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => number | string),
  order: 'asc' | 'desc' = 'asc',
): T[] {
  return [...arr].sort((a, b) => {
    const aVal = typeof key === 'function' ? key(a) : a[key]
    const bVal = typeof key === 'function' ? key(b) : b[key]

    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}
