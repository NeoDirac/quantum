'use client'

import { useState, useEffect, useMemo } from 'react'
import { useUI } from '@/lib/store'
import { ALL_EXERCISES } from '@/data/exercises'
import { ExerciseView } from '@/components/exercise-view'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Brain, Zap, CheckCircle2, XCircle, RotateCcw, CalendarClock, Layers, TrendingUp, ArrowRight } from 'lucide-react'
import { apiGet, apiPost, getOrCreateStudentId } from '@/lib/student'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface DueCard {
  id: string
  exerciseId: string
  easeFactor: number
  interval: number
  repetitions: number
  dueAt: string
  totalReviews: number
}
interface SM2Data {
  dueCards: DueCard[]
  totalCards: number
  reviewedToday: number
  upcoming: { date: string; count: number }[]
}

const QUALITY_OPTIONS = [
  { q: 0, label: 'Negro', desc: 'No lo sabía', color: 'rose' },
  { q: 3, label: 'Difícil', desc: 'Con esfuerzo', color: 'amber' },
  { q: 4, label: 'Bien', desc: 'Sin problemas', color: 'emerald' },
  { q: 5, label: 'Fácil', desc: 'Inmediato', color: 'sky' },
]

const toneMap: Record<string, string> = {
  rose: 'border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300',
  amber: 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
  emerald: 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
  sky: 'border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300',
}

