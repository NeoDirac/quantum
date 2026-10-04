'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type View =
  | { name: 'dashboard' }
  | { name: 'chapter-map' }
  | { name: 'concept'; conceptId: string }
  | { name: 'exercise'; exerciseId: string }
  | { name: 'exercises-list'; sectionId?: string }
  | { name: 'book-problems'; sectionId?: string; query?: string }
  | { name: 'book-problem'; problemId: string }
  | { name: 'concept-graph' }
  | { name: 'decision-tree'; nodeId?: string }
  | { name: 'model-problem'; problemId: string }
  | { name: 'visualizations'; preset?: string }
  | { name: 'exam' }
  | { name: 'training'; preset?: 'book-review' }
  | { name: 'review' }
  | { name: 'spaced-repetition' }
  | { name: 'sm2-stats' }
  | { name: 'bookmarks' }
  | { name: 'study-calendar' }
  | { name: 'progress' }

interface UIState {
  view: View
  setView: (v: View) => void
  sidebarOpen: boolean
  setSidebarOpen: (b: boolean) => void
  // student identity (persisted)
  studentId: string | null
  setStudentId: (id: string) => void
}

export const useUI = create<UIState>()(
  persist(
    (set) => ({
      view: { name: 'dashboard' },
      setView: (v) => set({ view: v }),
      sidebarOpen: true,
      setSidebarOpen: (b) => set({ sidebarOpen: b }),
      studentId: null,
      setStudentId: (id) => set({ studentId: id }),
    }),
    {
      name: 'qm-study-ui',
      // Almacenamiento seguro para SSR: en el servidor localStorage no existe y
      // zustand emitía "[zustand persist middleware] Unable to update item…"
      // en cada render (getOrCreateStudentId hace set durante el SSR).
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => undefined,
            removeItem: () => undefined,
          } as Storage
        }
        return window.localStorage
      }),
      partialize: (s) => ({ studentId: s.studentId, sidebarOpen: s.sidebarOpen }) as any,
    }
  )
)
