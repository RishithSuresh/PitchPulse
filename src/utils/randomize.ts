import type { DistributionMode, GeneratedResult, Player, Team, TeamBalanceMode } from '../types'

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
  teamNames: string[] = [], random: () => number = Math.random, balanceMode: TeamBalanceMode = 'random',
): GeneratedResult {
  if (!Number.isInteger(teamCount) || teamCount < 2) throw new Error('Choose at least 2 teams.')
  if (players.length < teamCount) throw new Error(`You need at least ${teamCount} players to create ${teamCount} teams.`)
  if (mode === 'custom' && (!Number.isInteger(playersPerTeam) || (playersPerTeam ?? 0) < 1)) throw new Error('Enter a valid number of players per team.')
  const shuffled = balanceMode === 'quality'
    ? shuffle(players, random).sort((left, right) => right.quality - left.quality)
    : shuffle(players, random)
  const sizes = mode === 'auto'
    ? Array.from({ length: teamCount }, (_, index) => Math.floor(players.length / teamCount) + (index < players.length % teamCount ? 1 : 0))
    : Array.from({ length: teamCount }, () => playersPerTeam as number)
  const teams: Team[] = sizes.map((_, index) => ({ id: `team-${index + 1}`, name: teamNames[index]?.trim() || `Team ${index + 1}`, players: [] }))
  if (balanceMode === 'quality') {
    const capacity = sizes.reduce((total, size) => total + size, 0)
    shuffled.slice(0, capacity).forEach((player) => {
      const eligible = teams.filter((team, index) => team.players.length < sizes[index])
      const score = (team: Team) => team.players.reduce((total, item) => total + (item.quality ?? 3), 0)
      const weakestScore = Math.min(...eligible.map(score))
      const weakest = eligible.filter((team) => score(team) === weakestScore)
      const target = weakest[Math.floor(random() * weakest.length)]
      target.players.push(player)
    })
    return { teams, unassigned: shuffled.slice(capacity) }
  }
  let cursor = 0
  teams.forEach((team, index) => { team.players = shuffled.slice(cursor, cursor + sizes[index]); cursor += team.players.length })
  return { teams, unassigned: shuffled.slice(cursor) }
}