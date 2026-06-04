import type { FC } from "react"
import { memo, useRef } from "react"
import Image, { type ImageProps } from "next/image"
import cn from "classnames"
import { useInView, motion, useScroll, useSpring, useTransform } from "framer-motion"

import type { Rocket as IRocket } from "types/rockets"
import Stats, { type Stat } from "./Stats"
import { useParallax } from "lib/useParallax"
// import Card from "./Card"
// import { is, prettierFmt } from "lib/utils"

type RocketSectionProps = IRocket & { index: number }

const MotionImage = motion(Image)
const MotionStats = motion(Stats)

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
  const heroRef = useRef(null)
  const scrollRef = useRef(null)
  const isInView = useInView(heroRef)
  const { scrollYProgress } = useScroll({ target: scrollRef })
  const [title, body] = [150, 125] as const

  const titleY = useParallax(scrollYProgress, title)
  const bodyY = useParallax(scrollYProgress, body)
  const statsY = useParallax(scrollYProgress, 300)
  // const imgY = useParallax(scrollYProgress, 100)

  // const titleOpacity = useTransform(titleY, [-title, 0, 0, title], [0, 1, 1, 0])
  // const bodyOpacity = useTransform(bodyY, [-body, 0, 0, body], [0, 1, 1, 0])

  // const scale = useTransform(scrollYProgress, [0, 1], [1, 0.4])
  const scale = useTransform(titleY, [-title, 0, title], [1.1, 1.1, 1])

  const stats: Stat[] = [
    { title: "Launches", value: `${rocket.success_rate_pct}%`, desc: "Success" },
    {
      title: "Per Launch",
      value: cost_per_launch.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 1,
      }),
    },
  ]

  return (
    <motion.li
      role='listitem'
      ref={heroRef}
      key={id}
      initial={{ opacity: 0.25 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      // exit={{ opacity: 0.25 }}
      transition={{ opacity: { duration: 2 } }}
      layout
      className={cn("hero bg-base-100 min-h-screen snap-center")}
    >
      <motion.figure className='w-full h-full hero-overlay bg-opacity-60 relative object-cover'>
        <MotionImage
          src={flickr_images[0]}
          alt={name}
          fill
          sizes='100vw'
          className='w-full h-auto object-cover object-center'
          // className='w-full h-full'
          // style={{ y: imgY }}
        />
      </motion.figure>

      <motion.section
        ref={scrollRef}
        aria-label={name}
        className={cn(
          // "col-start-1 col-span-1 row-start-1 row-span-1",
          "hero-content",
          "w-full h-auto",
          "flex items-center justify-center max-w-7xl gap-0 p-0"
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* <motion.div className={cn("z-10 text-center")}> */}
        <div className={cn("max-w-md space-y-6 isolate text-center")}>
          <motion.h2
            className={cn(
              "will-change-transform z-20 relative text-5xl font-bold w-fit mx-auto  shadow-xl",
              "rounded-lg px-4 py-2",
              "backdrop-blur mix-blend-screen",
              "bg-neutral text-neutral-content bg-opacity-90"
            )}
            style={{ y: titleY, scale }}
          >
            {name}
          </motion.h2>
          <motion.p
            className={cn(
              "will-change-transform z-10 relative w-full rounded-lg p-4 text-lg shadow-lg",
              "backdrop-blur mix-blend-screen",
              "bg-neutral text-neutral-content bg-opacity-90"
            )}
            style={{ y: bodyY }}
          >
            {description}
          </motion.p>
          <MotionStats
            data={stats}
            className='will-change-transform shadow-2xl relative z-30 bg-neutral text-neutral-content bg-opacity-95 mix-blend-screen backdrop-blur'
            style={{ y: statsY, scale }}
          />
        </div>
        {/* </motion.div> */}
      </motion.section>
    </motion.li>
  )
}

export default RocketSection
