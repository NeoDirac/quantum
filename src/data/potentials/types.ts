// ════════════════════════════════════════════════════════════════════════════
// TIPOS del sistema «Potenciales del libro» (Griffiths Ch. 2, §2.2–§2.6)
// ════════════════════════════════════════════════════════════════════════════
// Reutiliza el sistema de pistas graduadas de los problemas del libro
// (hints-parts/types.ts) con una clase extra: «interpretacion» (significado
// físico). Cada potencial puede tener MUCHAS más de 4 pistas: la escalera
// completa de un potencial cubre reconocimiento → planteamiento → técnica →
// interpretación → verificación.
//
// Todo el texto pedagógico es ORIGINAL de la plataforma; solo se usan las
// ecuaciones estándar de la mecánica cuántica (conocimiento científico común).

import type { HintKind } from '../hints-parts/types'

/** Clases de pista para potenciales: las 4 de los problemas + interpretación física */
export type PotentialHintKind = HintKind | 'interpretacion'

/** Un paso revelable (de la derivación guiada o de la aplicación de una pista) */
export interface PotentialStep {
  /** Etiqueta corta del paso (p. ej. «Aplica la condición de frontera en x = 0») */
  title: string
  /** Explicación del paso (markdown ligero + LaTeX — mismo formato que BookMarkdown) */
  text: string
}

/** Una pista graduada de un potencial (puede haber muchas más de 4) */
export interface PotentialHint {
  /** Identificador único dentro del potencial (p. ej. 'pinf-3') */
  id: string
  kind: PotentialHintKind
  /** Etiqueta corta: lo que dice la pista antes de desplegarla */
  title: string
  /** El consejo: lo primero que se muestra al revelar la pista */
  text: string
  /** Aplicación de la pista a ESTE potencial, desplegable paso a paso */
  application?: {
    intro?: string
    steps: PotentialStep[]
  }
}

/** Un resultado clave del potencial (energías, autofunciones, valores esperados…) */
export interface PotentialKeyResult {
  label: string   // «Energías cuantizadas»
  latex: string   // 'E_n = ...'
  note?: string   // aclaración corta
}

/** Pregunta típica de examen sobre este potencial */
export interface PotentialExamQuestion {
  id: string
  q: string          // enunciado de la pregunta (español)
  hintIndex?: number // índice (0-based) de la pista que la ataca
}

/** Un potencial del capítulo 2, con derivación guiada completa */
export interface BookPotential {
  id: string            // 'pot-2-2'
  sectionId: string     // '2.2' — coincide con el sectionId de BOOK_PROBLEMS
  title: string         // «Pozo cuadrado infinito»
  tagline: string       // una línea: qué es físicamente
  difficulty: 1 | 2 | 3 // 1 = álgebra elemental · 3 = técnica exigente
  /** Forma del mini-gráfico SVG de V(x) en la lista */
  graphType: 'infinite-well' | 'harmonic' | 'free' | 'delta' | 'finite-well'
  /** Por qué importa este potencial y cuándo aparece en examen (markdown + LaTeX) */
  vignette: string
  /** El montaje: V(x), la EDE en cada región y las condiciones de frontera */
  setup: string[]
  /** La derivación guiada completa: el corazón del potencial */
  derivation: {
    intro: string
    steps: PotentialStep[]
  }
  keyResults: PotentialKeyResult[]
  /** MUCHAS pistas (típicamente 8–12 por potencial) */
  hints: PotentialHint[]
  examQuestions: PotentialExamQuestion[]
  commonMistakes: string[]
  /** Problemas del libro (bp-2-x) que ejercitan este potencial */
  relatedProblemIds: string[]
}
