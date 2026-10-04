'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useUI } from '@/lib/store'
import { EXERCISES } from '@/data/exercises'
import { BOOK_PROBLEMS } from '@/data/book-problems'
import { ExerciseView } from '@/components/exercise-view'
import { BookPracticeCard, type CompareOutcome } from '@/components/book-practice-card'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { GitBranch, Timer, Target, CheckCircle2, ArrowRight, RotateCcw, ListChecks, BookMarked } from 'lucide-react'
import { apiPost, getOrCreateStudentId } from '@/lib/student'
import { useToast } from '@/hooks/use-toast'
import { SessionSummaryExportButton } from '@/components/session-summary'
import { cn } from '@/lib/utils'
import { useBookProgress } from '@/lib/book-progress'

type Mode = 'timed-30' | 'timed-60' | 'count-10' | 'review'
type Source = 'platform' | 'book'

const MODES: { id: Mode; label: string; desc: string; icon: any }[] = [
  { id: 'timed-30', label: '30 minutos', desc: 'Sesión corta de inmersión', icon: Timer },
  { id: 'timed-60', label: '1 hora', desc: 'Repaso profundo', icon: Timer },
  { id: 'count-10', label: '10 problemas', desc: 'Objetivo por número', icon: Target },
  { id: 'review', label: 'Repaso pre-examen', desc: 'Refuerza conceptos difíciles', icon: GitBranch },
]

const TARGET_COUNTS: Record<Mode, number | null> = {
  'timed-30': null,
  'timed-60': null,
  'count-10': 10,
  'review': 8,
}

