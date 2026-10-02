import type { Concept } from '@/lib/content-types'
import { CONCEPTS } from './concepts'

// Conceptos para las secciones 2.2 a 2.7 — contenido original escrito para esta plataforma.

export const CONCEPTS_2_7: Concept[] = [
  // ============ SECTION 2.2 — INFINITE SQUARE WELL ============
  {
    id: 'c2-infinite-well',
    chapterId: 'ch2',
    sectionId: '2.2',
    title: 'El pozo cuadrado infinito',
    subtitle: 'El problema modelo más simple: confinamiento duro y cuantización limpia',
    order: 7,
    tags: ['pozo infinito', 'modelo', 'senos'],
    layer1Intuition: [
      { kind: 'p', text: 'Es el laboratorio del confinamiento: V = 0 dentro de 0 < x < a, e infinito fuera. Físicamente, la partícula no puede estar fuera, así que ψ se anula en las paredes. Dentro, la partícula es libre y la onda oscila como una cuerda fijada en los extremos.' },
      { kind: 'callout', tone: 'key', title: 'Por qué este modelo importa', blocks: [
        { kind: 'p', text: 'Es el problema más simple donde la cuantización emerge de forma transparente. Todo lo que aprendas aquí (cómo aparecen las energías, cómo se construye la solución general, cómo se calculan valores esperados) se transfiere a los demás potenciales.' },
      ]},
    ],
    layer2Math: [
      { kind: 'p', text: 'Dentro del pozo V = 0, así que la TISE es ψ\'\' = -k²ψ con k² = 2mE/ℏ². La solución general es:' },
      { kind: 'math-block', tex: '\\psi(x) = A\\sin(kx) + B\\cos(kx), \\quad 0 < x < a.' },
      { kind: 'p', text: 'Las condiciones ψ(0) = 0 y ψ(a) = 0 vienen de que V = ∞ fuera. La primera fuerza B = 0; la segunda fuerza sin(ka) = 0, es decir k·a = nπ con n = 1,2,3,...' },
      { kind: 'eq-row', label: 'Energías permitidas', tex: 'E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2 m a^2}, \\quad n=1,2,3,\\dots' },
      { kind: 'eq-row', label: 'Funciones propias (normalizadas)', tex: '\\psi_n(x) = \\sqrt{\\frac{2}{a}}\\,\\sin\\!\\left(\\frac{n\\pi x}{a}\\right).' },
      { kind: 'p', text: 'La solución general (cualquier estado, no solo estacionario) es una superposición:' },
      { kind: 'eq-row', label: 'Solución general', tex: '\\Psi(x,t) = \\sum_{n=1}^{\\infty} c_n\\,\\psi_n(x)\\,e^{-iE_n t/\\hbar}.' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'Cada ψ_n es un modo normal: una onda estacionaria con n "arcos". El número cuántico n cuenta los medios-periodos de seno que caben en [0,a]. A mayor n, mayor energía y mayor número de nodos.' },
      { kind: 'p', text: 'La energía mínima E₁ no es cero: el estado fundamental tiene energía finita. Esto es una consecuencia directa de la incertidumbre: confinar la partícula (Δx pequeño) implica Δp grande y, por tanto, energía cinética no nula. La "energía del punto cero" es una firma cuántica.' },
      { kind: 'callout', tone: 'info', title: 'Por qué senos y no cosenos', blocks: [
        { kind: 'p', text: 'Por la elección del origen: con el pozo en (0,a) y ψ(0)=0, solo sobreviven los senos. Si el pozo se define simétrico en (-a, a), aparecen pares (cosenos) e impares (senos). Son el mismo problema, solo cambia la base.' },
      ]},
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'Este es el primer problema resuelto en el capítulo. Griffiths lo usa para introducir la cuantización y los valores esperados en estados estacionarios, y para mostrar cómo se construye la solución general por superposición. Los Problemas 2.4-2.10 exploran variantes del pozo (cambio de origen, cálculo de valores esperados, evolución temporal de superposiciones).' },
    ],
    layer5Check: [
      {
        id: 'c2-iw-q1',
        question: [{ kind: 'p', text: '¿Por qué la energía del estado fundamental del pozo infinito no es cero?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Porque el pozo no es realmente infinito.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Porque la confinación implica Δx pequeño y, por Heisenberg, Δp grande, lo que da energía cinética no nula (energía del punto cero).' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Porque hay una energía de reposo.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'E₁ = π²ℏ²/(2ma²) > 0 es la energía del punto cero. Refleja que una partícula confinada no puede estar en reposo: la incertidumbre en posición implica momento y, con él, energía cinética.' }],
        conceptId: 'c2-infinite-well',
      },
      {
        id: 'c2-iw-q2',
        question: [{ kind: 'p', text: '¿Cuántos nodos (ceros dentro del pozo) tiene ψ_n del pozo infinito?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'n−1 nodos.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'n nodos.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'n+1 nodos.' }] },
        ],
        correctId: 'a',
        explanation: [{ kind: 'p', text: 'ψ_n tiene n−1 nodos en el interior (sin contar las paredes, donde siempre se anula). El estado fundamental (n=1) no tiene nodos; cada excitación añade uno. Es una regla general de autoestados unidimensionales.' }],
        conceptId: 'c2-infinite-well',
      },
    ],
    related: ['c2-quantization', 'c2-continuity', 'c2-superposition'],
    prerequisites: ['c2-quantization', 'c2-continuity'],
  },

  {
    id: 'c2-superposition',
    chapterId: 'ch2',
    sectionId: '2.2',
    title: 'Superposición y evolución temporal',
    subtitle: 'Cómo construir cualquier estado a partir de los estados estacionarios',
    order: 8,
    tags: ['superposición', 'evolución temporal', 'coeficientes c_n'],
    layer1Intuition: [
      { kind: 'p', text: 'Un estado estacionario es especial: su densidad de probabilidad no cambia. Pero un estado físico general no es estacionario: es una mezcla (superposición) de varios ψ_n, cada uno girando en fase a su propia frecuencia E_n/ℏ. Las fases relativas cambian con el tiempo y, con ellas, |Ψ|².' },
      { kind: 'p', text: 'Los coeficientes c_n de la mezcla se determinan del estado inicial Ψ(x,0): son los "pesos" con que cada modo estacionario contribuye. Calcularlos es un problema de Fourier (proyectar sobre la base ortonormal).' },
    ],
    layer2Math: [
      { kind: 'eq-row', label: 'Estado general', tex: '\\Psi(x,t) = \\sum_{n=1}^{\\infty} c_n\\,\\psi_n(x)\\,e^{-iE_n t/\\hbar}.' },
      { kind: 'p', text: 'En t = 0, conociendo Ψ(x,0), se obtienen los coeficientes por proyección (usando ortonormalidad ∫ψ_m*ψ_n dx = δ_{mn}):' },
      { kind: 'eq-row', label: 'Coeficientes', tex: 'c_n = \\int_{0}^{a} \\psi_n^*(x)\\,\\Psi(x,0)\\,dx.' },
      { kind: 'p', text: 'La probabilidad de medir la energía E_n en ese estado es |c_n|² (regla de Born generalizada).' },
      { kind: 'eq-row', label: 'Probabilidad de E_n', tex: 'P(E_n) = |c_n|^2, \\quad \\sum_n |c_n|^2 = 1.' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'La superposición es la forma en que la mecánica cuántica describe estados que no tienen energía definida: si mides, obtendrás uno de los E_n con probabilidad |c_n|². El valor esperado de la energía es ⟨E⟩ = Σ|c_n|² E_n, constante en el tiempo (la energía total se conserva).' },
      { kind: 'p', text: 'La evolución temporal es trivial en esta base: cada modo gira a su frecuencia. Lo que cambia |Ψ|² no son los pesos |c_n| (constantes), sino las fases relativas e^{-i(E_n-E_m)t/ℏ}. De ahí que ⟨x⟩ pueda oscilar: hay interferencia entre modos.' },
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'Los Problemas 2.6 y 2.8-2.9 del capítulo exploran justo esto: dar un Ψ(x,0) que no es estacionario, calcular los c_n, escribir Ψ(x,t) y hallar ⟨x⟩(t) y ⟨H⟩. Es el puente entre "resolver la TISE" y "describir la dinámica real".' },
    ],
    layer5Check: [
      {
        id: 'c2-sup-q1',
        question: [{ kind: 'p', text: 'Si Ψ(x,0) = c₁ψ₁ + c₂ψ₂, ¿cómo depende |Ψ(x,t)|² del tiempo en general?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Es constante: nada cambia.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Oscila porque las fases relativas e^{-i(E₁-E₂)t/ℏ} cambian, produciendo interferencia entre los dos modos.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Decae a cero.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'Solo si un único c_n es no nulo (estado estacionario) es |Ψ|² constante. Con dos modos, las fases relativas varían y aparecen términos cruzados que oscilan a frecuencia (E₁-E₂)/ℏ. Es la firma de un estado no estacionario.' }],
        conceptId: 'c2-superposition',
      },
    ],
    related: ['c2-infinite-well', 'c2-stationary-states-meaning'],
    prerequisites: ['c2-infinite-well'],
  },

  {
    id: 'c2-stationary-states-meaning',
    chapterId: 'ch2',
    sectionId: '2.2',
    title: 'Propiedades de los estados estacionarios',
    subtitle: 'Qué se conserva y por qué: energía, densidad, valores esperados',
    order: 9,
    tags: ['estacionario', 'conservación', 'valores esperados'],
    layer1Intuition: [
      { kind: 'p', text: 'En un estado estacionario: la energía está bien definida (E), la densidad de probabilidad |ψ|² es independiente del tiempo, y todo valor esperado de un operador que no dependa explícitamente del tiempo es constante. El estado "no evoluciona" en el sentido físico relevante para la medida.' },
    ],
    layer2Math: [
      { kind: 'p', text: 'Para Ψ(x,t) = ψ(x)·e^{-iEt/ℏ}:' },
      { kind: 'eq-row', label: 'Densidad', tex: '|\\Psi(x,t)|^2 = |\\psi(x)|^2 \\cdot |e^{-iEt/\\hbar}|^2 = |\\psi(x)|^2.' },
      { kind: 'eq-row', label: 'Valor esperado', tex: '\\langle Q \\rangle = \\int \\psi^* \\,\\hat{Q}\\,\\psi\\,dx \\quad (\\text{indep. de }t).' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'Estas propiedades no son milagrosas: vienen del factor de fase. Como la fase es un número de módulo 1, se cancela en cualquier producto |Ψ|² o ⟨ψ|Q̂|ψ⟩. Solo si el operador depende explícitamente del tiempo, o si el estado es superposición, las fases relativas dejan de cancelarse y aparece evolución no trivial.' },
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'Griffiths recalca que los estados estacionarios son los "ladrillos" con los que se construye la física real (estados generales). No son los estados físicamente realistas por sí mismos (rara vez un sistema está en un estado de energía definida), pero son la base en la que se expresa cualquier estado.' },
    ],
    layer5Check: [
      {
        id: 'c2-ssm-q1',
        question: [{ kind: 'p', text: 'Para un estado estacionario, ¿cuál de las siguientes magnitudes depende del tiempo?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: '|Ψ(x,t)|².' }] },
          { id: 'b', text: [{ kind: 'p', text: '⟨x⟩.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Ninguna de las anteriores.' }] },
        ],
        correctId: 'c',
        explanation: [{ kind: 'p', text: 'En un estado estacionario, la fase temporal se cancela en densidades y valores esperados (de operadores sin dependencia explícita del tiempo). Por eso "estacionario": nada observable evoluciona.' }],
        conceptId: 'c2-stationary-states-meaning',
      },
    ],
    related: ['c2-separation', 'c2-superposition'],
    prerequisites: ['c2-separation'],
  },

  // ============ SECTION 2.3 — HARMONIC OSCILLATOR ============
  {
    id: 'c2-harmonic-oscillator',
    chapterId: 'ch2',
    sectionId: '2.3',
    title: 'El oscilador armónico cuántico',
    subtitle: 'El potencial V = ½mω²x² y sus dos métodos de resolución',
    order: 10,
    tags: ['oscilador', 'Hermite', 'operadores de escalada'],
    layer1Intuition: [
      { kind: 'p', text: 'Es el modelo más universal de la física: cualquier potencial con un mínimo estable se aproxima, cerca del mínimo, por un pozo parabólico. Por eso el oscilador armónico aparece una y otra vez (vibraciones de moléculas, modos del campo electromagnético, sólidos...).' },
      { kind: 'p', text: 'Aquí Griffiths introduce dos métodos alternativos que conviven: el analítico (resolver la EDO por series, aparecen los polinomios de Hermite) y el algebraico (usar operadores de escalada a, a† que suben y bajan los estados de energía). El segundo es una herramienta nueva y muy potente.' },
    ],
    layer2Math: [
      { kind: 'eq-row', label: 'Potencial', tex: 'V(x) = \\frac{1}{2}m\\omega^2 x^2.' },
      { kind: 'p', text: 'Método algebraico: se define el operador de aniquilación (descenso)' },
      { kind: 'math-block', tex: 'a = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(x + \\frac{i}{m\\omega}p\\right), \\quad a^\\dagger = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(x - \\frac{i}{m\\omega}p\\right).' },
      { kind: 'p', text: 'El Hamiltoniano se escribe Ĥ = ℏω(a†a + ½), y los autovalores resultan:' },
      { kind: 'eq-row', label: 'Energías', tex: 'E_n = \\hbar\\omega\\left(n + \\tfrac{1}{2}\\right), \\quad n=0,1,2,\\dots' },
      { kind: 'p', text: 'El estado fundamental (n=0) se obtiene imponiendo a|0⟩ = 0 (no hay estado por debajo); los excitados por aplicación repetida de a†: |n⟩ = (a†)ⁿ/√(n!) |0⟩.' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'La energía del punto cero ½ℏω tiene el mismo origen que en el pozo infinito: confinamiento implica Δx, que implica Δp, que implica energía cinética mínima. Solo puede anularse si ω = 0 (oscilador "libre", sin confinamiento).' },
      { kind: 'p', text: 'El espaciamiento constante ℏω entre niveles es característico: a diferencia del pozo infinito (E_n ∝ n²) o el átomo (E_n ∝ -1/n²), aquí los niveles están igualmente espaciados. Esto es la firma del oscilador y explica el espectro igualmente espaciado de los modos vibracionales.' },
      { kind: 'callout', tone: 'key', title: 'Por qué importan los operadores a, a†', blocks: [
        { kind: 'p', text: 'Sustituyen "resolver una EDO" por "manipular un álgebra de operadores". Encapsulan la estructura del oscilador: a† crea un cuanto de energía, a lo destruye. Esta lógica se transfiere al tratamiento del campo electromagnético (fotones como cuantos del oscilador modo a modo).' },
      ]},
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'La sección 2.3 es la más larga del capítulo porque desarrolla ambos métodos. El analítico enseña la técnica de serie de potencias y el origen de los polinomios de Hermite; el algebraico enseña un modo completamente distinto de pensar: no "resuelve la ecuación", sino "usa las relaciones de conmutación".' },
    ],
    layer5Check: [
      {
        id: 'c2-ho-q1',
        question: [{ kind: 'p', text: '¿Cuál es la energía del estado fundamental del oscilador armónico cuántico?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: '0.' }] },
          { id: 'b', text: [{ kind: 'p', text: '½ℏω.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'ℏω.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'E₀ = ½ℏω. Es la energía del punto cero, que no puede anularse porque confinar implica incertidumbre de momento. El operador a "destruye" cuantos pero no puede llevar por debajo de |0⟩, de ahí ese ½.' }],
        conceptId: 'c2-harmonic-oscillator',
      },
      {
        id: 'c2-ho-q2',
        question: [{ kind: 'p', text: '¿Qué relación cumplen los operadores a y a†?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Conmutan: [a, a†] = 0.' }] },
          { id: 'b', text: [{ kind: 'p', text: '[a, a†] = 1, y Ĥ = ℏω(a†a + ½).' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Son hermíticos e iguales.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'La relación de conmutación [a, a†] = 1 es la estructura algebraica esencial del oscilador. De ella se deducen el espectro y la acción de a y a† como operadores de descenso y ascenso.' }],
        conceptId: 'c2-harmonic-oscillator',
      },
    ],
    related: ['c2-quantization', 'c2-infinite-well'],
    prerequisites: ['c2-quantization'],
  },

  // ============ SECTION 2.4 — FREE PARTICLE ============
  {
    id: 'c2-free-particle',
    chapterId: 'ch2',
    sectionId: '2.4',
    title: 'La partícula libre y los paquetes de onda',
    subtitle: 'Cuando no hay confinamiento: ondas planas no normalizables y paquetes de Fourier',
    order: 11,
    tags: ['partícula libre', 'Fourier', 'paquete de onda', 'grupo'],
    layer1Intuition: [
      { kind: 'p', text: 'Con V = 0 en todo el eje, no hay nada que confine. La TISE da ondas planas e^{±ikx}, pero cada una ocupa todo el espacio y no es normalizable. Eso significa: ningún estado estacionario de la partícula libre es un estado físico real.' },
      { kind: 'p', text: 'El estado físico real es un paquete de onda: una superposición (integral, no suma) de ondas planas con un rango de k. El paquete sí es normalizable (si los coeficientes decaen). La partícula localizada es, en esencia, una onda construida por interferencia.' },
    ],
    layer2Math: [
      { kind: 'p', text: 'Con V = 0 y E > 0, k = √(2mE)/ℏ, soluciones e^{±ikx}. Pero la solución general es una integral sobre todos los k:' },
      { kind: 'eq-row', label: 'Paquete', tex: '\\Psi(x,t) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} \\phi(k)\\,e^{i(kx - \\omega t)}\\,dk, \\quad \\omega = \\frac{\\hbar k^2}{2m}.' },
      { kind: 'p', text: 'φ(k) es la transformada de Fourier del estado inicial Ψ(x,0). Por Parseval, ∫|Ψ|²dx = ∫|φ(k)|²dk = 1 (si está normalizado).' },
      { kind: 'eq-row', label: 'Velocidad de grupo', tex: 'v_g = \\frac{d\\omega}{dk}\\bigg|_{k_0} = \\frac{\\hbar k_0}{m}.' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'La partícula libre es la antítesis del pozo: energía continua, no cuantizada. La "cantidad" que se cuantiza aquí es el momento (k continuo, así que p = ℏk continuo). El paquete de onda es el objeto que representa "una partícula que se mueve con momento medio ℏk₀".' },
      { kind: 'p', text: 'La velocidad de grupo v_g = ℏk₀/m coincide con la velocidad clásica p/m. Es el primer indicio de que la mecánica clásica se recupera como límite: la partícula del paquete se desplaza, en promedio, según la mecánica clásica, mientras el paquete se ensancha (dispersión).' },
      { kind: 'callout', tone: 'warn', title: 'Una sutileza importante', blocks: [
        { kind: 'p', text: 'La velocidad de fase ω/k no es la velocidad de la partícula. La velocidad de grupo sí. Confundirlas es un error típico: la fase gira "hacia atrás" sin transportar energía.' },
      ]},
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'La sección 2.4 introduce la integral de Fourier como herramienta. Aparece aquí la idea de que la base de autoestados puede ser continua (índice k en lugar de n discreto), con deltas de Dirac en lugar de Kronecker. Esto anticipa el formalismo del capítulo 3.' },
    ],
    layer5Check: [
      {
        id: 'c2-fp-q1',
        question: [{ kind: 'p', text: '¿Por qué una onda plana e^{ikx} no es un estado físico aceptable para la partícula libre?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Porque tiene energía negativa.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Porque ocupa todo el espacio con amplitud constante: ∫|ψ|²dx diverge, no es normalizable.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Porque es imaginaria.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'La onda plana no decae, así que la integral de |ψ|² en todo el eje diverge. No representa un estado localizado. El estado físico es un paquete: superposición de ondas planas con amplitudes que decaen, lo que sí es normalizable.' }],
        conceptId: 'c2-free-particle',
      },
      {
        id: 'c2-fp-q2',
        question: [{ kind: 'p', text: '¿Qué velocidad corresponde al desplazamiento medio del paquete de onda?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'La velocidad de fase ω/k.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'La velocidad de grupo dω/dk.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Ninguna; el paquete no se mueve.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'La velocidad de grupo es la del centro del paquete y coincide con la velocidad clásica p/m. La velocidad de fase solo describe cómo gira la fase interna, no transporta partícula ni energía.' }],
        conceptId: 'c2-free-particle',
      },
    ],
    related: ['c2-bound-vs-scattering', 'c2-superposition'],
    prerequisites: ['c2-bound-vs-scattering'],
  },

  // ============ SECTION 2.5 — DELTA POTENTIAL ============
  {
    id: 'c2-delta',
    chapterId: 'ch2',
    sectionId: '2.5',
    title: 'El potencial delta',
    subtitle: 'Pozo y barrera puntuales: la dispersión más simple y un único estado ligado',
    order: 12,
    tags: ['delta', 'dispersión', 'salto de derivada'],
    layer1Intuition: [
      { kind: 'p', text: 'V(x) = ±α·δ(x) es un potencial "pinchado" en un punto. Modela una interacción localizada muy intensa (un defecto puntual, un contacto). Por ser singular, la condición usual de continuidad de la derivada se rompe: la derivada da un salto proporcional a ψ(0).' },
      { kind: 'p', text: 'Es el laboratorio de dispersión más simple: una sola condición de empate en x=0, en lugar de dos como en un pozo finito. Por eso permite obtener T y R sin trascendentes complicadas.' },
    ],
    layer2Math: [
      { kind: 'eq-row', label: 'Condiciones en x=0', tex: '\\psi(0^+) = \\psi(0^-), \\quad \\psi\'(0^+) - \\psi\'(0^-) = -\\frac{2m\\alpha}{\\hbar^2}\\psi(0) \\;\\;(\\text{pozo } -\\alpha\\delta).' },
      { kind: 'p', text: 'Estado ligado del pozo delta (E < 0): se busca ψ = √κ·e^{-κ|x|} con κ = √(-2mE)/ℏ. El salto de derivada da la condición y, con ella, la energía:' },
      { kind: 'eq-row', label: 'Único estado ligado', tex: 'E = -\\frac{m\\alpha^2}{2\\hbar^2}, \\quad \\kappa = \\frac{m\\alpha}{\\hbar^2}.' },
      { kind: 'p', text: 'Dispersión (E > 0): ondas incidente, reflejada y transmitida. De las condiciones se obtiene:' },
      { kind: 'eq-row', label: 'Coef. de transmisión', tex: 'T = \\frac{1}{1 + (m\\alpha/\\hbar^2 k)^2}, \\quad R = 1 - T.' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'El pozo delta admite exactamente un estado ligado, sin excitados: la "profundidad" del pozo solo alcanza para un modo. Es el ejemplo mínimo donde ves cómo un potencial atractivo, por débil que sea, liga un estado en 1D.' },
      { kind: 'p', text: 'La barrera delta (+αδ) no liga nada pero dispersa: parte se refleja, parte se transmite. A altas energías (k grande) T → 1: la barrera se vuelve transparente; a bajas, T → 0: la barrera refleja casi todo.' },
      { kind: 'callout', tone: 'info', title: 'Por qué solo un ligado', blocks: [
        { kind: 'p', text: 'Un pozo atractivo en 1D siempre liga al menos un estado; el delta, siendo el más "concentrado", liga exactamente uno. Un pozo finito más ancho ligará más estados a medida que aumente V₀ o el ancho.' },
      ]},
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'La sección 2.5 usa el delta como puente entre los problemas ligados (pozo infinito, oscilador) y los de dispersión (escalón, barrera, pozo finito por encima de V₀). Una sola sección, dos regímenes: ligado (pozo) y scattering (pozo y barrera).' },
    ],
    layer5Check: [
      {
        id: 'c2-delta-q1',
        question: [{ kind: 'p', text: '¿Cuántos estados ligados admite el pozo delta -αδ(x)?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Ninguno.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Exactamente uno.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Infinitos.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'El pozo delta liga exactamente un estado, con energía E = -mα²/(2ℏ²). No hay excitados: el pozo es demasiado "estrecho" para acomodar más modos.' }],
        conceptId: 'c2-delta',
      },
      {
        id: 'c2-delta-q2',
        question: [{ kind: 'p', text: '¿Qué condición cumple la derivada de ψ en x = 0 para el potencial delta?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Es continua como siempre.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Da un salto proporcional a ψ(0): ψ\'(0⁺) - ψ\'(0⁻) = (2mα/ℏ²)·ψ(0) (signo según pozo/barrera).' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Se anula.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'El delta es singular, así que integrar la TISE en torno a 0 da un contributo finito. De ahí el salto de la derivada, proporcional a la fuerza del delta y al valor de ψ en 0. ψ sigue siendo continua.' }],
        conceptId: 'c2-delta',
      },
    ],
    related: ['c2-continuity', 'c2-bound-vs-scattering', 'c2-tunneling'],
    prerequisites: ['c2-continuity', 'c2-bound-vs-scattering'],
  },

  // ============ SECTION 2.6 — FINITE WELL ============
  {
    id: 'c2-finite-well',
    chapterId: 'ch2',
    sectionId: '2.6',
    title: 'El pozo cuadrado finito',
    subtitle: 'Penetración en la región prohibida, paridad y ecuación trascendental',
    order: 13,
    tags: ['pozo finito', 'penetración', 'paridad', 'trascendental'],
    layer1Intuition: [
      { kind: 'p', text: 'Ahora las paredes no son infinitas: fuera del pozo V = V₀ > 0 (finito). La partícula puede "escapar" clásicamente, pero cuánticamente la onda penetra la región prohibida decayendo exponencialmente. Esta penetración es la firma de un pozo finito.' },
      { kind: 'p', text: 'Como el potencial es par (V(-x) = V(x)), las soluciones tienen paridad definida: pares o impares. Esto reduce a la mitad el trabajo: en lugar de resolver todo de golpe, separas en casos par e impar.' },
    ],
    layer2Math: [
      { kind: 'p', text: 'Para |x| < a: V = 0, ψ = A cos(lx) (par) o B sin(lx) (impar), con l = √(2mE)/ℏ.' },
      { kind: 'p', text: 'Para |x| > a: V = V₀, ψ = C e^{-κ|x|} con κ = √(2m(V₀-E))/ℏ (decae, ligado).' },
      { kind: 'p', text: 'Continuidad de ψ y ψ\' en x = a da, tras eliminar constantes, condiciones trascendentales:' },
      { kind: 'eq-row', label: 'Par', tex: '\\kappa = l\\,\\tan(la).' },
      { kind: 'eq-row', label: 'Impar', tex: '\\kappa = -l\\,\\cot(la).' },
      { kind: 'p', text: 'Con la restricción l² + κ² = 2mV₀/ℏ², las soluciones son los cruces entre una circunferencia y dos curvas. Hay un número finito de estados ligados, que crece con V₀a².' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'La penetración (cola exponencial fuera del pozo) significa que la probabilidad de encontrar la partícula fuera del pozo no es cero. A mayor energía (E cercana a V₀), mayor penetración: la onda "se escapa" más antes de decaer. Esta es la base física del tunneling.' },
      { kind: 'p', text: 'La paridad no es una conveniencia: es una consecuencia de la simetría V(-x)=V(x). Si el potencial es par, los autoestados de energía pueden elegirse con paridad definida (simultáneamente autoestados de paridad). Esto siempre simplifica el cálculo cuando aplica.' },
      { kind: 'callout', tone: 'key', title: 'Por qué hay finitos ligados', blocks: [
        { kind: 'p', text: 'A diferencia del pozo infinito (infinitos estados), el finito liga solo un número finito: a medida que V₀a² disminuye, van desapareciendo estados. Por debajo de cierto umbral, queda solo el fundamental. En el límite V₀ → ∞ se recuperan los infinitos del pozo infinito.' },
      ]},
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'La sección 2.6 muestra la técnica más general para pozos a trozos: combinar regiones, imponer continuidad, obtener una trascendental y resolver gráficamente/numéricamente. Es el método de referencia para potenciales realistas.' },
    ],
    layer5Check: [
      {
        id: 'c2-fw-q1',
        question: [{ kind: 'p', text: '¿Por qué la onda no se anula fuera del pozo finito (a diferencia del infinito)?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Porque V₀ es finito: la región es clásicamente prohibida pero cuánticamente permitida, y ψ decae exponencial pero no se anula.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Porque no hay continuidad.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Porque la energía es negativa.' }] },
        ],
        correctId: 'a',
        explanation: [{ kind: 'p', text: 'V finito significa que ψ\' es continua y ψ no se anula bruscamente. En la región prohibida ψ decae exponencialmente. Solo si V = ∞ (pozo infinito) ψ se anula en la pared.' }],
        conceptId: 'c2-finite-well',
      },
      {
        id: 'c2-fw-q2',
        question: [{ kind: 'p', text: '¿Qué permite clasificar las soluciones en pares e impares?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'La paridad del potencial V(-x) = V(x), que permite elegir autoestados de energía con paridad definida.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'La elección de origen.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'La continuidad de ψ.' }] },
        ],
        correctId: 'a',
        explanation: [{ kind: 'p', text: 'Un potencial par conmuta con el operador paridad, así que pueden hallarse autoestados comunes. Elegir paridad definida reduce el problema a la mitad: condiciones separadas para par (cosenos) e impar (senos).' }],
        conceptId: 'c2-finite-well',
      },
    ],
    related: ['c2-infinite-well', 'c2-continuity', 'c2-tunneling'],
    prerequisites: ['c2-infinite-well', 'c2-continuity'],
  },

  {
    id: 'c2-tunneling',
    chapterId: 'ch2',
    sectionId: '2.6',
    title: 'Efecto túnel',
    subtitle: 'Paso a través de una región prohibida: por qué ocurre y qué lo controla',
    order: 14,
    tags: ['tunneling', 'transmisión', 'penetración'],
    layer1Intuition: [
      { kind: 'p', text: 'Si una partícula con energía E choca contra una barrera de altura V₀ > E, clásicamente rebotaría siempre. Cuánticamente, la onda penetra la barrera decayendo y, si la barrera es finita en anchura, sale al otro lado con amplitud reducida: hay transmisión no nula. Es el efecto túnel.' },
      { kind: 'p', text: 'No es que la partícula "atraviese" de forma clásica: es que la función de onda, extendida por todo el espacio, tiene soporte a ambos lados. La probabilidad de aparecer al otro lado es |transmitida|²/|incidente|².' },
    ],
    layer2Math: [
      { kind: 'p', text: 'Para una barrera rectangular de altura V₀ y ancho 2a, con E < V₀, la onda dentro decae como e^{-κx} con κ = √(2m(V₀-E))/ℏ. La transmisión resulta (forma simplificada):' },
      { kind: 'eq-row', label: 'T (cualitativa)', tex: 'T \\propto e^{-4\\kappa a}.' },
      { kind: 'p', text: 'La dependencia exponencial es la firma del tunneling: pequeños cambios en κ·a producen grandes cambios en T. Por eso tunneling es sensible a la masa, la altura y el ancho.' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'El tunneling explica fenómenos tan distintos como la desintegración alfa (el núcleo emite una partícula que clásicamente no podría escapar), el microscopio de efecto túnel, y la fusión nuclear estelar a temperaturas menores de las clásicamente esperadas. Es uno de los efectos más verificables de la cuántica.' },
      { kind: 'callout', tone: 'info', title: 'La intuición clave', blocks: [
        { kind: 'p', text: 'Mayor masa, mayor altura de barrera, o mayor ancho ⇒ mayor κ·a ⇒ exponencialmente menor T. Por eso los electrones túnel con facilidad y los protones, mucho menos (κ ∝ √m).' },
      ]},
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'El tunneling aparece de forma natural al resolver la barrera y el pozo finito (en su vertiente de scattering). La idea se explota cuantitativamente en el capítulo 8 (WKB) para barreras más realistas.' },
    ],
    layer5Check: [
      {
        id: 'c2-tun-q1',
        question: [{ kind: 'p', text: 'Si duplicas la masa de la partícula, ¿qué pasa con la transmisión por túnel (a altura y ancho fijos)?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Aumenta.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Disminuye exponencialmente: κ ∝ √m, así que T ∝ e^{-2κ·a} cae fuertemente.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'No cambia.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'κ = √(2m(V₀-E))/ℏ crece con √m. Como T depende exponencialmente de -κ·(ancho), duplicar m reduce T drásticamente. Por eso el tunneling es relevante para electrones y no para objetos macroscópicos.' }],
        conceptId: 'c2-tunneling',
      },
    ],
    related: ['c2-finite-well', 'c2-delta', 'c2-probability-current'],
    prerequisites: ['c2-finite-well'],
  },

  // ============ SECTION 2.7 — SCATTERING MATRIX ============
  {
    id: 'c2-probability-current',
    chapterId: 'ch2',
    sectionId: '2.7',
    title: 'Corriente de probabilidad y coeficientes R, T',
    subtitle: 'Cómo se mide cuánto se refleja y cuánto se transmite',
    order: 15,
    tags: ['corriente', 'reflexión', 'transmisión'],
    layer1Intuition: [
      { kind: 'p', text: 'En dispersión, lo que importa no es ψ en sí, sino cuánta "probabilidad por unidad de tiempo" llega, rebota y pasa. Esa cantidad es la corriente de probabilidad J. Comparando la corriente incidente, reflejada y transmitida se definen R y T.' },
    ],
    layer2Math: [
      { kind: 'eq-row', label: 'Corriente', tex: 'J(x,t) = \\frac{\\hbar}{2mi}\\left(\\Psi^*\\frac{\\partial\\Psi}{\\partial x} - \\Psi\\frac{\\partial\\Psi^*}{\\partial x}\\right).' },
      { kind: 'eq-row', label: 'Conservación', tex: '\\frac{\\partial |\\Psi|^2}{\\partial t} + \\frac{\\partial J}{\\partial x} = 0.' },
      { kind: 'p', text: 'Para una onda A·e^{ikx}, J = |A|²·ℏk/m. Comparando las corrientes:' },
      { kind: 'eq-row', label: 'Coeficientes', tex: 'R = \\frac{|B|^2}{|A|^2}, \\quad T = \\frac{k_{\\text{trans}}\\,|C|^2}{k_{\\text{inc}}\\,|A|^2}, \\quad R + T = 1.' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'J es el "flujo" de probabilidad: cuánta probabilidad pasa por unidad de tiempo por un punto. La ecuación de continuidad expresa conservación de probabilidad (no se crea ni se destruye). R+T=1 es esa conservación aplicada al scattering: lo que no se refleja se transmite.' },
      { kind: 'callout', tone: 'warn', title: 'Cuidado con T', blocks: [
        { kind: 'p', text: 'T no es |C|²/|A|² solo: hay un factor k_trans/k_inc. Si las velocidades de fase difieren a ambos lados (potencial distinto), el factor corrige el flujo. Es un error frecuente.' },
      ]},
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'La corriente de probabilidad aparece ya en el capítulo 1 (conservación de probabilidad) y se usa en todo el capítulo 2 para definir R y T en el delta, el escalón, la barrera y el pozo finito en régimen de scattering.' },
    ],
    layer5Check: [
      {
        id: 'c2-pc-q1',
        question: [{ kind: 'p', text: 'Si la onda incidente es A·e^{ikx} y la transmitida es C·e^{ik\'x}, ¿cómo se calcula T correctamente?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'T = |C|²/|A|².' }] },
          { id: 'b', text: [{ kind: 'p', text: 'T = (k\'/k)·|C|²/|A|², comparando las corrientes (que llevan factor k).' }] },
          { id: 'c', text: [{ kind: 'p', text: 'T = |C|/|A|.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'La corriente de una onda A·e^{ikx} es |A|²·ℏk/m. Para comparar flujos hay que incluir k\'/k. Omitir este factor es un error común, sobre todo cuando el potencial cambia entre regiones.' }],
        conceptId: 'c2-probability-current',
      },
    ],
    related: ['c2-delta', 'c2-s-matrix', 'c2-tunneling'],
    prerequisites: ['c2-bound-vs-scattering'],
  },

  {
    id: 'c2-s-matrix',
    chapterId: 'ch2',
    sectionId: '2.7',
    title: 'La matriz de dispersión (S)',
    subtitle: 'Un marco compacto para todos los problemas de scattering 1D',
    order: 16,
    tags: ['S-matrix', 'unitariedad', 'simetría'],
    layer1Intuition: [
      { kind: 'p', text: 'En lugar de resolver dispersión caso por caso, se encapsulan los coeficientes en una matriz 2×2: dados los coeficientes de ondas que vienen de ±∞, la S-matrix da los coeficientes de ondas que se van hacia ±∞. Una sola matriz resume toda la "respuesta de dispersión" del potencial.' },
      { kind: 'p', text: 'La conservación de probabilidad impone que S sea unitaria; la simetría temporal y la paridad imponen más restricciones. Estas propiedades se traducen en relaciones entre R y T que valen para cualquier potencial (con las simetrías dadas).' },
    ],
    layer2Math: [
      { kind: 'p', text: 'Se escriben las ondas a izquierda y derecha como combinaciones de ondas salientes en términos de las entrantes:' },
      { kind: 'eq-row', label: 'S-matrix', tex: '\\begin{pmatrix} B \\\\ C \\end{pmatrix} = \\begin{pmatrix} S_{11} & S_{12} \\\\ S_{21} & S_{22} \\end{pmatrix} \\begin{pmatrix} A \\\\ D \\end{pmatrix}.' },
      { kind: 'p', text: 'Propiedades: unitariedad S†S = I (conservación de probabilidad), y si V(x) = V(-x), S₁₂ = S₂₁ y S₁₁ = S₂₂ (simetría izquierda-derecha).' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'La S-matrix es la "tarjeta de visita" del potencial para dispersión. Conocer S equivale a conocer R y T para incidencia desde cualquiera de los dos lados. Es una abstracción muy útil: cambia el potencial, cambia S, pero la estructura (unitariedad, simetría) se mantiene.' },
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'La sección 2.7 cierra el capítulo mostrando cómo todos los problemas de dispersión unidimensionales comparten una estructura común. Es la antesala del formalismo y de la teoría de dispersión en 3D del capítulo 11.' },
    ],
    layer5Check: [
      {
        id: 'c2-sm-q1',
        question: [{ kind: 'p', text: '¿Qué propiedad física de la S-matrix expresa la unitariedad S†S = I?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'La conservación de la probabilidad: lo que entra es lo que sale.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'La paridad del potencial.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'La existencia de estados ligados.' }] },
        ],
        correctId: 'a',
        explanation: [{ kind: 'p', text: 'La unitariedad es la traducción matricial de la conservación de probabilidad: la "norma" del vector de ondas salientes iguala la del vector de entrantes. R + T = 1 es un caso particular.' }],
        conceptId: 'c2-s-matrix',
      },
    ],
    related: ['c2-probability-current', 'c2-delta'],
    prerequisites: ['c2-probability-current'],
  },
]

export const ALL_CONCEPTS = [...CONCEPTS, ...CONCEPTS_2_7]
