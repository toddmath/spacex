import type { QueryFunction } from "@tanstack/react-query"
import type { Basic } from "unsplash-js/dist/methods/photos/types"

export const unsplashKey = ["unsplash"] as const

export const unsplashKeys = {
  spacex: [...unsplashKey, "spacex"] as const,
} as const

export type UnsplashSpacexResponse = {
  results: Basic[]
  total: number
}

export const getUnsplashSpacex: QueryFunction<UnsplashSpacexResponse> = async () => {
  const res = await fetch("/api/unsplash")
  const data: UnsplashSpacexResponse = await res.json()
  return data
}
