import { FiExternalLink } from "react-icons/fi"
import { ImWikipedia } from "react-icons/im"
// import { IoRocketOutline } from "react-icons/io5"
import { TbBrandTwitter } from "react-icons/tb"
// import cn from "classnames"

type SocialLinksProps = {
  twitter?: string
  name: string
  website: string
  // flickr: string
  wikipedia: string
}

const SocialLinks = ({ twitter, name, website, wikipedia }: SocialLinksProps) => {
  return (
    <ul className='flex gap-4 mx-0 p-0 list-none'>
      {twitter && (
        <li className='p-0 m-0 focus:outline-none bg-gray-100 dark:bg-gray-900 ring-blue-500 focus:ring-2 focus-within:ring-2  rounded-full hover:ring-2 shadow-inner'>
          <a
            href={twitter}
            className='text-gray-900 dark:text-gray-100 rounded-full focus:outline-none hover:outline-none'
          >
            <TbBrandTwitter
              title={`${name} twitter account`}
              className='p-2 w-8 h-8'
            />
          </a>
        </li>
      )}
      <li className='p-0 m-0 focus:outline-none hover:outline-none bg-gray-100 dark:bg-gray-900 ring-blue-500 focus:ring-2 focus-within:ring-2 rounded-full hover:ring-2 shadow-inner'>
        <a
          href={wikipedia}
          className='text-gray-900 dark:text-gray-100 rounded-full focus:outline-none hover:outline-none'
        >
          <ImWikipedia title={`${name} wikipedia article`} className='p-2 w-8 h-8' />
        </a>
      </li>
      <li className='p-0 m-0 focus:outline-none hover:outline-none bg-gray-100 dark:bg-gray-900 ring-blue-500 focus:ring-2 focus-within:ring-2 rounded-full hover:ring-2 shadow-inner'>
        <a
          href={website}
          className='text-gray-900 dark:text-gray-100 rounded-full focus:outline-none hover:outline-none'
        >
          <FiExternalLink title={name} className='p-2 w-8 h-8' />
        </a>
      </li>
    </ul>
  )

  // return (
  //   <ul className='flex-1 flex sm:flex-col flex-row flex-wrap gap-3 justify-center items-center'>
  //     <li className='w-full list-none flex items-center justify-center flex-1 bg-emerald-500 dark:bg-emerald-600/40 rounded-lg transition-shadow shadow hover:shadow-inner'>
  //       <a
  //         href={twitter}
  //         title='SpaceX twitter'
  //         className='flex items-center justify-center w-full gap-2 py-2 px-2.5'
  //       >
  //         SpaceX <FiTwitter strokeWidth={2} className='w-6 h-6 m-0' />
  //       </a>
  //     </li>

  //     <li className='w-full list-none flex items-center justify-center flex-1 bg-emerald-500 dark:bg-emerald-600/40 rounded-lg transition-shadow shadow hover:shadow-inner'>
  //       <a
  //         href={elon}
  //         title='Elon twitter'
  //         className='flex items-center justify-center w-full gap-2 py-2 px-2.5'
  //       >
  //         Elons <FiTwitter strokeWidth={2} className='w-6 h-6 m-0' />
  //       </a>
  //     </li>

  //     <li className='w-full list-none flex items-center justify-center flex-1 bg-emerald-500 dark:bg-emerald-600/40 rounded-lg transition-shadow shadow hover:shadow-inner'>
  //       <a
  //         href={flickr}
  //         title='Flickr'
  //         className='flex items-center justify-center w-full gap-2 py-2 px-2.5'
  //       >
  //         Flickr <ImFlickr2 className='w-6 h-6 m-0' />
  //       </a>
  //     </li>

  //     <li className='w-full list-none flex items-center justify-center flex-1 bg-emerald-500 dark:bg-emerald-600/40 rounded-lg transition-shadow shadow hover:shadow-inner'>
  //       <a
  //         href={website}
  //         title='spacex.com'
  //         className='flex items-center justify-center w-full gap-2 py-2 px-2.5'
  //       >
  //         SpaceX <IoRocketOutline strokeWidth={2} className='w-6 h-6 m-0' />
  //       </a>
  //     </li>
  //   </ul>
  // )
}

export default SocialLinks
