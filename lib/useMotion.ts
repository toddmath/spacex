import type {
  AnimationListOptions,
  MotionKeyframesDefinition,
} from "@motionone/dom/types/animate/types";
import type { AnimationControls, ElementOrSelector } from "motion";
import { animate } from "motion";
import { useState } from "react";

interface UseAnimationTypes {
  onFinish: (res: (value?: unknown) => void) => void;
}

// export type AcceptedElements = Element | Element[] | NodeListOf<Element> | string

/**
 * `useMotionAnimate` returns `animateInstance`(Animation Controls) returned by `animate` and some helper functions and state
 *  such as: `play`, `reset`, `replay` and `isFinished`
 *
 * @param selector - The target element, can be string or a ref
 * @param keyframes - Element will animate from its current style to those defined in the keyframe. Refer to [motion's docs](https://motion.dev/dom/animate#keyframes) for more.
 * @param options - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/animate#options) for the values you could pass to this.
 * @param events - Pass functions of whatever you want to happen when a event like `onFinish` happens.
 */
export const useMotionAnimate = (
  selector: React.RefObject<any> | string,
  keyframes: MotionKeyframesDefinition,
  options?: AnimationListOptions | undefined,
  events?: UseAnimationTypes
) => {
  const [animateInstance, setAnimateInstance] =
    useState<AnimationControls | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const play = async () => {
    if (selector) {
      const selectedType: ElementOrSelector =
        typeof selector === "string" ? selector : selector.current;

      if (selectedType) {
        const currentAnimateInstance = animate(
          selectedType,
          keyframes,
          options
        );
        setIsFinished(false);
        setAnimateInstance(currentAnimateInstance);

        await currentAnimateInstance.finished.then((res) => {
          events?.onFinish(res);
          setIsFinished(true);
        });
      }
    }
  };

  function reset() {
    animateInstance?.stop();
    if (typeof selector === "string") {
      const selectedElements = document.querySelectorAll<HTMLElement>(selector);

      for (const elem of selectedElements) {
        if (elem.style) {
          elem.removeAttribute("style");
        }
      }
    } else if (selector.current) {
      selector.current.style = null;
    }
  }

  function replay() {
    reset();
    isFinished && play();
  }

  return {
    animateInstance,
    play,
    reset,
    replay,
    isFinished,
  };
};
