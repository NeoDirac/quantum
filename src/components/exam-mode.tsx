'use client'

import { useState, useMemo, useEffect } from 'react'
import { useUI } from '@/lib/store'
import { EXERCISES } from '@/data/exercises'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { SECTIONS } from '@/data/structure'
import { RenderBlocks } from '@/components/render-blocks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Timer, CheckCircle2, XCircle, RotateCcw, AlertTriangle, Trophy, ArrowRight, Target } from 'lucide-react'
import { apiPost, apiGet, getOrCreateStudentId } from '@/lib/student'
import { useToast } from '@/hooks/use-toast'
import { ERROR_TYPE_LABELS, type ErrorType } from '@/lib/content-types'
import { cn } from '@/lib/utils'

interface ExamQ {
  exerciseId: string
  picked: string | null
  correctId: string
  errorType?: ErrorType
  conceptIds: string[]
  sectionId: string
}

const CONCEPT_ID_TO_TITLE: Record<string, string> = Object.fromEntries(ALL_CONCEPTS.map(c => [c.id, c.title]))

export function ExamMode() {
  const { setView } = useUI()
  const { toast } = useToast()
  const [phase, setPhase] = useState<'setup' | 'running' | 'done'>('setup')
  const [questions, setQuestions] = useState<ExamQ[]>([])
  const [current, setCurrent] = useState(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [weakConcepts, setWeakConcepts] = useState<{ conceptId: string; mastery: number }[]>([])
  const [adaptiveMode, setAdaptiveMode] = useState(true)

  // Fetch the student's weak concepts when entering setup, to weight the exam.
  useEffect(() => {
    if (phase !== 'setup') return
    let mounted = true
    const studentId = getOrCreateStudentId()
    apiGet(`/api/progress?studentId=${encodeURIComponent(studentId)}`)
      .then(d => {
        if (!mounted) return
        const weak = (d.conceptProgress || [])
          .filter((r: any) => r.mastery < 80)
          .sort((a: any, b: any) => a.mastery - b.mastery)
          .map((r: any) => ({ conceptId: r.conceptId, mastery: r.mastery }))
        if (mounted) setWeakConcepts(weak)
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [phase])

  // Adaptive sample: weight selection toward weak concepts (if available & adaptiveMode on),
  // but still ensure section coverage. Falls back to balanced random for new students.
  const sample = useMemo(() => {
    const want = 8
    const pool = [...EXERCISES]
    const picked: typeof EXERCISES = []
    const usedIds = new Set<string>()

    if (adaptiveMode && weakConcepts.length > 0) {
      // 1) Pick exercises targeting the weakest concepts first (up to ~half the exam).
      const weakTarget = Math.min(Math.floor(want / 2), weakConcepts.length)
      for (let i = 0; i < weakTarget && picked.length < want; i++) {
        const cid = weakConcepts[i].conceptId
        const candidates = pool.filter(e => e.conceptIds.includes(cid) && !usedIds.has(e.id))
        if (candidates.length > 0) {
          const e = candidates[Math.floor(Math.random() * candidates.length)]
          picked.push(e); usedIds.add(e.id)
        }
      }
    }
    // 2) Ensure section coverage: one from each section not yet represented.
    const bySection = new Map<string, typeof EXERCISES>()
    pool.forEach(e => { if (!usedIds.has(e.id)) { if (!bySection.has(e.sectionId)) bySection.set(e.sectionId, []); bySection.get(e.sectionId)!.push(e) } })
    for (const [sid, list] of bySection) {
      if (picked.length >= want) break
      if (!picked.find(p => p.sectionId === sid) && list.length > 0) {
        const e = list[Math.floor(Math.random() * list.length)]
        picked.push(e); usedIds.add(e.id)
      }
    }
    // 3) Fill remaining slots randomly from the unused pool.
    const remaining = pool.filter(e => !usedIds.has(e.id))
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[remaining[i], remaining[j]] = [remaining[j], remaining[i]]
    }
    while (picked.length < want && remaining.length > 0) {
      picked.push(remaining.pop()!)
    }
    return picked.slice(0, want)
  }, [phase, adaptiveMode, weakConcepts])

  const start = () => {
    // build questions from sampled exercises (use first check-like structure if available, else a "did you solve?" framing)
    const qs: ExamQ[] = sample.map(e => ({
      exerciseId: e.id,
      picked: null,
      correctId: 'solved', // marker: we ask student to self-report correctness
      errorType: undefined,
      conceptIds: e.conceptIds,
      sectionId: e.sectionId,
    }))
    setQuestions(qs)
    setCurrent(0)
    setStartTime(Date.now())
    setPhase('running')
  }

  const markAnswer = (solved: boolean, errorType?: ErrorType) => {
    setQuestions(prev => {
      const n = [...prev]
      n[current] = { ...n[current], picked: solved ? 'solved' : 'wrong', errorType }
      return n
    })
    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
    } else {
      finish()
    }
  }

  const finish = async () => {
    const correct = questions.filter(q => q.picked === 'solved').length
    const gaps: Record<string, number> = {}
    const sectionBreak: Record<string, { correct: number; total: number }> = {}
    questions.forEach(q => {
      if (q.picked !== 'solved') {
        q.conceptIds.forEach(cid => { gaps[cid] = (gaps[cid] || 0) + 1 })
      }
      const sid = q.sectionId
      if (!sectionBreak[sid]) sectionBreak[sid] = { correct: 0, total: 0 }
      sectionBreak[sid].total++
      if (q.picked === 'solved') sectionBreak[sid].correct++
    })
    const studentId = getOrCreateStudentId()
    try {
      await apiPost('/api/exam', {
        studentId, title: `Examen — ${new Date().toLocaleString()}`,
        totalQuestions: questions.length, correctCount: correct,
        conceptGaps: gaps, sectionBreakdown: sectionBreak,
        questionLog: questions, startedAt: startTime, finishedAt: Date.now(),
      })
    } catch {}
    setPhase('done')
    toast({ title: 'Examen finalizado', description: `${correct}/${questions.length} correctas` })
  }

  if (phase === 'setup') {
    return (
      <div className="space-y-5">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
            <Timer className="h-6 w-6 text-rose-600" /> Modo examen
          </h1>
          <p className="text-muted-foreground">Sin pistas. Mezcla de preguntas conceptuales, identificación de potencial, fronteras y cálculo. Al final, un informe de conceptos a reforzar.</p>
        </header>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-sm">
              El examen selecciona <span className="font-semibold">8 ejercicios</span> balanceados por sección. Para cada uno, abre el problema, inténtalo sin pistas y autorreporta si lo resolviste o en qué fallaste.
            </div>
            {/* Adaptive mode toggle */}
            <div className="rounded-lg border border-violet-200/60 bg-violet-50/40 p-4 dark:border-violet-900/50 dark:bg-violet-950/20">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={adaptiveMode} onChange={e => setAdaptiveMode(e.target.checked)} className="mt-0.5 accent-violet-600" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Target className="h-4 w-4 text-violet-600" /> Examen adaptativo
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {weakConcepts.length > 0
                      ? `Se priorizarán ${Math.min(4, weakConcepts.length)} preguntas sobre tus conceptos más débiles (tienes ${weakConcepts.length} concepto(s) con dominio < 80%).`
                      : 'Aún no tienes datos de progreso. El examen será balanceado por sección; al resolver ejercicios, futuros exámenes priorizarán tus debilidades.'}
                  </p>
                </div>
              </label>
              {weakConcepts.length > 0 && adaptiveMode && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {weakConcepts.slice(0, 6).map(w => (
                    <span key={w.conceptId} className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                      {CONCEPT_ID_TO_TITLE[w.conceptId] ?? w.conceptId} · {w.mastery}%
                    </span>
                  ))}
                </div>
              )}
            </div>
            <Button onClick={start} size="lg">
              <Timer className="mr-2 h-4 w-4" /> Comenzar examen
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (phase === 'running') {
    const q = questions[current]
    const ex = EXERCISES.find(e => e.id === q.exerciseId)!
    return (
      <div className="space-y-5">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Examen</h1>
            <p className="text-xs text-muted-foreground">Pregunta {current + 1} de {questions.length}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setPhase('setup')}>
            <RotateCcw className="mr-1 h-3.5 w-3.5" /> Abortar
          </Button>
        </header>
        <Progress value={(current / questions.length) * 100} className="h-1.5" />
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono font-semibold text-rose-600">{ex.sectionId}</span>
              <span>·</span>
              <span>{ex.type}</span>
            </div>
            <CardTitle>{ex.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RenderBlocks blocks={ex.statement} />
            <div className="rounded-lg border border-amber-200/60 bg-amber-50/40 p-4 dark:bg-amber-950/20">
              <div className="mb-2 text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" /> Intenta resolverlo sin pistas.
              </div>
              <p className="text-xs text-muted-foreground">Cuando termines, autorreporta tu resultado. La plataforma registrará el tipo de error para tu informe de conceptos a reforzar.</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
              <div className="text-sm font-semibold">¿Cómo te fue?</div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="default" onClick={() => markAnswer(true)}>
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Lo resolví
                </Button>
                {Object.entries(ERROR_TYPE_LABELS).map(([k, l]) => (
                  <Button key={k} size="sm" variant="outline" onClick={() => markAnswer(false, k as ErrorType)}>
                    <XCircle className="mr-1.5 h-3.5 w-3.5" /> {l}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={() => markAnswer(false)}>
                Saltar / no lo intenté
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // done
  const correct = questions.filter(q => q.picked === 'solved').length
  const gaps: Record<string, number> = {}
  questions.forEach(q => { if (q.picked !== 'solved') q.conceptIds.forEach(cid => { gaps[cid] = (gaps[cid] || 0) + 1 }) })
  const gapList = Object.entries(gaps).sort((a, b) => b[1] - a[1])
  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" /> Resultado del examen
        </h1>
      </header>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl font-bold">{correct}<span className="text-2xl text-muted-foreground">/{questions.length}</span></div>
            <div className="text-sm text-muted-foreground">correctas</div>
          </div>
          <Progress value={(correct / questions.length) * 100} className="h-2" />
          {gapList.length > 0 ? (
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <AlertTriangle className="h-4 w-4 text-rose-600" /> Conceptos a reforzar
              </h3>
              <div className="space-y-1.5">
                {gapList.map(([cid, n]) => (
                  <div key={cid} className="flex items-center justify-between rounded-md border border-rose-200/60 bg-rose-50/40 px-3 py-2 text-sm dark:bg-rose-950/20">
                    <span>{CONCEPT_ID_TO_TITLE[cid] ?? cid}</span>
                    <Badge variant="outline" className="border-rose-300 text-rose-700 dark:text-rose-300">{n} error{n > 1 ? 'es' : ''}</Badge>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Estudia esos conceptos y vuelve a intentarlo. El progreso se ha guardado en tu panel.</p>
            </div>
          ) : (
            <div className="rounded-md border border-emerald-300 bg-emerald-50/60 p-4 text-sm dark:bg-emerald-950/30">
              ¡Sin errores! Has demostrado soltura en todos los conceptos del examen.
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={() => setPhase('setup')} variant="outline">
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Otro examen
            </Button>
            <Button onClick={() => setView({ name: 'progress' })} variant="ghost">
              Ver mi progreso <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
