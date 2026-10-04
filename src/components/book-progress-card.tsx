'use client'

// «Problemas del libro» en el panel de progreso: resume el progreso persistido
// en localStorage (49 problemas de Griffiths) por sección — resueltos, en curso,
// fallados y última actividad — con barras y navegación directa a cada sección.

import { useBookProgress } from '@/lib/book-progress'
import { useRecentlyViewed } from '@/lib/recently-viewed'
import { BOOK_PROBLEMS } from '@/data/book-problems'
import { SECTIONS } from '@/data/structure'
import { useUI } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { BookMarked, ArrowRight, Lightbulb, Footprints, Scale, Target, Activity, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Tiempo relativo compacto («hace 2 h», «ayer»…).
function relativeEs(ts: number): string {
  const min = Math.floor((Date.now() - ts) / 60000)
  if (min < 1) return 'ahora'
  if (min < 60) return `hace ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `hace ${h} h`
  const d = Math.floor(h / 24)
  if (d === 1) return 'ayer'
  if (d < 7) return `hace ${d} días`
  return new Date(ts).toLocaleDateString('es', { day: 'numeric', month: 'short' })
}

interface SectionStat {
  id: string
  title: string
  total: number
  solved: number
  ongoing: number
  failed: number
  lastActivity: number
}

export function BookProgressCard() {
  const { setView } = useUI()
  const { progress, solvedCount, totalAppSteps } = useBookProgress()
  const recent = useRecentlyViewed()

  const entries = Object.values(progress).filter(Boolean)
  const totalHintsUsed = entries.reduce((s, e) => s + (e.hintsUsed ?? 0), 0)
  const totalAttempts = entries.reduce((s, e) => s + (e.attempts ?? 0), 0)
  const matchCount = entries.filter(e => e.lastOutcome === 'match').length
  const accuracy = totalAttempts > 0 ? Math.round((matchCount / totalAttempts) * 100) : null
  const hasActivity = entries.length > 0

  // Momento más reciente conocido por problema: intento comparado o vista.
  const lastSeen = (id: string) => Math.max(progress[id]?.lastTriedAt ?? 0, recent.find(r => r.type === 'book-problem' && r.id === id)?.ts ?? 0)

  const sections: SectionStat[] = [
    ...SECTIONS.filter(s => s.chapterId === 'ch2').map(s => {
      const problems = BOOK_PROBLEMS.filter(p => p.sectionId === s.id && p.placement === 'in-section')
      return buildStat(s.id, s.title, problems, progress, lastSeen)
    }),
    buildStat('further', 'Further Problems', BOOK_PROBLEMS.filter(p => p.placement === 'further'), progress, lastSeen),
  ]

  const pct = Math.round((solvedCount / BOOK_PROBLEMS.length) * 100)

  return (
    <Card className="border-violet-200/50 dark:border-violet-900/50">
      <CardContent className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <BookMarked className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            Problemas del libro · Griffiths
          </h2>
          <button
            type="button"
            onClick={() => setView({ name: 'book-problems' })}
            className="inline-flex items-center gap-1 rounded-full border border-violet-300/70 px-3 py-1 text-xs font-medium text-violet-700 transition-colors hover:bg-violet-100 hover:text-violet-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background dark:border-violet-800 dark:text-violet-300 dark:hover:bg-violet-950/60"
            title="Abrir la lista de los 49 problemas del libro"
          >
            Abrir lista <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Resumen global */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
              <svg viewBox="0 0 44 44" className="absolute inset-0 h-14 w-14 -rotate-90" aria-hidden>
                <circle cx="22" cy="22" r="19" fill="none" strokeWidth="4" className="stroke-muted" />
                <circle
                  cx="22" cy="22" r="19" fill="none" strokeWidth="4" strokeLinecap="round"
                  className="stroke-violet-500 transition-all duration-500"
                  strokeDasharray={2 * Math.PI * 19}
                  strokeDashoffset={2 * Math.PI * 19 * (1 - solvedCount / BOOK_PROBLEMS.length)}
                />
              </svg>
              <span className="font-mono text-xs font-bold text-violet-700 dark:text-violet-300">{pct}%</span>
            </div>
            <div>
              <div className="text-sm font-semibold tabular-nums">
                {solvedCount} / {BOOK_PROBLEMS.length} problemas resueltos
              </div>
              <div className="text-[11px] text-muted-foreground">Se guarda en este navegador · incluye pistas, pasos y comparaciones</div>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
            <MiniStat icon={Lightbulb} tone="amber" value={totalHintsUsed} label="pistas" />
            <MiniStat icon={Footprints} tone="violet" value={totalAppSteps} label="pasos" />
            <MiniStat icon={Scale} tone="emerald" value={totalAttempts} label="comparaciones" />
            <MiniStat icon={Target} tone="teal" value={accuracy !== null ? `${accuracy}%` : '—'} label="aciertos" />
          </div>
        </div>

        {/* Progreso por sección */}
        {hasActivity ? (
          <div className="mt-4 space-y-1.5 border-t border-border/60 pt-3">
            <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Progreso por sección — haz clic para abrirla</div>
            {sections.map(s => {
              const pct = s.total > 0 ? Math.round((s.solved / s.total) * 100) : 0
              const done = s.solved === s.total && s.total > 0
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setView({ name: 'book-problems', sectionId: s.id })}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-violet-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:hover:bg-violet-950/20"
                  title={`${s.title}: ${s.solved} de ${s.total} resueltos${s.ongoing > 0 ? ` · ${s.ongoing} en curso` : ''}${s.failed > 0 ? ` · ${s.failed} por repasar` : ''}`}
                >
                  <span className="w-16 shrink-0 font-mono text-[11px] font-bold text-violet-600 dark:text-violet-400">
                    {s.id === 'further' ? 'FP' : s.id}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center justify-between gap-2 text-xs">
                      <span className="truncate text-muted-foreground group-hover:text-foreground">{s.title}</span>
                      <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
                        {s.ongoing > 0 && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 dark:bg-amber-900/60 dark:text-amber-300">
                            <Activity className="h-2.5 w-2.5" />{s.ongoing}
                          </span>
                        )}
                        {s.failed > 0 && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-rose-100 px-1.5 py-0.5 text-[9px] font-semibold text-rose-700 dark:bg-rose-900/60 dark:text-rose-300">
                            <XCircle className="h-2.5 w-2.5" />{s.failed}
                          </span>
                        )}
                        {s.lastActivity > 0 && (
                          <span className="shrink-0 text-[9px] text-muted-foreground/80">{relativeEs(s.lastActivity)}</span>
                        )}
                      </span>
                    </span>
                    <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-muted">
                      <span
                        className={cn('block h-full rounded-full transition-all duration-500',
                          done ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-violet-500 to-purple-400')}
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                  </span>
                  <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                    {s.solved}/{s.total}
                  </span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-dashed border-violet-300/60 p-4 text-center text-sm text-muted-foreground dark:border-violet-800/60">
            Todavía no hay actividad en los problemas del libro.
            <button
              type="button"
              onClick={() => setView({ name: 'book-problems' })}
              className="ml-1 font-semibold text-violet-700 underline decoration-dotted underline-offset-2 hover:text-violet-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:text-violet-300 dark:hover:text-violet-100"
            >
              Empieza por el 2.1 →
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function buildStat(id: string, title: string, problems: typeof BOOK_PROBLEMS, progress: ReturnType<typeof useBookProgress>['progress'], lastSeen: (id: string) => number): SectionStat {
  let solved = 0, ongoing = 0, failed = 0, lastActivity = 0
  for (const p of problems) {
    const e = progress[p.id]
    if (e?.solved) solved++
    else if (e) {
      if ((e.hintsUsed ?? 0) > 0 || Object.keys(e.appSteps ?? {}).length > 0 || (e.attempts ?? 0) > 0) ongoing++
      if (e.lastOutcome === 'no' || e.lastOutcome === 'partial') failed++
    }
    const seen = lastSeen(p.id)
    if (seen > lastActivity) lastActivity = seen
  }
  return { id, title, total: problems.length, solved, ongoing, failed, lastActivity }
}

function MiniStat({ icon: Icon, tone, value, label }: { icon: any; tone: 'amber' | 'violet' | 'emerald' | 'teal'; value: number | string; label: string }) {
  const tones: Record<string, string> = {
    amber: 'bg-amber-50/70 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400',
    violet: 'bg-violet-50/70 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400',
    emerald: 'bg-emerald-50/70 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400',
    teal: 'bg-teal-50/70 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400',
  }
  return (
    <div className={cn('flex items-center gap-2 rounded-lg px-2.5 py-1.5', tones[tone])}>
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <div className="min-w-0">
        <div className="font-mono text-sm font-bold leading-none">{value}</div>
        <div className="mt-0.5 truncate text-[9px] uppercase tracking-wide opacity-80">{label}</div>
      </div>
    </div>
  )
}
