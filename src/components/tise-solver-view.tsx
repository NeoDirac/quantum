'use client'

// Vista de estudio: "tise_solver — del papel al píxel".
// Explica la física (TISE + diferencias finitas), el puente a lo computacional
// (clases, paquete, eigh), el código línea por línea y un laboratorio interactivo.

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { M, MB } from '@/components/math'
import { cn } from '@/lib/utils'
import { TISE_FILES, QUIZ, CHEAT, type CodeFile } from '@/data/tise-notes'
import { PozoExplorer, MatrizH, ConvergenciaLab, UnidadesLab } from '@/components/tise-lab'
import {
  Atom, BookOpen, Cpu, Code2, FlaskConical, History, GraduationCap, Star,
  AlertTriangle, CheckCircle2, Timer, HardDrive, ArrowRight, Printer,
  ListChecks, MousePointerClick, Waves,
} from 'lucide-react'

const SECTIONS = [
  { id: 'panorama', label: 'Panorama', icon: Waves },
  { id: 'fisica', label: 'La física', icon: Atom },
  { id: 'computador', label: 'Al computador', icon: Cpu },
  { id: 'codigo', label: 'Código línea a línea', icon: Code2 },
  { id: 'laboratorio', label: 'Laboratorio', icon: FlaskConical },
  { id: 'corrida', label: 'Tu corrida', icon: History },
  { id: 'prep', label: 'Prepárate', icon: GraduationCap },
]

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function SectionTitle({ icon: Icon, kicker, title }: { icon: any; kicker: string; title: string }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">{kicker}</div>
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
      </div>
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-l-4 border-teal-500/60 bg-teal-500/5 px-4 py-3 text-sm">
      {children}
    </div>
  )
}

// ============================================================
// VISTA PRINCIPAL
// ============================================================
export function TiseSolverView() {
  return (
    <div className="space-y-10">
      {/* Navegación de secciones */}
      <nav aria-label="Secciones" className="sticky top-14 z-10 -mx-2 flex gap-1.5 overflow-x-auto rounded-lg border border-border bg-background/95 px-2 py-2 backdrop-blur">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(s.id)}
            className="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <s.icon className="h-3.5 w-3.5" />
            {s.label}
          </button>
        ))}
      </nav>

      <Panorama />
      <Fisica />
      <AlComputador />
      <CodigoLineaALinea />
      <Laboratorio />
      <TuCorrida />
      <Preparate />
    </div>
  )
}

