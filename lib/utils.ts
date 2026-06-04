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
      ...(args as Parameters<HTMLElement["addEventListener"]>)
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
      ...(args as Parameters<HTMLElement["removeEventListener"]>)
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
  value: T
): string => {
  return value.toLocaleString("en-US");
};

// export function isOfType<T extends Record<K, unknown>, K extends keyof T>(
//   value: any,
//   prop: K
// ): value is T {
//   if (value && typeof value === "object" && "hasOwnProperty" in value) {
//     return (value as T).hasOwnProperty(prop) && value[prop] != null
//   }
//   return false
//   // return (
//   //   value &&
//   //   "hasOwnProperty" in value &&
//   //   value.hasOwnProperty(prop) &&
//   //   (value as T)[prop] != null
//   // )
// }

export function isOfType<T extends Record<K, unknown>, K extends keyof T>(
  varToBeChecked: unknown,
  propertyToCheckFor: K
): varToBeChecked is T {
  return (varToBeChecked as T)[propertyToCheckFor] !== undefined;
}

export function isRefObject<T extends React.RefObject<any>>(
  value: ModifiedAcceptedElements
): value is T {
  return typeof value !== "string" && "current" in value;
}

export const convertRefsToElement = (
  sequence: SequenceDefination
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
