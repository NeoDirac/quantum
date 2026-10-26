'use client'

// Laboratorio interactivo: resuelve el MISMO problema que tise_solver,
// pero en el navegador y en milisegundos.
//  - Explorador del pozo: N, estados y las ψ calculadas en vivo
//  - La matriz H: estructura tridiagonal + ecuación de cada fila
//  - Convergencia: el error O(h²) medido en tu navegador
//  - Unidades: convertidor + el simulador del bug de unidades

import { useMemo, useState, useDeferredValue } from 'react'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { M } from '@/components/math'
import { cn } from '@/lib/utils'
import { BOHR_TO_ANGSTROM, HARTREE_TO_EV } from '@/data/tise-notes'

// ============================================================
// MOTOR (verificado: reproduce las energías de la corrida real
// de tise_solver a 1e-10 Hartree; ver test del paquete de estudio)
// ============================================================

const PIVMIN = 1e-300

// Cuenta autovalores < x de la tridiagonal (d, e) con la secuencia de Sturm (LDLᵀ)
function sturmCount(d: number[], e: number[], x: number): number {
  const n = d.length
  let count = 0
  let q = d[0] - x
  if (q < 0) count++
  for (let i = 1; i < n; i++) {
    if (q === 0) q = -PIVMIN
    q = d[i] - x - (e[i - 1] * e[i - 1]) / q
    if (q < 0) count++
  }
  return count
}

function gershgorin(d: number[], e: number[]): [number, number] {
  const n = d.length
  let lo = Infinity
  let hi = -Infinity
  for (let i = 0; i < n; i++) {
    const r = (i > 0 ? Math.abs(e[i - 1]) : 0) + (i < n - 1 ? Math.abs(e[i]) : 0)
    lo = Math.min(lo, d[i] - r)
    hi = Math.max(hi, d[i] + r)
  }
  return [lo, hi]
}

// k-ésimo autovalor (base 0) por bisección: O(N) por evaluación de Sturm
function tridiagEigenvalue(d: number[], e: number[], k: number): number {
  const [gl, gu] = gershgorin(d, e)
  let lo = gl - 1e-8 * Math.max(1, Math.abs(gl))
  let hi = gu + 1e-8 * Math.max(1, Math.abs(gu))
  const scale = Math.max(1, Math.abs(lo), Math.abs(hi))
  for (let iter = 0; iter < 100; iter++) {
    const mid = 0.5 * (lo + hi)
    if (hi - lo < 1e-15 * scale) break
    if (sturmCount(d, e, mid) >= k + 1) hi = mid
    else lo = mid
  }
  return hi
}

// Resuelve (T − xI) z = b vía LDLᵀ con guarda de pivote
function ldltSolve(d: number[], e: number[], x: number, b: number[]): number[] {
  const n = d.length
  const piv = new Array<number>(n)
  const z1 = new Array<number>(n)
  let p = d[0] - x
  if (Math.abs(p) < PIVMIN) p = -PIVMIN
  piv[0] = p
  z1[0] = b[0]
  for (let i = 1; i < n; i++) {
    const l = e[i - 1] / piv[i - 1]
    p = d[i] - x - l * e[i - 1]
    if (Math.abs(p) < PIVMIN) p = -PIVMIN
    piv[i] = p
    z1[i] = b[i] - l * z1[i - 1]
  }
  const z = new Array<number>(n)
  z[n - 1] = z1[n - 1] / piv[n - 1]
  for (let i = n - 2; i >= 0; i--) {
    const l = e[i] / piv[i]
    z[i] = z1[i] / piv[i] - l * z[i + 1]
  }
  return z
}

function norm2(v: number[]): number {
  let s = 0
  for (let i = 0; i < v.length; i++) s += v[i] * v[i]
  return Math.sqrt(s)
}

