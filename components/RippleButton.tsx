import type { MouseEventHandler, ReactNode } from "react";
import type { Variants } from "framer-motion";
import { forwardRef, useState } from "react";
import {
  motion,
  TapInfo,
  useMotionValueEvent,
  useMotionValue,
  useTransform,
} from "framer-motion";
import cn from "classnames";

import { useDimensions } from "lib/useDimensions";

type RippleButtonProps = {
  children: NonNullable<ReactNode>;
  className?: string;
};

// type TapEvent = MouseEvent | TouchEvent | PointerEvent;

const buttonVariants = {
  // off: { opacity: 1 },
  // on: { opacity: 0 },
  off: {},
  on: {},
} satisfies Variants;

const rippleVariants = {
  off: {
    opacity: 1,
    scale: 0,
    top: 0,
    left: 0,
  },
  on: {
    opacity: 0,
    scale: 4,
    top: 0,
    left: 0,
    transition: {
      duration: 0.6,
      type: "spring",
    },
  },
} satisfies Variants;

const RippleButton = forwardRef<HTMLDivElement, RippleButtonProps>(
  ({ children, className }, ref) => {
    const x = useMotionValue(0);
    const radius = useTransform(x, (xs) => xs / 2);
    const top = useMotionValue(0);
    const width = useMotionValue(0);
    const height = useMotionValue(0);

    // const [circle, setCircle] = useState({
    //   width: 0,
    //   height: 0,
    //   top: 0,
    //   left: 0,
    // });
    // const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    //   const btn = event.currentTarget;
    //   const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    //   const radius = diameter / 2;
    //   setCircle({
    //     width: diameter,
    //     height: diameter,
    //     left: event.clientX - (btn.offsetLeft + radius),
    //     top: event.clientY - (btn.offsetTop + radius),
    //   });
    // };
    // function onTap(event: TapEvent, info: TapInfo) {
    //   const btn = event.currentTarget
    //   const a =
    //   const diameter = Math.max(btn?.clientWidth, btn?.clientHeight);
    //   const radius = diameter / 2;
    // }

    return (
      <motion.div
        ref={ref}
        className={cn(
          className,
          "relative flex items-center justify-center bg-base-300"
        )}
      >
        <motion.button
          type="button"
          // className="rounded-btn relative min-w-max overflow-hidden bg-primary px-5 py-3 text-primary-content shadow hover:bg-opacity-90"
          className="btn-primary rounded-btn no-animation btn relative overflow-hidden shadow hover:bg-opacity-90"
          // onClick={onClick}
          // onTap={onTap}
          layout
          initial="off"
          whileTap="on"
          // animate="on"
          // variants={buttonVariants}
        >
          <motion.span
            className="absolute w-fit scale-0 rounded-full bg-primary-content/70 [aspect-ratio:1/1]"
            variants={rippleVariants}
          />
          {children}
        </motion.button>
      </motion.div>
    );
  }
);

RippleButton.displayName = "RippleButton";

export default RippleButton;
