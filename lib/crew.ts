import type { QueryFunction } from "@tanstack/react-query";
import type { Crew as ICrew, Member } from "types/crew";
import { SPACEX_API_URL } from "./constants";

const allCrewKey = ["crew"] as const

export const crewKeys = {
  all: allCrewKey,
} as const

const mapCrewMember = (m: Partial<Member> & { mission?: string }): Member => {
  const name = m.name || "Unknown";
  return {
    name,
    agency: m.agency || "NASA",
    image: m.image || "",
    wikipedia: m.wikipedia || "",
    launches: m.launches ?? (m.mission ? [m.mission] : []),
    status: m.status || "active",
    id: m.id || encodeURIComponent(name.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
  };
};

export const getAllCrew: QueryFunction<ICrew> = async () => {
  const res = await fetch(`${SPACEX_API_URL}/crew`);
  if (!res.ok) return [];
  const data: ICrew = await res.json();
  return (data || []).map(mapCrewMember);
};
