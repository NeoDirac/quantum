'use client'

// Progreso del estudiante sobre los problemas del libro (persistente en localStorage).
// Por problema: resuelto (boolean), pistas usadas (hintsUsed), intentos (attempts)
// y el resultado del último intento comparado con la respuesta final.

import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'qm-book-problems-progress-v2'
const LEGACY_KEY = 'qm-book-problems-progress-v1'

export interface ProgressEntry {
  solved: boolean
  hintsUsed: number
  attempts: number
  lastOutcome?: 'match' | 'partial' | 'no'
  lastTriedAt?: number
}

type ProgressMap = Record<string, ProgressEntry>

let cache: ProgressMap | null = null
const listeners = new Set<() => void>()

function migrateLegacy(raw: string | null): ProgressMap | null {
  // v1 guardaba Record<problemId, boolean> bajo otra clave.
  if (!raw) return null
  try {
    const old = JSON.parse(raw) as Record<string, unknown>
    const next: ProgressMap = {}
    for (const [id, v] of Object.entries(old)) {
      if (typeof v === 'boolean') next[id] = { solved: v, hintsUsed: 0, attempts: 0 }
    }
    return next
  } catch {
    return null
  }
}

function read(): ProgressMap {
  if (cache) return cache
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as ProgressMap
      cache = {}
      for (const [id, v] of Object.entries(parsed ?? {})) {
        if (v && typeof v === 'object') {
          cache[id] = {
            solved: !!v.solved,
            hintsUsed: Number.isFinite(v.hintsUsed) ? v.hintsUsed : 0,
            attempts: Number.isFinite(v.attempts) ? v.attempts : 0,
            lastOutcome: v.lastOutcome,
            lastTriedAt: v.lastTriedAt,
          }
        }
      }
    } else {
      const migrated = migrateLegacy(localStorage.getItem(LEGACY_KEY))
      if (migrated) {
        cache = migrated
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
        localStorage.removeItem(LEGACY_KEY)
      } else {
        cache = {}
      }
    }
  } catch {
    cache = {}
  }
  return cache!
}

function write(next: ProgressMap) {
  cache = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // storage full/unavailable — keep in memory
  }
  listeners.forEach(l => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useBookProgress() {
  const progress = useSyncExternalStore(subscribe, read, () => ({}) as ProgressMap)

  const toggleSolved = useCallback((problemId: string) => {
    const current = read()
    const prev = current[problemId] ?? { solved: false, hintsUsed: 0, attempts: 0 }
    write({ ...current, [problemId]: { ...prev, solved: !prev.solved } })
  }, [])

  const setHintsUsed = useCallback((problemId: string, n: number) => {
    const current = read()
    const prev = current[problemId] ?? { solved: false, hintsUsed: 0, attempts: 0 }
    if (prev.hintsUsed === n) return
    write({ ...current, [problemId]: { ...prev, hintsUsed: n } })
  }, [])

  const recordAttempt = useCallback((problemId: string, outcome: 'match' | 'partial' | 'no') => {
    const current = read()
    const prev = current[problemId] ?? { solved: false, hintsUsed: 0, attempts: 0 }
    write({
      ...current,
      [problemId]: {
        ...prev,
        attempts: prev.attempts + 1,
        lastOutcome: outcome,
        lastTriedAt: Date.now(),
        solved: outcome === 'match' ? true : prev.solved,
      },
    })
  }, [])

  const isSolved = useCallback((problemId: string) => !!read()[problemId]?.solved, [])

  const solvedCount = Object.values(progress).filter(e => e?.solved).length

  const clearAll = useCallback(() => {
    write({})
    try {
      localStorage.removeItem(LEGACY_KEY)
    } catch {
      // ignore
    }
  }, [])

  return { progress, solvedCount, toggleSolved, isSolved, clearAll, setHintsUsed, recordAttempt }
}
