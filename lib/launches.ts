import type { QueryFunction } from "@tanstack/react-query";
import type { Launches as ILaunches, Launch } from "types/launches";
import { SPACEX_API_URL } from "./constants";

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
>;

export type LaunchesData = LaunchData[];

const allLaunchesKey = ["launches"] as const;

export const launchesKeys = {
  all: allLaunchesKey,
  past: [...allLaunchesKey, "past"] as const,
  upcoming: [...allLaunchesKey, "upcoming"] as const,
  latest: [...allLaunchesKey, "latest"] as const,
  next: [...allLaunchesKey, "next"] as const,
  launch: (id: string) => [...allLaunchesKey, id] as const,
} as const;

export function isLaunchSuccess(launch: LaunchData): boolean {
  return launch.success ?? launch.failures.length === 0;
}

const mapLaunch = (x: Launch): LaunchData => {
  const name = x.name || "Unknown Launch";
  const id =
    x.id ||
    encodeURIComponent(name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  return {
    links: x.links ?? {
      patch: { small: null, large: null },
      reddit: { campaign: null, launch: null, media: null, recovery: null },
      flickr: { small: [], original: [] },
      presskit: null,
      webcast: null,
      youtube_id: null,
      article: null,
      wikipedia: null,
    },
    rocket: x.rocket ?? "",
    success:
      x.success ??
      (x as { status?: string }).status === "Launch Successful",
    failures: x.failures ?? [],
    details: x.details ?? null,
    capsules: x.capsules ?? [],
    payloads: x.payloads ?? [],
    launchpad: x.launchpad ?? "",
    name,
    date_utc: x.date_utc || new Date().toISOString(),
    date_local: x.date_local || x.date_utc || new Date().toISOString(),
    upcoming: x.upcoming ?? false,
    cores: x.cores ?? [],
    id,
  };
};

export const getPastLaunches: QueryFunction<LaunchesData> = async () => {
  const res = await fetch(`${SPACEX_API_URL}/launches/past`);
  if (!res.ok) return [];
  const data: ILaunches = await res.json();
  return (data || []).map(mapLaunch);
};

const fetchAllLaunches = async (): Promise<LaunchesData> => {
  const res = await fetch(`${SPACEX_API_URL}/launches`);
  if (!res.ok) return [];
  const data: ILaunches = await res.json();
  return (data || []).map(mapLaunch);
};

export const getAllLaunches: QueryFunction<LaunchesData> = async () =>
  fetchAllLaunches();

const fetchUpcomingLaunches = async (): Promise<LaunchesData> => {
  const res = await fetch(`${SPACEX_API_URL}/launches/upcoming`);
  if (!res.ok) return [];
  const data: ILaunches = await res.json();
  return (data || []).map(mapLaunch);
};

export const getUpcomingLaunches: QueryFunction<LaunchesData> = async () =>
  fetchUpcomingLaunches();

export const getLatestLaunches: QueryFunction<
  LaunchData,
  (typeof launchesKeys)["latest"]
> = async () => {
  const res = await fetch(`${SPACEX_API_URL}/launches/latest`);
  if (!res.ok) {
    const all = await fetchAllLaunches();
    if (all.length > 0) return all[0];
    throw new Error("Failed to fetch latest launch");
  }
  const data: Launch = await res.json();
  return mapLaunch(data);
};

export const getNextLaunches: QueryFunction<
  LaunchData,
  (typeof launchesKeys)["next"]
> = async () => {
  const res = await fetch(`${SPACEX_API_URL}/launches/next`);
  if (!res.ok) {
    const upcoming = await fetchUpcomingLaunches();
    if (upcoming.length > 0) return upcoming[0];
    throw new Error("Failed to fetch next launch");
  }
  const data: Launch = await res.json();
  return mapLaunch(data);
};

export const getLaunch: QueryFunction<
  LaunchData,
  ReturnType<(typeof launchesKeys)["launch"]>
> = async (ctx) => {
  const [, id] = ctx.queryKey;
  try {
    const res = await fetch(`${SPACEX_API_URL}/launches/${id}`);
    if (res.ok) {
      const data: Launch = await res.json();
      return mapLaunch(data);
    }
  } catch {}
  const all = await fetchAllLaunches();
  const found = all.find(
    (l) =>
      l.id === id ||
      l.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id ||
      l.name === id,
  );
  if (found) return found;
  throw new Error(`Failed to fetch launch (id: ${id})`);
};
