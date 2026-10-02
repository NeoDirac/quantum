import type { Exercise } from '@/lib/content-types'

// Additional original exercises for Chapter 2 (Phase 2 expansion).
// Covers sections 2.2 (infinite well superpositions/expectations),
// 2.3 (harmonic oscillator operator algebra), 2.6 (finite well + transcendental),
// 2.7 (S-matrix properties and applications).

export const EXERCISES_PHASE2: Exercise[] = [
  // ===================== SECTION 2.2 — more infinite well =====================
  {
    id: 'ex-2-2c',
    sectionId: '2.2',
    conceptIds: ['c2-infinite-well', 'c2-quantization'],
    title: 'Valores esperados en el estado n del pozo infinito',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Para una partícula en el pozo infinito de ancho a, en el estado estacionario ψ_n, calcula ⟨x⟩, ⟨x²⟩ y la incertidumbre Δx. Interpreta por qué ⟨x⟩ = a/2 sin hacer cuentas.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: 'Sin integrar, ¿cuánto vale ⟨x⟩ y por qué?' }],
        accept: ['a/2', 'mitad', 'simetria', 'simetría'],
        why: [{ kind: 'p', text: 'Reconocer la simetría antes de calcular ahorra trabajo y da intuición: si |ψ_n|² es simétrica respecto al centro, la media está en el centro.' }],
        reveal: [{ kind: 'p', text: '⟨x⟩ = a/2 porque |ψ_n|² = (2/a)sin²(nπx/a) es simétrica respecto al centro x = a/2 (cambia x por a−x y queda igual). El promedio de una distribución simétrica es su centro.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Usa la simetría: |ψ_n(x)|² es simétrica respecto a x = a/2, así que ⟨x⟩ = a/2 sin integrar.' }] },
      { blocks: [{ kind: 'p', text: 'Para ⟨x²⟩ usa la identidad sin²θ = (1−cos 2θ)/2 y la integral de x²cos(nπx/a).' }] },
      { blocks: [{ kind: 'p', text: '∫₀ᵃ x² sin²(nπx/a) dx = a³/6 − a³/(2n²π²). Úsala.' }] },
      { blocks: [{ kind: 'p', text: '⟨x²⟩ = (a²/3)(1 − 3/(2n²π²)).' }] },
      { blocks: [{ kind: 'p', text: 'Δx = √(⟨x²⟩ − ⟨x⟩²) = (a/(2nπ))√(n²π²/3 − 2).' }] },
    ],
    steps: [
      {
        id: 's1', label: '⟨x⟩ por simetría',
        what: [{ kind: 'p', text: 'Argumentamos que ⟨x⟩ = a/2 sin calcular.' }],
        why: [{ kind: 'p', text: 'Porque |ψ_n|² es simétrica respecto al centro del pozo (x ↔ a−x deja invariante sin²(nπx/a)). La media de una distribución simétrica respecto a un punto es ese punto.' }],
        meaning: [{ kind: 'p', text: 'La partícula, en promedio, está en el centro del pozo: no hay sesgo a ningún lado porque el potencial es simétrico.' }],
        info: [{ kind: 'p', text: 'La simetría del potencial V(x) (que aquí es constante dentro del pozo, simétrica respecto al centro) se hereda en |ψ_n|².' }],
        whatIf: [{ kind: 'p', text: 'Si el pozo no fuera simétrico (p.ej. un potencial inclinado), ⟨x⟩ no sería el centro y habría que calcular.' }],
        math: [{ kind: 'math-block', tex: '\\langle x \\rangle = \\int_0^a x\\,|\\psi_n|^2\\,dx = \\frac{a}{2}\\int_0^a |\\psi_n|^2\\,dx = \\frac{a}{2}.' }],
      },
      {
        id: 's2', label: '⟨x²⟩ por integración',
        what: [{ kind: 'p', text: 'Calculamos ⟨x²⟩.' }],
        why: [{ kind: 'p', text: 'No hay simetría que lo dé directo: la varianza requiere ⟨x²⟩. Usamos sin² = (1−cos 2θ)/2 y la integral estándar de x²cos.' }],
        meaning: [{ kind: 'p', text: '⟨x²⟩ > (a/2)² porque la distribución tiene dispersión: la partícula no está localizada en el centro.' }],
        info: [{ kind: 'p', text: 'A mayor n, ⟨x²⟩ se acerca a a²/3 (valor clásico uniforme): de nuevo, correspondencia.' }],
        whatIf: [{ kind: 'p', text: 'En el límite n→∞, ⟨x²⟩ → a²/3: la distribución clásica uniforme en [0,a].' }],
        math: [{ kind: 'math-block', tex: '\\langle x^2 \\rangle = \\frac{2}{a}\\int_0^a x^2 \\sin^2\\!\\left(\\tfrac{n\\pi x}{a}\\right)dx = \\frac{a^2}{3} - \\frac{a^2}{2n^2\\pi^2}.' }],
      },
      {
        id: 's3', label: 'Incertidumbre Δx',
        what: [{ kind: 'p', text: 'Calculamos Δx.' }],
        why: [{ kind: 'p', text: 'Δx = √(⟨x²⟩ − ⟨x⟩²), definición de desviación estándar.' }],
        meaning: [{ kind: 'p', text: 'Δx crece con a (más espacio) y decrece con n: estados más excitados son más "clásicos" y, pese a oscilar más, su |ψ_n|² llena más uniformemente el pozo.' }],
        info: [{ kind: 'p', text: 'Combinado con Δp = nπℏ/a, se verifica Δx·Δp = (ℏ/2)√(n²π²/3 − 2) ≥ ℏ/2 (Heisenberg).' }],
        whatIf: [{ kind: 'p', text: 'Para n=1, Δx·Δp ≈ 0.57ℏ > ℏ/2: el estado fundamental satura casi el límite de Heisenberg.' }],
        math: [{ kind: 'math-block', tex: '\\Delta x = \\sqrt{\\langle x^2 \\rangle - \\langle x \\rangle^2} = \\frac{a}{2n\\pi}\\sqrt{\\frac{n^2\\pi^2}{3} - 2}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: '⟨x⟩ = a/2 (por simetría), ⟨x²⟩ = a²/3 − a²/(2n²π²), Δx = (a/(2nπ))√(n²π²/3 − 2). El producto Δx·Δp satisface Heisenberg.' }],
    commonErrors: [
      {
        id: 'e1', type: 'algebraic',
        signature: [{ kind: 'p', text: 'Olvidar el factor 2/a de la normalización al integrar.' }],
        explanation: [{ kind: 'p', text: '|ψ_n|² = (2/a)sin²(nπx/a); sin ese 2/a la integral da la mitad del valor correcto. La normalización no es decorativa: fija la escala.' }],
      },
    ],
  },

  {
    id: 'ex-2-2d',
    sectionId: '2.2',
    conceptIds: ['c2-superposition', 'c2-stationary-states-meaning'],
    title: 'Evolución temporal: ⟨H⟩ se conserva, ⟨x⟩ oscila',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Un estado en el pozo infinito es Ψ(x,0) = (1/√2)(ψ₁ + ψ₃). Demuestra que ⟨H⟩ es constante en el tiempo mientras que ⟨x⟩ oscila. ¿A qué frecuencia? Explica físicamente la diferencia.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Por qué ⟨H⟩ es constante?' }],
        accept: ['energia conservada', 'hamiltoniano', 'c_n constantes', 'diagonal'],
        why: [{ kind: 'p', text: 'Distinguir constantes del movimiento (energía) de magnitudes que evolucionan (posición) es clave: los c_n no cambian, pero las fases relativas sí.' }],
        reveal: [{ kind: 'p', text: '⟨H⟩ = Σ|c_n|²E_n es constante porque los |c_n| no cambian (solo giran fases). Como [H,H]=0, la energía es constante del movimiento.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: '⟨H⟩ = Σ|c_n|²E_n porque ψ_n son autoestados de H (la base diagonaliza a H).' }] },
      { blocks: [{ kind: 'p', text: 'Las fases temporales e^{-iE_n t/ℏ} no aparecen en |c_n|², así que ⟨H⟩ no cambia.' }] },
      { blocks: [{ kind: 'p', text: '⟨x⟩ sí tiene términos cruzados ⟨ψ_1|x|ψ_3⟩ con fase e^{-i(E_3-E_1)t/ℏ}: oscila.' }] },
      { blocks: [{ kind: 'p', text: 'La frecuencia es ω = (E_3 - E_1)/ℏ = (9-1)π²ℏ/(2ma²) = 4π²ℏ/(ma²).' }] },
      { blocks: [{ kind: 'p', text: 'Físicamente: energía es constante del movimiento; posición no lo es porque [x,H]≠0.' }] },
    ],
    steps: [
      {
        id: 's1', label: '⟨H⟩ constante',
        what: [{ kind: 'p', text: 'Calculamos ⟨H⟩(t).' }],
        why: [{ kind: 'p', text: 'Porque la base {ψ_n} diagonaliza a H: ⟨ψ_m|H|ψ_n⟩ = E_n δ_{mn}. Solo sobreviven los términos diagonales, que no tienen fase temporal.' }],
        meaning: [{ kind: 'p', text: 'La energía total se conserva: medir la energía da E₁ con prob ½ o E₃ con prob ½, en cualquier instante. El valor esperado es la media ponderada.' }],
        info: [{ kind: 'p', text: 'Los c_n son constantes del tiempo (lo único que cambia es la fase e^{-iE_n t/ℏ}).' }],
        whatIf: [{ kind: 'p', text: 'Si el estado fuera autoestado de H (un solo c_n), ⟨H⟩ = E_n sería exactamente la energía, sin dispersión.' }],
        math: [{ kind: 'math-block', tex: '\\langle H \\rangle = \\sum_n |c_n|^2 E_n = \\tfrac12 E_1 + \\tfrac12 E_3 = \\text{constante}.' }],
      },
      {
        id: 's2', label: '⟨x⟩ oscilante',
        what: [{ kind: 'p', text: 'Calculamos ⟨x⟩(t).' }],
        why: [{ kind: 'p', text: 'Los términos cruzados ⟨ψ_m|x|ψ_n⟩ con m≠n no se anulan y traen la fase e^{-i(E_n-E_m)t/ℏ}. Como E₃ ≠ E₁, esa fase varía.' }],
        meaning: [{ kind: 'p', text: 'La posición media oscila: la partícula "se mueve" de un lado al otro del pozo, en contraste con un estado estacionario donde ⟨x⟩ = a/2 constante.' }],
        info: [{ kind: 'p', text: 'La diferencia es que [x, H] ≠ 0: x no es constante del movimiento, así que su valor esperado puede evolucionar.' }],
        whatIf: [{ kind: 'p', text: 'Si los dos estados tuvieran la misma energía (degeneración), no habría oscilación: la fase relativa no cambiaría.' }],
        math: [{ kind: 'math-block', tex: '\\langle x \\rangle(t) = \\tfrac{a}{2} + 2\\Re\\!\\left[c_1^* c_3\\,x_{13}\\,e^{-i(E_3-E_1)t/\\hbar}\\right], \\quad x_{13} = \\int_0^a \\psi_1 x\\,\\psi_3\\,dx.' }],
      },
      {
        id: 's3', label: 'Frecuencia de oscilación',
        what: [{ kind: 'p', text: 'Identificamos la frecuencia.' }],
        why: [{ kind: 'p', text: 'El término oscilante lleva e^{-i(E₃-E₁)t/ℏ}, así que la frecuencia angular es ω = (E₃-E₁)/ℏ.' }],
        meaning: [{ kind: 'p', text: 'La "frecuencia de batido" entre dos niveles de energía es la diferencia de sus frecuencias de fase. Es un fenómeno de interferencia cuántica.' }],
        info: [{ kind: 'p', text: 'E_n = n²π²ℏ²/(2ma²), así que E₃-E₁ = (9-1)π²ℏ²/(2ma²) = 4π²ℏ²/ma².' }],
        whatIf: [{ kind: 'p', text: 'A mayor diferencia de energía, mayor frecuencia: estados más separados oscilan más rápido.' }],
        math: [{ kind: 'math-block', tex: '\\omega = \\frac{E_3 - E_1}{\\hbar} = \\frac{(9-1)\\pi^2\\hbar}{2ma^2} = \\frac{4\\pi^2\\hbar}{ma^2}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: '⟨H⟩ = (E₁+E₃)/2 = 5π²ℏ²/(ma²) es constante (energía conservada). ⟨x⟩(t) oscila a frecuencia ω = (E₃-E₁)/ℏ = 4π²ℏ/ma² porque [x,H]≠0 (x no es constante del movimiento).' }],
    commonErrors: [
      {
        id: 'e1', type: 'physical-interpretation',
        signature: [{ kind: 'p', text: 'Decir que ⟨H⟩ oscila porque la fase temporal cambia.' }],
        explanation: [{ kind: 'p', text: 'La fase e^{-iE_n t/ℏ} se cancela en ⟨ψ_n|H|ψ_n⟩ = E_n (sin fase). Solo aparecería en términos cruzados, pero H es diagonal en su base propia. La energía se conserva.' }],
      },
    ],
  },

  // ===================== SECTION 2.3 — more HO =====================
  {
    id: 'ex-2-3b',
    sectionId: '2.3',
    conceptIds: ['c2-harmonic-oscillator'],
    title: 'Valores esperados ⟨x²⟩ y ⟨p²⟩ por álgebra de operadores',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Usa el método algebraico para calcular ⟨x²⟩ y ⟨p²⟩ en el estado |n⟩ del oscilador armónico. Verifica que Δx·Δp = (n+½)ℏ y que satisface Heisenberg.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Cómo se escriben x y p en términos de a, a†?' }],
        accept: ['raiz', 'sqrt', 'a + a†', 'a† - a'],
        why: [{ kind: 'p', text: 'Esta sustitución es la clave del método algebraico: convierte integrales con Hermite en manipulación de operadores. Es lo que hace el método potente.' }],
        reveal: [{ kind: 'p', text: 'x = √(ℏ/2mω)·(a + a†), p = i√(mωℏ/2)·(a† − a). Viene de invertir las definiciones de a y a†.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'x = √(ℏ/2mω)(a + a†), p = i√(mωℏ/2)(a† − a).' }] },
      { blocks: [{ kind: 'p', text: '⟨x²⟩ = (ℏ/2mω)⟨(a+a†)²⟩ = (ℏ/2mω)⟨a² + aa† + a†a + (a†)²⟩.' }] },
      { blocks: [{ kind: 'p', text: 'a²|n⟩ = √(n(n-1))|n-2⟩ → ⟨n|a²|n⟩ = 0 (ortogonal). Igual (a†)². Solo quedan aa† + a†a.' }] },
      { blocks: [{ kind: 'p', text: 'aa† + a†a = 2a†a + 1 = 2N + 1. ⟨n|2N+1|n⟩ = 2n+1.' }] },
      { blocks: [{ kind: 'p', text: '⟨x²⟩ = (ℏ/2mω)(2n+1) = (n+½)ℏ/(mω). Análogamente ⟨p²⟩ = (n+½)mωℏ.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Sustituir x, p',
        what: [{ kind: 'p', text: 'Expresamos x y p en términos de a, a†.' }],
        why: [{ kind: 'p', text: 'Porque las reglas de acción de a y a† sobre |n⟩ son simples (√n, √(n+1)), mientras que integrar Hermite es laborioso. El álgebra sustituye al cálculo.' }],
        meaning: [{ kind: 'p', text: 'x y p se "descomponen" en crear/destruir cuantos: a† crea, a destruye. La posición es proporcional a crear+destruir; el momento, a crear−destruir (con un i).' }],
        info: [{ kind: 'p', text: 'Las constantes √(ℏ/2mω) y √(mωℏ/2) vienen de las definiciones de a, a† en términos de x y p.' }],
        whatIf: [{ kind: 'p', text: 'Para el método analítico (Hermite) harías las mismas cuentas con integrales explícitas: mucho más trabajo, mismo resultado.' }],
        math: [{ kind: 'math-block', tex: 'x = \\sqrt{\\frac{\\hbar}{2m\\omega}}(a + a^\\dagger), \\quad p = i\\sqrt{\\frac{m\\omega\\hbar}{2}}(a^\\dagger - a).' }],
      },
      {
        id: 's2', label: 'Expandir ⟨x²⟩',
        what: [{ kind: 'p', text: 'Calculamos ⟨x²⟩.' }],
        why: [{ kind: 'p', text: 'Los términos a² y (a†)² se anulan por ortonormalidad (|n⟩ y |n±2⟩ son ortogonales). Solo sobreviven aa† y a†a.' }],
        meaning: [{ kind: 'p', text: 'Las contribuciones que cambian n en ±2 no aportan al valor esperado en un estado |n⟩: solo importan las que conservan n.' }],
        info: [{ kind: 'p', text: 'La ortonormalidad ⟨m|n⟩ = δ_{mn} es lo que anula los términos fuera de diagonal.' }],
        whatIf: [{ kind: 'p', text: 'En un estado superpuesto, los términos cruzados SÍ contribuirían: aparecerían oscilaciones temporales.' }],
        math: [{ kind: 'math-block', tex: '\\langle x^2 \\rangle = \\frac{\\hbar}{2m\\omega}\\langle (a + a^\\dagger)^2 \\rangle = \\frac{\\hbar}{2m\\omega}\\langle aa^\\dagger + a^\\dagger a \\rangle = \\frac{\\hbar}{2m\\omega}(2n + 1).' }],
      },
      {
        id: 's3', label: '⟨p²⟩ y producto Δx·Δp',
        what: [{ kind: 'p', text: 'Calculamos ⟨p²⟩ y verificamos Heisenberg.' }],
        why: [{ kind: 'p', text: 'Misma lógica: p² = -(mωℏ/2)(a†-a)², sobreviven a†a y aa†, dan 2n+1. El producto Δx·Δp usa Δx²Δp² = ⟨x²⟩⟨p²⟩ (ya que ⟨x⟩=⟨p⟩=0 por paridad).' }],
        meaning: [{ kind: 'p', text: 'Δx·Δp = (n+½)ℏ: a mayor n, mayor incertidumbre. El mínimo (n=0) satura Heisenberg: el estado fundamental del oscilador es un estado "minimal" de incertidumbre.' }],
        info: [{ kind: 'p', text: 'El que el estado fundamental sature Heisenberg no es casualidad: el oscilador minimiza Δx²+Δp²/(m²ω²), y el mínimo satura el límite de Heisenberg.' }],
        whatIf: [{ kind: 'p', text: 'Un estado "squeezed" (comprimido) puede tener Δx < Δx_0 pero entonces Δp > Δp_0: el producto nunca baja de ℏ/2.' }],
        math: [{ kind: 'math-block', tex: '\\langle p^2 \\rangle = (n+\\tfrac12)m\\omega\\hbar, \\quad \\Delta x \\cdot \\Delta p = (n+\\tfrac12)\\hbar \\geq \\frac{\\hbar}{2}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: '⟨x²⟩ = (n+½)ℏ/(mω), ⟨p²⟩ = (n+½)mωℏ, Δx·Δp = (n+½)ℏ ≥ ℏ/2. El estado fundamental (n=0) satura la cota de Heisenberg — es un estado minimal de incertidumbre.' }],
    commonErrors: [
      {
        id: 'e1', type: 'algebraic',
        signature: [{ kind: 'p', text: 'Olvidar el conmutador al reordenar a·a†.' }],
        explanation: [{ kind: 'p', text: 'a y a† NO conmutan: aa† = a†a + 1 (la relación de conmutación). Olvidar el +1 lleva a ⟨x²⟩ = (ℏ/2mω)·2n, perdiendo el ½ del punto cero. El orden importa.' }],
      },
    ],
  },

  {
    id: 'ex-2-3c',
    sectionId: '2.3',
    conceptIds: ['c2-harmonic-oscillator'],
    title: 'Estado fundamental por a|0⟩ = 0',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'A partir de la condición a|0⟩ = 0, deriva explícitamente la función de onda ψ₀(x) del estado fundamental del oscilador y verifica que su energía es ½ℏω.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué significa físicamente a|0⟩ = 0?' }],
        accept: ['no hay mas abajo', 'minimo', 'punto cero', 'no se puede destruir'],
        why: [{ kind: 'p', text: 'Esta condición es el análogo algebraico de "no hay estados por debajo": fija el estado fundamental sin resolver la EDO.' }],
        reveal: [{ kind: 'p', text: 'Significa que |0⟩ es el estado de menor energía: a (destructor) no puede bajar más. Es lo que fija ψ₀ por la ecuación diferencial resultante.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Escribe a en representación de posición: a = √(mω/2ℏ)(x + (i/mω)p) con p = -iℏ d/dx.' }] },
      { blocks: [{ kind: 'p', text: 'a ψ₀ = √(mω/2ℏ)(x + (ℏ/mω) d/dx) ψ₀ = 0. Ecuación diferencial de primer orden.' }] },
      { blocks: [{ kind: 'p', text: 'dψ₀/dx = -(mω/ℏ)x·ψ₀. Solución: ψ₀ ∝ e^{-mω x²/(2ℏ)}.' }] },
      { blocks: [{ kind: 'p', text: 'Normaliza: ∫|ψ₀|²dx = 1 → ψ₀ = (mω/πℏ)^{1/4} e^{-mω x²/(2ℏ)}.' }] },
      { blocks: [{ kind: 'p', text: 'Ĥψ₀ = ℏω(a†a + ½)ψ₀ = ℏω(0 + ½)ψ₀ = ½ℏω ψ₀. Verificado.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Ecuación diferencial',
        what: [{ kind: 'p', text: 'Pasamos a|0⟩ = 0 a representación de posición.' }],
        why: [{ kind: 'p', text: 'Porque |0⟩ en representación de posición es ψ₀(x), y a se vuelve un operador diferencial al sustituir p = -iℏ d/dx.' }],
        meaning: [{ kind: 'p', text: 'La condición algebraica se traduce en una EDO de primer orden para ψ₀: mucho más simple que la EDO de segundo orden original.' }],
        info: [{ kind: 'p', text: 'El operador a mezcla x y p (derivada): su anulación es una ecuación diferencial.' }],
        whatIf: [{ kind: 'p', text: 'Para estados excitados, a†|n⟩ = √(n+1)|n+1⟩ ya no da una EDO simple: se usa recursión.' }],
        math: [{ kind: 'math-block', tex: 'a\\,\\psi_0 = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(x + \\frac{\\hbar}{m\\omega}\\frac{d}{dx}\\right)\\psi_0 = 0 \\;\\Rightarrow\\; \\frac{d\\psi_0}{dx} = -\\frac{m\\omega}{\\hbar}x\\,\\psi_0.' }],
      },
      {
        id: 's2', label: 'Solución y normalización',
        what: [{ kind: 'p', text: 'Resolvemos y normalizamos.' }],
        why: [{ kind: 'p', text: 'La EDO es de variables separables: dψ/ψ = -(mω/ℏ)x dx. La integral da un exponencial. La normalización fija la constante.' }],
        meaning: [{ kind: 'p', text: 'ψ₀ es una gaussiana: la "campana" más localizada compatible con Heisenberg. Es por eso el estado minimal de incertidumbre.' }],
        info: [{ kind: 'p', text: 'La gaussiana aparece porque el potencial es cuadrático: el único autoestado con forma gaussiana es el fundamental; los excitados son gaussiana × Hermite.' }],
        whatIf: [{ kind: 'p', text: 'En un potencial no cuadrático, el estado fundamental no sería gaussiano: pierde esa propiedad especial.' }],
        math: [{ kind: 'math-block', tex: '\\psi_0(x) = \\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4} e^{-m\\omega x^2/(2\\hbar)}.' }],
      },
      {
        id: 's3', label: 'Verificar la energía',
        what: [{ kind: 'p', text: 'Verificamos E₀ = ½ℏω.' }],
        why: [{ kind: 'p', text: 'Porque Ĥ = ℏω(N + ½) y N|0⟩ = a†a|0⟩ = a†·0 = 0. Así que Ĥ|0⟩ = ½ℏω|0⟩.' }],
        meaning: [{ kind: 'p', text: 'La energía del punto cero ½ℏω: no se puede anular porque implicaría Δx=0 y Δp=0 (violando Heisenberg). Es la firma del confinamiento cuántico.' }],
        info: [{ kind: 'p', text: 'N = a†a es el operador número; N|n⟩ = n|n⟩. Para n=0, N da 0.' }],
        whatIf: [{ kind: 'p', text: 'Si ω→0 (oscilador "libre"), el punto cero se anula y la gaussiana se ensancha hasta una constante (no normalizable): recupera la partícula libre.' }],
        math: [{ kind: 'math-block', tex: '\\hat{H}|0\\rangle = \\hbar\\omega(a^\\dagger a + \\tfrac12)|0\\rangle = \\hbar\\omega(0 + \\tfrac12)|0\\rangle = \\tfrac12\\hbar\\omega\\,|0\\rangle.' }],
      },
    ],
    finalAnswer: [{ kind: 'math-block', tex: '\\psi_0(x) = \\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4} e^{-m\\omega x^2/(2\\hbar)}, \\quad E_0 = \\tfrac12\\hbar\\omega.' }],
  },

  // ===================== SECTION 2.6 — more finite well =====================
  {
    id: 'ex-2-6b',
    sectionId: '2.6',
    conceptIds: ['c2-finite-well', 'c2-tunneling'],
    title: 'Penetración en la región prohibida del pozo finito',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Para un estado ligado del pozo finito (0 < E < V₀), sea ψ(x) = C e^{-κ|x|} fuera del pozo con κ = √(2m(V₀-E))/ℏ. Calcula la probabilidad de encontrar la partícula fuera del pozo y discute cómo depende de E (cerca de V₀ vs cerca de 0).' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué significa físicamente que la probabilidad fuera del pozo no sea cero?' }],
        accept: ['penetracion', 'penetración', 'region prohibida', 'tunneling'],
        why: [{ kind: 'p', text: 'Es la firma del pozo finito: la onda no se anula en la frontera, se cuela decayendo. Cuantificar esta penetración es esencial para entender tunneling.' }],
        reveal: [{ kind: 'p', text: 'Es la penetración cuántica: la partícula puede aparecer en una región clásicamente prohibida. Es la base del tunneling y la desintegración alfa.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'P_fuera = 2 ∫_a^∞ |C|² e^{-2κx} dx = |C|² e^{-2κa}/κ.' }] },
      { blocks: [{ kind: 'p', text: 'Para tener P_total = 1, P_fuera debe combinarse con P_dentro. Pero |C|² se fija por continuidad en x=a.' }] },
      { blocks: [{ kind: 'p', text: 'κ = √(2m(V₀-E))/ℏ. Si E → V₀, κ → 0: la cola exponencial decae lentamente, gran penetración.' }] },
      { blocks: [{ kind: 'p', text: 'Si E → 0, κ → √(2mV₀)/ℏ grande: decae rápido, poca penetración.' }] },
      { blocks: [{ kind: 'p', text: 'Conclusión: estados cercanos al "techo" V₀ penetran más; estados profundos (E pequeño) están más confinados.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Probabilidad fuera',
        what: [{ kind: 'p', text: 'Integramos |ψ|² fuera del pozo.' }],
        why: [{ kind: 'p', text: 'Fuera del pozo ψ = C e^{-κ|x|} (decae), así que la integral es una exponencial simple.' }],
        meaning: [{ kind: 'p', text: 'La probabilidad de encontrar la partícula fuera (clásicamente imposible) es no nula: la firma cuántica del pozo finito.' }],
        info: [{ kind: 'p', text: 'Solo contribuyen los estados con E < V₀ (ligados). Para E > V₀ la onda es oscilatoria fuera y la "penetración" deja de tener sentido.' }],
        whatIf: [{ kind: 'p', text: 'Si V₀ → ∞ (pozo infinito), κ → ∞ y P_fuera → 0: recupera el confinamiento duro.' }],
        math: [{ kind: 'math-block', tex: 'P_{\\text{fuera}} = 2\\int_a^\\infty |C|^2 e^{-2\\kappa x}\\,dx = \\frac{|C|^2}{\\kappa}e^{-2\\kappa a}.' }],
      },
      {
        id: 's2', label: 'Dependencia con E',
        what: [{ kind: 'p', text: 'Analizamos cómo cambia con E.' }],
        why: [{ kind: 'p', text: 'κ = √(2m(V₀-E))/ℏ depende de E. Cuando E crece hacia V₀, κ disminuye, la cola decae más lentamente y P_fuera aumenta.' }],
        meaning: [{ kind: 'p', text: 'Los estados cercanos al "techo" del pozo están débilmente ligados: la partícula pasa mucho tiempo fuera, a punto de "escapar". Los estados profundos están bien confinados.' }],
        info: [{ kind: 'p', text: 'Esto es la base física de la ionización: un estado ligado cerca del umbral se desliga fácilmente con pequeñas perturbaciones.' }],
        whatIf: [{ kind: 'p', text: 'Si E ≥ V₀, el estado deja de ser ligado y entra en régimen de scattering: la onda oscila fuera, no decae.' }],
        math: [{ kind: 'math-block', tex: '\\kappa = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar} \\;\\Rightarrow\\; E \\to V_0: \\kappa \\to 0,\\; P_{\\text{fuera}} \\uparrow; \\quad E \\to 0: \\kappa \\to \\frac{\\sqrt{2mV_0}}{\\hbar},\\; P_{\\text{fuera}} \\downarrow.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'P_fuera = (|C|²/κ) e^{-2κa}, con κ = √(2m(V₀-E))/ℏ. Estados cercanos al techo V₀ (κ pequeño) penetran mucho; estados profundos (E pequeño, κ grande) están confinados. Es la base del tunneling y la ionización.' }],
  },

  // ===================== SECTION 2.7 — more S-matrix =====================
  {
    id: 'ex-2-7b',
    sectionId: '2.7',
    conceptIds: ['c2-s-matrix', 'c2-probability-current'],
    title: 'Simetría de la S-matrix para potencial par',
    difficulty: 3,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Para un potencial par V(x) = V(-x), demuestra que la S-matrix satisface S₁₁ = S₂₂ y S₁₂ = S₂₁. Interpreta físicamente: ¿qué dice esto sobre R y T desde la izquierda vs la derecha?' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué transformación relaciona la incidencia desde la izquierda con la desde la derecha, si V es par?' }],
        accept: ['x a -x', 'paridad', 'inversion', 'inversión'],
        why: [{ kind: 'p', text: 'La paridad del potencial es la simetría que intercambia izquierda y derecha. Identificar la simetría da las relaciones entre elementos de S sin resolver.' }],
        reveal: [{ kind: 'p', text: 'La inversión x → -x. Como V(-x) = V(x), la ecuación es invariante, así que la solución de incidencia desde la izquierda se obtiene de la de la derecha por inversión.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Si V es par, el problema de incidencia desde la izquierda y desde la derecha están relacionados por x → -x.' }] },
      { blocks: [{ kind: 'p', text: 'Bajo x → -x: e^{ikx} → e^{-ikx}, así que la onda incidente (A e^{ikx}) se vuelve la transmitida (C e^{ikx} en el otro lado).' }] },
      { blocks: [{ kind: 'p', text: 'Aplicando paridad: el coef. de reflexión desde la izquierda (S₁₁) iguala el de la derecha (S₂₂).' }] },
      { blocks: [{ kind: 'p', text: 'Análogamente, la transmisión es la misma: S₁₂ = S₂₁.' }] },
      { blocks: [{ kind: 'p', text: 'Físicamente: con V par, R y T son los mismos vengas de donde vengas.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Invariancia bajo paridad',
        what: [{ kind: 'p', text: 'Identificamos la simetría.' }],
        why: [{ kind: 'p', text: 'Si V(x) = V(-x), la ecuación de Schrödinger es invariante bajo x → -x. Eso implica que las soluciones de incidencia izquierda y derecha están relacionadas por esta transformación.' }],
        meaning: [{ kind: 'p', text: 'La paridad del potencial es una simetría física: cualquier observable de dispersión debe respetarla. Eso fuerza relaciones entre los elementos de S.' }],
        info: [{ kind: 'p', text: 'Bajo x → -x: e^{±ikx} → e^{∓ikx}, así que "incidente" se vuelve "transmitida" y viceversa.' }],
        whatIf: [{ kind: 'p', text: 'Si V NO fuera par (potencial asimétrico), no habría relación: S₁₁ ≠ S₂₂ en general. La reflexión depende del lado.' }],
        math: [{ kind: 'math-block', tex: 'V(x) = V(-x) \\;\\Rightarrow\\; \\text{si } \\psi(x) \\text{ sol., } \\psi(-x) \\text{ también.}' }],
      },
      {
        id: 's2', label: 'Consecuencias en S',
        what: [{ kind: 'p', text: 'Aplicamos a la S-matrix.' }],
        why: [{ kind: 'p', text: 'Bajo paridad, la onda "entrante desde la izquierda" se vuelve "entrante desde la derecha". Así que la reflexión (que es intrínseca al obstáculo) no cambia: S₁₁ = S₂₂. La transmisión tampoco: S₁₂ = S₂₁.' }],
        meaning: [{ kind: 'p', text: 'Físicamente: con V par, da igual de qué lado incida el haz — se refleja y transmite igual. Es una predicción no trivial de la simetría.' }],
        info: [{ kind: 'p', text: 'Esto simplifica enormemente los cálculos: basta resolver desde un lado, el otro es simétrico.' }],
        whatIf: [{ kind: 'p', text: 'Si V fuera par pero tuviera absorción (potencial complejo), la unitariedad fallaría pero la paridad seguiría dando S₁₁ = S₂₂.' }],
        math: [{ kind: 'math-block', tex: 'S_{11} = S_{22}, \\quad S_{12} = S_{21} \\;\\Rightarrow\\; R_{\\text{izq}} = R_{\\text{der}}, \\; T_{\\text{izq}} = T_{\\text{der}}.' }],
      },
      {
        id: 's3', label: 'Forma simplificada de S',
        what: [{ kind: 'p', text: 'Escribimos la forma reducida de S.' }],
        why: [{ kind: 'p', text: 'Con dos relaciones (paridad) + unitariedad (4 ecuaciones reales) sobre 4 elementos complejos, S se reduce a 2 parámetros: un ángulo de transmisión y una fase.' }],
        meaning: [{ kind: 'p', text: 'Toda la física de dispersión de un potencial par 1D se resume en dos números: cuánto transmite (T) y la fase que adquiere. Sorprendentemente compacto.' }],
        info: [{ kind: 'p', text: 'Esta estructura es la base del "transfer matrix" y de la relación T = 1/(1+...) para pozos y barreras.' }],
        whatIf: [{ kind: 'p', text: 'Sin paridad, S tiene 4 parámetros reales: R_izq, R_der, T y una fase. Más grados de libertad.' }],
        math: [{ kind: 'math-block', tex: 'S = \\begin{pmatrix} r & t \\\\ t & r \\end{pmatrix}, \\quad |r|^2 + |t|^2 = 1, \\quad rt^* + tr^* = 0.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'Para V par: S₁₁ = S₂₂ (= r) y S₁₂ = S₂₁ (= t). Físicamente, la reflexión y transmisión son las mismas desde cualquier lado. S se reduce a 2 parámetros: |r|² (reflexión) y una fase.' }],
    commonErrors: [
      {
        id: 'e1', type: 'conceptual',
        signature: [{ kind: 'p', text: 'Asumir S₁₁ = S₂₂ sin justificar (sin usar paridad de V).' }],
        explanation: [{ kind: 'p', text: 'La igualdad S₁₁ = S₂₂ NO es general: requiere que V sea par. Si V es asimétrico, los coeficientes de reflexión desde cada lado difieren. La simetría es lo que la impone.' }],
      },
    ],
  },
]
