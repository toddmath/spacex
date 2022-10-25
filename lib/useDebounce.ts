import { useEffect, useState, useCallback, useRef, type Dispatch } from "react"

import useDebouncedCallback from "./useDebounceCallback"
import type { Controls, Options } from "./useDebounceCallback"

function equalValues<T>(left: T, right: T): boolean {
  return left === right
}

function setInitState<T>(value: T): T | (() => T) {
  return typeof value === "function" ? () => value : value
}

function useStateNoCallback<T>(initState: T): [T, Dispatch<T>] {
  const [state, _setState] = useState(setInitState(initState))
  const setState = useCallback((value: T) => _setState(setInitState(value)), [])
  return [state, setState]
}

export interface DebounceOptions<T> extends Options {
  equalityFn?: (left: T, right: T) => boolean
}

function useDebounce<T>(
  value: T,
  delay?: number,
  options?: DebounceOptions<T>
): [T, Controls] {
  const eq = (options && options.equalityFn) ?? equalValues
  const [state, dispatch] = useStateNoCallback(value)
  const debounce = useDebouncedCallback(
    useCallback((newValue: T) => dispatch(newValue), [dispatch]),
    delay,
    options
  )
  const prevValue = useRef(value)

  if (!eq(prevValue.current, value)) {
    debounce(value)
    prevValue.current = value
  }

  return [state, debounce]
}

// function useDebounce<T>(value: T, delay: number): T {
//   const [debounced, setDebounced] = useState(value)
//   useEffect(() => {
//     const handler = setTimeout(() => setDebounced(value), delay)
//     return () => clearTimeout(handler)
//   }, [value, delay])
//   return debounced
// }

export default useDebounce
