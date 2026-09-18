export interface Player {
  id: string
  name: string
  rating: number
  quality?: 1 | 2 | 3 | 4 | 5
  skillRating?: number | null
  preferredPosition?: string | null
}

export interface Team {
  id: string
  name: string
  players: Player[]
}

export type DistributionMode = 'auto' | 'custom'
export type TeamBalanceMode = 'random' | 'quality'

export interface GeneratedResult {
  teams: Team[]
  unassigned: Player[]
}