import { useLayoutEffect, useEffect } from "react";

const usePassiveLayoutEffect =
  typeof document !== "undefined" && document.createElement !== void 0
    ? useLayoutEffect
    : useEffect;

export default usePassiveLayoutEffect;
