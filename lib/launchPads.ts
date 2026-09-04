import type { QueryFunction } from "@tanstack/react-query";
import type { LaunchPads as ILaunchPads } from "types/launch-pads";
import { SPACEX_API_URL } from "./constants";

const allLaunchPadsKey = ["launchPads"] as const;

export const launchPadKeys = {
  all: allLaunchPadsKey,
} as const;

export const getAllLaunchPads: QueryFunction<ILaunchPads> = async () => {
  try {
    const res = await fetch(`${SPACEX_API_URL}/launchpads`);
    if (!res.ok) {
      return [];
    }
    const data: ILaunchPads = await res.json();
    return data;
  } catch {
    return [];
  }
};
