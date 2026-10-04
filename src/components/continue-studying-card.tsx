'use client'

// «Continuar donde lo dejaste» — CTA del panel que lleva directo al problema
// con actividad reciente sin resolver (pistas, pasos o intentos). Si no hay
// nada en curso, propone el primer problema pendiente; si está todo resuelto,
// celebra el capítulo completado y ofrece repasarlo.

import { useRecentlyViewed } from '@/lib/recently-viewed'
import { useBookProgress, type ProgressEntry } from '@/lib/book-progress'
import { BOOK_PROBLEMS } from '@/data/book-problems'
import { getBookHints } from '@/data/book-hints'
import { useUI } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Lightbulb, Footprints, PartyPopper, RefreshCw } from 'lucide-react'

// ¿Tiene actividad (pistas, pasos o intentos) sin estar resuelto?
function inProgressEntry(e?: ProgressEntry): boolean {
  return !!e && !e.solved && ((e.hintsUsed ?? 0) > 0 || Object.keys(e.appSteps ?? {}).length > 0 || (e.attempts ?? 0) > 0)
}

export function ContinueStudyingCard() {
  const { setView } = useUI()
  const { progress } = useBookProgress()
  const recent = useRecentlyViewed()

  // Momento más reciente conocido para cada problema: intento comparado o vista.
  const lastSeen = (id: string): number => {
    const rv = recent.find(r => r.type === 'book-problem' && r.id === id)
    return Math.max(progress[id]?.lastTriedAt ?? 0, rv?.ts ?? 0)
  }

  // Candidato a continuar: el problema EN CURSO visto/intentado más reciente.
  const candidate = BOOK_PROBLEMS
    .filter(p => inProgressEntry(progress[p.id]))
    .sort((a, b) => lastSeen(b.id) - lastSeen(a.id))[0]

  // Modo «empezar»: sin actividad — el primer problema sin resolver del libro.
  const starter = candidate ?? BOOK_PROBLEMS.find(p => !progress[p.id]?.solved) ?? null
  const allSolved = !candidate && !starter

  if (allSolved) {
    return (
      <Card className="border-emerald-300/60 bg-gradient-to-br from-emerald-50/70 to-teal-50/40 dark:border-emerald-800/60 dark:from-emerald-950/30 dark:to-teal-950/20">
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/60">
            <PartyPopper className="h-5 w-5 text-emerald-600 dark:text-emerald-300" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold">¡Capítulo 2 completado!</div>
            <p className="text-xs text-muted-foreground">
              Has marcado los 49 problemas como resueltos. Un buen momento para repasar o pasar al modo examen.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button size="sm" variant="outline" onClick={() => setView({ name: 'book-problems' })} className="focus-visible:ring-2 focus-visible:ring-teal-500/50">
              <RefreshCw className="mr-1 h-3.5 w-3.5" /> Repasar
            </Button>
            <Button size="sm" onClick={() => setView({ name: 'exam' })} className="focus-visible:ring-2 focus-visible:ring-teal-500/50">
              Modo examen <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const p = starter!
  const entry = progress[p.id]
  const hintsTotal = getBookHints(p.id)?.hints.length ?? 0
  const hintsUsed = entry?.hintsUsed ?? 0
  const stepsUsed = entry ? Object.values(entry.appSteps ?? {}).reduce((a, b) => a + b, 0) : 0
  const isResume = !!candidate

  return (
    <Card className="group overflow-hidden border-teal-200/60 bg-gradient-to-br from-teal-50/70 via-emerald-50/40 to-transparent transition-all hover:border-teal-400/70 hover:shadow-md dark:border-teal-900/50 dark:from-teal-950/30 dark:via-emerald-950/10">
      <CardContent className="p-5">
        <button
          type="button"
          onClick={() => setView({ name: 'book-problem', problemId: p.id })}
          className="flex w-full items-center gap-4 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`${isResume ? 'Continuar con el problema' : 'Empezar por el problema'} ${p.number}: ${p.title}`}
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Play className="h-5 w-5 fill-current" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-teal-700 dark:text-teal-300">
              {isResume ? 'Continuar donde lo dejaste' : 'Por dónde empezar'}
            </span>
            <span className="mt-0.5 flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-foreground">{p.number}</span>
              <span className="truncate text-sm font-medium text-foreground">{p.title}</span>
            </span>
            {isResume && (
              <span className="mt-1 flex flex-wrap items-center gap-1.5">
                {hintsUsed > 0 && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 dark:bg-amber-900/60 dark:text-amber-300">
                    <Lightbulb className="h-2.5 w-2.5" aria-hidden />{hintsUsed}/{hintsTotal} pistas
                  </span>
                )}
                {stepsUsed > 0 && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-violet-100 px-1.5 py-0.5 text-[9px] font-semibold text-violet-700 dark:bg-violet-900/60 dark:text-violet-300">
                    <Footprints className="h-2.5 w-2.5" aria-hidden />{stepsUsed} pasos
                  </span>
                )}
                {lastSeen(p.id) > 0 && (
                  <span className="text-[10px] text-muted-foreground">
                    {relativeEs(lastSeen(p.id))}
                  </span>
                )}
              </span>
            )}
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-teal-600 transition-transform duration-300 group-hover:translate-x-1 dark:text-teal-400" aria-hidden />
        </button>
      </CardContent>
    </Card>
  )
}

// Tiempo relativo en español para «hace N …».
function relativeEs(ts: number): string {
  const min = Math.floor((Date.now() - ts) / 60000)
  if (min < 1) return 'ahora mismo'
  if (min < 60) return `hace ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `hace ${h} h`
  const d = Math.floor(h / 24)
  if (d === 1) return 'ayer'
  if (d < 7) return `hace ${d} días`
  return `el ${new Date(ts).toLocaleDateString('es', { day: 'numeric', month: 'short' })}`
}
