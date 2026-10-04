// Pistas graduadas + respuesta final — PARTE B: problemas 2.18 a 2.33
// Las pistas son contenido pedagógico ORIGINAL de la plataforma.
// Las respuestas finales son transcripción del solucionario oficial de Griffiths (2.ª ed.).

import type { ProblemHintsEntry } from './types'

export const PART_B: Record<string, ProblemHintsEntry> = {
  'bp-2-18': {
    hints: [
      { kind: 'reconocimiento', text: 'Es un problema de *álgebra con polinomios de Hermite*, no de resolver la ecuación de Schrödinger: el enunciado te regala las cuatro herramientas (Rodrigues, recursión, derivación, función generatriz) y cada parte usa una distinta, en orden. Lo que entrenas aquí es la soltura que luego necesitarás con la Tabla 2.1 del oscilador armónico.' },
      { kind: 'planteamiento', text: 'Para (a) deriva $e^{-\\xi^2}$ tres y cuatro veces *en cadena* (cada derivada se aplica al resultado de la anterior) y multiplica al final por $(-1)^n e^{\\xi^2}$. Para (b) aplica la recursión $H_{n+1} = 2\\xi H_n - 2nH_{n-1}$ dos veces: primero con $n=4$ y después con $n=5$, usando los $H_3$ y $H_4$ que ya tienes.' },
      { kind: 'tecnica', text: 'Cuida el signo de Rodrigues: $(-1)^3$ introduce un menos y $(-1)^4$ no. En (c) no hay que demostrar la Ec. 2.72, solo comprobarla: deriva tus $H_5$ y $H_6$ y factoriza hasta que asomen $H_4$ y $H_5$. En (d) las derivadas son respecto de $z$ (¡no de $\\xi$!) y al final se evalúa en $z = 0$.' },
      { kind: 'verificacion', text: 'Contrasta cada polinomio con la Tabla 2.1 del libro: el grado debe ser exactamente $n$ y la paridad debe alternar (par si $n$ par, impar si $n$ impar). Si algo no cuadra, revisa el coeficiente $2n$ de la recursión y el signo $(-1)^n$ de Rodrigues.' },
    ],
    finalAnswer: {
      answer: '(a) $H_3(\\xi) = -12\\xi + 8\\xi^3$; $H_4(\\xi) = 12 - 48\\xi^2 + 16\\xi^4$. (b) $H_5(\\xi) = 120\\xi - 160\\xi^3 + 32\\xi^5$; $H_6(\\xi) = -120 + 720\\xi^2 - 480\\xi^4 + 64\\xi^6$. (c) $\\frac{dH_5}{d\\xi} = (2)(5)H_4$; $\\frac{dH_6}{d\\xi} = (2)(6)H_5$ (✓). (d) $H_0(\\xi) = 2\\xi$; $H_1(\\xi) = -2 + 4\\xi^2$; $H_2(\\xi) = -12\\xi + 8\\xi^3$.',
      page: 25,
      note: 'En (d) el manual etiqueta como $H_0, H_1, H_2$ los resultados de la 1.ª, 2.ª y 3.ª derivada respecto de $z$; con la definición del enunciado ($H_n$ = $n$-ésima derivada en $z=0$) esos valores corresponden a $H_1, H_2, H_3$ (y $H_0 = 1$).',
    },
  },
  'bp-2-19': {
    hints: [
      { kind: 'reconocimiento', text: 'Es un problema de *identidades de Euler disfrazado de mecánica cuántica*: $e^{\\pm ikx} = \\cos kx \\pm i\\sin kx$ es prácticamente la única arma que necesitas. La física (ondas viajeras frente a ondas estacionarias) solo explica por qué ambas formas resultan útiles en contextos distintos.' },
      { kind: 'planteamiento', text: 'Empieza expandiendo $Ae^{ikx} + Be^{-ikx}$ con Euler y agrupando los términos en $\\cos kx$ y $\\sin kx$: eso te da $C$ y $D$ casi sin trabajo. Después expande $F\\cos(kx+\\alpha)$ y $G\\sin(kx+\\beta)$ con las fórmulas del ángulo sumado y equipara coeficientes con $C\\cos kx + D\\sin kx$.' },
      { kind: 'tecnica', text: 'En $F\\cos(kx+\\alpha) = F\\cos\\alpha\\cos kx - F\\sin\\alpha\\sin kx$ el signo menos manda: $C = F\\cos\\alpha$ pero $D = -F\\sin\\alpha$, de modo que $F = \\sqrt{C^2 + D^2}$ y $\\tan\\alpha = -D/C$. Y ojo: $F$ no sale de $A$ y $B$ directamente — calcula $C^2 + D^2$ con las $C, D$ del primer paso y simplifica.' },
      { kind: 'verificacion', text: 'Prueba casos puros: $A = B$ debe dar una función proporcional a $\\cos kx$ (estacionaria pura) y $A = -B$ proporcional a $\\sin kx$. Como control extra, haz el viaje de vuelta: partiendo de tus $C$ y $D$, recupera $A$ y $B$ con la exponencial compleja invertida.' },
    ],
    finalAnswer: {
      answer: '$C = A + B$; $D = i(A - B)$; y a la inversa, $A = \\frac{1}{2}(C - iD)$; $B = \\frac{1}{2}(C + iD)$.',
      page: 25,
      note: 'La 2.ª ed. reformuló el problema: la solución oficial solo cubre la equivalencia $Ae^{ikx} + Be^{-ikx} \\leftrightarrow C\\cos kx + D\\sin kx$ en ambas direcciones; las formas con $F, G, \\alpha, \\beta$ de la 1.ª ed. no aparecen en ella.',
    },
  },
  'bp-2-20': {
    hints: [
      { kind: 'reconocimiento', text: 'Una *demostración guiada del teorema de Plancherel*: el objetivo no es calcular nada nuevo, sino ver cómo la serie de Fourier en un intervalo finito $[-a, a]$ muta, cuando $a \\to \\infty$, en la transformada de Fourier. Cada apartado es un peldaño de esa escalera.' },
      { kind: 'planteamiento', text: 'En (a) expresa senos y cosenos con Euler y agrupa por $e^{in\\pi x/a}$: la suma sobre $n \\geq 0$ se reorganiza como una suma sobre todos los enteros, con $c_0 = b_0$. En (b) usa el truco de Fourier: multiplica por $e^{-im\\pi x/a}$ e integra en $[-a, a]$.' },
      { kind: 'tecnica', text: 'El corazón de (b) es la ortogonalidad $\\int_{-a}^{a} e^{i(n-m)\\pi x/a}dx = 2a\\,\\delta_{nm}$ (trata por separado $n = m$ y $n \\neq m$). En (c) sustituye $k = n\\pi/a$ y $F(k) = \\sqrt{2/\\pi}\\,ac_n$ y observa que $\\Delta k = \\pi/a$; en (d), cuando $a \\to \\infty$, el $\\Delta k$ se vuelve diferencial y la suma es literalmente $\\int F(k)\\,dk$.' },
      { kind: 'verificacion', text: 'El resultado final debe ser *auto-recíproco*: la fórmula de $f$ en función de $F$ y la de $F$ en función de $f$ con la misma constante $1/\\sqrt{2\\pi}$ y exponentes de signo opuesto. Si pierdes alguna constante por el camino, la simetría se rompe ahí. Test clásico: la gaussiana es su propia transformada.' },
    ],
    finalAnswer: {
      answer: '(a) $c_0 \\equiv b_0$; $c_n = \\frac{1}{2}(-ia_n + b_n)$ para $n = 1, 2, 3,\\dots$; $c_n \\equiv \\frac{1}{2}(ia_{-n} + b_{-n})$ para $n = -1, -2, -3,\\dots$ (b) $c_n = \\frac{1}{2a}\\int_{-a}^{a} f(x)e^{-in\\pi x/a}dx$. (c) $f(x) = \\frac{1}{\\sqrt{2\\pi}}\\sum_{n=-\\infty}^{\\infty} F(k)e^{ikx}\\,\\Delta k$; $F(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-a}^{a} f(x)e^{-ikx}dx$, con $\\Delta k \\equiv \\pi/a$. (d) $f(x) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} F(k)e^{ikx}dk$; $F(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} f(x)e^{-ikx}dx$.',
      page: 27,
    },
  },
  'bp-2-21': {
    hints: [
      { kind: 'reconocimiento', text: 'Partícula libre con un *pulso cuadrado* inicial (un "top-hat"): se trata de normalizar y pasar al espacio de momentos con $\\phi(k)$ (Ec. 2.86). La parte (c) es el premio de fondo: cómo el ancho del pulso y el de $\\phi(k)$ encarnan el principio de incertidumbre.' },
      { kind: 'planteamiento', text: 'La normalización de (a) es inmediata: $|A|^2$ por la longitud del intervalo. Para (b) aplica la definición $\\phi(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-a}^{a} A\\,e^{-ikx}dx$: la integral de una exponencial compleja sobre un intervalo finito.' },
      { kind: 'tecnica', text: 'El resultado de esa integral es proporcional a $(e^{ika} - e^{-ika})/k$, es decir, a $\\sin(ka)/k$: usa $e^{\\pm i\\theta} = \\cos\\theta \\pm i\\sin\\theta$ para simplificar. La forma final debe ser una función *par* de $k$, con un pico central en $k = 0$ y lóbulos laterales que decaen.' },
      { kind: 'verificacion', text: 'Razona los límites antes de calcularlos: para $a$ enorme el pulso es muy estrecho en $x$, así que $\\phi(k)$ debe concentrarse cerca de $k = 0$; para $a$ diminuto, $\\phi(k)$ debe ser ancha y casi plana. Unidades: $A$ va como $\\ell^{-1/2}$ y $\\phi(k)$ como $\\ell^{1/2}$.' },
    ],
    finalAnswer: {
      answer: '(a) $A = \\sqrt{a}$. (b) $\\phi(k) = \\sqrt{\\frac{a}{2\\pi}}\\;\\frac{2a}{k^2 + a^2}$. (c) Para $a$ grande, $\\Psi(x,0)$ es un pico estrecho mientras $\\phi(k) \\cong \\sqrt{2/\\pi a}$ es ancho y plano: posición bien definida, momento mal definido. Para $a$ pequeño, al revés: $\\phi(k) \\cong (\\sqrt{2a^3/\\pi})/k^2$ es un pico estrecho: posición mal definida, momento bien definido.',
      page: 27,
      note: 'La 2.ª ed. sustituyó el pulso cuadrado por $\\Psi = Ae^{-a|x|}$: estos resultados corresponden a ese estado inicial. Para el pulso cuadrado de la 1.ª ed. saldría $A = 1/\\sqrt{2a}$ y $\\phi(k) = \\sin(ka)/(\\sqrt{\\pi a}\\,k)$.',
    },
  },
  'bp-2-22': {
    hints: [
      { kind: 'reconocimiento', text: 'El famoso *paquete gaussiano libre*: la única forma inicial que sigue siendo gaussiana al evolucionar en el tiempo. Son cinco partes encadenadas —normalizar, evolucionar, medir la dispersión, valores esperados e incertidumbre— y el libro te regala la respuesta de (b) para que puedas comprobar cada paso.' },
      { kind: 'planteamiento', text: 'Para (b) hay un camino limpio en dos pasos: calcula $\\phi(k)$ (la transformada de una gaussiana, completando el cuadrado) y luego reintegra $\\Psi(x,t) = \\frac{1}{\\sqrt{2\\pi}}\\int \\phi(k)e^{ikx}e^{-i\\hbar k^2 t/2m}dk$, que es otra gaussiana en $k$ con exponente complejo.' },
      { kind: 'tecnica', text: 'Ambas integrales usan $\\int_{-\\infty}^{\\infty} e^{-(ax^2+bx)}dx = \\sqrt{\\pi/a}\\,e^{b^2/4a}$, y funciona igual con $a$ complejo — la pista del enunciado sirve para las dos. Para (c) y (d) conviene definir $\\theta \\equiv 2\\hbar at/m$ desde el principio: al multiplicar $\\Psi^*\\Psi$, los factores $(1 \\pm i\\theta)$ se combinan en $1 + \\theta^2$.' },
      { kind: 'verificacion', text: 'En $t = 0$ tu $\\Psi(x,t)$ debe reducirse a la gaussiana inicial normalizada, y $|\\Psi(x,t)|^2$ debe seguir normalizada para cualquier $t$. Para (e) recuerda que en la partícula libre $\\langle p \\rangle$ y $\\langle p^2 \\rangle$ son constantes (el hamiltoniano solo depende de $p$): solo $\\sigma_x$ puede crecer con el tiempo.' },
    ],
    finalAnswer: {
      answer: '(a) $A = (2a/\\pi)^{1/4}$. (b) $\\Psi(x,t) = (2a/\\pi)^{1/4}\\,\\dfrac{e^{-ax^2/(1 + 2i\\hbar at/m)}}{\\sqrt{1 + 2i\\hbar at/m}}$. (c) $|\\Psi|^2 = \\sqrt{\\frac{2}{\\pi}}\\,w\\,e^{-2w^2x^2}$, con $w \\equiv \\sqrt{a/(1+\\theta^2)}$, $\\theta \\equiv 2\\hbar at/m$: al crecer $t$, el gráfico de $|\\Psi|^2$ se aplana y se ensancha. (d) $\\langle x \\rangle = 0$; $\\langle p \\rangle = 0$; $\\langle x^2 \\rangle = 1/4w^2$; $\\langle p^2 \\rangle = a\\hbar^2$; $\\sigma_x = 1/2w$; $\\sigma_p = \\hbar\\sqrt{a}$. (e) $\\sigma_x\\sigma_p = \\frac{\\hbar}{2}\\sqrt{1 + (2\\hbar at/m)^2} \\geq \\frac{\\hbar}{2}$: se acerca más al límite en $t = 0$, donde lo satura exactamente.',
      page: 29,
    },
  },
  'bp-2-23': {
    hints: [
      { kind: 'reconocimiento', text: 'Tres integrales de *entrenamiento con la delta de Dirac*: la regla de oro es $\\int f(x)\\,\\delta(x - x_0)\\,dx = f(x_0)$, pero solo si $x_0$ cae dentro del intervalo de integración. Detectar dónde vive cada delta y si el intervalo la incluye es prácticamente todo el problema.' },
      { kind: 'planteamiento', text: 'Localiza primero el soporte de cada delta: $\\delta(x+2)$ vive en $x = -2$, $\\delta(x-\\pi)$ en $x = \\pi$ y $\\delta(x-2)$ en $x = 2$. Después evalúa el resto del integrando en ese punto — salvo que el punto quede fuera del intervalo.' },
      { kind: 'tecnica', text: 'Comprueba la pertenencia al intervalo *antes* de evaluar: en (a), ¿está $-2$ en $[-3, 1]$? En (b), ¿está $\\pi$ en $[0, \\infty)$? En (c), ¿está $2$ en $[-1, 1]$? Si el punto no pertenece al intervalo, la integral vale cero sin más cálculo.' },
      { kind: 'verificacion', text: 'Revisa que evaluaste en el punto correcto (en (a) es $x = -2$, no $x = 2$) y que respetaste los signos al sustituir en el polinomio. Como control extra: las unidades del resultado heredan las del integrando evaluado en $x_0$, porque $\\delta(x-x_0)$ aporta unidades de $1/x$.' },
    ],
    finalAnswer: {
      answer: '(a) $-25$. (b) $1$. (c) $0$ (el punto $x = 2$ cae fuera del dominio de integración).',
      page: 29,
    },
  },
  'bp-2-24': {
    hints: [
      { kind: 'reconocimiento', text: 'Una demostración de *identidades entre distribuciones*: cuando las deltas van dentro de expresiones compuestas, la igualdad se demuestra integrando contra una función de prueba $f(x)$ arbitraria — esa es la definición que el propio enunciado te da, y es tu única herramienta en (a) y en (b).' },
      { kind: 'planteamiento', text: 'Para (a) haz el cambio de variable $y = cx$ (con $dx = dy/c$) en $\\int f(x)\\delta(cx)dx$ y discute $c > 0$ y $c < 0$ por separado: si $c < 0$, los límites $\\pm\\infty$ se intercambian y aparece un cambio de signo. Para (b) integra $\\int f(x)\\,\\frac{d\\theta}{dx}dx$ por partes.' },
      { kind: 'tecnica', text: 'En la integración por partes de (b), parte el dominio en $x < 0$ y $x > 0$, donde $\\theta$ es constante: el término de frontera en $\\pm\\infty$ se cancela porque $f$ decae, y solo sobrevive el salto de $\\theta$ en el origen. El resultado debe reproducir $\\int f(x)\\delta(x)dx = f(0)$.' },
      { kind: 'verificacion', text: 'Coherencia dimensional: $\\delta(cx)$ y $\\frac{1}{|c|}\\delta(x)$ deben tener las mismas unidades. Para (b) piénsalo al revés: $\\theta(x) = \\int_{-\\infty}^{x}\\delta(u)\\,du$ dice que el escalón es la antiderivada de la delta — exactamente lo que acabas de demostrar.' },
    ],
    finalAnswer: {
      answer: '(a) $\\delta(cx) = \\frac{1}{|c|}\\delta(x)$. (b) $\\frac{d\\theta}{dx} = \\delta(x)$. (En ambos casos, tras integrar contra una $f(x)$ arbitraria.)',
      page: 30,
    },
  },
  'bp-2-25': {
    hints: [
      { kind: 'reconocimiento', text: 'Mini-problema de *transformada de Fourier de la delta*: aplicas la definición de $F(k)$ con $f(x) = \\delta(x)$ y después inviertes el teorema de Plancherel. La física de fondo: algo infinitamente estrecho en $x$ es perfectamente plano en $k$.' },
      { kind: 'planteamiento', text: 'Sustituye $f(x) = \\delta(x)$ en $F(k) = \\frac{1}{\\sqrt{2\\pi}}\\int f(x)e^{-ikx}dx$ y usa la propiedad de cribado para evaluar el integrando en $x = 0$. Luego escribe Plancherel al revés ($f$ en función de $F$) e introduce tu $F(k)$.' },
      { kind: 'tecnica', text: 'El cribado convierte la integral en $e^{-ik\\cdot 0} = 1$: $F(k)$ es una constante. Al invertir, esa constante sale de la integral y todo se reduce a contar bien los prefactores: los dos $1/\\sqrt{2\\pi}$ se multiplican.' },
      { kind: 'verificacion', text: 'Comprueba la fórmula final integrándola mentalmente contra una $f$ de prueba: debe devolver $f(0)$, que es la firma de la delta. Y no te asustes por el comentario del enunciado — como distribución la fórmula funciona, aunque la integral no converja en el sentido ordinario.' },
    ],
    finalAnswer: {
      answer: '$F(k) = \\frac{1}{\\sqrt{2\\pi}}$ (la transformada de Fourier de $\\delta(x)$); por tanto $\\delta(x) = \\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty} e^{ikx}\\,dk$.',
      page: 31,
    },
  },
  'bp-2-26': {
    hints: [
      { kind: 'reconocimiento', text: 'El *doble pozo delta*: dos copias del pozo de la sección 2.5 separadas una distancia $2a$. Por simetría, los estados ligados se separan en pares e impares (argumento del Problema 2.1(c)), y cuántos existen depende de qué tan "fuerte" es $\\alpha$ comparado con $\\hbar^2/2ma$.' },
      { kind: 'planteamiento', text: 'Escribe $\\psi$ por regiones: decrecimiento exponencial fuera y combinación de $e^{\\pm\\kappa x}$ dentro; para el caso par usa $\\psi = B(e^{\\kappa x} + e^{-\\kappa x})$ en el interior. Impón continuidad de $\\psi$ y el salto de $\\psi\'$ en $x = a$ (las deltas solo viven en $x = \\pm a$).' },
      { kind: 'tecnica', text: 'El salto de la derivada en cada delta es $\\Delta\\psi\' = -\\frac{2m\\alpha}{\\hbar^2}\\psi(\\text{en la delta})$. Eliminando amplitudes sale una ecuación trascendente; con $z \\equiv 2\\kappa a$ y $c \\equiv \\hbar^2/2am\\alpha$ queda compacta y se resuelve *gráficamente* (curva exponencial frente a recta), igual que la Fig. 2.18 del texto.' },
      { kind: 'verificacion', text: 'Cuenta intersecciones de las gráficas: la rama par siempre corta una vez; la impar solo si la recta es lo bastante tendida. Comprueba además que en el límite de pozos muy separados ($a$ grande) ambas energías tienden a la del pozo delta simple — dos copias independientes del pozo de la sección 2.5.' },
    ],
    finalAnswer: {
      answer: '(b) Ecuaciones: par $\\Rightarrow e^{-z} = cz - 1$; impar $\\Rightarrow e^{-z} = 1 - cz$, con $z \\equiv 2\\kappa a$, $c \\equiv \\hbar^2/2am\\alpha$. **Un estado ligado** (el par) si $\\alpha \\leq \\hbar^2/2ma$; **dos** (par e impar) si $\\alpha > \\hbar^2/2ma$. Para $\\alpha = \\hbar^2/ma$ ($c = \\frac{1}{2}$): $z = 2.21772$ (par) y $z = 1.59362$ (impar), con $E = -0.615\\,(\\hbar^2/ma^2)$ y $E = -0.317\\,(\\hbar^2/ma^2)$. Para $\\alpha = \\hbar^2/4ma$ ($c = 2$): solo el par, $z = 0.738835$, $E = -0.0682\\,(\\hbar^2/ma^2)$.',
      page: 32,
    },
  },
  'bp-2-27': {
    hints: [
      { kind: 'reconocimiento', text: 'La cara de *dispersión* del Problema 2.26: misma geometría de doble delta pero con $E > 0$, ondas viajeras y coeficiente de transmisión. Es un problema largo de álgebra con condiciones de frontera, pero sin ningún concepto nuevo respecto a la sección 2.5.' },
      { kind: 'planteamiento', text: 'Ansatz estándar en tres regiones: $Ae^{ikx} + Be^{-ikx}$ a la izquierda, mezcla $Ce^{ikx} + De^{-ikx}$ en medio y $Fe^{ikx}$ a la derecha. Plantea las cuatro condiciones (continuidad en $\\pm a$ y salto de $\\psi\'$ en $\\pm a$) y abrevia $\\beta \\equiv e^{-2ika}$, $\\gamma \\equiv i2m\\alpha/\\hbar^2 k$ para que el álgebra respire.' },
      { kind: 'tecnica', text: 'No despejes todo a la vez: usa las condiciones en $+a$ para expresar $C$ y $D$ en función de $F$, luego las de $-a$ para montar dos ecuaciones lineales en $A$, $B$, $F$; elimina $B$ y quédate con $F/A$. Para $T = |F/A|^2$, suma los cuadrados de las partes real e imaginaria del denominador.' },
      { kind: 'verificacion', text: 'Dos límites que atan todos los errores: $\\alpha \\to 0$ debe dar $T = 1$, y $a \\to 0$ debe reproducir la $T$ de un pozo delta simple con la fuerza combinada de ambos pozos. Si alguno falla, revisa los signos de las exponenciales $e^{\\pm ika}$.' },
    ],
    finalAnswer: {
      answer: '$T = \\left|\\frac{F}{A}\\right|^2 = \\dfrac{8g^4}{(8g^4 + 4g^2 + 1) + (4g^2 - 1)\\cos\\phi - 4g\\sin\\phi}$, con $g \\equiv \\dfrac{\\hbar^2 k}{2m\\alpha}$ y $\\phi \\equiv 4ka$.',
      page: 33,
    },
  },
  'bp-2-28': {
    hints: [
      { kind: 'reconocimiento', text: 'La réplica *impar* del análisis que el libro hace para los estados pares del pozo finito (sección 2.6): misma estrategia, cambiando cosenos por senos. La pregunta final —si existe siempre un estado impar— es el punto interesante: compara cómo nacen las ramas de tu ecuación respecto a las del caso par.' },
      { kind: 'planteamiento', text: 'Por simetría basta trabajar en $x > 0$: $\\psi = D\\sin(lx)$ dentro y $Fe^{-\\kappa x}$ fuera, extendiendo con $\\psi(-x) = -\\psi(x)$. Impón continuidad de $\\psi$ y de $\\psi\'$ en $x = a$ y *divide* las dos ecuaciones para eliminar $D$ y $F$.' },
      { kind: 'tecnica', text: 'La división da $-\\kappa = l\\cot(la)$; en las variables del texto ($z = la$, $z_0$) queda $-\\cot z = \\sqrt{(z_0/z)^2 - 1}$, lista para resolver gráficamente. Las ramas de $-\\cot z$ nacen en $z = \\pi/2,\\,3\\pi/2,\\dots$: fíjate desde dónde puede "alcanzar" la semicircunferencia.' },
      { kind: 'verificacion', text: 'En el límite de pozo ancho y profundo, las intersecciones deben acercarse a $z = \\pi, 2\\pi, 3\\pi,\\dots$ (los niveles del pozo infinito de anchura $2a$ con $n$ par), complementando los estados pares que ya estudió el texto. Para la pregunta final, estudia qué le pasa a la primera rama cuando $z_0$ se hace pequeño.' },
    ],
    finalAnswer: {
      answer: 'Ecuación trascendente (estados impares): $-\\cot z = \\sqrt{(z_0/z)^2 - 1}$. Pozo ancho y profundo: las intersecciones están en $z = \\pi, 2\\pi, 3\\pi,\\dots$ (como la Ec. 2.157 pero ahora para $n$ par — completa los estados del pozo infinito). Pozo poco profundo y estrecho: si $z_0 < \\pi/2$ **no hay ningún estado ligado impar**, es decir, $V_0 < \\frac{\\pi^2\\hbar^2}{8ma^2}$.',
      page: 34,
    },
  },
  'bp-2-29': {
    hints: [
      { kind: 'reconocimiento', text: 'Normalización de los *estados pares del pozo finito*: la Ec. 2.133 del libro ya trae la forma de $\\psi$, así que solo quedan por fijar $D$ y $F$. La clave es que la continuidad ya relaciona $F$ con $D$, y todo se reduce a una integral con una sola incógnita.' },
      { kind: 'planteamiento', text: 'Explota la paridad ($\\int_{-\\infty}^{\\infty} = 2\\int_0^{\\infty}$) y trabaja con $\\psi = D\\cos(lx)$ en $(0, a)$ y $Fe^{-\\kappa x}$ en $(a, \\infty)$. Sustituye $F = De^{\\kappa a}\\cos(la)$ para que quede todo en función de $|D|^2$.' },
      { kind: 'tecnica', text: 'Las integrales son de tabla: $\\int\\cos^2(lx)dx = x/2 + \\sin(2lx)/4l$ y la exponencial es inmediata. Al aparecer $\\sin(2la)$ y $\\cos^2(la)$, usa la condición $\\kappa = l\\tan(la)$ del texto y la identidad $\\sin(2la) = 2\\sin(la)\\cos(la)$: el resultado colapsa solo.' },
      { kind: 'verificacion', text: 'Comprueba que $D$ y $F$ quedan en unidades de $\\ell^{-1/2}$ y que la combinación final de longitudes es consistente. El mejor test: en el límite $V_0 \\to \\infty$ (donde $1/\\kappa \\to 0$) debes recuperar la normalización del pozo infinito de anchura $2a$ para el estado par.' },
    ],
    finalAnswer: {
      answer: '$D = \\dfrac{1}{\\sqrt{a + 1/\\kappa}}$; $F = \\dfrac{e^{\\kappa a}\\cos(la)}{\\sqrt{a + 1/\\kappa}}$.',
      page: 34,
    },
  },
  'bp-2-30': {
    hints: [
      { kind: 'reconocimiento', text: 'Un problema de *límites entre potenciales*: el pozo delta es un pozo finito con $a \\to 0$ y $V_0 \\to \\infty$ manteniendo el área constante. El protagonista es $z_0$ (el parámetro que mide la "profundidad"): hay que mostrar que en este límite se desvanece y rastrear las ecuaciones del texto en ese régimen.' },
      { kind: 'planteamiento', text: 'Empieza fijando el área: $2aV_0 = \\alpha$ constante, o sea $V_0 = \\alpha/2a$. Sustituye en $z_0 = \\frac{a}{\\hbar}\\sqrt{2mV_0}$ y muestra que $z_0 \\to 0$ — así, la intersección de la figura del texto ocurre a $z$ muy pequeño.' },
      { kind: 'tecnica', text: 'Con $z$ pequeño expande $\\tan z \\approx z$ en la ecuación del estado par: el álgebra se encadena sola y aparece $\\kappa a \\approx z_0^2$; al expresar $z_0$ en función de $\\alpha$ y $a$, las $a$ se cancelan — señal de que el límite está bien tomado. Traduce $\\kappa$ a energía con $E = -\\hbar^2\\kappa^2/2m$.' },
      { kind: 'verificacion', text: 'La energía final debe coincidir con la Ec. 2.111 del libro — es exactamente la comprobación que pide el enunciado. Para la segunda parte, toma la Ec. 2.151 con $V_0 \\gg E$, sustituye el área y usa $\\sin\\epsilon \\approx \\epsilon$: debe colapsar sobre la Ec. 2.123.' },
    ],
    finalAnswer: {
      answer: 'Con el área $2aV_0 = \\alpha$ fija, $z_0 = \\frac{1}{\\hbar}\\sqrt{m\\alpha a} \\to 0$. La energía del estado ligado resulta $E = -\\frac{m\\alpha^2}{2\\hbar^2}$ (coincide con la Ec. 2.111), y la Ec. 2.151 se reduce a $T^{-1} = 1 + \\frac{m\\alpha^2}{2\\hbar^2 E}$ (coincide con la Ec. 2.123).',
      page: 35,
    },
  },
  'bp-2-31': {
    hints: [
      { kind: 'reconocimiento', text: 'El *backstage del pozo finito*: el libro escribe las Ecs. 2.149 y 2.150 sin mostrar el álgebra, y este problema te pide reconstruirla. Es un ejercicio de eliminación lineal con las cuatro condiciones de frontera — y el propio enunciado te regala el primer paso ($C$ y $D$ en función de $F$).' },
      { kind: 'planteamiento', text: 'Con $C$ y $D$ ya expresados en términos de $F$, sustitúyelos en las condiciones de frontera de $x = -a$ (las Ecs. 2.145–2.146): obtendrás dos ecuaciones lineales que relacionan $A$, $B$ y $F$. Suma y réstalas para desacoplar y despeja $B$ y $F$ en función de $A$.' },
      { kind: 'tecnica', text: 'El truco de las combinaciones: multiplica las ecuaciones de continuidad por $\\sin(la)$ y $\\cos(la)$ y súmalas o réstalas para que los términos cruzados $\\sin\\cdot\\cos$ se cancelen; al final, las identidades de ángulo doble compactan todo en $\\cos(2la)$ y $\\sin(2la)$. Para $T$, calcula $|A/F|^2$ módulo al cuadrado.' },
      { kind: 'verificacion', text: 'Con $V_0 = 0$ (es decir, $l = k$) debe salir $B = 0$ y $F = A$: transmisión perfecta sin potencial. Y el chequeo $T + R = 1$ del enunciado debe reducirse a la identidad $(k+l)^2 = 4kl + (k-l)^2$.' },
    ],
    finalAnswer: {
      answer: '$B = i\\,\\frac{\\sin(2la)}{2kl}(l^2 - k^2)F$ (confirma la Ec. 2.149); $F = \\dfrac{e^{-2ika}A}{\\cos(2la) - i\\sin(2la)\\,\\frac{k^2 + l^2}{2kl}}$ (confirma la Ec. 2.150); $T^{-1} = 1 + \\dfrac{V_0^2}{4E(E + V_0)}\\sin^2\\!\\left(\\frac{2a}{\\hbar}\\sqrt{2m(E + V_0)}\\right)$ (confirma la Ec. 2.151).',
      page: 36,
      note: 'El solucionario no desarrolla $R$ aparte: se sigue de $R = |B/A|^2$, que da exactamente $R = 1 - T$.',
    },
  },
  'bp-2-32': {
    hints: [
      { kind: 'reconocimiento', text: 'La *barrera rectangular*: hermana del pozo finito con el signo cambiado, y con tres regímenes cualitativamente distintos según $E$ frente a $V_0$. Reconocer qué forma tiene $\\psi$ *dentro* de la barrera en cada caso (exponencial real, línea recta, onda) es la mitad del problema.' },
      { kind: 'planteamiento', text: 'Caso $E < V_0$: dentro de la barrera $\\psi = Ce^{\\kappa x} + De^{-\\kappa x}$ con $\\kappa = \\sqrt{2m(V_0-E)}/\\hbar$; impón las cuatro condiciones en $\\pm a$ y elimina $C, D$. El caso $E = V_0$ se trata aparte: dentro la ecuación de Schrödinger da $\\psi^{\\prime\\prime} = 0$, o sea $\\psi = C + Dx$.' },
      { kind: 'tecnica', text: 'En el caso $E < V_0$, las combinaciones $e^{\\kappa x} \\pm e^{-\\kappa x}$ se convierten en $\\cosh$ y $\\sinh$ con argumento $2\\kappa a$. Para $E > V_0$ no repitas todo el cálculo: razona qué cambia al sustituir $\\kappa \\to il$ y reutiliza el resultado del pozo (el texto hizo lo mismo al pasar de la Ec. 2.129 a la 2.141).' },
      { kind: 'verificacion', text: 'El test de consistencia más potente: los límites $E \\to V_0^{\\pm}$ de las fórmulas de $E < V_0$ y de $E > V_0$ (con $\\sinh\\epsilon \\approx \\epsilon$ y $\\sin\\epsilon \\approx \\epsilon$) deben coincidir con el resultado del caso $E = V_0$. Y con $V_0 \\to 0$ debe salir $T = 1$ en los tres casos.' },
    ],
    finalAnswer: {
      answer: 'Para $E < V_0$: $T^{-1} = 1 + \\dfrac{V_0^2}{4E(V_0 - E)}\\sinh^2\\!\\left(\\dfrac{2a}{\\hbar}\\sqrt{2m(V_0 - E)}\\right)$. Para $E = V_0$: $T^{-1} = 1 + (ka)^2 = 1 + \\dfrac{2mE}{\\hbar^2}a^2$. Para $E > V_0$: $T^{-1} = 1 + \\dfrac{V_0^2}{4E(E - V_0)}\\sin^2\\!\\left(\\dfrac{2a}{\\hbar}\\sqrt{2m(E - V_0)}\\right)$.',
      page: 38,
    },
  },
  'bp-2-33': {
    hints: [
      { kind: 'reconocimiento', text: 'El *escalón de potencial*: la discontinuidad más simple posible, y la primera vez que $T$ NO es $|F/A|^2$, porque la onda transmitida viaja a otra velocidad. Distingue bien los casos $E < V_0$ (región evanescente a la derecha) y $E > V_0$ (onda con otro número de onda $l$).' },
      { kind: 'planteamiento', text: 'Caso $E < V_0$: $\\psi = Ae^{ikx} + Be^{-ikx}$ para $x < 0$ y $Fe^{-\\kappa x}$ para $x > 0$; impón continuidad de $\\psi$ y de $\\psi^{\\prime}$ en el origen. Caso $E > V_0$: igual pero con $Fe^{ilx}$ y $l = \\sqrt{2m(E - V_0)}/\\hbar$. Son dos ecuaciones lineales por caso: despeja $B/A$.' },
      { kind: 'tecnica', text: 'Para (c) usa la corriente de probabilidad (Problema 1.9a): $J = (\\hbar k/m)|\\text{amplitud}|^2$ en cada región, y $T = J_{\\text{trans}}/J_{\\text{inc}}$ — el factor de velocidades $l/k$ aparece solo. Para (d), expresa $F/A$ desde tus ecuaciones de (b) y compónlo con el factor correcto de (c).' },
      { kind: 'verificacion', text: 'Comprueba que tu $T + R$ da 1 *solo* cuando usas la definición correcta de $T$ con factor de velocidad: si te sale distinto de 1, casi seguro ignoraste la parte (c). Chequeos de límite: $V_0 \\to 0$ debe dar $T \\to 1$, $R \\to 0$; y para $E \\gg V_0$ también $T \\to 1$.' },
    ],
    finalAnswer: {
      answer: '(a) $R = \\left|\\frac{1 + ik/\\kappa}{1 - ik/\\kappa}\\right|^2 = \\frac{1 + (k/\\kappa)^2}{1 + (k/\\kappa)^2} = 1$: reflexión total (la función de onda penetra en la barrera, pero acaba reflejada por completo). (b) $R = \\frac{(k - l)^2}{(k + l)^2} = \\frac{(\\sqrt{E} - \\sqrt{E - V_0})^4}{V_0^2}$. (c) $T = \\sqrt{\\frac{E - V_0}{E}}\\left|\\frac{F}{A}\\right|^2$; para $E < V_0$, por supuesto, $T = 0$. (d) $T = \\frac{4kl}{(k + l)^2} = \\frac{4\\sqrt{E}\\sqrt{E - V_0}(\\sqrt{E} - \\sqrt{E - V_0})^2}{V_0^2}$, y $T + R = 1$. ✓',
      page: 39,
    },
  },
}
