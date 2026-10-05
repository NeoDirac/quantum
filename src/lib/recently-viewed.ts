'use client'

import { useSyncExternalStore } from 'react'

export interface RecentlyViewedItem {
  type: 'concept' | 'exercise' | 'book-problem' | 'book-potential'
  id: string
  title: string
  sectionId: string
  ts: number
}

const STORAGE_KEY = 'qm-recently-viewed'
const MAX_ITEMS = 8

function load(): RecentlyViewedItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(items: RecentlyViewedItem[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // ignore
  }
}

// ── Snapshot cache (useSyncExternalStore exige referencias estables) ────────
// La primera lectura se hace tras la hidratación (nunca durante), por lo que
// el primer render del cliente coincide con el HTML del servidor (SSR = []) y
// no hay mismatch de hidratación para usuarios que vuelven.
let snapshot: RecentlyViewedItem[] = []
let snapshotRead = false

const EMPTY: RecentlyViewedItem[] = []

function getSnapshot(): RecentlyViewedItem[] {
  if (!snapshotRead) {
    snapshot = load()
    snapshotRead = true
  }
  return snapshot
}

function getServerSnapshot(): RecentlyViewedItem[] {
  return EMPTY
}

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Cambios desde otra pestaña del navegador.
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === STORAGE_KEY) {
      snapshot = load()
      snapshotRead = true
      listener()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function commit(next: RecentlyViewedItem[]) {
  snapshot = next
  snapshotRead = true
  save(next)
  listeners.forEach(l => l())
}

// Record a visit (dedupes by type+id, moves to front, caps at MAX_ITEMS)
export function recordView(item: Omit<RecentlyViewedItem, 'ts'>) {
  const items = getSnapshot()
  const filtered = items.filter(x => !(x.type === item.type && x.id === item.id))
  commit([{ ...item, ts: Date.now() }, ...filtered].slice(0, MAX_ITEMS))
}

// Hook: devuelve la lista de vistos recientemente; se actualiza en vivo.
export function useRecentlyViewed(): RecentlyViewedItem[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function clearRecentlyViewed() {
  commit([])
}
