'use client'

import { useEffect, useMemo, useState } from 'react'
import { useUI } from '@/lib/store'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { SECTIONS } from '@/data/structure'
import { BOOK_PROBLEMS } from '@/data/book-problems'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BarChart3, BookOpen, Timer, CheckCircle2, XCircle, TrendingUp, AlertCircle, Download, FileJson } from 'lucide-react'
import { apiGet, getOrCreateStudentId } from '@/lib/student'
import { useToast } from '@/hooks/use-toast'
import { ERROR_TYPE_LABELS, type ErrorType } from '@/lib/content-types'
import { Button } from '@/components/ui/button'
import { BookProgressCard } from '@/components/book-progress-card'
import { ActivityChart, type ActivityDay } from '@/components/activity-chart'
import { useBookProgress } from '@/lib/book-progress'
import { usePotentialsProgress } from '@/lib/potentials-progress'
import { BOOK_POTENTIALS, totalPotentialAppSteps } from '@/data/book-potentials'

interface ProgressData {
  conceptProgress: { conceptId: string; mastery: number; correctCount: number; errorsCount: number; errorBreakdown: Record<string, number> }[]
  recentAttempts: { exerciseId: string; sectionId: string; correct: boolean; errorType: string | null; createdAt: string }[]
  exams: { id: string; title: string; totalQuestions: number; correctCount: number; finishedAt: string }[]
  trainings: { id: string; mode: string; problemsDone: number; correctCount: number }[]
  totalAttempts: number
  totalCorrect: number
  totalErrors: number
}

interface StudySeries {
  series: { date: string; exercisesDone: number; conceptsRead: number; goalsMet: number; minutesStudied: number; isToday: boolean }[]
}

