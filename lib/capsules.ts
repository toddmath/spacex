import type { QueryFunction } from "@tanstack/react-query";
import type { Capsules as ICapsules } from "types/capsules";
import { SPACEX_API_URL } from "./constants";

export const allCapsulesKey = ["capsules"] as const;

export const capsulesKeys = {
  all: allCapsulesKey,
} as const;

export const getCapsules: QueryFunction<ICapsules> = async () => {
  try {
    const res = await fetch(`${SPACEX_API_URL}/capsules`);
    if (!res.ok) {
      return [];
    }
    const data: ICapsules = await res.json();
    return data;
  } catch {
    return [];
  }
};
