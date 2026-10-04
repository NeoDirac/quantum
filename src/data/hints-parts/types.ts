// Tipos compartidos del sistema de pistas para los problemas del libro
export type HintKind = 'reconocimiento' | 'planteamiento' | 'tecnica' | 'verificacion'

export interface HintStep {
  /** Etiqueta corta del paso (p. ej. «Escribe la densidad de probabilidad») */
  title: string
  /** Explicación del paso aplicada AL problema concreto (markdown ligero + LaTeX) */
  text: string
}

export interface HintApplication {
  /** Frase puente que conecta el consejo genérico con su aplicación concreta */
  intro?: string
  /** Pasos revelados de uno en uno en la UI */
  steps: HintStep[]
}

export interface HintItem {
  kind: HintKind
  /** El consejo genérico: lo primero que se muestra */
  text: string
  /** Aplicación del consejo a ESTE ejercicio, desplegable paso a paso */
  application?: HintApplication
}

export interface FinalAnswerItem {
  answer: string   // resultado final, markdown ligero + LaTeX
  page: number     // página del solucionario donde aparece el resultado
  note?: string    // aclaración opcional
}

export interface ProblemHintsEntry {
  hints: HintItem[]
  finalAnswer?: FinalAnswerItem
}
