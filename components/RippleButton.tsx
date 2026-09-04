import type { ReactNode } from "react";
import type { Variants } from "framer-motion";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

type RippleButtonProps = {
  children: NonNullable<ReactNode>;
  className?: string;
};

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
    // const x = useMotionValue(0);
    // const radius = useTransform(x, (xs) => xs / 2);
    // const top = useMotionValue(0);
    // const width = useMotionValue(0);
    // const height = useMotionValue(0);

    return (
      <motion.div
        ref={ref}
        className={cn(
          className,
          "relative flex items-center justify-center bg-base-300",
        )}
      >
        <motion.button
          type="button"
          className="rounded-btn no-animation hover:bg-opacity-90 btn relative overflow-hidden shadow btn-primary"
          layout
          initial="off"
          whileTap="on"
        >
          <motion.span
            className="absolute aspect-square w-fit scale-0 rounded-full bg-primary-content/70"
            variants={rippleVariants}
          />
          {children}
        </motion.button>
      </motion.div>
    );
  },
);

RippleButton.displayName = "RippleButton";

export default RippleButton;