// ============================================================
// S1 · PANORAMA
// ============================================================
function Panorama() {
  const steps = [
    { n: 1, t: 'Leer el pozo', f: 'potential.py', d: 'El archivo Vsoft.pickle trae [h, V] en Bohr/Hartree; el loader lo convierte en un objeto Potential con unidades garantizadas.' },
    { n: 2, t: 'Construir H', f: 'solver.py · build_hamiltonian', d: 'La ecuación de Schrödinger se vuelve una matriz N×N: diagonal 1/h² + Vₙ, vecinos −1/(2h²).' },
    { n: 3, t: 'Diagonalizar', f: 'solver.py · solve', d: 'eigh (LAPACK) extrae los autovalores más bajos: son las energías Eₙ. Sus autovectores: las ψₙ(x).' },
    { n: 4, t: 'Dibujar', f: 'visualizer.py', d: 'Cada ψ se dibuja sobre su nivel de energía, re-escalada para que quepa: tu Figure_1.png.' },
  ]
  return (
    <section id="panorama" className="scroll-mt-28">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <Waves className="h-3.5 w-3.5" /> Material de estudio · paquete tise_solver
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">tise_solver: del papel al píxel</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            La historia completa de tu paquete: la física de la ecuación de Schrödinger independiente del tiempo (TISE),
            cómo se convierte en una matriz de diferencias finitas, qué hace cada línea de tus 4 archivos, y por qué las
            unidades casi te arruinan la presentación. Con laboratorio interactivo incluido: tu navegador resuelve el
            mismo problema que tu Python resolvió en 5 minutos.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.print()} className="shrink-0">
          <Printer className="mr-1.5 h-3.5 w-3.5" /> Imprimir / PDF
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        {[
          ['N = 20000 puntos', 'tu malla final'],
          ['3.2 GB', 'tamaño de la matriz'],
          ['~5 min', 'tu corrida con eigh'],
          ['O(h²)', 'error de las diferencias finitas'],
          ['51 ms', 'el mismo problema, aquí en tu navegador'],
        ].map(([a, b]) => (
          <Badge key={a} variant="secondary" className="gap-1.5 px-2.5 py-1">
            <span className="font-semibold">{a}</span>
            <span className="text-muted-foreground">{b}</span>
          </Badge>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <Card key={s.n} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">{s.n}</span>
                <span className="text-sm font-semibold">{s.t}</span>
              </div>
              <p className="text-xs text-muted-foreground">{s.d}</p>
              <Badge variant="outline" className="mt-2 font-mono text-[10px]">{s.f}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Note>
        <strong>Cómo usar esta página:</strong> léela en orden la primera vez (la historia es acumulativa), juega con las
        demos del laboratorio cuando aparezcan, y la víspera de la presentación repasa solo “Tu corrida” y “Prepárate”
        (quiz + chuleta de posibles preguntas del profesor).
      </Note>
    </section>
  )
}

// ============================================================
// S2 · LA FÍSICA
// ============================================================
function Fisica() {
  return (
    <section id="fisica" className="scroll-mt-28 space-y-5">
      <SectionTitle icon={Atom} kicker="Parte 1" title="La física: qué estamos resolviendo" />

      <Card>
        <CardContent className="p-5 space-y-3">
          <h3 className="font-semibold">La ecuación y qué significa “resolverla”</h3>
          <p className="text-sm text-muted-foreground">
            La ecuación de Schrödinger <em>independiente del tiempo</em> (TISE) describe los estados estacionarios de una
            partícula: ondas que no cambian de forma con el tiempo, solo con una fase. Para un potencial dado <M>{`V(x)`}</M>:
          </p>
          <MB>{`-\\frac{\\hbar^2}{2m}\\,\\frac{d^2\\psi}{dx^2} + V(x)\\,\\psi(x) = E\\,\\psi(x)`}</MB>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li><strong className="text-foreground">ψ(x)</strong> es la amplitud de probabilidad; <M>{`|\\psi(x)|^2`}</M> es la densidad de probabilidad de encontrar la partícula en x, y debe cumplir <M>{`\\int|\\psi|^2 dx = 1`}</M>.</li>
            <li><strong className="text-foreground">E</strong> es la energía del estado. El TISE es una <em>ecuación de autovalores</em>: no cualquier E sirve, solo unas cuantas “permitidas”.</li>
            <li><strong className="text-foreground">Resolver</strong> = dado V(x), hallar todas las parejas (E, ψ) válidas. Con potencial arbitrario (como tu pozo) no hay fórmula cerrada: toca numérico.</li>
          </ul>
          <Note>
            <strong>¿Por qué la energía se cuantiza?</strong> Misma razón por la que una cuerda de guitarra solo suena en
            ciertas notas: los extremos fijos obligan a que solo ciertas ondas “quepan”. Aquí, para un estado ligado la ψ
            debe decaer a cero en el infinito (o en los bordes de la caja): esa condición de frontera solo la satisfacen
            ciertas E. La cuantización no la impone el método numérico: la impone la frontera, y las diferencias finitas
            la heredan.
          </Note>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-3">
          <h3 className="font-semibold">Diferencias finitas: de derivadas a aritmética</h3>
          <p className="text-sm text-muted-foreground">
            El computador no sabe derivar: sabe sumar, multiplicar y guardar números. La idea es reemplazar el dominio
            continuo por una <strong className="text-foreground">malla</strong> de N puntos separados un paso <M>{`h`}</M>, y
            aproximar la derivada segunda con valores vecinos. Paso a paso:
          </p>
          <ol className="list-decimal space-y-3 pl-5 text-sm">
            <li>
              <strong>La malla.</strong> <M>{`x_n = x_0 + n\\,h,\\quad n=0,1,\\dots,N-1`}</M>. La ψ deja de ser una función y pasa a
              ser una lista de N números <M>{`\\psi_n \\approx \\psi(x_n)`}</M>.
            </li>
            <li>
              <strong>Taylor a ambos lados.</strong> Expandimos ψ en los vecinos del punto n:
              <MB>{`\\psi(x_n \\pm h) = \\psi_n \\pm h\\,\\psi'_n + \\frac{h^2}{2}\\psi''_n \\pm \\frac{h^3}{6}\\psi'''_n + \\cdots`}</MB>
            </li>
            <li>
              <strong>Sumar las dos cancela lo impar.</strong> Al sumar <M>{`\\psi(x_n+h) + \\psi(x_n-h)`}</M> los términos con
              signo ± se eliminan entre sí; despejando:
              <MB>{`\\psi''(x_n) \\approx \\frac{\\psi_{n+1} - 2\\psi_n + \\psi_{n-1}}{h^2}`}</MB>
              El primer término que descartamos es de orden <M>{`h^2`}</M>: por eso el método tiene error <M>{`O(h^2)`}</M> (lo
              verificas con números en el laboratorio).
            </li>
            <li>
              <strong>Sustituir en el TISE (con unidades atómicas, ver abajo).</strong> Cada punto de la malla produce UNA
              ecuación que solo acopla a sus vecinos:
              <MB>{`-\\frac{1}{2h^2}\\psi_{n-1} + \\left(\\frac{1}{h^2} + V_n\\right)\\psi_n - \\frac{1}{2h^2}\\psi_{n+1} = E\\,\\psi_n`}</MB>
              Mira los coeficientes: <M>{`1/h^2`}</M> en la diagonal y <M>{`-1/(2h^2)`}</M> en los vecinos. Esos números son
              exactamente los de <code className="rounded bg-muted px-1.5 py-0.5 text-xs">build_hamiltonian()</code>.
            </li>
            <li>
              <strong>La forma matricial.</strong> N ecuaciones, N incógnitas <M>{`(\\psi_0,\\dots,\\psi_{N-1})`}</M>: un sistema
              lineal disfrazado de problema de autovalores <M>{`H\\psi = E\\psi`}</M>. Para N=5 se ve así:
              <MB>{`H = \\begin{pmatrix} \\tfrac{1}{h^2}+V_0 & -\\tfrac{1}{2h^2} & 0 & 0 & 0 \\\\ -\\tfrac{1}{2h^2} & \\tfrac{1}{h^2}+V_1 & -\\tfrac{1}{2h^2} & 0 & 0 \\\\ 0 & -\\tfrac{1}{2h^2} & \\tfrac{1}{h^2}+V_2 & -\\tfrac{1}{2h^2} & 0 \\\\ 0 & 0 & -\\tfrac{1}{2h^2} & \\tfrac{1}{h^2}+V_3 & -\\tfrac{1}{2h^2} \\\\ 0 & 0 & 0 & -\\tfrac{1}{2h^2} & \\tfrac{1}{h^2}+V_4 \\end{pmatrix}`}</MB>
              Tridiagonal + el potencial pintado en la diagonal. Nada más: toda la física del proyecto cabe en esa matriz.
            </li>
          </ol>
          <Note>
            <strong>Condiciones de frontera.</strong> <em>Non-periodic</em>: ψ=0 en los bordes (caja lejana: tu caso, la ψ
            decae exponencialmente antes de llegar). <em>Periodic</em>: el punto N−1 conecta con el 0 (la caja es un anillo)
            y la matriz gana dos esquinas con valor −1/(2h²). Con tu caja de L=2000 Bohr ambas opciones coinciden a 10⁻¹⁵:
            la frontera está demasiado lejos para importar. En el laboratorio verás un caso de caja chica donde SÍ importa.
          </Note>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-3">
          <h3 className="font-semibold">Las unidades: atómicas por dentro, de laboratorio por fuera</h3>
          <p className="text-sm text-muted-foreground">
            El paquete trabaja internamente en <strong className="text-foreground">unidades atómicas</strong>: se elige el
            sistema de unidades donde <M>{`\\hbar = m_e = e = 1`}</M>. Ventajas: la ecuación queda limpia{' '}
            <M>{`-\\tfrac{1}{2}\\psi'' + V\\psi = E\\psi`}</M> (sin arrastrar constantes) y los números tienen tamaño humano
            (el fondo de tu pozo es −1.0, no −4.36×10⁻¹⁸ joules).
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left text-xs">
                  <th className="px-3 py-2 font-medium">Magnitud</th>
                  <th className="px-3 py-2 font-medium">Unidad atómica</th>
                  <th className="px-3 py-2 font-medium">En unidades de laboratorio</th>
                  <th className="px-3 py-2 font-medium">En tu corrida</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                <tr className="border-b border-border/60">
                  <td className="px-3 py-2">Longitud</td><td className="px-3 py-2">Bohr (a₀)</td>
                  <td className="px-3 py-2">1 a₀ = 0.529177 Å</td>
                  <td className="px-3 py-2">pozo en 1000 a₀ = 529 Å</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="px-3 py-2">Energía</td><td className="px-3 py-2">Hartree (Eₕ)</td>
                  <td className="px-3 py-2">1 Eₕ = 27.2114 eV</td>
                  <td className="px-3 py-2">fondo −1 Eₕ = −27.2 eV</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Función de onda</td><td className="px-3 py-2">a₀⁻¹ᐟ²</td>
                  <td className="px-3 py-2">se divide entre √0.529177</td>
                  <td className="px-3 py-2">ψ no se “ve” en unidades: se escala al graficar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Note>
            <strong>El contrato de unidades del paquete.</strong> Un .pickle guarda NÚMEROS, no unidades. Por eso el loader
            te obliga a declararlas: <code className="rounded bg-muted px-1.5 py-0.5 text-xs">load(file, unit_x='Bohr', unit_v='Hartree')</code>.
            A partir de ahí, Potential convierte todo a atómicas y el resto del paquete nunca más piensa en unidades…
            hasta el momento de reportar, donde TISEResult fabrica las gemelas en eV/Å. Olvidar la declaración = tu bug
            de 27.2× (sección “Tu corrida”).
          </Note>
        </CardContent>
      </Card>
    </section>
  )
}

// ============================================================
// S3 · DE LA FÍSICA AL COMPUTADOR
// ============================================================
function AlComputador() {
  const chain = [
    { t: 'PicklePotentialLoader', f: 'potential.py', d: 'Lee Vsoft.pickle → lista [h, V] → malla reconstruida' },
    { t: 'Potential', f: 'potential.py', d: 'Guarda x, V, h, L — SIEMPRE en Bohr/Hartree' },
    { t: 'TISESolver', f: 'solver.py', d: 'build_hamiltonian() fabrica la matriz; solve() diagonaliza' },
    { t: 'TISEResult', f: 'solver.py', d: 'Empaqueta energías + ψ, con gemelas atómicas y eV/Å' },
    { t: 'TISEVisualizer', f: 'visualizer.py', d: 'Convierte el paquete en la figura (fig, ax)' },
  ]
  return (
    <section id="computador" className="scroll-mt-28 space-y-5">
      <SectionTitle icon={Cpu} kicker="Parte 2" title="De la física al computador: qué pasa tras bastidores" />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5 space-y-2">
            <h3 className="font-semibold">¿Qué es una clase? (tu primer contacto)</h3>
            <p className="text-sm text-muted-foreground">
              Una clase es un <strong className="text-foreground">molde</strong> que agrupa datos y funciones en una sola
              caja. Al “rellenar” el molde se crea un <strong className="text-foreground">objeto</strong>. Los datos de
              dentro se llaman <em>atributos</em>; las funciones, <em>métodos</em>. La palabra <code className="rounded bg-muted px-1 text-xs">self</code> significa
              “este objeto concreto”: <code className="rounded bg-muted px-1 text-xs">self.h</code> es “el h de ESTE potencial”.
            </p>
            <p className="text-sm text-muted-foreground">
              En intro viste funciones que reciben datos y devuelven resultados. Una clase es el siguiente nivel: los datos
              viven DENTRO del objeto y los métodos los usan sin que tengas que pasarlos uno por uno. Tu potential tiene
              40000 valores de V: en vez de arrastrar esa lista por todas tus funciones, vive dentro del objeto y cualquier
              método accede con <code className="rounded bg-muted px-1 text-xs">self.v</code>.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 space-y-2">
            <h3 className="font-semibold">¿Por qué 5 clases y no un solo script?</h3>
            <p className="text-sm text-muted-foreground">
              Porque cada clase tiene UN trabajo y se puede probar/cambiar sin tocar las demás: leer archivos (Loader),
              guardar el pozo (Potential), hacer física (Solver), empaquetar resultados (Result), dibujar (Visualizer).
              Cuando cambió el formato del pickle, solo tocaste el Loader. Cuando quieras otra gráfica, solo el
              Visualizer. Eso es “arquitectura”: separar responsabilidades.
            </p>
            <p className="text-sm text-muted-foreground">
              Y el <strong className="text-foreground">paquete</strong> (carpeta con <code className="rounded bg-muted px-1 text-xs">__init__.py</code>)
              existe para que el uso sea limpio: <code className="rounded bg-muted px-1 text-xs">from tise_solver import TISESolver</code> en
              vez de rutas de archivo. El <code className="rounded bg-muted px-1 text-xs">__init__.py</code> es el “vestíbulo” que
              decide qué se exporta.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <h3 className="mb-3 font-semibold">La cadena de objetos (así fluye tu corrida)</h3>
          <div className="flex flex-col items-stretch gap-1.5 lg:flex-row lg:items-center">
            {chain.map((c, i) => (
              <div key={c.t} className="flex flex-1 flex-col items-stretch gap-1.5 lg:flex-row lg:items-center">
                <div className="flex-1 rounded-lg border border-border bg-muted/30 px-3 py-2">
                  <div className="text-sm font-semibold">{c.t}</div>
                  <Badge variant="outline" className="mt-0.5 font-mono text-[10px]">{c.f}</Badge>
                  <p className="mt-1 text-xs text-muted-foreground">{c.d}</p>
                </div>
                {i < chain.length - 1 && <ArrowRight className="mx-auto h-4 w-4 shrink-0 rotate-90 text-muted-foreground lg:rotate-0" />}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Detalle que te costó 5 minutos: <code className="rounded bg-muted px-1">solve()</code> <strong>devuelve</strong> el
            TISEResult, no lo guarda en el solver. Si no escribes <code className="rounded bg-muted px-1">result = solver.solve(...)</code>,
            el objeto se pierde (y vars(solver) solo muestra {'{potential, mode}'}).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-3">
          <h3 className="font-semibold">¿Qué hace <code className="rounded bg-muted px-1.5 py-0.5 text-sm">eigh</code> por dentro, y por qué tarda?</h3>
          <p className="text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">eigh</code> es el diagonalizador de matrices simétricas de
            scipy; por dentro llama a <strong className="text-foreground">LAPACK</strong>, una librería en Fortran con 50 años
            de optimización (¡ni tú ni nadie escribiría eso a mano!). Su estrategia: (1) reducir H a forma tridiagonal con
            reflexiones de Householder (~4/3·N³ operaciones, inevitable) y (2) extraer autovalores/autovectores. Con{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">subset_by_index=[0, 4]</code> usa el driver{' '}
            <strong className="text-foreground">dsyevr</strong>, que calcula SOLO los 5 más bajos: 3-4× menos trabajo que el
            eigh completo. Coste total <M>{`O(N^3)`}</M>, y eso lo mediste:
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              ['N=2000', '0.52 s', ''],
              ['N=4000', '4.14 s', '×8'],
              ['N=8000', '32.0 s', '×8'],
            ].map(([n, t, r]) => (
              <div key={n} className="rounded-lg border border-border p-3">
                <div className="text-muted-foreground">{n}</div>
                <div className="text-lg font-bold tabular-nums">{t}</div>
                {r && <Badge variant="secondary" className="mt-0.5">{r} por duplicar N (2³=8)</Badge>}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            La RAM: H es N×N números de 8 bytes → <strong className="text-foreground">N²·8 bytes</strong>. N=20000 → 3.2 GB;
            como eigh copia la matriz, el pico ronda el doble (~6.5 GB): por eso tu 16 GB aguantaron N=20000 pero N=40000
            (12.8 GB → pico ~25 GB) habría entrado en swapping (RAM llena → el SO usa el disco → todo se congela).
          </p>
          <Note>
            <strong>Dato de nivel (por si el profesor pregunta):</strong> como nuestra H es tridiagonal, existen algoritmos
            especializados en O(N) (bisección de Sturm + iteración inversa) — son los que usa el laboratorio de esta página
            para resolver N=20000 en milisegundos. eigh es más lento, pero sirve para CUALQUIER matriz simétrica: el
            compromiso generalidad vs velocidad. scipy incluso trae <code className="rounded bg-muted px-1 text-xs">eigh_tridiagonal</code> para
            el caso especializado.
          </Note>
        </CardContent>
      </Card>
    </section>
  )
}

// ============================================================
// S4 · CÓDIGO LÍNEA POR LÍNEA
// ============================================================
function CodeViewer({ file }: { file: CodeFile }) {
  const [sel, setSel] = useState<number | null>(null)
  const [block, setBlock] = useState<number | null>(null)

  const KW = /^(import|from|class|def|return|for|if|else|elif|with|raise)\b/
  const inBlock = (i: number) => block !== null && i >= file.blocks[block].from && i <= file.blocks[block].to
  const noteLine = sel !== null ? file.lines[sel - 1] : null

  const renderCode = (text: string) => {
    if (!text) return null
    const trimmed = text.trimStart()
    if (trimmed.startsWith('#')) {
      return <span className="text-emerald-600 dark:text-emerald-400">{text}</span>
    }
    const m = text.match(/^(\s*)([A-Za-z_@][\w.]*)/)
    if (m && (KW.test(text.trimStart()) || m[2] === '@classmethod' || m[2] === '__all__')) {
      return (
        <>
          <span>{m[1]}</span>
          <span className="font-semibold text-violet-600 dark:text-violet-400">{m[2]}</span>
          <span>{text.slice(m[0].length)}</span>
        </>
      )
    }
    return <span>{text}</span>
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{file.intro}</p>

      <div className="flex flex-wrap gap-1.5">
        <span className="mr-1 self-center text-xs font-medium text-muted-foreground">Bloques:</span>
        {file.blocks.map((b, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setBlock(block === i ? null : i); setSel(null) }}
            className={cn(
              'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
              block === i
                ? 'border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300'
                : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
          <div className="max-h-[560px] overflow-y-auto">
            <table className="w-full border-collapse font-mono text-[12.5px] leading-6">
              <tbody>
                {file.lines.map((ln, idx) => {
                  const n1 = idx + 1
                  const active = sel === n1 || inBlock(n1)
                  return (
                    <tr
                      key={idx}
                      id={`code-line-${file.id}-${n1}`}
                      onClick={() => {
                        if (!ln.n) return
                        setSel(sel === n1 ? null : n1)
                        requestAnimationFrame(() => document.getElementById(`code-line-${file.id}-${n1}`)?.scrollIntoView({ block: 'nearest' }))
                      }}
                      className={cn(
                        'cursor-default border-b border-border/30 last:border-0',
                        ln.n && 'cursor-pointer hover:bg-muted/60',
                        active && 'bg-teal-500/10',
                        ln.k && !active && 'bg-amber-500/[0.06]'
                      )}
                    >
                      <td className="w-10 select-none border-r border-border/40 px-2 text-right align-top text-[11px] text-muted-foreground/70 tabular-nums">
                        {n1}
                      </td>
                      <td className="px-3 whitespace-pre align-top">
                        {renderCode(ln.c)}
                        {ln.k && <Star className="mb-0.5 ml-1.5 inline h-3 w-3 fill-amber-400 text-amber-400" aria-label="línea clave" />}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-3 border-t border-border bg-background/60 px-3 py-1.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> línea clave</span>
            <span className="flex items-center gap-1"><MousePointerClick className="h-3 w-3" /> clic en una línea para ver su explicación</span>
          </div>
        </div>

        <div className="xl:sticky xl:top-32 xl:self-start">
          <Card className="min-h-[180px]">
            <CardContent className="p-4">
              {block !== null && !sel && (
                <div>
                  <Badge className="mb-2">Bloque: {file.blocks[block].label}</Badge>
                  <p className="text-sm text-muted-foreground">{file.blocks[block].note}</p>
                </div>
              )}
              {sel !== null && noteLine?.n && (
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge>Línea {sel}</Badge>
                    {noteLine.k && <Badge variant="outline" className="border-amber-400/60 text-amber-600 dark:text-amber-400">clave</Badge>}
                  </div>
                  <pre className="mb-2 overflow-x-auto rounded bg-muted/60 p-2 font-mono text-[11.5px]">{noteLine.c || '(línea en blanco)'}</pre>
                  <p className="text-sm text-muted-foreground">{noteLine.n}</p>
                </div>
              )}
              {sel === null && block === null && (
                <div className="flex h-full min-h-[140px] flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                  <MousePointerClick className="h-5 w-5" />
                  Clic en cualquier línea del código (o en un bloque) y su explicación aparece aquí.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function CodigoLineaALinea() {
  return (
    <section id="codigo" className="scroll-mt-28 space-y-5">
      <SectionTitle icon={Code2} kicker="Parte 3" title="El código, línea por línea" />
      <p className="max-w-3xl text-sm text-muted-foreground">
        Aquí está tu paquete EXACTO (los mismos bytes que hay en el repo), con una explicación por línea. Las líneas con
        ★ son las que sostienen todo: si dominas esas 15, dominas el proyecto. Empieza por <strong>solver.py</strong> si
        vas justo de tiempo: es donde vive la física.
      </p>
      <Tabs defaultValue="solver">
        <TabsList className="flex flex-wrap">
          {TISE_FILES.map((f) => (
            <TabsTrigger key={f.id} value={f.id} className="font-mono text-xs">
              {f.path.split('/').pop()}
              <span className="ml-1.5 text-[10px] text-muted-foreground">{f.lines.filter((l) => l.n).length} notas</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {TISE_FILES.map((f) => (
          <TabsContent key={f.id} value={f.id}>
            <CodeViewer file={f} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

// ============================================================
// S5 · LABORATORIO
// ============================================================
function Laboratorio() {
  return (
    <section id="laboratorio" className="scroll-mt-28 space-y-5">
      <SectionTitle icon={FlaskConical} kicker="Parte 4" title="Laboratorio interactivo" />
      <p className="max-w-3xl text-sm text-muted-foreground">
        Estas demos ejecutan en tu navegador el MISMO método que tu paquete (construir la matriz de diferencias finitas y
        resolverla), usando un algoritmo especializado para matrices tridiagonales. El potencial es el tuyo:{' '}
        <M>{`V(x) = -1/\\sqrt{(x-x_0)^2 + 1}`}</M> — verificamos que tu Vsoft.pickle es exactamente esa Coulomb suavizada,
        solo que centrada en x₀=1000 Bohr; aquí está centrada en 0 (invariancia traslacional: mismas energías).
      </p>

      <Card>
        <CardContent className="p-5">
          <h3 className="mb-1 font-semibold">① Explorador del pozo — las ψ calculadas en vivo</h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Mueve N y mira cómo se refinan las ψ y cómo baja el error de E₀. Con N=20000 estás reproduciendo tu corrida real.
          </p>
          <PozoExplorer />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="mb-1 font-semibold">② Anatomía de la matriz H</h3>
          <p className="mb-4 text-xs text-muted-foreground">
            La estructura que construye build_hamiltonian(): diagonal, vecinos y (si activas el modo periódico) esquinas.
          </p>
          <MatrizH />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="mb-1 font-semibold">③ Convergencia: el error O(h²), medido</h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Duplicar N divide el error entre 4. La tabla lo muestra con números; el gráfico log-log muestra la pendiente 2 (error ∝ h²).
          </p>
          <ConvergenciaLab />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="mb-1 font-semibold">④ Unidades: convertidor + el simulador del bug</h3>
          <p className="mb-4 text-xs text-muted-foreground">
            El mismo archivo interpretado de dos formas, con tus energías reales de ambas corridas.
          </p>
          <UnidadesLab />
        </CardContent>
      </Card>
    </section>
  )
}

// ============================================================
// S6 · TU CORRIDA REAL
// ============================================================
function TuCorrida() {
  const timeline = [
    {
      icon: AlertTriangle,
      tone: 'rose' as const,
      t: '1 · La carga silenciosa (el bug)',
      d: "load('Vsoft.pickle') sin declarar unidades → defaults Angstrom/eV. El programa NO se quejó: convirtió números que ya estaban en Bohr/Hartree como si fueran Å/eV. Resultado: pozo 27.2× menos profundo, espectro [−0.4165, −0.0608, −0.0323, −0.0158, −0.0111] eV. Cero errores en pantalla: ese es el peligro de los bugs de unidades.",
    },
    {
      icon: BookOpen,
      tone: 'amber' as const,
      t: '2 · Las pistas (diagnóstico sin tocar código)',
      d: 'La gráfica delataba: fondo −1.0 sobre un eje rotulado “eV” (imposible: debería verse −27.2), pozo centrado en x=1000 “Å” (eran Bohr → 529 Å), y un espectro demasiado alto para un pozo tan profundo.',
    },
    {
      icon: CheckCircle2,
      tone: 'emerald' as const,
      t: "3 · La corrección (5 segundos)",
      d: "load(..., unit_x='Bohr', unit_v='Hartree') y verificación con vars(potential): x llega a 2000 Bohr ✓, v mínima −1.0 Hartree ✓. Chequear unidades ANTES de resolver cuesta 5 segundos y ahorra corridas de 5 minutos.",
    },
    {
      icon: HardDrive,
      tone: 'teal' as const,
      t: '4 · La decisión de memoria',
      d: 'N=40000 → matriz de 12.8 GB (N²·8 bytes): justo al límite de tus 16 GB con eigh copiando. interpolate(new_h=0.1) re-muestrea a N=20000 → 3.2 GB, pico ~6.5 GB: cómodo. Coste consciente: error O(h²) algo mayor (~0.002 eV).',
    },
    {
      icon: Timer,
      tone: 'teal' as const,
      t: '5 · La espera y sus sustos',
      d: "mode='non.periodic' → ValueError inmediato (¡tu validación funcionó!). solve() sin asignar → resultado perdido y re-corrida. TISEVisualizer(solver) → AttributeError: le faltaba el result. Tres errores clásicos, cada uno con su lección.",
    },
    {
      icon: CheckCircle2,
      tone: 'emerald' as const,
      t: '6 · El resultado final (verificado)',
      d: 'Energías [−18.22780701, −7.48265358, −4.12300337, −2.52300587, −1.72934454] eV: coinciden decimal por decimal con una predicción independiente hecha antes de tu corrida. Figure_1.png: pozo en 529 Å, fondo −27.2 eV, 5 estados ligados con 0..4 nodos.',
    },
  ]
  const tones = {
    rose: 'border-rose-500/40 bg-rose-500/5 text-rose-600 dark:text-rose-400',
    amber: 'border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-400',
    emerald: 'border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400',
    teal: 'border-teal-500/40 bg-teal-500/5 text-teal-600 dark:text-teal-400',
  }
  return (
    <section id="corrida" className="scroll-mt-28 space-y-5">
      <SectionTitle icon={History} kicker="Parte 5" title="Tu corrida real: la historia completa" />
      <div className="space-y-3">
        {timeline.map((s) => (
          <Card key={s.t}>
            <CardContent className="flex gap-3 p-4">
              <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border', tones[s.tone])}>
                <s.icon className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{s.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

// ============================================================
// S7 · PREPÁRATE (quiz + chuleta)
// ============================================================
function Quiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const answered = Object.keys(answers).length
  const score = QUIZ.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0)

  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">Autoevaluación (8 preguntas)</h3>
          <Badge variant={answered === QUIZ.length ? 'default' : 'secondary'} className="tabular-nums">
            {score}/{QUIZ.length} · {answered}/{QUIZ.length} respondidas
          </Badge>
        </div>
        <div className="space-y-4">
          {QUIZ.map((q, qi) => {
            const picked = answers[qi]
            const done = picked !== undefined
            return (
              <div key={qi} className="rounded-lg border border-border p-3">
                <div className="text-sm font-medium">{qi + 1}. {q.q}</div>
                <div className="mt-2 grid gap-1.5">
                  {q.options.map((opt, oi) => {
                    const isPicked = done && picked === oi
                    const isCorrect = oi === q.correct
                    return (
                      <button
                        key={oi}
                        type="button"
                        disabled={done}
                        onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                        className={cn(
                          'flex items-start gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors',
                          !done && 'border-border hover:border-teal-500/50 hover:bg-teal-500/5',
                          done && isCorrect && 'border-emerald-500/60 bg-emerald-500/10',
                          done && isPicked && !isCorrect && 'border-rose-500/60 bg-rose-500/10',
                          done && !isPicked && !isCorrect && 'border-border opacity-50'
                        )}
                      >
                        <span className="mt-0.5">
                          {done && isCorrect ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : done && isPicked ? (
                            <AlertTriangle className="h-4 w-4 text-rose-500" />
                          ) : (
                            <span className="block h-4 w-4 rounded-full border border-border" />
                          )}
                        </span>
                        <span>{opt}</span>
                      </button>
                    )
                  })}
                </div>
                {done && (
                  <p className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                    <strong className="text-foreground">{picked === q.correct ? '✓ Correcto. ' : '✗ Casi. '}</strong>
                    {q.why}
                  </p>
                )}
              </div>
            )
          })}
        </div>
        {answered === QUIZ.length && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
            <span className="text-sm font-medium">
              {score === QUIZ.length ? '🏆 8/8: listo para el profesor Pro.' : `Resultado: ${score}/${QUIZ}. Repasa las notas de las preguntas falladas.`}
            </span>
            <Button variant="outline" size="sm" onClick={() => setAnswers({})}>Reintentar</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function Preparate() {
  return (
    <section id="prep" className="scroll-mt-28 space-y-5">
      <SectionTitle icon={GraduationCap} kicker="Parte 6" title="Prepárate para la presentación" />

      <Card>
        <CardContent className="p-5">
          <h3 className="mb-2 font-semibold">Guion de 60 segundos (por si te piden “cuéntame qué hace”)</h3>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li>“Resolví la ecuación de Schrödinger independiente del tiempo en 1D para un pozo sin solución analítica.”</li>
            <li>“Discreticé el dominio en N=20000 puntos y aproximé ψ″ con diferencias finitas de 3 puntos, que da error O(h²).”</li>
            <li>“Eso convierte el TISE en un sistema lineal H·ψ = E·ψ: H es tridiagonal con 1/h²+Vₙ en la diagonal y −1/(2h²) en los vecinos.”</li>
            <li>“Trabajé en unidades atómicas (ħ=m=e=1): el código queda limpio y los números, de tamaño humano; reporto en eV y Å con factores 27.2114 y 0.529177.”</li>
            <li>“Diagonalicé con eigh de LAPACK pidiendo solo los 5 autovalores más bajos: O(N³), por eso mis cálculos de RAM (N²·8 bytes = 3.2 GB) y de tiempo.”</li>
            <li>“El paquete separa responsabilidades en 5 clases: leer, guardar el pozo, resolver, empaquetar y dibujar — y valida unidades y modos para fallar temprano.”</li>
          </ol>
        </CardContent>
      </Card>

      <Quiz />

      <Card>
        <CardContent className="p-5">
          <h3 className="mb-1 flex items-center gap-2 font-semibold"><ListChecks className="h-4 w-4" /> Chuleta: posibles preguntas del profesor</h3>
          <p className="mb-3 text-xs text-muted-foreground">Respuestas cortas, listas para decir. Cada una ya está desarrollada en las secciones de arriba.</p>
          <Accordion type="single" collapsible>
            {CHEAT.map((c, i) => (
              <AccordionItem key={i} value={`c${i}`}>
                <AccordionTrigger className="text-left text-sm">{c.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{c.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  )
}
