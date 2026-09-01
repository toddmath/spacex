import type { FC } from "react";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";

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
  cost_per_launch,
  id,
  ...rocket
}) => {
  const heroRef = useRef(null);
  const scrollRef = useRef(null);
  // const { scrollYProgress } = useScroll({ target: scrollRef });

  // const dist = {
  //   title: 250,
  //   body: 100,
  //   stats: 150,
  // };

  // const titleY = useParallax(scrollYProgress, dist.title);
  // const bodyY = useParallax(scrollYProgress, dist.body);
  // const statsY = useParallax(scrollYProgress, dist.stats);

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
      >
        <figure>
          <MotionImage
            src={flickr_images[0]}
            alt={name}
            fill
            sizes="50vw"
            className="h-auto w-full object-cover object-center"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center text-4xl font-bold">
            {name}
          </h2>
          <p className="w-auto text-lg">{description}</p>
          <MotionStats data={stats} className="card-actions" layout />
        </div>
      </motion.section>
    </motion.li>
  );
};

export default RocketSection;
