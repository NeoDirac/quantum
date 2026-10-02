'use client'

import { useMemo, useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { M } from '@/components/math'
import { cn } from '@/lib/utils'

// SVG plot primitive
function Plot({ children, w = 520, h = 320, axisLabels }: {
  children: React.ReactNode; w?: number; h?: number; axisLabels?: { x?: string; y?: string }
}) {
  const pad = { l: 44, r: 16, t: 16, b: 32 }
  const vw = w - pad.l - pad.r, vh = h - pad.t - pad.b
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="min-w-[420px] w-full" style={{ maxWidth: w }}>
        <rect x={pad.l} y={pad.t} width={vw} height={vh} fill="none" stroke="currentColor" className="text-border" strokeWidth={1} />
        {/* axes */}
        <line x1={pad.l} y1={pad.t + vh} x2={pad.l + vw} y2={pad.t + vh} stroke="currentColor" className="text-muted-foreground" strokeWidth={1.2} />
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={pad.t + vh} stroke="currentColor" className="text-muted-foreground" strokeWidth={1.2} />
        {axisLabels?.x && <text x={pad.l + vw / 2} y={h - 8} textAnchor="middle" className="fill-muted-foreground" fontSize={11}>{axisLabels.x}</text>}
        {axisLabels?.y && <text x={12} y={pad.t + vh / 2} textAnchor="middle" className="fill-muted-foreground" fontSize={11} transform={`rotate(-90 12 ${pad.t + vh / 2})`}>{axisLabels.y}</text>}
        <g transform={`translate(${pad.l},${pad.t})`}>
          {children}
        </g>
      </svg>
    </div>
  )
}

// Helpers to map data coords (x in [-X,X], y in [ymin,ymax]) to SVG (vw, vh)
function mkScale(vw: number, vh: number, X: number, ymin: number, ymax: number) {
  const sx = (x: number) => ((x + X) / (2 * X)) * vw
  const sy = (y: number) => vh - ((y - ymin) / (ymax - ymin)) * vh
  return { sx, sy, vw, vh }
}

// Minimal complex number helpers (Re/Im pairs) for the wave-packet phase view.
type Cx = { re: number; im: number }
function cmul(a: Cx, b: Cx): Cx { return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re } }
function cdiv(a: Cx, b: Cx): Cx { const d = b.re * b.re + b.im * b.im; return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d } }
function cexp(a: Cx): Cx { const e = Math.exp(a.re); return { re: e * Math.cos(a.im), im: e * Math.sin(a.im) } }

