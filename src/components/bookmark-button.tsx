'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { apiGet, apiPost, getOrCreateStudentId } from '@/lib/student'
import { useToast } from '@/hooks/use-toast'

interface BookmarkButtonProps {
  itemType: 'concept' | 'exercise'
  itemId: string
  size?: 'sm' | 'md'
  className?: string
}

export function BookmarkButton({ itemType, itemId, size = 'md', className }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const studentId = getOrCreateStudentId()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const d = await apiGet(`/api/bookmarks?studentId=${encodeURIComponent(studentId)}&itemType=${itemType}`)
        if (mounted) {
          setBookmarked(d.bookmarks.some((b: any) => b.itemId === itemId))
          setLoading(false)
        }
      } catch {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [studentId, itemType, itemId])

  const toggle = async () => {
    setLoading(true)
    try {
      const d = await apiPost('/api/bookmarks', { studentId, itemType, itemId })
      setBookmarked(d.bookmarked)
      toast({
        title: d.bookmarked ? 'Añadido a favoritos' : 'Quitado de favoritos',
        description: d.bookmarked ? 'Lo verás en tu lista de favoritos.' : undefined,
      })
    } catch {
      toast({ title: 'No se pudo actualizar', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      title={bookmarked ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-all hover:brightness-105 disabled:opacity-50',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        bookmarked
          ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
          : 'border-border text-muted-foreground hover:bg-muted',
        className,
      )}
    >
      <Star className={cn('transition-all', size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4', bookmarked && 'fill-current')} />
      {size === 'md' && (bookmarked ? 'Favorito' : 'Marcar')}
    </button>
  )
}
