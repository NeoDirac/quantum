'use client'

import { useState, useMemo } from 'react'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { getConcept } from '@/data/concepts'
import { useUI } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Network, ArrowRight, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

const SECTION_COLOR: Record<string, string> = {
  '2.1': 'oklch(0.65 0.15 60)',   // amber
  '2.2': 'oklch(0.6 0.15 200)',   // sky
  '2.3': 'oklch(0.6 0.18 145)',   // emerald
  '2.4': 'oklch(0.6 0.15 280)',   // violet
  '2.5': 'oklch(0.65 0.18 20)',   // rose
  '2.6': 'oklch(0.6 0.15 160)',   // teal
  '2.7': 'oklch(0.55 0.12 220)',   // blue
}

export function ConceptGraphView() {
  const { setView } = useUI()
  const [selected, setSelected] = useState<string | null>(null)

  // Build a circular layout grouped by section, so concepts in the same section cluster.
  const layout = useMemo(() => {
    const sections = Array.from(new Set(ALL_CONCEPTS.map(c => c.sectionId))).sort()
    const cx = 380, cy = 280, R = 200
    const positions = new Map<string, { x: number; y: number }>()
    let idx = 0
    const total = ALL_CONCEPTS.length
    ALL_CONCEPTS.forEach(c => {
      const angle = (idx / total) * 2 * Math.PI - Math.PI / 2
      positions.set(c.id, { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) })
      idx++
    })
    return { positions, cx, cy, R, sections }
  }, [])

  // Edges: prerequisites (concept -> its prerequisites) + related
  const edges = useMemo(() => {
    const arr: { from: string; to: string; kind: 'prereq' | 'related' }[] = []
    for (const c of ALL_CONCEPTS) {
      for (const p of c.prerequisites) {
        if (getConcept(p) || ALL_CONCEPTS.find(x => x.id === p)) arr.push({ from: p, to: c.id, kind: 'prereq' })
      }
      for (const r of c.related) {
        if ((getConcept(r) || ALL_CONCEPTS.find(x => x.id === r)) && c.id < r) {
          arr.push({ from: c.id, to: r, kind: 'related' })
        }
      }
    }
    return arr
  }, [])

  const selConcept = selected ? (getConcept(selected) ?? ALL_CONCEPTS.find(c => c.id === selected)) : null

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
          <Network className="h-6 w-6 text-teal-600" /> Mapa de relaciones entre conceptos
        </h1>
        <p className="text-muted-foreground">
          Cada nodo es un concepto del Capítulo 2. Las flechas sólidas indican <span className="font-semibold">prerrequisitos</span> (lo que necesitas entender antes);
          las líneas discontinuas marcan <span className="font-semibold">relaciones</span> entre conceptos que se refieren entre sí.
          Pulsa un nodo para ver sus conexiones y saltar al concepto.
        </p>
      </header>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-muted/30 p-3 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-5 bg-foreground" /> Prerrequisito
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-foreground" /> Relacionado
        </span>
        <span className="ml-auto">Secciones:</span>
        {layout.sections.map(s => (
          <span key={s} className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: SECTION_COLOR[s] }} />
            <span className="font-mono">{s}</span>
          </span>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto bg-gradient-to-br from-teal-50/20 via-transparent to-violet-50/10 dark:from-teal-950/10 dark:to-violet-950/10">
            <svg viewBox="0 0 760 560" style={{ minWidth: '640px', width: '100%' }} className="block">
              {/* Edges */}
              {edges.map((e, i) => {
                const from = layout.positions.get(e.from)
                const to = layout.positions.get(e.to)
                if (!from || !to) return null
                const isHighlight = selected && (e.from === selected || e.to === selected)
                return (
                  <line
                    key={i}
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={isHighlight ? 'oklch(0.5 0.18 180)' : 'oklch(0.45 0.08 200 / 0.55)'}
                    strokeWidth={isHighlight ? 2.5 : 1.5}
                    strokeDasharray={e.kind === 'related' ? '5 3' : undefined}
                    markerEnd={e.kind === 'prereq' ? 'url(#cg-arrow)' : undefined}
                  />
                )
              })}
              <defs>
                <marker id="cg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="oklch(0.5 0.15 200 / 0.6)" />
                </marker>
              </defs>
              {/* Nodes */}
              {ALL_CONCEPTS.map(c => {
                const pos = layout.positions.get(c.id)!
                const isSel = selected === c.id
                const isConnected = edges.some(e => (e.from === selected && e.to === c.id) || (e.to === selected && e.from === c.id))
                const color = SECTION_COLOR[c.sectionId] ?? 'oklch(0.6 0 0)'
                const r = isSel ? 12 : isConnected ? 10 : 8
                // wrap title to 2 lines of ~18 chars
                const words = c.title.split(' ')
                const lines: string[] = []
                let line = ''
                for (const w of words) {
                  if ((line + ' ' + w).trim().length > 18) {
                    if (line) lines.push(line.trim())
                    line = w
                  } else {
                    line = (line + ' ' + w).trim()
                  }
                }
                if (line) lines.push(line.trim())
                const labelLines = lines.slice(0, 2)
                if (lines.length > 2) labelLines[1] = labelLines[1].slice(0, 16) + '…'
                return (
                  <g key={c.id} className="cursor-pointer" onClick={() => setSelected(s => s === c.id ? null : c.id)}>
                    <circle cx={pos.x} cy={pos.y} r={r}
                      fill={isSel ? color : isConnected ? color.replace('0.6', '0.75').replace('0.65', '0.75') : 'oklch(0.98 0.01 200)'}
                      stroke={color}
                      strokeWidth={isSel ? 3 : 2}
                      className="transition-all"
                    />
                    {labelLines.map((ln, li) => (
                      <text key={li} x={pos.x} y={pos.y + r + 12 + li * 10} textAnchor="middle" fontSize={8.5} fontWeight={isSel ? 600 : 400} className="fill-foreground/85">
                        {ln}
                      </text>
                    ))}
                  </g>
                )
              })}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Selected concept detail */}
      {selConcept && (
        <Card className="border-teal-200/50">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">Sección {selConcept.sectionId}</div>
                <h2 className="text-lg font-bold">{selConcept.title}</h2>
                <p className="text-sm text-muted-foreground">{selConcept.subtitle}</p>
              </div>
              <Button size="sm" onClick={() => setView({ name: 'concept', conceptId: selConcept.id })}>
                Abrir concepto <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
            {selConcept.prerequisites.length > 0 && (
              <div>
                <div className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Prerrequisitos</div>
                <div className="flex flex-wrap gap-1.5">
                  {selConcept.prerequisites.map(pid => {
                    const pc = getConcept(pid) ?? ALL_CONCEPTS.find(x => x.id === pid)
                    if (!pc) return null
                    return (
                      <button key={pid} onClick={() => setSelected(pid)} className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300">
                        {pc.title}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            {selConcept.related.length > 0 && (
              <div>
                <div className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Relacionado con</div>
                <div className="flex flex-wrap gap-1.5">
                  {selConcept.related.map(rid => {
                    const rc = getConcept(rid) ?? ALL_CONCEPTS.find(x => x.id === rid)
                    if (!rc) return null
                    return (
                      <button key={rid} onClick={() => setSelected(rid)} className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300">
                        {rc.title}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            {selConcept.prerequisites.length === 0 && selConcept.related.length === 0 && (
              <p className="text-sm text-muted-foreground">Este concepto no tiene relaciones explícitas registradas.</p>
            )}
          </CardContent>
        </Card>
      )}
      {selected && (
        <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Deseleccionar
        </Button>
      )}
    </div>
  )
}
