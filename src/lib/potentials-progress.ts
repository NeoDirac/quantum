'use client'

// Progreso del estudiante sobre los potenciales del libro (persistente en localStorage).
// Por potencial: pasos de la derivación guiada revelados (derivationSteps),
// pistas reveladas (hintsUsed), pasos de aplicación revelados por pista
// (appSteps: { [índicePista]: pasos }), preguntas de examen marcadas
// (questionsDone) y si se marcó como dominado (mastered).

import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'qm-potentials-progress-v1'

export interface PotentialProgressEntry {
  derivationSteps: number
  hintsUsed: number
  /** Pasos de aplicación revelados, indexados por pista: { [índicePista]: pasos } */
  appSteps?: Record<number, number>
  questionsDone?: string[]
  mastered?: boolean
  lastStudiedAt?: number
}

type ProgressMap = Record<string, PotentialProgressEntry>

const EMPTY_ENTRY: PotentialProgressEntry = { derivationSteps: 0, hintsUsed: 0 }

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

function sanitizeQuestions(raw: unknown): string[] | undefined {
  if (!Array.isArray(raw)) return undefined
  const out = raw.filter((v): v is string => typeof v === 'string')
  return out.length > 0 ? out : undefined
}

let cache: ProgressMap | null = null
const listeners = new Set<() => void>()

// Snapshot vacío ESTABLE para SSR/hidratación (misma referencia siempre).
const EMPTY_PROGRESS: ProgressMap = {}

function read(): ProgressMap {
  if (cache) return cache
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    cache = {}
    if (raw) {
      const parsed = JSON.parse(raw) as ProgressMap
      for (const [id, v] of Object.entries(parsed ?? {})) {
        if (v && typeof v === 'object') {
          cache[id] = {
            derivationSteps: Number.isFinite(v.derivationSteps) ? v.derivationSteps : 0,
            hintsUsed: Number.isFinite(v.hintsUsed) ? v.hintsUsed : 0,
            appSteps: sanitizeAppSteps(v.appSteps),
            questionsDone: sanitizeQuestions(v.questionsDone),
            mastered: !!v.mastered,
            lastStudiedAt: v.lastStudiedAt,
          }
        }
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

export function usePotentialsProgress() {
  const progress = useSyncExternalStore(subscribe, read, () => EMPTY_PROGRESS)

  const setDerivationSteps = useCallback((potentialId: string, n: number | ((prev: number) => number)) => {
    const current = read()
    const prev = current[potentialId] ?? EMPTY_ENTRY
    const target = Math.max(0, typeof n === 'function' ? n(prev.derivationSteps) : n)
    if (prev.derivationSteps === target) return
    write({ ...current, [potentialId]: { ...prev, derivationSteps: target, lastStudiedAt: Date.now() } })
  }, [])

  const setHintsUsed = useCallback((potentialId: string, n: number) => {
    const current = read()
    const prev = current[potentialId] ?? EMPTY_ENTRY
    // Reiniciar la escalera (n = 0) también borra los pasos de aplicación.
    if (n === 0) {
      if (prev.hintsUsed === 0 && !prev.appSteps) return
      write({ ...current, [potentialId]: { ...prev, hintsUsed: 0, appSteps: undefined, lastStudiedAt: Date.now() } })
      return
    }
    if (prev.hintsUsed === n) return
    write({ ...current, [potentialId]: { ...prev, hintsUsed: n, lastStudiedAt: Date.now() } })
  }, [])

  const setAppSteps = useCallback((potentialId: string, hintIndex: number, n: number | ((prev: number) => number)) => {
    const current = read()
    const prev = current[potentialId] ?? EMPTY_ENTRY
    const target = Math.max(0, typeof n === 'function' ? n(prev.appSteps?.[hintIndex] ?? 0) : n)
    if ((prev.appSteps?.[hintIndex] ?? 0) === target) return
    const nextMap = { ...(prev.appSteps ?? {}), [hintIndex]: target }
    const allZero = Object.values(nextMap).every(v => v === 0)
    write({ ...current, [potentialId]: { ...prev, appSteps: allZero ? undefined : nextMap, lastStudiedAt: Date.now() } })
  }, [])

  const toggleQuestion = useCallback((potentialId: string, questionId: string) => {
    const current = read()
    const prev = current[potentialId] ?? EMPTY_ENTRY
    const done = new Set(prev.questionsDone ?? [])
    if (done.has(questionId)) done.delete(questionId)
    else done.add(questionId)
    const arr = Array.from(done)
    write({ ...current, [potentialId]: { ...prev, questionsDone: arr.length > 0 ? arr : undefined, lastStudiedAt: Date.now() } })
  }, [])

  const toggleMastered = useCallback((potentialId: string) => {
    const current = read()
    const prev = current[potentialId] ?? EMPTY_ENTRY
    write({ ...current, [potentialId]: { ...prev, mastered: !prev.mastered, lastStudiedAt: Date.now() } })
  }, [])

  const clearAll = useCallback(() => {
    write({})
  }, [])

  const masteredCount = Object.values(progress).filter(e => e?.mastered).length
  const startedCount = Object.values(progress).filter(e =>
    e && (e.derivationSteps > 0 || e.hintsUsed > 0 || (e.questionsDone?.length ?? 0) > 0)
  ).length

  return { progress, setDerivationSteps, setHintsUsed, setAppSteps, toggleQuestion, toggleMastered, clearAll, masteredCount, startedCount }
}
