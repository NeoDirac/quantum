// Content type system for the Quantum Mechanics study platform.
// All pedagogical content is written originally for this platform.
// The structure mirrors the organization of Griffiths Ch.2 (organizational fact);
// explanations, examples, and exercises are original.

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'math'; tex: string }
  | { kind: 'math-block'; tex: string }
  | { kind: 'callout'; tone: 'info' | 'warn' | 'key' | 'griffiths'; title?: string; blocks: Block[] }
  | { kind: 'steps'; items: Block[][] }
  | { kind: 'list'; items: Block[][]; ordered?: boolean }
  | { kind: 'eq-row'; label?: string; tex: string }
  | { kind: 'kv'; pairs: { k: Block[]; v: Block[] }[] }

export type ErrorType =
  | 'conceptual'
  | 'physical-interpretation'
  | 'wrong-equation'
  | 'boundary'
  | 'algebraic'
  | 'calc'
  | 'quantity-confusion'
  | 'reasoning-correct-conclusion-wrong'

export const ERROR_TYPE_LABELS: Record<ErrorType, string> = {
  'conceptual': 'Error conceptual',
  'physical-interpretation': 'Error de interpretación física',
  'wrong-equation': 'Elección incorrecta de ecuación',
  'boundary': 'Condición de frontera incorrecta',
  'algebraic': 'Error algebraico',
  'calc': 'Error de cálculo',
  'quantity-confusion': 'Confusión entre magnitudes',
  'reasoning-correct-conclusion-wrong': 'Razonamiento correcto, conclusión incorrecta',
}

export type Star = 0 | 1 | 2 | 3

export interface CheckQuestion {
  id: string
  question: Block[]
  options: { id: string; text: Block[] }[]
  correctId: string
  explanation: Block[]
  conceptId?: string
}

export interface Concept {
  id: string
  chapterId: string
  sectionId: string
  title: string
  subtitle: string
  order: number
  tags: string[]
  // 5 layers
  layer1Intuition: Block[]
  layer2Math: Block[]
  layer3Interpretation: Block[]
  layer4Griffiths: Block[]
  layer5Check: CheckQuestion[]
  related: string[]
  prerequisites: string[]
}

export interface GuidedQuestion {
  id: string
  question: Block[]
  // acceptable short answers (free text, matched loosely, lowercased contains)
  accept: string[]
  // why this question matters
  why: Block[]
  // explanation shown after answering
  reveal: Block[]
}

export interface Hint {
  // one level of hint (5 progressive levels)
  blocks: Block[]
}

export interface SolutionStep {
  id: string
  label: string
  what: Block[]
  why: Block[]
  meaning: Block[]
  info: Block[]
  whatIf: Block[]
  math: Block[]
}

export interface Variation {
  id: string
  title: string
  change: Block[]
  question: Block[]
  whatChangesPhysically: Block[]
}

export interface CommonError {
  id: string
  type: ErrorType
  signature: Block[]
  explanation: Block[]
}

export type ExerciseType =
  | 'conceptual'
  | 'computation'
  | 'identify-potential'
  | 'boundary-condition'
  | 'graph-interpretation'
  | 'griffiths-style'
  | 'novel'
  | 'method-choice'

export interface Exercise {
  id: string
  sectionId: string
  conceptIds: string[]
  title: string
  difficulty: Star
  type: ExerciseType
  statement: Block[]
  guided: GuidedQuestion[]
  hints: Hint[]
  steps: SolutionStep[]
  finalAnswer?: Block[]
  variations?: Variation[]
  commonErrors?: CommonError[]
}

export interface ModelProblem {
  id: string
  sectionId: string
  title: string
  potential: string
  regime: 'bound' | 'scattering' | 'both'
  goal: Block[]          // "Objetivo"
  given: Block[]         // "Información que tenemos"
  find: Block[]          // "Qué quiere encontrar"
  methodWhy: Block[]     // "Por qué escoge este método"
  equations: Block[]     // "Qué ecuación utiliza"
  conditions: Block[]    // "Qué condiciones impone"
  result: Block[]        // "Qué obtiene"
  meaning: Block[]       // "Qué significa físicamente"
  generalize: Block[]    // "Qué podemos generalizar"
}

export interface DecisionNode {
  id: string
  question: string
  why: Block[]
  branches: { label: string; goto: string; note?: Block[] }[]
  // if terminal, what to do
  terminal?: { action: Block[]; why: Block[] }
}

export interface Section {
  id: string            // "2.1"
  chapterId: string
  title: string
  subtitle: string
  order: number
  summary: Block[]
}

export interface Chapter {
  id: string           // "ch2"
  number: number
  title: string
  subtitle: string
  active: boolean
}
