'use client'

// Botón de alternar tema (claro ↔ oscuro). Se oculta hasta estar hidratado
// para evitar un icono incorrecto durante SSR (el tema real solo se conoce
// en el cliente). El patrón useSyncExternalStore detecta la hidratación sin
// setState-in-effect (cascadas de render) y con referencias estables.

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const EMPTY_SUBSCRIBE = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // false durante SSR/primer render, true en el cliente tras hidratar.
  const mounted = useSyncExternalStore(
    EMPTY_SUBSCRIBE,
    () => true,
    () => false,
  )

  if (!mounted) {
    // Reserva el mismo espacio que el botón real (evita saltos de layout).
    return <Button variant="ghost" size="icon" className="h-9 w-9 opacity-0" aria-hidden tabIndex={-1} />
  }

  const isDark = resolvedTheme === 'dark'
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
