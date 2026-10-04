'use client'

import { useState, useEffect, useMemo } from 'react'
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { useUI } from '@/lib/store'
import { ALL_CONCEPTS } from '@/data/concepts-2'
import { ALL_EXERCISES } from '@/data/exercises'
import { MODEL_PROBLEMS } from '@/data/model-problems'
import { BOOK_PROBLEMS } from '@/data/book-problems'
import { getBookHints } from '@/data/book-hints'
import { SECTIONS } from '@/data/structure'
import { BookOpen, ListChecks, GraduationCap, Layers, Search, BookMarked, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Blob de búsqueda por problema del libro (una sola pasada): número, título,
// enunciados EN/ES y TODO el contenido pedagógico de pistas y pasos de
// aplicación — así «⌘K normalización» encuentra los mismos problemas que el
// buscador de la lista de problemas.
function buildBookSearchBlobs(): Map<string, string> {
  const map = new Map<string, string>()
  for (const p of BOOK_PROBLEMS) {
    const parts = [p.number, p.title, p.statementEn, p.statementEs]
    const entry = getBookHints(p.id)
    if (entry) {
      for (const h of entry.hints) {
        parts.push(h.text)
        if (h.application) {
          if (h.application.intro) parts.push(h.application.intro)
          for (const s of h.application.steps) parts.push(s.title, s.text)
        }
      }
      // La respuesta final del solucionario también se indexa (buscar por resultado).
      if (entry.finalAnswer) {
        parts.push(entry.finalAnswer.answer)
        if (entry.finalAnswer.note) parts.push(entry.finalAnswer.note)
      }
    }
    map.set(p.id, parts.join(' ').toLowerCase())
  }
  return map
}

// Técnicas que aparecen una y otra vez en el capítulo — accesos rápidos
// (verificado contra el contenido real: todas encuentran ≥1 problema).
const TECHNIQUE_SUGGESTIONS = [
  'normalización',            // 11 problemas
  'paridad',                  // 12
  'pozo infinito',            // 11
  'oscilador armónico',       // 9
  'valores esperados',        // 6
  'coeficiente de transmisión', // 5
  'efecto túnel',             // 3
  'corriente de probabilidad', // 1
]

export function SearchPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (b: boolean) => void }) {
  const { setView } = useUI()
  const bookBlobs = useMemo(() => buildBookSearchBlobs(), [])

  const go = (view: Parameters<typeof setView>[0]) => {
    setView(view)
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Busca conceptos, ejercicios, problemas, técnicas… (normalización, tunneling)" />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>

        <CommandGroup heading="Navegación">
          <CommandItem onSelect={() => go({ name: 'dashboard' })} className="cursor-pointer">
            <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Panel principal</span>
          </CommandItem>
          <CommandItem onSelect={() => go({ name: 'chapter-map' })} className="cursor-pointer">
            <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Mapa de conceptos</span>
          </CommandItem>
          <CommandItem onSelect={() => go({ name: 'concept-graph' })} className="cursor-pointer">
            <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Mapa de relaciones</span>
          </CommandItem>
          <CommandItem onSelect={() => go({ name: 'exercises-list' })} className="cursor-pointer">
            <ListChecks className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Lista de ejercicios</span>
          </CommandItem>
          <CommandItem onSelect={() => go({ name: 'decision-tree' })} className="cursor-pointer">
            <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Árbol de decisión</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading={`Conceptos (${ALL_CONCEPTS.length})`}>
          {ALL_CONCEPTS.map(c => {
            const section = SECTIONS.find(s => s.id === c.sectionId)
            return (
              <CommandItem
                key={c.id}
                value={`concepto ${c.title} ${c.subtitle} ${c.tags.join(' ')} ${c.sectionId} ${section?.title ?? ''}`}
                onSelect={() => go({ name: 'concept', conceptId: c.id })}
                className="cursor-pointer"
              >
                <BookOpen className="mr-2 h-4 w-4 text-teal-500" />
                <div className="flex flex-1 items-center gap-2">
                  <span className="rounded bg-teal-50 px-1.5 py-0.5 font-mono text-[10px] text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">{c.sectionId}</span>
                  <span className="font-medium">{c.title}</span>
                </div>
                <span className="text-xs text-muted-foreground truncate max-w-[200px]">{c.subtitle}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandGroup heading={`Ejercicios (${ALL_EXERCISES.length})`}>
          {ALL_EXERCISES.map(e => {
            const stars = '★'.repeat(e.difficulty)
            return (
              <CommandItem
                key={e.id}
                value={`ejercicio ${e.title} ${e.sectionId} ${e.type}`}
                onSelect={() => go({ name: 'exercise', exerciseId: e.id })}
                className="cursor-pointer"
              >
                <ListChecks className="mr-2 h-4 w-4 text-sky-500" />
                <div className="flex flex-1 items-center gap-2">
                  <span className="rounded bg-sky-50 px-1.5 py-0.5 font-mono text-[10px] text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">{e.sectionId}</span>
                  <span className="font-medium">{e.title}</span>
                </div>
                {e.difficulty > 0 && <span className="text-[10px] text-amber-500">{stars}</span>}
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandGroup heading={`Problemas modelo (${MODEL_PROBLEMS.length})`}>
          {MODEL_PROBLEMS.map(p => (
            <CommandItem
              key={p.id}
              value={`problema modelo ${p.title} ${p.potential} ${p.sectionId}`}
              onSelect={() => go({ name: 'model-problem', problemId: p.id })}
              className="cursor-pointer"
            >
              <GraduationCap className="mr-2 h-4 w-4 text-violet-500" />
              <div className="flex flex-1 items-center gap-2">
                <span className="rounded bg-violet-50 px-1.5 py-0.5 font-mono text-[10px] text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">{p.sectionId}</span>
                <span className="font-medium">{p.title}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Problemas del libro · Griffiths (49) — también por técnica">
          {BOOK_PROBLEMS.map(p => {
            const stars = '★'.repeat(p.stars)
            return (
              <CommandItem
                key={p.id}
                value={`problema libro griffiths ${p.number} ${p.title} ${p.sectionId} ${bookBlobs.get(p.id) ?? ''}`}
                onSelect={() => go({ name: 'book-problem', problemId: p.id })}
                className="cursor-pointer"
              >
                <BookMarked className="mr-2 h-4 w-4 text-violet-500" />
                <div className="flex flex-1 items-center gap-2">
                  <span className="rounded bg-violet-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">{p.number}</span>
                  <span className="font-medium">{p.title}</span>
                  {p.placement === 'further' && <span className="rounded bg-muted px-1 py-0.5 text-[9px] text-muted-foreground">Further</span>}
                </div>
                {p.stars > 0 && <span className="text-[10px] text-amber-500">{stars}</span>}
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandGroup heading="Técnicas frecuentes">
          {TECHNIQUE_SUGGESTIONS.map(t => (
            <CommandItem
              key={t}
              value={`técnica ${t}`}
              onSelect={() => go({ name: 'book-problems', query: t })}
              className="cursor-pointer"
            >
              <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
              <span>{t}</span>
              <span className="ml-auto hidden text-[10px] text-muted-foreground sm:inline">lista de problemas</span>
            </CommandItem>
          ))}
        </CommandGroup>

      </CommandList>
    </CommandDialog>
  )
}

// Hook + trigger button: use anywhere; listens for Cmd/Ctrl+K to open.
export function useSearchPalette() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  return { open, setOpen }
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" size="sm" onClick={onClick} className="gap-2 text-muted-foreground">
      <Search className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Buscar…</span>
      <kbd className="ml-1 hidden rounded border border-border bg-muted px-1 text-[10px] font-semibold sm:inline">⌘K</kbd>
    </Button>
  )
}
