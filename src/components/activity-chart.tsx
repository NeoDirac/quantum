'use client'

// «Actividad de estudio» — gráfico temporal de los últimos 14 días en «Mi progreso».
// Combina DOS fuentes de datos en barras apiladas:
//   · la serie de /api/study (ejercicios marcados y conceptos leídos — servidor), y
//   · los problemas del libro comparados ese día (localStorage — último intento por problema).
// Todo el SVG es propio (sin dependencias): columnas con foco/hover táctil, tooltip HTML,
// «HOY» destacado, tinte de fin de semana, rejilla y leyenda con totales de la ventana.

import { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Flame, CalendarDays, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ActivityDay {
  /** YYYY-MM-DD local */
  date: string
  exercisesDone: number
  conceptsRead: number
  /** Problemas del libro cuyo ÚLTIMO intento comparado cayó ese día (localStorage). */
  bookTried: number
  bookSolved: number
  bookFailed: number
  minutesStudied: number
}

const WEEKDAY_SHORT = ['D', 'L', 'M', 'X', 'J', 'V', 'S']
const WEEKDAY_LONG = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

// Geometría del SVG (escala proporcional, viewBox fijo).
const W = 560
const H = 208
const PAD_X = 14
const TOP = 14
const CHART_H = 132
const LABEL_Y = H - 42
const N_COLS = 14
const COL_W = (W - 2 * PAD_X) / N_COLS
const BAR_W = 20

function niceMax(max: number): number {
  if (max <= 4) return 4
  if (max <= 8) return 8
  const step = Math.ceil(max / 4)
  return Math.ceil(max / step) * step
}

export function ActivityChart({ days, apiOffline }: { days: ActivityDay[]; apiOffline?: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null)

  const totals = useMemo(() => days.reduce((a, d) => ({
    exercises: a.exercises + d.exercisesDone,
    concepts: a.concepts + d.conceptsRead,
    book: a.book + d.bookTried,
    minutes: a.minutes + d.minutesStudied,
  }), { exercises: 0, concepts: 0, book: 0, minutes: 0 }), [days])

  const perDay = days.map(d => d.exercisesDone + d.conceptsRead + d.bookTried)
  const maxStack = Math.max(1, ...perDay)
  const yMax = niceMax(maxStack)
  const peakIdx = perDay.indexOf(Math.max(...perDay))
  const hasAnyActivity = totals.exercises + totals.concepts + totals.book > 0
  const avg = hasAnyActivity ? (totals.exercises + totals.concepts + totals.book) / days.length : 0

  // Racha local: días consecutivos (hacia atrás desde hoy) con cualquier actividad combinada.
  const streak = useMemo(() => {
    let s = 0
    for (let i = days.length - 1; i >= 0; i--) {
      if (perDay[i] > 0) s++
      else if (i === days.length - 1) continue // hoy sin actividad aún no corta la racha
      else break
    }
    return s
  }, [days, perDay])

  const y = (v: number) => TOP + CHART_H - (v / yMax) * CHART_H

  const tooltip = hovered !== null ? days[hovered] : null

  return (
    <Card className="overflow-hidden border-teal-200/50 bg-gradient-to-br from-teal-50/30 via-emerald-50/10 to-transparent dark:border-teal-900/50 dark:from-teal-950/15 dark:via-emerald-950/5">
      {/* Animación de crecimiento de las barras (CSS puro — sin estado JS) */}
      <style>{`@keyframes qm-grow-y { from { transform: scaleY(0); } }`}</style>
      <CardContent className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <CalendarDays className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              Actividad de estudio — últimos 14 días
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Ejercicios marcados, conceptos leídos y problemas del libro comparados por día
              {apiOffline && <> · <span className="text-amber-600 dark:text-amber-400">servidor no disponible: solo datos locales</span></>}
            </p>
          </div>
          {streak > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50/80 px-3 py-1 text-xs font-semibold text-amber-700 dark:border-amber-800/70 dark:bg-amber-950/40 dark:text-amber-300" title="Días consecutivos con actividad (contando hoy solo si ya hay actividad)">
              <Flame className="h-3.5 w-3.5" aria-hidden />
              racha de {streak} {streak === 1 ? 'día' : 'días'}
            </span>
          )}
        </div>

        {hasAnyActivity ? (
          <>
            <div className="relative mt-4">
              {/* Tooltip HTML (más nítido que texto SVG), con fijación en los bordes
                  para que las columnas primera/última no lo recorten (overflow-hidden). */}
              {tooltip && (
                <div
                  role="status"
                  className={cn(
                    'pointer-events-none absolute z-10 w-44 rounded-lg border border-border bg-popover/95 px-3 py-2 text-left shadow-lg backdrop-blur-sm',
                    hovered! <= 1 ? 'left-0' : hovered! >= N_COLS - 2 ? 'right-0' : 'left-1/2 -translate-x-1/2',
                  )}
                  style={hovered! <= 1 || hovered! >= N_COLS - 2 ? { top: 0 } : { left: `${((hovered! + 0.5) / N_COLS) * 100}%`, top: 0 }}
                >
                  <div className="mb-1 flex items-baseline justify-between gap-2 border-b border-border/60 pb-1">
                    <span className="text-xs font-semibold">{tooltip.date === days[days.length - 1].date ? 'Hoy' : cap(WEEKDAY_LONG[new Date(tooltip.date + 'T00:00:00').getDay()])}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{fmtDay(tooltip.date)}</span>
                  </div>
                  <ul className="space-y-0.5 text-[11px]">
                    <TipRow color="teal" label="ejercicios" value={tooltip.exercisesDone} />
                    <TipRow color="emerald" label="conceptos" value={tooltip.conceptsRead} />
                    <TipRow color="violet" label="problemas libro" value={tooltip.bookTried} extra={tooltip.bookTried > 0 ? `${tooltip.bookSolved} ✓ · ${tooltip.bookFailed} ✗` : undefined} />
                  </ul>
                  <div className="mt-1 border-t border-border/60 pt-1 text-[10px] text-muted-foreground">
                    {tooltip.exercisesDone + tooltip.conceptsRead + tooltip.bookTried} acciones
                    {tooltip.minutesStudied > 0 && <> · {tooltip.minutesStudied} min</>}
                  </div>
                </div>
              )}

              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="h-auto w-full select-none"
                role="img"
                aria-label={`Actividad de estudio de los últimos 14 días: ${totals.exercises} ejercicios, ${totals.concepts} conceptos, ${totals.book} problemas del libro. Racha de ${streak} días.`}
              >
                {/* Rejilla + etiquetas del eje Y */}
                {[0, 1, 2, 3, 4].map(t => {
                  const v = (yMax / 4) * t
                  return (
                    <g key={t}>
                      <line x1={PAD_X} x2={W - PAD_X} y1={y(v)} y2={y(v)} className="stroke-border/70" strokeWidth={t === 0 ? 1.2 : 0.6} strokeDasharray={t === 0 ? undefined : '3,4'} />
                      {v > 0 && (
                        <text x={PAD_X - 6} y={y(v) + 3} textAnchor="end" className="fill-muted-foreground text-[8px] font-mono">{v}</text>
                      )}
                    </g>
                  )
                })}

                {days.map((d, i) => {
                  const dt = new Date(d.date + 'T00:00:00')
                  const isToday = i === days.length - 1
                  const isWeekend = dt.getDay() === 0 || dt.getDay() === 6
                  const cx = PAD_X + i * COL_W + COL_W / 2
                  const hEx = (d.exercisesDone / yMax) * CHART_H
                  const hCo = (d.conceptsRead / yMax) * CHART_H
                  const hBk = (d.bookTried / yMax) * CHART_H
                  const total = d.exercisesDone + d.conceptsRead + d.bookTried
                  const active = hovered === i
                  return (
                    <g
                      key={d.date}
                      tabIndex={0}
                      role="button"
                      aria-label={`${fmtDay(d.date)}: ${d.exercisesDone} ejercicios, ${d.conceptsRead} conceptos, ${d.bookTried} problemas del libro${d.minutesStudied > 0 ? `, ${d.minutesStudied} minutos` : ''}`}
                      className="cursor-pointer outline-none focus-visible:stroke-teal-500"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      onClick={() => setHovered(active ? null : i)}
                    >
                      {/* Tinte de fin de semana + halo de HOY */}
                      {isWeekend && <rect x={cx - COL_W / 2 + 2} y={TOP - 6} width={COL_W - 4} height={CHART_H + 12} rx={6} className="fill-muted/60" />}
                      {isToday && <rect x={cx - COL_W / 2 + 2} y={TOP - 8} width={COL_W - 4} height={CHART_H + 22} rx={7} className="fill-teal-500/8 stroke-teal-500/60" strokeWidth={1} strokeDasharray="4,3" />}
                      {active && <rect x={cx - COL_W / 2 + 2} y={TOP - 8} width={COL_W - 4} height={CHART_H + 22} rx={7} className="fill-teal-500/10" />}

                      {/* Barras apiladas (teal → emerald → violet) */}
                      <g
                        style={{
                          transformOrigin: `${cx}px ${TOP + CHART_H}px`,
                          animation: 'qm-grow-y 550ms cubic-bezier(0.22,1,0.36,1) both',
                          animationDelay: `${i * 25}ms`,
                        }}
                      >
                        {d.exercisesDone > 0 && (
                          <rect x={cx - BAR_W / 2} y={y(d.exercisesDone)} width={BAR_W} height={Math.max(hEx, 2)} rx={d.conceptsRead + d.bookTried === 0 ? 3 : 0} className="fill-teal-500 dark:fill-teal-400" />
                        )}
                        {d.conceptsRead > 0 && (
                          <rect x={cx - BAR_W / 2} y={y(d.exercisesDone + d.conceptsRead)} width={BAR_W} height={Math.max(hCo, 2)} rx={d.bookTried === 0 ? 3 : 0} className="fill-emerald-500 dark:fill-emerald-400" />
                        )}
                        {d.bookTried > 0 && (
                          <rect x={cx - BAR_W / 2} y={y(d.exercisesDone + d.conceptsRead + d.bookTried)} width={BAR_W} height={Math.max(hBk, 2)} rx={3} className="fill-violet-500 dark:fill-violet-400" />
                        )}
                      </g>

                      {/* Total sobre la barra (solo con hover/foco o máximo) */}
                      {(active || i === peakIdx) && total > 0 && (
                        <text x={cx} y={y(total) - 5} textAnchor="middle" className={cn('font-mono text-[9px] font-bold', i === peakIdx ? 'fill-amber-600 dark:fill-amber-400' : 'fill-foreground')}>{total}</text>
                      )}

                      {/* Etiqueta de fecha */}
                      <text x={cx} y={LABEL_Y} textAnchor="middle" className={cn('text-[8px] font-medium', isToday ? 'fill-teal-600 font-bold dark:fill-teal-400' : 'fill-muted-foreground')}>
                        {WEEKDAY_SHORT[dt.getDay()]}
                      </text>
                      <text x={cx} y={LABEL_Y + 11} textAnchor="middle" className={cn('font-mono text-[8px]', isToday ? 'fill-teal-600 font-bold dark:fill-teal-400' : 'fill-muted-foreground/80')}>
                        {dt.getDate()}
                      </text>
                      {isToday && (
                        <text x={cx} y={H - 12} textAnchor="middle" className="fill-teal-600 text-[7px] font-bold tracking-widest dark:fill-teal-400">HOY</text>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Leyenda con totales de la ventana */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border/60 pt-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                <LegendDot tone="teal" label="ejercicios" value={totals.exercises} />
                <LegendDot tone="emerald" label="conceptos" value={totals.concepts} />
                <LegendDot tone="violet" label="problemas libro" value={totals.book} />
              </div>
              <div className="text-[11px] text-muted-foreground">
                {totals.minutes > 0 && <>{totals.minutes} min · </>}
                media {avg.toFixed(1)} acciones/día
              </div>
            </div>
          </>
        ) : (
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-dashed border-teal-300/60 bg-teal-50/20 p-4 text-sm text-muted-foreground dark:border-teal-800/60 dark:bg-teal-950/10">
            <Info className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" aria-hidden />
            <span>
              Aún no hay actividad en los últimos 14 días. Marca ejercicios resueltos, lee conceptos o compara
              tus respuestas con los problemas del libro y el gráfico se dibujará aquí.
            </span>
          </div>
        )}

        <p className="sr-only">
          {days.map(d => `${fmtDay(d.date)}: ${d.exercisesDone} ejercicios, ${d.conceptsRead} conceptos, ${d.bookTried} problemas del libro;`).join(' ')}
        </p>
      </CardContent>
    </Card>
  )
}

function TipRow({ color, label, value, extra }: { color: 'teal' | 'emerald' | 'violet'; label: string; value: number; extra?: string }) {
  const dots: Record<string, string> = {
    teal: 'bg-teal-500 dark:bg-teal-400',
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    violet: 'bg-violet-500 dark:bg-violet-400',
  }
  return (
    <li className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-1.5">
        <span className={cn('h-2 w-2 rounded-full', dots[color])} aria-hidden />
        {label}
      </span>
      <span className="font-mono font-semibold tabular-nums">
        {value}
        {extra && <span className="ml-1 font-normal text-muted-foreground">{extra}</span>}
      </span>
    </li>
  )
}

function LegendDot({ tone, label, value }: { tone: 'teal' | 'emerald' | 'violet'; label: string; value: number }) {
  const dots: Record<string, string> = {
    teal: 'bg-teal-500 dark:bg-teal-400',
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    violet: 'bg-violet-500 dark:bg-violet-400',
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn('h-2.5 w-2.5 rounded-full', dots[tone])} aria-hidden />
      {label} <span className="font-mono font-semibold text-foreground tabular-nums">{value}</span>
    </span>
  )
}

function fmtDay(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return `${d.getDate()} ${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][d.getMonth()]}`
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
