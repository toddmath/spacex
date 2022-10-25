import type { NextRequest } from "next/server"
import { createApi } from "unsplash-js"
import { json } from "lib/json"

export const config = {
  runtime: "experimental-edge",
}

export default async function handler(req: NextRequest) {
  try {
    const unsplash = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    })

    const res = await unsplash.users.getPhotos({
      username: "spacex",
    })

    if (res.errors) {
      return json(
        { error: "failed to get spacex user data from unsplash" },
        { status: 400 }
      )
    }
    const { total, results } = res.response

    return json(
      {
        total,
        results,
      },
      {
        headers: {
          "cache-control": "public, s-maxage=604800, stale-while-revalidate=86400",
        },
      }
    )
  } catch (error) {
    return json(
      { error: "failed to get spacex data from unsplash" },
      { status: 400 }
    )
  }
}
