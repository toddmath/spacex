import { useState, useEffect, useRef } from "react"

function useInterval<Fn extends (...args: any[]) => void>(
  callback: Fn,
  delay?: number | null
) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }

    if (delay) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
