import type { FC } from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

export type Stat = {
  title: string;
  value: string | number | null;
  desc?: string;
};

type StatsProps = { data: Stat[]; className?: string };

// TODO: maybe see if this component would benefit from memo

const Stats: FC<StatsProps> = forwardRef<HTMLDivElement, StatsProps>(
  ({ data, className }, ref) => {
    return (
      <motion.div
        layout
        className={cn(className, "stats stats-horizontal shadow")}
        ref={ref}
      >
        {data
          .filter((stat) => stat.value !== null)
          .map((stat) => (
            <div key={stat.title} className="stat">
              <div className="stat-title">{stat.title}</div>
              <div className="stat-value wrap-break-word">{stat.value}</div>
              {stat.desc && (
                <div className="stat-desc capitalize">{stat.desc}</div>
              )}
            </div>
          ))}
      </motion.div>
    );
  },
);

Stats.displayName = "Stats";

export default Stats;
