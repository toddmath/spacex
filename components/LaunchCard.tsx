import type { FC } from "react"
import cn from "classnames"

import type { LaunchData } from "lib/launches"
import { formatDate, isFuture } from "lib/date"
import Card from "components/Card"
import Link from "components/Link"

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
  const futureLaunch = isFuture(date_utc);
  const success =
    !futureLaunch && (props.success ?? (props.failures ? props.failures.length === 0 : true));
  const patchSrc = links?.patch?.small ?? links?.patch?.large ?? undefined;

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
    >
      <dl
        className={cn(
          "block w-full space-y-2 self-start justify-self-start text-base font-semibold leading-none",
          {
            "text-error": !success && !futureLaunch,
            "text-success": success,
            "text-primary": futureLaunch,
            grow: !details,
            "grow-0": details,
          }
        )}
      >
        <div className='flex w-full gap-2'>
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

        <div className='flex w-full gap-2'>
          <dt className='launch-stat-term flex-initial capitalize'>Status</dt>
          <dd className='flex-1'>
            {futureLaunch ? "Upcoming" : success ? "Successfull" : "Failure"}
          </dd>
        </div>
      </dl>

      {details ? <p className='w-fit line-clamp-6'>{details}</p> : null}

      <div className='card-actions mt-2 justify-end'>
        <Link
          href={{ pathname: "/launch/[id]", query: { id } }}
          className={cn("btn", {
            "btn-success": success,
            "btn-error": !success && !futureLaunch,
            "btn-primary": futureLaunch,
          })}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          Details
        </Link>
      </div>
    </Card>
  )
}

export default LaunchCard
