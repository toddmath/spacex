import type { AnimationControls, ElementOrSelector } from "motion"
import type {
  AnimationListOptions,
  MotionKeyframesDefinition,
} from "@motionone/dom/types/animate/types"
import type { TimelineOptions } from "@motionone/dom/types/timeline"

import { timeline } from "motion"
import { useState } from "react"
import { convertRefsToElement, is, isRefObject } from "./utils"

export interface UseAnimationTypes {
  onFinish: (res: (value?: unknown) => void) => void
}

export type ModifiedAcceptedElements = ElementOrSelector | React.RefObject<any>

type Segment =
  | [ModifiedAcceptedElements, MotionKeyframesDefinition]
  | [ModifiedAcceptedElements, MotionKeyframesDefinition, AnimationListOptions]

export type SequenceDefination = Segment[]

export interface UseMotionTimelineReturn {
  play: () => void
  reset: () => void
  replay: () => void
  isFinished: boolean
  timelineInstance: AnimationControls | null
}

/**
 * `useMotionTimeline` returns `timelineInstance` (Animation Controls) that are returned by `timeline` and some helper functions and state
 *  such as: `play`, `reset`, `replay` and `isFinished`
 *
 * @param sequence - `sequence` is an array, defines animations with the same settings as the animate function. In the arrays, Element can be either a string or a ref.
 * @param options - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/timeline#options) for the values you could pass into this.
 * @param events - Pass functions of whatever you want to happen when a event like `onFinish` happens.
 */
export const useMotionTimeline = (
  sequence: SequenceDefination,
  options?: TimelineOptions,
  events?: UseAnimationTypes
): UseMotionTimelineReturn => {
  const [timelineInstance, setTimelineInstance] = useState<AnimationControls | null>(
    null
  )
  const [isFinished, setIsFinished] = useState(false)

  const play = async () => {
    const currentTimelineInstance = timeline(convertRefsToElement(sequence), options)
    setIsFinished(false)
    setTimelineInstance(currentTimelineInstance)
    await currentTimelineInstance.finished.then(res => {
      events?.onFinish(res)
      setIsFinished(true)
    })
  }

  const reset = () => {
    timelineInstance?.stop()

    for (const elem of sequence) {
      let selector = elem[0]

      if (isRefObject(selector)) {
        selector.current.style = null
      } else if (is.string(selector)) {
        let selectedElements = document.querySelectorAll<HTMLElement>(selector)

        for (const selected of selectedElements) {
          if (selected.style) selected.removeAttribute("style")
        }
      }
    }
  }

  const replay = () => {
    reset()
    if (isFinished) play()
  }

  return {
    timelineInstance,
    play,
    reset,
    replay,
    isFinished,
  }
}
