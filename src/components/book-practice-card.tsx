'use client'

// ════════════════════════════════════════════════════════════════════════════
// TARJETA DE PRÁCTICA DE PROBLEMA DEL LIBRO
// ════════════════════════════════════════════════════════════════════════════
// Componente reutilizable por el Modo examen y el Entrenamiento:
// enuncia el problema (ES/EN), deja pensar, revela la respuesta final del
// solucionario y pide una autoevaluación honesta (coincide / parcial / todavía
// no) que se registra en el progreso del problema (book-progress).
// SIN pistas: la escalera de pistas vive solo en la vista de detalle.

import { useState } from 'react'
import { BOOK_PROBLEMS, type BookProblem } from '@/data/book-problems'
import { getBookHints } from '@/data/book-hints'
import { useBookProgress } from '@/lib/book-progress'
import { BookMarkdown } from '@/components/book-problems-view'
import { Card, CardContent } from '@/components/ui/card'
import {
  BookOpen, Languages, Star, Eye, CheckCircle2, Zap, Circle,
  NotebookPen, Info, ArrowRight, Scale,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type CompareOutcome = 'match' | 'partial' | 'no'

function StarsRow({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" title={`Dificultad ${n}/3`}>
      {[1, 2, 3].map(i => (
        <Star
          key={i}
          className={cn('h-3 w-3', i <= n ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40')}
          aria-hidden
        />
      ))}
    </span>
  )
}

interface BookPracticeCardProps {
  problemId: string
  /** Se llama al confirmar la comparación (o al continuar si no hay respuesta final). */
  onDone: (outcome: CompareOutcome | null) => void
  /** Etiqueta del botón que avanza (p. ej. "Siguiente pregunta"). */
  doneLabel?: string
  /** Muestra el cuaderno de borrador antes de revelar (por defecto sí). */
  showScratchpad?: boolean
  /** Compacta el padding (para entrenamiento). */
  compact?: boolean
}

export function BookPracticeCard({ problemId, onDone, doneLabel = 'Siguiente', showScratchpad = true, compact = false }: BookPracticeCardProps) {
  const p = BOOK_PROBLEMS.find(x => x.id === problemId)
  const entry = getBookHints(problemId)
  const { recordAttempt, progress } = useBookProgress()
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const [revealed, setRevealed] = useState(false)
  const [myAnswer, setMyAnswer] = useState('')
  const [outcome, setOutcome] = useState<CompareOutcome | null>(null)

  if (!p) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">Problema no encontrado.</CardContent>
      </Card>
    )
  }

  const fa = entry?.finalAnswer
  const stored = progress[p.id]

  const choose = (o: CompareOutcome) => {
    setOutcome(o)
    recordAttempt(p.id, o)
  }

  return (
    <Card className="overflow-hidden border-border/70">
      {/* Cabecera del problema */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 bg-gradient-to-r from-violet-50/50 to-transparent px-4 py-3 dark:from-violet-950/20">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-violet-100 px-2 py-0.5 font-mono text-xs font-bold text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
            {p.number}
          </span>
          <span className="text-sm font-semibold">{p.title}</span>
          <StarsRow n={p.stars} />
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="font-mono">§ {p.sectionId}</span>
          <span aria-hidden>·</span>
          <span>p. {p.bookPage}</span>
          <button
            type="button"
            onClick={() => setLang(l => (l === 'es' ? 'en' : 'es'))}
            className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 font-medium transition-colors hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-300"
            title={lang === 'es' ? 'Ver el enunciado original en inglés' : 'Volver al español'}
          >
            <Languages className="h-3 w-3" />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </div>

      <CardContent className={cn('space-y-4', compact ? 'p-4' : 'p-5')}>
        {/* Enunciado */}
        <div className="text-[15px] leading-7">
          <BookMarkdown text={lang === 'es' ? p.statementEs : p.statementEn} />
        </div>

        {p.footnotes.length > 0 && lang === 'en' && (
          <div className="space-y-1 rounded-lg border border-dashed border-border bg-muted/20 p-3 text-xs leading-5 text-muted-foreground">
            {p.footnotes.map((f, i) => (
              <p key={i}><span className="font-semibold">Nota al pie {i + 1}:</span> <BookMarkdown text={f} className="inline" /></p>
            ))}
          </div>
        )}

        {!revealed ? (
          <div className="space-y-3 rounded-xl border border-amber-200/60 bg-amber-50/40 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
            <p className="text-[13px] leading-6 text-muted-foreground">
              Inténtalo <span className="font-semibold text-foreground">sin pistas ni respuestas</span>, en papel.
              Cuando tengas tu resultado, revélalo y compáralo con el solucionario.
            </p>
            {showScratchpad && (
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <NotebookPen className="h-3.5 w-3.5" aria-hidden /> Tu resultado (opcional, no se guarda)
                </label>
                <textarea
                  value={myAnswer}
                  onChange={e => setMyAnswer(e.target.value)}
                  rows={2}
                  placeholder="Apunta aquí lo que obtuviste antes de mirar…"
                  className="w-full resize-y rounded-lg border border-border bg-background p-2.5 font-mono text-[13px] leading-6 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-300/50"
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="inline-flex items-center gap-2 rounded-full border border-amber-500 bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-amber-600 active:scale-[0.98]"
              >
                <Eye className="h-4 w-4" aria-hidden /> Comparar con la respuesta final
              </button>
              <button
                type="button"
                onClick={() => onDone(null)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                Saltar este problema <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>
        ) : fa ? (
          <div className="space-y-4">
            {myAnswer.trim() !== '' && (
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-3">
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Tu resultado</div>
                <p className="whitespace-pre-wrap font-mono text-[13px] leading-6">{myAnswer}</p>
              </div>
            )}

            <div className="rounded-xl border border-emerald-400/60 dark:border-emerald-800/70">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/60 bg-emerald-50/40 px-4 py-2.5 dark:border-emerald-800/60 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-emerald-800 dark:text-emerald-200">
                  <Scale className="h-4 w-4" aria-hidden /> Respuesta final · solucionario oficial (2.ª ed.)
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">p. {fa.page}</span>
              </div>
              <div className="p-4">
                <BookMarkdown text={fa.answer} />
                {fa.note && (
                  <div className="mt-2 space-y-1 border-t border-emerald-200/60 pt-2 text-xs leading-5 text-muted-foreground dark:border-emerald-800/50">
                    <span className="font-semibold">Nota:</span>
                    <BookMarkdown text={fa.note} className="text-xs leading-5" />
                  </div>
                )}
              </div>
            </div>

            {/* Autoevaluación */}
            <div className="space-y-2.5 rounded-xl border border-border bg-muted/30 p-4">
              <div className="text-[13px] font-semibold">¿Coincidió tu resultado?</div>
              <div className="flex flex-wrap gap-2">
                {([
                  { o: 'match' as const, label: 'Coincide', Icon: CheckCircle2, active: 'border-emerald-500 bg-emerald-600 text-white shadow-sm', idle: 'border-emerald-400 text-emerald-700 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-900/40' },
                  { o: 'partial' as const, label: 'Casi — parcial', Icon: Zap, active: 'border-amber-500 bg-amber-500 text-white shadow-sm', idle: 'border-amber-400 text-amber-700 hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900/40' },
                  { o: 'no' as const, label: 'Todavía no', Icon: Circle, active: 'border-rose-500 bg-rose-500 text-white shadow-sm', idle: 'border-rose-400 text-rose-700 hover:bg-rose-100 dark:text-rose-300 dark:hover:bg-rose-900/40' },
                ]).map(({ o, label, Icon, active, idle }) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => choose(o)}
                    className={cn('inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-[0.98]',
                      outcome === o ? active : idle)}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden /> {label}
                  </button>
                ))}
              </div>
              {stored?.attempts != null && stored.attempts > 1 && outcome && (
                <p className="text-xs text-muted-foreground">{stored.attempts} intentos registrados en total para este problema.</p>
              )}
              <button
                type="button"
                disabled={outcome === null}
                onClick={() => onDone(outcome)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition-all active:scale-[0.98]',
                  outcome
                    ? 'border border-violet-500 bg-violet-600 text-white shadow-sm hover:bg-violet-700'
                    : 'cursor-not-allowed border border-border bg-muted text-muted-foreground opacity-60',
                )}
              >
                {doneLabel} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
              {outcome === null && (
                <p className="text-[11px] text-muted-foreground">Elige una opción para continuar.</p>
              )}
            </div>
          </div>
        ) : (
          /* Problema sin respuesta final en el solucionario */
          <div className="space-y-3 rounded-xl border border-sky-200/60 bg-sky-50/40 p-4 dark:border-sky-900/50 dark:bg-sky-950/20">
            <div className="flex items-start gap-2 text-[13px] leading-6">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" aria-hidden />
              <div className="text-muted-foreground">
                {p.solutionUnavailableReason || 'Este problema no tiene respuesta final en el solucionario oficial.'}
                <span className="block pt-1 text-foreground">
                  Resuélvelo con el método que has practicado y contrástalo con la sección correspondiente del libro.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onDone(null)}
              className="inline-flex items-center gap-2 rounded-full border border-sky-500 bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-[0.98]"
            >
              <BookOpen className="h-4 w-4" aria-hidden /> {doneLabel}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
