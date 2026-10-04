// Pistas graduadas + respuesta final — PARTE C: problemas 2.34 a 2.49
// Las pistas son contenido pedagógico ORIGINAL de la plataforma.
// Las respuestas finales son transcripción del solucionario oficial de Griffiths (2.ª ed.).

import type { ProblemHintsEntry } from './types'

export const PART_C: Record<string, ProblemHintsEntry> = {
  'bp-2-34': {
    hints: [
      { kind: 'reconocimiento', text: 'Dispersión unidimensional sobre un potencial *localizado*, vista desde la matriz S: en vez de perseguir $R$ y $T$ por separado, empaqueta toda la información en la relación lineal entre amplitudes *salientes* ($B$, $F$) y *entrantes* ($A$, $G$). Es la misma física del pozo delta de la sección 2.5, solo que reorganizada.' },
      { kind: 'planteamiento', text: 'Escribe $\\psi$ por regiones: $Ae^{ikx} + Be^{-ikx}$ a la izquierda del pozo y $Fe^{ikx} + Ge^{-ikx}$ a la derecha. Impón continuidad de $\\psi$ en el origen y el salto de $\\psi\'$ que dicta la Ec. 2.125 (con el signo del pozo, $-2m\\alpha/\\hbar^2$), y despeja $B$ y $F$ en términos de $A$ y $G$.' },
      { kind: 'tecnica', text: 'Define desde el principio $\\beta \\equiv m\\alpha/\\hbar^2 k$: todas las ecuaciones se limpian. Para despeigar cómodo, reescribe las condiciones de frontera como $F + G = \\dots$ y $F - G = \\dots$ y súmalas/réstalas — así $B$ y $F$ caen casi sin álgebra.' },
      { kind: 'verificacion', text: 'El estado ligado debe asomar como un *polo* de $S$ con $k$ imaginario puro ($k = i\\kappa$, $\\kappa > 0$): la energía que salga ahí tiene que coincidir con la Ec. 2.111. Comprueba también que la matriz es unitaria ($|S_{11}|^2 + |S_{21}|^2 = 1$) y que $\\alpha \\to 0$ devuelve la identidad.' },
    ],
    finalAnswer: {
      answer: '$S = \\frac{1}{1 - i\\beta}\\begin{pmatrix} i\\beta & 1 \\\\ 1 & i\\beta \\end{pmatrix}$, con $\\beta \\equiv \\frac{m\\alpha}{\\hbar^2 k}$ ($k = \\sqrt{2mE}/\\hbar$). El estado ligado corresponde al polo en $1 - i\\beta = 0$, es decir $k = i\\,m\\alpha/\\hbar^2$, que da $E = -m\\alpha^2/2\\hbar^2$, de acuerdo con la Ec. 2.111.',
      page: 54,
      note: 'La 2.ª ed. fusiona los antiguos 2.34 y 2.35 en el problema 2.52; su solución oficial se detiene en la S-matrix, y la energía del estado ligado (polo de $S$ en el eje imaginario) se completa aquí para responder al enunciado de la 1.ª ed.',
    },
  },
  'bp-2-35': {
    hints: [
      { kind: 'reconocimiento', text: 'El mismo formalismo S del problema anterior, pero el enunciado te avisa del atajo: como el pozo es *par* ($V(-x) = V(x)$), dispersar desde la derecha es dispersar desde la izquierda con $x \\to -x$ (y $A \\leftrightarrow G$, $B \\leftrightarrow F$). Eso fija dos relaciones entre los elementos de S y reduce el trabajo a la mitad.' },
      { kind: 'planteamiento', text: 'Con la convención $\\begin{pmatrix} B \\\\ F \\end{pmatrix} = S\\begin{pmatrix} A \\\\ G \\end{pmatrix}$, la simetría da $S_{11} = S_{22}$ y $S_{12} = S_{21}$. Solo necesitas dos números: la amplitud de transmisión ($S_{21}$) y la de reflexión ($S_{11}$) para incidencia desde la izquierda.' },
      { kind: 'tecnica', text: 'No rehagas las condiciones de frontera: son las del pozo finito de la sección 2.6. Recupera del texto la amplitud transmitida y la reflejada; ambas comparten el factor de fase $e^{-2ika}$ y el denominador $\\cos(2la) - i\\,\\frac{k^2 + l^2}{2kl}\\sin(2la)$, con $k = \\sqrt{2mE}/\\hbar$ y $l = \\sqrt{2m(E + V_0)}/\\hbar$.' },
      { kind: 'verificacion', text: 'Comprueba la unitariedad ($|S_{11}|^2 + |S_{21}|^2 = 1$) y el límite $V_0 \\to 0$ ($l \\to k$): el denominador se vuelve $e^{-2ila}$ y la matriz S debe reducirse a la identidad — sin pozo no hay dispersión.' },
    ],
    finalAnswer: {
      answer: 'Por simetría, $S_{11} = S_{22}$ y $S_{12} = S_{21}$, y $$S = \\frac{e^{-2ika}}{\\cos(2la) - i\\,\\frac{k^2+l^2}{2kl}\\sin(2la)}\\begin{pmatrix} i\\,\\frac{l^2-k^2}{2kl}\\sin(2la) & 1 \\\\ 1 & i\\,\\frac{l^2-k^2}{2kl}\\sin(2la) \\end{pmatrix}$$ (con $k = \\sqrt{2mE}/\\hbar$, $l = \\sqrt{2m(E+V_0)}/\\hbar$).',
      page: 54,
      note: 'La 2.ª ed. fusiona este problema con el 2.34 (problema 2.52); la solución oficial toma las amplitudes del pozo finito de las Ecs. 2.167–2.168 de la 2.ª ed. y explota la simetría del potencial.',
    },
  },
  'bp-2-36': {
    hints: [
      { kind: 'reconocimiento', text: 'Un estado inicial en el pozo infinito que **no** es estacionario: la jugada siempre es la misma — expandir en la base $\\psi_n$ y colgarle a cada término su fase $e^{-iE_n t/\\hbar}$. La forma $\\sin^3$ es un regalo: esconde una combinación de muy pocos estados.' },
      { kind: 'planteamiento', text: 'Primero normaliza $\\Psi(x,0)$ y descomponla: $\\Psi(x,0) = \\sum_n c_n\\psi_n(x)$. Después escribe la evolución general (Ec. 2.17) y forma $|\\Psi(x,t)|^2$: los términos cruzados son los que pueden hacer oscilar $\\langle x \\rangle$.' },
      { kind: 'tecnica', text: 'Usa la identidad $\\sin 3\\theta = 3\\sin\\theta - 4\\sin^3\\theta$ para reescribir la condición inicial con senos "buenos" — solo dos estados estacionarios sobreviven. Para el término cruzado de $\\langle x \\rangle$, ataca la integral $\\int x\\,\\psi_1\\psi_3\\,dx$ convirtiendo el producto de senos en suma de cosenos.' },
      { kind: 'verificacion', text: 'Tu $\\langle x \\rangle(t)$ debe vivir en $[0, a]$ para todo $t$. Como control independiente, evalúala en $t = 0$ directamente con $|\\Psi(x,0)|^2$ y comprueba que tu fórmula general lo reproduce; fíjate también en qué simetría de la condición inicial te permite anticipar ese valor.' },
    ],
    finalAnswer: {
      answer: '$\\Psi(x,0) = \\frac{1}{\\sqrt{10}}\\left[3\\psi_1(x) - \\psi_3(x)\\right]$ (con $A = 4/\\sqrt{5a}$), así que $\\Psi(x,t) = \\frac{1}{\\sqrt{10}}\\left[3\\psi_1(x)e^{-iE_1 t/\\hbar} - \\psi_3(x)e^{-iE_3 t/\\hbar}\\right]$, y como $\\langle x \\rangle_n = a/2$ y $\\int_0^a x\\,\\psi_1\\psi_3\\,dx = 0$: $$\\langle x \\rangle(t) = \\frac{9}{10}\\cdot\\frac{a}{2} + \\frac{1}{10}\\cdot\\frac{a}{2} = \\frac{a}{2}.$$',
      page: 41,
    },
  },
  'bp-2-37': {
    hints: [
      { kind: 'reconocimiento', text: 'Valores esperados en el estado estacionario $n$ del oscilador: no hay integrales que valgan — es puro *álgebra de operadores escalera*. El enunciado te regala la estrategia (expresar $x$ y $p$ con $a_\\pm$) y la ortogonalidad hace el resto.' },
      { kind: 'planteamiento', text: 'Parte de $x = \\sqrt{\\frac{\\hbar}{2m\\omega}}\\,(a_+ + a_-)$ y $p = i\\sqrt{\\frac{\\hbar m\\omega}{2}}\\,(a_+ - a_-)$, junto con las reglas $a_+\\psi_n = \\sqrt{n+1}\\,\\psi_{n+1}$ y $a_-\\psi_n = \\sqrt{n}\\,\\psi_{n-1}$. Los valores esperados lineales salen a la vista; los cuadrados piden expandir.' },
      { kind: 'tecnica', text: 'En $(a_+ \\pm a_-)^2$ trata los cuatro términos por separado: $a_+^2$ y $a_-^2$ te llevan a $\\psi_{n\\pm2}$ (que la ortogonalidad mata al integrar contra $\\psi_n^*$), mientras que $a_+a_-$ y $a_-a_+$ devuelven múltiplos de $\\psi_n$. Ojo: $a_+$ y $a_-$ **no** conmutan, no los agrupes.' },
      { kind: 'verificacion', text: 'Comprueba que $\\langle T \\rangle + \\langle V \\rangle = E_n = (n + \\frac{1}{2})\\hbar\\omega$ (y el teorema del virial del oscilador exige además que cinética y potencial se repartan $E_n$ a medias), así como que $\\sigma_x\\sigma_p \\geq \\hbar/2$, saturado solo para $n = 0$.' },
    ],
    finalAnswer: {
      answer: '$\\langle x \\rangle = \\langle p \\rangle = 0$; $\\langle x^2 \\rangle = \\frac{\\hbar}{2m\\omega}(2n+1) = \\left(n + \\frac{1}{2}\\right)\\frac{\\hbar}{m\\omega}$; $\\langle p^2 \\rangle = \\frac{m\\hbar\\omega}{2}(2n+1) = \\left(n + \\frac{1}{2}\\right)m\\hbar\\omega$; $\\langle T \\rangle = \\frac{\\langle p^2 \\rangle}{2m} = \\frac{1}{2}\\left(n + \\frac{1}{2}\\right)\\hbar\\omega$; $\\sigma_x = \\sqrt{\\left(n+\\frac{1}{2}\\right)\\frac{\\hbar}{m\\omega}}$, $\\sigma_p = \\sqrt{\\left(n+\\frac{1}{2}\\right)m\\hbar\\omega}$, y $\\sigma_x\\sigma_p = \\left(n + \\frac{1}{2}\\right)\\hbar \\geq \\frac{\\hbar}{2}$.',
      page: 22,
      note: 'El manual no evalúa $\\langle V(x) \\rangle$ por separado; se obtiene de $\\langle V \\rangle = E_n - \\langle T \\rangle = \\frac{1}{2}(n + \\frac{1}{2})\\hbar\\omega$, de modo que $\\langle T \\rangle = \\langle V \\rangle = E_n/2$, como exige el teorema del virial.',
    },
  },
  'bp-2-38': {
    hints: [
      { kind: 'reconocimiento', text: 'Un oscilador armónico al que le cortaron la mitad izquierda con una pared infinita: la mitad derecha es *literalmente* la del oscilador completo, solo que la pared impone una condición extra en $x = 0$. La pista del enunciado ("muy poca calculación") señala que no hay que resolver nada nuevo.' },
      { kind: 'planteamiento', text: 'Para $x > 0$ la ecuación de Schrödinger es idéntica a la del oscilador, así que las soluciones admisibles son las $\\psi_n$ de la sección 2.3. Las condiciones de frontera: $\\psi \\to 0$ cuando $x \\to +\\infty$ (ya cuidada por las $\\psi_n$) y $\\psi(0) = 0$ (la pared nueva).' },
      { kind: 'tecnica', text: 'La pregunta clave es qué familia de $\\psi_n$ se anula en el origen: las de $n$ par (funciones pares) o las de $n$ impar (funciones impares). Selecciona las que sobreviven a la pared y lee sus energías de la fórmula estándar $E_n = (n + \\frac{1}{2})\\hbar\\omega$.' },
      { kind: 'verificacion', text: 'La primera energía debe ser más alta que la del estado fundamental del oscilador completo (la pared endurece el sistema), y entre niveles consecutivos admitidos debe haber un espaciado constante, múltiplo entero de $\\hbar\\omega$. El estado fundamental debe tener además la misma forma funcional que un estado excitado del oscilador completo.' },
    ],
    finalAnswer: {
      answer: 'La pared en $x = 0$ elimina todas las soluciones pares ($n = 0, 2, 4,\\dots$) y deja solo las impares: $$E_n = \\left(n + \\frac{1}{2}\\right)\\hbar\\omega, \\qquad n = 1, 3, 5, \\dots$$',
      page: 45,
    },
  },
  'bp-2-39': {
    hints: [
      { kind: 'reconocimiento', text: 'Un pozo infinito de anchura $2a$ con una barrera delta en el centro: problema de condiciones de frontera con simetría de paridad. Como la delta está en el origen y el pozo es simétrico, las soluciones se separan en pares e impares, tal como pide el enunciado. La física interesante: la barrera solo la "sienten" las funciones que no se anulan en el origen.' },
      { kind: 'planteamiento', text: 'Dentro del pozo $\\psi = A\\sin kx + B\\cos kx$ con $\\psi(\\pm a) = 0$; la delta impone continuidad en $x = 0$ más el salto de $\\psi\'$ con signo de *barrera* ($+2m\\alpha/\\hbar^2$). Para las impares $\\psi(0) = 0$ lo simplifica todo; para las pares, usa la paridad y escribe $\\psi$ solo en $(0, a)$.' },
      { kind: 'tecnica', text: 'En las pares, el salto de $\\psi\'$ en el origen relaciona $B$ con $A$, y $\\psi(a) = 0$ deja una ecuación trascendente del tipo $\\tan(ka) = -(\\text{recta en } k)$. Resuélvela gráficamente (intersecciones de la tangente con una recta): de ahí salen los niveles permitidos.' },
      { kind: 'verificacion', text: 'Estudia los límites que pide el enunciado: $\\alpha \\to 0$ debe recuperar el pozo infinito normal de anchura $2a$ (la recta se vuelve vertical), y $\\alpha \\to \\infty$ debe partir el pozo en dos de anchura $a$. Las impares, en cambio, no deben moverse para nada — asegúrate de entender por qué.' },
    ],
    finalAnswer: {
      answer: 'Pares: $\\tan(ka) = -\\frac{\\hbar^2 k}{m\\alpha}$, con $\\psi(x) = A\\left[\\sin kx + \\frac{\\hbar^2 k}{m\\alpha}\\cos kx\\right]$ ($0 \\le x \\le a$): las energías quedan ligeramente *por encima* de $E_n = \\frac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$ ($n = 1, 3, 5,\\dots$). Con $\\alpha \\to 0$ se reducen a las del pozo infinito ordinario; con $\\alpha \\to \\infty$, $E_n \\to \\frac{n^2\\pi^2\\hbar^2}{2ma^2}$ (dos pozos aislados de anchura $a$). Impares: $\\psi(x) = A\\sin(kx)$ con $ka = \\frac{n\\pi}{2}$ ($n = 2, 4, 6,\\dots$), es decir $E_n = \\frac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$ exactamente: al anularse en el origen, nunca "sienten" la delta.',
      page: 47,
    },
  },
  'bp-2-40': {
    hints: [
      { kind: 'reconocimiento', text: 'La continuación del paquete gaussiano libre que ya resolviste en el Problema 2.22: mismo andamiaje (normalizar, transformar, evolucionar, medir dispersión), pero el factor $e^{ilx}$ desplaza el contenido en momentos. Reconocer qué piezas son "copia del problema anterior" es el 80% del trabajo.' },
      { kind: 'planteamiento', text: 'Normaliza igual que en 2.22(a): el factor de fase $e^{ilx}$ no toca $|\\Psi|^2$. Para $\\phi(k)$ calcula $\\frac{1}{\\sqrt{2\\pi}}\\int \\Psi(x,0)\\,e^{-ikx}dx$ y observa que la gaussiana a integrar es la de antes con el corrimiento $k \\to k - l$.' },
      { kind: 'tecnica', text: 'En la integral de evolución, completa el cuadrado del exponente en $k$ (centrado ahora en $k = l$, no en $k = 0$); el cambio de variable $k\' = k - l$ reduce todo al caso estacionario, dejando solo fases del tipo $e^{ilx}$. Define $\\theta \\equiv 2\\hbar at/m$ como antes para que $|\\Psi|^2$ salga casi de memoria.' },
      { kind: 'verificacion', text: 'En $t = 0$ tu resultado debe ser exactamente $Ae^{-ax^2}e^{ilx}$. Después, $|\\Psi|^2$ debe seguir siendo la gaussiana "aplanada" del problema estacionario, solo que su centro ya no está quieto: se mueve a velocidad constante (la velocidad de grupo de la sección 2.4). Y $\\sigma_x\\sigma_p \\geq \\hbar/2$ debe seguir cumpliéndose con los mismos valores que en 2.22.' },
    ],
    finalAnswer: {
      answer: '(a) $A = (2a/\\pi)^{1/4}$. (b) $\\phi(k) = \\frac{1}{(2\\pi a)^{1/4}}e^{-(k-l)^2/4a}$. (c) $\\Psi(x,t) = \\left(\\frac{2a}{\\pi}\\right)^{1/4}\\frac{e^{-l^2/4a}\\,e^{a(ix + l/2a)^2/(1 + 2i\\hbar at/m)}}{\\sqrt{1 + 2i\\hbar at/m}}$; $|\\Psi|^2$ es igual que en el caso estacionario con $x \\to x - \\frac{\\hbar l}{m}t$: la gaussiana que se aplana, pero ahora con el centro moviéndose a velocidad constante $v = \\hbar l/m$. (d) $\\langle x \\rangle = \\frac{\\hbar l}{m}t$; $\\langle p \\rangle = \\hbar l$; $\\langle x^2 \\rangle = \\frac{1}{4w^2} + \\left(\\frac{\\hbar lt}{m}\\right)^2$; $\\langle p^2 \\rangle = \\hbar^2(a + l^2)$. (e) $\\sigma_x = \\frac{1}{2w}$, $\\sigma_p = \\hbar\\sqrt{a}$: iguales que antes, así que el principio de incertidumbre se sigue cumpliendo (con $\\theta \\equiv 2\\hbar at/m$, $w \\equiv \\sqrt{a/(1+\\theta^2)}$).',
      page: 47,
    },
  },
  'bp-2-41': {
    hints: [
      { kind: 'reconocimiento', text: 'Dispersión sobre un escalón de potencial, pero *hacia abajo*: la partícula entra en una región donde hay más energía cinética disponible ($l > k$). El cálculo es el del escalón de la sección 2.5 con los papeles de $k$ y $l$ intercambiados; la sorpresa es que todavía hay reflexión. La parte (b) es física conceptual, no álgebra.' },
      { kind: 'planteamiento', text: 'Escribe $\\psi = Ae^{ikx} + Be^{-ikx}$ para $x < 0$ y $\\psi = Fe^{ilx}$ para $x > 0$ (a la derecha no hay onda que regrese), con $k = \\sqrt{2mE}/\\hbar$ y $l = \\sqrt{2m(E + V_0)}/\\hbar$. Impón continuidad de $\\psi$ y de $\\psi\'$ en $0$ y despeja $B/A$.' },
      { kind: 'tecnica', text: 'El despeje te deja $B/A$ como cociente de diferencias; para expresar $R = |B/A|^2$ en función de $E$ y $V_0$ saca factor común y usa $\\frac{l-k}{l+k} = \\frac{\\sqrt{E+V_0}-\\sqrt{E}}{\\sqrt{E+V_0}+\\sqrt{E}}$. Sustituye $E = V_0/3$ al final, no al principio.' },
      { kind: 'verificacion', text: 'Con $E = V_0/3$ el número debe salir como fracción sencilla; y en el límite $V_0 \\to 0$ debe irse a cero (sin escalón no hay reflexión). Para (b) pregúntate qué potencial ejerce de verdad la gravedad sobre el coche a lo largo de su trayectoria: ¿es una discontinuidad abrupta como este $V(x)$?' },
    ],
    finalAnswer: {
      answer: '(a) $R = \\left|\\frac{B}{A}\\right|^2 = \\left[\\frac{l-k}{l+k}\\right]^2 = \\left[\\frac{\\sqrt{E+V_0}-\\sqrt{E}}{\\sqrt{E+V_0}+\\sqrt{E}}\\right]^2 = \\left[\\frac{\\sqrt{1+V_0/E}-1}{\\sqrt{1+V_0/E}+1}\\right]^2$; con $E = V_0/3$: $R = \\left[\\frac{2-1}{2+1}\\right]^2 = \\frac{1}{9}$. (b) El acantilado real es bidimensional, y aun fingiendo que el coche cae en línea recta, el potencial a lo largo de la (retorcida, pero ya unidimensional) trayectoria es $V(x) = -mgx$ (con $x$ la coordenada vertical): una rampa lineal, no una discontinuidad.',
      page: 40,
      note: 'La 2.ª ed. reformuló el problema («M») y añade un apartado (c) numérico con el mismo cociente $V_0/E = 12/4 = 3$, que da $R = 1/9$ y $T = 8/9 = 0.8889$.',
    },
  },
  'bp-2-42': {
    hints: [
      { kind: 'reconocimiento', text: 'Una demostración guiada del teorema de unicidad: en una dimensión no hay estados ligados degenerados. La pista del enunciado no es un adorno — *es* la demostración completa si la sigues con cuidado. La herramienta central es una cantidad tipo Wronskiano que resulta ser constante.' },
      { kind: 'planteamiento', text: 'Escribe la ecuación de Schrödinger para $\\psi_1$ y para $\\psi_2$ (con la misma $E$), multiplica la primera por $\\psi_2^*$ y la segunda por $\\psi_1$, y resta: el término con $V$ se cancela y queda una divergencia total, $\\frac{d}{dx}\\left(\\psi_2^*\\frac{d\\psi_1}{dx} - \\psi_1\\frac{d\\psi_2^*}{dx}\\right) = 0$.' },
      { kind: 'tecnica', text: 'La constante que queda debe evaluarse en $\\pm\\infty$, donde los estados ligados se apagan. Para el paso final, separa variables en $\\psi_2^*\\psi_1\' = \\psi_1\\psi_2^{*\\prime}$ (divide entre $\\psi_1\\psi_2^*$) e integra: aparece un logaritmo que te dice que una función es múltiplo constante de la otra.' },
      { kind: 'verificacion', text: 'Identifica exactamente dónde usaste cada hipótesis: normalizabilidad, una dimensión, potencial real. Luego ataca el teorema desde fuera: la partícula libre y el anillo del problema siguiente sí son degenerados — localiza con precisión qué hipótesis falla en cada caso.' },
    ],
    finalAnswer: {
      answer: 'De la resta de las dos ecuaciones de Schrödinger, $\\frac{d}{dx}\\left(\\psi_2^*\\frac{d\\psi_1}{dx} - \\psi_1\\frac{d\\psi_2^*}{dx}\\right) = 0$, así que esa cantidad es una constante $K$; como $\\psi \\to 0$ en $\\pm\\infty$ para soluciones normalizables, $K = 0$. Entonces $\\frac{1}{\\psi_1}\\frac{d\\psi_1}{dx} = \\frac{1}{\\psi_2}\\frac{d\\psi_2}{dx}$, de donde $\\ln\\psi_1 = \\ln\\psi_2 + \\text{const}$, es decir $\\psi_1 = (\\text{const})\\,\\psi_2$: no son estados distintos. QED',
      page: 48,
    },
  },
  'bp-2-43': {
    hints: [
      { kind: 'reconocimiento', text: 'Una partícula libre en una topología nueva: un anillo. La ecuación de Schrödinger es la de la partícula libre, pero la condición $\\psi(x + a) = \\psi(x)$ sustituye a las condiciones de frontera del pozo. La física nueva está en qué valores de $k$ permite la periodicidad — y en la doble solución para cada energía.' },
      { kind: 'planteamiento', text: 'Resuelve como partícula libre: $\\psi = Ae^{ikx} + Be^{-ikx}$ con $E = \\hbar^2k^2/2m$, e impón la condición periódica. Para normalizar, integra sobre una vuelta completa: $\\int_0^a |\\psi|^2 dx = 1$.' },
      { kind: 'tecnica', text: 'La periodicidad exige que los coeficientes de $e^{ikx}$ y $e^{-ikx}$ se reproduzcan por separado; evaluar la condición en dos valores de $x$ bien elegidos (por ejemplo $x = 0$ y $x = \\pi/2k$) te lleva a $e^{ika} = 1$, es decir $ka = 2n\\pi$. Ojo con $n = 0$: ahí las dos soluciones se funden en una.' },
      { kind: 'verificacion', text: 'Las energías deben ser no negativas y crecer cuadráticamente con $n$, como corresponde a $E = \\hbar^2k^2/2m$; y el caso $n = 0$ debe darte un estado de energía nula. Finalmente, explica la degeneración doble señalando qué hipótesis del teorema del Problema 2.42 se rompe en el anillo.' },
    ],
    finalAnswer: {
      answer: '$$\\psi_n^{\\pm}(x) = \\frac{1}{\\sqrt{a}}\\,e^{\\pm i(2n\\pi x/a)}; \\qquad E_n = \\frac{2n^2\\pi^2\\hbar^2}{ma^2}, \\qquad n = 0, 1, 2, 3, \\dots$$ (para $n = 0$ hay una única solución). El teorema falla porque aquí $\\psi$ no tiende a cero en el infinito: $x$ está restringido a un intervalo finito y la constante $K$ del Problema 2.42 no puede determinarse.',
      page: 48,
      note: 'El manual de la 2.ª ed. denomina $L$ a la circunferencia del anillo; aquí se usa $a$, como en el enunciado de la 1.ª ed.',
    },
  },
  'bp-2-44': {
    hints: [
      { kind: 'reconocimiento', text: 'Un problema *estrictamente cualitativo*: las herramientas son las reglas de forma de las funciones de onda (continuidad, decaimiento exponencial en región prohibida, nodos que se suman de nivel en nivel, paridad). Los tres regímenes de $b$ son: un pozo simple de anchura $2a$, dos pozos acoplados por una barrera, y dos pozos aislados.' },
      { kind: 'planteamiento', text: 'En (a), dibuja región por región: fuera de los pozos la función decae exponencialmente; dentro es sinusoidal; en la barrera central (región prohibida) va como coseno hiperbólico (estado par) o seno hiperbólico (impar). Respeta el catálogo: $\\psi_1$ par y sin nodos, $\\psi_2$ impar con un nodo.' },
      { kind: 'tecnica', text: 'Para (b) no calcules: usa la Ec. 2.157 — el pozo finito de anchura $2a$ fija las energías de referencia en $b = 0$, y cada pozo aislado de anchura $a$ fija el destino cuando $b \\to \\infty$; entre ambos extremos interpola suavemente y observa que las dos curvas se acercan sin cruzarse.' },
      { kind: 'verificacion', text: 'La regla de oro cualitativa: dentro de un pozo $\\frac{d^2\\psi}{dx^2} = -\\frac{2m}{\\hbar^2}(V_0 + E)\\psi$, así que a más curvatura, más energía — úsala para ordenar tus bocetos y justificar la forma de las curvas $E_1(b)$ y $E_2(b)$. En (c) responde con tu gráfica de (b): ¿en qué configuración es mínima la energía del electrón?' },
    ],
    finalAnswer: {
      answer: '(a) (i) $b = 0$: pozo finito ordinario — decae exponencial fuera, sinusoidal dentro (coseno para $\\psi_1$, seno para $\\psi_2$); sin nodos $\\psi_1$, un nodo $\\psi_2$. (ii) $\\psi_1$ par y $\\psi_2$ impar: decaimiento exponencial fuera, senos dentro de los pozos y cosh/senh en la barrera. (iii) $b \\gg a$: función muy pequeña en la barrera — esencialmente dos pozos aislados, con $\\psi_1$ y $\\psi_2$ degenerados: combinaciones par e impar de los estados fundamentales de cada pozo. (b) Para $b = 0$: $E_1 + V_0 \\approx \\frac{\\pi^2\\hbar^2}{2m(2a)^2} = \\frac{h}{4}$ y $E_2 + V_0 \\approx \\frac{4\\pi^2\\hbar^2}{2m(2a)^2} = h$, con $h \\equiv \\frac{\\pi^2\\hbar^2}{2ma^2}$; para $b \\gg a$: $E_1 + V_0 \\approx E_2 + V_0 \\approx \\frac{\\pi^2\\hbar^2}{2ma^2} = h$ (de nuevo ligeramente por debajo): $E_1$ sube desde $h/4$ hasta $h$ y $E_2$ parte de $h$ y vuelve a $h$, acercándose a $E_1$. (c) En el estado fundamental (par) la energía es mínima con $b \\to 0$: el electrón tiende a *acercar* los núcleos (favorece el enlace); en el primer excitado (impar), el electrón *separa* los núcleos.',
      page: 49,
    },
  },
  'bp-2-45': {
    hints: [
      { kind: 'reconocimiento', text: 'El famoso *estado coherente* del oscilador: un paquete gaussiano que no se deforma y cuyo centro oscila como un oscilador clásico. La parte (a) no es "resolver" sino *verificar por sustitución*; las partes (b) y (c) extraen la física del resultado.' },
      { kind: 'planteamiento', text: 'En (a) deriva $\\Psi$ respecto a $t$, $x$ y $x^2$ con la regla de la cadena (el prefactor es constante: solo deriva el exponente). Sustituye todo en $i\\hbar\\,\\partial_t\\Psi = -\\frac{\\hbar^2}{2m}\\partial_x^2\\Psi + \\frac{1}{2}m\\omega^2x^2\\Psi$ y agrupa términos semejantes.' },
      { kind: 'tecnica', text: 'En (b), al multiplicar $\\Psi^*\\Psi$ el exponente se vuelve real salvo por los términos con $e^{\\pm 2i\\omega t}$: usa $1 + \\cos 2\\omega t = 2\\cos^2\\omega t$ hasta dejar un cuadrado perfecto de la forma $(x - \\text{algo que oscila})^2$. En (c), con $|\\Psi|^2$ ya gaussiano y centrado, los valores esperados salen sin integrar.' },
      { kind: 'verificacion', text: 'Comprueba Ehrenfest en (c): $m\\frac{d\\langle x\\rangle}{dt} = \\langle p \\rangle$ y $m\\frac{d\\langle p\\rangle}{dt} = -\\left\\langle\\frac{dV}{dx}\\right\\rangle$ con $V = \\frac{1}{2}m\\omega^2x^2$; y el movimiento del centro debe ser el del oscilador clásico — consistente entre lo que describiste en (b) y lo que calculaste en (c).' },
    ],
    finalAnswer: {
      answer: '(a) (Verificación por sustitución: ambos miembros dan $\\left[\\frac{1}{2}\\hbar\\omega + max\\omega^2e^{-i\\omega t} - \\frac{1}{2}m\\omega^2a^2e^{-2i\\omega t}\\right]\\Psi$.) (b) $$|\\Psi(x,t)|^2 = \\sqrt{\\frac{m\\omega}{\\pi\\hbar}}\\;e^{-\\frac{m\\omega}{\\hbar}\\left(x - a\\cos\\omega t\\right)^2}:$$ un paquete gaussiano de forma fija cuyo centro oscila senoidalmente, con amplitud $a$ y frecuencia angular $\\omega$. (c) $\\langle x \\rangle = a\\cos\\omega t$; $\\langle p \\rangle = m\\frac{d\\langle x\\rangle}{dt} = -ma\\omega\\sin\\omega t$; y $\\frac{d\\langle p\\rangle}{dt} = -m\\omega^2a\\cos\\omega t = -\\left\\langle\\frac{dV}{dx}\\right\\rangle$: se satisface el teorema de Ehrenfest.',
      page: 51,
    },
  },
  'bp-2-46': {
    hints: [
      { kind: 'reconocimiento', text: 'Un estado *casi* ligado: pared infinita a la izquierda, barrera delta a distancia $a$, y túnel hacia el continuo a la derecha. Es la física de resonancias y decaimiento — y por eso el enunciado pone "energía" entre comillas: prepárate para un valor propio complejo.' },
      { kind: 'planteamiento', text: 'Dentro del pozo ($0 < x < a$) la solución es oscilatoria y debe anularse en $x = 0$; fuera ($x > a$) impón *solo onda saliente*, $\\propto e^{ikx}$. La delta en $x = a$ pide continuidad de $\\psi$ y el salto de $\\psi\'$ correspondiente a una barrera.' },
      { kind: 'tecnica', text: 'Con dos condiciones en $x = a$ y dos constantes de integración, la compatibilidad te deja una ecuación trascendente para $k$ (y por tanto para $E$) — con la condición de radiación puramente saliente, no tiene soluciones con $k$ real: ahí vive la complejidad.' },
      { kind: 'verificacion', text: 'Para (b), recuerda qué exigía la demostración del Problema 2.1a (autovalores reales): un hamiltoniano hermítico. Revisa cuál de tus condiciones de frontera rompe la hermiticidad (haz la integración por partes de $\\int\\psi^*H\\psi$ y mira los términos de superficie). Para (c), escribe $E = E_0 + i\\Gamma$ y sigue el módulo al cuadrado de la parte del paquete que vive en el pozo: el decaimiento exponencial te da el tiempo $1/e$ — cuidado con el factor exacto entre amplitud y probabilidad.' },
    ],
  },
  'bp-2-47': {
    hints: [
      { kind: 'reconocimiento', text: 'El estado ligado del pozo delta puesto en movimiento uniforme: un problema de *comprobación*, no de resolución — el enunciado te da la solución exacta y te pide verificarla. Reconocerás la estructura de "boost galileano" en la fase $e^{-i[(E + \\frac{1}{2}mv^2)t - mvx]/\\hbar}$.' },
      { kind: 'planteamiento', text: 'Calcula $\\partial\\Psi/\\partial t$, $\\partial\\Psi/\\partial x$ y $\\partial^2\\Psi/\\partial x^2$ y sustituye en la ecuación de Schrödinger dependiente del tiempo con $V(x,t) = -\\alpha\\delta(x - vt)$. Todo el cálculo local está en las derivadas de $|x - vt|$.' },
      { kind: 'tecnica', text: 'Escribe $\\frac{\\partial}{\\partial t}|x - vt| = -v[2\\theta(x - vt) - 1]$ y $\\frac{\\partial}{\\partial x}|x - vt| = 2\\theta(x - vt) - 1$; en la segunda derivada espacial aparece $\\frac{\\partial}{\\partial x}\\theta(x - vt) = \\delta(x - vt)$ (Problema 2.24b), que es quien engendra la delta del potencial. Agrupa los términos en potencias de $[2\\theta - 1]$ y verifica que se cancelan solos.' },
      { kind: 'verificacion', text: 'Para (b) usa $\\langle H \\rangle = \\int \\Psi^*(i\\hbar\\,\\partial_t\\Psi)\\,dx$: ya calculaste $i\\hbar\\partial_t\\Psi$ en (a), así que no hay trabajo nuevo (y el término con $[2\\theta - 1]$ es impar en $y = x - vt$, así que su integral se va a cero). Interpreta: en el límite $v \\to 0$ el resultado debe ser la energía de ligadura $E$ del pozo quieto.' },
    ],
    finalAnswer: {
      answer: '(a) (Verificación por sustitución: ambos miembros coinciden.) (b) $|\\Psi|^2 = \\frac{m\\alpha}{\\hbar^2}e^{-2m\\alpha|y|/\\hbar^2}$ (con $y \\equiv x - vt$), correctamente normalizada; $$\\langle H \\rangle = E + \\frac{1}{2}mv^2$$ (con $E = -m\\alpha^2/2\\hbar^2$). Interpretación: el paquete es arrastrado (a velocidad $v$) por el pozo delta; la energía total es la que tendría en un delta estacionario ($E$) más la energía cinética del movimiento ($\\frac{1}{2}mv^2$).',
      page: 52,
    },
  },
  'bp-2-48': {
    hints: [
      { kind: 'reconocimiento', text: 'El potencial de Pöschl–Teller, $-\\frac{\\hbar^2a^2}{m}\\mathrm{sech}^2(ax)$: un pozo célebre porque es *sin reflexión* — transmite todo, a cualquier energía. Tres movimientos: verificar el estado ligado, verificar las soluciones de dispersión y conectar con la matriz S del problema 2.34.' },
      { kind: 'planteamiento', text: 'En (a), deriva $\\psi_0 = A\\,\\mathrm{sech}(ax)$ dos veces (regla de la cadena) y sustituye en la ecuación de Schrödinger: debe salir un múltiplo constante de $\\psi_0$, y de ahí $E$. Para normalizar usa $\\frac{d}{du}\\tanh u = \\mathrm{sech}^2 u$.' },
      { kind: 'tecnica', text: 'La identidad que lo sostiene todo es $\\tanh^2 u + \\mathrm{sech}^2 u = 1$. En (b), al sustituir $\\psi_k$, los términos con $\\mathrm{sech}^2\\tanh$ van en parejas que se cancelan; para el comportamiento asintótico usa $\\tanh z \\to \\pm 1$ según el signo de $z$, y calcula $R$ y $T$ comparando los módulos al cuadrado de las amplitudes incidente y transmitida.' },
      { kind: 'verificacion', text: 'Comprueba que $T = 1$ para cualquier $k$ — la firma de un potencial sin reflexión. En (c), los estados ligados viven en los *polos* de los elementos de S con $k$ imaginario ($k = i\\kappa$): localízalos, cuenta cuántos hay y contrasta sus energías con lo que encontraste en (a).' },
    ],
    finalAnswer: {
      answer: '(a) $E_0 = -\\frac{\\hbar^2a^2}{2m}$; $\\psi_0(x) = \\sqrt{\\frac{a}{2}}\\,\\mathrm{sech}(ax)$. (b) Para $x \\to +\\infty$: $\\psi_k(x) \\to A\\,\\frac{ik - a}{ik + a}\\,e^{ikx}$ (onda transmitida); $R = 0$ y $T = \\left|\\frac{ik - a}{ik + a}\\right|^2 = \\frac{k^2 + a^2}{k^2 + a^2} = 1$ (potencial sin reflexión). (c) $S = \\begin{pmatrix} 0 & \\frac{ik - a}{ik + a} \\\\ \\frac{ik - a}{ik + a} & 0 \\end{pmatrix}$: un único polo en $ik + a = 0$, es decir $k = ia$ ($\\kappa = a$), que corresponde a **un solo** estado ligado, $E_0 = -\\hbar^2a^2/2m$, consistente con (a).',
      page: 54,
      note: 'La 2.ª ed. reformuló el problema («M») y la solución oficial (2.51) cubre solo (a) y (b); la S-matrix de (c) se reconstruye aquí de las formas asintóticas de (b) (sin onda reflejada, $S_{11} = S_{22} = 0$) y su polo reproduce el estado ligado de (a).',
    },
  },
  'bp-2-49': {
    hints: [
      { kind: 'reconocimiento', text: 'Un problema de *álgebra lineal de amplitudes*: cambiar de variables entre (salientes/entrantes) y (izquierda/derecha). Casi no hay física nueva — el valor está en que la matriz M se *compone*, lo que convierte un potencial complicado en un producto de piezas simples.' },
      { kind: 'planteamiento', text: 'Escribe el sistema $B = S_{11}A + S_{12}G$, $F = S_{21}A + S_{22}G$ y despeja $(F, G)$ en función de $(A, B)$: es una eliminación gaussiana 2×2. Para la relación inversa, el mismo juego al revés; conviene verificar que las fórmulas de ida y vuelta se anulan mutuamente.' },
      { kind: 'tecnica', text: 'En (c) ten claro qué fases introduce una delta situada en $x = a$: los elementos fuera de la diagonal llevan $e^{\\mp 2ika}$. En (d), al componer, la matriz del dispersor que la onda encuentra **primero** queda a la **derecha** del producto; y para $T$ usa $T = 1/|M_{22}|^2$ con la $M$ total.' },
      { kind: 'verificacion', text: 'Cada matriz de una delta debe tener determinante 1 (¿por qué? piensa en la conservación de la probabilidad al pasar de un lado al otro). La transmisión de la doble delta debe mostrar *resonancias* de transmisión perfecta a ciertos valores de $ka$ — interferencia entre las dos deltas — y reducirse a la de un pozo simple de fuerza $2\\alpha$ cuando las deltas coinciden ($a \\to 0$).' },
    ],
    finalAnswer: {
      answer: '(a) $M = \\frac{1}{S_{12}}\\begin{pmatrix} -\\det(S) & S_{22} \\\\ -S_{11} & 1 \\end{pmatrix}$; a la inversa, $S = \\frac{1}{M_{22}}\\begin{pmatrix} -M_{21} & 1 \\\\ \\det(M) & M_{12} \\end{pmatrix}$; y $R_l = |S_{11}|^2 = \\left|\\frac{M_{21}}{M_{22}}\\right|^2$, $T_l = |S_{21}|^2 = \\left|\\frac{\\det(M)}{M_{22}}\\right|^2$, $R_r = |S_{22}|^2 = \\left|\\frac{M_{12}}{M_{22}}\\right|^2$, $T_r = |S_{12}|^2 = \\frac{1}{|M_{22}|^2}$. (b) Con amplitudes intermedias $(C, D)$: $(C,D)^T = \\mathbf{M}_1(A,B)^T$ y $(F,G)^T = \\mathbf{M}_2(C,D)^T$, de modo que $\\mathbf{M} = \\mathbf{M}_2\\mathbf{M}_1$. (c) $M = \\begin{pmatrix} 1 + i\\beta & i\\beta e^{-2ika} \\\\ -i\\beta e^{2ika} & 1 - i\\beta \\end{pmatrix}$, con $\\beta \\equiv \\frac{m\\alpha}{\\hbar^2 k}$. (d) $M_1$ es la matriz de (c) y $M_2$ la misma con $a \\to -a$: $M = M_2M_1 = \\begin{pmatrix} 1 + 2i\\beta + \\beta^2(e^{4ika} - 1) & 2i\\beta(\\cos 2ka + \\beta\\sin 2ka) \\\\ -2i\\beta(\\cos 2ka + \\beta\\sin 2ka) & 1 - 2i\\beta + \\beta^2(e^{-4ika} - 1) \\end{pmatrix}$, y $$T = T_l = T_r = \\frac{1}{|M_{22}|^2} = \\frac{1}{1 + 4\\beta^2\\left(\\cos 2ka + \\beta\\sin 2ka\\right)^2}.$$',
      page: 56,
      note: 'Ojo en (d): el manual llama $M_1$ a la delta situada en $+a$ y compone $M = M_2M_1$, lo que equivale a intercambiar el orden de los dispersores (o a cambiar $\\alpha \\to -\\alpha$). Con el orden físico (incidiendo desde la izquierda, primero la delta en $-a$) el término $\\beta\\sin 2ka$ sale con signo opuesto: $T = 1/\\left[1 + 4\\beta^2(\\cos 2ka - \\beta\\sin 2ka)^2\\right]$ (verificado resolviendo directamente las condiciones de empalme; sus polos en $k = i\\kappa$ reproducen los estados ligados $\\kappa = \\frac{m\\alpha}{\\hbar^2}(1 \\pm e^{-2\\kappa a})$ de la doble delta, y sus resonancias $T = 1$ ocurren en $\\tan(2ka) = 1/\\beta$).',
    },
  },
}
