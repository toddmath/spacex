import type { FC } from "react";
import { useRef } from "react";
import Image from "next/image";
import { useInView, motion, useScroll, useTransform } from "framer-motion";

import type { Rocket as IRocket } from "types/rockets";
import Stats, { type Stat } from "./Stats";
import { useParallax } from "lib/useParallax";

type RocketSectionProps = IRocket & { index: number };

const MotionImage = motion(Image);
const MotionStats = motion(Stats);

const RocketSection: FC<RocketSectionProps> = ({
  name,
  flickr_images,
  description,
  engines,
  stages,
  payload_weights,
  cost_per_launch,
  wikipedia,
  id,
  index,
  ...rocket
}) => {
  const heroRef = useRef(null);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  // const isInView = useInView(heroRef);

  const dist = {
    title: 250,
    body: 100,
    stats: 150,
  };

  const titleY = useParallax(scrollYProgress, dist.title);
  const bodyY = useParallax(scrollYProgress, dist.body);
  const statsY = useParallax(scrollYProgress, dist.stats);

  // const bgOpacity = useTransform(imgY, [-100, 0, 100], [0.5, 1, 0.75])
  // const titleOpacity = useTransform(
  //   titleY,
  //   [-title, -title / 2, title],
  //   [0, 1, 0]
  // );
  // const bodyOpacity = useTransform(bodyY, [-body, 0, 0, body], [0, 1, 1, 0.75]);
  // const statsOpacity = useTransform(statsY, [-300, 0, 300], [0.5, 1, 1]);

  // const scale = useTransform(scrollYProgress, [0, 1], [1, 0.4])
  // const bodyScale = useTransform(bodyY, [-body, 0, body], [0.75, 1, 0.75]);
  // const titleScale = useTransform(titleY, [-title, title], [1, 2])
  // const statsScale = useTransform(statsY, [-150, 100, 100], [0, 1, 1]);

  const stats: Stat[] = [
    {
      title: "Launches",
      value: `${rocket.success_rate_pct}%`,
      desc: "Success",
    },
    {
      title: "Per Launch",
      value: cost_per_launch.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 1,
      }),
    },
  ];

  return (
    <motion.li
      role="listitem"
      ref={heroRef}
      key={id}
      // initial={{ opacity: 0.25 }}
      // animate={{ opacity: isInView ? 1 : 0.25 }}
      // exit={{ opacity: 0.25 }}
      // transition={{ opacity: { duration: 2 } }}
      layout
      className="hero min-h-screen snap-y snap-mandatory snap-center"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
    >
      <motion.section
        ref={scrollRef}
        aria-label={name}
        className="hover-3d container card card-bordered image-full prose glass card-normal isolate rounded-lg bg-primary px-4 text-center sm:px-0"
        layout
        layoutScroll
        whileInView={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0.75, scale: 0.9 }}
        // transition={{ duration: 0.5 }}
      >
        {/* <div className="image-full"> */}
        <motion.figure
        // className="image-full"
        // className="hero-overlay relative h-full w-full bg-opacity-60 object-cover"
        >
          <MotionImage
            src={flickr_images[0]}
            alt={name}
            fill
            sizes="50vw"
            // sizes="100vw"
            className="h-auto w-full object-cover object-center"
          />
        </motion.figure>
        <div className="card-body">
          <motion.h2
            className="card-title justify-center text-4xl font-bold"
            layout
          >
            {name}
          </motion.h2>
          <motion.p className="w-auto text-lg" layout>
            {description}
          </motion.p>
          <MotionStats data={stats} className="card-actions" layout />
        </div>
        {/* </div> */}
      </motion.section>
    </motion.li>
  );
};

export default RocketSection;
