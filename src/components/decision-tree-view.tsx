'use client'

import { useState, useMemo } from 'react'
import { DECISION_TREE, getDecisionNode } from '@/data/decision-tree'
import type { DecisionNode } from '@/lib/content-types'
import { RenderBlocks } from '@/components/render-blocks'
import { WhyBox } from '@/components/why-box'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Network, RotateCcw, ChevronRight, CheckCircle2, MapIcon, ListTree } from 'lucide-react'
import { cn } from '@/lib/utils'

// Compute a layered (BFS) layout so each node has a depth and we can place
// nodes of the same depth on the same horizontal row.
interface PositionedNode {
  node: DecisionNode
  depth: number
  x: number
  y: number
  indexAtDepth: number
}

function useLayout() {
  return useMemo(() => {
    // Build children map
    const childrenOf = (id: string): string[] => {
      const n = getDecisionNode(id)
      return n && !n.terminal ? n.branches.map(b => b.goto) : []
    }
    // BFS by depth
    const depthMap = new Map<string, number>()
    const order: string[] = []
    const visited = new Set<string>()
    const queue: { id: string; depth: number }[] = [{ id: 'start', depth: 0 }]
    depthMap.set('start', 0)
    while (queue.length) {
      const { id, depth } = queue.shift()!
      if (visited.has(id)) continue
      visited.add(id)
      order.push(id)
      for (const c of childrenOf(id)) {
        if (!depthMap.has(c)) depthMap.set(c, depth + 1)
        queue.push({ id: c, depth: depthMap.get(c)! })
      }
    }
    // Group by depth (dedupe: a node visited once appears once)
    const byDepth = new Map<number, string[]>()
    const seen = new Set<string>()
    for (const id of order) {
      if (seen.has(id)) continue
      seen.add(id)
      const d = depthMap.get(id)!
      if (!byDepth.has(d)) byDepth.set(d, [])
      byDepth.get(d)!.push(id)
    }
    const maxDepth = byDepth.size > 0 ? Math.max(...byDepth.keys()) : 0
    // Assign positions
    const positioned: PositionedNode[] = []
    const posMap = new Map<string, { x: number; y: number }>()
    const NODE_W = 150
    const NODE_H = 64
    const H_GAP = 40
    const V_GAP = 110
    for (let d = 0; d <= maxDepth; d++) {
      const ids = byDepth.get(d) ?? []
      const totalW = ids.length * NODE_W + (Math.max(0, ids.length - 1)) * H_GAP
      const startX = -totalW / 2
      ids.forEach((id, i) => {
        const x = startX + i * (NODE_W + H_GAP) + NODE_W / 2
        const y = d * V_GAP + NODE_H / 2
        posMap.set(id, { x, y })
        const node = getDecisionNode(id)
        if (node) positioned.push({ node, depth: d, x, y, indexAtDepth: i })
      })
    }
    // Edges
    const edges: { from: string; to: string; label: string }[] = []
    for (const n of DECISION_TREE) {
      if (n.terminal) continue
      for (const b of n.branches) {
        edges.push({ from: n.id, to: b.goto, label: b.label })
      }
    }
    const width = positioned.length > 0 ? Math.max(...positioned.map(p => Math.abs(p.x))) * 2 + NODE_W + 60 : 600
    const height = (maxDepth + 1) * V_GAP + 20
    return { positioned, posMap, edges, width, height, NODE_W, NODE_H }
  }, [])
}

