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

// ─────────────────────────────────────────────────────────────────────────────
// ANCLAS DE MENCIONES: convierte «Equation 2.6» / «Ecuación 2.6» / «Problem
// 2.1(a)» / «Figure 2.5» / «footnote 22» del texto del enunciado (o de las
// pistas) en enlaces que apuntan a la tarjeta correspondiente de la sección
// «Referencias cruzadas del libro» (ids DOM: ref-eq-* / ref-prob-* / ref-fig-* /
// ref-fn-*). Solo se enlazan las menciones cuya tarjeta existe (targets).
// ─────────────────────────────────────────────────────────────────────────────

/** Conjunto de ids DOM de las tarjetas de referencia disponibles para un problema. */
export function getRefTargets(problem: BookProblem): Set<string> {
  const refs = findCrossRefs(problem)
  const targets = new Set<string>()
  for (const id of refs.equations) targets.add(`ref-eq-${id}`)
  for (const r of refs.problems) targets.add(`ref-prob-${r.number}${r.part ? `-${r.part}` : ''}`)
  for (const id of refs.figures) targets.add(`ref-fig-${id}`)
  for (const n of refs.footnotes) targets.add(`ref-fn-${n}`)
  return targets
}

export interface RefMention {
  label: string   // texto visible del enlace («Equation 2.6»)
  target: string  // id DOM de la tarjeta («ref-eq-2.6»)
}

export type RefToken = { text: string } | { mention: RefMention }

interface MentionRange {
  start: number
  end: number
  label: string
  target: string
}

/**
 * Divide `text` en fragmentos planos y menciones enlazables.
 * Solo produce menciones cuyo `target` está en `targets` (si se pasa);
 * si no hay ninguna, devuelve [] (el texto no necesita tratamiento).
 */
export function tokenizeRefMentions(text: string, targets?: Set<string>): RefToken[] {
  const ranges: MentionRange[] = []
  const add = (start: number, end: number, label: string, target: string) => {
    if (end > start && (!targets || targets.has(target))) {
      ranges.push({ start, end, label, target })
    }
  }

  let m: RegExpExecArray | null

  // Ecuaciones — «Equation 2.6» y, en plurales, la continuación «and 2.46»
  EQ_RE.lastIndex = 0
  while ((m = EQ_RE.exec(text)) !== null) {
    const off1 = m[0].indexOf(m[1])
    add(m.index, m.index + off1 + m[1].length, m[0].slice(0, off1 + m[1].length), `ref-eq-${m[1]}`)
    if (m[2]) {
      const off2 = m[0].lastIndexOf(m[2])
      add(m.index + off2, m.index + off2 + m[2].length, m[2], `ref-eq-${m[2]}`)
    }
  }

  // Problemas — «Problem 2.1(a)» / «Problemas 2.12 y 2.13»
  PROB_RE.lastIndex = 0
  while ((m = PROB_RE.exec(text)) !== null) {
    const off1 = m[0].indexOf(m[1])
    const after1 = m[0].slice(off1 + m[1].length)
    const pm1 = after1.match(/^\(?([a-z])\)?/)
    const len1 = m[1].length + (pm1 ? pm1[0].length : 0)
    add(m.index, m.index + off1 + len1, m[0].slice(0, off1 + len1), `ref-prob-${m[1]}${m[2] ? `-${m[2]}` : ''}`)
    if (m[3]) {
      const off2 = m[0].lastIndexOf(m[3])
      const after2 = m[0].slice(off2 + m[3].length)
      const pm2 = after2.match(/^\(?([a-z])\)?/)
      const len2 = m[3].length + (pm2 ? pm2[0].length : 0)
      add(m.index + off2, m.index + off2 + len2, m[0].slice(off2, off2 + len2), `ref-prob-${m[3]}${m[4] ? `-${m[4]}` : ''}`)
    }
  }

  // Figuras — «Figure 2.5»
  FIG_RE.lastIndex = 0
  while ((m = FIG_RE.exec(text)) !== null) {
    add(m.index, m.index + m[0].length, m[0], `ref-fig-${m[1]}`)
  }

  // Notas al pie — «footnote 22»
  FOOTNOTE_RE.lastIndex = 0
  while ((m = FOOTNOTE_RE.exec(text)) !== null) {
    add(m.index, m.index + m[0].length, m[0].trimEnd(), `ref-fn-${m[1] ?? m[2]}`)
  }

  if (ranges.length === 0) return []

  // Orden por posición; ante solapamiento gana la mención anterior.
  ranges.sort((a, b) => a.start - b.start || b.end - a.end)
  const tokens: RefToken[] = []
  let cursor = 0
  for (const r of ranges) {
    if (r.start < cursor) continue
    if (r.start > cursor) tokens.push({ text: text.slice(cursor, r.start) })
    tokens.push({ mention: { label: r.label, target: r.target } })
    cursor = r.end
  }
  if (cursor < text.length) tokens.push({ text: text.slice(cursor) })
  return tokens
}
