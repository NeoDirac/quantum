import type { Exercise } from '@/lib/content-types'

// Phase 3 exercises: ladder operators (2.3), Fourier transforms (2.4),
// delta barrier T/R (2.5), plus a virial theorem problem (2.3/2.6).
// All content original to this platform.

export const EXERCISES_PHASE3: Exercise[] = [
  // ===================== 2.3 — Ladder operator derivations =====================
  {
    id: 'ex-2-3d',
    sectionId: '2.3',
    conceptIds: ['c2-harmonic-oscillator'],
    title: 'Deriva el espectro del oscilador con [a, a†] = 1',
    difficulty: 3,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Partiendo solo de la relación de conmutación [a, a†] = 1 y de Ĥ = ℏω(a†a + ½), deriva paso a paso:' },
      { kind: 'list', items: [
        [{ kind: 'p', text: '(a) que los autovalores de N = a†a son enteros no negativos n = 0,1,2,…;' }],
        [{ kind: 'p', text: '(b) que a|n⟩ = √n |n−1⟩ y a†|n⟩ = √(n+1) |n+1⟩;' }],
        [{ kind: 'p', text: '(c) el espectro E_n = ℏω(n + ½).' }],
      ]},
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué relación de conmutación cumple N = a†a con a y con a†? (Dedúcela de [a,a†]=1.)' }],
        accept: ['[n,a]=-a', '[n,a†]=a†', 'n a', 'a n'],
        why: [{ kind: 'p', text: 'Estas relaciones son la pieza central: dicen que a baja el autovalor de N en 1, y a† lo sube en 1. Sin ellas no hay "escalera".' }],
        reveal: [{ kind: 'p', text: '[N, a] = -a y [N, a†] = a†. Se deducen de [a, a†] = 1 usando [AB,C] = A[B,C] + [A,C]B.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Usa [AB,C] = A[B,C] + [A,C]B para calcular [N,a] y [N,a†].' }] },
      { blocks: [{ kind: 'p', text: 'N a = a N - a = a (N - 1); así que si N|n⟩ = ν|n⟩, entonces N(a|n⟩) = (ν-1)(a|n⟩): a baja el autovalor en 1.' }] },
      { blocks: [{ kind: 'p', text: 'Análogamente a† lo sube en 1. Los autovalores forman una escalera ν, ν±1, ν±2,…' }] },
      { blocks: [{ kind: 'p', text: 'Como ⟨ψ|N|ψ⟩ = ‖a|ψ⟩‖² ≥ 0, los autovalores son no negativos. La escalera debe terminar abajo: existe |0⟩ con a|0⟩ = 0.' }] },
      { blocks: [{ kind: 'p', text: 'Desde |0⟩ (ν=0): |n⟩ = (a†)ⁿ/√(n!) |0⟩. Entonces Ĥ = ℏω(N+½) da E_n = ℏω(n+½).' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Relaciones de conmutación de N',
        what: [{ kind: 'p', text: 'Calculamos [N,a] y [N,a†].' }],
        why: [{ kind: 'p', text: 'Porque la relación de conmutación de N con a/a† dice si estos suben o bajan el autovalor. Es la estructura algebraica esencial.' }],
        meaning: [{ kind: 'p', text: 'a es operador de descenso, a† de ascenso: actúan como peldaños de una escalera de autovalores.' }],
        info: [{ kind: 'p', text: 'Solo se necesita [a, a†] = 1: toda la estructura del oscilador se deduce de ahí.' }],
        whatIf: [{ kind: 'p', text: 'Si [a,a†] fuera otra constante, el espaciamiento cambiaría pero la estructura de escalera se mantendría.' }],
        math: [{ kind: 'math-block', tex: '[N, a] = [a^\\dagger a, a] = a^\\dagger[a,a] + [a^\\dagger,a]a = -a, \\quad [N, a^\\dagger] = a^\\dagger.' }],
      },
      {
        id: 's2', label: 'Acción de a y a† sobre |n⟩',
        what: [{ kind: 'p', text: 'Deducimos cómo a y a† cambian n.' }],
        why: [{ kind: 'p', text: 'Si N|n⟩ = ν|n⟩, entonces N(a|n⟩) = (ν−1)(a|n⟩) (de [N,a]=−a). Así a|n⟩ es autoestado de N con autovalor ν−1, si no se anula.' }],
        meaning: [{ kind: 'p', text: 'a baja en 1, a† sube en 1. Los autovalores forman una escalera de enteros.' }],
        info: [{ kind: 'p', text: 'La normalización sale de ‖a|n⟩‖² = ⟨n|a†a|n⟩ = ⟨n|N|n⟩ = ν, así que a|n⟩ = √ν |n−1⟩.' }],
        whatIf: [{ kind: 'p', text: 'Si ν no fuera entero, la escalera no terminaría abajo y ν podría ser arbitrario — pero la cota inferior lo fuerza a ser entero.' }],
        math: [{ kind: 'math-block', tex: 'a|n\\rangle = \\sqrt{n}\\,|n-1\\rangle, \\quad a^\\dagger|n\\rangle = \\sqrt{n+1}\\,|n+1\\rangle.' }],
      },
      {
        id: 's3', label: 'Cota inferior y espectro',
        what: [{ kind: 'p', text: 'Mostramos que n ≥ 0 y deducimos E_n.' }],
        why: [{ kind: 'p', text: '⟨ψ|N|ψ⟩ = ‖a|ψ⟩‖² ≥ 0: los autovalores no pueden ser negativos. La escalera que baja debe parar en n=0 (a|0⟩=0), sino |−1⟩ tendría autovalor −1, imposible.' }],
        meaning: [{ kind: 'p', text: 'El espectro es discreto y uniformemente espaciado: E_n = ℏω(n+½). El ½ es el punto cero, inevitable porque n empieza en 0, no en −1.' }],
        info: [{ kind: 'p', text: 'La positividad de N = a†a (es "norma al cuadrado") es la cota topológica que fija el mínimo.' }],
        whatIf: [{ kind: 'p', text: 'Si la cota inferior fuera otra, el espectro se desplazaría. Aquí es 0 porque N es positivo semidefinido.' }],
        math: [{ kind: 'math-block', tex: '\\hat{H}|n\\rangle = \\hbar\\omega(N + \\tfrac12)|n\\rangle = \\hbar\\omega(n + \\tfrac12)|n\\rangle, \\quad n = 0,1,2,\\dots' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'De [a,a†]=1 se sigue [N,a]=−a, [N,a†]=a†, así que a y a† bajan/suben n. La positividad ⟨N⟩≥0 fuerza n≥0 entero, con a|0⟩=0. Resultado: E_n = ℏω(n+½), n=0,1,2,…' }],
  },

  {
    id: 'ex-2-3e',
    sectionId: '2.3',
    conceptIds: ['c2-harmonic-oscillator'],
    title: 'Teorema del virial en el oscilador',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'El teorema del virial para un potencial V ∝ x^s dice que ⟨T⟩ = (s/2)⟨V⟩ en un estado estacionario. Aplícalo al oscilador (s=2) y verifica que da ⟨T⟩ = ⟨V⟩ = ½E_n. Comprueba con los valores ⟨x²⟩ y ⟨p²⟩ del método algebraico.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: 'Para V ∝ x^s, ¿cuál es la relación entre ⟨T⟩ y ⟨V⟩?' }],
        accept: ['s/2', 't=v', '2⟨t⟩=s⟨v⟩'],
        why: [{ kind: 'p', text: 'El virial conecta cinética y potencial media: para potenciales de potencia, fija la proporción. Es un atajo para obtener ⟨T⟩ y ⟨V⟩ sin integrar.' }],
        reveal: [{ kind: 'p', text: '⟨T⟩ = (s/2)⟨V⟩. Para s=2 (oscilador): ⟨T⟩ = ⟨V⟩, así que cada uno es la mitad de E.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Virial: 2⟨T⟩ = ⟨x·dV/dx⟩. Para V = ½mω²x², dV/dx = mω²x, así que 2⟨T⟩ = ⟨mω²x²⟩ = 2⟨V⟩.' }] },
      { blocks: [{ kind: 'p', text: 'Por tanto ⟨T⟩ = ⟨V⟩ = E_n/2 = ½ℏω(n+½).' }] },
      { blocks: [{ kind: 'p', text: 'Comprueba: ⟨T⟩ = ⟨p²⟩/(2m) = (n+½)mωℏ/2m = ½ℏω(n+½) ✓ (usando ⟨p²⟩ del método algebraico).' }] },
      { blocks: [{ kind: 'p', text: 'Y ⟨V⟩ = ½mω²⟨x²⟩ = ½mω²·(n+½)ℏ/(mω) = ½ℏω(n+½) ✓.' }] },
      { blocks: [{ kind: 'p', text: 'Todo cuadra: el virial predice ⟨T⟩=⟨V⟩, y los valores algebraicos lo confirman.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Virial para V ∝ x²',
        what: [{ kind: 'p', text: 'Aplicamos el teorema del virial.' }],
        why: [{ kind: 'p', text: 'Para potenciales de potencia V ∝ x^s, el virial da 2⟨T⟩ = s⟨V⟩. Con s=2: ⟨T⟩ = ⟨V⟩, sin necesidad de calcular integrales.' }],
        meaning: [{ kind: 'p', text: 'La energía se reparte a partes iguales entre cinética y potencial. Es una propiedad de los potenciales cuadráticos (no general).' }],
        info: [{ kind: 'p', text: 'El virial se deduce de [x,p]=iℏ y de la estacionariedad: d⟨xp⟩/dt = 0 en un estado estacionario.' }],
        whatIf: [{ kind: 'p', text: 'Para V ∝ 1/x (Coulomb, s=−1): ⟨T⟩ = −⟨V⟩/2 (energía negativa, ligadura). Para V ∝ x⁴: ⟨T⟩ = 2⟨V⟩.' }],
        math: [{ kind: 'math-block', tex: '2\\langle T \\rangle = \\langle x\\,dV/dx \\rangle = 2\\langle V \\rangle \\;\\Rightarrow\\; \\langle T \\rangle = \\langle V \\rangle = \\tfrac12 E_n.' }],
      },
      {
        id: 's2', label: 'Verificación algebraica',
        what: [{ kind: 'p', text: 'Comprobamos con ⟨x²⟩ y ⟨p²⟩.' }],
        why: [{ kind: 'p', text: 'Para confirmar que el virial no se equivoca, usamos los valores exactos del método algebraico: ⟨x²⟩ = (n+½)ℏ/(mω), ⟨p²⟩ = (n+½)mωℏ.' }],
        meaning: [{ kind: 'p', text: 'Todo es consistente: cinética y potencial aportan igual al total E_n. Es una verificación cruzada poderosa.' }],
        info: [{ kind: 'p', text: 'El virial es un atajo: si solo necesitas ⟨T⟩ o ⟨V⟩, evita calcular ⟨x²⟩ o ⟨p²⟩ por separado.' }],
        whatIf: [{ kind: 'p', text: 'Para estados no estacionarios (superposiciones), el virial promedio temporal se mantiene, pero instantáneamente puede no valer.' }],
        math: [{ kind: 'math-block', tex: '\\langle T \\rangle = \\frac{\\langle p^2 \\rangle}{2m} = \\tfrac12\\hbar\\omega(n+\\tfrac12) = \\langle V \\rangle = \\tfrac12 m\\omega^2 \\langle x^2 \\rangle.\\;\\checkmark' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'Virial para V∝x²: ⟨T⟩ = ⟨V⟩ = E_n/2 = ½ℏω(n+½). Verificado con ⟨x²⟩ = (n+½)ℏ/(mω) y ⟨p²⟩ = (n+½)mωℏ.' }],
  },

  // ===================== 2.4 — Fourier transforms =====================
  {
    id: 'ex-2-4b',
    sectionId: '2.4',
    conceptIds: ['c2-free-particle'],
    title: 'Transformada de Fourier del estado inicial',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Una partícula libre tiene como estado inicial un paquete gaussiano centrado en x₀:' },
      { kind: 'math-block', tex: '\\Psi(x,0) = \\left(\\frac{2\\alpha}{\\pi}\\right)^{1/4} e^{-\\alpha(x-x_0)^2} e^{i k_0 x}.' },
      { kind: 'p', text: 'Calcula su transformada de Fourier φ(k) y verifica que ∫|Ψ|²dx = ∫|φ(k)|²dk = 1 (Parseval).' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué relación hay entre Ψ(x,0) y φ(k)?' }],
        accept: ['fourier', 'transformada', 'integral e^{-ikx}'],
        why: [{ kind: 'p', text: 'La transformada de Fourier es el puente entre el espacio de posiciones y el de momentos. Sin ella no puedes evolucionar el paquete.' }],
        reveal: [{ kind: 'p', text: 'φ(k) = (1/√(2π)) ∫ Ψ(x,0) e^{-ikx} dx. Para una gaussiana, la transformada es otra gaussiana.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'φ(k) = (1/√(2π)) ∫ Ψ(x,0) e^{-ikx} dx. La gaussiana se transforma en otra gaussiana.' }] },
      { blocks: [{ kind: 'p', text: 'Completa el cuadrado en el exponente: -α(x-x₀)² + i(k₀-k)x = -α[x - x₀ - i(k₀-k)/(2α)]² + ...' }] },
      { blocks: [{ kind: 'p', text: 'El resultado es φ(k) = (1/(2πα))^{1/4} (1/√(2α)) ... gaussiana centrada en k₀ con ancho √(α/2).' }] },
      { blocks: [{ kind: 'p', text: 'φ(k) = (1/(2πα))^{1/4} · (1/√(2α)) · exp(-(k-k₀)²/(4α)) · e^{-i(k-k₀)x₀}. Bueno: φ(k) = (2α/π)^{-1/4}·(1/√(2α))... simplifica.' }] },
      { blocks: [{ kind: 'p', text: 'Ancho en x: Δx ~ 1/√(2α); ancho en k: Δk ~ √(2α). Producto Δx·Δk ~ 1 (saturación de incertidumbre).' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Definición de Fourier',
        what: [{ kind: 'p', text: 'Escribimos la transformada.' }],
        why: [{ kind: 'p', text: 'φ(k) es la amplitud de cada onda plana e^{ikx} en la superposición. Sin ella no podemos escribir Ψ(x,t).' }],
        meaning: [{ kind: 'p', text: 'φ(k) describe la distribución de momentos: |φ(k)|² es la probabilidad de medir p = ℏk.' }],
        info: [{ kind: 'p', text: 'La partícula libre se expresa como integral (no suma) sobre k porque el espectro de momento es continuo.' }],
        whatIf: [{ kind: 'p', text: 'Si la partícula estuviera en un pozo, usaríamos suma discreta sobre n, no integral sobre k.' }],
        math: [{ kind: 'math-block', tex: '\\phi(k) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^{\\infty} \\Psi(x,0)\\,e^{-ikx}\\,dx.' }],
      },
      {
        id: 's2', label: 'Integral gaussiana',
        what: [{ kind: 'p', text: 'Resolvemos la integral.' }],
        why: [{ kind: 'p', text: 'Es una integral gaussiana estándar: ∫e^{-αx²+βx}dx = √(π/α)·e^{β²/(4α)}. El exponente es cuadrático en x.' }],
        meaning: [{ kind: 'p', text: 'La gaussiana en x se transforma en gaussiana en k: una propiedad especial de las gaussianas (son autoestados del Fourier).' }],
        info: [{ kind: 'p', text: 'El centro k₀ de la gaussiana en k viene del factor de fase e^{ik₀x} del estado inicial.' }],
        whatIf: [{ kind: 'p', text: 'Si Ψ no fuera gaussiana, φ(k) tendría otra forma (pico más ancho, oscilaciones, etc.).' }],
        math: [{ kind: 'math-block', tex: '\\phi(k) = \\left(\\frac{1}{2\\pi\\alpha}\\right)^{1/4} \\frac{1}{\\sqrt{2\\alpha}} \\,e^{-(k-k_0)^2/(4\\alpha)}\\,e^{-i(k-k_0)x_0}.' }],
      },
      {
        id: 's3', label: 'Parseval y Δx·Δk',
        what: [{ kind: 'p', text: 'Verificamos Parseval y la incertidumbre.' }],
        why: [{ kind: 'p', text: 'Parseval garantiza que la probabilidad total se conserva entre ambas representaciones. La incertidumbre Δx·Δk ≥ ½ es Heisenberg.' }],
        meaning: [{ kind: 'p', text: 'Δx ~ 1/√(2α), Δk ~ √(2α), así que Δx·Δk ~ ½: el paquete gaussiano satura el límite de incertidumbre. Es el estado "minimal".' }],
        info: [{ kind: 'p', text: 'La gaussiana es el único estado que satura Heisenberg (Δx·Δp = ℏ/2 exacto). Por eso el estado fundamental del oscilador es gaussiano.' }],
        whatIf: [{ kind: 'p', text: 'Un paquete no gaussiano tendría Δx·Δk > ½: no saturaría. Cuanto más "no gaussiano", mayor el producto.' }],
        math: [{ kind: 'math-block', tex: '\\int |\\Psi|^2 dx = \\int |\\phi(k)|^2 dk = 1, \\quad \\Delta x \\cdot \\Delta k = \\tfrac12 \\;\\Rightarrow\\; \\Delta x \\cdot \\Delta p = \\tfrac{\\hbar}{2}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'φ(k) es gaussiana centrada en k₀ con ancho √(2α) y fase e^{-i(k-k₀)x₀}. Parseval se cumple. Δx·Δk = ½: el paquete gaussiano satura Heisenberg.' }],
  },

  // ===================== 2.5 — Delta barrier T/R =====================
  {
    id: 'ex-2-5b',
    sectionId: '2.5',
    conceptIds: ['c2-delta', 'c2-probability-current'],
    title: 'Coeficientes T y R de la barrera delta',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Para una barrera delta V(x) = +αδ(x) con α > 0 y una partícula incidente desde la izquierda con energía E > 0, calcula los coeficientes de reflexión R y transmisión T. Interpreta los límites E → ∞ y E → 0.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué condiciones de frontera aplica el delta en x=0?' }],
        accept: ['psi continua', 'salto de derivada', 'psi(0+)=psi(0-)'],
        why: [{ kind: 'p', text: 'El delta es singular: ψ es continua, pero ψ\' da un salto proporcional a ψ(0). Sin estas dos condiciones no puedes relacionar A, B, C.' }],
        reveal: [{ kind: 'p', text: 'ψ continua en 0: ψ(0⁺) = ψ(0⁻). Salto de derivada: ψ\'(0⁺) − ψ\'(0⁻) = (2mα/ℏ²)ψ(0) (signo + porque es barrera).' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Izquierda: ψ = A e^{ikx} + B e^{-ikx} (incidente + reflejada). Derecha: ψ = C e^{ikx} (transmitida). k = √(2mE)/ℏ.' }] },
      { blocks: [{ kind: 'p', text: 'Continuidad: A + B = C. Salto de derivada: ik(C - A + B) = (2mα/ℏ²)C.' }] },
      { blocks: [{ kind: 'p', text: 'Resuelve: B/A = -iβ/(k+iβ) con β = mα/ℏ². C/A = k/(k+iβ).' }] },
      { blocks: [{ kind: 'p', text: 'R = |B/A|² = β²/(k²+β²), T = |C/A|² = k²/(k²+β²). Verifica R+T = 1.' }] },
      { blocks: [{ kind: 'p', text: 'E→∞ (k→∞): T→1 (transparente). E→0 (k→0): T→0 (opaca).' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Condiciones en x=0',
        what: [{ kind: 'p', text: 'Aplicamos continuidad y salto de derivada.' }],
        why: [{ kind: 'p', text: 'El delta es singular, así que integrar la TISE en torno a 0 da un contributo finito. ψ sigue continua; ψ\' salta proporcional a la fuerza α y a ψ(0).' }],
        meaning: [{ kind: 'p', text: 'El "empujón" puntual de la barrera cambia bruscamente el momento local de la onda: de ahí el salto. ψ no salta (la probabilidad es continua).' }],
        info: [{ kind: 'p', text: 'El signo del salto es + para barrera (repulsiva), − para pozo (atractiva).' }],
        whatIf: [{ kind: 'p', text: 'Si V fuera finito (no delta), ψ\' sería continua y no habría salto: el método cambia.' }],
        math: [{ kind: 'math-block', tex: 'A + B = C, \\quad ik(C - A + B) = \\frac{2m\\alpha}{\\hbar^2}C.' }],
      },
      {
        id: 's2', label: 'Resolver para B/A y C/A',
        what: [{ kind: 'p', text: 'Despejamos los coeficientes.' }],
        why: [{ kind: 'p', text: 'Dos ecuaciones, tres incógnitas (A,B,C). Fijamos A=1 (amplitud incidente) y resolvemos B, C. Todo se expresa en función del parámetro adimensional β/k.' }],
        meaning: [{ kind: 'p', text: 'B/A es la amplitud reflejada, C/A la transmitida. Sus módulos al cuadrado son R y T.' }],
        info: [{ kind: 'p', text: 'El parámetro β = mα/ℏ² mide la "fuerza" del delta relativo a la energía.' }],
        whatIf: [{ kind: 'p', text: 'Si α→0 (sin barrera), β→0, B→0, C→A: todo se transmite (partícula libre).' }],
        math: [{ kind: 'math-block', tex: '\\frac{B}{A} = \\frac{-i\\beta}{k + i\\beta}, \\quad \\frac{C}{A} = \\frac{k}{k + i\\beta}, \\quad \\beta = \\frac{m\\alpha}{\\hbar^2}.' }],
      },
      {
        id: 's3', label: 'R, T y límites',
        what: [{ kind: 'p', text: 'Calculamos R, T y los límites.' }],
        why: [{ kind: 'p', text: 'R = |B/A|², T = |C/A|² (k es igual a ambos lados, no hay factor k). R+T=1 confirma conservación de probabilidad.' }],
        meaning: [{ kind: 'p', text: 'E→∞ (k≫β): la barrera se vuelve transparente. E→0 (k≪β): casi todo se refleja. La barrera delta nunca refleja el 100% para E>0 finito.' }],
        info: [{ kind: 'p', text: 'Los límites son físicamente intuitivos: alta energía ignora la barrera, baja energía la siente toda.' }],
        whatIf: [{ kind: 'p', text: 'Para un pozo delta (−αδ), el signo de β cambia pero R y T son iguales: dispersión simétrica respecto al signo. El pozo también dispersa (salvo su estado ligado).' }],
        math: [{ kind: 'math-block', tex: 'R = \\frac{\\beta^2}{k^2 + \\beta^2}, \\quad T = \\frac{k^2}{k^2 + \\beta^2}, \\quad R + T = 1. \\quad E\\to\\infty: T\\to 1;\\; E\\to 0: T\\to 0.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'R = β²/(k²+β²), T = k²/(k²+β²) con β = mα/ℏ². R+T = 1. Límites: E→∞ → T→1 (transparente); E→0 → T→0 (opaca). La barrera delta nunca refleja al 100% para E>0 finito.' }],
    commonErrors: [
      {
        id: 'e1', type: 'boundary',
        signature: [{ kind: 'p', text: 'Usar ψ\' continua en x=0.' }],
        explanation: [{ kind: 'p', text: 'El delta es singular: ψ\' da un salto. Si lo tratas como V finito (ψ\' continua), pierdes el efecto del delta y obtienes R=0, T=1 (incorrecto).' }],
      },
    ],
  },
]