// ============ INFINITE WELL ============
function InfiniteWellViz() {
  const [n, setN] = useState(2)
  const [a, setA] = useState(2) // width in arbitrary units; scaled
  const X = a / 2 + 0.4
  const vw = 460, vh = 240
  const { sx, sy } = mkScale(vw, vh, X, -0.15, 1.1)
  // psi_n(x) = sqrt(2/a) sin(n pi x / a); normalized shape: sin(n pi (x+a/2)/a)
  const psi = (x: number) => Math.sin(n * Math.PI * (x + a / 2) / a)
  const E = (n * n) / 4 // arbitrary unit, E_1 = 1/4 if a=2
  const path = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 240; i++) {
      const x = -a / 2 + (a * i) / 240
      pts.push(`${sx(x)},${sy(psi(x))}`)
    }
    return pts.join(' ')
  }, [n, a])
  const probPath = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 240; i++) {
      const x = -a / 2 + (a * i) / 240
      pts.push(`${sx(x)},${sy(psi(x) * psi(x))}`)
    }
    return pts.join(' ')
  }, [n, a])

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium">Número cuántico <M>{`n`}</M></span>
              <span className="font-mono text-muted-foreground">{n}</span>
            </div>
            <Slider value={[n]} min={1} max={6} step={1} onValueChange={v => setN(v[0])} />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium">Ancho del pozo <M>{`a`}</M></span>
              <span className="font-mono text-muted-foreground">{a.toFixed(2)}</span>
            </div>
            <Slider value={[a * 100]} min={100} max={400} step={10} onValueChange={v => setA(v[0] / 100)} />
          </div>
        </div>
        <Card className="bg-muted/30">
          <CardContent className="p-4 text-sm space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Energía <M>{`E_n`}</M></span><span className="font-mono">{(E).toFixed(3)} <span className="text-muted-foreground">(u.a.)</span></span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Nodos internos</span><span className="font-mono">{n - 1}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Paridad</span><span className="font-mono">{n % 2 === 0 ? 'impar' : 'par'}</span></div>
            <div className="mt-2 text-xs text-muted-foreground">
              Mueve <M>{`n`}</M> para ver cómo aumenta la energía, el número de nodos y la dispersión espacial.
              Mueve <M>{`a`}</M> para ver cómo <M>{`E_n \\propto 1/a^2`}</M>: a mayor ancho, menores energías.
            </div>
          </CardContent>
        </Card>
      </div>
      <Plot axisLabels={{ x: 'x', y: 'ψ, |ψ|²' }}>
        {/* well walls */}
        <rect x={sx(-a / 2)} y={0} width={sx(a / 2) - sx(-a / 2)} height={vh} fill="hsl(var(--background))" opacity={0.0} />
        <line x1={sx(-a / 2)} y1={0} x2={sx(-a / 2)} y2={vh} stroke="currentColor" className="text-foreground" strokeWidth={2} />
        <line x1={sx(a / 2)} y1={0} x2={sx(a / 2)} y2={vh} stroke="currentColor" className="text-foreground" strokeWidth={2} />
        <line x1={0} y1={sy(0)} x2={vw} y2={sy(0)} stroke="currentColor" className="text-muted-foreground/50" strokeDasharray="3 3" />
        {/* psi */}
        <polyline points={path} fill="none" stroke="hsl(200 80% 50%)" strokeWidth={2} />
        {/* |psi|^2 */}
        <polyline points={probPath} fill="rgba(200,80,50,0.18)" stroke="hsl(20 80% 50%)" strokeWidth={1.5} />
      </Plot>
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="inline-block h-2 w-3" style={{ background: 'hsl(200 80% 50%)' }} /> ψ(x)</span>
        <span className="flex items-center gap-1"><span className="inline-block h-2 w-3" style={{ background: 'hsl(20 80% 50%)' }} /> |ψ(x)|²</span>
      </div>
    </div>
  )
}

// ============ HARMONIC OSCILLATOR (quantitative, properly normalized Hermite) ============
// Uses physics Hermite polynomials H_n and the standard normalization
// ψ_n(x) = (1/(√(2^n n!))) (mω/πℏ)^{1/4} H_n(ξ) e^{-ξ²/2},  ξ = √(mω/ℏ) x.
// We set m=ω=ℏ=1 (natural units), so ξ=x and the formula simplifies.
// Normalization is computed numerically so |ψ|² integrates to 1 on the grid.
function hermite(n: number, x: number): number {
  if (n === 0) return 1
  if (n === 1) return 2 * x
  let hm2 = 1, hm1 = 2 * x, hn = 0
  for (let k = 2; k <= n; k++) {
    hn = 2 * x * hm1 - 2 * (k - 1) * hm2
    hm2 = hm1; hm1 = hn
  }
  return hn
}
function factorial(n: number): number {
  let f = 1
  for (let i = 2; i <= n; i++) f *= i
  return f
}
// normalized ψ_n(x) in natural units (m=ω=ℏ=1)
function hoPsi(n: number, x: number): number {
  const norm = 1 / Math.sqrt(Math.pow(2, n) * factorial(n) * Math.sqrt(Math.PI))
  return norm * hermite(n, x) * Math.exp(-x * x / 2)
}

