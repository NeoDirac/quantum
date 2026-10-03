'use client'

import { useState } from 'react'
import { useUI } from '@/lib/store'
import { SECTIONS, getActiveChapter } from '@/data/structure'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { EXERCISES } from '@/data/exercises'
import { BOOK_PROBLEMS } from '@/data/book-problems'
import { RenderBlocks } from '@/components/render-blocks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ListChecks, ChevronRight, Star, BookMarked } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState as useRState } from 'react'
import type { Exercise } from '@/lib/content-types'

const TYPE_LABEL: Record<string, string> = {
  conceptual: 'Conceptual', computation: 'Cálculo', 'identify-potential': 'Identificar potencial',
  'boundary-condition': 'Frontera', 'graph-interpretation': 'Gráfico', 'griffiths-style': 'Estilo Griffiths',
  novel: 'Nuevo', 'method-choice': 'Método',
}

export function ChapterMap() {
  const { setView } = useUI()
  const chapter = getActiveChapter()
  const sections = SECTIONS.filter(s => s.chapterId === chapter.id)

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-teal-600" /> Conceptos del Capítulo {chapter.number}
        </h1>
        <p className="text-muted-foreground">{chapter.title} — {chapter.subtitle}</p>
      </header>

      {sections.map(s => {
        const concepts = ALL_CONCEPTS.filter(c => c.sectionId === s.id)
        return (
          <section key={s.id} className="space-y-3">
            <div className="flex items-baseline gap-3 border-b border-border pb-2">
              <span className="font-mono text-sm font-semibold text-teal-600 dark:text-teal-400">{s.id}</span>
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <span className="ml-auto text-xs text-muted-foreground">{concepts.length} conceptos</span>
            </div>
            <RenderBlocks blocks={s.summary} />
            <div className="grid gap-3 sm:grid-cols-2">
              {concepts.map(c => (
                <Card key={c.id} className="cursor-pointer transition-colors hover:border-teal-400" >
                  <button className="w-full text-left" onClick={() => setView({ name: 'concept', conceptId: c.id })}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <span>Concepto {c.order}</span>
                      </div>
                      <CardTitle className="text-base">{c.title}</CardTitle>
                      <p className="text-xs text-muted-foreground">{c.subtitle}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {c.tags.map(t => (
                          <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </button>
                </Card>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export function ExercisesList() {
  const { setView, view } = useUI()
  const [filter, setFilter] = useState<string>('all')
  const sections = SECTIONS.filter(s => s.chapterId === 'ch2')
  const filtered = filter === 'all' ? EXERCISES : EXERCISES.filter(e => e.sectionId === filter)

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-sky-600" /> Ejercicios del Capítulo 2
        </h1>
        <p className="text-muted-foreground">
          Cada ejercicio tiene preguntas orientadoras, pistas progresivas y solución paso a paso con botón "¿Por qué?". Clasifica tu resultado para alimentar el análisis de errores.
        </p>
      </header>

      {/* Alternar entre banco original y problemas del libro */}
      <button
        type="button"
        onClick={() => setView({ name: 'book-problems' })}
        className="group flex w-full items-center gap-3 rounded-lg border border-violet-300/70 bg-violet-50/60 p-4 text-left transition-colors hover:border-violet-400 hover:bg-violet-100/60 dark:border-violet-800 dark:bg-violet-950/30 dark:hover:bg-violet-950/50"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm">
          <BookMarked className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-violet-900 dark:text-violet-100">
            ¿Buscas los problemas reales de Griffiths? → Problemas del libro
          </div>
          <div className="text-xs leading-5 text-muted-foreground">
            Los {BOOK_PROBLEMS.length} problemas oficiales del Capítulo 2 (1.ª ed.), transcritos literalmente del libro: {BOOK_PROBLEMS.filter(p => p.placement === 'in-section').length} en las secciones + {BOOK_PROBLEMS.filter(p => p.placement === 'further').length} Further Problems, con traducción al español.
          </div>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-violet-500 transition-transform group-hover:translate-x-0.5" />
      </button>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={cn('rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
            filter === 'all' ? 'border-sky-400 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100' : 'border-border text-muted-foreground hover:bg-muted')}
        >
          Todos ({EXERCISES.length})
        </button>
        {sections.map(s => {
          const n = EXERCISES.filter(e => e.sectionId === s.id).length
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setFilter(s.id)}
              className={cn('rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                filter === s.id ? 'border-sky-400 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100' : 'border-border text-muted-foreground hover:bg-muted')}
            >
              <span className="font-mono">{s.id}</span> {s.title} ({n})
            </button>
          )
        })}
      </div>

      <div className="grid gap-3">
        {filtered.map(e => (
          <ExerciseRow key={e.id} e={e} onOpen={() => setView({ name: 'exercise', exerciseId: e.id })} />
        ))}
      </div>
    </div>
  )
}

function ExerciseRow({ e, onOpen }: { e: Exercise; onOpen: () => void }) {
  return (
    <Card className="cursor-pointer transition-colors hover:border-sky-400">
      <button className="w-full text-left" onClick={onOpen}>
        <CardContent className="flex items-start gap-3 p-4">
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono font-semibold text-sky-600 dark:text-sky-400">{e.sectionId}</span>
              <span>·</span>
              <span>{TYPE_LABEL[e.type] ?? e.type}</span>
              <span>·</span>
              <span className="text-amber-600 dark:text-amber-400">
                {Array.from({ length: e.difficulty }).map((_, i) => <Star key={i} className="inline h-3 w-3 fill-current" />)}
                {e.difficulty === 0 && <span className="text-muted-foreground">sin estrellas</span>}
              </span>
            </div>
            <div className="font-semibold">{e.title}</div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              <RenderBlocks blocks={e.statement.slice(0, 1)} />
            </div>
          </div>
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
        </CardContent>
      </button>
    </Card>
  )
}
