import type { FC } from "react"
import type { ImageProps } from "next/image"
import { FiExternalLink } from "react-icons/fi"

import type { Ship } from "types/ships"
import Card from "./Card"
import { is } from "lib/utils"

type ShipCardProps = {
  ship: Ship
  cardKey: string
  wrapperClassName?: string
  imageProps?: Partial<ImageProps>
}

const ShipCard: FC<ShipCardProps> = ({
  ship,
  cardKey,
  wrapperClassName,
  imageProps = {
    fill: true,
    sizes: "50vw",
    loading: "lazy",
    decoding: "async",
  },
}) => {
  const specs = (Object.entries(ship) as Array<[keyof Ship, Ship[keyof Ship]]>)
    .filter(([k, v]) => {
      if (
        v == null ||
        k === "id" ||
        k === "name" ||
        k === "legacy_id" ||
        k === "link" ||
        k === "launches" ||
        k === "image" ||
        k === "imo" ||
        k === "mmsi" ||
        k === "abs" ||
        k === "status" ||
        k === "class"
      ) {
        return false
      }
      return is.array(v) ? v.length > 0 : true
    })
    .map(([k, v]) => {
      const value = is.boolean(v)
        ? v
          ? "True"
          : "False"
        : is.array(v)
        ? v.join(", ")
        : v?.toString() ?? ""
      return [k.replaceAll("_", " "), value.replaceAll("-", " ")] as const
    })

  return (
    <Card
      key={cardKey}
      title={ship.name}
      image={ship.image ?? undefined}
      wrapperClassName={wrapperClassName}
      imageProps={imageProps}
      className='@xs/wrapper:[aspect-ratio:3/4] @sm/wrapper:[aspect-ratio:2/3] @md/wrapper:[aspect-ratio:1/1] @lg/wrapper:[aspect-ratio:3/2]'
      imageClassName='object-center'
    >
      <ul className='flex justify-center flex-wrap gap-x-2 gap-y-3 my-4'>
        {specs.map(([k, v]) => (
          <li
            key={`${ship.name}-${k}`}
            className='badge badge-secondary badge-lg gap-1 capitalize'
          >
            {k}: {v}
          </li>
        ))}
      </ul>

      {ship.link ? (
        <div className='card-actions mt-auto justify-end'>
          <a
            href={ship.link}
            target='_blank'
            rel='noreferrer'
            className='btn btn-secondary btn-circle'
          >
            <FiExternalLink title='external link' className='w-5 h-5' />
          </a>
        </div>
      ) : null}
    </Card>
  )
}

export default ShipCard

/*
<Stats
  data={specs.map(
    ([k, v]) =>
      ({
        title: k,
        value: v,
      } as Stat)
  )}
  className='w-min stats-vertical mx-auto'
/>
*/