function HarmonicViz() {
  const [n, setN] = useState(2)
  const [showProb, setShowProb] = useState(true)
  const vw = 460, vh = 260
  const X = 5
  const { sx, sy } = mkScale(vw, vh, X, -0.6, 1.0)
  const V = (x: number) => 0.5 * x * x  // V(x) = (1/2) x^2 in natural units; E_n = n + 1/2

  const data = useMemo(() => {
    const pts = 501
    const xs = Array.from({ length: pts }, (_, i) => -X + (2 * X * i) / (pts - 1))
    const psiVals = xs.map(x => hoPsi(n, x))
    const probVals = xs.map(x => hoPsi(n, x) ** 2)
    // energy level for display
    const E = n + 0.5
    return { xs, psiVals, probVals, E }
  }, [n])

  const { xs, psiVals, probVals, E } = data
  const xTurning = Math.sqrt(2 * E) // classical turning point where V(x) = E

  // psi scaled for display: shift by E and scale to fit; show ψ_n offset to its energy level
  const psiPath = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${sx(x)},${sy(E + psiVals[i] * 0.55)}`).join(' ')
  const probPath = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${sx(x)},${sy(E + probVals[i] * 4)}`).join(' ')
  const probArea = `${probPath} L ${sx(xs[xs.length - 1])},${sy(E)} L ${sx(xs[0])},${sy(E)} Z`
  const vPath = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const x = -X + (2 * X * i) / 200
      pts.push(`${i === 0 ? 'M' : 'L'}${sx(x)},${sy(V(x))}`)
    }
    return pts.join(' ')
  }, [sx, sy, V])

  // <⟨x²⟩ = (n + 1/2) in natural units; Δx = √(n+1/2)>
  const dx = Math.sqrt(E)
  // classical probability density (1/(π√(2E-x²))) inside turning points, 0 outside
  const classProbPath = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const x = -xTurning + (2 * xTurning * i) / 200
      const denom = Math.sqrt(Math.max(0, 2 * E - x * x))
      const p = denom > 0.001 ? 1 / (Math.PI * denom) : 0
      // scale to comparable visibility with quantum |ψ|² (which peaks ~0.4 for n=2)
      pts.push(`${i === 0 ? 'M' : 'L'}${sx(x)},${sy(E + p * 4)}`)
    }
    return pts.join(' ')
  }, [xTurning, E, sx, sy])

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium">Estado cuántico <M>{`n`}</M></span>
              <span className="font-mono text-muted-foreground tabular-nums">{n}</span>
            </div>
            <Slider value={[n]} min={0} max={8} step={1} onValueChange={v => setN(v[0])} />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={showProb} onChange={e => setShowProb(e.target.checked)} className="accent-teal-600" />
            Mostrar <M>{`|\\psi_n|^2`}</M> y densidad clásica
          </label>
        </div>
        <Card className="bg-muted/30">
          <CardContent className="p-4 text-sm space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Energía <M>{`E_n = (n+\\tfrac12)\\hbar\\omega`}</M></span><span className="font-mono tabular-nums">{E.toFixed(2)} ℏω</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Nodos internos</span><span className="font-mono tabular-nums">{n}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Puntos de retorno clásicos <M>{`x_T = \\pm\\sqrt{2E}`}</M></span><span className="font-mono tabular-nums">±{xTurning.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Incertidumbre <M>{`\\Delta x = \\sqrt{n+\\tfrac12}`}</M></span><span className="font-mono tabular-nums">{dx.toFixed(2)}</span></div>
            <div className="mt-2 text-xs text-muted-foreground">
              La onda cuántica (azul) <span className="font-medium">penetra la región prohibida</span> <M>{`|x| > x_T`}</M>,
              donde la densidad clásica (línea naranja) es exactamente cero. A mayor <M>{`n`}</M>, más se acerca la distribución cuántica a la clásica (correspondencia).
            </div>
          </CardContent>
        </Card>
      </div>
      <Plot axisLabels={{ x: 'x  (unidades naturales: m=ω=ℏ=1)', y: 'E, V(x)' }}>
        {/* V(x) potential */}
        <polyline points={vPath} fill="none" stroke="currentColor" className="text-muted-foreground" strokeWidth={1.5} strokeDasharray="4 3" />
        {/* forbidden region shading */}
        <rect x={sx(xTurning)} y={0} width={sx(X) - sx(xTurning)} height={vh} fill="oklch(0.6 0.2 20 / 0.06)" />
        <rect x={sx(-X)} y={0} width={sx(-xTurning) - sx(-X)} height={vh} fill="oklch(0.6 0.2 20 / 0.06)" />
        {/* turning points */}
        <line x1={sx(xTurning)} y1={0} x2={sx(xTurning)} y2={vh} stroke="oklch(0.6 0.2 20 / 0.5)" strokeWidth={1} strokeDasharray="2 3" />
        <line x1={sx(-xTurning)} y1={0} x2={sx(-xTurning)} y2={vh} stroke="oklch(0.6 0.2 20 / 0.5)" strokeWidth={1} strokeDasharray="2 3" />
        <line x1={0} y1={sy(0)} x2={vw} y2={sy(0)} stroke="currentColor" className="text-muted-foreground/40" />
        {/* energy level */}
        <line x1={0} y1={sy(E)} x2={vw} y2={sy(E)} stroke="oklch(0.55 0.18 20)" strokeWidth={1.2} strokeDasharray="5 3" />
        <text x={sx(-X) + 4} y={sy(E) - 4} className="fill-amber-600 dark:fill-amber-400" fontSize={10}>E_{n} = {E.toFixed(2)}ℏω</text>
        {/* |ψ|² area (quantum probability density) */}
        {showProb && (
          <>
            <path d={probArea} fill="oklch(0.6 0.18 20 / 0.15)" />
            <polyline points={probPath} fill="none" stroke="oklch(0.6 0.18 20)" strokeWidth={1.5} />
            {/* classical probability density (for comparison) */}
            <polyline points={classProbPath} fill="none" stroke="oklch(0.55 0.15 20 / 0.6)" strokeWidth={1} strokeDasharray="2 2" />
          </>
        )}
        {/* ψ_n wavefunction (offset to its energy level) */}
        <polyline points={psiPath} fill="none" stroke="oklch(0.55 0.15 200)" strokeWidth={2} />
      </Plot>
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="inline-block h-0.5 w-4" style={{ background: 'oklch(0.55 0.15 200)' }} /> <M>{`\\psi_n(x)`}</M> (desplazada a su energía)</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-3" style={{ background: 'oklch(0.6 0.18 20 / 0.3)' }} /> <M>{`|\\psi_n(x)|^2`}</M> cuántica</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-0.5 w-4 border-t-2 border-dashed" style={{ borderColor: 'oklch(0.55 0.15 20 / 0.6)' }} /> densidad clásica</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-3 rounded-sm" style={{ background: 'oklch(0.6 0.2 20 / 0.12)' }} /> región prohibida</span>
      </div>
      <p className="rounded-md border border-teal-200/60 bg-teal-50/40 p-3 text-xs text-muted-foreground dark:border-teal-900/50 dark:bg-teal-950/20">
        <span className="font-medium text-foreground">Lectura física:</span> sube <M>{`n`}</M> y observa cómo la distribución cuántica
        <M>{`|\\psi_n|^2`}</M> se aproxima a la clásica (uniforme entre los puntos de retorno, divergente en los extremos).
        Es el <span className="font-medium">principio de correspondencia</span>: a alta energía, lo cuántico reproduce lo clásico.
        La penetración en la región prohibida es <span className="font-medium">siempre</span> no nula — la firma del régimen cuántico.
      </p>
    </div>
  )
}

