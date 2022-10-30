import type { FC } from "react"
import { memo } from "react"
import cn from "classnames"

import type { Payload as IPayload } from "types/payloads"
import { is } from "lib/utils"
import { SlimPayload } from "pages/payloads"

type Key = keyof SlimPayload

const filterStats = ([k, v]: [Key, unknown]): boolean => {
  if (v == null || k === "id" || k === "name") {
    return false
  }
  return is.array(v) ? v.length > 0 : true
}

const mapStats = ([k, v]: [Key, IPayload[Key]]) => {
  const value = is.boolean(v)
    ? v
      ? "Yes"
      : "No"
    : is.array(v)
    ? v.join(", ")
    : v?.toString() ?? ""
  return [k.replaceAll("_", " "), value.replaceAll("-", " ")] as const
}

// const nRows = (n: number) => {
//   if (n >= 0 && n <= 8) return 1
//   if (n > 8 && n <= 14) return 2
//   if (n > 14 && n <= 20) return 3
//   if (n > 20 && n <= 26) return 4
//   if (n > 26 && n <= 30) return 5
//   return 6
// }

type PayloadProps = { payload: SlimPayload }

const Payload: FC<PayloadProps> = memo(({ payload }) => {
  const { name } = payload
  const specs = (Object.entries(payload) as Array<[Key, IPayload[Key]]>)
    .filter(filterStats)
    .map(mapStats)
  const nspecs = specs.length

  return (
    <li
      aria-label={name}
      className={cn(
        "card card-bordered border-neutral border-4 bg-primary text-primary-content shadow-xl w-full",
        {
          "row-span-1": nspecs >= 0 && nspecs <= 8,
          "row-span-2": nspecs > 8 && nspecs <= 14,
          "row-span-3": nspecs > 14 && nspecs <= 20,
          "row-span-4": nspecs > 20 && nspecs <= 26,
          "row-span-5": nspecs > 26 && nspecs <= 30,
          "row-span-6": nspecs > 30,
        }
      )}
    >
      <div className='card-body w-full gap-4'>
        <header className='card-title flex-wrap text-center'>
          <h3 className='text-primary-content w-full'>{name}</h3>
        </header>

        <ul className='flex flex-col justify-center'>
          {specs.map(([k, v]) => (
            <li
              key={`${name} ${k}`}
              className='flex gap-2 justify-between border-neutral border-b pt-2 items-center'
            >
              <strong className='capitalize text-sm leading-tight'>{k}:</strong>
              <span className='flex-grow break-words leading-tight text-primary-content'>
                {v}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
})

Payload.displayName = "PayloadCard"

export default Payload
