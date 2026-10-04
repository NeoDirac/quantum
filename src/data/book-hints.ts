// ════════════════════════════════════════════════════════════════════════════
// SISTEMA DE PISTAS GRADUADAS para los problemas del libro (Griffiths Ch. 2)
// ════════════════════════════════════════════════════════════════════════════
// Las PISTAS son contenido pedagógico ORIGINAL de la plataforma (filosofía:
// primero reconocer qué está pasando físicamente, luego cómo plantearlo).
// Las RESPUESTAS FINALES son transcripción del solucionario oficial de
// Griffiths (2.ª ed.), correlacionado con la 1.ª ed. mediante su propia
// cuadrícula de correspondencias — ver src/data/book-problems.ts.

import { PART_A } from './hints-parts/part-a'
import { PART_B } from './hints-parts/part-b'
import { PART_C } from './hints-parts/part-c'

export type { HintKind, HintItem, FinalAnswerItem, ProblemHintsEntry } from './hints-parts/types'

import type { HintKind, ProblemHintsEntry } from './hints-parts/types'

export const BOOK_HINTS: Record<string, ProblemHintsEntry> = {
  ...PART_A,
  ...PART_B,
  ...PART_C,
}

export function getBookHints(problemId: string): ProblemHintsEntry | undefined {
  return BOOK_HINTS[problemId]
}

// Metadatos visuales de cada peldaño de la escalera de pistas.
export const HINT_KIND_META: Record<HintKind, { label: string; description: string }> = {
  reconocimiento: {
    label: 'Reconocer el problema',
    description: '¿Qué familia de problema es? ¿Qué está pasando físicamente?',
  },
  planteamiento: {
    label: 'Planteamiento',
    description: '¿Qué escribir primero? Definiciones y condiciones.',
  },
  tecnica: {
    label: 'Paso matemático clave',
    description: 'El movimiento algebraico donde uno suele atascarse.',
  },
  verificacion: {
    label: 'Verificación',
    description: '¿Cómo comprobar que el resultado está bien?',
  },
}
