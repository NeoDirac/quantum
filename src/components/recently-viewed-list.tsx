'use client'

import { useRecentlyViewed, clearRecentlyViewed } from '@/lib/recently-viewed'
import { useUI } from '@/lib/store'
import { useBookProgress } from '@/lib/book-progress'
import { getBookHints } from '@/data/book-hints'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, BookOpen, ListChecks, ArrowRight, Trash2, BookMarked, CheckCircle2, Lightbulb, Footprints } from 'lucide-react'
import { cn } from '@/lib/utils'

// Tiempo relativo compacto en español: «ahora», «5 min», «2 h», «ayer», «3 d».
function relativeTime(ts: number): string {
  const diff = Date.now() - ts
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'ahora'
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h} h`
  const d = Math.floor(h / 24)
  if (d === 1) return 'ayer'
  if (d < 7) return `${d} d`
  return new Date(ts).toLocaleDateString('es', { day: 'numeric', month: 'short' })
}

export function RecentlyViewedList() {
  const items = useRecentlyViewed()
  const { setView } = useUI()
  const { progress } = useBookProgress()

  if (items.length === 0) return null

  const open = (item: typeof items[number]) => {
    if (item.type === 'concept') setView({ name: 'concept', conceptId: item.id })
    else if (item.type === 'book-problem') setView({ name: 'book-problem', problemId: item.id })
    else setView({ name: 'exercise', exerciseId: item.id })
  }

  return (
    <Card className="border-border/60">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Clock className="h-4 w-4 text-teal-600" /> Visto recientemente
          </h2>
          <Button variant="ghost" size="sm" onClick={clearRecentlyViewed} className="h-7 text-xs text-muted-foreground">
            <Trash2 className="mr-1 h-3 w-3" /> Limpiar
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => {
            // Progreso solo para problemas del libro (pistas/pasos persistidos).
            const entry = item.type === 'book-problem' ? progress[item.id] : undefined
            const totalHints = item.type === 'book-problem' ? (getBookHints(item.id)?.hints.length ?? 0) : 0
            const hintsUsed = entry?.hintsUsed ?? 0
            const stepsUsed = entry
              ? Object.values(entry.appSteps ?? {}).reduce((a, b) => a + b, 0)
              : 0
            const solved = !!entry?.solved
            return (
              <button
                key={i}
                onClick={() => open(item)}
                title={solved ? 'Problema resuelto' : hintsUsed > 0 ? `${hintsUsed} de ${totalHints} pistas usadas` : 'Abrir de nuevo'}
                className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs transition-all hover:border-teal-400 hover:bg-teal-50/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 dark:hover:bg-teal-950/20"
              >
                {item.type === 'concept'
                  ? <BookOpen className="h-3.5 w-3.5 text-teal-500" />
                  : item.type === 'book-problem'
                    ? <BookMarked className="h-3.5 w-3.5 text-violet-500" />
                    : <ListChecks className="h-3.5 w-3.5 text-sky-500" />}
                <span className="max-w-[180px] truncate font-medium">{item.title}</span>
                <span className="rounded bg-muted px-1 py-0.5 font-mono text-[9px] text-muted-foreground">{item.sectionId}</span>
                {item.type === 'book-problem' && (
                  <span className="inline-flex items-center gap-1" aria-label={solved ? 'resuelto' : hintsUsed > 0 ? `${hintsUsed} de ${totalHints} pistas` : undefined}>
                    {solved && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                    {!solved && hintsUsed > 0 && (
                      <>
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 dark:bg-amber-900/60 dark:text-amber-300">
                          <Lightbulb className="h-2.5 w-2.5" />{hintsUsed}/{totalHints}
                        </span>
                        {stepsUsed > 0 && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-violet-100 px-1.5 py-0.5 text-[9px] font-semibold text-violet-700 dark:bg-violet-900/60 dark:text-violet-300">
                            <Footprints className="h-2.5 w-2.5" />{stepsUsed}
                          </span>
                        )}
                      </>
                    )}
                  </span>
                )}
                <span className="font-mono text-[9px] text-muted-foreground/70" title={new Date(item.ts).toLocaleString('es')}>
                  {relativeTime(item.ts)}
                </span>
                <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
