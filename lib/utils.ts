export const noop = () => {}

type Elem = Window | Document | HTMLElement | EventTarget

export function on<T extends Elem>(
  obj: T | null | undefined,
  ...args:
    | Parameters<T["addEventListener"]>
    | [string, ((...args: unknown[]) => unknown) | null, ...unknown[]]
): void {
  if (obj?.addEventListener) {
    obj.addEventListener(...(args as Parameters<HTMLElement["addEventListener"]>))
  }
}

export function off<T extends Elem>(
  obj: T | null | undefined,
  ...args:
    | Parameters<T["removeEventListener"]>
    | [string, ((...args: unknown[]) => unknown) | null, ...unknown[]]
): void {
  if (obj?.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement["removeEventListener"]>)
    )
  }
}

export const isBrowser = typeof window !== "undefined"

export const isNavigator = typeof navigator !== "undefined"

export const is = {
  odd: (n: number): boolean => n % 2 !== 0,
  even: (n: number): boolean => n % 2 === 0,
  browser: () => typeof window !== "undefined",
  navigator: () => typeof navigator !== "undefined",
  number: (value: unknown): value is number => typeof value === "number",
  string: (value: unknown): value is string => typeof value === "string",
  boolean: (value: unknown): value is boolean => typeof value === "boolean",
  array: <T>(value: unknown): value is T[] => Array.isArray(value),
} as const

export const prettierFmt = <T extends number | string | Date>(value: T) => {
  return value.toLocaleString("en-US")
}

export function isOfType<T extends Record<K, unknown>, K extends keyof T>(
  value: unknown,
  key: K
): value is T {
  return (value as T)[key] != null
}

export function isRefObject<T extends React.RefObject<unknown>>(
  value: unknown
): value is T {
  return (
    !is.string(value) &&
    !is.array(value) &&
    value != null &&
    typeof value === "object" &&
    "current" in value
  )
}

export const convertRefsToElement = <T extends React.RefObject<HTMLElement>>(
  sequence: T[][]
): HTMLElement[][] => {
  return sequence.map(array => array.map(item => item.current))
}
