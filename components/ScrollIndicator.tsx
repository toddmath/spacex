import type { FC } from "react";
import { useScroll, useSpring, motion } from "framer-motion";
import cn from "classnames";

type ScrollIndicatorProps = {
  className?: string;
};

const ScrollIndicator: FC<ScrollIndicatorProps> = ({ className }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div className={cn(className, "bg-primary")} style={{ scaleX }} />
  );
};

export default ScrollIndicator;
