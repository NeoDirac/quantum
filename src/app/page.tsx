'use client'

import { useUI } from '@/lib/store'
import { Sidebar } from '@/components/sidebar'
import { Dashboard } from '@/components/dashboard'
import { ChapterMap, ExercisesList } from '@/components/chapter-map'
import { ConceptView } from '@/components/concept-view'
import { ExerciseView } from '@/components/exercise-view'
import { DecisionTreeView } from '@/components/decision-tree-view'
import { ModelProblemView } from '@/components/model-problem-view'
import { Visualizations } from '@/components/visualizations'
import { ExamMode } from '@/components/exam-mode'
import { TrainingMode } from '@/components/training-mode'
import { ReviewMode } from '@/components/review-mode'
import { ProgressDashboard } from '@/components/progress-dashboard'
import { getConcept } from '@/data/concepts'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { getExercise } from '@/data/exercises'
import { Menu, Atom, Github, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getActiveChapter } from '@/data/structure'

export default function Home() {
  const { view, setView, setSidebarOpen, sidebarOpen } = useUI()
  const chapter = getActiveChapter()

  const renderView = () => {
    switch (view.name) {
      case 'dashboard': return <Dashboard />
      case 'chapter-map': return <ChapterMap />
      case 'concept': {
        const c = ALL_CONCEPTS.find(x => x.id === view.conceptId) ?? getConcept(view.conceptId)
        return c ? <ConceptView concept={c} /> : <NotFound />
      }
      case 'exercise': {
        const e = getExercise(view.exerciseId)
        return e ? <ExerciseView exercise={e} /> : <NotFound />
      }
      case 'exercises-list': return <ExercisesList />
      case 'decision-tree': return <DecisionTreeView />
      case 'model-problem': return <ModelProblemView />
      case 'visualizations': return <Visualizations />
      case 'exam': return <ExamMode />
      case 'training': return <TrainingMode />
      case 'review': return <ReviewMode />
      case 'progress': return <ProgressDashboard />
      default: return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
            <Atom className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold leading-none">Mecánica Cuántica · Griffiths</div>
            <div className="text-[10px] text-muted-foreground">Cap. {chapter.number} — {chapter.title}</div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {view.name !== 'dashboard' && (
            <Button variant="ghost" size="sm" onClick={() => setView({ name: 'dashboard' })}>
              <BookOpen className="mr-1 h-3.5 w-3.5" /> Inicio
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Sticky footer */}
      <footer className="mt-auto border-t border-border bg-muted/30">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            Plataforma de estudio de mecánica cuántica · basada en Griffiths · Capítulo {chapter.number}.
            Contenido pedagógico original para esta herramienta.
          </div>
          <div className="flex items-center gap-3">
            <span>Elige el método pensando, no memorizando.</span>
            <Github className="h-3.5 w-3.5" />
          </div>
        </div>
      </footer>
    </div>
  )
}

function NotFound() {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
      <div className="text-lg font-semibold">No encontrado</div>
      <p className="mt-1 text-sm text-muted-foreground">El recurso solicitado no existe.</p>
    </div>
  )
}
