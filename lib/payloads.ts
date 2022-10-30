import type { QueryFunction } from "@tanstack/react-query"
import type { Payloads as IPayloads, Payload as IPayload } from "types/payloads"
import { useQuery } from "@tanstack/react-query"
import { SlimPayload } from "pages/payloads"

const allPayloadsKey = ["payloads"] as const

export const payloadKeys = {
  all: allPayloadsKey,
  slim: [...allPayloadsKey, "slim"] as const,
} as const

export const selectSlimPayload = (data: IPayloads): SlimPayload[] =>
  data.map(({ norad_ids, launch, dragon, ...rest }) => rest as SlimPayload)

export const getPayloads: QueryFunction<IPayloads> = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/payloads")
  if (!res.ok) throw new Error("cannot get payload data")
  const data: IPayloads = await res.json()
  return data
}

export const getSlimPayloads: QueryFunction<SlimPayload[]> = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/payloads")
  if (!res.ok) throw new Error("cannot get payload data")
  const data: IPayloads = await res.json()
  return selectSlimPayload(data)
}

export const useSlimPayloadsQuery = () =>
  useQuery(payloadKeys.slim, getSlimPayloads, {
    notifyOnChangeProps: ["isSuccess", "isLoading", "data"],
  })

export const usePayloadsQuery = <T>(select?: (data: IPayloads) => T) =>
  useQuery(payloadKeys.all, getPayloads, {
    notifyOnChangeProps: ["isSuccess", "isLoading", "data"],
    select,
  })