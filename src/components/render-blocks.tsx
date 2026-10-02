'use client'

import type { Block } from '@/lib/content-types'
import { M, MB } from '@/components/math'
import { cn } from '@/lib/utils'
import { Info, AlertTriangle, KeyRound, BookOpen } from 'lucide-react'

const toneStyles: Record<string, { icon: any; wrap: string; title: string }> = {
  info: { icon: Info, wrap: 'border-sky-300/60 bg-sky-50 dark:bg-sky-950/30 dark:border-sky-800', title: 'text-sky-800 dark:text-sky-300' },
  warn: { icon: AlertTriangle, wrap: 'border-amber-300/60 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800', title: 'text-amber-800 dark:text-amber-300' },
  key: { icon: KeyRound, wrap: 'border-emerald-300/60 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800', title: 'text-emerald-800 dark:text-emerald-300' },
  griffiths: { icon: BookOpen, wrap: 'border-violet-300/60 bg-violet-50 dark:bg-violet-950/30 dark:border-violet-800', title: 'text-violet-800 dark:text-violet-300' },
}

export function RenderBlocks({ blocks, className }: { blocks: Block[]; className?: string }) {
  return (
    <div className={cn('space-y-3 text-[15px] leading-7', className)}>
      {blocks.map((b, i) => <RenderBlock key={i} block={b} />)}
    </div>
  )
}

export function RenderBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p':
      return <p>{block.text}</p>
    case 'math':
      return <M>{block.tex}</M>
    case 'math-block':
      return <MB>{block.tex}</MB>
    case 'eq-row':
      return (
        <div className="my-2 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-border/60 bg-muted/40 px-3 py-2">
          {block.label && (
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {block.label}
            </span>
          )}
          <div className="min-w-0 flex-1 overflow-x-auto">
            <M>{block.tex}</M>
          </div>
        </div>
      )
    case 'callout': {
      const s = toneStyles[block.tone] ?? toneStyles.info
      const Icon = s.icon
      return (
        <div className={cn('my-3 rounded-lg border p-4', s.wrap)}>
          {block.title && (
            <div className={cn('mb-2 flex items-center gap-2 text-sm font-semibold', s.title)}>
              <Icon className="h-4 w-4" />
              {block.title}
            </div>
          )}
          <div className="space-y-2 text-[14.5px] leading-7">
            {block.blocks.map((bb, i) => <RenderBlock key={i} block={bb} />)}
          </div>
        </div>
      )
    }
    case 'list':
      return block.ordered ? (
        <ol className="list-decimal space-y-1.5 pl-6 marker:text-muted-foreground">
          {block.items.map((it, i) => (
            <li key={i} className="pl-1">
              <span className="space-y-2">{it.map((bb, j) => <RenderBlock key={j} block={bb} />)}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-1.5 pl-6 marker:text-muted-foreground">
          {block.items.map((it, i) => (
            <li key={i} className="pl-1">
              <span className="space-y-2">{it.map((bb, j) => <RenderBlock key={j} block={bb} />)}</span>
            </li>
          ))}
        </ul>
      )
    case 'steps':
      return (
        <div className="space-y-3">
          {block.items.map((it, i) => (
            <div key={i} className="rounded-md border border-border/60 bg-card/60 p-3">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Paso {i + 1}
              </div>
              <div className="space-y-2">{it.map((bb, j) => <RenderBlock key={j} block={bb} />)}</div>
            </div>
          ))}
        </div>
      )
    case 'kv':
      return (
        <dl className="my-2 grid grid-cols-1 gap-2 sm:grid-cols-[auto_1fr]">
          {block.pairs.map((p, i) => (
            <div key={i} className="contents">
              <dt className="rounded-md bg-muted/60 px-2 py-1 text-xs font-semibold text-muted-foreground sm:text-right">
                <span className="space-y-1">{p.k.map((bb, j) => <RenderBlock key={j} block={bb} />)}</span>
              </dt>
              <dd className="px-1 py-1">
                <span className="space-y-1">{p.v.map((bb, j) => <RenderBlock key={j} block={bb} />)}</span>
              </dd>
            </div>
          ))}
        </dl>
      )
    default:
      return null
  }
}
