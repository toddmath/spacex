import type { QueryFunction } from "@tanstack/react-query";
import type { Ships as IShips } from "types/ships";

const allShipKey = ["ships"] as const;

export const shipKeys = {
  all: allShipKey,
} as const;

export const getAllShips: QueryFunction<IShips> = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/ships");
  const data: IShips = await res.json();
  return data;
};