// Autovalor k + autovector por iteración inversa
function tridiagEigPair(d: number[], e: number[], k: number, prevVec?: number[]): { value: number; vector: number[] } {
  const n = d.length
  const lam = tridiagEigenvalue(d, e, k)
  const scale = Math.max(1e-12, Math.abs(lam))
  const shift = lam + 1e-13 * scale
  let best: number[] | null = null
  let bestRes = Infinity
  for (let attempt = 0; attempt < 4; attempt++) {
    let s = 12345 + attempt * 99991 + k * 7919
    const rnd = () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff
      return s / 0x3fffffff - 1
    }
    let b = new Array<number>(n)
    for (let i = 0; i < n; i++) b[i] = rnd()
    if (prevVec) {
      let dot = 0
      for (let i = 0; i < n; i++) dot += b[i] * prevVec[i]
      for (let i = 0; i < n; i++) b[i] -= dot * prevVec[i]
    }
    const b0 = norm2(b)
    for (let i = 0; i < n; i++) b[i] /= b0
    for (let it = 0; it < 3; it++) {
      const z = ldltSolve(d, e, shift, b)
      const zn = norm2(z)
      if (!isFinite(zn) || zn === 0) {
        b = null as unknown as number[]
        break
      }
      for (let i = 0; i < n; i++) b[i] = z[i] / zn
    }
    if (!b) continue
    if (prevVec) {
      let dot = 0
      for (let i = 0; i < n; i++) dot += b[i] * prevVec[i]
      for (let i = 0; i < n; i++) b[i] -= dot * prevVec[i]
    }
    const v = b
    let res = 0
    for (let i = 0; i < n; i++) {
      const r = (d[i] - lam) * v[i] + (i > 0 ? e[i - 1] * v[i - 1] : 0) + (i < n - 1 ? e[i] * v[i + 1] : 0)
      res += r * r
    }
    res = Math.sqrt(res)
    if (res < bestRes) {
      bestRes = res
      best = v
    }
    if (res < 1e-11 * scale) break
  }
  if (!best) throw new Error('iteración inversa falló para k=' + k)
  return { value: lam, vector: best }
}

function solveTridiagStates(d: number[], e: number[], numStates: number) {
  const out: { value: number; vector: number[] }[] = []
  for (let k = 0; k < numStates; k++) {
    out.push(tridiagEigPair(d, e, k, k > 0 ? out[k - 1].vector : undefined))
  }
  return out
}

// Jacobi denso (para matrices pequeñas; soporta esquinas periódicas)
function jacobiEigen(Ain: number[][], numStates: number) {
  const n = Ain.length
  const A = Ain.map((r) => r.slice())
  const V: number[][] = Array.from({ length: n }, (_, i) => {
    const row = new Array<number>(n).fill(0)
    row[i] = 1
    return row
  })
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0
    for (let i = 0; i < n - 1; i++) for (let j = i + 1; j < n; j++) off += A[i][j] * A[i][j]
    if (off < 1e-22) break
    for (let p = 0; p < n - 1; p++) {
      for (let q = p + 1; q < n; q++) {
        const apq = A[p][q]
        if (Math.abs(apq) < 1e-14) continue
        const theta = (A[q][q] - A[p][p]) / (2 * apq)
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1))
        const c = 1 / Math.sqrt(t * t + 1)
        const s = t * c
        for (let i = 0; i < n; i++) {
          const aip = A[i][p]
          const aiq = A[i][q]
          A[i][p] = c * aip - s * aiq
          A[i][q] = s * aip + c * aiq
        }
        for (let i = 0; i < n; i++) {
          const api = A[p][i]
          const aqi = A[q][i]
          A[p][i] = c * api - s * aqi
          A[q][i] = s * api + c * aqi
        }
        for (let i = 0; i < n; i++) {
          const vip = V[i][p]
          const viq = V[i][q]
          V[i][p] = c * vip - s * viq
          V[i][q] = s * vip + c * viq
        }
      }
    }
  }
  const pairs = Array.from({ length: n }, (_, i) => ({ value: A[i][i], vector: V.map((r) => r[i]) }))
  pairs.sort((a, b) => a.value - b.value)
  return pairs.slice(0, numStates)
}

// ============================================================
// POTENCIAL Y MALLA (los mismos del paquete, centrados en 0:
// invariancia traslacional → mismas energías)
// ============================================================

const L_BOX = 2000 // Bohr (como Vsoft.pickle: N·h = 40000·0.05)
const softCoulomb = (x: number) => -1 / Math.sqrt(x * x + 1)

function buildTridiag(N: number) {
  const h = L_BOX / N
  const d = new Array<number>(N)
  const e = new Array<number>(N - 1).fill(-0.5 / (h * h))
  for (let i = 0; i < N; i++) {
    const x = -L_BOX / 2 + h * i
    d[i] = 1 / (h * h) + softCoulomb(x)
  }
  return { d, e, h }
}

type Solution = { energies: number[]; vecs: number[][]; h: number }

// El equivalente exacto de TISESolver.solve: construir H, diagonalizar,
// normalizar con Σψ²h = 1
function solveStates(N: number, numStates: number): Solution {
  const { d, e, h } = buildTridiag(N)
  const pairs = solveTridiagStates(d, e, numStates)
  const vecs = pairs.map((p) => {
    const s = p.vector.reduce((a, z) => a + z * z, 0) * h
    const f = 1 / Math.sqrt(s)
    return p.vector.map((z) => z * f)
  })
  return { energies: pairs.map((p) => p.value), vecs, h }
}

