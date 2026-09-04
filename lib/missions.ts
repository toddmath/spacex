import { useQuery, type QueryFunction } from "@tanstack/react-query";
import type {
  Missions as IMissions,
  Mission as IMission,
} from "types/missions";
import { SPACEX_API_URL } from "./constants";

const allMissionsKey = ["missions"] as const;

export const missionsKeys = {
  all: allMissionsKey,
  mission: (id: string) => [...allMissionsKey, id] as const,
} as const;

type RawMission = Partial<IMission> & {
  id?: string;
  name?: string;
};

const mapMission = (mission: RawMission): IMission => ({
  mission_id: mission.mission_id ?? mission.id ?? "",
  mission_name: mission.mission_name ?? mission.name ?? "Unknown Mission",
  manufacturers: mission.manufacturers ?? [],
  payload_ids: mission.payload_ids ?? [],
  wikipedia: mission.wikipedia ?? "",
  website: mission.website ?? "",
  twitter: mission.twitter ?? null,
  description: mission.description ?? "",
});

export const getMissions = async (): Promise<IMissions> => {
  try {
    const res = await fetch(`${SPACEX_API_URL}/missions`);
    if (!res.ok) return [];
    const data: RawMission[] = await res.json();
    return (data || []).map(mapMission);
  } catch {
    return [];
  }
};

export const getMission: QueryFunction<
  IMission,
  ReturnType<(typeof missionsKeys)["mission"]>
> = async (ctx) => {
  const [, id] = ctx.queryKey;
  try {
    const res = await fetch(`${SPACEX_API_URL}/missions/${id}`);
    if (res.ok) {
      const data: IMission = await res.json();
      return data;
    }
  } catch {}
  const all = await getMissions();
  const found = all.find(
    (m) =>
      m.mission_id === id ||
      m.mission_name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id,
  );
  if (found) return found;
  throw new Error(`Failed to fetch mission (id: ${id})`);
};

export const useMissionsQuery = () =>
  useQuery({
    queryKey: missionsKeys.all,
    queryFn: getMissions,
    notifyOnChangeProps: ["data", "isLoading"],
  });
