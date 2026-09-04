import type { Roadster as IRoadster } from "types/roadster";
import type { QueryFunction } from "@tanstack/react-query";
import { SPACEX_API_URL } from "./constants";

export const roadsterKey = ["roadster"] as const;

const defaultRoadster: IRoadster = {
  flickr_images: [
    "https://farm5.staticflickr.com/4615/28140808119_3e390c5c64_b.jpg",
    "https://farm5.staticflickr.com/4702/28140808759_5914562507_b.jpg",
  ],
  name: "Elon Musk's Tesla Roadster",
  launch_date_utc: "2018-02-06T20:45:00.000Z",
  launch_date_unix: 1517949900,
  launch_mass_kg: 1250,
  launch_mass_lbs: 2750,
  norad_id: 43205,
  epoch_jd: 2459000.5,
  orbit_type: "heliocentric",
  apoapsis_au: 1.664,
  periapsis_au: 0.986,
  semi_major_axis_au: 1.325,
  eccentricity: 0.256,
  inclination: 1.075,
  longitude: 317.09,
  periapsis_arg: 177.47,
  period_days: 557.2,
  speed_kph: 75000,
  speed_mph: 46600,
  earth_distance_km: 300000000,
  earth_distance_mi: 186000000,
  mars_distance_km: 150000000,
  mars_distance_mi: 93000000,
  wikipedia: "https://en.wikipedia.org/wiki/Elon_Musk%27s_Tesla_Roadster",
  video: "https://youtu.be/wbSwFU6tY1c",
  details:
    "Elon Musk's Tesla Roadster is an electric sports car that served as the dummy payload for the February 2018 Falcon Heavy test flight and became an artificial satellite of the Sun.",
  id: "5eb75f0842e88e603b18d228",
};

export const getRoadster: QueryFunction<IRoadster> = async () => {
  try {
    const res = await fetch(`${SPACEX_API_URL}/roadster`);
    if (!res.ok) {
      return defaultRoadster;
    }
    const data: IRoadster = await res.json();
    return { ...defaultRoadster, ...data };
  } catch {
    return defaultRoadster;
  }
};
