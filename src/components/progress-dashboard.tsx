'use client'

import { useEffect, useState } from 'react'
import { useUI } from '@/lib/store'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { SECTIONS } from '@/data/structure'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BarChart3, BookOpen, Timer, CheckCircle2, XCircle, TrendingUp, AlertCircle } from 'lucide-react'
import { apiGet, getOrCreateStudentId } from '@/lib/student'
import { ERROR_TYPE_LABELS, type ErrorType } from '@/lib/content-types'

interface ProgressData {
  conceptProgress: { conceptId: string; mastery: number; correctCount: number; errorsCount: number; errorBreakdown: Record<string, number> }[]
  recentAttempts: { exerciseId: string; sectionId: string; correct: boolean; errorType: string | null; createdAt: string }[]
  exams: { id: string; title: string; totalQuestions: number; correctCount: number; finishedAt: string }[]
  trainings: { id: string; mode: string; problemsDone: number; correctCount: number }[]
  totalAttempts: number
  totalCorrect: number
  totalErrors: number
}

export function ProgressDashboard() {
  const { setView } = useUI()
  const [data, setData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)
  const studentId = getOrCreateStudentId()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const d = await apiGet(`/api/progress?studentId=${encodeURIComponent(studentId)}`)
        if (mounted) { setData(d); setLoading(false) }
      } catch { if (mounted) setLoading(false) }
    })()
    return () => { mounted = false }
  }, [studentId])

  const conceptTitle = (id: string) => ALL_CONCEPTS.find(c => c.id === id)?.title ?? id

  if (loading) {
    return <div className="space-y-4"><div className="h-32 animate-pulse rounded-lg bg-muted" /></div>
  }

  const totalAttempts = data?.totalAttempts ?? 0
  const totalCorrect = data?.totalCorrect ?? 0
  const totalErrors = data?.totalErrors ?? 0
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-teal-600" /> Mi progreso
        </h1>
        <p className="text-muted-foreground">Tu dominio por concepto, tu historial de errores y tus sesiones de estudio.</p>
      </header>

      {/* Top stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Intentos totales" value={totalAttempts} icon={CheckCircle2} tone="sky" />
        <Stat label="Correctos" value={totalCorrect} icon={TrendingUp} tone="emerald" />
        <Stat label="Errores" value={totalErrors} icon={XCircle} tone="rose" />
        <Stat label="Precisión" value={`${accuracy}%`} icon={BarChart3} tone="teal" />
      </div>

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
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${tone}-100 dark:bg-${tone}-950/40 text-${tone}-700 dark:text-${tone}-300`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-bold leading-none">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}
