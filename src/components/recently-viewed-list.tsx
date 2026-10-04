'use client'

import { useRecentlyViewed, clearRecentlyViewed } from '@/lib/recently-viewed'
import { useUI } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, BookOpen, ListChecks, ArrowRight, Trash2, BookMarked } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RecentlyViewedList() {
  const items = useRecentlyViewed()
  const { setView } = useUI()

  if (items.length === 0) return null

  const open = (item: typeof items[number]) => {
    if (item.type === 'concept') setView({ name: 'concept', conceptId: item.id })
    else if (item.type === 'book-problem') setView({ name: 'book-problem', problemId: item.id })
    else setView({ name: 'exercise', exerciseId: item.id })
  }

  return (
    <Card className="border-border/60">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Clock className="h-4 w-4 text-teal-600" /> Visto recientemente
          </h2>
          <Button variant="ghost" size="sm" onClick={clearRecentlyViewed} className="h-7 text-xs text-muted-foreground">
            <Trash2 className="mr-1 h-3 w-3" /> Limpiar
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => open(item)}
              className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs transition-all hover:border-teal-400 hover:bg-teal-50/30 dark:hover:bg-teal-950/20"
            >
              {item.type === 'concept'
                ? <BookOpen className="h-3.5 w-3.5 text-teal-500" />
                : item.type === 'book-problem'
                  ? <BookMarked className="h-3.5 w-3.5 text-violet-500" />
                  : <ListChecks className="h-3.5 w-3.5 text-sky-500" />}
              <span className="max-w-[180px] truncate font-medium">{item.title}</span>
              <span className="rounded bg-muted px-1 py-0.5 font-mono text-[9px] text-muted-foreground">{item.sectionId}</span>
              <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
