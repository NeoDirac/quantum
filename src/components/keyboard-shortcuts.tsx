'use client'

import { useEffect, useState } from 'react'
import { useUI } from '@/lib/store'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Keyboard, ArrowRight, ArrowLeft, Search, Home, Star, HelpCircle } from 'lucide-react'

const SHORTCUTS = [
  { keys: ['J', '→'], label: 'Concepto siguiente', icon: ArrowRight },
  { keys: ['K', '←'], label: 'Concepto anterior', icon: ArrowLeft },
  { keys: ['G'], label: 'Mapa de conceptos', icon: Search },
  { keys: ['H'], label: 'Panel principal', icon: Home },
  { keys: ['B'], label: 'Marcar como favorito (en conceptos)', icon: Star },
  { keys: ['?'], label: 'Mostrar esta ayuda', icon: HelpCircle },
]

export function useKeyboardShortcuts() {
  const { view, setView } = useUI()
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore when typing in inputs/textareas
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return
      if (e.ctrlKey || e.metaKey || e.altKey) return

      const key = e.key.toLowerCase()

      if (key === '?') {
        e.preventDefault()
        setShowHelp(s => !s)
        return
      }

      // Concept navigation only works when viewing a concept
      if (view.name === 'concept') {
        const idx = ALL_CONCEPTS.findIndex(c => c.id === view.conceptId)
        if (key === 'j' || key === 'arrowright') {
          e.preventDefault()
          if (idx >= 0 && idx < ALL_CONCEPTS.length - 1) {
            setView({ name: 'concept', conceptId: ALL_CONCEPTS[idx + 1].id })
          }
        } else if (key === 'k' || key === 'arrowleft') {
          e.preventDefault()
          if (idx > 0) {
            setView({ name: 'concept', conceptId: ALL_CONCEPTS[idx - 1].id })
          }
        } else if (key === 'b') {
          // Find the bookmark button on the page and click it
          const btns = document.querySelectorAll('button[title*="favorito"]')
          if (btns.length > 0) (btns[0] as HTMLButtonElement).click()
        }
      }

      if (key === 'g' && view.name !== 'chapter-map') {
        e.preventDefault()
        setView({ name: 'chapter-map' })
      } else if (key === 'h' && view.name !== 'dashboard') {
        e.preventDefault()
        setView({ name: 'dashboard' })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [view, setView])

  return { showHelp, setShowHelp }
}

export function KeyboardHelpDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (b: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-teal-600" /> Atajos de teclado
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {SHORTCUTS.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="flex items-center justify-between gap-3 rounded-md border border-border bg-card/60 px-3 py-2">
                <span className="flex items-center gap-2 text-sm">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {s.label}
                </span>
                <span className="flex gap-1">
                  {s.keys.map(k => (
                    <kbd key={k} className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 text-[11px] font-semibold text-foreground shadow-sm">
                      {k}
                    </kbd>
                  ))}
                </span>
              </div>
            )
          })}
          <p className="pt-2 text-xs text-muted-foreground">
            Los atajos de navegación funcionan al ver un concepto. No interfieren con campos de texto.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
