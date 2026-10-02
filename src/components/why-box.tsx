'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'
import type { Block } from '@/lib/content-types'
import { RenderBlocks } from '@/components/render-blocks'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface WhyBoxProps {
  label?: string
  blocks: Block[]
  defaultOpen?: boolean
  tone?: 'why' | 'meaning' | 'info' | 'whatif'
}

const toneCfg = {
  why: { label: '¿Por qué?', cls: 'border-teal-300/60 bg-teal-50/60 dark:bg-teal-950/30 dark:border-teal-800 text-teal-800 dark:text-teal-200' },
  meaning: { label: 'Significado físico', cls: 'border-emerald-300/60 bg-emerald-50/60 dark:bg-emerald-950/30 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200' },
  info: { label: 'Información', cls: 'border-sky-300/60 bg-sky-50/60 dark:bg-sky-950/30 dark:border-sky-800 text-sky-800 dark:text-sky-200' },
  whatif: { label: '¿Qué pasaría si…?', cls: 'border-amber-300/60 bg-amber-50/60 dark:bg-amber-950/30 dark:border-amber-800 text-amber-800 dark:text-amber-200' },
}

export function WhyBox({ label, blocks, defaultOpen = false, tone = 'why' }: WhyBoxProps) {
  const [open, setOpen] = useState(defaultOpen)
  const cfg = toneCfg[tone]
  return (
    <div className="my-2">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={cn(
          'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors hover:brightness-105',
          cfg.cls
        )}
      >
        <HelpCircle className="h-3.5 w-3.5" />
        {label ?? cfg.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className={cn('mt-2 rounded-lg border p-3 text-[14px] leading-7', cfg.cls)}>
              <RenderBlocks blocks={blocks} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
