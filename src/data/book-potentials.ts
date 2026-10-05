// ════════════════════════════════════════════════════════════════════════════
// SISTEMA «POTENCIALES DEL LIBRO» — registro y metadatos (Griffiths Ch. 2)
// ════════════════════════════════════════════════════════════════════════════
// Los cinco potenciales que el profesor puede pedir resolver de principio a
// fin (§2.2–§2.6), cada uno con: montaje, derivación guiada paso a paso,
// resultados clave, MUCHAS pistas graduadas (con aplicación paso a paso),
// preguntas típicas de examen y errores comunes.
//
// Contenido pedagógico ORIGINAL de la plataforma; las ecuaciones son las
// estándar de la mecánica cuántica (conocimiento científico común).

import { PART_A_POTENTIALS } from './potentials/part-a'
import { PART_B_POTENTIALS } from './potentials/part-b'
import { PART_C_POTENTIALS } from './potentials/part-c'

export type {
  PotentialHintKind,
  PotentialStep,
  PotentialHint,
  PotentialKeyResult,
  PotentialExamQuestion,
  BookPotential,
} from './potentials/types'

import type { BookPotential, PotentialHintKind } from './potentials/types'

export const BOOK_POTENTIALS: BookPotential[] = [
  ...PART_A_POTENTIALS,
  ...PART_B_POTENTIALS,
  ...PART_C_POTENTIALS,
]

export function getBookPotential(id: string): BookPotential | undefined {
  return BOOK_POTENTIALS.find(p => p.id === id)
}

/** Total de pasos de aplicación de todos los potenciales (para estadísticas). */
export function totalPotentialAppSteps(p: BookPotential): number {
  return p.hints.reduce((s, h) => s + (h.application?.steps.length ?? 0), 0)
}

// Metadatos de cada clase de pista (paralelo a HINT_KIND_META de book-hints.ts,
// añadiendo la clase «interpretacion» exclusiva de los potenciales).
export const POTENTIAL_KIND_META: Record<PotentialHintKind, { label: string; description: string }> = {
  reconocimiento: {
    label: 'Reconocer el potencial',
    description: '¿Qué familia es? ¿Qué señales del enunciado la delatan?',
  },
  planteamiento: {
    label: 'Planteamiento',
    description: '¿Qué escribir primero? Regiones, condiciones de frontera, simetrías.',
  },
  tecnica: {
    label: 'Paso matemático clave',
    description: 'El movimiento algebraico donde uno suele atascarse.',
  },
  interpretacion: {
    label: 'Interpretación física',
    description: 'Qué significan el resultado y sus límites.',
  },
  verificacion: {
    label: 'Verificación',
    description: '¿Cómo comprobar que el resultado está bien?',
  },
}
