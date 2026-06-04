import type { FC, PropsWithChildren } from "react"
import Image from "next/image"

import bg from "public/static/image/launch.jpg"

type HeroProps = PropsWithChildren<{
  title: string
  summary: string
}>

const Hero: FC<HeroProps> = ({ title, summary, children }) => {
  return (
    <div className='hero h-screen -mt-16'>
      <figure className='w-full h-full max-h-screen object-cover'>
        <Image
          src={bg}
          sizes='100vw'
          // width={3000}
          // height={2000}
          // fill
          priority
          placeholder='blur'
          alt='rocket ship launching during daytime'
          className='w-full h-full object-cover [object-position:25%_25%]'
        />
      </figure>
      <div className='bg-primary bg-opacity-[0.25] hero-overlay mix-blend-color' />

      <div
        // className='bg-neutral bg-opacity-40 backdrop-blur hero-content text-center text-neutral-content rounded-box max-w-lg flex-col p-8 shadow-2xl'
        className='prose md:prose-lg bg-neutral text-neutral-content bg-opacity-70 backdrop-blur hero-content block text-center max-w-lg rounded-box shadow-2xl md:p-6 lg:p-8'
      >
        <h1
          // className='text-5xl font-bold flex-1 w-full'
          className='text-neutral-content'
        >
          {title}
        </h1>
        <p>{summary}</p>
        {children}
      </div>
    </div>
  )
}

export default Hero
