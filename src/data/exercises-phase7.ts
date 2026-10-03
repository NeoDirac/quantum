import type { Exercise } from '@/lib/content-types'

// Phase 7 exercises: Ehrenfest theorem (2.1), squeezed states (2.3),
// wave packet spreading derivation (2.4), graphical transcendental solving (2.6).
// All content original to this platform.

export const EXERCISES_PHASE7: Exercise[] = [
  // ===================== 2.1 — Ehrenfest theorem =====================
  {
    id: 'ex-2-1d',
    sectionId: '2.1',
    conceptIds: ['c2-stationary-states-meaning', 'c2-superposition'],
    title: 'Teorema de Ehrenfest: el puente cuántico→clásico',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'El teorema de Ehrenfest dice que d⟨x⟩/dt = ⟨p⟩/m y d⟨p⟩/dt = -⟨dV/dx⟩. Demuestra el primero a partir de la ecuación de Schrödinger. Explica por qué esto muestra que la mecánica clásica se recupera como ecuación para valores esperados (cuando el paquete es estrecho).' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué ecuación usar para calcular d⟨x⟩/dt?' }],
        accept: ['commutator', '[h, x]', 'conmutador', 'ehrenfest'],
        why: [{ kind: 'p', text: 'La fórmula general d⟨Q⟩/dt = (i/ℏ)⟨[Ĥ,Q]⟩ + ⟨∂Q/∂t⟩ es la herramienta para derivar Ehrenfest. Identificar el conmutador correcto es la clave.' }],
        reveal: [{ kind: 'p', text: 'd⟨x⟩/dt = (i/ℏ)⟨[Ĥ,x]⟩ (x no depende del tiempo). Como Ĥ = p²/(2m) + V(x) y [V(x),x]=0 (V es función de x), [Ĥ,x] = [p²/(2m), x] = -iℏp/m. Así d⟨x⟩/dt = ⟨p⟩/m.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Fórmula general: d⟨Q⟩/dt = (i/ℏ)⟨[Ĥ,Q]⟩ + ⟨∂Q/∂t⟩. Para x (sin t explícita), solo queda (i/ℏ)⟨[Ĥ,x]⟩.' }] },
      { blocks: [{ kind: 'p', text: '[Ĥ,x] = [p²/(2m), x] + [V(x), x]. Como V es función de x, [V,x]=0.' }] },
      { blocks: [{ kind: 'p', text: '[p², x] = p[p,x] + [p,x]p = p(-iℏ) + (-iℏ)p = -2iℏp. Así [p²/(2m), x] = -iℏp/m.' }] },
      { blocks: [{ kind: 'p', text: 'd⟨x⟩/dt = (i/ℏ)·(-iℏ/m)⟨p⟩ = ⟨p⟩/m. ¡Es la ecuación clásica para valores esperados!' }] },
      { blocks: [{ kind: 'p', text: 'Clásico se recupera si el paquete es estrecho: ⟨-dV/dx⟩ ≈ -dV/d⟨x⟩ (Newton). Es el límite cuántico→clásico.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Fórmula general de evolución',
        what: [{ kind: 'p', text: 'Partimos de la fórmula para d⟨Q⟩/dt.' }],
        why: [{ kind: 'p', text: 'Es la consecuencia de la ecuación de Schrödinger para cualquier observable. Es la versión cuántica de "cómo evoluciona un promedio".' }],
        meaning: [{ kind: 'p', text: 'El valor esperado ⟨Q⟩ evoluciona según el conmutador [Ĥ,Q]. Si [Ĥ,Q]=0, Q es constante del movimiento.' }],
        info: [{ kind: 'p', text: 'La fórmula se deduce derivando ⟨Ψ|Q|Ψ⟩ bajo la ecuación de Schrödinger.' }],
        whatIf: [{ kind: 'p', text: 'Si Q dependiera explícitamente de t (raro en el cap. 2), aparecería un término ⟨∂Q/∂t⟩.' }],
        math: [{ kind: 'math-block', tex: '\\frac{d\\langle Q \\rangle}{dt} = \\frac{i}{\\hbar}\\langle[\\hat{H}, Q]\\rangle + \\left\\langle \\frac{\\partial Q}{\\partial t} \\right\\rangle.' }],
      },
      {
        id: 's2', label: 'Calcular [Ĥ, x]',
        what: [{ kind: 'p', text: 'Calculamos el conmutador.' }],
        why: [{ kind: 'p', text: 'Ĥ = p²/(2m) + V(x). [V(x), x] = 0 (V es función de x, conmuta). Solo queda [p²/(2m), x].' }],
        meaning: [{ kind: 'p', text: 'El potencial no contribuye a d⟨x⟩/dt: solo el momento. Físicamente: la posición evoluciona según el momento, no según el potencial directamente.' }],
        info: [{ kind: 'p', text: 'Usamos [p, x] = -iℏ (canónico) y [AB,C] = A[B,C]+[A,C]B.' }],
        whatIf: [{ kind: 'p', text: 'Para d⟨p⟩/dt, el cálculo es análogo pero [V(x), p] ≠ 0: el potencial sí afecta al momento (fuerza).' }],
        math: [{ kind: 'math-block', tex: '[\\hat{H}, x] = \\left[\\frac{p^2}{2m}, x\\right] = \\frac{1}{2m}(p[p,x]+[p,x]p) = \\frac{-i\\hbar}{m}p.' }],
      },
      {
        id: 's3', label: 'Resultado y límite clásico',
        what: [{ kind: 'p', text: 'Obtenemos d⟨x⟩/dt = ⟨p⟩/m y discutimos el límite.' }],
        why: [{ kind: 'p', text: 'Sustituyendo: (i/ℏ)·(-iℏ/m)⟨p⟩ = ⟨p⟩/m. Es la ecuación clásica v=p/m, pero para valores esperados.' }],
        meaning: [{ kind: 'p', text: 'Ehrenfest muestra que los valores esperados siguen ecuaciones clásicas. El límite clásico se recupera cuando el paquete es estrecho: ⟨f(x)⟩ ≈ f(⟨x⟩), y d⟨p⟩/dt ≈ -dV/d⟨x⟩ (Newton).' }],
        info: [{ kind: 'p', text: 'Para un paquete amplio, ⟨f(x)⟩ ≠ f(⟨x⟩): la distribución espacial importa y lo clásico falla. Es ahí donde la cuántica es esencial.' }],
        whatIf: [{ kind: 'p', text: 'En el oscilador armónico, el paquete coherente es estrecho y sigue la trayectoria clásica: por eso es el "más clásico".' }],
        math: [{ kind: 'math-block', tex: '\\frac{d\\langle x \\rangle}{dt} = \\frac{\\langle p \\rangle}{m}, \\quad \\frac{d\\langle p \\rangle}{dt} = -\\left\\langle \\frac{dV}{dx} \\right\\rangle \\approx -\\frac{dV}{d\\langle x \\rangle} \\text{ (paquete estrecho) } = F_{\\text{clásico}}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'd⟨x⟩/dt = (i/ℏ)⟨[Ĥ,x]⟩ = (i/ℏ)·(-iℏ/m)⟨p⟩ = ⟨p⟩/m. Es la ecuación clásica v=p/m para valores esperados. El límite clásico (Newton: F=ma) se recupera cuando el paquete es estrecho: ⟨-dV/dx⟩ ≈ -dV/d⟨x⟩. Ehrenfest es el puente cuántico→clásico.' }],
  },

  // ===================== 2.3 — Squeezed states =====================
  {
    id: 'ex-2-3h',
    sectionId: '2.3',
    conceptIds: ['c2-harmonic-oscillator'],
    title: 'Estados comprimidos (squeezed) del oscilador',
    difficulty: 3,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Un estado comprimido del oscilador tiene Δx < Δx₀ (donde Δx₀ = √(ℏ/2mω) es el del fundamental) a costa de Δp > Δp₀, manteniendo Δx·Δp = ℏ/2. Explica cómo se construyen (operador S(ζ) = exp[½(ζ*a² − ζ*a†²)]) y por qué son útiles para medición de precisión.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué significa "comprimir" un estado?' }],
        accept: ['reducir dx', 'menos incertidumbre x', 'a expensas de p'],
        why: [{ kind: 'p', text: 'Comprimir = reducir la incertidumbre de una observable a expensas de la conjugada, manteniendo el producto (Heisenberg). Es "reorganizar" la incertidumbre.' }],
        reveal: [{ kind: 'p', text: 'Comprimir significa reducir Δx por debajo del mínimo del fundamental, a expensa de aumentar Δp, de modo que Δx·Δp = ℏ/2 se mantiene. Es "mover" la incertidumbre de x a p.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'El estado fundamental tiene Δx₀ = √(ℏ/2mω), Δp₀ = √(mωℏ/2). Producto ℏ/2 (satura Heisenberg).' }] },
      { blocks: [{ kind: 'p', text: 'Un squeezed state tiene Δx = e^{-r}Δx₀, Δp = e^{r}Δp₀ (r = parámetro de compresión). Producto sigue ℏ/2.' }] },
      { blocks: [{ kind: 'p', text: 'Se construye con S(ζ) = exp[½(ζ*a² - ζ*a†²)], ζ = r·e^{iθ}. S actúa sobre |0⟩ o sobre un coherente.' }] },
      { blocks: [{ kind: 'p', text: 'a² y a†² bajan/suben n en 2: el squeezed es superposición de pares |2k⟩ (si parte del fundamental).' }] },
      { blocks: [{ kind: 'p', text: 'Útil para medición de precisión: si mides x, quieres Δx pequeño → squeezed en x. Detección de ondas gravitacionales (LIGO).' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Definición de squeezed',
        what: [{ kind: 'p', text: 'Definimos qué es un estado comprimido.' }],
        why: [{ kind: 'p', text: 'Un squeezed state reduce Δx (o Δp) por debajo del mínimo del fundamental, compensando con aumento del conjugado. Satura Heisenberg como el coherente, pero reparte distinto la incertidumbre.' }],
        meaning: [{ kind: 'p', text: 'Mientras el coherente reparte simétricamente (Δx=Δx₀), el squeezed reparte asimétricamente: menos en x, más en p (o viceversa).' }],
        info: [{ kind: 'p', text: 'El parámetro r controla cuánto se comprime: r=0 es coherente (sin compresión), r>0 comprime en x.' }],
        whatIf: [{ kind: 'p', text: 'Si comprimes en p en vez de x (θ≠0), Δp baja y Δx sube. La elección del ángulo θ controla la dirección.' }],
        math: [{ kind: 'math-block', tex: '\\Delta x = e^{-r}\\Delta x_0, \\quad \\Delta p = e^{r}\\Delta p_0, \\quad \\Delta x \\cdot \\Delta p = \\frac{\\hbar}{2}.' }],
      },
      {
        id: 's2', label: 'Operador de compresión',
        what: [{ kind: 'p', text: 'Presentamos el operador S(ζ).' }],
        why: [{ kind: 'p', text: 'S(ζ) = exp[½(ζ*a² − ζ*a†²)] es el operador unitario que comprime. ζ = r·e^{iθ}: r controla la magnitud, θ la dirección (x o p).' }],
        meaning: [{ kind: 'p', text: 'a² y a†² cambian n en ±2: el squeezed es superposición de pares (|0⟩+|2⟩+|4⟩+...). Eso rompe la simetría Δx=Δp del fundamental.' }],
        info: [{ kind: 'p', text: 'S es unitario (exp de anti-hermítico): preserva la norma y la cuantización. Es una "rotación" en el espacio de fases.' }],
        whatIf: [{ kind: 'p', text: 'Aplicar S a un coherente |α⟩ da un "squeezed coherent": comprimido Y desplazado (lo más general para saturar Heisenberg).' }],
        math: [{ kind: 'math-block', tex: 'S(\\zeta) = \\exp\\!\\left[\\tfrac12(\\zeta a^2 - \\zeta^* a^{\\dagger 2})\\right], \\quad \\zeta = r e^{i\\theta}.' }],
      },
      {
        id: 's3', label: 'Aplicación: medición de precisión',
        what: [{ kind: 'p', text: 'Discutimos la utilidad.' }],
        why: [{ kind: 'p', text: 'Si quieres medir x con precisión (p.ej. posición de un espejo en LIGO), quieres Δx pequeño. Un squeezed state en x da eso, a costa de Δp grande (que no te importa si no mides p).' }],
        meaning: [{ kind: 'p', text: 'La compresión permite "vencer" el límite estándar cuántico en la observable que te interesa. Es la base de la metrología cuántica.' }],
        info: [{ kind: 'p', text: 'LIGO usa luz squeezed para detectar ondas gravitacionales: la compresión reduce el ruido de fase por debajo del fundamental.' }],
        whatIf: [{ kind: 'p', text: 'El límite es Heisenberg: por mucho que comprimas x, Δx·Δp=ℏ/2. No puedes vencerlo, solo redistribuir.' }],
        math: [{ kind: 'p', text: 'Aplicación: medición de x con Δx = e^{-r}·Δx₀ → sensibilidad mejorada por factor e^{r}. Usado en LIGO para detección de ondas gravitacionales.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'Un squeezed state tiene Δx = e^{-r}Δx₀, Δp = e^{r}Δp₀ (producto ℏ/2). Se construye con S(ζ)=exp[½(ζa²−ζ*a†²)] (ζ=r·e^{iθ}). Saturan Heisenberg como el coherente pero reparten asimétricamente la incertidumbre. Útiles para medición de precisión: LIGO los usa para reducir el ruido cuántico por debajo del fundamental en la observable de interés.' }],
  },

  // ===================== 2.4 — Wave packet spreading derivation =====================
  {
    id: 'ex-2-4d',
    sectionId: '2.4',
    conceptIds: ['c2-free-particle'],
    title: 'Ensanchamiento del paquete de onda: derivación',
    difficulty: 3,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Para un paquete gaussiano libre con φ(k) ∝ e^{-(k-k₀)²/(4σ²)}, deriva que el ancho espacial evoluciona como σ(t) = σ₀√(1 + (ℏt/(2mσ₀²))²). Comenta el límite t→0 y t→∞.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿De dónde sale el ensanchamiento?' }],
        accept: ['dispersion', 'ω(k) no lineal', 'fases relativas'],
        why: [{ kind: 'p', text: 'El ensanchamiento viene de que ω(k) = ℏk²/2m no es lineal: cada componente de k viaja a distinta velocidad de fase, las fases se desalinean y el paquete se deforma.' }],
        reveal: [{ kind: 'p', text: 'De la dispersión: ω(k) no lineal → distintas k viajan a distintas v_f → el paquete se ensancha. El cálculo usa la forma analítica de la integral gaussiana con fase cuadrática.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Ψ(x,t) = (1/√(2π)) ∫ φ(k) e^{i(kx-ωt)} dk con ω=ℏk²/(2m).' }] },
      { blocks: [{ kind: 'p', text: 'φ(k) gaussiana centrada en k₀. El exponente es cuadrático en k: se integra como gaussiana.' }] },
      { blocks: [{ kind: 'p', text: 'Resultado: |Ψ|² es gaussiana con varianza σ(t)² = σ₀² + (ℏt/(2mσ₀))² = σ₀²(1+(ℏt/(2mσ₀²))²).' }] },
      { blocks: [{ kind: 'p', text: 'σ(t) = σ₀√(1+(ℏt/(2mσ₀²))²). t→0: σ→σ₀. t→∞: σ ~ ℏt/(2mσ₀) (crece linealmente).' }] },
      { blocks: [{ kind: 'p', text: 'Cuanto más localizado inicialmente (σ₀ pequeño), más rápido se ensancha: Heisenberg en acción.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Integral gaussiana',
        what: [{ kind: 'p', text: 'Planteamos la integral para Ψ(x,t).' }],
        why: [{ kind: 'p', text: 'Sustituyendo φ(k) y ω(k), el exponente es cuadrático en k: la integral es gaussiana y se hace analíticamente.' }],
        meaning: [{ kind: 'p', text: 'La gaussiana en k se transforma en gaussiana en x (con un ancho que depende de t). Es la propiedad especial de las gaussianas.' }],
        info: [{ kind: 'p', text: 'El factor complejo 1/(1+iαt) aparece de la fase cuadrática e^{-iℏk²t/(2m)}.' }],
        whatIf: [{ kind: 'p', text: 'Si φ(k) no fuera gaussiana, la integral no sería analítica y el paquete se deformaría de forma no trivial (no solo ensanchar).' }],
        math: [{ kind: 'math-block', tex: '\\Psi(x,t) = \\frac{1}{\\sqrt{2\\pi}} \\int \\phi(k)\\,e^{i(kx - \\hbar k^2 t/2m)}\\,dk.' }],
      },
      {
        id: 's2', label: 'Ancho σ(t)',
        what: [{ kind: 'p', text: 'Extraemos el ancho de |Ψ|².' }],
        why: [{ kind: 'p', text: 'Tras integrar, |Ψ|² es gaussiana en x con varianza σ(t)² = σ₀² + (ℏt/(2mσ₀))². El segundo término es el ensanchamiento por dispersión.' }],
        meaning: [{ kind: 'p', text: 'σ(t) = σ₀√(1+(ℏt/(2mσ₀²))²): el ancho crece con t. Cuanto más localizado al inicio (σ₀ pequeño), más rápido crece (Heisenberg).' }],
        info: [{ kind: 'p', text: 'El término ℏt/(2mσ₀) es la "dispersión de velocidades": Δv ~ ℏ/(2mσ₀) (por Δp=ℏ/(2σ₀)), y en tiempo t se traduce en Δx adicional.' }],
        whatIf: [{ kind: 'p', text: 'Para una partícula macroscópica (m grande), α = ℏ/(2mσ₀²) es minúsculo: el ensanchamiento es desprecible. Por eso no lo vemos en lo clásico.' }],
        math: [{ kind: 'math-block', tex: '\\sigma(t) = \\sigma_0\\sqrt{1 + \\left(\\frac{\\hbar t}{2m\\sigma_0^2}\\right)^2}.' }],
      },
      {
        id: 's3', label: 'Límites',
        what: [{ kind: 'p', text: 'Analizamos los límites.' }],
        why: [{ kind: 'p', text: 't→0: σ→σ₀ (sin ensanchamiento, paquete inicial). t→∞: el 1 se vuelve despreciable frente al cuadrado, σ ~ ℏt/(2mσ₀): crece linealmente con t.' }],
        meaning: [{ kind: 'p', text: 'A corto plazo el paquete se mantiene localizado; a largo plazo se dispersa linealmente. La tasa de dispersión es ℏ/(2mσ₀): inversamente proporcional a la masa y al ancho inicial.' }],
        info: [{ kind: 'p', text: 'El carácter lineal en t→∞ es típico de la dispersión cuadrática ω∝k². Con otra relación de dispersión, el comportamiento cambia.' }],
        whatIf: [{ kind: 'p', text: 'En un medio no dispersivo (ω∝k, como una cuerda ideal), el paquete no se ensancha: σ(t)=σ₀ siempre. La dispersión es la fuente del ensanchamiento.' }],
        math: [{ kind: 'math-block', tex: 't \\to 0: \\; \\sigma \\to \\sigma_0. \\quad t \\to \\infty: \\; \\sigma \\sim \\frac{\\hbar t}{2m\\sigma_0} \\text{ (crecimiento lineal)}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'σ(t) = σ₀√(1+(ℏt/(2mσ₀²))²). t→0: σ→σ₀. t→∞: σ ~ ℏt/(2mσ₀) (lineal). El ensanchamiento viene de la dispersión ω∝k²: cada k viaja a distinta velocidad de fase. σ₀ pequeño ⟹ ensanchamiento rápido (Heisenberg); m grande ⟹ despreciable (límite clásico).' }],
  },

  // ===================== 2.6 — Graphical transcendental solving =====================
  {
    id: 'ex-2-6e',
    sectionId: '2.6',
    conceptIds: ['c2-finite-well', 'c2-quantization'],
    title: 'Resolución gráfica: intersecciones de tan(z) y √(z₀²/z²−1)',
    difficulty: 2,
    type: 'graph-interpretation',
    statement: [
      { kind: 'p', text: 'Para el pozo finito, las soluciones pares cumplen tan(z) = √(z₀²/z² − 1) con z ∈ (0, z₀). Describe gráficamente cómo aparecen las soluciones y por qué el número de estados ligados pares es ⌈z₀/π⌉. ¿Qué pasa cuando z₀ cruza π/2, 3π/2, 5π/2...?' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué forma tiene la curva √(z₀²/z²−1)?' }],
        accept: ['decrece', 'cae', 'parte de z0', 'asintota'],
        why: [{ kind: 'p', text: 'Visualizar la curva ayuda a contar intersecciones: parte de z=z₀ (donde vale 0) y cae hacia 0 conforme z→0. tan(z) oscila entre asíntotas.' }],
        reveal: [{ kind: 'p', text: '√(z₀²/z²−1) parte de 0 en z=z₀ y crece hacia +∞ conforme z→0. tan(z) oscila entre asíntotas en π/2+nπ. Las intersecciones son los estados.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: '√(z₀²/z²−1) en z=z₀ vale 0; crece hacia +∞ cuando z→0 (ramas hiperbólicas).' }] },
      { blocks: [{ kind: 'p', text: 'tan(z) tiene asíntotas en z=π/2, 3π/2, 5π/2... En cada rama (π/2, 3π/2), va de +∞ a −∞.' }] },
      { blocks: [{ kind: 'p', text: 'Intersecciones: una por cada rama de tan que esté dentro de (0, z₀). Número de pares = ⌈z₀/π⌉ (aprox).' }] },
      { blocks: [{ kind: 'p', text: 'Cuando z₀ cruza π/2: aparece el primer par (fundamental). Al cruzar 3π/2: aparece el segundo. Etc.' }] },
      { blocks: [{ kind: 'p', text: 'Los impares (-cot(z)=...) aparecen al cruzar π, 2π, ... Total ligados = pares + impares.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Forma de las dos curvas',
        what: [{ kind: 'p', text: 'Visualizamos las dos curvas en el plano (z, f(z)).' }],
        why: [{ kind: 'p', text: 'La gráfica es la forma de resolver trascendentales sin cálculo numérico. Cada cruce es un estado.' }],
        meaning: [{ kind: 'p', text: 'tan(z) oscila (infinitas ramas); √(z₀²/z²−1) cae monótonamente. Sus cruces dentro de (0,z₀) son los estados pares.' }],
        info: [{ kind: 'p', text: 'El dominio (0,z₀) limita los cruces: solo cuentan los z < z₀. Fuera, √ sería imaginaria (no físico).' }],
        whatIf: [{ kind: 'p', text: 'Para los impares, se usa -cot(z) (asíntotas en π, 2π...): aparecen desplazados respecto a los pares.' }],
        math: [{ kind: 'math-block', tex: '\\text{Par: } \\tan z = \\sqrt{z_0^2/z^2 - 1}, \\quad z \\in (0, z_0). \\;\\; \\sqrt{\\cdot} \\text{ parte de } 0 \\text{ en } z_0, \\text{ crece a } \\infty \\text{ cuando } z \\to 0.' }],
      },
      {
        id: 's2', label: 'Conteo de intersecciones',
        what: [{ kind: 'p', text: 'Contamos cuántos cruces hay.' }],
        why: [{ kind: 'p', text: 'Cada rama de tan(z) entre dos asíntotas (π/2+nπ, π/2+(n+1)π) cruza una vez a la curva decreciente (si está dentro de (0,z₀)). Así que el número de pares = número de ramas de tan en (0,z₀) = ⌈z₀/π⌉ (aprox).' }],
        meaning: [{ kind: 'p', text: 'A mayor z₀, más ramas de tan dentro del dominio: más estados pares. Siempre hay al menos el fundamental (primera rama).' }],
        info: [{ kind: 'p', text: 'Las asíntotas de tan están en π/2, 3π/2, 5π/2...: a cada múltiplo impar de π/2, una nueva rama entra en (0,z₀) cuando z₀ lo supera.' }],
        whatIf: [{ kind: 'p', text: 'Sumando pares e impares, el total de estados ligados N ≈ ⌊z₀/π⌋ + 1 (cada π de z₀ añade aproximadamente un estado).' }],
        math: [{ kind: 'math-block', tex: 'N_{\\text{pares}} \\approx \\lceil z_0/\\pi \\rceil, \\quad N_{\\text{impares}} \\approx \\lfloor z_0/\\pi \\rfloor, \\quad N_{\\text{total}} \\approx \\lfloor z_0/\\pi \\rfloor + 1.' }],
      },
      {
        id: 's3', label: 'Aparición de nuevos estados',
        what: [{ kind: 'p', text: 'Describimos qué pasa al cruzar z₀ = π/2, 3π/2, ...' }],
        why: [{ kind: 'p', text: 'Cuando z₀ cruza una asíntota de tan (π/2, 3π/2...), una nueva rama de tan entra en (0,z₀): aparece un nuevo estado par. Para los impares, los umbrales son π, 2π, ...' }],
        meaning: [{ kind: 'p', text: 'Los estados aparecen de uno en uno conforme z₀ crece, alternando par/impar. Es una transición cuantitativa: z₀ cruza un umbral → un estado más.' }],
        info: [{ kind: 'p', text: 'El primer estado (fundamental) siempre existe: la primera rama de tan (0, π/2) siempre está en (0,z₀) si z₀>0. Por eso siempre hay ≥1 en 1D.' }],
        whatIf: [{ kind: 'p', text: 'En 3D, el teorema "siempre ≥1" no aplica: un pozo suficientemente débil puede no ligar. La dimensión cambia la topología.' }],
        math: [{ kind: 'p', text: 'z₀ ∈ (0, π/2): 1 estado (par). z₀ ∈ (π/2, π): 2 (par+impar). z₀ ∈ (π, 3π/2): 3. Etc. Cada π/2 cruzado añade un estado.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'La curva √(z₀²/z²−1) parte de 0 en z=z₀ y crece hacia ∞ cuando z→0; tan(z) oscila con asíntotas en π/2+nπ. Cada rama de tan dentro de (0,z₀) cruza una vez → un estado par. N_pares ≈ ⌈z₀/π⌉, N_total ≈ ⌊z₀/π⌋+1. Conforme z₀ cruza π/2, 3π/2... aparecen nuevos estados pares; π, 2π... los impares. Siempre ≥1 (1D).' }],
  },
]
