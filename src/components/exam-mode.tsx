'use client'

import { useState, useMemo, useEffect } from 'react'
import { useUI } from '@/lib/store'
import { EXERCISES } from '@/data/exercises'
import { BOOK_PROBLEMS } from '@/data/book-problems'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { SECTIONS } from '@/data/structure'
import { RenderBlocks } from '@/components/render-blocks'
import { BookPracticeCard, type CompareOutcome } from '@/components/book-practice-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Timer, CheckCircle2, XCircle, RotateCcw, AlertTriangle, Trophy, ArrowRight, Target, Flag, Layers, Star, BookMarked, ListChecks } from 'lucide-react'
import { apiPost, apiGet, getOrCreateStudentId } from '@/lib/student'
import { useToast } from '@/hooks/use-toast'
import { SessionSummaryExportButton } from '@/components/session-summary'
import { ERROR_TYPE_LABELS, type ErrorType } from '@/lib/content-types'
import { useBookProgress } from '@/lib/book-progress'
import { cn } from '@/lib/utils'

interface ExamQ {
  exerciseId: string
  bookProblemId?: string        // presente cuando la pregunta es un problema del libro
  picked: string | null
  correctId: string
  errorType?: ErrorType
  conceptIds: string[]
  sectionId: string
  timeSpentMs?: number   // per-question time tracking
  flagged?: boolean      // student flagged for review
  compareOutcome?: CompareOutcome  // problemas del libro: match/partial/no
}

const CONCEPT_ID_TO_TITLE: Record<string, string> = Object.fromEntries(ALL_CONCEPTS.map(c => [c.id, c.title]))
const SECTION_ID_TO_TITLE: Record<string, string> = Object.fromEntries(SECTIONS.map(s => [s.id, s.title]))

const COMPARE_LABEL: Record<CompareOutcome, string> = {
  match: 'Coincidió',
  partial: 'Parcial',
  no: 'Todavía no',
}

