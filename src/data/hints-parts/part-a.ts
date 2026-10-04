// Pistas graduadas + respuesta final — PARTE A: problemas 2.1 a 2.17
// Las pistas son contenido pedagógico ORIGINAL de la plataforma.
// Las respuestas finales son transcripción del solucionario oficial de Griffiths (2.ª ed.).

import type { ProblemHintsEntry } from './types'

export const PART_A: Record<string, ProblemHintsEntry> = {
  'bp-2-1': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Tres *demostraciones* sobre la estructura general de la ecuación de Schrödinger independiente del tiempo: no hay nada que calcular, solo razonar con la *linealidad* de la ecuación y con la normalización. Fíjate en que (b) y (c) ya te dan la receta: fabricar soluciones nuevas a partir de una dada.',
        application: {
          steps: [
            { title: 'Clasifica los tres apartados', text: 'El (a) demuestra que la constante de separación $E$ es real, el (b) que puedes elegir $\\psi$ real y el (c) que, si $V(-x) = V(x)$, puedes elegirla par o impar. Ninguno pide resolver ninguna ecuación: son razonamientos sobre la estructura.' },
            { title: 'Reconoce la herramienta central', text: 'La ecuación independiente del tiempo es lineal: si $\\psi_1$ y $\\psi_2$ la satisfacen con la misma $E$, también $c_1\\psi_1 + c_2\\psi_2$. Esa linealidad, más el hecho de que $V$ y $E$ son reales, es todo tu arsenal.' },
            { title: 'Aprovecha las pistas del enunciado', text: 'En (b) y (c) el propio enunciado entrega los ingredientes: que $\\psi^*$ y $\\psi(-x)$ son soluciones, junto con sus combinaciones. Tu tarea es verificarlo y comprobar que esas combinaciones bastan para reconstruir $\\psi$.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'En (a) escribe $E = E_0 + i\\Gamma$ en el factor temporal de la Ecuación 2.6 y calcula $|\\Psi(x,t)|^2$; luego impón que $\\int|\\Psi|^2dx = 1$ para *todo* $t$. En (b) y (c) parte de que, si $\\psi$ satisface la ecuación, también la satisfacen $\\psi^*$ (porque $V$ y $E$ son reales) y $\\psi(-x)$ (si $V$ es par).',
        application: {
          steps: [
            { title: 'Apartado (a): factor temporal', text: 'Sustituye $E = E_0 + i\\Gamma$ en la Ec. 2.6: el factor temporal queda $e^{-iE_0t/\\hbar}e^{\\Gamma t/\\hbar}$, cuyo módulo crece o decae con $t$. Al calcular $|\\Psi(x,t)|^2$, la parte espacial $\\psi(x)$ sale intacta.' },
            { title: 'Apartado (a): impón la normalización', text: 'La Ec. 1.20 exige $\\int_{-\\infty}^{\\infty}|\\Psi|^2dx = 1$ para *todo* $t$, pero con esa fase sale $e^{2\\Gamma t/\\hbar}\\int|\\psi|^2dx$. La expresión solo puede ser constante si $\\Gamma = 0$, es decir, si $E$ es real.' },
            { title: 'Apartado (b): conjugada y combinaciones', text: 'Conjuga la Ec. 2.4: como $V$ y $E$ son reales, $\\psi^*$ satisface la misma ecuación, y por linealidad también $\\psi + \\psi^*$ e $i(\\psi - \\psi^*)$, que además son reales.' },
            { title: 'Apartado (c): refleja la solución', text: 'Si $V$ es par, el cambio $x \\to -x$ deja la Ec. 2.4 idéntica, así que $\\psi(-x)$ es solución con la misma $E$; por linealidad, también lo son $\\psi(x) \\pm \\psi(-x)$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'El paso clave es la linealidad: si $\\psi_1$ y $\\psi_2$ satisfacen la ecuación con la misma $E$, también $c_1\\psi_1 + c_2\\psi_2$. Construye las combinaciones reales $\\psi + \\psi^*$ e $i(\\psi - \\psi^*)$, y las combinaciones par e impar $\\psi(x) \\pm \\psi(-x)$, y expresa $\\psi$ en términos de ellas.',
        application: {
          steps: [
            { title: 'Verifica que ψ* es solución', text: 'Escribe la Ec. 2.4, $-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2} + V\\psi = E\\psi$, y conjúgala: al ser $V$ y $E$ reales, $\\psi^*$ obedece exactamente la misma ecuación y con la misma energía.' },
            { title: 'Construye soluciones reales', text: 'Define $f = \\psi + \\psi^*$ y $g = i(\\psi - \\psi^*)$: ambas son soluciones por linealidad y ambas son reales, pues $f^* = f$ y $g^* = g$.' },
            { title: 'Recupera ψ desde f y g', text: 'Despejando: $\\psi = \\frac{1}{2}(f - ig)$. Toda solución queda escrita como combinación lineal de soluciones reales con la misma $E$, que es lo que afirma el teorema (b).' },
            { title: 'Construye paridad definida', text: 'Con $V$ par, forma $\\psi_\\pm(x) = \\psi(x) \\pm \\psi(-x)$: al reflejar, $x \\to -x$, cumplen $\\psi_\\pm(-x) = \\pm\\psi_\\pm(x)$ y cada una sigue siendo solución de la misma ecuación.' },
            { title: 'Recupera ψ desde ψ±', text: 'Ahora $\\psi = \\frac{1}{2}(\\psi_+ + \\psi_-)$: puedes trabajar con la combinación de paridad definida que te convenga. Si una de ellas fuera idénticamente cero, $\\psi$ ya tenía esa paridad.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Comprueba que cada combinación tiene la propiedad prometida (ser real, ser par o impar) y que satisface la misma ecuación con la misma energía. Para (a), pregúntate qué le pasa a $\\int|\\Psi|^2dx$ si $\\Gamma \\neq 0$: tendría que crecer o decaer exponencialmente con $t$.',
        application: {
          steps: [
            { title: 'Revisa las propiedades prometidas', text: 'Conjuga $f$ y $g$ para confirmar que son reales, y evalúa $\\psi_\\pm(-x)$ para confirmar la paridad. Comprueba también que todas satisfacen la Ec. 2.4 con la misma $E$: son comprobaciones de una línea.' },
            { title: 'Cierra el argumento de Γ', text: 'Si $\\Gamma > 0$, la norma $e^{2\\Gamma t/\\hbar}\\int|\\psi|^2dx$ crece sin límite; si $\\Gamma < 0$, se apaga a cero. Ninguna opción vale para todo $t$: solo $\\Gamma = 0$ es compatible con la normalización.' },
            { title: 'Respeta el matiz del enunciado', text: 'El (b) no dice que toda solución ya sea real, sino que puedes reescribirla con soluciones reales; análogo vale para la paridad en (c). Tus identidades $\\psi = \\frac{1}{2}(f - ig) = \\frac{1}{2}(\\psi_+ + \\psi_-)$ son precisamente esa reescritura.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $|\\Psi|^2 = |\\psi|^2 e^{2\\Gamma t/\\hbar}$: si la norma ha de valer 1 para todo $t$, forzosamente $\\Gamma = 0$, y $E$ es real. (b) $\\psi = \\frac{1}{2}\\left[(\\psi + \\psi^*) - i\\left(i(\\psi - \\psi^*)\\right)\\right]$: toda solución es combinación lineal de soluciones reales. (c) $\\psi(x) = \\frac{1}{2}\\left[\\psi_+(x) + \\psi_-(x)\\right]$, con $\\psi_\\pm(x) \\equiv \\psi(x) \\pm \\psi(-x)$ par e impar respectivamente.',
      page: 15,
    },
  },
  'bp-2-2': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Es una demostración *cualitativa* por contradicción: no hay que resolver ninguna ecuación, solo razonar sobre la *concavidad* de $\\psi$. La pista del enunciado ya te entrega la ecuación en la forma que conviene mirar.',
        application: {
          steps: [
            { title: 'Identifica el tipo de demostración', text: 'Es una prueba por contradicción, puramente geométrica: no resolverás ninguna ecuación diferencial, solo razonarás con el signo de $\\frac{d^2\\psi}{dx^2}$ y con la forma de la gráfica.' },
            { title: 'Aprovecha la ecuación dada', text: 'El enunciado te regala la forma útil: $\\frac{d^2\\psi}{dx^2} = \\frac{2m}{\\hbar^2}[V(x) - E]\\psi$. Todo el argumento vive en el signo del corchete y en lo que le obliga a la concavidad.' },
            { title: 'Reserva el análogo clásico', text: 'La pregunta final pide el análogo clásico: deja preparada una frase con $E = T + V$ y $T \\ge 0$, y verás que la respuesta clásica sale en una línea.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Supón $E < V_{\\min}$ y escribe $\\frac{d^2\\psi}{dx^2} = \\frac{2m}{\\hbar^2}[V(x) - E]\\psi$: el corchete es positivo para todo $x$, así que $\\psi$ y su segunda derivada tienen siempre el mismo signo.',
        application: {
          steps: [
            { title: 'Supón lo contrario', text: 'Admite que existe solución normalizable con $E < V_{\\min}$. Entonces $V(x) - E > 0$ en todo punto y el factor $\\frac{2m}{\\hbar^2}[V(x) - E]$ es estrictamente positivo.' },
            { title: 'Traduce a un enunciado de signos', text: 'De ahí, $\\psi$ y $\\frac{d^2\\psi}{dx^2}$ comparten signo punto a punto: donde $\\psi > 0$ la función es convexa, y donde $\\psi < 0$ es cóncava.' },
            { title: 'Convierte el signo en geometría', text: 'Con esa concavidad, en cuanto $\\psi$ se aparta del eje la curvatura la empuja aún más lejos: argumenta que tal función no puede tender a 0 en $x \\to \\pm\\infty$, como exige la normalizabilidad.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Razona geométricamente: donde $\\psi > 0$ también $\\frac{d^2\\psi}{dx^2} > 0$, de modo que la función *siempre se curva alejándose del eje*. Una función así, en cuanto se aparta de cero, ya no puede volver a acercarse asintóticamente a cero en $x \\to \\pm\\infty$, que es lo que exige la normalizabilidad.',
        application: {
          steps: [
            { title: 'Caso ψ positivo', text: 'En un tramo con $\\psi > 0$ también $\\frac{d^2\\psi}{dx^2} > 0$: la gráfica queda por encima de sus tangentes y se encorva hacia arriba, alejándose del eje.' },
            { title: 'Caso ψ negativo', text: 'En un tramo con $\\psi < 0$ resulta $\\frac{d^2\\psi}{dx^2} < 0$: la gráfica se encorva hacia abajo. En ambos casos la curvatura apunta hacia afuera del eje, nunca de regreso.' },
            { title: 'Recorre el eje de −∞ a +∞', text: 'Para normalizarse, $\\psi$ debe tender a 0 en ambos extremos. Pero una función con esta concavidad, en cuanto se aparta de cero, es empujada aún más lejos y no puede volver a acercarse asintóticamente a 0 en el otro extremo.' },
            { title: 'Descarta también la trivial', text: 'La única superviviente del argumento es $\\psi \\equiv 0$, pero su integral da $\\int|\\psi|^2dx = 0$, no 1: tampoco es aceptable. Luego con $E < V_{\\min}$ no existe solución normalizable.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Tu argumento debe romperse en cuanto exista una región con $E > V(x)$: ahí $\\psi$ puede curvar hacia el eje (piensa en los puntos de retorno). Como análogo clásico, recuerda que $E = T + V$ con $T \\ge 0$, así que la energía total nunca baja de $V_{\\min}$.',
        application: {
          steps: [
            { title: 'Localiza dónde se rompe', text: 'Si existiera una región con $E > V(x)$, ahí $\\psi$ y su segunda derivada tendrían signos opuestos y la función podría curvarse de vuelta hacia el eje: es lo que ocurre entre los puntos de retorno de un pozo finito.' },
            { title: 'Escribe el análogo clásico', text: 'Con $E = T + V$ y $T = \\frac{p^2}{2m} \\ge 0$ se sigue $E \\ge V_{\\min}$: una partícula clásica tampoco puede moverse con energía total inferior al mínimo del potencial.' },
            { title: 'Pruébalo en el pozo infinito', text: 'En el pozo infinito $V_{\\min} = 0$, así que el teorema predice $E > 0$, en acuerdo con $E_n = \\frac{n^2\\pi^2\\hbar^2}{2ma^2}$: todas las energías propias son estrictamente positivas.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: 'Si $E < V_{\\min}$, $\\psi$ y $\\frac{d^2\\psi}{dx^2}$ tienen siempre el mismo signo: $\\psi$ curva siempre alejándose del eje y, partiendo de cero en un extremo, no puede volver a cero en el otro: no es normalizable. (Análogo clásico: $E = T + V \\ge V_{\\min}$, pues $T \\ge 0$.)',
      page: 15,
    },
  },
  'bp-2-3': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Es el caso particular del pozo infinito del teorema anterior, pero hecho por fuerza bruta: resolver la ecuación con $E \\le 0$ y comprobar que las condiciones de frontera $\\psi(0) = \\psi(a) = 0$ no admiten solución aceptable.',
        application: {
          steps: [
            { title: 'Sitúa el problema', text: 'Estás en el pozo infinito ($V = 0$ para $0 < x < a$) con paredes en $x = 0$ y $x = a$, donde $V_{\\min} = 0$: el Problema 2.2 ya anticipa el resultado, pero aquí lo comprobarás a mano.' },
            { title: 'Separa los dos casos', text: 'Con $E = 0$ la ecuación se reduce a $\\frac{d^2\\psi}{dx^2} = 0$; con $E < 0$ la solución son exponenciales reales. Son dos cálculos cortos e independientes.' },
            { title: 'Fija el criterio de éxito', text: 'No buscas una $\\psi$ aceptable, sino demostrar que no existe: las condiciones $\\psi(0) = \\psi(a) = 0$ deben forzar la solución trivial $\\psi \\equiv 0$, que no es normalizable.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Separa los dos casos. Con $E = 0$ la ecuación dentro del pozo se reduce a $\\frac{d^2\\psi}{dx^2} = 0$. Con $E < 0$ define $\\kappa^2 = -2mE/\\hbar^2 > 0$ y la solución general son exponenciales reales, no senos.',
        application: {
          steps: [
            { title: 'Resuelve el caso E = 0', text: 'Integra dos veces $\\frac{d^2\\psi}{dx^2} = 0$: la solución general es la recta $\\psi(x) = A + Bx$, con dos constantes por determinar.' },
            { title: 'Resuelve el caso E < 0', text: 'Define $\\kappa^2 = -\\frac{2mE}{\\hbar^2} > 0$, de modo que $\\frac{d^2\\psi}{dx^2} = \\kappa^2\\psi$ y la solución general es $\\psi = Ae^{\\kappa x} + Be^{-\\kappa x}$.' },
            { title: 'Aplica ambas fronteras', text: 'Impón $\\psi(0) = 0$ y $\\psi(a) = 0$ en cada caso: obtienes un sistema lineal de dos ecuaciones para $A$ y $B$ cuya única salida será $A = B = 0$ o una contradicción.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Aplica las dos condiciones de frontera a cada solución general ($A + Bx$ y $Ae^{\\kappa x} + Be^{-\\kappa x}$) y resuelve el sistema para las constantes: verás que te fuerzan hacia la solución trivial o hacia una condición imposible.',
        application: {
          steps: [
            { title: 'E = 0: primera pared', text: 'De $\\psi(0) = 0$ sale $A = 0$, así que $\\psi = Bx$; entonces $\\psi(a) = Ba = 0$ obliga también $B = 0$: solo queda la función cero.' },
            { title: 'E < 0: primera pared', text: 'Ahora $\\psi(0) = A + B = 0$ da $B = -A$, es decir $\\psi = A(e^{\\kappa x} - e^{-\\kappa x}) = 2A\\sinh(\\kappa x)$.' },
            { title: 'E < 0: segunda pared', text: 'La condición $\\psi(a) = 2A\\sinh(\\kappa a) = 0$ exigiría $\\sinh(\\kappa a) = 0$, pero con $\\kappa a > 0$ el seno hiperbólico no se anula: no hay solución con $A \\neq 0$.' },
            { title: 'Reformula la contradicción', text: 'Equivalentemente, $A(e^{\\kappa a} - e^{-\\kappa a}) = 0$ pediría $e^{2\\kappa a} = 1$ con $\\kappa > 0$, imposible. En ambos casos las fronteras fuerzan $\\psi \\equiv 0$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'No podía salir otra cosa: que existiera una solución con $E \\le 0$ contradiría el Problema 2.2 (aquí $V_{\\min} = 0$), y las energías permitidas del pozo crecen como $n^2$, todas estrictamente positivas.',
        application: {
          steps: [
            { title: 'Contrasta con el Problema 2.2', text: 'Como aquí $V_{\\min} = 0$, tu resultado reproduce el teorema general: no hay solución normalizable con $E \\le V_{\\min}$. La fuerza bruta confirma el argumento de concavidad.' },
            { title: 'Contrasta con el espectro', text: 'Las energías del pozo son $E_n = \\frac{n^2\\pi^2\\hbar^2}{2ma^2}$ con $n = 1, 2, 3, \\dots$: todas positivas, sin nivel en $E = 0$ ni por debajo.' },
            { title: 'Recuerda por qué no vale ψ = 0', text: 'La función nula da $\\int_0^a|\\psi|^2dx = 0$, no 1, así que no representa estado físico alguno: no es una excepción del resultado.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '($E = 0$): $\\psi = A + Bx$; $\\psi(0) = 0 \\Rightarrow A = 0$ y $\\psi(a) = 0 \\Rightarrow B = 0$. ($E < 0$): $\\psi = Ae^{\\kappa x} + Be^{-\\kappa x}$ con $\\kappa^2 = -2mE/\\hbar^2$; $\\psi(0) = 0 \\Rightarrow B = -A$, y entonces $\\psi(a) = 0$ exige $e^{2\\kappa a} = 1$, es decir $\\kappa = 0$. En todos los casos las condiciones de frontera fuerzan $\\psi = 0$ (no normalizable).',
      page: 15,
    },
  },
  'bp-2-4': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'El mismo pozo infinito del texto, pero *centrado en el origen*: la señal clave es la simetría $V(-x) = V(x)$. Por el teorema (c) del Problema 2.1, conviene buscar por separado soluciones pares e impares.',
        application: {
          steps: [
            { title: 'Detecta la simetría', text: 'El pozo cumple $V(-x) = V(x)$, con paredes en $x = \\pm a/2$: por el teorema (c) del Problema 2.1 conviene buscar por separado soluciones pares (cosenos) e impares (senos).' },
            { title: 'Reutiliza la solución del texto', text: 'Dentro del pozo nada cambia respecto al caso $0 < x < a$: $\\psi = A\\sin(kx) + B\\cos(kx)$ con $k = \\sqrt{2mE}/\\hbar$, y $\\psi = 0$ fuera de las paredes.' },
            { title: 'Predice el resultado', text: 'El pozo mide la misma anchura $a$ que el del texto, solo que centrado: las energías deben coincidir con la Ec. 2.23 y las funciones propias deben ser las de la Ec. 2.24 corridas medio pozo.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Dentro del pozo la solución general es $A\\sin(kx) + B\\cos(kx)$, con $k = \\sqrt{2mE}/\\hbar$; fuera, $\\psi = 0$. Impón que $\\psi$ se anule en las dos paredes del pozo.',
        application: {
          steps: [
            { title: 'Escribe la solución interior', text: 'Para $|x| < a/2$: $\\psi(x) = A\\sin(kx) + B\\cos(kx)$ con $k = \\sqrt{2mE}/\\hbar$. El seno ya es impar y el coseno ya es par: la clasificación viene de regalo.' },
            { title: 'Impón las dos paredes', text: 'La continuidad exige $\\psi(\\pm a/2) = 0$, es decir $\\pm A\\sin\\frac{ka}{2} + B\\cos\\frac{ka}{2} = 0$: dos ecuaciones que mezclan $A$ y $B$.' },
            { title: 'Suma y resta', text: 'Sumándolas queda $2B\\cos\\frac{ka}{2} = 0$ y restándolas $2A\\sin\\frac{ka}{2} = 0$: las condiciones se desacoplan y cada familia (par o impar) se cuantiza por separado.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Al escribir las condiciones en las dos paredes simétricas, *súmalas y réstalas*: se desacoplan en una condición solo para $A$ (solución impar) y otra solo para $B$ (solución par). Cada una cuantiza $k$ en una familia distinta; después normaliza con $\\int|\\psi|^2dx = 1$.',
        application: {
          steps: [
            { title: 'Familia par', text: 'Para tener $B \\neq 0$ necesitas $\\cos\\frac{ka}{2} = 0$, o sea $\\frac{ka}{2} = (2j - 1)\\frac{\\pi}{2}$ con $j = 1, 2, \\dots$, es decir $k = \\frac{n\\pi}{a}$ con $n$ impar.' },
            { title: 'Familia impar', text: 'Para tener $A \\neq 0$ necesitas $\\sin\\frac{ka}{2} = 0$, o sea $\\frac{ka}{2} = j\\pi$, es decir $k = \\frac{2j\\pi}{a}$: $k = \\frac{n\\pi}{a}$ con $n$ par. Unificando, $k_n = \\frac{n\\pi}{a}$ con $n = 1, 2, 3, \\dots$' },
            { title: 'Escribe las funciones propias', text: 'Para $n$ impar, $\\psi_n = \\sqrt{2/a}\\cos\\frac{n\\pi x}{a}$; para $n$ par, $\\psi_n = \\sqrt{2/a}\\sin\\frac{n\\pi x}{a}$. Comprueba que ambas se anulan en $x = \\pm a/2$, como exigen las paredes.' },
            { title: 'Cuantiza y normaliza', text: 'En ambos casos $E_n = \\frac{\\hbar^2k_n^2}{2m} = \\frac{n^2\\pi^2\\hbar^2}{2ma^2}$, la Ec. 2.23 con anchura $a$. La condición $\\int_{-a/2}^{a/2}|\\psi_n|^2dx = 1$ fija la constante $\\sqrt{2/a}$, pues sobre el pozo caben $n$ períodos completos y la integral vale $a/2$.' },
            { title: 'Nota la complementariedad', text: 'Las dos condiciones desacopladas no pueden cumplirse a la vez ($\\sin$ y $\\cos$ no se anulan simultáneamente), así que cada nivel es o par o impar, nunca una mezcla: la estructura que garantizaba el teorema 2.1(c).' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Tus energías deben reproduccir la Ecuación 2.23 con la anchura correcta de *este* pozo, y aplicando la sustitución $x \\to x - a/2$ a las $\\psi_n$ del texto (Ecuación 2.24) deben salir tus soluciones, quizá con un signo global $\\pm$ físicamente irrelevante.',
        application: {
          steps: [
            { title: 'Cuenta los nodos', text: 'El estado $n$ debe tener $n - 1$ nodos internos: $\\psi_1 = \\sqrt{2/a}\\cos\\frac{\\pi x}{a}$ no tiene ninguno y $\\psi_2 = \\sqrt{2/a}\\sin\\frac{2\\pi x}{a}$ se anula en $x = 0$, exactamente el patrón esperado.' },
            { title: 'Prueba la sustitución del enunciado', text: 'La sustitución $x \\to x - a/2$ corre el origen al centro del pozo, así que tu función es la Ec. 2.24 leída en $x + \\frac{a}{2}$: $\\sqrt{2/a}\\sin\\frac{n\\pi(x + a/2)}{a} = \\sqrt{2/a}\\sin\\left(\\frac{n\\pi x}{a} + \\frac{n\\pi}{2}\\right)$, que es $\\pm\\sqrt{2/a}\\cos\\frac{n\\pi x}{a}$ para $n$ impar y $\\pm\\sqrt{2/a}\\sin\\frac{n\\pi x}{a}$ para $n$ par: tus soluciones.' },
            { title: 'Tolera el signo global', text: 'Si al comparar te sobra un signo $\\pm$, no te alarmes: $\\psi$ y $-\\psi$ dan el mismo $|\\psi|^2$ y representan el mismo estado físico. La correspondencia es completa.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: 'Con $\\psi(\\pm a) = 0$: restando las dos condiciones, $A\\sin(ka) = 0 \\Rightarrow ka = j\\pi$; con $n = 2j$ (par), $k = n\\pi/2a$ y $\\psi_n = \\frac{1}{\\sqrt a}\\sin\\frac{n\\pi x}{2a}$. Sumando, $B\\cos(ka) = 0 \\Rightarrow ka = (j - \\frac{1}{2})\\pi$; con $n = 2j-1$ (impar), $\\psi_n = \\frac{1}{\\sqrt a}\\cos\\frac{n\\pi x}{2a}$. En ambos casos $E_n = \\frac{\\hbar^2k^2}{2m} = \\frac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$ (pozo de anchura $2a$). La sustitución $x \\to (x+a)/2$ en la Ec. 2.28 da $\\sqrt{\\frac{2}{a}}\\sin\\frac{n\\pi(x+a)}{2a} = (-1)^{n/2}\\sqrt{\\frac{2}{a}}\\sin\\frac{n\\pi x}{2a}$ ($n$ par) o bien $(-1)^{(n-1)/2}\\sqrt{\\frac{2}{a}}\\cos\\frac{n\\pi x}{2a}$ ($n$ impar): las mismas funciones, salvo normalización y signo.',
      page: 40,
      note: 'La 2.ª ed. reformuló el problema con un pozo de anchura $2a$ ($-a < x < a$); la constante de normalización es $\\sqrt{2/(2a)}$. En la convención de la 1.ª ed. ($-a/2 < x < a/2$, anchura $a$): $\\psi_n = \\sqrt{2/a}\\cos(n\\pi x/a)$ ($n$ impar), $\\psi_n = \\sqrt{2/a}\\sin(n\\pi x/a)$ ($n$ par), $E_n = n^2\\pi^2\\hbar^2/2ma^2$, y la sustitución de comprobación es $x \\to x - a/2$.',
    },
  },
  'bp-2-5': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Cálculo directo de valores esperados en un *estado estacionario* del pozo infinito: pura integral definida con senos. La física está en el resultado final (principio de incertidumbre); el trabajo está en las integrales.',
        application: {
          steps: [
            { title: 'Haz el inventario', text: 'Son cuatro valores esperados ($\\langle x\\rangle$, $\\langle x^2\\rangle$, $\\langle p\\rangle$, $\\langle p^2\\rangle$) y dos incertidumbres que se derivan de ellos: todo con una única función, $\\psi_n = \\sqrt{2/a}\\sin\\frac{n\\pi x}{a}$ en $(0, a)$.' },
            { title: 'Separa por tipo de operador', text: 'La posición se promedia contra la densidad: $\\langle x^k\\rangle = \\int_0^a x^k|\\psi_n|^2dx$. El momento requiere $\\hat p = -i\\hbar\\,\\frac{d}{dx}$, aunque hay atajos que evitan integrar.' },
            { title: 'Explota la simetría', text: 'La densidad $|\\psi_n|^2 = \\frac{2}{a}\\sin^2\\frac{n\\pi x}{a}$ es simétrica respecto al centro $x = \\frac{a}{2}$: eso te regala $\\langle x\\rangle = \\frac{a}{2}$ y anticipa $\\langle p\\rangle = 0$.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Escribe $\\psi_n = \\sqrt{2/a}\\sin(n\\pi x/a)$ y calcula $\\langle x\\rangle$ y $\\langle x^2\\rangle$ con la densidad $|\\psi_n|^2$. Para $\\langle p\\rangle$ y $\\langle p^2\\rangle$ usa $\\hat p = -i\\hbar\\,\\partial/\\partial x$; para $\\langle p\\rangle$ hay un atajo: al ser un estado estacionario, $\\langle p\\rangle = m\\,d\\langle x\\rangle/dt$.',
        application: {
          steps: [
            { title: 'Monta las integrales de posición', text: 'Escribe $\\langle x\\rangle = \\frac{2}{a}\\int_0^a x\\sin^2\\frac{n\\pi x}{a}dx$ y $\\langle x^2\\rangle = \\frac{2}{a}\\int_0^a x^2\\sin^2\\frac{n\\pi x}{a}dx$: la primera sale casi sola, la segunda es el trabajo fuerte.' },
            { title: 'Resuelve p con un atajo', text: 'Como $\\psi_n$ es estacionario, $\\langle x\\rangle$ no depende de $t$ y $\\langle p\\rangle = m\\frac{d\\langle x\\rangle}{dt} = 0$; puedes confirmarlo aplicando $\\hat p$ e integrando.' },
            { title: 'Resuelve p² con H', text: 'Dentro del pozo $V = 0$, así que $\\hat H = \\frac{\\hat p^2}{2m}$ y de $\\hat H\\psi_n = E_n\\psi_n$ sale $\\frac{\\langle p^2\\rangle}{2m} = E_n = \\frac{n^2\\pi^2\\hbar^2}{2ma^2}$, sin integrales.' },
            { title: 'Prepara las incertidumbres', text: 'Cierra con $\\sigma_x = \\sqrt{\\langle x^2\\rangle - \\langle x\\rangle^2}$ y $\\sigma_p = \\sqrt{\\langle p^2\\rangle - \\langle p\\rangle^2}$, y forma el producto $\\sigma_x\\sigma_p$ para el principio de incertidumbre.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'La integral de $x^2\\sin^2$ se resuelve con $\\sin^2\\theta = (1 - \\cos 2\\theta)/2$ y el cambio $y = n\\pi x/a$, integrando por partes lo que quede. Para $\\langle p^2\\rangle$ aprovecha $\\hat H\\psi_n = E_n\\psi_n$: en el pozo toda la energía es cinética, así que $\\langle p^2\\rangle/2m = E_n$.',
        application: {
          steps: [
            { title: 'Simplifica con sin²', text: 'Usa $\\sin^2\\theta = \\frac{1 - \\cos 2\\theta}{2}$ con $\\theta = \\frac{n\\pi x}{a}$: $\\langle x^2\\rangle = \\frac{1}{a}\\int_0^a x^2dx - \\frac{1}{a}\\int_0^a x^2\\cos\\frac{2n\\pi x}{a}dx$.' },
            { title: 'Ataca la integral cosenoidal', text: 'Con el cambio $y = \\frac{n\\pi x}{a}$ queda $\\frac{a^3}{(n\\pi)^3}\\int_0^{n\\pi}y^2\\cos 2y\\,dy$, que se resuelve por partes dos veces: integra $\\cos 2y$, deriva $y^2$, y repite.' },
            { title: 'Junta la posición', text: 'Las cuentas dan $\\langle x\\rangle = \\frac{a}{2}$ (la integral con $\\cos$ se cancela) y $\\langle x^2\\rangle = a^2\\left[\\frac{1}{3} - \\frac{1}{2(n\\pi)^2}\\right]$, de donde $\\sigma_x = a\\sqrt{\\frac{1}{12} - \\frac{1}{2(n\\pi)^2}}$.' },
            { title: 'Junta el momento', text: 'Con $\\langle p\\rangle = 0$ y $\\langle p^2\\rangle = 2mE_n = \\left(\\frac{n\\pi\\hbar}{a}\\right)^2$ queda $\\sigma_p = \\frac{n\\pi\\hbar}{a}$: crece linealmente con $n$.' },
            { title: 'Forma el producto', text: 'Multiplica: $\\sigma_x\\sigma_p = \\frac{\\hbar}{2}\\sqrt{\\frac{(n\\pi)^2}{3} - 2}$. Como crece con $n$, el estado más cercano al límite $\\frac{\\hbar}{2}$ será el fundamental.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Checa la simetría: $\\langle x\\rangle$ debe caer en el centro del pozo y $\\langle p\\rangle$ ser cero. Al final forma $\\sigma_x\\sigma_p$: debe respetar el principio de incertidumbre para todo $n$, y el estado que quede más cerca del límite debe ser el fundamental.',
        application: {
          steps: [
            { title: 'Comprueba el principio', text: 'Necesitas $\\frac{(n\\pi)^2}{3} - 2 > 1$ y, como $n\\pi > 3$ para todo $n \\ge 1$, se cumple siempre: $\\sigma_x\\sigma_p > \\frac{\\hbar}{2}$. Con $n = 1$ el factor vale $\\frac{\\pi^2}{3} - 2 \\approx 1.29$.' },
            { title: 'Identifica el estado límite', text: 'El producto crece con $n$, así que el que más se acerca al límite es $n = 1$, con $\\sigma_x\\sigma_p \\approx 1.136\\,\\frac{\\hbar}{2}$: el fundamental es el estado más parecido a un paquete mínimo.' },
            { title: 'Chequea los límites', text: 'Confirma que $\\langle x\\rangle = \\frac{a}{2}$ cae en el centro del pozo, que $\\langle p\\rangle = 0$ es coherente con una densidad quieta, y que para $n$ grande $\\sigma_x \\to \\frac{a}{\\sqrt{12}}$, la desviación de una distribución uniforme en $(0, a)$.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$\\langle x\\rangle = a/2$ (independiente de $n$); $\\langle x^2\\rangle = a^2\\left[\\frac{1}{3} - \\frac{1}{2(n\\pi)^2}\\right]$; $\\langle p\\rangle = 0$; $\\langle p^2\\rangle = 2mE_n = \\left(\\frac{n\\pi\\hbar}{a}\\right)^2$; $\\sigma_x = a\\sqrt{\\frac{1}{12} - \\frac{1}{2(n\\pi)^2}}$; $\\sigma_p = \\frac{n\\pi\\hbar}{a}$; $\\sigma_x\\sigma_p = \\frac{\\hbar}{2}\\sqrt{\\frac{(n\\pi)^2}{3} - 2} > \\frac{\\hbar}{2}$, y es mínimo para $n = 1$: $\\sigma_x\\sigma_p = 1.136\\,(\\hbar/2)$.',
      page: 16,
    },
  },
  'bp-2-6': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Superposición de *dos* estados estacionarios del pozo: la clave es que $|\\Psi(x,t)|^2$ ya no es constante en el tiempo, porque las fases $e^{-iE_nt/\\hbar}$ giran a velocidades distintas. Con la definición $\\omega = \\pi^2\\hbar/2ma^2$ del enunciado, $E_n/\\hbar = n^2\\omega$.',
        application: {
          steps: [
            { title: 'Clasifica el estado', text: 'No es un estado estacionario: es la mezcla $\\Psi(x,0) = A[\\psi_1 + \\psi_2]$ de los dos primeros niveles del pozo, así que $|\\Psi|^2$ y $\\langle x\\rangle$ van a oscilar con el tiempo.' },
            { title: 'Asimila la definición de ω', text: 'Con $\\omega = \\frac{\\pi^2\\hbar}{2ma^2}$ las energías se escriben $E_n = n^2\\hbar\\omega$, así que las fases giran como $e^{-in^2\\omega t}$ y todo el batido depende de $E_2 - E_1 = 3\\hbar\\omega$.' },
            { title: 'Planifica los apartados', text: '(a) normaliza, (b) evoluciona y calcula $|\\Psi|^2$, (c) y (d) dan $\\langle x\\rangle$ y $\\langle p\\rangle$, (e) promedia $H$ y (f) compara con el rebote clásico: cada apartado reutiliza el anterior.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: '(a) Usa la ortonormalidad: en $\\int|\\Psi|^2dx$ los términos cruzados se anulan y solo quedan las normas de $\\psi_1$ y $\\psi_2$. (b) Evoluciona cada término con su propia fase y factoriza $e^{-iE_1t/\\hbar}$ para que en el término cruzado solo aparezca la *diferencia* $E_2 - E_1$.',
        application: {
          steps: [
            { title: '(a) Normaliza con ortonormalidad', text: 'En $1 = |A|^2\\int_0^a|\\psi_1 + \\psi_2|^2dx$ los términos cruzados se anulan y queda $2|A|^2 = 1$, es decir $A = \\frac{1}{\\sqrt2}$ (tómalo real y positivo).' },
            { title: '(b) Evoluciona cada término', text: 'Pega a cada estado su fase: $\\Psi(x,t) = \\frac{1}{\\sqrt2}\\left[\\psi_1e^{-iE_1t/\\hbar} + \\psi_2e^{-iE_2t/\\hbar}\\right]$, y factoriza $e^{-iE_1t/\\hbar}$ para que el término cruzado traiga solo la diferencia $E_2 - E_1 = 3\\hbar\\omega$.' },
            { title: '(b) Pasa a la densidad', text: 'En $|\\Psi|^2 = \\Psi^*\\Psi$ los cuadrados $\\psi_1^2$ y $\\psi_2^2$ no dependen de $t$; el cruzado trae $e^{\\pm i(E_2-E_1)t/\\hbar}$, que la fórmula de Euler convierte en $\\cos(3\\omega t)$.' },
            { title: '(c)–(e) Reutiliza el 2.5', text: 'Para $\\langle x\\rangle$ necesitas $\\int_0^a x\\sin^2\\frac{n\\pi x}{a}dx$ (por partes o simetría) y $\\int_0^a x\\sin\\frac{\\pi x}{a}\\sin\\frac{2\\pi x}{a}dx$ (producto a suma de cosenos); luego $\\langle p\\rangle = m\\frac{d\\langle x\\rangle}{dt}$ y $\\langle H\\rangle = \\sum E_n|c_n|^2$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'En $|\\Psi|^2$ aparece el producto cruzado $\\psi_1\\psi_2$ con fases opuestas: la fórmula de Euler los convierte en un coseno del tiempo. Para $\\langle x\\rangle$ necesitas $\\int x\\sin^2$ (por partes) y $\\int x\\sin\\cdot\\sin$ (convierte el producto en suma de senos); el resto es derivar respecto a $t$.',
        application: {
          steps: [
            { title: '(b) Ψ(x,t) explícita', text: 'Con $\\psi_n = \\sqrt{2/a}\\sin\\frac{n\\pi x}{a}$, $E_1 = \\hbar\\omega$ y $E_2 = 4\\hbar\\omega$: $\\Psi(x,t) = \\frac{1}{\\sqrt a}e^{-i\\omega t}\\left[\\sin\\frac{\\pi x}{a} + e^{-3i\\omega t}\\sin\\frac{2\\pi x}{a}\\right]$, donde $\\frac{1}{\\sqrt2}\\cdot\\sqrt{\\frac{2}{a}} = \\frac{1}{\\sqrt a}$.' },
            { title: '(b) |Ψ|² explícita', text: '$|\\Psi|^2 = \\frac{1}{a}\\left[\\sin^2\\frac{\\pi x}{a} + \\sin^2\\frac{2\\pi x}{a} + 2\\sin\\frac{\\pi x}{a}\\sin\\frac{2\\pi x}{a}\\cos(3\\omega t)\\right]$: la densidad late con la frecuencia de batido $3\\omega$.' },
            { title: '(c) Integrales de posición', text: 'Usa $\\int_0^a x\\sin^2\\frac{n\\pi x}{a}dx = \\frac{a^2}{4}$ y, con $\\sin u\\sin 2u = \\frac{1}{2}(\\cos u - \\cos 3u)$, $\\int_0^a x\\sin\\frac{\\pi x}{a}\\sin\\frac{2\\pi x}{a}dx = -\\frac{8a^2}{9\\pi^2}$. Junto: $\\langle x\\rangle = \\frac{a}{2}\\left[1 - \\frac{32}{9\\pi^2}\\cos(3\\omega t)\\right]$.' },
            { title: '(c) Frecuencia y amplitud', text: 'La oscilación tiene frecuencia angular $3\\omega = \\frac{3\\pi^2\\hbar}{2ma^2}$ y amplitud $\\frac{32}{9\\pi^2}\\cdot\\frac{a}{2} \\approx 0.36\\,\\frac{a}{2}$ en torno al centro $\\frac{a}{2}$.' },
            { title: '(d) y (e) momento y energía', text: 'Deriva: $\\langle p\\rangle = m\\frac{d\\langle x\\rangle}{dt} = \\frac{8\\hbar}{3a}\\sin(3\\omega t)$. Y con pesos $|c_1|^2 = |c_2|^2 = \\frac{1}{2}$: $\\langle H\\rangle = \\frac{E_1 + E_2}{2} = \\frac{5\\hbar\\omega}{2} = \\frac{5\\pi^2\\hbar^2}{4ma^2}$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'La amplitud de la oscilación de $\\langle x\\rangle$ no puede pasar de $a/2$: la partícula está encerrada (¡el propio enunciado te advierte de la cárcel!). En (e), $\\langle H\\rangle$ debe caer entre $E_1$ y $E_2$, y en (d) puedes contrastar con $\\langle p\\rangle = m\\,d\\langle x\\rangle/dt$.',
        application: {
          steps: [
            { title: 'Respeta la cárcel', text: 'El rango de $\\langle x\\rangle$ es $\\frac{a}{2}\\left(1 \\pm \\frac{32}{9\\pi^2}\\right)$, o sea $\\pm 0.36\\,\\frac{a}{2}$ alrededor del centro: la amplitud nunca supera $\\frac{a}{2}$, como exige el enunciado.' },
            { title: 'Compara con el clásico', text: 'Con $E = \\langle H\\rangle = \\frac{5}{2}\\hbar\\omega$, la partícula clásica lleva $v = \\sqrt{\\frac{2E}{m}}$ y su rebote tiene $\\omega_{cl} = \\frac{\\pi v}{a} = \\sqrt{5/2}\\,\\frac{\\pi^2\\hbar}{ma^2}$, apenas un 5% por encima de la frecuencia cuántica $3\\omega$.' },
            { title: 'Dos chequeos finales', text: 'Integra tu $|\\Psi|^2$ de (b): los términos cruzados son ortogonales y da 1 para todo $t$, como prometía el (a). Y $\\langle H\\rangle = \\frac{5\\hbar\\omega}{2}$ cae justo en el punto medio entre $E_1 = \\hbar\\omega$ y $E_2 = 4\\hbar\\omega$, como corresponde a una mezcla al 50%.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $A = 1/\\sqrt2$. (b) $\\Psi(x,t) = \\frac{1}{\\sqrt2}\\left[\\sin\\frac{\\pi x}{a}e^{-i\\omega t} + \\sin\\frac{2\\pi x}{a}e^{-4i\\omega t}\\right] = \\frac{1}{\\sqrt2}e^{-i\\omega t}\\left[\\sin\\frac{\\pi x}{a} + e^{-3i\\omega t}\\sin\\frac{2\\pi x}{a}\\right]$; $|\\Psi|^2 = \\frac{1}{a}\\left[\\sin^2\\frac{\\pi x}{a} + \\sin^2\\frac{2\\pi x}{a} + 2\\sin\\frac{\\pi x}{a}\\sin\\frac{2\\pi x}{a}\\cos(3\\omega t)\\right]$. (c) $\\langle x\\rangle = \\frac{a}{2}\\left[1 - \\frac{32}{9\\pi^2}\\cos(3\\omega t)\\right]$; amplitud $\\frac{32}{9\\pi^2}\\cdot\\frac{a}{2} = 0.3603\\,(a/2)$; frecuencia angular $3\\omega = \\frac{3\\pi^2\\hbar}{2ma^2}$. (d) $\\langle p\\rangle = \\frac{8\\hbar}{3a}\\sin(3\\omega t)$. (e) $\\langle H\\rangle = \\frac{1}{2}(E_1 + E_2) = \\frac{5\\pi^2\\hbar^2}{4ma^2}$, la media de $E_1$ y $E_2$.',
      page: 17,
      note: 'El apartado (f) no aparece en el problema de la 2.ª ed. Clásicamente, con $E = \\langle H\\rangle$: $v = \\sqrt{2\\langle H\\rangle/m} = \\frac{\\pi\\hbar}{ma}\\sqrt{5/2}$ y la frecuencia angular del rebote es $\\omega_{cl} = \\pi v/a = \\sqrt{5/2}\\,\\frac{\\pi^2\\hbar}{ma^2}$, apenas ~5% mayor que la cuántica $3\\omega$.',
    },
  },
  'bp-2-7': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Es el problema 2.6 con una fase relativa $e^{i\\phi}$ entre los dos coeficientes de la expansión. La fase *global* de $\\Psi$ no tiene efecto físico, pero esta relativa sí: aparecerá corriendo los cosenos temporales.',
        application: {
          steps: [
            { title: 'Reconoce la variante', text: 'Es el Problema 2.6 con una fase relativa: $\\Psi(x,0) = A[\\psi_1 + e^{i\\phi}\\psi_2]$. La estructura del cálculo es idéntica; lo único nuevo es seguirle la pista a $e^{i\\phi}$.' },
            { title: 'Distingue fase global y relativa', text: 'Multiplicar todo $\\Psi$ por $e^{i\\alpha}$ no altera $|\\Psi|^2$, $\\langle x\\rangle$ ni $\\langle H\\rangle$; en cambio $\\phi$, la fase *entre* coeficientes, sí aparecerá en los cosenos temporales.' },
            { title: 'Predice el ahorro', text: 'Las integrales espaciales del 2.6, $\\int_0^a x\\sin^2$ y $\\int_0^a x\\sin\\frac{\\pi x}{a}\\sin\\frac{2\\pi x}{a}dx$, se copian sin cambiar un número: el trabajo nuevo es solo de fases.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Repite la estructura del 2.6: $\\Psi(x,t) = A[\\psi_1 e^{-iE_1t/\\hbar} + e^{i\\phi}\\psi_2 e^{-iE_2t/\\hbar}]$, factoriza la fase de $E_1$ y calcula $|\\Psi|^2$: el término cruzado arrastra $e^{i\\phi}$ y su conjugado.',
        application: {
          steps: [
            { title: 'Escribe la evolución', text: 'Cada término lleva su fase: $\\Psi(x,t) = \\frac{1}{\\sqrt2}\\left[\\psi_1e^{-iE_1t/\\hbar} + e^{i\\phi}\\psi_2e^{-iE_2t/\\hbar}\\right]$, con $A = \\frac{1}{\\sqrt2}$ heredado del 2.6 porque $|e^{i\\phi}| = 1$.' },
            { title: 'Factoriza y forma |Ψ|²', text: 'Saca $e^{-iE_1t/\\hbar}$ y multiplica $\\Psi^*\\Psi$: el término cruzado queda con el par $e^{i\\phi}e^{-i(E_2-E_1)t/\\hbar}$ y su conjugado $e^{-i\\phi}e^{i(E_2-E_1)t/\\hbar}$.' },
            { title: 'Reconoce el coseno desfasado', text: 'Ese par suma $2\\cos\\left(\\frac{(E_2-E_1)t}{\\hbar} - \\phi\\right) = 2\\cos(3\\omega t - \\phi)$: todo el efecto de $\\phi$ es desplazar la fase del coseno del Problema 2.6.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Al juntar $e^{i\\phi}e^{-i(E_2-E_1)t/\\hbar}$ con su conjugado, la suma es un coseno con la fase restada: $\\cos[(E_2-E_1)t/\\hbar - \\phi]$. Todo lo demás (las integrales de $\\langle x\\rangle$) es literalmente el problema anterior.',
        application: {
          steps: [
            { title: 'Ψ(x,t) explícita', text: 'Con $E_1 = \\hbar\\omega$ y $E_2 = 4\\hbar\\omega$: $\\Psi(x,t) = \\frac{1}{\\sqrt a}e^{-i\\omega t}\\left[\\sin\\frac{\\pi x}{a} + e^{i\\phi}e^{-3i\\omega t}\\sin\\frac{2\\pi x}{a}\\right]$.' },
            { title: '|Ψ|² explícita', text: '$|\\Psi|^2 = \\frac{1}{a}\\left[\\sin^2\\frac{\\pi x}{a} + \\sin^2\\frac{2\\pi x}{a} + 2\\sin\\frac{\\pi x}{a}\\sin\\frac{2\\pi x}{a}\\cos(3\\omega t - \\phi)\\right]$: idéntica a la del 2.6 con el corrimiento $-\\phi$.' },
            { title: '⟨x⟩ con las mismas integrales', text: 'Reciclando $\\int_0^a x\\sin^2\\frac{n\\pi x}{a}dx = \\frac{a^2}{4}$ y $\\int_0^a x\\sin\\frac{\\pi x}{a}\\sin\\frac{2\\pi x}{a}dx = -\\frac{8a^2}{9\\pi^2}$: $\\langle x\\rangle = \\frac{a}{2}\\left[1 - \\frac{32}{9\\pi^2}\\cos(3\\omega t - \\phi)\\right]$. La curva es la misma, girada en fase.' },
            { title: 'Casos especiales', text: 'Con $\\phi = \\frac{\\pi}{2}$: $\\cos(3\\omega t - \\frac{\\pi}{2}) = \\sin(3\\omega t)$ y $\\langle x\\rangle$ arranca en $\\frac{a}{2}$. Con $\\phi = \\pi$: $\\langle x\\rangle(0) = \\frac{a}{2}\\left(1 + \\frac{32}{9\\pi^2}\\right)$, el extremo de su recorrido.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Interpreta: el efecto de $\\phi$ es equivalente a arrancar el cronómetro en otro instante. Checa los casos $\\phi = \\pi/2$ y $\\phi = \\pi$ evaluando $\\langle x\\rangle$ en $t = 0$ y comparando con el problema 2.6.',
        application: {
          steps: [
            { title: 'Recupera el Problema 2.6', text: 'Poniendo $\\phi = 0$ deben caer exactamente las fórmulas del 2.6: el coseno se reduce a $\\cos(3\\omega t)$ en $|\\Psi|^2$ y en $\\langle x\\rangle$. Úsalo como control de errores.' },
            { title: 'Interpreta el papel de φ', text: 'Como $\\cos(3\\omega t - \\phi) = \\cos\\left[3\\omega\\left(t - \\frac{\\phi}{3\\omega}\\right)\\right]$, cambiar $\\phi$ equivale a arrancar el cronómetro $\\frac{\\phi}{3\\omega}$ más tarde: la misma película, corrida en el tiempo.' },
            { title: 'Confirma lo que no cambia', text: 'La norma $\\int|\\Psi|^2dx = 1$ y $\\langle H\\rangle = \\frac{E_1 + E_2}{2}$ son insensibles a $\\phi$: solo las cantidades que dependen del término cruzado ($|\\Psi|^2$ y $\\langle x\\rangle$) notan la fase relativa.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$\\Psi(x,t) = \\frac{1}{\\sqrt a}e^{-i\\omega t}\\left[\\sin\\frac{\\pi x}{a} + \\sin\\frac{2\\pi x}{a}\\,e^{i\\phi}e^{-3i\\omega t}\\right]$; $|\\Psi|^2 = \\frac{1}{a}\\left[\\sin^2\\frac{\\pi x}{a} + \\sin^2\\frac{2\\pi x}{a} + 2\\sin\\frac{\\pi x}{a}\\sin\\frac{2\\pi x}{a}\\cos(3\\omega t - \\phi)\\right]$; $\\langle x\\rangle = \\frac{a}{2}\\left[1 - \\frac{32}{9\\pi^2}\\cos(3\\omega t - \\phi)\\right]$ (equivale a empezar el reloj en otro instante). Con $\\phi = \\pi/2$, $\\langle x\\rangle$ arranca en $a/2$; con $\\phi = \\pi$, arranca en $\\frac{a}{2}\\left(1 + \\frac{32}{9\\pi^2}\\right)$.',
      page: 18,
    },
  },
  'bp-2-8': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Otra función inicial no estacionaria en el pozo infinito: una parábola continua que se anula en ambas paredes. Al ser real y simétrica respecto al centro del pozo, varios valores esperados salen casi sin hacer cuentas.',
        application: {
          steps: [
            { title: 'Caracteriza la función inicial', text: 'Es la parábola $\\Psi(x,0) = Ax(a - x)$: continua, positiva dentro del pozo y nula justo en las paredes $x = 0$ y $x = a$, con máximo en $x = \\frac{a}{2}$.' },
            { title: 'Explota la simetría', text: 'Bajo $x \\to a - x$ la función es invariante, así que la densidad es simétrica respecto al centro: $\\langle x\\rangle = \\frac{a}{2}$ cae sin cuentas, y al ser $\\Psi$ real, $\\langle p\\rangle$ también saldrá barato.' },
            { title: 'Prepara la estimación de (a)', text: 'La gráfica tiene una sola joroba, como $\\psi_1 = \\sqrt{2/a}\\sin\\frac{\\pi x}{a}$: ese parecido visual fijará tu estimación de la energía antes de integrar nada.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: '(a) Normaliza con $1 = |A|^2\\int_0^a x^2(a-x)^2dx$ (integral de polinomio) y bosqueja la gráfica para compararla con las $\\psi_n$: la que más se parezca fija la escala de energía. (b) Para $\\langle H\\rangle$ calcula $\\hat H\\Psi$ directamente: la segunda derivada de $x(a-x)$ es constante.',
        application: {
          steps: [
            { title: '(a) Plantea la normalización', text: 'Impón $1 = |A|^2\\int_0^a x^2(a - x)^2dx$: al expandir $(a - x)^2$ queda el polinomio $a^2x^2 - 2ax^3 + x^4$, que se integra término a término.' },
            { title: '(a) Estima la energía', text: 'Con $A$ calculado, dibuja la parábola junto a las $\\psi_n$ y elige la más parecida: tu estimación es $\\langle H\\rangle \\approx E_n$ del estado dominante.' },
            { title: '(b) Elige los operadores', text: 'Como solo conoces $\\langle x\\rangle$ en $t = 0$, usa la definición $\\langle p\\rangle = -i\\hbar\\int_0^a\\Psi\\frac{\\partial\\Psi}{\\partial x}dx$ y $\\langle H\\rangle = \\int_0^a\\Psi\\hat H\\Psi\\,dx$ con $\\hat H = -\\frac{\\hbar^2}{2m}\\frac{d^2}{dx^2}$ dentro del pozo.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Para $\\langle p\\rangle$ no puedes derivar $\\langle x\\rangle$ (solo lo conoces en un instante): usa $\\langle p\\rangle = -i\\hbar\\int\\Psi\\,\\frac{\\partial\\Psi}{\\partial x}dx$ y razona con la integral total de una función real. Como $\\hat H\\Psi$ es constante dentro del pozo, $\\langle H\\rangle$ se reduce a una integral trivial de $x(a-x)$.',
        application: {
          steps: [
            { title: 'Normaliza', text: '$\\int_0^a x^2(a-x)^2dx = \\frac{a^5}{3} - \\frac{a^5}{2} + \\frac{a^5}{5} = \\frac{a^5}{30}$, así que $A = \\sqrt{\\frac{30}{a^5}}$ (tomado positivo).' },
            { title: '(a) Estimación gráfica', text: 'La parábola se parece mucho a $\\psi_1$, así que tu estimación es $\\langle H\\rangle \\approx E_1 = \\frac{\\pi^2\\hbar^2}{2ma^2}$: esa es la vara contra la que medirás (b).' },
            { title: '(b) ⟨x⟩ y ⟨p⟩', text: 'Por simetría, $\\langle x\\rangle = \\frac{a}{2}$. Y como $\\Psi$ es real, $\\Psi\\frac{\\partial\\Psi}{\\partial x} = \\frac{1}{2}\\frac{\\partial\\Psi^2}{\\partial x}$, de modo que $\\langle p\\rangle = -\\frac{i\\hbar}{2}\\left[\\Psi^2\\right]_0^a = 0$ porque la parábola se anula en ambas paredes.' },
            { title: '(b) ⟨H⟩ exacto', text: 'La segunda derivada de $x(a-x)$ es $-2$, así que $\\hat H\\Psi = \\frac{\\hbar^2A}{m}$ es constante dentro del pozo y $\\langle H\\rangle = \\frac{\\hbar^2A^2}{m}\\int_0^a x(a-x)dx = \\frac{\\hbar^2A^2}{m}\\cdot\\frac{a^3}{6} = \\frac{5\\hbar^2}{ma^2}$.' },
            { title: 'Compara (a) con (b)', text: 'El cociente es $\\frac{\\langle H\\rangle}{E_1} = \\frac{10}{\\pi^2} \\approx 1.013$: la estimación gráfica falló apenas un 1.3%, señal de que la parábola es casi $\\psi_1$ pura.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Tu estimación de (a) se apoya en el parecido con $\\psi_1$, así que debe quedar *por debajo* del valor exacto de (b): la parábola también contiene armónicos superiores. Esta misma función se analiza en el Ejemplo 2.3 del texto.',
        application: {
          steps: [
            { title: 'Ordena energéticamente', text: 'Debes obtener $E_1 \\le \\langle H\\rangle$: como $\\langle H\\rangle = \\sum E_n|c_n|^2$ con todos los $E_n \\ge E_1$, no puede quedar por debajo. Tu $\\frac{5\\hbar^2}{ma^2}$ queda un 1.3% por encima de $E_1 \\approx 4.93\\,\\frac{\\hbar^2}{ma^2}$.' },
            { title: 'Interpreta el exceso', text: 'Ese pequeño exceso mide el contenido de armónicos superiores ($n = 3, 5, \\dots$): la parábola no es exactamente $\\psi_1$, y la parte que sobra sube la media de energía.' },
            { title: 'Contrasta con el texto', text: 'Esta misma parábola se expande en la base del pozo en el Ejemplo 2.3, y por la vía de la serie también sale $\\langle H\\rangle = \\frac{5\\hbar^2}{ma^2}$: dos caminos, el mismo número.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $A = \\sqrt{30/a^5}$; la gráfica (parábola con máximo en $a/2$) se parece mucho a $\\psi_1$, así que $\\langle H\\rangle \\approx E_1 = \\pi^2\\hbar^2/2ma^2$. (b) $\\langle x\\rangle = a/2$ (simetría), $\\langle p\\rangle = 0$ ($\\Psi$ real), $\\langle H\\rangle = \\int\\Psi^*\\hat H\\Psi\\,dx = 5\\hbar^2/ma^2$, apenas ~1% por encima de $E_1$.',
      page: 20,
      note: 'La 2.ª ed. reformuló el problema asignado (2.7) con una función «tienda» ($\\Psi = Ax$ en $0 < x < a/2$ y $A(a-x)$ en $a/2 < x < a$): $A = \\sqrt{12/a^3}$, $c_n = \\frac{4\\sqrt6\\,(-1)^{(n-1)/2}}{(n\\pi)^2}$ ($n$ impar), $P_1 = 96/\\pi^4 = 0.9855$, $\\langle H\\rangle = 6\\hbar^2/ma^2$ (pp. 18–19). Para la parábola $Ax(a-x)$ del enunciado, la normalización es el Ejemplo 2.3 del texto y $\\langle H\\rangle = 5\\hbar^2/ma^2$ está en el Problema 2.9 del manual (p. 20).',
    },
  },
  'bp-2-9': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Problema de *serie estacionaria*: expandir la parábola del problema anterior en la base $\\{\\psi_n\\}$ del pozo y leer los coeficientes $c_n$. La parte final es conceptual: qué le pasa a la expansión después de una medición de energía.',
        application: {
          steps: [
            { title: 'Identifica la técnica', text: 'Es una *serie estacionaria*: expandir la parábola del 2.8, ya normalizada $\\Psi(x,0) = \\sqrt{\\frac{30}{a^5}}\\,x(a-x)$, en la base ortonormal $\\{\\psi_n\\}$ del pozo y leer los coeficientes $c_n$.' },
            { title: 'Predice la selección por simetría', text: 'La parábola es simétrica respecto a $\\frac{a}{2}$, mientras que $\\psi_n$ con $n$ par es antisimétrica respecto al centro: esos coeficientes saldrán cero sin necesidad de integrar.' },
            { title: 'Señala la pregunta conceptual', text: 'El cierre pide qué pasa con los $c_n$ tras medir la energía y obtener $E_3$: piensa qué estado garantiza que una medición inmediata repita el mismo resultado con certeza.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Escribe $\\Psi(x,0) = \\sum c_n\\psi_n$ con $c_n = \\int\\psi_n^*\\Psi\\,dx$; luego $\\Psi(x,t)$ sale pegándole a cada término su fase $e^{-iE_nt/\\hbar}$. Como la parábola es simétrica respecto al centro del pozo, media familia de coeficientes se anula sola.',
        application: {
          steps: [
            { title: 'Escribe la expansión', text: 'Descompón $\\Psi(x,0) = \\sum_n c_n\\psi_n(x)$ con $c_n = \\int_0^a\\psi_n(x)\\Psi(x,0)\\,dx$: la ortonormalidad de la base es lo que hace válida esta receta.' },
            { title: 'Evoluciona la serie', text: 'Cada término lleva su fase: $\\Psi(x,t) = \\sum_n c_n\\psi_n e^{-iE_nt/\\hbar}$ con $E_n = \\frac{n^2\\pi^2\\hbar^2}{2ma^2}$. Los módulos $|c_n|$ no cambian con el tiempo.' },
            { title: 'Planifica la integral', text: 'El trabajo técnico es $\\int_0^a x(a-x)\\sin\\frac{n\\pi x}{a}dx$: por partes dos veces, con $k = \\frac{n\\pi}{a}$, aparecerán cosenos evaluados en $0$ y $a$, donde valen $1$ y $(-1)^n$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'La integral $\\int_0^a x(a-x)\\sin(n\\pi x/a)dx$ se hace por partes dos veces (o con el cambio $u = \\pi x/a$); el resultado decae como $1/n^3$. Para el comentario, evalúa $c_1$, $c_2$ y $c_3$ y mira quién domina y por qué.',
        application: {
          steps: [
            { title: 'Primera parte por partes', text: 'Con $u = x(a-x)$ y $dv = \\sin(kx)dx$ el término de frontera se anula en $x = 0$ y $x = a$, y queda $\\frac{1}{k}\\int_0^a(a-2x)\\cos(kx)dx$ con $k = \\frac{n\\pi}{a}$.' },
            { title: 'Segunda parte por partes', text: 'Ahora con $u = a-2x$ y $dv = \\cos(kx)dx$: la frontera vuelve a anularse y queda $\\frac{2}{k^2}\\left[1 - (-1)^n\\right]$, así que $\\int_0^a x(a-x)\\sin\\frac{n\\pi x}{a}dx = \\frac{2a^3\\left[1 - (-1)^n\\right]}{(n\\pi)^3}$: el doble para $n$ impar y cero para $n$ par.' },
            { title: 'Coeficientes explícitos', text: 'Multiplicando por las normalizaciones, $c_n = \\sqrt{\\frac{2}{a}}\\sqrt{\\frac{30}{a^5}}\\,I_n = \\frac{4\\sqrt{60}}{(n\\pi)^3}$ para $n$ impar, y $c_n = 0$ para $n$ par, en acuerdo con el argumento de simetría.' },
            { title: 'Evalúa los números', text: '$c_1 = \\frac{4\\sqrt{60}}{\\pi^3} = 0.99928$, $c_2 = 0$ y $c_3 = \\frac{c_1}{27} = 0.03701$: la parábola contiene $\\psi_1$ al 99.9% y los impares siguientes ya son mínimos.' },
            { title: 'Colapso tras medir E₃', text: 'Si en $t_0$ mides la energía y sale $E_3$, el estado colapsa al correspondiente: $\\Psi = \\psi_3e^{-iE_3(t-t_0)/\\hbar}$ salvo fase global, es decir $|c_3| = 1$ y $c_n = 0$ para todo $n \\neq 3$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Si normalizaste bien, $\\sum|c_n|^2$ debe tender a 1 (compruébalo con los primeros términos). Para la medición: si una segunda medición inmediata tiene que devolver $E_3$ con certeza, la función colapsó a un único estado propio de energía.',
        application: {
          steps: [
            { title: 'Suma de probabilidades', text: 'Comprueba $\\sum_n|c_n|^2 = \\frac{16\\cdot 60}{\\pi^6}\\sum_{n \\text{ impar}}\\frac{1}{n^6} = \\frac{960}{\\pi^6}\\cdot\\frac{\\pi^6}{960} = 1$: la serie sobre los impares vale exactamente $\\frac{\\pi^6}{960}$.' },
            { title: 'Recupera el ⟨H⟩ del 2.8', text: 'Calculando $\\langle H\\rangle = \\sum_n E_n|c_n|^2$ con estos $c_n$ debe salir el $\\frac{5\\hbar^2}{ma^2}$ del 2.8(b): la serie y el operador describen el mismo estado.' },
            { title: 'Justifica el colapso', text: 'La repetición inmediata de la medición debe devolver $E_3$ con certeza, y eso solo lo garantiza estar en un estado propio puro de la energía: por eso tras la medida todos los coeficientes salvo $c_3$ se anulan.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$\\Psi(x,t) = \\sum_n c_n\\psi_n(x)e^{-iE_nt/\\hbar}$ con $c_n = \\frac{4\\sqrt{60}}{(n\\pi)^3}$ ($n$ impar; $c_n = 0$ para $n$ par). Numéricamente: $c_1 = 0.99928$, $c_2 = 0$, $c_3 = 0.03701$ (y $c_4 = 0$, $c_5 = 0.00799$): casi todo el estado es $\\psi_1$. Tras medir y obtener $E_3$: $|c_3| = 1$ (salvo fase) y los demás $c_n = 0$: $\\Psi$ colapsa a $\\psi_3e^{-iE_3(t-t_0)/\\hbar}$.',
      page: 19,
      note: 'La 2.ª ed. reformuló el problema asignado (2.7) con la función «tienda»: allí $c_n = \\frac{4\\sqrt6\\,(-1)^{(n-1)/2}}{(n\\pi)^2}$ ($n$ impar), $c_1 = 0.9928$, $c_3 = -0.1103$, $P_1 = 96/\\pi^4 = 0.9855$ (pp. 18–19). Los valores para la parábola $Ax(a-x)$ se obtienen con el mismo método (la normalización es el Ejemplo 2.3 del texto de la 2.ª ed.).',
    },
  },
  'bp-2-10': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Demostración general sobre la expansión $\\Psi = \\sum c_n\\psi_n$: la estructura es la de un vector en una base ortonormal, con los $c_n$ como componentes. Nada específico del pozo infinito salvo la verificación final.',
        application: {
          steps: [
            { title: 'Reconoce la base', text: 'La Ecuación 2.14 descompone $\\Psi(x,0) = \\sum_n c_n\\psi_n(x)$: los $\\psi_n$ funcionan como vectores de una base ortonormal y los $c_n$ son las componentes de $\\Psi$ en esa base.' },
            { title: 'Traduce la normalización', text: 'La condición $\\int|\\Psi|^2dx = 1$ es el análogo cuántico de exigir que los módulos al cuadrado de las componentes de un vector unitario sumen 1: el resultado $\\sum|c_n|^2 = 1$ tiene que salir casi solo.' },
            { title: 'Separa general y particular', text: 'La demostración solo usa la ortonormalidad de los $\\psi_n$, así que vale para cualquier potencial; el pozo infinito reaparece únicamente al final, al verificar $\\langle H\\rangle$ con la parábola $\\Psi = Ax(a-x)$.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Escribe $\\int|\\Psi|^2dx$ con la doble suma $\\sum_m\\sum_n c_m^*c_n\\psi_m^*\\psi_n$ y aplica la ortonormalidad $\\int\\psi_m^*\\psi_n dx = \\delta_{mn}$. Para $\\langle H\\rangle$ repite el mismo paso con $\\int\\Psi^*\\hat H\\Psi\\,dx$, usando antes $\\hat H\\psi_n = E_n\\psi_n$.',
        application: {
          steps: [
            { title: 'Abre el módulo al cuadrado', text: 'Con $\\Psi = \\sum_n c_n\\psi_n$, al multiplicar por el conjugado aparece la doble suma $\\int|\\Psi|^2dx = \\sum_m\\sum_n c_m^*c_n\\int\\psi_m^*\\psi_n dx$: cada integral es una delta de Kronecker por la ortonormalidad del pozo.' },
            { title: 'Escribe el valor esperado igual', text: 'Parte de $\\langle H\\rangle = \\int\\Psi^*(\\hat H\\Psi)dx$; sustituye la expansión en ambos factores y aplica $\\hat H\\psi_n = E_n\\psi_n$ término a término, de modo que las energías queden multiplicando.' },
            { title: 'Reconoce la integral común', text: 'Los dos cálculos contienen exactamente $\\int\\psi_m^*\\psi_n dx$: la ortonormalidad los resuelve de golpe, sin evaluar ninguna integral explícita de senos.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'El paso que simplifica todo: la delta de Kronecker se come una de las dos sumas y solo sobreviven los términos con $m = n$. Para la verificación con $\\Psi = Ax(a-x)$, recuerda que dentro del pozo $\\hat H\\Psi$ es una constante.',
        application: {
          steps: [
            { title: 'La delta come una suma', text: 'En $\\sum_m\\sum_n c_m^*c_nE_n\\delta_{mn}$ solo sobreviven los pares con $m = n$: la suma sobre $m$ desaparece y quedan $\\sum_n|c_n|^2 = 1$ y $\\langle H\\rangle = \\sum_nE_n|c_n|^2$ (Ecs. 2.34 y 2.35).' },
            { title: 'Interpreta como promedio', text: 'Como los $|c_n|^2$ suman 1, la fórmula dice que $\\langle H\\rangle$ es el promedio de las energías ponderado por los $|c_n|^2$, que son las probabilidades de medir cada $E_n$.' },
            { title: 'Calcula la energía cinética', text: 'Dentro del pozo $V = 0$, así que $\\hat H\\Psi = -\\frac{\\hbar^2}{2m}A\\frac{d^2}{dx^2}[x(a-x)] = \\frac{\\hbar^2A}{m}$: una constante que sale de la integral sin esfuerzo.' },
            { title: 'Integra con la norma', text: 'Entonces $\\int\\Psi^*\\hat H\\Psi\\,dx = \\frac{\\hbar^2A}{m}\\int_0^a\\Psi\\,dx = \\frac{\\hbar^2A^2}{m}\\cdot\\frac{a^3}{6} = \\frac{5\\hbar^2}{ma^2}$, usando $\\int_0^a x(a-x)dx = \\frac{a^3}{6}$ y $A = \\sqrt{30}/a^{5/2}$.' },
            { title: 'Compara con la serie', text: 'Con $E_n = \\frac{n^2\\pi^2\\hbar^2}{2ma^2}$ y los $c_n = \\frac{4\\sqrt{60}}{(n\\pi)^3}$ (n impares) del problema anterior, la suma sobre impares da $\\frac{480\\hbar^2}{ma^2\\pi^4}\\cdot\\frac{\\pi^4}{96} = \\frac{5\\hbar^2}{ma^2}$: idéntica al cálculo directo.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Casos límite: si $\\Psi = \\psi_k$ (un solo coeficiente distinto de cero), tu fórmula debe dar $\\langle H\\rangle = E_k$; con dos estados mezclados, $\\langle H\\rangle$ debe caer entre las dos energías, ponderado por los $|c_n|^2$.',
        application: {
          steps: [
            { title: 'Prueba con un autoestado', text: 'Si $\\Psi = \\psi_k$, los coeficientes son $c_n = \\delta_{nk}$: tus fórmulas devuelven $\\sum|c_n|^2 = 1$ y $\\langle H\\rangle = E_k$, el chequeo más rápido de que no perdiste ningún factor.' },
            { title: 'Prueba con dos estados', text: 'Con $\\Psi = \\frac{1}{\\sqrt2}(\\psi_1 + \\psi_3)$ sale $\\langle H\\rangle = \\frac{E_1 + E_3}{2}$, a medio camino entre ambas: un valor esperado de energía nunca puede salirse del rango de los niveles presentes.' },
            { title: 'Coteja la parábola', text: 'El resultado directo $\\frac{5\\hbar^2}{ma^2}$ queda apenas por encima de $E_1 = \\frac{\\pi^2\\hbar^2}{2ma^2} \\approx 4.93\\frac{\\hbar^2}{ma^2}$, coherente con una distribución dominada por $c_1 \\approx 0.999$.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$\\sum_n|c_n|^2 = 1$ (Ec. 2.34) y $\\langle H\\rangle = \\sum_n E_n|c_n|^2$ (Ec. 2.35). Verificación directa para $\\Psi = Ax(a-x)$: $\\int\\Psi^*\\hat H\\Psi\\,dx = 5\\hbar^2/ma^2$, igual que la suma $\\sum E_n|c_n|^2$; para la función «tienda» del problema 2.7 de la 2.ª ed., $\\langle H\\rangle = \\sum E_n|c_n|^2 = 6\\hbar^2/ma^2$ (p. 19).',
      page: 20,
      note: 'La demostración general es el Ejemplo 2.3 del texto en la 2.ª ed.; el manual la ilustra con la función «tienda» (2.7d, p. 19) y con el cálculo directo para la parábola (Problema 2.9, p. 20).',
    },
  },
  'bp-2-11': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Problema de operadores de escalera del oscilador armónico: hay que acotar la norma de $a_-\\psi$ usando solo integración por partes y la ecuación de Schrödinger. No hay que resolver nada.',
        application: {
          steps: [
            { title: 'Identifica qué se acota', text: 'La cantidad $\\int|a_-\\psi|^2dx$ es la norma al cuadrado de la función $a_-\\psi$: demostrar que es finita equivale a demostrar que el operador de descenso nunca fabrica algo no normalizable.' },
            { title: 'Nada que resolver', text: 'El problema es cálculo simbólico puro: integración por partes más la relación entre $a_+a_-$ y $\\hat H$ que da la Ecuación 2.46; no aparece ninguna ecuación diferencial nueva.' },
            { title: 'Las fronteras mueren solas', text: 'Como $\\psi$ es un estado ligado del oscilador, se anula (con sus derivadas) cuando $x \\to \\pm\\infty$: todos los términos de frontera de las integraciones por partes valen cero.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Parte de $\\int(a_-\\psi)^*(a_-\\psi)dx$ y busca escribirla como $\\int\\psi^*(\\text{operador}\\cdot\\psi)dx$: el candidato natural es $a_+a_-$, porque las derivadas que lleva $a_-$ se pueden transferir al conjugado.',
        application: {
          steps: [
            { title: 'Fija la meta intermedia', text: 'El enunciado te marca el paso intermedio: transformar $\\int(a_-\\psi)^*(a_-\\psi)dx$ en $\\int\\psi^*(a_+a_-\\psi)dx$, con el operador actuando enteramente sobre el $\\psi$ de la derecha.' },
            { title: 'Planea pasar la derivada', text: 'Al expandir el producto aparecen términos con la derivada del factor conjugado; la idea es integrarlos por partes para que cada derivada caiga sobre el otro factor, pagando un signo menos.' },
            { title: 'Reserva la Ecuación 2.46', text: 'Con la identidad anterior en la mano, sustituye $a_+a_- = \\hat H - \\frac{1}{2}\\hbar\\omega$ y remata con $\\hat H\\psi = E\\psi$ y la normalización de $\\psi$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Integra por partes para pasar la derivada de $(a_-\\psi)^*$ hacia el otro factor; los términos de frontera mueren porque $\\psi$ es normalizable. Después expresa $a_+a_-$ en función de $\\hat H$ (Ecuación 2.46) y usa que $\\psi$ es autoestado de $\\hat H$.',
        application: {
          steps: [
            { title: 'Expande el producto', text: 'Con la forma de la Ecuación 2.43, $a_-\\psi$ es (salvo una fase global) $\\frac{1}{\\sqrt{2m}}(\\hbar\\frac{d\\psi}{dx} + m\\omega x\\psi)$; al multiplicarlo por su conjugado la fase se cancela y quedan tres grupos: el producto de derivadas, los cruzados con $x$ y el de $x^2|\\psi|^2$.' },
            { title: 'Integra por partes', text: 'El grupo con derivadas se convierte en $-\\int\\hbar^2\\psi^*\\frac{d^2\\psi}{dx^2}dx$, y de $\\frac{d}{dx}(x|\\psi|^2)$ sale que la pareja cruzada deja solo $-\\hbar m\\omega\\int|\\psi|^2dx$: las fronteras valen cero en ambos casos.' },
            { title: 'Reconoce al hamiltoniano', text: 'Lo que sobrevive es $\\frac{1}{2m}\\int\\psi^*(-\\hbar^2\\frac{d^2\\psi}{dx^2} + m^2\\omega^2x^2\\psi)dx - \\frac{\\hbar\\omega}{2}\\int|\\psi|^2dx = \\int\\psi^*(\\hat H - \\frac{\\hbar\\omega}{2})\\psi\\,dx$, la forma compacta con $a_+a_-$.' },
            { title: 'Invoca Schrödinger', text: 'Como $\\hat H\\psi = E\\psi$ y $\\psi$ está normalizada, queda $\\int|a_-\\psi|^2dx = E - \\frac{1}{2}\\hbar\\omega$: un número finito para cualquier energía finita, que era lo que había que demostrar.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Tu resultado debe ser positivo y proporcional a la energía del estado. Aplícalo al caso $\\psi = \\psi_0$ y saca la conclusión sobre $a_-\\psi_0$: es exactamente la razón por la que la escalera de estados termina por abajo.',
        application: {
          steps: [
            { title: 'Comprueba signo y unidades', text: 'El resultado $E - \\frac{1}{2}\\hbar\\omega$ es una energía, como corresponde a la norma de $a_-\\psi$ con la convención de la Ecuación 2.43, y es positivo para todo estado con $E > \\frac{1}{2}\\hbar\\omega$.' },
            { title: 'Aplícalo al estado fundamental', text: 'Para $\\psi_0$ la energía es $E_0 = \\frac{1}{2}\\hbar\\omega$, así que $\\int|a_-\\psi_0|^2dx = 0$: una integral de algo no negativo solo vale cero si la función es idénticamente nula.' },
            { title: 'Concluye sobre la escalera', text: 'Por tanto $a_-\\psi_0 = 0$ en todo $x$: el operador de descenso aniquila el estado fundamental y la escalera termina por abajo, garantizando la existencia de una energía mínima.' },
          ],
        },
      },
    ],
  },
  'bp-2-12': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Continuación del 2.11: ahora quieres las constantes exactas de proporcionalidad entre $a_\\pm\\psi_n$ y $\\psi_{n\\pm1}$. La estrategia es la misma: comparar *normas*.',
        application: {
          steps: [
            { title: 'Proporcionalidad, no igualdad', text: 'Sabes que $a_+\\psi_n$ es autoestado con energía $E_{n+1}$, es decir un múltiplo de $\\psi_{n+1}$; lo único que falta es el módulo (y la fase) de ese múltiplo.' },
            { title: 'La norma fija el módulo', text: 'Si $a_+\\psi_n = C_n\\psi_{n+1}$ con $\\psi_{n+1}$ normalizada, entonces $|C_n|^2 = \\int|a_+\\psi_n|^2dx$: calcular la norma equivale a calcular la constante.' },
            { title: 'Reutiliza el 2.11', text: 'La integración por partes que ya dominas da $\\int|a_\\pm\\psi_n|^2dx = \\int\\psi_n^*(a_\\mp a_\\pm\\psi_n)dx$: solo cambia el orden de los operadores respecto al problema anterior.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Escribe $\\int|a_\\pm\\psi_n|^2dx = \\int\\psi_n^*(a_\\mp a_\\pm\\psi_n)dx$ (la misma integración por partes) y expresa $a_+a_-$ y $a_-a_+$ en función de $\\hat H$ para evaluarla con $E_n = (n + \\frac{1}{2})\\hbar\\omega$.',
        application: {
          steps: [
            { title: 'Los dos productos de operadores', text: 'La Ecuación 2.46 da $a_+a_- = \\hat H - \\frac{1}{2}\\hbar\\omega$; invirtiendo el orden, $a_-a_+ = \\hat H + \\frac{1}{2}\\hbar\\omega$ (su diferencia es el conmutador, $\\hbar\\omega$).' },
            { title: 'Sustituye el autoestado', text: 'Actuando sobre $\\psi_n$: $(a_+a_-)\\psi_n = (E_n - \\frac{1}{2}\\hbar\\omega)\\psi_n = n\\hbar\\omega\\,\\psi_n$ y $(a_-a_+)\\psi_n = (E_n + \\frac{1}{2}\\hbar\\omega)\\psi_n = (n+1)\\hbar\\omega\\,\\psi_n$, usando $E_n = (n + \\frac{1}{2})\\hbar\\omega$.' },
            { title: 'Las normas quedan listas', text: 'Multiplicando por $\\psi_n^*$ e integrando: $\\int|a_-\\psi_n|^2dx = n\\hbar\\omega$ y $\\int|a_+\\psi_n|^2dx = (n+1)\\hbar\\omega$, que generalizan el resultado del Problema 2.11 a todo $n$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Con la norma en la mano, escribe $a_+\\psi_n = C_n\\psi_{n+1}$ y fija $|C_n|$ comparando con la norma 1 de $\\psi_{n+1}$; los factores $\\pm i$ se eligen para que las funciones resulten reales. Para (b), itera: aplicar $a_+$ $n$ veces a $\\psi_0$ va multiplicando constantes, y de ese producto sale $A_n$.',
        application: {
          steps: [
            { title: 'Fija los módulos', text: 'De $a_+\\psi_n = C_n\\psi_{n+1}$ sale $|C_n| = \\sqrt{(n+1)\\hbar\\omega}$; análogamente, de $a_-\\psi_n = D_n\\psi_{n-1}$ sale $|D_n| = \\sqrt{n\\hbar\\omega}$: son las Ecs. 2.52 y 2.53.' },
            { title: 'Elige las fases', text: 'Con la convención del texto, la acción de $a_\\pm$ sobre funciones reales produce resultados imaginarios puros; los $\\pm i$ de las Ecs. 2.52 y 2.53 compensan esas fases y dejan las $\\psi_{n\\pm1}$ reales.' },
            { title: 'Itera el ascenso', text: 'Para (b), encadena $a_+\\psi_k = i\\sqrt{(k+1)\\hbar\\omega}\\,\\psi_{k+1}$ de $k = 0$ hasta $k = n-1$: $(a_+)^n\\psi_0 = i^n\\sqrt{n!(\\hbar\\omega)^n}\\,\\psi_n$, porque las constantes se van multiplicando.' },
            { title: 'Normaliza la gaussiana a mano', text: 'La $\\psi_0$ de partida es la gaussiana desnuda $e^{-\\xi^2/2}$; normalizada con $\\int e^{-\\xi^2}d\\xi = \\sqrt\\pi$ (y $dx = d\\xi/\\beta$) es $(\\frac{m\\omega}{\\pi\\hbar})^{1/4}e^{-\\xi^2/2}$: ese prefactor es el que llevará $A_n$.' },
            { title: 'Ensambla la constante', text: 'Como la gaussiana desnuda equivale a $(\\frac{\\pi\\hbar}{m\\omega})^{1/4}$ veces la normalizada, la cadena anterior da $(a_+)^n\\psi_0 = i^n(\\frac{\\pi\\hbar}{m\\omega})^{1/4}\\sqrt{n!(\\hbar\\omega)^n}\\,\\psi_n$; exigiendo norma 1 queda $A_n = (\\frac{m\\omega}{\\pi\\hbar})^{1/4}\\frac{(-i)^n}{\\sqrt{n!(\\hbar\\omega)^n}}$, la Ec. 2.54.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Prueba tu $A_n$ en $n = 0$ y $n = 1$: debe reproducir la gaussiana $\\psi_0$ (normalizada a mano con $\\int e^{-\\xi^2}d\\xi = \\sqrt\\pi$) y la $\\psi_1$ del Problema 2.13. Verifica también que $a_-$ deshace lo que hace $a_+$, con normas consistentes.',
        application: {
          steps: [
            { title: 'Prueba con n = 0', text: 'Tu $A_n$ se reduce a $(\\frac{m\\omega}{\\pi\\hbar})^{1/4}$, la constante de la gaussiana normalizada; y la Ec. 2.53 da $a_-\\psi_0 = 0$, el suelo de la escalera del Problema 2.11.' },
            { title: 'Prueba con n = 1', text: 'Con $A_1 = -i(\\frac{m\\omega}{\\pi\\hbar})^{1/4}/\\sqrt{\\hbar\\omega}$, el producto $A_1(a_+\\psi_0)$ cancela los factores imaginarios y devuelve exactamente la $\\psi_1$ normalizada del Problema 2.13.' },
            { title: 'Deshacer el ascenso', text: 'Aplica $a_-$ después de $a_+$: $a_-(i\\sqrt{(n+1)\\hbar\\omega}\\,\\psi_{n+1}) = (i)(-i)(n+1)\\hbar\\omega\\,\\psi_n = (n+1)\\hbar\\omega\\,\\psi_n$, consistente con $a_-a_+\\psi_n = (E_n + \\frac{\\hbar\\omega}{2})\\psi_n$.' },
          ],
        },
      },
    ],
  },
  'bp-2-13': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Práctica con la maquinaria de escalera del oscilador: generar $\\psi_1$ y $\\psi_2$ desde la gaussiana $\\psi_0$ y comprobar ortogonalidad. La ecuación diferencial no hay que resolverla ni una vez.',
        application: {
          steps: [
            { title: 'La escalera ya dio la primera', text: 'El texto obtuvo $\\psi_1 = Axe^{-m\\omega x^2/2\\hbar}$ (Ec. 2.51) subiendo desde la gaussiana; en (a) solo falta fijar $A$ por integración directa.' },
            { title: 'La segunda sin ecuaciones', text: 'Para (b) no se resuelve ninguna ecuación de Schrödinger: se aplica $a_+$ a la $\\psi_1$ ya normalizada y se acepta el resultado sin normalizar.' },
            { title: 'La paridad ahorra trabajo', text: '$\\psi_0$ y $\\psi_2$ son pares y $\\psi_1$ impar: eso anula de entrada dos de las tres integrales de (d) y dicta dónde están los nodos de (c).' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: '(a) Normaliza $\\psi_1 = Axe^{-m\\omega x^2/2\\hbar}$ por integración directa: con $\\xi = \\sqrt{m\\omega/\\hbar}\\,x$ queda una integral gaussiana. (b) Aplica $a_+$ a tu $\\psi_1$ normalizada para generar $\\psi_2$ (sin normalizar).',
        application: {
          steps: [
            { title: 'Monta la normalización', text: 'Impón $\\int|\\psi_1|^2dx = 1$ con $\\psi_1 = Axe^{-m\\omega x^2/2\\hbar}$; con $\\xi = \\sqrt{m\\omega/\\hbar}\\,x$ y $dx = d\\xi/\\beta$, la integral se reduce a $\\int\\xi^2e^{-\\xi^2}d\\xi$.' },
            { title: 'Genera la segunda por ascenso', text: 'Para (b), calcula $a_+\\psi_1$ con la forma de la Ec. 2.43; por la Ec. 2.52, $a_+\\psi_1 = i\\sqrt{2\\hbar\\omega}\\,\\psi_2$, así que tu $\\psi_2$ es eso dividido por la constante.' },
            { title: 'Dibuja comparando polinomios', text: 'Para (c), cada $\\psi_n$ es un polinomio de grado $n$ vestido con la gaussiana: usa la paridad y el número de nodos para esbozar las tres curvas sin cálculo.' },
            { title: 'Ordena la ortogonalidad', text: 'En (d) evalúa $\\int\\psi_0^*\\psi_1\\,dx$, $\\int\\psi_1^*\\psi_2\\,dx$ y $\\int\\psi_0^*\\psi_2\\,dx$: clasifícalas por paridad antes de integrar y verás que solo una requiere cuentas.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Las integrales se reducen a $\\int e^{-\\xi^2}d\\xi = \\sqrt\\pi$ integrando por partes (de ahí sale también $\\int\\xi^2e^{-\\xi^2}$). Para (d), explota la paridad: entre funciones de paridad opuesta la integral se anula sin calcular, así que solo queda una integral explícita.',
        application: {
          steps: [
            { title: 'Normaliza la primera directamente', text: '$\\int|\\psi_1|^2dx = \\frac{|A|^2}{\\beta^3}\\int\\xi^2e^{-\\xi^2}d\\xi = \\frac{|A|^2\\sqrt\\pi}{2\\beta^3} = 1$ da $A = \\sqrt{2}\\,\\beta^{3/2}\\pi^{-1/4}$, es decir $\\psi_1 = \\sqrt{2}(\\frac{m\\omega}{\\pi\\hbar})^{1/4}\\sqrt{\\frac{m\\omega}{\\hbar}}\\,x\\,e^{-m\\omega x^2/2\\hbar}$.' },
            { title: 'Justifica la gaussiana con peso', text: 'La pieza $\\int\\xi^2e^{-\\xi^2}d\\xi = \\frac{\\sqrt\\pi}{2}$ sale por partes con $u = \\xi$ y $dv = \\xi e^{-\\xi^2}d\\xi$: el término de frontera se anula y queda media vez $\\int e^{-\\xi^2}d\\xi = \\sqrt\\pi$.' },
            { title: 'Cambia a la variable ξ', text: 'Con $x = \\xi/\\beta$, la Ec. 2.43 queda $a_+ = -i\\sqrt{\\frac{\\hbar\\omega}{2}}(\\frac{d}{d\\xi} - \\xi)$; actuando sobre $\\xi e^{-\\xi^2/2}$, la combinación $(\\frac{d}{d\\xi} - \\xi)$ produce $(1 - 2\\xi^2)e^{-\\xi^2/2}$.' },
            { title: 'Escribe la segunda función', text: 'Dividiendo por $i\\sqrt{2\\hbar\\omega}$ queda $\\psi_2 \\propto (2\\xi^2 - 1)e^{-\\xi^2/2}$; normalizada sería $\\frac{1}{\\sqrt{2}}(\\frac{m\\omega}{\\pi\\hbar})^{1/4}(2\\xi^2 - 1)e^{-\\xi^2/2}$, aunque (b) no lo exige.' },
            { title: 'La única integral de (d)', text: 'Las mezclas $\\psi_0\\psi_1$ y $\\psi_1\\psi_2$ son impares y valen cero; queda $\\int\\psi_0\\psi_2\\,dx \\propto \\int(2\\xi^2 - 1)e^{-\\xi^2}d\\xi = 2\\cdot\\frac{\\sqrt\\pi}{2} - \\sqrt\\pi = 0$: ortogonalidad confirmada.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Cuenta nodos al dibujar: $\\psi_0$ ninguno, $\\psi_1$ uno en el origen, $\\psi_2$ dos simétricos. Tu constante de (a) debe coincidir con la fórmula general $A_n$ de la Ecuación 2.54.',
        application: {
          steps: [
            { title: 'Cuenta nodos', text: 'Al dibujar: $\\psi_0$ no se anula nunca, $\\psi_1$ tiene su único nodo en $x = 0$ y $\\psi_2$ se anula donde $2\\xi^2 = 1$, o sea $x = \\pm\\sqrt{\\hbar/2m\\omega}$: el número de nodos crece con $n$.' },
            { title: 'Compara con la fórmula general', text: 'La Ec. 2.54 con $n = 1$ da $A_1 = -i(\\frac{m\\omega}{\\pi\\hbar})^{1/4}/\\sqrt{\\hbar\\omega}$; combinada con $a_+\\psi_0 = i\\sqrt{\\hbar\\omega}\\,\\psi_1$ cancela los factores imaginarios y reproduce tu $\\psi_1$ de (a) exactamente.' },
            { title: 'Chequeo con el descenso', text: 'Aplica $a_-$ a tu $\\psi_1$: por la Ec. 2.53 debe devolver $-i\\sqrt{\\hbar\\omega}\\,\\psi_0$, es decir la gaussiana de la que partió todo, con la norma intacta.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $\\psi_1 = \\sqrt{2}\\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4}\\sqrt{\\frac{m\\omega}{\\hbar}}\\,x\\,e^{-m\\omega x^2/2\\hbar}$ (coincide con la fórmula general, Ec. 2.54). (b) $\\psi_2 = \\frac{1}{\\sqrt2}\\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4}\\left[\\frac{2m\\omega}{\\hbar}x^2 - 1\\right]e^{-m\\omega x^2/2\\hbar}$ (aplicando dos veces el operador de ascenso a $\\psi_0$). (d) $\\int\\psi_0^*\\psi_1\\,dx = \\int\\psi_1^*\\psi_2\\,dx = 0$ (paridad) y también $\\int\\psi_2^*\\psi_0\\,dx = 0$.',
      page: 20,
      note: 'La 2.ª ed. reformuló el problema (2.10): obtiene $\\psi_2$ aplicando dos veces el operador de ascenso sobre $\\psi_0$ y verifica la ortogonalidad ($\\int\\psi_2^*\\psi_0\\,dx = 0$, p. 21); la normalización directa de $\\psi_1$ (apartado a de la 1.ª ed.) no aparece en su solución.',
    },
  },
  'bp-2-14': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Cálculo de valores esperados en los dos primeros estados del oscilador, reutilizando las $\\psi_0$ y $\\psi_1$ ya normalizadas. Con la variable $\\xi = \\sqrt{m\\omega/\\hbar}\\,x$ todo se convierte en gaussianas estándar.',
        application: {
          steps: [
            { title: 'Escribe los ingredientes', text: 'Trabaja con $\\psi_0 = \\alpha e^{-\\xi^2/2}$ y $\\psi_1 = \\sqrt{2}\\alpha\\xi e^{-\\xi^2/2}$ (normalizadas en el 2.13), con $\\xi = \\sqrt{m\\omega/\\hbar}\\,x$, $\\alpha = (\\frac{m\\omega}{\\pi\\hbar})^{1/4}$ y $dx = d\\xi/\\beta$.' },
            { title: 'Ahorra dos integrales', text: '$\\langle x\\rangle$ y $\\langle p\\rangle$ no requieren integrar: la paridad de $|\\psi_n|^2$ anula el primero y el carácter estacionario anula el segundo; solo $\\langle x^2\\rangle$ y $\\langle p^2\\rangle$ piden gaussianas.' },
            { title: 'Reúne las piezas', text: 'Todo se arma con $\\int e^{-\\xi^2}d\\xi = \\sqrt\\pi$, $\\int\\xi^2e^{-\\xi^2}d\\xi = \\frac{\\sqrt\\pi}{2}$ y $\\int\\xi^4e^{-\\xi^2}d\\xi = \\frac{3\\sqrt\\pi}{4}$; los integrandos impares valen cero por simetría.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Antes de integrar nada, razona $\\langle x\\rangle$ con la paridad de $|\\psi|^2$ y $\\langle p\\rangle$ con $\\langle p\\rangle = m\\,d\\langle x\\rangle/dt$ en un estado estacionario. Para los segundos momentos, escribe las funciones en $\\xi$ y usa las gaussianas de siempre.',
        application: {
          steps: [
            { title: 'La posición media es cero', text: 'Tanto $|\\psi_0|^2$ como $|\\psi_1|^2$ son funciones pares y $x$ es impar: el integrando de $\\int x|\\psi_n|^2dx$ es impar y la integral sobre $(-\\infty, \\infty)$ vale cero, en ambos estados.' },
            { title: 'El momento medio también', text: 'En un estado estacionario $\\langle x\\rangle$ es constante en el tiempo, y por el teorema de Ehrenfest $\\langle p\\rangle = m\\frac{d\\langle x\\rangle}{dt} = 0$: válido para $\\psi_0$ y $\\psi_1$ por igual.' },
            { title: 'Monta los segundos momentos', text: 'Escribe $\\langle x^2\\rangle = \\int x^2|\\psi|^2dx$ en la variable $\\xi$ (con $x = \\xi/\\beta$) y resuélvelo con las gaussianas; para $\\langle p^2\\rangle$ planifica la integración por partes que sigue.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Para $\\langle p^2\\rangle$ conviene integrar por partes: $\\langle p^2\\rangle = -\\hbar^2\\int\\psi\\,\\frac{d^2\\psi}{dx^2}dx$, y las segundas derivadas de las gaussianas son fáciles. Las piezas que necesitas son $\\int e^{-\\xi^2}d\\xi = \\sqrt\\pi$ y $\\int\\xi^2e^{-\\xi^2}d\\xi = \\frac{\\sqrt\\pi}{2}$ (las impares se anulan).',
        application: {
          steps: [
            { title: 'Segundo momento en x (n = 0)', text: 'Para $\\psi_0$: $\\langle x^2\\rangle = \\frac{\\alpha^2}{\\beta^3}\\int\\xi^2e^{-\\xi^2}d\\xi = \\frac{\\alpha^2}{\\beta^3}\\cdot\\frac{\\sqrt\\pi}{2} = \\frac{1}{2\\beta^2} = \\frac{\\hbar}{2m\\omega}$, usando $\\alpha^2 = \\beta/\\sqrt\\pi$.' },
            { title: 'Segundo momento en x (n = 1)', text: 'Con $|\\psi_1|^2 = 2\\alpha^2\\xi^2e^{-\\xi^2}$: $\\langle x^2\\rangle = \\frac{2\\alpha^2}{\\beta^3}\\int\\xi^4e^{-\\xi^2}d\\xi = \\frac{2\\alpha^2}{\\beta^3}\\cdot\\frac{3\\sqrt\\pi}{4} = \\frac{3}{2\\beta^2} = \\frac{3\\hbar}{2m\\omega}$.' },
            { title: 'Truco de partes para el momento', text: 'Como $\\frac{d}{dx}(\\psi\\frac{d\\psi}{dx})$ integra a cero en las fronteras, queda $\\int\\psi\\frac{d^2\\psi}{dx^2}dx = -\\int(\\frac{d\\psi}{dx})^2dx$ y por tanto $\\langle p^2\\rangle = \\hbar^2\\int(\\frac{d\\psi}{dx})^2dx$: solo primeras derivadas.' },
            { title: 'Evalúa el momento al cuadrado', text: 'Para $\\psi_0$, $\\frac{d\\psi_0}{dx} = -\\beta^2x\\psi_0$ da $\\langle p^2\\rangle = \\hbar^2\\beta^4\\langle x^2\\rangle = \\frac{m\\omega\\hbar}{2}$; para $\\psi_1$, con $\\frac{d\\psi_1}{dx} = \\sqrt{2}\\alpha\\beta(1 - \\xi^2)e^{-\\xi^2/2}$, la misma integral da $\\frac{3m\\omega\\hbar}{2}$.' },
            { title: 'Recolecta los números', text: 'Resumen: $\\langle x^2\\rangle = \\frac{\\hbar}{2m\\omega}$ y $\\frac{3\\hbar}{2m\\omega}$, $\\langle p^2\\rangle = \\frac{m\\omega\\hbar}{2}$ y $\\frac{3m\\omega\\hbar}{2}$ para $n = 0, 1$: los apartados (b) y (c) los reutilizan tal cual.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Comprueba el principio de incertidumbre en ambos estados y qué tan cerca del límite queda cada uno. En (c), sin integrar de nuevo: $\\langle T\\rangle = \\langle p^2\\rangle/2m$ y $\\langle V\\rangle = \\frac{1}{2}m\\omega^2\\langle x^2\\rangle$, y su suma debe dar la energía del nivel (en el oscilador, además, $\\langle T\\rangle = \\langle V\\rangle$).',
        application: {
          steps: [
            { title: 'Principio de incertidumbre', text: 'Con medias nulas, $\\sigma_x = \\sqrt{\\langle x^2\\rangle}$ y $\\sigma_p = \\sqrt{\\langle p^2\\rangle}$: para $\\psi_0$ sale $\\sigma_x\\sigma_p = \\frac{\\hbar}{2}$ (justo el mínimo) y para $\\psi_1$, $\\frac{3\\hbar}{2}$, por encima del límite.' },
            { title: 'Suma de energías', text: 'En (c): $\\langle T\\rangle = \\frac{\\langle p^2\\rangle}{2m}$ y $\\langle V\\rangle = \\frac{1}{2}m\\omega^2\\langle x^2\\rangle$ dan $\\frac{\\hbar\\omega}{4}$ cada una en $n = 0$ y $\\frac{3\\hbar\\omega}{4}$ en $n = 1$, sin integrar nada nuevo.' },
            { title: 'Cierra con el espectro', text: 'La suma da $\\frac{\\hbar\\omega}{2}$ y $\\frac{3\\hbar\\omega}{2}$, es decir $E_0$ y $E_1$ exactas; y de bonus sale $\\langle T\\rangle = \\langle V\\rangle$ en ambos estados, señal de que ninguna integral se rompió.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $\\langle x\\rangle = \\langle p\\rangle = 0$ para $\\psi_0$ y $\\psi_1$ (vale para cualquier estado estacionario del oscilador). $n = 0$: $\\langle x^2\\rangle = \\frac{\\hbar}{2m\\omega}$, $\\langle p^2\\rangle = \\frac{m\\omega\\hbar}{2}$. $n = 1$: $\\langle x^2\\rangle = \\frac{3\\hbar}{2m\\omega}$, $\\langle p^2\\rangle = \\frac{3m\\omega\\hbar}{2}$. (b) $n = 0$: $\\sigma_x = \\sqrt{\\hbar/2m\\omega}$, $\\sigma_p = \\sqrt{m\\omega\\hbar/2}$, $\\sigma_x\\sigma_p = \\hbar/2$ (justo en el límite de incertidumbre); $n = 1$: $\\sigma_x = \\sqrt{3\\hbar/2m\\omega}$, $\\sigma_p = \\sqrt{3m\\omega\\hbar/2}$, $\\sigma_x\\sigma_p = 3\\hbar/2 > \\hbar/2$. (c) $\\langle T\\rangle = \\langle V\\rangle = \\hbar\\omega/4$ ($n = 0$) y $= 3\\hbar\\omega/4$ ($n = 1$); la suma da $E_0 = \\hbar\\omega/2$ y $E_1 = 3\\hbar\\omega/2$, como debe ser.',
      page: 21,
    },
  },
  'bp-2-15': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Probabilidad en las colas de la gaussiana del estado fundamental: una integral que no es elemental y se consulta en tablas. El primer paso es *física*: localizar el borde de la región clásicamente permitida.',
        application: {
          steps: [
            { title: 'Probabilidad clásicamente prohibida', text: 'En las colas del potencial $V > E_0$, así que clásicamente la partícula no puede estar ahí; cuánticamente $|\\psi_0|^2$ decae pero no vale cero, y el problema pide cuantificar eso.' },
            { title: 'Física primero, tabla después', text: 'El cálculo tiene dos fases: localizar el punto de retorno (pura física) y evaluar una integral gaussiana no elemental (consulta de tabla o función error).' },
            { title: 'La simetría duplica la cola', text: 'El estado fundamental es par, así que la probabilidad fuera de la región clásica es el doble de la cola derecha: no hace falta integrar el lado negativo.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Encuentra el punto de retorno $x_0$ imponiendo $\\frac{1}{2}m\\omega^2x_0^2 = E_0$. La probabilidad pedida es $P = 2\\int_{x_0}^{\\infty}|\\psi_0|^2dx$ (el 2 sale de la simetría); con $\\xi = \\sqrt{m\\omega/\\hbar}\\,x$ queda una gaussiana desde un límite adimensional.',
        application: {
          steps: [
            { title: 'Localiza el punto de retorno', text: 'Impón $V(x_0) = E_0$, o sea $\\frac{1}{2}m\\omega^2x_0^2 = \\frac{1}{2}\\hbar\\omega$: de ahí $x_0 = \\sqrt{\\hbar/m\\omega}$, el borde donde la energía cinética clásica se agota.' },
            { title: 'Monta la probabilidad total', text: 'Por simetría, $P = 2\\int_{x_0}^{\\infty}|\\psi_0|^2dx$; con $|\\psi_0|^2 = (\\frac{m\\omega}{\\pi\\hbar})^{1/2}e^{-\\xi^2}$ y $dx = d\\xi/\\beta$, todo queda en función de $\\xi$.' },
            { title: 'Pasa al límite adimensional', text: 'El límite inferior se traduce solo: $x_0 = \\sqrt{\\hbar/m\\omega}$ equivale a $\\xi_0 = \\beta x_0 = 1$, así que $P = \\frac{2}{\\sqrt\\pi}\\int_1^{\\infty}e^{-\\xi^2}d\\xi$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'El límite $\\xi_0$ te queda un número sin unidades muy simple. La integral $\\int_{\\xi_0}^{\\infty}e^{-\\xi^2}d\\xi$ se expresa con la función error complementaria (o con la tabla de distribución normal que sugiere el enunciado) y se evalúa numéricamente.',
        application: {
          steps: [
            { title: 'Reconoce la función error', text: 'Con la definición $\\mathrm{erf}(z) = \\frac{2}{\\sqrt\\pi}\\int_0^z e^{-t^2}dt$, tu integral es justo el complemento: $P = 1 - \\mathrm{erf}(1) = \\mathrm{erfc}(1)$, un valor que viene tabulado.' },
            { title: 'Cambia a la normal estándar', text: 'Si vas por la tabla de distribución normal, sustituye $t = \\sqrt2\\,\\xi$: la gaussiana toma la forma $e^{-t^2/2}$ y el límite $\\xi_0 = 1$ pasa a $t = \\sqrt2 \\approx 1.414$.' },
            { title: 'Traduce $P$ a la tabla', text: 'Ajustando normalizaciones de un lado y otro, $\\frac{2}{\\sqrt\\pi}\\int_1^\\infty e^{-\\xi^2}d\\xi = 2\\left[1 - F(\\sqrt2)\\right]$, donde $F$ es la distribución normal acumulada: el factor 2 nace de $\\sqrt{2/\\pi}\\cdot\\sqrt{2\\pi}$.' },
            { title: 'Evalúa y redondea', text: 'La tabla da $F(\\sqrt2) \\approx 0.9214$, o sea una cola de $0.0786$: duplicada, $P \\approx 0.157$, ya con las tres cifras significativas pedidas.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'El resultado debe ser una fracción pequeña pero no despreciable: la gaussiana decae rápido, pero justo al pasar el punto de retorno todavía queda probabilidad apreciable. Comprueba que tu $x_0$ es del orden del ancho característico $\\sqrt{\\hbar/m\\omega}$ de $\\psi_0$.',
        application: {
          steps: [
            { title: 'La cola nace todavía alta', text: 'En el punto de retorno la densidad solo ha caído a $e^{-1} \\approx 0.37$ de su máximo, así que una probabilidad de cola del orden de $10^{-1}$, como este 0.157, es perfectamente razonable.' },
            { title: 'La caída posterior acota', text: 'Más allá de $\\xi_0$, la densidad decae como $e^{-\\xi^2}$: en $\\xi = 2$ ya está en $e^{-4} \\approx 0.018$ del pico, así que $P$ debe quedar muy por debajo de $0.5$, en el rango de las décimas.' },
            { title: 'Cruza las dos tablas', text: 'La vía de la función error da $\\mathrm{erfc}(1) \\approx 0.1573$ y la de la normal $2[1 - F(\\sqrt2)] \\approx 0.157$: que coincidan a tres cifras confirma que no se perdió ningún factor 2.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: 'Región clásica: $\\frac{1}{2}m\\omega^2x_0^2 = E_0 = \\frac{1}{2}\\hbar\\omega \\Rightarrow x_0 = \\sqrt{\\hbar/m\\omega}$ (o sea $\\xi_0 = 1$). $P = \\frac{2}{\\sqrt\\pi}\\int_1^{\\infty}e^{-\\xi^2}d\\xi = 2\\left[1 - F(\\sqrt2)\\right] = 0.157$ (en la notación de la tabla CRC; $F$ es la función de distribución normal).',
      page: 24,
    },
  },
  'bp-2-16': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Ejercicio directo de la fórmula de recursión de los polinomios de Hermite: cero concepto, pura contabilidad de coeficientes. Lo único que hay que decidir es con qué semilla arrancar en cada caso.',
        application: {
          steps: [
            { title: 'Identifica la herramienta', text: 'La Ec. 2.68, $a_{j+2} = \\frac{-2(n - j)}{(j+1)(j+2)}a_j$, genera cada coeficiente a partir del de dos órdenes abajo: aplicarla con $n = 5$ y $n = 6$ es todo el trabajo.' },
            { title: 'Elige la semilla por paridad', text: '$H_5$ es impar, así que su serie vive en los coeficientes de índice impar y arranca en $a_1$; $H_6$ es par y arranca en $a_0$: la recursión nunca mezcla paridades.' },
            { title: 'Anticipa el corte de la serie', text: 'El numerador $n - j$ se anula cuando $j = n$, así que la escalera de coeficientes termina en $a_5$ y $a_6$ respectivamente: por eso cada $H_n$ es un polinomio de grado $n$.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Para $n = 5$ (impar) los coeficientes pares se anulan: arranca en $a_1$ y aplica la recursión hacia arriba hasta que el factor $2j - n$ llegue a cero (entonces la serie termina). Para $n = 6$ (par) arranca en $a_0$.',
        application: {
          steps: [
            { title: 'Primer escalón de $H_5$', text: 'Con $n = 5$ y $j = 1$: $a_3 = \\frac{-2(5 - 1)}{2\\cdot3}a_1 = -\\frac{4}{3}a_1$; deja todo colgando de $a_1$, que por ahora es libre.' },
            { title: 'Sigue hasta que corte', text: 'Con $j = 3$: $a_5 = \\frac{-2(5 - 3)}{4\\cdot5}a_3 = -\\frac{1}{5}a_3 = \\frac{4}{15}a_1$; y con $j = 5$ el factor $n - j$ se anula, de modo que $a_7 = 0$ y la serie termina.' },
            { title: 'Primer escalón de $H_6$', text: 'Con $n = 6$ y $j = 0$: $a_2 = \\frac{-2(6 - 0)}{1\\cdot2}a_0 = -6a_0$, y el polinomio completo quedará expresado en función de $a_0$.' },
            { title: 'Completa la escalera par', text: 'Con $j = 2$: $a_4 = -\\frac{2}{3}a_2 = 4a_0$; con $j = 4$: $a_6 = -\\frac{2}{15}a_4 = -\\frac{8}{15}a_0$; y $j = 6$ anula $a_8$, cerrando la serie.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Ve dejando todo en función de $a_1$ (o de $a_0$). Al final fija la constante con la convención del texto: el coeficiente de $\\xi^n$ en $H_n$ es $2^n$; así tu polinomio cuadra con la Tabla 2.1.',
        application: {
          steps: [
            { title: 'Ensambla $H_5$ según $a_1$', text: 'Los tres coeficientes dan $H_5 = a_1\\left[\\xi - \\frac{4}{3}\\xi^3 + \\frac{4}{15}\\xi^5\\right]$: el polinomio completo, pendiente solo de la constante libre.' },
            { title: 'Fija $a_1$ con la convención', text: 'El coeficiente de $\\xi^5$ debe ser $2^5 = 32$: imponiendo $\\frac{4}{15}a_1 = 32$ sale $a_1 = 120$ y, por tanto, $a_3 = -160$.' },
            { title: 'Fija $a_0$ con la convención', text: 'Para $H_6$, el coeficiente de $\\xi^6$ debe ser $2^6 = 64$: de $-\\frac{8}{15}a_0 = 64$ sale $a_0 = -120$, con lo cual $a_2 = 720$ y $a_4 = -480$.' },
            { title: 'Escribe los polinomios cerrados', text: 'Queda $H_5(\\xi) = 32\\xi^5 - 160\\xi^3 + 120\\xi$ y $H_6(\\xi) = 64\\xi^6 - 480\\xi^4 + 720\\xi^2 - 120$, listos para cotejar con la tabla.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Checa la estructura: $H_5$ solo contiene potencias impares y $H_6$ solo pares (incluido el término constante), como corresponde a sus paridades. El grado de cada polinomio debe ser exactamente 5 y 6.',
        application: {
          steps: [
            { title: 'Revisa paridad y grado', text: 'En $H_5 = 32\\xi^5 - 160\\xi^3 + 120\\xi$ solo hay potencias impares y el grado es 5; en $H_6 = 64\\xi^6 - 480\\xi^4 + 720\\xi^2 - 120$ solo pares, incluida la constante, y el grado es 6.' },
            { title: 'Checa el coeficiente líder', text: 'El término dominante debe ser $2^n\\xi^n$: aquí $32\\xi^5 = 2^5\\xi^5$ y $64\\xi^6 = 2^6\\xi^6$, señal de que las constantes quedaron fijadas con la convención del texto.' },
            { title: 'Cuadra con la Tabla 2.1', text: 'Ambos polinomios coinciden entrada por entrada con la Tabla 2.1, incluido el patrón de signos alternados de mayor a menor grado: valida los cocientes de la recursión y la elección de $a_1$ y $a_0$.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$H_5(\\xi) = 120\\xi - 160\\xi^3 + 32\\xi^5$ (con $a_3 = -\\frac{4}{3}a_1$, $a_5 = \\frac{4}{15}a_1$, $a_7 = 0$; el coeficiente $2^5$ fija $a_1 = 120$). $H_6(\\xi) = -120 + 720\\xi^2 - 480\\xi^4 + 64\\xi^6$ (con $a_2 = -6a_0$, $a_4 = 4a_0$, $a_6 = -\\frac{8}{15}a_0$; el coeficiente $2^6$ fija $a_0 = -120$). Ambos acordes con la Tabla 2.1.',
      page: 25,
    },
  },
  'bp-2-17': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'El análogo del problema 2.6 pero en el oscilador armónico: superposición de los dos primeros estados estacionarios. Como sus energías difieren en $\\hbar\\omega$, la densidad y $\\langle x\\rangle$ oscilarán con esa frecuencia.',
        application: {
          steps: [
            { title: 'Reconoce la familia', text: 'Es el problema 2.6 transplantado al oscilador: un estado no estacionario, $\\Psi = A(\\psi_0 + \\psi_1)$, cuya dinámica entera nace del batido entre las dos fases estacionarias.' },
            { title: 'Identifica la frecuencia de batido', text: 'La fase relativa gira como $e^{-i(E_1 - E_0)t/\\hbar} = e^{-i\\omega t}$, con $E_1 - E_0 = \\hbar\\omega$: esa es la frecuencia angular de cualquier oscilación que aparezca.' },
            { title: 'Reparte los apartados', text: '(a) normalizar por ortonormalidad; (b) pegar fases y armar $|\\Psi|^2$; (c) y (d) calcular $\\langle x\\rangle(t)$, derivar para $\\langle p\\rangle$ y verificar Ehrenfest; (e) bosquejar $|\\Psi|$ en $t = 0, \\pi/\\omega, \\ldots, 4\\pi/\\omega$.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: '(a) Otra vez, ortonormalidad para normalizar. (b) Pega a cada término su fase $e^{-iE_nt/\\hbar}$ y factoriza $e^{-iE_0t/\\hbar}$; conviene escribir $E_0 = \\frac{\\hbar\\omega}{2}$ y $E_1 = \\frac{3\\hbar\\omega}{2}$. (c) En $\\langle x\\rangle$, las integrales diagonales se anulan por paridad; solo sobrevive la cruzada $\\int x\\psi_0\\psi_1\\,dx$.',
        application: {
          steps: [
            { title: 'Normaliza con ortonormalidad', text: '$1 = |A|^2\\int(\\psi_0 + \\psi_1)^2dx = 2|A|^2$, porque $\\int\\psi_0\\psi_1\\,dx = 0$; tomando $A$ real y positivo, $A = \\frac{1}{\\sqrt2}$.' },
            { title: 'Evoluciona cada término', text: 'Con $E_0 = \\frac{\\hbar\\omega}{2}$ y $E_1 = \\frac{3\\hbar\\omega}{2}$: $\\Psi(x,t) = \\frac{1}{\\sqrt2}\\left[\\psi_0e^{-i\\omega t/2} + \\psi_1e^{-3i\\omega t/2}\\right]$.' },
            { title: 'Factoriza y eleva al cuadrado', text: 'Saca $e^{-i\\omega t/2}$, una fase global invisible en $|\\Psi|^2$: queda $|\\Psi|^2 = \\frac{1}{2}\\left[\\psi_0^2 + \\psi_1^2 + 2\\psi_0\\psi_1\\cos(\\omega t)\\right]$, con el batido ya explícito.' },
            { title: 'Prepara $\\langle x\\rangle$ por paridad', text: 'En $\\int x|\\Psi|^2dx$, los términos $\\int x\\psi_n^2dx$ se anulan (impar por par) y solo sobrevive $\\cos(\\omega t)\\int x\\psi_0\\psi_1\\,dx$: una única integral que hacer.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'La integral cruzada, con el cambio a $\\xi$, es del tipo $\\int\\xi^2e^{-\\xi^2}d\\xi$. Para (d) usa $\\langle p\\rangle = m\\,d\\langle x\\rangle/dt$ y verifica Ehrenfest comparando con $-\\langle\\partial V/\\partial x\\rangle = -m\\omega^2\\langle x\\rangle$. Para los bocetos de (e), piensa cómo se desplaza el paquete de un lado al otro al girar la fase relativa.',
        application: {
          steps: [
            { title: 'Monta la integral cruzada', text: 'Con $\\psi_0\\psi_1 = \\sqrt2\\,\\alpha^2\\xi e^{-\\xi^2}$ y $x = \\xi/\\beta$: $\\int x\\psi_0\\psi_1\\,dx = \\frac{\\sqrt2\\,\\alpha^2\\hbar}{m\\omega}\\int\\xi^2e^{-\\xi^2}d\\xi$, ya toda en la variable adimensional.' },
            { title: 'Evalúa la gaussiana par', text: 'La integral vale $\\frac{\\sqrt\\pi}{2}$ y con $\\alpha^2 = \\sqrt{m\\omega/\\pi\\hbar}$ todo se condensa en $\\int x\\psi_0\\psi_1\\,dx = \\sqrt{\\frac{\\hbar}{2m\\omega}}$.' },
            { title: 'Escribe $\\langle x\\rangle(t)$', text: 'Multiplicando por $\\cos(\\omega t)$: $\\langle x\\rangle = \\sqrt{\\frac{\\hbar}{2m\\omega}}\\cos(\\omega t)$, con amplitud $\\sqrt{\\hbar/2m\\omega}$ y frecuencia angular $\\omega$, la del batido.' },
            { title: 'Deriva para $\\langle p\\rangle$', text: '$\\langle p\\rangle = m\\frac{d\\langle x\\rangle}{dt} = -\\sqrt{\\frac{m\\omega\\hbar}{2}}\\sin(\\omega t)$; derivando una vez más, $\\frac{d\\langle p\\rangle}{dt} = -m\\omega^2\\langle x\\rangle = -\\langle\\frac{\\partial V}{\\partial x}\\rangle$, que es Ehrenfest.' },
            { title: 'Bosqueja $|\\Psi|$ en (e)', text: 'En $t = 0$ el término cruzado suma y el paquete se corre a la derecha; en $t = \\pi/\\omega$, con $\\cos(\\omega t) = -1$, se refleja a la izquierda; el ciclo se repite en $2\\pi/\\omega$, $3\\pi/\\omega$ y $4\\pi/\\omega$, como en la Figura 2.5.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'La amplitud de $\\langle x\\rangle$ debe salir del orden del ancho de la gaussiana ($\\sim\\sqrt{\\hbar/m\\omega}$). La frecuencia que obtengas debe relacionarse de forma directa con la separación $E_1 - E_0$, y $\\langle p\\rangle$ debe ir 90° desfasado respecto a $\\langle x\\rangle$, como la posición y el momento de un oscilador clásico.',
        application: {
          steps: [
            { title: 'Contrasta amplitud y ancho', text: 'La amplitud $\\sqrt{\\hbar/2m\\omega}$ es $\\frac{1}{\\sqrt2}$ del ancho característico $\\sqrt{\\hbar/m\\omega}$ del estado fundamental: el paquete se mueve dentro de su propio tamaño, como debe ser.' },
            { title: 'Recupera la frecuencia del espectro', text: 'La frecuencia angular obtenida, $\\omega$, es exactamente $\\frac{E_1 - E_0}{\\hbar}$: toda superposición de dos niveles late con su separación energética.' },
            { title: 'Comprueba el desfase clásico', text: 'Cuando $\\langle x\\rangle$ es máximo ($t = 0$), $\\langle p\\rangle = 0$; cuando $\\langle x\\rangle$ cruza el cero, $|\\langle p\\rangle|$ es máximo: el desfase de 90° del oscilador clásico, con Ehrenfest verificado.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $A = 1/5$. (b) $\\Psi(x,t) = \\frac{1}{5}\\left[3\\psi_0e^{-i\\omega t/2} + 4\\psi_1e^{-3i\\omega t/2}\\right]$; $|\\Psi|^2 = \\frac{1}{25}\\left[9\\psi_0^2 + 16\\psi_1^2 + 24\\psi_0\\psi_1\\cos(\\omega t)\\right]$. (c) $\\langle x\\rangle = \\frac{24}{25}\\sqrt{\\frac{\\hbar}{2m\\omega}}\\cos(\\omega t)$: amplitud $\\frac{24}{25}\\sqrt{\\hbar/2m\\omega}$ y frecuencia angular $\\omega$; $\\langle p\\rangle = -\\frac{24}{25}\\sqrt{\\frac{m\\omega\\hbar}{2}}\\sin(\\omega t)$, y se cumple $\\frac{d\\langle p\\rangle}{dt} = -m\\omega^2\\langle x\\rangle$ (Ehrenfest). (d) [2.ª ed.]: $E_0 = \\hbar\\omega/2$ con probabilidad $9/25$, o $E_1 = 3\\hbar\\omega/2$ con probabilidad $16/25$.',
      page: 23,
      note: 'La 2.ª ed. reformuló la superposición ($3\\psi_0 + 4\\psi_1$ en lugar de $\\psi_0 + \\psi_1$). Para la versión de la 1.ª ed.: $A = 1/\\sqrt2$, $|\\Psi|^2 = \\frac{1}{2}\\left[\\psi_0^2 + \\psi_1^2 + 2\\psi_0\\psi_1\\cos(\\omega t)\\right]$, $\\langle x\\rangle = \\sqrt{\\hbar/2m\\omega}\\,\\cos(\\omega t)$ (amplitud $\\sqrt{\\hbar/2m\\omega}$, frecuencia angular $\\omega$), $\\langle p\\rangle = -\\sqrt{m\\omega\\hbar/2}\\,\\sin(\\omega t)$, y Ehrenfest se cumple igualmente.',
    },
  },
}