export function DecisionTreeView() {
  const [path, setPath] = useState<string[]>(['start'])
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph')
  const current = getDecisionNode(path[path.length - 1]) ?? DECISION_TREE[0]
  const layout = useLayout()

  const go = (id: string) => setPath(p => [...p, id])
  const back = () => setPath(p => p.slice(0, -1))
  const reset = () => setPath(['start'])

  const pathSet = new Set(path)
  const pathEdges = new Set<string>()
  for (let i = 0; i < path.length - 1; i++) {
    pathEdges.add(`${path[i]}->${path[i + 1]}`)
  }

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <Network className="h-6 w-6 text-teal-600" /> Árbol de decisión para problemas
        </h1>
        <p className="text-muted-foreground">
          Cada nodo pregunta algo y explica <span className="font-semibold">por qué</span> esa decisión importa
          —no es una receta, sino un modo de pensar. Navega por el grafo o por la lista.
        </p>
      </header>

      {/* View mode toggle + breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/30 p-2.5">
        <div className="flex items-center gap-1 rounded-md bg-background p-0.5">
          <button
            type="button"
            onClick={() => setViewMode('graph')}
            className={cn('flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors',
              viewMode === 'graph' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100' : 'text-muted-foreground hover:text-foreground')}
          >
            <MapIcon className="h-3.5 w-3.5" /> Grafo
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={cn('flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors',
              viewMode === 'list' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100' : 'text-muted-foreground hover:text-foreground')}
          >
            <ListTree className="h-3.5 w-3.5" /> Lista
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
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
                  {i === 0 ? 'Inicio' : node?.question.slice(0, 24) + (node!.question.length > 24 ? '…' : '')}
                </button>
              </span>
            )
          })}
        </div>
        <Button size="sm" variant="ghost" className="ml-auto" onClick={reset}>
          <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reiniciar
        </Button>
      </div>

      {/* Graph view */}
      {viewMode === 'graph' && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto bg-gradient-to-br from-teal-50/30 via-transparent to-violet-50/20 dark:from-teal-950/10 dark:to-violet-950/10">
              <svg
                viewBox={`${-layout.width / 2} 0 ${layout.width} ${layout.height}`}
                style={{ minWidth: '640px', width: '100%', height: `${Math.min(layout.height, 620)}px` }}
                className="block"
              >
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(0.6 0.1 200 / 0.6)" />
                  </marker>
                  <marker id="arrow-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(0.55 0.18 180)" />
                  </marker>
                </defs>

                {/* Edges */}
                {layout.edges.map((e, i) => {
                  const from = layout.posMap.get(e.from)!
                  const to = layout.posMap.get(e.to)!
                  const isActive = pathEdges.has(`${e.from}->${e.to}`)
                  const midX = (from.x + to.x) / 2
                  const midY = (from.y + to.y) / 2
                  // Shorten line so it doesn't overlap nodes
                  const dx = to.x - from.x, dy = to.y - from.y
                  const len = Math.sqrt(dx * dx + dy * dy) || 1
                  const ux = dx / len, uy = dy / len
                  const x1 = from.x + ux * (layout.NODE_H / 2 + 4)
                  const y1 = from.y + uy * (layout.NODE_H / 2 + 4)
                  const x2 = to.x - ux * (layout.NODE_H / 2 + 6)
                  const y2 = to.y - uy * (layout.NODE_H / 2 + 6)
                  return (
                    <g key={i}>
                      <line
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={isActive ? 'oklch(0.55 0.18 180)' : 'oklch(0.7 0.05 200 / 0.4)'}
                        strokeWidth={isActive ? 2.5 : 1.5}
                        markerEnd={isActive ? 'url(#arrow-active)' : 'url(#arrow)'}
                        className="transition-all"
                      />
                      {isActive && e.label && (
                        <g>
                          <rect
                            x={midX - measureLabel(e.label) / 2 - 6}
                            y={midY - 9}
                            width={measureLabel(e.label) + 12}
                            height={18}
                            rx={9}
                            fill="oklch(0.55 0.18 180)"
                          />
                          <text
                            x={midX} y={midY + 4}
                            textAnchor="middle"
                            className="fill-white"
                            fontSize={10}
                            fontWeight={600}
                          >
                            {truncate(e.label, 22)}
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}

                {/* Nodes */}
                {layout.positioned.map(({ node, x, y }) => {
                  const isCurrent = node.id === current.id
                  const inPath = pathSet.has(node.id)
                  const isTerminal = !!node.terminal
                  const w = layout.NODE_W, h = layout.NODE_H
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${x - w / 2}, ${y - h / 2})`}
                      className="cursor-pointer"
                      onClick={() => {
                        // navigate to this node if reachable: find if it's in path, else jump
                        const idx = path.indexOf(node.id)
                        if (idx >= 0) setPath(p => p.slice(0, idx + 1))
                        else setPath(p => [...p, node.id])
                      }}
                    >
                      <rect
                        width={w} height={h} rx={10}
                        fill={
                          isCurrent ? 'oklch(0.55 0.18 180)'
                          : inPath ? 'oklch(0.85 0.12 180 / 0.5)'
                          : isTerminal ? 'oklch(0.85 0.12 145 / 0.4)'
                          : 'oklch(0.97 0.02 200 / 0.9)'
                        }
                        stroke={
                          isCurrent ? 'oklch(0.45 0.2 180)'
                          : isTerminal ? 'oklch(0.6 0.15 145 / 0.7)'
                          : 'oklch(0.7 0.05 200 / 0.5)'
                        }
                        strokeWidth={isCurrent ? 2.5 : 1.5}
                        className="transition-all"
                      />
                      <text
                        x={w / 2} y={h / 2 - 4}
                        textAnchor="middle"
                        className={isCurrent ? 'fill-white' : 'fill-foreground'}
                        fontSize={10.5}
                        fontWeight={600}
                      >
                        {wrapText(node.question, 22).map((line, i, arr) => (
                          <tspan key={i} x={w / 2} dy={i === 0 ? -((arr.length - 1) * 6) : 13}>{line}</tspan>
                        ))}
                      </text>
                      {isTerminal && (
                        <circle cx={w - 12} cy={12} r={5} fill="oklch(0.55 0.18 145)" />
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
            <div className="border-t border-border bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
              <span className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border-2 border-teal-600 bg-teal-500" /> Nodo actual</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-teal-400 bg-teal-200/50" /> En tu camino</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-emerald-400 bg-emerald-200/40" /> Acción final</span>
                <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-border bg-background" /> Sin visitar</span>
                <span className="ml-auto">Pulsa un nodo para navegar.</span>
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current node detail (always shown) */}
      <Card className="border-teal-200/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
            <span className="rounded bg-teal-50 px-1.5 py-0.5 dark:bg-teal-950/50">Nodo {path.length}</span>
            <ChevronRight className="h-3 w-3" />
            <span>{current.terminal ? 'Acción final' : 'Decisión'}</span>
          </div>
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
                  className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left transition-all hover:border-teal-400 hover:bg-teal-50/40 dark:hover:bg-teal-950/20 lift-on-hover"
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

// Helpers for text layout in SVG nodes
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars) {
      if (line) lines.push(line.trim())
      line = w
    } else {
      line = (line + ' ' + w).trim()
    }
  }
  if (line) lines.push(line.trim())
  return lines.slice(0, 3)
}
function measureLabel(text: string): number {
  return Math.min(text.length * 5.5 + 4, 120)
}
function truncate(text: string, n: number): string {
  return text.length > n ? text.slice(0, n - 1) + '…' : text
}
