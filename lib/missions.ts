import { useQuery, type QueryFunction, type QueryFunctionContext } from "@tanstack/react-query";
import type {
  Missions as IMissions,
  Mission as IMission,
} from "types/missions";
import { SPACEX_API_URL } from "./constants";

const allMissionsKey = ["missions"] as const

export const missionsKeys = {
  all: allMissionsKey,
  mission: (id: string) => [...allMissionsKey, id] as const,
} as const

export const getMissions = async (
  _ctx?: QueryFunctionContext,
): Promise<IMissions> => {
  try {
    const res = await fetch(`${SPACEX_API_URL}/missions`);
    if (!res.ok) return [];
    const data: IMissions = await res.json();
    return data;
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
  const all = await getMissions(ctx as unknown as Parameters<typeof getMissions>[0]);
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
  })
