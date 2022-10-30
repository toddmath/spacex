import { useQuery, type QueryFunction } from "@tanstack/react-query"
import type { Missions as IMissions, Mission as IMission } from "types/missions"

const allMissionsKey = ["missions"] as const

export const missionsKeys = {
  all: allMissionsKey,
  mission: (id: string) => [...allMissionsKey, id] as const,
} as const

export const getMissions: QueryFunction<IMissions> = async () => {
  const res = await fetch("https://api.spacexdata.com/v3/missions")
  if (!res.ok) throw new Error("cannot get missions data")
  const data: IMissions = await res.json()
  return data
}

export const getMission: QueryFunction<
  IMission,
  ReturnType<typeof missionsKeys["mission"]>
> = async ({ queryKey }) => {
  const [_, id] = queryKey
  const res = await fetch(`https://api.spacexdata.com/v3/missions/${id}`)
  if (!res.ok) {
    throw new Error(
      `Failed to fetch mission (id: ${id}), received status ${res.status}`
    )
  }
  const data: IMission = await res.json()
  return data
}

export const useMissionsQuery = () =>
  useQuery<IMissions, Error>(missionsKeys.all, getMissions, {
    notifyOnChangeProps: ["data", "isSuccess", "isLoading"],
  })