let _refE0: number | null = null
function referenceE0(): number {
  if (_refE0 === null) {
    const { d, e } = buildTridiag(128000)
    _refE0 = tridiagEigenvalue(d, e, 0)
  }
  return _refE0
}

const TAB10 = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b']
const N_LIST = [200, 400, 600, 800, 1200, 2000, 3000, 4000, 6000, 8000, 12000, 20000]

function samplePath(xs: number[], ys: number[], maxPts: number): string {
  const step = Math.max(1, Math.ceil(xs.length / maxPts))
  const pts: string[] = []
  for (let i = 0; i < xs.length; i += step) pts.push(`${xs[i].toFixed(4)},${ys[i].toFixed(4)}`)
  const last = xs.length - 1
  if ((xs.length - 1) % step !== 0) pts.push(`${xs[last].toFixed(4)},${ys[last].toFixed(4)}`)
  return pts.join(' ')
}

// ============================================================
// DEMO 1: Explorador del pozo
// ============================================================
export function PozoExplorer() {
  const [nIdx, setNIdx] = useState(7) // N = 4000
  const [numStates, setNumStates] = useState(5)
  const [showGrid, setShowGrid] = useState(false)
  const deferredIdx = useDeferredValue(nIdx)

  const sol = useMemo(() => solveStates(N_LIST[deferredIdx], numStates), [deferredIdx, numStates])
  const N = N_LIST[nIdx]
  const hBohr = L_BOX / N
  const ref = referenceE0()
  const errE0 = Math.abs(sol.energies[0] - ref)

  // Geometría del gráfico (en eV y Å, como la figura de matplotlib)
  const W = 640
  const H = 380
  const pad = { l: 56, r: 16, t: 14, b: 34 }
  const vw = W - pad.l - pad.r
  const vh = H - pad.t - pad.b
  const xMinA = (-L_BOX / 2) * BOHR_TO_ANGSTROM
  const xMaxA = (L_BOX / 2) * BOHR_TO_ANGSTROM
  const yLow = -1 * HARTREE_TO_EV
  const yHighEv = sol.energies[numStates - 1] * HARTREE_TO_EV
  const ySpan = yHighEv - yLow
  let maxPsi = 0
  for (const vec of sol.vecs) for (const z of vec) maxPsi = Math.max(maxPsi, Math.abs(z))
  const psiScale = (0.25 * ySpan) / maxPsi
  const top = Math.max(
    yHighEv + 0.3 * ySpan,
    Math.max(...sol.energies.map((E) => E * HARTREE_TO_EV + psiScale * maxPsi)) + 0.05 * ySpan
  )
  const sx = (xBohr: number) => pad.l + ((xBohr * BOHR_TO_ANGSTROM - xMinA) / (xMaxA - xMinA)) * vw
  const sy = (yEv: number) => pad.t + vh - ((yEv - (yLow - 0.08 * ySpan)) / (top - (yLow - 0.08 * ySpan))) * vh

  // Curva de V (muestreada) y puntos de malla
  const vCurve = useMemo(() => {
    const xs: number[] = []
    const ys: number[] = []
    for (let i = 0; i <= 900; i++) {
      const x = -L_BOX / 2 + (L_BOX * i) / 900
      xs.push(x)
      ys.push(softCoulomb(x) * HARTREE_TO_EV)
    }
    return samplePath(xs, ys, 900)
  }, [])
  const gridDots = (() => {
    if (!showGrid || N > 300) return ''
    const pts: string[] = []
    for (let i = 0; i < N; i++) {
      const x = -L_BOX / 2 + hBohr * i
      pts.push(`${sx(x).toFixed(1)},${(pad.t + vh - 3).toFixed(1)}`)
    }
    return pts.join(' ')
  })()

  const psiPaths = sol.vecs.map((vec, n) => {
    const xs: number[] = []
    const ys: number[] = []
    const step = Math.max(1, Math.ceil(N_LIST[deferredIdx] / 1000))
    for (let i = 0; i < N_LIST[deferredIdx]; i += step) {
      const x = -L_BOX / 2 + sol.h * i
      xs.push(x)
      ys.push(sol.energies[n] * HARTREE_TO_EV + psiScale * vec[i])
    }
    return samplePath(xs, ys, 1000)
  })

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <Card>
          <CardContent className="p-4">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Potencial y autofunciones">
              <rect x={pad.l} y={pad.t} width={vw} height={vh} fill="none" className="stroke-border" strokeWidth={1} />
              <line x1={pad.l} y1={sy(0)} x2={pad.l + vw} y2={sy(0)} className="stroke-muted-foreground/40" strokeDasharray="3 4" strokeWidth={1} />
              {showGrid && gridDots && <polyline points={gridDots} fill="none" className="stroke-muted-foreground" strokeWidth={2} strokeDasharray="1 5" strokeLinecap="round" />}
              <polyline points={vCurve} fill="none" stroke="currentColor" className="text-foreground" strokeWidth={1.6} />
              {Array.from({ length: numStates }, (_, n) => (
                <g key={n}>
                  <line
                    x1={pad.l}
                    y1={sy(sol.energies[n] * HARTREE_TO_EV)}
                    x2={pad.l + vw}
                    y2={sy(sol.energies[n] * HARTREE_TO_EV)}
                    stroke={TAB10[n]}
                    strokeDasharray="5 4"
                    strokeWidth={1}
                    opacity={0.55}
                  />
                  <polyline points={psiPaths[n]} fill="none" stroke={TAB10[n]} strokeWidth={1.6} />
                </g>
              ))}
              <text x={pad.l + vw / 2} y={H - 10} textAnchor="middle" fontSize={11} className="fill-muted-foreground">
                x (Å) — pozo centrado en 0 (invariancia traslacional: tu corrida lo tenía en 529 Å)
              </text>
              <text x={12} y={pad.t + vh / 2} textAnchor="middle" fontSize={11} className="fill-muted-foreground" transform={`rotate(-90 12 ${pad.t + vh / 2})`}>
                Energía (eV)
              </text>
              <text x={pad.l + 6} y={sy(-27.211) - 5} fontSize={10} className="fill-muted-foreground">
                fondo V = −27.21 eV (−1 Hartree)
              </text>
            </svg>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">V(x)</span>
              {Array.from({ length: numStates }, (_, n) => (
                <span key={n} className="flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: TAB10[n] }} />
                  n={n}: E = {(sol.energies[n] * HARTREE_TO_EV).toFixed(6)} eV
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-4 p-4">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">Malla N</span>
                  <Badge variant="secondary" className="tabular-nums">{N} puntos</Badge>
                </div>
                <Slider value={[nIdx]} min={0} max={N_LIST.length - 1} step={1} onValueChange={(v) => setNIdx(v[0])} />
                <div className="mt-1 text-xs text-muted-foreground tabular-nums">
                  h = {hBohr} Bohr = {(hBohr * BOHR_TO_ANGSTROM).toFixed(4)} Å · matriz {N}×{N}
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">Estados</span>
                  <Badge variant="secondary" className="tabular-nums">{numStates}</Badge>
                </div>
                <Slider value={[numStates]} min={1} max={6} step={1} onValueChange={(v) => setNumStates(v[0])} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="grid-dots" className="text-sm">Ver puntos de la malla</Label>
                <Switch id="grid-dots" checked={showGrid} onCheckedChange={setShowGrid} />
              </div>
              {showGrid && N > 300 && (
                <p className="text-xs text-muted-foreground">Con N &gt; 300 los puntos se amontonan; baja N para verlos.</p>
              )}
              <Button variant="outline" size="sm" className="w-full" onClick={() => { setNIdx(N_LIST.indexOf(20000)); setNumStates(5) }}>
                Tu corrida real: N = 20000, h = 0.1
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-xs space-y-1.5">
              <div className="flex justify-between"><span className="text-muted-foreground">E₀ (Hartree)</span><span className="tabular-nums font-medium">{sol.energies[0].toFixed(9)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">E₀ (eV)</span><span className="tabular-nums font-medium">{(sol.energies[0] * HARTREE_TO_EV).toFixed(8)} eV</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">‖E₀ − E₀(ref N=128000)‖</span><span className="tabular-nums font-medium">{errE0.toExponential(2)} Ha</span></div>
              <p className="pt-1 text-muted-foreground">
                Esto lo acaba de calcular <strong>tu navegador</strong> en milisegundos: misma matriz que tu Python resolvió en ~5 min
                (aquí se explota que H es tridiagonal: bisección de Sturm + iteración inversa, <M>{`O(Nk)`}</M> en vez de <M>{`O(N^3)`}</M>).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// DEMO 2: La matriz H (estructura tridiagonal)
// ============================================================
export function MatrizH() {
  const [nMat, setNMat] = useState(14)
  const [periodic, setPeriodic] = useState(false)
  const [row, setRow] = useState(7)
  const [showNums, setShowNums] = useState(true)

  const Lm = 10 // caja chica: la ψ SÍ toca los bordes (para que las esquinas se note en E₀)
  const hm = Lm / nMat
  const diag = Array.from({ length: nMat }, (_, i) => 1 / (hm * hm) + softCoulomb(-Lm / 2 + hm * i))
  const off = -0.5 / (hm * hm)

  // E₀ con y sin esquinas (Jacobi denso, N pequeño → instantáneo)
  const e0Pair = (() => {
    const build = (per: boolean) => {
      const A = Array.from({ length: nMat }, () => new Array<number>(nMat).fill(0))
      for (let i = 0; i < nMat; i++) {
        A[i][i] = diag[i]
        if (i > 0) A[i][i - 1] = off
        if (i < nMat - 1) A[i][i + 1] = off
      }
      if (per) {
        A[0][nMat - 1] = off
        A[nMat - 1][0] = off
      }
      return jacobiEigen(A, 1)[0].value
    }
    return { np0: build(false), p0: build(true) }
  })()

  const cell = 30
  const size = nMat * cell
  const filled = 3 * nMat - 2 + (periodic ? 2 : 0)

  return (
    <div className="grid gap-4 lg:grid-cols-[auto_1fr]">
      <Card>
        <CardContent className="p-4">
          <svg viewBox={`-6 -6 ${size + 12} ${size + 12}`} className="w-full max-w-[380px]" role="img" aria-label="Estructura de la matriz H">
            {Array.from({ length: nMat }, (_, i) =>
              Array.from({ length: nMat }, (_, j) => {
                const isDiag = i === j
                const isOff = Math.abs(i - j) === 1
                const isCorner = periodic && ((i === 0 && j === nMat - 1) || (i === nMat - 1 && j === 0))
                const fill = isCorner ? '#e11d48' : isDiag ? '#0d9488' : isOff ? '#f59e0b' : 'transparent'
                const inRow = i === row || j === row
                return (
                  <rect
                    key={`${i}-${j}`}
                    x={j * cell}
                    y={i * cell}
                    width={cell - 2}
                    height={cell - 2}
                    rx={3}
                    fill={fill}
                    opacity={fill === 'transparent' ? 0 : inRow ? 1 : 0.85}
                    stroke={fill === 'transparent' ? 'currentColor' : undefined}
                    className={fill === 'transparent' ? 'stroke-border/40' : undefined}
                    strokeOpacity={fill === 'transparent' ? 0.35 : undefined}
                    onClick={() => setRow(i)}
                    style={{ cursor: 'pointer' }}
                  />
                )
              })
            )}
            {showNums && nMat <= 12 && Array.from({ length: nMat }, (_, i) =>
              Array.from({ length: nMat }, (_, j) => {
                const v = Math.abs(i - j) === 1 ? off : i === j ? diag[i] : (periodic && ((i === 0 && j === nMat - 1) || (i === nMat - 1 && j === 0))) ? off : null
                if (v === null) return null
                return (
                  <text key={`t${i}-${j}`} x={j * cell + (cell - 2) / 2} y={i * cell + (cell - 2) / 2 + 3} textAnchor="middle" fontSize={7.5} fill="#fff" pointerEvents="none">
                    {v.toFixed(1)}
                  </text>
                )
              })
            )}
            {periodic && (
              <>
                <rect x={(nMat - 1) * cell} y={0} width={cell - 2} height={cell - 2} rx={3} fill="none" stroke="#e11d48" strokeWidth={2.5} />
                <rect x={0} y={(nMat - 1) * cell} width={cell - 2} height={cell - 2} rx={3} fill="none" stroke="#e11d48" strokeWidth={2.5} />
              </>
            )}
          </svg>
          <p className="mt-2 text-xs text-muted-foreground">Clic en cualquier celda para seleccionar su fila.</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardContent className="space-y-4 p-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium">Tamaño de la matriz (N)</span>
                <Badge variant="secondary" className="tabular-nums">{nMat}×{nMat}</Badge>
              </div>
              <Slider value={[nMat]} min={8} max={26} step={1} onValueChange={(v) => setNMat(v[0])} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">Modo periódico (esquinas)</Label>
                <p className="text-xs text-muted-foreground">H[0,N−1] = H[N−1,0] = −1/(2h²)</p>
              </div>
              <Switch checked={periodic} onCheckedChange={setPeriodic} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Mostrar números (N ≤ 12)</Label>
              <Switch checked={showNums} onCheckedChange={setShowNums} />
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded" style={{ background: '#0d9488' }} /> diagonal: 1/h² + Vₙ</span>
              <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded" style={{ background: '#f59e0b' }} /> vecinos: −1/(2h²)</span>
              <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded" style={{ background: '#e11d48' }} /> esquinas (periódico)</span>
            </div>
            <p className="text-xs text-muted-foreground">
              De N² celdas, solo <strong>{filled}</strong> tienen un número (≈3N): el resto es cero. Esa dispersión es la huella
              dactilar del stencil de 3 puntos.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="text-sm font-medium">La fila {row} es una ecuación (el stencil en el punto x₍{row}₎):</div>
            <div className="rounded-md bg-muted/50 p-3 text-sm overflow-x-auto">
              ({off.toFixed(2)})·ψ₍{row - 1}₎ + ({diag[row].toFixed(2)})·ψ₍{row}₎{row + 1 <= nMat - 1 ? ` + (${off.toFixed(2)})·ψ₍${row + 1}₎` : ''} = E·ψ₍{row}₎
            </div>
            <p className="text-xs text-muted-foreground">
              Los números laterales son el acoplamiento con los vecinos (−1/2h²); el central es 1/h² + V₍{row}₎ (aquí la
              cinética {Math.abs(off * 2).toFixed(2)} más el potencial {diag[row].toFixed(2)}). N ecuaciones así, una por punto
              de la malla, son el sistema H·ψ = E·ψ.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="rounded-md border border-border p-2">
                <div className="text-muted-foreground">E₀ sin esquinas</div>
                <div className="font-medium tabular-nums">{e0Pair.np0.toFixed(6)} Ha</div>
              </div>
              <div className="rounded-md border border-border p-2">
                <div className="text-muted-foreground">E₀ con esquinas (periódico)</div>
                <div className="font-medium tabular-nums">{e0Pair.p0.toFixed(6)} Ha</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Con esta caja chica (L=10 Bohr) la ψ SÍ toca los bordes: por eso las esquinas cambian E₀. En tu caja real
              (L=2000 Bohr) la diferencia es 10⁻¹⁵: la ψ decae antes de llegar.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ============================================================
// DEMO 3: Convergencia O(h²)
// ============================================================
export function ConvergenciaLab() {
  const [rows, setRows] = useState<{ N: number; h: number; E0: number; err: number; ratio: number | null }[]>([])
  const [ran, setRan] = useState(false)

  const run = () => {
    const ref = referenceE0()
    const Ns = [500, 1000, 2000, 4000, 8000, 16000]
    const data: { N: number; h: number; E0: number; err: number; ratio: number | null }[] = []
    let prevErr: number | null = null
    for (const Nn of Ns) {
      const { d, e, h } = buildTridiag(Nn)
      const E0 = tridiagEigenvalue(d, e, 0)
      const err = Math.abs(E0 - ref)
      const ratio = prevErr === null ? null : prevErr / err
      data.push({ N: Nn, h, E0, err, ratio })
      prevErr = err
    }
    setRows(data)
    setRan(true)
  }

  // Gráfico log-log del error
  const W = 560, H2 = 260
  const pad = { l: 52, r: 14, t: 12, b: 32 }
  const vw = W - pad.l - pad.r, vh = H2 - pad.t - pad.b
  const pts = rows.map((r) => ({ x: Math.log10(r.h), y: Math.log10(r.err) }))
  const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y)
  const xMin = Math.min(...xs, 0.02), xMax = Math.max(...xs)
  const yMin = Math.min(...ys, -5.2), yMax = Math.max(...ys)
  const sx = (x: number) => pad.l + ((x - xMin) / (xMax - xMin)) * vw
  const sy = (y: number) => pad.t + vh - ((y - yMin) / (yMax - yMin)) * vh
  // recta guía de pendiente +2 (error ∝ h²) anclada en el último punto
  const last = pts[pts.length - 1]
  const guide = last
    ? [
        [xMin, last.y + 2 * (xMin - last.x)] as [number, number],
        [xMax, last.y + 2 * (xMax - last.x)] as [number, number],
      ]
    : []

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={run} disabled={ran}>
          {ran ? 'Volver a correr el barrido' : 'Correr barrido de convergencia'}
        </Button>
        <span className="text-xs text-muted-foreground">
          Calcula E₀ para N = 500…16000 + referencia N=128000 — en tu navegador, en menos de 0.1 s.
        </span>
      </div>

      {ran && rows.length > 0 && (
        <div className="grid gap-4">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[520px] text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left">
                  <th className="px-3 py-2 font-medium">N</th>
                  <th className="px-3 py-2 font-medium">h (Bohr)</th>
                  <th className="px-3 py-2 font-medium">E₀ (eV)</th>
                  <th className="px-3 py-2 font-medium">|E₀ − E₀ref| (eV)</th>
                  <th className="px-3 py-2 font-medium">ΔE anterior / ΔE</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {rows.map((r, i) => (
                  <tr key={r.N} className="border-b border-border/60 last:border-0">
                    <td className="px-3 py-1.5 font-medium">{r.N}</td>
                    <td className="px-3 py-1.5">{r.h.toFixed(3)}</td>
                    <td className="px-3 py-1.5">{(r.E0 * HARTREE_TO_EV).toFixed(6)}</td>
                    <td className="px-3 py-1.5">{(r.err * HARTREE_TO_EV).toExponential(2)}</td>
                    <td className="px-3 py-1.5">
                      {r.ratio !== null ? (
                        <Badge variant={r.ratio > 3.3 ? 'default' : 'secondary'} className="tabular-nums">
                          ×{r.ratio.toFixed(2)} {r.ratio > 3.3 ? '≈ 4 ✓' : '(aún no asintótico)'}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Card>
            <CardContent className="p-4">
              <svg viewBox={`0 0 ${W} ${H2}`} className="w-full max-w-[560px]" role="img" aria-label="Error vs paso de malla">
                <rect x={pad.l} y={pad.t} width={vw} height={vh} fill="none" className="stroke-border" strokeWidth={1} />
                {guide.length === 2 && (
                  <line x1={sx(guide[0][0])} y1={sy(guide[0][1])} x2={sx(guide[1][0])} y2={sy(guide[1][1])} className="stroke-muted-foreground" strokeDasharray="6 4" strokeWidth={1.2} />
                )}
                {pts.map((p, i) => (
                  <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={4} fill={TAB10[i % TAB10.length]} />
                ))}
                <text x={pad.l + vw / 2} y={H2 - 8} textAnchor="middle" fontSize={11} className="fill-muted-foreground">log₁₀(h) →</text>
                <text x={13} y={pad.t + vh / 2} textAnchor="middle" fontSize={11} className="fill-muted-foreground" transform={`rotate(-90 13 ${pad.t + vh / 2})`}>log₁₀(error)</text>
                {guide.length === 2 && (
                  <text x={sx(xMin + 0.12 * (xMax - xMin))} y={sy(last.y + 2 * (xMin + 0.12 * (xMax - xMin) - last.x)) - 10} fontSize={10} className="fill-muted-foreground">pendiente 2 ⇒ error ∝ h²</text>
                )}
              </svg>
              <p className="mt-1 text-xs text-muted-foreground">
                En la zona asintótica los puntos caen sobre la recta de pendiente 2 (error ∝ h²): duplicar N divide el error entre 4.
                A la derecha (malla gruesa, h ≫ ancho del pozo ≈ 1 Bohr) la malla ni “ve” el pozo: regla práctica, h ≪ escala del potencial.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {!ran && (
        <p className="text-sm text-muted-foreground">
          Esta demo reproduce numéricamente lo que verificaste con tus dos corridas (h=0.05 vs h=0.1 → diferencia ≈ 0.002 eV, cociente ×4 del error).
        </p>
      )}
    </div>
  )
}

// ============================================================
// DEMO 4: Unidades
// ============================================================
type Unit = 'Hartree' | 'eV' | 'Bohr' | 'Angstrom'

export function UnidadesLab() {
  const [val, setVal] = useState('1')
  const [from, setFrom] = useState<Unit>('Hartree')
  const [to, setTo] = useState<Unit>('eV')

  const converted = useMemo(() => {
    const v = parseFloat(val)
    if (!isFinite(v)) return null
    const energyU: Unit[] = ['Hartree', 'eV']
    const isEnergy = energyU.includes(from) && energyU.includes(to)
    const isLength = !energyU.includes(from) && !energyU.includes(to)
    if (!isEnergy && !isLength) return null
    if (isEnergy) {
      const hartree = from === 'Hartree' ? v : v / HARTREE_TO_EV
      return to === 'Hartree' ? hartree : hartree * HARTREE_TO_EV
    }
    const bohr = from === 'Bohr' ? v : v / BOHR_TO_ANGSTROM
    return to === 'Bohr' ? bohr : bohr * BOHR_TO_ANGSTROM
  }, [val, from, to])

  const wrongEV = [-0.41649984, -0.06080495, -0.03226613, -0.01580931, -0.01113157]
  const rightEV = [-18.22780701, -7.48265358, -4.12300337, -2.52300587, -1.72934454]

  // mini gráficas: el MISMO archivo interpretado de dos formas
  const mini = (depthEv: number, title: string, bad: boolean) => {
    const w = 300, hh = 190
    const p = { l: 40, r: 10, t: 22, b: 26 }
    const vw2 = w - p.l - p.r, vh2 = hh - p.t - p.b
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const x = -6 + (12 * i) / 200
      const vEv = (-1 / Math.sqrt(x * x + 1)) * depthEv // profundidad en la unidad que sea
      pts.push(`${(p.l + ((x + 6) / 12) * vw2).toFixed(1)},${(p.t + vh2 - ((vEv + depthEv) / (2 * depthEv)) * vh2).toFixed(1)}`)
    }
    return (
      <div className={cn('rounded-lg border p-3', bad ? 'border-rose-500/50 bg-rose-500/5' : 'border-emerald-500/50 bg-emerald-500/5')}>
        <div className={cn('mb-1 text-xs font-semibold', bad ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400')}>{title}</div>
        <svg viewBox={`0 0 ${w} ${hh}`} className="w-full" role="img" aria-label={title}>
          <rect x={p.l} y={p.t} width={vw2} height={vh2} fill="none" className="stroke-border" strokeWidth={1} />
          <line x1={p.l} y1={p.t + vh2 / 2} x2={p.l + vw2} y2={p.t + vh2 / 2} className="stroke-muted-foreground/40" strokeDasharray="3 3" />
          <polyline points={pts.join(' ')} fill="none" stroke="currentColor" className="text-foreground" strokeWidth={1.5} />
          <text x={p.l + vw2 / 2} y={hh - 8} textAnchor="middle" fontSize={9} className="fill-muted-foreground">x</text>
          <text x={11} y={p.t + vh2 / 2} textAnchor="middle" fontSize={9} className="fill-muted-foreground" transform={`rotate(-90 11 ${p.t + vh2 / 2})`}>V</text>
          <text x={p.l + 4} y={p.t + 12} fontSize={9} className="fill-muted-foreground">fondo: −{depthEv === HARTREE_TO_EV ? '27.2' : '1.0'} en el eje…</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="mb-3 text-sm font-medium">Convertidor Bohr ↔ Å y Hartree ↔ eV</div>
          <div className="flex flex-wrap items-end gap-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Valor</Label>
              <Input value={val} onChange={(e) => setVal(e.target.value)} inputMode="decimal" className="tabular-nums" />
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Desde</Label>
              <select value={from} onChange={(e) => setFrom(e.target.value as Unit)} className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm">
                <option>Hartree</option><option>eV</option><option>Bohr</option><option>Angstrom</option>
              </select>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Hacia</Label>
              <select value={to} onChange={(e) => setTo(e.target.value as Unit)} className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm">
                <option>eV</option><option>Hartree</option><option>Angstrom</option><option>Bohr</option>
              </select>
            </div>
            <div className="min-w-32 flex-1 rounded-md bg-muted/50 px-3 py-2 text-sm tabular-nums">
              {converted === null ? (
                <span className="text-muted-foreground">mezcla energía con longitud…</span>
              ) : (
                <strong>{converted.toPrecision(10).replace(/\.?0+$/, '')}</strong>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Prueba: 1 Hartree → eV = 27.2114 · 529 Å → Bohr = 1000 · −18.2278 eV → Hartree = −0.66986 (la E₀ de tu corrida).
          </p>
        </CardContent>
      </Card>

      <div>
        <div className="mb-3 text-sm font-medium">Simulador del bug: el MISMO archivo, dos interpretaciones</div>
        <div className="grid gap-4 md:grid-cols-2">
          {mini(1.0, '❌ Cargado con defaults (Å/eV): el −1.0 se lee como −1 eV', true)}
          {mini(HARTREE_TO_EV, '✅ Cargado con unit_v=\'Hartree\': el −1.0 son −27.2 eV', false)}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-3">
              <div className="text-xs font-semibold text-rose-600 dark:text-rose-400">Energías con el bug (tu primera corrida)</div>
              <ul className="mt-1.5 space-y-0.5 text-xs tabular-nums text-muted-foreground">
                {wrongEV.map((E, i) => <li key={i}>n={i}: {E} eV</li>)}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Energías correctas (unit_x=&apos;Bohr&apos;, unit_v=&apos;Hartree&apos;)</div>
              <ul className="mt-1.5 space-y-0.5 text-xs tabular-nums text-muted-foreground">
                {rightEV.map((E, i) => <li key={i}>n={i}: {E} eV</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 text-sm">
          <div className="font-medium">Las 3 pistas que delataban el bug (antes de calcular nada):</div>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>La gráfica mostraba fondo −1.0 sobre un eje rotulado “eV”: si de verdad fuera eV, debería verse −27.2.</li>
            <li>El pozo aparecía centrado en x = 1000 “Å”: pero 1000 eran Bohr → 529 Å. ¡Posición imposible para tu archivo!</li>
            <li>El espectro era demasiado “alto”: un pozo de −1 eV apenas atrapa 1-2 estados; el real tiene 5 ligados cómodos.</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
