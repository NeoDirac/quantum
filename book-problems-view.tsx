'use client'

import { useMemo, useState } from 'react'
import { useUI } from '@/lib/store'
import { BOOK_PROBLEMS, getBookProblem, type BookProblem } from '@/data/book-problems'
import { SECTIONS } from '@/data/structure'
import { EXERCISES } from '@/data/exercises'
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

  const sections = SECTIONS.filter(s => s.chapterId === 'ch2')

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
    return list
  }, [filter, query])

  const countFor = (id: string) =>
    id === 'all' ? BOOK_PROBLEMS.length
    : id === 'further' ? BOOK_PROBLEMS.filter(p => p.placement === 'further').length
    : BOOK_PROBLEMS.filter(p => p.sectionId === id && p.placement === 'in-section').length

  const chip = (id: string, label: React.ReactNode) => (
    <button
      type="button"
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
          Enunciado transcrito <strong>literalmente</strong> del libro (EN) con traducción al español.
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
          <BookProblemRow key={p.id} p={p} onOpen={() => setView({ name: 'book-problem', problemId: p.id })} />
        ))}
      </div>
    </div>
  )
}

function BookProblemRow({ p, onOpen }: { p: BookProblem; onOpen: () => void }) {
  const firstLine = p.statementEn.split('\n').find(l => l.trim() !== '') ?? ''
  return (
    <Card className="cursor-pointer transition-colors hover:border-violet-400">
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
        {toggleLang}
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

      {/* Info callout */}
      <div className="flex items-start gap-2.5 rounded-lg border border-sky-300/60 bg-sky-50/60 p-4 text-[13.5px] leading-6 text-muted-foreground dark:border-sky-800 dark:bg-sky-950/30">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
        <div>
          La versión <strong>EN</strong> es la transcripción literal del texto impreso de Griffiths (incluye
          pistas, notas y respuestas parciales tal como aparecen en el libro). La versión <strong>ES</strong> es una
          traducción fiel para estudiar; ante cualquier discrepancia, la referencia es siempre el texto original.
          El solucionario que subiste (soluciones de terceros) cubre estos problemas; consúltalo después de intentarlo.
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
