import Link from "next/link"
import cn from "classnames"
import { useRef } from "react"
// import Image from "next/image"

import type { Rocket as IRocket } from "types/rockets"
import TiltCard from "components/TiltCard"
import useMouse from "lib/useMouse"

type RocketProps = { data: IRocket }

const Rocket: React.FC<RocketProps> = ({ data }) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const { width, height, left, top, pos, elemPos, page } = useMouse(ref)
  // console.log({ width, height, left, top, pos, elemPos, page })

  return (
    (<Link href={`/rocket/${data.id}`} className='no-underline block' ref={ref}>

      <TiltCard
        imgSrc={data.flickr_images[1]}
        className='smol-card-component rounded-box overflow-hidden'
      >
        <header
          className={cn(
            "py-3 rounded-t-box",
            "focus-visible:outline-none",
            "bg-gradient-to-b from-neutral/40 to-neutral/60 text-neutral-content",
            "mix-blend-hard-light backdrop-blur-sm",
            "w-full mx-auto text-center"
          )}
        >
          <h3 className='m-0 p-0 font-bold uppercase text-center text-3xl text-neutral-content'>
            {data.name}
          </h3>
        </header>

        <p
          className={cn(
            "m-0 pb-6 pt-3 px-6 overflow-hidden rounded-b-box",
            // "bg-gradient-to-b from-gray-900/60 to-gray-900/80 text-white",
            "bg-gradient-to-b from-neutral/60 to-neutral/80 text-neutral-content",
            "mix-blend-hard-light backdrop-blur-sm"
          )}
        >
          {data.description}
        </p>

        {/* <Image
      src={data.flickr_images[1]}
      width={240}
      height={240}
      quality={55}
      className='w-full h-auto m-0 object-cover'
      alt={data.name}
    /> */}
      </TiltCard>

    </Link>)
  );
}

// const Rocket: React.FC<RocketProps> = ({ data }) => {
//   return (
//     <section className='group smol-card-component h-full overflow-hidden relative bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50 rounded-lg shadow-lg'>
//       <header className='mx-6 mt-4 focus-visible:outline-none'>
//         <Link href={`/rocket/${data.id}`}>
//           <a className='w-fit inline-block focus-visible:outline-none no-underline'>
//             <h3
//               // className='m-0 p-0 text-3xl font-medium text-gray-800 dark:text-gray-200'
//               className='subtitle m-0 p-0 w-fit'
//             >
//               {data.name}
//             </h3>
//           </a>
//         </Link>
//       </header>

//       <p className='my-0 mx-6'>{data.description}</p>

//       <Image
//         src={data.flickr_images[1]}
//         width={240}
//         height={240}
//         quality={55}
//         className='w-full h-auto m-0 object-cover'
//         alt={data.name}
//       />
//     </section>
//   )
// }

export default Rocket
