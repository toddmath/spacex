import { FiExternalLink } from "react-icons/fi";
import { ImWikipedia } from "react-icons/im";
// import { IoRocketOutline } from "react-icons/io5"
import { TbBrandTwitter } from "react-icons/tb";
// import cn from "classnames"

type SocialLinksProps = {
  twitter?: string;
  name: string;
  website: string;
  // flickr: string
  wikipedia: string;
};

const SocialLinks = ({
  twitter,
  name,
  website,
  wikipedia,
}: SocialLinksProps) => {
  return (
    <ul className="mx-0 flex list-none gap-4 p-0">
      {twitter && (
        <li className="m-0 rounded-full bg-gray-100 p-0 shadow-inner ring-blue-500 focus-within:ring-2 hover:ring-2  focus:outline-none focus:ring-2 dark:bg-gray-900">
          <a
            href={twitter}
            className="rounded-full text-gray-900 hover:outline-none focus:outline-none dark:text-gray-100"
          >
            <TbBrandTwitter
              title={`${name} twitter account`}
              className="h-8 w-8 p-2"
            />
          </a>
        </li>
      )}
      <li className="m-0 rounded-full bg-gray-100 p-0 shadow-inner ring-blue-500 focus-within:ring-2 hover:outline-none hover:ring-2 focus:outline-none focus:ring-2 dark:bg-gray-900">
        <a
          href={wikipedia}
          className="rounded-full text-gray-900 hover:outline-none focus:outline-none dark:text-gray-100"
        >
          <ImWikipedia
            title={`${name} wikipedia article`}
            className="h-8 w-8 p-2"
          />
        </a>
      </li>
      <li className="m-0 rounded-full bg-gray-100 p-0 shadow-inner ring-blue-500 focus-within:ring-2 hover:outline-none hover:ring-2 focus:outline-none focus:ring-2 dark:bg-gray-900">
        <a
          href={website}
          className="rounded-full text-gray-900 hover:outline-none focus:outline-none dark:text-gray-100"
        >
          <FiExternalLink title={name} className="h-8 w-8 p-2" />
        </a>
      </li>
    </ul>
  );

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
};

export default SocialLinks;
