import type { QueryFunction } from "@tanstack/react-query";
import type { Payloads as IPayloads } from "types/payloads";
import { useQuery } from "@tanstack/react-query";
import { SlimPayload } from "pages/payloads";
import { SPACEX_API_URL } from "./constants";

const allPayloadsKey = ["payloads"] as const

export const payloadKeys = {
  all: allPayloadsKey,
  slim: [...allPayloadsKey, "slim"] as const,
} as const

/* eslint-disable @typescript-eslint/no-unused-vars */
export const selectSlimPayload = (data: IPayloads): SlimPayload[] => {
  return (data || []).map(
    ({ norad_ids, launch, dragon, ...rest }) => rest as SlimPayload,
  );
};
/* eslint-enable @typescript-eslint/no-unused-vars */

export const getPayloads: QueryFunction<IPayloads> = async () => {
  try {
    const res = await fetch(`${SPACEX_API_URL}/payloads`);
    if (!res.ok) return [];
    const data: IPayloads = await res.json();
    return data;
  } catch {
    return [];
  }
};

export const getSlimPayloads: QueryFunction<SlimPayload[]> = async () => {
  try {
    const res = await fetch(`${SPACEX_API_URL}/payloads`);
    if (!res.ok) return [];
    const data: IPayloads = await res.json();
    return selectSlimPayload(data);
  } catch {
    return [];
  }
};

export const useSlimPayloadsQuery = () =>
  useQuery({
    queryKey: payloadKeys.slim,
    queryFn: getSlimPayloads,
    notifyOnChangeProps: ["isSuccess", "isLoading", "data"],
  })

export const usePayloadsQuery = <T>(select?: (data: IPayloads) => T) =>
  useQuery({
    queryKey: payloadKeys.all,
    queryFn: getPayloads,
    notifyOnChangeProps: ["isSuccess", "isLoading", "data"],
    select,
  })