export function SpacedRepetitionMode() {
  const { setView } = useUI()
  const { toast } = useToast()
  const [data, setData] = useState<SM2Data | null>(null)
  const [phase, setPhase] = useState<'overview' | 'reviewing' | 'done'>('overview')
  const [idx, setIdx] = useState(0)
  const [results, setResults] = useState<{ exerciseId: string; quality: number; interval: number; dueAt: string }[]>([])
  const [cramMode, setCramMode] = useState(false)
  const studentId = getOrCreateStudentId()

  const load = async () => {
    try {
      const d = await apiGet(`/api/sm2?studentId=${encodeURIComponent(studentId)}`)
      setData(d)
    } catch {
      // silent
    }
  }
  useEffect(() => {
    let mounted = true
    apiGet(`/api/sm2?studentId=${encodeURIComponent(studentId)}`)
      .then(d => { if (mounted) setData(d) })
      .catch(() => {})
    return () => { mounted = false }
  }, [studentId])

  const dueExercises = useMemo(() => {
    if (!data) return []
    return data.dueCards
      .map(c => ({ card: c, exercise: ALL_EXERCISES.find(e => e.id === c.exerciseId) }))
      .filter(x => x.exercise) as { card: DueCard; exercise: typeof ALL_EXERCISES[number] }[]
  }, [data])

  // Cram mode: review ALL exercises (shuffled), regardless of due status.
  // Quality ratings are recorded for self-assessment but don't update the SM-2 schedule.
  const cramExercises = useMemo(() => {
    const all = ALL_EXERCISES.map(e => ({
      card: { exerciseId: e.id, easeFactor: 2.5, interval: 0, repetitions: 0, dueAt: '', totalReviews: 0, id: '' },
      exercise: e,
    }))
    // shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[all[i], all[j]] = [all[j], all[i]]
    }
    return all.slice(0, 10) // cap at 10 for a cram session
  }, [cramMode])

  const activeExercises = cramMode ? cramExercises : dueExercises

  const startReview = () => {
    if (activeExercises.length === 0) return
    setIdx(0)
    setResults([])
    setPhase('reviewing')
  }

  const recordQuality = async (quality: number) => {
    const cur = activeExercises[idx]
    if (!cur) return
    if (cramMode) {
      // Cram mode: don't update SM-2 schedule, just record self-assessment
      setResults(prev => [...prev, { exerciseId: cur.exercise.id, quality, interval: 0, dueAt: '' }])
      if (idx < activeExercises.length - 1) {
        setIdx(i => i + 1)
      } else {
        setPhase('done')
        toast({ title: 'Cram completado', description: `${activeExercises.length} ejercicios revisados` })
      }
      return
    }
    try {
      const r = await apiPost('/api/sm2', { studentId, exerciseId: cur.exercise.id, quality })
      const card = r.card
      setResults(prev => [...prev, { exerciseId: cur.exercise.id, quality, interval: card.interval, dueAt: card.dueAt }])
      if (idx < activeExercises.length - 1) {
        setIdx(i => i + 1)
      } else {
        setPhase('done')
        toast({ title: 'Sesión de repaso completada', description: `${dueExercises.length} tarjetas revisadas` })
        load()
      }
    } catch {
      toast({ title: 'Error al registrar', variant: 'destructive' })
    }
  }

  // ---- Overview phase ----
  if (phase === 'overview' || !data) {
    return (
      <div className="space-y-5">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
            <Brain className="h-6 w-6 text-sky-600" /> Repaso espaciado (SM-2)
          </h1>
          <p className="text-muted-foreground">
            Algoritmo de repetición espaciada: los ejercicios que fallaste vuelven pronto, los que dominas vuelven cada vez más lejos.
            Optimiza el tiempo de estudio hacia lo que estás a punto de olvidar.
          </p>
        </header>

        {!data ? (
          <div className="h-32 animate-pulse rounded-xl bg-muted" />
        ) : (
          <>
            {/* Due summary */}
            <div className="grid gap-3 sm:grid-cols-3">
              <Card className="border-sky-200/50 bg-sky-50/30 dark:bg-sky-950/10">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tabular-nums">{data.dueCards.length}</div>
                    <div className="text-xs text-muted-foreground">tarjetas pendientes</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tabular-nums">{data.reviewedToday}</div>
                    <div className="text-xs text-muted-foreground">revisadas hoy</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tabular-nums">{data.totalCards}</div>
                    <div className="text-xs text-muted-foreground">tarjetas totales</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming forecast */}
            <Card>
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <CalendarClock className="h-4 w-4 text-sky-600" /> Próximos 7 días
                </div>
                <div className="flex items-end gap-1.5">
                  {data.upcoming.map((u, i) => {
                    const h = Math.min(48, 4 + u.count * 6)
                    const isToday = i === 0
                    const d = new Date(u.date + 'T00:00:00')
                    return (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <span className="text-[10px] tabular-nums text-muted-foreground">{u.count}</span>
                        <div className="flex h-12 w-full items-end justify-center">
                          <div
                            className={cn('w-full max-w-[20px] rounded-t transition-all',
                              u.count > 0 ? 'bg-gradient-to-t from-sky-500 to-cyan-400' : 'bg-muted',
                              isToday && u.count > 0 && 'from-amber-500 to-orange-400')}
                            style={{ height: `${h}px` }}
                          />
                        </div>
                        <span className="text-[10px] tabular-nums text-muted-foreground">{d.getDate()}</span>
                        <span className="text-[9px] uppercase text-muted-foreground/70">
                          {['D', 'L', 'M', 'X', 'J', 'V', 'S'][d.getDay()]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Start review button or empty state */}
            {data.dueCards.length > 0 ? (
              <Card className="border-sky-200/50 bg-sky-50/30 dark:bg-sky-950/10">
                <CardContent className="flex flex-col items-start gap-3 p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Zap className="h-4 w-4 text-sky-600" /> Listo para repasar
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tienes <span className="font-semibold text-foreground">{data.dueCards.length} ejercicio(s)</span> pendientes de repaso.
                    Cada uno tomará ~1 min. Resuelve, comprueba, y autoevalúa tu calidad de recuerdo.
                  </p>
                  <Button onClick={startReview} size="lg">
                    <Zap className="mr-2 h-4 w-4" /> Empezar repaso ({data.dueCards.length})
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  <div className="text-sm text-muted-foreground">
                    No tienes tarjetas pendientes ahora mismo. Las tarjetas que crees al resolver ejercicios
                    (con autoevaluación) aparecerán aquí según el calendario SM-2.
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setView({ name: 'exercises-list' })}>
                    Ir a ejercicios <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* How it works */}
            <Card className="border-border bg-muted/20">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <TrendingUp className="h-4 w-4 text-sky-600" /> ¿Cómo funciona SM-2?
                </div>
                <p className="text-xs text-muted-foreground">
                  Al resolver un ejercicio, te autoevalúas en 4 niveles (negro / difícil / bien / fácil).
                  El algoritmo SM-2 programa el próximo repaso: "negro" → mañana, "fácil" → cada vez más lejos
                  (1 día, 3 días, 1 semana, 2 semanas, ...). El factor de facilidad se ajusta según tu desempeño:
                  si fallas mucho, los intervalos crecen más lento; si aciertas, crecen más rápido.
                  Es la forma más eficiente de mover conocimiento a la memoria a largo plazo.
                </p>
              </CardContent>
            </Card>

            {/* Cram mode */}
            <Card className="border-rose-200/50 bg-rose-50/30 dark:bg-rose-950/10">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Zap className="h-4 w-4 text-rose-600" /> Modo cram (pre-examen)
                </div>
                <p className="text-xs text-muted-foreground">
                  ¿Examen mañana? El modo cram te da 10 ejercicios aleatorios de todo el capítulo,
                  sin respetar el calendario SM-2. La autoevaluación es solo para ti: no reprograma las tarjetas.
                  Úsalo para un repaso intensivo de último momento.
                </p>
                <Button variant="outline" onClick={() => { setCramMode(true); startReview() }}>
                  <Zap className="mr-2 h-4 w-4" /> Empezar cram (10 aleatorios)
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    )
  }

  // ---- Done phase ----
  if (phase === 'done') {
    const avgQuality = results.reduce((a, r) => a + r.quality, 0) / (results.length || 1)
    const goodCount = results.filter(r => r.quality >= 4).length
    return (
      <div className="space-y-5">
        <Card>
          <CardContent className="p-8 text-center space-y-3">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h2 className="text-2xl font-bold">Sesión completada</h2>
            <div className="text-muted-foreground">
              {results.length} tarjetas · {goodCount} buenas · calidad media {avgQuality.toFixed(1)}/5
            </div>
            <Progress value={(goodCount / results.length) * 100} className="mx-auto max-w-md h-2" />
            <div className="space-y-1 pt-2 text-left max-w-md mx-auto">
              {results.map((r, i) => (
                <div key={i} className="flex items-center justify-between rounded-md border border-border bg-card/60 px-3 py-1.5 text-xs">
                  <span className="truncate">{ALL_EXERCISES.find(e => e.id === r.exerciseId)?.title ?? r.exerciseId}</span>
                  <span className="flex items-center gap-2">
                    <span className={cn('rounded px-1.5 py-0.5 font-medium',
                      r.quality >= 4 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : r.quality >= 3 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300')}>
                      {QUALITY_OPTIONS.find(o => o.q === r.quality)?.label ?? r.quality}
                    </span>
                    <span className="text-muted-foreground">→ {r.interval}d</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 pt-3">
              <Button variant="outline" onClick={() => { setCramMode(false); setPhase('overview') }}><RotateCcw className="mr-1.5 h-4 w-4" /> Volver</Button>
              <Button onClick={() => setView({ name: 'progress' })}>Ver progreso <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ---- Reviewing phase ----
  const cur = activeExercises[idx]
  if (!cur) return <div className="p-6">No hay ejercicios.</div>
  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-sky-200/60 bg-sky-50/40 p-3 dark:bg-sky-950/20">
        <div className="flex items-center gap-2 text-sm">
          <Brain className="h-4 w-4 text-sky-600" />
          <span className="font-semibold">{cramMode ? 'Cram (pre-examen)' : 'Repaso espaciado'}</span>
          <span className="text-muted-foreground">· {cur.exercise.sectionId}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span>Tarjeta {idx + 1} / {activeExercises.length}</span>
          {!cramMode && <span className="text-muted-foreground">intervalo previo: {cur.card.interval}d</span>}
          <Button size="sm" variant="ghost" onClick={() => { setCramMode(false); setPhase('overview') }}>Salir</Button>
        </div>
      </header>
      <Progress value={(idx / activeExercises.length) * 100} className="h-1" />
      <ExerciseView key={cur.exercise.id + '-sm2-' + idx} exercise={cur.exercise} />
      <Card className="border-sky-200/50">
        <CardContent className="p-5 space-y-3">
          <div className="text-sm font-semibold">¿Qué tal lo recuerdas?</div>
          <p className="text-xs text-muted-foreground">
            Sé honesto: el algoritmo solo funciona si tu autoevaluación es fiel. Mejor subestimar que sobreestimar.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {QUALITY_OPTIONS.map(opt => (
              <button
                key={opt.q}
                type="button"
                onClick={() => recordQuality(opt.q)}
                className={cn('rounded-lg border p-3 text-center transition-all lift-on-hover', toneMap[opt.color])}
              >
                <div className="text-sm font-semibold">{opt.label}</div>
                <div className="text-[10px] opacity-80">{opt.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
