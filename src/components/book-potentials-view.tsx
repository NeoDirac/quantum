'use client'

// ════════════════════════════════════════════════════════════════════════════
// «POTENCIALES DEL LIBRO» — §2.2–§2.6 (Griffiths Ch. 2)
// Los cinco potenciales que el profesor puede pedir resolver de principio a
// fin: lista de tarjetas con mini-gráfico de V(x) + ficha completa (idea
// física, montaje, derivación guiada paso a paso, resultados clave, escalera
// de pistas graduadas con aplicación paso a paso, preguntas de examen,
// errores comunes y problemas relacionados).
// Reutiliza el sistema visual de book-problems-view (BookMarkdown, escalera
// de pistas, stepper) y la persistencia de potentials-progress (localStorage).
// ════════════════════════════════════════════════════════════════════════════

import { useEffect, useMemo, useState } from 'react'
import { useUI } from '@/lib/store'
import { BOOK_PROBLEMS } from '@/data/book-problems'
import {
  BOOK_POTENTIALS, POTENTIAL_KIND_META, getBookPotential,
} from '@/data/book-potentials'
import type { BookPotential, PotentialHint, PotentialHintKind } from '@/data/book-potentials'
import { usePotentialsProgress } from '@/lib/potentials-progress'
import { recordView } from '@/lib/recently-viewed'
import { BookMarkdown } from '@/components/book-problems-view'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  Waves, ArrowLeft, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Star, CheckCircle2, Lock, Lightbulb, RotateCcw, PlayCircle, BadgeCheck,
  Compass, PenLine, Wrench, Eye, Footprints, Activity, XCircle, BookMarked,
  GraduationCap, DraftingCompass, Award, Info,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Mini-gráficos SVG de V(x) — una forma por potencial (graphType).
// Versión pequeña (tarjetas de la lista) y grande (detalle, con ejes y labels).
// ─────────────────────────────────────────────────────────────────────────────

const GRAPH_ARIA: Record<BookPotential['graphType'], string> = {
  'infinite-well': 'Gráfico del potencial: pozo cuadrado infinito, V = 0 dentro y paredes infinitas en los bordes',
  'harmonic': 'Gráfico del potencial: oscilador armónico, parábola V = ½mω²x² con mínimo en el origen',
  'free': 'Gráfico del potencial: partícula libre, V = 0 constante en todo el espacio',
  'delta': 'Gráfico del potencial: delta de Dirac, pozo infinitamente estrecho y profundo en el origen',
  'finite-well': 'Gráfico del potencial: pozo cuadrado finito, dos escalones hacia abajo hasta V = −V₀',
}

function PotentialGraph({ type, large = false, className }: {
  type: BookPotential['graphType']
  large?: boolean
  className?: string
}) {
  const curve = 'stroke-teal-600 dark:stroke-teal-400'
  const axis = 'stroke-muted-foreground/40'
  const textCls = 'fill-muted-foreground'

  if (!large) {
    return (
      <svg viewBox="0 0 112 56" className={cn('h-auto w-full select-none', className)} role="img" aria-label={GRAPH_ARIA[type]}>
        {type === 'infinite-well' && (
          <g fill="none" strokeLinecap="round">
            <line x1="28" y1="42" x2="84" y2="42" strokeWidth="3.5" className={curve} />
            <line x1="28" y1="42" x2="28" y2="12" strokeWidth="3.5" className={curve} />
            <line x1="84" y1="42" x2="84" y2="12" strokeWidth="3.5" className={curve} />
            <path d="M 23.5 18 L 28 11 L 32.5 18" strokeWidth="2.5" strokeLinejoin="round" className={curve} />
            <path d="M 79.5 18 L 84 11 L 88.5 18" strokeWidth="2.5" strokeLinejoin="round" className={curve} />
          </g>
        )}
        {type === 'harmonic' && (
          <path d="M 18 12 Q 56 98 94 12" fill="none" strokeWidth="3.5" strokeLinecap="round" className={curve} />
        )}
        {type === 'free' && (
          <line x1="10" y1="28" x2="102" y2="28" strokeWidth="3.5" strokeDasharray="6 5" strokeLinecap="round" className={curve} />
        )}
        {type === 'delta' && (
          <g fill="none" strokeLinecap="round">
            <line x1="10" y1="22" x2="102" y2="22" strokeWidth="2.5" strokeDasharray="4 4" className={curve} opacity="0.65" />
            <line x1="56" y1="22" x2="56" y2="44" strokeWidth="3.5" className={curve} />
            <path d="M 51 42 L 56 51 L 61 42" strokeWidth="3" strokeLinejoin="round" className={curve} />
          </g>
        )}
        {type === 'finite-well' && (
          <path d="M 12 14 L 36 14 L 36 46 L 76 46 L 76 14 L 100 14" fill="none" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" className={curve} />
        )}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 320 150" className={cn('h-auto w-full select-none', className)} role="img" aria-label={GRAPH_ARIA[type]}>
      {/* Ejes */}
      <g fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={axis}>
        <line x1="30" y1="12" x2="30" y2="134" />
        <path d="M 26 18 L 30 11 L 34 18" />
        <line x1="24" y1="130" x2="310" y2="130" />
        <path d="M 304 126 L 311 130 L 304 134" />
      </g>
      <text x="36" y="20" fontSize="10" fontStyle="italic" className={textCls}>V(x)</text>
      <text x="300" y="145" fontSize="10" fontStyle="italic" textAnchor="middle" className={textCls}>x</text>

      {type === 'infinite-well' && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="112" y1="98" x2="214" y2="98" strokeWidth="3" className={curve} />
          <line x1="112" y1="98" x2="112" y2="24" strokeWidth="3" className={curve} />
          <line x1="214" y1="98" x2="214" y2="24" strokeWidth="3" className={curve} />
          <path d="M 106 32 L 112 22 L 118 32" strokeWidth="2.5" className={curve} />
          <path d="M 208 32 L 214 22 L 220 32" strokeWidth="2.5" className={curve} />
          <text x="112" y="144" fontSize="10" textAnchor="middle" className={textCls}>0</text>
          <text x="214" y="144" fontSize="10" fontStyle="italic" textAnchor="middle" className={textCls}>a</text>
          <text x="163" y="90" fontSize="9.5" textAnchor="middle" className="fill-teal-700 dark:fill-teal-300">V = 0</text>
        </g>
      )}
      {type === 'harmonic' && (
        <g>
          <path d="M 68 22 Q 160 214 252 22" fill="none" strokeWidth="3" strokeLinecap="round" className={curve} />
          <text x="160" y="144" fontSize="10" textAnchor="middle" className={textCls}>0</text>
        </g>
      )}
      {type === 'free' && (
        <g>
          <line x1="42" y1="78" x2="300" y2="78" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" className={curve} />
          <text x="171" y="68" fontSize="9.5" textAnchor="middle" className="fill-teal-700 dark:fill-teal-300">V = 0</text>
        </g>
      )}
      {type === 'delta' && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="42" y1="68" x2="300" y2="68" strokeWidth="2.5" strokeDasharray="7 6" className={curve} opacity="0.65" />
          <line x1="160" y1="68" x2="160" y2="110" strokeWidth="3" className={curve} />
          <path d="M 154 107 L 160 118 L 166 107" strokeWidth="3" className={curve} />
          <text x="160" y="144" fontSize="10" textAnchor="middle" className={textCls}>0</text>
        </g>
      )}
      {type === 'finite-well' && (
        <g>
          <path d="M 42 48 L 112 48 L 112 112 L 212 112 L 212 48 L 300 48" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={curve} />
          <text x="74" y="40" fontSize="9.5" textAnchor="middle" className="fill-teal-700 dark:fill-teal-300">V = 0</text>
          <text x="162" y="106" fontSize="10" textAnchor="middle" className={textCls}>−V₀</text>
        </g>
      )}
    </svg>
  )
}

