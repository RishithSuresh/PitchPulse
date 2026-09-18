export interface Player {
  id: string
  name: string
  skillRating?: number | null
  preferredPosition?: string | null
}

export interface Team {
  id: string
  name: string
  players: Player[]
}

export type DistributionMode = 'auto' | 'custom'

export interface GeneratedResult {
  teams: Team[]
  unassigned: Player[]
}