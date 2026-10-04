'use client'

import { useEffect, useRef, useState } from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Sigma, StickyNote, Link2, Image as ImageIcon, ArrowRight, ChevronsDownUp } from 'lucide-react'
import type { BookProblem } from '@/data/book-problems'
import { BOOK_PROBLEMS } from '@/data/book-problems'
import { findCrossRefs, crossRefsCount, type ProblemRef } from '@/lib/cross-refs'
import {
  getBookEquation, getBookFigure, getBookTextFootnote, getExternalProblemRef,
  type BookEquationRef,
} from '@/data/book-refs'
import { useUI } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// «Referencias cruzadas del libro»: ecuaciones, figuras, problemas y notas que
// el enunciado cita explícitamente, renderizados debajo de la pregunta.
// ─────────────────────────────────────────────────────────────────────────────

function EquationCard({ eq, onNavigate, highlight }: { eq: BookEquationRef; onNavigate: (problemNumber: string) => void; highlight?: boolean }) {
  return (
    <div
      id={`ref-eq-${eq.id}`}
      className={cn(
        'rounded-lg border border-amber-200/80 bg-card/80 p-3.5 transition-all duration-300 hover:border-amber-300/90 dark:border-amber-900/60 dark:hover:border-amber-800',
        highlight && 'border-amber-400/90 shadow-md shadow-amber-400/20 ring-2 ring-amber-400/70 ring-offset-2 ring-offset-background dark:border-amber-600/70 dark:ring-amber-500/60',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-amber-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
          Ec. {eq.id}
        </span>
        <span className="text-xs font-semibold leading-tight">{eq.label}</span>
        <span className="ml-auto whitespace-nowrap font-mono text-[10px] text-muted-foreground">{eq.where}</span>
      </div>

      <div className="mt-2.5 overflow-x-auto overflow-y-hidden py-0.5">
        <BlockMath math={eq.latex} />
      </div>

      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{eq.context}</p>

      {eq.definedInProblem && (
        <button
          type="button"
          onClick={() => onNavigate(eq.definedInProblem!)}
          className="mt-2 inline-flex items-center gap-1 rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-1 text-[10.5px] font-medium text-amber-800 transition-colors hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-900/40"
        >
          etiqueta definida en el Prob. {eq.definedInProblem}
          <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

function ProblemRefCard({ refData, onNavigate, highlight }: { refData: ProblemRef; onNavigate: (problemNumber: string) => void; highlight?: boolean }) {
  const target = BOOK_PROBLEMS.find((p) => p.number === refData.number)
  const external = target ? undefined : getExternalProblemRef(refData.number + (refData.part ?? ''))
  const domId = `ref-prob-${refData.number}${refData.part ? `-${refData.part}` : ''}`
  const ring = highlight ? 'border-teal-400/90 shadow-md shadow-teal-400/20 ring-2 ring-teal-400/70 ring-offset-2 ring-offset-background dark:border-teal-700' : ''

  if (target) {
    return (
      <button
        type="button"
        id={domId}
        onClick={() => onNavigate(refData.number)}
        className={cn('group w-full rounded-lg border border-border bg-card/80 p-3.5 text-left transition-all duration-300 hover:border-teal-400 dark:hover:border-teal-700', ring)}
      >
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-teal-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-teal-800 dark:bg-teal-900/40 dark:text-teal-200">
            Prob. {refData.number}{refData.part ? `(${refData.part})` : ''}
          </span>
          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-teal-600" />
        </div>
        <div className="mt-1.5 text-sm font-medium leading-snug">{target.title}</div>
        <div className="mt-0.5 text-[11px] text-muted-foreground">
          Griffiths 1.ª ed., p. {target.bookPage} · haz clic para abrirlo
        </div>
      </button>
    )
  }

  if (external) {
    return (
      <div id={domId} className={cn('rounded-lg border border-border bg-card/80 p-3.5 transition-all duration-300', ring)}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-teal-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-teal-800 dark:bg-teal-900/40 dark:text-teal-200">
            Prob. {refData.number}{refData.part ? `(${refData.part})` : ''}
          </span>
          <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Capítulo 1 · fuera de esta plataforma
          </span>
        </div>
        {external.latex && (
          <div className="mt-2.5 overflow-x-auto overflow-y-hidden py-0.5">
            <BlockMath math={external.latex} />
          </div>
        )}
        <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{external.context}</p>
      </div>
    )
  }

  return null
}

export function CrossReferencesSection({ problem }: { problem: BookProblem }) {
  const { setView } = useUI()
  const [open, setOpen] = useState(true)
  const [highlightId, setHighlightId] = useState<string | null>(null)
  const timers = useRef<number[]>([])

  // Anclas del enunciado: «Equation 2.6» despacha 'qm:open-ref' → expandir la
  // sección (si estaba plegada), hacer scroll suave a la tarjeta y resaltarla.
  useEffect(() => {
    const onOpenRef = (e: Event) => {
      const target = (e as CustomEvent<string>).detail
      if (!target || typeof target !== 'string') return
      setOpen(true)
      setHighlightId(target)
      timers.current.push(
        window.setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, open ? 60 : 420),
        window.setTimeout(() => setHighlightId(null), 3400),
      )
    }
    window.addEventListener('qm:open-ref', onOpenRef)
    return () => {
      window.removeEventListener('qm:open-ref', onOpenRef)
      timers.current.forEach(t => window.clearTimeout(t))
      timers.current = []
    }
  }, [open])

  // El parseo es barato (regex sobre ~2 KB de texto) y `problem` es estable:
  // sin memoización manual para no pelechar con el React Compiler.
  const refs = findCrossRefs(problem)
  const total = crossRefsCount(refs)

  const onNavigate = (problemNumber: string) => {
    const target = BOOK_PROBLEMS.find((p) => p.number === problemNumber)
    if (target) setView({ name: 'book-problem', problemId: target.id })
  }

  if (total === 0) return null

  const eqs = refs.equations.map((id) => getBookEquation(id)).filter((x): x is BookEquationRef => Boolean(x))
  const missingEqs = refs.equations.filter((id) => !getBookEquation(id))
  const figs = refs.figures.map((id) => getBookFigure(id)).filter(Boolean)
  const fns = refs.footnotes.map((n) => getBookTextFootnote(n)).filter(Boolean)

  const parts: string[] = []
  if (refs.equations.length) parts.push(`${refs.equations.length} ${refs.equations.length === 1 ? 'ecuación' : 'ecuaciones'}`)
  if (refs.problems.length) parts.push(`${refs.problems.length} ${refs.problems.length === 1 ? 'problema' : 'problemas'}`)
  if (refs.figures.length) parts.push(`${refs.figures.length} ${refs.figures.length === 1 ? 'figura' : 'figuras'}`)
  if (refs.footnotes.length) parts.push(`${refs.footnotes.length} ${refs.footnotes.length === 1 ? 'nota' : 'notas'}`)

  return (
    <Card className="border-amber-300/60 bg-gradient-to-b from-amber-50/70 to-transparent dark:border-amber-900/50 dark:from-amber-950/20">
      <CardContent className="space-y-3 p-5 sm:p-6">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3 dark:border-amber-900/50">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
          <Link2 className="h-4 w-4" />
          Referencias cruzadas del libro
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-amber-300/50 px-2.5 py-1 text-[10.5px] font-medium text-amber-700/90 sm:inline-block dark:border-amber-800/60 dark:text-amber-300/90">
            las menciones del enunciado son clicables
          </span>
          <span className="rounded-full bg-amber-100/80 px-2.5 py-1 text-[10.5px] font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            {parts.join(' · ')}
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-amber-100/60 dark:hover:bg-amber-900/30"
            title={open ? 'Ocultar referencias' : 'Mostrar referencias'}
          >
            <ChevronsDownUp className={cn('h-4 w-4 transition-transform', !open && 'rotate-180')} />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="refs-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="space-y-2.5 pt-3.5">
              {eqs.map((eq, i) => (
                <motion.div
                  key={eq.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(i * 0.05, 0.25) }}
                >
                  <EquationCard eq={eq} onNavigate={onNavigate} highlight={highlightId === `ref-eq-${eq.id}`} />
                </motion.div>
              ))}

              {missingEqs.map((id) => (
                <div
                  key={id}
                  id={`ref-eq-${id}`}
                  className={cn(
                    'rounded-lg border border-dashed border-amber-300/60 p-3 text-xs text-muted-foreground transition-all duration-300 dark:border-amber-800/50',
                    highlightId === `ref-eq-${id}` && 'border-amber-400/90 ring-2 ring-amber-400/70 ring-offset-2 ring-offset-background dark:ring-amber-500/60',
                  )}
                >
                  <span className="font-mono font-semibold">Ec. {id}</span> — citada en el enunciado; transcripción pendiente.
                </div>
              ))}

              {refs.problems.map((r) => (
                <ProblemRefCard key={`${r.number}-${r.part ?? ''}`} refData={r} onNavigate={onNavigate} highlight={highlightId === `ref-prob-${r.number}${r.part ? `-${r.part}` : ''}`} />
              ))}

              {figs.map((fig) => (
                <div
                  key={fig!.id}
                  id={`ref-fig-${fig!.id}`}
                  className={cn(
                    'rounded-lg border border-amber-200/80 bg-card/80 p-3.5 transition-all duration-300 dark:border-amber-900/60',
                    highlightId === `ref-fig-${fig!.id}` && 'border-amber-400/90 shadow-md shadow-amber-400/20 ring-2 ring-amber-400/70 ring-offset-2 ring-offset-background dark:ring-amber-500/60',
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                      <ImageIcon className="h-3 w-3" /> Fig. {fig!.id}
                    </span>
                    <span className="text-xs font-semibold leading-tight">{fig!.label}</span>
                    <span className="ml-auto whitespace-nowrap font-mono text-[10px] text-muted-foreground">{fig!.where}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{fig!.description}</p>
                </div>
              ))}

              {fns.map((fn) => (
                <div
                  key={fn!.id}
                  id={`ref-fn-${fn!.id}`}
                  className={cn(
                    'rounded-lg border border-dashed border-amber-300/70 bg-amber-50/40 p-3.5 transition-all duration-300 dark:border-amber-800/50 dark:bg-amber-950/20',
                    highlightId === `ref-fn-${fn!.id}` && 'border-amber-400/90 ring-2 ring-amber-400/70 ring-offset-2 ring-offset-background dark:ring-amber-500/60',
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                      <StickyNote className="h-3 w-3" /> Nota {fn!.id}
                    </span>
                    <span className="text-xs font-semibold leading-tight">{fn!.label}</span>
                    <span className="ml-auto whitespace-nowrap font-mono text-[10px] text-muted-foreground">{fn!.where}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{fn!.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-4 text-muted-foreground">
              <Sigma className="mt-0.5 h-3 w-3 shrink-0" />
              Ecuaciones transcritas del texto de Griffiths (1.ª ed.); los contextos son notas pedagógicas de la plataforma. Si una referencia te lleva a otro problema, se abre en un clic.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      </CardContent>
    </Card>
  )
}
