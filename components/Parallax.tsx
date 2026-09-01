import type { FC } from "react";
import {
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";

const Parallax: FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 1], [0, -0.2], {
    clamp: false,
  });

  return <motion.div style={{ y: shouldReduceMotion ? 0 : y }} />;
};

export default Parallax;
