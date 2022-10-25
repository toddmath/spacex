import type { FC } from "react"
import { useMemo, useState, Fragment } from "react"
import { RadioGroup, Combobox } from "@headlessui/react"
import cn from "classnames"

import { isLaunchSuccess, type LaunchData } from "lib/launches"
import useSearch from "lib/useQuery"
import { getYear, isFuture } from "lib/date"
import LaunchCard from "./LaunchCard"
import { Launch } from "types/launches"
import { CheckIcon } from "@heroicons/react/20/solid"
// import useLaunchForm from "lib/useLaunchForm"

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
  // const { shownLaunches, years, onChangeYear, minYear, maxYear, year, names, query, onChangeName, status, setStatus } = useLaunchForm(data)
  const [year, setYear] = useState<number>()
  const [status, setStatus] = useState<typeof showStatus[number]>("all")
  const { query, onChange } = useSearch()
  // const [selectedLaunch, setSelectedLaunch] = useState<Launch>()

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
    <div className='mx-auto container lg:max-w-6xl flex flex-col gap-8'>
      <form className='w-full flex gap-4 flex-wrap rounded-box'>
        <div className='form-control w-full max-w-sm'>
          {/* <Combobox value={selectedLaunch} onChange={setSelectedLaunch}>
            <Combobox.Input
              onChange={onChange}
              displayValue={(launch: Launch) => launch?.name}
            />
            <Combobox.Options>
              {shownLaunches.map(launch => (
                <Combobox.Option key={launch.id} value={launch} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={cn({
                        "bg-primary text-primary-content": active,
                        "bg-base-100 text-base-content": !active,
                      })}
                    >
                      {selected && <CheckIcon />}
                      {launch.name}
                    </li>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox> */}

          <label className='label'>
            <span className='label-text'>Search by name</span>
          </label>
          <input
            value={query}
            onChange={onChange}
            type='search'
            list='names'
            autoComplete='on'
            className='input input-bordered input-primary w-full max-w-sm'
            placeholder='Name'
          />
          <datalist id='names'>
            {names.map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </datalist>
        </div>

        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Search by year</span>
          </label>
          <input
            type='number'
            value={year || undefined}
            onChange={e => setYear(e.target.valueAsNumber)}
            list='years'
            className='input input-bordered input-primary w-full'
            placeholder='Year'
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
        </div>

        <RadioGroup
          value={status}
          onChange={setStatus}
          name='status'
          className='w-full max-w-xs rounded-box flex flex-col items-start justify-center gap-3'
        >
          <RadioGroup.Label className='label-text'>Launch Status</RadioGroup.Label>
          <div className='form-control flex-row items-end justify-center'>
            {showStatus.map(status => (
              <RadioGroup.Option
                key={status}
                value={status}
                className='form-control justify-center w-full'
              >
                {({ checked }) => (
                  <RadioGroup.Label
                    className={cn("label justify-center gap-1 cursor-pointer")}
                  >
                    <span className='label-text capitalize'>{status}</span>
                    <input
                      type='radio'
                      name='status'
                      aria-checked={checked}
                      className={cn("radio radio-primary")}
                    />
                  </RadioGroup.Label>
                )}
              </RadioGroup.Option>
            ))}

            {/* <RadioGroup.Option
              value='all'
              className='form-control justify-center w-full'
              defaultChecked
            >
              {({ checked }) => (
                <RadioGroup.Label
                  className={cn("label justify-center gap-1 cursor-pointer")}
                >
                  <span className='label-text'>All</span>
                  <input
                    type='radio'
                    name='status'
                    aria-checked={checked}
                    className={cn("radio radio-primary")}
                  />
                </RadioGroup.Label>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option
              value='success'
              className='form-control justify-center w-full'
            >
              {({ checked }) => (
                <RadioGroup.Label
                  className={cn("label justify-center gap-1 cursor-pointer")}
                >
                  <span className='label-text'>Success</span>
                  <input
                    type='radio'
                    name='status'
                    aria-checked={checked}
                    className={cn("radio radio-primary")}
                  />
                </RadioGroup.Label>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option
              value='failed'
              className='form-control justify-center w-full'
            >
              {({ checked }) => (
                <RadioGroup.Label
                  className={cn("label justify-center gap-1 cursor-pointer")}
                >
                  <span className='label-text'>Failure</span>
                  <input
                    type='radio'
                    name='status'
                    aria-checked={checked}
                    className={cn("radio radio-primary")}
                  />
                </RadioGroup.Label>
              )}
            </RadioGroup.Option> */}
          </div>
        </RadioGroup>
      </form>

      <ol
        aria-label='Launches'
        className='group w-full h-full snap-mandatory snap-y grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
      >
        {shownLaunches.map((launch, i) => (
          <LaunchCard key={launch.id} index={i} {...launch} />
        ))}
      </ol>
    </div>
  )
}

export default Launches
