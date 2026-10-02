'use client'

import { useUI } from '@/lib/store'
import { SECTIONS, getActiveChapter } from '@/data/structure'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { EXERCISES } from '@/data/exercises'
import { MODEL_PROBLEMS } from '@/data/model-problems'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Atom, BookOpen, ListChecks, Network, GraduationCap, Waves, Timer, GitBranch, ArrowRight, Sparkles, BrainCircuit, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Dashboard() {
  const { setView } = useUI()
  const chapter = getActiveChapter()
  const sections = SECTIONS.filter(s => s.chapterId === chapter.id)
  const conceptCount = ALL_CONCEPTS.length
  const exCount = EXERCISES.length

  return (
    <div className="space-y-6">
      <header className="relative space-y-3 overflow-hidden rounded-2xl border border-teal-200/30 bg-gradient-to-br from-teal-50/80 via-emerald-50/40 to-transparent p-6 dark:border-teal-900/40 dark:from-teal-950/30 dark:via-emerald-950/10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-12 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/50 bg-white/70 px-3 py-1 text-xs font-medium text-teal-700 shadow-sm backdrop-blur dark:bg-teal-950/40 dark:text-teal-300">
            <Sparkles className="h-3.5 w-3.5" /> Capítulo {chapter.number} activo · {chapter.title}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Aprende a <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">resolver</span> mecánica cuántica
          </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Plataforma interactiva basada en Griffiths, enfocada en el Capítulo 2: la ecuación de Schrödinger independiente del tiempo.
          Aquí no memorizas procedimientos: aprendes a <span className="font-semibold text-foreground">reconocer</span> qué tipo de problema tienes delante,
          <span className="font-semibold text-foreground"> por qué</span> funciona cada método, y
          <span className="font-semibold text-foreground"> qué significa físicamente</span> cada paso.
        </p>
        </div>
      </header>

      {/* Quick stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Conceptos" value={conceptCount} icon={BookOpen} tone="teal" />
        <StatCard label="Ejercicios" value={exCount} icon={ListChecks} tone="sky" />
        <StatCard label="Problemas modelo" value={MODEL_PROBLEMS.length} icon={GraduationCap} tone="violet" />
      </div>

      {/* Learning flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Atom className="h-4 w-4 text-teal-600" /> Flujo de estudio recomendado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: 1, t: 'Estudia los conceptos', d: 'Cada concepto en 5 capas: intuición, matemática, interpretación, conexión con Griffiths y comprobación.', to: () => setView({ name: 'chapter-map' }), icon: BookOpen, tone: 'teal' },
              { n: 2, t: 'Recorre el árbol de decisión', d: 'Aprende a reconocer qué tipo de problema tienes delante y qué método usar. Cada nodo explica por qué.', to: () => setView({ name: 'decision-tree' }), icon: Network, tone: 'amber' },
              { n: 3, t: 'Mira "¿Qué hace Griffiths?"', d: 'Disección de cada problema modelo: objetivo, método, condiciones, resultado, significado físico.', to: () => setView({ name: 'model-problem', problemId: MODEL_PROBLEMS[0].id }), icon: GraduationCap, tone: 'violet' },
              { n: 4, t: 'Resuelve ejercicios guiados', d: 'Preguntas orientadoras, pistas progresivas, solución paso a paso con botón "¿Por qué?".', to: () => setView({ name: 'exercises-list' }), icon: ListChecks, tone: 'sky' },
              { n: 5, t: 'Juega con las visualizaciones', d: 'Mueve parámetros y observa cómo cambia la física: pozos, oscilador, barreras, tunneling.', to: () => setView({ name: 'visualizations' }), icon: Waves, tone: 'emerald' },
              { n: 6, t: 'Ponte a prueba: modo examen', d: 'Sin pistas, preguntas variadas, y al final un informe de conceptos a reforzar.', to: () => setView({ name: 'exam' }), icon: Timer, tone: 'rose' },
            ].map(s => {
              const Icon = s.icon
              const toneMap: Record<string,string> = {
                teal: 'from-teal-500 to-emerald-600',
                amber: 'from-amber-500 to-orange-600',
                violet: 'from-violet-500 to-purple-600',
                sky: 'from-sky-500 to-blue-600',
                emerald: 'from-emerald-500 to-green-600',
                rose: 'from-rose-500 to-pink-600',
              }
              return (
                <li key={s.n}>
                  <button onClick={s.to} className="group relative h-full w-full overflow-hidden rounded-xl border border-border bg-card/70 p-4 text-left lift-on-hover hover:border-teal-400/70">
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className={cn('flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white shadow-sm', toneMap[s.tone])}>{s.n}</span>
                      <Icon className="h-4 w-4 text-muted-foreground transition-transform group-hover:scale-110" />
                    </div>
                    <div className="mb-1 font-semibold text-sm">{s.t}</div>
                    <p className="text-xs text-muted-foreground">{s.d}</p>
                  </button>
                </li>
              )
            })}
          </ol>
        </CardContent>
      </Card>

      {/* Chapter sections grid */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <BookOpen className="h-5 w-5 text-teal-600" /> Secciones del Capítulo {chapter.number}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(s => {
            const concepts = ALL_CONCEPTS.filter(c => c.sectionId === s.id)
            const exs = EXERCISES.filter(e => e.sectionId === s.id)
            return (
              <Card key={s.id} className="cursor-pointer overflow-hidden lift-on-hover hover:border-teal-400/70" >
                <button className="w-full text-left" onClick={() => setView({ name: 'chapter-map' })}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
                      <span className="rounded bg-teal-50 px-1.5 py-0.5 font-mono dark:bg-teal-950/50">{s.id}</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-xs text-muted-foreground">{s.subtitle}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5"><BookOpen className="h-3 w-3" />{concepts.length} conceptos</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5"><ListChecks className="h-3 w-3" />{exs.length} ejercicios</span>
                    </div>
                  </CardContent>
                </button>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Training & exam & review */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer border-amber-200/60 bg-amber-50/40 dark:bg-amber-950/20 lift-on-hover" >
          <button className="w-full p-6 text-left" onClick={() => setView({ name: 'training' })}>
            <div className="mb-2 flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-amber-600" />
              <span className="font-semibold">Entrenamiento intensivo</span>
            </div>
            <p className="text-sm text-muted-foreground">Elige 30 min, 1 h o 10 problemas. La sesión se adapta: refuerza lo que fallaste, acelera lo que dominas.</p>
          </button>
        </Card>
        <Card className="cursor-pointer border-violet-200/60 bg-violet-50/40 dark:bg-violet-950/20 lift-on-hover">
          <button className="w-full p-6 text-left" onClick={() => setView({ name: 'review' })}>
            <div className="mb-2 flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-violet-600" />
              <span className="font-semibold">Repaso adaptativo</span>
            </div>
            <p className="text-sm text-muted-foreground">Analiza tu progreso y construye una sesión a medida: refuerza tus conceptos más débiles primero.</p>
          </button>
        </Card>
        <Card className="cursor-pointer border-rose-200/60 bg-rose-50/40 dark:bg-rose-950/20 lift-on-hover">
          <button className="w-full p-6 text-left" onClick={() => setView({ name: 'exam' })}>
            <div className="mb-2 flex items-center gap-2">
              <Timer className="h-5 w-5 text-rose-600" />
              <span className="font-semibold">Modo examen</span>
            </div>
            <p className="text-sm text-muted-foreground">Sin pistas. Mezcla conceptuales, identificación de potencial, fronteras, cálculo. Al final: informe de conceptos a reforzar.</p>
          </button>
        </Card>
      </div>

      {/* Bookmarks shortcut */}
      <Card className="cursor-pointer border-amber-200/40 bg-gradient-to-r from-amber-50/30 to-transparent dark:from-amber-950/10 lift-on-hover">
        <button className="flex w-full items-center gap-4 p-5 text-left" onClick={() => setView({ name: 'bookmarks' })}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300">
            <Star className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-semibold">Mis favoritos</div>
            <p className="text-sm text-muted-foreground">Conceptos y ejercicios marcados para revisar más tarde. Pulsa la estrella ⭐ en cualquier página para añadirlo.</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </Card>
    </div>
  )
}

function StatCard({ label, value, icon: Icon, tone }: { label: string; value: number; icon: any; tone: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', `bg-${tone}-100 dark:bg-${tone}-950/40 text-${tone}-700 dark:text-${tone}-300`)} >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-bold leading-none">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}