// Estrellas de dificultad técnica (1–3), convención de puntos.
function DifficultyStars({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400" title={`Dificultad técnica: ${n} de 3`}>
      {Array.from({ length: n }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" aria-hidden />)}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LISTA — los potenciales del libro (§2.2–§2.6)
// ─────────────────────────────────────────────────────────────────────────────

export function BookPotentialsList() {
  const { setView } = useUI()
  const { progress, masteredCount } = usePotentialsProgress()

  const potentials = useMemo(
    () => [...BOOK_POTENTIALS].sort((a, b) => a.sectionId.localeCompare(b.sectionId)),
    []
  )

  const entries = Object.values(progress).filter(Boolean)
  const totalHintsUsed = entries.reduce((s, e) => s + (e?.hintsUsed ?? 0), 0)
  const totalDerivSteps = entries.reduce((s, e) => s + (e?.derivationSteps ?? 0), 0)
  const inCourse = entries.filter(e =>
    e && !e.mastered && (e.derivationSteps > 0 || e.hintsUsed > 0 || (e.questionsDone?.length ?? 0) > 0)
  ).length

  const total = potentials.length
  const pct = total > 0 ? Math.round((masteredCount / total) * 100) : 0

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
          <Waves className="h-6 w-6 text-teal-600 dark:text-teal-400" /> Potenciales del libro
        </h1>
        <p className="text-muted-foreground">
          El profesor puede pedir resolver <strong>cualquiera de estos potenciales de principio a fin</strong> (§2.2–§2.6).
          Cada ficha trae la <strong>derivación guiada paso a paso</strong>, la escalera completa de
          <strong> pistas graduadas</strong> con su aplicación a este potencial, los <strong>resultados clave</strong>,
          las <strong>preguntas típicas de examen</strong> y los errores que cuestan puntos.
        </p>
      </header>

      {/* Panel de progreso */}
      <div className="space-y-3 rounded-xl border border-border bg-gradient-to-br from-card to-muted/30 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
              <svg viewBox="0 0 44 44" className="absolute inset-0 h-12 w-12 -rotate-90" aria-hidden>
                <circle cx="22" cy="22" r="19" fill="none" strokeWidth="4" className="stroke-muted" />
                <circle
                  cx="22" cy="22" r="19" fill="none" strokeWidth="4" strokeLinecap="round"
                  className="stroke-teal-500 transition-all duration-500"
                  strokeDasharray={2 * Math.PI * 19}
                  strokeDashoffset={2 * Math.PI * 19 * (1 - (total > 0 ? masteredCount / total : 0))}
                />
              </svg>
              <span className="font-mono text-xs font-bold text-teal-700 dark:text-teal-300">{pct}%</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden />
                {masteredCount} / {total || 5} potenciales dominados
              </div>
              <div className="text-[11px] text-muted-foreground">
                Marca «Ya sé resolverlo» cuando puedas reproducir la derivación completa — se guarda en este navegador
              </div>
            </div>
          </div>
        </div>

        {/* Tira de estadísticas */}
        <div className="grid grid-cols-3 gap-2 border-t border-border/60 pt-3">
          <div title="Potenciales con actividad (pasos, pistas o preguntas) que aún no marcas como dominados" className="flex items-center gap-2.5 rounded-lg bg-amber-50/60 px-3 py-2 transition-colors hover:bg-amber-100/70 dark:bg-amber-950/20 dark:hover:bg-amber-950/40">
            <Activity className="h-4 w-4 shrink-0 text-amber-500" aria-hidden />
            <div className="min-w-0">
              <div className="font-mono text-base font-bold leading-none text-amber-700 dark:text-amber-300">{inCourse}</div>
              <div className="mt-0.5 truncate text-[10px] uppercase tracking-wide text-muted-foreground">en curso</div>
            </div>
          </div>
          <div title="Pistas graduadas reveladas entre todos los potenciales" className="flex items-center gap-2.5 rounded-lg bg-rose-50/60 px-3 py-2 transition-colors hover:bg-rose-100/70 dark:bg-rose-950/20 dark:hover:bg-rose-950/40">
            <Lightbulb className="h-4 w-4 shrink-0 text-rose-500" aria-hidden />
            <div className="min-w-0">
              <div className="font-mono text-base font-bold leading-none text-rose-700 dark:text-rose-300">{totalHintsUsed}</div>
              <div className="mt-0.5 truncate text-[10px] uppercase tracking-wide text-muted-foreground">pistas reveladas</div>
            </div>
          </div>
          <div title="Pasos de derivación guiada revelados en total" className="flex items-center gap-2.5 rounded-lg bg-teal-50/60 px-3 py-2 transition-colors hover:bg-teal-100/70 dark:bg-teal-950/20 dark:hover:bg-teal-950/40">
            <Footprints className="h-4 w-4 shrink-0 text-teal-500" aria-hidden />
            <div className="min-w-0">
              <div className="font-mono text-base font-bold leading-none text-teal-700 dark:text-teal-300">{totalDerivSteps}</div>
              <div className="mt-0.5 truncate text-[10px] uppercase tracking-wide text-muted-foreground">pasos de derivación</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de potenciales */}
      {total === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-10 text-center">
          <Waves className="mx-auto h-8 w-8 text-muted-foreground/50" aria-hidden />
          <div className="mt-3 text-sm font-semibold">Los potenciales están en preparación</div>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Los cinco potenciales del capítulo (§2.2–§2.6) se están redactando en este momento. Vuelve a cargar en unos minutos.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {potentials.map(p => {
            const e = progress[p.id]
            return (
              <PotentialCard
                key={p.id}
                p={p}
                mastered={!!e?.mastered}
                hintsUsed={e?.hintsUsed ?? 0}
                hintsTotal={p.hints.length}
                derivUsed={Math.min(e?.derivationSteps ?? 0, p.derivation.steps.length)}
                derivTotal={p.derivation.steps.length}
                onOpen={() => setView({ name: 'book-potential', potentialId: p.id })}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

function PotentialCard({ p, onOpen, mastered, hintsUsed, hintsTotal, derivUsed, derivTotal }: {
  p: BookPotential
  onOpen: () => void
  mastered: boolean
  hintsUsed: number
  hintsTotal: number
  derivUsed: number
  derivTotal: number
}) {
  return (
    <Card className={cn('cursor-pointer transition-colors hover:border-teal-400',
      mastered && 'border-emerald-300/70 bg-emerald-50/30 dark:border-emerald-800/70 dark:bg-emerald-950/20')}>
      <button
        type="button"
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
        onClick={onOpen}
        aria-label={`Abrir el potencial ${p.title}, sección ${p.sectionId}`}
      >
        <CardContent className="flex items-start gap-3.5 p-4">
          <div
            className="w-[104px] shrink-0 rounded-lg border border-teal-200/60 bg-gradient-to-br from-teal-50/70 to-emerald-50/40 p-1.5 dark:border-teal-800/50 dark:from-teal-950/30 dark:to-emerald-950/10"
            aria-hidden
          >
            <PotentialGraph type={p.graphType} />
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="font-mono text-[10px]">§{p.sectionId}</Badge>
              <DifficultyStars n={p.difficulty} />
              {mastered && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300" title="Marcado como «Ya sé resolverlo»">
                  <CheckCircle2 className="h-3 w-3" aria-hidden /> dominado
                </span>
              )}
              {hintsUsed > 0 && hintsTotal > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-900/60 dark:text-amber-300" title="Pistas graduadas reveladas en este potencial">
                  <Lightbulb className="h-3 w-3" aria-hidden /> {hintsUsed}/{hintsTotal} pistas
                </span>
              )}
              {derivUsed > 0 && derivTotal > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700 dark:bg-violet-900/60 dark:text-violet-300" title="Pasos de la derivación guiada revelados">
                  <Footprints className="h-3 w-3" aria-hidden /> {derivUsed}/{derivTotal} derivación
                </span>
              )}
            </div>
            <div className="font-semibold leading-snug">{p.title}</div>
            <div className="line-clamp-2 text-xs leading-5 text-muted-foreground">{p.tagline}</div>
          </div>
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        </CardContent>
      </button>
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DETALLE — la ficha completa de un potencial
// ─────────────────────────────────────────────────────────────────────────────

export function BookPotentialDetail({ potentialId }: { potentialId: string }) {
  const { setView } = useUI()
  const p = getBookPotential(potentialId)
  const { progress, setHintsUsed, toggleMastered } = usePotentialsProgress()
  const mastered = p ? !!progress[p.id]?.mastered : false
  // Destello temporal de la pista a la que lleva el enlace de una pregunta de examen.
  const [flashHint, setFlashHint] = useState<number | null>(null)

  // Registrar la visita para «Visto recientemente» (panel de inicio).
  useEffect(() => {
    if (p) recordView({ type: 'book-potential', id: p.id, title: p.title, sectionId: p.sectionId })
  }, [potentialId])

  if (!p) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
        <div className="text-lg font-semibold">Potencial no encontrado</div>
        <p className="mt-1 text-sm text-muted-foreground">El potencial solicitado no existe en el registro.</p>
      </div>
    )
  }

  // Anterior / siguiente dentro del orden del libro (§2.2 → §2.6).
  const sorted = [...BOOK_POTENTIALS].sort((a, b) => a.sectionId.localeCompare(b.sectionId))
  const idx = sorted.findIndex(x => x.id === p.id)
  const prev = idx > 0 ? sorted[idx - 1] : null
  const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null

  // Lleva a la pista que ataca una pregunta de examen: la revela si aún está
  // bloqueada, hace scroll suave y la destaca un instante.
  const goToHint = (hintIndex: number) => {
    const revealed = progress[p.id]?.hintsUsed ?? 0
    if (revealed <= hintIndex) setHintsUsed(p.id, hintIndex + 1)
    setFlashHint(hintIndex)
    window.setTimeout(() => {
      document.getElementById(`pista-${hintIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 90)
    window.setTimeout(() => setFlashHint(f => (f === hintIndex ? null : f)), 2600)
  }

  return (
    <div className="space-y-5">
      {/* Cabecera */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => setView({ name: 'book-potentials' })}
            className="mt-1 rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
            title="Volver a la lista de potenciales"
            aria-label="Volver a la lista de potenciales"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono text-base font-bold text-teal-700 dark:text-teal-300">§{p.sectionId}</span>
              <span>·</span>
              <span>dificultad</span>
              <DifficultyStars n={p.difficulty} />
            </div>
            <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">{p.title}</h1>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">{p.tagline}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toggleMastered(p.id)}
          aria-pressed={mastered}
          className={cn('inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background',
            mastered
              ? 'border-emerald-400 bg-emerald-100 text-emerald-800 shadow-sm dark:border-emerald-700 dark:bg-emerald-900 dark:text-emerald-100'
              : 'border-border text-muted-foreground hover:border-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-300')}
          title={mastered ? 'Quitar la marca «Ya sé resolverlo»' : 'Márcalo cuando puedas reproducir la derivación completa sin mirar'}
        >
          <Star className={cn('h-4 w-4', mastered && 'fill-current')} aria-hidden />
          {mastered ? '¡Ya sé resolverlo!' : 'Ya sé resolverlo'}
        </button>
      </div>

      {/* Idea física */}
      <Card className="border-teal-300/60 bg-gradient-to-br from-teal-50/50 to-emerald-50/30 dark:border-teal-800/60 dark:from-teal-950/20 dark:to-emerald-950/10">
        <CardContent className="space-y-4 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-teal-200/60 pb-3 dark:border-teal-800/50">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
              <Lightbulb className="h-4 w-4" aria-hidden /> Idea física
            </div>
            <span className="text-[10px] text-muted-foreground">por qué importa y cuándo cae en examen</span>
          </div>
          <BookMarkdown text={p.vignette} />
          <div className="flex justify-center rounded-xl border border-teal-200/50 bg-background/70 p-3 dark:border-teal-800/40 sm:p-4">
            <PotentialGraph type={p.graphType} large className="max-w-md" />
          </div>
        </CardContent>
      </Card>

      {/* El montaje */}
      <Card>
        <CardContent className="space-y-3 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
              <DraftingCompass className="h-4 w-4" aria-hidden /> El montaje
            </div>
            <span className="text-[10px] text-muted-foreground">V(x), la EDE por región y las condiciones de frontera</span>
          </div>
          <div className="space-y-2.5">
            {p.setup.map((block, i) => <BookMarkdown key={i} text={block} />)}
          </div>
        </CardContent>
      </Card>

      {/* Derivación guiada */}
      <DerivationSection p={p} />

      {/* Resultados clave */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden /> Resultados clave
          </div>
          <span className="text-[10px] text-muted-foreground">lo que hay que saber escribir en el examen</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {p.keyResults.map((kr, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.2) }}
              className="min-w-0 rounded-lg border border-border bg-card p-3.5"
            >
              <div className="text-[10px] font-bold uppercase tracking-wide text-teal-700 dark:text-teal-300">{kr.label}</div>
              <div className="mt-1.5 overflow-x-auto py-0.5 text-center">
                <BlockMath math={kr.latex} />
              </div>
              {kr.note && <div className="mt-1.5 border-t border-border/50 pt-1.5 text-[11.5px] leading-5 text-muted-foreground">{kr.note}</div>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pistas graduadas */}
      <PotentialHintsSection p={p} flash={flashHint} />

      {/* Preguntas típicas de examen */}
      <ExamQuestionsSection p={p} onGoToHint={goToHint} />

      {/* Errores comunes */}
      <Card className="border-rose-300/50 dark:border-rose-800/50">
        <CardContent className="space-y-2.5 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-300">
              <XCircle className="h-4 w-4" aria-hidden /> Errores comunes
            </div>
            <span className="text-[10px] text-muted-foreground">lo que cuesta puntos en este potencial</span>
          </div>
          <ul className="space-y-2">
            {p.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2.5 rounded-lg border border-rose-200/60 bg-rose-50/40 p-2.5 dark:border-rose-900/40 dark:bg-rose-950/20">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500 dark:text-rose-400" aria-hidden />
                <BookMarkdown text={m} className="text-[13px] leading-6" />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Problemas relacionados */}
      <RelatedProblemsSection p={p} />

      {/* Guía de uso */}
      <div className="flex items-start gap-2.5 rounded-lg border border-teal-300/60 bg-teal-50/60 p-4 text-[13px] leading-6 text-muted-foreground dark:border-teal-800 dark:bg-teal-950/30">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" aria-hidden />
        <div>
          Forma de estudio: intenta cada paso de la <strong>derivación guiada</strong> con lápiz y papel antes de
          revelarlo; pide una <strong>pista</strong> solo cuando tu intento se haya atascado de verdad; despliega la
          <strong> aplicación paso a paso</strong> para ver la técnica aplicada a este potencial; y marca
          <strong> «Ya sé resolverlo»</strong> cuando puedas reproducir la derivación completa sin mirar.
          Todo tu progreso (pasos, pistas, preguntas y dominio) se guarda en este navegador.
        </div>
      </div>

      {/* Anterior / siguiente */}
      <div className="flex items-stretch justify-between gap-3 pt-1">
        {prev ? (
          <button
            type="button"
            onClick={() => setView({ name: 'book-potential', potentialId: prev.id })}
            className="group flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
          >
            <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground" aria-hidden />
            <div className="min-w-0">
              <div className="font-mono text-[11px] text-muted-foreground">Anterior · §{prev.sectionId}</div>
              <div className="truncate text-sm font-medium">{prev.title}</div>
            </div>
          </button>
        ) : <div className="flex-1" />}
        {next ? (
          <button
            type="button"
            onClick={() => setView({ name: 'book-potential', potentialId: next.id })}
            className="group flex min-w-0 flex-1 items-center justify-end gap-2 rounded-lg border border-border p-3 text-right transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
          >
            <div className="min-w-0">
              <div className="font-mono text-[11px] text-muted-foreground">Siguiente · §{next.sectionId}</div>
              <div className="truncate text-sm font-medium">{next.title}</div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground" aria-hidden />
          </button>
        ) : <div className="flex-1" />}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DERIVACIÓN GUIADA — stepper paso a paso persistido (localStorage).
// Réplica visual del stepper de aplicaciones de book-problems-view.
// ─────────────────────────────────────────────────────────────────────────────

function DerivationSection({ p }: { p: BookPotential }) {
  const { progress, setDerivationSteps } = usePotentialsProgress()
  const total = p.derivation.steps.length
  const shown = Math.min(progress[p.id]?.derivationSteps ?? 0, total)
  const done = shown >= total

  const showStep = (n: number) => setDerivationSteps(p.id, Math.min(n, total))

  return (
    <div className="overflow-hidden rounded-xl border border-teal-300/60 bg-gradient-to-b from-teal-50/30 to-transparent dark:border-teal-800/70 dark:from-teal-950/20">
      {/* Cabecera */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-200/60 px-4 py-3 dark:border-teal-800/60">
        <div className="flex items-center gap-2 text-sm font-semibold text-teal-800 dark:text-teal-200">
          <Footprints className="h-4 w-4" aria-hidden /> Derivación guiada
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="font-mono" aria-live="polite">{shown}/{total}</span>
          {shown > 0 && (
            <button
              type="button"
              onClick={() => setDerivationSteps(p.id, 0)}
              className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
              title="Ocultar todos los pasos y empezar de nuevo"
            >
              <RotateCcw className="h-3 w-3" aria-hidden /> reiniciar
            </button>
          )}
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="h-0.5 w-full bg-border/40" role="presentation">
        <div
          className="h-full bg-teal-400 transition-all duration-300"
          style={{ width: `${total > 0 ? (shown / total) * 100 : 0}%` }}
        />
      </div>

      <div className="space-y-2.5 px-4 py-3.5">
        <p className="text-[12.5px] leading-5 text-muted-foreground">{p.derivation.intro}</p>

        {/* Pasos en línea de tiempo */}
        <ol className="space-y-2">
          {p.derivation.steps.slice(0, shown).map((s, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2.5"
            >
              {/* Carril: número + conector hacia el siguiente paso */}
              <div className="flex flex-col items-center pt-1" aria-hidden>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 font-mono text-[10px] font-bold tabular-nums text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
                  {j + 1}
                </span>
                {(j < shown - 1 || !done) && (
                  <span className={cn('mt-1 w-px flex-1',
                    j < shown - 1 ? 'bg-border' : 'bg-gradient-to-b from-border/80 to-transparent')} />
                )}
              </div>
              <div className="min-w-0 flex-1 rounded-md border border-border/60 bg-card p-2.5 transition-colors hover:border-foreground/20">
                <div className="mb-1 text-[12px] font-semibold leading-4">{s.title}</div>
                <BookMarkdown text={s.text} className="text-[13px] leading-6" />
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Control de revelado */}
        {!done ? (
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => showStep(shown + 1)}
              className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/70 bg-teal-50/60 px-3 py-1.5 text-[11px] font-semibold text-teal-800 transition-all hover:border-teal-500 hover:bg-teal-100/70 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 dark:border-teal-800/60 dark:bg-teal-950/30 dark:text-teal-200 dark:hover:bg-teal-950/50"
              aria-label={`Revelar el paso ${Math.min(shown + 1, total)} de ${total} de la derivación`}
            >
              Siguiente paso ({Math.min(shown + 1, total)}/{total})
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => showStep(total)}
              className="text-[10.5px] font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
            >
              mostrar todos
            </button>
          </div>
        ) : (
          <p className="flex items-center gap-1.5 rounded-md border border-emerald-200/60 bg-emerald-50/30 px-2.5 py-1.5 text-[11.5px] leading-5 text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/20 dark:text-emerald-200">
            <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Derivación completa — reprodúcela con lápiz y papel antes de darla por dominada.
          </p>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PISTAS GRADUADAS — escalera con 5 clases (reconocer → plantear → técnica →
// interpretar → verificar). La clase «interpretacion» es exclusiva de los
// potenciales y usa acento rosa.
// ─────────────────────────────────────────────────────────────────────────────

const P_HINT_STYLES: Record<PotentialHintKind, {
  icon: typeof Compass
  border: string
  chip: string
  iconColor: string
  bar: string
  short: string
}> = {
  reconocimiento: {
    icon: Compass,
    border: 'border-l-amber-400',
    chip: 'bg-amber-100 dark:bg-amber-900/50',
    iconColor: 'text-amber-600 dark:text-amber-300',
    bar: 'bg-amber-400',
    short: 'Reconocer',
  },
  planteamiento: {
    icon: PenLine,
    border: 'border-l-violet-400',
    chip: 'bg-violet-100 dark:bg-violet-900/50',
    iconColor: 'text-violet-600 dark:text-violet-300',
    bar: 'bg-violet-400',
    short: 'Plantear',
  },
  tecnica: {
    icon: Wrench,
    border: 'border-l-teal-400',
    chip: 'bg-teal-100 dark:bg-teal-900/50',
    iconColor: 'text-teal-600 dark:text-teal-300',
    bar: 'bg-teal-400',
    short: 'Técnica',
  },
  interpretacion: {
    icon: Eye,
    border: 'border-l-rose-400',
    chip: 'bg-rose-100 dark:bg-rose-900/50',
    iconColor: 'text-rose-600 dark:text-rose-300',
    bar: 'bg-rose-400',
    short: 'Interpretar',
  },
  verificacion: {
    icon: BadgeCheck,
    border: 'border-l-emerald-400',
    chip: 'bg-emerald-100 dark:bg-emerald-900/50',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    bar: 'bg-emerald-400',
    short: 'Verificar',
  },
}

function PotentialHintsSection({ p, flash }: { p: BookPotential; flash: number | null }) {
  const { progress, setHintsUsed } = usePotentialsProgress()
  const revealed = progress[p.id]?.hintsUsed ?? 0
  const total = p.hints.length
  const allRevealed = revealed >= total

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-amber-300/60 bg-gradient-to-b from-amber-50/30 to-transparent dark:border-amber-800/70 dark:from-amber-950/20">
        {/* Cabecera */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 px-4 py-3 dark:border-amber-800/60">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-200">
            <Lightbulb className="h-4 w-4" aria-hidden /> Pistas graduadas
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="font-mono" aria-live="polite">{revealed}/{total}</span>
            {revealed > 0 && (
              <button
                type="button"
                onClick={() => setHintsUsed(p.id, 0)}
                className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
                title="Ocultar todas las pistas y empezar de nuevo"
              >
                <RotateCcw className="h-3 w-3" aria-hidden /> reiniciar
              </button>
            )}
          </div>
        </div>

        {/* Filosofía */}
        <p className="px-4 py-2.5 text-[12.5px] leading-5 text-muted-foreground">
          La escalera completa de este potencial: <strong>reconoce</strong> la familia → <strong>plántalo</strong>{' '}
          (regiones y fronteras) → aplica la <strong>técnica</strong> → <strong>interpreta</strong> el resultado →{' '}
          <strong>verifica</strong>. Cada pista trae además su <strong>aplicación paso a paso</strong> a este
          potencial: despliégala solo cuando tu propio intento se haya atascado de verdad.
        </p>

        {/* Peldaños */}
        <div className="space-y-2 px-4 pb-4">
          {p.hints.map((h, i) => {
            const meta = P_HINT_STYLES[h.kind]
            const Icon = meta.icon
            if (i < revealed) {
              return (
                <motion.div
                  key={h.id}
                  id={`pista-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn('rounded-lg border border-l-[3px] bg-card p-3 transition-shadow duration-500', meta.border,
                    flash === i && 'ring-2 ring-rose-400/80 ring-offset-2 ring-offset-background')}
                >
                  <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                    <span className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded-full', meta.chip)}>
                      <Icon className={cn('h-3 w-3', meta.iconColor)} aria-hidden />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      Pista {i + 1} · {meta.short}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-foreground/90">{h.title}</span>
                    {h.application && (
                      <span className="shrink-0 font-mono text-[9.5px] text-muted-foreground/70" title="Pasos de la aplicación de esta pista">
                        +{h.application.steps.length} pasos
                      </span>
                    )}
                  </div>
                  <BookMarkdown text={h.text} />
                  {h.application && (
                    <PotentialHintApplication potentialId={p.id} hintIndex={i} app={h.application} meta={meta} />
                  )}
                </motion.div>
              )
            }
            if (i === revealed) {
              // El siguiente peldaño: botón de revelado explícito.
              return (
                <button
                  key={h.id}
                  id={`pista-${i}`}
                  type="button"
                  onClick={() => setHintsUsed(p.id, i + 1)}
                  className="group flex w-full items-center gap-3 rounded-lg border border-dashed border-amber-400/70 bg-amber-50/30 p-3 text-left transition-colors hover:border-amber-500 hover:bg-amber-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 dark:border-amber-800/60 dark:bg-amber-950/20 dark:hover:bg-amber-950/40"
                  aria-label={`Mostrar pista ${i + 1} de ${total}: ${meta.short}`}
                >
                  <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full', meta.chip)}>
                    <Icon className={cn('h-4 w-4', meta.iconColor)} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold text-amber-900 dark:text-amber-100">
                      Mostrar pista {i + 1} · {meta.short}
                    </span>
                    <span className="block text-[11px] leading-4 text-muted-foreground">
                      {POTENTIAL_KIND_META[h.kind].description}
                    </span>
                  </span>
                  <Lightbulb className="h-4 w-4 shrink-0 text-amber-500 transition-transform group-hover:scale-110" aria-hidden />
                </button>
              )
            }
            // Peldaños futuros: bloqueados.
            return (
              <div
                key={h.id}
                id={`pista-${i}`}
                className="flex items-center gap-3 rounded-lg border border-dashed border-border/60 bg-muted/20 p-3 opacity-60"
                aria-label={`Pista ${i + 1} de ${total} (bloqueada)`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                </span>
                <span className="text-[13px] font-medium text-muted-foreground">
                  Pista {i + 1} · {i === revealed + 1 ? meta.short : '?????'}
                </span>
              </div>
            )
          })}

          {allRevealed && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-300/50 bg-emerald-50/30 px-3 py-2 text-[12.5px] text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/20 dark:text-emerald-200">
              <ChevronDown className="h-4 w-4 shrink-0" aria-hidden />
              Toda la escalera está a la vista: cierra la ficha, reproduce la derivación con lápiz y papel y{' '}
              <strong>marca «Ya sé resolverlo»</strong> cuando salga sin mirar.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// APLICACIÓN de una pista a ESTE potencial: stepper paso a paso persistido por
// (potentialId, hintIndex) — réplica del HintApplication de book-problems-view.
// ─────────────────────────────────────────────────────────────────────────────

function PotentialHintApplication({ potentialId, hintIndex, app, meta }: {
  potentialId: string
  hintIndex: number
  app: NonNullable<PotentialHint['application']>
  meta: (typeof P_HINT_STYLES)[PotentialHintKind]
}) {
  const { progress, setAppSteps } = usePotentialsProgress()
  const [open, setOpen] = useState(false)
  const total = app.steps.length
  // Estado derivado del progreso persistido (clamp por si cambia el contenido).
  const shown = Math.min(progress[potentialId]?.appSteps?.[hintIndex] ?? 0, total)
  const done = shown >= total
  const KindIcon = meta.icon
  const showStep = (n: number | ((prev: number) => number)) =>
    setAppSteps(potentialId, hintIndex, prev => Math.min(typeof n === 'function' ? n(prev) : n, total))

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => { setOpen(true); if (shown === 0) showStep(1) }}
        className="group inline-flex items-center gap-1.5 rounded-full border border-dashed border-border bg-muted/30 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-muted/60 hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
        aria-expanded={false}
        aria-label={`Desplegar la aplicación de la pista ${hintIndex + 1} a este potencial, ${total} pasos`}
      >
        <PlayCircle className="h-3.5 w-3.5 transition-transform group-hover:scale-110" aria-hidden />
        Aplicación a este potencial · {total} pasos
        {shown > 0 && <span className="font-mono tabular-nums">({shown}/{total})</span>}
        <ChevronDown className="h-3 w-3" aria-hidden />
      </button>
    )
  }

  return (
    <div className={cn('mt-2.5 overflow-hidden rounded-lg border border-l-[3px] bg-muted/20', meta.border)}>
      {/* Cabecera del desplegable */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-border/60 px-3 py-2">
        <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
          <span className={cn('flex h-4 w-4 shrink-0 items-center justify-center rounded-full', meta.chip)}>
            <KindIcon className={cn('h-2.5 w-2.5', meta.iconColor)} aria-hidden />
          </span>
          <span className="truncate">Aplicación de la pista {hintIndex + 1} · {meta.short}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground" aria-live="polite">
            {shown}/{total}
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
            aria-label="Plegar la aplicación"
          >
            <ChevronUp className="h-3 w-3" aria-hidden /> plegar
          </button>
        </div>
      </div>

      {/* Barra de progreso de los pasos */}
      <div className="h-0.5 w-full bg-border/40" role="presentation">
        <div
          className={cn('h-full transition-all duration-300', meta.bar)}
          style={{ width: `${total > 0 ? (shown / total) * 100 : 0}%` }}
        />
      </div>

      {/* Intro puente + pasos en línea de tiempo */}
      <div className="space-y-2.5 px-3 py-3">
        {app.intro && (
          <p className="text-[12.5px] leading-6 text-muted-foreground">{app.intro}</p>
        )}
        <ol className="space-y-2">
          {app.steps.slice(0, shown).map((s, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2.5"
            >
              <div className="flex flex-col items-center pt-1" aria-hidden>
                <span className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold tabular-nums', meta.chip, meta.iconColor)}>
                  {j + 1}
                </span>
                {(j < shown - 1 || !done) && (
                  <span className={cn('mt-1 w-px flex-1',
                    j < shown - 1 ? 'bg-border' : 'bg-gradient-to-b from-border/80 to-transparent')} />
                )}
              </div>
              <div className="min-w-0 flex-1 rounded-md border border-border/60 bg-card p-2.5 transition-colors hover:border-foreground/20">
                <div className="mb-1 text-[12px] font-semibold leading-4">{s.title}</div>
                <BookMarkdown text={s.text} className="text-[13px] leading-6" />
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Control de revelado: un paso cada vez */}
        {!done ? (
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => showStep(prev => prev + 1)}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/70 bg-amber-50/60 px-3 py-1.5 text-[11px] font-semibold text-amber-800 transition-all hover:border-amber-500 hover:bg-amber-100/70 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-200 dark:hover:bg-amber-950/50"
              aria-label={`Revelar el paso ${Math.min(shown + 1, total)} de ${total}`}
            >
              Siguiente paso ({Math.min(shown + 1, total)}/{total})
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => showStep(total)}
              className="text-[10.5px] font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
            >
              mostrar todos
            </button>
          </div>
        ) : (
          <p className="flex items-center gap-1.5 rounded-md border border-emerald-200/60 bg-emerald-50/30 px-2.5 py-1.5 text-[11.5px] leading-5 text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/20 dark:text-emerald-200">
            <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Aplicación completa — ahora reproduce estos pasos con lápiz y papel antes de pasar a la siguiente pista.
          </p>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PREGUNTAS TÍPICAS DE EXAMEN — checklist persistido + enlace a la pista
// que ataca cada pregunta (scroll suave + destello).
// ─────────────────────────────────────────────────────────────────────────────

function ExamQuestionsSection({ p, onGoToHint }: { p: BookPotential; onGoToHint: (hintIndex: number) => void }) {
  const { progress, toggleQuestion } = usePotentialsProgress()
  const doneSet = new Set(progress[p.id]?.questionsDone ?? [])
  const done = p.examQuestions.filter(q => doneSet.has(q.id)).length

  return (
    <Card>
      <CardContent className="space-y-2.5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
            <GraduationCap className="h-4 w-4" aria-hidden /> Preguntas típicas de examen
          </div>
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground" aria-live="polite">
            {done}/{p.examQuestions.length} listas
          </span>
        </div>
        <p className="text-[12px] leading-5 text-muted-foreground">
          Marca cada pregunta cuando sepas responderla de principio a fin — el enlace «pista» lleva directo a la
          pista que enseña a atacarla.
        </p>
        <ul className="space-y-2">
          {p.examQuestions.map((q, i) => {
            const domId = `${p.id}-q-${q.id}`
            const hintTarget = q.hintIndex !== undefined && q.hintIndex >= 0 && q.hintIndex < p.hints.length ? q.hintIndex : null
            return (
              <li
                key={q.id}
                className={cn('flex items-start gap-2.5 rounded-lg border p-3 transition-colors',
                  doneSet.has(q.id)
                    ? 'border-emerald-300/60 bg-emerald-50/30 dark:border-emerald-800/50 dark:bg-emerald-950/20'
                    : 'border-border bg-card hover:border-teal-300/60')}
              >
                <Checkbox
                  id={domId}
                  checked={doneSet.has(q.id)}
                  onCheckedChange={() => toggleQuestion(p.id, q.id)}
                  className="mt-1"
                  aria-label={`Pregunta ${i + 1}: ${q.q.replace(/\$[^$]*\$/g, '…')}`}
                />
                <label htmlFor={domId} className="min-w-0 flex-1 cursor-pointer">
                  <BookMarkdown text={q.q} className={cn('text-[13.5px] leading-6', doneSet.has(q.id) && 'opacity-60')} />
                </label>
                {hintTarget !== null && (
                  <button
                    type="button"
                    onClick={() => onGoToHint(hintTarget)}
                    className="mt-0.5 shrink-0 whitespace-nowrap rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors hover:border-amber-400 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 dark:hover:text-amber-300"
                    title={`Ir a la pista ${hintTarget + 1}, que ataca esta pregunta`}
                  >
                    → pista {hintTarget + 1}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROBLEMAS RELACIONADOS — chips que navegan a la ficha del problema del libro.
// ─────────────────────────────────────────────────────────────────────────────

function RelatedProblemsSection({ p }: { p: BookPotential }) {
  const { setView } = useUI()
  const related = useMemo(
    () => p.relatedProblemIds
      .map(id => BOOK_PROBLEMS.find(bp => bp.id === id))
      .filter((bp): bp is NonNullable<typeof bp> => !!bp),
    [p.relatedProblemIds]
  )

  if (related.length === 0) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <BookMarked className="h-4 w-4 text-violet-600 dark:text-violet-400" aria-hidden /> Problemas relacionados
        </div>
        <span className="text-[10px] text-muted-foreground">problemas del libro que ejercitan este potencial</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {related.map(rp => (
          <button
            key={rp.id}
            type="button"
            onClick={() => setView({ name: 'book-problem', problemId: rp.id })}
            className="rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
            aria-label={`Abrir el problema ${rp.number} del libro: ${rp.title}`}
          >
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <BookMarked className="h-3 w-3" aria-hidden /> problema del libro · sección {rp.sectionId}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-[13px] font-bold text-violet-700 dark:text-violet-300">{rp.number}</span>
              <span className="text-sm font-medium leading-snug">{rp.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
