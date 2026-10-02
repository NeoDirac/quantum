import type { Exercise } from '@/lib/content-types'

// Phase 8 exercises: parity theorem (2.2), number operator derivation (2.3),
// delta well bound state wavefunction (2.5), transmission resonance (2.7).
// All content original to this platform.

export const EXERCISES_PHASE8: Exercise[] = [
  // ===================== 2.2 — Parity theorem =====================
  {
    id: 'ex-2-2g',
    sectionId: '2.2',
    conceptIds: ['c2-infinite-well', 'c2-superposition'],
    title: 'Teorema de paridad en el pozo infinito simétrico',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Para el pozo infinito simétrico V(-x)=V(x) en (-a,a), demuestra que los autoestados de energía tienen paridad definida: pares (cosenos) para n impar, impares (senos) para n par. Explica por qué esto simplifica el cálculo de matrices x_{nm} y p_{nm}.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué condición impone V(-x)=V(x) sobre los autoestados?' }],
        accept: ['paridad definida', 'par o impar', 'conmuta con paridad'],
        why: [{ kind: 'p', text: 'Si V es par, el operador paridad Π conmuta con Ĥ, así que pueden hallarse autoestados comunes. Es la razón profunda de la clasificación par/impar.' }],
        reveal: [{ kind: 'p', text: 'V par ⟹ [Π, Ĥ] = 0 ⟹ autoestados comunes de Ĥ y Π. Cada ψ_n es par o impar (no mezcla).' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'V(-x)=V(x) ⟹ [Π, Ĥ]=0 (Π conmuta con Ĥ). Así Π y Ĥ comparten autoestados.' }] },
      { blocks: [{ kind: 'p', text: 'Π²=I, así que los autovalores de Π son ±1: par (Πψ=+ψ) o impar (Πψ=-ψ).' }] },
      { blocks: [{ kind: 'p', text: 'En (-a,a): ψ_n = (1/√a)cos(nπx/2a) (n impar, par) o (1/√a)sin(nπx/2a) (n par, impar).' }] },
      { blocks: [{ kind: 'p', text: 'Consecuencia: ⟨par|x|par⟩=0, ⟨impar|x|impar⟩=0 (x es impar, producto de pares es par × impar = impar → integral cero).' }] },
      { blocks: [{ kind: 'p', text: 'Solo sobreviven ⟨par|x|impar⟩: los términos cruzados. Simplifica enormemente el cálculo de x_{nm}.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Conmutación Π con Ĥ',
        what: [{ kind: 'p', text: 'Mostramos [Π, Ĥ]=0 cuando V es par.' }],
        why: [{ kind: 'p', text: 'Π x Π = -x (la paridad invierte x), así que Π V(x) Π = V(-x) = V(x) (V par). Y Π p Π = -p (p=-iℏ d/dx cambia signo). Así Π Ĥ Π = p²/2m + V(-x) = Ĥ: [Π,Ĥ]=0.' }],
        meaning: [{ kind: 'p', text: 'La paridad es una simetría del sistema: el Hamiltoniano no distingue x de -x. Eso permite clasificar las soluciones por paridad.' }],
        info: [{ kind: 'p', text: 'Teorema general: si [Ô, Ĥ]=0, pueden hallarse autoestados comunes. Es la base de toda clasificación por simetría.' }],
        whatIf: [{ kind: 'p', text: 'Si V no fuera par (p.ej. pozo asimétrico), [Π,Ĥ]≠0 y los autoestados no tendrían paridad definida: mezcla.' }],
        math: [{ kind: 'math-block', tex: 'V(-x) = V(x) \\;\\Rightarrow\\; [\\Pi, \\hat{H}] = 0 \\;\\Rightarrow\\; \\text{autoestados comunes } \\hat{H}\\psi = E\\psi, \\;\\Pi\\psi = \\pm\\psi.' }],
      },
      {
        id: 's2', label: 'Autovalores de Π',
        what: [{ kind: 'p', text: 'Determinamos los autovalores de Π.' }],
        why: [{ kind: 'p', text: 'Π² = I (aplicar paridad dos veces = identidad). Así los autovalores λ satisfacen λ²=1: λ=±1. "Par" (+1) o "impar" (-1).' }],
        meaning: [{ kind: 'p', text: 'Cada autoestado de Ĥ puede elegirse par o impar. En el pozo simétrico: n impar → coseno (par), n par → seno (impar).' }],
        info: [{ kind: 'p', text: 'La elección del origen en (-a,a) es lo que da paridad definida. Si el pozo está en (0,a), la paridad no aplica y los ψ_n son senos sin clasificar.' }],
        whatIf: [{ kind: 'p', text: 'Si hubiera degeneración (dos autoestados con misma E), se podría mezclar par e impar — pero en 1D no hay degeneración.' }],
        math: [{ kind: 'math-block', tex: '\\Pi^2 = I \\;\\Rightarrow\\; \\lambda = \\pm 1. \\quad \\psi_n \\text{ par (n impar)}, \\;\\psi_n \\text{ impar (n par)}.' }],
      },
      {
        id: 's3', label: 'Simplificación de x_{nm}',
        what: [{ kind: 'p', text: 'Aplicamos al cálculo de matrices.' }],
        why: [{ kind: 'p', text: 'x es operador impar (Π x Π = -x). Así ⟨ψ_n|x|ψ_m⟩ = -⟨ψ_n|Π x Π|ψ_m⟩ = -λ_n λ_m ⟨ψ_n|x|ψ_m⟩. Si λ_n λ_m = +1 (misma paridad), el elemento se anula.' }],
        meaning: [{ kind: 'p', text: 'Solo sobreviven los términos cruzados (par×impar): ⟨par|x|impar⟩≠0. Los diagonales ⟨n|x|n⟩=0 (siempre, por paridad). Esto simplifica enormemente el cálculo de ⟨x⟩ en superposiciones.' }],
        info: [{ kind: 'p', text: 'Análogo: p también es impar, así que las mismas reglas aplican a p_{nm}.' }],
        whatIf: [{ kind: 'p', text: 'En un potencial asimétrico, sin paridad, todos los x_{nm} podrían ser no nulos: el cálculo es mucho más laborioso.' }],
        math: [{ kind: 'math-block', tex: '\\langle \\psi_n | x | \\psi_m \\rangle = -\\lambda_n \\lambda_m \\langle \\psi_n | x | \\psi_m \\rangle \\;\\Rightarrow\\; = 0 \\text{ si } \\lambda_n = \\lambda_m.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'V(-x)=V(x) ⟹ [Π,Ĥ]=0 ⟹ autoestados comunes con paridad ±1. n impar→par (coseno), n par→impar (seno). Consecuencia: ⟨par|x|par⟩=⟨impar|x|impar⟩=0 (x es impar, integral cero). Solo sobreviven cruzados par×impar. Simplifica enormemente los cálculos matriciales.' }],
  },

  // ===================== 2.3 — Number operator derivation =====================
  {
    id: 'ex-2-3i',
    sectionId: '2.3',
    conceptIds: ['c2-harmonic-oscillator'],
    title: 'Operador número N = a†a y su espectro',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'A partir de a = √(mω/2ℏ)(x + ip/mω) y a† = √(mω/2ℏ)(x − ip/mω), deriva N = a†a = Ĥ/(ℏω) − ½. Verifica que N|n⟩ = n|n⟩ y que por tanto E_n = ℏω(n+½). ¿Por qué N es hermítico?' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Es N = a†a hermítico? ¿Por qué importa?' }],
        accept: ['si', 'hermítico', 'a† a', 'observable'],
        why: [{ kind: 'p', text: 'Que N sea hermítico garantiza autovalores reales (n enteros) y que sea observable medible. Es la base para identificar N como "número de cuantos".' }],
        reveal: [{ kind: 'p', text: 'Sí: (a†a)† = a†(a†)† = a†a = N. Es hermítico. Sus autovalores son reales (enteros n≥0), así que N es observable.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Calcula a†a = (mω/2ℏ)(x² + p²/(m²ω²) + i[x,p]/(mω)) = (mω/2ℏ)(x² + p²/(m²ω²) - ℏ/(mω)).' }] },
      { blocks: [{ kind: 'p', text: 'Reorganiza: a†a = p²/(2mℏω) + mωx²/(2ℏω) - ½ = Ĥ/(ℏω) - ½.' }] },
      { blocks: [{ kind: 'p', text: 'Así Ĥ = ℏω(N + ½). Si N|n⟩ = n|n⟩, entonces E_n = ℏω(n+½).' }] },
      { blocks: [{ kind: 'p', text: 'Hermítico: (a†a)† = a†(a†)† = a†a. Autovalores reales (n≥0 entero).' }] },
      { blocks: [{ kind: 'p', text: 'N cuenta cuantos: a† sube n (crea un cuanto), a baja n (destruye). N es el observable "número de cuantos".' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Calcular a†a',
        what: [{ kind: 'p', text: 'Expandimos a†a.' }],
        why: [{ kind: 'p', text: 'Sustituyendo las definiciones de a, a† y usando [x,p]=iℏ, el producto se simplifica al Hamiltoniano (en unidades de ℏω) menos ½.' }],
        meaning: [{ kind: 'p', text: 'N = a†a = Ĥ/(ℏω) − ½: el operador número es proporcional a la energía (desplazada por el punto cero). Medir N es medir la energía.' }],
        info: [{ kind: 'p', text: 'El término i[x,p]/(mω) = i·iℏ/(mω) = -ℏ/(mω) es la fuente del −½ del punto cero.' }],
        whatIf: [{ kind: 'p', text: 'Sin el conmutador [x,p]=iℏ, el −½ no aparecería y la energía mínima sería 0 — pero eso viola Heisenberg.' }],
        math: [{ kind: 'math-block', tex: 'a^\\dagger a = \\frac{m\\omega}{2\\hbar}\\left(x^2 + \\frac{p^2}{m^2\\omega^2} + \\frac{i[x,p]}{m\\omega}\\right) = \\frac{\\hat{H}}{\\hbar\\omega} - \\frac{1}{2}.' }],
      },
      {
        id: 's2', label: 'Ĥ = ℏω(N + ½)',
        what: [{ kind: 'p', text: 'Reescribimos Ĥ en términos de N.' }],
        why: [{ kind: 'p', text: 'Despejando: Ĥ = ℏω(a†a + ½) = ℏω(N + ½). Si conocemos los autovalores de N, obtenemos los de Ĥ.' }],
        meaning: [{ kind: 'p', text: 'La energía se expresa como ℏω × (n + ½): el número de cuantos n más el punto cero. Es la cuantización más limpia de toda la física.' }],
        info: [{ kind: 'p', text: 'El espaciamiento ℏω es uniforme: cada cuanto de energía añadido (vía a†) sube E en ℏω exactamente.' }],
        whatIf: [{ kind: 'p', text: 'Para un potencial no cuadrático, el espectro no es uniforme y no existe un operador número simple como N.' }],
        math: [{ kind: 'math-block', tex: '\\hat{H} = \\hbar\\omega(N + \\tfrac12), \\quad N = a^\\dagger a.' }],
      },
      {
        id: 's3', label: 'Hermítico y espectro',
        what: [{ kind: 'p', text: 'Verificamos hermiticidad y deducimos el espectro.' }],
        why: [{ kind: 'p', text: '(a†a)† = a†(a†)† = a†a: N es hermítico. Autovalores reales. Como ⟨ψ|N|ψ⟩ = ‖a|ψ⟩‖² ≥ 0, son no negativos. La cadena termina en n=0 (a|0⟩=0): enteros n≥0.' }],
        meaning: [{ kind: 'p', text: 'N es el observable "número de cuantos": mide cuántos cuantos de energía ℏω tiene el estado. n=0 es el vacío (fundamental), n=1 un cuanto, etc.' }],
        info: [{ kind: 'p', text: 'La hermiticidad de N es lo que permite interpretarlo como observable. Si no fuera hermítico, sus "autovalores" no serían medibles.' }],
        whatIf: [{ kind: 'p', text: 'a y a† NO son hermíticos (a† ≠ a): no son observables. Pero su producto a†a sí lo es.' }],
        math: [{ kind: 'math-block', tex: 'N^\\dagger = (a^\\dagger a)^\\dagger = a^\\dagger a = N \\text{ (hermítico)}, \\quad N|n\\rangle = n|n\\rangle, \\; n = 0,1,2,\\dots' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'N = a†a = Ĥ/(ℏω) − ½, así Ĥ = ℏω(N+½). N es hermítico ((a†a)†=a†a), con autovalores n≥0 enteros (por ‖a|ψ⟩‖²≥0 y a|0⟩=0). Así E_n = ℏω(n+½). N es el observable "número de cuantos": a† crea un cuanto, a lo destruye.' }],
  },

  // ===================== 2.5 — Delta well bound state wavefunction =====================
  {
    id: 'ex-2-5e',
    sectionId: '2.5',
    conceptIds: ['c2-delta', 'c2-bound-vs-scattering'],
    title: 'Función de onda del estado ligado del pozo delta',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Para V(x) = -αδ(x) con α>0, halla la función de onda normalizada ψ(x) del estado ligado. Verifica que es continua en x=0 pero que ψ\' tiene un salto. Comprueba la normalización ∫|ψ|²dx = 1.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué forma tiene ψ para un estado ligado (E<0)?' }],
        accept: ['exponencial', 'e^{-kappa |x|}', 'decae'],
        why: [{ kind: 'p', text: 'Para E<0 y V=0 (fuera del origen), la TISE da exponencial real. La simetría del potencial (par) sugiere ψ par.' }],
        reveal: [{ kind: 'p', text: 'ψ(x) = A e^{-κ|x|} con κ = √(-2mE)/ℏ. Es par (simétrica), decae exponencialmente a ambos lados.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Para x≠0, V=0 y E<0: ψ\'\' = κ²ψ → ψ = A e^{κx} (x<0), B e^{-κx} (x>0). Simetría: A=B.' }] },
      { blocks: [{ kind: 'p', text: 'Continuidad en 0: A = B (automático por simetría). Salto de derivada: ψ\'(0+)-ψ\'(0-) = -2κA = -(2mα/ℏ²)A.' }] },
      { blocks: [{ kind: 'p', text: 'Así κ = mα/ℏ², y E = -ℏ²κ²/(2m) = -mα²/(2ℏ²).' }] },
      { blocks: [{ kind: 'p', text: 'Normalización: 1 = 2A² ∫₀^∞ e^{-2κx} dx = 2A²·(1/(2κ)) = A²/κ. Así A = √κ.' }] },
      { blocks: [{ kind: 'p', text: 'ψ(x) = √κ e^{-κ|x|}. Verifica: ψ(0+)=ψ(0-)=√κ (continua), ψ\'(0+)-ψ\'(0-) = -2κ√κ = -(2mα/ℏ²)√κ ✓.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Forma de ψ',
        what: [{ kind: 'p', text: 'Escribimos ψ en cada región.' }],
        why: [{ kind: 'p', text: 'Para x≠0, V=0 y E<0: la TISE da ψ\'\' = κ²ψ con κ = √(-2mE)/ℏ > 0. Solución exponencial. El potencial es par, así que ψ es par.' }],
        meaning: [{ kind: 'p', text: 'La onda decae exponencialmente a ambos lados: la partícula está localizada cerca del pozo. Cuanto mayor α (pozo más profundo), mayor κ, más localizada.' }],
        info: [{ kind: 'p', text: 'La simetría par del potencial permite elegir ψ par. El estado fundamental siempre tiene la paridad del potencial.' }],
        whatIf: [{ kind: 'p', text: 'Si E>0 (dispersión), ψ sería oscilatoria (no decaería): no sería normalizable.' }],
        math: [{ kind: 'math-block', tex: '\\psi(x) = A\\,e^{-\\kappa|x|}, \\quad \\kappa = \\frac{\\sqrt{-2mE}}{\\hbar}.' }],
      },
      {
        id: 's2', label: 'Condiciones en x=0',
        what: [{ kind: 'p', text: 'Aplicamos continuidad y salto de derivada.' }],
        why: [{ kind: 'p', text: 'El delta es singular: ψ es continua (probabilidad no salta), pero ψ\' da un salto -(2mα/ℏ²)ψ(0) (pozo atractivo, signo negativo).' }],
        meaning: [{ kind: 'p', text: 'La continuidad se cumple por simetría (A=B). El salto fija κ en términos de α: a mayor α, mayor κ, más localizada.' }],
        info: [{ kind: 'p', text: 'El salto de derivada es proporcional a la fuerza α del pozo y al valor ψ(0): es el "empujón" puntual.' }],
        whatIf: [{ kind: 'p', text: 'Si α=0 (sin pozo), κ=0 y no hay estado ligado: recupera la partícula libre.' }],
        math: [{ kind: 'math-block', tex: '\\psi(0^+) = \\psi(0^-) = A, \\quad \\psi\'(0^+) - \\psi\'(0^-) = -2\\kappa A = -\\frac{2m\\alpha}{\\hbar^2}A \\;\\Rightarrow\\; \\kappa = \\frac{m\\alpha}{\\hbar^2}.' }],
      },
      {
        id: 's3', label: 'Normalización',
        what: [{ kind: 'p', text: 'Normalizamos y verificamos.' }],
        why: [{ kind: 'p', text: '∫|ψ|²dx = 2A²∫₀^∞ e^{-2κx}dx = A²/κ = 1 → A = √κ. Comprueba el salto: ψ\'(0+)−ψ\'(0−) = -κ√κ - (+κ√κ) = -2κ√κ = -(2mα/ℏ²)√κ ✓.' }],
        meaning: [{ kind: 'p', text: 'ψ(x) = √κ e^{-κ|x|} es la función de onda normalizada. La probabilidad decae como e^{-2κ|x|}: la "longitud de penetración" es 1/(2κ).' }],
        info: [{ kind: 'p', text: 'A mayor α, mayor κ, menor longitud de penetración: la partícula está más atrapada. Es la intuición del "pozo más profundo = más ligado".' }],
        whatIf: [{ kind: 'p', text: 'Para un pozo finito, la cola exponencial se "empalma" con una oscilación dentro del pozo: el delta es el caso límite de ancho→0.' }],
        math: [{ kind: 'math-block', tex: '\\psi(x) = \\sqrt{\\kappa}\\,e^{-\\kappa|x|}, \\quad \\kappa = \\frac{m\\alpha}{\\hbar^2}, \\quad E = -\\frac{m\\alpha^2}{2\\hbar^2}. \\;\\checkmark' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'ψ(x) = √κ e^{-κ|x|} con κ = mα/ℏ², E = -mα²/(2ℏ²). Continua en 0 (√κ a ambos lados), ψ\' salta -2κ√κ = -(2mα/ℏ²)√κ ✓. Normalizada: ∫|ψ|²dx = κ·(1/κ) = 1 ✓. La partícula está localizada con longitud de penetración 1/(2κ).' }],
  },

  // ===================== 2.7 — Transmission resonance =====================
  {
    id: 'ex-2-7e',
    sectionId: '2.7',
    conceptIds: ['c2-s-matrix', 'c2-finite-well'],
    title: 'Condiciones de resonancia en transmisión',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Para el pozo finito en régimen de dispersión (E>V₀), el coeficiente de transmisión es T = 1/[1 + V₀²sin²(2k\'a)/(4E(E-V₀))]. Demuestra que T=1 (resonancia) cuando 2k\'a = nπ. Explica físicamente por qué ocurren estas resonancias.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Cuándo se anula el seno en el denominador de T?' }],
        accept: ['n pi', '2k\'a = n pi', 'entero'],
        why: [{ kind: 'p', text: 'T es máximo (1) cuando el seno se anula: sin(2k\'a)=0 ⟹ 2k\'a = nπ. Es la condición de resonancia.' }],
        reveal: [{ kind: 'p', text: 'sin(2k\'a)=0 ⟹ 2k\'a = nπ (n entero). En esos valores de k\' (y por tanto de E), el denominador es 1 y T=1: resonancia perfecta.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'T = 1/[1 + V₀²sin²(2k\'a)/(4E(E-V₀))]. T es máximo cuando sin²(2k\'a)=0.' }] },
      { blocks: [{ kind: 'p', text: 'sin(2k\'a)=0 ⟹ 2k\'a = nπ, n entero. Entonces T=1 (resonancia).' }] },
      { blocks: [{ kind: 'p', text: 'Físicamente: las reflexiones en las dos paredes del pozo interfieren destructivamente → se cancelan → todo se transmite.' }] },
      { blocks: [{ kind: 'p', text: 'Es el análogo cuántico del Fabry-Pérot óptico: ondas que rebotan entre dos espejos y pasan todas a ciertas longitudes de onda.' }] },
      { blocks: [{ kind: 'p', text: 'Las energías de resonancia E_n corresponden a estados casi-ligados del pozo: la onda "encaja" dentro.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Condición T=1',
        what: [{ kind: 'p', text: 'Identificamos cuándo T=1.' }],
        why: [{ kind: 'p', text: 'T = 1/(1 + f(E)) donde f(E) = V₀²sin²(2k\'a)/(4E(E-V₀)) ≥ 0. T es máximo cuando f(E)=0, es decir cuando sin(2k\'a)=0.' }],
        meaning: [{ kind: 'p', text: 'T=1 ocurre a energías específicas: las resonancias. Fuera de ellas, T<1 (hay reflexión).' }],
        info: [{ kind: 'p', text: 'El seno aparece de la interferencia entre las dos fronteras del pozo. Sin la segunda frontera (escalón simple), no hay resonancia.' }],
        whatIf: [{ kind: 'p', text: 'Si V₀→0 (sin pozo), T→1 siempre (partícula libre): no hay resonancias distintivas.' }],
        math: [{ kind: 'math-block', tex: 'T = \\frac{1}{1 + \\frac{V_0^2 \\sin^2(2k\'a)}{4E(E-V_0)}} = 1 \\;\\Leftrightarrow\\; \\sin(2k\'a) = 0 \\;\\Leftrightarrow\\; 2k\'a = n\\pi.' }],
      },
      {
        id: 's2', label: 'Interpretación física',
        what: [{ kind: 'p', text: 'Explicamos las resonancias.' }],
        why: [{ kind: 'p', text: 'La onda se refleja en cada frontera del pozo (x=±a). Las reflexiones múltiples interfieren. A ciertas longitudes de onda (2k\'a=nπ), las reflexiones hacia atrás se cancelan destructivamente: todo se transmite.' }],
        meaning: [{ kind: 'p', text: 'Es el interferómetro de Fabry-Pérot cuántico: el pozo actúa como dos espejos semi-transparentes. A resonancia, la onda interna "encaja" (n medios-arcos) y pasa sin reflexión.' }],
        info: [{ kind: 'p', text: 'Las energías de resonancia E_n ≈ ℏ²k\'²/(2m) + V₀ corresponden a los estados que existirían en el pozo cerrado (estados "virtuales" ligados).' }],
        whatIf: [{ kind: 'p', text: 'Con tres o más pozos, se forma una red: las resonancias se ensanchan en bandas permitidas, y entre ellas aparecen gaps. Es el origen de la teoría de bandas.' }],
        math: [{ kind: 'math-block', tex: '\\text{Resonancia: reflexiones se cancelan destructivamente. } 2k\'a = n\\pi \\Leftrightarrow n \\text{ medios-arcos encajan en } 2a.' }],
      },
      {
        id: 's3', label: 'Analogía con Fabry-Pérot',
        what: [{ kind: 'p', text: 'Conectamos con óptica.' }],
        why: [{ kind: 'p', text: 'En óptica, dos espejos semi-transparentes separados por L dan transmisión total a 2kL = 2nπ (longitud de onda encaja). El pozo cuántico es idéntico, con ondas de materia en vez de luz.' }],
        meaning: [{ kind: 'p', text: 'La resonancia cuántica y la óptica comparten el mismo mecanismo (interferencia). Esto permite usar intuición óptica en cuántica y viceversa.' }],
        info: [{ kind: 'p', text: 'Aplicación: filtros de energía (selección de partículas por energía) como filtros ópticos seleccionan longitudes de onda.' }],
        whatIf: [{ kind: 'p', text: 'Si el pozo tuviera absorción (potencial complejo), las resonancias se ensancharían y T<1 incluso a resonancia: la absorción "rompe" la interferencia perfecta.' }],
        math: [{ kind: 'p', text: 'Análogo óptico: Fabry-Pérot, 2kL=2nπ. El pozo cuántico es un Fabry-Pérot de ondas de materia. Base de los filtros de energía.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'T=1 cuando sin(2k\'a)=0, es decir 2k\'a=nπ. Físicamente: las reflexiones en las dos fronteras interfieren destructivamente y se cancelan → todo se transmite. Es el Fabry-Pérot cuántico: las energías de resonancia corresponden a estados casi-ligados del pozo. Base de la teoría de bandas (N pozos → N resonancias → banda).' }],
  },
]
