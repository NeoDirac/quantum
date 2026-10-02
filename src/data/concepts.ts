import type { Concept } from '@/lib/content-types'

// Original pedagogical content for Chapter 2, organized by the book's section structure.
// Explanations, examples, and check questions are written for this platform.

export const CONCEPTS: Concept[] = [
  // ============ SECTION 2.1 — STATIONARY STATES ============
  {
    id: 'c2-separation',
    chapterId: 'ch2',
    sectionId: '2.1',
    title: 'Separación de variables',
    subtitle: 'Por qué podemos buscar soluciones separables y qué significa',
    order: 1,
    tags: ['método', 'separación', 'V independiente del tiempo'],
    layer1Intuition: [
      { kind: 'p', text: 'La ecuación de Schrödinger dependiente del tiempo es una ecuación en derivadas parciales con dos variables (x, t). Resolverla de golpe es muy difícil. La idea de separación de variables es una hipótesis de trabajo: buscar soluciones que sean un producto de una función de x por una función de t.' },
      { kind: 'p', text: 'A primera vista parece restrictivo: no toda solución va a tener esa forma. Pero ocurre algo notable: las soluciones separables que encontramos forman una base, y la solución más general se construye como superposición (suma ponderada) de ellas.' },
      { kind: 'callout', tone: 'key', title: 'La condición que lo permite', blocks: [
        { kind: 'p', text: 'La separación funciona cuando el potencial V no depende del tiempo. Si V dependiera de t, las dos variables no se desacoplarían. Por eso toda esta sección supone V = V(x).' },
      ]},
    ],
    layer2Math: [
      { kind: 'p', text: 'Partimos de la ecuación de Schrödinger dependiente del tiempo:' },
      { kind: 'math-block', tex: 'i\\hbar\\,\\frac{\\partial \\Psi}{\\partial t} = -\\frac{\\hbar^2}{2m}\\frac{\\partial^2 \\Psi}{\\partial x^2} + V(x)\\,\\Psi.' },
      { kind: 'p', text: 'Proponemos la forma separable y la sustituimos:' },
      { kind: 'math-block', tex: '\\Psi(x,t) = \\psi(x)\\,f(t).' },
      { kind: 'p', text: 'Tras sustituir y dividir por ψ·f, el lado izquierdo queda solo función de t y el derecho solo función de x. Como x y t son variables independientes, ambos lados deben ser iguales a una constante, que llamamos E:' },
      { kind: 'math-block', tex: 'i\\hbar\\,\\frac{1}{f}\\frac{df}{dt} = E, \\qquad -\\frac{\\hbar^2}{2m}\\frac{1}{\\psi}\\frac{d^2\\psi}{dx^2} + V(x) = E.' },
      { kind: 'p', text: 'La parte temporal se integra de inmediato:' },
      { kind: 'eq-row', label: 'Tiempo', tex: 'f(t) = e^{-iEt/\\hbar}.' },
      { kind: 'p', text: 'La parte espacial es la ecuación de Schrödinger independiente del tiempo (TISE):' },
      { kind: 'eq-row', label: 'Espacio', tex: '-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2} + V(x)\\psi = E\\,\\psi.' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'Cada solución separable tiene la forma Ψ(x,t) = ψ(x)·e^{-iEt/ℏ}. La dependencia temporal es una fase pura: un número complejo de módulo 1 que gira en el plano complejo con frecuencia E/ℏ.' },
      { kind: 'p', text: 'Como la fase gira pero no cambia el módulo, la densidad de probabilidad |Ψ|² = |ψ|² es independiente del tiempo. De ahí el nombre estado estacionario: la distribución de probabilidad no evoluciona, aunque la función de onda sí lo haga (girando en fase).' },
      { kind: 'callout', tone: 'info', title: '¿Qué significa E?', blocks: [
        { kind: 'p', text: 'La constante de separación E es la energía total del estado. La TISE es una ecuación de valores propios: el operador Hamiltoniano Ĥ = -(ℏ²/2m)d²/dx² + V(x) actúa sobre ψ y devuelve E·ψ. Por eso decimos que ψ son los autoestados de energía y E sus autovalores.' },
      ]},
      { kind: 'p', text: 'Consecuencia importante: medir la energía de un estado estacionario da siempre E (con dispersión nula). El estado estacionario es un estado de energía bien definida.' },
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'En la estructura del libro, esta es la puerta de entrada al capítulo 2. Griffiths abre con la pregunta "¿cómo se obtiene Ψ(x,t)?" y responde: si V no depende de t, el problema se separa. Toda la maquinaria posterior (pozo, oscilador, partícula libre, delta, pozo finito) consiste en resolver la TISE para distintos V(x).' },
      { kind: 'p', text: 'La idea de superponer soluciones separables se revela al final de cada subsección: la solución general es una combinación lineal de estados estacionarios, con coeficientes que dependen del estado inicial.' },
      { kind: 'callout', tone: 'griffiths', title: 'El patrón de Griffiths', blocks: [
        { kind: 'p', text: 'Fíjate en la estructura recurrente: (1) escribir V(x); (2) plantear la TISE; (3) dividir el espacio en regiones según el signo de E−V; (4) imponer condiciones físicas; (5) obtener las energías permitidas; (6) normalizar. Este patrón se repite en cada potencial del capítulo.' },
      ]},
    ],
    layer5Check: [
      {
        id: 'c2-sep-q1',
        question: [{ kind: 'p', text: '¿Por qué es legítimo buscar soluciones de la forma ψ(x)·f(t)?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Porque toda solución de la ecuación de Schrödinger tiene forzosamente esa forma.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Porque V no depende del tiempo, lo que permite desacoplar x y t; las soluciones separables forman luego una base para la solución general.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Porque es la única forma de normalizar la función de onda.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'La separación es una hipótesis de trabajo, no una verdad sobre toda solución. Lo que la justifica es que V sea independiente del tiempo (desacopla las variables) y que las soluciones separables formen una base completa, de modo que la solución general es superposición de ellas.' }],
        conceptId: 'c2-separation',
      },
      {
        id: 'c2-sep-q2',
        question: [{ kind: 'p', text: 'Para un estado estacionario, ¿cómo es |Ψ(x,t)|² en función del tiempo?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Oscila a frecuencia E/ℏ.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Es constante en el tiempo (independiente de t).' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Decae exponencialmente.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'La dependencia temporal e^{-iEt/ℏ} es una fase pura de módulo 1, así que |Ψ|² = |ψ(x)|² no cambia con el tiempo. De ahí el nombre "estacionario".' }],
        conceptId: 'c2-separation',
      },
    ],
    related: ['c2-tise', 'c2-bound-vs-scattering', 'c2-quantization'],
    prerequisites: [],
  },

  {
    id: 'c2-tise',
    chapterId: 'ch2',
    sectionId: '2.1',
    title: 'La ecuación de Schrödinger independiente del tiempo',
    subtitle: 'Qué es, qué busca y cómo la estructura del potencial la determina',
    order: 2,
    tags: ['TISE', 'ecuación diferencial', 'autovalores'],
    layer1Intuition: [
      { kind: 'p', text: 'La TISE es la ecuación que nos dice qué funciones ψ(x) son permitidas para una energía dada, una vez fijado el potencial V(x). En esencia pregunta: ¿qué forma puede tener la onda espacial para que, al evolucionar con la fase temporal e^{-iEt/ℏ}, sea solución de la ecuación completa?' },
      { kind: 'p', text: 'Físicamente, resolver la TISE equivale a preguntar: "¿qué estados de energía bien definida admite este sistema?" La respuesta depende del potencial: su forma determina la ecuación diferencial que aparece en cada región del espacio.' },
    ],
    layer2Math: [
      { kind: 'eq-row', label: 'TISE', tex: '\\hat{H}\\,\\psi = E\\,\\psi, \\qquad \\hat{H} = -\\frac{\\hbar^2}{2m}\\frac{d^2}{dx^2} + V(x).' },
      { kind: 'p', text: 'Reescrita para ver la forma de la ecuación diferencial:' },
      { kind: 'math-block', tex: '\\frac{d^2\\psi}{dx^2} = \\frac{2m}{\\hbar^2}\\bigl(V(x) - E\\bigr)\\,\\psi.' },
      { kind: 'callout', tone: 'key', title: 'El signo de (V − E) lo determina todo', blocks: [
        { kind: 'p', text: 'Donde E > V (región "clásicamente permitida"), el coeficiente es negativo y ψ oscila (senos, cosenos, exponenciales complejas).' },
        { kind: 'p', text: 'Donde E < V (región "clásicamente prohibida"), el coeficiente es positivo y ψ crece o decrece exponencialmente.' },
      ]},
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'La TISE es un problema de autovalores: ψ es un autoestado del Hamiltoniano y E el autovalor. Los autoestados son los modos normales del sistema cuántico, análogos a los modos de una cuerda: solo ciertas "formas" y ciertas "frecuencias" son compatibles con las condiciones físicas.' },
      { kind: 'p', text: 'El que la forma del potencial determine la ecuación es crucial: si V es constante en una región, la TISE se vuelve una EDO de coeficientes constantes (senos/cosenos o exponenciales reales). Si V varía (oscilador armónico), la ecuación es distinta y aparecen funciones especiales (Hermite).' },
      { kind: 'callout', tone: 'info', title: 'Regla práctica para reconocer qué esperar', blocks: [
        { kind: 'list', items: [
          [{ kind: 'p', text: 'V constante y E > V → soluciones oscilatorias: A·e^{ikx} + B·e^{-ikx}.' }],
          [{ kind: 'p', text: 'V constante y E < V → soluciones exponenciales reales: C·e^{κx} + D·e^{-κx}.' }],
          [{ kind: 'p', text: 'V varía suavemente → funciones especiales o, más adelante, aproximación WKB.' }],
        ]},
      ]},
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'La TISE es el objeto central del capítulo 2. Cada subsección cambia V(x) y reutiliza la misma ecuación: pozo infinito (V a trozos), oscilador (V cuadrático), partícula libre (V = 0), delta (V singular), pozo finito (V a trozos con valor finito).' },
      { kind: 'p', text: 'Esto enseña una lección metodológica: la TISE es universal, lo que cambia entre problemas es la forma de V y, con ella, las condiciones de frontera y el tipo de solución admitida.' },
    ],
    layer5Check: [
      {
        id: 'c2-tise-q1',
        question: [{ kind: 'p', text: 'En una región donde V(x) = constante y E < V, ¿qué forma esperas para ψ?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Oscilaciones tipo seno/coseno.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Exponenciales reales creciente o decreciente.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Una constante.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'Como E < V, el coeficiente (V−E) en la TISE es positivo, así que ψ\'\' = (+κ²)ψ cuyas soluciones son exponenciales reales. Es la región prohibida: la onda no oscila, se cuela decaendo.' }],
        conceptId: 'c2-tise',
      },
      {
        id: 'c2-tise-q2',
        question: [{ kind: 'p', text: '¿Qué significa físicamente que ψ sea un autoestado del Hamiltoniano?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Que al medir la energía se obtiene siempre E, sin dispersión.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Que la partícula está en reposo.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Que ψ no depende del tiempo.' }] },
        ],
        correctId: 'a',
        explanation: [{ kind: 'p', text: 'Ĥψ = Eψ significa estado de energía bien definida. La dispersión ΔE = 0 (si medimos muchas veces sobre el mismo estado, siempre obtenemos E). La dependencia temporal sigue existiendo, como fase e^{-iEt/ℏ}.' }],
        conceptId: 'c2-tise',
      },
    ],
    related: ['c2-separation', 'c2-bound-vs-scattering', 'c2-oscillatory-vs-exponential'],
    prerequisites: ['c2-separation'],
  },

  {
    id: 'c2-oscillatory-vs-exponential',
    chapterId: 'ch2',
    sectionId: '2.1',
    title: 'Oscilatorio vs exponencial: el signo de E−V',
    subtitle: 'El criterio que decide la forma de la solución en cada región',
    order: 3,
    tags: ['región', 'E−V', 'seno/coseno', 'exponencial'],
    layer1Intuition: [
      { kind: 'p', text: 'La TISE escrita como ψ\'\' = (2m/ℏ²)(V−E)ψ muestra que el "signo del coeficiente" decide si la función oscila o si crece/decrece. Es la distinción más útil que puedes hacer al mirar un problema: en cada región del espacio, pregúntate "¿E es mayor o menor que V aquí?".' },
      { kind: 'callout', tone: 'key', title: 'Una sola idea, dos caras', blocks: [
        { kind: 'p', text: 'E > V (permitida): la onda vive, oscila, como una partícula clásica moviéndose.' },
        { kind: 'p', text: 'E < V (prohibida): la onda no puede propagarse, solo colarse decaendo exponencialmente. Clásicamente imposible; cuánticamente, permitida en pequeña cuantía.' },
      ]},
    ],
    layer2Math: [
      { kind: 'p', text: 'Definimos dos cantidades reales positivas según el caso:' },
      { kind: 'math-block', tex: 'k = \\sqrt{\\frac{2m(E-V)}{\\hbar^2}} \\quad (E>V), \\qquad \\kappa = \\sqrt{\\frac{2m(V-E)}{\\hbar^2}} \\quad (E<V).' },
      { kind: 'p', text: 'Entonces la solución general en una región con V constante es:' },
      { kind: 'eq-row', label: 'E > V', tex: '\\psi(x) = A\\,e^{ikx} + B\\,e^{-ikx} = A\'\\cos(kx) + B\'\\sin(kx).' },
      { kind: 'eq-row', label: 'E < V', tex: '\\psi(x) = C\\,e^{\\kappa x} + D\\,e^{-\\kappa x}.' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'La distinción no es arbitraria: refleja si la energía cinética "clásica" (E−V) es positiva o negativa. En mecánica clásica, E < V significa que la partícula no puede estar allí. En cuántica, ψ no se anula, sino que decae: hay probabilidad no nula de encontrar la partícula en una región clásicamente prohibida (penetración).' },
      { kind: 'callout', tone: 'info', title: 'Por qué importa esto para decidir el método', blocks: [
        { kind: 'p', text: 'El signo de E−V determina qué forma de solución escribir. No se elige por gustó: se deduce de la ecuación. Confundir el signo lleva a escribir senos donde van exponenciales y viceversa, uno de los errores más comunes.' },
      ]},
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'Esta distinción es la que separa visualmente los problemas del capítulo: el pozo infinito tiene solo región permitida dentro (senos); el pozo finito tiene permitida dentro y prohibida fuera (senos dentro, exponenciales fuera); el escalón y la barrera mezclan ambas según la energía incidente.' },
    ],
    layer5Check: [
      {
        id: 'c2-oscexp-q1',
        question: [{ kind: 'p', text: 'Si en una región tienes V = 0 y E > 0, ¿qué escribe mal un estudiante que confunde el signo?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Escribe C·e^{κx} + D·e^{-κx}.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Escribe A·cos(kx) + B·sin(kx).' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Escribe una constante.' }] },
        ],
        correctId: 'a',
        explanation: [{ kind: 'p', text: 'El error es tratar E > V como si fuese E < V y poner exponenciales reales. Lo correcto con E > V es seno/coseno (u ondas planas). El signo de E−V decide la forma: no se elige arbitrariamente.' }],
        conceptId: 'c2-oscillatory-vs-exponential',
      },
    ],
    related: ['c2-tise', 'c2-bound-vs-scattering', 'c2-tunneling'],
    prerequisites: ['c2-tise'],
  },

  {
    id: 'c2-bound-vs-scattering',
    chapterId: 'ch2',
    sectionId: '2.1',
    title: 'Estados ligados vs estados de dispersión',
    subtitle: 'La gran bifurcación: ¿partícula atrapada o partícula libre incidente?',
    order: 4,
    tags: ['ligado', 'scattering', 'asíntotas', 'normalización'],
    layer1Intuition: [
      { kind: 'p', text: 'Antes de resolver nada, lo primero que debes preguntarte al ver un potencial es: ¿estoy buscando una partícula atrapada (ligada) o una partícula que llega de lejos y rebota/pasa (dispersión)? La respuesta cambia radicalmente las condiciones que impones.' },
      { kind: 'callout', tone: 'key', title: 'Cómo distinguirlos físicamente', blocks: [
        { kind: 'p', text: 'Estado ligado: la partícula está confinada. Lejos del pozo, ψ → 0 (decae). Energías discretas.' },
        { kind: 'p', text: 'Estado de dispersión: la partícula viene del infinito. Lejos, ψ es una onda incidente + reflejada + transmitida. Energía continua.' },
      ]},
    ],
    layer2Math: [
      { kind: 'p', text: 'La distinción se formaliza mediante las condiciones asintóticas:' },
      { kind: 'eq-row', label: 'Ligado', tex: '\\psi(x) \\to 0 \\quad \\text{cuando } |x| \\to \\infty.' },
      { kind: 'eq-row', label: 'Dispersión (desde la izquierda)', tex: '\\psi(x) \\to \\begin{cases} A\\,e^{ikx} + B\\,e^{-ikx} & x \\to -\\infty \\\\ C\\,e^{ikx} & x \\to +\\infty \\end{cases}' },
      { kind: 'p', text: 'En el caso ligado, la condición de decaimiento sobredetermina el sistema: solo para ciertos valores discretos de E las constantes son compatibles. De ahí la cuantización.' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'Físicamente, ligado significa que la probabilidad de encontrar la partícula muy lejos tiende a cero; está atrapada. Dispersión significa que la probabilidad no se localiza: la partícula viaja por el espacio y la normalización en el sentido habitual no funciona (se usan deltas de Dirac o cajas de normalización).' },
      { kind: 'p', text: 'Por eso un estado ligado es normalizable y un estado de dispersión no lo es en el sentido ordinario. Esto explica, a posteriori, por qué a veces las soluciones "generales" que escribes son físicamente inaceptables: porque no cumplen la condición asintótica correcta.' },
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'El capítulo 2 mezcla ambos tipos: el pozo infinito y el oscilador son puros estados ligados (discretos); la partícula libre y los potenciales delta/barra son dispersión (continuo); el pozo finito combina ambos: admite estados ligados discretos y, por encima de V₀, estados de dispersión.' },
    ],
    layer5Check: [
      {
        id: 'c2-bvss-q1',
        question: [{ kind: 'p', text: '¿Qué condición asintótica define un estado ligado?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'ψ → onda incidente + reflejada.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'ψ → 0 cuando |x| → ∞.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'ψ → constante.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'Ligado = confinado: lejos del pozo la probabilidad se anula. Esta condición, aplicada a ambos lados, sobredetermina el sistema y solo se satisface para energías discretas.' }],
        conceptId: 'c2-bound-vs-scattering',
      },
      {
        id: 'c2-bvss-q2',
        question: [{ kind: 'p', text: '¿Por qué los estados de dispersión no son normalizables en el sentido ordinario?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Porque la energía es continua.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Porque la onda se extiende por todo el espacio sin decaer, así que la integral de |ψ|² diverge.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Porque ψ es compleja.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'La onda de dispersión ocupa todo el eje con amplitud constante (no decae), así que ∫|ψ|²dx diverge. La normalización se hace en cajas o con deltas de Dirac, no en el sentido ordinario.' }],
        conceptId: 'c2-bound-vs-scattering',
      },
    ],
    related: ['c2-separation', 'c2-quantization', 'c2-tunneling'],
    prerequisites: ['c2-tise', 'c2-oscillatory-vs-exponential'],
  },

  {
    id: 'c2-quantization',
    chapterId: 'ch2',
    sectionId: '2.1',
    title: 'Cuantización de la energía',
    subtitle: 'Por qué aparecen valores discretos de E y no cualquier energía',
    order: 5,
    tags: ['cuantización', 'condiciones de frontera', 'discreto'],
    layer1Intuition: [
      { kind: 'p', text: 'En mecánica clásica, una partícula en un pozo puede tener cualquier energía. En cuántica, las condiciones físicas (normalización + continuidad + decaimiento asintótico) imponen restricciones que solo se cumplen para una familia discreta de energías E_n. La cuantización no es un postulado: emerge de las condiciones de frontera.' },
      { kind: 'callout', tone: 'key', title: 'La receta conceptual', blocks: [
        { kind: 'p', text: 'Escribes la solución general (con constantes A, B, C...). Impones condiciones físicas. Resulta que las constantes no son todas independientes: sobrevive un sistema de ecuaciones homogéneo que solo tiene solución no trivial si su determinante se anula. Esa condición sobre E es lo que selecciona las energías permitidas.' },
      ]},
    ],
    layer2Math: [
      { kind: 'p', text: 'En el pozo infinito de ancho a, la condición ψ(0)=ψ(a)=0 obliga a que k·a = nπ, con n = 1,2,3,... Así:' },
      { kind: 'eq-row', label: 'Energías del pozo infinito', tex: 'E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2 m a^2}, \\quad n=1,2,3,\\dots' },
      { kind: 'p', text: 'El "truco" es que ψ = A·sin(kx) + B·cos(kx). ψ(0)=0 fuerza B=0; ψ(a)=0 fuerza sin(ka)=0, es decir k·a=nπ. Solo esos k son compatibles; de ahí E_n.' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'La cuantización es la firma cuántica de la confinación: al imponer que la onda "encaje" en la región permitida con condiciones físicas, solo ciertas longitudes de onda son posibles, y con ellas ciertas energías. Es análogo a los modos de una cuerda fijada en los extremos: solo ciertas frecuencias, no cualquier oscilación.' },
      { kind: 'p', text: 'El número cuántico n no es un artefacto: cuenta cuántos "arcos" de la onda caben entre las fronteras. n=1 es el estado fundamental (un arco), n=2 el primer excitado (dos arcos con un nodo), etc.' },
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'El pozo infinito es donde Griffiths muestra por primera vez la cuantización emergiendo de las condiciones de frontera. La lección se repite: el oscilador la obtiene por el método algebraico (E_n = (n+½)ℏω); el pozo finito por una ecuación trascendental; el delta por una condición sobre el salto de la derivada.' },
    ],
    layer5Check: [
      {
        id: 'c2-quant-q1',
        question: [{ kind: 'p', text: '¿De dónde proviene la cuantización de la energía?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Es un postulado añadido a la teoría.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Emerger de las condiciones físicas (frontera, normalización, decaimiento asintótico) que solo se satisfacen para valores discretos de E.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Proviene de la incertidumbre de Heisenberg.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'La cuantización no se postula: sobreviene. Al imponer que la solución general cumpla las condiciones físicas, el sistema homogéneo para las constantes solo tiene solución no trivial para ciertos E. Esos son los valores permitidos.' }],
        conceptId: 'c2-quantization',
      },
    ],
    related: ['c2-bound-vs-scattering', 'c2-infinite-well', 'c2-finite-well'],
    prerequisites: ['c2-bound-vs-scattering'],
  },

  {
    id: 'c2-continuity',
    chapterId: 'ch2',
    sectionId: '2.1',
    title: 'Condiciones de continuidad y salto de la derivada',
    subtitle: 'Qué se exige en una frontera y por qué, según sea V finito o infinito',
    order: 6,
    tags: ['frontera', 'continuidad', 'salto de derivada'],
    layer1Intuition: [
      { kind: 'p', text: 'En una frontera entre regiones, la función de onda no puede tener un salto: si lo tuviera, su derivada sería infinita (un delta) y la TISE lo prohibiría si V es finito. Por eso ψ debe ser continua. La derivada, en cambio, puede dar un salto solo si V es singular (un delta); si V es finito, la derivada también es continua.' },
    ],
    layer2Math: [
      { kind: 'p', text: 'Si V tiene una discontinuidad finita en x = x₀, integrando la TISE en un entorno infinitesimal:' },
      { kind: 'math-block', tex: '\\int_{x_0-\\epsilon}^{x_0+\\epsilon} \\frac{d^2\\psi}{dx^2}\\,dx = \\frac{2m}{\\hbar^2}\\int_{x_0-\\epsilon}^{x_0+\\epsilon}(V-E)\\psi\\,dx.' },
      { kind: 'p', text: 'Si V es finito, la integral de la derecha tiende a 0 con ε, así que ψ\' es continua:' },
      { kind: 'eq-row', label: 'V finito', tex: '\\psi\\,\\text{cont.}, \\quad \\psi\'\\,\\text{cont.}' },
      { kind: 'p', text: 'Si V = α·δ(x) (delta), la integral da un contributo finito:' },
      { kind: 'eq-row', label: 'V delta', tex: '\\psi\\,\\text{cont.}, \\quad \\psi\'(0^+) - \\psi\'(0^-) = \\frac{2m\\alpha}{\\hbar^2}\\,\\psi(0).' },
    ],
    layer3Interpretation: [
      { kind: 'p', text: 'La continuidad de ψ expresa que la probabilidad no puede "saltar" de un punto a otro: la densidad de probabilidad varía de forma suave. El salto de la derivada para el delta refleja que el potencial ejerce un "empujón" puntual infinito, que cambia bruscamente el momento local de la onda.' },
      { kind: 'callout', tone: 'warn', title: 'Cuidado con el pozo infinito', blocks: [
        { kind: 'p', text: 'Si V = ∞ fuera del pozo, ψ debe anularse en la frontera (no hay probabilidad fuera). Ahí ψ es continua pero ψ\' no: el salto es "permitido" porque V es infinito y el argumento de integración no aplica.' },
      ]},
    ],
    layer4Griffiths: [
      { kind: 'p', text: 'Estas condiciones aparecen en cada frontera del capítulo: en el pozo infinito (ψ=0), en el pozo finito (ψ y ψ\' continuas en las paredes), en el delta (ψ continua y derivada con salto), en el escalón y la barrera (continuidad de ψ y ψ\' en cada cambio).' },
    ],
    layer5Check: [
      {
        id: 'c2-cont-q1',
        question: [{ kind: 'p', text: 'Para un potencial V finito con una discontinuidad a trozos, ¿qué debe ser continuo en la frontera?' }],
        options: [
          { id: 'a', text: [{ kind: 'p', text: 'Solo ψ.' }] },
          { id: 'b', text: [{ kind: 'p', text: 'Tanto ψ como su derivada ψ\'.' }] },
          { id: 'c', text: [{ kind: 'p', text: 'Ninguno necesariamente.' }] },
        ],
        correctId: 'b',
        explanation: [{ kind: 'p', text: 'Si V es finito, la integral de la TISE en torno a la frontera tiende a 0 con el ancho, lo que obliga a ψ\' continua además de ψ continua. Solo cuando V es singular (delta) la derivada puede dar un salto finito.' }],
        conceptId: 'c2-continuity',
      },
    ],
    related: ['c2-oscillatory-vs-exponential', 'c2-quantization', 'c2-delta'],
    prerequisites: ['c2-tise'],
  },
]

export function getConceptsForSection(sectionId: string) {
  return CONCEPTS.filter(c => c.sectionId === sectionId).sort((a, b) => a.order - b.order)
}
export function getConcept(id: string) {
  return CONCEPTS.find(c => c.id === id)
}
