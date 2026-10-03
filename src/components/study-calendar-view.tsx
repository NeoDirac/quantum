'use client'

import { useState, useEffect } from 'react'
import { useUI } from '@/lib/store'
import { apiGet, getOrCreateStudentId } from '@/lib/student'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarDays, ChevronLeft, ChevronRight, Activity, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StudyDayRow {
  date: string
  exercisesDone: number
  conceptsRead: number
  goalsMet: number
  minutesStudied: number
}
interface SM2CardRow {
  exerciseId: string
  dueAt: string
  suspended: boolean
}
interface CalendarData {
  pastActivity: StudyDayRow[]
  upcomingReviews: { date: string; count: number }[]
  sm2Cards: SM2CardRow[]
}

function localDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export function StudyCalendarView() {
  const { setView } = useUI()
  const [data, setData] = useState<CalendarData | null>(null)
  const [monthOffset, setMonthOffset] = useState(0) // 0 = current month
  const studentId = getOrCreateStudentId()

  useEffect(() => {
    let mounted = true
    // Fetch study activity (last 60 days) + SM-2 cards for upcoming reviews
    Promise.all([
      apiGet(`/api/study?studentId=${encodeURIComponent(studentId)}&days=60`),
      apiGet(`/api/sm2/cards?studentId=${encodeURIComponent(studentId)}`),
    ]).then(([studyData, sm2Data]) => {
      if (!mounted) return
      // Build upcoming review counts by date from SM-2 cards
      const reviewByDate = new Map<string, number>()
      for (const c of sm2Data.cards) {
        if (c.suspended) continue
        const d = new Date(c.dueAt)
        const ds = localDate(d)
        reviewByDate.set(ds, (reviewByDate.get(ds) || 0) + 1)
      }
      const upcoming: { date: string; count: number }[] = []
      const now = new Date()
      for (let i = 0; i < 30; i++) {
        const d = new Date(now)
        d.setDate(d.getDate() + i)
        const ds = localDate(d)
        const count = reviewByDate.get(ds) || 0
        if (count > 0) upcoming.push({ date: ds, count })
      }
      setData({
        pastActivity: studyData.series || [],
        upcomingReviews: upcoming,
        sm2Cards: sm2Data.cards,
      })
    }).catch(() => {})
    return () => { mounted = false }
  }, [studentId])

  if (!data) {
    return <div className="h-32 animate-pulse rounded-xl bg-muted" />
  }

  // Build the activity map: date -> { exercises, concepts, reviews }
  const activityMap = new Map<string, { exercises: number; concepts: number; reviews: number }>()
  for (const d of data.pastActivity) {
    if (d.exercisesDone + d.conceptsRead > 0) {
      activityMap.set(d.date, { exercises: d.exercisesDone, concepts: d.conceptsRead, reviews: 0 })
    }
  }
  // Add upcoming review counts
  for (const r of data.upcomingReviews) {
    const existing = activityMap.get(r.date) || { exercises: 0, concepts: 0, reviews: 0 }
    existing.reviews = r.count
    activityMap.set(r.date, existing)
  }

  // Build calendar for the selected month
  const today = new Date()
  const viewMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)
  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  // Monday = 0 (convert from Sunday=0)
  const startWeekday = (firstDay.getDay() + 6) % 7

  const todayStr = localDate(today)

  // Summary stats
  const totalActivity = data.pastActivity.reduce((a, d) => a + d.exercisesDone + d.conceptsRead, 0)
  const activeDays = data.pastActivity.filter(d => d.exercisesDone + d.conceptsRead > 0).length
  const upcomingCount = data.upcomingReviews.reduce((a, r) => a + r.count, 0)

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-teal-600" /> Calendario de estudio
        </h1>
        <p className="text-muted-foreground">
          Tu actividad de estudio pasada y las revisiones SM-2 programadas. Los días con actividad
          aparecen en verde; los próximos repasos, en azul.
        </p>
      </header>

      {/* Summary stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="border-teal-200/40 bg-teal-50/20 dark:bg-teal-950/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><Activity className="h-3 w-3" /> Actividad total (60 días)</div>
            <div className="text-2xl font-bold tabular-nums">{totalActivity}</div>
            <div className="text-[11px] text-muted-foreground">{activeDays} días activos</div>
          </CardContent>
        </Card>
        <Card className="border-sky-200/40 bg-sky-50/20 dark:bg-sky-950/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> Próximos repasos (30 días)</div>
            <div className="text-2xl font-bold tabular-nums">{upcomingCount}</div>
            <div className="text-[11px] text-muted-foreground">{data.upcomingReviews.length} días con repasos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="h-3 w-3" /> Tarjetas SM-2</div>
            <div className="text-2xl font-bold tabular-nums">{data.sm2Cards.length}</div>
            <div className="text-[11px] text-muted-foreground">{data.sm2Cards.filter(c => c.suspended).length} suspendidas</div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <Card>
        <CardContent className="p-5">
          {/* Month navigation */}
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => setMonthOffset(o => o - 1)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold">{MONTHS[month]} {year}</h2>
            <button
              onClick={() => setMonthOffset(o => o + 1)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
              disabled={monthOffset >= 0}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((w, i) => (
              <div key={i} className="text-center text-[10px] font-semibold uppercase text-muted-foreground py-1">{w}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells before the 1st */}
            {Array.from({ length: startWeekday }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const activity = activityMap.get(ds)
              const isToday = ds === todayStr
              const isFuture = new Date(ds + 'T00:00:00') > today
              const hasPast = activity && (activity.exercises + activity.concepts > 0)
              const hasReviews = activity && activity.reviews > 0
              return (
                <div
                  key={day}
                  className={cn(
                    'relative flex aspect-square flex-col items-center justify-center rounded-lg border text-xs transition-colors',
                    isToday ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30' : 'border-border/50',
                    hasPast && !isFuture && 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300/50',
                    hasReviews && isFuture && 'bg-sky-50 dark:bg-sky-950/20 border-sky-300/50',
                  )}
                  title={activity ? `${ds}: ${activity.exercises} ej, ${activity.concepts} conc${activity.reviews ? `, ${activity.reviews} repasos` : ''}` : ds}
                >
                  <span className={cn('font-medium tabular-nums', isToday && 'text-amber-600 dark:text-amber-400')}>{day}</span>
                  {hasPast && (
                    <span className="text-[8px] text-emerald-600 dark:text-emerald-400">
                      {activity!.exercises > 0 && `${activity!.exercises}ej`}
                      {activity!.concepts > 0 && ` ${activity!.concepts}c`}
                    </span>
                  )}
                  {hasReviews && (
                    <span className="text-[8px] text-sky-600 dark:text-sky-400">
                      {activity!.reviews}rep
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded border border-emerald-300/50 bg-emerald-50 dark:bg-emerald-950/20" /> actividad pasada
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded border border-sky-300/50 bg-sky-50 dark:bg-sky-950/20" /> repaso SM-2 programado
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded border border-amber-400 bg-amber-50 dark:bg-amber-950/30" /> hoy
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming reviews list */}
      {data.upcomingReviews.length > 0 && (
        <Card className="border-sky-200/40 bg-sky-50/20 dark:bg-sky-950/10">
          <CardContent className="p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Clock className="h-4 w-4 text-sky-600" /> Próximos repasos programados
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.upcomingReviews.map((r, i) => {
                const d = new Date(r.date + 'T00:00:00')
                const isToday = r.date === todayStr
                return (
                  <div key={i} className={cn('rounded-lg border px-3 py-1.5 text-xs',
                    isToday ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30' : 'border-sky-300/50 bg-sky-50 dark:bg-sky-950/20')}>
                    <span className="font-medium">{d.toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                    <span className="ml-2 rounded bg-sky-200/50 px-1.5 py-0.5 font-mono text-[10px] text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">{r.count}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
