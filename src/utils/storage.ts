import type { Player, TeamBalanceMode } from '../types'

const STORAGE_KEY = 'kicksplit-state'
export interface StoredState { players: Player[]; teamCount: number; mode: 'auto' | 'custom'; playersPerTeam: number; teamNames: string[]; balanceMode?: TeamBalanceMode; matchName?: string; matchDate?: string; captainMode?: 'none' | 'before' | 'after' | 'random'; captainId?: string }
export function loadState(): StoredState | null { try { const stored = localStorage.getItem(STORAGE_KEY); return stored ? JSON.parse(stored) as StoredState : null } catch { return null } }
export function saveState(state: StoredState) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }
export function clearState() { localStorage.removeItem(STORAGE_KEY) }