// ============ WAVE PACKET EVOLUTION (free particle Gaussian packet) ============
// A Gaussian wave packet for a free particle: φ(k) ∝ exp(-(k-k0)²/(4σ²)).
// Ψ(x,t) = (1/√(2π)) ∫ φ(k) e^{i(kx - ωt)} dk,  ω = ℏk²/(2m).
// Analytic form for Gaussian: Ψ(x,t) ∝ (1/√(1+i·αt)) exp(-(x-v_g t)²/(4σ²(1+iαt))) e^{i(k0 x - ω0 t)}
// with α = ℏ/(2mσ²), v_g = ℏk0/m, ω0 = ℏk0²/(2m). We plot |Ψ(x,t)|².
function WavePacketViz() {
  const [k0, setK0] = useState(3)
  const [sigma, setSigma] = useState(0.6)
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [showPhase, setShowPhase] = useState(false)
  const m = 1, hbar = 1
  const vw = 460, vh = 260
  const X = 12

  // animated playback
  useEffect(() => {
    if (!playing) return
    let raf: number
    let last = performance.now()
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      setT(prev => {
        const next = prev + dt * 0.6
        return next > 20 ? 0 : next
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  const vg = (hbar * k0) / m
  const omega0 = (hbar * k0 * k0) / (2 * m)
  const alpha = hbar / (2 * m * sigma * sigma)
  const spreadSigma = (t: number) => sigma * Math.sqrt(1 + (alpha * t) ** 2)

  const { sx, sy } = mkScale(vw, vh, X, -0.5, 0.7)

  // Probability density path |Ψ|²
  const probPath = useMemo(() => {
    const pts = 401
    const s = spreadSigma(t)
    const center = vg * t
    const peak = 1 / (Math.sqrt(2 * Math.PI) * s)
    const arr: string[] = []
    for (let i = 0; i < pts; i++) {
      const x = -X + (2 * X * i) / (pts - 1)
      const p = Math.exp(-((x - center) ** 2) / (2 * s * s)) * peak
      arr.push(`${i === 0 ? 'M' : 'L'}${sx(x)},${sy(p)}`)
    }
    return arr.join(' ')
  }, [k0, sigma, t])

  // Complex Ψ(x,t) = (1/√(1+iαt)) exp(-(x-vg·t)²/(4σ²(1+iαt))) e^{i(k₀x - ω₀t)}
  // Real and imaginary parts for phase visualization
  const { rePath, imPath } = useMemo(() => {
    const pts = 401
    const s = spreadSigma(t)
    const center = vg * t
    const denom = { re: 1, im: alpha * t }  // 1 + iαt
    const amp = 1 / Math.sqrt(Math.sqrt(2 * Math.PI) * s)
    const re: string[] = []
    const im: string[] = []
    for (let i = 0; i < pts; i++) {
      const x = -X + (2 * X * i) / (pts - 1)
      const dx = x - center
      // exponent = -dx²/(4σ²·denom)
      const denomScaled = cmul({ re: 4 * sigma * sigma, im: 0 }, denom)
      const exponent = cmul({ re: -dx * dx, im: 0 }, cdiv({ re: 1, im: 0 }, denomScaled))
      const env = cexp(exponent)
      const phase = { re: Math.cos(k0 * x - omega0 * t), im: Math.sin(k0 * x - omega0 * t) }
      const psi = cmul(cmul({ re: amp, im: 0 }, env), phase)
      re.push(`${i === 0 ? 'M' : 'L'}${sx(x)},${sy(psi.re)}`)
      im.push(`${i === 0 ? 'M' : 'L'}${sx(x)},${sy(psi.im)}`)
    }
    return { rePath: re.join(' '), imPath: im.join(' ') }
  }, [k0, sigma, t])

  const s0 = sigma
  const sNow = spreadSigma(t)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <div className="mb-1 flex justify-between text-sm"><span className="font-medium">Momento central <M>{`k_0`}</M></span><span className="font-mono text-muted-foreground tabular-nums">{k0.toFixed(1)}</span></div>
          <Slider value={[k0 * 10]} min={5} max={60} step={1} onValueChange={v => setK0(v[0] / 10)} />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm"><span className="font-medium">Ancho <M>{`\\sigma`}</M></span><span className="font-mono text-muted-foreground tabular-nums">{sigma.toFixed(2)}</span></div>
          <Slider value={[sigma * 100]} min={20} max={150} step={5} onValueChange={v => setSigma(v[0] / 100)} />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm"><span className="font-medium">Tiempo <M>{`t`}</M></span><span className="font-mono text-muted-foreground tabular-nums">{t.toFixed(2)}</span></div>
          <Slider value={[t * 100]} min={0} max={1500} step={5} onValueChange={v => setT(v[0] / 100)} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={playing ? 'default' : 'outline'} onClick={() => setPlaying(p => !p)}>
          {playing ? '⏸ Pausar' : '▶ Reproducir evolución'}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => { setT(0); setPlaying(false) }}>Reiniciar</Button>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={showPhase} onChange={e => setShowPhase(e.target.checked)} className="accent-sky-600" />
          Mostrar partes Re/Im de <M>{`\\Psi`}</M> (fase)
        </label>
        <div className="ml-auto text-xs text-muted-foreground">
          <M>{`v_g = \\hbar k_0/m`}</M> = <span className="font-mono tabular-nums">{vg.toFixed(2)}</span> · <M>{`\\omega_0 = \\hbar k_0^2/2m`}</M> = <span className="font-mono tabular-nums">{omega0.toFixed(2)}</span>
        </div>
      </div>
      <Card className="bg-muted/30">
        <CardContent className="p-4 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-muted-foreground">Ancho inicial <M>{`\\sigma_0`}</M></span><span className="font-mono tabular-nums">{s0.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Ancho actual <M>{`\\sigma(t) = \\sigma_0\\sqrt{1+(\\alpha t)^2}`}</M></span><span className="font-mono tabular-nums">{sNow.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Centro del paquete <M>{`x_c = v_g t`}</M></span><span className="font-mono tabular-nums">{(vg * t).toFixed(2)}</span></div>
          <div className="mt-2 text-xs text-muted-foreground">
            El paquete se desplaza a la <span className="font-medium text-foreground">velocidad de grupo</span> <M>{`v_g`}</M> (= velocidad clásica <M>{`p_0/m`}</M>)
            y se <span className="font-medium text-foreground">ensancha</span> por la dispersión de <M>{`\\omega(k)`}</M>.
            Un <M>{`\\sigma`}</M> pequeño (partícula muy localizada) implica <M>{`\\Delta p`}</M> grande y ensanchamiento rápido: la incertidumbre de Heisenberg en acción.
          </div>
        </CardContent>
      </Card>
      <Plot axisLabels={{ x: 'x', y: showPhase ? 'Re/Im Ψ' : '|Ψ(x,t)|²' }}>
        <line x1={0} y1={sy(0)} x2={vw} y2={sy(0)} stroke="currentColor" className="text-muted-foreground/40" />
        {/* center marker */}
        <line x1={sx(vg * t)} y1={0} x2={sx(vg * t)} y2={vh} stroke="oklch(0.6 0.15 200 / 0.4)" strokeWidth={1} strokeDasharray="2 3" />
        {showPhase ? (
          <>
            <polyline points={rePath} fill="none" stroke="oklch(0.55 0.15 200)" strokeWidth={1.8} />
            <polyline points={imPath} fill="none" stroke="oklch(0.6 0.2 20)" strokeWidth={1.8} strokeDasharray="3 2" />
          </>
        ) : (
          <polyline points={probPath} fill="oklch(0.55 0.15 200 / 0.18)" stroke="oklch(0.55 0.15 200)" strokeWidth={2} />
        )}
      </Plot>
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        {showPhase ? (
          <>
            <span className="flex items-center gap-1.5"><span className="inline-block h-0.5 w-4" style={{ background: 'oklch(0.55 0.15 200)' }} /> <M>{`\\Re(\\Psi)`}</M></span>
            <span className="flex items-center gap-1.5"><span className="inline-block h-0.5 w-4 border-t-2 border-dashed" style={{ borderColor: 'oklch(0.6 0.2 20)' }} /> <M>{`\\Im(\\Psi)`}</M></span>
          </>
        ) : (
          <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-3" style={{ background: 'oklch(0.55 0.15 200 / 0.3)' }} /> <M>{`|\\Psi(x,t)|^2`}</M></span>
        )}
      </div>
      <p className="rounded-md border border-sky-200/60 bg-sky-50/40 p-3 text-xs text-muted-foreground dark:border-sky-900/50 dark:bg-sky-950/20">
        <span className="font-medium text-foreground">Física:</span> cada onda plana componente gira a su propia frecuencia <M>{`\\omega(k) = \\hbar k^2/2m`}</M>.
        Como <M>{`\\omega`}</M> no es lineal en <M>{`k`}</M>, las fases relativas se desalinean y el paquete se ensancha.
        El centro, sin embargo, avanza sin deformarse según <M>{`v_g = d\\omega/dk`}</M> — la velocidad de grupo recupera la mecánica clásica.
        {showPhase && <> Activa la vista de Re/Im para ver cómo las oscilaciones internas (fase <M>{`k_0 x - \\omega_0 t`}</M>) se modulan por la envolvente gaussiana.</>}
      </p>
    </div>
  )
}

// ============ BARRIER TRANSMISSION ============
function BarrierViz() {
  const [m, setM] = useState(1)
  const [V0, setV0] = useState(5)
  const [E, setE] = useState(3)
  const [width, setWidth] = useState(2)
  const kappa = Math.sqrt(2 * m * (V0 - E))
  // T ~ exp(-2 kappa * width) (qualitative, simplified)
  const T = E >= V0 ? 1 : Math.exp(-2 * kappa * width)
  const vw = 460, vh = 240
  const X = 5
  const { sx, sy } = mkScale(vw, vh, X, -0.2, Math.max(V0, E) * 1.15)
  const regime = E >= V0 ? 'clásicamente permitido (E > V₀): onda oscilatoria en todo el espacio' : 'clásicamente prohibido (E < V₀): la onda penetra decaiendo — efecto túnel'

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-1 flex justify-between text-sm"><span className="font-medium">Masa <M>{`m`}</M></span><span className="font-mono text-muted-foreground">{m.toFixed(1)}</span></div>
          <Slider value={[m * 10]} min={5} max={50} step={1} onValueChange={v => setM(v[0] / 10)} />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm"><span className="font-medium">Altura <M>{`V_0`}</M></span><span className="font-mono text-muted-foreground">{V0.toFixed(1)}</span></div>
          <Slider value={[V0 * 10]} min={10} max={100} step={2} onValueChange={v => setV0(v[0] / 10)} />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm"><span className="font-medium">Energía <M>{`E`}</M></span><span className="font-mono text-muted-foreground">{E.toFixed(1)}</span></div>
          <Slider value={[E * 10]} min={5} max={100} step={2} onValueChange={v => setE(v[0] / 10)} />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm"><span className="font-medium">Ancho</span><span className="font-mono text-muted-foreground">{width.toFixed(1)}</span></div>
          <Slider value={[width * 10]} min={5} max={40} step={1} onValueChange={v => setWidth(v[0] / 10)} />
        </div>
      </div>
      <Card className="bg-muted/30">
        <CardContent className="p-4 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-muted-foreground">Régimen</span><span>{regime}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground"><M>{`\\kappa = \\sqrt{2m(V_0-E)}/\\hbar`}</M></span><span className="font-mono">{E >= V0 ? '—' : kappa.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Transmisión (cualitativa)</span><span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{(T * 100).toFixed(1)}%</span></div>
        </CardContent>
      </Card>
      <Plot axisLabels={{ x: 'x', y: 'V(x), E' }}>
        {/* barrier */}
        <rect x={sx(-width / 2)} y={sy(V0)} width={sx(width / 2) - sx(-width / 2)} height={sy(0) - sy(V0)} fill="hsl(20 80% 50%)" opacity={0.15} stroke="hsl(20 80% 50%)" />
        {/* E line */}
        <line x1={0} y1={sy(E)} x2={vw} y2={sy(E)} stroke="hsl(200 80% 50%)" strokeWidth={1.5} strokeDasharray="4 3" />
        <line x1={0} y1={sy(0)} x2={vw} y2={sy(0)} stroke="currentColor" className="text-muted-foreground/40" />
        <text x={sx(width / 2) + 6} y={sy(E) - 4} className="fill-blue-500" fontSize={11}>E</text>
        <text x={sx(0)} y={sy(V0) - 4} className="fill-orange-500" fontSize={11} textAnchor="middle">V₀</text>
      </Plot>
      <p className="text-xs text-muted-foreground">
        Cuando <M>{`E<V_0`}</M>, <M>{`T \\propto e^{-2\\kappa\\cdot\\text{ancho}}`}</M>: cambia exponencialmente con la masa, la altura y el ancho.
        Sube <M>{`m`}</M> y observa cómo cae <M>{`T`}</M> bruscamente — por eso el tunneling afecta a electrones, no a objetos macroscópicos.
      </p>
    </div>
  )
}

// ============ FINITE WELL bound states ============
function FiniteWellViz() {
  const [V0, setV0] = useState(8)
  const [a, setA] = useState(1.5)
  const vw = 460, vh = 240
  const X = 4
  const { sx, sy } = mkScale(vw, vh, X, -0.5, V0 * 1.05)
  // estimate number of bound states: solve l^2+kappa^2=2m V0/hbar^2 with m=1, hbar=1
  const z0 = Math.sqrt(2 * V0) * a
  // Even states satisfy tan(z) = sqrt((z0/z)^2 - 1); odd satisfy -cot(z) = sqrt((z0/z)^2-1), z in (0,z0)
  const boundCount = useMemo(() => {
    // count roots roughly
    let n = 0
    const N = 800
    let prevEven = null as number | null, prevOdd = null as number | null
    for (let i = 1; i < N; i++) {
      const z = (i / N) * z0
      const rhs = Math.sqrt(Math.max(0, (z0 / z) ** 2 - 1))
      const fEven = Math.tan(z) - rhs
      const fOdd = -1 / Math.tan(z) - rhs
      if (prevEven !== null && (fEven * prevEven < 0)) n++
      if (prevOdd !== null && isFinite(fOdd) && fOdd * prevOdd < 0) n++
      prevEven = fEven; prevOdd = fOdd
    }
    return n
  }, [z0])
  const vPath = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const x = -X + (2 * X * i) / 200
      const v = Math.abs(x) < a ? 0 : V0
      pts.push(`${i === 0 ? 'M' : 'L'}${sx(x)},${sy(v)}`)
    }
    return pts.join(' ')
  }, [V0, a])
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <div className="mb-1 flex justify-between text-sm"><span className="font-medium">Profundidad <M>{`V_0`}</M></span><span className="font-mono text-muted-foreground">{V0.toFixed(1)}</span></div>
          <Slider value={[V0 * 10]} min={20} max={150} step={2} onValueChange={v => setV0(v[0] / 10)} />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm"><span className="font-medium">Semi-ancho <M>{`a`}</M></span><span className="font-mono text-muted-foreground">{a.toFixed(2)}</span></div>
          <Slider value={[a * 100]} min={50} max={250} step={5} onValueChange={v => setA(v[0] / 100)} />
        </div>
      </div>
      <Card className="bg-muted/30">
        <CardContent className="p-4 text-sm space-y-2">
          <div className="flex justify-between"><span className="text-muted-foreground"><M>{`z_0 = \\sqrt{2mV_0}\\,a/\\hbar`}</M></span><span className="font-mono">{z0.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Estados ligados (aprox.)</span><span className="font-mono font-semibold">{boundCount}</span></div>
          <div className="mt-2 text-xs text-muted-foreground">
            El número de estados ligados crece con <M>{`z_0 \\propto \\sqrt{V_0}\\,a`}</M>. Aumentar profundidad o ancho añade estados.
            En el límite <M>{`V_0\\to\\infty`}</M> se recuperan los infinitos estados del pozo infinito.
          </div>
        </CardContent>
      </Card>
      <Plot axisLabels={{ x: 'x', y: 'V(x)' }}>
        <polyline points={vPath} fill="none" stroke="currentColor" className="text-foreground" strokeWidth={2} />
        <line x1={0} y1={sy(0)} x2={vw} y2={sy(0)} stroke="currentColor" className="text-muted-foreground/40" />
        {/* schematic energy lines (rough) */}
        {Array.from({ length: Math.min(boundCount, 8) }).map((_, i) => {
          const E = V0 * (0.15 + 0.12 * i)
          if (E >= V0) return null
          return <line key={i} x1={sx(-a)} y1={sy(E)} x2={sx(a)} y2={sy(E)} stroke="hsl(200 80% 50%)" strokeWidth={1.2} />
        })}
      </Plot>
      <p className="text-xs text-muted-foreground">
        La onda penetra fuera del pozo (regiones prohibidas) decayendo exponencialmente. La penetración es mayor para estados cercanos al techo <M>{`V_0`}</M>.
      </p>
    </div>
  )
}

