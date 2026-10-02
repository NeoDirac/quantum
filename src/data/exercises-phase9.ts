import type { Exercise } from '@/lib/content-types'

// Phase 9 exercises: uncertainty principle application (2.1), generating function Hermite (2.3),
// momentum-space wavefunction (2.4), even/odd splitting in finite well (2.6).
// All content original to this platform.

export const EXERCISES_PHASE9: Exercise[] = [
  // ===================== 2.1 — Uncertainty principle application =====================
  {
    id: 'ex-2-1e',
    sectionId: '2.1',
    conceptIds: ['c2-stationary-states-meaning', 'c2-bound-vs-scattering'],
    title: 'Aplicación del principio de incertidumbre al pozo infinito',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Usando Δx·Δp ≥ ℏ/2, estima la energía mínima de una partícula en un pozo infinito de ancho a. Compara con el resultado exacto E₁ = π²ℏ²/(2ma²). ¿Por qué la cota de incertidumbre da el orden correcto pero no el valor exacto?' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Cuánto vale Δx aproximadamente en un pozo de ancho a?' }],
        accept: ['a/2', 'a', 'orden a'],
        why: [{ kind: 'p', text: 'La partícula está confinada en [0,a], así que su incertidumbre de posición es del orden de a (o a/2). Es la entrada clave para aplicar Heisenberg.' }],
        reveal: [{ kind: 'p', text: 'Δx ~ a/2 (la partícula puede estar en cualquier punto del pozo de ancho a, así que la desviación típica es ~a/2).' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Confinamiento en [0,a]: Δx ~ a/2 (orden de magnitud).' }] },
      { blocks: [{ kind: 'p', text: 'Heisenberg: Δp ≥ ℏ/(2Δx) ~ ℏ/a. Así p² ~ (Δp)² ~ ℏ²/a².' }] },
      { blocks: [{ kind: 'p', text: 'Energía cinética mínima: E ~ p²/(2m) ~ ℏ²/(2ma²). Es el orden correcto.' }] },
      { blocks: [{ kind: 'p', text: 'Resultado exacto: E₁ = π²ℏ²/(2ma²) ≈ 9.87·ℏ²/(2ma²). La cota da el factor correcto pero no el π².' }] },
      { blocks: [{ kind: 'p', text: 'La incertidumbre da el orden de magnitud, no la constante exacta: para el valor preciso hay que resolver la TISE.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Estimar Δx',
        what: [{ kind: 'p', text: 'Estimamos la incertidumbre de posición.' }],
        why: [{ kind: 'p', text: 'La partícula está confinada en [0,a]: su posición es incierta en ~a (no puede estar más localizada que el pozo). Así Δx ~ a/2 (desviación estándar aproximada).' }],
        meaning: [{ kind: 'p', text: 'El confinamiento fuerza Δx, que a su vez fuerza Δp por Heisenberg. La energía mínima viene de ese Δp mínimo.' }],
        info: [{ kind: 'p', text: 'La estimación es de orden de magnitud: el factor exacto (π² en el resultado) requiere resolver la TISE.' }],
        whatIf: [{ kind: 'p', text: 'Si el pozo fuera más estrecho (a pequeño), Δx disminuye, Δp aumenta, E aumenta: confinamiento más fuerte = más energía.' }],
        math: [{ kind: 'math-block', tex: '\\Delta x \\sim \\frac{a}{2} \\quad \\text{(confinamiento en } [0,a]\\text{)}.' }],
      },
      {
        id: 's2', label: 'Aplicar Heisenberg',
        what: [{ kind: 'p', text: 'Usamos Δx·Δp ≥ ℏ/2.' }],
        why: [{ kind: 'p', text: 'Despejando: Δp ≥ ℏ/(2Δx) ~ ℏ/a. La energía cinética mínima es p²/(2m) ~ (Δp)²/(2m) ~ ℏ²/(2ma²).' }],
        meaning: [{ kind: 'p', text: 'La energía del punto cero E₁ ~ ℏ²/(2ma²) es una consecuencia directa de Heisenberg: no se puede tener E=0 porque implicaría Δp=0 Y Δx=0, imposible.' }],
        info: [{ kind: 'p', text: 'La cota de Heisenberg es una desigualdad (≥): da un límite inferior, no el valor exacto.' }],
        whatIf: [{ kind: 'p', text: 'Para un oscilador armónico, la cota de Heisenberg SÍ da el valor exacto (el fundamental satura): ΔxΔp=ℏ/2 exacto. El pozo infinito no satura.' }],
        math: [{ kind: 'math-block', tex: '\\Delta p \\geq \\frac{\\hbar}{2\\Delta x} \\sim \\frac{\\hbar}{a}, \\quad E_{\\min} \\sim \\frac{(\\Delta p)^2}{2m} \\sim \\frac{\\hbar^2}{2ma^2}.' }],
      },
      {
        id: 's3', label: 'Comparar con el exacto',
        what: [{ kind: 'p', text: 'Comparamos con E₁ exacto.' }],
        why: [{ kind: 'p', text: 'El resultado exacto es E₁ = π²ℏ²/(2ma²) ≈ 9.87·ℏ²/(2ma²). La cota da ℏ²/(2ma²), que es el orden correcto pero falta el factor π².' }],
        meaning: [{ kind: 'p', text: 'Heisenberg da el orden de magnitud correcto. Para el valor exacto hay que resolver la TISE. La incertidumbre es una cota, no una igualdad: ΔxΔp puede ser > ℏ/2 (no necesariamente =).' }],
        info: [{ kind: 'p', text: 'El factor π²~10 viene de las condiciones de frontera exactas (ψ=0 en las paredes). La incertidumbre no "sabe" de eso: solo confinamiento.' }],
        whatIf: [{ kind: 'p', text: 'Si el pozo fuera gaussiano (oscilador), ΔxΔp=ℏ/2 y la cota sería exacta: el fundamental del oscilador satura Heisenberg.' }],
        math: [{ kind: 'math-block', tex: 'E_1^{\\text{exacto}} = \\frac{\\pi^2\\hbar^2}{2ma^2} \\approx 9.87 \\cdot \\frac{\\hbar^2}{2ma^2}, \\quad E_{\\min}^{\\text{Heisenberg}} \\sim \\frac{\\hbar^2}{2ma^2}. \\;\\text{Orden correcto, factor }\\pi^2\\text{ falta.}' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'Δx~a/2 → Δp≥ℏ/a → E_min~ℏ²/(2ma²). El resultado exacto E₁=π²ℏ²/(2ma²)≈9.87·(ℏ²/2ma²): Heisenberg da el orden correcto pero no el π². La incertidumbre es una cota (≥), no una igualdad: el fundamental del pozo no satura Heisenberg (a diferencia del oscilador).' }],
  },

  // ===================== 2.3 — Generating function Hermite =====================
  {
    id: 'ex-2-3j',
    sectionId: '2.3',
    conceptIds: ['c2-harmonic-oscillator'],
    title: 'Función generatriz de los polinomios de Hermite',
    difficulty: 3,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'La función generatriz de los Hermite es e^{2ξt−t²} = Σ H_n(ξ)tⁿ/n!. (a) Expande los primeros términos y verifica H_0=1, H_1=2ξ, H_2=4ξ²−2. (b) Usa la función generatriz para demostrar la relación dH_n/dξ = 2nH_{n−1}.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Para qué sirve una función generatriz?' }],
        accept: ['generar', 'recursión', 'derivar', 'identidades'],
        why: [{ kind: 'p', text: 'La función generatriz condensa toda la familia H_n en una sola expresión. Derivándola respecto a t, se obtienen relaciones de recurrencia y propiedades útiles sin tratar cada H_n individualmente.' }],
        reveal: [{ kind: 'p', text: 'Genera todos los H_n en una sola fórmula. Derivando respecto a t o ξ, se obtienen identidades (recursión, derivadas) de forma compacta.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'e^{2ξt−t²} = 1 + (2ξt−t²) + ½(2ξt−t²)² + ... = 1 + 2ξt + (2ξ²−1)t² + ...' }] },
      { blocks: [{ kind: 'p', text: 'Comparando con Σ H_n tⁿ/n!: H_0=1, H_1=2ξ (coef de t¹=t¹/1!), H_2=2·(2ξ²−1)=4ξ²−2 (coef de t²=t²/2!, así H_2/2=2ξ²−1).' }] },
      { blocks: [{ kind: 'p', text: 'Para la derivada: ∂/∂ξ [e^{2ξt−t²}] = 2t·e^{2ξt−t²}. Pero también = Σ (dH_n/dξ) tⁿ/n!.' }] },
      { blocks: [{ kind: 'p', text: '2t·Σ H_n tⁿ/n! = Σ 2H_n t^{n+1}/n! = Σ 2H_{m-1} t^m/(m-1)! = Σ 2m H_{m-1} t^m/m!.' }] },
      { blocks: [{ kind: 'p', text: 'Igualando coeficientes: dH_m/dξ = 2m H_{m-1}. Es la relación de derivación.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Expandir los primeros términos',
        what: [{ kind: 'p', text: 'Expandimos e^{2ξt−t²} en serie de t.' }],
        why: [{ kind: 'p', text: 'La función generatriz es e^{2ξt−t²} = Σ H_n(ξ) tⁿ/n!. Expandir en potencias de t y comparar coeficientes da los H_n.' }],
        meaning: [{ kind: 'p', text: 'Los H_n se generan automáticamente: cada coeficiente de tⁿ/n! es H_n. Sin resolver la EDO ni usar recursión.' }],
        info: [{ kind: 'p', text: 'La función generatriz es equivalente a la fórmula de Rodrigues H_n=(-1)^n e^{ξ²} d^n/dξ^n e^{−ξ²}, pero más práctica para derivar identidades.' }],
        whatIf: [{ kind: 'p', text: 'Para n grande, expandir a mano es tedioso: ahí se usa la recursión o Rodrigues. Pero para n pequeños, la generatriz es la forma más rápida.' }],
        math: [{ kind: 'math-block', tex: 'e^{2\\xi t - t^2} = 1 + 2\\xi t + (2\\xi^2 - 1)t^2 + \\cdots \\;\\Rightarrow\\; H_0=1,\\;H_1=2\\xi,\\;H_2=2(2\\xi^2-1)=4\\xi^2-2.' }],
      },
      {
        id: 's2', label: 'Derivar la relación de derivación',
        what: [{ kind: 'p', text: 'Derivamos respecto a ξ.' }],
        why: [{ kind: 'p', text: '∂/∂ξ [e^{2ξt−t²}] = 2t·e^{2ξt−t²}. Pero también = Σ (dH_n/dξ) tⁿ/n!. Igualando los dos desarrollos en serie, se obtiene la identidad.' }],
        meaning: [{ kind: 'p', text: 'La derivada de H_n se reduce a H_{n−1} con un factor 2n. Es una relación recursiva que conecta derivadas con polinomios de menor grado.' }],
        info: [{ kind: 'p', text: 'Esta identidad es clave para derivar [a, a†]=1 y las propiedades del oscilador. La función generatriz lo da en una línea.' }],
        whatIf: [{ kind: 'p', text: 'Sin la función generatriz, probar dH_n/dξ=2nH_{n−1} requeriría inducción sobre la recursión: mucho más laborioso.' }],
        math: [{ kind: 'math-block', tex: '\\frac{\\partial}{\\partial \\xi} e^{2\\xi t - t^2} = 2t\\,e^{2\\xi t-t^2} \\;\\Rightarrow\\; \\sum \\frac{dH_n}{d\\xi}\\frac{t^n}{n!} = \\sum 2n H_{n-1}\\frac{t^n}{n!} \\;\\Rightarrow\\; \\frac{dH_n}{d\\xi} = 2n H_{n-1}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'e^{2ξt−t²} = 1 + 2ξt + (2ξ²−1)t² + ... da H_0=1, H_1=2ξ, H_2=4ξ²−2. Derivando respecto a ξ: 2t·e^{2ξt−t²} = Σ(dH_n/dξ)tⁿ/n! = Σ 2nH_{n−1}tⁿ/n!, así dH_n/dξ = 2nH_{n−1}. La función generatriz condensa toda la familia en una expresión y da identidades en una línea.' }],
  },

  // ===================== 2.4 — Momentum-space wavefunction =====================
  {
    id: 'ex-2-4e',
    sectionId: '2.4',
    conceptIds: ['c2-free-particle'],
    title: 'Función de onda en el espacio de momentos',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Para la partícula libre, la función de onda en el espacio de momentos φ(p) es la transformada de Fourier de Ψ(x,0). Explica por qué |φ(p)|² da la distribución de probabilidad de medir el momento p. Compara con la interpretación de |Ψ(x)|².' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué representa |φ(p)|² físicamente?' }],
        accept: ['probabilidad de p', 'distribución de momento', 'densidad en p'],
        why: [{ kind: 'p', text: 'La dualidad posición-momento: así como |Ψ(x)|² es la densidad de probabilidad de posición, |φ(p)|² es la de momento. Son dos caras de la misma función de onda.' }],
        reveal: [{ kind: 'p', text: '|φ(p)|² es la densidad de probabilidad de medir el momento p. Es la versión "momento" de |Ψ(x)|²: la partícula se describe en ambas bases simultáneamente.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'φ(p) = (1/√(2πℏ)) ∫ Ψ(x,0) e^{-ipx/ℏ} dx (transformada de Fourier).' }] },
      { blocks: [{ kind: 'p', text: '|φ(p)|² dp = probabilidad de medir p en [p, p+dp]. Como |Ψ(x)|² dx para posición.' }] },
      { blocks: [{ kind: 'p', text: 'Parseval: ∫|Ψ|²dx = ∫|φ|²dp = 1 (misma probabilidad total, dos bases).' }] },
      { blocks: [{ kind: 'p', text: 'Las dos representaciones son equivalentes: conocer una es conocer la otra (Fourier invertible). Pero a veces una es más útil que la otra.' }] },
      { blocks: [{ kind: 'p', text: 'Para un paquete gaussiano: Ψ gaussiana en x → φ gaussiana en p. Cuanto más estrecha en x, más ancha en p (Heisenberg).' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Definición de φ(p)',
        what: [{ kind: 'p', text: 'Definimos la función de onda en momento.' }],
        why: [{ kind: 'p', text: 'φ(p) = (1/√(2πℏ)) ∫ Ψ(x,0) e^{-ipx/ℏ} dx es la transformada de Fourier. Es el cambio de base de posición a momento.' }],
        meaning: [{ kind: 'p', text: 'φ(p) describe el mismo estado físico que Ψ(x), pero en la base de momento. Son dos representaciones equivalentes de la misma función de onda.' }],
        info: [{ kind: 'p', text: 'La partícula libre tiene base continua de momento (p=ℏk, k continuo). En un pozo, la base es discreta (n entero).' }],
        whatIf: [{ kind: 'p', text: 'En el espacio de momento, el operador p es diagonal (p·φ(p)), mientras que x se vuelve derivada. El operador cambia de forma pero la física no.' }],
        math: [{ kind: 'math-block', tex: '\\phi(p) = \\frac{1}{\\sqrt{2\\pi\\hbar}} \\int \\Psi(x,0)\\,e^{-ipx/\\hbar}\\,dx.' }],
      },
      {
        id: 's2', label: 'Interpretación de |φ(p)|²',
        what: [{ kind: 'p', text: 'Interpretamos el módulo al cuadrado.' }],
        why: [{ kind: 'p', text: 'Por la regla de Born generalizada: |φ(p)|² es la densidad de probabilidad de medir el momento p. La probabilidad de p en [p₁,p₂] es ∫_{p₁}^{p₂} |φ(p)|² dp.' }],
        meaning: [{ kind: 'p', text: 'Es la dualidad posición-momento: |Ψ(x)|² da la probabilidad de posición, |φ(p)|² la de momento. Ambas describen el mismo estado: solo cambia la representación.' }],
        info: [{ kind: 'p', text: 'La normalización ∫|φ|²dp = 1 (Parseval) garantiza que la probabilidad total es 1 en ambas bases.' }],
        whatIf: [{ kind: 'p', text: 'Un estado de momento bien definido (φ(p)=δ(p−p₀)) no es localizable en x (Ψ es plana): Heisenberg ΔxΔp≥ℏ/2 en acción.' }],
        math: [{ kind: 'math-block', tex: '|\\phi(p)|^2\\,dp = \\text{probabilidad de medir } p \\in [p, p+dp], \\quad \\int_{-\\infty}^{\\infty} |\\phi(p)|^2\\,dp = 1.' }],
      },
      {
        id: 's3', label: 'Dualidad y Heisenberg',
        what: [{ kind: 'p', text: 'Conectamos con la incertidumbre.' }],
        why: [{ kind: 'p', text: 'Fourier: una función estrecha en x → ancha en p, y viceversa. Es la manifestación matemática de Heisenberg: ΔxΔp ≥ ℏ/2.' }],
        meaning: [{ kind: 'p', text: 'La dualidad posición-momento y la incertidumbre son la misma cosa: la transformada de Fourier intercambia anchura. Localización y momento definido son complementarios.' }],
        info: [{ kind: 'p', text: 'El estado fundamental del oscilador es gaussiano en ambas bases: satura Heisenberg (ΔxΔp=ℏ/2). Las gaussianas son las únicas que lo hacen.' }],
        whatIf: [{ kind: 'p', text: 'Si Ψ fuera un delta en x (posición exacta), φ sería constante en p (momento totalmente indefinido): Δx=0, Δp=∞, producto indefinido.' }],
        math: [{ kind: 'p', text: 'Fourier: estrecho en x ⟺ ancho en p. Heisenberg Δx·Δp ≥ ℏ/2 es la formulación cuantitativa de esa dualidad.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'φ(p) = (1/√(2πℏ)) ∫ Ψ(x,0) e^{-ipx/ℏ} dx es la transformada de Fourier. |φ(p)|² dp = probabilidad de medir p en [p, p+dp] (regla de Born en momento). Dualidad: |Ψ(x)|² (posición) y |φ(p)|² (momento) describen el mismo estado. Parseval garantiza ∫|φ|²=1. Fourier: estrecho en x ⟺ ancho en p → Heisenberg ΔxΔp≥ℏ/2.' }],
  },

  // ===================== 2.6 — Even/odd splitting in finite well =====================
  {
    id: 'ex-2-6f',
    sectionId: '2.6',
    conceptIds: ['c2-finite-well', 'c2-quantization'],
    title: 'Separación de soluciones pares e impares en el pozo finito',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Para el pozo finito simétrico (V=0 en |x|<a, V=V₀ fuera), la simetría V(-x)=V(x) permite clasificar las soluciones en pares (κ = l·tan(la)) e impares (κ = -l·cot(la)). Explica por qué esta clasificación reduce el trabajo a la mitad y por qué el estado fundamental siempre es par.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Por qué la paridad reduce el trabajo a la mitad?' }],
        accept: ['solo par o impar', 'una condición', 'mitad de constantes'],
        why: [{ kind: 'p', text: 'Sin paridad, tendrías 4 constantes (A,B dentro, C,D fuera) y 4 ecuaciones de frontera. Con paridad, la mitad se anulan (B=0 para par, A=0 para impar): solo 2 constantes y 2 ecuaciones.' }],
        reveal: [{ kind: 'p', text: 'Porque cada caso (par/impar) fija la forma dentro del pozo (coseno/seno) y fuera (exponencial simétrica). Las 4 constantes se reducen a 2: una dentro, una fuera. Las 4 ecuaciones de frontera se reducen a 2.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Sin paridad: ψ=Acos(lx)+Bsin(lx) dentro, Ce^{-κx}+De^{κx} fuera. 4 constantes, 4 ecuaciones (continuidad ψ,ψ\' en ±a).' }] },
      { blocks: [{ kind: 'p', text: 'Con paridad par: ψ=Acos(lx) dentro, Ce^{-κ|x|} fuera (B=D=0). 2 constantes, 2 ecuaciones en x=a.' }] },
      { blocks: [{ kind: 'p', text: 'Con paridad impar: ψ=Bsin(lx) dentro, sign(Se^{-κ|x|}) fuera (A=C=0). 2 constantes, 2 ecuaciones.' }] },
      { blocks: [{ kind: 'p', text: 'El fundamental es par: sin nodos, mínimo de energía. Un estado impar tiene un nodo (ψ(0)=0), lo que le da más energía cinética.' }] },
      { blocks: [{ kind: 'p', text: 'Por eso el fundamental es siempre par: paridad del potencial, sin nodos = menor energía.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Sin paridad: 4 constantes',
        what: [{ kind: 'p', text: 'Escribimos el caso general sin clasificar.' }],
        why: [{ kind: 'p', text: 'Sin usar la simetría, dentro ψ=Acos(lx)+Bsin(lx) (solución general), fuera ψ=Ce^{-κx}+De^{κx} (a cada lado). Son 4 constantes y 4 ecuaciones de continuidad (ψ, ψ\' en x=±a). Laborioso.' }],
        meaning: [{ kind: 'p', text: 'El sistema es resoluble pero engorroso: 4 ecuaciones, 4 incógnitas. La paridad lo simplifica drásticamente.' }],
        info: [{ kind: 'p', text: 'Las 4 ecuaciones forman un sistema homogéneo: solo tiene solución no trivial si el determinante es 0 (condición de cuantización).' }],
        whatIf: [{ kind: 'p', text: 'Si el potencial no fuera simétrico, no se puede clasificar y hay que resolver el sistema completo. La paridad es un regalo de la simetría.' }],
        math: [{ kind: 'math-block', tex: '\\psi(x) = A\\cos(lx) + B\\sin(lx) \\text{ (dentro)}, \\quad Ce^{-\\kappa x} + De^{\\kappa x} \\text{ (fuera)}. \\;\\text{4 constantes, 4 ecuaciones.}' }],
      },
      {
        id: 's2', label: 'Con paridad: 2 constantes por caso',
        what: [{ kind: 'p', text: 'Clasificamos por paridad.' }],
        why: [{ kind: 'p', text: 'V par ⟹ autoestados con paridad definida. Par: B=0 (coseno, simétrico), D=0 (exponencial que decae simétricamente). Quedan A, C: 2 constantes, 2 ecuaciones en x=a. Análogo para impar (A=0, C=0; seno, antisimétrico).' }],
        meaning: [{ kind: 'p', text: 'La paridad reduce el problema a la mitad: cada caso (par/impar) es independiente y más simple. La trascendental resultante es más limpia (tan o cot, no ambas mezcladas).' }],
        info: [{ kind: 'p', text: 'La condición par: κ=l·tan(la). Impar: κ=-l·cot(la). Ambas con l²+κ²=2mV₀/ℏ². Cada una da sus propias energías.' }],
        whatIf: [{ kind: 'p', text: 'Si el pozo fuera asimétrico (V(x)≠V(-x)), no habría clasificación y el sistema de 4 ecuaciones sería inevitable: mucho más difícil de resolver.' }],
        math: [{ kind: 'math-block', tex: '\\text{Par: } \\kappa = l\\tan(la). \\quad \\text{Impar: } \\kappa = -l\\cot(la). \\;\\text{2 constantes por caso, 2 ecuaciones.}' }],
      },
      {
        id: 's3', label: 'El fundamental es par',
        what: [{ kind: 'p', text: 'Argumentamos por qué el fundamental es par.' }],
        why: [{ kind: 'p', text: 'El estado fundamental es el de menor energía. Un estado par no tiene nodos (ψ(0)≠0): menos oscilaciones, menos energía cinética. Un impar tiene un nodo (ψ(0)=0): más oscilación, más energía.' }],
        meaning: [{ kind: 'p', text: 'El fundamental siempre tiene la paridad del potencial (par aquí) y ningún nodo. Cada excitación añade un nodo y sube la energía: la regla de los nodos es universal en 1D.' }],
        info: [{ kind: 'p', text: 'Regla de los nodos: el n-ésimo estado tiene n-1 nodos. El fundamental (0 nodos) es siempre par (si V lo es); el primero excitado (1 nodo) es impar; etc.' }],
        whatIf: [{ kind: 'p', text: 'Si V no fuera par, el fundamental podría no tener paridad definida, pero seguiría sin nodos: la regla de los nodos es general, la de paridad requiere simetría.' }],
        math: [{ kind: 'p', text: 'Fundamental = par (sin nodos, menor energía). Primer excitado = impar (1 nodo). Regla: n-ésimo estado tiene n-1 nodos. Siempre en 1D.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'V par ⟹ clasificación en par (κ=l·tan(la)) e impar (κ=-l·cot(la)). Reduce 4 constantes a 2 por caso: mitad del trabajo. El fundamental es siempre par: sin nodos = menos energía cinética. Regla de los nodos: n-ésimo estado tiene n-1 nodos (universal en 1D); la paridad alterna par/impar si V es par.' }],
  },
]
