import type { Exercise } from '@/lib/content-types'

// Phase 4 exercises: normalization theorem (2.1), odd/even superposition (2.2),
// transcendental graphical solving (2.6), transfer matrix composition (2.7).
// All content original to this platform.

export const EXERCISES_PHASE4: Exercise[] = [
  // ===================== 2.1 — Normalization theorem =====================
  {
    id: 'ex-2-1c',
    sectionId: '2.1',
    conceptIds: ['c2-stationary-states-meaning', 'c2-bound-vs-scattering'],
    title: 'Teorema de normalización: E debe ser real',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Demuestra que para que una solución separable Ψ(x,t) = ψ(x)e^{-iEt/ℏ} sea normalizable (y por tanto físicamente aceptable), la constante de separación E debe ser real. ¿Qué pasaría si E tuviera parte imaginaria?' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: 'Si E = E_R + iE_I, ¿cómo depende |e^{-iEt/ℏ}|² del tiempo?' }],
        accept: ['crece', 'decae', 'exponencial', 'e_i'],
        why: [{ kind: 'p', text: 'Esta es la pieza clave: si la fase temporal tiene parte imaginaria, deja de ser fase pura y aparece un crecimiento/decaimiento exponencial que rompe la normalización.' }],
        reveal: [{ kind: 'p', text: 'e^{-iEt/ℏ} = e^{-iE_R t/ℏ}·e^{E_I t/ℏ}. El primer factor es fase pura; el segundo crece (E_I>0) o decae (E_I<0) exponencialmente. Su módulo al cuadrado es e^{2E_I t/ℏ}.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Escribe E = E_R + iE_I. Entonces e^{-iEt/ℏ} = e^{-iE_R t/ℏ}·e^{E_I t/ℏ}.' }] },
      { blocks: [{ kind: 'p', text: '|Ψ|² = |ψ|²·|e^{-iEt/ℏ}|² = |ψ|²·e^{2E_I t/ℏ}.' }] },
      { blocks: [{ kind: 'p', text: 'La normalización ∫|Ψ|²dx = 1 debe valer para todo t. Si E_I > 0, la integral crece exponencialmente; si E_I < 0, decae.' }] },
      { blocks: [{ kind: 'p', text: 'Ninguno es compatible con ∫|Ψ|²dx = 1 constante. Solo E_I = 0 lo es.' }] },
      { blocks: [{ kind: 'p', text: 'Por tanto E es real. Esto justifica que llamemos "energía" a E: los autovalores de un operador hermítico (Ĥ) son reales.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Descomponer E',
        what: [{ kind: 'p', text: 'Escribimos E = E_R + iE_I con E_R, E_I reales.' }],
        why: [{ kind: 'p', text: 'Para ver si la parte imaginaria E_I causa problemas, hay que separarla. Es la única forma de aislar su contribución al módulo.' }],
        meaning: [{ kind: 'p', text: 'E_R controla la fase (gira sin cambiar el módulo); E_I controla la amplitud (crece/decae). Solo la fase es inocua para la normalización.' }],
        info: [{ kind: 'p', text: 'Esta descomposición es general: cualquier complejo se escribe como parte real + i·parte imaginaria.' }],
        whatIf: [{ kind: 'p', text: 'Si E fuera puramente imaginario (E_R=0), la fase no giraría y solo habría crecimiento/decaimiento: claramente no físico para un estado estacionario.' }],
        math: [{ kind: 'math-block', tex: 'E = E_R + iE_I, \\quad e^{-iEt/\\hbar} = e^{-iE_R t/\\hbar}\\cdot e^{E_I t/\\hbar}.' }],
      },
      {
        id: 's2', label: 'Calcular |Ψ|²',
        what: [{ kind: 'p', text: 'Calculamos el módulo al cuadrado.' }],
        why: [{ kind: 'p', text: 'La normalización impone ∫|Ψ|²dx = 1 para todo t. Si |Ψ|² depende de t de forma no trivial, la integral no puede ser constante.' }],
        meaning: [{ kind: 'p', text: 'La fase e^{-iE_R t/ℏ} se cancela en el módulo (|e^{iθ}|=1). El factor e^{E_I t/ℏ} NO se cancela: sobrevive y rompe la estacionariedad de la probabilidad.' }],
        info: [{ kind: 'p', text: 'Esta es la razón profunda por la que E es real: la conservación de probabilidad exige que la fase temporal sea pura.' }],
        whatIf: [{ kind: 'p', text: 'Si permitiéramos E complejo, la probabilidad total no se conservaría: aparecería o desaparecería probabilidad "de la nada".' }],
        math: [{ kind: 'math-block', tex: '|\\Psi(x,t)|^2 = |\\psi(x)|^2\\,|e^{-iEt/\\hbar}|^2 = |\\psi(x)|^2\\,e^{2E_I t/\\hbar}.' }],
      },
      {
        id: 's3', label: 'Conclusión: E_I = 0',
        what: [{ kind: 'p', text: 'Imponemos normalización.' }],
        why: [{ kind: 'p', text: '∫|Ψ|²dx = e^{2E_I t/ℏ}·∫|ψ|²dx = 1 para todo t. Si E_I ≠ 0, el factor exponencial cambia con t y la igualdad se rompe (salvo que ∫|ψ|²=0, trivial).' }],
        meaning: [{ kind: 'p', text: 'E debe ser real. Esto es consistente con que Ĥ es hermítico: los autovalores de un operador hermítico son siempre reales. La física (conservación de probabilidad) y la matemática (hermiticidad) coinciden.' }],
        info: [{ kind: 'p', text: 'Este es un teorema general: no es una convención, es una consecuencia de la normalización.' }],
        whatIf: [{ kind: 'p', text: 'Para potenciales complejos (no hermíticos, como en óptica o desintegraciones), E puede ser complejo y aparece "decaimiento" — modela estados inestables.' }],
        math: [{ kind: 'math-block', tex: '\\int |\\Psi|^2 dx = e^{2E_I t/\\hbar}\\int|\\psi|^2 dx = 1 \\;\\forall t \\;\\Rightarrow\\; E_I = 0.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'Si E = E_R + iE_I, entonces |Ψ|² = |ψ|²·e^{2E_I t/ℏ}. La normalización (∫|Ψ|²=1 para todo t) fuerza E_I = 0, así que E es real. Físicamente: la conservación de probabilidad exige fase temporal pura; matemáticamente: Ĥ hermítico ⟹ autovalores reales.' }],
    commonErrors: [
      {
        id: 'e1', type: 'conceptual',
        signature: [{ kind: 'p', text: 'Asumir que E es real "por definición" sin justificar.' }],
        explanation: [{ kind: 'p', text: 'E no es real por definición: nace como constante de separación (podría ser compleja). Es la normalización quien la fuerza a ser real. Entender esto es entender por qué la energía es observable real.' }],
      },
    ],
  },

  // ===================== 2.2 — Odd/even superposition time evolution =====================
  {
    id: 'ex-2-2e',
    sectionId: '2.2',
    conceptIds: ['c2-superposition', 'c2-infinite-well'],
    title: 'Superposición par/impar y evolución temporal',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'En el pozo infinito simétrico (-a, a), considera el estado inicial Ψ(x,0) = A·[ψ₁(x) + ψ₂(x)] donde ψ₁ es par (n=1) y ψ₂ es impar (n=2). Calcula Ψ(x,t), ⟨x⟩(t) y explica por qué la partícula oscila de un lado a otro del pozo.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Cuál es la paridad de ψ₁ y ψ₂ en el pozo simétrico, y por qué importa?' }],
        accept: ['par e impar', 'par, impar', 'simetria'],
        why: [{ kind: 'p', text: 'La paridad determina si ⟨x⟩ (que es impar bajo x→-x) se anula o no. En un estado puro par o impar, ⟨x⟩=0; solo en una superposición mixta aparece oscilación.' }],
        reveal: [{ kind: 'p', text: 'ψ₁ es par (n=1, coseno), ψ₂ es impar (n=2, seno). La superposición mezcla paridades, y eso permite ⟨x⟩ ≠ 0 oscilante.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Pozo simétrico (-a,a): ψ_n pares son cos((2k-1)πx/2a) (n impar), ψ_n impares son sen(kπx/a) (n par).' }] },
      { blocks: [{ kind: 'p', text: 'Normaliza: A = 1/√2 (ortonormalidad de ψ₁, ψ₂).' }] },
      { blocks: [{ kind: 'p', text: 'Ψ(x,t) = (1/√2)[ψ₁ e^{-iE₁t/ℏ} + ψ₂ e^{-iE₂t/ℏ}].' }] },
      { blocks: [{ kind: 'p', text: '⟨x⟩ = (1/2)⟨ψ₁|x|ψ₁⟩ + (1/2)⟨ψ₂|x|ψ₂⟩ + Re[⟨ψ₁|x|ψ₂⟩ e^{-i(E₂-E₁)t/ℏ}]. Los términos diagonales son 0 (paridad: x es impar, ψ_n² es par, integral de par×impar=0).' }] },
      { blocks: [{ kind: 'p', text: 'Solo queda el término cruzado: ⟨x⟩ = x_{12}·cos((E₂-E₁)t/ℏ). Oscila a frecuencia (E₂-E₁)/ℏ.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Energías y base',
        what: [{ kind: 'p', text: 'Identificamos las energías y la paridad.' }],
        why: [{ kind: 'p', text: 'En el pozo simétrico, los autoestados tienen paridad definida (potencial par). ψ₁ (n=1) es par, ψ₂ (n=2) es impar. Las energías son E_n = n²π²ℏ²/(8ma²) (nota: el ancho total es 2a).' }],
        meaning: [{ kind: 'p', text: 'La paridad es una consecuencia de V(-x)=V(x): el operador paridad conmuta con Ĥ, así que comparten autoestados.' }],
        info: [{ kind: 'p', text: 'E_1 = π²ℏ²/(8ma²), E_2 = 4π²ℏ²/(8ma²) = π²ℏ²/(2ma²). La diferencia E₂-E₁ = 3π²ℏ²/(8ma²).' }],
        whatIf: [{ kind: 'p', text: 'Si el pozo no fuera simétrico, ψ_n no tendrían paridad definida y el análisis sería más complejo.' }],
        math: [{ kind: 'math-block', tex: 'E_n = \\frac{n^2\\pi^2\\hbar^2}{8ma^2}, \\quad \\psi_1 \\text{ par},\\; \\psi_2 \\text{ impar}, \\quad E_2 - E_1 = \\frac{3\\pi^2\\hbar^2}{8ma^2}.' }],
      },
      {
        id: 's2', label: '⟨x⟩: términos diagonales',
        what: [{ kind: 'p', text: 'Calculamos los términos ⟨ψ_n|x|ψ_n⟩.' }],
        why: [{ kind: 'p', text: 'El valor esperado ⟨x⟩ = Σ|c_n|²⟨ψ_n|x|ψ_n⟩ + términos cruzados. Los diagonales se anulan por paridad.' }],
        meaning: [{ kind: 'p', text: 'x es operador impar (cambia signo bajo x→-x). ψ_n² tiene la paridad de ψ_n² = par siempre. Así ψ_n²·x es impar, y la integral en (-a,a) de una función impar es 0.' }],
        info: [{ kind: 'p', text: 'Esta es la utilidad de la paridad: anula integrales sin calcularlas. Argumento de simetría.' }],
        whatIf: [{ kind: 'p', text: 'Si el estado fuera superposición de dos pares (o dos impares), los cruzados también se anularían y ⟨x⟩=0: no habría oscilación.' }],
        math: [{ kind: 'math-block', tex: '\\langle \\psi_n | x | \\psi_n \\rangle = \\int_{-a}^{a} x\\,|\\psi_n|^2\\,dx = 0 \\quad (\\text{paridad: integrando impar}).' }],
      },
      {
        id: 's3', label: '⟨x⟩: término cruzado oscilante',
        what: [{ kind: 'p', text: 'Calculamos el término cruzado.' }],
        why: [{ kind: 'p', text: 'El término cruzado ⟨ψ₁|x|ψ₂⟩ no se anula: ψ₁ par × ψ₂ impar × x impar = par×impar×impar = par (no se anula por simetría). Y trae la fase e^{-i(E₂-E₁)t/ℏ}.' }],
        meaning: [{ kind: 'p', text: '⟨x⟩(t) oscila a frecuencia (E₂-E₁)/ℏ: la partícula se mueve de un lado a otro del pozo. Es la firma de un estado no estacionario con paridad mixta.' }],
        info: [{ kind: 'p', text: 'x_{12} = ⟨ψ₁|x|ψ₂⟩ es un número real (se puede calcular explícitamente, da 16a/(9π²)).' }],
        whatIf: [{ kind: 'p', text: 'Si la superposición fuera ψ₁+ψ₃ (ambos pares), x_{13}=0 y ⟨x⟩=0: sin oscilación. La mezcla de paridades es esencial para el movimiento.' }],
        math: [{ kind: 'math-block', tex: '\\langle x \\rangle(t) = \\Re\\!\\left[x_{12}\\,e^{-i(E_2-E_1)t/\\hbar}\\right] = x_{12}\\cos\\!\\left(\\frac{(E_2-E_1)t}{\\hbar}\\right), \\quad x_{12} = \\frac{16a}{9\\pi^2}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'A=1/√2; Ψ(x,t)=(1/√2)[ψ₁e^{-iE₁t/ℏ}+ψ₂e^{-iE₂t/ℏ}]; ⟨x⟩(t) = (16a/(9π²))·cos((E₂-E₁)t/ℏ) con E₂-E₁=3π²ℏ²/(8ma²). La partícula oscila porque la superposición mezcla par e impar: los términos diagonales se anulan por paridad, solo sobrevive el cruzado oscilante.' }],
    commonErrors: [
      {
        id: 'e1', type: 'physical-interpretation',
        signature: [{ kind: 'p', text: 'Olvidar las fases temporales en Ψ(x,t).' }],
        explanation: [{ kind: 'p', text: 'Sin e^{-iE_n t/ℏ}, ⟨x⟩ sería constante (sin oscilación). Las fases relativas son lo que produce la interferencia temporal. Es el error más común en superposiciones.' }],
      },
    ],
  },

  // ===================== 2.6 — Transcendental graphical solving =====================
  {
    id: 'ex-2-6c',
    sectionId: '2.6',
    conceptIds: ['c2-finite-well', 'c2-quantization'],
    title: 'Resolución gráfica de las trascendentales del pozo finito',
    difficulty: 3,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Para el pozo finito (V=0 en |x|<a, V=V₀ fuera), las condiciones trascendentales son κ = l·tan(la) (par) y κ = -l·cot(la) (impar), con l²+κ² = 2mV₀/ℏ². Define z = la y z₀ = √(2mV₀a²/ℏ²). Reescribe las condiciones en función de z y z₀, y explica cómo el número de estados ligados depende de z₀.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Cómo se reescribe κ = l·tan(la) en términos de z = la y z₀?' }],
        accept: ['sqrt(z0^2 - z^2)', 'tan(z)', 'z0^2-z^2'],
        why: [{ kind: 'p', text: 'La reescritura en variables adimensionales (z, z₀) es lo que permite la resolución gráfica: todo se reduce a intersecciones de curvas en un plano (z, función).' }],
        reveal: [{ kind: 'p', text: 'κ/l = tan(z) con z=la. Como l²+κ² = 2mV₀/ℏ², se tiene (κa)²+(la)² = z₀², así que κa = √(z₀²-z²). La condición par: √(z₀²-z²) = z·tan(z), o equivalentemente tan(z) = √(z₀²/z² - 1).' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Define z = la (variable adimensional) y z₀² = 2mV₀a²/ℏ² (parámetro del pozo).' }] },
      { blocks: [{ kind: 'p', text: 'De l²+κ² = 2mV₀/ℏ²: (la)²+(κa)² = z₀², así que κa = √(z₀²-z²).' }] },
      { blocks: [{ kind: 'p', text: 'Par: κ = l·tan(la) → √(z₀²-z²)/z = tan(z) → tan(z) = √(z₀²/z² - 1).' }] },
      { blocks: [{ kind: 'p', text: 'Impar: κ = -l·cot(la) → -cot(z) = √(z₀²/z² - 1).' }] },
      { blocks: [{ kind: 'p', text: 'Gráficamente: intersecciones de tan(z) (o -cot(z)) con √(z₀²/z²-1) en z∈(0,z₀). El número de cruces crece con z₀: a mayor profundidad×ancho, más estados.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Variables adimensionales',
        what: [{ kind: 'p', text: 'Definimos z = la y z₀.' }],
        why: [{ kind: 'p', text: 'La reescritura adimensional reduce el problema a un solo parámetro z₀ (que combina profundidad, ancho y masa). Todo pozo finito se caracteriza por su z₀.' }],
        meaning: [{ kind: 'p', text: 'z₀ mide la "fortaleza" del pozo: más profundo, más ancho o más masivo → mayor z₀ → más estados ligados.' }],
        info: [{ kind: 'p', text: 'La relación l²+κ² = 2mV₀/ℏ² (suma de cuadrados) es lo que da la forma circular en el plano (l,κ).' }],
        whatIf: [{ kind: 'p', text: 'En el límite z₀→∞ (pozo infinito), hay infinitos estados. Para z₀→0, ningún estado ligado... excepto que en 1D siempre hay al menos uno (teorema).' }],
        math: [{ kind: 'math-block', tex: 'z = la, \\quad z_0^2 = \\frac{2mV_0 a^2}{\\hbar^2}, \\quad (la)^2 + (\\kappa a)^2 = z_0^2 \\Rightarrow \\kappa a = \\sqrt{z_0^2 - z^2}.' }],
      },
      {
        id: 's2', label: 'Reescribir las trascendentales',
        what: [{ kind: 'p', text: 'Pasamos a z las condiciones par/impar.' }],
        why: [{ kind: 'p', text: 'Sustituyendo κa = √(z₀²-z²) y la = z, las condiciones quedan como igualdades entre una función trigonométrica (tan o -cot) y una raíz.' }],
        meaning: [{ kind: 'p', text: 'Cada condición es una curva en el plano (z, valor). Los estados ligados son los z donde ambas curvas se cruzan.' }],
        info: [{ kind: 'p', text: 'El dominio es z ∈ (0, z₀): fuera de ese rango, √(z₀²-z²) es imaginario (no físico).' }],
        whatIf: [{ kind: 'p', text: 'Para z > z₀ no hay solución: la energía E = ℏ²l²/2m = ℏ²z²/(2ma²) superaría V₀ (no sería ligado).' }],
        math: [{ kind: 'math-block', tex: '\\text{Par: } \\tan z = \\sqrt{z_0^2/z^2 - 1}; \\qquad \\text{Impar: } -\\cot z = \\sqrt{z_0^2/z^2 - 1}, \\quad z \\in (0, z_0).' }],
      },
      {
        id: 's3', label: 'Número de estados y z₀',
        what: [{ kind: 'p', text: 'Interpretamos gráficamente.' }],
        why: [{ kind: 'p', text: 'tan(z) tiene asíntotas en π/2, 3π/2, 5π/2,...; -cot(z) en π, 2π,... Los cruces con √(z₀²/z²-1) (que parte de z₀ en z=0 y cae a 0 en z=z₀) ocurren uno por cada rama. El número de cruces ≈ z₀/π + 1.' }],
        meaning: [{ kind: 'p', text: 'A mayor z₀, más cruces: más estados ligados. Siempre hay al menos uno (en 1D, cualquier pozo atractivo liga al menos un estado). El estado fundamental es par.' }],
        info: [{ kind: 'p', text: 'El número de estados ligados N ≈ ⌊z₀/π⌋ + 1. En el límite z₀→∞ se recuperan los infinitos del pozo infinito.' }],
        whatIf: [{ kind: 'p', text: 'Si z₀ < π/2, solo hay un estado (par). Entre π/2 y π, dos (par+impar). Y así: cada intervalo añade uno.' }],
        math: [{ kind: 'math-block', tex: 'N \\approx \\left\\lfloor \\frac{z_0}{\\pi} \\right\\rfloor + 1 \\text{ estados ligados.}\\quad \\text{Siempre } \\geq 1 \\text{ en 1D (pozo atractivo).}' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'Con z=la, z₀²=2mV₀a²/ℏ²: Par → tan(z)=√(z₀²/z²−1), Impar → -cot(z)=√(z₀²/z²−1), z∈(0,z₀). El número de estados ligados N ≈ ⌊z₀/π⌋+1, siempre ≥1 en 1D. Mayor z₀ (profundidad×ancho×masa) → más estados.' }],
  },

  // ===================== 2.7 — Transfer matrix composition =====================
  {
    id: 'ex-2-7c',
    sectionId: '2.7',
    conceptIds: ['c2-s-matrix', 'c2-probability-current'],
    title: 'Composición de matrices de transfer',
    difficulty: 3,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Dos obstáculos dispersores en serie se pueden combinar multiplicando sus matrices de transferencia M = M₂·M₁. Para dos barreras delta idénticas separadas por distancia L, escribe M₁ y M₂, calcula M_total y discute cómo aparece la interferencia cuántica en el coeficiente de transmisión T.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué es una matriz de transferencia y cómo se relaciona con la S-matrix?' }],
        accept: ['relaciona izquierda y derecha', 'amplitudes a ambos lados', 'lineal'],
        why: [{ kind: 'p', text: 'La matriz de transferencia M relaciona las amplitudes (derecha-izquierda) a la izquierda del obstáculo con las de la derecha. Componer obstáculos es multiplicar sus M: eso es lo potente.' }],
        reveal: [{ kind: 'p', text: 'M relaciona (A,B) a la izquierda con (C,D) a la derecha: (C,D)ᵀ = M·(A,B)ᵀ. Para dos obstáculos en serie: M_total = M₂·M₁. La S-matrix se obtiene de M por cambio de base.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Para una barrera delta V=αδ(x) en el origen, la M es: M = [[1+iβ/k, iβ/k],[-iβ/k, 1-iβ/k]] con β=mα/ℏ².' }] },
      { blocks: [{ kind: 'p', text: 'Entre barreras (zona libre), la propagación añade fases: M_prop = [[e^{ikL}, 0],[0, e^{-ikL}]].' }] },
      { blocks: [{ kind: 'p', text: 'M_total = M_delta · M_prop · M_delta (barrera, propagación, barrera).' }] },
      { blocks: [{ kind: 'p', text: 'El elemento M_total[0][0] da 1/T (relacionado): T = 1/|M_total[0][0]|² para incidencia desde la izquierda.' }] },
      { blocks: [{ kind: 'p', text: 'Aparecen términos ~e^{±2ikL}: interferencia entre los dos caminos (directo y con doble reflexión). T oscila con L: resonancias a 2kL=2nπ.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'M de una barrera delta',
        what: [{ kind: 'p', text: 'Escribimos la matriz de transferencia de un delta.' }],
        why: [{ kind: 'p', text: 'La M de un obstáculo se obtiene de las condiciones de continuidad y salto. Para el delta, ψ continua y ψ\' salta: dos ecuaciones lineales que dan M.' }],
        meaning: [{ kind: 'p', text: 'M codifica toda la física del obstáculo: cómo transforma las amplitudes incidente/reflejada en transmitida.' }],
        info: [{ kind: 'p', text: 'M es una matriz 2×2 con determinante 1 (conservación de probabilidad).' }],
        whatIf: [{ kind: 'p', text: 'Si α→0 (sin barrera), M→identidad: todo se transmite sin reflexión.' }],
        math: [{ kind: 'math-block', tex: 'M_{\\delta} = \\begin{pmatrix} 1 + i\\beta/k & i\\beta/k \\\\ -i\\beta/k & 1 - i\\beta/k \\end{pmatrix}, \\quad \\beta = m\\alpha/\\hbar^2.' }],
      },
      {
        id: 's2', label: 'Propagación y composición',
        what: [{ kind: 'p', text: 'Componemos dos deltas con propagación entre ellos.' }],
        why: [{ kind: 'p', text: 'Entre los dos obstáculos, la partícula es libre: la onda adquiere fase e^{±ikL} al propagarse. Eso se representa con M_prop diagonal. El orden es M_total = M₂·M_prop·M₁ (matriz más a la derecha = primer obstáculo).' }],
        meaning: [{ kind: 'p', text: 'Componer obstáculos es multiplicar matrices: esa es la utilidad del formalismo. Un sistema complejo se reduce a un producto matricial.' }],
        info: [{ kind: 'p', text: 'La fase e^{ikL} es la que trae la interferencia: la onda puede pasar directo o rebotar entre las dos barreras, y esos caminos interfieren.' }],
        whatIf: [{ kind: 'p', text: 'Si L=0 (barreras pegadas), se reduce a una sola barrera de fuerza 2α: M_total = M_δ(2α).' }],
        math: [{ kind: 'math-block', tex: 'M_{\\text{prop}} = \\begin{pmatrix} e^{ikL} & 0 \\\\ 0 & e^{-ikL} \\end{pmatrix}, \\quad M_{\\text{total}} = M_{\\delta} \\cdot M_{\\text{prop}} \\cdot M_{\\delta}.' }],
      },
      {
        id: 's3', label: 'Transmisión e interferencia',
        what: [{ kind: 'p', text: 'Calculamos T y discutimos la interferencia.' }],
        why: [{ kind: 'p', text: 'Para incidencia desde la izquierda (D=0), T = 1/|M_total[0][0]|². Al multiplicar aparecen términos e^{±2ikL} que interfieren.' }],
        meaning: [{ kind: 'p', text: 'T oscila con L: a 2kL = 2nπ hay resonancias (T=1, transmisiones perfectas), y a 2kL=(2n+1)π hay antirresonancias (T mínimo). Es el análogo cuántico del interferómetro de Fabry-Pérot.' }],
        info: [{ kind: 'p', text: 'Las resonancias corresponden a estados casi-ligados entre las dos barreras: la onda "encaja" entre ellas y pasa sin reflexión.' }],
        whatIf: [{ kind: 'p', text: 'Con tres o más barreras, se forma una "red" y aparecen bandas permitidas/prohibidas: el origen de la estructura de bandas en sólidos.' }],
        math: [{ kind: 'math-block', tex: 'T = \\frac{1}{|M_{\\text{total}}[0][0]|^2} \\propto \\frac{1}{1 + 4\\cos^2(kL)\\cdot(\\text{términos de reflexión})}. \\quad \\text{Resonancias a } 2kL = 2n\\pi.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'M_total = M_δ·M_prop·M_δ con M_δ de la barrera delta y M_prop=diag(e^{ikL},e^{-ikL}). T=1/|M_total[0][0]|² oscila con L por interferencia entre el camino directo y los caminos con doble reflexión. Resonancias (T=1) a 2kL=2nπ: análogo cuántico del Fabry-Pérot, base de la estructura de bandas.' }],
    commonErrors: [
      {
        id: 'e1', type: 'algebraic',
        signature: [{ kind: 'p', text: 'Multiplicar las matrices en el orden equivocado.' }],
        explanation: [{ kind: 'p', text: 'El orden importa: M_total = M₂·M_prop·M₁ (el primer obstáculo está más a la derecha). Invertir el orden da un sistema físico distinto. Conviene verificar con L=0: debe dar M_δ(2α).' }],
      },
    ],
  },
]
