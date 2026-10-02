'use client'

import { useState, useEffect } from 'react'
import { useUI } from '@/lib/store'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { getExercise } from '@/data/exercises'
import { apiGet, getOrCreateStudentId } from '@/lib/student'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, BookOpen, ListChecks, ArrowRight, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookmarkRow {
  id: string
  itemType: string
  itemId: string
  note: string | null
  createdAt: string
}

export function BookmarksView() {
  const { setView } = useUI()
  const [bookmarks, setBookmarks] = useState<BookmarkRow[]>([])
  const [loading, setLoading] = useState(true)
  const studentId = getOrCreateStudentId()
  const [tab, setTab] = useState<'concept' | 'exercise'>('concept')

  const load = async () => {
    setLoading(true)
    try {
      const d = await apiGet(`/api/bookmarks?studentId=${encodeURIComponent(studentId)}`)
      setBookmarks(d.bookmarks)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [studentId])

  const remove = async (itemType: string, itemId: string) => {
    await apiPost('/api/bookmarks', { studentId, itemType, itemId })
    load()
  }

  const concepts = bookmarks.filter(b => b.itemType === 'concept')
  const exercises = bookmarks.filter(b => b.itemType === 'exercise')
  const shown = tab === 'concept' ? concepts : exercises

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <Star className="h-6 w-6 text-amber-500" /> Mis favoritos
        </h1>
        <p className="text-muted-foreground">
          Conceptos y ejercicios que has marcado para revisar más tarde. Pulsa la estrella en cualquier concepto o ejercicio para añadirlo aquí.
        </p>
      </header>

      {/* Tab toggle */}
      <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit">
        <button
          type="button"
          onClick={() => setTab('concept')}
          className={cn('flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
            tab === 'concept' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' : 'text-muted-foreground hover:text-foreground')}
        >
          <BookOpen className="h-4 w-4" /> Conceptos ({concepts.length})
        </button>
        <button
          type="button"
          onClick={() => setTab('exercise')}
          className={cn('flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
            tab === 'exercise' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' : 'text-muted-foreground hover:text-foreground')}
        >
          <ListChecks className="h-4 w-4" /> Ejercicios ({exercises.length})
        </button>
      </div>

      {loading ? (
        <div className="h-32 animate-pulse rounded-lg bg-muted" />
      ) : shown.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
            <Star className="h-10 w-10 text-muted-foreground/40" />
            <div className="text-sm text-muted-foreground">
              Aún no has marcado {tab === 'concept' ? 'conceptos' : 'ejercicios'} como favoritos.
            </div>
            <Button variant="outline" size="sm" onClick={() => setView({ name: tab === 'concept' ? 'chapter-map' : 'exercises-list' })}>
              Explorar {tab === 'concept' ? 'conceptos' : 'ejercicios'} <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {shown.map(b => {
            const isConcept = b.itemType === 'concept'
            const item = isConcept
              ? ALL_CONCEPTS.find(c => c.id === b.itemId)
              : getExercise(b.itemId)
            if (!item) return null
            return (
              <Card key={b.id} className="overflow-hidden lift-on-hover hover:border-amber-400/60">
                <button
                  className="flex w-full items-start gap-3 p-4 text-left"
                  onClick={() => setView(isConcept ? { name: 'concept', conceptId: b.itemId } : { name: 'exercise', exerciseId: b.itemId })}
                >
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                    isConcept ? 'bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300' : 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300')}>
                    {isConcept ? <BookOpen className="h-4 w-4" /> : <ListChecks className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-medium truncate">{isConcept ? (item as any).title : (item as any).title}</div>
                      {isConcept && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">{(item as any).sectionId}</span>}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {isConcept ? (item as any).subtitle : `Sección ${(item as any).sectionId}`}
                    </div>
                    {b.note && <div className="mt-1 text-xs italic text-muted-foreground">"{b.note}"</div>}
                    <div className="mt-1 text-[10px] text-muted-foreground">Marcado el {new Date(b.createdAt).toLocaleDateString()}</div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); remove(b.itemType, b.itemId) }}
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                    title="Quitar de favoritos"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
