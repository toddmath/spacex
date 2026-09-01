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
      "badge",
      {
        "badge-success": success,
        "badge-error": !success,
        "badge-xs": size === "xs",
        "badge-sm": size === "sm",
        "badge-md": size === "md",
        "badge-lg": size === "lg",
        "badge-xl": size === "xl",
      },
      className,
    )}
    {...props}
  >
    {formatDate(time)}
  </time>
);

export default TimeBadge;