export function ExamMode() {
  const { setView } = useUI()
  const { toast } = useToast()
  const [phase, setPhase] = useState<'setup' | 'running' | 'review' | 'done'>('setup')
  const [questions, setQuestions] = useState<ExamQ[]>([])
  const [current, setCurrent] = useState(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [weakConcepts, setWeakConcepts] = useState<{ conceptId: string; mastery: number }[]>([])
  const [adaptiveMode, setAdaptiveMode] = useState(true)
  const [timeLimitMin, setTimeLimitMin] = useState<number | null>(null) // null = no limit
  const [elapsed, setElapsed] = useState(0)
  const [questionStart, setQuestionStart] = useState<number>(0)
  const [flaggedOnly, setFlaggedOnly] = useState(false)
  const [selectedSections, setSelectedSections] = useState<Set<string>>(new Set(['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7']))
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<number>>(new Set([0, 1, 2, 3]))
  const [source, setSource] = useState<'platform' | 'book'>('platform')
  const [onlyPending, setOnlyPending] = useState(false)
  const { progress: bookProgress } = useBookProgress()

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

    // ── Problemas del libro (Griffiths) ─────────────────────────────────────
    if (source === 'book') {
      let pool = BOOK_PROBLEMS.filter(p => selectedSections.has(p.sectionId) && selectedDifficulties.has(p.stars))
      if (onlyPending) pool = pool.filter(p => !bookProgress[p.id]?.solved)
      const picked: typeof BOOK_PROBLEMS = []
      const usedIds = new Set<string>()

      if (adaptiveMode) {
        // 1) Prioriza: primero los que fallaste ("no"), luego "parcial", luego no resueltos.
        const rank = (id: string) => {
          const e = bookProgress[id]
          if (!e) return 2
          if (e.lastOutcome === 'no') return 0
          if (e.lastOutcome === 'partial') return 1
          if (e.solved) return 3
          return 2
        }
        const sorted = [...pool].sort((a, b) => rank(a.id) - rank(b.id))
        const adaptiveTarget = Math.min(Math.floor(want / 2), sorted.filter(p => rank(p.id) < 2).length)
        for (let i = 0; i < adaptiveTarget && picked.length < want; i++) {
          picked.push(sorted[i]); usedIds.add(sorted[i].id)
        }
      }

      // 2) Cobertura de secciones: al menos uno de cada sección no representada.
      const bySection = new Map<string, typeof BOOK_PROBLEMS>()
      pool.forEach(p => { if (!usedIds.has(p.id)) { if (!bySection.has(p.sectionId)) bySection.set(p.sectionId, []); bySection.get(p.sectionId)!.push(p) } })
      for (const [sid, list] of bySection) {
        if (picked.length >= want) break
        if (!picked.find(p => p.sectionId === sid) && list.length > 0) {
          const p = list[Math.floor(Math.random() * list.length)]
          picked.push(p); usedIds.add(p.id)
        }
      }

      // 3) Rellena el resto al azar.
      const remaining = pool.filter(p => !usedIds.has(p.id))
      for (let i = remaining.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[remaining[i], remaining[j]] = [remaining[j], remaining[i]]
      }
      while (picked.length < want && remaining.length > 0) {
        picked.push(remaining.pop()!)
      }
      return picked.slice(0, want).map(p => p.id)
    }

    // ── Ejercicios de la plataforma (flujo original) ────────────────────────
    const pool = [...EXERCISES].filter(e => selectedSections.has(e.sectionId) && selectedDifficulties.has(e.difficulty))
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
    return picked.slice(0, want).map(e => e.id)
  }, [phase, adaptiveMode, weakConcepts, selectedSections, selectedDifficulties, source, bookProgress, onlyPending])

  const poolCount = useMemo(
    () => {
      if (source !== 'book') return EXERCISES.filter(e => selectedSections.has(e.sectionId) && selectedDifficulties.has(e.difficulty)).length
      let pool = BOOK_PROBLEMS.filter(p => selectedSections.has(p.sectionId) && selectedDifficulties.has(p.stars))
      if (onlyPending) pool = pool.filter(p => !bookProgress[p.id]?.solved)
      return pool.length
    },
    [selectedSections, selectedDifficulties, source, bookProgress, onlyPending],
  )

  const start = () => {
    // build questions from sampled ids (book problems or platform exercises)
    const qs: ExamQ[] = sample.map(id => source === 'book'
      ? {
          exerciseId: '',
          bookProblemId: id,
          picked: null,
          correctId: 'solved', // marker: comparison outcome decides
          errorType: undefined,
          conceptIds: [],
          sectionId: BOOK_PROBLEMS.find(p => p.id === id)?.sectionId ?? '',
          timeSpentMs: 0,
        }
      : (() => {
          const e = EXERCISES.find(x => x.id === id)!
          return {
            exerciseId: e.id,
            picked: null,
            correctId: 'solved',
            errorType: undefined,
            conceptIds: e.conceptIds,
            sectionId: e.sectionId,
            timeSpentMs: 0,
          } as ExamQ
        })(),
    )
    setQuestions(qs)
    setCurrent(0)
    setStartTime(Date.now())
    setElapsed(0)
    setQuestionStart(Date.now())
    setPhase('running')
  }

  // Track per-question time: reset the timer whenever `current` changes during running.
  useEffect(() => {
    if (phase === 'running') setQuestionStart(Date.now())
  }, [current, phase])

  // Countdown timer effect: ticks every second while running.
  useEffect(() => {
    if (phase !== 'running') return
    const t = setInterval(() => {
      const e = Math.floor((Date.now() - startTime) / 1000)
      setElapsed(e)
      if (timeLimitMin !== null && e >= timeLimitMin * 60) {
        // time's up — go to review
        setPhase('review')
        toast({ title: 'Tiempo agotado', description: `Límite de ${timeLimitMin} min alcanzado.` })
      }
    }, 1000)
    return () => clearInterval(t)
  }, [phase, startTime, timeLimitMin, toast])

  const markAnswer = (solved: boolean, errorType?: ErrorType) => {
    const timeSpent = Date.now() - questionStart
    setQuestions(prev => {
      const n = [...prev]
      n[current] = { ...n[current], picked: solved ? 'solved' : 'wrong', errorType, timeSpentMs: (n[current].timeSpentMs || 0) + timeSpent }
      return n
    })
    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
    } else {
      // all answered — go to review screen before finalizing
      setPhase('review')
    }
  }

  // Pregunta de problema del libro: la comparación con la respuesta final ES la respuesta.
  const bookDone = (outcome: CompareOutcome | null) => {
    const timeSpent = Date.now() - questionStart
    setQuestions(prev => {
      const n = [...prev]
      n[current] = {
        ...n[current],
        picked: outcome === 'match' ? 'solved' : 'wrong',
        compareOutcome: outcome ?? undefined,
        timeSpentMs: (n[current].timeSpentMs || 0) + timeSpent,
      }
      return n
    })
    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
    } else {
      setPhase('review')
    }
  }

  // Jump to a specific question (from the review screen) to change the answer.
  const jumpTo = (idx: number) => {
    setCurrent(idx)
    setPhase('running')
  }
  // Toggle the flag on the current question (during running) or by index (review).
  const toggleFlag = (idx?: number) => {
    const i = idx ?? current
    setQuestions(prev => {
      const n = [...prev]
      n[i] = { ...n[i], flagged: !n[i].flagged }
      return n
    })
  }
  // Change a single answer without leaving the review screen.
  const setAnswer = (idx: number, solved: boolean, errorType?: ErrorType) => {
    setQuestions(prev => {
      const n = [...prev]
      n[idx] = { ...n[idx], picked: solved ? 'solved' : 'wrong', errorType }
      return n
    })
  }

  const finish = async () => {
    const correct = questions.filter(q => q.picked === 'solved').length
    const gaps: Record<string, number> = {}
    const sectionBreak: Record<string, { correct: number; total: number }> = {}
    questions.forEach(q => {
      if (q.picked !== 'solved') {
        q.conceptIds.forEach(cid => { gaps[cid] = (gaps[cid] || 0) + 1 })
        // Para problemas del libro (sin conceptos asociados) contamos la sección.
        if (q.bookProblemId) gaps[q.sectionId] = (gaps[q.sectionId] || 0) + 1
      }
      const sid = q.sectionId
      if (!sectionBreak[sid]) sectionBreak[sid] = { correct: 0, total: 0 }
      sectionBreak[sid].total++
      if (q.picked === 'solved') sectionBreak[sid].correct++
    })
    const studentId = getOrCreateStudentId()
    try {
      await apiPost('/api/exam', {
        studentId, title: `Examen${source === 'book' ? ' (problemas del libro)' : ''} — ${new Date().toLocaleString()}`,
        totalQuestions: questions.length, correctCount: correct,
        conceptGaps: source === 'book' ? {} : gaps, sectionBreakdown: sectionBreak,
        questionLog: questions, startedAt: startTime, finishedAt: Date.now(),
      })
    } catch {}
    setPhase('done')
    toast({ title: 'Examen finalizado', description: `${correct}/${questions.length} correctas` })
  }

  // ══════════════════════════════════ SETUP ═════════════════════════════════
  if (phase === 'setup') {
    return (
      <div className="space-y-5">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
            <Timer className="h-6 w-6 text-rose-600" /> Modo examen
          </h1>
          <p className="text-muted-foreground">Sin pistas. Mezcla de preguntas conceptuales, identificación de potencial, fronteras y cálculo. Al final, un informe de conceptos a reforzar.</p>
        </header>

        {/* Selector de fuente: ejercicios de la plataforma o problemas del libro */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setSource('platform')}
            className={cn('group relative overflow-hidden rounded-xl border p-4 text-left transition-all',
              source === 'platform'
                ? 'border-rose-400 bg-rose-50/50 shadow-sm dark:border-rose-700 dark:bg-rose-950/20'
                : 'border-border hover:border-rose-300 hover:bg-rose-50/20 dark:hover:bg-rose-950/10')}
          >
            <div className="mb-1.5 flex items-center gap-2">
              <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                source === 'platform' ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-sm' : 'bg-muted text-muted-foreground')}>
                <ListChecks className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-sm font-bold">Ejercicios de la plataforma</span>
              {source === 'platform' && <CheckCircle2 className="ml-auto h-4 w-4 text-rose-500" aria-hidden />}
            </div>
            <p className="text-xs leading-5 text-muted-foreground">
              49 ejercicios guiados originales (conceptuales, fronteras, cálculo). Autorreporte de resultado y tipos de error.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setSource('book')}
            className={cn('group relative overflow-hidden rounded-xl border p-4 text-left transition-all',
              source === 'book'
                ? 'border-violet-400 bg-violet-50/50 shadow-sm dark:border-violet-700 dark:bg-violet-950/20'
                : 'border-border hover:border-violet-300 hover:bg-violet-50/20 dark:hover:bg-violet-950/10')}
          >
            <div className="mb-1.5 flex items-center gap-2">
              <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                source === 'book' ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm' : 'bg-muted text-muted-foreground')}>
                <BookMarked className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-sm font-bold">Problemas del libro (Griffiths)</span>
              {source === 'book' && <CheckCircle2 className="ml-auto h-4 w-4 text-violet-500" aria-hidden />}
            </div>
            <p className="text-xs leading-5 text-muted-foreground">
              Los 49 problemas textuales del Capítulo 2, sin pistas. Al terminar cada uno, compara tu resultado con la respuesta final del solucionario.
            </p>
          </button>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-sm">
              El examen selecciona <span className="font-semibold">8 {source === 'book' ? 'problemas' : 'ejercicios'}</span> balanceados por sección.
              {source === 'book'
                ? ' Para cada uno, resuelve en papel, autorreporta y compara con la respuesta final del solucionario oficial.'
                : ' Para cada uno, abre el problema, inténtalo sin pistas y autorreporta si lo resolviste o en qué fallaste.'}
            </div>

            {/* Filtro rápido: solo pendientes (problemas del libro) */}
            {source === 'book' && (() => {
              const pending = BOOK_PROBLEMS.filter(p => !bookProgress[p.id]?.solved).length
              return (
                <label className={cn('flex items-center gap-2.5 rounded-lg border border-border bg-muted/20 px-3.5 py-2.5 text-sm transition-colors',
                  pending === 0 ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:bg-muted/40')}>
                  <input
                    type="checkbox"
                    checked={onlyPending}
                    onChange={e => setOnlyPending(e.target.checked)}
                    disabled={pending === 0}
                    className="accent-violet-600"
                  />
                  <span className={pending === 0 ? 'text-muted-foreground' : ''}>
                    Solo problemas que aún no he resuelto
                    <span className="ml-1.5 rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                      {pending} pendientes
                    </span>
                  </span>
                  {pending === 0 && <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">¡todo resuelto!</span>}
                </label>
              )
            })()}

            {/* Adaptive mode toggle */}
            <div className="rounded-lg border border-violet-200/60 bg-violet-50/40 p-4 dark:border-violet-900/50 dark:bg-violet-950/20">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={adaptiveMode} onChange={e => setAdaptiveMode(e.target.checked)} className="mt-0.5 accent-violet-600" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Target className="h-4 w-4 text-violet-600" /> Examen adaptativo
                  </div>
                  {source === 'book' ? (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Se priorizarán los problemas que aún no resuelves y los que en comparaciones anteriores quedaron como «todavía no» o «parcial».
                    </p>
                  ) : (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {weakConcepts.length > 0
                        ? `Se priorizarán ${Math.min(4, weakConcepts.length)} preguntas sobre tus conceptos más débiles (tienes ${weakConcepts.length} concepto(s) con dominio < 80%).`
                        : 'Aún no tienes datos de progreso. El examen será balanceado por sección; al resolver ejercicios, futuros exámenes priorizarán tus debilidades.'}
                    </p>
                  )}
                </div>
              </label>
              {source === 'platform' && weakConcepts.length > 0 && adaptiveMode && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {weakConcepts.slice(0, 6).map(w => (
                    <span key={w.conceptId} className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                      {CONCEPT_ID_TO_TITLE[w.conceptId] ?? w.conceptId} · {w.mastery}%
                    </span>
                  ))}
                </div>
              )}
              {source === 'book' && adaptiveMode && (() => {
                const unsolved = BOOK_PROBLEMS.filter(p => !bookProgress[p.id]?.solved).length
                const failed = BOOK_PROBLEMS.filter(p => bookProgress[p.id]?.lastOutcome === 'no' || bookProgress[p.id]?.lastOutcome === 'partial').length
                return (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                      {unsolved} sin resolver
                    </span>
                    {failed > 0 && (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
                        {failed} con comparación desfavorable
                      </span>
                    )}
                  </div>
                )
              })()}
            </div>

            {/* Time limit option */}
            <div className="rounded-lg border border-sky-200/60 bg-sky-50/40 p-4 dark:border-sky-900/50 dark:bg-sky-950/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Timer className="h-4 w-4 text-sky-600" /> Límite de tiempo (opcional)
              </div>
              <div className="flex flex-wrap gap-2">
                {[null, 10, 15, 20, 30].map(opt => (
                  <button
                    key={String(opt)}
                    type="button"
                    onClick={() => setTimeLimitMin(opt)}
                    className={cn('rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                      timeLimitMin === opt
                        ? 'border-sky-400 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100'
                        : 'border-border text-muted-foreground hover:bg-muted')}
                  >
                    {opt === null ? 'Sin límite' : `${opt} min`}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Si se agota el tiempo, el examen pasa a la pantalla de revisión con lo que tengas contestado.
              </p>
            </div>

            {/* Section pool configuration */}
            <div className="rounded-lg border border-teal-200/60 bg-teal-50/40 p-4 dark:border-teal-900/50 dark:bg-teal-950/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Layers className="h-4 w-4 text-teal-600" /> Secciones incluidas
              </div>
              <div className="flex flex-wrap gap-2">
                {SECTIONS.filter(s => s.chapterId === 'ch2').map(s => {
                  const active = selectedSections.has(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSections(prev => {
                        const next = new Set(prev)
                        if (next.has(s.id)) next.delete(s.id)
                        else next.add(s.id)
                        return next
                      })}
                      className={cn('rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                        active
                          ? 'border-teal-400 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100'
                          : 'border-border text-muted-foreground hover:bg-muted')}
                    >
                      <span className="font-mono">{s.id}</span> {s.title}
                    </button>
                  )
                })}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Selecciona las secciones de las que saldrán las preguntas. El examen selecciona
                <span className="font-semibold text-foreground"> {Math.min(8, poolCount)}</span> {source === 'book' ? 'problemas' : 'ejercicios'}
                de un total de <span className="font-semibold text-foreground">{poolCount}</span> disponibles.
              </p>
            </div>

            {/* Difficulty filter */}
            <div className="rounded-lg border border-amber-200/60 bg-amber-50/40 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Star className="h-4 w-4 text-amber-600" /> Dificultad
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { d: 0, label: 'Sin estrellas', star: '' },
                  { d: 1, label: 'Esencial', star: '★' },
                  { d: 2, label: 'Más difícil', star: '★★' },
                  { d: 3, label: 'Retador', star: '★★★' },
                ].map(opt => {
                  const active = selectedDifficulties.has(opt.d)
                  return (
                    <button
                      key={opt.d}
                      type="button"
                      onClick={() => setSelectedDifficulties(prev => {
                        const next = new Set(prev)
                        if (next.has(opt.d)) next.delete(opt.d)
                        else next.add(opt.d)
                        return next
                      })}
                      className={cn('rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                        active
                          ? 'border-amber-400 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'
                          : 'border-border text-muted-foreground hover:bg-muted')}
                    >
                      {opt.star} {opt.label}
                    </button>
                  )
                })}
              </div>
              {source === 'book' && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Los asteriscos son la dificultad que marca el propio Griffiths en el libro.
                </p>
              )}
            </div>

            <Button onClick={start} size="lg" disabled={selectedSections.size === 0 || selectedDifficulties.size === 0 || sample.length === 0}>
              <Timer className="mr-2 h-4 w-4" /> Comenzar examen
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ════════════════════════════════ RUNNING ════════════════════════════════
  if (phase === 'running') {
    const q = questions[current]
    const isBook = !!q.bookProblemId
    const ex = isBook ? undefined : EXERCISES.find(e => e.id === q.exerciseId)!
    const bp = isBook ? BOOK_PROBLEMS.find(p => p.id === q.bookProblemId) : undefined
    const remaining = timeLimitMin !== null ? Math.max(0, timeLimitMin * 60 - elapsed) : null
    const lowTime = remaining !== null && remaining < 60
    return (
      <div className="space-y-5">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold">Examen {isBook && <span className="text-sm font-medium text-violet-600 dark:text-violet-400">· problemas del libro</span>}</h1>
            <p className="text-xs text-muted-foreground">
              Pregunta {current + 1} de {questions.length}
              {questionStart > 0 && (
                <span className="ml-2 rounded bg-muted px-1.5 py-0.5 font-mono tabular-nums">
                  {Math.floor((Date.now() - questionStart) / 1000)}s
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {remaining !== null && (
              <span className={cn('rounded-md px-2.5 py-1 font-mono text-sm tabular-nums',
                lowTime ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300' : 'bg-muted text-muted-foreground')}>
                {String(Math.floor(remaining / 60)).padStart(2, '0')}:{String(remaining % 60).padStart(2, '0')}
              </span>
            )}
            <Button variant="ghost" size="sm" onClick={() => toggleFlag()} title="Marcar para revisar después">
              <Flag className={cn('mr-1 h-3.5 w-3.5', questions[current]?.flagged && 'fill-amber-400 text-amber-500')} />
              {questions[current]?.flagged ? 'Marcada' : 'Marcar'}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setPhase('review')}>
              <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Revisar
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setPhase('setup')}>
              <RotateCcw className="mr-1 h-3.5 w-3.5" /> Abortar
            </Button>
          </div>
        </header>
        <Progress value={(current / questions.length) * 100} className="h-1.5" />

        {isBook && bp ? (
          <div key={bp.id + '-' + current} className="animate-question-in">
            <BookPracticeCard
              problemId={bp.id}
              onDone={bookDone}
              doneLabel={current < questions.length - 1 ? 'Siguiente pregunta' : 'Ir a revisar'}
            />
          </div>
        ) : ex ? (
          <Card className="animate-question-in">
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
        ) : (
          <Card><CardContent className="p-6 text-sm text-muted-foreground">Pregunta no encontrada.</CardContent></Card>
        )}
      </div>
    )
  }

  // ════════════════════════════════ REVIEW ═════════════════════════════════
  if (phase === 'review') {
    const answered = questions.filter(q => q.picked !== null).length
    const elapsedMin = Math.floor(elapsed / 60)
    const elapsedSec = elapsed % 60
    return (
      <div className="space-y-5">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-sky-600" /> Revisa tus respuestas
          </h1>
          <p className="text-muted-foreground">
            {answered} de {questions.length} respondidas · tiempo: {elapsedMin}m {elapsedSec}s
            {questions.some(q => q.flagged) && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                <Flag className="h-3 w-3 fill-amber-400" /> {questions.filter(q => q.flagged).length} marcada(s)
              </span>
            )}.
            Puedes cambiar cualquier respuesta antes de finalizar, o saltar a una pregunta sin contestar.
          </p>
        </header>
        {/* Flagged-only filter */}
        {questions.some(q => q.flagged) && (
          <div className="flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={flaggedOnly} onChange={e => setFlaggedOnly(e.target.checked)} className="accent-amber-600" />
              <span className="text-muted-foreground">Mostrar solo marcadas ({questions.filter(q => q.flagged).length})</span>
            </label>
          </div>
        )}
        <div className="grid gap-2">
          {questions.map((q, i) => {
            if (flaggedOnly && !q.flagged) return null
            const isBook = !!q.bookProblemId
            const ex = isBook ? undefined : EXERCISES.find(e => e.id === q.exerciseId)!
            const bp = isBook ? BOOK_PROBLEMS.find(p => p.id === q.bookProblemId) : undefined
            const itemTitle = isBook ? `${bp?.number} · ${bp?.title}` : ex?.title
            const answered = q.picked !== null
            const correct = q.picked === 'solved'
            const isCurrent = i === current
            return (
              <Card key={i} className={cn('overflow-hidden transition-colors', isCurrent && 'border-sky-400')}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors',
                        answered ? (correct ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300')
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300')}
                      title="Ir a esta pregunta"
                    >
                      {i + 1}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-mono',
                          isBook ? 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300' : 'bg-muted text-muted-foreground')}>
                          {q.sectionId}
                        </span>
                        <span className="text-sm font-medium truncate">{itemTitle}</span>
                        {isBook && <BookMarked className="h-3.5 w-3.5 shrink-0 text-violet-500" aria-hidden />}
                        {q.flagged && <Flag className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-500" />}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>
                          {answered
                            ? correct
                              ? isBook ? `✓ ${COMPARE_LABEL[q.compareOutcome ?? 'match']}` : '✓ Resuelto'
                              : isBook
                                ? q.compareOutcome ? `✗ ${COMPARE_LABEL[q.compareOutcome]}` : '✗ Sin comparar (saltado)'
                                : `✗ ${q.errorType ? ERROR_TYPE_LABELS[q.errorType as ErrorType] : 'Incorrecto'}`
                            : 'Sin contestar'}
                        </span>
                        {q.timeSpentMs !== undefined && q.timeSpentMs > 0 && (
                          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] tabular-nums">
                            {Math.floor(q.timeSpentMs / 60000)}:{String(Math.floor((q.timeSpentMs % 60000) / 1000)).padStart(2, '0')}
                          </span>
                        )}
                        <button onClick={() => toggleFlag(i)} className={cn('ml-auto rounded px-1.5 py-0.5 text-[10px] transition-colors',
                          q.flagged ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' : 'text-muted-foreground hover:bg-muted')}
                          title="Marcar/desmarcar para revisar">
                          <Flag className={cn('h-3 w-3', q.flagged && 'fill-amber-400 text-amber-500')} />
                        </button>
                      </div>
                      {/* Inline quick change (solo ejercicios de plataforma: los problemas
                          del libro ya registraron su comparación al contestar) */}
                      {!isBook && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          <button onClick={() => setAnswer(i, true)} className={cn('rounded px-2 py-0.5 text-[10px] font-medium transition-colors',
                            correct ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground hover:bg-emerald-50 dark:hover:bg-emerald-950/30')}>
                            ✓ Resuelto
                          </button>
                          <button onClick={() => setAnswer(i, false)} className={cn('rounded px-2 py-0.5 text-[10px] font-medium transition-colors',
                            !answered && !correct ? 'bg-rose-500 text-white' : 'bg-muted text-muted-foreground hover:bg-rose-50 dark:hover:bg-rose-950/30')}>
                            ✗ Incorrecto
                          </button>
                        </div>
                      )}
                      {isBook && (
                        <div className="mt-2">
                          <button onClick={() => jumpTo(i)} className="rounded px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            Volver a ver el problema
                          </button>
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => jumpTo(i)}>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-muted/30 p-4">
          <Button onClick={() => finish()} size="lg">
            <Trophy className="mr-2 h-4 w-4" /> Finalizar examen
          </Button>
          <Button variant="outline" onClick={() => { setCurrent(questions.findIndex(q => q.picked === null)); setPhase('running') }} disabled={!questions.some(q => q.picked === null)}>
            <ArrowRight className="mr-1.5 h-4 w-4" /> Ir a la primera sin contestar
          </Button>
          <Button variant="outline" onClick={() => { setCurrent(questions.findIndex(q => q.flagged)); setPhase('running') }} disabled={!questions.some(q => q.flagged)}>
            <Flag className="mr-1.5 h-4 w-4" /> Ir a la primera marcada
          </Button>
          <Button variant="ghost" onClick={() => setPhase('running')}>
            <RotateCcw className="mr-1.5 h-4 w-4" /> Seguir respondiendo
          </Button>
        </div>
      </div>
    )
  }

  // ═════════════════════════════════ DONE ══════════════════════════════════
  const correct = questions.filter(q => q.picked === 'solved').length
  const isBookExam = questions.some(q => q.bookProblemId)
  const gaps: Record<string, number> = {}
  const sectionBreak: Record<string, { correct: number; total: number }> = {}
  questions.forEach(q => {
    if (q.picked !== 'solved') {
      q.conceptIds.forEach(cid => { gaps[cid] = (gaps[cid] || 0) + 1 })
      if (q.bookProblemId) gaps[q.sectionId] = (gaps[q.sectionId] || 0) + 1
    }
    const sid = q.sectionId
    if (!sectionBreak[sid]) sectionBreak[sid] = { correct: 0, total: 0 }
    sectionBreak[sid].total++
    if (q.picked === 'solved') sectionBreak[sid].correct++
  })
  const compareStats = isBookExam ? {
    match: questions.filter(q => q.compareOutcome === 'match').length,
    partial: questions.filter(q => q.compareOutcome === 'partial').length,
    no: questions.filter(q => q.compareOutcome === 'no').length,
    skipped: questions.filter(q => q.bookProblemId && !q.compareOutcome).length,
  } : null
  // Para exámenes de libro, los "gaps" son secciones; para plataforma, conceptos.
  const gapList = Object.entries(gaps).sort((a, b) => b[1] - a[1])
  const weakSections = Object.entries(sectionBreak)
    .filter(([, v]) => v.correct < v.total)
    .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" /> Resultado del examen
          {isBookExam && <Badge variant="outline" className="border-violet-300 text-violet-700 dark:border-violet-700 dark:text-violet-300">Problemas del libro</Badge>}
        </h1>
      </header>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl font-bold">{correct}<span className="text-2xl text-muted-foreground">/{questions.length}</span></div>
            <div className="text-sm text-muted-foreground">
              {isBookExam ? 'coincidencias con el solucionario' : 'correctas'}
            </div>
          </div>
          <Progress value={(correct / questions.length) * 100} className="h-2" />

          {compareStats && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-lg border border-emerald-200/60 bg-emerald-50/40 p-3 text-center dark:border-emerald-900/50 dark:bg-emerald-950/20">
                <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{compareStats.match}</div>
                <div className="text-[11px] text-muted-foreground">coincidieron</div>
              </div>
              <div className="rounded-lg border border-amber-200/60 bg-amber-50/40 p-3 text-center dark:border-amber-900/50 dark:bg-amber-950/20">
                <div className="text-xl font-bold text-amber-700 dark:text-amber-300">{compareStats.partial}</div>
                <div className="text-[11px] text-muted-foreground">parciales</div>
              </div>
              <div className="rounded-lg border border-rose-200/60 bg-rose-50/40 p-3 text-center dark:border-rose-900/50 dark:bg-rose-950/20">
                <div className="text-xl font-bold text-rose-700 dark:text-rose-300">{compareStats.no}</div>
                <div className="text-[11px] text-muted-foreground">todavía no</div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                <div className="text-xl font-bold text-muted-foreground">{compareStats.skipped}</div>
                <div className="text-[11px] text-muted-foreground">sin comparar</div>
              </div>
            </div>
          )}

          {weakSections.length > 0 ? (
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <AlertTriangle className="h-4 w-4 text-rose-600" /> Secciones a reforzar
              </h3>
              <div className="space-y-1.5">
                {weakSections.map(([sid, v]) => (
                  <div key={sid} className="flex items-center justify-between rounded-md border border-rose-200/60 bg-rose-50/40 px-3 py-2 text-sm dark:bg-rose-950/20">
                    <span><span className="mr-2 font-mono text-xs text-muted-foreground">{sid}</span>{SECTION_ID_TO_TITLE[sid] ?? sid}</span>
                    <Badge variant="outline" className="border-rose-300 text-rose-700 dark:text-rose-300">{v.correct}/{v.total} bien</Badge>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {!isBookExam && gapList.length > 0 && (
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <AlertTriangle className="h-4 w-4 text-rose-600" /> Conceptos a reforzar
              </h3>
              <div className="space-y-1.5">
                {gapList.map(([cid, n]) => (
                  <div key={cid} className="flex items-center justify-between rounded-md border border-rose-200/60 bg-rose-50/40 px-3 py-2 text-sm dark:bg-rose-950/20">
                    <span>{CONCEPT_ID_TO_TITLE[cid] ?? SECTION_ID_TO_TITLE[cid] ?? cid}</span>
                    <Badge variant="outline" className="border-rose-300 text-rose-700 dark:text-rose-300">{n} error{n > 1 ? 'es' : ''}</Badge>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Estudia esos conceptos y vuelve a intentarlo. El progreso se ha guardado en tu panel.</p>
            </div>
          )}

          {isBookExam && (
            <p className="text-xs text-muted-foreground">
              Cada comparación quedó registrada en el progreso de los problemas del libro: «Coincide» marca el problema como resuelto.
              Revisa las pistas paso a paso de los que no salieron.
            </p>
          )}

          {(isBookExam || (!isBookExam && gapList.length === 0)) && weakSections.length === 0 && (
            <div className="rounded-md border border-emerald-300 bg-emerald-50/60 p-4 text-sm dark:bg-emerald-950/30">
              ¡Sin errores! Has demostrado soltura en todas las secciones del examen.
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setPhase('setup')} variant="outline">
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Otro examen
            </Button>
            <SessionSummaryExportButton data={{
              title: 'Resumen de examen',
              sessionType: `Examen${isBookExam ? ' · problemas del libro' : ''}`,
              date: new Date().toLocaleString(),
              stats: [
                { label: 'Preguntas totales', value: String(questions.length) },
                { label: isBookExam ? 'Coincidencias' : 'Correctas', value: String(correct) },
                { label: 'Precisión', value: `${Math.round((correct / questions.length) * 100)}%` },
                { label: 'Tiempo', value: `${Math.floor(elapsed / 60)}m ${elapsed % 60}s` },
                { label: 'Adaptativo', value: adaptiveMode ? 'Sí' : 'No' },
                { label: 'Marcadas', value: String(questions.filter(q => q.flagged).length) },
                ...(compareStats ? [{ label: 'Parciales', value: String(compareStats.partial) }, { label: 'Todavía no', value: String(compareStats.no) }] : []),
              ],
              conceptGaps: isBookExam
                ? weakSections.map(([sid, v]) => ({ concept: `${sid} · ${SECTION_ID_TO_TITLE[sid] ?? sid}`, count: v.total - v.correct }))
                : gapList.map(([cid, n]) => ({ concept: CONCEPT_ID_TO_TITLE[cid] ?? cid, count: n })),
              notes: isBookExam
                ? (compareStats && compareStats.no + compareStats.partial > 0
                    ? 'Revisa los problemas fallados con la escalera de pistas de la sección «Problemas del libro».'
                    : '¡Buen trabajo! Las respuestas coincidieron con el solucionario.')
                : (gapList.length > 0
                    ? 'Repasa los conceptos listados arriba antes del examen real. Usa el modo "Repaso adaptativo" para reforzarlos.'
                    : '¡Sin conceptos a reforzar! Has demostrado soltura en todos los temas del examen.'),
            }} />
            <Button onClick={() => setView({ name: isBookExam ? 'book-problems' : 'progress' })} variant="ghost">
              {isBookExam ? 'Ver problemas del libro' : 'Ver mi progreso'} <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
