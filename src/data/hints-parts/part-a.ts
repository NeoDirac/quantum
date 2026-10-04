// Pistas graduadas + respuesta final — PARTE A: problemas 2.1 a 2.17
// Las pistas son contenido pedagógico ORIGINAL de la plataforma.
// Las respuestas finales son transcripción del solucionario oficial de Griffiths (2.ª ed.).

import type { ProblemHintsEntry } from './types'

export const PART_A: Record<string, ProblemHintsEntry> = {
  'bp-2-1': {
    hints: [
      { kind: 'reconocimiento', text: 'Tres *demostraciones* sobre la estructura general de la ecuación de Schrödinger independiente del tiempo: no hay nada que calcular, solo razonar con la *linealidad* de la ecuación y con la normalización. Fíjate en que (b) y (c) ya te dan la receta: fabricar soluciones nuevas a partir de una dada.' },
      { kind: 'planteamiento', text: 'En (a) escribe $E = E_0 + i\\Gamma$ en el factor temporal de la Ecuación 2.6 y calcula $|\\Psi(x,t)|^2$; luego impón que $\\int|\\Psi|^2dx = 1$ para *todo* $t$. En (b) y (c) parte de que, si $\\psi$ satisface la ecuación, también la satisfacen $\\psi^*$ (porque $V$ y $E$ son reales) y $\\psi(-x)$ (si $V$ es par).' },
      { kind: 'tecnica', text: 'El paso clave es la linealidad: si $\\psi_1$ y $\\psi_2$ satisfacen la ecuación con la misma $E$, también $c_1\\psi_1 + c_2\\psi_2$. Construye las combinaciones reales $\\psi + \\psi^*$ e $i(\\psi - \\psi^*)$, y las combinaciones par e impar $\\psi(x) \\pm \\psi(-x)$, y expresa $\\psi$ en términos de ellas.' },
      { kind: 'verificacion', text: 'Comprueba que cada combinación tiene la propiedad prometida (ser real, ser par o impar) y que satisface la misma ecuación con la misma energía. Para (a), pregúntate qué le pasa a $\\int|\\Psi|^2dx$ si $\\Gamma \\neq 0$: tendría que crecer o decaer exponencialmente con $t$.' },
    ],
    finalAnswer: {
      answer: '(a) $|\\Psi|^2 = |\\psi|^2 e^{2\\Gamma t/\\hbar}$: si la norma ha de valer 1 para todo $t$, forzosamente $\\Gamma = 0$, y $E$ es real. (b) $\\psi = \\frac{1}{2}\\left[(\\psi + \\psi^*) - i\\left(i(\\psi - \\psi^*)\\right)\\right]$: toda solución es combinación lineal de soluciones reales. (c) $\\psi(x) = \\frac{1}{2}\\left[\\psi_+(x) + \\psi_-(x)\\right]$, con $\\psi_\\pm(x) \\equiv \\psi(x) \\pm \\psi(-x)$ par e impar respectivamente.',
      page: 15,
    },
  },
  'bp-2-2': {
    hints: [
      { kind: 'reconocimiento', text: 'Es una demostración *cualitativa* por contradicción: no hay que resolver ninguna ecuación, solo razonar sobre la *concavidad* de $\\psi$. La pista del enunciado ya te entrega la ecuación en la forma que conviene mirar.' },
      { kind: 'planteamiento', text: 'Supón $E < V_{\\min}$ y escribe $\\frac{d^2\\psi}{dx^2} = \\frac{2m}{\\hbar^2}[V(x) - E]\\psi$: el corchete es positivo para todo $x$, así que $\\psi$ y su segunda derivada tienen siempre el mismo signo.' },
      { kind: 'tecnica', text: 'Razona geométricamente: donde $\\psi > 0$ también $\\frac{d^2\\psi}{dx^2} > 0$, de modo que la función *siempre se curva alejándose del eje*. Una función así, en cuanto se aparta de cero, ya no puede volver a acercarse asintóticamente a cero en $x \\to \\pm\\infty$, que es lo que exige la normalizabilidad.' },
      { kind: 'verificacion', text: 'Tu argumento debe romperse en cuanto exista una región con $E > V(x)$: ahí $\\psi$ puede curvar hacia el eje (piensa en los puntos de retorno). Como análogo clásico, recuerda que $E = T + V$ con $T \\ge 0$, así que la energía total nunca baja de $V_{\\min}$.' },
    ],
    finalAnswer: {
      answer: 'Si $E < V_{\\min}$, $\\psi$ y $\\frac{d^2\\psi}{dx^2}$ tienen siempre el mismo signo: $\\psi$ curva siempre alejándose del eje y, partiendo de cero en un extremo, no puede volver a cero en el otro: no es normalizable. (Análogo clásico: $E = T + V \\ge V_{\\min}$, pues $T \\ge 0$.)',
      page: 15,
    },
  },
  'bp-2-3': {
    hints: [
      { kind: 'reconocimiento', text: 'Es el caso particular del pozo infinito del teorema anterior, pero hecho por fuerza bruta: resolver la ecuación con $E \\le 0$ y comprobar que las condiciones de frontera $\\psi(0) = \\psi(a) = 0$ no admiten solución aceptable.' },
      { kind: 'planteamiento', text: 'Separa los dos casos. Con $E = 0$ la ecuación dentro del pozo se reduce a $\\frac{d^2\\psi}{dx^2} = 0$. Con $E < 0$ define $\\kappa^2 = -2mE/\\hbar^2 > 0$ y la solución general son exponenciales reales, no senos.' },
      { kind: 'tecnica', text: 'Aplica las dos condiciones de frontera a cada solución general ($A + Bx$ y $Ae^{\\kappa x} + Be^{-\\kappa x}$) y resuelve el sistema para las constantes: verás que te fuerzan hacia la solución trivial o hacia una condición imposible.' },
      { kind: 'verificacion', text: 'No podía salir otra cosa: que existiera una solución con $E \\le 0$ contradiría el Problema 2.2 (aquí $V_{\\min} = 0$), y las energías permitidas del pozo crecen como $n^2$, todas estrictamente positivas.' },
    ],
    finalAnswer: {
      answer: '($E = 0$): $\\psi = A + Bx$; $\\psi(0) = 0 \\Rightarrow A = 0$ y $\\psi(a) = 0 \\Rightarrow B = 0$. ($E < 0$): $\\psi = Ae^{\\kappa x} + Be^{-\\kappa x}$ con $\\kappa^2 = -2mE/\\hbar^2$; $\\psi(0) = 0 \\Rightarrow B = -A$, y entonces $\\psi(a) = 0$ exige $e^{2\\kappa a} = 1$, es decir $\\kappa = 0$. En todos los casos las condiciones de frontera fuerzan $\\psi = 0$ (no normalizable).',
      page: 15,
    },
  },
  'bp-2-4': {
    hints: [
      { kind: 'reconocimiento', text: 'El mismo pozo infinito del texto, pero *centrado en el origen*: la señal clave es la simetría $V(-x) = V(x)$. Por el teorema (c) del Problema 2.1, conviene buscar por separado soluciones pares e impares.' },
      { kind: 'planteamiento', text: 'Dentro del pozo la solución general es $A\\sin(kx) + B\\cos(kx)$, con $k = \\sqrt{2mE}/\\hbar$; fuera, $\\psi = 0$. Impón que $\\psi$ se anule en las dos paredes del pozo.' },
      { kind: 'tecnica', text: 'Al escribir las condiciones en las dos paredes simétricas, *súmalas y réstalas*: se desacoplan en una condición solo para $A$ (solución impar) y otra solo para $B$ (solución par). Cada una cuantiza $k$ en una familia distinta; después normaliza con $\\int|\\psi|^2dx = 1$.' },
      { kind: 'verificacion', text: 'Tus energías deben reproduccir la Ecuación 2.23 con la anchura correcta de *este* pozo, y aplicando la sustitución $x \\to x - a/2$ a las $\\psi_n$ del texto (Ecuación 2.24) deben salir tus soluciones, quizá con un signo global $\\pm$ físicamente irrelevante.' },
    ],
    finalAnswer: {
      answer: 'Con $\\psi(\\pm a) = 0$: restando las dos condiciones, $A\\sin(ka) = 0 \\Rightarrow ka = j\\pi$; con $n = 2j$ (par), $k = n\\pi/2a$ y $\\psi_n = \\frac{1}{\\sqrt a}\\sin\\frac{n\\pi x}{2a}$. Sumando, $B\\cos(ka) = 0 \\Rightarrow ka = (j - \\frac{1}{2})\\pi$; con $n = 2j-1$ (impar), $\\psi_n = \\frac{1}{\\sqrt a}\\cos\\frac{n\\pi x}{2a}$. En ambos casos $E_n = \\frac{\\hbar^2k^2}{2m} = \\frac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$ (pozo de anchura $2a$). La sustitución $x \\to (x+a)/2$ en la Ec. 2.28 da $\\sqrt{\\frac{2}{a}}\\sin\\frac{n\\pi(x+a)}{2a} = (-1)^{n/2}\\sqrt{\\frac{2}{a}}\\sin\\frac{n\\pi x}{2a}$ ($n$ par) o bien $(-1)^{(n-1)/2}\\sqrt{\\frac{2}{a}}\\cos\\frac{n\\pi x}{2a}$ ($n$ impar): las mismas funciones, salvo normalización y signo.',
      page: 40,
      note: 'La 2.ª ed. reformuló el problema con un pozo de anchura $2a$ ($-a < x < a$); la constante de normalización es $\\sqrt{2/(2a)}$. En la convención de la 1.ª ed. ($-a/2 < x < a/2$, anchura $a$): $\\psi_n = \\sqrt{2/a}\\cos(n\\pi x/a)$ ($n$ impar), $\\psi_n = \\sqrt{2/a}\\sin(n\\pi x/a)$ ($n$ par), $E_n = n^2\\pi^2\\hbar^2/2ma^2$, y la sustitución de comprobación es $x \\to x - a/2$.',
    },
  },
  'bp-2-5': {
    hints: [
      { kind: 'reconocimiento', text: 'Cálculo directo de valores esperados en un *estado estacionario* del pozo infinito: pura integral definida con senos. La física está en el resultado final (principio de incertidumbre); el trabajo está en las integrales.' },
      { kind: 'planteamiento', text: 'Escribe $\\psi_n = \\sqrt{2/a}\\sin(n\\pi x/a)$ y calcula $\\langle x\\rangle$ y $\\langle x^2\\rangle$ con la densidad $|\\psi_n|^2$. Para $\\langle p\\rangle$ y $\\langle p^2\\rangle$ usa $\\hat p = -i\\hbar\\,\\partial/\\partial x$; para $\\langle p\\rangle$ hay un atajo: al ser un estado estacionario, $\\langle p\\rangle = m\\,d\\langle x\\rangle/dt$.' },
      { kind: 'tecnica', text: 'La integral de $x^2\\sin^2$ se resuelve con $\\sin^2\\theta = (1 - \\cos 2\\theta)/2$ y el cambio $y = n\\pi x/a$, integrando por partes lo que quede. Para $\\langle p^2\\rangle$ aprovecha $\\hat H\\psi_n = E_n\\psi_n$: en el pozo toda la energía es cinética, así que $\\langle p^2\\rangle/2m = E_n$.' },
      { kind: 'verificacion', text: 'Checa la simetría: $\\langle x\\rangle$ debe caer en el centro del pozo y $\\langle p\\rangle$ ser cero. Al final forma $\\sigma_x\\sigma_p$: debe respetar el principio de incertidumbre para todo $n$, y el estado que quede más cerca del límite debe ser el fundamental.' },
    ],
    finalAnswer: {
      answer: '$\\langle x\\rangle = a/2$ (independiente de $n$); $\\langle x^2\\rangle = a^2\\left[\\frac{1}{3} - \\frac{1}{2(n\\pi)^2}\\right]$; $\\langle p\\rangle = 0$; $\\langle p^2\\rangle = 2mE_n = \\left(\\frac{n\\pi\\hbar}{a}\\right)^2$; $\\sigma_x = a\\sqrt{\\frac{1}{12} - \\frac{1}{2(n\\pi)^2}}$; $\\sigma_p = \\frac{n\\pi\\hbar}{a}$; $\\sigma_x\\sigma_p = \\frac{\\hbar}{2}\\sqrt{\\frac{(n\\pi)^2}{3} - 2} > \\frac{\\hbar}{2}$, y es mínimo para $n = 1$: $\\sigma_x\\sigma_p = 1.136\\,(\\hbar/2)$.',
      page: 16,
    },
  },
  'bp-2-6': {
    hints: [
      { kind: 'reconocimiento', text: 'Superposición de *dos* estados estacionarios del pozo: la clave es que $|\\Psi(x,t)|^2$ ya no es constante en el tiempo, porque las fases $e^{-iE_nt/\\hbar}$ giran a velocidades distintas. Con la definición $\\omega = \\pi^2\\hbar/2ma^2$ del enunciado, $E_n/\\hbar = n^2\\omega$.' },
      { kind: 'planteamiento', text: '(a) Usa la ortonormalidad: en $\\int|\\Psi|^2dx$ los términos cruzados se anulan y solo quedan las normas de $\\psi_1$ y $\\psi_2$. (b) Evoluciona cada término con su propia fase y factoriza $e^{-iE_1t/\\hbar}$ para que en el término cruzado solo aparezca la *diferencia* $E_2 - E_1$.' },
      { kind: 'tecnica', text: 'En $|\\Psi|^2$ aparece el producto cruzado $\\psi_1\\psi_2$ con fases opuestas: la fórmula de Euler los convierte en un coseno del tiempo. Para $\\langle x\\rangle$ necesitas $\\int x\\sin^2$ (por partes) y $\\int x\\sin\\cdot\\sin$ (convierte el producto en suma de senos); el resto es derivar respecto a $t$.' },
      { kind: 'verificacion', text: 'La amplitud de la oscilación de $\\langle x\\rangle$ no puede pasar de $a/2$: la partícula está encerrada (¡el propio enunciado te advierte de la cárcel!). En (e), $\\langle H\\rangle$ debe caer entre $E_1$ y $E_2$, y en (d) puedes contrastar con $\\langle p\\rangle = m\\,d\\langle x\\rangle/dt$.' },
    ],
    finalAnswer: {
      answer: '(a) $A = 1/\\sqrt2$. (b) $\\Psi(x,t) = \\frac{1}{\\sqrt2}\\left[\\sin\\frac{\\pi x}{a}e^{-i\\omega t} + \\sin\\frac{2\\pi x}{a}e^{-4i\\omega t}\\right] = \\frac{1}{\\sqrt2}e^{-i\\omega t}\\left[\\sin\\frac{\\pi x}{a} + e^{-3i\\omega t}\\sin\\frac{2\\pi x}{a}\\right]$; $|\\Psi|^2 = \\frac{1}{a}\\left[\\sin^2\\frac{\\pi x}{a} + \\sin^2\\frac{2\\pi x}{a} + 2\\sin\\frac{\\pi x}{a}\\sin\\frac{2\\pi x}{a}\\cos(3\\omega t)\\right]$. (c) $\\langle x\\rangle = \\frac{a}{2}\\left[1 - \\frac{32}{9\\pi^2}\\cos(3\\omega t)\\right]$; amplitud $\\frac{32}{9\\pi^2}\\cdot\\frac{a}{2} = 0.3603\\,(a/2)$; frecuencia angular $3\\omega = \\frac{3\\pi^2\\hbar}{2ma^2}$. (d) $\\langle p\\rangle = \\frac{8\\hbar}{3a}\\sin(3\\omega t)$. (e) $\\langle H\\rangle = \\frac{1}{2}(E_1 + E_2) = \\frac{5\\pi^2\\hbar^2}{4ma^2}$, la media de $E_1$ y $E_2$.',
      page: 17,
      note: 'El apartado (f) no aparece en el problema de la 2.ª ed. Clásicamente, con $E = \\langle H\\rangle$: $v = \\sqrt{2\\langle H\\rangle/m} = \\frac{\\pi\\hbar}{ma}\\sqrt{5/2}$ y la frecuencia angular del rebote es $\\omega_{cl} = \\pi v/a = \\sqrt{5/2}\\,\\frac{\\pi^2\\hbar}{ma^2}$, apenas ~5% mayor que la cuántica $3\\omega$.',
    },
  },
  'bp-2-7': {
    hints: [
      { kind: 'reconocimiento', text: 'Es el problema 2.6 con una fase relativa $e^{i\\phi}$ entre los dos coeficientes de la expansión. La fase *global* de $\\Psi$ no tiene efecto físico, pero esta relativa sí: aparecerá corriendo los cosenos temporales.' },
      { kind: 'planteamiento', text: 'Repite la estructura del 2.6: $\\Psi(x,t) = A[\\psi_1 e^{-iE_1t/\\hbar} + e^{i\\phi}\\psi_2 e^{-iE_2t/\\hbar}]$, factoriza la fase de $E_1$ y calcula $|\\Psi|^2$: el término cruzado arrastra $e^{i\\phi}$ y su conjugado.' },
      { kind: 'tecnica', text: 'Al juntar $e^{i\\phi}e^{-i(E_2-E_1)t/\\hbar}$ con su conjugado, la suma es un coseno con la fase restada: $\\cos[(E_2-E_1)t/\\hbar - \\phi]$. Todo lo demás (las integrales de $\\langle x\\rangle$) es literalmente el problema anterior.' },
      { kind: 'verificacion', text: 'Interpreta: el efecto de $\\phi$ es equivalente a arrancar el cronómetro en otro instante. Checa los casos $\\phi = \\pi/2$ y $\\phi = \\pi$ evaluando $\\langle x\\rangle$ en $t = 0$ y comparando con el problema 2.6.' },
    ],
    finalAnswer: {
      answer: '$\\Psi(x,t) = \\frac{1}{\\sqrt a}e^{-i\\omega t}\\left[\\sin\\frac{\\pi x}{a} + \\sin\\frac{2\\pi x}{a}\\,e^{i\\phi}e^{-3i\\omega t}\\right]$; $|\\Psi|^2 = \\frac{1}{a}\\left[\\sin^2\\frac{\\pi x}{a} + \\sin^2\\frac{2\\pi x}{a} + 2\\sin\\frac{\\pi x}{a}\\sin\\frac{2\\pi x}{a}\\cos(3\\omega t - \\phi)\\right]$; $\\langle x\\rangle = \\frac{a}{2}\\left[1 - \\frac{32}{9\\pi^2}\\cos(3\\omega t - \\phi)\\right]$ (equivale a empezar el reloj en otro instante). Con $\\phi = \\pi/2$, $\\langle x\\rangle$ arranca en $a/2$; con $\\phi = \\pi$, arranca en $\\frac{a}{2}\\left(1 + \\frac{32}{9\\pi^2}\\right)$.',
      page: 18,
    },
  },
  'bp-2-8': {
    hints: [
      { kind: 'reconocimiento', text: 'Otra función inicial no estacionaria en el pozo infinito: una parábola continua que se anula en ambas paredes. Al ser real y simétrica respecto al centro del pozo, varios valores esperados salen casi sin hacer cuentas.' },
      { kind: 'planteamiento', text: '(a) Normaliza con $1 = |A|^2\\int_0^a x^2(a-x)^2dx$ (integral de polinomio) y bosqueja la gráfica para compararla con las $\\psi_n$: la que más se parezca fija la escala de energía. (b) Para $\\langle H\\rangle$ calcula $\\hat H\\Psi$ directamente: la segunda derivada de $x(a-x)$ es constante.' },
      { kind: 'tecnica', text: 'Para $\\langle p\\rangle$ no puedes derivar $\\langle x\\rangle$ (solo lo conoces en un instante): usa $\\langle p\\rangle = -i\\hbar\\int\\Psi\\,\\frac{\\partial\\Psi}{\\partial x}dx$ y razona con la integral total de una función real. Como $\\hat H\\Psi$ es constante dentro del pozo, $\\langle H\\rangle$ se reduce a una integral trivial de $x(a-x)$.' },
      { kind: 'verificacion', text: 'Tu estimación de (a) se apoya en el parecido con $\\psi_1$, así que debe quedar *por debajo* del valor exacto de (b): la parábola también contiene armónicos superiores. Esta misma función se analiza en el Ejemplo 2.3 del texto.' },
    ],
    finalAnswer: {
      answer: '(a) $A = \\sqrt{30/a^5}$; la gráfica (parábola con máximo en $a/2$) se parece mucho a $\\psi_1$, así que $\\langle H\\rangle \\approx E_1 = \\pi^2\\hbar^2/2ma^2$. (b) $\\langle x\\rangle = a/2$ (simetría), $\\langle p\\rangle = 0$ ($\\Psi$ real), $\\langle H\\rangle = \\int\\Psi^*\\hat H\\Psi\\,dx = 5\\hbar^2/ma^2$, apenas ~1% por encima de $E_1$.',
      page: 20,
      note: 'La 2.ª ed. reformuló el problema asignado (2.7) con una función «tienda» ($\\Psi = Ax$ en $0 < x < a/2$ y $A(a-x)$ en $a/2 < x < a$): $A = \\sqrt{12/a^3}$, $c_n = \\frac{4\\sqrt6\\,(-1)^{(n-1)/2}}{(n\\pi)^2}$ ($n$ impar), $P_1 = 96/\\pi^4 = 0.9855$, $\\langle H\\rangle = 6\\hbar^2/ma^2$ (pp. 18–19). Para la parábola $Ax(a-x)$ del enunciado, la normalización es el Ejemplo 2.3 del texto y $\\langle H\\rangle = 5\\hbar^2/ma^2$ está en el Problema 2.9 del manual (p. 20).',
    },
  },
  'bp-2-9': {
    hints: [
      { kind: 'reconocimiento', text: 'Problema de *serie estacionaria*: expandir la parábola del problema anterior en la base $\\{\\psi_n\\}$ del pozo y leer los coeficientes $c_n$. La parte final es conceptual: qué le pasa a la expansión después de una medición de energía.' },
      { kind: 'planteamiento', text: 'Escribe $\\Psi(x,0) = \\sum c_n\\psi_n$ con $c_n = \\int\\psi_n^*\\Psi\\,dx$; luego $\\Psi(x,t)$ sale pegándole a cada término su fase $e^{-iE_nt/\\hbar}$. Como la parábola es simétrica respecto al centro del pozo, media familia de coeficientes se anula sola.' },
      { kind: 'tecnica', text: 'La integral $\\int_0^a x(a-x)\\sin(n\\pi x/a)dx$ se hace por partes dos veces (o con el cambio $u = \\pi x/a$); el resultado decae como $1/n^3$. Para el comentario, evalúa $c_1$, $c_2$ y $c_3$ y mira quién domina y por qué.' },
      { kind: 'verificacion', text: 'Si normalizaste bien, $\\sum|c_n|^2$ debe tender a 1 (compruébalo con los primeros términos). Para la medición: si una segunda medición inmediata tiene que devolver $E_3$ con certeza, la función colapsó a un único estado propio de energía.' },
    ],
    finalAnswer: {
      answer: '$\\Psi(x,t) = \\sum_n c_n\\psi_n(x)e^{-iE_nt/\\hbar}$ con $c_n = \\frac{4\\sqrt{60}}{(n\\pi)^3}$ ($n$ impar; $c_n = 0$ para $n$ par). Numéricamente: $c_1 = 0.99928$, $c_2 = 0$, $c_3 = 0.03701$ (y $c_4 = 0$, $c_5 = 0.00799$): casi todo el estado es $\\psi_1$. Tras medir y obtener $E_3$: $|c_3| = 1$ (salvo fase) y los demás $c_n = 0$: $\\Psi$ colapsa a $\\psi_3e^{-iE_3(t-t_0)/\\hbar}$.',
      page: 19,
      note: 'La 2.ª ed. reformuló el problema asignado (2.7) con la función «tienda»: allí $c_n = \\frac{4\\sqrt6\\,(-1)^{(n-1)/2}}{(n\\pi)^2}$ ($n$ impar), $c_1 = 0.9928$, $c_3 = -0.1103$, $P_1 = 96/\\pi^4 = 0.9855$ (pp. 18–19). Los valores para la parábola $Ax(a-x)$ se obtienen con el mismo método (la normalización es el Ejemplo 2.3 del texto de la 2.ª ed.).',
    },
  },
  'bp-2-10': {
    hints: [
      { kind: 'reconocimiento', text: 'Demostración general sobre la expansión $\\Psi = \\sum c_n\\psi_n$: la estructura es la de un vector en una base ortonormal, con los $c_n$ como componentes. Nada específico del pozo infinito salvo la verificación final.' },
      { kind: 'planteamiento', text: 'Escribe $\\int|\\Psi|^2dx$ con la doble suma $\\sum_m\\sum_n c_m^*c_n\\psi_m^*\\psi_n$ y aplica la ortonormalidad $\\int\\psi_m^*\\psi_n dx = \\delta_{mn}$. Para $\\langle H\\rangle$ repite el mismo paso con $\\int\\Psi^*\\hat H\\Psi\\,dx$, usando antes $\\hat H\\psi_n = E_n\\psi_n$.' },
      { kind: 'tecnica', text: 'El paso que simplifica todo: la delta de Kronecker se come una de las dos sumas y solo sobreviven los términos con $m = n$. Para la verificación con $\\Psi = Ax(a-x)$, recuerda que dentro del pozo $\\hat H\\Psi$ es una constante.' },
      { kind: 'verificacion', text: 'Casos límite: si $\\Psi = \\psi_k$ (un solo coeficiente distinto de cero), tu fórmula debe dar $\\langle H\\rangle = E_k$; con dos estados mezclados, $\\langle H\\rangle$ debe caer entre las dos energías, ponderado por los $|c_n|^2$.' },
    ],
    finalAnswer: {
      answer: '$\\sum_n|c_n|^2 = 1$ (Ec. 2.34) y $\\langle H\\rangle = \\sum_n E_n|c_n|^2$ (Ec. 2.35). Verificación directa para $\\Psi = Ax(a-x)$: $\\int\\Psi^*\\hat H\\Psi\\,dx = 5\\hbar^2/ma^2$, igual que la suma $\\sum E_n|c_n|^2$; para la función «tienda» del problema 2.7 de la 2.ª ed., $\\langle H\\rangle = \\sum E_n|c_n|^2 = 6\\hbar^2/ma^2$ (p. 19).',
      page: 20,
      note: 'La demostración general es el Ejemplo 2.3 del texto en la 2.ª ed.; el manual la ilustra con la función «tienda» (2.7d, p. 19) y con el cálculo directo para la parábola (Problema 2.9, p. 20).',
    },
  },
  'bp-2-11': {
    hints: [
      { kind: 'reconocimiento', text: 'Problema de operadores de escalera del oscilador armónico: hay que acotar la norma de $a_-\\psi$ usando solo integración por partes y la ecuación de Schrödinger. No hay que resolver nada.' },
      { kind: 'planteamiento', text: 'Parte de $\\int(a_-\\psi)^*(a_-\\psi)dx$ y busca escribirla como $\\int\\psi^*(\\text{operador}\\cdot\\psi)dx$: el candidato natural es $a_+a_-$, porque las derivadas que lleva $a_-$ se pueden transferir al conjugado.' },
      { kind: 'tecnica', text: 'Integra por partes para pasar la derivada de $(a_-\\psi)^*$ hacia el otro factor; los términos de frontera mueren porque $\\psi$ es normalizable. Después expresa $a_+a_-$ en función de $\\hat H$ (Ecuación 2.46) y usa que $\\psi$ es autoestado de $\\hat H$.' },
      { kind: 'verificacion', text: 'Tu resultado debe ser positivo y proporcional a la energía del estado. Aplícalo al caso $\\psi = \\psi_0$ y saca la conclusión sobre $a_-\\psi_0$: es exactamente la razón por la que la escalera de estados termina por abajo.' },
    ],
  },
  'bp-2-12': {
    hints: [
      { kind: 'reconocimiento', text: 'Continuación del 2.11: ahora quieres las constantes exactas de proporcionalidad entre $a_\\pm\\psi_n$ y $\\psi_{n\\pm1}$. La estrategia es la misma: comparar *normas*.' },
      { kind: 'planteamiento', text: 'Escribe $\\int|a_\\pm\\psi_n|^2dx = \\int\\psi_n^*(a_\\mp a_\\pm\\psi_n)dx$ (la misma integración por partes) y expresa $a_+a_-$ y $a_-a_+$ en función de $\\hat H$ para evaluarla con $E_n = (n + \\frac{1}{2})\\hbar\\omega$.' },
      { kind: 'tecnica', text: 'Con la norma en la mano, escribe $a_+\\psi_n = C_n\\psi_{n+1}$ y fija $|C_n|$ comparando con la norma 1 de $\\psi_{n+1}$; los factores $\\pm i$ se eligen para que las funciones resulten reales. Para (b), itera: aplicar $a_+$ $n$ veces a $\\psi_0$ va multiplicando constantes, y de ese producto sale $A_n$.' },
      { kind: 'verificacion', text: 'Prueba tu $A_n$ en $n = 0$ y $n = 1$: debe reproducir la gaussiana $\\psi_0$ (normalizada a mano con $\\int e^{-\\xi^2}d\\xi = \\sqrt\\pi$) y la $\\psi_1$ del Problema 2.13. Verifica también que $a_-$ deshace lo que hace $a_+$, con normas consistentes.' },
    ],
  },
  'bp-2-13': {
    hints: [
      { kind: 'reconocimiento', text: 'Práctica con la maquinaria de escalera del oscilador: generar $\\psi_1$ y $\\psi_2$ desde la gaussiana $\\psi_0$ y comprobar ortogonalidad. La ecuación diferencial no hay que resolverla ni una vez.' },
      { kind: 'planteamiento', text: '(a) Normaliza $\\psi_1 = Axe^{-m\\omega x^2/2\\hbar}$ por integración directa: con $\\xi = \\sqrt{m\\omega/\\hbar}\\,x$ queda una integral gaussiana. (b) Aplica $a_+$ a tu $\\psi_1$ normalizada para generar $\\psi_2$ (sin normalizar).' },
      { kind: 'tecnica', text: 'Las integrales se reducen a $\\int e^{-\\xi^2}d\\xi = \\sqrt\\pi$ integrando por partes (de ahí sale también $\\int\\xi^2e^{-\\xi^2}$). Para (d), explota la paridad: entre funciones de paridad opuesta la integral se anula sin calcular, así que solo queda una integral explícita.' },
      { kind: 'verificacion', text: 'Cuenta nodos al dibujar: $\\psi_0$ ninguno, $\\psi_1$ uno en el origen, $\\psi_2$ dos simétricos. Tu constante de (a) debe coincidir con la fórmula general $A_n$ de la Ecuación 2.54.' },
    ],
    finalAnswer: {
      answer: '(a) $\\psi_1 = \\sqrt{2}\\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4}\\sqrt{\\frac{m\\omega}{\\hbar}}\\,x\\,e^{-m\\omega x^2/2\\hbar}$ (coincide con la fórmula general, Ec. 2.54). (b) $\\psi_2 = \\frac{1}{\\sqrt2}\\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4}\\left[\\frac{2m\\omega}{\\hbar}x^2 - 1\\right]e^{-m\\omega x^2/2\\hbar}$ (aplicando dos veces el operador de ascenso a $\\psi_0$). (d) $\\int\\psi_0^*\\psi_1\\,dx = \\int\\psi_1^*\\psi_2\\,dx = 0$ (paridad) y también $\\int\\psi_2^*\\psi_0\\,dx = 0$.',
      page: 20,
      note: 'La 2.ª ed. reformuló el problema (2.10): obtiene $\\psi_2$ aplicando dos veces el operador de ascenso sobre $\\psi_0$ y verifica la ortogonalidad ($\\int\\psi_2^*\\psi_0\\,dx = 0$, p. 21); la normalización directa de $\\psi_1$ (apartado a de la 1.ª ed.) no aparece en su solución.',
    },
  },
  'bp-2-14': {
    hints: [
      { kind: 'reconocimiento', text: 'Cálculo de valores esperados en los dos primeros estados del oscilador, reutilizando las $\\psi_0$ y $\\psi_1$ ya normalizadas. Con la variable $\\xi = \\sqrt{m\\omega/\\hbar}\\,x$ todo se convierte en gaussianas estándar.' },
      { kind: 'planteamiento', text: 'Antes de integrar nada, razona $\\langle x\\rangle$ con la paridad de $|\\psi|^2$ y $\\langle p\\rangle$ con $\\langle p\\rangle = m\\,d\\langle x\\rangle/dt$ en un estado estacionario. Para los segundos momentos, escribe las funciones en $\\xi$ y usa las gaussianas de siempre.' },
      { kind: 'tecnica', text: 'Para $\\langle p^2\\rangle$ conviene integrar por partes: $\\langle p^2\\rangle = -\\hbar^2\\int\\psi\\,\\frac{d^2\\psi}{dx^2}dx$, y las segundas derivadas de las gaussianas son fáciles. Las piezas que necesitas son $\\int e^{-\\xi^2}d\\xi = \\sqrt\\pi$ y $\\int\\xi^2e^{-\\xi^2}d\\xi = \\frac{\\sqrt\\pi}{2}$ (las impares se anulan).' },
      { kind: 'verificacion', text: 'Comprueba el principio de incertidumbre en ambos estados y qué tan cerca del límite queda cada uno. En (c), sin integrar de nuevo: $\\langle T\\rangle = \\langle p^2\\rangle/2m$ y $\\langle V\\rangle = \\frac{1}{2}m\\omega^2\\langle x^2\\rangle$, y su suma debe dar la energía del nivel (en el oscilador, además, $\\langle T\\rangle = \\langle V\\rangle$).' },
    ],
    finalAnswer: {
      answer: '(a) $\\langle x\\rangle = \\langle p\\rangle = 0$ para $\\psi_0$ y $\\psi_1$ (vale para cualquier estado estacionario del oscilador). $n = 0$: $\\langle x^2\\rangle = \\frac{\\hbar}{2m\\omega}$, $\\langle p^2\\rangle = \\frac{m\\omega\\hbar}{2}$. $n = 1$: $\\langle x^2\\rangle = \\frac{3\\hbar}{2m\\omega}$, $\\langle p^2\\rangle = \\frac{3m\\omega\\hbar}{2}$. (b) $n = 0$: $\\sigma_x = \\sqrt{\\hbar/2m\\omega}$, $\\sigma_p = \\sqrt{m\\omega\\hbar/2}$, $\\sigma_x\\sigma_p = \\hbar/2$ (justo en el límite de incertidumbre); $n = 1$: $\\sigma_x = \\sqrt{3\\hbar/2m\\omega}$, $\\sigma_p = \\sqrt{3m\\omega\\hbar/2}$, $\\sigma_x\\sigma_p = 3\\hbar/2 > \\hbar/2$. (c) $\\langle T\\rangle = \\langle V\\rangle = \\hbar\\omega/4$ ($n = 0$) y $= 3\\hbar\\omega/4$ ($n = 1$); la suma da $E_0 = \\hbar\\omega/2$ y $E_1 = 3\\hbar\\omega/2$, como debe ser.',
      page: 21,
    },
  },
  'bp-2-15': {
    hints: [
      { kind: 'reconocimiento', text: 'Probabilidad en las colas de la gaussiana del estado fundamental: una integral que no es elemental y se consulta en tablas. El primer paso es *física*: localizar el borde de la región clásicamente permitida.' },
      { kind: 'planteamiento', text: 'Encuentra el punto de retorno $x_0$ imponiendo $\\frac{1}{2}m\\omega^2x_0^2 = E_0$. La probabilidad pedida es $P = 2\\int_{x_0}^{\\infty}|\\psi_0|^2dx$ (el 2 sale de la simetría); con $\\xi = \\sqrt{m\\omega/\\hbar}\\,x$ queda una gaussiana desde un límite adimensional.' },
      { kind: 'tecnica', text: 'El límite $\\xi_0$ te queda un número sin unidades muy simple. La integral $\\int_{\\xi_0}^{\\infty}e^{-\\xi^2}d\\xi$ se expresa con la función error complementaria (o con la tabla de distribución normal que sugiere el enunciado) y se evalúa numéricamente.' },
      { kind: 'verificacion', text: 'El resultado debe ser una fracción pequeña pero no despreciable: la gaussiana decae rápido, pero justo al pasar el punto de retorno todavía queda probabilidad apreciable. Comprueba que tu $x_0$ es del orden del ancho característico $\\sqrt{\\hbar/m\\omega}$ de $\\psi_0$.' },
    ],
    finalAnswer: {
      answer: 'Región clásica: $\\frac{1}{2}m\\omega^2x_0^2 = E_0 = \\frac{1}{2}\\hbar\\omega \\Rightarrow x_0 = \\sqrt{\\hbar/m\\omega}$ (o sea $\\xi_0 = 1$). $P = \\frac{2}{\\sqrt\\pi}\\int_1^{\\infty}e^{-\\xi^2}d\\xi = 2\\left[1 - F(\\sqrt2)\\right] = 0.157$ (en la notación de la tabla CRC; $F$ es la función de distribución normal).',
      page: 24,
    },
  },
  'bp-2-16': {
    hints: [
      { kind: 'reconocimiento', text: 'Ejercicio directo de la fórmula de recursión de los polinomios de Hermite: cero concepto, pura contabilidad de coeficientes. Lo único que hay que decidir es con qué semilla arrancar en cada caso.' },
      { kind: 'planteamiento', text: 'Para $n = 5$ (impar) los coeficientes pares se anulan: arranca en $a_1$ y aplica la recursión hacia arriba hasta que el factor $2j - n$ llegue a cero (entonces la serie termina). Para $n = 6$ (par) arranca en $a_0$.' },
      { kind: 'tecnica', text: 'Ve dejando todo en función de $a_1$ (o de $a_0$). Al final fija la constante con la convención del texto: el coeficiente de $\\xi^n$ en $H_n$ es $2^n$; así tu polinomio cuadra con la Tabla 2.1.' },
      { kind: 'verificacion', text: 'Checa la estructura: $H_5$ solo contiene potencias impares y $H_6$ solo pares (incluido el término constante), como corresponde a sus paridades. El grado de cada polinomio debe ser exactamente 5 y 6.' },
    ],
    finalAnswer: {
      answer: '$H_5(\\xi) = 120\\xi - 160\\xi^3 + 32\\xi^5$ (con $a_3 = -\\frac{4}{3}a_1$, $a_5 = \\frac{4}{15}a_1$, $a_7 = 0$; el coeficiente $2^5$ fija $a_1 = 120$). $H_6(\\xi) = -120 + 720\\xi^2 - 480\\xi^4 + 64\\xi^6$ (con $a_2 = -6a_0$, $a_4 = 4a_0$, $a_6 = -\\frac{8}{15}a_0$; el coeficiente $2^6$ fija $a_0 = -120$). Ambos acordes con la Tabla 2.1.',
      page: 25,
    },
  },
  'bp-2-17': {
    hints: [
      { kind: 'reconocimiento', text: 'El análogo del problema 2.6 pero en el oscilador armónico: superposición de los dos primeros estados estacionarios. Como sus energías difieren en $\\hbar\\omega$, la densidad y $\\langle x\\rangle$ oscilarán con esa frecuencia.' },
      { kind: 'planteamiento', text: '(a) Otra vez, ortonormalidad para normalizar. (b) Pega a cada término su fase $e^{-iE_nt/\\hbar}$ y factoriza $e^{-iE_0t/\\hbar}$; conviene escribir $E_0 = \\frac{\\hbar\\omega}{2}$ y $E_1 = \\frac{3\\hbar\\omega}{2}$. (c) En $\\langle x\\rangle$, las integrales diagonales se anulan por paridad; solo sobrevive la cruzada $\\int x\\psi_0\\psi_1\\,dx$.' },
      { kind: 'tecnica', text: 'La integral cruzada, con el cambio a $\\xi$, es del tipo $\\int\\xi^2e^{-\\xi^2}d\\xi$. Para (d) usa $\\langle p\\rangle = m\\,d\\langle x\\rangle/dt$ y verifica Ehrenfest comparando con $-\\langle\\partial V/\\partial x\\rangle = -m\\omega^2\\langle x\\rangle$. Para los bocetos de (e), piensa cómo se desplaza el paquete de un lado al otro al girar la fase relativa.' },
      { kind: 'verificacion', text: 'La amplitud de $\\langle x\\rangle$ debe salir del orden del ancho de la gaussiana ($\\sim\\sqrt{\\hbar/m\\omega}$). La frecuencia que obtengas debe relacionarse de forma directa con la separación $E_1 - E_0$, y $\\langle p\\rangle$ debe ir 90° desfasado respecto a $\\langle x\\rangle$, como la posición y el momento de un oscilador clásico.' },
    ],
    finalAnswer: {
      answer: '(a) $A = 1/5$. (b) $\\Psi(x,t) = \\frac{1}{5}\\left[3\\psi_0e^{-i\\omega t/2} + 4\\psi_1e^{-3i\\omega t/2}\\right]$; $|\\Psi|^2 = \\frac{1}{25}\\left[9\\psi_0^2 + 16\\psi_1^2 + 24\\psi_0\\psi_1\\cos(\\omega t)\\right]$. (c) $\\langle x\\rangle = \\frac{24}{25}\\sqrt{\\frac{\\hbar}{2m\\omega}}\\cos(\\omega t)$: amplitud $\\frac{24}{25}\\sqrt{\\hbar/2m\\omega}$ y frecuencia angular $\\omega$; $\\langle p\\rangle = -\\frac{24}{25}\\sqrt{\\frac{m\\omega\\hbar}{2}}\\sin(\\omega t)$, y se cumple $\\frac{d\\langle p\\rangle}{dt} = -m\\omega^2\\langle x\\rangle$ (Ehrenfest). (d) [2.ª ed.]: $E_0 = \\hbar\\omega/2$ con probabilidad $9/25$, o $E_1 = 3\\hbar\\omega/2$ con probabilidad $16/25$.',
      page: 23,
      note: 'La 2.ª ed. reformuló la superposición ($3\\psi_0 + 4\\psi_1$ en lugar de $\\psi_0 + \\psi_1$). Para la versión de la 1.ª ed.: $A = 1/\\sqrt2$, $|\\Psi|^2 = \\frac{1}{2}\\left[\\psi_0^2 + \\psi_1^2 + 2\\psi_0\\psi_1\\cos(\\omega t)\\right]$, $\\langle x\\rangle = \\sqrt{\\hbar/2m\\omega}\\,\\cos(\\omega t)$ (amplitud $\\sqrt{\\hbar/2m\\omega}$, frecuencia angular $\\omega$), $\\langle p\\rangle = -\\sqrt{m\\omega\\hbar/2}\\,\\sin(\\omega t)$, y Ehrenfest se cumple igualmente.',
    },
  },
}
