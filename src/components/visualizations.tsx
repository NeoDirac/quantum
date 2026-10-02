'use client'

import { useMemo, useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

// ============ HARMONIC OSCILLATOR ============
function HarmonicViz() {
  const [n, setN] = useState(0)
  const vw = 460, vh = 240
  const X = 4 // x range
  const { sx, sy } = mkScale(vw, vh, X, -1.2, 1.4)
  const V = (x: number) => 0.5 * x * x
  // normalized HO psi_n (physics Hermite). For viz use approximate scaled.
  const psi = useMemo(() => {
    // Use Hermite polynomial H_n and e^{-x^2/2}; normalize numerically.
    function H(n: number, x: number): number {
      if (n === 0) return 1
      if (n === 1) return 2 * x
      let hm2 = 1, hm1 = 2 * x, hn = 0
      for (let k = 2; k <= n; k++) {
        hn = 2 * x * hm1 - 2 * (k - 1) * hm2
        hm2 = hm1; hm1 = hn
      }
      return hn
    }
    const N = n
    const xs = Array.from({ length: 401 }, (_, i) => -X + (2 * X * i) / 400)
    const vals = xs.map(x => H(N, x) * Math.exp(-x * x / 2))
    // normalize by max for display
    const m = Math.max(...vals.map(Math.abs))
    return xs.map((x, i) => ({ x, y: vals[i] / m }))
  }, [n])
  const E = n + 0.5
  const path = psi.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(p.x)},${sy(p.y)}`).join(' ')
  const vPath = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) {
      const x = -X + (2 * X * i) / 200
      pts.push(`${i === 0 ? 'M' : 'L'}${sx(x)},${sy(V(x) / 8)}`)
    }
    return pts.join(' ')
  }, [])
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium">Estado <M>{`n`}</M></span>
            <span className="font-mono text-muted-foreground">{n}</span>
          </div>
          <Slider value={[n]} min={0} max={6} step={1} onValueChange={v => setN(v[0])} />
        </div>
        <Card className="bg-muted/30">
          <CardContent className="p-4 text-sm space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Energía <M>{`E_n`}</M></span><span className="font-mono">{E.toFixed(2)} ℏω</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Nodos</span><span className="font-mono">{n}</span></div>
            <div className="mt-2 text-xs text-muted-foreground">
              Los niveles están uniformemente espaciados en <M>{`\\hbar\\omega`}</M>. La energía mínima (n=0) es <M>{`\\tfrac12\\hbar\\omega`}</M>.
              Observa cómo la onda penetra la región clásicamente prohibida (fuera de los puntos donde <M>{`E=V(x)`}</M>).
            </div>
          </CardContent>
        </Card>
      </div>
      <Plot axisLabels={{ x: 'x', y: 'ψ, V' }}>
        {/* V(x) */}
        <polyline points={vPath} fill="none" stroke="currentColor" className="text-muted-foreground" strokeWidth={1.5} strokeDasharray="4 3" />
        {/* classical turning point: where V=E */}
        {(() => {
          const xT = Math.sqrt(2 * E)
          return <line x1={sx(xT)} y1={0} x2={sx(xT)} y2={vh} stroke="hsl(20 80% 50%)" strokeWidth={1} strokeDasharray="3 3" />
        })()}
        <line x1={0} y1={sy(0)} x2={vw} y2={sy(0)} stroke="currentColor" className="text-muted-foreground/40" />
        {/* energy level */}
        <line x1={0} y1={sy(E / 8)} x2={vw} y2={sy(E / 8)} stroke="hsl(20 80% 50%)" strokeWidth={1} strokeDasharray="4 3" />
        {/* psi */}
        <polyline points={path} fill="none" stroke="hsl(200 80% 50%)" strokeWidth={2} />
      </Plot>
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
          <TabsTrigger value="well-finite">Pozo finito</TabsTrigger>
          <TabsTrigger value="barrier">Barrera y túnel</TabsTrigger>
        </TabsList>
        <TabsContent value="well" className="mt-4">
          <Card><CardHeader><CardTitle className="text-base">Pozo cuadrado infinito</CardTitle></CardHeader><CardContent><InfiniteWellViz /></CardContent></Card>
        </TabsContent>
        <TabsContent value="ho" className="mt-4">
          <Card><CardHeader><CardTitle className="text-base">Oscilador armónico</CardTitle></CardHeader><CardContent><HarmonicViz /></CardContent></Card>
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
