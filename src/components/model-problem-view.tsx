'use client'

import { useState } from 'react'
import { MODEL_PROBLEMS } from '@/data/model-problems'
import { RenderBlocks } from '@/components/render-blocks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SECTIONS } from '@/data/structure'
import { useUI } from '@/lib/store'
import { GraduationCap, Target, ListChecks, Search, Wrench, FunctionSquare, ClipboardList, CheckCircle2, Atom, GitFork } from 'lucide-react'
import { cn } from '@/lib/utils'

const BLOCKS: { key: keyof typeof MODEL_PROBLEMS[number]; label: string; icon: any; tone: string }[] = [
  { key: 'goal', label: 'Objetivo de Griffiths', icon: Target, tone: 'teal' },
  { key: 'given', label: 'Información que tenemos', icon: ListChecks, tone: 'sky' },
  { key: 'find', label: 'Qué quiere encontrar', icon: Search, tone: 'sky' },
  { key: 'methodWhy', label: 'Por qué escoge este método', icon: Wrench, tone: 'amber' },
  { key: 'equations', label: 'Qué ecuación utiliza', icon: FunctionSquare, tone: 'violet' },
  { key: 'conditions', label: 'Qué condiciones impone', icon: ClipboardList, tone: 'rose' },
  { key: 'result', label: 'Qué obtiene', icon: CheckCircle2, tone: 'emerald' },
  { key: 'meaning', label: 'Qué significa físicamente', icon: Atom, tone: 'emerald' },
  { key: 'generalize', label: 'Qué podemos generalizar', icon: GitFork, tone: 'teal' },
]

const toneClass = {
  teal: 'border-teal-300/60 bg-teal-50/50 dark:bg-teal-950/20',
  sky: 'border-sky-300/60 bg-sky-50/50 dark:bg-sky-950/20',
  amber: 'border-amber-300/60 bg-amber-50/50 dark:bg-amber-950/20',
  violet: 'border-violet-300/60 bg-violet-50/50 dark:bg-violet-950/20',
  rose: 'border-rose-300/60 bg-rose-50/50 dark:bg-rose-950/20',
  emerald: 'border-emerald-300/60 bg-emerald-50/50 dark:bg-emerald-950/20',
}

export function ModelProblemView() {
  const { view, setView } = useUI()
  const currentId = view.name === 'model-problem' ? view.problemId : MODEL_PROBLEMS[0].id
  const problem = MODEL_PROBLEMS.find(p => p.id === currentId) ?? MODEL_PROBLEMS[0]
  const section = SECTIONS.find(s => s.id === problem.sectionId)

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-violet-600" /> ¿Qué está haciendo Griffiths?
        </h1>
        <p className="text-muted-foreground">
          Para cada problema modelo, una disección del método: objetivo, información, ecuación, condiciones, resultado, significado físico y qué generalizar.
          Aprende a <span className="font-semibold">pensar como quien resuelve</span>, no a copiar soluciones.
        </p>
      </header>

      {/* Problem selector */}
      <div className="flex flex-wrap gap-2">
        {MODEL_PROBLEMS.map(p => {
          const sec = SECTIONS.find(s => s.id === p.sectionId)
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setView({ name: 'model-problem', problemId: p.id })}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                p.id === problem.id
                  ? 'border-violet-400 bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100'
                  : 'border-border text-muted-foreground hover:bg-muted'
              )}
            >
              <span className="mr-1.5 font-mono">{sec?.id}</span>{p.title}
            </button>
          )
        })}
      </div>

      {/* Header card */}
      <Card className="border-violet-200/60 bg-violet-50/30 dark:bg-violet-950/10">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-violet-300 text-violet-700 dark:text-violet-300">Sección {problem.sectionId}</Badge>
            <Badge variant="outline" className="border-violet-300 text-violet-700 dark:text-violet-300">
              {problem.regime === 'bound' ? 'Estado ligado' : problem.regime === 'scattering' ? 'Dispersión' : 'Ligado + dispersión'}
            </Badge>
          </div>
          <CardTitle className="text-xl">{problem.title}</CardTitle>
          <p className="text-sm text-muted-foreground">Potencial: <span className="font-mono">{problem.potential}</span></p>
        </CardHeader>
      </Card>

      {/* Dissected blocks */}
      <div className="grid gap-4 lg:grid-cols-2">
        {BLOCKS.map(b => {
          const Icon = b.icon
          return (
            <Card key={b.key} className={cn('overflow-hidden', toneClass[b.tone as keyof typeof toneClass])}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
                  <Icon className="h-4 w-4" /> {b.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RenderBlocks blocks={problem[b.key] as any[]} />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {section && (
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
          <span className="font-medium">Sección {section.id}: {section.title}.</span>{' '}
          <span className="text-muted-foreground">{section.subtitle}.</span>
        </div>
      )}
    </div>
  )
}
