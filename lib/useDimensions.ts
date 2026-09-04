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
  unknown | DimensionObject,
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
    top: rect.x ?? rect?.top,
    left: rect.y ?? rect?.left,
    x: rect.x ?? rect?.left,
    y: rect.y ?? rect?.top,
    right: rect.right,
    bottom: rect.bottom,
  };
}

export function useDimensions({
  liveMeasure = true,
}: UseDimensionsArgs = {}): UseDimensionsHook {
  const [dimensions, setDimensions] = useState<DimensionObject>(
    {} as DimensionObject
  );
  const [node, setNode] = useState<HTMLElement>();

  const ref = useCallback<(node: HTMLElement) => void>((node) => {
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