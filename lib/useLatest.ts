import { useEffect, useRef } from "react";

const useLatest = <T>(current: T) => {
  const latest = useRef(typeof current === "function" ? current() : current);

  useEffect(() => {
    latest.current = typeof current === "function" ? current() : current;
  }, [current]);

  return latest;
};

export default useLatest;
