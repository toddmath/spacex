import type { QueryFunction } from "@tanstack/react-query";
import type { Ships as IShips } from "types/ships";
import { SPACEX_API_URL } from "./constants";

const allShipKey = ["ships"] as const;

export const shipKeys = {
  all: allShipKey,
} as const;

export const getAllShips: QueryFunction<IShips> = async () => {
  try {
    const res = await fetch(`${SPACEX_API_URL}/ships`);
    if (!res.ok) return [];
    const data: IShips = await res.json();
    return data;
  } catch {
    return [];
  }
};
