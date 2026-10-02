import type { Exercise } from '@/lib/content-types'

// Phase 10 exercises: probabilistic interpretation (2.1), expansion coefficients (2.2),
// WKB intro (2.3), phase shift analysis (2.7).
// All content original to this platform.

export const EXERCISES_PHASE10: Exercise[] = [
  // ===================== 2.1 — Probabilistic interpretation =====================
  {
    id: 'ex-2-1f',
    sectionId: '2.1',
    conceptIds: ['c2-stationary-states-meaning'],
    title: 'Interpretación probabilística y conservación',
    difficulty: 1,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'La interpretación de Born dice que |Ψ(x,t)|² es la densidad de probabilidad de encontrar la partícula en x. Demuestra que la ecuación de continuidad ∂|Ψ|²/∂t + ∂J/∂x = 0 garantiza que la probabilidad total ∫|Ψ|²dx se conserva (es constante en el tiempo).' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué es la corriente de probabilidad J?' }],
        accept: ['flujo', 'j', 'ℏ/2mi', 'corriente'],
        why: [{ kind: 'p', text: 'J es el "flujo" de probabilidad: cuánta pasa por unidad de tiempo por un punto. La ecuación de continuidad conecta cambios de densidad con flujos: es la conservación local.' }],
        reveal: [{ kind: 'p', text: 'J = (ℏ/2mi)(Ψ*∂Ψ/∂x − Ψ∂Ψ*/∂x). Es el flujo de probabilidad: cuánta pasa por un punto por unidad de tiempo.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Ec. de continuidad: ∂|Ψ|²/∂t + ∂J/∂x = 0. Es conservación local: cambios de densidad = flujos.' }] },
      { blocks: [{ kind: 'p', text: 'Integra en todo el espacio: d/dt ∫|Ψ|²dx = -∫∂J/∂x dx = -[J(∞)-J(-∞)] = 0 (J→0 en infinito para ψ normalizable).' }] },
      { blocks: [{ kind: 'p', text: 'Así ∫|Ψ|²dx = constante = 1 (si normalizada). La probabilidad total se conserva.' }] },
      { blocks: [{ kind: 'p', text: 'Físicamente: la probabilidad no se crea ni se destruye, solo fluye de un lugar a otro.' }] },
      { blocks: [{ kind: 'p', text: 'Para estados estacionarios: J=0 (fase pura), así que |Ψ|² es estático. Para superposiciones: J≠0, hay flujo.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Ecuación de continuidad',
        what: [{ kind: 'p', text: 'Escribimos la ecuación de continuidad.' }],
        why: [{ kind: 'p', text: 'Se deriva de la ecuación de Schrödinger: ∂|Ψ|²/∂t + ∂J/∂x = 0. Es la conservación local de probabilidad.' }],
        meaning: [{ kind: 'p', text: 'Los cambios de densidad de probabilidad en un punto se compensan con flujos: la probabilidad "se mueve" pero no se crea ni se destruye.' }],
        info: [{ kind: 'p', text: 'Es análoga a la ecuación de continuidad de fluidos o electromagnetismo: ρ y J son la densidad y corriente de probabilidad.' }],
        whatIf: [{ kind: 'p', text: 'Si V tuviera parte imaginaria (potencial no hermítico), la ecuación de continuidad se modificaría: habría "fuente" o "sumidero" de probabilidad.' }],
        math: [{ kind: 'math-block', tex: '\\frac{\\partial |\\Psi|^2}{\\partial t} + \\frac{\\partial J}{\\partial x} = 0, \\quad J = \\frac{\\hbar}{2mi}\\left(\\Psi^*\\frac{\\partial \\Psi}{\\partial x} - \\Psi\\frac{\\partial \\Psi^*}{\\partial x}\\right).' }],
      },
      {
        id: 's2', label: 'Integrar en todo el espacio',
        what: [{ kind: 'p', text: 'Integramos para obtener la conservación global.' }],
        why: [{ kind: 'p', text: 'Integrando ∂|Ψ|²/∂t + ∂J/∂x = 0 en [-∞,∞]: el primer término da d/dt∫|Ψ|²dx; el segundo da -[J(∞)-J(-∞)] por el teorema fundamental del cálculo.' }],
        meaning: [{ kind: 'p', text: 'Para ψ normalizable, J→0 en ±∞ (la onda se anula). Así d/dt∫|Ψ|²dx = 0: la probabilidad total es constante.' }],
        info: [{ kind: 'p', text: 'La normalización (∫|Ψ|²=1) es consistente: si la integral es constante y vale 1 en t=0, vale 1 siempre.' }],
        whatIf: [{ kind: 'p', text: 'Para ondas de scattering (no normalizables), J no se anula en infinito: hay flujo neto. La "probabilidad" se interpreta como razón de flujos (R, T).' }],
        math: [{ kind: 'math-block', tex: '\\frac{d}{dt}\\int_{-\\infty}^{\\infty} |\\Psi|^2 dx = -[J(+\\infty) - J(-\\infty)] = 0 \\quad (J \\to 0 \\text{ en } \\pm\\infty).' }],
      },
      {
        id: 's3', label: 'Estados estacionarios: J=0',
        what: [{ kind: 'p', text: 'Comentamos el caso estacionario.' }],
        why: [{ kind: 'p', text: 'Para Ψ=ψ·e^{-iEt/ℏ}, la fase es pura: Ψ*∂Ψ/∂x = ψ*ψ\'·e^{0} (la fase se cancela). Así J = (ℏ/m)Im(ψ*ψ\') que es real pero puede ser 0 si ψ es real (como en pozos ligados).' }],
        meaning: [{ kind: 'p', text: 'En estados estacionarios ligados, ψ es real (se puede elegir así) → J=0 → no hay flujo de probabilidad → |Ψ|² es estático. Es la "estacionariedad" en sentido de densidad.' }],
        info: [{ kind: 'p', text: 'Para superposiciones, las fases relativas hacen que J≠0: hay flujo, la densidad evoluciona. Es la diferencia clave entre estacionario y no estacionario.' }],
        whatIf: [{ kind: 'p', text: 'En dispersión, ψ es compleja (onda incidente + reflejada): J≠0, hay flujo neto de probabilidad hacia la derecha.' }],
        math: [{ kind: 'math-block', tex: '\\Psi = \\psi\\,e^{-iEt/\\hbar} \\Rightarrow J = \\frac{\\hbar}{m}\\Im(\\psi^*\\psi\'). \\quad \\text{Si } \\psi \\text{ real: } J = 0 \\text{ (no flujo, } |\\Psi|^2 \\text{ estático).}' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'La ec. de continuidad ∂|Ψ|²/∂t + ∂J/∂x = 0 integrada en todo el espacio da d/dt∫|Ψ|²dx = -[J(∞)-J(-∞)] = 0 (J→0 en infinito para ψ normalizable). Así ∫|Ψ|²dx = constante = 1: la probabilidad se conserva. En estados estacionarios con ψ real, J=0 → densidad estática.' }],
  },

  // ===================== 2.2 — Expansion coefficients =====================
  {
    id: 'ex-2-2h',
    sectionId: '2.2',
    conceptIds: ['c2-superposition', 'c2-infinite-well'],
    title: 'Coeficientes de expansión c_n y probabilidades',
    difficulty: 2,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'En el pozo infinito, un estado inicial es Ψ(x,0) = Ax(a−x). (a) Calcula los coeficientes c_n de la expansión Ψ(x,0) = Σ c_n ψ_n(x). (b) ¿Cuál es la probabilidad de medir cada energía E_n?' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Cómo se obtienen los c_n a partir de Ψ(x,0)?' }],
        accept: ['proyección', 'integral', 'ortogonalidad', '∫ψn*ψ'],
        why: [{ kind: 'p', text: 'Los c_n son las "componentes" de Ψ en la base {ψ_n}. Se obtienen por proyección (ortonormalidad), igual que las componentes de un vector.' }],
        reveal: [{ kind: 'p', text: 'c_n = ∫ψ_n*(x) Ψ(x,0) dx. Por ortonormalidad ∫ψ_m*ψ_n = δ_{mn}, la proyección aísla cada c_n.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Normaliza primero: A = √(30/a⁵) (integral de x²(a-x)²).' }] },
      { blocks: [{ kind: 'p', text: 'c_n = A ∫₀ᵃ sin(nπx/a) x(a-x) dx. Integra por partes dos veces.' }] },
      { blocks: [{ kind: 'p', text: 'Resultado: c_n = (2√15)/(n³π³) · [1−(−1)ⁿ]. Solo n impares son no nulos (paridad de Ψ).' }] },
      { blocks: [{ kind: 'p', text: 'P(E_n) = |c_n|² = 60/(n⁶π⁶) · [1−(−1)ⁿ]². Solo impares: P(E₁)≈0.998, P(E₃)≈0.002...' }] },
      { blocks: [{ kind: 'p', text: 'El estado está casi todo en el fundamental (n=1): Ψ es suave, sin nodos, parecido a ψ₁.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Normalización',
        what: [{ kind: 'p', text: 'Calculamos A.' }],
        why: [{ kind: 'p', text: '∫₀ᵃ |A|² x²(a-x)² dx = 1. La integral es a⁵/30, así que A = √(30/a⁵).' }],
        meaning: [{ kind: 'p', text: 'A fija la escala para que la probabilidad total sea 1. Sin normalizar, los c_n no darían probabilidades correctas.' }],
        info: [{ kind: 'p', text: 'La integral ∫x²(a-x)² es estándar (polinomio): se hace expandiendo y integrando término a término.' }],
        whatIf: [{ kind: 'p', text: 'Si Ψ no fuera normalizable (p.ej. onda plana), los c_n no estarían bien definidos: se usaría delta de Dirac.' }],
        math: [{ kind: 'math-block', tex: 'A = \\sqrt{\\frac{30}{a^5}}, \\quad \\Psi(x,0) = \\sqrt{\\frac{30}{a^5}}\\,x(a-x).' }],
      },
      {
        id: 's2', label: 'Calcular c_n',
        what: [{ kind: 'p', text: 'Proyectamos sobre ψ_n.' }],
        why: [{ kind: 'p', text: 'c_n = ∫₀ᵃ ψ_n(x) Ψ(x,0) dx = A ∫₀ᵃ sin(nπx/a) x(a-x) dx. Integración por partes dos veces (la integral es de polinomio × seno).' }],
        meaning: [{ kind: 'p', text: 'Los c_n son las componentes de Ψ en la base {ψ_n}. Solo los impares son no nulos: Ψ es par respecto al centro del pozo (como ψ₁, ψ₃, ...).' }],
        info: [{ kind: 'p', text: 'La paridad de Ψ(x,0) = x(a-x) es par respecto a x=a/2 (centro del pozo): por eso solo modos pares (n impar) contribuyen.' }],
        whatIf: [{ kind: 'p', text: 'Si Ψ fuera impar respecto al centro (p.ej. x−a/2), solo los modos impares (n par) contribuirían.' }],
        math: [{ kind: 'math-block', tex: 'c_n = \\frac{2\\sqrt{15}}{n^3\\pi^3}\\,[1 - (-1)^n]. \\quad \\text{Solo n impar: } c_n = \\frac{4\\sqrt{15}}{n^3\\pi^3}.' }],
      },
      {
        id: 's3', label: 'Probabilidades |c_n|²',
        what: [{ kind: 'p', text: 'Calculamos P(E_n).' }],
        why: [{ kind: 'p', text: 'P(E_n) = |c_n|² (regla de Born). Como solo n impar sobrevive, P(E₁) domina: el estado está casi todo en el fundamental.' }],
        meaning: [{ kind: 'p', text: 'P(E₁) ≈ 0.998, P(E₃) ≈ 0.002, P(E₅) ≈ 0.0001... El estado Ψ=x(a-x) es suave y sin nodos, parecido a ψ₁: por eso está casi todo en el fundamental.' }],
        info: [{ kind: 'p', text: 'Verificación: Σ|c_n|² = 1 (suma de todas las probabilidades). Se puede comprobar numéricamente.' }],
        whatIf: [{ kind: 'p', text: 'Un estado con más estructura (p.ej. con un nodo) tendría más peso en n>1: la forma de Ψ determina la distribución de energías.' }],
        math: [{ kind: 'math-block', tex: 'P(E_n) = |c_n|^2 = \\frac{60}{n^6\\pi^6}[1-(-1)^n]^2. \\quad P(E_1) \\approx 0.998, \\; P(E_3) \\approx 0.002, \\ldots' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'A=√(30/a⁵). c_n = (2√15)/(n³π³)·[1−(−1)ⁿ] (solo n impar: c_n=4√15/(n³π³)). P(E_n)=|c_n|²=60/(n⁶π⁶)·[1−(−1)ⁿ]². P(E₁)≈0.998: el estado está casi todo en el fundamental (Ψ es suave, sin nodos, parecido a ψ₁).' }],
  },

  // ===================== 2.3 — WKB intro =====================
  {
    id: 'ex-2-3k',
    sectionId: '2.3',
    conceptIds: ['c2-harmonic-oscillator'],
    title: 'Aproximación WKB: idea y límite clásico',
    difficulty: 3,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'La aproximación WKB (Wentzel-Kramers-Brillouin) da ψ(x) ≈ A/√p(x) · exp(±i∫p dx/ℏ) para potenciales suaves, donde p(x)=√(2m(E−V(x))). Explica cuándo es válida y por qué recupera el límite clásico. ¿Por qué falla cerca de los puntos de retorno (E=V)?' },
    ],
    guided: [
      {
        id: '1',
        question: [{ kind: 'p', text: '¿Cuándo es válida la aproximación WKB?' }],
        accept: ['potencial suave', 'longitud de onda corta', 'v varía lentamente', 'λ pequeño'],
        why: [{ kind: 'p', text: 'WKB es una aproximación semiclásica: válida cuando el potencial varía lentamente respecto a la longitud de onda. Es el puente entre lo cuántico y lo clásico.' }],
        reveal: [{ kind: 'p', text: 'Válida cuando el potencial varía "lentamente" en una longitud de onda: |dλ/dx| ≪ 1 (λ cambia poco por oscillación). Equivalente: el momento p(x) cambia lentamente.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'WKB: ψ ≈ A/√p(x) · e^{±i∫p dx/ℏ}, con p(x)=√(2m(E−V)).' }] },
      { blocks: [{ kind: 'p', text: 'Válida si |dp/dx| ≪ p²/ℏ (el momento cambia poco por longitud de onda).' }] },
      { blocks: [{ kind: 'p', text: 'Recupera el clásico: la fase ∫p dx/ℏ es la acción clásica; la amplitud 1/√p refleja que la partícula pasa más tiempo donde va lenta (p pequeño).' }] },
      { blocks: [{ kind: 'p', text: 'Falla cerca de E=V (punto de retorno): p→0, 1/√p→∞ (diverge). Hay que usar fórmulas de conexión.' }] },
      { blocks: [{ kind: 'p', text: 'Las fórmulas de conexión empalman la solución oscilatoria (E>V) con la exponencial (E<V) a través del punto de retorno.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Validez de WKB',
        what: [{ kind: 'p', text: 'Identificamos cuándo aplica.' }],
        why: [{ kind: 'p', text: 'WKB asume que el potencial varía lentamente en una longitud de onda de Broglie: |dλ/dx| ≪ 1. Equivalente: |dp/dx| ≪ p²/ℏ. Es una aproximación "semiclásica" (ℏ pequeño).' }],
        meaning: [{ kind: 'p', text: 'WKB es válida cuando la partícula "ve" un potencial casi constante en cada oscilación. Para potenciales que cambian bruscamente (pozo infinito, delta), no aplica: hay que resolver exactamente.' }],
        info: [{ kind: 'p', text: 'La condición |dp/dx| ≪ p²/ℏ se llama "condición WKB". Se satisface para E muy por encima del potencial, o para potenciales muy suaves.' }],
        whatIf: [{ kind: 'p', text: 'En el límite ℏ→0, la condición se satisface siempre (p²/ℏ→∞): WKB se vuelve exacta. Es el límite clásico.' }],
        math: [{ kind: 'math-block', tex: '\\text{Válida si } \\left|\\frac{dp}{dx}\\right| \\ll \\frac{p^2}{\\hbar}, \\quad p(x) = \\sqrt{2m(E - V(x))}.' }],
      },
      {
        id: 's2', label: 'Límite clásico',
        what: [{ kind: 'p', text: 'Mostramos que recupera lo clásico.' }],
        why: [{ kind: 'p', text: 'La fase ∫p dx/ℏ es la acción clásica de Hamilton-Jacobi: la trayectoria clásica emerge del principio estacionario de esa fase. La amplitud 1/√p refleja que la partícula pasa más tiempo donde va lenta (densidad clásica ∝ 1/v).' }],
        meaning: [{ kind: 'p', text: 'WKB recupera el límite clásico de dos formas: (1) la fase es la acción clásica, (2) la amplitud es la densidad de probabilidad clásica (1/v ∝ 1/p). Es el puente cuántico→clásico.' }],
        info: [{ kind: 'p', text: 'La amplitud WKB 1/√p es la densidad clásica: en mecánica clásica, la partícula pasa más tiempo donde va lenta (p pequeño), así que la densidad de probabilidad es ∝ 1/p.' }],
        whatIf: [{ kind: 'p', text: 'En el oscilador, WKB da la misma densidad que el límite n→∞ de |ψ_n|²: la correspondencia se satisface.' }],
        math: [{ kind: 'math-block', tex: '\\psi_{\\text{WKB}} \\propto \\frac{1}{\\sqrt{p(x)}} e^{\\pm i \\int p\\,dx/\\hbar}. \\quad \\text{Fase = acción clásica; amplitud } 1/\\sqrt{p} = \\text{densidad clásica } 1/v.' }],
      },
      {
        id: 's3', label: 'Puntos de retorno',
        what: [{ kind: 'p', text: 'Explicamos por qué falla en E=V.' }],
        why: [{ kind: 'p', text: 'En el punto de retorno x_T donde E=V(x_T), p(x_T)=0. La amplitud WKB 1/√p diverge: la aproximación se rompe. Físicamente, es donde la partícula clásica se detiene y vuelve.' }],
        meaning: [{ kind: 'p', text: 'Cerca del punto de retorno, la longitud de onda se hace infinita (p→0 → λ=ℏ/p→∞), violando la condición WKB. Hay que usar "fórmulas de conexión" que empalman la solución oscilatoria (E>V) con la exponencial (E<V).' }],
        info: [{ kind: 'p', text: 'Las fórmulas de conexión de Airy son la herramienta estándar: cerca del punto de retorno, la ecuación se reduce a la de Airy, que se resuelve exactamente.' }],
        whatIf: [{ kind: 'p', text: 'Lejos del punto de retorno, WKB es buena: el problema es solo local. Las fórmulas de conexión "pegan" las soluciones a ambos lados.' }],
        math: [{ kind: 'math-block', tex: 'E = V(x_T): \\; p(x_T) = 0, \\; \\frac{1}{\\sqrt{p}} \\to \\infty. \\;\\text{Falla WKB; usar fórmulas de conexión (Airy).}' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'WKB: ψ ≈ A/√p · e^{±i∫p dx/ℏ}, válida si |dp/dx| ≪ p²/ℏ (potencial suave, λ corta). Recupera el clásico: fase = acción clásica, amplitud 1/√p = densidad clásica 1/v. Falla en puntos de retorno (E=V, p→0, diverge): se usan fórmulas de conexión de Airy para empalmar oscilatorio (E>V) con exponencial (E<V).' }],
  },

  // ===================== 2.7 — Phase shift analysis =====================
  {
    id: 'ex-2-7f',
    sectionId: '2.7',
    conceptIds: ['c2-s-matrix', 'c2-probability-current'],
    title: 'Desplazamiento de fase en dispersión',
    difficulty: 2,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'En dispersión 1D, la onda transmitida es C·e^{ikx} = |C|·e^{i(kx + δ)}, donde δ es el desplazamiento de fase. Explica qué información física contiene δ y por qué, aunque no afecta a T=|C|²/|A|², es importante para la conservación de probabilidad.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué representa físicamente el desplazamiento de fase δ?' }],
        accept: ['retardo', 'tiempo', 'retraso', 'fase'],
        why: [{ kind: 'p', text: 'δ contiene información sobre el "retardo" que sufre la onda al pasar por el potencial. Aunque no afecta a T, determina cómo la onda se retrasa respecto a la libre.' }],
        reveal: [{ kind: 'p', text: 'δ es el desplazamiento de fase de la onda transmitida respecto a la incidente. Contiene info sobre el "retardo" temporal: δ/ω ≈ tiempo de retardo (tiempo de Wigner-Smith).' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Onda transmitida: C·e^{ikx} = |C|e^{i(kx+δ)}. δ es la fase relativa a la incidente.' }] },
      { blocks: [{ kind: 'p', text: 'T = |C|²/|A|² no depende de δ: la fase no afecta a la probabilidad de transmisión.' }] },
      { blocks: [{ kind: 'p', text: 'Pero δ contiene el "retardo": δ = -d ln(det S)/dk. Es el tiempo de Wigner-Smith (cuánto se retrasa la onda).' }] },
      { blocks: [{ kind: 'p', text: 'La unitariedad (S†S=I) restringe δ: fija relaciones entre fases de R y T (p.ej. r*t* + t*r = 0).' }] },
      { blocks: [{ kind: 'p', text: 'δ es medible experimentalmente: en interferometría, el retardo de fase revela la presencia del potencial.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Definición de δ',
        what: [{ kind: 'p', text: 'Definimos el desplazamiento de fase.' }],
        why: [{ kind: 'p', text: 'La onda transmitida C·e^{ikx} tiene amplitud |C| y fase arg(C). Escribimos C=|C|e^{iδ}: δ es el desplazamiento de fase respecto a la incidente (que tomamos con fase 0).' }],
        meaning: [{ kind: 'p', text: 'δ mide cuánto se "retrasa" (o adelanta) la fase de la onda al pasar por el potencial. No afecta a |C|² (la probabilidad), pero contiene info sobre la interacción.' }],
        info: [{ kind: 'p', text: 'Para un potencial atractivo, la onda se "acelera" (mayor k efectivo): δ negativo. Para repulsivo, se "frena": δ positivo. La fase refleja la interacción.' }],
        whatIf: [{ kind: 'p', text: 'Si V=0 (sin potencial), δ=0: la onda pasa sin cambio de fase. Cualquier δ≠0 indica presencia de V.' }],
        math: [{ kind: 'math-block', tex: 'C = |C|e^{i\\delta}, \\quad \\psi_{\\text{trans}} = |C|e^{i(kx + \\delta)}. \\;\\delta = \\arg(C) \\text{ es el desplazamiento de fase.}' }],
      },
      {
        id: 's2', label: 'T no depende de δ',
        what: [{ kind: 'p', text: 'Comentamos la independencia de T.' }],
        why: [{ kind: 'p', text: 'T = |C|²/|A|² = |C|² (si A=1). La fase δ se cancela en el módulo al cuadrado: T no "ve" la fase. Es la limitación de medir solo T: se pierde info.' }],
        meaning: [{ kind: 'p', text: 'La probabilidad de transmisión es insensible a la fase. Para acceder a δ, hay que usar interferometría: comparar la fase de la transmitida con una referencia.' }],
        info: [{ kind: 'p', text: 'Esto es general: la probabilidad (|ψ|²) pierde toda info de fase. Para recuperar la fase, se necesita un experimento interferométrico.' }],
        whatIf: [{ kind: 'p', text: 'La reflexión tiene su propia fase (arg(B)), distinta de la de transmisión. La unitariedad las relaciona: no son independientes.' }],
        math: [{ kind: 'math-block', tex: 'T = \\frac{|C|^2}{|A|^2} = |C|^2. \\quad \\text{Independiente de } \\delta = \\arg(C).' }],
      },
      {
        id: 's3', label: 'Tiempo de retardo (Wigner-Smith)',
        what: [{ kind: 'p', text: 'Conectamos δ con el retardo temporal.' }],
        why: [{ kind: 'p', text: 'El tiempo de Wigner-Smith es τ = ℏ dδ/dE = (1/v_g) dδ/dk. Mide cuánto se retrasa la onda respecto a la libre. Para un pozo atractivo, τ>0 (la onda "se queda" un tiempo en el pozo).' }],
        meaning: [{ kind: 'p', text: 'δ contiene la info temporal: su derivada respecto a E da el retardo. Es la forma de extraer info de "tiempo" de la fase, más allá de la probabilidad.' }],
        info: [{ kind: 'p', text: 'La unitariedad (S†S=I) fija relaciones entre las fases de R y T. Por ejemplo, para V par: arg(r) - arg(t) = π/2 (las fases difieren en 90°).' }],
        whatIf: [{ kind: 'p', text: 'Cerca de una resonancia, δ cambia rápidamente con E (paso de π): el retardo es máximo (la onda "se queda atrapada" mucho tiempo). Es la firma de un estado casi-ligado.' }],
        math: [{ kind: 'math-block', tex: '\\tau = \\hbar\\frac{d\\delta}{dE} = \\frac{1}{v_g}\\frac{d\\delta}{dk}. \\quad \\text{Tiempo de Wigner-Smith: retardo de la onda. Resonancia: } \\delta \\text{ cambia rápido, } \\tau \\text{ grande.}' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'δ = arg(C) es el desplazamiento de fase de la transmitida. T=|C|² no depende de δ (la fase se cancela en el módulo). Pero δ contiene el retardo temporal: τ=ℏ dδ/dE (Wigner-Smith). La unitariedad fija relaciones entre fases de R y T. Cerca de resonancias, δ cambia rápidamente (paso de π): retardo máximo = estado casi-ligado. δ es medible por interferometría.' }],
  },
]
