import type { QueryFunction } from "@tanstack/react-query"
import type { Capsules as ICapsules, Capsule as ICapsule } from "types/capsules"

export const allCapsulesKey = ["capsules"] as const

export const capsulesKeys = {
  all: allCapsulesKey,
} as const

export const getCapsules: QueryFunction<ICapsules> = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/capsules")
  if (!res.ok) {
    throw new Error(`Failed to fetch capsules, received status ${res.status}`)
  }
  const data: ICapsules = await res.json()
  return data
}