export function TrainingMode({ initialPreset }: { initialPreset?: 'book-review' }) {
  const { setView } = useUI()
  const { toast } = useToast()
  const [source, setSource] = useState<Source>(initialPreset === 'book-review' ? 'book' : 'platform')
  const [mode, setMode] = useState<Mode | null>(null)
  // La cola guarda ids con prefijo: 'ex:<id>' ejercicios, 'bp:<id>' problemas del libro.
  const [queue, setQueue] = useState<string[]>([])
  const [idx, setIdx] = useState(0)
  const [done, setDone] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [startTs, setStartTs] = useState<number>(0)
  const [finished, setFinished] = useState(false)
  const { progress: bookProgress } = useBookProgress()

  // Refs to read latest state inside callbacks/effects without retriggering.
  const stateRef = useRef({ mode, done, correct, startTs, source })
  stateRef.current = { mode, done, correct, startTs, source }

  const finish = useCallback(async () => {
    const s = stateRef.current
    setFinished(true)
    if (s.mode) {
      try {
        await apiPost('/api/training', {
          studentId: getOrCreateStudentId(), mode: s.mode,
          targetSeconds: s.mode === 'timed-30' ? 1800 : s.mode === 'timed-60' ? 3600 : null,
          targetCount: TARGET_COUNTS[s.mode],
          problemsDone: s.done, correctCount: s.correct,
          conceptsTouched: [], startedAt: s.startTs, finishedAt: Date.now(),
        })
      } catch {}
    }
    toast({ title: 'Sesión finalizada', description: `${s.done} ${s.done === 1 ? 'problema' : 'problemas'} · ${s.correct} ${s.correct === 1 ? 'correcto' : 'correctos'}` })
  }, [toast])

  useEffect(() => {
    if (secondsLeft === null) return
    if (secondsLeft <= 0) { finish(); return }
    const t = setTimeout(() => setSecondsLeft(s => (s ?? 1) - 1), 1000)
    return () => clearTimeout(t)
  }, [secondsLeft, finish])

  const start = (m: Mode) => {
    setMode(m)

    let ids: string[]
    if (source === 'book') {
      // Cola de problemas del libro. En modo repaso prioriza los no resueltos
      // y los que quedaron "todavía no"/"parcial" en comparaciones previas.
      let problems = [...BOOK_PROBLEMS]
      if (m === 'review') {
        const rank = (id: string) => {
          const e = bookProgress[id]
          if (!e) return 2
          if (e.lastOutcome === 'no') return 0
          if (e.lastOutcome === 'partial') return 1
          if (e.solved) return 3
          return 2
        }
        problems.sort((a, b) => rank(a.id) - rank(b.id))
      } else {
        for (let i = problems.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[problems[i], problems[j]] = [problems[j], problems[i]]
        }
      }
      ids = problems.map(p => 'bp:' + p.id)
    } else {
      // Ejercicios de la plataforma (duplicados para sesiones largas).
      const exIds = [...EXERCISES.map(e => 'ex:' + e.id), ...EXERCISES.map(e => 'ex:' + e.id)]
      for (let i = exIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[exIds[i], exIds[j]] = [exIds[j], exIds[i]]
      }
      ids = exIds
    }

    const target = TARGET_COUNTS[m]
    setQueue(target ? ids.slice(0, target) : ids)
    setIdx(0); setDone(0); setCorrect(0); setFinished(false)
    setStartTs(Date.now())
    if (m === 'timed-30') setSecondsLeft(30 * 60)
    else if (m === 'timed-60') setSecondsLeft(60 * 60)
    else setSecondsLeft(null)
  }

  const advance = useCallback((wasCorrect: boolean) => {
    setDone(d => d + 1)
    if (wasCorrect) setCorrect(c => c + 1)
    const s = stateRef.current
    const target = s.mode ? TARGET_COUNTS[s.mode] : null
    if (target !== null && s.done + 1 >= target) { finish(); return }
    setQueue(q => {
      if (q.length > idx + 1) setIdx(i => i + 1)
      else finish()
      return q
    })
  }, [idx, finish])

  // ─────────────────────────── Selección de modo ───────────────────────────
  if (!mode) {
    return (
      <div className="space-y-5">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-amber-600" /> Entrenamiento intensivo
          </h1>
          <p className="text-muted-foreground">Elige un formato. La sesión se adapta: a mayor acierto, mayor velocidad; si fallas, el sistema sugiere volver a conceptos.</p>
        </header>

        {/* Banner cuando se llega desde «Repasar fallos» */}
        {initialPreset === 'book-review' && (
          <div className="flex items-start gap-3 rounded-xl border border-rose-300/70 bg-rose-50/70 p-4 dark:border-rose-800/70 dark:bg-rose-950/30" role="status">
            <GitBranch className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-300" aria-hidden />
            <p className="text-sm leading-6 text-rose-800 dark:text-rose-200">
              <strong>Repaso de fallos</strong> — fuente fijada en <strong>problemas del libro</strong>.
              Elige <em>«Repaso pre-examen»</em> para que la cola priorice los problemas que quedaron
              <em> «todavía no»</em> o <em>«parcial»</em> al comparar con el solucionario.
            </p>
          </div>
        )}

        {/* Selector de fuente */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setSource('platform')}
            className={cn('rounded-xl border p-4 text-left transition-all',
              source === 'platform'
                ? 'border-rose-400 bg-rose-50/50 shadow-sm dark:border-rose-700 dark:bg-rose-950/20'
                : 'border-border hover:border-rose-300 hover:bg-rose-50/20 dark:hover:bg-rose-950/10')}
          >
            <div className="mb-1.5 flex items-center gap-2">
              <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg',
                source === 'platform' ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-sm' : 'bg-muted text-muted-foreground')}>
                <ListChecks className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-sm font-bold">Ejercicios de la plataforma</span>
              {source === 'platform' && <CheckCircle2 className="ml-auto h-4 w-4 text-rose-500" aria-hidden />}
            </div>
            <p className="text-xs leading-5 text-muted-foreground">
              Ejercicios originales guiados con pistas y solución paso a paso dentro de la sesión.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setSource('book')}
            className={cn('rounded-xl border p-4 text-left transition-all',
              source === 'book'
                ? 'border-violet-400 bg-violet-50/50 shadow-sm dark:border-violet-700 dark:bg-violet-950/20'
                : 'border-border hover:border-violet-300 hover:bg-violet-50/20 dark:hover:bg-violet-950/10')}
          >
            <div className="mb-1.5 flex items-center gap-2">
              <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg',
                source === 'book' ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm' : 'bg-muted text-muted-foreground')}>
                <BookMarked className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-sm font-bold">Problemas del libro (Griffiths)</span>
              {source === 'book' && <CheckCircle2 className="ml-auto h-4 w-4 text-violet-500" aria-hidden />}
            </div>
            <p className="text-xs leading-5 text-muted-foreground">
              Los 49 problemas textuales: resuelve, revela la respuesta final del solucionario y autoevalúate.
            </p>
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {MODES.map(m => {
            const Icon = m.icon
            return (
              <Card key={m.id} className="cursor-pointer hover:border-amber-400" >
                <button className="w-full p-6 text-left" onClick={() => start(m.id)}>
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold">{m.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {m.desc}
                    {source === 'book' && m.id === 'review' && ' — prioriza los problemas que aún no te salen'}
                  </p>
                </button>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  // ─────────────────────────────── Resumen ────────────────────────────────
  if (finished) {
    return (
      <div className="space-y-5">
        <Card>
          <CardContent className="p-8 text-center space-y-3">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h2 className="text-2xl font-bold">Sesión completada</h2>
            <div className="text-muted-foreground">
              {done} {done === 1 ? 'problema' : 'problemas'} · {correct} {correct === 1 ? 'correcto' : 'correctos'} · {secondsLeft !== null ? `${Math.floor((1800 - (secondsLeft ?? 0)) / 60)} min` : ''}
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Button variant="outline" onClick={() => setMode(null)}><RotateCcw className="mr-1.5 h-4 w-4" /> Otra sesión</Button>
              <SessionSummaryExportButton data={{
                title: 'Resumen de entrenamiento',
                sessionType: `Entrenamiento${source === 'book' ? ' · problemas del libro' : ''}`,
                date: new Date().toLocaleString(),
                stats: [
                  { label: 'Modo', value: MODES.find(m => m.id === mode)?.label ?? String(mode) },
                  { label: 'Fuente', value: source === 'book' ? 'Problemas del libro' : 'Ejercicios de la plataforma' },
                  { label: 'Problemas resueltos', value: String(done) },
                  { label: 'Correctos', value: String(correct) },
                  { label: 'Precisión', value: done > 0 ? `${Math.round((correct / done) * 100)}%` : '—' },
                ],
                notes: source === 'book'
                  ? 'Cada comparación quedó registrada en el progreso de los problemas del libro. Usa las pistas paso a paso con los que no salieron.'
                  : 'Sesión de práctica intensiva. Vuelve a los problemas incorrectos usando el modo examen o el repaso adaptativo.',
              }} />
              <Button onClick={() => setView({ name: source === 'book' ? 'book-problems' : 'progress' })}>
                {source === 'book' ? 'Ver problemas del libro' : 'Ver progreso'} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ────────────────────────────── En sesión ───────────────────────────────
  const target = TARGET_COUNTS[mode]
  const item = queue[idx] ?? ''
  const isBook = item.startsWith('bp:')
  const ex = !isBook ? EXERCISES.find(e => 'ex:' + e.id === item) : undefined
  const bp = isBook ? BOOK_PROBLEMS.find(p => 'bp:' + p.id === item) : undefined
  const bookOutcome = (outcome: CompareOutcome | null) => advance(outcome === 'match')

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200/60 bg-amber-50/40 p-3 dark:bg-amber-950/20">
        <div className="flex items-center gap-2 text-sm">
          <GitBranch className="h-4 w-4 text-amber-600" />
          <span className="font-semibold capitalize">{MODES.find(m => m.id === mode)?.label}</span>
          <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold',
            source === 'book' ? 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300')}>
            {source === 'book' ? 'Problemas del libro' : 'Ejercicios'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>Problema {done + 1}{target !== null ? ` / ${target}` : ''}</span>
          <span className="text-emerald-600 dark:text-emerald-400">{correct} ✓</span>
          {secondsLeft !== null && (
            <span className={cn('font-mono', secondsLeft < 60 ? 'text-rose-500' : 'text-muted-foreground')}>
              {String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:{String(secondsLeft % 60).padStart(2, '0')}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={finish}>Terminar</Button>
      </header>
      <Progress value={target !== null ? (done / target) * 100 : 0} className="h-1" />

      {isBook && bp ? (
        <div key={bp.id + '-' + idx} className="animate-question-in">
          <BookPracticeCard
            problemId={bp.id}
            onDone={bookOutcome}
            doneLabel={queue.length > idx + 1 ? 'Siguiente problema' : 'Terminar sesión'}
            compact
          />
        </div>
      ) : ex ? (
        <>
          <ExerciseView key={ex.id + '-' + idx} exercise={ex} />
          <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-muted/30 p-3">
            <Button size="sm" variant="default" onClick={() => advance(true)}>
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Lo resolví — siguiente
            </Button>
            <Button size="sm" variant="outline" onClick={() => advance(false)}>
              Me quedé atascado — siguiente
            </Button>
          </div>
        </>
      ) : (
        <Card><CardContent className="p-6">No hay más ejercicios. <Button size="sm" onClick={finish}>Terminar</Button></CardContent></Card>
      )}
    </div>
  )
}
