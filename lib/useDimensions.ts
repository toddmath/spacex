import { useState, useCallback, useLayoutEffect } from "react";

export interface DimensionObject {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
}

export type UseDimensionsHook = [
  (node: HTMLElement) => void,
  {} | DimensionObject,
  HTMLElement
];

export interface UseDimensionsArgs {
  liveMeasure?: boolean;
}

function getDimensionObject(node: HTMLElement): DimensionObject {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: "x" in rect ? rect.x : rect.top,
    left: "y" in rect ? rect.y : rect.left,
    x: "x" in rect ? rect.x : rect.left,
    y: "y" in rect ? rect.y : rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
}

function useDimensions({
  liveMeasure = true,
}: UseDimensionsArgs = {}): UseDimensionsHook {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState<HTMLElement | null>(null);

  const ref = useCallback((node) => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () => {
        return (
          window?.requestAnimationFrame(() =>
            setDimensions(getDimensionObject(node))
          ) ?? 0
        );
      };
      measure();

      if (liveMeasure) {
        window?.addEventListener("resize", measure);
        window?.addEventListener("scroll", measure);

        return () => {
          window?.removeEventListener("resize", measure);
          window?.removeEventListener("scroll", measure);
        };
      }
    }
  }, [node, liveMeasure]);

  return [ref, dimensions, node!];
}

export default useDimensions;

/*
import { useState, useEffect, RefObject } from "react";

export const useDimensions = <T extends RefObject<HTMLElement>>(myRef: T) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const hasWindow = typeof window !== "undefined";

  useEffect(() => {
    const getDimensions = () => {
      return {
        width:
          myRef?.current?.offsetWidth ?? hasWindow ? window?.innerWidth : 0,
        height:
          myRef?.current?.offsetHeight ?? hasWindow ? window?.innerHeight : 0,
      };
      // if (myRef) {
      //   return {
      //     width: myRef.current?.offsetWidth ?? 0,
      //     height: myRef.current?.offsetHeight ?? 0,
      //   };
      // }
      // return {
      //   width: hasWindow ? window.innerWidth : 0,
      //   height: hasWindow ? window.innerHeight : 0,
      // };
    };

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (hasWindow || myRef.current) setDimensions(getDimensions());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hasWindow, myRef]);

  return dimensions;
};
*/
