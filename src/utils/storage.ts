import type { GeneratedResult, Player, TeamBalanceMode } from '../types'

const STORAGE_KEY = 'kicksplit-state'
const HISTORY_KEY = 'kicksplit-history'
export interface StoredState { players: Player[]; teamCount: number; mode: 'auto' | 'custom'; playersPerTeam: number; teamNames: string[]; balanceMode?: TeamBalanceMode; matchName?: string; matchDate?: string; captainMode?: 'none' | 'before' | 'after' | 'random'; captainId?: string; timerMinutes?: number }
export interface MatchHistory { id: string; name: string; date: string; playerCount: number; teamCount: number; result: GeneratedResult; players: Player[] }
export function loadState(): StoredState | null { try { const stored = localStorage.getItem(STORAGE_KEY); return stored ? JSON.parse(stored) as StoredState : null } catch { return null } }
export function saveState(state: StoredState) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }
export function clearState() { localStorage.removeItem(STORAGE_KEY) }
export function loadHistory(): MatchHistory[] { try { const stored = localStorage.getItem(HISTORY_KEY); return stored ? JSON.parse(stored) as MatchHistory[] : [] } catch { return [] } }
export function saveHistory(entry: MatchHistory) { const history = [entry, ...loadHistory().filter((item) => item.id !== entry.id)].slice(0, 12); localStorage.setItem(HISTORY_KEY, JSON.stringify(history)) }
export function removeHistory(id: string) { localStorage.setItem(HISTORY_KEY, JSON.stringify(loadHistory().filter((item) => item.id !== id))) }
export function clearHistory() { localStorage.removeItem(HISTORY_KEY) }