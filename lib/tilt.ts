export const setTransition = <T extends HTMLElement>(
  element: T,
  property: "all" | "opacity",
  duration: number,
  timing: string
): void => {
  element.style.transition = `${property} ${duration}ms ${timing}`
}

export const constrainToRange = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)
