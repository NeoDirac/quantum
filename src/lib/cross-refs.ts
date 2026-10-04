// ════════════════════════════════════════════════════════════════════════════
// PARSER DE REFERENCIAS CRUZADAS
// Detecta, dentro de un enunciado (EN literal + ES traducción + notas al pie),
// las menciones explícitas a ecuaciones, problemas, figuras y notas del libro:
//   «Equation 2.6», «Ecuación 2.6», «Equations 2.43 and 2.46»,
//   «Problem 2.1a», «Problema 2.6», «Figure 2.5», «footnote 22», …
// ════════════════════════════════════════════════════════════════════════════

import type { BookProblem } from '@/data/book-problems'

export interface ProblemRef {
  number: string   // '2.6'
  part?: string    // 'a' (de «Problem 2.1a» o «Problem 2.1(a)»)
}

export interface CrossRefs {
  equations: string[]      // ids de ecuación: ['2.6', '1.20']
  problems: ProblemRef[]   // problemas citados: [{number:'2.6'}]
  figures: string[]        // ids de figura: ['2.5']
  footnotes: number[]      // notas del texto: [22]
}

const NUM = '\\d{1,2}\\.\\d{1,3}'

// «Equation 2.6» / «Ecuación 2.6» / «Equations 2.43 and 2.46» / «Ecs. 2.4»
const EQ_RE = new RegExp(
  `\\b(?:equations?|ecuaciones?|ecuaci[oó]n|eqs?|ecs?)\\.?\\s+(${NUM}[a-z]?)` +
  `(?:\\s*[,;]\\s*|\\s+(?:and|y|e)\\s+(${NUM}[a-z]?))?`,
  'gi',
)

// «Problem 2.6» / «Problema 2.1(a)» / «Problems 2.12 and 2.13»
const PROB_RE = new RegExp(
  `\\b(?:problems?|problemas?)\\.?\\s+(${NUM})(?:\\(?([a-z])\\)?)?` +
  `(?:\\s+(?:and|y|e)\\s+(${NUM})(?:\\(?([a-z])\\)?)?)?`,
  'gi',
)

// «Figure 2.5» / «Figura 2.5»
const FIG_RE = new RegExp(`\\b(?:figures?|figuras?)\\.?\\s+(${NUM})`, 'gi')

// «footnote 22» / «nota 22 al pie»
const FOOTNOTE_RE = /\b(?:footnote|nota)\s+(\d{1,2})\s*(?:al\s+pie\b)?|\bfootnote\s+(\d{1,2})/gi

function normalizeEqId(raw: string): string {
  // «2.52» → '2.52' (sin cambios; los ids del dataset no llevan letra)
  return raw.trim()
}

function pushUnique(list: string[], v: string) {
  if (v && !list.includes(v)) list.push(v)
}

function eqNumber(id: string): number {
  const [maj, min] = id.split('.').map(Number)
  return maj * 1000 + min
}

export function findCrossRefs(problem: BookProblem): CrossRefs {
  const text = [
    problem.statementEn,
    problem.statementEs,
    ...problem.footnotes,
  ].join('\n')

  const equations: string[] = []
  const problems: ProblemRef[] = []
  const figures: string[] = []
  const footnotes: number[] = []

  // Ecuaciones
  let m: RegExpExecArray | null
  EQ_RE.lastIndex = 0
  while ((m = EQ_RE.exec(text)) !== null) {
    pushUnique(equations, normalizeEqId(m[1]))
    if (m[2]) pushUnique(equations, normalizeEqId(m[2]))
  }

  // Problemas
  PROB_RE.lastIndex = 0
  while ((m = PROB_RE.exec(text)) !== null) {
    const first = { number: m[1], part: m[2] || undefined }
    if (!problems.some((p) => p.number === first.number && p.part === first.part)) {
      problems.push(first)
    }
    if (m[3]) {
      const second = { number: m[3], part: m[4] || undefined }
      if (!problems.some((p) => p.number === second.number && p.part === second.part)) {
        problems.push(second)
      }
    }
  }

  // Figuras
  FIG_RE.lastIndex = 0
  while ((m = FIG_RE.exec(text)) !== null) {
    pushUnique(figures, m[1])
  }

  // Notas al pie del texto
  FOOTNOTE_RE.lastIndex = 0
  while ((m = FOOTNOTE_RE.exec(text)) !== null) {
    const n = parseInt(m[1] ?? m[2], 10)
    if (!footnotes.includes(n)) footnotes.push(n)
  }

  // Orden natural: 1.20 antes que 2.4 antes que 2.111
  equations.sort((a, b) => eqNumber(a) - eqNumber(b))
  figures.sort((a, b) => eqNumber(a) - eqNumber(b))

  return { equations, problems, figures, footnotes }
}

export function crossRefsCount(refs: CrossRefs): number {
  return refs.equations.length + refs.problems.length + refs.figures.length + refs.footnotes.length
}
