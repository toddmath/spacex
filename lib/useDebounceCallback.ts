import { useRef, useEffect, useMemo } from "react"

export interface CallOptions {
  leading?: boolean
  trailing?: boolean
}

export interface Options extends CallOptions {
  maxWait?: number
}

export interface Controls {
  cancel: () => void
  flush: () => void
  isPending: () => boolean
}

export interface DebounceState<T extends (...args: unknown[]) => ReturnType<T>>
  extends Controls {
  (...args: Parameters<T>): ReturnType<T> | undefined
}

function useDebounceCallback<T extends (...args: any[]) => ReturnType<T>>(
  fn: T,
  wait: number = 0,
  options: Options = {}
): DebounceState<T> {
  const lastCallTime = useRef<number | null>(null) // !Maybe this should be initialized with 0
  const lastInvokeTime = useRef(0)
  const timerId = useRef<number | null>(null)
  const lastArgs = useRef<Parameters<T>>()
  const lastThis = useRef<ThisType<T>>()
  const result = useRef<ReturnType<T>>()
  const fnRef = useRef(fn)
  const mounted = useRef(true)

  useEffect(() => {
    fnRef.current = fn
    // result.current = fn()
  }, [fn])

  const useRAF = wait > 0 && typeof window !== "undefined"
  if (typeof fn !== "function") throw new TypeError("Expected a function")
  // wait = +wait || 0

  const leading = !!options.leading
  const trailing = "trailing" in options ? !!options.trailing : true
  const maxing = "maxWait" in options
  let _maxWait = "maxWait" in options ? Number(options.maxWait) : 0
  const maxWait = Math.max(_maxWait, wait)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const debounced = useMemo(() => {
    const invokeFn = (time: number) => {
      const args = lastArgs.current!
      const thisArg = lastThis.current

      lastArgs.current = lastThis.current = undefined
      lastInvokeTime.current = time
      return (result.current = fnRef.current.apply(thisArg, args))
    }

    const startTimer = (pendingFn: () => void, wait: number) => {
      if (useRAF) cancelAnimationFrame(timerId.current!)
      timerId.current = useRAF
        ? requestAnimationFrame(pendingFn)
        : Number(setTimeout(pendingFn, wait))
    }

    const shouldInvoke = (time: number) => {
      if (!mounted.current) return false

      const timeSinceLastCall = time - (lastCallTime.current ?? 0)
      const timeSinceLastInvoke = time - lastInvokeTime.current

      return (
        !lastCallTime.current ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait)
      )
    }

    const trailingEdge = (time: number) => {
      timerId.current = null
      // Only invoke if we have `lastArgs` which means `fn` has been debounced at least once.
      if (trailing && lastArgs.current) return invokeFn(time)
      lastArgs.current = lastThis.current = undefined
      return result.current
    }

    const timerExpired = () => {
      const time = Date.now()
      if (shouldInvoke(time)) return trailingEdge(time)
      // @see <https://github.com/xnimorz/use-debounce/issues/97>
      if (!mounted.current) return
      const timeSinceLastCall = time - (lastCallTime.current ?? 0)
      const timeSinceLastInvoke = time - lastInvokeTime.current
      const timeWaiting = wait - timeSinceLastCall
      const remainingWait = maxing
        ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting
      startTimer(timerExpired, remainingWait)
    }

    const func: DebounceState<T> = (...args: Parameters<T>): ReturnType<T> => {
      const time = Date.now()
      const isInvoking = shouldInvoke(time)

      lastArgs.current = args
      // TODO: maybe change this or figure out how to type it correctly
      // @ts-ignore
      lastThis.current = this
      lastCallTime.current = time

      if (isInvoking) {
        if (!timerId.current && mounted.current) {
          lastInvokeTime.current = lastCallTime.current // Reset any `maxWait` timer.
          startTimer(timerExpired, wait) // Start the timer for the trailing edge.
          return leading ? invokeFn(lastCallTime.current) : result.current! // Invoke the leading edge.
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          startTimer(timerExpired, wait)
          return invokeFn(lastCallTime.current)
        }
      }
      if (!timerId.current) startTimer(timerExpired, wait)

      return result.current!
    }

    func.cancel = () => {
      if (timerId.current) {
        useRAF
          ? cancelAnimationFrame(timerId.current)
          : clearTimeout(timerId.current)
      }
      lastInvokeTime.current = 0
      lastArgs.current = lastThis.current = undefined
      lastCallTime.current = timerId.current = null
    }

    func.isPending = () => !!timerId.current

    func.flush = () => {
      return !timerId.current ? result.current! : trailingEdge(Date.now())!
    }

    return func
  }, [leading, maxWait, maxing, trailing, useRAF, wait])

  return debounced
}

export default useDebounceCallback
