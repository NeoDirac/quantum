// ════════════════════════════════════════════════════════════════════════════
// REFERENCIAS CRUZADAS DEL LIBRO — Griffiths, "Introduction to Quantum
// Mechanics" (1.ª ed.), Capítulos 1-2.
// Ecuaciones, figuras y notas del texto que los enunciados de los problemas
// citan explícitamente («Equation 2.6», «Figure 2.5», …).
// Las ecuaciones fueron transcritas del PDF (verificación visual + OCR)
// y sus contextos son redacción pedagógica original de la plataforma.
// ════════════════════════════════════════════════════════════════════════════

export interface BookEquationRef {
  id: string                 // '2.6'
  chapter: 1 | 2
  label: string             // nombre corto (ES)
  latex: string              // ecuación en LaTeX (display)
  where: string              // dónde vive en el libro: '§2.1 · p. 22'
  definedInProblem?: string  // '2.12' — la etiqueta la asigna un problema
  context: string            // por qué importa / cómo se usa (ES, pedagógico)
}

export interface BookFigureRef {
  id: string                 // '2.5'
  label: string
  where: string
  description: string        // qué muestra (redacción propia)
}

export interface BookFootnoteRef {
  id: number                 // 22
  label: string
  where: string
  text: string               // contenido de la nota (traducido/resumido)
}

