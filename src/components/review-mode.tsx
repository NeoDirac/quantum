'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useUI } from '@/lib/store'
import { ALL_EXERCISES } from '@/data/exercises'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { ExerciseView } from '@/components/exercise-view'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Brain, Target, TrendingDown, Sparkles, CheckCircle2, RotateCcw, ArrowRight, Zap } from 'lucide-react'
import { apiGet, apiPost, getOrCreateStudentId } from '@/lib/student'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface ConceptProgressRow {
  conceptId: string
  mastery: number
  correctCount: number
  errorsCount: number
  errorBreakdown: Record<string, number>
}

interface ReviewPlan {
  conceptId: string
  conceptTitle: string
  mastery: number
  reason: string
  exercises: typeof ALL_EXERCISES
}

export function ReviewMode() {
  const { setView } = useUI()
  const { toast } = useToast()
  const [phase, setPhase] = useState<'analyze' | 'plan' | 'running' | 'done'>('analyze')
  const [progressData, setProgressData] = useState<ConceptProgressRow[] | null>(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [results, setResults] = useState<{ correct: boolean; errorType?: string }[]>([])
  const studentId = getOrCreateStudentId()

  const analyze = async () => {
    try {
      const d = await apiGet(`/api/progress?studentId=${encodeURIComponent(studentId)}`)
      setProgressData(d.conceptProgress)
      setPhase('plan')
      if (!d.conceptProgress || d.conceptProgress.length === 0) {
        toast({ title: 'Plan inicial', description: 'Aún no tienes datos de progreso. Repasaremos un ejercicio por sección para diagnosticar.' })
      }
    } catch {
      toast({ title: 'No se pudo cargar el progreso', description: 'Inténtalo de nuevo.' })
    }
  }

  // Build a smart plan: weakest concepts first; if no data, pick a balanced mix.
  // Computed (not in an effect) so we avoid setState-in-effect lint errors.
  const plan: ReviewPlan[] = useMemo(() => {
    if (phase !== 'plan' && phase !== 'running' && phase !== 'done') return []
    if (!progressData) {
      // No progress data: build a balanced starter plan across sections.
      const sections = ['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7']
      const list: ReviewPlan[] = []
      for (const sid of sections) {
        const exs = ALL_EXERCISES.filter(e => e.sectionId === sid)
        if (exs.length > 0) {
          const c = ALL_CONCEPTS.find(x => exs[0].conceptIds.includes(x.id))
          list.push({
            conceptId: c?.id ?? sid,
            conceptTitle: c?.title ?? `Sección ${sid}`,
            mastery: 0,
            reason: 'Estudio inicial — aún sin datos de progreso',
            exercises: [exs[0]],
          })
        }
      }
      return list
    }
    const conceptMap = new Map(ALL_CONCEPTS.map(c => [c.id, c]))
    const rows = progressData.filter(r => conceptMap.has(r.conceptId))
    const planList: ReviewPlan[] = []
    if (rows.length > 0) {
      const weak = rows.filter(r => r.mastery < 80).sort((a, b) => a.mastery - b.mastery)
      for (const r of weak.slice(0, 6)) {
        const exs = ALL_EXERCISES.filter(e => e.conceptIds.includes(r.conceptId))
        if (exs.length > 0) {
          const reason = r.errorsCount > 0
            ? `${r.errorsCount} error(es) previo(s); dominio ${r.mastery}%`
            : `Dominio ${r.mastery}% — repasa para consolidar`
          planList.push({
            conceptId: r.conceptId,
            conceptTitle: conceptMap.get(r.conceptId)!.title,
            mastery: r.mastery,
            reason,
            exercises: exs,
          })
        }
      }
    }
    // If no weak concepts found, fall back to a balanced mix
    if (planList.length === 0) {
      const sections = ['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7']
      for (const sid of sections) {
        const exs = ALL_EXERCISES.filter(e => e.sectionId === sid)
        if (exs.length > 0) {
          const c = ALL_CONCEPTS.find(x => exs[0].conceptIds.includes(x.id))
          planList.push({
            conceptId: c?.id ?? sid,
            conceptTitle: c?.title ?? `Sección ${sid}`,
            mastery: 100,
            reason: 'Dominio completo — sesión de mantenimiento',
            exercises: [exs[0]],
          })
        }
      }
    }
    return planList
  }, [phase, progressData])

  const startReview = () => {
    setCurrentIdx(0)
    setResults([])
    setPhase('running')
  }

  const advance = useCallback((wasCorrect: boolean, errorType?: string) => {
    setResults(r => [...r, { correct: wasCorrect, errorType }])
    const studentIdNow = getOrCreateStudentId()
    const cur = plan[currentIdx]?.exercises[0]
    if (cur) {
      apiPost('/api/attempts', {
        studentId: studentIdNow, exerciseId: cur.id, sectionId: cur.sectionId,
        conceptId: cur.conceptIds[0], correct: wasCorrect, errorType,
        hintsUsed: 0, solutionRevealed: false,
      }).catch(() => {})
    }
    if (currentIdx < plan.length - 1) {
      setCurrentIdx(i => i + 1)
    } else {
      setPhase('done')
      toast({ title: 'Repaso completado', description: 'Tu progreso se ha actualizado.' })
    }
  }, [plan, currentIdx, toast])

  if (phase === 'analyze') {
    return (
      <div className="space-y-5">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
            <Brain className="h-6 w-6 text-violet-600" /> Repaso adaptativo
          </h1>
          <p className="text-muted-foreground">
            La plataforma analiza tu progreso y construye una sesión a medida: refuerza tus
            <span className="font-semibold text-foreground"> conceptos más débiles</span> y te ahorra tiempo en los que ya dominas.
          </p>
        </header>
        <Card className="border-violet-200/60 bg-violet-50/30 dark:bg-violet-950/10">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="font-semibold">¿Cómo funciona?</div>
                <ol className="ml-4 list-decimal space-y-1 text-muted-foreground">
                  <li>Analizamos tu dominio por concepto y el historial de errores.</li>
                  <li>Seleccionamos hasta 6 conceptos con dominio &lt; 80%.</li>
                  <li>Para cada uno, te proponemos un ejercicio representativo.</li>
                  <li>Tu resultado actualiza el dominio y prioriza futuros repasos.</li>
                </ol>
              </div>
            </div>
            <Button onClick={analyze} size="lg">
              <Zap className="mr-2 h-4 w-4" /> Analizar mi progreso
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (phase === 'plan') {
    return (
      <div className="space-y-5">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
            <Target className="h-6 w-6 text-violet-600" /> Tu plan de repaso
          </h1>
          <p className="text-muted-foreground">Ordenado de menor a mayor dominio. Refuerza primero lo que más te cuesta.</p>
        </header>
        {plan.length === 0 ? (
          <Card><CardContent className="p-6 text-sm text-muted-foreground">No se identificaron conceptos para repasar. ¡Buen trabajo!</CardContent></Card>
        ) : (
          <div className="space-y-3">
            {plan.map((p, i) => (
              <Card key={p.conceptId} className={cn('overflow-hidden', p.mastery < 50 ? 'border-rose-300/60 bg-rose-50/30 dark:bg-rose-950/10' : p.mastery < 80 ? 'border-amber-300/60 bg-amber-50/30 dark:bg-amber-950/10' : 'border-emerald-300/60 bg-emerald-50/30 dark:bg-emerald-950/10')}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
                    p.mastery < 50 ? 'bg-rose-500' : p.mastery < 80 ? 'bg-amber-500' : 'bg-emerald-500')}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{p.conceptTitle}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingDown className="h-3 w-3" />
                      {p.reason}
                    </div>
                    <Progress value={p.mastery} className="mt-1.5 h-1.5" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold tabular-nums">{p.mastery}%</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">dominio</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Button onClick={startReview} size="lg">
            <ArrowRight className="mr-2 h-4 w-4" /> Empezar repaso ({plan.length} ejercicios)
          </Button>
          <Button variant="ghost" onClick={() => setPhase('analyze')}>
            <RotateCcw className="mr-1.5 h-4 w-4" /> Volver a analizar
          </Button>
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    const correct = results.filter(r => r.correct).length
    return (
      <div className="space-y-5">
        <Card>
          <CardContent className="p-8 text-center space-y-3">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h2 className="text-2xl font-bold">Repaso completado</h2>
            <div className="text-muted-foreground">{correct} / {results.length} correctos</div>
            <Progress value={(correct / results.length) * 100} className="mx-auto max-w-md h-2" />
            <p className="max-w-md mx-auto pt-2 text-sm text-muted-foreground">
              Tu dominio por concepto se ha actualizado. Vuelve a repasar para seguir reforzando los conceptos que aún te cuestan.
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <Button variant="outline" onClick={() => setPhase('analyze')}><RotateCcw className="mr-1.5 h-4 w-4" /> Otro repaso</Button>
              <Button onClick={() => setView({ name: 'progress' })}>Ver progreso <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // running
  const cur = plan[currentIdx]
  const ex = cur?.exercises[0]
  if (!ex) return <div className="p-6">No hay ejercicios en el plan.</div>
  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-violet-200/60 bg-violet-50/40 p-3 dark:bg-violet-950/20">
        <div className="flex items-center gap-2 text-sm">
          <Brain className="h-4 w-4 text-violet-600" />
          <span className="font-semibold">Repaso adaptativo</span>
          <span className="text-muted-foreground">· {cur.conceptTitle}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span>Ejercicio {currentIdx + 1} / {plan.length}</span>
          <span className="text-emerald-600 dark:text-emerald-400">{results.filter(r => r.correct).length} ✓</span>
        </div>
      </header>
      <Progress value={(currentIdx / plan.length) * 100} className="h-1" />
      <ExerciseView key={ex.id + '-rev-' + currentIdx} exercise={ex} />
      <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-muted/30 p-3">
        <Button size="sm" variant="default" onClick={() => advance(true)}>
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Lo resolví — siguiente concepto
        </Button>
        <Button size="sm" variant="outline" onClick={() => advance(false)}>
          Me costó — siguiente
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setPhase('done')}>Terminar</Button>
      </div>
    </div>
  )
}
