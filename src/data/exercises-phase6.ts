import type { Exercise } from '@/lib/content-types'

// Phase 6 exercises: time-dependent expectation values (2.2), coherent states intro (2.3),
// multiple deltas (2.5), unitarity proof (2.7).
// All content original to this platform.

export const EXERCISES_PHASE6: Exercise[] = [
  // ===================== 2.2 — Time-dependent expectation values =====================
  {
    id: 'ex-2-2f',
    sectionId: '2.2',
    conceptIds: ['c2-superposition', 'c2-stationary-states-meaning'],
    title: 'Valores esperados dependientes del tiempo en superposición',
    difficulty: 3,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'En el pozo infinito (0,a), un estado inicial es Ψ(x,0) = Σ c_n ψ_n con c_n constantes. Demuestra que ⟨p⟩(t) = Σ_{n,m} c_n* c_m p_{nm} e^{i(E_n-E_m)t/ℏ}, donde p_{nm} = ⟨ψ_n|p|ψ_m⟩. ¿Por qué ⟨p⟩ es constante en un estado estacionario pero oscila en una superposición?' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Cuándo es ⟨p⟩ constante: en un estado estacionario o en una superposición?' }],
        accept: ['estacionario', 'solo un n'],
        why: [{ kind: 'p', text: 'Distinguir cuándo un valor esperado es constante del movimiento vs oscila es central: la energía se conserva siempre, pero posición y momento no necesariamente.' }],
        reveal: [{ kind: 'p', text: 'En un estado estacionario (un solo c_n) ⟨p⟩ es constante porque las fases se cancelan. En superposición, los términos cruzados tienen fases e^{i(E_n-E_m)t/ℏ} que oscilan.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: '⟨p⟩(t) = ⟨Ψ|p|Ψ⟩ = Σ c_n* c_m ⟨ψ_n|p|ψ_m⟩ e^{i(E_n-E_m)t/ℏ}.' }] },
      { blocks: [{ kind: 'p', text: 'Los términos diagonales (n=m) tienen e^{i0}=1 → constantes. Los cruzados (n≠m) oscilan a frecuencia (E_n-E_m)/ℏ.' }] },
      { blocks: [{ kind: 'p', text: 'Estado estacionario (un c_n): solo término diagonal → ⟨p⟩ constante.' }] },
      { blocks: [{ kind: 'p', text: 'Superposición: hay términos cruzados → ⟨p⟩ puede oscilar. La frecuencia es la diferencia de energías.' }] },
      { blocks: [{ kind: 'p', text: 'Para el pozo infinito, p_{nm} = (2ℏn²mπ²)/(a(n²-m²)²) · [1-(-1)^{n+m}] (cero si n+m par).' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Expresión general de ⟨p⟩',
        what: [{ kind: 'p', text: 'Desarrollamos ⟨p⟩(t).' }],
        why: [{ kind: 'p', text: 'Sustituyendo Ψ(x,t) = Σ c_n ψ_n e^{-iE_n t/ℏ} en ⟨Ψ|p|Ψ⟩ = ∫Ψ* (-iℏ d/dx) Ψ dx, y usando ortonormalidad, aparecen los elementos matriciales p_{nm}.' }],
        meaning: [{ kind: 'p', text: '⟨p⟩ es una suma de términos diagonales (constantes) más cruzados (oscilantes). La física del momento se reparte entre contribuciones que conservan n y las que lo cambian.' }],
        info: [{ kind: 'p', text: 'La estructura es general: cualquier operador Q̂ tiene ⟨Q⟩ = Σ c_n* c_m Q_{nm} e^{i(E_n-E_m)t/ℏ}.' }],
        whatIf: [{ kind: 'p', text: 'Si [Q,H]=0 (Q es constante del movimiento), Q es diagonal en la base de energía → no hay cruzados → ⟨Q⟩ constante para cualquier estado.' }],
        math: [{ kind: 'math-block', tex: '\\langle p \\rangle(t) = \\sum_{n,m} c_n^* c_m\\,p_{nm}\\,e^{i(E_n - E_m)t/\\hbar}, \\quad p_{nm} = \\langle \\psi_n | \\hat{p} | \\psi_m \\rangle.' }],
      },
      {
        id: 's2', label: 'Estado estacionario: ⟨p⟩ constante',
        what: [{ kind: 'p', text: 'Analizamos el caso de un solo c_n.' }],
        why: [{ kind: 'p', text: 'Si solo c_k ≠ 0, la suma se reduce a un término: c_k* c_k p_{kk} e^{i(E_k-E_k)t/ℏ} = |c_k|² p_{kk}. Sin oscilación.' }],
        meaning: [{ kind: 'p', text: 'En un estado estacionario, ⟨p⟩ es constante (como ⟨x⟩, ⟨p²⟩, etc.). Es la definición operacional de "estacionario": nada observable evoluciona.' }],
        info: [{ kind: 'p', text: 'Para el pozo infinito, p_{kk} = 0 (la paridad de ψ_k² es par y p es impar → integral cero). Así ⟨p⟩=0 en cualquier estado estacionario del pozo.' }],
        whatIf: [{ kind: 'p', text: 'Si el pozo no fuera simétrico, p_{kk} podría no ser 0; aún así ⟨p⟩ sería constante en el estacionario.' }],
        math: [{ kind: 'math-block', tex: '\\text{Un solo } c_k: \\;\\langle p \\rangle = |c_k|^2 p_{kk} = \\text{constante}.' }],
      },
      {
        id: 's3', label: 'Superposición: ⟨p⟩ oscila',
        what: [{ kind: 'p', text: 'Analizamos el caso de varios c_n.' }],
        why: [{ kind: 'p', text: 'Los términos cruzados (n≠m) tienen e^{i(E_n-E_m)t/ℏ} ≠ 1, así que oscilan. Solo se anulan si p_{nm}=0 (p.ej. paridad) o si los c_n son tales que se cancelan.' }],
        meaning: [{ kind: 'p', text: 'En una superposición, ⟨p⟩ oscila a frecuencias (E_n-E_m)/ℏ: la partícula tiene momento medio no trivial que evoluciona. Es la firma de un estado no estacionario.' }],
        info: [{ kind: 'p', text: 'La diferencia con ⟨H⟩: H es diagonal en su propia base (p_{nm}→E_n δ_{nm}), así que ⟨H⟩ nunca oscila. La energía se conserva; el momento, no.' }],
        whatIf: [{ kind: 'p', text: 'Si [p,H]=0 (caso libre), p sería diagonal y ⟨p⟩ constante. En el pozo infinito, [p,H]≠0 (la frontera rompe la traslación), así p no es constante del movimiento.' }],
        math: [{ kind: 'math-block', tex: '\\text{Varios } c_n: \\;\\langle p \\rangle(t) = \\sum_{n \\neq m} c_n^* c_m p_{nm} e^{i(E_n-E_m)t/\\hbar} + \\text{(const.)}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: '⟨p⟩(t) = Σ c_n* c_m p_{nm} e^{i(E_n-E_m)t/ℏ}. En estado estacionario (un c_k): solo término diagonal → constante. En superposición: términos cruzados oscilan a (E_n-E_m)/ℏ. La diferencia con ⟨H⟩ es que H es diagonal en su base (siempre constante), mientras p no lo es (oscila salvo en estacionario).' }],
    commonErrors: [
      {
        id: 'e1', type: 'physical-interpretation',
        signature: [{ kind: 'p', text: 'Olvidar las fases temporales en la superposición.' }],
        explanation: [{ kind: 'p', text: 'Sin e^{-iE_n t/ℏ}, todos los términos serían constantes (no habría evolución). Las fases relativas son lo que produce la oscilación temporal. Es el error más común al calcular ⟨Q⟩ en superposiciones.' }],
      },
    ],
  },

  // ===================== 2.3 — Coherent states intro =====================
  {
    id: 'ex-2-3g',
    sectionId: '2.3',
    conceptIds: ['c2-harmonic-oscillator'],
    title: 'Estados coherentes del oscilador (introducción)',
    difficulty: 3,
    type: 'conceptual',
    statement: [
      { kind: 'p', text: 'Un estado coherente del oscilador es |α⟩ = e^{-|α|²/2} Σ (αⁿ/√(n!)) |n⟩. Demuestra que es autoestado del operador de aniquilación: a|α⟩ = α|α⟩. Explica por qué estos estados son los "más clásicos" posibles y por qué ⟨x⟩(t) sigue la trayectoria clásica.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué significa que a|α⟩ = α|α⟩ físicamente?' }],
        accept: ['autoestado de a', 'minima incertidumbre', 'saturacion', 'clasico'],
        why: [{ kind: 'p', text: 'Esta ecuación de autovalores define el estado coherente: el operador a (destructor) no lo cambia (salvo factor). Es la propiedad clave que los hace especiales.' }],
        reveal: [{ kind: 'p', text: 'a|α⟩ = α|α⟩ significa que el estado coherente es autoestado del operador de aniquilación con autovalor α (complejo). Consecuencia: satura Heisenberg (ΔxΔp=ℏ/2) y ⟨x⟩,⟨p⟩ siguen trayectorias clásicas.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'a|n⟩ = √n |n-1⟩. Aplica a a la serie |α⟩ = e^{-|α|²/2} Σ αⁿ/√(n!) |n⟩.' }] },
      { blocks: [{ kind: 'p', text: 'a Σ αⁿ/√(n!) |n⟩ = Σ αⁿ/√(n!) √n |n-1⟩ = Σ αⁿ/√((n-1)!) |n-1⟩ (reindice m=n-1).' }] },
      { blocks: [{ kind: 'p', text: '= α Σ αᵐ/√(m!) |m⟩ = α |α⟩/e^{-|α|²/2} → a|α⟩ = α|α⟩.' }] },
      { blocks: [{ kind: 'p', text: 'Consecuencias: ⟨x⟩ = √(2ℏ/mω) Re(α), ⟨p⟩ = √(2mωℏ) Im(α). Evolucionan como cos(ωt), sen(ωt): ¡trayectoria clásica!' }] },
      { blocks: [{ kind: 'p', text: 'ΔxΔp = ℏ/2: satura Heisenberg. Es el estado "más clásico" — paquete gaussiano que no se deforma, solo oscila.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Aplicar a a la serie',
        what: [{ kind: 'p', text: 'Calculamos a|α⟩.' }],
        why: [{ kind: 'p', text: 'Usando a|n⟩ = √n|n-1⟩ y reindexando la serie, se demuestra que a|α⟩ = α|α⟩. Es una cuenta directa de reindexación.' }],
        meaning: [{ kind: 'p', text: 'El estado coherente es el único (salvo fase) que es autoestado de a. Esa propiedad lo define y lo hace especial.' }],
        info: [{ kind: 'p', text: 'La serie |α⟩ = e^{-|α|²/2} Σ (αⁿ/√(n!)) |n⟩ es la expansión de un "estado desplazado" del fundamental.' }],
        whatIf: [{ kind: 'p', text: 'Si α=0, |α=0⟩ = |0⟩ (estado fundamental): a|0⟩=0=0·|0⟩. Es el caso trivial de coherente.' }],
        math: [{ kind: 'math-block', tex: 'a|\\alpha\\rangle = e^{-|\\alpha|^2/2} \\sum_{n=1}^{\\infty} \\frac{\\alpha^n}{\\sqrt{n!}} \\sqrt{n}\\,|n-1\\rangle = \\alpha\\,|\\alpha\\rangle.' }],
      },
      {
        id: 's2', label: '⟨x⟩ y ⟨p⟩: trayectoria clásica',
        what: [{ kind: 'p', text: 'Calculamos ⟨x⟩(t) y ⟨p⟩(t).' }],
        why: [{ kind: 'p', text: 'Con x = √(ℏ/2mω)(a+a†) y p = i√(mωℏ/2)(a†-a), y a|α⟩=α|α⟩, ⟨α|a†=α*⟨α|, se obtienen ⟨x⟩, ⟨p⟩.' }],
        meaning: [{ kind: 'p', text: '⟨x⟩ = √(2ℏ/mω) Re(α e^{-iωt}) y ⟨p⟩ = √(2mωℏ) Im(α e^{-iωt}): ¡oscilan como el oscilador clásico! El estado coherente sigue la trayectoria clásica en valor esperado.' }],
        info: [{ kind: 'p', text: 'La fase temporal de α (que gira como e^{-iωt}) es lo que produce la oscilación. Es la misma frecuencia ω que el oscilador clásico.' }],
        whatIf: [{ kind: 'p', text: 'Para un estado |n⟩ (estacionario), ⟨x⟩=0: no hay oscilación. El coherente es especial: oscila como el clásico.' }],
        math: [{ kind: 'math-block', tex: '\\langle x \\rangle(t) = \\sqrt{\\frac{2\\hbar}{m\\omega}} \\Re(\\alpha\\,e^{-i\\omega t}), \\quad \\langle p \\rangle(t) = \\sqrt{2m\\omega\\hbar}\\,\\Im(\\alpha\\,e^{-i\\omega t}).' }],
      },
      {
        id: 's3', label: 'Saturación de Heisenberg',
        what: [{ kind: 'p', text: 'Verificamos Δx·Δp = ℏ/2.' }],
        why: [{ kind: 'p', text: 'El estado coherente es gaussiano (como el fundamental, pero desplazado). Toda gaussiana satura Heisenberg: ΔxΔp=ℏ/2 exacto.' }],
        meaning: [{ kind: 'p', text: 'El coherente es el estado "más clásico" posible: oscila como el clásico Y satura la incertidumbre mínima. Es lo más cercano a una partícula clásica que permite la cuántica.' }],
        info: [{ kind: 'p', text: 'El láser produce estados coherentes de luz: por eso son tan importantes en óptica cuántica.' }],
        whatIf: [{ kind: 'p', text: 'Un estado "squeezed" puede tener Δx < Δx_coherente pero entonces Δp > Δp_coherente: el producto sigue siendo ≥ ℏ/2.' }],
        math: [{ kind: 'math-block', tex: '\\Delta x = \\sqrt{\\frac{\\hbar}{2m\\omega}}, \\quad \\Delta p = \\sqrt{\\frac{m\\omega\\hbar}{2}}, \\quad \\Delta x \\cdot \\Delta p = \\frac{\\hbar}{2}.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'a|α⟩ = α|α⟩ (por reindexación de la serie). Consecuencias: ⟨x⟩(t) = √(2ℏ/mω) Re(α e^{-iωt}) y ⟨p⟩(t) = √(2mωℏ) Im(α e^{-iωt}) siguen la trayectoria clásica; ΔxΔp = ℏ/2 satura Heisenberg. El coherente es el estado "más clásico": oscila como el clásico con incertidumbre mínima.' }],
  },

  // ===================== 2.5 — Multiple deltas =====================
  {
    id: 'ex-2-5d',
    sectionId: '2.5',
    conceptIds: ['c2-delta', 'c2-s-matrix'],
    title: 'Dos pozos delta: interferencia y resonancias',
    difficulty: 3,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Considera V(x) = -α[δ(x-L/2) + δ(x+L/2)], dos pozos delta idénticos separados por distancia L. Sin resolver completamente, describe cómo esperarías que aparezcan los estados ligados y por qué pueden ser más que los de un solo pozo. Relaciona con el concepto de "splitting" por simetría.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: 'Un pozo delta liga 1 estado. ¿Cuántos esperarías para dos pozos idénticos?' }],
        accept: ['2', 'dos', 'splitting', 'simetrico antisimetrico'],
        why: [{ kind: 'p', text: 'Cada pozo individual da 1 estado; al acoplarlos, el estado se "parte" en simétrico y antisimétrico: 2 estados. Es el mecanismo de la formación de bandas.' }],
        reveal: [{ kind: 'p', text: '2 estados (aproximadamente): el simétrico (más ligado) y el antisimétrico (menos ligado). El acoplamiento "parte" el nivel individual.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Cada pozo individual liga 1 estado. Al separarlos por L finita, se acoplan: el estado se "parte" en simétrico y antisimétrico.' }] },
      { blocks: [{ kind: 'p', text: 'Simétrico: ψ(-x)=ψ(x) (más ligado, sin nodo); antisimétrico: ψ(-x)=-ψ(x) (menos ligado, con nodo en x=0).' }] },
      { blocks: [{ kind: 'p', text: 'La separación energética ∆E depende del solapamiento: ~e^{-κL} (decae con la distancia). A mayor L, menor splitting → casi degenerados.' }] },
      { blocks: [{ kind: 'p', text: 'Para L→0: los pozos se funden en uno de fuerza 2α → 1 estado con energía 4× (E = -m(2α)²/(2ℏ²)).' }] },
      { blocks: [{ kind: 'p', text: 'Para L→∞: dos pozos independientes → 2 estados degenerados (E = -mα²/(2ℏ²) cada uno).' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Acoplamiento y splitting',
        what: [{ kind: 'p', text: 'Argumentamos por acoplamiento.' }],
        why: [{ kind: 'p', text: 'Cada pozo da un estado ψ_izq, ψ_der con energía E₀=-mα²/(2ℏ²). Al separarlos por L finita, las colas exponenciales se solapan: hay acoplamiento. El estado se "parte" en combinaciones simétrica y antisimétrica.' }],
        meaning: [{ kind: 'p', text: 'El nivel individual E₀ se divide en dos: el simétrico (más ligado) y el antisimétrico (menos ligado). La separación ∆E depende del solapamiento de las colas.' }],
        info: [{ kind: 'p', text: 'Este es el mecanismo fundamental de la formación de bandas en sólidos: N pozos acoplados → N niveles que se ensanchan en una banda.' }],
        whatIf: [{ kind: 'p', text: 'Si los pozos fueran repulsivos (+αδ), no habría estados ligados individuales, y el acoplamiento daría resonancias de scattering.' }],
        math: [{ kind: 'math-block', tex: 'E_0 \\to E_{\\pm}, \\quad E_{+} \\text{ (simétrico, más ligado)}, \\; E_{-} \\text{ (antisimétrico, menos ligado)}, \\quad \\Delta E \\sim e^{-\\kappa L}.' }],
      },
      {
        id: 's2', label: 'Límites L→0 y L→∞',
        what: [{ kind: 'p', text: 'Analizamos los límites.' }],
        why: [{ kind: 'p', text: 'L→0: los dos pozos coinciden → un solo pozo de fuerza 2α. Energía E = -m(2α)²/(2ℏ²) = 4·E₀. L→∞: pozos independientes → dos niveles degenerados en E₀.' }],
        meaning: [{ kind: 'p', text: 'El sistema interpola entre "un pozo doble" (L pequeño, 1 estado profundo) y "dos pozos libres" (L grande, 2 estados casi degenerados).' }],
        info: [{ kind: 'p', text: 'Para L intermedio, hay 2 estados bien separados: el splitting es máximo cuando las colas se solapan moderadamente.' }],
        whatIf: [{ kind: 'p', text: 'Con N pozos en cadena, aparecen N niveles que forman una banda de ancho ~e^{-κd} (d=separación).' }],
        math: [{ kind: 'math-block', tex: 'L \\to 0: 1 \\text{ estado, } E = 4E_0; \\quad L \\to \\infty: 2 \\text{ estados degenerados, } E = E_0.' }],
      },
      {
        id: 's3', label: 'Dispersión y resonancias',
        what: [{ kind: 'p', text: 'Comentamos la dispersión.' }],
        why: [{ kind: 'p', text: 'Para E>0, los dos pozos dispersan. Aparecen resonancias (T=1) cuando la onda "encaja" entre ellos: 2kL + fase = 2nπ. Es el interferómetro de Fabry-Pérot cuántico.' }],
        meaning: [{ kind: 'p', text: 'Las resonancias corresponden a estados "casi-ligados" entre los dos pozos: la onda rebota entre ellos constructivamente y pasa sin reflexión.' }],
        info: [{ kind: 'p', text: 'Esta estructura de resonancias es lo que permite detectar estados ligados virtualmente: cada resonancia está cerca de un nivel ligado del doble pozo.' }],
        whatIf: [{ kind: 'p', text: 'Añadiendo más pozos, se forma una red: aparecen bandas permitidas (resonancias anchas) y prohibidas (gaps). Es el origen de la teoría de bandas.' }],
        math: [{ kind: 'p', text: 'Resonancias (T=1) a 2kL + δ = 2nπ. Análogo de Fabry-Pérot; base de la teoría de bandas.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'Dos pozos delta idénticos separados por L: el estado individual E₀=-mα²/(2ℏ²) se parte en simétrico (más ligado) y antisimétrico (menos), con splitting ∆E~e^{-κL}. L→0: un pozo 2α, E=4E₀. L→∞: dos estados degenerados. Dispersión: resonancias tipo Fabry-Pérot. Es el mecanismo de la teoría de bandas.' }],
  },

  // ===================== 2.7 — Unitarity proof =====================
  {
    id: 'ex-2-7d',
    sectionId: '2.7',
    conceptIds: ['c2-s-matrix', 'c2-probability-current'],
    title: 'Demostración de la unitariedad de la S-matrix',
    difficulty: 3,
    type: 'computation',
    statement: [
      { kind: 'p', text: 'Demuestra que la S-matrix es unitaria (S†S = I) a partir de la conservación de la probabilidad. Luego muestra que esto implica R + T = 1 para dispersión simétrica. Explica por qué la unitariedad es la traducción matricial de la conservación de probabilidad.' },
    ],
    guided: [
      {
        id: 'g1',
        question: [{ kind: 'p', text: '¿Qué observable se conserva y cómo se traduce en S†S = I?' }],
        accept: ['probabilidad', 'corriente', 'flujos entrantes = salientes'],
        why: [{ kind: 'p', text: 'La conservación de probabilidad (ec. de continuidad) implica que el flujo total saliente iguala el entrante. En términos de S, la "norma" del vector de amplitudes salientes iguala la de las entrantes.' }],
        reveal: [{ kind: 'p', text: 'La probabilidad (corriente) se conserva: la suma de corrientes salientes iguala la de entrantes. S transforma entrantes→salientes, así que preserva la norma: S†S=I.' }],
      },
    ],
    hints: [
      { blocks: [{ kind: 'p', text: 'Las ondas salientes son (B, C) = S·(A, D) donde A,D son amplitudes entrantes desde izq/der.' }] },
      { blocks: [{ kind: 'p', text: 'Corriente de A·e^{ikx}: |A|²·v (v=ℏk/m). Si k es igual a ambos lados, conservación: |B|²+|C|² = |A|²+|D|².' }] },
      { blocks: [{ kind: 'p', text: 'En forma vectorial: ‖(B,C)‖² = ‖(A,D)‖². Como (B,C)=S·(A,D), eso es ⟨(A,D)|S†S|(A,D)⟩ = ⟨(A,D)|(A,D)⟩ para todo (A,D).' }] },
      { blocks: [{ kind: 'p', text: 'Como vale para todo vector, S†S = I: S es unitaria.' }] },
      { blocks: [{ kind: 'p', text: 'Para dispersión simétrica (V par), S₁₁=S₂₂=r, S₁₂=S₂₁=t. Diagonal de S†S: |r|²+|t|²=1 → R+T=1.' }] },
    ],
    steps: [
      {
        id: 's1', label: 'Conservación de probabilidad',
        what: [{ kind: 'p', text: 'Escribimos la conservación de corrientes.' }],
        why: [{ kind: 'p', text: 'La ecuación de continuidad ∂ρ/∂t + ∂J/∂x = 0 implica conservación: el flujo que entra al obstáculo iguala el que sale. En estado estacionario, ∫∂J/∂x dx = 0 → J(+∞) - J(-∞) = 0.' }],
        meaning: [{ kind: 'p', text: 'La probabilidad no se crea ni se destruye al dispersarse: lo que entra, sale. Es una consecuencia del carácter hermítico de Ĥ (V real).' }],
        info: [{ kind: 'p', text: 'Si V tuviera parte imaginaria (potencial complejo, no hermítico), habría absorción/emisión y la unitariedad fallaría: R+T ≠ 1.' }],
        whatIf: [{ kind: 'p', text: 'En 3D, la conservación incluye todos los canales angulares: la S-matrix sigue siendo unitaria pero más grande.' }],
        math: [{ kind: 'math-block', tex: 'J(+\\infty) - J(-\\infty) = 0 \\;\\Rightarrow\\; |B|^2 + |C|^2 = |A|^2 + |D|^2 \\quad (k \\text{ igual a ambos lados}).' }],
      },
      {
        id: 's2', label: 'Forma matricial: S†S = I',
        what: [{ kind: 'p', text: 'Pasamos a notación matricial.' }],
        why: [{ kind: 'p', text: 'Como (B,C)ᵀ = S·(A,D)ᵀ, la conservación ‖(B,C)‖²=‖(A,D)‖² se escribe ⟨(A,D)|S†S|(A,D)⟩ = ⟨(A,D)|(A,D)⟩ para todo vector (A,D). Eso fuerza S†S = I.' }],
        meaning: [{ kind: 'p', text: 'S†S = I es la traducción matricial de la conservación de probabilidad. "Unitaria" significa exactamente eso: preserva la norma.' }],
        info: [{ kind: 'p', text: 'Los operadores unitarios son la versión cuántica de las transformaciones que conservan probabilidad (rotaciones en el espacio de Hilbert).' }],
        whatIf: [{ kind: 'p', text: 'Si el espacio fuera bidimensional (dos canales), S es 2×2. Con N canales, S es N×N unitaria: la estructura se generaliza.' }],
        math: [{ kind: 'math-block', tex: '(B,C)^T = S\\,(A,D)^T, \\quad \\|(B,C)\\|^2 = \\|(A,D)\\|^2 \\;\\forall (A,D) \\;\\Rightarrow\\; S^\\dagger S = I.' }],
      },
      {
        id: 's3', label: 'Consecuencia: R + T = 1',
        what: [{ kind: 'p', text: 'Aplicamos al caso simétrico.' }],
        why: [{ kind: 'p', text: 'Para V par: S₁₁=S₂₂=r, S₁₂=S₂₁=t. La entrada (1,1) de S†S es |S₁₁|²+|S₂₁|² = |r|²+|t|² = 1. Identificando R=|r|², T=|t|²: R+T=1.' }],
        meaning: [{ kind: 'p', text: 'R+T=1 es la conservación de probabilidad en dispersión: lo que no se refleja, se transmite. Es una consecuencia de S†S=I, no un hecho independiente.' }],
        info: [{ kind: 'p', text: 'Otras entradas de S†S dan relaciones de fase entre r y t (p.ej. r*t* + t*r = 0: la fase de r difiere de la de t en π/2).' }],
        whatIf: [{ kind: 'p', text: 'Si V no es par, S₁₁≠S₂₂ pero S†S=I sigue: R_izq+T_izq=1 y R_der+T_der=1 (cada lado conserva). Solo las reflexiones pueden diferir.' }],
        math: [{ kind: 'math-block', tex: 'V \\text{ par}: \\; r = S_{11} = S_{22}, \\; t = S_{12} = S_{21}. \\quad (S^\\dagger S)_{11} = |r|^2 + |t|^2 = 1 \\;\\Rightarrow\\; R + T = 1.' }],
      },
    ],
    finalAnswer: [{ kind: 'p', text: 'La conservación de probabilidad (J(+∞)=J(-∞)) implica ‖(B,C)‖²=‖(A,D)‖². Como (B,C)=S·(A,D), eso fuerza S†S=I (unitaria) para todo vector. Para V par: |r|²+|t|²=1 → R+T=1. La unitariedad es la traducción matricial de que la probabilidad no se crea ni destruye.' }],
    commonErrors: [
      {
        id: 'e1', type: 'conceptual',
        signature: [{ kind: 'p', text: 'Asumir R+T=1 sin justificar.' }],
        explanation: [{ kind: 'p', text: 'R+T=1 no es un postulado: es consecuencia de S†S=I, que a su vez viene de la conservación de probabilidad (Ĥ hermítico). Sin V real, falla: hay absorción.' }],
      },
    ],
  },
]
