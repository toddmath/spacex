import type { FC } from "react"
import Link from "next/link"
import cn from "classnames"

import { TbBrandTwitter, TbExternalLink } from "react-icons/tb"
import { MdReadMore } from "react-icons/md"
import { FaWikipediaW } from "react-icons/fa"
import type { Mission as IMission } from "types/missions"

type MissionCardProps = { data: IMission }

const MissionCard: FC<MissionCardProps> = ({ data }) => {
  return (
    <li
      key={data.mission_id}
      aria-label={data.mission_name}
      className={cn(
        "card card-bordered border-primary border-4 bg-base-200 text-base-content w-full shadow-xl"
      )}
    >
      <article className={cn("card-body w-full")} aria-label={data.mission_name}>
        <header className='card-title'>
          <h3 className='text-center w-full text-2xl text-base-content'>
            {data.mission_name}
          </h3>
        </header>

        <p className='line-clamp-6'>{data.description}</p>

        <footer className='card-actions justify-end mt-6'>
          <div className='inline-flex border-secondary border-2 rounded-btn overflow-hidden shadow'>
            <Link
              href={`/mission/${encodeURIComponent(data.mission_id)}`}
              className='btn text-lg btn-secondary btn-outline border-none btn-square rounded-none'
            >
              <MdReadMore title='read more details' className='w-5 h-5' />
            </Link>
            {data.twitter && (
              <a
                href={data.twitter}
                className='btn text-lg btn-secondary btn-outline border-none btn-square rounded-none'
              >
                <TbBrandTwitter title='twitter' className='w-5 h-5' />
              </a>
            )}
            <a
              href={data.wikipedia}
              className='btn text-lg btn-secondary btn-outline border-none btn-square rounded-none'
            >
              <FaWikipediaW title='wikipedia' className='w-5 h-5' />
            </a>
            <a
              href={data.website}
              className='btn text-lg btn-secondary btn-outline border-none btn-square rounded-none'
            >
              <TbExternalLink title='external page' className='w-5 h-5' />
            </a>
          </div>
        </footer>
      </article>
    </li>
  )
}

export default MissionCard
