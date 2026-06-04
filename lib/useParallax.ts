import type { MotionValue } from "framer-motion"
import { useTransform } from "framer-motion"

export type UseParallax = (
  value: MotionValue<number>,
  distance: number
) => MotionValue<number>

export const useParallax: UseParallax = (value, distance) => {
  return useTransform(value, [0, 1], [-distance, distance])
}
