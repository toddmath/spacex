import { MutableRefObject } from "react"
import { useState, useEffect } from "react"

function useOnScreen<T extends Element>(
  ref: MutableRefObject<T>,
  rootMargin: string = "0px"
): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)

  useEffect(() => {
    let currentRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    )
    if (currentRef) observer.observe(currentRef)
    return () => {
      observer.unobserve(currentRef)
    }
  }, [rootMargin]) // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting
}

export default useOnScreen
