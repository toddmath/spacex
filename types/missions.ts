export interface Mission {
  mission_name: string
  mission_id: string
  manufacturers: string[]
  payload_ids: string[]
  wikipedia: string
  website: string
  twitter: null | string
  description: string
}

export type Missions = Mission[]
