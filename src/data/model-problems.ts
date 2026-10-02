import type { ModelProblem } from '@/lib/content-types'

// "¿Qué está haciendo Griffiths?" — análisis del objetivo y método de cada problema modelo.
// Contenido original escrito para esta plataforma, organizado por la estructura del capítulo.

export const MODEL_PROBLEMS: ModelProblem[] = [
  {
    id: 'mp-infinite-well',
    sectionId: '2.2',
    title: 'Pozo cuadrado infinito',
    potential: 'V = 0 en (0,a), V = ∞ fuera',
    regime: 'bound',
    goal: [
      { kind: 'p', text: 'Mostrar de la forma más simple cómo la cuantización de la energía emerge de las condiciones de frontera, y construir la base {ψ_n} sobre la que se expresa cualquier estado.' },
    ],
    given: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'Un potencial V(x) constante a trozos: 0 dentro, ∞ fuera.' }],
        [{ kind: 'p', text: 'La TISE ya derivada de la separación de variables.' }],
        [{ kind: 'p', text: 'El conocimiento de que ψ debe anularse donde V = ∞.' }],
      ]},
    ],
    find: [
      { kind: 'p', text: 'Las energías permitidas E_n y las funciones ψ_n(x), y la forma de la solución general por superposición.' },
    ],
    methodWhy: [
      { kind: 'p', text: 'Es el potencial más simple donde la onda está confinada con un confinamiento "duro". La simplicidad deja ver, sin distracciones, el mecanismo de la cuantización. Otros potenciales complican el álgebra pero no la idea.' },
    ],
    equations: [
      { kind: 'p', text: 'Dentro: ψ\'\' = -k²ψ con k² = 2mE/ℏ². Fuera: ψ = 0 (no hay probabilidad fuera).' },
    ],
    conditions: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'ψ(0) = 0 y ψ(a) = 0 (de V = ∞ fuera).' }],
        [{ kind: 'p', text: 'Normalización: ∫₀ᵃ |ψ|² dx = 1.' }],
        [{ kind: 'p', text: 'No se exige continuidad de ψ\' (V infinito la rompe).' }],
      ]},
    ],
    result: [
      { kind: 'math-block', tex: 'E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2 m a^2}, \\quad \\psi_n(x) = \\sqrt{\\frac{2}{a}}\\sin\\!\\left(\\frac{n\\pi x}{a}\\right), \\quad n=1,2,3,\\dots' },
    ],
    meaning: [
      { kind: 'p', text: 'La energía solo toma una familia discreta: no cualquier valor es permitido. La onda "encaja" en el pozo con un número entero de medios-arcos. La energía mínima no es cero (energía del punto cero).' },
    ],
    generalize: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'El patrón "solución general → condiciones físicas → cuantización" se repite en todos los demás potenciales.' }],
        [{ kind: 'p', text: 'Cualquier confinamiento produce un espectro discreto; cuanto más "duro", más estados.' }],
        [{ kind: 'p', text: 'La superposición sobre {ψ_n} construye la solución general, en cualquier problema ligado.' }],
      ]},
    ],
  },
  {
    id: 'mp-harmonic-oscillator',
    sectionId: '2.3',
    title: 'Oscilador armónico (método algebraico)',
    potential: 'V = ½mω²x²',
    regime: 'bound',
    goal: [
      { kind: 'p', text: 'Resolver el espectro de un potencial suave y universal, y mostrar que se puede hacer sin resolver la EDO de forma explícita: el método algebraico con operadores de escalada.' },
    ],
    given: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'Un potencial V(x) suave (no a trozos) y parabólico.' }],
        [{ kind: 'p', text: 'La TISE.' }],
        [{ kind: 'p', text: 'El conocimiento de las relaciones de conmutación [x, p] = iℏ.' }],
      ]},
    ],
    find: [
      { kind: 'p', text: 'Las energías E_n y los estados |n⟩, usando operadores a, a† que suben y bajan n.' },
    ],
    methodWhy: [
      { kind: 'p', text: 'El método algebraico reorganiza el Hamiltoniano en términos de a†a (el "número de cuantos"). Las relaciones de conmutación sustituyen al cálculo explícito de la EDO: cada aplicación de a† sube en un cuanto de energía ℏω, y a lo baja. Se obtiene el espectro sin integrales.' },
    ],
    equations: [
      { kind: 'math-block', tex: 'a = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(x + \\frac{i p}{m\\omega}\\right), \\quad \\hat{H} = \\hbar\\omega\\left(a^\\dagger a + \\tfrac12\\right), \\quad [a, a^\\dagger] = 1.' },
    ],
    conditions: [
      { kind: 'p', text: 'No hay frontera explícita (V → ∞ cuando |x| → ∞, así que ψ se anula suavemente en el infinito por normalizabilidad). El estado fundamental se fija con a|0⟩ = 0 (no puede bajarse más).' },
    ],
    result: [
      { kind: 'math-block', tex: 'E_n = \\hbar\\omega\\left(n + \\tfrac12\\right), \\quad |n\\rangle = \\frac{(a^\\dagger)^n}{\\sqrt{n!}}\\,|0\\rangle, \\quad n=0,1,2,\\dots' },
    ],
    meaning: [
      { kind: 'p', text: 'El espectro es discreto y uniformemente espaciado: cada nivel está separado del anterior por un cuanto ℏω. La energía mínima ½ℏω es la del punto cero. Los cuantos son los "ladrillos" del estado (un modelo simplificado de lo que luego serán fotones).' },
    ],
    generalize: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'El método algebraico se traslada a otros sistemas con espectro igualmente espaciado (momento angular, campo electromagnético cuantizado).' }],
        [{ kind: 'p', text: 'Cualquier potencial con mínimo estable se aproxima localmente por un oscilador: el espectro cerca del mínimo es siempre de esa forma.' }],
      ]},
    ],
  },
  {
    id: 'mp-free-particle',
    sectionId: '2.4',
    title: 'Partícula libre (paquete de onda)',
    potential: 'V = 0 en todo el eje',
    regime: 'scattering',
    goal: [
      { kind: 'p', text: 'Mostrar qué pasa sin confinamiento: no hay estados ligados normalizables, y el estado físico es un paquete construido por superposición de ondas planas (Fourier).' },
    ],
    given: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'V = 0 en todo el espacio (sin regiones).' }],
        [{ kind: 'p', text: 'Un estado inicial Ψ(x,0) localizado y normalizable.' }],
      ]},
    ],
    find: [
      { kind: 'p', text: 'Ψ(x,t) y la velocidad a la que se desplaza y se ensancha el paquete.' },
    ],
    methodWhy: [
      { kind: 'p', text: 'Las ondas planas no son normalizables, pero forman una base continua. Cualquier estado normalizable se expresa como integral (no suma) sobre k. La evolución de cada onda plana es trivial (fase); la evolución del paquete resulta de integrar las fases.' },
    ],
    equations: [
      { kind: 'math-block', tex: '\\Psi(x,t) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} \\phi(k)\\,e^{i(kx - \\omega t)}\\,dk, \\quad \\phi(k) = \\frac{1}{\\sqrt{2\\pi}}\\int \\Psi(x,0)\\,e^{-ikx}\\,dx.' },
    ],
    conditions: [
      { kind: 'p', text: 'Normalización por Parseval: ∫|Ψ|²dx = ∫|φ(k)|²dk = 1. No se exigen condiciones de frontera (no hay regiones).' },
    ],
    result: [
      { kind: 'p', text: 'El paquete se desplaza con velocidad de grupo v_g = ℏk₀/m y se ensancha con el tiempo por la dispersión de velocidades de fase.' },
    ],
    meaning: [
      { kind: 'p', text: 'Sin confinamiento no hay cuantización: el momento (y la energía) son continuos. La partícula localizada es, sorprendentemente, una superposición de ondas planas que ocupan todo el espacio. La partícula emerge como un "pico" de interferencia constructiva.' },
    ],
    generalize: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'Cuando un problema tiene base continua de autoestados (momento, partícula libre), se usa integral de Fourier en lugar de suma discreta.' }],
        [{ kind: 'p', text: 'La velocidad de grupo recupera la velocidad clásica p/m: primer puente entre QM y mecánica clásica.' }],
      ]},
    ],
  },
  {
    id: 'mp-delta-bound',
    sectionId: '2.5',
    title: 'Pozo delta: estado ligado',
    potential: 'V = -αδ(x), α > 0',
    regime: 'bound',
    goal: [
      { kind: 'p', text: 'Encontrar el estado ligado del potencial atractivo más simple y mostrar que existe siempre que el pozo sea atractivo, sin importar lo débil que sea α.' },
    ],
    given: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'V(x) = -αδ(x) con α > 0 (pozo).' }],
        [{ kind: 'p', text: 'La condición de salto de derivada para el delta.' }],
        [{ kind: 'p', text: 'Estado ligado ⟹ E < 0 y ψ → 0 en ±∞.' }],
      ]},
    ],
    find: [
      { kind: 'p', text: 'El único estado ligado y su energía.' },
    ],
    methodWhy: [
      { kind: 'p', text: 'Como el potencial es puntual, las regiones se reducen a dos (x<0, x>0) con V=0. En cada una, ψ es exponencial (E<0). La continuidad de ψ en 0 y el salto de derivada dan una sola ecuación para κ: una condición de empate, sin trascendentes.' },
    ],
    equations: [
      { kind: 'math-block', tex: '\\psi(x) = \\sqrt{\\kappa}\\,e^{-\\kappa|x|}, \\quad \\kappa = \\frac{m\\alpha}{\\hbar^2}, \\quad E = -\\frac{m\\alpha^2}{2\\hbar^2}.' },
    ],
    conditions: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'ψ continua en 0: ψ(0⁺) = ψ(0⁻).' }],
        [{ kind: 'p', text: 'Salto de derivada: ψ\'(0⁺) − ψ\'(0⁻) = -(2mα/ℏ²)·ψ(0).' }],
        [{ kind: 'p', text: 'Decrecimiento asintótico: κ > 0.' }],
      ]},
    ],
    result: [
      { kind: 'p', text: 'Un único estado ligado con energía E = -mα²/(2ℏ²). No hay excitados.' },
    ],
    meaning: [
      { kind: 'p', text: 'Un pozo atractivo en 1D siempre liga al menos un estado, sin importar la profundidad. El delta, siendo el más concentrado, liga exactamente uno. Esto contrasta con el pozo finito, que liga más estados según V₀a².' },
    ],
    generalize: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'La técnica "salto de derivada en el delta" resuelve cualquier V con deltas: pozos/barreras puntuales o combinaciones.' }],
        [{ kind: 'p', text: 'Un atractivo suficientemente débil liga al menos un estado en 1D (teorema general).' }],
      ]},
    ],
  },
  {
    id: 'mp-delta-scattering',
    sectionId: '2.5',
    title: 'Barrera delta: dispersión',
    potential: 'V = +αδ(x), α > 0 (o pozo con E > 0)',
    regime: 'scattering',
    goal: [
      { kind: 'p', text: 'Calcular R y T para la barrera/pozo delta y mostrar que hay transmisión parcial incluso para una barrera infinitamente alta pero puntual.' },
    ],
    given: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'V = +αδ(x) (barrera) o -αδ(x) con E > 0 (pozo en dispersión).' }],
        [{ kind: 'p', text: 'Incidencia desde la izquierda: onda incidente A·e^{ikx}, reflejada B·e^{-ikx}, transmitida C·e^{ikx}.' }],
      ]},
    ],
    find: [
      { kind: 'p', text: 'R = |B|²/|A|² y T = |C|²/|A|² (aquí k es igual a ambos lados).' },
    ],
    methodWhy: [
      { kind: 'p', text: 'En dispersión, las regiones (x<0, x>0) tienen V=0 y la misma k. La diferencia con el estado ligado es que ahora E>0 y las ondas son oscilatorias (no exponenciales). El salto de derivada da una relación entre A, B, C.' },
    ],
    equations: [
      { kind: 'math-block', tex: 'T = \\frac{1}{1 + (m\\alpha/\\hbar^2 k)^2}, \\quad R = 1 - T.' },
    ],
    conditions: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'ψ continua en 0.' }],
        [{ kind: 'p', text: 'Salto de derivada ψ\'(0⁺) − ψ\'(0⁻) = (2mα/ℏ²)ψ(0) (signo según barrera/pozo).' }],
        [{ kind: 'p', text: 'Solo onda transmitida a +∞ (no viene nada de la derecha).' }],
      ]},
    ],
    result: [
      { kind: 'p', text: 'A k grande (alta energía), T → 1: la barrera se vuelve transparente. A k pequeño, T → 0: casi todo se refleja.' },
    ],
    meaning: [
      { kind: 'p', text: 'Una barrera infinitamente alta pero puntual sigue permitiendo paso: lo que importa es el "área" α, no solo la altura. La reflexión no es total salvo en el límite k → 0.' },
    ],
    generalize: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'Cualquier barrera finita en extensión y altura admite transmisión parcial (efecto túnel).' }],
        [{ kind: 'p', text: 'La comparación de corrientes (R+T=1) es la firma de la conservación de probabilidad.' }],
      ]},
    ],
  },
  {
    id: 'mp-finite-well',
    sectionId: '2.6',
    title: 'Pozo cuadrado finito: estados ligados',
    potential: 'V = 0 en |x| < a, V = V₀ > 0 fuera',
    regime: 'both',
    goal: [
      { kind: 'p', text: 'Mostrar la técnica general para pozos a trozos con paredes finitas: combinar regiones, usar paridad y obtener una ecuación trascendental que se resuelve gráficamente.' },
    ],
    given: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'V par, a trozos, con valor finito V₀ fuera.' }],
        [{ kind: 'p', text: 'Estado ligado: 0 < E < V₀, ψ → 0 en ±∞.' }],
      ]},
    ],
    find: [
      { kind: 'p', text: 'Las energías permitidas y los ψ (pares e impares).' },
    ],
    methodWhy: [
      { kind: 'p', text: 'Como V es par, los autoestados tienen paridad definida. Eso reduce el problema a la mitad: par (cosenos dentro) o impar (senos dentro). Cada caso da una condición trascendental al emparejar ψ y ψ\' en la pared x = a. Las energías son los cruces de esa curva con la restricción l²+κ² = const.' },
    ],
    equations: [
      { kind: 'math-block', tex: '\\text{Par:}\\ \\kappa = l\\tan(la); \\qquad \\text{Impar:}\\ \\kappa = -l\\cot(la); \\qquad l^2 + \\kappa^2 = \\frac{2m V_0}{\\hbar^2}.' },
    ],
    conditions: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'ψ y ψ\' continuas en x = ±a (V finito).' }],
        [{ kind: 'p', text: 'Decaimiento asintótico: ψ → 0 en ±∞.' }],
        [{ kind: 'p', text: 'Paridad definida (par o impar).' }],
      ]},
    ],
    result: [
      { kind: 'p', text: 'Un número finito de estados ligados que crece con V₀a². En el límite V₀ → ∞ se recuperan los infinitos estados del pozo infinito.' },
    ],
    meaning: [
      { kind: 'p', text: 'La onda penetra la región prohibida: la probabilidad de encontrar la partícula fuera del pozo no es cero. Esto es la base del efecto túnel.' },
    ],
    generalize: [
      { kind: 'list', items: [
        [{ kind: 'p', text: 'La técnica "regiones + continuidad + trascendental" es el método de referencia para cualquier potencial a trozos.' }],
        [{ kind: 'p', text: 'La paridad siempre que V sea par simplifica: clasificar en par/impar reduce el álgebra.' }],
        [{ kind: 'p', text: 'Para E > V₀ el mismo pozo da scattering: aparecen R y T.' }],
      ]},
    ],
  },
]

export function getModelProblemsForSection(sectionId: string) {
  return MODEL_PROBLEMS.filter(m => m.sectionId === sectionId)
}
