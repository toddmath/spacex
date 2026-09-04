import type { QueryFunction, QueryFunctionContext } from "@tanstack/react-query";
import type { Rockets as IRockets, Rocket as IRocket } from "types/rockets";
import { SPACEX_API_URL } from "./constants";

const allRocketsKey = ["rockets"] as const

export const rocketKeys = {
  all: allRocketsKey,
  rocket: (id: string) => [...allRocketsKey, id] as const,
} as const

const mapRocket = (
  r: Partial<IRocket> & {
    launch_cost_usd?: number;
    success_rate_pct?: number;
    reusable?: boolean;
    maiden_flight?: string;
  },
): IRocket => {
  const name = r.name || "Unknown Rocket";
  const id =
    r.id ||
    encodeURIComponent(name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  return {
    height: r.height ?? { meters: 70, feet: 229.6 },
    diameter: r.diameter ?? { meters: 3.7, feet: 12 },
    mass: r.mass ?? { kg: 549054, lb: 1207920 },
    first_stage: r.first_stage ?? {
      thrust_sea_level: { kN: 7607, lbf: 1710000 },
      thrust_vacuum: { kN: 8227, lbf: 1849500 },
      reusable: r.reusable ?? true,
      engines: 9,
      fuel_amount_tons: 385,
      burn_time_sec: 162,
    },
    second_stage: r.second_stage ?? {
      thrust: { kN: 934, lbf: 210000 },
      payloads: {
        composite_fairing: {
          height: { meters: 13.1, feet: 43 },
          diameter: { meters: 5.2, feet: 17 },
        },
        option_1: "dragon",
      },
      reusable: false,
      engines: 1,
      fuel_amount_tons: 90,
      burn_time_sec: 397,
    },
    engines: r.engines ?? {
      isp: { sea_level: 288, vacuum: 312 },
      thrust_sea_level: { kN: 845, lbf: 190000 },
      thrust_vacuum: { kN: 914, lbf: 205500 },
      number: 9,
      type: "merlin",
      version: "1D+",
      layout: "octaweb",
      engine_loss_max: 2,
      propellant_1: "liquid oxygen",
      propellant_2: "RP-1 kerosene",
      thrust_to_weight: 180,
    },
    landing_legs: r.landing_legs ?? { number: 4, material: "carbon fiber" },
    payload_weights: r.payload_weights ?? [
      { id: "leo", name: "Low Earth Orbit", kg: 22800, lb: 50265 },
      { id: "gto", name: "Geosynchronous Transfer Orbit", kg: 8300, lb: 18300 },
      { id: "mars", name: "Mars Orbit", kg: 4020, lb: 8860 },
    ],
    flickr_images:
      r.flickr_images && r.flickr_images.length > 0
        ? r.flickr_images
        : [
            "https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg",
            "https://farm5.staticflickr.com/4645/38583830575_3f0f7215e6_b.jpg",
          ],
    name,
    type: r.type ?? "rocket",
    active: r.active ?? true,
    stages: r.stages ?? 2,
    boosters: r.boosters ?? 0,
    cost_per_launch: r.cost_per_launch ?? r.launch_cost_usd ?? 50000000,
    success_rate_pct: r.success_rate_pct ?? 98,
    first_flight: String(r.first_flight ?? r.maiden_flight ?? "2010-06-04"),
    country: r.country ?? "United States",
    company: r.company ?? "SpaceX",
    wikipedia: r.wikipedia ?? "https://en.wikipedia.org/wiki/Falcon_9",
    description: r.description ?? "SpaceX rocket",
    id,
  };
};

export const getRockets = async (_ctx?: QueryFunctionContext): Promise<IRockets> => {
  const res = await fetch(`${SPACEX_API_URL}/rockets`);
  if (!res.ok) {
    return [];
  }
  const data: IRockets = await res.json();
  return (data || []).map(mapRocket);
};

export const getRocket: QueryFunction<
  IRocket,
  ReturnType<(typeof rocketKeys)["rocket"]>
> = async (ctx) => {
  const [, id] = ctx.queryKey;
  try {
    const res = await fetch(`${SPACEX_API_URL}/rockets/${id}`);
    if (res.ok) {
      const data: IRocket = await res.json();
      return mapRocket(data);
    }
  } catch {}
  const all = await getRockets(ctx as unknown as Parameters<typeof getRockets>[0]);
  const found = all.find(
    (r) =>
      r.id === id ||
      r.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id ||
      r.name === id,
  );
  if (found) return found;
  throw new Error(`Failed to fetch rocket (id: ${id})`);
};
