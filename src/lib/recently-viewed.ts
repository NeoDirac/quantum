'use client'

import { useState, useEffect, useCallback } from 'react'

export interface RecentlyViewedItem {
  type: 'concept' | 'exercise' | 'book-problem'
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

// Record a visit (dedupes by type+id, moves to front, caps at MAX_ITEMS)
export function recordView(item: Omit<RecentlyViewedItem, 'ts'>) {
  const items = load()
  const filtered = items.filter(x => !(x.type === item.type && x.id === item.id))
  const next = [{ ...item, ts: Date.now() }, ...filtered].slice(0, MAX_ITEMS)
  save(next)
  // notify listeners
  window.dispatchEvent(new Event('qm-recently-viewed-changed'))
}

// Hook: returns the current recently-viewed list, updates on changes.
// Initial value is loaded lazily via useState initializer (avoids set-state-in-effect).
export function useRecentlyViewed(): RecentlyViewedItem[] {
  const [items, setItems] = useState<RecentlyViewedItem[]>(() => load())
  useEffect(() => {
    const handler = () => { setItems(load()) }
    window.addEventListener('qm-recently-viewed-changed', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('qm-recently-viewed-changed', handler)
      window.removeEventListener('storage', handler)
    }
  }, [])
  return items
}

export function clearRecentlyViewed() {
  save([])
  window.dispatchEvent(new Event('qm-recently-viewed-changed'))
}
