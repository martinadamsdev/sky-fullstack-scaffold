/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Pick specific keys from object
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

/**
 * Omit specific keys from object
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0
}

/**
 * Merge objects deeply
 */
export function deepMerge<T extends object>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target

  const source = sources.shift()
  if (!source) return target

  for (const key in source) {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue)
    ) {
      if (!targetValue || typeof targetValue !== 'object') {
        target[key] = sourceValue
      } else {
        target[key] = deepMerge(
          { ...targetValue } as object,
          sourceValue as object,
        ) as T[Extract<keyof T, string>]
      }
    } else {
      target[key] = sourceValue as T[Extract<keyof T, string>]
    }
  }

  return deepMerge(target, ...sources)
}
