'use client'

import { useUI } from '@/lib/store'
import { SECTIONS, getActiveChapter, getSectionsForChapter } from '@/data/structure'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { EXERCISES } from '@/data/exercises'
import { MODEL_PROBLEMS } from '@/data/model-problems'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, BookOpen, ListChecks, GitBranch, Network, Atom,
  GraduationCap, Timer, BarChart3, ChevronDown, ChevronRight, Waves, Brain, Star, Share2, X, Zap, CalendarDays
} from 'lucide-react'
import { useState } from 'react'

export function Sidebar() {
  const { view, setView, sidebarOpen, setSidebarOpen } = useUI()
  const chapter = getActiveChapter()
  const sections = getSectionsForChapter(chapter.id)
  const [openSections, setOpenSections] = useState<Set<string>>(new Set([sections[0]?.id]))

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  const navItem = (label: string, icon: any, active: boolean, onClick: () => void, count?: number) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-all',
        active
          ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      <icon className={cn('h-4 w-4 shrink-0 transition-transform', !active && 'group-hover:scale-110')} />
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
          active ? 'bg-white/25' : 'bg-muted group-hover:bg-background')}>
          {count}
        </span>
      )}
    </button>
  )

  return (
    <>
      {/* mobile overlay with blur */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 w-72 shrink-0 border-r border-border bg-sidebar/95 backdrop-blur transition-transform duration-300 ease-out lg:static lg:translate-x-0 lg:bg-sidebar',
        sidebarOpen ? 'translate-x-0 shadow-xl lg:shadow-none' : '-translate-x-full lg:hidden'
      )}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-2.5 border-b border-sidebar-border px-4 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm">
                <Atom className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold leading-tight">Mecánica Cuántica</div>
                <div className="text-[11px] text-muted-foreground">Griffiths · Cap. {chapter.number}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
              aria-label="Cerrar menú"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {navItem('Panel', LayoutDashboard, view.name === 'dashboard', () => setView({ name: 'dashboard' }))}
            {navItem('Conceptos', BookOpen, view.name === 'concept' || view.name === 'chapter-map', () => setView({ name: 'chapter-map' }))}
            {navItem('Mapa de relaciones', Share2, view.name === 'concept-graph', () => setView({ name: 'concept-graph' }))}
            {navItem('Ejercicios', ListChecks, view.name === 'exercises-list' || view.name === 'exercise', () => setView({ name: 'exercises-list' }), EXERCISES.length)}
            {navItem('Árbol de decisión', Network, view.name === 'decision-tree', () => setView({ name: 'decision-tree' }))}
            {navItem('¿Qué hace Griffiths?', GraduationCap, view.name === 'model-problem', () => setView({ name: 'model-problem', problemId: MODEL_PROBLEMS[0].id }), MODEL_PROBLEMS.length)}
            {navItem('Visualizaciones', Waves, view.name === 'visualizations', () => setView({ name: 'visualizations' }))}

            <div className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Capítulo {chapter.number} — secciones
            </div>
            {sections.map(s => {
              const open = openSections.has(s.id)
              const conceptCount = ALL_CONCEPTS.filter(c => c.sectionId === s.id).length
              return (
                <div key={s.id}>
                  <button
                    type="button"
                    onClick={() => toggleSection(s.id)}
                    className="flex w-full items-center gap-1.5 rounded-md px-3 py-1.5 text-left text-sm text-muted-foreground hover:bg-muted"
                  >
                    {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                    <span className="flex-1 truncate">{s.id} · {s.title}</span>
                    <span className="text-[10px] text-muted-foreground">{conceptCount}</span>
                  </button>
                  {open && (
                    <div className="ml-3 border-l border-sidebar-border pl-2.5">
                      {ALL_CONCEPTS.filter(c => c.sectionId === s.id).map(c => {
                        const isActive = view.name === 'concept' && view.conceptId === c.id
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setView({ name: 'concept', conceptId: c.id })}
                            className={cn(
                              'group flex w-full items-start gap-2 rounded-md px-2.5 py-1.5 text-left text-[13px] transition-all',
                              isActive
                                ? 'bg-teal-50 font-medium text-teal-900 dark:bg-teal-950/40 dark:text-teal-100 nav-active-bar pl-3'
                                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                            )}
                          >
                            <span className={cn(
                              'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors',
                              isActive ? 'bg-teal-500' : 'bg-current/30 group-hover:bg-current/50'
                            )} />
                            <span className="flex-1 leading-snug">{c.title}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="space-y-1 border-t border-sidebar-border p-3">
            {navItem('Repaso adaptativo', Brain, view.name === 'review', () => setView({ name: 'review' }))}
            {navItem('Memoria a largo plazo', Zap, view.name === 'spaced-repetition', () => setView({ name: 'spaced-repetition' }))}
            {navItem('Mis favoritos', Star, view.name === 'bookmarks', () => setView({ name: 'bookmarks' }))}
            {navItem('Modo examen', Timer, view.name === 'exam', () => setView({ name: 'exam' }))}
            {navItem('Entrenamiento', GitBranch, view.name === 'training', () => setView({ name: 'training' }))}
            {navItem('Mi progreso', BarChart3, view.name === 'progress', () => setView({ name: 'progress' }))}
            {navItem('Calendario', CalendarDays, view.name === 'study-calendar', () => setView({ name: 'study-calendar' }))}
          </div>
        </div>
      </aside>
    </>
  )
}
