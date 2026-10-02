import type { Exercise } from '@/lib/content-types'

// Ejercicios originales para el Capítulo 2, organizados por sección.
// Las preguntas, pistas y soluciones están escritas para esta plataforma;
// ejercitan los mismos conceptos físicos que el material de Griffiths.

export const EXERCISES: Exercise[] = [
  // ===================== SECTION 2.1 =====================
  {
    id: 'ex-2-1a',
    sectionId: '2.1',
    conceptIds: ['c2-separation', 'c2-tise'],
    title: '¿Qué tipo de ecuación es la TISE?',
    difficulty: 1,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Tras separar variables en la ecuación de Schrödinger dependiente del tiempo (con V = V(x)), se obtiene la ecuación de Schrödinger independiente del tiempo (TISE):' },
      { kind: 'math-block', tex: '-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2} + V(x)\\psi = E\\,\\psi.' },
      { kind: 'p', text: 'Identifica qué tipo de problema matemático es esta ecuación, y explica por qué la constante de separación E recibe el nombre de "energía".' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Es la TISE un problema de valores propios (eigenvalue) de algún operador? Si es así, ¿de cuál?' }],
        accept: ['hamiltoniano', 'hamilton', 'h'],
        why: [{ kind: 'p', text: 'Reconocer el operador es lo primero: si es Ĥψ = Eψ, sabes que ψ son los autoestados de energía y E los autovalores. Esto orienta todo lo que sigue.' }],
        reveal: [{ kind: 'p', text: 'Sí: la TISE es el problema de autovalores del Hamiltoniano Ĥ = -(ℏ²/2m)d²/dx² + V(x). La constante E es el autovalor de energía.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Reescribe la TISE como Ĥψ = Eψ e identifica Ĥ.' }] },
      { blocks: [{ kind: 'p', text: 'Ĥ es el operador energía total (cinética + potencial). Sus autovalores son energías permitidas.' }] },
      { blocks: [{ kind: 'p', text: 'Por eso medir la energía de un estado estacionario da siempre E (dispersión nula): es un estado de energía bien definida.' }] },
      { blocks: [{ kind: 'p', text: 'La justificación del nombre "energía" es física: Ĥ es el operador de energía; sus autovalores son los valores que puede tomar la energía en ese sistema.' }] },
      { blocks: [{ kind: 'p', text: 'Solución completa a continuación.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Identificar la estructura',
        what: [{ kind: 'p', text: 'Reescribimos Ĥψ = Eψ.' }],
        why: [{ kind: 'p', text: 'Porque la forma izquierda tiene Ĥ (un operador lineal) actuando sobre ψ, y la derecha es E·ψ con E constante. Eso es, por definición, un problema de autovalores.' }],
        meaning: [{ kind: 'p', text: 'Ĥ es el operador energía total. Que ψ sea su autoestado significa "estado de energía bien definida".' }],
        info: [{ kind: 'p', text: 'La condición que lo permite es V = V(x): sin ella, Ĥ dependería del tiempo y la separación no funcionaría.' }],
        whatIf: [{ kind: 'p', text: 'Si V dependiera del tiempo, Ĥ ya no tendría autoestados estacionarios y habría que usar métodos de perturbaciones dependientes del tiempo.' }],
        math: [{ kind: 'math-block', tex: '\\hat{H}\\,\\psi(x) = E\\,\\psi(x), \\quad \\hat{H} = -\\frac{\\hbar^2}{2m}\\frac{d^2}{dx^2} + V(x).' }],
      },
      {
        id: 's2', label: 'Por qué E es "energía"',
        what: [{ kind: 'p', text: 'Argumentamos por qué E es la energía.' }],
        why: [{ kind: 'p', text: 'Porque Ĥ es el operador asociado a la energía total (T̂ + V̂): su forma coincide con la función clásica hamiltoniana H = p²/2m + V(x), con p → -iℏ d/dx.' }],
        meaning: [{ kind: 'p', text: 'Medir la energía sobre ψ da siempre E (ΔE=0). El estado estacionario es, por excelencia, un estado de energía definida.' }],
        info: [{ kind: 'p', text: 'El conocimiento de que Ĥ es el operador energía (no solo "el lado izquierdo de la TISE") es lo que da contenido físico a E.' }],
        whatIf: [{ kind: 'p', text: 'Si en lugar de Ĥ tuviéramos el operador momento, sus autovalores serían momentos, no energías.' }],
        math: [{ kind: 'p', text: 'Conclusión: E es la energía porque Ĥ es el operador energía total. El estado estacionario es un autoestado de energía.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'La TISE es un problema de autovalores del Hamiltoniano Ĥ = -(ℏ²/2m)d²/dx² + V(x). E es la energía porque Ĥ es el operador asociado a la energía total; sus autovalores son las energías permitidas.' }],
    commonErrors: [
      {
        id: 'e1', type: 'conceptual',
        signature: [{ kind: 'p', text: 'Decir que E es "una constante de integración arbitraria".' }],
        explanation: [{ kind: 'p', text: 'Aunque matemáticamente E nace como constante de separación, físicamente es la energía: autovalor de Ĥ. Tratarla como constante arbitraria oscurece el contenido físico.' }],
      },
    ],
  },

  {
    id: 'ex-2-1b',
    sectionId: '2.1',
    conceptIds: ['c2-stationary-states-meaning'],
    title: 'Densidad y valores esperados en un estado estacionario',
    difficulty: 1,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Considera un estado estacionario Ψ(x,t) = ψ(x)·e^{-iEt/ℏ}. Demuestra que |Ψ(x,t)|² es independiente del tiempo y que ⟨x⟩ también lo es. Explica por qué este resultado es físicamente razonable.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Cuánto vale |e^{-iEt/ℏ}|²?' }],
        accept: ['1', 'uno'],
        why: [{ kind: 'p', text: 'Este es el cálculo central: si la fase temporal tiene módulo 1, todo lo que se derive de ella (densidades, valores esperados) hereda la cancelación.' }],
        reveal: [{ kind: 'p', text: '|e^{-iEt/ℏ}|² = 1, porque e^{-iθ} tiene módulo 1 para θ real. Por eso |Ψ|² = |ψ|², sin t.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Usa que |z₁z₂|² = |z₁|²|z₂|² y que |e^{iθ}|² = 1 para θ real.' }] },
      { blocks: [{ kind: 'p', text: 'Para ⟨x⟩, recuerda que la fase temporal conjugada e^{+iEt/ℏ} aparece al tomar Ψ* y se cancela con la de Ψ.' }] },
      { blocks: [{ kind: 'p', text: 'La clave física: en un estado estacionario, las fases se cancelan en cualquier producto donde aparezca Ψ*Ψ.' }] },
      { blocks: [{ kind: 'p', text: 'Por eso "estacionario": no porque no evolucione (sí gira en fase), sino porque lo observable no cambia.' }] },
      { blocks: [{ kind: 'p', text: 'Solución a continuación.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Densidad',
        what: [{ kind: 'p', text: 'Calculamos |Ψ|².' }],
        why: [{ kind: 'p', text: 'Porque la fase es un número de módulo 1; su módulo al cuadrado es 1 y desaparece.' }],
        meaning: [{ kind: 'p', text: 'La distribución de probabilidad en el espacio no cambia con el tiempo: el estado "no fluye" en el sentido observable.' }],
        info: [{ kind: 'p', text: 'La forma separada Ψ = ψ·f(t) con f puramente fase es lo que permite la cancelación.' }],
        whatIf: [{ kind: 'p', text: 'Si Ψ fuera superposición de dos estacionarios, fases relativas no se cancelarían y |Ψ|² oscilaría.' }],
        math: [{ kind: 'math-block', tex: '|\\Psi(x,t)|^2 = |\\psi(x)|^2\\,|e^{-iEt/\\hbar}|^2 = |\\psi(x)|^2.' }],
      },
      {
        id: 's2', label: 'Valor esperado de x',
        what: [{ kind: 'p', text: 'Calculamos ⟨x⟩.' }],
        why: [{ kind: 'p', text: 'Porque al conjugarse la fase (e^{+iEt/ℏ} de Ψ*) se cancela con e^{-iEt/ℏ} de Ψ, dejando un integrando sin t.' }],
        meaning: [{ kind: 'p', text: 'La posición media es constante: en un estado estacionario, nada observable evoluciona (si el operador no depende explícitamente de t).' }],
        info: [{ kind: 'p', text: 'El factor de fase y su conjugado aparecen juntos en ⟨Q⟩ = ∫Ψ* Q̂ Ψ; se cancelan siempre.' }],
        whatIf: [{ kind: 'p', text: 'Si Q̂ dependiera explícitamente de t (raro en el cap. 2), o el estado fuera superposición, el resultado cambia.' }],
        math: [{ kind: 'math-block', tex: '\\langle x \\rangle = \\int \\psi^*(x)\\,e^{+iEt/\\hbar}\\,x\\,\\psi(x)\\,e^{-iEt/\\hbar}\\,dx = \\int x\\,|\\psi(x)|^2\\,dx.' }],
      },
      {
        id: 's3', label: 'Interpretación física',
        what: [{ kind: 'p', text: 'Interpretamos por qué es razonable.' }],
        why: [{ kind: 'p', text: 'Porque un estado de energía bien definida no tiene grados de libertad internos que evolucionen: solo una fase global, que no afecta a observables.' }],
        meaning: [{ kind: 'p', text: 'El estado estacionario es un "punto fijo" de la dinámica observable: la física no cambia aunque la función de onda gire.' }],
        info: [{ kind: 'p', text: 'La unicidad de la energía (un solo E) es la causa: no hay interferencia entre modos.' }],
        whatIf: [{ kind: 'p', text: 'Mezcla dos energías: aparecen términos cruzados que oscilan a (E_n-E_m)/ℏ y la estacionariedad se rompe.' }],
        math: [{ kind: 'p', text: 'Conclusión: lo observable es constante porque la fase global no afecta a productos Ψ*·Ψ.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: '|Ψ|² = |ψ|² y ⟨x⟩ = ∫x|ψ|²dx, ambos independientes de t. El motivo es que la fase temporal e^{-iEt/ℏ} (y su conjugada) se cancelan en cualquier producto Ψ*Ψ. Un estado estacionario no evoluciona en lo observable.' }],
  },

  // ===================== SECTION 2.2 =====================
  {
    id: 'ex-2-2a',
    sectionId: '2.2',
    conceptIds: ['c2-infinite-well', 'c2-quantization'],
    title: 'Cuantización en el pozo infinito',
    difficulty: 1,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Resuelve la TISE para una partícula en un pozo cuadrado infinito de ancho a (V = 0 en 0 < x < a, V = ∞ fuera).' },
      { kind: 'p', text: '(a) Escribe la solución general dentro del pozo.' },
      { kind: 'p', text: '(b) Aplica las condiciones de frontera y deduce las energías permitidas.' },
      { kind: 'p', text: '(c) Normaliza y escribe las ψ_n.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: 'Dentro del pozo V=0. ¿Qué forma toma la solución general de ψ\'\' = -(2mE/ℏ²)ψ?' }],
        accept: ['seno', 'coseno', 'sin', 'cos', 'oscilatoria'],
        why: [{ kind: 'p', text: 'Es la pregunta decisiva: el signo de E−V determina la forma. E > V=0 ⟹ oscilatoria.' }],
        reveal: [{ kind: 'p', text: 'Oscilatoria: A sin(kx) + B cos(kx), con k² = 2mE/ℏ². Viene de que el coeficiente es negativo (ψ\'\' = -k²ψ).' }],
      },
      {
        id: 'g2',
        question: [{ kind: 'p', text: '¿Qué condición impone V = ∞ fuera del pozo sobre ψ en las paredes?' }],
        accept: ['cero', '0', 'anula', 'nulo'],
        why: [{ kind: 'p', text: 'V = ∞ fuera significa probabilidad cero fuera; por continuidad, ψ=0 en las paredes. Esto es lo que cuantiza.' }],
        reveal: [{ kind: 'p', text: 'ψ(0) = 0 y ψ(a) = 0. (La continuidad de ψ se exige aunque la derivada no sea continua, porque V es infinito.)' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Dentro: V=0, así que ψ\'\' = -k²ψ con k²=2mE/ℏ². La solución es oscilatoria.' }] },
      { blocks: [{ kind: 'p', text: 'ψ=0 en las paredes por V=∞ fuera. Aplica en x=0 y x=a.' }] },
      { blocks: [{ kind: 'p', text: 'ψ(0)=0 fuerza B=0 (el coseno). ψ(a)=0 fuerza sin(ka)=0, es decir k·a = nπ.' }] },
      { blocks: [{ kind: 'p', text: 'De k·a=nπ sale E_n = n²π²ℏ²/(2ma²). Normaliza con ∫₀ᵃ|ψ|²dx=1.' }] },
      { blocks: [{ kind: 'p', text: 'La constante de normalización es √(2/a), de modo que ∫₀ᵃ (2/a) sin²(nπx/a) dx = 1.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Solución general dentro',
        what: [{ kind: 'p', text: 'Escribimos la solución dentro del pozo.' }],
        why: [{ kind: 'p', text: 'Porque V=0 allí, así que la TISE se reduce a ψ\'\' = -k²ψ con k² = 2mE/ℏ². Coeficiente negativo ⟹ oscilaciones.' }],
        meaning: [{ kind: 'p', text: 'La partícula es libre dentro del pozo: su onda oscila como una cuerda.' }],
        info: [{ kind: 'p', text: 'La condición E > V (=0 aquí) nos dijo "espera oscilatoria". Es la información sobre el signo de E−V.' }],
        whatIf: [{ kind: 'p', text: 'Si el pozo fuera finito, en las regiones fuera habría E<V (exponencial). Aquí, fuera, ψ es directamente cero.' }],
        math: [{ kind: 'math-block', tex: '\\psi(x) = A\\sin(kx) + B\\cos(kx), \\quad k = \\sqrt{2mE}/\\hbar, \\quad 0<x<a.' }],
      },
      {
        id: 's2', label: 'Condiciones de frontera',
        what: [{ kind: 'p', text: 'Imponemos ψ(0)=ψ(a)=0.' }],
        why: [{ kind: 'p', text: 'Porque V=∞ fuera: la probabilidad de encontrar la partícula fuera es cero; por continuidad de ψ, ψ=0 en las paredes. (La derivada sí puede saltar: V es infinito.)' }],
        meaning: [{ kind: 'p', text: 'La onda se "ancla" en los extremos como una cuerda. Solo ciertos modos encajan: la cuantización es su consecuencia.' }],
        info: [{ kind: 'p', text: 'La condición sale de la forma del potencial (V=∞ fuera), no de un postulado aparte.' }],
        whatIf: [{ kind: 'p', text: 'Si las paredes fueran finitas (V₀ finito), ψ no se anularía, solo se acoplaría a un decaimiento exponencial. Aparecería penetración.' }],
        math: [{ kind: 'math-block', tex: '\\psi(0) = B = 0, \\quad \\psi(a) = A\\sin(ka) = 0 \\;\\Rightarrow\\; ka = n\\pi, \\; n=1,2,3,\\dots' }],
      },
      {
        id: 's3', label: 'Energías permitidas',
        what: [{ kind: 'p', text: 'Deducimos las E_n.' }],
        why: [{ kind: 'p', text: 'Porque k·a = nπ fija k, y k = √(2mE)/ℏ, así que E queda determinada por n.' }],
        meaning: [{ kind: 'p', text: 'Solo ciertas energías son compatibles con las condiciones: he ahí la cuantización, emergiendo del anclaje, no de un postulado.' }],
        info: [{ kind: 'p', text: 'La cuantización proviene de la condición de frontera, no de un postulado añadido.' }],
        whatIf: [{ kind: 'p', text: 'Si el pozo fuera más ancho (mayor a), las energías bajarían: más espacio para la onda ⟹ menor energía.' }],
        math: [{ kind: 'math-block', tex: 'E_n = \\frac{\\hbar^2 k_n^2}{2m} = \\frac{n^2 \\pi^2 \\hbar^2}{2 m a^2}, \\quad n=1,2,3,\\dots' }],
      },
      {
        id: 's4', label: 'Normalización',
        what: [{ kind: 'p', text: 'Normalizamos ψ_n.' }],
        why: [{ kind: 'p', text: 'Porque ∫|ψ|²dx debe ser 1 (probabilidad total). Fija la constante A.' }],
        meaning: [{ kind: 'p', text: 'La amplitud se elige para que la partícula esté en alguna parte con probabilidad 1.' }],
        info: [{ kind: 'p', text: 'Se usa ∫₀ᵃ sin²(nπx/a) dx = a/2 (identidad útil).' }],
        whatIf: [{ kind: 'p', text: 'Si ψ no fuera normalizable, no representaría un estado físico (caso de las ondas planas).' }],
        math: [{ kind: 'math-block', tex: '1 = |A|^2 \\int_0^a \\sin^2\\!\\left(\\frac{n\\pi x}{a}\\right)dx = |A|^2\\,\\frac{a}{2} \\;\\Rightarrow\\; A = \\sqrt{\\frac{2}{a}}.' }],
      },
    ],
    finalAnswer: [{ kind: 'math-block', tex: 'E_n = \\frac{n^2\\pi^2\\hbar^2}{2ma^2}, \\quad \\psi_n(x) = \\sqrt{\\frac{2}{a}}\\,\\sin\\!\\left(\\frac{n\\pi x}{a}\\right), \\quad n=1,2,3,\\dots' }],
    variations: [
      {
        id: 'v1', title: 'Pozo simétrico (-a, a)',
        change: [{ kind: 'p', text: 'Mismo pozo pero definido en -a < x < a en lugar de (0, 2a).' }],
        question: [{ kind: 'p', text: '¿Cómo cambia la forma de las ψ_n y la cuantización de E_n?' }],
        whatChangesPhysically: [{ kind: 'p', text: 'Físicamente nada: el espectro es el mismo. Solo cambia la base: ahora par (cosenos) e impar (senos) separados por simetría, con ψ_n(x) = (1/√a)·cos(nπx/2a) o sin(nπx/2a) según paridad. La lección: la elección del origen cambia la base pero no el espectro.' }],
      },
      {
        id: 'v2', title: 'Doble del ancho',
        change: [{ kind: 'p', text: 'Reemplaza a por 2a.' }],
        question: [{ kind: 'p', text: '¿Qué pasa con las energías y con la densidad de estados?' }],
        whatChangesPhysically: [{ kind: 'p', text: 'E_n ∝ 1/a², así que duplicar a divide las energías por 4. Más espacio ⟹ más modos por debajo de una energía dada (mayor densidad de estados). Físicamente: un pozo más ancho confina menos, las energías bajan.' }],
      },
    ],
    commonErrors: [
      {
        id: 'e1', type: 'boundary',
        signature: [{ kind: 'p', text: 'Imponer continuidad de ψ\' en las paredes del pozo infinito.' }],
        explanation: [{ kind: 'p', text: 'El argumento de continuidad de ψ\' se basa en integrar la TISE en torno a la frontera, lo que requiere V finito. Si V=∞, el argumento falla: ψ\' puede saltar. Por eso en el pozo infinito solo se exige ψ=0, no ψ\' continua.' }],
      },
      {
        id: 'e2', type: 'wrong-equation',
        signature: [{ kind: 'p', text: 'Escribir exponenciales reales dentro del pozo infinito.' }],
        explanation: [{ kind: 'p', text: 'Eso sería para E<V. Dentro del pozo V=0 y E>0, así que E>V y la solución es oscilatoria (senos/cosenos). Confundir el signo lleva a escribir la forma equivocada.' }],
      },
    ],
  },

  {
    id: 'ex-2-2b',
    sectionId: '2.2',
    conceptIds: ['c2-superposition'],
    title: 'Superposición en el pozo infinito',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Una partícula en el pozo infinito de ancho a tiene como estado inicial una superposición de los dos primeros modos:' },
      { kind: 'math-block', tex: '\\Psi(x,0) = A\\left[\\psi_1(x) + i\\,\\psi_2(x)\\right].' },
      { kind: 'p', text: '(a) Halla A. (b) Escribe Ψ(x,t). (c) Calcula ⟨x⟩(t) e interpreta físicamente.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué condición fija A?' }],
        accept: ['normalizacion', 'normalización', '1', 'probabilidad total'],
        why: [{ kind: 'p', text: 'La normalización es siempre el primer paso con superposiciones: fija la escala. Y como {ψ_n} es ortonormal, el cálculo se simplifica.' }],
        reveal: [{ kind: 'p', text: 'Normalización: ∫|Ψ(x,0)|²dx = 1. Por ortonormalidad de ψ_1, ψ_2, eso da |A|²(1+1) = 1, así que A = 1/√2.' }],
      },
      {
        id: 'g2',
        question: [{ kind: 'p', text: '¿Cómo se obtiene Ψ(x,t) a partir de Ψ(x,0)?' }],
        accept: ['fase', 'e^{-iet', 'e^{-i e t', 'suma'],
        why: [{ kind: 'p', text: 'El puente entre "resolver la TISE" y "describir la dinámica" es la superposición con fases temporales. Cada modo gira a su frecuencia.' }],
        reveal: [{ kind: 'p', text: 'Cada ψ_n se multiplica por e^{-iE_n t/ℏ}. Así Ψ(x,t) = Σ c_n ψ_n(x) e^{-iE_n t/ℏ}, con c_1=A, c_2=iA.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Usa ortonormalidad: ∫ψ_m*ψ_n dx = δ_{mn}. Eso simplifica la normalización de superposiciones.' }] },
      { blocks: [{ kind: 'p', text: 'A = 1/√2 (cada modo contribuye |A|² = ½ a la probabilidad total).' }] },
      { blocks: [{ kind: 'p', text: 'Para ⟨x⟩ necesitas matrices x_{mn} = ∫ψ_m x ψ_n dx. En el pozo infinito: x_{mn} = (a/2)δ_{mn} más términos fuera de diagonal.' }] },
      { blocks: [{ kind: 'p', text: 'Solo sobreviven términos cruzados ⟨ψ_1|x|ψ_2⟩ y su conjugado, con fase e^{-i(E_2-E_1)t/ℏ}.' }] },
      { blocks: [{ kind: 'p', text: '⟨x⟩ oscila a frecuencia (E_2-E_1)/ℏ = 3π²ℏ/(2ma²), moviéndose entre los lados del pozo.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Normalización',
        what: [{ kind: 'p', text: 'Calculamos A.' }],
        why: [{ kind: 'p', text: 'Por ortonormalidad de {ψ_n}, |Ψ|² = |A|²(|ψ_1|² + |ψ_2|²) sin términos cruzados (ψ_1, ψ_2 son ortogonales).' }],
        meaning: [{ kind: 'p', text: 'Cada modo aporta ½ de la probabilidad; la probabilidad de medir E_1 o E_2 es |c_n|² = ½.' }],
        info: [{ kind: 'p', text: 'La ortonormalidad de la base {ψ_n} es lo que hace el cálculo simple: no aparecen integrales cruzadas en la norma.' }],
        whatIf: [{ kind: 'p', text: 'Si ψ_1 y ψ_2 no fueran ortogonales, habría términos cruzados y A no sería tan simple.' }],
        math: [{ kind: 'math-block', tex: '1 = |A|^2\\bigl(1 + 1\\bigr) \\;\\Rightarrow\\; A = \\frac{1}{\\sqrt{2}}.' }],
      },
      {
        id: 's2', label: 'Evolución temporal',
        what: [{ kind: 'p', text: 'Escribimos Ψ(x,t).' }],
        why: [{ kind: 'p', text: 'Porque la dinámica de una superposición es trivial en la base estacionaria: cada término gira con su frecuencia E_n/ℏ.' }],
        meaning: [{ kind: 'p', text: 'Las fases relativas cambian; de ahí la oscilación de ⟨x⟩.' }],
        info: [{ kind: 'p', text: 'Los c_n son constantes (no cambian con el tiempo). Solo cambian las fases.' }],
        whatIf: [{ kind: 'p', text: 'Si solo un c_n fuera no nulo, no habría fase relativa y ⟨x⟩ sería constante.' }],
        math: [{ kind: 'math-block', tex: '\\Psi(x,t) = \\frac{1}{\\sqrt{2}}\\left[\\psi_1(x)\\,e^{-iE_1 t/\\hbar} + i\\,\\psi_2(x)\\,e^{-iE_2 t/\\hbar}\\right].' }],
      },
      {
        id: 's3', label: 'Valor esperado de x',
        what: [{ kind: 'p', text: 'Calculamos ⟨x⟩(t).' }],
        why: [{ kind: 'p', text: 'Los términos diagonales x_{11}=x_{22}=a/2 (centro del pozo). El término cruzado x_{12}=∫ψ_1 x ψ_2 dx no nulo, y trae la fase e^{-i(E_2-E_1)t/ℏ} junto con el factor i (de c_2= iA).' }],
        meaning: [{ kind: 'p', text: '⟨x⟩ oscila: la partícula "se mueve" de un lado a otro del pozo. Es la firma de un estado no estacionario.' }],
        info: [{ kind: 'p', text: 'El factor i entre c_1 y c_2 produce una oscilación real (si fueran ambos reales, la parte imaginaria se anularía y la oscilación podría cancelarse).' }],
        whatIf: [{ kind: 'p', text: 'Con una fase relativa distinta cambia el "cuándo" de la oscilación; con iguales fases, podría no haber oscilación.' }],
        math: [{ kind: 'math-block', tex: '\\langle x \\rangle(t) = \\frac{a}{2} + \\Re\\!\\left[c_1^* c_2\\, x_{12}\\, e^{-i(E_2-E_1)t/\\hbar}\\right], \\quad x_{12} = -\\frac{16 a}{9\\pi^2}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'A = 1/√2; Ψ(x,t) = (1/√2)[ψ₁e^{-iE₁t/ℏ} + iψ₂e^{-iE₂t/ℏ}]; ⟨x⟩(t) = a/2 + (8a/9π²)·sin((E₂−E₁)t/ℏ). La oscilación refleja la interferencia entre los dos modos a frecuencia (E₂−E₁)/ℏ.' }],
    commonErrors: [
      {
        id: 'e1', type: 'physical-interpretation',
        signature: [{ kind: 'p', text: 'Olvidar las fases temporales y escribir Ψ(x,t) = Ψ(x,0).' }],
        explanation: [{ kind: 'p', text: 'El estado estacionario gira en fase, pero una superposición tiene fases relativas que SÍ importan: sin e^{-iE_n t/ℏ}, no hay evolución de ⟨x⟩ y el resultado es físicamente erróneo.' }],
      },
      {
        id: 'e2', type: 'quantity-confusion',
        signature: [{ kind: 'p', text: 'Confundir ⟨x⟩ con ⟨H⟩.' }],
        explanation: [{ kind: 'p', text: '⟨H⟩ = |c_1|²E_1 + |c_2|²E_2 es constante (energía conservada). ⟨x⟩ oscila. Son cosas distintas: el valor esperado de la energía no evoluciona; el de la posición sí.' }],
      },
    ],
  },

  // ===================== SECTION 2.3 =====================
  {
    id: 'ex-2-3a',
    sectionId: '2.3',
    conceptIds: ['c2-harmonic-oscillator'],
    title: 'Espectro del oscilador por método algebraico',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Usando el método algebraico, deduce las energías del oscilador armónico V = ½mω²x² a partir de la relación de conmutación [a, a†] = 1 y del hecho de que Ĥ = ℏω(a†a + ½).' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué representa el operador a†a (el número de cuantos)?' }],
        accept: ['numero', 'número', 'cuantos', 'cuántos'],
        why: [{ kind: 'p', text: 'Reconocer a†a como el operador número es la clave: sus autovalores son enteros n=0,1,2,... y de ahí sale el espectro uniformemente espaciado.' }],
        reveal: [{ kind: 'p', text: 'a†a es el operador número N; sus autovalores son n=0,1,2,... Como Ĥ = ℏω(N+½), E_n = ℏω(n+½).' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Define N = a†a. Demuestra que [N, a†] = a† y [N, a] = -a usando [a, a†]=1.' }] },
      { blocks: [{ kind: 'p', text: 'Si N|n⟩ = n|n⟩, entonces N(a†|n⟩) = (n+1)(a†|n⟩): a† sube n.' }] },
      { blocks: [{ kind: 'p', text: 'Análogamente, a baja n. Como N debe tener autovalores no negativos (⟨ψ|N|ψ⟩ = ‖a|ψ⟩‖² ≥ 0), la cadena debe parar: hay un |0⟩ con a|0⟩ = 0.' }] },
      { blocks: [{ kind: 'p', text: 'Desde |0⟩ (n=0) se construyen todos: |n⟩ = (a†)ⁿ/√(n!) |0⟩.' }] },
      { blocks: [{ kind: 'p', text: 'Ĥ = ℏω(N+½) da E_n = ℏω(n+½), con n=0,1,2,...' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Operador número',
        what: [{ kind: 'p', text: 'Definimos N = a†a y mostramos que sube/baja.' }],
        why: [{ kind: 'p', text: 'Porque [a, a†]=1 implica [N, a†]=a† y [N, a]=-a, así que a† y a son operadores de ascenso y descenso de N.' }],
        meaning: [{ kind: 'p', text: 'N cuenta cuántos de energía: a† crea uno, a destruye uno. La estructura del oscilador se resume en este álgebra.' }],
        info: [{ kind: 'p', text: 'La relación de conmutación [a, a†]=1 viene de [x,p]=iℏ y de la definición de a, a†.' }],
        whatIf: [{ kind: 'p', text: 'Si la relación de conmutación fuera distinta (otros potenciales), el espectro sería distinto. Por eso el oscilador es "especial".' }],
        math: [{ kind: 'math-block', tex: '[N, a^\\dagger] = a^\\dagger, \\quad [N, a] = -a \\;\\Rightarrow\\; N(a^\\dagger|n\\rangle) = (n+1)(a^\\dagger|n\\rangle).' }],
      },
      {
        id: 's2', label: 'Cota inferior de N',
        what: [{ kind: 'p', text: 'Mostramos que N tiene mínimo y existe |0⟩.' }],
        why: [{ kind: 'p', text: 'Porque ⟨ψ|N|ψ⟩ = ‖a|ψ⟩‖² ≥ 0, los autovalores de N son no negativos. La cadena de descenso (a baja n) debe parar: a|0⟩ = 0.' }],
        meaning: [{ kind: 'p', text: 'No se puede "destruir" por debajo del estado fundamental: ahí vive la energía del punto cero.' }],
        info: [{ kind: 'p', text: 'La positividad de ⟨N⟩ es el argumento topológico que fija el mínimo. Es análogo a la cuantización por frontera, pero algebraico.' }],
        whatIf: [{ kind: 'p', text: 'Si N pudiera ser negativo, no habría punto cero y la energía podría ir a -∞, lo que es físicamente inaceptable para un oscilador estable.' }],
        math: [{ kind: 'math-block', tex: 'a|0\\rangle = 0 \\;\\Rightarrow\\; N|0\\rangle = 0, \\quad |n\\rangle = \\frac{(a^\\dagger)^n}{\\sqrt{n!}}|0\\rangle.' }],
      },
      {
        id: 's3', label: 'Espectro',
        what: [{ kind: 'p', text: 'Deducimos E_n.' }],
        why: [{ kind: 'p', text: 'Porque Ĥ = ℏω(N+½), y N|n⟩ = n|n⟩.' }],
        meaning: [{ kind: 'p', text: 'Espectro uniformemente espaciado: cada nivel a ℏω del anterior. La energía mínima ½ℏω es el punto cero.' }],
        info: [{ kind: 'p', text: 'El ½ proviene del ordenamiento de a y a† al escribir Ĥ: es la "corrección de orden cero" inevitable al cuantizar.' }],
        whatIf: [{ kind: 'p', text: 'Si ω fuera cero, no hay confinamiento (potencial plano), no hay niveles discretos. El espectro uniformemente espaciado es la firma del oscilador.' }],
        math: [{ kind: 'math-block', tex: '\\hat{H} = \\hbar\\omega(N + \\tfrac12) \\;\\Rightarrow\\; E_n = \\hbar\\omega\\left(n + \\tfrac12\\right), \\quad n=0,1,2,\\dots' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'E_n = ℏω(n + ½), n = 0,1,2,... El método algebraico usa N = a†a (cuenta cuantos) cuya cadena termina en |0⟩ por positividad. Cada cuanto aporta ℏω; el ½ es el punto cero.' }],
    variations: [
      {
        id: 'v1', title: 'Subir dos veces',
        change: [{ kind: 'p', text: 'Calcula ⟨x⟩ en el estado |2⟩ y compáralo con |0⟩.' }],
        question: [{ kind: 'p', text: '¿Cuál es ⟨x²⟩ y ⟨p²⟩ en |2⟩?' }],
        whatChangesPhysically: [{ kind: 'p', text: 'En un estado estacionario ⟨x⟩=⟨p⟩=0 por paridad. Pero ⟨x²⟩, ⟨p²⟩ crecen con n (más energía ⟹ más dispersión espacial y de momento). El método algebraico los da sin integrales.' }],
      },
    ],
  },

  // ===================== SECTION 2.4 =====================
  {
    id: 'ex-2-4a',
    sectionId: '2.4',
    conceptIds: ['c2-free-particle'],
    title: 'Velocidad de grupo de un paquete gaussiano',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Un paquete de onda gaussiano para una partícula libre tiene amplitud φ(k) = (1/(2πσ²)^{1/4})·e^{-(k-k₀)²/(4σ²)} centrada en k₀. Calcula la velocidad de grupo y explica por qué coincide con la velocidad clásica p/m.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué relación hay entre ω y k para una partícula libre?' }],
        accept: ['omega = hbar k^2 / 2m', 'omega=hbar k^2/2m', 'k^2', 'dispersion'],
        why: [{ kind: 'p', text: 'La relación de dispersión ω(k) es la pieza central: de ella sale la velocidad de grupo y el ensanchamiento.' }],
        reveal: [{ kind: 'p', text: 'E = ℏω = ℏ²k²/(2m), así que ω(k) = ℏk²/(2m).' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Relación de dispersión: ω = ℏk²/(2m).' }] },
      { blocks: [{ kind: 'p', text: 'Velocidad de grupo: v_g = dω/dk evaluada en k₀.' }] },
      { blocks: [{ kind: 'p', text: 'dω/dk = ℏk/m, así que v_g = ℏk₀/m = p₀/m.' }] },
      { blocks: [{ kind: 'p', text: 'Coincide con la velocidad clásica: la partícula del paquete se mueve, en promedio, como dicta p/m.' }] },
      { blocks: [{ kind: 'p', text: 'La velocidad de fase ω/k₀ = ℏk₀/(2m) = p₀/(2m) no es la de la partícula: solo describe cómo gira la fase interna.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Relación de dispersión',
        what: [{ kind: 'p', text: 'Obtenemos ω(k).' }],
        why: [{ kind: 'p', text: 'Porque para V=0, E = ℏ²k²/(2m) = ℏω, así que ω = ℏk²/(2m).' }],
        meaning: [{ kind: 'p', text: 'Cada componente de onda plana gira a frecuencia ω(k). Las distintas k giran a distintas velocidades: por eso el paquete se ensancha.' }],
        info: [{ kind: 'p', text: 'La relación E=p²/2m es la energía cinética clásica, con p=ℏk.' }],
        whatIf: [{ kind: 'p', text: 'En un medio dispersivo distinto (p.ej. ondas en una cuerda con tensión no uniforme), la relación ω(k) cambia y v_g puede diferir de p/m.' }],
        math: [{ kind: 'math-block', tex: '\\omega(k) = \\frac{\\hbar k^2}{2m}.' }],
      },
      {
        id: 's2', label: 'Velocidad de grupo',
        what: [{ kind: 'p', text: 'Calculamos v_g = dω/dk en k₀.' }],
        why: [{ kind: 'p', text: 'Porque el centro del paquete se mueve a la velocidad de grupo: el punto estacionario de la fase kx-ω(k)t respecto a k es k₀ tal que x = (dω/dk)_{k₀}·t.' }],
        meaning: [{ kind: 'p', text: 'El paquete transporta probabilidad/energía a v_g, no a v_fase. Físicamente, la partícula se desplaza a v_g.' }],
        info: [{ kind: 'p', text: 'Que v_g coincida con p/m es el primer indicio de que la mecánica clásica se recupera como límite.' }],
        whatIf: [{ kind: 'p', text: 'En un medio con dispersión anómala, v_g puede superar c o ser negativa: no representa transporte de energía en el sentido habitual.' }],
        math: [{ kind: 'math-block', tex: 'v_g = \\frac{d\\omega}{dk}\\bigg|_{k_0} = \\frac{\\hbar k_0}{m} = \\frac{p_0}{m}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'v_g = ℏk₀/m = p₀/m, la velocidad clásica. La velocidad de fase ω/k₀ = p₀/(2m) NO es la velocidad de la partícula; solo describe el giro de la fase.' }],
    commonErrors: [
      {
        id: 'e1', type: 'quantity-confusion',
        signature: [{ kind: 'p', text: 'Confundir velocidad de fase ω/k con velocidad de grupo dω/dk.' }],
        explanation: [{ kind: 'p', text: 'La velocidad de fase describe cómo se propaga una cresta de fase, sin transportar energía ni masa. La velocidad de grupo mueve el centro del paquete y es la que coincide con la velocidad clásica. Mezclarlas es un error típico.' }],
      },
    ],
  },

  // ===================== SECTION 2.5 =====================
  {
    id: 'ex-2-5a',
    sectionId: '2.5',
    conceptIds: ['c2-delta', 'c2-continuity'],
    title: 'Estado ligado del pozo delta',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Considera V(x) = -αδ(x) con α > 0. Encuentra el estado ligado y su energía.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: 'Estado ligado ⟹ E ¿positivo o negativo?' }],
        accept: ['negativo', 'e<0'],
        why: [{ kind: 'p', text: 'El signo de E decide el régimen: ligado ⟹ E<0 (decae exponencial fuera), dispersión ⟹ E>0 (oscilatorio).' }],
        reveal: [{ kind: 'p', text: 'E<0. Como V→0 lejos del origen, ψ debe decaer exponencial a ambos lados: ψ = √κ·e^{-κ|x|} con κ = √(-2mE)/ℏ.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Para x≠0, V=0. Con E<0, ψ es exponencial: ψ = C·e^{κx} (x<0) y D·e^{-κx} (x>0).' }] },
      { blocks: [{ kind: 'p', text: 'Por simetría (potencial par) y normalizabilidad, ψ = √κ·e^{-κ|x|}.' }] },
      { blocks: [{ kind: 'p', text: 'La condición clave: ψ continua en 0, derivada con salto (2mα/ℏ²)·ψ(0) (signo negativo por ser pozo -αδ).' }] },
      { blocks: [{ kind: 'p', text: 'Derivadas: ψ\'(0⁺) = -κ·ψ(0), ψ\'(0⁻) = +κ·ψ(0). Salto = -2κ·ψ(0).' }] },
      { blocks: [{ kind: 'p', text: 'Igualar con -(2mα/ℏ²)ψ(0) da κ = mα/ℏ², así que E = -ℏ²κ²/(2m) = -mα²/(2ℏ²).' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Forma de ψ',
        what: [{ kind: 'p', text: 'Escribimos ψ en cada región.' }],
        why: [{ kind: 'p', text: 'Porque para x≠0, V=0 y E<0, así que el signo de E−V es negativo: exponencial. Además el potencial es par, así que ψ es par (estado ligado fundamental).' }],
        meaning: [{ kind: 'p', text: 'La onda decae a ambos lados: la probabilidad de encontrar la partícula lejos del origen cae exponencial. Es la firma del ligado.' }],
        info: [{ kind: 'p', text: 'La información que E<0 (régimen ligado) y V=0 lejos son lo que fija la forma exponencial.' }],
        whatIf: [{ kind: 'p', text: 'Si E>0 (dispersión), la onda sería oscilatoria lejos del origen y no estaría ligada.' }],
        math: [{ kind: 'math-block', tex: '\\psi(x) = \\sqrt{\\kappa}\\,e^{-\\kappa|x|}, \\quad \\kappa = \\sqrt{-2mE}/\\hbar.' }],
      },
      {
        id: 's2', label: 'Condiciones en x=0',
        what: [{ kind: 'p', text: 'Aplicamos continuidad de ψ y salto de derivada.' }],
        why: [{ kind: 'p', text: 'Porque el delta es singular: integrar la TISE en torno a 0 da un contributo finito que rompe la continuidad de ψ\'. ψ sigue siendo continua.' }],
        meaning: [{ kind: 'p', text: 'El "empujón" puntual del delta cambia bruscamente el momento local de la onda; de ahí el salto.' }],
        info: [{ kind: 'p', text: 'La singularidad del potencial determina qué condición aplicar: V finito ⟹ ψ\' cont.; V delta ⟹ salto.' }],
        whatIf: [{ kind: 'p', text: 'Si el potencial fuera finito (p.ej. pozo cuadrado), ψ\' sería continua y no habría salto.' }],
        math: [{ kind: 'math-block', tex: '\\psi(0^+) = \\psi(0^-), \\quad \\psi^{\\prime}(0^+) - \\psi^{\\prime}(0^-) = -\\frac{2m\\alpha}{\\hbar^2}\\psi(0).' }],
      },
      {
        id: 's3', label: 'Calcular κ y E',
        what: [{ kind: 'p', text: 'Resolvemos la condición de empate.' }],
        why: [{ kind: 'p', text: 'Calculando ψ\' a ambos lados y restando: -κ·ψ(0) - (+κ·ψ(0)) = -2κ·ψ(0). Igualando con -(2mα/ℏ²)ψ(0) se obtiene κ.' }],
        meaning: [{ kind: 'p', text: 'κ es proporcional a α: a mayor fuerza del pozo, mayor localización (más rápido decae). Energía más negativa, más ligada.' }],
        info: [{ kind: 'p', text: 'La única incógnita era κ; el salto de derivada la determina por completo.' }],
        whatIf: [{ kind: 'p', text: 'Si α fuera 0 (sin pozo), κ=0 y no hay estado ligado (como debe ser: sin potencial, sin ligadura).' }],
        math: [{ kind: 'math-block', tex: '-2\\kappa\\,\\psi(0) = -\\frac{2m\\alpha}{\\hbar^2}\\psi(0) \\;\\Rightarrow\\; \\kappa = \\frac{m\\alpha}{\\hbar^2}, \\quad E = -\\frac{\\hbar^2\\kappa^2}{2m} = -\\frac{m\\alpha^2}{2\\hbar^2}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'ψ(x) = √κ·e^{-κ|x|} con κ = mα/ℏ²; energía E = -mα²/(2ℏ²). Es el único estado ligado: la positividad del pozo atractivo siempre liga al menos un estado en 1D, y el delta liga exactamente uno.' }],
    variations: [
      {
        id: 'v1', title: 'Barrera delta',
        change: [{ kind: 'p', text: 'Cambia el signo: V = +αδ(x) (barrera). ¿Existen estados ligados?' }],
        question: [{ kind: 'p', text: '¿Qué cambia?' }],
        whatChangesPhysically: [{ kind: 'p', text: 'Una barrera repulsiva no liga estados (no hay pozo atractivo). En dispersión (E>0), sin embargo, refleja parcialmente: T = 1/[1 + (mα/ℏ²k)²]. El cambio de signo cambia el régimen: ligado (pozo) ⟶ solo scattering (barrera).' }],
      },
    ],
  },

  // ===================== SECTION 2.6 =====================
  {
    id: 'ex-2-6a',
    sectionId: '2.6',
    conceptIds: ['c2-finite-well', 'c2-continuity'],
    title: 'Condiciones trascendentales del pozo finito',
    difficulty: 3,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Para el pozo finito V=0 en |x|<a, V=V₀ fuera, con estado ligado (0<E<V₀), deriva las condiciones trascendentales para las soluciones pares e impares.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué forma tiene ψ dentro (|x|<a) y fuera (|x|>a)?' }],
        accept: ['seno coseno', 'oscilatoria', 'exponencial'],
        why: [{ kind: 'p', text: 'Es la distinción clave: dentro E>V₀_permitido=0 ⟹ oscilatoria; fuera E<V₀ ⟹ exponencial.' }],
        reveal: [{ kind: 'p', text: 'Dentro: A cos(lx) (par) o B sin(lx) (impar), l=√(2mE)/ℏ. Fuera: C e^{-κ|x|}, κ=√(2m(V₀-E))/ℏ.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Dentro: V=0, E>0 ⟹ oscilatoria. Por paridad, par (coseno) o impar (seno).' }] },
      { blocks: [{ kind: 'p', text: 'Fuera: V=V₀, E<V₀ ⟹ exponencial decreciente (decae para ser normalizable).' }] },
      { blocks: [{ kind: 'p', text: 'Empareja ψ y ψ\' en x=a. Elimina constantes para obtener una condición solo sobre l y κ.' }] },
      { blocks: [{ kind: 'p', text: 'Par: κ = l·tan(la). Impar: κ = -l·cot(la).' }] },
      { blocks: [{ kind: 'p', text: 'Con la restricción l²+κ² = 2mV₀/ℏ², los cruces dan las energías permitidas.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Forma por regiones',
        what: [{ kind: 'p', text: 'Escribimos ψ en cada región con paridad definida.' }],
        why: [{ kind: 'p', text: 'Dentro E>V(=0) ⟹ oscilatoria; fuera E<V₀ ⟹ exponencial. La paridad del potencial permite clasificar en par/impar.' }],
        meaning: [{ kind: 'p', text: 'La onda es oscilatoria donde la partícula es "clásicamente libre", y se cuela decayendo donde clásicamente no puede estar.' }],
        info: [{ kind: 'p', text: 'El signo de E−V por región + la paridad del potencial son las dos informaciones que estructuran la solución.' }],
        whatIf: [{ kind: 'p', text: 'Si E>V₀ (régimen de scattering), también fuera sería oscilatoria: aparecen R y T en lugar de decaimiento.' }],
        math: [{ kind: 'math-block', tex: '\\psi(x) = \\begin{cases} A\\cos(lx) & |x|<a\\,\\text{(par)} \\\\ B\\sin(lx) & |x|<a\\,\\text{(impar)} \\\\ C\\,e^{-\\kappa|x|} & |x|>a \\end{cases}' }],
      },
      {
        id: 's2', label: 'Emparejar en x=a',
        what: [{ kind: 'p', text: 'Aplicamos continuidad de ψ y ψ\'.' }],
        why: [{ kind: 'p', text: 'V es finito (V₀), así que ψ y ψ\' son continuas en x=±a. Esto da dos ecuaciones que emparentan constantes.' }],
        meaning: [{ kind: 'p', text: 'El empate en la frontera es lo que sobredetermina el sistema y selecciona energías discretas.' }],
        info: [{ kind: 'p', text: 'Las condiciones de continuidad existen porque V es finito, no singular.' }],
        whatIf: [{ kind: 'p', text: 'Si V fuera infinito en la pared, ψ se anularía y no habría exponencial fuera (pozo infinito).' }],
        math: [{ kind: 'math-block', tex: '\\text{Par: } A\\cos(la) = C e^{-\\kappa a}, \\quad -A l\\sin(la) = -\\kappa C e^{-\\kappa a}.' }],
      },
      {
        id: 's3', label: 'Condición trascendental',
        what: [{ kind: 'p', text: 'Eliminamos constantes.' }],
        why: [{ kind: 'p', text: 'Dividiendo la segunda ecuación por la primera cancela A y C, dejando una relación solo entre l y κ.' }],
        meaning: [{ kind: 'p', text: 'Las energías permitidas son los valores de E (vía l y κ) que satisfacen esa trascendental. Geométricamente, son cruces de curvas.' }],
        info: [{ kind: 'p', text: 'La restricción l²+κ² = 2mV₀/ℏ² reduce las dos incógnitas a una; la trascendental la selecciona.' }],
        whatIf: [{ kind: 'p', text: 'A mayor V₀ o ancho, más cruces hay (más estados ligados). En el límite V₀→∞ se recuperan los infinitos del pozo infinito.' }],
        math: [{ kind: 'math-block', tex: '\\text{Par: } \\kappa = l\\tan(la). \\qquad \\text{Impar: } \\kappa = -l\\cot(la). \\qquad l^2+\\kappa^2 = 2mV_0/\\hbar^2.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'Soluciones pares: κ = l·tan(la). Soluciones impares: κ = -l·cot(la). Con l²+κ² = 2mV₀/ℏ², las energías son los cruces. Hay un número finito de ligados que crece con V₀a².' }],
    commonErrors: [
      {
        id: 'e1', type: 'boundary',
        signature: [{ kind: 'p', text: 'Exigir ψ=0 en x=±a para el pozo finito.' }],
        explanation: [{ kind: 'p', text: 'Eso es para el pozo infinito (V=∞). En el pozo finito, V es finito, así que ψ y ψ\' son continuas; ψ no se anula en la frontera. Mezclar las condiciones de los dos pozos es un error común.' }],
      },
    ],
  },

  // ===================== SECTION 2.7 =====================
  {
    id: 'ex-2-7a',
    sectionId: '2.7',
    conceptIds: ['c2-s-matrix', 'c2-probability-current'],
    title: 'Propiedades de la S-matrix',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Demuestra que la unitariedad S†S = I implica R + T = 1 para dispersión simétrica (V(-x)=V(x)). Explica el contenido físico.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué representa cada elemento de S?' }],
        accept: ['transmision', 'transmisión', 'reflexion', 'reflexión', 'amplitud'],
        why: [{ kind: 'p', text: 'Identificar qué es cada S_{ij} conecta la matriz con los coeficientes R y T que conoces.' }],
        reveal: [{ kind: 'p', text: 'S₁₁ = amplitud de reflexión (de izquierda), S₂₁ = amplitud de transmisión. Sus módulos al cuadrado son R y T.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Escribe S†S = I entrada a entrada: la diagonal da |S₁₁|²+|S₂₁|² = 1.' }] },
      { blocks: [{ kind: 'p', text: 'Identifica |S₁₁|² = R y |S₂₁|² = T (con factor k constante si V es igual a ambos lados).' }] },
      { blocks: [{ kind: 'p', text: 'Por tanto R + T = 1. Es la conservación de probabilidad: lo que no se refleja, se transmite.' }] },
      { blocks: [{ kind: 'p', text: 'Si V es par, además S₁₂=S₂₁ y S₁₁=S₂₂: dispersión simétrica desde ambos lados.' }] },
      { blocks: [{ kind: 'p', text: 'La unitariedad es la traducción matricial de la conservación de probabilidad.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'S†S = I, entrada a entrada',
        what: [{ kind: 'p', text: 'Desarrollamos la condición de unitariedad.' }],
        why: [{ kind: 'p', text: 'Porque la unitariedad es la traducción matricial de "lo que entra es lo que sale", que es la conservación de probabilidad.' }],
        meaning: [{ kind: 'p', text: 'Cada columna de S tiene norma 1: la "cantidad" saliente total iguala la entrante.' }],
        info: [{ kind: 'p', text: 'La conservación de probabilidad (ec. de continuidad ∂ρ/∂t + ∂J/∂x = 0) exige que S sea unitaria.' }],
        whatIf: [{ kind: 'p', text: 'Si el potencial absorbiera probabilidad (potencial complejo, no hermítico), S no sería unitaria: R+T < 1.' }],
        math: [{ kind: 'math-block', tex: '(S^\\dagger S)_{11} = |S_{11}|^2 + |S_{21}|^2 = 1.' }],
      },
      {
        id: 's2', label: 'Identificar con R y T',
        what: [{ kind: 'p', text: 'Reconocemos R y T.' }],
        why: [{ kind: 'p', text: 'Porque S₁₁ es la amplitud reflejada y S₂₁ la transmitida cuando la incidencia es desde la izquierda.' }],
        meaning: [{ kind: 'p', text: 'R + T = 1: la fracción reflejada más la transmitida es la unidad. Es la conservación de probabilidad en dispersión.' }],
        info: [{ kind: 'p', text: 'Si k varía entre regiones (V distinto), T lleva factor k_trans/k_inc; aquí suponemos V igual a ambos lados para simplicidad.' }],
        whatIf: [{ kind: 'p', text: 'Si V fuera par, además S₁₂=S₂₁ (dispersión simétrica): el mismo T desde cualquier lado.' }],
        math: [{ kind: 'math-block', tex: 'R = |S_{11}|^2, \\quad T = |S_{21}|^2, \\quad R + T = 1.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'La unitariedad S†S=I da, en su entrada (1,1), |S₁₁|²+|S₂₁|²=1. Identificando R=|S₁₁|² y T=|S₂₁|² se obtiene R+T=1: la conservación de probabilidad en scattering.' }],
  },

  // Cross-section / identify problems
  {
    id: 'ex-2-id1',
    sectionId: '2.6',
    conceptIds: ['c2-bound-vs-scattering', 'c2-oscillatory-vs-exponential'],
    title: 'Identifica el régimen',
    difficulty: 1,
    type: 'identify-potential',
    statement: [
      { kind: 'p', text: 'Te dan un potencial V(x) con un pozo de profundidad V₀ y un estado de energía E. En las regiones fuera del pozo, ψ tiene forma C·e^{-κ|x|}. ¿Es el estado ligado o de scattering? ¿Es E mayor o menor que V₀?' },
    ],
    guided: [],
    hints: [
      { blocks: [{ kind: 'p', text: 'La forma exponencial decaciente indica E<V en esa región.' }] },
      { blocks: [{ kind: 'p', text: 'Que decaiga asintóticamente significa ψ→0 lejos: estado ligado.' }] },
      { blocks: [{ kind: 'p', text: 'Si fuera scattering (E>V₀ fuera), ψ sería oscilatoria lejos del pozo.' }] },
      { blocks: [{ kind: 'p', text: 'Estado ligado, E<V₀.' }] },
      { blocks: [{ kind: 'p', text: 'Solución abajo.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Reconocer la forma',
        what: [{ kind: 'p', text: 'Interpretamos la forma C·e^{-κ|x|}.' }],
        why: [{ kind: 'p', text: 'Exponencial real con κ>0 significa E<V en esa región (signo negativo de E−V).' }],
        meaning: [{ kind: 'p', text: 'La onda no oscila lejos del pozo, solo decae: no hay partícula "viniendo" del infinito.' }],
        info: [{ kind: 'p', text: 'La información clave es la forma asintótica (decae), que distingue ligado de scattering.' }],
        whatIf: [{ kind: 'p', text: 'Si ψ lejos fuera A·e^{ikx}+B·e^{-ikx}, sería scattering con onda incidente.' }],
        math: [{ kind: 'p', text: 'Estado ligado, E < V₀.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'Estado ligado: ψ decae exponencialmente lejos del pozo, así que E < V₀ (energía por debajo del techo del pozo).' }],
  },

  {
    id: 'ex-2-tunnel',
    sectionId: '2.6',
    conceptIds: ['c2-tunneling'],
    title: 'Sensibilidad del tunneling a la masa',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Una barrera rectangular de altura V₀ y ancho 2a recibe una partícula de masa m y energía E<V₀. Estima cómo cambia el coeficiente de transmisión si la masa pasa de m_e (electrón) a 4m_e (átomo de hidrógeno aproximado). ¿Qué conclusión física obtienes?' },
    ],
    guided: [],
    hints: [
      { blocks: [{ kind: 'p', text: 'T ∝ e^{-4κa} con κ = √(2m(V₀-E))/ℏ.' }] },
      { blocks: [{ kind: 'p', text: 'Cuadruplicar m duplica κ (κ ∝ √m).' }] },
      { blocks: [{ kind: 'p', text: 'El exponente -4κa también se duplica, así que T se eleva al cuadrado de su valor anterior (en escala log): cae exponencialmente.' }] },
      { blocks: [{ kind: 'p', text: 'Cuatro veces más masa ⟹ κ→2κ ⟹ T → T² si T era pequeño. ¡Cae muchísimo!' }] },
      { blocks: [{ kind: 'p', text: 'Por eso el tunneling es relevante para electrones y despreciable para protones o átomos enteros.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Dependencia con m',
        what: [{ kind: 'p', text: 'Identificamos κ ∝ √m.' }],
        why: [{ kind: 'p', text: 'κ = √(2m(V₀-E))/ℏ; todo lo demás constante, κ crece con √m.' }],
        meaning: [{ kind: 'p', text: 'Mayor masa ⟹ mayor κ ⟹ decaimiento más rápido en la barrera ⟹ mucho menos tunneling.' }],
        info: [{ kind: 'p', text: 'La dependencia exponencial es lo que hace el tunneling tan sensible a m, V₀ y ancho.' }],
        whatIf: [{ kind: 'p', text: 'Si en lugar de cuadruplicar m redujéramos V₀−E o el ancho, el mismo exponente reduciría T.' }],
        math: [{ kind: 'math-block', tex: 'T \\propto e^{-4\\kappa a}, \\quad \\kappa \\propto \\sqrt{m} \\;\\Rightarrow\\; \\text{multiplicar } m \\text{ por 4 multiplica } \\kappa \\text{ por 2}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'Cuadruplicar m duplica κ; el exponente -4κa se duplica, así que T se reduce enormemente (si T era pequeño, se reduce a T²). El tunneling es sensible a la masa por la dependencia exponencial: por eso importa para electrones y es despreciable para objetos más masivos.' }],
  },
]

export function getExercisesForSection(sectionId: string) {
  return EXERCISES.filter(e => e.sectionId === sectionId)
}
export function getExercise(id: string) {
  return EXERCISES.find(e => e.id === id)
}
export function getExercisesForConcept(conceptId: string) {
  return EXERCISES.filter(e => e.conceptIds.includes(conceptId))
}