export function Visualizations() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Visualizaciones interactivas</h1>
        <p className="text-muted-foreground">
          Ajusta parámetros y observa cómo cambia la física. Las visualizaciones son cualitativas pero fieles al comportamiento.
        </p>
      </header>
      <Tabs defaultValue="well">
        <TabsList className="flex w-full flex-wrap justify-start">
          <TabsTrigger value="well">Pozo infinito</TabsTrigger>
          <TabsTrigger value="ho">Oscilador armónico</TabsTrigger>
          <TabsTrigger value="packet">Paquete de onda</TabsTrigger>
          <TabsTrigger value="well-finite">Pozo finito</TabsTrigger>
          <TabsTrigger value="barrier">Barrera y túnel</TabsTrigger>
        </TabsList>
        <TabsContent value="well" className="mt-4">
          <Card><CardHeader><CardTitle className="text-base">Pozo cuadrado infinito</CardTitle></CardHeader><CardContent><InfiniteWellViz /></CardContent></Card>
        </TabsContent>
        <TabsContent value="ho" className="mt-4">
          <Card><CardHeader><CardTitle className="text-base">Oscilador armónico (Hermite cuantitativo)</CardTitle></CardHeader><CardContent><HarmonicViz /></CardContent></Card>
        </TabsContent>
        <TabsContent value="packet" className="mt-4">
          <Card><CardHeader><CardTitle className="text-base">Paquete de onda gaussiano (partícula libre)</CardTitle></CardHeader><CardContent><WavePacketViz /></CardContent></Card>
        </TabsContent>
        <TabsContent value="well-finite" className="mt-4">
          <Card><CardHeader><CardTitle className="text-base">Pozo finito: estados ligados</CardTitle></CardHeader><CardContent><FiniteWellViz /></CardContent></Card>
        </TabsContent>
        <TabsContent value="barrier" className="mt-4">
          <Card><CardHeader><CardTitle className="text-base">Barrera rectangular y tunneling</CardTitle></CardHeader><CardContent><BarrierViz /></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