export interface ExternalProblemRef {
  id: string                 // '1.9a'
  label: string
  latex?: string             // fórmula clave, si aplica
  context: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Ecuaciones citadas por los problemas del Capítulo 2
// ─────────────────────────────────────────────────────────────────────────────

export const BOOK_EQUATIONS: Record<string, BookEquationRef> = {
  '1.20': {
    id: '1.20',
    chapter: 1,
    label: 'Normalización de Ψ',
    latex: '\\int_{-\\infty}^{+\\infty} |\\Psi(x, t)|^2\\, dx = 1',
    where: '§1.4 · p. 11',
    context:
      'La condición de normalización: la partícula tiene que estar en algún sitio. El 2.1(a) la invoca «para todo t»: sustituye E → E₀ + iΓ en la fase temporal de la Ec. 2.6 y muestra que, para que esta integral siga valiendo 1 a cualquier tiempo, Γ tiene que ser 0.',
  },
  '1.38': {
    id: '1.38',
    chapter: 1,
    label: 'Teorema de Ehrenfest',
    latex: '\\frac{d\\langle p \\rangle}{dt} = \\left\\langle -\\frac{\\partial V}{\\partial x} \\right\\rangle',
    where: 'Prob. 1.12 · p. 17',
    context:
      'Los valores esperados obedecen la segunda ley de Newton. Se demuestra en el Problema 1.12 del libro. Para el 2.45(c) basta calcular ⟨x⟩ y ⟨p⟩ por separado y comprobar que m d⟨x⟩/dt = ⟨p⟩ sale solo.',
  },
  '2.4': {
    id: '2.4',
    chapter: 2,
    label: 'Ecuación de Schrödinger independiente del tiempo',
    latex: '-\\frac{\\hbar^2}{2m} \\frac{d^2\\psi}{dx^2} + V(x)\\,\\psi = E\\,\\psi',
    where: '§2.1 · p. 21',
    context:
      'La TISE, protagonista del capítulo: cada problema es resolverla con su V(x) y sus condiciones de frontera. El 2.2 te pide reescribirla como ψ″ = (2m/ħ²)(V−E)ψ para argumentar que, si E < V_min, ψ y ψ″ van del mismo lado y ψ no se puede normalizar.',
  },
  '2.6': {
    id: '2.6',
    chapter: 2,
    label: 'Solución estacionaria completa',
    latex: '\\Psi(x, t) = \\psi(x)\\, e^{-iEt/\\hbar}',
    where: '§2.1 · p. 22',
    context:
      'La parte espacial ψ(x) por la fase temporal e^{−iEt/ħ}. Aquí «vive» la energía de separación: el 2.1(a) la escribe como E₀ + iΓ y demuestra que Γ = 0 (si no, la normalización — Ec. 1.20 — se rompería con el tiempo).',
  },
  '2.14': {
    id: '2.14',
    chapter: 2,
    label: 'Estado general = superposición de estacionarios',
    latex: '\\Psi(x, t) = \\sum_{n=1}^{\\infty} c_n\\, \\psi_n(x)\\, e^{-iE_n t/\\hbar}',
    where: '§2.1 · p. 23',
    context:
      'El estado general como suma de estacionarios. Es la ecuación que alimenta el 2.5 (Σ|cₙ|² = 1), el 2.7 (la fase relativa de c₁ y c₂ sí importa) y el 2.10 (⟨H⟩ = ΣEₙ|cₙ|²).',
  },
  '2.15': {
    id: '2.15',
    chapter: 2,
    label: 'Potencial del pozo cuadrado infinito',
    latex: 'V(x) = \\begin{cases} 0, & \\text{si } 0 < x < a, \\\\ \\infty, & \\text{en el resto.} \\end{cases}',
    where: '§2.2 · p. 24',
    context:
      'El «pozo infinito» de todo el capítulo: libre dentro de (0, a), paredes impenetrables. El 2.36 opera con él (Ψ = A sin³(πx/a)), y el 2.3 lo resuelve centrado en el origen.',
  },
  '2.23': {
    id: '2.23',
    chapter: 2,
    label: 'Niveles de energía del pozo infinito',
    latex: 'E_n = \\frac{\\hbar^2 k^2}{2m} = \\frac{n^2 \\pi^2 \\hbar^2}{2 m a^2}',
    where: '§2.2 · p. 26',
    context:
      'La energía solo toma estos valores. El 2.3 resuelve el pozo centrado en el origen y pide verificar que salen las mismas Eₙ; el 2.4 juega con cambiar la anchura del pozo.',
  },
  '2.24': {
    id: '2.24',
    chapter: 2,
    label: 'Estados estacionarios del pozo infinito',
    latex: '\\psi_n(x) = \\sqrt{\\frac{2}{a}} \\sin\\!\\left(\\frac{n \\pi x}{a}\\right)',
    where: '§2.2 · p. 26',
    context:
      'Los estados normalizados del pozo infinito (0 < x < a). El 2.3 pide confirmar que sus ψ del pozo centrado salen de estos con el desplazamiento x → x − a/2.',
  },
  '2.38': {
    id: '2.38',
    chapter: 2,
    label: 'Potencial del oscilador armónico',
    latex: 'V(x) = \\tfrac{1}{2} m \\omega^2 x^2',
    where: '§2.3 · p. 32',
    context:
      'La parábola del oscilador: cualquier pozo suave se ve así cerca de su mínimo. El 2.45 pide verificar que su paquete gaussiano satisface la ecuación dependiente del tiempo con esta V.',
  },
  '2.43': {
    id: '2.43',
    chapter: 2,
    label: 'TISE del oscilador factorizada (a₋a₊)',
    latex: '\\left( a_- a_+ - \\tfrac{1}{2}\\hbar\\omega \\right)\\psi = E\\psi',
    where: '§2.3.1 · p. 33',
    context:
      'La TISE del oscilador escrita con operadores escalera. Junto con la Ec. 2.46 es la clave del 2.11 y del 2.12: integrando por partes te da la norma de a₊ψₙ sin calcular nada explícito.',
  },
  '2.46': {
    id: '2.46',
    chapter: 2,
    label: 'TISE del oscilador factorizada (a₊a₋)',
    latex: '\\left( a_+ a_- + \\tfrac{1}{2}\\hbar\\omega \\right)\\psi = E\\psi',
    where: '§2.3.1 · p. 34',
    context:
      'La forma hermana de la Ec. 2.43. Con ambas, el 2.12 demuestra que ∫|a₊ψₙ|²dx = (n+1)ħω y ∫|a₋ψₙ|²dx = nħω: las constantes de proporcionalidad de la escalera.',
  },
  '2.50': {
    id: '2.50',
    chapter: 2,
    label: 'La escalera del oscilador: ψₙ y Eₙ',
    latex: '\\psi_n(x) = A_n (a_+)^n e^{-\\frac{m\\omega}{2\\hbar}x^2}, \\qquad E_n = \\left(n + \\tfrac{1}{2}\\right)\\hbar\\omega',
    where: '§2.3.2 · p. 35',
    context:
      'Toda la escalera en una línea: aplica a₊ n veces al suelo y sale ψₙ, con Eₙ = (n+½)ħω. El 2.12(b) usa la Ec. 2.52 para fijar Aₙ; el 2.13 normaliza ψ₁ y contrasta con la fórmula general (Ec. 2.54).',
  },
  '2.51': {
    id: '2.51',
    chapter: 2,
    label: 'Primer estado excitado del oscilador',
    latex: '\\psi_1(x) = i A_1\\, \\omega \\sqrt{2m}\\; x\\; e^{-\\frac{m\\omega}{2\\hbar}x^2}',
    where: '§2.3.2 · p. 36',
    context:
      'El primer peldaño sobre el suelo: ψ₁ sale de aplicar a₊ a ψ₀. El 2.13 pide normalizarlo por integración directa y comprobar el resultado contra la fórmula general (Ec. 2.54).',
  },
  '2.52': {
    id: '2.52',
    chapter: 2,
    label: 'Acción del operador de subida',
    latex: 'a_+ \\psi_n = i \\sqrt{(n+1)\\hbar\\omega}\\; \\psi_{n+1}',
    where: 'resultado del Prob. 2.12',
    definedInProblem: '2.12',
    context:
      'El ascensor sube un peldaño: a₊ψₙ ∝ ψₙ₊₁ con constante i√((n+1)ħω) — las «i» mantienen reales las funciones. El 2.12(b) lo usa para hallar Aₙ (Ec. 2.54) y el 2.37 lo invoca para ⟨x⟩ y ⟨p⟩ con la escalera.',
  },
  '2.53': {
    id: '2.53',
    chapter: 2,
    label: 'Acción del operador de bajada',
    latex: 'a_- \\psi_n = -i \\sqrt{n\\hbar\\omega}\\; \\psi_{n-1}',
    where: 'resultado del Prob. 2.12',
    definedInProblem: '2.12',
    context:
      'El descensor: a₋ψₙ ∝ ψₙ₋₁. Su constante al cuadrado, nħω, es exactamente el ∫|a₋ψₙ|²dx que el 2.12 calcula por integración por partes.',
  },
  '2.54': {
    id: '2.54',
    chapter: 2,
    label: 'Constante de normalización Aₙ',
    latex: 'A_n = \\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4} \\frac{(-i)^n}{\\sqrt{n!\\,(\\hbar\\omega)^n}}',
    where: 'respuesta del Prob. 2.12(b)',
    definedInProblem: '2.12',
    context:
      'La constante que normaliza toda la escalera — respuesta del 2.12(b). El 2.13(a) la comprueba normalizando ψ₁ (Ec. 2.51) a mano.',
  },
  '2.68': {
    id: '2.68',
    chapter: 2,
    label: 'Recurrencia de la serie de Hermite',
    latex: 'a_{j+2} = \\frac{-2\\,(n - j)}{(j + 1)(j + 2)}\\, a_j',
    where: '§2.3.2 · p. 40',
    context:
      'La máquina que genera los coeficientes de la serie: paridad separada (a₀ y a₁) y terminación cuando j alcanza n. Con ella el 2.16 construye H₅ y H₆ sin resolver la ecuación de nuevo.',
  },
  '2.81': {
    id: '2.81',
    chapter: 2,
    label: 'Velocidad clásica de la partícula libre',
    latex: 'v_{\\text{clásica}} = \\sqrt{\\frac{2E}{m}} = 2\\, v_{\\text{cuántica}}',
    where: '§2.4 · p. 45',
    context:
      'La partícula clásica viaja al doble de la velocidad que el paquete de ondas (Ec. 2.80). El 2.33 sugiere usarla para entender por qué, cuando el potencial no vuelve a 0, T no es simplemente |F/A|²: la onda transmitida viaja a otra velocidad.',
  },
  '2.86': {
    id: '2.86',
    chapter: 2,
    label: 'Transformada de Fourier de la inicial',
    latex: '\\phi(k) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^{+\\infty} \\Psi(x, 0)\\, e^{-ikx}\\, dx',
    where: '§2.4 · p. 46',
    context:
      'El análisis de Fourier de la partícula libre: φ(k) descompone la inicial en ondas planas. El 2.21 pide calcularla para el pulso rectangular y discutir sus límites a → 0 y a → ∞ (incertidumbre).',
  },
  '2.96': {
    id: '2.96',
    chapter: 2,
    label: 'Pozo delta',
    latex: 'V(x) = -\\alpha\\, \\delta(x)',
    where: '§2.5 · p. 53',
    context:
      'Un pozo infinitamente estrecho y profundo de «fuerza» α. El 2.30 lo obtiene como límite z₀ → 0 del pozo finito; el 2.34 le construye la S-matrix y recupera su único estado ligado.',
  },
  '2.111': {
    id: '2.111',
    chapter: 2,
    label: 'Estado ligado del pozo delta',
    latex: '\\psi(x) = \\frac{\\sqrt{m\\alpha}}{\\hbar}\\, e^{-m\\alpha|x|/\\hbar^2}, \\qquad E = -\\frac{m\\alpha^2}{2\\hbar^2}',
    where: '§2.5 · p. 55',
    context:
      'El único estado ligado del pozo delta, con su energía. El 2.30 pide verificarlo con el límite del pozo finito y el 2.34 con la S-matrix.',
  },
  '2.123': {
    id: '2.123',
    chapter: 2,
    label: 'R y T del pozo delta (E > 0)',
    latex: 'R = \\frac{1}{1 + \\dfrac{2\\hbar^2 E}{m\\alpha^2}}, \\qquad T = \\frac{1}{1 + \\dfrac{m\\alpha^2}{2\\hbar^2 E}}',
    where: '§2.5 · p. 57',
    context:
      'Reflexión y transmisión del pozo delta para energías positivas. El 2.30 pide demostrar que la T del pozo finito (Ec. 2.151) reduce exactamente a esta cuando el pozo se vuelve estrecho y profundo.',
  },
  '2.126': {
    id: '2.126',
    chapter: 2,
    label: 'La delta como integral de ondas planas',
    latex: '\\delta(x) = \\frac{1}{2\\pi} \\int_{-\\infty}^{+\\infty} e^{ikx}\\, dk',
    where: 'resultado del Prob. 2.25',
    definedInProblem: '2.25',
    context:
      'La delta de Dirac escrita como integral de ondas planas. La etiqueta [2.126] la fija el propio enunciado del 2.25 al pedírtela como resultado. Ojo con el comentario del libro: la integral no converge en el sentido ordinario.',
  },
  '2.127': {
    id: '2.127',
    chapter: 2,
    label: 'Potencial del pozo cuadrado finito',
    latex: 'V(x) = \\begin{cases} -V_0, & \\text{si } -a < x < a, \\\\ 0, & \\text{si } |x| > a. \\end{cases}',
    where: '§2.6 · p. 60',
    context:
      'El «pozo finito»: −V₀ dentro de |x| < a, 0 fuera. Es el potencial del 2.32 (estados ligados), el 2.35 (S-matrix) y el 2.30 (límite delta).',
  },
  '2.133': {
    id: '2.133',
    chapter: 2,
    label: 'Ansatz par del pozo finito (ligados)',
    latex: '\\psi(x) = \\begin{cases} F e^{-\\kappa x}, & \\text{si } x > a, \\\\ D \\cos(lx), & \\text{si } 0 < x < a, \\\\ \\psi(-x), & \\text{si } x < 0. \\end{cases}',
    where: '§2.6 · p. 61',
    context:
      'El ansatz de Griffiths para las soluciones pares de los estados ligados del pozo finito: exponencial decayente fuera, coseno dentro, simetría a la izquierda. El 2.29 pide normalizar ψ para fijar D y F.',
  },
  '2.145': {
    id: '2.145',
    chapter: 2,
    label: 'Continuidad de ψ en x = −a (scattering)',
    latex: 'A e^{-ika} + B e^{ika} = -C \\sin(la) + D \\cos(la)',
    where: '§2.6 · p. 63',
    context:
      'Continuidad de ψ en la pared izquierda, para estados de scattering del pozo finito. Junto con las Ecs. 2.147 y 2.149 es la materia prima del 2.31: de ahí sale B en función de F.',
  },
  '2.146': {
    id: '2.146',
    chapter: 2,
    label: 'Continuidad de ψ′ en x = −a (scattering)',
    latex: 'ik\\left[A e^{-ika} - B e^{ika}\\right] = l\\left[C \\cos(la) + D \\sin(la)\\right]',
    where: '§2.6 · p. 63',
    context:
      'La hermana de la Ec. 2.145, para las pendientes: continuidad de ψ′ en la pared izquierda del pozo finito. El 2.31 la usa junto con las demás para eliminar C y D.',
  },
  '2.147': {
    id: '2.147',
    chapter: 2,
    label: 'Continuidad de ψ en x = +a (scattering)',
    latex: 'C \\sin(la) + D \\cos(la) = F e^{ika}',
    where: '§2.6 · p. 63',
    context:
      'La condición hermana de la Ec. 2.145, en la pared derecha. El 2.31 las usa en conjunto para eliminar C y D y despejar la relación entre amplitudes.',
  },
  '2.148': {
    id: '2.148',
    chapter: 2,
    label: 'Continuidad de ψ′ en x = +a (scattering)',
    latex: 'l\\left[C \\cos(la) - D \\sin(la)\\right] = ik\\, F e^{ika}',
    where: '§2.6 · p. 63',
    context:
      'Continuidad de ψ′ en la pared derecha: empareja la pendiente interior con la onda transmitida. La pista del 2.31 te pide usarla (junto con la 2.147) para despejar C y D en función de F.',
  },
  '2.149': {
    id: '2.149',
    chapter: 2,
    label: 'Amplitud reflejada B en función de F',
    latex: 'B = i\\, \\frac{\\sin(2la)}{2kl} \\left(l^2 - k^2\\right) F',
    where: '§2.6 · p. 63',
    context:
      'La amplitud reflejada en términos de la transmitida para el pozo finito: el resultado intermedio del 2.31 antes de calcular T = 1 − |B/A|².',
  },
  '2.150': {
    id: '2.150',
    chapter: 2,
    label: 'Amplitud transmitida F en función de A',
    latex: 'F = \\frac{e^{-2ika} A}{\\cos(2la) - i\\, \\frac{\\sin(2la)}{2kl} \\left(k^2 + l^2\\right)}',
    where: '§2.6 · p. 64',
    context:
      'La compañera de la Ec. 2.149: la amplitud transmitida en función de la incidente. El 2.31 te pide derivarlas ambas y obtener de aquí la T que confirma la Ec. 2.151.',
  },
  '2.151': {
    id: '2.151',
    chapter: 2,
    label: 'Transmisión del pozo finito',
    latex: 'T^{-1} = 1 + \\frac{V_0^2}{4E(E + V_0)} \\sin^2\\!\\left(\\frac{2a}{\\hbar} \\sqrt{2m(E + V_0)}\\right)',
    where: '§2.6 · p. 64',
    context:
      'La transmisión del pozo cuadrado finito (E > 0). El 2.30 pide mostrar que reduce a la Ec. 2.123 (pozo delta) en el límite apropiado. Fíjate en las resonancias: T = 1 cada vez que el argumento del seno es múltiplo de π.',
  },
  '2.161': {
    id: '2.161',
    chapter: 2,
    label: 'R y T desde la izquierda con la S-matrix',
    latex: 'R_l = \frac{|B|^2}{|A|^2}\Big|_{G=0} = |S_{11}|^2, \qquad T_l = \frac{|F|^2}{|A|^2}\Big|_{G=0} = |S_{21}|^2',
    where: '§2.7 · p. 67',
    context:
      'Reflexión y transmisión desde la izquierda, escritas con elementos de la S-matrix (Ec. 2.160: (B, F)ᵗ = S(A, G)ᵗ). El 2.49 las usa para combinar dos trozos aislados de potencial y obtener la transmisión total.',
  },
  '2.162': {
    id: '2.162',
    chapter: 2,
    label: 'R y T desde la derecha con la S-matrix',
    latex: 'R_r = \\frac{|F|^2}{|G|^2}\\Big|_{A=0} = |S_{22}|^2, \\qquad T_r = \\frac{|B|^2}{|G|^2}\\Big|_{A=0} = |S_{12}|^2',
    where: '§2.7 · p. 67',
    context:
      'Reflexión y transmisión desde la derecha (A = 0), con los elementos restantes de la S-matrix. El 2.49 combina la física de ambos lados para los dos trozos aislados de potencial.',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Figuras citadas por los problemas
// ─────────────────────────────────────────────────────────────────────────────

export const BOOK_FIGURES: Record<string, BookFigureRef> = {
  '2.5': {
    id: '2.5',
    label: 'Primeros estados del oscilador y límite clásico',
    where: '§2.3 · p. 42',
    description:
      'En (a), los cuatro primeros estados estacionarios ψ₀-ψ₃ del oscilador armónico, cada uno con un nodo más. En (b), |ψ₁₀₀|² del estado n = 100 con la distribución clásica punteada superpuesta: a energías altas lo cuántico imita lo clásico. Para el 2.17(e) te sirve la parte (a): de ahí sacas ψ₀ y ψ₁, cuyas superposiciones |Ψ|² debes esbozar.',
  },
  '2.16': {
    id: '2.16',
    label: 'Scattering desde un «acantilado»',
    where: 'Prob. 2.41 · p. 69',
    description:
      'V = 0 a la izquierda de x = 0 y un escalón hacia abajo hasta −V₀ a la derecha (el libro dibuja un coche acercándose al borde). Un clásico cae y acelera; la onda cuántica se transmite y refleja a la vez — y con E < V₀ hay reflexión total aunque no haya ningún muro.',
  },
  '2.17': {
    id: '2.17',
    label: 'El doble pozo cuadrado',
    where: 'Prob. 2.44 · p. 71',
    description:
      'Dos pozos cuadrados de profundidad −V₀ y anchura a, separados por una barrera central de anchura b. El 2.44 lo usa para estudiar el túnel entre pozos y el par simétrico/antisimétrico de estados que produce.',
  },
  '2.18': {
    id: '2.18',
    label: 'Pared infinita + barrera delta',
    where: 'Prob. 2.46 · p. 72',
    description:
      'El potencial del 2.46: muro infinito en x = 0, una barrera delta en x = a y V = 0 más allá. La partícula arranca «en el pozo» (0, a) y su función de onda escapa lentamente por efecto túnel a través del delta.',
  },
  '2.19': {
    id: '2.19',
    label: 'Dos piezas aisladas de potencial',
    where: 'Prob. 2.49 · p. 73',
    description:
      'Dos trozos de potencial, M₁ y M₂, flotando en un mar de V = 0. El 2.49 te pide combinar sus transmisiones con la S-matrix — sin resolver nada nuevo dentro de las piezas.',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Notas al pie del TEXTO citadas por los problemas (no las del propio problema)
// ─────────────────────────────────────────────────────────────────────────────

export const BOOK_TEXT_FOOTNOTES: Record<number, BookFootnoteRef> = {
  22: {
    id: 22,
    label: 'Requisito del teorema de Plancherel',
    where: 'p. 46',
    text:
      'La condición necesaria y suficiente para aplicar el teorema de Plancherel es que ∫|f(x)|²dx sea finito (y entonces ∫|F(k)|²dk también lo es, con el mismo valor). La delta de Dirac no la cumple — de ahí el «apoplexy» del comentario del 2.25.',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Problemas de otros capítulos citados (Capítulo 1: fuera de la plataforma)
// ─────────────────────────────────────────────────────────────────────────────

export const EXTERNAL_PROBLEM_REFS: Record<string, ExternalProblemRef> = {
  '1.9a': {
    id: '1.9a',
    label: 'Corriente de probabilidad',
    latex: 'J = \\frac{i\\hbar}{2m} \\left( \\Psi\\, \\frac{\\partial \\Psi^*}{\\partial x} - \\Psi^*\\, \\frac{\\partial \\Psi}{\\partial x} \\right)',
    context:
      'El Problema 1.9(a) introduce la corriente de probabilidad: el flujo de probabilidad por unidad de tiempo que atraviesa el punto x. El 2.33 sugiere usarla para obtener la transmisión del escalón «de forma más elegante»: T = J_trans/J_inc ya tiene en cuenta que la onda transmitida viaja a otra velocidad. (El Capítulo 1 no está incluido en esta plataforma, centrada en el Capítulo 2.)',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getBookEquation(id: string): BookEquationRef | undefined {
  return BOOK_EQUATIONS[id]
}

export function getBookFigure(id: string): BookFigureRef | undefined {
  return BOOK_FIGURES[id]
}

export function getBookTextFootnote(n: number): BookFootnoteRef | undefined {
  return BOOK_TEXT_FOOTNOTES[n]
}

export function getExternalProblemRef(id: string): ExternalProblemRef | undefined {
  return EXTERNAL_PROBLEM_REFS[id]
}
