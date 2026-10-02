'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useUI } from '@/lib/store'
import { EXERCISES } from '@/data/exercises'
import { ExerciseView } from '@/components/exercise-view'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { GitBranch, Timer, Target, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react'
import { apiPost, getOrCreateStudentId } from '@/lib/student'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { SECTIONS } from '@/data/structure'

type Mode = 'timed-30' | 'timed-60' | 'count-10' | 'review'

const MODES: { id: Mode; label: string; desc: string; icon: any }[] = [
  { id: 'timed-30', label: '30 minutos', desc: 'Sesión corta de inmersión', icon: Timer },
  { id: 'timed-60', label: '1 hora', desc: 'Repaso profundo', icon: Timer },
  { id: 'count-10', label: '10 problemas', desc: 'Objetivo por número', icon: Target },
  { id: 'review', label: 'Repaso pre-examen', desc: 'Refuerza conceptos difíciles', icon: GitBranch },
]

export function TrainingMode() {
  const { setView } = useUI()
  const { toast } = useToast()
  const [mode, setMode] = useState<Mode | null>(null)
  const [queue, setQueue] = useState<string[]>([])
  const [idx, setIdx] = useState(0)
  const [done, setDone] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [startTs, setStartTs] = useState<number>(0)
  const [finished, setFinished] = useState(false)

  // Refs to read latest state inside callbacks/effects without retriggering.
  const stateRef = useRef({ mode, done, correct, startTs })
  stateRef.current = { mode, done, correct, startTs }

  const finish = useCallback(async () => {
    const s = stateRef.current
    setFinished(true)
    if (s.mode) {
      try {
        await apiPost('/api/training', {
          studentId: getOrCreateStudentId(), mode: s.mode,
          targetSeconds: s.mode === 'timed-30' ? 1800 : s.mode === 'timed-60' ? 3600 : null,
          targetCount: s.mode === 'count-10' ? 10 : s.mode === 'review' ? 8 : null,
          problemsDone: s.done, correctCount: s.correct,
          conceptsTouched: [], startedAt: s.startTs, finishedAt: Date.now(),
        })
      } catch {}
    }
    toast({ title: 'Sesión finalizada', description: `${s.done} problemas · ${s.correct} correctos` })
  }, [toast])

  useEffect(() => {
    if (secondsLeft === null) return
    if (secondsLeft <= 0) { finish(); return }
    const t = setTimeout(() => setSecondsLeft(s => (s ?? 1) - 1), 1000)
    return () => clearTimeout(t)
  }, [secondsLeft, finish])

  const start = (m: Mode) => {
    setMode(m)
    // build a shuffled queue of exercise ids (cycling through all to allow many)
    const ids = [...EXERCISES.map(e => e.id), ...EXERCISES.map(e => e.id)]
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[ids[i], ids[j]] = [ids[j], ids[i]]
    }
    setQueue(m === 'count-10' ? ids.slice(0, 10) : m === 'review' ? ids.slice(0, 8) : ids)
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
    if (s.mode === 'count-10' && s.done + 1 >= 10) { finish(); return }
    if (s.mode === 'review' && s.done + 1 >= 8) { finish(); return }
    setQueue(q => {
      if (q.length > idx + 1) setIdx(i => i + 1)
      else finish()
      return q
    })
  }, [idx, finish])

  if (!mode) {
    return (
      <div className="space-y-5">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-amber-600" /> Entrenamiento intensivo
          </h1>
          <p className="text-muted-foreground">Elige un formato. La sesión se adapta: a mayor acierto, mayor velocidad; si fallas, el sistema sugiere volver a conceptos.</p>
        </header>
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
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </button>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="space-y-5">
        <Card>
          <CardContent className="p-8 text-center space-y-3">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h2 className="text-2xl font-bold">Sesión completada</h2>
            <div className="text-muted-foreground">
              {done} problemas · {correct} correctos · {secondsLeft !== null ? `${Math.floor((1800 - (secondsLeft ?? 0)) / 60)} min` : ''}
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <Button variant="outline" onClick={() => setMode(null)}><RotateCcw className="mr-1.5 h-4 w-4" /> Otra sesión</Button>
              <Button onClick={() => setView({ name: 'progress' })}>Ver progreso <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const ex = EXERCISES.find(e => e.id === queue[idx])
  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200/60 bg-amber-50/40 p-3 dark:bg-amber-950/20">
        <div className="flex items-center gap-2 text-sm">
          <GitBranch className="h-4 w-4 text-amber-600" />
          <span className="font-semibold capitalize">{MODES.find(m => m.id === mode)?.label}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>Problema {done + 1}{mode === 'count-10' || mode === 'review' ? ` / ${mode === 'count-10' ? 10 : 8}` : ''}</span>
          <span className="text-emerald-600 dark:text-emerald-400">{correct} ✓</span>
          {secondsLeft !== null && (
            <span className={cn('font-mono', secondsLeft < 60 ? 'text-rose-500' : 'text-muted-foreground')}>
              {String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:{String(secondsLeft % 60).padStart(2, '0')}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={finish}>Terminar</Button>
      </header>
      <Progress value={mode === 'count-10' ? (done / 10) * 100 : mode === 'review' ? (done / 8) * 100 : 0} className="h-1" />
      {ex ? (
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
