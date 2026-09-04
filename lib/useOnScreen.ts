import { RefObject } from "react";
import { useState, useEffect } from "react";

function useOnScreen<T extends Element>(
  ref: RefObject<T>,
  rootMargin: string = "0px"
): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => setIntersecting(isIntersecting),
      { rootMargin }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin, ref]);

  return isIntersecting;
}

export default useOnScreen;
