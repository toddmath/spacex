import type { QueryFunction } from "@tanstack/react-query"
import type { Launches as ILaunches, Launch } from "types/launches"

export type LaunchData = Pick<
  Launch,
  | "links"
  | "rocket"
  | "success"
  | "failures"
  | "details"
  | "capsules"
  | "payloads"
  | "launchpad"
  | "name"
  | "date_utc"
  | "date_local"
  | "upcoming"
  | "cores"
  | "id"
>

export type LaunchesData = LaunchData[]

const allLaunchesKey = ["launches"] as const

export const launchesKeys = {
  all: allLaunchesKey,
  past: [...allLaunchesKey, "past"] as const,
  upcoming: [...allLaunchesKey, "upcoming"] as const,
  latest: [...allLaunchesKey, "latest"] as const,
  next: [...allLaunchesKey, "next"] as const,
  launch: (id: string) => [...allLaunchesKey, id] as const,
} as const

export function isLaunchSuccess(launch: LaunchData): boolean {
  return launch.success ?? launch.failures.length === 0
}

const mapLaunch = (x: Launch): LaunchData => ({
  links: x.links,
  rocket: x.rocket,
  success: x.success,
  failures: x.failures,
  details: x.details,
  capsules: x.capsules,
  payloads: x.payloads,
  launchpad: x.launchpad,
  name: x.name,
  date_utc: x.date_utc,
  date_local: x.date_local,
  upcoming: x.upcoming,
  cores: x.cores,
  id: x.id,
})

export const getPastLaunches: QueryFunction<LaunchesData> = async () => {
  const res = await fetch("https://api.spacexdata.com/v5/launches/past")
  const data = (await res.json()) as ILaunches
  return data.map(mapLaunch)
}

export const getAllLaunches: QueryFunction<LaunchesData> = async () => {
  const res = await fetch("https://api.spacexdata.com/v5/launches")
  const data = (await res.json()) as ILaunches
  return data.map(mapLaunch)
}

export const getUpcomingLaunches: QueryFunction<LaunchesData> = async () => {
  const res = await fetch("https://api.spacexdata.com/v5/launches/upcoming")
  const data = (await res.json()) as ILaunches
  return data.map(mapLaunch)
}

export const getLatestLaunches: QueryFunction<
  Launch,
  (typeof launchesKeys)["latest"]
> = async () => {
  const res = await fetch("https://api.spacexdata.com/v5/launches/latest")
  const data = (await res.json()) as Launch
  return data
}

export const getNextLaunches: QueryFunction<
  Launch,
  (typeof launchesKeys)["next"]
> = async () => {
  const res = await fetch("https://api.spacexdata.com/v5/launches/next")
  const data = (await res.json()) as Launch
  return data
}

export const getLaunch: QueryFunction<
  Launch,
  ReturnType<(typeof launchesKeys)["launch"]>
> = async ({ queryKey }) => {
  const [, id] = queryKey
  const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`)
  if (!res.ok) {
    throw new Error(
      `Failed to fetch launch (id: ${id}), received status ${res.status}`
    )
  }
  const data = (await res.json()) as Launch
  return data
}
