'use client'

import { useMemo, useState, useEffect } from 'react'
import { useUI } from '@/lib/store'
import { BOOK_PROBLEMS, getBookProblem, type BookProblem } from '@/data/book-problems'
import { SECTIONS } from '@/data/structure'
import { EXERCISES } from '@/data/exercises'
import { useBookProgress } from '@/lib/book-progress'
import { getBookHints, HINT_KIND_META, type ProblemHintsEntry } from '@/data/book-hints'
import type { HintKind } from '@/data/book-hints'
import { recordView } from '@/lib/recently-viewed'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookMarked, ChevronRight, ChevronLeft, Star, Search, Languages,
  BookOpen, Info, ArrowLeft, FileText, Quote, ListFilter,
  CheckCircle2, Circle, Lock, Eye, BookOpenCheck, Zap, ChevronUp, ChevronDown,
  BadgeCheck, Compass, Lightbulb, NotebookPen, PenLine, RotateCcw, Wrench, Scale,
  Download, Target,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Renderer: markdown ligero + LaTeX ($...$ inline, $$...$$ display)
// ─────────────────────────────────────────────────────────────────────────────

function renderInline(text: string, keyPrefix: string) {
  // Split by inline math $...$ while respecting **bold** and *italic*
  const parts: React.ReactNode[] = []
  const regex = /\$([^$]+)\$/g
  let last = 0
  let m: RegExpExecArray | null
  let idx = 0
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(...renderEmphasis(text.slice(last, m.index), `${keyPrefix}-t${idx}`))
    parts.push(<InlineMath key={`${keyPrefix}-m${idx}`} math={m[1]} />)
    last = m.index + m[0].length
    idx++
  }
  if (last < text.length) parts.push(...renderEmphasis(text.slice(last), `${keyPrefix}-t${idx}`))
  return parts
}

