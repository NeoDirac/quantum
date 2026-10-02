'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type View =
  | { name: 'dashboard' }
  | { name: 'chapter-map' }
  | { name: 'concept'; conceptId: string }
  | { name: 'exercise'; exerciseId: string }
  | { name: 'exercises-list'; sectionId?: string }
  | { name: 'decision-tree'; nodeId?: string }
  | { name: 'model-problem'; problemId: string }
  | { name: 'visualizations'; preset?: string }
  | { name: 'exam' }
  | { name: 'training' }
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
      partialize: (s) => ({ studentId: s.studentId, sidebarOpen: s.sidebarOpen }) as any,
    }
  )
)
