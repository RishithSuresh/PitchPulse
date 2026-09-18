import type { DistributionMode, GeneratedResult, Player, Team } from '../types'

export function shuffle<T>(items: T[], random: () => number = Math.random): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

export function generateTeams(
  players: Player[], teamCount: number, mode: DistributionMode, playersPerTeam?: number,
  teamNames: string[] = [], random: () => number = Math.random,
): GeneratedResult {
  if (!Number.isInteger(teamCount) || teamCount < 2) throw new Error('Choose at least 2 teams.')
  if (players.length < teamCount) throw new Error(`You need at least ${teamCount} players to create ${teamCount} teams.`)
  if (mode === 'custom' && (!Number.isInteger(playersPerTeam) || (playersPerTeam ?? 0) < 1)) throw new Error('Enter a valid number of players per team.')
  const shuffled = shuffle(players, random)
  const sizes = mode === 'auto'
    ? Array.from({ length: teamCount }, (_, index) => Math.floor(players.length / teamCount) + (index < players.length % teamCount ? 1 : 0))
    : Array.from({ length: teamCount }, () => playersPerTeam as number)
  let cursor = 0
  const teams: Team[] = sizes.map((size, index) => { const team = { id: `team-${index + 1}`, name: teamNames[index]?.trim() || `Team ${index + 1}`, players: shuffled.slice(cursor, cursor + size) }; cursor += team.players.length; return team })
  return { teams, unassigned: shuffled.slice(cursor) }
}