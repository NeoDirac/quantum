'use client'

import { useState } from 'react'
import type { Exercise } from '@/lib/content-types'
import { RenderBlocks } from '@/components/render-blocks'
import { WhyBox } from '@/components/why-box'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Lightbulb, Eye, ListChecks, AlertTriangle, CheckCircle2, XCircle,
  HelpCircle, Sparkles, GitBranch, ChevronRight, RotateCcw
} from 'lucide-react'
import { apiPost, getOrCreateStudentId } from '@/lib/student'
import { useToast } from '@/hooks/use-toast'
import { BookmarkButton } from '@/components/bookmark-button'
import { ERROR_TYPE_LABELS } from '@/lib/content-types'
import type { ErrorType } from '@/lib/content-types'

const DIFF_LABEL = ['Sin estrellas', '★ Esencial', '★★ Más difícil', '★★★ Retador']
const TYPE_LABEL: Record<string, string> = {
  conceptual: 'Conceptual',
  computation: 'Cálculo',
  'identify-potential': 'Identificar potencial',
  'boundary-condition': 'Condición de frontera',
  'graph-interpretation': 'Interpretación de gráfico',
  'griffiths-style': 'Estilo Griffiths',
  novel: 'Nuevo',
  'method-choice': 'Elección de método',
}

