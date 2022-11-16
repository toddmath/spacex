import type { FC } from "react"
import Link from "next/link"
import cn from "classnames"

import type { LaunchData } from "lib/launches"
import { formatDate, isFuture } from "lib/date"
import Card from "./Card"

type LaunchCardProps = LaunchData & { index: number }

const LaunchCard: FC<LaunchCardProps> = ({
  id,
  index,
  name,
  details,
  date_utc,
  links,
  ...props
}) => {
  const futureLaunch = isFuture(date_utc)
  const success = !futureLaunch && (props.success ?? props.failures.length === 0)
  const patchSrc = links.patch.small ?? links.patch.large

  return (
    <Card
      title={name}
      image={patchSrc}
      className={cn("border-4", {
        "border-error": !success && !futureLaunch,
        "border-success": success,
        "border-primary": futureLaunch,
      })}
      imageProps={{
        loading: index <= 5 ? "eager" : "lazy",
        priority: index <= 5,
        sizes: "40vw",
        fill: true,
      }}
      containProps={{
        // contain: "content",
        contentVisibility: "auto",
      }}
    >
      <dl
        className={cn(
          "w-full self-start justify-self-start block font-semibold text-base leading-none space-y-2",
          {
            "text-error": !success && !futureLaunch,
            "text-success": success,
            "text-primary": futureLaunch,
            "flex-grow": !details,
            "flex-grow-0": details,
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

      <div className='card-actions justify-end mt-2'>
        <Link
          href={`/launch/${encodeURI(id)}`}
          className={cn("btn", {
            "btn-success": success,
            "btn-error": !success && !futureLaunch,
            "btn-primary": futureLaunch,
          })}
        >
          Details
        </Link>
      </div>
    </Card>
  )
}

// LaunchCard.displayName = "LaunchCard"

/*
return (
  <li
    key={id}
    aria-label={name}
    className={cn(
      "card card-bordered flex-shrink flex-grow basis-[35ch] shadow-xl w-full",
      {
        "image-full bg-base-100 overflow-hidden before:rounded-none grid-cols-1 grid-rows-1":
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
          decoding='async'
          className='w-auto object-cover rounded-none'
        />
      </figure>
    ) : null}
    <section
      aria-label={name}
      className={cn(
        "card-body gap-2 h-full w-full rounded-box justify-between",
        {
          "bg-neutral text-neutral-content": futureLaunch || !patchSrc,
          "bg-opacity-30 bg-blend-overlay": !futureLaunch && patchSrc,
          "bg-primary text-error": !success && !futureLaunch && patchSrc,
          "bg-primary text-success": success && !futureLaunch && patchSrc,
        }
      )}
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
          "w-full self-start justify-self-start block font-semibold text-base leading-none space-y-2",
          {
            "text-error": !success && !futureLaunch,
            "text-success": success && !futureLaunch,
            "text-neutral-content": futureLaunch,
            "flex-grow": !details,
            "flex-grow-0": details,
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

      <div className='card-actions justify-end mt-2'>
        <Link
          href={`/launch/${encodeURI(id)}`}
          className={cn("btn", {
            "btn-success": success && !futureLaunch,
            "btn-error": !success && !futureLaunch,
            "btn-primary": futureLaunch,
          })}
        >
          Details
        </Link>
      </div>
    </section>
  </li>
)
*/

export default LaunchCard
