import { useQuery } from "@tanstack/react-query"
import { FiTwitter } from "react-icons/fi"
import { ImFlickr2 } from "react-icons/im"
import { IoRocketOutline } from "react-icons/io5"

import { getCompanyInfo, companyInfoKey } from "lib/companyInfo"
// import Image from "next/future/image"

const Footer: React.FC = () => {
  const { data, isError, isLoading } = useQuery(companyInfoKey, getCompanyInfo, {
    staleTime: 1000 * 60 * 30,
  })

  if (isError) return <div>failed to load</div>
  if (isLoading)
    return (
      <footer
        className='footer p-10 bg-neutral text-neutral-content'
        // className='bg-gray-100 dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 shadow-inner py-6 px-8 md:py-8 md:px-12 flex flex-row flex-wrap items-center justify-center mt-14 w-full h-full'
      >
        {" "}
      </footer>
    )

  const { headquarters: hq, links } = data

  return (
    <footer
      className='footer items-center p-10 bg-neutral text-neutral-content'
      // className='bg-gray-100 dark:bg-gray-800 dark:border-gray-800 border-gray-300 border-t-2 selection:text-gray-700 dark:text-gray-100 shadow-inner py-6 px-8 md:py-8 md:px-12 flex flex-row flex-wrap items-center justify-center gap-4 mt-14'
    >
      <div className='items-center'>
        <svg version='1.1' x='0px' y='0px' viewBox='0 0 400 50'>
          <title>SpaceX Logo</title>
          <g className='letter_s'>
            <path
              className='fill-neutral-content'
              d='M37.5,30.5H10.9v-6.6h34.3c-0.9-2.8-3.8-5.4-8.9-5.4H11.4c-5.7,0-9,2.1-9,6.7v4.9c0,4,3.4,6.3,8.4,6.3h26.9v7H1.5
          c0.9,3.8,3.8,5.8,9,5.8h27.1c5.7,0,8.5-2.2,8.5-6.9v-4.9C46.1,33.1,42.8,30.8,37.5,30.5z'
            ></path>
          </g>
          <g className='letter_p'>
            <path
              className='fill-neutral-content'
              d='M91.8,18.6H59v30.7h9.3V37.5h24.2c6.7,0,10.4-2.3,10.4-7.7v-3.4C102.8,21.4,98.6,18.6,91.8,18.6z M94.8,28.4
          c0,2.2-0.4,3.4-4,3.4H68.3l0.1-8h22c4,0,4.5,1.2,4.5,3.3V28.4z'
            ></path>
          </g>
          <g className='letter_a'>
            <polygon
              className='fill-neutral-content'
              points='129.9,17.3 124.3,24.2 133.8,37.3 114,37.3 109.1,42.5 137.7,42.5 142.6,49.3 153.6,49.3 	'
            ></polygon>
          </g>
          <g className='letter_c'>
            <path
              className='fill-neutral-content'
              d='M171.4,23.9h34.8c-0.9-3.6-4.4-5.4-9.4-5.4h-26c-4.5,0-8.8,1.8-8.8,6.7v17.2c0,4.9,4.3,6.7,8.8,6.7h26.3
          c6,0,8.1-1.7,9.1-5.8h-34.8V23.9z'
            ></path>
          </g>
          <g className='letter_e'>
            <polygon
              className='fill-neutral-content'
              points='228.3,43.5 228.3,34.1 247,34.1 247,28.9 218.9,28.9 218.9,49.3 260.4,49.3 260.4,43.5 	'
            ></polygon>
            <rect
              className='fill-neutral-content'
              x='219.9'
              y='18.6'
              width='41.9'
              height='5.4'
            ></rect>
          </g>
          <g className='letter_x'>
            <path
              className='fill-neutral-content'
              d='M287.6,18.6H273l17.2,12.6c2.5-1.7,5.4-3.5,8-5L287.6,18.6z'
            ></path>
            <path
              className='fill-neutral-content'
              d='M308.8,34.3c-2.5,1.7-5,3.6-7.4,5.4l13,9.5h14.7L308.8,34.3z'
            ></path>
          </g>
          <g className='letter_swoosh'>
            <path
              className='fill-neutral-content'
              d='M399,0.7c-80,4.6-117,38.8-125.3,46.9l-1.7,1.6h14.8C326.8,9.1,384.3,2,399,0.7L399,0.7z'
            ></path>
          </g>
        </svg>
        <address className='flex-1 flex items-center justify-center w-fit'>
          {hq.address}
          <br />
          {hq.city},&nbsp;{hq.state}
        </address>
      </div>

      <div>
        <span className='footer-title'>Social</span>
        <div className='grid grid-flow-col gap-4'>
          <a href={links.twitter} className='text-lg'>
            <FiTwitter className='fill-current' title='twitter' />
          </a>
          <a href={links.flickr} className='text-lg'>
            <ImFlickr2 className='fill-current' title='flickr' />
          </a>
          <a href={links.website} className='text-lg'>
            <IoRocketOutline className='fill-current' title='rocket' />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
