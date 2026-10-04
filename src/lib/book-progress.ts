'use client'

// Progreso del estudiante sobre los problemas del libro (persistente en localStorage).
// Por problema: resuelto (boolean), pistas usadas (hintsUsed), intentos (attempts),
// el resultado del último intento comparado con la respuesta final y los pasos de
// aplicación revelados por pista (appSteps: { [índicePista]: pasosMostrados }).

import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'qm-book-problems-progress-v2'
const LEGACY_KEY = 'qm-book-problems-progress-v1'

export interface ProgressEntry {
  solved: boolean
  hintsUsed: number
  attempts: number
  lastOutcome?: 'match' | 'partial' | 'no'
  lastTriedAt?: number
  /** Pasos de aplicación revelados, indexados por pista: { [índicePista]: pasos } */
  appSteps?: Record<number, number>
}

type ProgressMap = Record<string, ProgressEntry>

function sanitizeAppSteps(raw: unknown): Record<number, number> | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const out: Record<number, number> = {}
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    const i = Number(k)
    const n = Number(v)
    if (Number.isInteger(i) && i >= 0 && Number.isFinite(n) && n >= 0) out[i] = n
  }
  return Object.keys(out).length > 0 ? out : undefined
}

function sumAppSteps(e?: ProgressEntry): number {
  return Object.values(e?.appSteps ?? {}).reduce((a, b) => a + b, 0)
}

let cache: ProgressMap | null = null
const listeners = new Set<() => void>()

// Snapshot vacío ESTABLE: useSyncExternalStore exige que getServerSnapshot
// devuelva la MISMA referencia en cada llamada (un objeto nuevo por llamada
// provoca un bucle de hidratación infinito). Se usa durante SSR/hidratación.
const EMPTY_PROGRESS: ProgressMap = {}

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
            appSteps: sanitizeAppSteps(v.appSteps),
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
  const progress = useSyncExternalStore(subscribe, read, () => EMPTY_PROGRESS)

  const toggleSolved = useCallback((problemId: string) => {
    const current = read()
    const prev = current[problemId] ?? { solved: false, hintsUsed: 0, attempts: 0 }
    write({ ...current, [problemId]: { ...prev, solved: !prev.solved } })
  }, [])

  const setHintsUsed = useCallback((problemId: string, n: number) => {
    const current = read()
    const prev = current[problemId] ?? { solved: false, hintsUsed: 0, attempts: 0 }
    // Reiniciar la escalera (n = 0) también borra el progreso de los pasos de aplicación.
    if (n === 0) {
      if (prev.hintsUsed === 0 && !prev.appSteps) return
      write({ ...current, [problemId]: { ...prev, hintsUsed: 0, appSteps: undefined } })
      return
    }
    if (prev.hintsUsed === n) return
    write({ ...current, [problemId]: { ...prev, hintsUsed: n } })
  }, [])

  // Pasos de aplicación revelados de la pista hintIndex. Acepta valor absoluto o
  // función del valor previo (para «siguiente paso» sin depender del render).
  const setAppSteps = useCallback((problemId: string, hintIndex: number, n: number | ((prev: number) => number)) => {
    const current = read()
    const prev = current[problemId] ?? { solved: false, hintsUsed: 0, attempts: 0 }
    const target = Math.max(0, typeof n === 'function' ? n(prev.appSteps?.[hintIndex] ?? 0) : n)
    if ((prev.appSteps?.[hintIndex] ?? 0) === target) return
    const nextMap = { ...(prev.appSteps ?? {}), [hintIndex]: target }
    const allZero = Object.values(nextMap).every(v => v === 0)
    write({ ...current, [problemId]: { ...prev, appSteps: allZero ? undefined : nextMap } })
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
  const totalAppSteps = Object.values(progress).reduce((s, e) => s + (e ? sumAppSteps(e) : 0), 0)

  const clearAll = useCallback(() => {
    write({})
    try {
      localStorage.removeItem(LEGACY_KEY)
    } catch {
      // ignore
    }
  }, [])

  return { progress, solvedCount, toggleSolved, isSolved, clearAll, setHintsUsed, setAppSteps, recordAttempt, totalAppSteps }
}
