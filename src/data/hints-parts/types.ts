// Tipos compartidos del sistema de pistas para los problemas del libro
export type HintKind = 'reconocimiento' | 'planteamiento' | 'tecnica' | 'verificacion'

export interface HintItem {
  kind: HintKind
  text: string
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
