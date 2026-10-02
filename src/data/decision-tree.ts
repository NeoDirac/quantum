import type { DecisionNode } from '@/lib/content-types'

// Árbol de decisión para problemas de mecánica cuántica del capítulo 2.
// Cada nodo pregunta algo y explica POR QUÉ esa decisión importa.
// Contenido original escrito para esta plataforma.

export const DECISION_TREE: DecisionNode[] = [
  {
    id: 'start',
    question: '¿El potencial V(x) depende explícitamente del tiempo?',
    why: [
      { kind: 'p', text: 'Si V depende del tiempo, la ecuación de Schrödinger no se separa en variables y la maquinaria de "estados estacionarios" no aplica directamente (haría falta teoría de perturbaciones dependiente del tiempo, cap. 9).' },
      { kind: 'p', text: 'Todo el capítulo 2 supone V = V(x): el caso más común y el que abre la puerta a la separación.' },
    ],
    branches: [
      { label: 'Sí, V depende de t', goto: 'time-dependent', note: [{ kind: 'p', text: 'Fuera del alcance del capítulo 2.' }] },
      { label: 'No, V = V(x)', goto: 'separable' },
    ],
  },
  {
    id: 'separable',
    question: '¿El espacio se divide en regiones con V distinto?',
    why: [
      { kind: 'p', text: 'Si V es a trozos (constante en cada región), resuelves la TISE en cada región por separado y luego emparejas con continuidad. Si V varía suavemente (oscilador), no hay regiones y usas otro método (álgebra o serie de potencias).' },
    ],
    branches: [
      { label: 'Sí, hay regiones', goto: 'regions' },
      { label: 'No, V varía suavemente', goto: 'smooth' },
    ],
  },
  {
    id: 'smooth',
    question: '¿Conoces el potencial (forma explícita) o solo aproximaciones?',
    why: [
      { kind: 'p', text: 'Para el oscilador (V parabólico) hay método algebraico exacto. Para potenciales suaves generales, se usa la aproximación WKB (capítulo 8) o métodos numéricos.' },
    ],
    branches: [
      { label: 'Es un oscilador armónico', goto: 'ho-algebraic' },
      { label: 'Otro potencial suave', goto: 'wkb', note: [{ kind: 'p', text: 'Fuera del capítulo 2 (WKB, cap. 8).' }] },
    ],
  },
  {
    id: 'ho-algebraic',
    question: '¿Qué método prefieres para el oscilador?',
    why: [
      { kind: 'p', text: 'El analítico resuelve la EDO por serie de potencias; el algebraico usa operadores a, a†. El algebraico es más rápido para el espectro y los valores esperados; el analítico da la forma explícita de ψ_n (Hermite).' },
    ],
    branches: [
      { label: 'Algebraico (a, a†)', goto: 'ho-steps' },
      { label: 'Analítico (Hermite)', goto: 'ho-steps' },
    ],
  },
  {
    id: 'ho-steps',
    question: 'Método resuelto. ¿Qué buscas?',
    why: [
      { kind: 'p', text: 'El oscilador está resuelto: E_n = ℏω(n+½) y ψ_n(x) = (constante)·H_n(ξ)·e^{-ξ²/2}. Lo que queda es decidir qué calcular: expectación, probabilidad, evolución, transiciones.' },
    ],
    branches: [
      { label: 'Valores esperados ⟨x⟩, ⟨p⟩', goto: 'terminal-expectations' },
      { label: 'Probabilidad en una región', goto: 'terminal-integrate' },
      { label: 'Evolución temporal de una superposición', goto: 'terminal-evolution' },
    ],
  },
  {
    id: 'regions',
    question: 'En cada región, ¿qué signo tiene E − V?',
    why: [
      { kind: 'p', text: 'El signo decide la forma de la solución. E > V → oscilatoria (senos/cosenos). E < V → exponenciales reales (decrecimiento/crecimiento). Es la pregunta más importante al mirar un problema.' },
    ],
    branches: [
      { label: 'E > V en todas las regiones', goto: 'all-allowed' },
      { label: 'E < V en algunas regiones', goto: 'some-forbidden' },
    ],
  },
  {
    id: 'all-allowed',
    question: '¿La onda se extiende a infinito en ambos lados?',
    why: [
      { kind: 'p', text: 'Si toda región está permitida y la onda ocupa todo el eje, es un problema de dispersión (no hay confinamiento). Las condiciones asintóticas serán "onda incidente + reflejada" de un lado y "transmitida" del otro.' },
    ],
    branches: [
      { label: 'Sí (dispersión)', goto: 'scattering' },
      { label: 'No, hay regiones prohibidas', goto: 'some-forbidden' },
    ],
  },
  {
    id: 'some-forbidden',
    question: '¿La partícula está confinada (ligada) o viene de lejos (dispersión)?',
    why: [
      { kind: 'p', text: 'Ligado: ψ → 0 en ±∞; las regiones prohibidas son las "paredes" que confinan; energías discretas. Dispersión: la partícula llega del infinito; ψ tiene onda incidente/reflejada/transmitida; energía continua.' },
    ],
    branches: [
      { label: 'Ligada (confinada)', goto: 'bound' },
      { label: 'Dispersión (incidente)', goto: 'scattering' },
    ],
  },
  {
    id: 'bound',
    question: '¿Qué tipo de frontera tienes?',
    why: [
      { kind: 'p', text: 'Las condiciones de frontera determinan el cálculo. V = ∞ fuera: ψ = 0 en las paredes. V finito fuera: ψ y ψ\' continuas en las paredes, con decaimiento exponencial fuera. V = -αδ: salto de derivada.' },
    ],
    branches: [
      { label: 'Paredes infinitas (ψ=0)', goto: 'terminal-infinite' },
      { label: 'Paredes finitas (continuidad)', goto: 'terminal-finite' },
      { label: 'Pozo delta (salto de derivada)', goto: 'terminal-delta-bound' },
    ],
  },
  {
    id: 'scattering',
    question: '¿Qué potencial dispersa?',
    why: [
      { kind: 'p', text: 'El método es el mismo (emparejar ψ y ψ\' en cada frontera, comparar corrientes). Lo que cambia es el número de regiones y si hay continuidad o salto de derivada.' },
    ],
    branches: [
      { label: 'Escalón (un solo cambio de V)', goto: 'terminal-step' },
      { label: 'Barrera rectangular', goto: 'terminal-barrier' },
      { label: 'Pozo finito en dispersión', goto: 'terminal-well-scattering' },
      { label: 'Barrera/pozo delta', goto: 'terminal-delta-scattering' },
      { label: 'Deseas marco general', goto: 'terminal-s-matrix' },
    ],
  },
  {
    id: 'time-dependent',
    question: 'V depende del tiempo: fuera del capítulo 2.',
    why: [
      { kind: 'p', text: 'Necesitas teoría de perturbaciones dependiente del tiempo (cap. 9) o, para V arbitrario, métodos numéricos. Aquí no se separa en estados estacionarios.' },
    ],
    terminal: {
      action: [{ kind: 'p', text: 'Aplica teoría de perturbaciones dependiente del tiempo o métodos numéricos (cap. 9 y 10).' }],
      why: [{ kind: 'p', text: 'La separación de variables requiere V independiente del tiempo.' }],
    },
  },
  {
    id: 'wkb',
    question: 'Potencial suave genérico: usa WKB.',
    why: [
      { kind: 'p', text: 'Cuando V varía suavemente y no es uno de los casos resolubles exactamente, la aproximación WKB (semiclásica) da ψ y los niveles aproximados.' },
    ],
    terminal: {
      action: [{ kind: 'p', text: 'Aplica WKB con las fórmulas de conexión (capítulo 8).' }],
      why: [{ kind: 'p', text: 'No existe solución analítica cerrada para V arbitrario.' }],
    },
  },
  {
    id: 'terminal-expectations',
    question: 'Valores esperados en el oscilador',
    why: [{ kind: 'p', text: 'Usa x = √(ℏ/2mω)(a + a†) y p = i√(mωℏ/2)(a† − a), y las reglas a|n⟩ = √n|n−1⟩, a†|n⟩ = √(n+1)|n+1⟩.' }],
    terminal: {
      action: [{ kind: 'p', text: 'Escribe x y p en términos de a, a† y aplica las reglas de ascenso/descenso. La mayor parte de los términos se anulan por ortonormalidad.' }],
      why: [{ kind: 'p', text: 'El método algebraico evita integrales explícitas con Hermite.' }],
    },
  },
  {
    id: 'terminal-integrate',
    question: 'Probabilidad en una región',
    why: [{ kind: 'p', text: 'Integra |ψ_n|² en la región. Para el oscilador, usa los polinomios de Hermite y, si es necesario, relaciones de recurrencia.' }],
    terminal: {
      action: [{ kind: 'p', text: 'Calcula ∫|ψ_n|²dx en los límites pedidos.' }],
      why: [{ kind: 'p', text: 'La probabilidad de encontrar la partícula en [x₁, x₂] es la integral de la densidad.' }],
    },
  },
  {
    id: 'terminal-evolution',
    question: 'Evolución temporal',
    why: [{ kind: 'p', text: 'Expande Ψ(x,0) en {ψ_n}, halla c_n por proyección, y suma con las fases e^{-iE_n t/ℏ}.' }],
    terminal: {
      action: [{ kind: 'p', text: 'Ψ(x,t) = Σ c_n ψ_n(x) e^{-iE_n t/ℏ}, con c_n = ∫ψ_n* Ψ(x,0) dx.' }],
      why: [{ kind: 'p', text: 'Cada modo estacionario gira a su frecuencia; la superposición evoluciona por interferencia.' }],
    },
  },
  {
    id: 'terminal-infinite',
    question: 'Pozo infinito: ψ=0 en las paredes',
    why: [{ kind: 'p', text: 'Imponer ψ(0)=ψ(a)=0 sobre ψ = A sin(kx) + B cos(kx) fuerza B=0 y k·a=nπ, de donde E_n = n²π²ℏ²/(2ma²).' }],
    terminal: {
      action: [{ kind: 'p', text: 'Impon ψ=0 en las paredes; obtén k_n y E_n; normaliza.' }],
      why: [{ kind: 'p', text: 'V = ∞ fuera ⟹ ψ se anula en la frontera; eso cuantiza k y, con él, E.' }],
    },
  },
  {
    id: 'terminal-finite',
    question: 'Pozo finito: continuidad en las paredes',
    why: [{ kind: 'p', text: 'Dentro: senos/cosenos. Fuera: exponenciales que decaen. Empareja ψ y ψ\' en x=±a; usa paridad para separar casos par/impar; resuelve la trascendental.' }],
    terminal: {
      action: [{ kind: 'p', text: 'Escribe ψ en cada región, aplica paridad, empata ψ y ψ\' en ±a, resuelve κ = l·tan(la) (par) o κ = -l·cot(la) (impar) con l²+κ² = 2mV₀/ℏ².' }],
      why: [{ kind: 'p', text: 'V finito exige continuidad de ψ y de ψ\'; la condición de empate sobredetermina y solo se satisface para energías discretas.' }],
    },
  },
  {
    id: 'terminal-delta-bound',
    question: 'Pozo delta ligado',
    why: [{ kind: 'p', text: 'ψ = √κ·e^{-κ|x|}; el salto de derivada da κ = mα/ℏ² y E = -mα²/(2ℏ²). Un solo ligado.' }],
    terminal: {
      action: [{ kind: 'p', text: 'Escribe ψ exponencial simétrica, aplica continuidad + salto de derivada en x=0.' }],
      why: [{ kind: 'p', text: 'El delta es singular: la derivada salta, pero ψ es continua. Una sola condición de empate basta.' }],
    },
  },
  {
    id: 'terminal-step',
    question: 'Escalón de potencial',
    why: [{ kind: 'p', text: 'Una sola frontera en x=0: izquierda V=0, derecha V=V₀. Para E>V₀ hay transmisión (con k\' ≠ k); para E<V₀ hay reflexión total con penetración (túnel parcial).' }],
    terminal: {
      action: [{ kind: 'p', text: 'Empareja ψ y ψ\' en x=0; calcula R y T comparando corrientes.' }],
      why: [{ kind: 'p', text: 'Es el problema de dispersión más simple con cambio de k entre regiones.' }],
    },
  },
  {
    id: 'terminal-barrier',
    question: 'Barrera rectangular',
    why: [{ kind: 'p', text: 'Tres regiones: izquierda (incidente+reflejada), centro (exponencial o seno según E vs V₀), derecha (transmitida). Para E<V₀ hay efecto túnel con T ∝ e^{-2κ·ancho}.' }],
    terminal: {
      action: [{ kind: 'p', text: 'Escribe ψ en las 3 regiones, empata ψ y ψ\' en las dos fronteras, despeja T.' }],
      why: [{ kind: 'p', text: 'La barrera finita siempre admite transmisión parcial: la onda penetra y sale al otro lado.' }],
    },
  },
  {
    id: 'terminal-well-scattering',
    question: 'Pozo finito en dispersión (E > V₀)',
    why: [{ kind: 'p', text: 'Mismo pozo que en ligado, pero ahora E > V₀: fuera y dentro son oscilatorias con k distintos. Hay resonancias (T=1) a energías especiales.' }],
    terminal: {
      action: [{ kind: 'p', text: 'Empareja ψ y ψ\' en ±a con ondas oscilatorias; calcula R y T.' }],
      why: [{ kind: 'p', text: 'El mismo pozo puede ligar (E<V₀) o dispersar (E>V₀): el régimen lo decide E relativo a V₀.' }],
    },
  },
  {
    id: 'terminal-delta-scattering',
    question: 'Dispersión delta',
    why: [{ kind: 'p', text: 'Mismo k a ambos lados (V=0 fuera del punto). Empareja ψ continua y derivada con salto en x=0; despeja B y C en términos de A.' }],
    terminal: {
      action: [{ kind: 'p', text: 'ψ(0) continua; ψ\'(0⁺) − ψ\'(0⁻) = (2mα/ℏ²)ψ(0). T = 1/[1 + (mα/ℏ²k)²].' }],
      why: [{ kind: 'p', text: 'Una sola frontera puntual: la condición de salto resume todo el efecto del potencial.' }],
    },
  },
  {
    id: 'terminal-s-matrix',
    question: 'Marco S-matrix',
    why: [{ kind: 'p', text: 'Encapsula dispersión genérica: ondas salientes = S · ondas entrantes. Útil para combinar obstáculos o aplicar simetrías.' }],
    terminal: {
      action: [{ kind: 'p', text: 'Construye S 2×2; aplica unitariedad (S†S=I) y simetría (si V es par).' }],
      why: [{ kind: 'p', text: 'Resume toda la respuesta de dispersión en una matriz; sus propiedades dan relaciones R+T=1 y otras.' }],
    },
  },
]

export function getDecisionNode(id: string) {
  return DECISION_TREE.find(n => n.id === id)
}
