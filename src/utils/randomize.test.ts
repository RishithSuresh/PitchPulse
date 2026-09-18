import { describe, expect, it } from 'vitest'
import { generateTeams } from './randomize'
import type { Player } from '../types'

const players = (count: number): Player[] => Array.from({ length: count }, (_, index) => ({ id: String(index), name: `Player ${index}` }))

it.each([[10, 2], [11, 2], [17, 2], [20, 3], [21, 3], [22, 4]])('auto balances %i players across %i teams', (count, teamCount) => {
  const result = generateTeams(players(count), teamCount, 'auto', undefined, [], () => 0.5)
  const sizes = result.teams.map((team) => team.players.length)
  expect(Math.max(...sizes) - Math.min(...sizes)).toBeLessThanOrEqual(1)
  expect(result.unassigned).toHaveLength(0)
  expect(new Set(result.teams.flatMap((team) => team.players.map((player) => player.id))).size).toBe(count)
})

describe('custom team sizes', () => {
  it('returns unassigned players instead of silently dropping them', () => {
    const result = generateTeams(players(18), 2, 'custom', 7, [], () => 0.5)
    expect(result.teams.map((team) => team.players)).toHaveLength(2)
    expect(result.teams.every((team) => team.players).valueOf()).toBeTruthy()
    expect(result.unassigned).toHaveLength(4)
  })

  it('uses custom names and preserves every assigned player exactly once', () => {
    const result = generateTeams(players(10), 2, 'custom', 5, ['Red', 'Blue'], () => 0)
    expect(result.teams.map((team) => team.name)).toEqual(['Red', 'Blue'])
    expect(result.teams.flatMap((team) => team.players)).toHaveLength(10)
  })
})

it('rejects too few players', () => {
  expect(() => generateTeams(players(3), 5, 'auto')).toThrow('You need at least 5 players')
})
