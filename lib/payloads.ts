import type { QueryFunction } from "@tanstack/react-query"
import type { Payloads as IPayloads, Payload as IPayload } from "types/payloads"

const allPayloadsKey = ["payloads"] as const

export const payloadKeys = {
  all: allPayloadsKey,
} as const

export const getPayloads: QueryFunction<IPayloads> = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/payloads")
  if (!res.ok) throw new Error("cannot get payload data")
  const data: IPayloads = await res.json()
  return data
}