function renderEmphasis(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g
  let last = 0
  let m: RegExpExecArray | null
  let idx = 0
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const token = m[0]
    if (token.startsWith('**')) parts.push(<strong key={`${keyPrefix}-b${idx}`}>{token.slice(2, -2)}</strong>)
    else parts.push(<em key={`${keyPrefix}-i${idx}`}>{token.slice(1, -1)}</em>)
    last = m.index + m[0].length
    idx++
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

const PART_RE = /^\(([a-z])\)\s*/

export function BookMarkdown({ text, className }: { text: string; className?: string }) {
  const lines = text.split('\n')
  return (
    <div className={cn('space-y-2.5 text-[15px] leading-7', className)}>
      {lines.map((ln, i) => {
        const s = ln.trim()
        if (s === '') return null
        if (s.startsWith('$$') && s.endsWith('$$') && s.length > 4) {
          return (
            <div key={i} className="my-2 overflow-x-auto py-1 text-center">
              <BlockMath math={s.slice(2, -2)} />
            </div>
          )
        }
        const partMatch = s.match(PART_RE)
        if (partMatch) {
          return (
            <p key={i} className="flex gap-2 pl-1 sm:pl-2">
              <span className="mt-[2px] shrink-0 rounded bg-violet-100 px-1.5 font-mono text-[13px] font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                ({partMatch[1]})
              </span>
              <span className="min-w-0 flex-1">{renderInline(s.slice(partMatch[0].length), `l${i}`)}</span>
            </p>
          )
        }
        return <p key={i}>{renderInline(s, `l${i}`)}</p>
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Estrellas de dificultad (convención de Griffiths)
// ─────────────────────────────────────────────────────────────────────────────

function Stars({ n, label }: { n: number; label?: boolean }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400" title={`Dificultad de Griffiths: ${n} de 3`}>
      {Array.from({ length: n }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
      {n === 0 && <span className="text-[11px] text-muted-foreground">{label ? 'básico' : '·'}</span>}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Lista de problemas del libro
// ─────────────────────────────────────────────────────────────────────────────

export function BookProblemsList() {
  const { setView } = useUI()
  const [filter, setFilter] = useState<string>('all')
  const [query, setQuery] = useState('')
  const { progress, solvedCount, isSolved, clearAll } = useBookProgress()
  const [onlyPending, setOnlyPending] = useState(false)

  const sections = SECTIONS.filter(s => s.chapterId === 'ch2')

  // Estadísticas agregadas de uso (pistas, comparaciones, aciertos)
  const entries = Object.values(progress).filter(Boolean)
  const totalHintsUsed = entries.reduce((s, e) => s + (e.hintsUsed ?? 0), 0)
  const totalAttempts = entries.reduce((s, e) => s + (e.attempts ?? 0), 0)
  const matchCount = entries.filter(e => e.lastOutcome === 'match').length
  const accuracy = totalAttempts > 0 ? Math.round((matchCount / totalAttempts) * 100) : null

  const filtered = useMemo(() => {
    let list = BOOK_PROBLEMS
    if (filter === 'further') list = list.filter(p => p.placement === 'further')
    else if (filter !== 'all') {
      list = list.filter(p => p.sectionId === filter && p.placement === 'in-section')
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(p =>
        p.number.includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.statementEn.toLowerCase().includes(q) ||
        p.statementEs.toLowerCase().includes(q)
      )
    }
    if (onlyPending) list = list.filter(p => !progress[p.id]?.solved)
    return list
  }, [filter, query, onlyPending, progress])

  const countFor = (id: string) =>
    id === 'all' ? BOOK_PROBLEMS.length
    : id === 'further' ? BOOK_PROBLEMS.filter(p => p.placement === 'further').length
    : BOOK_PROBLEMS.filter(p => p.sectionId === id && p.placement === 'in-section').length

  // Exportar el progreso de los 49 problemas como CSV (compatible con Excel: BOM UTF-8)
  const exportCsv = () => {
    const outcomeLabel: Record<string, string> = { match: 'coincidió', partial: 'parcial', no: 'todavía no' }
    const header = ['Problema', 'Título', 'Sección', 'Página del libro', 'Dificultad', 'Resuelto', 'Pistas usadas', 'Pistas totales', 'Comparaciones', 'Última comparación']
    const rows = BOOK_PROBLEMS.map(p => {
      const e = progress[p.id]
      return [
        p.number, p.title, p.sectionId, p.bookPage,
        p.stars > 0 ? '★'.repeat(p.stars) : 'sin estrellas',
        e?.solved ? 'sí' : 'no',
        String(e?.hintsUsed ?? 0),
        String(getBookHints(p.id)?.hints.length ?? 0),
        String(e?.attempts ?? 0),
        e?.lastOutcome ? outcomeLabel[e.lastOutcome] : '',
      ]
    })
    const csv = [header, ...rows]
      .map(r => r.map(c => `"${String(c).replaceAll('"', '""')}"`).join(','))
      .join('\r\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'griffiths-cap2-progreso-problemas.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const chip = (id: string, label: React.ReactNode) => (
    <button
      type="button"
      key={id}
      onClick={() => setFilter(id)}
      className={cn('rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        filter === id ? 'border-violet-400 bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100' : 'border-border text-muted-foreground hover:bg-muted')}
    >
      {label}
    </button>
  )

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <BookMarked className="h-6 w-6 text-violet-600" /> Problemas del libro · Capítulo 2
        </h1>
        <p className="text-muted-foreground">
          Los <strong>49 problemas originales</strong> del Capítulo 2 de Griffiths (1.ª ed.): los 35 en las secciones y los 14 de <em>Further Problems</em>.
          Enunciado transcrito <strong>literalmente</strong> del libro (EN) con traducción al español, más una <strong>escalera de pistas graduadas</strong>
          y la <strong>respuesta final del solucionario</strong> para comparar tu resultado.
        </p>
      </header>

      {/* Source callout */}
      <div className="rounded-lg border border-violet-300/60 bg-violet-50/60 p-4 text-sm leading-6 dark:border-violet-800 dark:bg-violet-950/30">
        <div className="mb-1 flex items-center gap-2 font-semibold text-violet-800 dark:text-violet-200">
          <Quote className="h-4 w-4" /> Fuente primaria
        </div>
        <p className="text-[13.5px] text-muted-foreground">
          David J. Griffiths, <em>Introduction to Quantum Mechanics</em>, 1.ª edición, Prentice Hall (1995), Capítulo 2
          «The Time-Independent Schrödinger Equation», pp. 24–74. Los asteriscos (0–3) son la dificultad
          asignada por el propio Griffiths. Reproducido con permiso del usuario.
        </p>
      </div>

      {/* Progress panel */}
      <div className="space-y-3 rounded-xl border border-border bg-gradient-to-br from-card to-muted/30 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
              <svg viewBox="0 0 44 44" className="absolute inset-0 h-12 w-12 -rotate-90">
                <circle cx="22" cy="22" r="19" fill="none" strokeWidth="4" className="stroke-muted" />
                <circle
                  cx="22" cy="22" r="19" fill="none" strokeWidth="4" strokeLinecap="round"
                  className="stroke-violet-500 transition-all duration-500"
                  strokeDasharray={2 * Math.PI * 19}
                  strokeDashoffset={2 * Math.PI * 19 * (1 - solvedCount / BOOK_PROBLEMS.length)}
                />
              </svg>
              <span className="font-mono text-xs font-bold text-violet-700 dark:text-violet-300">
                {Math.round((solvedCount / BOOK_PROBLEMS.length) * 100)}%
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <BookOpenCheck className="h-4 w-4 text-emerald-600" />
                {solvedCount} / {BOOK_PROBLEMS.length} problemas resueltos
              </div>
              <div className="text-[11px] text-muted-foreground">Marca cada problema cuando lo completes — se guarda en este navegador</div>
            </div>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setOnlyPending(o => !o)}
              className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                onlyPending
                  ? 'border-emerald-400 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100'
                  : 'border-border text-muted-foreground hover:bg-muted')}
            >
              <Zap className="h-3.5 w-3.5" />
              {onlyPending ? 'Mostrando pendientes' : 'Solo pendientes'}
            </button>
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Descargar el progreso de los 49 problemas como archivo CSV (abre en Excel)"
            >
              <Download className="h-3.5 w-3.5" /> CSV
            </button>
            {solvedCount > 0 && (
              <button
                type="button"
                onClick={() => { if (confirm('¿Reiniciar el progreso de los 49 problemas?')) clearAll() }}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Reiniciar
              </button>
            )}
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-2 border-t border-border/60 pt-3">
          <div className="flex items-center gap-2.5 rounded-lg bg-amber-50/60 px-3 py-2 dark:bg-amber-950/20">
            <Lightbulb className="h-4 w-4 shrink-0 text-amber-500" aria-hidden />
            <div className="min-w-0">
              <div className="font-mono text-base font-bold leading-none text-amber-700 dark:text-amber-300">{totalHintsUsed}</div>
              <div className="mt-0.5 truncate text-[10px] uppercase tracking-wide text-muted-foreground">pistas usadas</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-lg bg-emerald-50/60 px-3 py-2 dark:bg-emerald-950/20">
            <Scale className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
            <div className="min-w-0">
              <div className="font-mono text-base font-bold leading-none text-emerald-700 dark:text-emerald-300">{totalAttempts}</div>
              <div className="mt-0.5 truncate text-[10px] uppercase tracking-wide text-muted-foreground">comparaciones</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-lg bg-teal-50/60 px-3 py-2 dark:bg-teal-950/20">
            <Target className="h-4 w-4 shrink-0 text-teal-500" aria-hidden />
            <div className="min-w-0">
              <div className="font-mono text-base font-bold leading-none text-teal-700 dark:text-teal-300">{accuracy !== null ? `${accuracy}%` : '—'}</div>
              <div className="mt-0.5 truncate text-[10px] uppercase tracking-wide text-muted-foreground">aciertos al comparar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search + filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por número, contenido o traducción… (p. ej. 2.6, tunneling, delta)"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {chip('all', <>Todos ({countFor('all')})</>)}
          {sections.map(s => chip(s.id, <><span className="font-mono">{s.id}</span> · {s.title} ({countFor(s.id)})</>))}
          {chip('further', <>Further Problems ({countFor('further')})</>)}
        </div>
      </div>

      {/* List */}
      <div className="grid gap-3">
        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Ningún problema coincide con la búsqueda.
          </div>
        )}
        {filtered.map(p => (
          <BookProblemRow
            key={p.id}
            p={p}
            solved={!!progress[p.id]?.solved}
            hintsUsed={progress[p.id]?.hintsUsed ?? 0}
            onOpen={() => setView({ name: 'book-problem', problemId: p.id })}
          />
        ))}
      </div>
    </div>
  )
}

function BookProblemRow({ p, onOpen, solved, hintsUsed }: { p: BookProblem; onOpen: () => void; solved: boolean; hintsUsed: number }) {
  const firstLine = p.statementEn.split('\n').find(l => l.trim() !== '') ?? ''
  const totalHints = getBookHints(p.id)?.hints.length ?? 0
  return (
    <Card className={cn('cursor-pointer transition-colors hover:border-violet-400', solved && 'border-emerald-300/70 bg-emerald-50/30 dark:border-emerald-800/70 dark:bg-emerald-950/20')}>
      <button type="button" className="w-full text-left" onClick={onOpen}>
        <CardContent className="flex items-start gap-3 p-4">
          <div className="flex h-9 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-violet-100 dark:bg-violet-950/60">
            <span className="font-mono text-[13px] font-bold leading-none text-violet-700 dark:text-violet-300">{p.number}</span>
            <span className="mt-0.5 text-[9px] uppercase tracking-wide text-violet-500 dark:text-violet-400">p. {p.bookPage}</span>
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {p.placement === 'further' && (
                <Badge variant="outline" className="border-violet-300 text-[10px] text-violet-700 dark:text-violet-300">Further Problem</Badge>
              )}
              <span>Sección <span className="font-mono">{p.sectionId}</span></span>
              <span>·</span>
              <Stars n={p.stars} />
              {solved && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                  <CheckCircle2 className="h-3 w-3" /> resuelto
                </span>
              )}
              {hintsUsed > 0 && totalHints > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-900/60 dark:text-amber-300" title="Pistas graduadas usadas en este problema">
                  <Lightbulb className="h-3 w-3" /> {hintsUsed}/{totalHints} pistas
                </span>
              )}
            </div>
            <div className="font-semibold leading-snug">{p.title}</div>
            <div className="line-clamp-2 text-xs leading-5 text-muted-foreground">
              {firstLine.replace(/\$[^$]*\$/g, ' […] ')}
            </div>
          </div>
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
        </CardContent>
      </button>
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Detalle de un problema del libro
// ─────────────────────────────────────────────────────────────────────────────

export function BookProblemDetail({ problemId }: { problemId: string }) {
  const { setView } = useUI()
  const p = getBookProblem(problemId)
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const { isSolved, toggleSolved } = useBookProgress()
  const solved = p ? isSolved(p.id) : false

  // Registrar la visita para «Visto recientemente» (panel de inicio)
  useEffect(() => {
    if (p) recordView({ type: 'book-problem', id: p.id, title: `${p.number} · ${p.title}`, sectionId: p.sectionId })
  }, [problemId])

  if (!p) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
        <div className="text-lg font-semibold">Problema no encontrado</div>
      </div>
    )
  }

  const idx = BOOK_PROBLEMS.findIndex(x => x.id === p.id)
  const prev = idx > 0 ? BOOK_PROBLEMS[idx - 1] : null
  const next = idx < BOOK_PROBLEMS.length - 1 ? BOOK_PROBLEMS[idx + 1] : null

  // ejercicios originales de la plataforma sobre la misma sección
  const relatedOriginals = EXERCISES.filter(e => e.sectionId === p.sectionId).slice(0, 4)

  // pistas graduadas + respuesta final de este problema
  const hintsEntry = getBookHints(p.id)

  const toggleLang = (
    <div className="inline-flex overflow-hidden rounded-full border border-border text-xs font-medium">
      <button
        type="button"
        onClick={() => setLang('en')}
        className={cn('flex items-center gap-1.5 px-3 py-1.5 transition-colors', lang === 'en' ? 'bg-violet-600 text-white' : 'text-muted-foreground hover:bg-muted')}
      >
        <Languages className="h-3.5 w-3.5" /> EN <span className="hidden sm:inline">· literal</span>
      </button>
      <button
        type="button"
        onClick={() => setLang('es')}
        className={cn('flex items-center gap-1.5 px-3 py-1.5 transition-colors', lang === 'es' ? 'bg-violet-600 text-white' : 'text-muted-foreground hover:bg-muted')}
      >
        <Languages className="h-3.5 w-3.5" /> ES <span className="hidden sm:inline">· traducción</span>
      </button>
    </div>
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => setView({ name: 'book-problems' })}
            className="mt-1 rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:bg-muted"
            title="Volver a la lista"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono text-base font-bold text-violet-700 dark:text-violet-300">Problema {p.number}</span>
              <span>·</span>
              <span>Griffiths 1.ª ed., p. {p.bookPage}</span>
              <span>·</span>
              <Stars n={p.stars} label />
            </div>
            <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">{p.title}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-[10px]">Sección {p.sectionId}</Badge>
              {p.placement === 'further' && (
                <Badge variant="outline" className="border-violet-300 text-[10px] text-violet-700 dark:text-violet-300">Further Problem</Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {toggleLang}
          {p && (
            <button
              type="button"
              onClick={() => toggleSolved(p.id)}
              className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                solved
                  ? 'border-emerald-400 bg-emerald-100 text-emerald-800 shadow-sm dark:bg-emerald-900 dark:text-emerald-100'
                  : 'border-border text-muted-foreground hover:border-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-300')}
            >
              {solved ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              {solved ? '¡Resuelto!' : 'Marcar como resuelto'}
            </button>
          )}
        </div>
      </div>

      {/* Statement */}
      <Card className="border-violet-200/70 dark:border-violet-900">
        <CardContent className="space-y-4 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
              <FileText className="h-4 w-4" />
              {lang === 'en' ? 'Enunciado (transcripción literal del libro)' : 'Enunciado (traducción al español)'}
            </div>
            <span className="text-[10px] text-muted-foreground">
              {lang === 'en' ? 'verbatim · English' : 'fiel al original · español'}
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <BookMarkdown text={lang === 'en' ? p.statementEn : p.statementEs} />
            </motion.div>
          </AnimatePresence>

          {p.footnotes.length > 0 && lang === 'en' && (
            <div className="mt-2 space-y-1.5 border-t border-border/60 pt-3">
              {p.footnotes.map((fn, i) => (
                <p key={i} className="text-xs leading-5 text-muted-foreground">
                  <sup className="mr-1 font-semibold">{i + 1}</sup>{fn}
                </p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Graduated hints ladder + final answer comparison */}
      {p && hintsEntry && hintsEntry.hints.length > 0 && (
        <HintsSection problem={p} entry={hintsEntry} />
      )}

      {/* Solution (official manual, 2nd edition) */}
      {p && <SolutionSection problem={p} />}

      {/* Info callout */}
      <div className="flex items-start gap-2.5 rounded-lg border border-sky-300/60 bg-sky-50/60 p-4 text-[13.5px] leading-6 text-muted-foreground dark:border-sky-800 dark:bg-sky-950/30">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
        <div>
          La versión <strong>EN</strong> es la transcripción literal del texto impreso de Griffiths (incluye
          pistas, notas y respuestas parciales tal como aparecen en el libro). La versión <strong>ES</strong> es una
          traducción fiel para estudiar; ante cualquier discrepancia, la referencia es siempre el texto original.
          Las <strong>pistas graduadas</strong> (reconocer → plantear → técnica → verificar) son pedagógicas de esta plataforma:
          pídelas solo cuando te atasques. Las <strong>respuestas finales</strong> provienen del <strong>solucionario
          oficial de Griffiths</strong> (2.ª ed.), correlacionadas con la 1.ª ed. mediante la cuadrícula oficial del propio manual.
        </div>
      </div>

      {/* Related original exercises */}
      {relatedOriginals.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <BookOpen className="h-4 w-4 text-teal-600" />
            Entrenamiento guiado relacionado (sección {p.sectionId})
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {relatedOriginals.map(e => (
              <button
                key={e.id}
                type="button"
                onClick={() => setView({ name: 'exercise', exerciseId: e.id })}
                className="rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-teal-400"
              >
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <ListFilter className="h-3 w-3" /> ejercicio guiado de la plataforma
                </div>
                <div className="mt-1 text-sm font-medium leading-snug">{e.title}</div>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Los ejercicios de la plataforma (pistas progresivas, botón «¿Por qué?», análisis de errores) siguen
            disponibles por sección; los problemas del libro son el banco oficial para el examen.
          </p>
        </div>
      )}

      {/* Prev / next */}
      <div className="flex items-stretch justify-between gap-3 pt-1">
        {prev ? (
          <button
            type="button"
            onClick={() => setView({ name: 'book-problem', problemId: prev.id })}
            className="group flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
            <div className="min-w-0">
              <div className="font-mono text-[11px] text-muted-foreground">Anterior · {prev.number}</div>
              <div className="truncate text-sm font-medium">{prev.title}</div>
            </div>
          </button>
        ) : <div className="flex-1" />}
        {next ? (
          <button
            type="button"
            onClick={() => setView({ name: 'book-problem', problemId: next.id })}
            className="group flex min-w-0 flex-1 items-center justify-end gap-2 rounded-lg border border-border p-3 text-right transition-colors hover:bg-muted"
          >
            <div className="min-w-0">
              <div className="font-mono text-[11px] text-muted-foreground">Siguiente · {next.number}</div>
              <div className="truncate text-sm font-medium">{next.title}</div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
          </button>
        ) : <div className="flex-1" />}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sección de PISTAS GRADUADAS + comparación con la respuesta final
// Filosofía: la escalera sube de lo físico a lo algebraico — reconocer →
// plantear → técnica → verificar — y cada peldaño se pide explícitamente.
// ─────────────────────────────────────────────────────────────────────────────

const HINT_STYLES: Record<HintKind, {
  icon: typeof Compass
  border: string
  chip: string
  iconColor: string
  short: string
}> = {
  reconocimiento: {
    icon: Compass,
    border: 'border-l-amber-400',
    chip: 'bg-amber-100 dark:bg-amber-900/50',
    iconColor: 'text-amber-600 dark:text-amber-300',
    short: 'Reconocer',
  },
  planteamiento: {
    icon: PenLine,
    border: 'border-l-violet-400',
    chip: 'bg-violet-100 dark:bg-violet-900/50',
    iconColor: 'text-violet-600 dark:text-violet-300',
    short: 'Plantear',
  },
  tecnica: {
    icon: Wrench,
    border: 'border-l-rose-400',
    chip: 'bg-rose-100 dark:bg-rose-900/50',
    iconColor: 'text-rose-600 dark:text-rose-300',
    short: 'Técnica',
  },
  verificacion: {
    icon: BadgeCheck,
    border: 'border-l-emerald-400',
    chip: 'bg-emerald-100 dark:bg-emerald-900/50',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    short: 'Verificar',
  },
}

function HintsSection({ problem, entry }: { problem: BookProblem; entry: ProblemHintsEntry }) {
  const { progress, setHintsUsed } = useBookProgress()
  const revealed = progress[problem.id]?.hintsUsed ?? 0
  const total = entry.hints.length
  const allRevealed = revealed >= total

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-amber-300/60 bg-gradient-to-b from-amber-50/30 to-transparent dark:border-amber-800/70 dark:from-amber-950/20">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 px-4 py-3 dark:border-amber-800/60">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-200">
            <Lightbulb className="h-4 w-4" />
            Pistas graduadas
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="font-mono" aria-live="polite">{revealed}/{total}</span>
            {revealed > 0 && (
              <button
                type="button"
                onClick={() => setHintsUsed(problem.id, 0)}
                className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 transition-colors hover:bg-muted"
                title="Ocultar todas las pistas y empezar de nuevo"
              >
                <RotateCcw className="h-3 w-3" /> reiniciar
              </button>
            )}
          </div>
        </div>

        {/* Filosofía */}
        <p className="px-4 py-2.5 text-[12.5px] leading-5 text-muted-foreground">
          La escalera sube de lo físico a lo algebraico: <strong>reconoce</strong> qué problema es →
          <strong> plántalo</strong> → aplica la <strong>técnica</strong> → <strong>verifica</strong>.
          Inténtalo de verdad entre pista y pista; pídela solo cuando ya te hayas atascado.
        </p>

        {/* Peldaños */}
        <div className="space-y-2 px-4 pb-4">
          {entry.hints.map((h, i) => {
            const meta = HINT_STYLES[h.kind]
            const Icon = meta.icon
            if (i < revealed) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn('rounded-lg border border-l-[3px] bg-card p-3', meta.border)}
                >
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <span className={cn('flex h-5 w-5 items-center justify-center rounded-full', meta.chip)}>
                      <Icon className={cn('h-3 w-3', meta.iconColor)} aria-hidden />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      Pista {i + 1} · {meta.short}
                    </span>
                  </div>
                  <BookMarkdown text={h.text} />
                </motion.div>
              )
            }
            if (i === revealed) {
              // El siguiente peldaño: botón de revelado explícito
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setHintsUsed(problem.id, i + 1)}
                  className="group flex w-full items-center gap-3 rounded-lg border border-dashed border-amber-400/70 bg-amber-50/30 p-3 text-left transition-colors hover:border-amber-500 hover:bg-amber-50/70 dark:border-amber-800/60 dark:bg-amber-950/20 dark:hover:bg-amber-950/40"
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
                      {HINT_KIND_META[h.kind].description}
                    </span>
                  </span>
                  <Lightbulb className="h-4 w-4 shrink-0 text-amber-500 transition-transform group-hover:scale-110" aria-hidden />
                </button>
              )
            }
            // Peldaños futuros: bloqueados
            return (
              <div
                key={i}
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
              Con toda la escalera a la vista, completa el cálculo y <strong>compara tu resultado</strong> con la respuesta final.
            </div>
          )}
        </div>
      </div>

      {/* Comparación con la respuesta final */}
      {entry.finalAnswer && <CompareFinalAnswer problem={problem} entry={entry} />}
    </div>
  )
}

function CompareFinalAnswer({ problem, entry }: { problem: BookProblem; entry: ProblemHintsEntry }) {
  const { progress, recordAttempt } = useBookProgress()
  const stored = progress[problem.id]
  const [revealed, setRevealed] = useState(false)
  const [myAnswer, setMyAnswer] = useState('')
  const fa = entry.finalAnswer!
  const outcome = stored?.lastOutcome

  const outcomeLabel: Record<'match' | 'partial' | 'no', string> = {
    match: 'coincidió',
    partial: 'parcial',
    no: 'todavía no',
  }

  return (
    <div className="overflow-hidden rounded-xl border border-emerald-400/60 dark:border-emerald-800/70">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/60 bg-emerald-50/40 px-4 py-3 dark:border-emerald-800/60 dark:bg-emerald-950/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
          <Scale className="h-4 w-4" aria-hidden />
          Comparar con la respuesta final
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Badge variant="outline" className="border-emerald-300 text-[10px] text-emerald-700 dark:border-emerald-700 dark:text-emerald-300">
            solucionario oficial · 2.ª ed.
          </Badge>
          <span className="font-mono">p. {fa.page}</span>
        </div>
      </div>

      {!revealed ? (
        <div className="space-y-3 px-4 py-5">
          <p className="text-[13px] leading-6 text-muted-foreground">
            ¿Terminaste tu intento? Apunta tu resultado y compáralo con la respuesta final del
            solucionario. Escribirlo antes de mirar entrena la honestidad del autochequeo.
          </p>
          <div className="space-y-1.5">
            <label htmlFor="my-answer" className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <NotebookPen className="h-3.5 w-3.5" aria-hidden /> Tu resultado (opcional, no se guarda)
            </label>
            <textarea
              id="my-answer"
              value={myAnswer}
              onChange={e => setMyAnswer(e.target.value)}
              rows={3}
              placeholder="p. ej.  ⟨x⟩ = (a/2)[1 − (32/9π²) cos 3ωt],  ⟨p⟩ = (8ħ/3a) sin 3ωt …"
              className="w-full resize-y rounded-lg border border-border bg-background p-3 font-mono text-[13px] leading-6 outline-none transition-colors focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300/50"
            />
          </div>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500 bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98]"
          >
            <Eye className="h-4 w-4" aria-hidden />
            Mostrar la respuesta final
          </button>
        </div>
      ) : (
        <div className="space-y-4 px-4 py-4">
          {myAnswer.trim() !== '' && (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-3">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Tu resultado</div>
              <p className="whitespace-pre-wrap font-mono text-[13px] leading-6">{myAnswer}</p>
            </div>
          )}

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/30 p-4 dark:border-emerald-800/60 dark:bg-emerald-950/20">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              Respuesta final · Griffiths (solucionario oficial)
            </div>
            <BookMarkdown text={fa.answer} />
            {fa.note && (
              <div className="mt-2 space-y-1.5 border-t border-emerald-200/60 pt-2 text-xs leading-5 text-muted-foreground dark:border-emerald-800/50">
                <span className="font-semibold">Nota:</span>
                <BookMarkdown text={fa.note} className="text-xs leading-5" />
              </div>
            )}
          </div>

          {/* Autoevaluación */}
          <div className="space-y-2">
            <div className="text-[13px] font-semibold">¿Coincidió tu resultado?</div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => recordAttempt(problem.id, 'match')}
                className={cn('inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-[0.98]',
                  outcome === 'match'
                    ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm'
                    : 'border-emerald-400 text-emerald-700 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-900/40')}
              >
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Coincide
              </button>
              <button
                type="button"
                onClick={() => recordAttempt(problem.id, 'partial')}
                className={cn('inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-[0.98]',
                  outcome === 'partial'
                    ? 'border-amber-500 bg-amber-500 text-white shadow-sm'
                    : 'border-amber-400 text-amber-700 hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900/40')}
              >
                <Zap className="h-3.5 w-3.5" aria-hidden /> Casi — parcial
              </button>
              <button
                type="button"
                onClick={() => recordAttempt(problem.id, 'no')}
                className={cn('inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-[0.98]',
                  outcome === 'no'
                    ? 'border-rose-500 bg-rose-500 text-white shadow-sm'
                    : 'border-rose-400 text-rose-700 hover:bg-rose-100 dark:text-rose-300 dark:hover:bg-rose-900/40')}
              >
                <Circle className="h-3.5 w-3.5" aria-hidden /> Todavía no
              </button>
            </div>
            {(stored?.attempts ?? 0) > 0 && outcome && (
              <p className="text-xs text-muted-foreground">
                {stored!.attempts} intento{stored!.attempts === 1 ? '' : 's'} registrado{stored!.attempts === 1 ? '' : 's'} · último: {outcomeLabel[outcome]}
                {outcome === 'match' && ' — problema marcado como resuelto ✓'}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setRevealed(false)}
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground underline-offset-2 hover:underline"
            >
              <ChevronUp className="h-3 w-3" aria-hidden /> Ocultar la respuesta
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sección de solución (solucionario oficial de Griffiths, 2.ª edición)
// Revelado progresivo: primero una puerta de confirmación, luego las páginas.
// ─────────────────────────────────────────────────────────────────────────────

function SolutionSection({ problem }: { problem: BookProblem }) {
  const [revealed, setRevealed] = useState(false)
  const [pageIdx, setPageIdx] = useState(0)
  const pages = problem.solutionPages ?? []
  const hasSolution = pages.length > 0

  // Navegación libre dentro del capítulo 2 del solucionario (pp. 14–61)
  const clamp = (n: number) => Math.min(61, Math.max(14, n))
  const currentPage = clamp(pages.length ? pages[Math.min(pageIdx, pages.length - 1)] : 14)
  const [freePage, setFreePage] = useState(currentPage)
  const shownPage = hasSolution && pageIdx < pages.length ? clamp(pages[pageIdx]) : clamp(freePage)

  useEffect(() => {
    setFreePage(shownPage)
  }, [shownPage])

  if (!hasSolution) {
    return (
      <div className="rounded-xl border border-dashed border-amber-300/70 bg-amber-50/40 p-4 dark:border-amber-800/70 dark:bg-amber-950/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-200">
          <Lock className="h-4 w-4" /> Sin solución en el solucionario
        </div>
        <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">
          {problem.solutionUnavailableReason || 'Este problema no está cubierto por el solucionario oficial.'}
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-teal-300/60 bg-gradient-to-b from-teal-50/40 to-transparent dark:border-teal-800/70 dark:from-teal-950/20">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-200/60 px-4 py-3 dark:border-teal-800/60">
        <div className="flex items-center gap-2 text-sm font-semibold text-teal-800 dark:text-teal-200">
          <BookOpenCheck className="h-4 w-4" />
          Solución del solucionario oficial
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Badge variant="outline" className="border-teal-300 text-[10px] text-teal-700 dark:text-teal-300">
            2.ª ed. · Prob. {problem.solution2e}
          </Badge>
          {problem.solutionModified && (
            <Badge variant="outline" className="border-amber-300 text-[10px] text-amber-700 dark:text-amber-300" title="La 2.ª edición reformuló este problema">
              reformulado
            </Badge>
          )}
          <span className="font-mono">pp. {pages[0]}–{pages[pages.length - 1]}</span>
        </div>
      </div>

      {/* Edition note */}
      {problem.solutionNote && (
        <div className="border-b border-teal-200/40 px-4 py-2.5 text-[12.5px] leading-5 text-amber-800 dark:border-teal-800/40 dark:text-amber-200/90">
          <span className="font-semibold">Nota de edición:</span> {problem.solutionNote}
        </div>
      )}

      {!revealed ? (
        /* Reveal gate */
        <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-teal-300 bg-teal-100/60 dark:border-teal-700 dark:bg-teal-900/40">
            <Lock className="h-5 w-5 text-teal-600 dark:text-teal-300" />
          </div>
          <p className="max-w-md text-[13.5px] leading-6 text-muted-foreground">
            Antes de abrir la solución, <strong>intenta el problema de verdad</strong>: identifica el régimen
            (ligado/dispersión), escribe ψ en cada región, impón las condiciones de frontera. El botón estará
            ahí cuando vuelvas.
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="inline-flex items-center gap-2 rounded-full border border-teal-400 bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-teal-700 active:scale-[0.98]"
          >
            <Eye className="h-4 w-4" />
            Ya lo intenté — mostrar la solución
          </button>
        </div>
      ) : (
        <div className="space-y-3 p-4">
          <AnimatePresence initial={false}>
            <motion.div
              key={shownPage}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={`/solutions/p${String(shownPage).padStart(3, '0')}.jpg`}
                alt={`Página ${shownPage} del solucionario oficial (solución del problema ${problem.number} = problema ${problem.solution2e} de la 2.ª ed.)`}
                className="mx-auto w-full max-w-2xl rounded-lg border border-border bg-white shadow-sm"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>

          {/* Page navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => { setPageIdx(i => Math.max(0, i - 1)); setFreePage(p => clamp(p - 1)); }}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
              disabled={shownPage <= 14}
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Anterior
            </button>
            <div className="flex items-center gap-1.5 rounded-md bg-muted/70 px-3 py-1.5 font-mono text-xs">
              <span className="font-semibold text-teal-700 dark:text-teal-300">p. {shownPage}</span>
              <span className="text-muted-foreground">/ 61</span>
            </div>
            <button
              type="button"
              onClick={() => { setPageIdx(i => Math.min(pages.length - 1, i + 1)); setFreePage(p => clamp(p + 1)); }}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
              disabled={shownPage >= 61}
            >
              Siguiente <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="text-center text-[11.5px] leading-5 text-muted-foreground">
            Imagen fiel del <strong>solucionario oficial de Griffiths</strong> (2.ª ed., Pearson).
            La solución de este problema comienza en la p. {pages[0]}
            {pages.length > 1 ? ` y puede continuar en la(s) siguiente(s); las páginas compartidas muestran también problemas adyacentes (busca el encabezado «Problem ${problem.solution2e}»).` : '.'}
          </p>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => { setRevealed(false); setPageIdx(0) }}
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground underline-offset-2 hover:underline"
            >
              <ChevronUp className="h-3 w-3" /> Ocultar la solución
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
