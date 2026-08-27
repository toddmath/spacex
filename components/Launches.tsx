import type { FC } from "react"
import { useMemo, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import cn from "classnames"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"

import { isLaunchSuccess, type LaunchData } from "lib/launches"
import useSearch from "lib/useQuery"
import { getYear, isFuture } from "lib/date"
import LaunchCard from "./LaunchCard"
// import Card from "./Card"

type LaunchStatus = "success" | "failed" | "upcoming" | "all"

type LaunchesProps = {
  data: LaunchData[]
  showStatus?: LaunchStatus[]
}

// TODO: maybe see if memo(Launches) is more performant

const Launches: FC<LaunchesProps> = ({
  data,
  showStatus = ["all", "success", "failed", "upcoming"],
}) => {
  const [year, setYear] = useState<number>()
  const [status, setStatus] = useState<typeof showStatus[number]>("all")
  const { query, onChange } = useSearch()

  const shownLaunches = useMemo(() => {
    return data.filter(launch => {
      let res = launch.name.toLowerCase().includes(query.toLowerCase())
      if (year) res = res && getYear(launch.date_utc) === year
      return status === "all"
        ? res
        : status === "upcoming"
        ? res && isFuture(launch.date_utc)
        : status === "success"
        ? res && isLaunchSuccess(launch)
        : status === "failed"
        ? res && !isLaunchSuccess(launch)
        : res
    })
  }, [data, query, year, status])

  const years = useMemo(() => {
    return Array.from(
      new Set(shownLaunches.map(launch => getYear(launch.date_utc)).sort())
    )
  }, [shownLaunches])

  const names = useMemo(
    () => shownLaunches.map(launch => launch.name),
    [shownLaunches]
  )

  return (
    <div className='mx-auto container lg:max-w-6xl xl:max-w-7xl flex flex-col gap-8 min-h-full'>
      <form className='w-full flex gap-4 flex-wrap items-center justify-center rounded-box p-4 border-2 border-primary shadow bg-base-200'>
        <div className='form-control items-center justify-center w-full max-w-sm flex-1 md:basis-1/3'>
          <label className='input-group'>
            <span className='bg-neutral text-neutral-content'>Name</span>
            <input
              value={query}
              onChange={onChange}
              type='search'
              list='names'
              autoComplete='on'
              className='input w-full max-w-sm'
            />
            <datalist id='names'>
              {names.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </datalist>
          </label>
        </div>

        <div className='form-control items-center justify-center w-full max-w-xs flex-1 md:basis-1/3'>
          <label className='input-group'>
            <span className='bg-neutral text-neutral-content'>Year</span>
            <input
              type='number'
              value={year || undefined}
              onChange={e => setYear(e.target.valueAsNumber)}
              list='years'
              className='input w-full'
              // placeholder='Year'
              min={years[0]}
              max={years[years.length - 1]}
            />
            <datalist id='years'>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </datalist>
          </label>
        </div>

        <RadioGroup
          value={status}
          onChange={setStatus}
          name='status'
          className='w-full max-w-sm flex flex-col items-start justify-center gap-3 md:basis-1/3'
        >
          <RadioGroup.Label className='label-text'>Launch Status</RadioGroup.Label>
          <div className='form-control items-center justify-center flex-row'>
            {showStatus.map(status => (
              <RadioGroup.Option
                key={status}
                value={status}
                className='form-control justify-center w-full'
              >
                {({ checked }) => (
                  <RadioGroup.Label className='label justify-center gap-1 cursor-pointer'>
                    <span className='label-text capitalize'>{status}</span>
                    <input
                      type='radio'
                      name='status'
                      aria-checked={checked}
                      className={cn("radio", {
                        "radio-success": checked && status === "success",
                        "radio-error": checked && status === "failed",
                        "radio-secondary": checked && status === "all",
                        "radio-primary": checked && status === "upcoming",
                      })}
                    />
                  </RadioGroup.Label>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </form>

      <ol
        role='list'
        aria-label='Launches'
        className={cn(
          "overflow-hidden",
          "group w-full grow overflow-x-hidden overflow-y-auto list-none",
          "grid grid-cols-[repeat(auto-fit,minmax(35ch,1fr))] gap-6 auto-rows-max"
        )}
      >
        <LayoutGroup id='launches'>
          <AnimatePresence>
            {shownLaunches.map((launch, i) => (
              <LaunchCard key={launch.id} index={i} {...launch} />
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </ol>
    </div>
  )
}

/*
{shownLaunches.map((launch, i) => (
  <motion.li
    key={launch.id}
    role='listitem'
    initial={{ opacity: 0.25 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0.25 }}
    layout
  >
    <LaunchCard index={i} {...launch} />
  </motion.li>
))}
*/

/*
{shownLaunches.map((launch, i) => (
  <LaunchCard key={launch.id} index={i} {...launch} />
))}

{shownLaunches.map((launch, i) => (
  <li key={launch.id}>
    <Card
      title={launch.name}
      image={launch.links.patch.small ?? launch.links.patch.large}
      className={cn({
        "border-4 border-error":
          !launch.success && !isFuture(launch.date_utc),
        "border-4 border-success":
          launch.success && !isFuture(launch.date_utc),
        "border-4 border-primary": isFuture(launch.date_utc),
      })}
    >
      <dl className='w-full self-start justify-self-start block font-semibold text-base'>
        <div className='w-full flex gap-2'>
          <dt className='launch-stat-term'>Date</dt>
          <dd className='flex-1'>
            {formatDate(launch.date_utc, {
              month: "long",
              year: "numeric",
              day: "numeric",
            })}
          </dd>
        </div>
      </dl>

      {launch.details ? (
        <p className='w-fit line-clamp-6'>{launch.details}</p>
      ) : null}
    </Card>
  </li>
))}
*/

export default Launches
