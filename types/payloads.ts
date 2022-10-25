export type Payloads = Payload[]

export interface Payload {
  dragon: Dragon
  name: string
  type: Type
  reused: boolean
  launch: string
  customers: string[]
  norad_ids: number[]
  nationalities: string[]
  manufacturers: string[]
  mass_kg: number | null
  mass_lbs: number | null
  orbit: Orbit | null
  reference_system: ReferenceSystem | null
  regime: Regime | null
  longitude: number | null
  semi_major_axis_km: number | null
  eccentricity: number | null
  periapsis_km: number | null
  apoapsis_km: number | null
  inclination_deg: number | null
  period_min: number | null
  lifespan_years: number | null
  epoch: Date | null
  mean_motion: number | null
  raan: number | null
  arg_of_pericenter: number | null
  mean_anomaly: number | null
  id: string
}

// export type PayloadKeys = keyof Payload

export interface Dragon {
  capsule: null | string
  mass_returned_kg: number | null
  mass_returned_lbs: number | null
  flight_time_sec: number | null
  manifest: null | string
  water_landing: boolean | null
  land_landing: boolean | null
}

export enum Orbit {
  Beo = "BEO",
  EsL1 = "ES-L1",
  Geo = "GEO",
  Gto = "GTO",
  Hco = "HCO",
  Heo = "HEO",
  Iss = "ISS",
  Leo = "LEO",
  Meo = "MEO",
  Po = "PO",
  So = "SO",
  Sso = "SSO",
  Tli = "TLI",
  Vleo = "VLEO",
}

export enum ReferenceSystem {
  Geocentric = "geocentric",
  Heliocentric = "heliocentric",
  HighlyElliptical = "highly-elliptical",
  TransLunarInjection = "trans-lunar-injection",
}

export enum Regime {
  BeyondEarth = "beyond-earth",
  Geostationary = "geostationary",
  Geosynchronous = "geosynchronous",
  HighEarth = "high-earth",
  HighlyElliptical = "highly-elliptical",
  L1Point = "L1-point",
  LowEarth = "low-earth",
  Lunar = "lunar",
  MediumEarth = "medium-earth",
  Polar = "polar",
  SemiSynchronous = "semi-synchronous",
  SubOrbital = "sub-orbital",
  SunSynchronous = "sun-synchronous",
  VeryLowEarth = "very-low-earth",
}

export enum Type {
  CrewDragon = "Crew Dragon",
  Dragon10 = "Dragon 1.0",
  Dragon11 = "Dragon 1.1",
  Dragon20 = "Dragon 2.0",
  DragonBoilerplate = "Dragon Boilerplate",
  Lander = "Lander",
  Satellite = "Satellite",
}
