'use client'

import { useState, useEffect } from 'react'
import { useUI } from '@/lib/store'
import { ALL_EXERCISES } from '@/data/exercises'
import { apiGet, apiPost, getOrCreateStudentId } from '@/lib/student'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, Zap, CalendarClock, TrendingUp, Pause, Play, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SM2CardRow {
  id: string
  exerciseId: string
  easeFactor: number
  interval: number
  repetitions: number
  dueAt: string
  lastReviewAt: string | null
  totalReviews: number
  suspended: boolean
}

export function SM2CardStats() {
  const { setView } = useUI()
  const { toast } = useToast()
  const [cards, setCards] = useState<SM2CardRow[]>([])
  const [loading, setLoading] = useState(true)
  const studentId = getOrCreateStudentId()

  const load = async () => {
    setLoading(true)
    try {
      const d = await apiGet(`/api/sm2/cards?studentId=${encodeURIComponent(studentId)}`)
      setCards(d.cards)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    let mounted = true
    apiGet(`/api/sm2/cards?studentId=${encodeURIComponent(studentId)}`)
      .then(d => { if (mounted) { setCards(d.cards); setLoading(false) } })
      .catch(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [studentId])

  const toggleSuspend = async (exerciseId: string, currentlySuspended: boolean) => {
    try {
      await fetch('/api/sm2', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, exerciseId, suspended: !currentlySuspended }),
      })
      toast({
        title: !currentlySuspended ? 'Tarjeta suspendida' : 'Tarjeta reactivada',
        description: !currentlySuspended ? 'No aparecerá en el repaso hasta que la reactives.' : 'Volverá a aparecer según el calendario.',
      })
      load()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  if (loading) {
    return <div className="h-32 animate-pulse rounded-xl bg-muted" />
  }

  if (cards.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
          <BarChart3 className="h-10 w-10 text-muted-foreground/40" />
          <div className="text-sm text-muted-foreground">
            Aún no has creado tarjetas SM-2. Resuelve ejercicios y autoevalúa tu calidad de recuerdo
            para que aparezcan aquí con su programación.
          </div>
          <Button variant="outline" size="sm" onClick={() => setView({ name: 'exercises-list' })}>
            Ir a ejercicios <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Summary stats
  const totalCards = cards.length
  const suspendedCount = cards.filter(c => c.suspended).length
  const avgEase = cards.reduce((a, c) => a + c.easeFactor, 0) / totalCards
  const avgInterval = cards.reduce((a, c) => a + c.interval, 0) / totalCards
  const totalReviews = cards.reduce((a, c) => a + c.totalReviews, 0)
  const now = new Date()
  const dueSoon = cards.filter(c => !c.suspended && new Date(c.dueAt) <= now).length

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-sky-600" /> Estadísticas de tarjetas SM-2
        </h1>
        <p className="text-muted-foreground">
          Estado de todas tus tarjetas de repetición espaciada. Suspende las que no quieras ver
          temporalmente, y revisa cómo evoluciona tu facilidad de recuerdo.
        </p>
      </header>

      {/* Summary stats */}
      <div className="grid gap-3 sm:grid-cols-4">
        <Card className="border-sky-200/40 bg-sky-50/20 dark:bg-sky-950/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><Zap className="h-3 w-3" /> Total</div>
            <div className="text-2xl font-bold tabular-nums">{totalCards}</div>
          </CardContent>
        </Card>
        <Card className="border-amber-200/40 bg-amber-50/20 dark:bg-amber-950/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarClock className="h-3 w-3" /> Pendientes</div>
            <div className="text-2xl font-bold tabular-nums">{dueSoon}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><TrendingUp className="h-3 w-3" /> Facilidad media</div>
            <div className="text-2xl font-bold tabular-nums">{avgEase.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><TrendingUp className="h-3 w-3" /> Intervalo medio</div>
            <div className="text-2xl font-bold tabular-nums">{avgInterval.toFixed(1)}d</div>
          </CardContent>
        </Card>
      </div>

      {/* Card list */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-2.5 text-left font-semibold">Ejercicio</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Sección</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Facilidad</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Intervalo</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Reps</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Revisiones</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Próxima</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Estado</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Acción</th>
                </tr>
              </thead>
              <tbody>
                {cards.map(c => {
                  const ex = ALL_EXERCISES.find(e => e.id === c.exerciseId)
                  const due = new Date(c.dueAt)
                  const isOverdue = !c.suspended && due <= now
                  const daysUntil = Math.ceil((due.getTime() - now.getTime()) / 86400000)
                  return (
                    <tr key={c.id} className={cn('border-b border-border/50 transition-colors hover:bg-muted/20',
                      c.suspended && 'opacity-50')}>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => setView({ name: 'exercise', exerciseId: c.exerciseId })}
                          className="text-left font-medium hover:text-teal-600 hover:underline"
                        >
                          {ex?.title ?? c.exerciseId}
                        </button>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{ex?.sectionId ?? '—'}</span>
                      </td>
                      <td className="px-3 py-2 text-center tabular-nums">
                        <span className={cn('rounded px-1.5 py-0.5 text-xs font-medium',
                          c.easeFactor >= 2.5 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : c.easeFactor >= 2.0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300')}>
                          {c.easeFactor.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center tabular-nums text-muted-foreground">{c.interval}d</td>
                      <td className="px-3 py-2 text-center tabular-nums text-muted-foreground">{c.repetitions}</td>
                      <td className="px-3 py-2 text-center tabular-nums text-muted-foreground">{c.totalReviews}</td>
                      <td className="px-3 py-2 text-center">
                        {c.suspended ? (
                          <span className="text-xs text-muted-foreground">suspendida</span>
                        ) : isOverdue ? (
                          <span className="rounded bg-rose-100 px-1.5 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">vencida</span>
                        ) : (
                          <span className={cn('text-xs tabular-nums', daysUntil <= 1 ? 'text-amber-600' : 'text-muted-foreground')}>
                            {daysUntil === 0 ? 'hoy' : daysUntil === 1 ? 'mañana' : `${daysUntil}d`}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {c.suspended ? (
                          <span className="text-xs text-muted-foreground">⏸ suspendida</span>
                        ) : (
                          <span className="text-xs text-emerald-600">● activa</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={() => toggleSuspend(c.exerciseId, c.suspended)}
                          className={cn('rounded-md p-1.5 transition-colors',
                            c.suspended
                              ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                              : 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30')}
                          title={c.suspended ? 'Reactivar' : 'Suspender'}
                        >
                          {c.suspended ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-muted/20 p-3 text-xs text-muted-foreground">
        <span className="font-semibold">Leyenda:</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-400" /> facilidad ≥ 2.5 (fácil)</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-400" /> facilidad 2.0-2.5 (normal)</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-rose-400" /> facilidad &lt; 2.0 (difícil)</span>
        <span className="ml-auto">
          Total de revisiones: <span className="font-semibold tabular-nums text-foreground">{totalReviews}</span>
          {suspendedCount > 0 && <> · <span className="text-amber-600">{suspendedCount} suspendida(s)</span></>}
        </span>
      </div>
    </div>
  )
}
