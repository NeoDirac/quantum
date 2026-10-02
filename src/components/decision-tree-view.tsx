'use client'

import { useState } from 'react'
import { DECISION_TREE, getDecisionNode } from '@/data/decision-tree'
import { RenderBlocks } from '@/components/render-blocks'
import { WhyBox } from '@/components/why-box'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Network, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DecisionTreeView() {
  const [path, setPath] = useState<string[]>(['start'])
  const current = getDecisionNode(path[path.length - 1]) ?? DECISION_TREE[0]

  const go = (id: string) => setPath(p => [...p, id])
  const back = () => setPath(p => p.slice(0, -1))
  const reset = () => setPath(['start'])

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <Network className="h-6 w-6 text-teal-600" /> Árbol de decisión para problemas
        </h1>
        <p className="text-muted-foreground">
          Responde las preguntas en orden. Cada nodo explica <span className="font-semibold">por qué</span> esa decisión importa
          —no es una receta, sino un modo de pensar. Al final sabrás qué método usar y por qué.
        </p>
      </header>

      {/* Breadcrumb / path */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-muted/30 p-2.5">
        {path.map((id, i) => {
          const node = getDecisionNode(id)
          return (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
              <button
                type="button"
                onClick={() => setPath(p => p.slice(0, i + 1))}
                className="rounded-md px-2 py-1 text-xs hover:bg-muted"
              >
                {i === 0 ? 'Inicio' : node?.question.slice(0, 28) + (node!.question.length > 28 ? '…' : '')}
              </button>
            </span>
          )
        })}
        <Button size="sm" variant="ghost" className="ml-auto" onClick={reset}>
          <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reiniciar
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{current.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">¿Por qué importa esta decisión?</div>
            <WhyBox blocks={current.why} defaultOpen />
          </div>

          {/* Branches */}
          {!current.terminal && (
            <div className="grid gap-2">
              {current.branches.map((b, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(b.goto)}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:border-teal-400 hover:bg-teal-50/40 dark:hover:bg-teal-950/20"
                >
                  <span className="text-sm font-medium">{b.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          )}

          {/* Terminal action */}
          {current.terminal && (
            <div className="space-y-3">
              <div className="rounded-lg border border-emerald-300/60 bg-emerald-50/60 p-4 dark:bg-emerald-950/30">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> Acción a tomar
                </div>
                <RenderBlocks blocks={current.terminal.action} />
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">¿Por qué este método?</div>
                <RenderBlocks blocks={current.terminal.why} />
              </div>
              <Button onClick={back} variant="outline" size="sm">
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Volver atrás
              </Button>
            </div>
          )}

          {/* Branch notes */}
          {!current.terminal && current.branches.some(b => b.note) && (
            <div className="mt-2 space-y-2">
              {current.branches.filter(b => b.note).map((b, i) => (
                <div key={i} className="rounded-md border border-border bg-muted/30 p-2.5 text-xs text-muted-foreground">
                  <span className="font-medium">{b.label}:</span>{' '}
                  <span><RenderBlocks blocks={b.note!} /></span>
                </div>
              ))}
            </div>
          )}

          {path.length > 1 && !current.terminal && (
            <Button onClick={back} variant="ghost" size="sm">
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Volver atrás
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
