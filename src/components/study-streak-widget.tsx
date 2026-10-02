'use client'

import { useState, useEffect } from 'react'
import { apiGet, apiPost, getOrCreateStudentId } from '@/lib/student'
import { Card, CardContent } from '@/components/ui/card'
import { Flame, Target, CalendarDays, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StudyDay {
  date: string
  exercisesDone: number
  conceptsRead: number
  goalsMet: number
  minutesStudied: number
  isToday: boolean
}
interface StudyData {
  series: StudyDay[]
  streak: number
  longestStreak: number
  totals: { exercisesDone: number; conceptsRead: number; goalsMet: number; minutesStudied: number }
  today: StudyDay
}

const DAILY_EXERCISE_GOAL = 3
const DAILY_CONCEPT_GOAL = 2

export function StudyStreakWidget() {
  const [data, setData] = useState<StudyData | null>(null)
  const studentId = getOrCreateStudentId()

  const load = async () => {
    try {
      const d = await apiGet(`/api/study?studentId=${encodeURIComponent(studentId)}&days=14`)
      return d
    } catch {
      return null
    }
  }
  useEffect(() => {
    let mounted = true
    load().then(d => { if (mounted && d) setData(d) })
    return () => { mounted = false }
  }, [studentId])

  if (!data) {
    return <div className="h-28 animate-pulse rounded-xl bg-muted" />
  }

  const todayProgress = Math.min(100, (data.today.exercisesDone / DAILY_EXERCISE_GOAL) * 100)
  const goalMet = data.today.exercisesDone >= DAILY_EXERCISE_GOAL

  // weekday labels for the 14-day strip
  const weekdayShort = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00')
    return ['D', 'L', 'M', 'X', 'J', 'V', 'S'][d.getDay()]
  }

  return (
    <Card className="overflow-hidden border-amber-200/40 bg-gradient-to-br from-amber-50/40 via-orange-50/20 to-transparent dark:from-amber-950/10 dark:via-orange-950/5">
      <CardContent className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          {/* Streak */}
          <div className="flex items-center gap-3">
            <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl shadow-sm',
              data.streak > 0 ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white' : 'bg-muted text-muted-foreground')}>
              <Flame className={cn('h-6 w-6', data.streak > 0 && 'drop-shadow')} />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tabular-nums">{data.streak}</span>
                <span className="text-sm text-muted-foreground">días seguidos</span>
              </div>
              <div className="text-[11px] text-muted-foreground">récord: {data.longestStreak} días</div>
            </div>
          </div>

          {/* Today's goal */}
          <div className="flex items-center gap-3">
            <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl shadow-sm',
              goalMet ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white' : 'bg-muted text-muted-foreground')}>
              <Target className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tabular-nums">{data.today.exercisesDone}</span>
                <span className="text-sm text-muted-foreground">/ {DAILY_EXERCISE_GOAL} hoy</span>
              </div>
              <div className="text-[11px] text-muted-foreground">{goalMet ? '✓ meta cumplida' : `${DAILY_EXERCISE_GOAL - data.today.exercisesDone} para cumplir`}</div>
            </div>
          </div>

          {/* 14-day totals */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tabular-nums">{data.totals.exercisesDone}</span>
                <span className="text-sm text-muted-foreground">en 14 días</span>
              </div>
              <div className="text-[11px] text-muted-foreground">{data.totals.conceptsRead} conceptos leídos</div>
            </div>
          </div>
        </div>

        {/* 14-day activity strip with day-of-month + goal indicator */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            <CalendarDays className="h-3 w-3" /> Últimos 14 días
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] normal-case">
              <span className="inline-block h-2 w-2 rounded-sm bg-emerald-500" /> meta
              <span className="inline-block h-2 w-2 rounded-sm bg-teal-400 ml-1" /> actividad
            </span>
          </div>
          <div className="flex items-end gap-1">
            {data.series.map((d, i) => {
              const activity = d.exercisesDone + d.conceptsRead
              const h = Math.min(32, 3 + activity * 4)
              const isToday = d.isToday
              const hasActivity = activity > 0
              const dayGoalMet = d.exercisesDone >= DAILY_EXERCISE_GOAL
              const dayNum = new Date(d.date + 'T00:00:00').getDate()
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-1" title={`${d.date}: ${d.exercisesDone} ej, ${d.conceptsRead} conc.`}>
                  <span className={cn('h-3 w-3 text-[8px] leading-3',
                    dayGoalMet ? 'text-emerald-600' : 'text-transparent')}>
                    {dayGoalMet ? '✓' : '·'}
                  </span>
                  <div className="flex h-8 w-full items-end justify-center">
                    <div
                      className={cn('w-full max-w-[12px] rounded-t transition-all',
                        isToday ? 'bg-gradient-to-t from-orange-500 to-amber-400'
                        : dayGoalMet ? 'bg-gradient-to-t from-emerald-500 to-teal-400'
                        : hasActivity ? 'bg-gradient-to-t from-teal-500 to-emerald-300'
                        : 'bg-muted')}
                      style={{ height: `${h}px` }}
                    />
                  </div>
                  <span className={cn('text-[8px] tabular-nums', isToday ? 'font-bold text-amber-600 dark:text-amber-400' : 'text-muted-foreground')}>
                    {dayNum}
                  </span>
                  <span className="text-[7px] uppercase text-muted-foreground/70">{weekdayShort(d.date)}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Subtle nudge */}
        {!goalMet && (
          <div className="mt-3 rounded-md border border-amber-200/60 bg-amber-50/50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-300">
            {data.streak > 0
              ? `Llevas ${data.streak} días. Resuelve ${DAILY_EXERCISE_GOAL - data.today.exercisesDone} ejercicio(s) más hoy para mantener la racha.`
              : 'Resuelve 3 ejercicios hoy para empezar una racha — constancia sobre intensidad.'}
          </div>
        )}
        {goalMet && (
          <div className="mt-3 rounded-md border border-emerald-200/60 bg-emerald-50/50 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-300">
            ✓ Meta diaria cumplida. {data.streak > 0 && `Racha de ${data.streak} días.`} Vuelve mañana para mantener el hábito.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
