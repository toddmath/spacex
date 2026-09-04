import { useCallback, useEffect, useMemo, useRef } from "react"

export type UseRafLoop = {
  stop: () => void
  start: () => void
  isActive: () => boolean
}

function useRafLoop(cb: FrameRequestCallback, initActive = true): UseRafLoop {
  const raf = useRef<number | null>(null)
  const rafActivity = useRef<boolean>(false)
  const rafCb = useRef(cb)

  useEffect(() => {
    rafCb.current = cb
  }, [cb])

  const tickRef = useRef<FrameRequestCallback>(() => {})

  const tick: FrameRequestCallback = useCallback(time => {
    if (rafActivity.current) {
      rafCb.current(time)
      raf.current = requestAnimationFrame(tickRef.current)
    }
  }, [])

  useEffect(() => {
    tickRef.current = tick
  }, [tick])

  const stop = useCallback(() => {
    if (rafActivity.current) {
      rafActivity.current = false
      if (raf.current) {
        cancelAnimationFrame(raf.current)
        raf.current = null
      }
    }
  }, [])

  const start = useCallback(() => {
    if (!rafActivity.current) {
      rafActivity.current = true
      raf.current = requestAnimationFrame(tick)
    }
  }, [tick])

  const isActive = () => rafActivity.current

  useEffect(() => {
    if (initActive) start()
    return stop
  }, [initActive, start, stop])

  return useMemo(
    () => ({ stop, start, isActive } satisfies UseRafLoop),
    [start, stop]
  );
}

export default useRafLoop
