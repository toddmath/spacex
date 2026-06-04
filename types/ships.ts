export interface Ship {
  last_ais_update: null
  legacy_id: null | string
  model: null | string
  type: ShipType
  roles: Role[]
  imo: number | null
  mmsi: number | null
  abs: number | null
  class: number | null
  mass_kg: number | null
  mass_lbs: number | null
  year_built: number | null
  home_port: HomePort
  status: null | string
  speed_kn: null
  course_deg: null
  latitude: number | null
  longitude: number | null
  link: null | string
  image: null | string
  name: string
  active: boolean
  launches: string[]
  id: string
}

export type Ships = Ship[]

export type HomePort = "Fort Lauderdale" | "Port Canaveral" | "Port of Los Angeles"

export type Role =
  | "ASDS barge"
  | "ASDS Tug"
  | "Barge Tug"
  | "Dragon Recovery"
  | "Fairing Recovery"
  | "Support Ship"

export type ShipType = "Barge" | "Cargo" | "High Speed Craft" | "Tug"

// export enum HomePort {
//   FortLauderdale = "Fort Lauderdale",
//   PortCanaveral = "Port Canaveral",
//   PortOfLosAngeles = "Port of Los Angeles",
// }

// export enum Role {
// ASDSBarge = "ASDS barge",
// ASDSTug = "ASDS Tug",
// BargeTug = "Barge Tug",
// DragonRecovery = "Dragon Recovery",
// FairingRecovery = "Fairing Recovery",
// SupportShip = "Support Ship",
// }

// export enum Type {
//   Barge = "Barge",
//   Cargo = "Cargo",
//   HighSpeedCraft = "High Speed Craft",
//   Tug = "Tug",
// }