export function ProgressDashboard() {
  const { setView } = useUI()
  const { toast } = useToast()
  const [data, setData] = useState<ProgressData | null>(null)
  const [study, setStudy] = useState<StudySeries | null>(null)
  const [studyFailed, setStudyFailed] = useState(false)
  const [loading, setLoading] = useState(true)
  const studentId = getOrCreateStudentId()
  const { progress: bookProgress } = useBookProgress()
  const { progress: potProgress } = usePotentialsProgress()

  // CSV unificado: conceptos + intentos (API) y problemas del libro (localStorage).
  // Funciona aunque la API falle: las filas del libro siempre están disponibles.
  const exportCSV = () => {
    const rows: string[][] = [
      ['Tipo', 'ID', 'Sección', 'Dominio', 'Correctos', 'Errores', 'Detalle errores'],
      ...(data?.conceptProgress ?? []).map(c => ['Concepto', c.conceptId, '', String(c.mastery), String(c.correctCount), String(c.errorsCount),
        Object.entries(c.errorBreakdown).map(([k, v]) => `${ERROR_TYPE_LABELS[k as ErrorType] ?? k}:${v}`).join('; ')]),
      ...(data?.recentAttempts ?? []).map(a => ['Intento', a.exerciseId, a.sectionId, '', a.correct ? '1' : '0', a.correct ? '0' : '1',
        a.errorType ? ERROR_TYPE_LABELS[a.errorType as ErrorType] ?? a.errorType : '']),
      ...Object.entries(bookProgress).map(([id, e]) => {
        const problem = BOOK_PROBLEMS.find(p => p.id === id)
        const section = problem ? (problem.placement === 'further' ? 'FP' : problem.sectionId) : ''
        const steps = Object.values(e.appSteps ?? {}).reduce((a, b) => a + b, 0)
        const failed = e.lastOutcome === 'no' || e.lastOutcome === 'partial'
        return ['Problema libro', id, section, e.solved ? '100' : '0',
          e.lastOutcome === 'match' ? '1' : '0', failed ? '1' : '0',
          `pistas:${e.hintsUsed}; pasos:${steps}; comparaciones:${e.attempts}; último:${e.lastOutcome ?? '—'}${e.lastTriedAt ? `; última actividad:${new Date(e.lastTriedAt).toISOString()}` : ''}`]
      }),
      // Potenciales del libro (§2.2–§2.6, localStorage): dominio, pistas,
      // pasos de derivación/aplicación, preguntas de examen y última actividad.
      ...BOOK_POTENTIALS.map(p => {
        const e = potProgress[p.id]
        const derivTotal = p.derivation.steps.length
        const appTotal = totalPotentialAppSteps(p)
        const appUsed = Object.values(e?.appSteps ?? {}).reduce((a, b) => a + b, 0)
        return ['Potencial libro', p.id, p.sectionId, e?.mastered ? '100' : '0',
          String(e?.questionsDone?.length ?? 0), '',
          `título:${p.title}; dominado:${e?.mastered ? 'sí' : 'no'}; pistas:${e?.hintsUsed ?? 0}/${p.hints.length}; derivación:${Math.min(e?.derivationSteps ?? 0, derivTotal)}/${derivTotal}; aplicación:${appUsed}/${appTotal}; preguntas:${e?.questionsDone?.length ?? 0}/${p.examQuestions.length}; última actividad:${e?.lastStudiedAt ? new Date(e.lastStudiedAt).toISOString() : '—'}`]
      }),
    ]
    const csv = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `progreso-qm-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: 'CSV exportado', description: `${rows.length - 1} filas · conceptos + intentos + problemas y potenciales del libro` })
  }

  // Hay algo que exportar si la API trajo datos O si hay problemas/potenciales del libro con actividad.
  const canExport = !!(
    (data && (data.totalAttempts > 0 || data.conceptProgress.length > 0)) ||
    Object.keys(bookProgress).length > 0 ||
    Object.keys(potProgress).length > 0
  )

  const exportJSON = () => {
    const payload = { ...data, problemasLibro: bookProgress, potencialesLibro: potProgress }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `progreso-qm-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: 'JSON exportado' })
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const d = await apiGet(`/api/progress?studentId=${encodeURIComponent(studentId)}`)
        if (mounted) { setData(d); setLoading(false) }
      } catch { if (mounted) setLoading(false) }
      try {
        const s = await apiGet(`/api/study?studentId=${encodeURIComponent(studentId)}&days=14`)
        if (mounted) setStudy(s)
      } catch { if (mounted) setStudyFailed(true) }
    })()
    return () => { mounted = false }
  }, [studentId])

  // Actividad de los problemas del libro por día local (YYYY-MM-DD): un problema
  // «cuenta» el día de su ÚLTIMO intento comparado (el localStorage no guarda historial completo).
  const activityDays: ActivityDay[] = useMemo(() => {
    const pad = (n: number) => String(n).padStart(2, '0')
    const keyOf = (t: number) => { const d = new Date(t); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` }
    const byDate = new Map<string, { tried: number; solved: number; failed: number }>()
    for (const e of Object.values(bookProgress)) {
      if (!e?.lastTriedAt) continue
      const k = keyOf(e.lastTriedAt)
      const cur = byDate.get(k) ?? { tried: 0, solved: 0, failed: 0 }
      cur.tried++
      if (e.lastOutcome === 'match') cur.solved++
      if (e.lastOutcome === 'no' || e.lastOutcome === 'partial') cur.failed++
      byDate.set(k, cur)
    }
    const today = new Date()
    const out: ActivityDay[] = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = keyOf(d.getTime())
      const api = study?.series.find(s => s.date === key)
      const book = byDate.get(key)
      out.push({
        date: key,
        exercisesDone: api?.exercisesDone ?? 0,
        conceptsRead: api?.conceptsRead ?? 0,
        minutesStudied: api?.minutesStudied ?? 0,
        bookTried: book?.tried ?? 0,
        bookSolved: book?.solved ?? 0,
        bookFailed: book?.failed ?? 0,
      })
    }
    return out
  }, [study, bookProgress])

  const conceptTitle = (id: string) => ALL_CONCEPTS.find(c => c.id === id)?.title ?? id

  if (loading) {
    return (
      <div className="space-y-5">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-teal-600" /> Mi progreso
          </h1>
          <p className="text-muted-foreground">Tu dominio por concepto, tu historial de errores y tus sesiones de estudio.</p>
        </header>
        {/* El progreso de los problemas del libro vive en localStorage: no espera a la API. */}
        <BookProgressCard />
        <div className="h-52 animate-pulse rounded-lg bg-muted" />
      </div>
    )
  }

  const totalAttempts = data?.totalAttempts ?? 0
  const totalCorrect = data?.totalCorrect ?? 0
  const totalErrors = data?.totalErrors ?? 0
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-teal-600" /> Mi progreso
          </h1>
          {canExport && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportCSV} title="Exportar CSV unificado: conceptos, intentos y problemas del libro" className="border-teal-300/60 transition-colors hover:border-teal-400 hover:bg-teal-50/60 dark:border-teal-800/60 dark:hover:bg-teal-950/30">
                <Download className="mr-1.5 h-3.5 w-3.5" /> CSV
              </Button>
              <Button variant="outline" size="sm" onClick={exportJSON} title="Exportar JSON con conceptos, intentos y problemas del libro" className="border-teal-300/60 transition-colors hover:border-teal-400 hover:bg-teal-50/60 dark:border-teal-800/60 dark:hover:bg-teal-950/30">
                <FileJson className="mr-1.5 h-3.5 w-3.5" /> JSON
              </Button>
            </div>
          )}
        </div>
        <p className="text-muted-foreground">Tu dominio por concepto, tu historial de errores y tus sesiones de estudio.</p>
      </header>

      {/* Top stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Intentos totales" value={totalAttempts} icon={CheckCircle2} tone="sky" />
        <Stat label="Correctos" value={totalCorrect} icon={TrendingUp} tone="emerald" />
        <Stat label="Errores" value={totalErrors} icon={XCircle} tone="rose" />
        <Stat label="Precisión" value={`${accuracy}%`} icon={BarChart3} tone="teal" />
      </div>

      {/* Actividad combinada: ejercicios + conceptos (API) y problemas del libro (localStorage) */}
      <ActivityChart days={activityDays} apiOffline={studyFailed} />

      {/* Problemas del libro (localStorage — siempre disponible) */}
      <BookProgressCard />

      {/* Mastery by section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base"><BookOpen className="h-4 w-4 text-teal-600" /> Dominio por concepto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {SECTIONS.map(s => {
            const concepts = ALL_CONCEPTS.filter(c => c.sectionId === s.id)
            if (concepts.length === 0) return null
            return (
              <div key={s.id}>
                <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <span className="font-mono text-teal-600 dark:text-teal-400">{s.id}</span> · {s.title}
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {concepts.map(c => {
                    const p = data?.conceptProgress.find(x => x.conceptId === c.id)
                    const m = p?.mastery ?? 0
                    return (
                      <button key={c.id} onClick={() => setView({ name: 'concept', conceptId: c.id })} className="rounded-md border border-border bg-card/60 p-2.5 text-left hover:border-teal-400">
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <span className="text-xs font-medium line-clamp-1">{c.title}</span>
                          <span className="text-xs font-mono text-muted-foreground">{m}%</span>
                        </div>
                        <Progress value={m} className="h-1.5" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
          {totalAttempts === 0 && (
            <div className="rounded-md border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
              Aún no has registrado intentos. Resuelve un ejercicio y marca tu resultado para empezar a construir tu progreso.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error breakdown */}
      {data && totalErrors > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><AlertCircle className="h-4 w-4 text-rose-600" /> Tipos de error</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(() => {
                const totals: Record<string, number> = {}
                data.conceptProgress.forEach(p => Object.entries(p.errorBreakdown).forEach(([k, v]) => { totals[k] = (totals[k] || 0) + v }))
                const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1])
                return sorted.map(([k, n]) => {
                  const pct = Math.round((n / totalErrors) * 100)
                  return (
                    <div key={k} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{ERROR_TYPE_LABELS[k as ErrorType] ?? k}</span>
                        <span className="font-mono text-muted-foreground">{n} ({pct}%)</span>
                      </div>
                      <Progress value={pct} className="h-1.5" />
                    </div>
                  )
                })
              })()}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent exams & trainings */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><Timer className="h-4 w-4 text-rose-600" /> Exámenes recientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data && data.exams.length > 0 ? data.exams.slice(0, 5).map(e => (
              <div key={e.id} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2 text-sm">
                <div className="min-w-0">
                  <div className="truncate font-medium">{e.title}</div>
                  <div className="text-xs text-muted-foreground">{new Date(e.finishedAt).toLocaleString()}</div>
                </div>
                <Badge variant="outline" className={e.correctCount / e.totalQuestions >= 0.7 ? 'border-emerald-300 text-emerald-700 dark:text-emerald-300' : 'border-rose-300 text-rose-700 dark:text-rose-300'}>
                  {e.correctCount}/{e.totalQuestions}
                </Badge>
              </div>
            )) : <div className="text-sm text-muted-foreground">Aún sin exámenes.</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4 text-amber-600" /> Sesiones de entrenamiento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data && data.trainings.length > 0 ? data.trainings.slice(0, 5).map(t => (
              <div key={t.id} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2 text-sm">
                <span className="font-mono text-xs">{t.mode}</span>
                <span className="text-xs text-muted-foreground">{t.problemsDone} problemas · {t.correctCount} ✓</span>
              </div>
            )) : <div className="text-sm text-muted-foreground">Aún sin sesiones de entrenamiento.</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Stat({ label, value, icon: Icon, tone }: { label: string; value: number | string; icon: any; tone: string }) {
  return (
    <Card className="group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex items-center gap-3 p-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${tone}-100 transition-transform duration-200 group-hover:scale-110 dark:bg-${tone}-950/40 text-${tone}-700 dark:text-${tone}-300`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-bold leading-none tabular-nums">{value}</div>
          <div className="mt-1 text-xs text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}