export function ExerciseView({ exercise }: { exercise: Exercise }) {
  const [guidedDone, setGuidedDone] = useState<boolean[]>(() => exercise.guided.map(() => false))
  const [hintLevel, setHintLevel] = useState(0) // 0 = none, up to hints.length
  const [showSolution, setShowSolution] = useState(false)
  const [revealedSteps, setRevealedSteps] = useState<Set<string>>(new Set())
  const [allStepsOpen, setAllStepsOpen] = useState(false)
  const { toast } = useToast()

  const allGuidedDone = guidedDone.every(Boolean) || exercise.guided.length === 0

  const recordAttempt = async (correct: boolean, errorType?: ErrorType, hintsUsed: number = hintLevel) => {
    const studentId = getOrCreateStudentId()
    try {
      await apiPost('/api/attempts', {
        studentId, exerciseId: exercise.id, sectionId: exercise.sectionId,
        conceptId: exercise.conceptIds[0], correct, errorType, hintsUsed,
        solutionRevealed: showSolution || allStepsOpen,
      })
      // record daily study activity (best-effort)
      apiPost('/api/study', { studentId, activity: 'exercise', count: 1 }).catch(() => {})
    } catch (e) {
      // silent — progress tracking is best-effort
    }
  }

  const markCorrect = () => {
    recordAttempt(true)
    toast({ title: 'Registrado como resuelto', description: 'Tu progreso se ha guardado.' })
  }
  const markWrong = (type: ErrorType) => {
    recordAttempt(false, type)
    toast({ title: 'Error registrado', description: `Tipo: ${ERROR_TYPE_LABELS[type]}` })
  }

  const revealNextHint = () => {
    if (hintLevel < exercise.hints.length) {
      setHintLevel(h => h + 1)
      if (hintLevel + 1 === exercise.hints.length) {
        // last hint reached — encourage solution
      }
    }
  }

  const revealNextStep = () => {
    const order = exercise.steps
    for (const s of order) {
      if (!revealedSteps.has(s.id)) {
        setRevealedSteps(prev => new Set(prev).add(s.id))
        return
      }
    }
  }

  return (
    <article className="space-y-5">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">Sección {exercise.sectionId}</span>
          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">{TYPE_LABEL[exercise.type] ?? exercise.type}</span>
          <span className={cn('inline-flex items-center gap-0.5 rounded-full px-2 py-0.5',
            exercise.difficulty === 1 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
            : exercise.difficulty === 2 ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
            : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300')}>
            {DIFF_LABEL[exercise.difficulty]}
          </span>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{exercise.title}</h1>
          <BookmarkButton itemType="exercise" itemId={exercise.id} size="sm" />
        </div>
      </header>

      {/* Statement */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <ListChecks className="h-4 w-4" /> Enunciado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RenderBlocks blocks={exercise.statement} />
        </CardContent>
      </Card>

      {/* Guided questions */}
      {exercise.guided.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <Sparkles className="h-4 w-4" /> Preguntas para orientarte (responde antes de mirar la solución)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exercise.guided.map((g, i) => (
              <GuidedCard key={g.id} index={i} question={g} onDone={(d) => {
                setGuidedDone(prev => { const n = [...prev]; n[i] = d; return n })
              }} />
            ))}
            {allGuidedDone && (
              <div className="rounded-md border border-emerald-300/60 bg-emerald-50/60 p-3 text-sm dark:bg-emerald-950/30">
                Has contestado todas las preguntas orientadoras. Ya puedes pedir pistas o revelar pasos de la solución.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Hints */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <Lightbulb className="h-4 w-4" /> Pistas progresivas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {hintLevel === 0 && (
            <p className="text-sm text-muted-foreground">
              Las pistas son progresivas. Pide la primera solo si lo necesitas; cada una revela un poco más.
            </p>
          )}
          {hintLevel > 0 && (
            <div className="space-y-3">
              <Progress value={(hintLevel / exercise.hints.length) * 100} className="h-1.5" />
              {exercise.hints.slice(0, hintLevel).map((h, i) => (
                <div key={i} className="rounded-md border border-amber-200/70 bg-amber-50/60 p-3 dark:border-amber-900 dark:bg-amber-950/30">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                    Pista {i + 1}
                  </div>
                  <RenderBlocks blocks={h.blocks} />
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {hintLevel < exercise.hints.length && (
              <Button size="sm" variant="outline" onClick={revealNextHint}>
                <Lightbulb className="mr-1.5 h-3.5 w-3.5" /> Pista {hintLevel + 1}
              </Button>
            )}
            {!showSolution && hintLevel >= exercise.hints.length && (
              <Button size="sm" variant="secondary" onClick={() => setShowSolution(true)}>
                <Eye className="mr-1.5 h-3.5 w-3.5" /> Mostrar solución paso a paso
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Solution steps */}
      {showSolution && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <span className="flex items-center gap-2"><Eye className="h-4 w-4" /> Solución paso a paso</span>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={revealNextStep} disabled={revealedSteps.size === exercise.steps.length}>
                  <ChevronRight className="mr-1 h-3.5 w-3.5" /> Siguiente paso
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setAllStepsOpen(o => !o)}>
                  {allStepsOpen ? 'Ocultar todo' : 'Mostrar todo'}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(allStepsOpen ? exercise.steps : exercise.steps.filter(s => revealedSteps.has(s.id))).map((s, i) => (
              <SolutionStepCard key={s.id} step={s} index={exercise.steps.indexOf(s) + 1} />
            ))}
            {exercise.finalAnswer && (
              <div className="rounded-lg border border-emerald-300/60 bg-emerald-50/60 p-4 dark:bg-emerald-950/30">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> Respuesta final
                </div>
                <RenderBlocks blocks={exercise.finalAnswer} />
              </div>
            )}

            {/* Error analysis: self-classify */}
            <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                ¿Cómo te fue? Clasifica tu resultado
              </div>
              <p className="mb-3 text-xs text-muted-foreground">
                Marca tu resultado real para que la plataforma analice tus errores y adapte el estudio.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="default" onClick={markCorrect}>
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Lo resolví
                </Button>
                {(Object.keys(ERROR_TYPE_LABELS) as ErrorType[]).map(t => (
                  <Button key={t} size="sm" variant="outline" onClick={() => markWrong(t)}>
                    <XCircle className="mr-1.5 h-3.5 w-3.5" /> {ERROR_TYPE_LABELS[t]}
                  </Button>
                ))}
              </div>
            </div>

            {/* SM-2 spaced repetition quality selector */}
            <SM2QualitySelector exerciseId={exercise.id} />

            {/* Common errors */}
            {exercise.commonErrors && exercise.commonErrors.length > 0 && (
              <div className="mt-4 space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <AlertTriangle className="h-4 w-4 text-rose-600" /> Errores comunes a evitar
                </h3>
                {exercise.commonErrors.map(e => (
                  <div key={e.id} className="rounded-lg border border-rose-200/70 bg-rose-50/40 p-3 dark:border-rose-900 dark:bg-rose-950/20">
                    <div className="mb-1 flex items-center gap-2">
                      <Badge variant="outline" className="border-rose-300 text-rose-700 dark:text-rose-300">
                        {ERROR_TYPE_LABELS[e.type]}
                      </Badge>
                    </div>
                    <div className="mb-2 text-sm font-medium">
                      <RenderBlocks blocks={e.signature} />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <RenderBlocks blocks={e.explanation} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Variations */}
            {exercise.variations && exercise.variations.length > 0 && (
              <div className="mt-4 space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <GitBranch className="h-4 w-4 text-violet-600" /> Variaciones que cambian el método
                </h3>
                {exercise.variations.map(v => (
                  <div key={v.id} className="rounded-lg border border-violet-200/70 bg-violet-50/40 p-4 dark:border-violet-900 dark:bg-violet-950/20">
                    <div className="mb-1 font-semibold text-violet-900 dark:text-violet-200">{v.title}</div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <div className="text-xs font-semibold uppercase text-muted-foreground">Cambio</div>
                        <RenderBlocks blocks={v.change} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase text-muted-foreground">Pregunta</div>
                        <RenderBlocks blocks={v.question} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase text-muted-foreground">Qué cambia físicamente</div>
                        <RenderBlocks blocks={v.whatChangesPhysically} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!showSolution && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/30 p-4">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Pide pistas progresivamente. Cuando estés listo, revela la solución paso a paso (cada paso con su "¿Por qué?").
          </span>
          <Button size="sm" className="ml-auto" onClick={() => setShowSolution(true)}>
            <Eye className="mr-1.5 h-3.5 w-3.5" /> Mostrar solución
          </Button>
        </div>
      )}
    </article>
  )
}

function GuidedCard({ index, question, onDone }: {
  index: number
  question: import('@/lib/content-types').GuidedQuestion
  onDone: (done: boolean) => void
}) {
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [reveal, setReveal] = useState(false)
  const ok = submitted && question.accept.some(a => answer.toLowerCase().trim().includes(a.toLowerCase()))

  const submit = () => {
    setSubmitted(true)
    setReveal(true)
    onDone(true)
  }

  return (
    <div className="rounded-lg border border-border bg-card/70 p-4">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Pregunta orientadora {index + 1}
      </div>
      <div className="mb-3 text-[15px]">
        <RenderBlocks blocks={question.question} />
      </div>
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        disabled={submitted}
        placeholder="Escribe tu respuesta (texto libre; se compara con palabras clave)"
        className="mb-2 min-h-[60px] w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
      <div className="flex flex-wrap gap-2">
        {!submitted && (
          <Button size="sm" onClick={submit} disabled={!answer.trim()}>
            Enviar respuesta
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={() => setReveal(r => !r)}>
          {reveal ? 'Ocultar explicación' : 'Ver explicación'}
        </Button>
      </div>
      {reveal && (
        <div className={cn('mt-3 rounded-md border p-3 text-sm',
          ok ? 'border-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/30' : 'border-sky-300 bg-sky-50/60 dark:bg-sky-950/30')}>
          {submitted && (
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
              {ok ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertTriangle className="h-4 w-4 text-amber-600" />}
              {ok ? 'Bien encaminado.' : 'Revisa la explicación:'}
            </div>
          )}
          <RenderBlocks blocks={question.reveal} />
          <div className="mt-2 border-t border-current/10 pt-2">
            <div className="text-xs font-semibold uppercase text-muted-foreground">¿Por qué importa esta pregunta?</div>
            <RenderBlocks blocks={question.why} />
          </div>
        </div>
      )}
    </div>
  )
}

function SolutionStepCard({ step, index }: { step: import('@/lib/content-types').SolutionStep; index: number }) {
  const [showWhy, setShowWhy] = useState(false)
  const [showMeaning, setShowMeaning] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showWhatIf, setShowWhatIf] = useState(false)
  return (
    <div className="rounded-lg border border-border bg-card/60 p-4">
      <div className="mb-1 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {index}
        </span>
        <span className="text-sm font-semibold">{step.label}</span>
      </div>
      <div className="space-y-2">
        <div>
          <div className="text-xs font-semibold uppercase text-muted-foreground">¿Qué estamos haciendo?</div>
          <RenderBlocks blocks={step.what} />
        </div>
        <div className="rounded-md bg-muted/30 p-2.5">
          <div className="text-xs font-semibold uppercase text-muted-foreground">Matemática</div>
          <RenderBlocks blocks={step.math} />
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <Button size="sm" variant="outline" onClick={() => setShowWhy(o => !o)}>
            <HelpCircle className="mr-1 h-3.5 w-3.5" /> ¿Por qué?
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowMeaning(o => !o)}>
            <Sparkles className="mr-1 h-3.5 w-3.5" /> Significado físico
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowInfo(o => !o)}>
            <HelpCircle className="mr-1 h-3.5 w-3.5" /> ¿Qué información lo permitió?
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowWhatIf(o => !o)}>
            <RotateCcw className="mr-1 h-3.5 w-3.5" /> ¿Y si cambiara?
          </Button>
        </div>
        {showWhy && (
          <div className="mt-1 rounded-md border border-teal-300/60 bg-teal-50/60 p-3 dark:bg-teal-950/30">
            <WhyBox blocks={[]} defaultOpen /> {/* placeholder to keep import used */}
            <RenderBlocks blocks={step.why} />
          </div>
        )}
        {showMeaning && (
          <div className="mt-1 rounded-md border border-emerald-300/60 bg-emerald-50/60 p-3 dark:bg-emerald-950/30">
            <RenderBlocks blocks={step.meaning} />
          </div>
        )}
        {showInfo && (
          <div className="mt-1 rounded-md border border-sky-300/60 bg-sky-50/60 p-3 dark:bg-sky-950/30">
            <RenderBlocks blocks={step.info} />
          </div>
        )}
        {showWhatIf && (
          <div className="mt-1 rounded-md border border-amber-300/60 bg-amber-50/60 p-3 dark:bg-amber-950/30">
            <RenderBlocks blocks={step.whatIf} />
          </div>
        )}
      </div>
    </div>
  )
}

// SM-2 quality selector: lets the student self-rate recall quality, creating/updating
// a spaced-repetition card so the exercise reappears on the optimal schedule.
function SM2QualitySelector({ exerciseId }: { exerciseId: string }) {
  const { toast } = useToast()
  const [saved, setSaved] = useState<number | null>(null)
  const studentId = getOrCreateStudentId()

  const record = async (quality: number) => {
    try {
      const r = await apiPost('/api/sm2', { studentId, exerciseId, quality })
      setSaved(quality)
      const card = r.card
      toast({
        title: 'Programado para repaso',
        description: `Próxima revisión en ${card.interval} día(s)`,
      })
    } catch {
      toast({ title: 'No se pudo programar', variant: 'destructive' })
    }
  }

  const opts = [
    { q: 0, label: 'Negro', desc: 'No lo sabía', cls: 'border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300' },
    { q: 3, label: 'Difícil', desc: 'Con esfuerzo', cls: 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300' },
    { q: 4, label: 'Bien', desc: 'Sin problemas', cls: 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' },
    { q: 5, label: 'Fácil', desc: 'Inmediato', cls: 'border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300' },
  ]

  return (
    <div className="mt-4 rounded-lg border border-sky-200/60 bg-sky-50/30 p-4 dark:border-sky-900/50 dark:bg-sky-950/10">
      <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
        <Sparkles className="h-4 w-4 text-sky-600" /> Programa este ejercicio en tu memoria a largo plazo
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        Autoevalúa qué tan bien lo recuerdas. El algoritmo SM-2 lo traerá de vuelta en el momento óptimo
        (mañana si fallaste, cada vez más lejos si aciertas).
      </p>
      {saved !== null ? (
        <div className="flex items-center gap-2 rounded-md border border-emerald-300/60 bg-emerald-50/60 px-3 py-2 text-sm dark:bg-emerald-950/30">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          Registrado como "{opts.find(o => o.q === saved)?.label}". Lo verás en "Memoria a largo plazo".
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {opts.map(opt => (
            <button
              key={opt.q}
              type="button"
              onClick={() => record(opt.q)}
              className={cn('rounded-lg border p-2.5 text-center transition-all lift-on-hover', opt.cls)}
            >
              <div className="text-sm font-semibold">{opt.label}</div>
              <div className="text-[10px] opacity-80">{opt.desc}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
