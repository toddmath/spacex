import { useCallback, useEffect, useMemo, useRef } from "react"

// export type UseRaf = [VoidFunction, VoidFunction, () => boolean]

export type UseRafLoop = {
  stop: () => void
  start: () => void
  isActive: () => boolean
}

function useRafLoop(cb: FrameRequestCallback, initActive = true): UseRafLoop {
  const raf = useRef<number | null>(null)
  const rafActivity = useRef<boolean>(false)
  const rafCb = useRef(cb)
  rafCb.current = cb

  const tick: FrameRequestCallback = useCallback(time => {
    if (rafActivity.current) {
      rafCb.current(time)
      raf.current = requestAnimationFrame(tick)
    }
  }, [])

  const stop = useCallback(() => {
    if (rafActivity.current) {
      rafActivity.current = false
      raf.current && cancelAnimationFrame(raf.current)
    }
  }, [])

  const start = useCallback(() => {
    if (!rafActivity.current) {
      rafActivity.current = true
      raf.current = requestAnimationFrame(tick)
    }
  }, [tick])

  const isActive = () => rafActivity.current

  // const result = useMemo(() => [
  //   () => {
  //     // stop
  //     if (rafActivity.current) {
  //       rafActivity.current = false;
  //       raf.current && cancelAnimationFrame(raf.current)
  //     }
  //   },
  //   () => {
  //     // start
  //     if (!rafActivity.current) {
  //       rafActivity.current = true
  //       raf.current = requestAnimationFrame(tick)
  //     }
  //   },
  //   (): boolean => rafActivity.current
  // ] as UseRaf, [])

  useEffect(() => {
    if (initActive) start()
    return stop
    // if (initActive) result[1]()
    // return result[0]
  }, [initActive, start, stop])

  // return result
  return useMemo(() => ({ stop, start, isActive } as UseRafLoop), [start, stop])
}

export default useRafLoop
