import type { FC } from "react"
import { forwardRef } from "react"
import cn from "classnames"

export type Stat = {
  title: string
  value: string | number | null
  desc?: string
}

type StatsProps = { data: Stat[]; className?: string }

// TODO: maybe see if this component would benefit from memo

const Stats: FC<StatsProps> = forwardRef<HTMLDivElement, StatsProps>(
  ({ data, className }, ref) => {
    return (
      <div className={cn(className, "stats")} ref={ref}>
        {data
          .filter(stat => stat.value != null)
          .map(stat => (
            <div key={stat.title} className='stat'>
              <div className='stat-title'>{stat.title}</div>
              <div className='stat-value break-words'>{stat.value}</div>
              {stat.desc ? (
                <div className='stat-desc capitalize'>{stat.desc}</div>
              ) : null}
            </div>
          ))}
      </div>
    )
  }
)

Stats.displayName = "Stats"

export default Stats
