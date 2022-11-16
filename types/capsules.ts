export type Capsules = Capsule[]

export interface Capsule {
  reuse_count: number
  water_landings: number
  land_landings: number
  last_update: null | string
  launches: string[]
  serial: string
  status: Status
  type: Type
  id: string
}

export enum Status {
  Active = "active",
  Destroyed = "destroyed",
  Retired = "retired",
  Unknown = "unknown",
}

export enum Type {
  Dragon10 = "Dragon 1.0",
  Dragon11 = "Dragon 1.1",
  Dragon20 = "Dragon 2.0",
}
