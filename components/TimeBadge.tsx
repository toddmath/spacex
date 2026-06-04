import type { PropsWithoutRef, ComponentProps, FC } from "react";
import cn from "classnames";

import { formatDate } from "lib/date";

type TimeBadgeProps = PropsWithoutRef<ComponentProps<"time">> & {
  className?: string;
  time: string;
  success: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const TimeBadge: FC<TimeBadgeProps> = ({
  className,
  time,
  success,
  size = "lg",
  ...props
}) => (
  <time
    dateTime={time}
    className={cn(
      // "rounded-lg font-semibold",
      "badge",
      {
        "badge-success": success,
        "badge-error": !success,
        "badge-xs": size === "xs",
        "badge-sm": size === "sm",
        "badge-md": size === "md",
        "badge-lg": size === "lg",
        "badge-xl": size === "xl",
        // "w-fit px-2 py-1 text-sm leading-tight": size === "sm",
        // "w-fit p-2 text-base leading-snug": size == "md",
        // "w-fit px-4 py-2 text-base": size == "lg",
        // "bg-emerald-500 dark:bg-emerald-300 text-emarld-100 dark:text-emerald-900":
        //   success,
        // "bg-orange-500 dark:bg-orange-300 text-orange-100 dark:text-orange-900":
        //   !success,
      },
      className
    )}
    {...props}
  >
    {formatDate(time)}
  </time>
);

export default TimeBadge;

/*
className={cn(
  "rounded-lg font-semibold",
  {
    "px-2 py-1 w-fit text-sm leading-tight": size === "sm",
    "p-2 w-fit text-base leading-snug": size == "md",
    "px-4 py-2 w-fit text-base": size == "lg",
    "bg-emerald-500 dark:bg-emerald-300 text-emarld-100 dark:text-emerald-900":
      success,
    "bg-orange-500 dark:bg-orange-300 text-orange-100 dark:text-orange-900":
      !success,
  },
  className
)}
*/
