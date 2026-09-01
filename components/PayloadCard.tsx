import type { FC } from "react";
import cn from "classnames";

import type { Payload as IPayload } from "types/payloads";
import { is } from "lib/utils";
import { SlimPayload } from "pages/payloads";
import Card from "components/Card";

type Key = keyof SlimPayload;

const filterStats = ([k, v]: [Key, unknown]): boolean => {
  if (v == null || k === "id" || k === "name") {
    return false;
  }
  return is.array(v) ? v.length > 0 : true;
};

const mapStats = ([k, v]: [Key, IPayload[Key]]) => {
  const value = is.boolean(v)
    ? v
      ? "Yes"
      : "No"
    : is.array(v)
      ? v.join(", ")
      : (v?.toString() ?? "");
  return [k.replaceAll("_", " "), value.replaceAll("-", " ")] as const;
};

type PayloadProps = { payload: SlimPayload };

const Payload: FC<PayloadProps> = ({ payload }) => {
  const specs = (Object.entries(payload) as Array<[Key, IPayload[Key]]>)
    .filter(filterStats)
    .map(mapStats);
  const nspecs = specs.length;

  return (
    <Card
      title={payload.name}
      wrapperClassName={cn("list-none w-full", {
        "row-span-1": nspecs >= 0 && nspecs <= 8,
        "row-span-2": nspecs > 8 && nspecs <= 14,
        "row-span-3": nspecs > 14 && nspecs <= 20,
        "row-span-4": nspecs > 20 && nspecs <= 26,
        "row-span-5": nspecs > 26 && nspecs <= 30,
        "row-span-6": nspecs > 30,
      })}
      className="w-full border-4 border-neutral bg-primary text-primary-content"
      containProps={{ contentVisibility: "auto" }}
    >
      <ul className="flex flex-col justify-center">
        {specs.map(([k, v]) => (
          <li
            key={`${payload.name}-${k}`}
            className="flex items-center justify-between gap-2 border-b border-neutral pt-2 leading-tight"
          >
            <strong className="text-sm capitalize">{k}:</strong>
            <span className="grow wrap-break-word text-primary-content">
              {v}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

// Payload.displayName = "PayloadCard";

export default Payload;
