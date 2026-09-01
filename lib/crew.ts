import type { QueryFunction } from "@tanstack/react-query";
import type { Crew as ICrew } from "types/crew";

const allCrewKey = ["crew"] as const;

export const crewKeys = {
  all: allCrewKey,
} as const;

export const getAllCrew: QueryFunction<ICrew> = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/crew");
  const data: ICrew = await res.json();
  return data;
};
