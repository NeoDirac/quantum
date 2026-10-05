'use client'

import { useUI } from '@/lib/store'
import { Sidebar } from '@/components/sidebar'
import { Dashboard } from '@/components/dashboard'
import { ChapterMap, ExercisesList } from '@/components/chapter-map'
import { ConceptGraphView } from '@/components/concept-graph-view'
import { ConceptView } from '@/components/concept-view'
import { ExerciseView } from '@/components/exercise-view'
import { BookProblemsList, BookProblemDetail } from '@/components/book-problems-view'
import { BookPotentialsList, BookPotentialDetail } from '@/components/book-potentials-view'
import { DecisionTreeView } from '@/components/decision-tree-view'
import { ModelProblemView } from '@/components/model-problem-view'
import { Visualizations } from '@/components/visualizations'
import { ExamMode } from '@/components/exam-mode'
import { TrainingMode } from '@/components/training-mode'
import { ReviewMode } from '@/components/review-mode'
import { SpacedRepetitionMode } from '@/components/spaced-repetition-mode'
import { SM2CardStats } from '@/components/sm2-card-stats'
import { BookmarksView } from '@/components/bookmarks-view'
import { StudyCalendarView } from '@/components/study-calendar-view'
import { ProgressDashboard } from '@/components/progress-dashboard'
import { getConcept } from '@/data/concepts'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { getExercise } from '@/data/exercises'
import { Menu, Atom, Github, BookOpen, Keyboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getActiveChapter } from '@/data/structure'
import { useKeyboardShortcuts, KeyboardHelpDialog } from '@/components/keyboard-shortcuts'
import { SearchPalette, useSearchPalette, SearchTrigger } from '@/components/search-palette'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  const { view, setView, setSidebarOpen, sidebarOpen } = useUI()
  const chapter = getActiveChapter()
  const shortcuts = useKeyboardShortcuts()
  const search = useSearchPalette()

  const renderView = () => {
    switch (view.name) {
      case 'dashboard': return <Dashboard />
      case 'chapter-map': return <ChapterMap />
      case 'concept-graph': return <ConceptGraphView />
      case 'concept': {
        const c = ALL_CONCEPTS.find(x => x.id === view.conceptId) ?? getConcept(view.conceptId)
        return c ? <ConceptView concept={c} /> : <NotFound />
      }
      case 'exercise': {
        const e = getExercise(view.exerciseId)
        return e ? <ExerciseView exercise={e} /> : <NotFound />
      }
      case 'exercises-list': return <ExercisesList />
      case 'book-problems': return <BookProblemsList key={view.query ?? 'q'} />
      case 'book-problem': return <BookProblemDetail problemId={view.problemId} />
      case 'book-potentials': return <BookPotentialsList />
      case 'book-potential': return <BookPotentialDetail potentialId={view.potentialId} />
      case 'decision-tree': return <DecisionTreeView />
      case 'model-problem': return <ModelProblemView />
      case 'visualizations': return <Visualizations />
      case 'exam': return <ExamMode />
      case 'training': return <TrainingMode initialPreset={view.preset} />
      case 'review': return <ReviewMode />
      case 'spaced-repetition': return <SpacedRepetitionMode />
      case 'sm2-stats': return <SM2CardStats />
      case 'bookmarks': return <BookmarksView />
      case 'study-calendar': return <StudyCalendarView />
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
          <SearchTrigger onClick={() => search.setOpen(true)} />
          <ThemeToggle />
          {view.name !== 'dashboard' && (
            <Button variant="ghost" size="sm" onClick={() => setView({ name: 'dashboard' })}>
              <BookOpen className="mr-1 h-3.5 w-3.5" /> Inicio
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => shortcuts.setShowHelp(true)} title="Atajos de teclado (?)">
            <Keyboard className="h-4 w-4" />
          </Button>
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
      <footer className="mt-auto border-t border-border bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
              <Atom className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="font-medium text-foreground/80">Mecánica Cuántica · Griffiths Cap. {chapter.number}</div>
              <div className="text-[11px]">Plataforma de estudio · contenido pedagógico original</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="italic">"Elige el método pensando, no memorizando."</span>
            <Github className="h-3.5 w-3.5 shrink-0" />
          </div>
        </div>
      </footer>
      <KeyboardHelpDialog open={shortcuts.showHelp} onOpenChange={shortcuts.setShowHelp} />
      <SearchPalette open={search.open} onOpenChange={search.setOpen} />
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
