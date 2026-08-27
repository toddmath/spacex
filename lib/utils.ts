import type { TimelineDefinition } from "@motionone/dom/types/timeline/types";
import type {
  ModifiedAcceptedElements,
  SequenceDefination,
} from "./useMotionTimeline";

export const noop = () => {};

type Elem = Window | Document | HTMLElement | EventTarget;

export function on<T extends Elem>(
  obj: T | null | undefined,
  ...args: Parameters<T["addEventListener"]> | [string, Function | null, ...any]
): void {
  if (obj?.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement["addEventListener"]>),
    );
  }
}

export function off<T extends Elem>(
  obj: T | null | undefined,
  ...args:
    | Parameters<T["removeEventListener"]>
    | [string, Function | null, ...any]
): void {
  if (obj?.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement["removeEventListener"]>),
    );
  }
}

export const isBrowser = typeof window !== "undefined";

export const isNavigator = typeof navigator !== "undefined";

export const is = {
  odd: (n: number): boolean => n % 2 === 0,
  even: (n: number): boolean => n % 2 !== 0,
  browser: () => typeof window !== "undefined",
  navigator: () => typeof navigator !== "undefined",
  number: (value: unknown): value is number => typeof value === "number",
  string: (value: unknown): value is string => typeof value === "string",
  boolean: (value: unknown): value is boolean => typeof value === "boolean",
  array: <T>(value: unknown): value is T[] => Array.isArray(value),
} as const;

export const prettierFmt = <T extends number | string | Date>(
  value: T,
): string => {
  return value.toLocaleString("en-US");
};

export function isOfType<T extends Record<K, any>, K extends keyof T>(
  value: any,
  key: K,
): value is T {
  return (value as T)[key] != null;
}

export function isRefObject<T extends React.RefObject<any>>(
  value: ModifiedAcceptedElements,
): value is T {
  return !is.string(value) && !is.array(value) && "current" in value;
}

export const convertRefsToElement = (
  sequence: SequenceDefination,
): TimelineDefinition => {
  const newArray = [...sequence];
  for (const array of newArray) {
    if (isRefObject(array[0])) array[0] = array[0].current;
    // if (typeof array[0] !== "string" && "current" in array[0]) {
    //   array[0] = array[0].current
    // }
    // if (isOfType(array[0], "current")) array[0] = array[0].current
  }
  return newArray as TimelineDefinition;
};
