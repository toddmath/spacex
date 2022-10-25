import type { PropsWithChildren, FC } from "react"
import { memo } from "react"
import Link from "next/link"
import Image from "next/future/image"
import cn from "classnames"

import type { LaunchData } from "lib/launches"
import { formatDate, isFuture } from "lib/date"

type LaunchCardProps = PropsWithChildren<LaunchData> & {
  index: number
}

// const PATCH_IS_BG = false

const LaunchCard: FC<LaunchCardProps> = memo(
  ({ children, id, name, details, date_utc, index, ...props }) => {
    const futureLaunch = isFuture(date_utc)
    const success = !futureLaunch && (props.success ?? props.failures.length === 0)
    const patchSrc = props.links.patch.small ?? props.links.patch.large
    const isLazy = index >= 10

    return (
      <li
        key={id}
        aria-label={name}
        className={cn(
          "isolate card card-bordered flex-auto shadow-xl w-full h-full",
          {
            "image-full bg-base-100 overflow-hidden before:rounded-none before:inset-0":
              patchSrc,
            "border-primary bg-neutral text-neutral-content":
              !patchSrc && futureLaunch,
            "border-error": !success && !futureLaunch,
            "border-success": success,
          }
        )}
      >
        {patchSrc ? (
          <figure className='items-stretch object-cover rounded-none'>
            <Image
              src={patchSrc}
              alt={`${name} patch`}
              width={200}
              height={200}
              quality={40}
              loading={isLazy ? "lazy" : "eager"}
              priority={!isLazy}
              className='w-auto object-cover rounded-none'
            />
          </figure>
        ) : null}
        <div
          className={cn("card-body w-full gap-2", {
            "bg-neutral text-neutral-content": futureLaunch || !patchSrc,
            "bg-opacity-30 bg-blend-overlay": !futureLaunch && patchSrc,
            "bg-primary text-error": !success && !futureLaunch && patchSrc,
            "bg-primary text-success": success && !futureLaunch && patchSrc,
          })}
        >
          <header className='card-title flex-wrap w-full text-center mb-2'>
            <h2
              className={cn("text-2xl mx-auto", {
                "text-error": !success && !futureLaunch,
                "text-success": success && !futureLaunch,
                "text-neutral-content": futureLaunch,
              })}
            >
              {name}
            </h2>
          </header>

          <dl
            className={cn(
              "w-full flex-grow-0 self-start justify-self-start block font-semibold text-base leading-snug",
              {
                "text-error": !success && !futureLaunch,
                "text-success": success && !futureLaunch,
                "text-neutral-content": futureLaunch,
              }
            )}
          >
            <div className='w-full flex gap-2'>
              <dt className='launch-stat-term'>Date</dt>
              <dd className='flex-1'>
                <time dateTime={date_utc} aria-label='launch date'>
                  {formatDate(date_utc, {
                    month: "long",
                    year: "numeric",
                    day: "numeric",
                  })}
                </time>
              </dd>
            </div>

            <div className='w-full flex gap-2'>
              <dt className='flex-initial capitalize launch-stat-term'>Status</dt>
              <dd className='flex-1'>
                {futureLaunch ? "Upcoming" : success ? "Successfull" : "Failure"}
              </dd>
            </div>
          </dl>

          {details ? <p className='w-fit line-clamp-6'>{details}</p> : null}

          <div className='card-actions justify-end mt-auto'>
            <Link href={`/launch/${id}`}>
              <a
                className={cn("btn", {
                  "btn-success": success && !futureLaunch,
                  "btn-error": !success && !futureLaunch,
                  "btn-primary": futureLaunch,
                })}
              >
                Details
              </a>
            </Link>
          </div>
        </div>
      </li>
    )

    // return (
    //   <li
    //     aria-label={name}
    //     className={cn(
    //       {
    //         "bg-emerald-300 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100":
    //           success,
    //         "bg-orange-300 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100":
    //           !success,
    //       },
    //       "flex-1 basis-[30ch] list-none m-0 transition rounded-md snap-start relative",
    //       "hover:scale-105 shadow-md hover:shadow-lg max-w-prose"
    //     )}
    //   >
    //     <Link href={`/launch/${id}`} passHref>
    //       <a className='no-underline h-full w-full'>
    //         <section
    //           aria-label={name}
    //           className={cn(
    //             "no-underline h-full w-full p-6 md:px-8 md:py-6 space-y-4"
    //           )}
    //         >
    //           <header
    //             className={cn(
    //               "flex flex-row flex-wrap items-center gap-4",
    //               "row-span-1 row-start-1 col-start-1 col-span-1 sm:col-start-2"
    //             )}
    //           >
    //             <h3 className='font-medium text-2xl md:text-3xl'>{name}</h3>
    //             <TimeBadge
    //               time={date_utc}
    //               success={success}
    //               size='sm'
    //               className='flex-initial'
    //               title='Launch date'
    //               aria-label='Launch date'
    //             />
    //           </header>
    //           <p>{details}</p>
    //           {patchSrc ? (
    //             PATCH_IS_BG ? (
    //               <div
    //                 style={{ backgroundImage: `url(${patchSrc})` }}
    //                 className='object-cover absolute inset-0 bg-auto bg-no-repeat bg-center w-full h-auto mx-auto self-end justify-self-end'
    //               />
    //             ) : (
    //               <Image
    //                 src={patchSrc}
    //                 alt={`${name} mission patch`}
    //                 width={200}
    //                 height={200}
    //                 quality={40}
    //                 placeholder='empty'
    //                 priority={false}
    //                 className={cn(
    //                   "w-full h-auto object-contain",
    //                   "max-w-[200px] mx-auto",
    //                   "sm:row-span-2 row-start-3 sm:row-start-1 col-span-2 sm:col-span-1 col-start-1 aspect-square"
    //                 )}
    //               />
    //             )
    //           ) : null}
    //           {children}
    //         </section>
    //       </a>
    //     </Link>
    //   </li>
    // )
  }
)

LaunchCard.displayName = "LaunchCard"

export default LaunchCard
