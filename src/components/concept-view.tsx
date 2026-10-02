'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Concept } from '@/lib/content-types'
import { RenderBlocks, RenderBlock } from '@/components/render-blocks'
import { WhyBox } from '@/components/why-box'
import { BookmarkButton } from '@/components/bookmark-button'
import { cn } from '@/lib/utils'
import { Lightbulb, Sigma, Atom, BookOpen, ClipboardCheck, ChevronRight } from 'lucide-react'

const LAYERS = [
  { key: 'layer1Intuition', label: 'Intuición física', icon: Lightbulb, tone: 'amber' },
  { key: 'layer2Math', label: 'Matemática', icon: Sigma, tone: 'sky' },
  { key: 'layer3Interpretation', label: 'Interpretación física', icon: Atom, tone: 'emerald' },
  { key: 'layer4Griffiths', label: 'Conexión con Griffiths', icon: BookOpen, tone: 'violet' },
  { key: 'layer5Check', label: 'Comprueba tu comprensión', icon: ClipboardCheck, tone: 'rose' },
] as const

const toneClass = {
  amber: 'border-amber-300/60 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800',
  sky: 'border-sky-300/60 bg-sky-50/50 dark:bg-sky-950/20 dark:border-sky-800',
  emerald: 'border-emerald-300/60 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800',
  violet: 'border-violet-300/60 bg-violet-50/50 dark:bg-violet-950/20 dark:border-violet-800',
  rose: 'border-rose-300/60 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-800',
}

export function ConceptView({ concept }: { concept: Concept }) {
  const [openLayers, setOpenLayers] = useState<Set<number>>(new Set([0]))
  const toggle = (i: number) => {
    setOpenLayers(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <article className="space-y-5">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
          <span>Sección {concept.sectionId}</span>
          <span>·</span>
          <span>Concepto {concept.order}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{concept.title}</h1>
        <p className="text-base text-muted-foreground">{concept.subtitle}</p>
        {concept.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {concept.tags.map(t => (
              <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="pt-1">
          <BookmarkButton itemType="concept" itemId={concept.id} size="sm" />
        </div>
      </header>

      <div className="space-y-2.5">
        {LAYERS.map((L, i) => {
          const open = openLayers.has(i)
          const Icon = L.icon
          const layerNum = ['1', '2', '3', '4', '5'][i]
          return (
            <section
              key={L.key}
              className={cn('overflow-hidden rounded-xl border transition-all', toneClass[L.tone as keyof typeof toneClass],
                open ? 'shadow-sm' : 'hover:shadow-sm')}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
              >
                <span className="flex items-center gap-2.5">
                  <span className={cn('flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold tabular-nums shadow-sm',
                    open ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white' : 'bg-background/70 text-foreground border border-border')}>
                    {layerNum}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold sm:text-base">
                    <Icon className={cn('h-4 w-4 transition-transform', open && 'scale-110')} />
                    {L.label}
                  </span>
                </span>
                <ChevronRight className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-90')} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-current/10 px-4 py-4">
                      <LayerContent concept={concept} layer={L.key} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          )
        })}
      </div>
    </article>
  )
}

function LayerContent({ concept, layer }: { concept: Concept; layer: typeof LAYERS[number]['key'] }) {
  if (layer === 'layer5Check') {
    return (
      <div className="space-y-4">
        {concept.layer5Check.length === 0 && <p className="text-sm text-muted-foreground">Sin preguntas de comprobación.</p>}
        {concept.layer5Check.map(q => <CheckQuestionCard key={q.id} q={q} />)}
      </div>
    )
  }
  return <RenderBlocks blocks={concept[layer] as any[]} />
}

import type { CheckQuestion } from '@/lib/content-types'

function CheckQuestionCard({ q }: { q: CheckQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [reveal, setReveal] = useState(false)
  const correct = selected === q.correctId
  return (
    <div className="rounded-lg border border-rose-200/60 bg-card/70 p-4 dark:border-rose-900">
      <div className="mb-3 text-[15px] font-medium">
        <RenderBlocks blocks={q.question} />
      </div>
      <div className="space-y-2">
        {q.options.map(o => {
          const isCorrect = o.id === q.correctId
          const isPicked = selected === o.id
          return (
            <button
              key={o.id}
              type="button"
              disabled={reveal}
              onClick={() => { setSelected(o.id); setReveal(true) }}
              className={cn(
                'flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors',
                !reveal && 'border-border hover:bg-muted/60',
                reveal && isCorrect && 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40',
                reveal && isPicked && !isCorrect && 'border-rose-400 bg-rose-50 dark:bg-rose-950/40',
                reveal && !isCorrect && !isPicked && 'border-border opacity-70',
              )}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                {o.id.toUpperCase()}
              </span>
              <span className="space-y-1">
                {o.text.map((b, i) => <RenderBlock key={i} block={b} />)}
              </span>
            </button>
          )
        })}
      </div>
      {reveal && (
        <div className={cn('mt-3 rounded-md border p-3 text-sm', correct ? 'border-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/30' : 'border-rose-300 bg-rose-50/60 dark:bg-rose-950/30')}>
          <div className="mb-1 font-semibold">{correct ? 'Correcto.' : 'No es correcto.'}</div>
          <RenderBlocks blocks={q.explanation} />
        </div>
      )}
    </div>
  )
}
