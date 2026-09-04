import { useRef, useEffect } from "react";

function useUnmount(fn: () => void) {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  useEffect(() => () => ref.current(), []);
}

export default useUnmount;
