import type { Exercise } from '@/lib/content-types'

// Phase 5 exercises: Hermite recursion (2.3), group vs phase velocity (2.4),
// delta well vs barrier comparison (2.5), bound states vs z₀ (2.6).
// All content original to this platform.

export const EXERCISES_PHASE5: Exercise[] = [
  // ===================== 2.3 — Hermite recursion =====================
  {
    id: 'ex-2-3f',
    sectionId: '2.3',
    conceptIds: ['c2-harmonic-oscillator'],
    title: 'Fórmula de recursión para los polinomios de Hermite',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Los polinomios de Hermite H_n(ξ) satisfacen la relación de recursión H_{n+1}(ξ) = 2ξ·H_n(ξ) − 2n·H_{n-1}(ξ), con H_0=1 y H_1=2ξ. (a) Construye H_2 y H_3 con esta fórmula. (b) Verifica que la función de onda ψ_n(x) = (constante)·H_n(ξ)·e^{−ξ²/2} es solución de la ecuación del oscilador para n=2.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Por qué aparece la recursión y para qué sirve?' }],
        accept: ['construir', 'generar', 'sin derivar', 'efficiente'],
        why: [{ kind: 'p', text: 'La recursión permite construir todos los H_n a partir de H_0 y H_1 sin derivar. Es la herramienta que hace viable el método analítico.' }],
        reveal: [{ kind: 'p', text: 'La recursión viene de la fórmula de Rodrigues / de la relación d/dξ H_n = 2n H_{n-1}. Permite generar H_n eficientemente: cada uno se construye de los dos anteriores.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'H_0=1, H_1=2ξ. H_2 = 2ξ·(2ξ) − 2·1·(1) = 4ξ²−2.' }] },
      { blocks: [{ kind: 'p', text: 'H_3 = 2ξ·(4ξ²−2) − 2·2·(2ξ) = 8ξ³−4ξ−8ξ = 8ξ³−12ξ.' }] },
      { blocks: [{ kind: 'p', text: 'Verifica: la EDO del oscilador (en ξ) es ψ\'\' + (2n+1−ξ²)ψ = 0, con n=2 da ψ\'\' + (5−ξ²)ψ = 0.' }] },
      { blocks: [{ kind: 'p', text: 'Para ψ_2 = (4ξ²−2)e^{−ξ²/2}, calcula ψ\'\' y sustituye. Debe dar 0 si H_2 es correcto.' }] },
      { blocks: [{ kind: 'p', text: 'Resultado: ψ_2 es solución → E_2 = (2+½)ℏω = 5ℏω/2. Coincide con el método algebraico.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Construir H_2, H_3',
        what: [{ kind: 'p', text: 'Aplicamos la recursión.' }],
        why: [{ kind: 'p', text: 'La recursión H_{n+1}=2ξH_n−2nH_{n-1} genera cada polinomio de los dos anteriores. Es la forma eficiente de construir la familia entera.' }],
        meaning: [{ kind: 'p', text: 'Cada H_n tiene grado n y paridad (-1)^n: H_0 par, H_1 impar, H_2 par, etc. Esto determina la paridad de ψ_n.' }],
        info: [{ kind: 'p', text: 'Las constantes H_0=1, H_1=2ξ son las condiciones iniciales de la recursión.' }],
        whatIf: [{ kind: 'p', text: 'Sin recursión, habría que usar la fórmula de Rodrigues H_n=(-1)^n e^{ξ²} d^n/dξ^n(e^{-ξ²}) — mucho más laborioso para n grande.' }],
        math: [{ kind: 'math-block', tex: 'H_2(\\xi) = 2\\xi(2\\xi) - 2(1) = 4\\xi^2 - 2, \\quad H_3(\\xi) = 2\\xi(4\\xi^2-2) - 4(2\\xi) = 8\\xi^3 - 12\\xi.' }],
      },
      {
        id: 's2', label: 'Verificar la EDO',
        what: [{ kind: 'p', text: 'Sustituimos ψ_2 en la ecuación del oscilador.' }],
        why: [{ kind: 'p', text: 'La EDO del oscilador en variable ξ = √(mω/ℏ)x es: d²ψ/dξ² + (2n+1−ξ²)ψ = 0. Si ψ_2 la satisface, H_2 es el polinomio correcto.' }],
        meaning: [{ kind: 'p', text: 'La verificación confirma que el método analítico (serie de potencias + Hermite) y el algebraico (a, a†) dan el mismo resultado: consistencia interna.' }],
        info: [{ kind: 'p', text: 'El factor (2n+1) en la EDO corresponde a la energía E_n=(n+½)ℏω en unidades naturales (m=ω=ℏ=1).' }],
        whatIf: [{ kind: 'p', text: 'Si H_2 fuera incorrecto, la sustitución no daría 0 — y ψ_2 no sería autoestado. La EDO es el juez final.' }],
        math: [{ kind: 'math-block', tex: '\\psi_2 = (4\\xi^2-2)e^{-\\xi^2/2}, \\quad \\frac{d^2\\psi_2}{d\\xi^2} + (5-\\xi^2)\\psi_2 = 0 \\;\\checkmark' }],
      },
      {
        id: 's3', label: 'Energía',
        what: [{ kind: 'p', text: 'Leemos la energía.' }],
        why: [{ kind: 'p', text: 'El coeficiente (2n+1) en la EDO es la energía en unidades naturales: E_n = (n+½)ℏω.' }],
        meaning: [{ kind: 'p', text: 'E_2 = 5ℏω/2: el segundo excitado. Coincide con el método algebraico (E_n = ℏω(n+½)). La verificación cruzada valida ambos métodos.' }],
        info: [{ kind: 'p', text: 'La consistencia entre métodos algebraico y analítico es una de las satisfacciones del oscilador: dos caminos, mismo resultado.' }],
        whatIf: [{ kind: 'p', text: 'Si los métodos dieran resultados distintos, habría un error en uno. Esta verificación es un control de calidad poderoso.' }],
        math: [{ kind: 'math-block', tex: 'E_n = (n + \\tfrac12)\\hbar\\omega \\;\\Rightarrow\\; E_2 = \\tfrac{5}{2}\\hbar\\omega.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'H_2 = 4ξ²−2, H_3 = 8ξ³−12ξ. ψ_2 = (4ξ²−2)e^{−ξ²/2} satisface la EDO del oscilador d²ψ/dξ²+(5−ξ²)ψ=0, confirmando E_2 = 5ℏω/2. La recursión construye toda la familia sin derivar.' }],
  },

  // ===================== 2.4 — Group vs phase velocity =====================
  {
    id: 'ex-2-4c',
    sectionId: '2.4',
    conceptIds: ['c2-free-particle'],
    title: 'Velocidad de grupo vs velocidad de fase',
    difficulty: 1,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Para una partícula libre, la relación de dispersión es ω(k) = ℏk²/(2m). Calcula la velocidad de fase v_f = ω/k y la velocidad de grupo v_g = dω/dk. ¿Cuál corresponde a la velocidad de la partícula? ¿Puede v_f superar la velocidad de la luz en algún régimen? Explica por qué esto no viola la relatividad.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué transporta energía/materia: la fase o la envolvente del paquete?' }],
        accept: ['envolvente', 'grupo', 'paquete'],
        why: [{ kind: 'p', text: 'Distinguir fase (oscilación interna) de envolvente (forma del paquete) es clave: solo la envolvente transporta probabilidad/energía. La fase es "interna" y no transporta nada físicamente.' }],
        reveal: [{ kind: 'p', text: 'La envolvente (grupo) transporta probabilidad. La fase interna gira sin transportar nada. Por eso v_g es la velocidad de la partícula, no v_f.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'v_f = ω/k = ℏk/(2m) = p/(2m). Es la MITAD de la velocidad clásica p/m.' }] },
      { blocks: [{ kind: 'p', text: 'v_g = dω/dk = ℏk/m = p/m. Es la velocidad clásica.' }] },
      { blocks: [{ kind: 'p', text: 'La partícula es la envolvente del paquete → v_g es la velocidad física. v_f no es observable directamente.' }] },
      { blocks: [{ kind: 'p', text: 'v_f = p/(2m) puede ser arbitrariamente grande para p grande. Pero v_f no transporta información.' }] },
      { blocks: [{ kind: 'p', text: 'No hay violación relativista: solo v_g (que ≤ c con la versión relativista) transporta señal. v_f superlumínica es permitida.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Calcular v_f y v_g',
        what: [{ kind: 'p', text: 'Calculamos ambas velocidades.' }],
        why: [{ kind: 'p', text: 'v_f = ω/k y v_g = dω/dk son definiciones. Para ω=ℏk²/(2m), se obtienen directamente. La diferencia es por la no linealidad de ω(k).' }],
        meaning: [{ kind: 'p', text: 'v_f = p/(2m) (mitad de la clásica), v_g = p/m (la clásica). La fase gira más lento que el paquete se mueve — sorprendente, pero porque v_f no es la velocidad de nada físico.' }],
        info: [{ kind: 'p', text: 'La relación ω(k) cuadrática (no lineal) es la fuente de la dispersión: distintas k viajan a distintas v_f, el paquete se ensancha.' }],
        whatIf: [{ kind: 'p', text: 'Si ω fuera lineal en k (cuerda ideal), v_f=v_g y no hay dispersión: el paquete no se ensancha.' }],
        math: [{ kind: 'math-block', tex: 'v_f = \\frac{\\omega}{k} = \\frac{\\hbar k}{2m} = \\frac{p}{2m}, \\quad v_g = \\frac{d\\omega}{dk} = \\frac{\\hbar k}{m} = \\frac{p}{m}.' }],
      },
      {
        id: 's2', label: '¿Cuál es la velocidad de la partícula?',
        what: [{ kind: 'p', text: 'Identificamos la velocidad física.' }],
        why: [{ kind: 'p', text: 'La partícula es el paquete (envolvente localizada). Su centro se mueve a v_g. La fase interna gira a v_f pero no transporta probabilidad.' }],
        meaning: [{ kind: 'p', text: 'v_g = p/m es la velocidad clásica recuperada. Es el primer puente cuántico→clásico: la mecánica clásica emerge como el movimiento del centro del paquete.' }],
        info: [{ kind: 'p', text: 'La envolvente satisface una ecuación de continuidad (probabilidad conservada); la fase no. Solo lo que satisface continuidad es "físico" en el sentido de transportable.' }],
        whatIf: [{ kind: 'p', text: 'Si midiéramos la "velocidad de la fase", no obtendríamos nada medible: no hay detector de fase que no lea el paquete.' }],
        math: [{ kind: 'math-block', tex: 'v_{\\text{partícula}} = v_g = \\frac{p}{m}, \\quad v_f \\neq \\text{velocidad medible}.' }],
      },
      {
        id: 's3', label: '¿Violación relativista?',
        what: [{ kind: 'p', text: 'Analizamos si v_f superlumínica es problema.' }],
        why: [{ kind: 'p', text: 'v_f = p/(2m) crece con p. Para p→∞, v_f→∞, superlumínica. Pero v_f NO transporta información: es la velocidad de una "fase", no de materia o señal.' }],
        meaning: [{ kind: 'p', text: 'La relatividad prohíbe transportar información o materia a >c. Las fases no transportan nada. Así que v_f>c es perfectamente legítimo.' }],
        info: [{ kind: 'p', text: 'En la versión relativista (Klein-Gordon), v_g ≤ c siempre (con la dispersión correcta), pero v_f puede seguir siendo >c.' }],
        whatIf: [{ kind: 'p', text: 'Si intentaras "enviar una señal" modulando la fase, estarías creando un paquete — y ese paquete viaja a v_g ≤ c.' }],
        math: [{ kind: 'p', text: 'Conclusión: v_f puede ser superlumínica sin violar relatividad, porque no transporta información. Solo v_g es físicamente relevante.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'v_f = p/(2m) (mitad de la clásica), v_g = p/m (la clásica). La partícula = envolvente del paquete → v_g es la velocidad física. v_f puede ser superlumínica (crece con p) sin violar relatividad, porque la fase no transporta información — solo la envolvente (v_g) lo hace.' }],
    commonErrors: [
      {
        id: 'e1', type: 'quantity-confusion',
        signature: [{ kind: 'p', text: 'Atribuir a v_f la velocidad de la partícula.' }],
        explanation: [{ kind: 'p', text: 'v_f es la velocidad de las crestas de fase internas, no del paquete. La partícula (localizada) es la envolvente, que viaja a v_g. Confundirlas lleva a paradojas inexistentes (como "QM viola relatividad").' }],
      },
    ],
  },

  // ===================== 2.5 — Delta well vs barrier =====================
  {
    id: 'ex-2-5c',
    sectionId: '2.5',
    conceptIds: ['c2-delta', 'c2-bound-vs-scattering'],
    title: 'Comparación: pozo delta vs barrera delta',
    difficulty: 2,
    type: 'method-choice',
    statement: [
      { kind: 'p', text: 'Compara V(x) = -αδ(x) (pozo, α>0) y V(x) = +αδ(x) (barrera, α>0). Para cada uno, determina: (a) ¿admite estados ligados? ¿cuántos? (b) ¿en qué régimen hay dispersión? (c) ¿cuál es la condición de frontera en x=0? Resume en una tabla las diferencias físicas.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué decide si un potencial admite estados ligados: el signo o la forma?' }],
        accept: ['signo', 'atractivo', 'repulsivo', 'negativo'],
        why: [{ kind: 'p', text: 'El signo del potencial determina si es atractivo (pozo, puede ligar) o repulsivo (barrera, no liga). Es la primera bifurcación al clasificar un problema.' }],
        reveal: [{ kind: 'p', text: 'El signo: V<0 (atractivo) puede ligar estados; V>0 (repulsivo) no liga nunca. En 1D, cualquier atractivo liga al menos un estado.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Pozo -αδ: atractivo. ¿Liga? Sí, exactamente un estado (E<0, κ=mα/ℏ², E=-mα²/(2ℏ²)).' }] },
      { blocks: [{ kind: 'p', text: 'Barrera +αδ: repulsiva. ¿Liga? No — no hay pozo que confine. Solo dispersión (E>0).' }] },
      { blocks: [{ kind: 'p', text: 'Condición de frontera en x=0 (ambos): ψ continua, ψ\'(0+)-ψ\'(0-) = (2mα/ℏ²)·ψ(0). Signo del salto: negativo para pozo (-α), positivo para barrera (+α).' }] },
      { blocks: [{ kind: 'p', text: 'Dispersión: ambos dispersan para E>0. T = 1/[1+(mα/ℏ²k)²] en ambos casos — ¡igual! El signo no afecta T/R.' }] },
      { blocks: [{ kind: 'p', text: 'Diferencia física: el pozo liga (1 estado), la barrera no. Pero ambos dispersan igual: el signo no cambia la dispersión.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Pozo delta: estado ligado',
        what: [{ kind: 'p', text: 'Analizamos el pozo -αδ(x).' }],
        why: [{ kind: 'p', text: 'Es atractivo: V<0. En 1D, cualquier atractivo liga al menos un estado. Para el delta, la condición de salto da exactamente uno.' }],
        meaning: [{ kind: 'p', text: 'El pozo delta es el atractivo más concentrado: liga exactamente un estado, con energía E=-mα²/(2ℏ²). No hay excitados: el pozo es demasiado "estrecho".' }],
        info: [{ kind: 'p', text: 'La energía del ligado depende de α²: a mayor fuerza del pozo, más ligado (más negativa la E).' }],
        whatIf: [{ kind: 'p', text: 'Un pozo finito (no delta) liga más estados a medida que V₀ o el ancho crecen. El delta es el caso límite de ancho→0, profundidad→∞ con área α constante.' }],
        math: [{ kind: 'math-block', tex: 'E = -\\frac{m\\alpha^2}{2\\hbar^2}, \\quad \\kappa = \\frac{m\\alpha}{\\hbar^2}, \\quad \\psi(x) = \\sqrt{\\kappa}\\,e^{-\\kappa|x|}.' }],
      },
      {
        id: 's2', label: 'Barrera delta: sin ligados',
        what: [{ kind: 'p', text: 'Analizamos la barrera +αδ(x).' }],
        why: [{ kind: 'p', text: 'Es repulsiva: V>0. No hay confinamiento → no hay estados ligados. Solo dispersión.' }],
        meaning: [{ kind: 'p', text: 'Una barrera no puede ligar: la partícula no queda atrapada. Pero puede dispersar (reflejar/transmitir).' }],
        info: [{ kind: 'p', text: 'La diferencia con el pozo es solo el signo: el mismo α, pero + vs -, cambia radicalmente el régimen de ligados.' }],
        whatIf: [{ kind: 'p', text: 'Si la barrera fuera finita (no delta), tampoco ligaría: el signo es lo que decide, no la forma.' }],
        math: [{ kind: 'p', text: 'Sin estados ligados. Solo dispersión (E>0): T = 1/[1+(mα/ℏ²k)²].' }],
      },
      {
        id: 's3', label: 'Dispersión: ¡ambos iguales!',
        what: [{ kind: 'p', text: 'Comparamos la dispersión.' }],
        why: [{ kind: 'p', text: 'Para dispersión (E>0), T = |C/A|² y la condición de salto da T = 1/[1+(mα/ℏ²k)²] en AMBOS casos. El signo de α solo cambia la fase de B, no |B|².' }],
        meaning: [{ kind: 'p', text: 'Sorpresa: pozo y barrera delta dispersan igual. La diferencia física entre "atractivo" y "repulsivo" solo afecta a los ligados, no al scattering (en este caso).' }],
        info: [{ kind: 'p', text: 'Esto es específico del delta. Para un pozo finito, la dispersión SÍ difiere entre pozo y barrera (porque hay regiones con distinto signo de E−V).' }],
        whatIf: [{ kind: 'p', text: 'Para un pozo finito en dispersión, hay resonancias (T=1) que la barrera no tiene. El delta no las tiene porque es "demasiado puntual".' }],
        math: [{ kind: 'math-block', tex: 'T_{\\text{pozo}} = T_{\\text{barrera}} = \\frac{1}{1 + (m\\alpha/\\hbar^2 k)^2}, \\quad R = 1 - T.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'Pozo -αδ: atractivo, 1 estado ligado (E=-mα²/(2ℏ²)), dispersa con T=1/[1+(mα/ℏ²k)²]. Barrera +αδ: repulsiva, sin ligados, dispersa con la MISMA T. El signo decide ligado sí/no; pero ambos dispersan igual (específico del delta).' }],
    variations: [
      {
        id: 'v1', title: 'Pozo finito vs barrera finita',
        change: [{ kind: 'p', text: 'Reemplaza el delta por un potencial finito (ancho 2a, altura ∓V₀).' }],
        question: [{ kind: 'p', text: '¿Qué cambia respecto al delta?' }],
        whatChangesPhysically: [{ kind: 'p', text: 'Ahora la dispersión SÍ difiere entre pozo y barrera: el pozo finito tiene resonancias (T=1 a 2k\'a=nπ), la barrera no. Aparecen estados ligados adicionales (pozo finito puede tener más de uno, según z₀). El delta era el caso límite puntual.' }],
      },
    ],
  },

  // ===================== 2.6 — Bound states vs z₀ =====================
  {
    id: 'ex-2-6d',
    sectionId: '2.6',
    conceptIds: ['c2-finite-well', 'c2-quantization'],
    title: 'Número de estados ligados en función de z₀',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Para el pozo finito (V=0 en |x|<a, V=V₀ fuera), el parámetro adimensional z₀ = √(2mV₀a²/ℏ²) controla el número de estados ligados. Estima cuántos estados ligados hay para z₀ = 1, z₀ = 5, z₀ = 10, y describe el límite z₀→∞.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué fórmula aproxima el número de estados ligados N?' }],
        accept: ['z0/pi', 'z₀/π', 'floor', 'redondeo'],
        why: [{ kind: 'p', text: 'La fórmula N ≈ ⌊z₀/π⌋+1 es el resultado de la resolución gráfica de las trascendentales. Saberla evita resolver cada caso.' }],
        reveal: [{ kind: 'p', text: 'N ≈ ⌊z₀/π⌋ + 1. Para z₀=1: N=1. z₀=5: N=2. z₀=10: N=4. En el límite z₀→∞: infinitos estados (pozo infinito).' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'N ≈ ⌊z₀/π⌋ + 1 (siempre ≥1 en 1D, pozo atractivo).' }] },
      { blocks: [{ kind: 'p', text: 'z₀=1: ⌊1/π⌋+1 = 0+1 = 1 estado (el fundamental, par).' }] },
      { blocks: [{ kind: 'p', text: 'z₀=5: ⌊5/π⌋+1 = 1+1 = 2 estados (par + impar).' }] },
      { blocks: [{ kind: 'p', text: 'z₀=10: ⌊10/π⌋+1 = 3+1 = 4 estados (par, impar, par, impar).' }] },
      { blocks: [{ kind: 'p', text: 'z₀→∞: infinitos estados. Recupera el pozo infinito (todos los modos).' }] },
    ],
    steps: [
      {
        id: 's1', label: 'La fórmula',
        what: [{ kind: 'p', text: 'Aplicamos N ≈ ⌊z₀/π⌋ + 1.' }],
        why: [{ kind: 'p', text: 'Viene de la resolución gráfica: las trascendentales tan(z) y -cot(z) se cruzan con √(z₀²/z²-1) una vez por cada rama de π de ancho. El +1 es porque siempre hay al menos el fundamental.' }],
        meaning: [{ kind: 'p', text: 'z₀ mide la "fortaleza" del pozo: más profundo (V₀), más ancho (a), o más masivo (m) → mayor z₀ → más estados. Físico: un pozo más grande acomoda más modos.' }],
        info: [{ kind: 'p', text: 'z₀ combina los tres parámetros del pozo en uno solo. Es el parámetro de control.' }],
        whatIf: [{ kind: 'p', text: 'Si doblas V₀ (profundidad), z₀ crece √2, así que N aumenta ~1. Si cuadruplicas V₀, z₀ duplica, N aumenta ~2.' }],
        math: [{ kind: 'math-block', tex: 'N \\approx \\left\\lfloor \\frac{z_0}{\\pi} \\right\\rfloor + 1, \\quad z_0 = \\sqrt{\\frac{2mV_0 a^2}{\\hbar^2}}.' }],
      },
      {
        id: 's2', label: 'Casos numéricos',
        what: [{ kind: 'p', text: 'Calculamos para z₀ = 1, 5, 10.' }],
        why: [{ kind: 'p', text: 'z₀=1: ⌊0.318⌋+1 = 1. z₀=5: ⌊1.59⌋+1 = 2. z₀=10: ⌊3.18⌋+1 = 4. Cada vez que z₀ cruza un múltiplo de π, aparece un nuevo estado.' }],
        meaning: [{ kind: 'p', text: 'Los estados aparecen de uno en uno, alternando par/impar: primero el fundamental (par, siempre presente), luego impar, luego par, etc.' }],
        info: [{ kind: 'p', text: 'El momento exacto de aparición de un nuevo estado es cuando z₀ = (n)π/2 para par o z₀ = nπ para impar (cruces de las asíntotas).' }],
        whatIf: [{ kind: 'p', text: 'Para z₀ justo por debajo de π/2, solo el fundamental. Apenas pasa π/2, aparece el primer excitado (impar): transición cuantitativa.' }],
        math: [{ kind: 'p', text: 'z₀=1→N=1; z₀=5→N=2; z₀=10→N=4. Alternan par/impar conforme crecen.' }],
      },
      {
        id: 's3', label: 'Límite z₀→∞',
        what: [{ kind: 'p', text: 'Analizamos el límite.' }],
        why: [{ kind: 'p', text: 'Cuando z₀→∞ (V₀→∞ con a, m fijos), el pozo se vuelve infinito. N→∞: se recuperan todos los modos del pozo infinito.' }],
        meaning: [{ kind: 'p', text: 'El pozo finito es una familia que interpola entre "sin pozo" (z₀=0, ningún ligado... excepto el teorema 1D que da 1) y "pozo infinito" (infinitos estados).' }],
        info: [{ kind: 'p', text: 'El teorema 1D garantiza al menos un estado ligado para cualquier atractivo, así que realmente N≥1 siempre (la fórmula da 1 incluso para z₀ pequeño).' }],
        whatIf: [{ kind: 'p', text: 'En 3D, el teorema no aplica: un atractivo suficientemente débil puede no ligar nada. La dimensión importa.' }],
        math: [{ kind: 'math-block', tex: 'z_0 \\to \\infty: \\; N \\to \\infty, \\quad E_n \\to \\frac{n^2\\pi^2\\hbar^2}{8ma^2} \\text{ (pozo infinito).}' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'N ≈ ⌊z₀/π⌋+1. z₀=1→N=1, z₀=5→N=2, z₀=10→N=4. Los estados aparecen alternando par/impar conforme z₀ cruza múltiplos de π/2. Límite z₀→∞: infinitos estados, recupera el pozo infinito.' }],
  },
]
