'use client'

// Proveedor de tema (claro/oscuro) basado en next-themes. El atributo «class»
// activa la variante `dark` de Tailwind definida en globals.css. Por defecto
// sigue la preferencia del sistema; la elección del usuario se persiste en
// localStorage (clave «theme») y se aplica antes de la hidratación para evitar
// el parpadeo inicial.

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
