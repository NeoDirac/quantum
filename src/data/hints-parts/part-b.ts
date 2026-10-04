// Pistas graduadas + respuesta final — PARTE B: problemas 2.18 a 2.33
// Las pistas son contenido pedagógico ORIGINAL de la plataforma.
// Las respuestas finales son transcripción del solucionario oficial de Griffiths (2.ª ed.).

import type { ProblemHintsEntry } from './types'

export const PART_B: Record<string, ProblemHintsEntry> = {
  'bp-2-18': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Es un problema de *álgebra con polinomios de Hermite*, no de resolver la ecuación de Schrödinger: el enunciado te regala las cuatro herramientas (Rodrigues, recursión, derivación, función generatriz) y cada parte usa una distinta, en orden. Lo que entrenas aquí es la soltura que luego necesitarás con la Tabla 2.1 del oscilador armónico.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Cada apartado del 2.18 ejercita una herramienta de los polinomios de Hermite: (a) la fórmula de Rodrigues [2.70], (b) la relación de recursión [2.71], (c) la comprobación de la Ec. 2.72 y (d) la función generatriz [2.73]. No hay que resolver ninguna ecuación de Schrödinger.' },
            { title: 'Identifica los objetivos', text: 'Debes producir $H_3$ y $H_4$ en (a), $H_5$ y $H_6$ en (b) usando tu resultado de (a), verificar $\\frac{dH_n}{d\\xi} = 2nH_{n-1}$ en (c) y recuperar $H_0$, $H_1$ y $H_2$ en (d).' },
            { title: 'Conecta con el oscilador', text: 'Estos $H_n(\\xi)$ son los de la Tabla 2.1, los que visten los estados $\\psi_n$ del oscilador armónico; la soltura que ganes aquí la usarás en los problemas de la sección 2.3.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Para (a) deriva $e^{-\\xi^2}$ tres y cuatro veces *en cadena* (cada derivada se aplica al resultado de la anterior) y multiplica al final por $(-1)^n e^{\\xi^2}$. Para (b) aplica la recursión $H_{n+1} = 2\\xi H_n - 2nH_{n-1}$ dos veces: primero con $n=4$ y después con $n=5$, usando los $H_3$ y $H_4$ que ya tienes.',
        application: {
          steps: [
            { title: 'Monta Rodrigues en (a)', text: 'Escribe $H_3 = (-1)^3 e^{\\xi^2}\\frac{d^3}{d\\xi^3}e^{-\\xi^2}$ y $H_4 = (-1)^4 e^{\\xi^2}\\frac{d^4}{d\\xi^4}e^{-\\xi^2}$: deriva $e^{-\\xi^2}$ en cadena y multiplica al final por $e^{\\xi^2}$, que cancela la exponencial sobrante.' },
            { title: 'Prepara la recursión en (b)', text: 'Aplica $H_{n+1} = 2\\xi H_n - 2nH_{n-1}$ primero con $n = 4$ ($H_5 = 2\\xi H_4 - 8H_3$) y después con $n = 5$ ($H_6 = 2\\xi H_5 - 10H_4$), usando los $H_3$ y $H_4$ de (a).' },
            { title: 'Plan para (c)', text: 'Deriva tus $H_5$ y $H_6$ de (b) y comprueba que $\\frac{dH_5}{d\\xi} = (2)(5)H_4$ y $\\frac{dH_6}{d\\xi} = (2)(6)H_5$: solo eso pide la comprobación de la Ec. 2.72.' },
            { title: 'Plan para (d)', text: 'Desarrolla $e^{-z^2+2z\\xi}$ en potencias de $z$ hasta orden 2 y lee cada $H_n$ como el coeficiente de $z^n$ multiplicado por $n!$: eso devuelve $H_0$, $H_1$ y $H_2$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Cuida el signo de Rodrigues: $(-1)^3$ introduce un menos y $(-1)^4$ no. En (c) no hay que demostrar la Ec. 2.72, solo comprobarla: deriva tus $H_5$ y $H_6$ y factoriza hasta que asomen $H_4$ y $H_5$. En (d) las derivadas son respecto de $z$ (¡no de $\\xi$!) y al final se evalúa en $z = 0$.',
        application: {
          steps: [
            { title: 'Tercera derivada en cadena', text: 'Encadenando: $\\frac{d}{d\\xi}e^{-\\xi^2} = -2\\xi e^{-\\xi^2}$, $\\frac{d^2}{d\\xi^2}e^{-\\xi^2} = (4\\xi^2-2)e^{-\\xi^2}$ y $\\frac{d^3}{d\\xi^3}e^{-\\xi^2} = (12\\xi - 8\\xi^3)e^{-\\xi^2}$; con el factor $(-1)^3$ queda $H_3 = -12\\xi + 8\\xi^3$.' },
            { title: 'Cuarta derivada y H4', text: 'Un paso más: $\\frac{d^4}{d\\xi^4}e^{-\\xi^2} = (16\\xi^4 - 48\\xi^2 + 12)e^{-\\xi^2}$, y como $(-1)^4 = +1$, sale $H_4 = 16\\xi^4 - 48\\xi^2 + 12$.' },
            { title: 'Recursión dos veces', text: '$H_5 = 2\\xi H_4 - 8H_3 = 2\\xi(16\\xi^4-48\\xi^2+12) - 8(-12\\xi+8\\xi^3) = 32\\xi^5 - 160\\xi^3 + 120\\xi$; después $H_6 = 2\\xi H_5 - 10H_4 = 64\\xi^6 - 480\\xi^4 + 720\\xi^2 - 120$.' },
            { title: 'Comprueba la Ec. 2.72', text: '$\\frac{dH_5}{d\\xi} = 160\\xi^4 - 480\\xi^2 + 120 = 10(16\\xi^4 - 48\\xi^2 + 12) = (2)(5)H_4$, y análogamente $\\frac{dH_6}{d\\xi} = 384\\xi^5 - 1920\\xi^3 + 1440\\xi = (2)(6)H_5$.' },
            { title: 'Función generatriz en (d)', text: 'Multiplica las series: $e^{-z^2+2z\\xi} = (1 - z^2 + \\cdots)(1 + 2z\\xi + 2z^2\\xi^2 + \\cdots) = 1 + 2\\xi z + (2\\xi^2 - 1)z^2 + \\cdots$, de donde $H_0 = 1$, $H_1 = 2\\xi$ y $H_2 = 2(2\\xi^2 - 1) = 4\\xi^2 - 2$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Contrasta cada polinomio con la Tabla 2.1 del libro: el grado debe ser exactamente $n$ y la paridad debe alternar (par si $n$ par, impar si $n$ impar). Si algo no cuadra, revisa el coeficiente $2n$ de la recursión y el signo $(-1)^n$ de Rodrigues.',
        application: {
          steps: [
            { title: 'Coteja con la Tabla 2.1', text: 'Tus $H_3$, $H_4$, $H_5$ y $H_6$ deben coincidir entrada a entrada con la Tabla 2.1 del libro: grado exactamente $n$ y paridad alternada (función par si $n$ es par, impar si $n$ es impar).' },
            { title: 'Usa la recursión al revés', text: 'Despeja $H_{n-1} = (2\\xi H_n - H_{n+1})/2n$ y comprueba, por ejemplo, que $(2\\xi H_5 - H_6)/10$ reproduce tu $H_4$ de (a): un chequeo cruzado gratuito.' },
            { title: 'Revisa las etiquetas de (d)', text: 'Con la definición del enunciado (coeficiente de $z^n/n!$) obtienes $H_0 = 1$, $H_1 = 2\\xi$ y $H_2 = 4\\xi^2 - 2$; si tu solucionario lista valores desplazados, recuerda la nota: puede etiquetar como $H_0, H_1, H_2$ lo que en realidad son $H_1, H_2, H_3$.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $H_3(\\xi) = -12\\xi + 8\\xi^3$; $H_4(\\xi) = 12 - 48\\xi^2 + 16\\xi^4$. (b) $H_5(\\xi) = 120\\xi - 160\\xi^3 + 32\\xi^5$; $H_6(\\xi) = -120 + 720\\xi^2 - 480\\xi^4 + 64\\xi^6$. (c) $\\frac{dH_5}{d\\xi} = (2)(5)H_4$; $\\frac{dH_6}{d\\xi} = (2)(6)H_5$ (✓). (d) $H_0(\\xi) = 2\\xi$; $H_1(\\xi) = -2 + 4\\xi^2$; $H_2(\\xi) = -12\\xi + 8\\xi^3$.',
      page: 25,
      note: 'En (d) el manual etiqueta como $H_0, H_1, H_2$ los resultados de la 1.ª, 2.ª y 3.ª derivada respecto de $z$; con la definición del enunciado ($H_n$ = $n$-ésima derivada en $z=0$) esos valores corresponden a $H_1, H_2, H_3$ (y $H_0 = 1$).',
    },
  },
  'bp-2-19': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Es un problema de *identidades de Euler disfrazado de mecánica cuántica*: $e^{\\pm ikx} = \\cos kx \\pm i\\sin kx$ es prácticamente la única arma que necesitas. La física (ondas viajeras frente a ondas estacionarias) solo explica por qué ambas formas resultan útiles en contextos distintos.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Es álgebra compleja pura: las cuatro formas $Ae^{ikx} + Be^{-ikx}$, $C\\cos kx + D\\sin kx$, $F\\cos(kx+\\alpha)$ y $G\\sin(kx+\\beta)$ describen la misma función con $V = 0$. La física (ondas viajeras frente a estacionarias) solo explica cuál es cómoda en cada contexto.' },
            { title: 'Qué debes obtener', text: 'Las constantes pedidas: $C$ y $D$ en términos de $A$ y $B$, y en la dirección inversa $A$ y $B$ en términos de $C$ y $D$; en la versión de la 1.ª ed. también $F$, $G$, $\\alpha$ y $\\beta$.' },
            { title: 'Tu única arma', text: 'La identidad de Euler $e^{\\pm ikx} = \\cos kx \\pm i\\sin kx$ y las fórmulas del ángulo sumado: con ellas se traduce cualquier forma a cualquier otra.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Empieza expandiendo $Ae^{ikx} + Be^{-ikx}$ con Euler y agrupando los términos en $\\cos kx$ y $\\sin kx$: eso te da $C$ y $D$ casi sin trabajo. Después expande $F\\cos(kx+\\alpha)$ y $G\\sin(kx+\\beta)$ con las fórmulas del ángulo sumado y equipara coeficientes con $C\\cos kx + D\\sin kx$.',
        application: {
          steps: [
            { title: 'Traduce exponencial a seno', text: 'Expande $Ae^{ikx} + Be^{-ikx} = (A+B)\\cos kx + i(A-B)\\sin kx$: al comparar con $C\\cos kx + D\\sin kx$ quedan identificados $C$ y $D$ por coeficientes.' },
            { title: 'Camino de vuelta', text: 'Usa $\\cos kx = \\frac{e^{ikx}+e^{-ikx}}{2}$ y $\\sin kx = \\frac{e^{ikx}-e^{-ikx}}{2i}$ en $C\\cos kx + D\\sin kx$ para recuperar $A$ y $B$ y confirmar que ambas direcciones son consistentes.' },
            { title: 'Formas con amplitud y fase', text: 'Para $F\\cos(kx+\\alpha)$ y $G\\sin(kx+\\beta)$ expande el ángulo sumado y equipara coeficientes con $C\\cos kx + D\\sin kx$: eso fija $F$, $G$, $\\alpha$ y $\\beta$ a partir de $C$ y $D$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'En $F\\cos(kx+\\alpha) = F\\cos\\alpha\\cos kx - F\\sin\\alpha\\sin kx$ el signo menos manda: $C = F\\cos\\alpha$ pero $D = -F\\sin\\alpha$, de modo que $F = \\sqrt{C^2 + D^2}$ y $\\tan\\alpha = -D/C$. Y ojo: $F$ no sale de $A$ y $B$ directamente — calcula $C^2 + D^2$ con las $C, D$ del primer paso y simplifica.',
        application: {
          steps: [
            { title: 'Expande y agrupa', text: '$Ae^{ikx} + Be^{-ikx} = A(\\cos kx + i\\sin kx) + B(\\cos kx - i\\sin kx)$ se agrupa como $(A+B)\\cos kx + i(A-B)\\sin kx$, así que $C = A + B$ y $D = i(A - B)$.' },
            { title: 'Invierte la relación', text: 'Sumando y restando esas dos: $A = \\frac{1}{2}(C - iD)$ y $B = \\frac{1}{2}(C + iD)$; al sustituirlas una en la otra se recuperan $C = A+B$ y $D = i(A-B)$, señal de que el álgebra cierra.' },
            { title: 'Amplitud y fase (coseno)', text: 'De $F\\cos(kx+\\alpha) = F\\cos\\alpha\\cos kx - F\\sin\\alpha\\sin kx$ salen $C = F\\cos\\alpha$ y $D = -F\\sin\\alpha$, o sea $F = \\sqrt{C^2+D^2}$ y $\\tan\\alpha = -D/C$.' },
            { title: 'Amplitud y fase (seno)', text: 'De $G\\sin(kx+\\beta) = G\\sin\\beta\\cos kx + G\\cos\\beta\\sin kx$ salen $C = G\\sin\\beta$ y $D = G\\cos\\beta$, o sea $G = \\sqrt{C^2+D^2}$ y $\\tan\\beta = C/D$.' },
            { title: 'Cierra en términos de A y B', text: 'Con $C = A+B$ y $D = i(A-B)$: $C^2 + D^2 = (A+B)^2 - (A-B)^2 = 4AB$, así que $F = G = 2\\sqrt{AB}$ (la función es real), $\\tan\\alpha = \\frac{i(B-A)}{A+B}$ y $\\tan\\beta = \\frac{A+B}{i(A-B)}$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Prueba casos puros: $A = B$ debe dar una función proporcional a $\\cos kx$ (estacionaria pura) y $A = -B$ proporcional a $\\sin kx$. Como control extra, haz el viaje de vuelta: partiendo de tus $C$ y $D$, recupera $A$ y $B$ con la exponencial compleja invertida.',
        application: {
          steps: [
            { title: 'Prueba casos puros', text: 'Con $A = B$ sale $D = 0$ y la función es proporcional a $\\cos kx$; con $A = -B$ sale $C = 0$ y es proporcional a $\\sin kx$: las dos ondas estacionarias puras. Con $B = 0$ queda solo $e^{ikx}$, onda viajera pura.' },
            { title: 'Recorrido de ida y vuelta', text: 'Sustituye tus $C$ y $D$ en $A = \\frac{1}{2}(C-iD)$ y $B = \\frac{1}{2}(C+iD)$: debes recuperar los $A$ y $B$ de partida, porque la traducción es biyectiva.' },
            { title: 'Realidad de la función', text: 'Si la función es real, los coeficientes cumplen $B = A^*$; entonces $C = A + A^*$ y $D = i(A - A^*)$ son números reales, como debe ser, y $F$ y $G$ también.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$C = A + B$; $D = i(A - B)$; y a la inversa, $A = \\frac{1}{2}(C - iD)$; $B = \\frac{1}{2}(C + iD)$.',
      page: 25,
      note: 'La 2.ª ed. reformuló el problema: la solución oficial solo cubre la equivalencia $Ae^{ikx} + Be^{-ikx} \\leftrightarrow C\\cos kx + D\\sin kx$ en ambas direcciones; las formas con $F, G, \\alpha, \\beta$ de la 1.ª ed. no aparecen en ella.',
    },
  },
  'bp-2-20': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Una *demostración guiada del teorema de Plancherel*: el objetivo no es calcular nada nuevo, sino ver cómo la serie de Fourier en un intervalo finito $[-a, a]$ muta, cuando $a \\to \\infty$, en la transformada de Fourier. Cada apartado es un peldaño de esa escalera.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Son cuatro peldaños encadenados: (a) reescribir la serie de Dirichlet en $[-a, a]$ con exponenciales complejas, (b) obtener los $c_n$ con el truco de Fourier, (c) pasar a las variables $k$ y $F(k)$, y (d) tomar el límite $a \\to \\infty$.' },
            { title: 'La meta final', text: 'Conseguir el teorema de Plancherel: $f(x) = \\frac{1}{\\sqrt{2\\pi}}\\int F(k)e^{ikx}dk$ junto a su inversa, las dos fórmulas gemelas de la transformada de Fourier.' },
            { title: 'El concepto puente', text: 'Cuando $a$ crece, los $k = n\\pi/a$ se apiñan: la suma $\\sum F(k)\\,\\Delta k$ con $\\Delta k = \\pi/a$ se convierte en una integral. Ese es todo el secreto de (c) y (d).' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'En (a) expresa senos y cosenos con Euler y agrupa por $e^{in\\pi x/a}$: la suma sobre $n \\geq 0$ se reorganiza como una suma sobre todos los enteros, con $c_0 = b_0$. En (b) usa el truco de Fourier: multiplica por $e^{-im\\pi x/a}$ e integra en $[-a, a]$.',
        application: {
          steps: [
            { title: 'Reorganiza la serie en (a)', text: 'Escribe seno y coseno con Euler y agrupa los términos en $e^{in\\pi x/a}$: lo que era una suma sobre $n \\geq 0$ se convierte en una suma sobre todos los enteros, y el término constante deja $c_0 = b_0$.' },
            { title: 'Truco de Fourier en (b)', text: 'Multiplica $f(x) = \\sum_{n=-\\infty}^{\\infty}c_n e^{in\\pi x/a}$ por $e^{-im\\pi x/a}$ e integra en $[-a, a]$: la ortogonalidad mata todos los términos salvo el de $n = m$.' },
            { title: 'Cambio de variables en (c)', text: 'Sustituye $k = n\\pi/a$ y $F(k) = \\sqrt{2/\\pi}\\,ac_n$ en los resultados de (a) y (b), y expresa la suma como $\\sum F(k)e^{ikx}\\,\\Delta k$.' },
            { title: 'Límite en (d)', text: 'Con $a \\to \\infty$ tienes $\\Delta k = \\pi/a \\to 0$ y los extremos de las integrales se disparan: escribe la suma como una integral y lee el teorema.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'El corazón de (b) es la ortogonalidad $\\int_{-a}^{a} e^{i(n-m)\\pi x/a}dx = 2a\\,\\delta_{nm}$ (trata por separado $n = m$ y $n \\neq m$). En (c) sustituye $k = n\\pi/a$ y $F(k) = \\sqrt{2/\\pi}\\,ac_n$ y observa que $\\Delta k = \\pi/a$; en (d), cuando $a \\to \\infty$, el $\\Delta k$ se vuelve diferencial y la suma es literalmente $\\int F(k)\\,dk$.',
        application: {
          steps: [
            { title: 'Coeficientes en (a)', text: 'Con $\\sin\\theta = \\frac{e^{i\\theta}-e^{-i\\theta}}{2i}$ y $\\cos\\theta = \\frac{e^{i\\theta}+e^{-i\\theta}}{2}$, la suma $a_n\\sin(n\\pi x/a) + b_n\\cos(n\\pi x/a)$ da $c_n = \\frac{1}{2}(-ia_n + b_n)$ para $n \\geq 1$; para $n$ negativo, $c_n = \\frac{1}{2}(ia_{-n} + b_{-n})$; y $c_0 = b_0$.' },
            { title: 'Ortogonalidad en (b)', text: 'Para $n \\neq m$ la integral $\\int_{-a}^{a}e^{i(n-m)\\pi x/a}dx$ es proporcional a $\\sin[(n-m)\\pi] = 0$; para $n = m$ vale $2a$. De ahí $c_m = \\frac{1}{2a}\\int_{-a}^{a}f(x)e^{-im\\pi x/a}dx$.' },
            { title: 'Sustituciones de (c)', text: 'Con $c_n = \\sqrt{\\pi/2}\\,F(k)/a$ la serie de (a) se vuelve $\\frac{1}{\\sqrt{2\\pi}}\\sum F(k)e^{ikx}\\,\\Delta k$ porque $\\Delta k = \\pi/a$; y el resultado de (b) da $F(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-a}^{a}f(x)e^{-ikx}dx$.' },
            { title: 'El límite de (d)', text: 'Al crecer $a$, $\\Delta k \\to 0$ convierte la suma en $\\int_{-\\infty}^{\\infty}(\\cdot)\\,dk$ y las integrales sobre $[-a, a]$ se extienden a toda la recta real.' },
            { title: 'Las dos fórmulas gemelas', text: 'Resultado: $f(x) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty}F(k)e^{ikx}dk$ y $F(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty}f(x)e^{-ikx}dx$: misma constante $1/\\sqrt{2\\pi}$ y exponentes de signo opuesto.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'El resultado final debe ser *auto-recíproco*: la fórmula de $f$ en función de $F$ y la de $F$ en función de $f$ con la misma constante $1/\\sqrt{2\\pi}$ y exponentes de signo opuesto. Si pierdes alguna constante por el camino, la simetría se rompe ahí. Test clásico: la gaussiana es su propia transformada.',
        application: {
          steps: [
            { title: 'Simetría de ida y vuelta', text: 'Comprueba que la constante $1/\\sqrt{2\\pi}$ aparece en ambas fórmulas y que los exponentes $e^{-ikx}$ y $e^{ikx}$ llevan signos opuestos: si pierdes un factor 2 en (b) o en (c), la simetría se rompe justo ahí.' },
            { title: 'Prueba con la gaussiana', text: 'Test clásico: con esta convención simétrica, la gaussiana $e^{-x^2/2}$ es su propia transformada; aplicar tus dos fórmulas a ella debe devolver la misma función.' },
            { title: 'Cuenta el espaciado', text: 'Los $k$ adyacentes difieren en $\\Delta k = \\pi/a$ exactamente: verifica que usaste ese valor (y no $2\\pi/a$) al convertir $c_n$ en $F(k)$ en el apartado (c).' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $c_0 \\equiv b_0$; $c_n = \\frac{1}{2}(-ia_n + b_n)$ para $n = 1, 2, 3,\\dots$; $c_n \\equiv \\frac{1}{2}(ia_{-n} + b_{-n})$ para $n = -1, -2, -3,\\dots$ (b) $c_n = \\frac{1}{2a}\\int_{-a}^{a} f(x)e^{-in\\pi x/a}dx$. (c) $f(x) = \\frac{1}{\\sqrt{2\\pi}}\\sum_{n=-\\infty}^{\\infty} F(k)e^{ikx}\\,\\Delta k$; $F(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-a}^{a} f(x)e^{-ikx}dx$, con $\\Delta k \\equiv \\pi/a$. (d) $f(x) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} F(k)e^{ikx}dk$; $F(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} f(x)e^{-ikx}dx$.',
      page: 27,
    },
  },
  'bp-2-21': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Partícula libre con un *pulso cuadrado* inicial (un "top-hat"): se trata de normalizar y pasar al espacio de momentos con $\\phi(k)$ (Ec. 2.86). La parte (c) es el premio de fondo: cómo el ancho del pulso y el de $\\phi(k)$ encarnan el principio de incertidumbre.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Partícula libre ($V = 0$) con estado inicial cuadrado: $\\Psi(x,0) = A$ en $-a < x < a$ y cero fuera. (a) pide normalizar, (b) calcular $\\phi(k)$ con la Ec. 2.86 y (c) discutir los límites de $a$ y el principio de incertidumbre.' },
            { title: 'La herramienta central', text: '$\\phi(k)$ es la transformada de Fourier del estado inicial: cada componente $e^{ikx}$ evoluciona después como $e^{-i\\hbar k^2 t/2m}$, así que conocer $\\phi(k)$ es conocer el futuro del paquete.' },
            { title: 'Resultado esperado', text: 'La transformada de un pulso cuadrado es proporcional a $\\frac{\\sin(ka)}{k}$: función par, con un pico central en $k = 0$ y lóbulos laterales decrecientes.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'La normalización de (a) es inmediata: $|A|^2$ por la longitud del intervalo. Para (b) aplica la definición $\\phi(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-a}^{a} A\\,e^{-ikx}dx$: la integral de una exponencial compleja sobre un intervalo finito.',
        application: {
          steps: [
            { title: 'Normaliza en (a)', text: 'Como $\\Psi$ vale $A$ en un intervalo de longitud $2a$ y cero fuera: $1 = \\int|\\Psi|^2dx = |A|^2\\,2a$, de donde $A = 1/\\sqrt{2a}$ (tomándola real y positiva).' },
            { title: 'Transforma en (b)', text: 'Aplica $\\phi(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-a}^{a}A\\,e^{-ikx}dx$: es la integral elemental de una exponencial compleja sobre un intervalo finito, con antiderivada $e^{-ikx}/(-ik)$.' },
            { title: 'Discute los límites en (c)', text: 'Estudia $\\phi(k)$ para $a$ muy grande y muy pequeño y relaciónalo con $\\sigma_x\\sigma_p$: cuanto más localizada esté $\\Psi$, más plana es $\\phi(k)$, y al revés.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'El resultado de esa integral es proporcional a $(e^{ika} - e^{-ika})/k$, es decir, a $\\sin(ka)/k$: usa $e^{\\pm i\\theta} = \\cos\\theta \\pm i\\sin\\theta$ para simplificar. La forma final debe ser una función *par* de $k$, con un pico central en $k = 0$ y lóbulos laterales que decaen.',
        application: {
          steps: [
            { title: 'Evalúa la integral', text: '$\\int_{-a}^{a}e^{-ikx}dx = \\frac{e^{-ika} - e^{ika}}{-ik} = \\frac{e^{ika} - e^{-ika}}{ik}$, de modo que $\\phi(k) = \\frac{A}{\\sqrt{2\\pi}}\\frac{e^{ika} - e^{-ika}}{ik}$.' },
            { title: 'Simplifica con Euler', text: 'Como $e^{ika} - e^{-ika} = 2i\\sin(ka)$: $\\phi(k) = \\frac{2A}{\\sqrt{2\\pi}}\\frac{\\sin(ka)}{k} = \\frac{\\sin(ka)}{\\sqrt{\\pi a}\\,k}$ al sustituir $A = 1/\\sqrt{2a}$.' },
            { title: 'Pico central', text: 'En $k = 0$ usa $\\frac{\\sin(ka)}{k} \\to a$: $\\phi(0) = \\sqrt{a/\\pi}$ es el máximo; los ceros caen en $k = \\pm\\pi/a, \\pm 2\\pi/a, \\dots$, con lóbulos cada vez menores.' },
            { title: 'Cuando a es grande', text: 'Los ceros $k = n\\pi/a$ se acercan al origen: $\\phi(k)$ queda concentrada en un pico de anchura $\\sim \\pi/a$ en torno a $k = 0$, es decir, momentos bien definidos para un pulso espacialmente ancho.' },
            { title: 'Cuando a es pequeño', text: 'Para $ka \\ll 1$, $\\sin(ka) \\approx ka$ y $\\phi(k) \\approx \\sqrt{a/\\pi}$: una función ancha, baja y casi plana, con el momento muy indeterminado. Es el principio de incertidumbre en acción: $\\sigma_x \\sim a$ y $\\sigma_p \\sim \\hbar/a$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Razona los límites antes de calcularlos: para $a$ enorme el pulso es muy estrecho en $x$, así que $\\phi(k)$ debe concentrarse cerca de $k = 0$; para $a$ diminuto, $\\phi(k)$ debe ser ancha y casi plana. Unidades: $A$ va como $\\ell^{-1/2}$ y $\\phi(k)$ como $\\ell^{1/2}$.',
        application: {
          steps: [
            { title: 'Propiedades básicas de φ', text: 'El pulso es real y par, así que tu $\\phi(k) = \\frac{\\sin(ka)}{\\sqrt{\\pi a}\\,k}$ debe ser real y par, con su máximo en $k = 0$: compruébalo antes de seguir.' },
            { title: 'Unidades correctas', text: '$A = 1/\\sqrt{2a}$ va como $\\ell^{-1/2}$ y $\\phi(k)$ como $\\ell^{1/2}$, porque $|\\phi(k)|^2dk$ es una probabilidad, igual que $|\\Psi|^2dx$.' },
            { title: 'Vigencia de la respuesta del manual', text: 'Si comparas con el solucionario recuerda su nota: la 2.ª ed. usa $\\Psi = Ae^{-a|x|}$ y obtiene $\\phi(k) \\propto \\frac{2a}{k^2+a^2}$; para tu pulso cuadrado de la 1.ª ed. el resultado es el $\\frac{\\sin(ka)}{k}$ que has derivado.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $A = \\sqrt{a}$. (b) $\\phi(k) = \\sqrt{\\frac{a}{2\\pi}}\\;\\frac{2a}{k^2 + a^2}$. (c) Para $a$ grande, $\\Psi(x,0)$ es un pico estrecho mientras $\\phi(k) \\cong \\sqrt{2/\\pi a}$ es ancho y plano: posición bien definida, momento mal definido. Para $a$ pequeño, al revés: $\\phi(k) \\cong (\\sqrt{2a^3/\\pi})/k^2$ es un pico estrecho: posición mal definida, momento bien definido.',
      page: 27,
      note: 'La 2.ª ed. sustituyó el pulso cuadrado por $\\Psi = Ae^{-a|x|}$: estos resultados corresponden a ese estado inicial. Para el pulso cuadrado de la 1.ª ed. saldría $A = 1/\\sqrt{2a}$ y $\\phi(k) = \\sin(ka)/(\\sqrt{\\pi a}\\,k)$.',
    },
  },
  'bp-2-22': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'El famoso *paquete gaussiano libre*: la única forma inicial que sigue siendo gaussiana al evolucionar en el tiempo. Son cinco partes encadenadas —normalizar, evolucionar, medir la dispersión, valores esperados e incertidumbre— y el libro te regala la respuesta de (b) para que puedas comprobar cada paso.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Partícula libre con gaussiana inicial $\\Psi(x,0) = Ae^{-ax^2}$ y cinco apartados encadenados: (a) normalización, (b) evolución $\\Psi(x,t)$, (c) $|\\Psi|^2$ y su ensanchamiento, (d) valores esperados e incertidumbres, (e) principio de incertidumbre.' },
            { title: 'La estructura del cálculo', text: 'El camino limpio es: transformar a $\\phi(k)$, evolucionar cada componente con $e^{-i\\hbar k^2 t/2m}$ y reintegrar; las dos integrales gaussianas se resuelven completando el cuadrado.' },
            { title: 'El premio de fondo', text: 'El libro te regala la respuesta de (b): úsala para ir comprobando. La física interesante es que $|\\Psi|^2$ se ensancha con $t$ mientras $\\langle p \\rangle$ y $\\langle p^2 \\rangle$ no cambian.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Para (b) hay un camino limpio en dos pasos: calcula $\\phi(k)$ (la transformada de una gaussiana, completando el cuadrado) y luego reintegra $\\Psi(x,t) = \\frac{1}{\\sqrt{2\\pi}}\\int \\phi(k)e^{ikx}e^{-i\\hbar k^2 t/2m}dk$, que es otra gaussiana en $k$ con exponente complejo.',
        application: {
          steps: [
            { title: 'Normaliza en (a)', text: '$1 = |A|^2\\int_{-\\infty}^{\\infty}e^{-2ax^2}dx = |A|^2\\sqrt{\\frac{\\pi}{2a}}$ da $A = (2a/\\pi)^{1/4}$, con $a$ real y positivo como exige el enunciado.' },
            { title: 'Calcula φ(k)', text: 'Con la Ec. 2.86: $\\phi(k) = \\frac{A}{\\sqrt{2\\pi}}\\int e^{-ax^2}e^{-ikx}dx$; completando el cuadrado, $ax^2 + ikx = a(x + \\frac{ik}{2a})^2 + \\frac{k^2}{4a}$, y la integral vuelve a ser gaussiana.' },
            { title: 'Reintegra para Ψ(x,t)', text: 'Construye $\\Psi(x,t) = \\frac{1}{\\sqrt{2\\pi}}\\int\\phi(k)e^{ikx}e^{-i\\hbar k^2 t/2m}dk$: el exponente en $k$ es cuadrático con coeficiente complejo, otra gaussiana de la misma familia.' },
            { title: 'Organiza (c), (d) y (e)', text: 'Define desde el principio $\\theta \\equiv 2\\hbar at/m$: al calcular $|\\Psi|^2$ los factores $(1 \\pm i\\theta)$ dan $1 + \\theta^2$, y con $w \\equiv \\sqrt{a/(1+\\theta^2)}$ los apartados (c), (d) y (e) salen casi solos.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Ambas integrales usan $\\int_{-\\infty}^{\\infty} e^{-(ax^2+bx)}dx = \\sqrt{\\pi/a}\\,e^{b^2/4a}$, y funciona igual con $a$ complejo — la pista del enunciado sirve para las dos. Para (c) y (d) conviene definir $\\theta \\equiv 2\\hbar at/m$ desde el principio: al multiplicar $\\Psi^*\\Psi$, los factores $(1 \\pm i\\theta)$ se combinan en $1 + \\theta^2$.',
        application: {
          steps: [
            { title: 'Transformada gaussiana', text: 'Con la integral $\\int e^{-(ax^2+bx)}dx = \\sqrt{\\pi/a}\\,e^{b^2/4a}$ (válida también con $a$ complejo): $\\phi(k) = \\frac{A}{\\sqrt{2a}}e^{-k^2/4a}$, también gaussiana.' },
            { title: 'Reintegración con fase', text: 'El exponente en $k$ resulta $-\\left(\\frac{1}{4a} + \\frac{i\\hbar t}{2m}\\right)k^2 + ikx$; completando el cuadrado y usando la misma integral queda $\\Psi(x,t) = \\left(\\frac{2a}{\\pi}\\right)^{1/4}\\frac{e^{-ax^2/(1+2i\\hbar at/m)}}{\\sqrt{1+2i\\hbar at/m}}$.' },
            { title: 'Módulo al cuadrado', text: 'Al multiplicar $\\Psi^*\\Psi$, $\\frac{1}{1+i\\theta} + \\frac{1}{1-i\\theta} = \\frac{2}{1+\\theta^2}$ y $|1+i\\theta| = \\sqrt{1+\\theta^2}$: $|\\Psi|^2 = \\sqrt{\\frac{2}{\\pi}}\\,w\\,e^{-2w^2x^2}$ con $w = \\sqrt{a/(1+\\theta^2)}$.' },
            { title: 'Valores esperados de x', text: 'De la gaussiana $|\\Psi|^2 \\propto e^{-2w^2x^2}$: $\\langle x \\rangle = 0$ (centrada) y $\\langle x^2 \\rangle = \\frac{1}{4w^2}$, así que $\\sigma_x = 1/2w$, que crece con $t$ porque $w$ decrece.' },
            { title: 'Valores esperados de p', text: 'Como $H = p^2/2m$, $\\langle p \\rangle$ y $\\langle p^2 \\rangle$ son constantes: con $|\\phi(k)|^2 \\propto e^{-k^2/2a}$ sale $\\langle k^2 \\rangle = a$, luego $\\langle p^2 \\rangle = a\\hbar^2$ y $\\sigma_p = \\hbar\\sqrt{a}$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'En $t = 0$ tu $\\Psi(x,t)$ debe reducirse a la gaussiana inicial normalizada, y $|\\Psi(x,t)|^2$ debe seguir normalizada para cualquier $t$. Para (e) recuerda que en la partícula libre $\\langle p \\rangle$ y $\\langle p^2 \\rangle$ son constantes (el hamiltoniano solo depende de $p$): solo $\\sigma_x$ puede crecer con el tiempo.',
        application: {
          steps: [
            { title: 'Límite t = 0', text: 'En $t = 0$ tu $\\Psi(x,t)$ debe colapsar a $(2a/\\pi)^{1/4}e^{-ax^2}$ y $w \\to \\sqrt{a}$: comprueba que tanto la amplitud como el exponente se reducen bien.' },
            { title: 'Conservación de la norma', text: 'El área de $|\\Psi(x,t)|^2$ es 1 para cualquier $t$: $\\sqrt{2/\\pi}\\,w\\int e^{-2w^2x^2}dx = \\sqrt{2/\\pi}\\,w\\sqrt{\\pi/(2w^2)} = 1$, como debe ser.' },
            { title: 'Principio de incertidumbre', text: 'Con (d): $\\sigma_x\\sigma_p = \\frac{\\hbar}{2}\\sqrt{1+\\theta^2} \\geq \\frac{\\hbar}{2}$, y la igualdad se alcanza exactamente en $t = 0$: la gaussiana es el estado mínimo, y después solo puede empeorar.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $A = (2a/\\pi)^{1/4}$. (b) $\\Psi(x,t) = (2a/\\pi)^{1/4}\\,\\dfrac{e^{-ax^2/(1 + 2i\\hbar at/m)}}{\\sqrt{1 + 2i\\hbar at/m}}$. (c) $|\\Psi|^2 = \\sqrt{\\frac{2}{\\pi}}\\,w\\,e^{-2w^2x^2}$, con $w \\equiv \\sqrt{a/(1+\\theta^2)}$, $\\theta \\equiv 2\\hbar at/m$: al crecer $t$, el gráfico de $|\\Psi|^2$ se aplana y se ensancha. (d) $\\langle x \\rangle = 0$; $\\langle p \\rangle = 0$; $\\langle x^2 \\rangle = 1/4w^2$; $\\langle p^2 \\rangle = a\\hbar^2$; $\\sigma_x = 1/2w$; $\\sigma_p = \\hbar\\sqrt{a}$. (e) $\\sigma_x\\sigma_p = \\frac{\\hbar}{2}\\sqrt{1 + (2\\hbar at/m)^2} \\geq \\frac{\\hbar}{2}$: se acerca más al límite en $t = 0$, donde lo satura exactamente.',
      page: 29,
    },
  },
  'bp-2-23': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Tres integrales de *entrenamiento con la delta de Dirac*: la regla de oro es $\\int f(x)\\,\\delta(x - x_0)\\,dx = f(x_0)$, pero solo si $x_0$ cae dentro del intervalo de integración. Detectar dónde vive cada delta y si el intervalo la incluye es prácticamente todo el problema.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Tres integrales de cribado: (a) con un polinomio en $[-3, 1]$, (b) con $\\cos(3x) + 2$ en $[0, \\infty)$ y (c) con $e^{|x|+3}$ en $[-1, 1]$. Ninguna requiere integrar de verdad.' },
            { title: 'Localiza cada delta', text: 'El soporte de $\\delta(x+2)$ está en $x = -2$, el de $\\delta(x-\\pi)$ en $x = \\pi$ y el de $\\delta(x-2)$ en $x = 2$: ese punto es lo único que importa de cada integrando.' },
            { title: 'La regla de oro', text: '$\\int f(x)\\delta(x-x_0)dx = f(x_0)$ si $x_0$ cae dentro del intervalo de integración; si no, la integral es cero. Decidir esa pertenencia es todo el problema.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Localiza primero el soporte de cada delta: $\\delta(x+2)$ vive en $x = -2$, $\\delta(x-\\pi)$ en $x = \\pi$ y $\\delta(x-2)$ en $x = 2$. Después evalúa el resto del integrando en ese punto — salvo que el punto quede fuera del intervalo.',
        application: {
          steps: [
            { title: 'Criba el apartado (a)', text: 'El punto $x_0 = -2$ pertenece a $[-3, 1]$, así que la integral vale el polinomio $x^3 - 3x^2 + 2x - 1$ evaluado en $x = -2$.' },
            { title: 'Criba el apartado (b)', text: 'Como $\\pi \\in [0, \\infty)$, evalúa $\\cos(3x) + 2$ en $x = \\pi$: ahí es donde vive la delta $\\delta(x - \\pi)$.' },
            { title: 'Justifica el apartado (c)', text: 'El punto $x_0 = 2$ está fuera de $[-1, 1]$: la delta nunca se activa dentro del dominio y la integral vale cero sin más cálculo.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Comprueba la pertenencia al intervalo *antes* de evaluar: en (a), ¿está $-2$ en $[-3, 1]$? En (b), ¿está $\\pi$ en $[0, \\infty)$? En (c), ¿está $2$ en $[-1, 1]$? Si el punto no pertenece al intervalo, la integral vale cero sin más cálculo.',
        application: {
          steps: [
            { title: 'Evalúa (a) con cuidado', text: 'Sustituye $x = -2$ término a término: $(-2)^3 - 3(-2)^2 + 2(-2) - 1 = -8 - 12 - 4 - 1$; vigila los signos de $(-2)^2 = 4$ y de $2\\cdot(-2) = -4$.' },
            { title: 'Cierra (a)', text: 'La suma da $-25$: ese número, con las unidades heredadas del integrando, es toda la respuesta del apartado (a).' },
            { title: 'Evalúa (b)', text: 'En $x = \\pi$: $\\cos(3\\pi) + 2 = -1 + 2 = 1$, usando que $\\cos(3\\pi) = \\cos(\\pi) = -1$ porque el coseno tiene período $2\\pi$.' },
            { title: 'Justifica (c)', text: 'En $[-1, 1]$ el factor $\\delta(x-2)$ vale cero salvo en $x = 2$, que no pertenece al intervalo; la integral de algo nulo dentro del dominio de integración es exactamente $0$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Revisa que evaluaste en el punto correcto (en (a) es $x = -2$, no $x = 2$) y que respetaste los signos al sustituir en el polinomio. Como control extra: las unidades del resultado heredan las del integrando evaluado en $x_0$, porque $\\delta(x-x_0)$ aporta unidades de $1/x$.',
        application: {
          steps: [
            { title: 'Revisa el punto de cribado', text: 'En (a) la delta es $\\delta(x+2)$, o sea $x_0 = -2$ (no $+2$); en (b) el punto es $x_0 = \\pi$ (no $3\\pi$, que es el argumento del coseno).' },
            { title: 'Signos y paridades', text: 'El error típico en (a) es escribir $(-2)^2 = -4$ u olvidar el menos de $2(-2)$; recomputa $-8 - 12 - 4 - 1 = -25$ antes de dar la respuesta por buena.' },
            { title: 'Coherencia de unidades', text: 'El resultado hereda las unidades del integrando evaluado en $x_0$, porque $\\delta(x-x_0)$ aporta unidades de $1/x$: en (a) y (b) salen números puros y en (c) exactamente cero.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $-25$. (b) $1$. (c) $0$ (el punto $x = 2$ cae fuera del dominio de integración).',
      page: 29,
    },
  },
  'bp-2-24': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Una demostración de *identidades entre distribuciones*: cuando las deltas van dentro de expresiones compuestas, la igualdad se demuestra integrando contra una función de prueba $f(x)$ arbitraria — esa es la definición que el propio enunciado te da, y es tu única herramienta en (a) y en (b).',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Dos identidades entre distribuciones: (a) $\\delta(cx) = \\frac{1}{|c|}\\delta(x)$ y (b) $\\frac{d\\theta}{dx} = \\delta(x)$ para el escalón $\\theta$ de la Ec. 2.125. No se demuestran punto a punto, sino integrando contra una función de prueba arbitraria.' },
            { title: 'La definición operativa', text: 'El criterio del enunciado: $D_1 = D_2$ si $\\int f(x)D_1(x)dx = \\int f(x)D_2(x)dx$ para cualquier $f$ ordinaria. Esa es tu única herramienta en ambos apartados.' },
            { title: 'Técnicas a desplegar', text: 'Para (a), un cambio de variable $y = cx$ con discusión de signos; para (b), una integración por partes aprovechando que $\\theta$ es constante a ambos lados del origen.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Para (a) haz el cambio de variable $y = cx$ (con $dx = dy/c$) en $\\int f(x)\\delta(cx)dx$ y discute $c > 0$ y $c < 0$ por separado: si $c < 0$, los límites $\\pm\\infty$ se intercambian y aparece un cambio de signo. Para (b) integra $\\int f(x)\\,\\frac{d\\theta}{dx}dx$ por partes.',
        application: {
          steps: [
            { title: 'Estrategia de (a)', text: 'Parte de $\\int_{-\\infty}^{\\infty}f(x)\\delta(cx)dx$ y sustituye $y = cx$ (con $dx = dy/c$): el objetivo es que aparezca $\\frac{1}{|c|}\\int f(y/c)\\delta(y)dy = \\frac{f(0)}{|c|}$.' },
            { title: 'Estrategia de (b)', text: 'Escribe $\\int f(x)\\frac{d\\theta}{dx}dx$ e integra por partes: el término de frontera muere porque $f$ decae, y solo sobrevive el salto de $\\theta$ en el origen.' },
            { title: 'La meta en ambos casos', text: 'Cada integral debe reducirse a $f(0)$ (o $f(0)/|c|$), que es exactamente lo que produce el miembro derecho de cada identidad propuesta.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'En la integración por partes de (b), parte el dominio en $x < 0$ y $x > 0$, donde $\\theta$ es constante: el término de frontera en $\\pm\\infty$ se cancela porque $f$ decae, y solo sobrevive el salto de $\\theta$ en el origen. El resultado debe reproducir $\\int f(x)\\delta(x)dx = f(0)$.',
        application: {
          steps: [
            { title: 'Cambio de variable, c > 0', text: 'Con $y = cx$ y $c > 0$ los límites se mantienen en $\\pm\\infty$: $\\int f(x)\\delta(cx)dx = \\frac{1}{c}\\int f(y/c)\\delta(y)dy = \\frac{f(0)}{c}$.' },
            { title: 'Cambio de variable, c < 0', text: 'Si $c < 0$ los límites se intercambian y el jacobiano $dx = dy/c$ es negativo: los dos signos se compensan y queda $\\frac{f(0)}{-c} = \\frac{f(0)}{|c|}$, que unifica ambos casos.' },
            { title: 'Conclusión de (a)', text: 'Como $\\int f(x)\\frac{1}{|c|}\\delta(x)dx = \\frac{f(0)}{|c|}$ para cualquier $f$, la definición del enunciado certifica $\\delta(cx) = \\frac{1}{|c|}\\delta(x)$ (la Ec. 2.124).' },
            { title: 'Integración por partes en (b)', text: '$\\int f\\frac{d\\theta}{dx}dx = [f\\theta]_{-\\infty}^{\\infty} - \\int\\theta\\frac{df}{dx}dx = 0 - \\int_0^{\\infty}\\frac{df}{dx}dx = -[f(\\infty) - f(0)] = f(0)$, idéntico a $\\int f\\delta(x)dx$: luego $\\frac{d\\theta}{dx} = \\delta(x)$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Coherencia dimensional: $\\delta(cx)$ y $\\frac{1}{|c|}\\delta(x)$ deben tener las mismas unidades. Para (b) piénsalo al revés: $\\theta(x) = \\int_{-\\infty}^{x}\\delta(u)\\,du$ dice que el escalón es la antiderivada de la delta — exactamente lo que acabas de demostrar.',
        application: {
          steps: [
            { title: 'Unidades coherentes', text: '$\\delta(cx)$ lleva unidades de $1/(cx)$ y $\\frac{1}{|c|}\\delta(x)$ de $\\frac{1}{|c|}\\cdot\\frac{1}{x}$: ambas van como $1/x$, como exige la Ec. 2.124.' },
            { title: 'Caso particular c = -1', text: 'La fórmula da $\\delta(-x) = \\delta(x)$: la delta es par, un hecho que ya usaste al dibujar pozos y al explotar simetrías.' },
            { title: 'Lectura inversa de (b)', text: 'Como $\\theta(x) = \\int_{-\\infty}^{x}\\delta(u)du$, el escalón es la antiderivada de la delta: tu demostración de $\\frac{d\\theta}{dx} = \\delta(x)$ dice lo mismo al derecho y al revés.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $\\delta(cx) = \\frac{1}{|c|}\\delta(x)$. (b) $\\frac{d\\theta}{dx} = \\delta(x)$. (En ambos casos, tras integrar contra una $f(x)$ arbitraria.)',
      page: 30,
    },
  },
  'bp-2-25': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Mini-problema de *transformada de Fourier de la delta*: aplicas la definición de $F(k)$ con $f(x) = \\delta(x)$ y después inviertes el teorema de Plancherel. La física de fondo: algo infinitamente estrecho en $x$ es perfectamente plano en $k$.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Dos entregas: calcular la transformada de Fourier de $f(x) = \\delta(x)$ con la definición de $F(k)$, y usar Plancherel al revés para demostrar $\\delta(x) = \\frac{1}{2\\pi}\\int e^{ikx}dk$ (la Ec. 2.126 del enunciado).' },
            { title: 'La propiedad protagonista', text: 'El cribado $\\int f(x)\\delta(x-x_0)dx = f(x_0)$ evalúa el integrando en el soporte de la delta; aquí ese punto es $x_0 = 0$.' },
            { title: 'La física del resultado', text: 'Lo infinitamente estrecho en $x$ tiene espectro perfectamente plano en $k$: el extremo del par estrechez–planitud que ya viste en el problema 2.21.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Sustituye $f(x) = \\delta(x)$ en $F(k) = \\frac{1}{\\sqrt{2\\pi}}\\int f(x)e^{-ikx}dx$ y usa la propiedad de cribado para evaluar el integrando en $x = 0$. Luego escribe Plancherel al revés ($f$ en función de $F$) e introduce tu $F(k)$.',
        application: {
          steps: [
            { title: 'Transforma la delta', text: 'Sustituye $f(x) = \\delta(x)$ en $F(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty}f(x)e^{-ikx}dx$ y aplica el cribado en $x = 0$: la integral se evalúa sola.' },
            { title: 'Invierte Plancherel', text: 'Escribe la fórmula inversa $f(x) = \\frac{1}{\\sqrt{2\\pi}}\\int F(k)e^{ikx}dk$ e introduce en ella tu $F(k)$ recién calculada.' },
            { title: 'Cuenta los prefactores', text: 'Todo el trabajo restante es combinar los dos $\\frac{1}{\\sqrt{2\\pi}}$ (uno de cada fórmula) para que aparezca el $\\frac{1}{2\\pi}$ de la Ec. 2.126.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'El cribado convierte la integral en $e^{-ik\\cdot 0} = 1$: $F(k)$ es una constante. Al invertir, esa constante sale de la integral y todo se reduce a contar bien los prefactores: los dos $1/\\sqrt{2\\pi}$ se multiplican.',
        application: {
          steps: [
            { title: 'Criba la integral', text: 'El cribado evalúa $e^{-ikx}$ en $x = 0$: $F(k) = \\frac{1}{\\sqrt{2\\pi}}e^{-ik\\cdot 0} = \\frac{1}{\\sqrt{2\\pi}}$, una constante independiente de $k$.' },
            { title: 'Espectro plano', text: 'Ese $F(k)$ constante significa que todas las componentes de momento participan con el mismo peso: la firma de un objeto de anchura cero.' },
            { title: 'Sustituye en la inversa', text: '$\\delta(x) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty}\\frac{1}{\\sqrt{2\\pi}}e^{ikx}dk = \\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty}e^{ikx}dk$, exactamente la Ec. 2.126.' },
            { title: 'Sobre la convergencia', text: 'Para $x \\neq 0$ la integral no converge en el sentido ordinario (el integrando oscila sin decaer): la fórmula se entiende como distribución, por ejemplo promediando $\\int_{-L}^{L}$ con $L \\to \\infty$, como sugiere el comentario del enunciado.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Comprueba la fórmula final integrándola mentalmente contra una $f$ de prueba: debe devolver $f(0)$, que es la firma de la delta. Y no te asustes por el comentario del enunciado — como distribución la fórmula funciona, aunque la integral no converja en el sentido ordinario.',
        application: {
          steps: [
            { title: 'Firmas de la delta', text: 'Integra tu $\\frac{1}{2\\pi}\\int e^{ikx}dk$ contra una $f$ de prueba e intercambia el orden de integración: debe devolver $f(0)$, la huella inconfundible de $\\delta(x)$.' },
            { title: 'Simetría de las fórmulas', text: 'La transformada directa lleva $e^{-ikx}$ y la inversa $e^{ikx}$: comprueba que no cruzaste los signos al sustituir tu $F(k)$ constante.' },
            { title: 'Coherencia con 2.21', text: 'Un espectro plano $F(k)$ constante corresponde a un estado infinitamente localizado en $x$: es el límite extremo del pulso cuadrado del problema 2.21, así que las piezas encajan.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$F(k) = \\frac{1}{\\sqrt{2\\pi}}$ (la transformada de Fourier de $\\delta(x)$); por tanto $\\delta(x) = \\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty} e^{ikx}\\,dk$.',
      page: 31,
    },
  },
  'bp-2-26': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'El *doble pozo delta*: dos copias del pozo de la sección 2.5 separadas una distancia $2a$. Por simetría, los estados ligados se separan en pares e impares (argumento del Problema 2.1(c)), y cuántos existen depende de qué tan "fuerte" es $\\alpha$ comparado con $\\hbar^2/2ma$.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Potencial $V(x) = -\\alpha[\\delta(x+a) + \\delta(x-a)]$: dos pozos delta idénticos separados $2a$. (a) es un boceto; (b) pide cuántos estados ligados hay y sus energías para $\\alpha = \\hbar^2/ma$ y $\\alpha = \\hbar^2/4ma$.' },
            { title: 'Simetría decisiva', text: 'El potencial es par, así que los estados ligados ($E < 0$) se organizan en pares e impares (Problema 2.1(c)): basta resolver en $x > 0$ y extender con $\\psi(-x) = \\pm\\psi(x)$.' },
            { title: 'El parámetro de fuerza', text: 'Todo se controla con $c \\equiv \\hbar^2/2am\\alpha$, que compara la fuerza $\\alpha$ de cada pozo con la separación $2a$: $c$ pequeño es pozo fuerte o cercano, $c$ grande es pozo débil o lejano.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Escribe $\\psi$ por regiones: decrecimiento exponencial fuera y combinación de $e^{\\pm\\kappa x}$ dentro; para el caso par usa $\\psi = B(e^{\\kappa x} + e^{-\\kappa x})$ en el interior. Impón continuidad de $\\psi$ y el salto de $\\psi\'$ en $x = a$ (las deltas solo viven en $x = \\pm a$).',
        application: {
          steps: [
            { title: 'Regiones y decaimiento', text: 'Con $E<0$ define $\\kappa = \\sqrt{-2mE}/\\hbar$ y escribe $\\psi = Fe^{\\kappa x}$ para $x<-a$, $Ce^{\\kappa x}+De^{-\\kappa x}$ en $-a<x<a$ y $Fe^{-\\kappa x}$ para $x>a$: solo esa elección no explota en el infinito.' },
            { title: 'Resuelve la paridad primero', text: 'Como $V$ es par, decide desde el principio: interior $B(e^{\\kappa x}+e^{-\\kappa x})$ para el estado par, $B(e^{\\kappa x}-e^{-\\kappa x})$ para el impar, y fuera $Fe^{-\\kappa|x|}$ en ambos casos.' },
            { title: 'Condiciones en x = a', text: 'Continuidad: $B(e^{\\kappa a}\\pm e^{-\\kappa a}) = Fe^{-\\kappa a}$. Salto de la derivada: $\\psi\'(a^+)-\\psi\'(a^-) = -\\frac{2m\\alpha}{\\hbar^2}\\psi(a)$, que sale de integrar la ecuación de Schrödinger a través de $\\delta(x-a)$.' },
            { title: 'Cuenta las incógnitas', text: 'Son dos ecuaciones en $x=a$ para $B$, $F$ y $\\kappa$: al eliminar las amplitudes queda una sola condición trascendente por paridad, y $x=-a$ ya no aporta información nueva.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'El salto de la derivada en cada delta es $\\Delta\\psi\' = -\\frac{2m\\alpha}{\\hbar^2}\\psi(\\text{en la delta})$. Eliminando amplitudes sale una ecuación trascendente; con $z \\equiv 2\\kappa a$ y $c \\equiv \\hbar^2/2am\\alpha$ queda compacta y se resuelve *gráficamente* (curva exponencial frente a recta), igual que la Fig. 2.18 del texto.',
        application: {
          steps: [
            { title: 'Continuidad en a', text: 'Del caso par: $Fe^{-\\kappa a} = B(e^{\\kappa a}+e^{-\\kappa a})$, o sea $F = B(1+e^{2\\kappa a})$ — esa es toda la información que aporta la amplitud externa.' },
            { title: 'Salto con el ansatz par', text: '$-\\kappa Fe^{-\\kappa a}-\\kappa B(e^{\\kappa a}-e^{-\\kappa a}) = -\\frac{2m\\alpha}{\\hbar^2}B(e^{\\kappa a}+e^{-\\kappa a})$; sustituye $F$, reordena y queda $\\frac{\\hbar^2\\kappa}{m\\alpha} = 1+e^{-2\\kappa a}$.' },
            { title: 'El impar sale gratis', text: 'Repitiendo con $B(e^{\\kappa x}-e^{-\\kappa x})$ solo cambia un signo: $\\frac{\\hbar^2\\kappa}{m\\alpha} = 1-e^{-2\\kappa a}$; la paridad hace todo el trabajo pesado.' },
            { title: 'Variables compactas', text: 'Con $z\\equiv 2\\kappa a$ y $c\\equiv\\hbar^2/2am\\alpha$ ambas quedan como recta contra exponencial: $e^{-z} = cz-1$ (par) y $e^{-z} = 1-cz$ (impar).' },
            { title: 'Solución gráfica', text: 'Dibuja $e^{-z}$ y las dos rectas: cada intersección es un estado ligado con $E = -\\hbar^2z^2/8ma^2$; contarlas para $c=\\frac12$ y $c=2$ responde el apartado (b).' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Cuenta intersecciones de las gráficas: la rama par siempre corta una vez; la impar solo si la recta es lo bastante tendida. Comprueba además que en el límite de pozos muy separados ($a$ grande) ambas energías tienden a la del pozo delta simple — dos copias independientes del pozo de la sección 2.5.',
        application: {
          steps: [
            { title: 'El par siempre existe', text: 'En $z=0$ la exponencial vale $1$ y la recta $cz-1$ vale $-1$; como $e^{-z}$ decrece y la recta crece, cortan exactamente una vez para cualquier $c$.' },
            { title: 'Cuándo nace el impar', text: 'La recta $1-cz$ debe ser más tendida que la pendiente inicial de $e^{-z}$: solo si $c<1$, es decir $\\alpha>\\hbar^2/2ma$; por eso con $\\alpha = \\hbar^2/4ma$ ($c=2$) sobrevive únicamente el estado par.' },
            { title: 'Pozos muy separados', text: 'Con $a\\to\\infty$ se apaga $e^{-2\\kappa a}$ y ambas ecuaciones dan $\\kappa = m\\alpha/\\hbar^2$, o sea $E = -m\\alpha^2/2\\hbar^2$: cada pozo se comporta como el delta simple de la sección 2.5.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(b) Ecuaciones: par $\\Rightarrow e^{-z} = cz - 1$; impar $\\Rightarrow e^{-z} = 1 - cz$, con $z \\equiv 2\\kappa a$, $c \\equiv \\hbar^2/2am\\alpha$. **Un estado ligado** (el par) si $\\alpha \\leq \\hbar^2/2ma$; **dos** (par e impar) si $\\alpha > \\hbar^2/2ma$. Para $\\alpha = \\hbar^2/ma$ ($c = \\frac{1}{2}$): $z = 2.21772$ (par) y $z = 1.59362$ (impar), con $E = -0.615\\,(\\hbar^2/ma^2)$ y $E = -0.317\\,(\\hbar^2/ma^2)$. Para $\\alpha = \\hbar^2/4ma$ ($c = 2$): solo el par, $z = 0.738835$, $E = -0.0682\\,(\\hbar^2/ma^2)$.',
      page: 32,
    },
  },
  'bp-2-27': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'La cara de *dispersión* del Problema 2.26: misma geometría de doble delta pero con $E > 0$, ondas viajeras y coeficiente de transmisión. Es un problema largo de álgebra con condiciones de frontera, pero sin ningún concepto nuevo respecto a la sección 2.5.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'El mismo $V(x) = -\\alpha[\\delta(x+a)+\\delta(x-a)]$ del 2.26, pero ahora con $E>0$: ondas $e^{\\pm ikx}$ y como objetivo el coeficiente de transmisión.' },
            { title: 'Aquí sí vale |F/A|²', text: 'Como el potencial vuelve a cero a ambos lados, la onda transmitida lleva el mismo $k$ que la incidente y $T = |F/A|^2$ sin factores de velocidad (compáralo con el 2.33).' },
            { title: 'Solo álgebra', text: 'Las condiciones de frontera son las mismas cuatro que en 2.26: $\\psi$ continua en $\\pm a$ y $\\psi\'$ con salto $-\\frac{2m\\alpha}{\\hbar^2}\\psi(\\pm a)$; el reto es eliminar $B$, $C$, $D$ con orden.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Ansatz estándar en tres regiones: $Ae^{ikx} + Be^{-ikx}$ a la izquierda, mezcla $Ce^{ikx} + De^{-ikx}$ en medio y $Fe^{ikx}$ a la derecha. Plantea las cuatro condiciones (continuidad en $\\pm a$ y salto de $\\psi\'$ en $\\pm a$) y abrevia $\\beta \\equiv e^{-2ika}$, $\\gamma \\equiv i2m\\alpha/\\hbar^2 k$ para que el álgebra respire.',
        application: {
          steps: [
            { title: 'El ansatz en tres regiones', text: '$\\psi = Ae^{ikx}+Be^{-ikx}$ para $x<-a$, $Ce^{ikx}+De^{-ikx}$ en $|x|<a$ y $Fe^{ikx}$ para $x>a$: incidente más reflejada a la izquierda, solo transmitida a la derecha.' },
            { title: 'Las cuatro condiciones', text: 'Continuidad de $\\psi$ en $x=\\pm a$ y salto $\\psi\'(\\pm a^+)-\\psi\'(\\pm a^-) = -\\frac{2m\\alpha}{\\hbar^2}\\psi(\\pm a)$: cuatro ecuaciones lineales para las amplitudes.' },
            { title: 'Abreviaturas que respiran', text: 'Al dividir cada condición por $e^{\\pm ika}$ todo se escribe con $\\beta\\equiv e^{-2ika}$ y $\\gamma\\equiv i2m\\alpha/\\hbar^2k$: por ejemplo, la continuidad en $+a$ queda $C+\\beta D = F$.' },
            { title: 'La meta', text: 'Todo el proceso debe reducirse a la razón $F/A$; $B$, $C$ y $D$ son escalones intermedios que se eliminan en cadena.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'No despejes todo a la vez: usa las condiciones en $+a$ para expresar $C$ y $D$ en función de $F$, luego las de $-a$ para montar dos ecuaciones lineales en $A$, $B$, $F$; elimina $B$ y quédate con $F/A$. Para $T = |F/A|^2$, suma los cuadrados de las partes real e imaginaria del denominador.',
        application: {
          steps: [
            { title: 'C y D según F', text: 'En $+a$ las dos condiciones son $C+\\beta D = F$ y $-C+\\beta D = (\\gamma-1)F$; sumándolas y restándolas: $C = \\frac{2-\\gamma}{2}F$ y $D = \\frac{\\gamma}{2\\beta}F = \\frac{\\gamma}{2}e^{2ika}F$.' },
            { title: 'Sistema en -a', text: 'Multiplicando las condiciones de $-a$ por $e^{ika}$ quedan $A+\\frac{B}{\\beta} = C+\\frac{D}{\\beta}$ y $C-A+\\frac{B-D}{\\beta} = \\gamma\\left(A+\\frac{B}{\\beta}\\right)$.' },
            { title: 'Elimina B', text: 'De la primera, $C-A = \\frac{B-D}{\\beta}$; sustituido en la segunda da $B(2-\\gamma) = 2D+\\gamma\\beta A$, y al volver a la primera queda $2A = (2-\\gamma)C-\\frac{\\gamma D}{\\beta}$.' },
            { title: 'La razón F/A', text: 'Con $C$ y $D$ dentro: $\\frac{A}{F} = \\frac{(2-\\gamma)^2-\\gamma^2e^{4ika}}{4}$; con $g\\equiv\\hbar^2k/2m\\alpha$ (de modo que $\\gamma = i/g$) y $\\phi\\equiv 4ka$: $\\frac{F}{A} = \\frac{4g^2}{4g^2-4ig+e^{i\\phi}-1}$.' },
            { title: 'Módulo al cuadrado', text: 'El denominador tiene parte real $4g^2-1+\\cos\\phi$ e imaginaria $\\sin\\phi-4g$; su módulo al cuadrado es $2[(8g^4+4g^2+1)+(4g^2-1)\\cos\\phi-4g\\sin\\phi]$, de donde $T = \\frac{8g^4}{(8g^4+4g^2+1)+(4g^2-1)\\cos\\phi-4g\\sin\\phi}$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Dos límites que atan todos los errores: $\\alpha \\to 0$ debe dar $T = 1$, y $a \\to 0$ debe reproducir la $T$ de un pozo delta simple con la fuerza combinada de ambos pozos. Si alguno falla, revisa los signos de las exponenciales $e^{\\pm ika}$.',
        application: {
          steps: [
            { title: 'Límite sin pozos', text: 'Si $\\alpha\\to0$ entonces $g\\to\\infty$ y $T\\to\\frac{8g^4}{8g^4} = 1$: transmisión perfecta, como corresponde a $V = 0$.' },
            { title: 'Pozos fusionados', text: 'Con $a\\to0$ es $\\phi\\to0$ y $T\\to\\frac{8g^4}{8g^4+8g^2} = \\frac{g^2}{g^2+1}$: exactamente la $T$ de la Ec. 2.123 para un pozo delta de fuerza $2\\alpha$.' },
            { title: 'Revisa las fases', text: 'Si los límites fallan, repasa las fases $e^{\\pm ika}$ con que dividiste las condiciones y el signo del salto: son los dos sitios donde se cuelan los errores.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$T = \\left|\\frac{F}{A}\\right|^2 = \\dfrac{8g^4}{(8g^4 + 4g^2 + 1) + (4g^2 - 1)\\cos\\phi - 4g\\sin\\phi}$, con $g \\equiv \\dfrac{\\hbar^2 k}{2m\\alpha}$ y $\\phi \\equiv 4ka$.',
      page: 33,
    },
  },
  'bp-2-28': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'La réplica *impar* del análisis que el libro hace para los estados pares del pozo finito (sección 2.6): misma estrategia, cambiando cosenos por senos. La pregunta final —si existe siempre un estado impar— es el punto interesante: compara cómo nacen las ramas de tu ecuación respecto a las del caso par.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Es la versión impar del análisis de la sección 2.6 para el pozo $-V_0$ en $|x|<a$: deducir la ecuación trascendente de las energías impares, resolverla gráficamente y examinar los límites.' },
            { title: 'Estrategia calcada', text: 'El texto obtuvo la condición par resolviendo en $x>0$ y empalmando en $x=a$; tú harás lo mismo cambiando $\\cos$ por $\\sin$, y tu gráfica será de $-\\cot z$ contra la semicircunferencia de la Fig. 2.19.' },
            { title: 'La pregunta del final', text: 'El estado par siempre existe (el texto lo dice); el enunciado pregunta si el impar también: la respuesta está en dónde nacen las ramas de tu ecuación.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Por simetría basta trabajar en $x > 0$: $\\psi = D\\sin(lx)$ dentro y $Fe^{-\\kappa x}$ fuera, extendiendo con $\\psi(-x) = -\\psi(x)$. Impón continuidad de $\\psi$ y de $\\psi\'$ en $x = a$ y *divide* las dos ecuaciones para eliminar $D$ y $F$.',
        application: {
          steps: [
            { title: 'Onda por regiones', text: 'Para $0<x<a$: $\\psi = D\\sin(lx)$ con $l = \\sqrt{2m(E+V_0)}/\\hbar$; para $x>a$: $Fe^{-\\kappa x}$ con $\\kappa = \\sqrt{-2mE}/\\hbar$; la condición $\\psi(-x) = -\\psi(x)$ extiende todo al lado izquierdo.' },
            { title: 'Empalme en x = a', text: 'Continuidad: $D\\sin(la) = Fe^{-\\kappa a}$; derivada: $Dl\\cos(la) = -\\kappa Fe^{-\\kappa a}$, donde el $-\\kappa$ viene de derivar la exponencial que decae.' },
            { title: 'Divide y elimina', text: 'Dividiendo la segunda entre la primera desaparecen $D$ y $F$: $l\\cot(la) = -\\kappa$, la gemela impar de la condición del texto $l\\tan(la) = \\kappa$.' },
            { title: 'Variables del texto', text: 'Pásalo a $z = la$ y $z_0 = \\frac{a}{\\hbar}\\sqrt{2mV_0}$ para poder comparar tu gráfica directamente con la del libro.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'La división da $-\\kappa = l\\cot(la)$; en las variables del texto ($z = la$, $z_0$) queda $-\\cot z = \\sqrt{(z_0/z)^2 - 1}$, lista para resolver gráficamente. Las ramas de $-\\cot z$ nacen en $z = \\pi/2,\\,3\\pi/2,\\dots$: fíjate desde dónde puede "alcanzar" la semicircunferencia.',
        application: {
          steps: [
            { title: 'Traduce a z', text: 'De $l^2+\\kappa^2 = 2mV_0/\\hbar^2$ sale $\\kappa a = \\sqrt{z_0^2-z^2}$; sustituyendo en $\\kappa = -l\\cot(la)$ y dividiendo por $z$ queda $-\\cot z = \\sqrt{(z_0/z)^2-1}$.' },
            { title: 'Forma alternativa', text: 'Elevando al cuadrado y usando $1+\\cot^2 z = 1/\\sin^2 z$ se reescribe como $z_0 = z/\\sin z$: práctica para estimar raíces sin gráfica.' },
            { title: 'Dónde vive cada rama', text: 'Cada rama de $-\\cot z$ crece de $0$ a $+\\infty$ en los intervalos $(\\pi/2,\\pi)$, $(3\\pi/2,2\\pi)$, ... y solo ahí puede cortar a la otra curva.' },
            { title: 'Contra la semicircunferencia', text: '$\\sqrt{(z_0/z)^2-1}$ solo existe para $z\\le z_0$ y decrece de $\\infty$ a $0$: la primera rama tiene intersección solo si $z_0$ supera $\\pi/2$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'En el límite de pozo ancho y profundo, las intersecciones deben acercarse a $z = \\pi, 2\\pi, 3\\pi,\\dots$ (los niveles del pozo infinito de anchura $2a$ con $n$ par), complementando los estados pares que ya estudió el texto. Para la pregunta final, estudia qué le pasa a la primera rama cuando $z_0$ se hace pequeño.',
        application: {
          steps: [
            { title: 'Pozo ancho y profundo', text: 'Con $z_0\\to\\infty$ las intersecciones se pegan a las asíntotas de $-\\cot z$: $z = \\pi, 2\\pi, 3\\pi,\\dots$, los niveles $n$ pares del pozo infinito de anchura $2a$ que faltaban a los pares ($z = \\pi/2, 3\\pi/2,\\dots$).' },
            { title: 'Pozo débil', text: 'Si $z_0 < \\pi/2$ la curva se apaga antes de que nazca la primera rama: no hay estado impar; el umbral es $z_0^2 = \\pi^2/4$, es decir $V_0 = \\frac{\\pi^2\\hbar^2}{8ma^2}$.' },
            { title: 'Responde la pregunta', text: 'No: no siempre existe un estado impar; en un pozo poco profundo solo hay un estado ligado y es par.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: 'Ecuación trascendente (estados impares): $-\\cot z = \\sqrt{(z_0/z)^2 - 1}$. Pozo ancho y profundo: las intersecciones están en $z = \\pi, 2\\pi, 3\\pi,\\dots$ (como la Ec. 2.157 pero ahora para $n$ par — completa los estados del pozo infinito). Pozo poco profundo y estrecho: si $z_0 < \\pi/2$ **no hay ningún estado ligado impar**, es decir, $V_0 < \\frac{\\pi^2\\hbar^2}{8ma^2}$.',
      page: 34,
    },
  },
  'bp-2-29': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Normalización de los *estados pares del pozo finito*: la Ec. 2.133 del libro ya trae la forma de $\\psi$, así que solo quedan por fijar $D$ y $F$. La clave es que la continuidad ya relaciona $F$ con $D$, y todo se reduce a una integral con una sola incógnita.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'La Ec. 2.133 ya trae la forma de los estados pares: $\\psi = D\\cos(lx)$ en $|x|<a$ y $Fe^{-\\kappa|x|}$ fuera; normalizar es fijar $D$ y $F$ con $\\int_{-\\infty}^{\\infty}|\\psi|^2dx = 1$.' },
            { title: 'Menos incógnitas de lo que parece', text: 'La continuidad en $x=a$ ya relaciona $F$ con $D$: $F = De^{\\kappa a}\\cos(la)$; queda una sola constante independiente.' },
            { title: 'La hoja de ruta', text: 'Explota la paridad, deja todo en función de $|D|^2$ y usa la condición de empalme $\\kappa = l\\tan(la)$ para que el corchete final colapse.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Explota la paridad ($\\int_{-\\infty}^{\\infty} = 2\\int_0^{\\infty}$) y trabaja con $\\psi = D\\cos(lx)$ en $(0, a)$ y $Fe^{-\\kappa x}$ en $(a, \\infty)$. Sustituye $F = De^{\\kappa a}\\cos(la)$ para que quede todo en función de $|D|^2$.',
        application: {
          steps: [
            { title: 'Normaliza solo medio eje', text: 'Como $\\psi$ es par: $2\\int_0^{\\infty}|\\psi|^2dx = 1$, con $\\psi = D\\cos(lx)$ en $(0,a)$ y $Fe^{-\\kappa x}$ en $(a,\\infty)$.' },
            { title: 'Todo en términos de D', text: 'Sustituye $F = De^{\\kappa a}\\cos(la)$ para que también la cola exponencial quede multiplicando a $|D|^2$.' },
            { title: 'La ecuación de D', text: 'Queda $|D|^2\\left[\\int_0^a\\cos^2(lx)dx+e^{2\\kappa a}\\cos^2(la)\\int_a^{\\infty}e^{-2\\kappa x}dx\\right] = \\frac{1}{2}$: una integral con una sola incógnita.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Las integrales son de tabla: $\\int\\cos^2(lx)dx = x/2 + \\sin(2lx)/4l$ y la exponencial es inmediata. Al aparecer $\\sin(2la)$ y $\\cos^2(la)$, usa la condición $\\kappa = l\\tan(la)$ del texto y la identidad $\\sin(2la) = 2\\sin(la)\\cos(la)$: el resultado colapsa solo.',
        application: {
          steps: [
            { title: 'Integra de tabla', text: '$\\int_0^a\\cos^2(lx)dx = \\frac{a}{2}+\\frac{\\sin(2la)}{4l}$ y $\\int_a^{\\infty}e^{-2\\kappa x}dx = \\frac{e^{-2\\kappa a}}{2\\kappa}$; la cola aporta $e^{2\\kappa a}\\cos^2(la)\\cdot\\frac{e^{-2\\kappa a}}{2\\kappa} = \\frac{\\cos^2(la)}{2\\kappa}$.' },
            { title: 'El corchete', text: 'Multiplicando por 2: $|D|^2\\left[a+\\frac{\\sin(2la)}{2l}+\\frac{\\cos^2(la)}{\\kappa}\\right] = 1$; el trabajo restante es demostrar que el corchete vale $a+\\frac{1}{\\kappa}$.' },
            { title: 'Identidad de ángulo doble', text: 'Con $\\sin(2la) = 2\\sin(la)\\cos(la)$, los dos últimos términos son $\\frac{\\sin(la)\\cos(la)}{l}+\\frac{\\cos^2(la)}{\\kappa}$.' },
            { title: 'Usa el empalme', text: 'De $\\kappa = l\\tan(la)$ sale $\\frac{\\cos^2(la)}{\\kappa} = \\frac{\\cos^3(la)}{l\\sin(la)}$; sumando: $\\frac{\\cos(la)}{l\\sin(la)}\\left[\\sin^2(la)+\\cos^2(la)\\right] = \\frac{1}{l\\tan(la)} = \\frac{1}{\\kappa}$.' },
            { title: 'Las dos constantes', text: 'Por tanto $D = \\frac{1}{\\sqrt{a+1/\\kappa}}$ y, arrastrando la continuidad, $F = \\frac{e^{\\kappa a}\\cos(la)}{\\sqrt{a+1/\\kappa}}$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Comprueba que $D$ y $F$ quedan en unidades de $\\ell^{-1/2}$ y que la combinación final de longitudes es consistente. El mejor test: en el límite $V_0 \\to \\infty$ (donde $1/\\kappa \\to 0$) debes recuperar la normalización del pozo infinito de anchura $2a$ para el estado par.',
        application: {
          steps: [
            { title: 'Unidades', text: '$a+1/\\kappa$ es una longitud, así que $D$ y $F$ salen en $\\ell^{-1/2}$: las unidades propias de una función de onda normalizada en una dimensión.' },
            { title: 'Límite V0 → ∞', text: 'Entonces $\\kappa\\to\\infty$ y $D\\to\\frac{1}{\\sqrt a}$: la normalización de $\\cos(\\pi x/2a)$ en el pozo infinito de anchura $2a$, que es lo que debe ocurrir.' },
            { title: 'La cola se esfuma', text: 'La altura de la cola en el borde, $Fe^{-\\kappa a} = D\\cos(la)$, tiende a cero igual que la penetración $1/\\kappa$: el estado se convierte en el del pozo infinito.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$D = \\dfrac{1}{\\sqrt{a + 1/\\kappa}}$; $F = \\dfrac{e^{\\kappa a}\\cos(la)}{\\sqrt{a + 1/\\kappa}}$.',
      page: 34,
    },
  },
  'bp-2-30': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Un problema de *límites entre potenciales*: el pozo delta es un pozo finito con $a \\to 0$ y $V_0 \\to \\infty$ manteniendo el área constante. El protagonista es $z_0$ (el parámetro que mide la "profundidad"): hay que mostrar que en este límite se desvanece y rastrear las ecuaciones del texto en ese régimen.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'El pozo delta $-\\alpha\\delta(x)$ de la Ec. 2.96 es el límite del pozo finito $-V_0$ en $|x|<a$ cuando $a\\to0$ y $V_0\\to\\infty$ con el área $2aV_0 = \\alpha$ fija: hay que rastrear las ecuaciones del texto en ese límite.' },
            { title: 'El parámetro decisivo', text: 'La "profundidad efectiva" del pozo finito es $z_0 = \\frac{a}{\\hbar}\\sqrt{2mV_0}$, el radio del círculo de la solución gráfica; el enunciado pide mostrar que aquí $z_0\\to0$.' },
            { title: 'Las dos comprobaciones', text: 'La energía del estado ligado debe reproducir la Ec. 2.111 y la Ec. 2.151 (la $T$ del pozo finito) debe colapsar sobre la Ec. 2.123 (la $T$ del delta): son los dos tests que pide el enunciado.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Empieza fijando el área: $2aV_0 = \\alpha$ constante, o sea $V_0 = \\alpha/2a$. Sustituye en $z_0 = \\frac{a}{\\hbar}\\sqrt{2mV_0}$ y muestra que $z_0 \\to 0$ — así, la intersección de la figura del texto ocurre a $z$ muy pequeño.',
        application: {
          steps: [
            { title: 'Fija el área', text: 'Escribe $V_0 = \\alpha/2a$ para que el rectángulo del pozo finito tenga exactamente la misma área que la delta cuando $a\\to0$.' },
            { title: 'Calcula z0', text: 'Sustituyendo: $z_0^2 = \\frac{2mV_0a^2}{\\hbar^2} = \\frac{m\\alpha a}{\\hbar^2}\\to0$, o sea $z_0 = \\frac{1}{\\hbar}\\sqrt{m\\alpha a}$: el pozo es "débil" aunque $V_0$ sea infinito.' },
            { title: 'Dónde queda la intersección', text: 'La raíz par cumple $z\\le z_0$ (pues $\\kappa a = \\sqrt{z_0^2-z^2}$), así que también ella tiende a cero: eso autoriza las expansiones para $z$ pequeño.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Con $z$ pequeño expande $\\tan z \\approx z$ en la ecuación del estado par: el álgebra se encadena sola y aparece $\\kappa a \\approx z_0^2$; al expresar $z_0$ en función de $\\alpha$ y $a$, las $a$ se cancelan — señal de que el límite está bien tomado. Traduce $\\kappa$ a energía con $E = -\\hbar^2\\kappa^2/2m$.',
        application: {
          steps: [
            { title: 'Expande la ecuación par', text: 'La condición de empalme par es $\\kappa a = z\\tan z$ con $z^2+(\\kappa a)^2 = z_0^2$; usando $\\tan z\\approx z$ queda $z_0^2\\approx z^2(1+z^2)$, de donde $z\\approx z_0$ y $\\kappa a\\approx z^2\\approx z_0^2$.' },
            { title: 'κ sin rastro de a', text: '$\\kappa = \\frac{z_0^2}{a} = \\frac{2mV_0a^2/\\hbar^2}{a} = \\frac{m(2aV_0)}{\\hbar^2} = \\frac{m\\alpha}{\\hbar^2}$: la anchura se cancela, señal de que el límite está bien tomado.' },
            { title: 'La energía', text: 'Con $E = -\\frac{\\hbar^2\\kappa^2}{2m}$ sale $E = -\\frac{m\\alpha^2}{2\\hbar^2}$, que es la energía del pozo delta.' },
            { title: 'La T del pozo finito', text: 'En la Ec. 2.151 el argumento del seno es $\\epsilon = \\frac{2a}{\\hbar}\\sqrt{2m(E+V_0)}\\to0$; con $\\sin\\epsilon\\approx\\epsilon$ y $E+V_0\\approx V_0$, el término extra queda $\\frac{V_0}{4E}\\cdot\\frac{8ma^2V_0}{\\hbar^2} = \\frac{m\\alpha^2}{2\\hbar^2E}$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'La energía final debe coincidir con la Ec. 2.111 del libro — es exactamente la comprobación que pide el enunciado. Para la segunda parte, toma la Ec. 2.151 con $V_0 \\gg E$, sustituye el área y usa $\\sin\\epsilon \\approx \\epsilon$: debe colapsar sobre la Ec. 2.123.',
        application: {
          steps: [
            { title: 'z0 se desvanece', text: 'Con el área fija, $z_0 = \\sqrt{m\\alpha a}/\\hbar\\to0$ aunque $V_0 = \\alpha/2a\\to\\infty$: "profundo" no implica "fuerte", porque $z_0$ mide el área, no la profundidad.' },
            { title: 'Test contra la Ec. 2.111', text: 'La energía $E = -m\\alpha^2/2\\hbar^2$ coincide con la del estado ligado del delta calculada directamente en la sección 2.5: primer check del enunciado cerrado.' },
            { title: 'Test contra la Ec. 2.123', text: 'La Ec. 2.151 reducida da $T^{-1} = 1+\\frac{m\\alpha^2}{2\\hbar^2E}$, la $T$ del pozo delta: el límite es consistente también por el lado de la dispersión.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: 'Con el área $2aV_0 = \\alpha$ fija, $z_0 = \\frac{1}{\\hbar}\\sqrt{m\\alpha a} \\to 0$. La energía del estado ligado resulta $E = -\\frac{m\\alpha^2}{2\\hbar^2}$ (coincide con la Ec. 2.111), y la Ec. 2.151 se reduce a $T^{-1} = 1 + \\frac{m\\alpha^2}{2\\hbar^2 E}$ (coincide con la Ec. 2.123).',
      page: 35,
    },
  },
  'bp-2-31': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'El *backstage del pozo finito*: el libro escribe las Ecs. 2.149 y 2.150 sin mostrar el álgebra, y este problema te pide reconstruirla. Es un ejercicio de eliminación lineal con las cuatro condiciones de frontera — y el propio enunciado te regala el primer paso ($C$ y $D$ en función de $F$).',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Dispersión por el pozo finito $-V_0$ en $|x|<a$: fuera ondas $e^{\\pm ikx}$ y dentro $C\\sin(lx)+D\\cos(lx)$ con $l = \\sqrt{2m(E+V_0)}/\\hbar$; las Ecs. 2.145–2.148 son sus cuatro condiciones de frontera.' },
            { title: 'Lo que oculta el texto', text: 'El libro salta de las condiciones de frontera a las Ecs. 2.149 y 2.150 ($B$ en función de $F$ y $F$ en función de $A$) sin mostrar la eliminación; reconstruirla es el encargo.' },
            { title: 'Lo que te regalan', text: 'El enunciado ya resolvió las condiciones en $x=+a$ (Ecs. 2.147–2.148): $C = [\\sin(la)+i\\frac{k}{l}\\cos(la)]e^{ika}F$ y $D = [\\cos(la)-i\\frac{k}{l}\\sin(la)]e^{ika}F$; solo queda sustituir.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Con $C$ y $D$ ya expresados en términos de $F$, sustitúyelos en las condiciones de frontera de $x = -a$ (las Ecs. 2.145–2.146): obtendrás dos ecuaciones lineales que relacionan $A$, $B$ y $F$. Suma y réstalas para desacoplar y despeja $B$ y $F$ en función de $A$.',
        application: {
          steps: [
            { title: 'Sustituye en las de -a', text: 'Las Ecs. 2.145–2.146 leen $-C\\sin(la)+D\\cos(la) = Ae^{-ika}+Be^{ika}$ y $l[C\\cos(la)+D\\sin(la)] = ik[Ae^{-ika}-Be^{ika}]$: mete ahí tus $C(F)$ y $D(F)$.' },
            { title: 'Organiza las exponenciales', text: 'Multiplica cada ecuación por $e^{ika}$ para que los combinados sean $A+Be^{2ika}$ y $A-Be^{2ika}$: sumarlos y restarlos los desacopla limpiamente.' },
            { title: 'El orden de los despejes', text: 'Primero saldrá $B$ en función de $F$ (Ec. 2.149) y luego $F$ en función de $A$ (Ec. 2.150); de ahí $T = |F/A|^2$ y $R = |B/A|^2$ con su suma $T+R = 1$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'El truco de las combinaciones: multiplica las ecuaciones de continuidad por $\\sin(la)$ y $\\cos(la)$ y súmalas o réstalas para que los términos cruzados $\\sin\\cdot\\cos$ se cancelen; al final, las identidades de ángulo doble compactan todo en $\\cos(2la)$ y $\\sin(2la)$. Para $T$, calcula $|A/F|^2$ módulo al cuadrado.',
        application: {
          steps: [
            { title: 'Continuidad en -a', text: 'Al sustituir, los términos cruzados $\\sin(la)\\cos(la)$ se reúnen en ángulo doble: $-C\\sin(la)+D\\cos(la) = [\\cos(2la)-i\\frac{k}{l}\\sin(2la)]e^{ika}F$.' },
            { title: 'Derivada en -a', text: 'Análogamente: $l[C\\cos(la)+D\\sin(la)] = [l\\sin(2la)+ik\\cos(2la)]e^{ika}F$.' },
            { title: 'Suma y resta', text: 'Con ambas multiplicadas por $e^{ika}$, sumarlas elimina $B$: $2A = e^{2ika}[2\\cos(2la)-i(\\frac{k}{l}+\\frac{l}{k})\\sin(2la)]F$; restarlas elimina $A$ y entrega $B$.' },
            { title: 'Las ecuaciones del libro', text: 'Queda $B = i\\frac{\\sin(2la)}{2kl}(l^2-k^2)F$ (Ec. 2.149) y $F = \\frac{e^{-2ika}A}{\\cos(2la)-i\\frac{k^2+l^2}{2kl}\\sin(2la)}$ (Ec. 2.150).' },
            { title: 'La transmisión', text: 'De $A/F$ sale $|A/F|^2 = \\cos^2(2la)+\\frac{(k^2+l^2)^2}{4k^2l^2}\\sin^2(2la) = 1+\\frac{(k^2-l^2)^2}{4k^2l^2}\\sin^2(2la)$; con $\\hbar^2k^2 = 2mE$ y $\\hbar^2l^2 = 2m(E+V_0)$ es la Ec. 2.151.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Con $V_0 = 0$ (es decir, $l = k$) debe salir $B = 0$ y $F = A$: transmisión perfecta sin potencial. Y el chequeo $T + R = 1$ del enunciado debe reducirse a la identidad $(k+l)^2 = 4kl + (k-l)^2$.',
        application: {
          steps: [
            { title: 'Sin potencial', text: 'Con $V_0 = 0$ es $l = k$: $B = 0$ y el denominador de $F/A$ es $\\cos(2ka)-i\\sin(2ka) = e^{-2ika}$, así que $F = A$: transmisión perfecta.' },
            { title: 'La identidad T + R', text: 'Con $T$ y $R = |B/A|^2$ sobre el mismo denominador, la suma $T+R = 1$ se reduce a $(k^2+l^2)^2 = (l^2-k^2)^2+4k^2l^2$, equivalente a la identidad $(k+l)^2 = 4kl+(k-l)^2$ que anuncia el enunciado.' },
            { title: 'Coherencia de fases', text: 'El factor $e^{-2ika}$ de la Ec. 2.150 es puro reflejo del origen de fases; al tomar módulos cuadrados desaparece, y $T$ y $R$ no dependen de él.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$B = i\\,\\frac{\\sin(2la)}{2kl}(l^2 - k^2)F$ (confirma la Ec. 2.149); $F = \\dfrac{e^{-2ika}A}{\\cos(2la) - i\\sin(2la)\\,\\frac{k^2 + l^2}{2kl}}$ (confirma la Ec. 2.150); $T^{-1} = 1 + \\dfrac{V_0^2}{4E(E + V_0)}\\sin^2\\!\\left(\\frac{2a}{\\hbar}\\sqrt{2m(E + V_0)}\\right)$ (confirma la Ec. 2.151).',
      page: 36,
      note: 'El solucionario no desarrolla $R$ aparte: se sigue de $R = |B/A|^2$, que da exactamente $R = 1 - T$.',
    },
  },
  'bp-2-32': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'La *barrera rectangular*: hermana del pozo finito con el signo cambiado, y con tres regímenes cualitativamente distintos según $E$ frente a $V_0$. Reconocer qué forma tiene $\\psi$ *dentro* de la barrera en cada caso (exponencial real, línea recta, onda) es la mitad del problema.',
        application: {
          steps: [
            { title: 'Clasifica la geometría', text: 'Barrera de altura $+V_0$ en $-a < x < a$: a la izquierda $Ae^{ikx} + Be^{-ikx}$, a la derecha $Fe^{ikx}$, con $k = \\sqrt{2mE}/\\hbar$. Como el potencial vuelve a cero a ambos lados, aquí sí vale $T = |F/A|^2$.' },
            { title: 'Los tres regímenes internos', text: 'Dentro de la barrera la forma de $\\psi$ depende del caso: para $E < V_0$ es evanescente, $Ce^{\\kappa x} + De^{-\\kappa x}$ con $\\kappa = \\sqrt{2m(V_0-E)}/\\hbar$; para $E = V_0$ la ecuación da $\\psi^{\\prime\\prime} = 0$, o sea $C + Dx$; para $E > V_0$ es oscilatoria con $l = \\sqrt{2m(E-V_0)}/\\hbar$.' },
            { title: 'La estrategia global', text: 'El caso $E > V_0$ es el pozo finito del problema 2.31 con $V_0 \\to -V_0$, así que su $T$ sale reutilizando la Ec. 2.151. El cálculo genuinamente nuevo es el de $E < V_0$, y el caso crítico $E = V_0$ se resuelve aparte con la solución lineal.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Caso $E < V_0$: dentro de la barrera $\\psi = Ce^{\\kappa x} + De^{-\\kappa x}$ con $\\kappa = \\sqrt{2m(V_0-E)}/\\hbar$; impón las cuatro condiciones en $\\pm a$ y elimina $C, D$. El caso $E = V_0$ se trata aparte: dentro la ecuación de Schrödinger da $\\psi^{\\prime\\prime} = 0$, o sea $\\psi = C + Dx$.',
        application: {
          steps: [
            { title: 'Escoge el ansatz por regiones', text: 'Región I: $Ae^{ikx} + Be^{-ikx}$; región II: $Ce^{\\kappa x} + De^{-\\kappa x}$; región III: solo $Fe^{ikx}$, porque no entra onda desde la derecha. En II conserva ambas exponenciales: la barrera es finita y ninguna se dispara.' },
            { title: 'Escribe las cuatro condiciones', text: 'Impón continuidad de $\\psi$ y de $\\psi^{\\prime}$ en $x = +a$ y en $x = -a$: son cuatro ecuaciones lineales para $A, B, C, D, F$. El objetivo es eliminar $C$ y $D$ y quedarte con $|A/F|^2 = T^{-1}$.' },
            { title: 'El caso E = V0 va aparte', text: 'Con $E = V_0$ el interior se resuelve con $\\psi = C + Dx$ y las mismas cuatro condiciones. No lo saltes ni lo postergues: este caso crítico servirá de juez de consistencia de los otros dos.' },
            { title: 'Hacia el coeficiente pedido', text: 'Al final tendrás $A/F$ en función de $k$, $\\kappa$ y $a$; conviértelo a energías con $\\hbar^2 k^2 = 2mE$ y $\\hbar^2 \\kappa^2 = 2m(V_0 - E)$. Así podrás comparar directamente con la respuesta parcial del enunciado.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'En el caso $E < V_0$, las combinaciones $e^{\\kappa x} \\pm e^{-\\kappa x}$ se convierten en $\\cosh$ y $\\sinh$ con argumento $2\\kappa a$. Para $E > V_0$ no repitas todo el cálculo: razona qué cambia al sustituir $\\kappa \\to il$ y reutiliza el resultado del pozo (el texto hizo lo mismo al pasar de la Ec. 2.129 a la 2.141).',
        application: {
          steps: [
            { title: 'Despeja C y D primero', text: 'Las condiciones en $x = +a$ dan $C = \\frac{F e^{ika}}{2}\\, e^{-\\kappa a}\\left(1 + i\\frac{k}{\\kappa}\\right)$ y $D = \\frac{F e^{ika}}{2}\\, e^{\\kappa a}\\left(1 - i\\frac{k}{\\kappa}\\right)$. Sustitúyelas en las dos condiciones de $x = -a$.' },
            { title: 'Aísla la amplitud incidente', text: 'En $x = -a$ queda $P + Q = Ae^{-ika} + Be^{ika}$ y $\\kappa(P - Q) = ik(Ae^{-ika} - Be^{ika})$, con $P = Ce^{-\\kappa a}$ y $Q = De^{\\kappa a}$. Suma la primera con la segunda dividida por $ik$: $B$ se cancela y queda $2Ae^{-ika}$.' },
            { title: 'Aparecen cosh y sinh', text: 'Los combinados de $P$ y $Q$ reúnen $e^{\\pm 2\\kappa a}$ en funciones hiperbólicas de argumento $2\\kappa a$: $A/F = e^{2ika}\\left[\\cosh(2\\kappa a) + i\\,\\frac{\\kappa^2 - k^2}{2k\\kappa}\\,\\sinh(2\\kappa a)\\right]$. Es el análogo con $\\kappa$ del par $\\cos, \\sin$ del problema 2.31.' },
            { title: 'Cuadrado del módulo', text: 'El corchete es parte real más imaginaria pura, así que $|A/F|^2 = \\cosh^2(2\\kappa a) + \\frac{(\\kappa^2 - k^2)^2}{4k^2\\kappa^2}\\sinh^2(2\\kappa a) = 1 + \\frac{(k^2 + \\kappa^2)^2}{4k^2\\kappa^2}\\sinh^2(2\\kappa a)$, usando $\\cosh^2 = 1 + \\sinh^2$ y $(k^2+\\kappa^2)^2 = 4k^2\\kappa^2 + (\\kappa^2 - k^2)^2$.' },
            { title: 'Los otros dos casos', text: 'Con $k^2 + \\kappa^2 = 2mV_0/\\hbar^2$ y $4k^2\\kappa^2 = (2m)^2 E(V_0 - E)/\\hbar^4$ recuperas la respuesta parcial del enunciado. Para $E = V_0$, el sistema con $\\psi = C + Dx$ da $A/F = e^{2ika}(1 - ika)$, o sea $T^{-1} = 1 + (ka)^2$; para $E > V_0$, sustituye $\\kappa \\to il$ (equivalente a $V_0 \\to -V_0$ en la Ec. 2.151) y queda $T^{-1} = 1 + \\frac{V_0^2}{4E(E - V_0)}\\sin^2\\left(\\frac{2a}{\\hbar}\\sqrt{2m(E - V_0)}\\right)$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'El test de consistencia más potente: los límites $E \\to V_0^{\\pm}$ de las fórmulas de $E < V_0$ y de $E > V_0$ (con $\\sinh\\epsilon \\approx \\epsilon$ y $\\sin\\epsilon \\approx \\epsilon$) deben coincidir con el resultado del caso $E = V_0$. Y con $V_0 \\to 0$ debe salir $T = 1$ en los tres casos.',
        application: {
          steps: [
            { title: 'Empalme en E = V0', text: 'Con $\\epsilon = \\frac{2a}{\\hbar}\\sqrt{2m|V_0 - E|}$ pequeño, $\\sinh\\epsilon \\approx \\epsilon$ y $\\sin\\epsilon \\approx \\epsilon$ llevan las fórmulas de $E < V_0$ y de $E > V_0$ al mismo valor $1 + \\frac{2mV_0^2 a^2}{E\\hbar^2}$, que en $E = V_0$ es exactamente $1 + (ka)^2$. Los tres casos dibujan una única curva continua $T(E)$.' },
            { title: 'Barrera que se esfuma', text: 'Con $V_0 \\to 0$ (o $a \\to 0$) el término correctivo muere y sale $T = 1$ en los tres casos: sin barrera no hay reflexión. En el otro extremo, $E \\to 0$ en la fórmula de $E < V_0$ da $T \\to 0$, como espera la física clásica.' },
            { title: 'Firma del túnel', text: 'Para barrera gruesa con $E < V_0$, $\\sinh^2(2\\kappa a) \\approx \\frac{1}{4}e^{4\\kappa a}$ y $T$ cae exponencialmente, $T \\sim e^{-4\\kappa a}$: es el efecto túnel de la nota 28, imposible clásicamente. Comprueba también que tu $T$ en $E = V_0$ vale $1/(1 + (ka)^2)$: menor que 1, pero no cero.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: 'Para $E < V_0$: $T^{-1} = 1 + \\dfrac{V_0^2}{4E(V_0 - E)}\\sinh^2\\!\\left(\\dfrac{2a}{\\hbar}\\sqrt{2m(V_0 - E)}\\right)$. Para $E = V_0$: $T^{-1} = 1 + (ka)^2 = 1 + \\dfrac{2mE}{\\hbar^2}a^2$. Para $E > V_0$: $T^{-1} = 1 + \\dfrac{V_0^2}{4E(E - V_0)}\\sin^2\\!\\left(\\dfrac{2a}{\\hbar}\\sqrt{2m(E - V_0)}\\right)$.',
      page: 38,
    },
  },
  'bp-2-33': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'El *escalón de potencial*: la discontinuidad más simple posible, y la primera vez que $T$ NO es $|F/A|^2$, porque la onda transmitida viaja a otra velocidad. Distingue bien los casos $E < V_0$ (región evanescente a la derecha) y $E > V_0$ (onda con otro número de onda $l$).',
        application: {
          steps: [
            { title: 'Un solo borde que vigilar', text: 'El escalón sube de $0$ a $V_0$ justo en $x = 0$, así que solo hay dos condiciones de frontera: continuidad de $\\psi$ y de $\\psi^{\\prime}$ en el origen. La onda incidente llega desde la izquierda con amplitud $A$.' },
            { title: 'Dos regímenes a la derecha', text: 'Si $E < V_0$, a la derecha no hay onda propagante: la solución es evanescente y la partícula acaba reflejada. Si $E > V_0$ sí hay onda transmitida, pero con número de onda $l = \\sqrt{2m(E-V_0)}/\\hbar$ distinto de $k$: viaja a otra velocidad.' },
            { title: 'El reparto de los apartados', text: '(a) y (b) piden $R = |B/A|^2$ en cada régimen; (c) demuestra que aquí $T$ no es $|F/A|^2$ sino la Ec. 2.154; (d) compone ambos resultados y exige el chequeo $T + R = 1$. La moraleja física es conservación de flujo, no de amplitudes.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Caso $E < V_0$: $\\psi = Ae^{ikx} + Be^{-ikx}$ para $x < 0$ y $Fe^{-\\kappa x}$ para $x > 0$; impón continuidad de $\\psi$ y de $\\psi^{\\prime}$ en el origen. Caso $E > V_0$: igual pero con $Fe^{ilx}$ y $l = \\sqrt{2m(E - V_0)}/\\hbar$. Son dos ecuaciones lineales por caso: despeja $B/A$.',
        application: {
          steps: [
            { title: 'Ansatz para el caso E<V0', text: 'Para $x < 0$ escribe $Ae^{ikx} + Be^{-ikx}$ con $k = \\sqrt{2mE}/\\hbar$; para $x > 0$, solo $Fe^{-\\kappa x}$ con $\\kappa = \\sqrt{2m(V_0-E)}/\\hbar$. Descarta $e^{+\\kappa x}$ por crecer sin límite: en este régimen no existe onda transmitida.' },
            { title: 'Ansatz para el caso E>V0', text: 'A la derecha la solución es $Fe^{ilx}$, onda que se aleja del escalón con $l = \\sqrt{2m(E - V_0)}/\\hbar$. La continuidad en $x = 0$ da siempre dos ecuaciones, $A + B = F$ y la de las derivadas: queda un cociente de amplitudes por despejar.' },
            { title: 'Despeja los cocientes de amplitud', text: 'Con $E < V_0$, las condiciones leen $A + B = F$ e $ik(A - B) = -\\kappa F$, de donde $\\frac{B}{A} = \\frac{1 + i\\kappa/k}{1 - i\\kappa/k}$, de módulo exactamente 1: reflexión total. Con $E > V_0$ sale $\\frac{B}{A} = \\frac{k - l}{k + l}$, o sea $R = \\frac{(k-l)^2}{(k+l)^2}$.' },
            { title: 'Prepara la parte del flujo', text: 'Para (c) y (d) necesitarás también $\\frac{F}{A}$: combinando $A + B = F$ con el despeje anterior sale $\\frac{F}{A} = \\frac{2k}{k+l}$ con $E > V_0$. Guárdalo: el $T$ de (d) es este módulo al cuadrado, corregido por el factor de velocidad.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Para (c) usa la corriente de probabilidad (Problema 1.9a): $J = (\\hbar k/m)|\\text{amplitud}|^2$ en cada región, y $T = J_{\\text{trans}}/J_{\\text{inc}}$ — el factor de velocidades $l/k$ aparece solo. Para (d), expresa $F/A$ desde tus ecuaciones de (b) y compónlo con el factor correcto de (c).',
        application: {
          steps: [
            { title: 'La ruta de la velocidad clásica', text: 'La Ec. 2.81 asigna a una partícula libre de energía $E$ la velocidad clásica $\\sqrt{2E/m}$, así que la transmitida, con energía cinética $E - V_0$, lleva $v_t/v_i = \\sqrt{(E-V_0)/E} = l/k$. Como el flujo que cruza por segundo es densidad por velocidad, $T = \\frac{v_t |F|^2}{v_i |A|^2}$: esa es la Ec. 2.154.' },
            { title: 'La ruta elegante: corriente J', text: 'Con el Problema 1.9(a), la corriente de una onda plana es $J = \\frac{\\hbar k}{m}|\\text{amplitud}|^2$, proporcional a la velocidad de grupo. Entonces $T = \\frac{J_{\\text{trans}}}{J_{\\text{inc}}} = \\frac{l}{k}\\frac{|F|^2}{|A|^2}$, idéntico a la Ec. 2.154 porque $l/k = \\sqrt{(E-V_0)/E}$.' },
            { title: 'T en el régimen evanescente', text: 'Para $E < V_0$ la cola $Fe^{-\\kappa x}$ no transporta corriente: es real y estacionaria, de modo que $J = 0$ y $T = 0$, aunque $\\psi$ penetre una distancia del orden de $1/\\kappa$. Sin flujo que escape, toda la corriente regresa: $R = 1$.' },
            { title: 'Compón el T del apartado d', text: 'Sustituye $\\frac{F}{A} = \\frac{2k}{k+l}$ en la Ec. 2.154: $T = \\frac{l}{k}\\,\\frac{4k^2}{(k+l)^2} = \\frac{4kl}{(k+l)^2}$. Con la identidad $(\\sqrt{E}+\\sqrt{E-V_0})(\\sqrt{E}-\\sqrt{E-V_0}) = V_0$ también se escribe $T = \\frac{4\\sqrt{E}\\sqrt{E-V_0}(\\sqrt{E}-\\sqrt{E-V_0})^2}{V_0^2}$.' },
            { title: 'El chequeo T + R = 1', text: 'Con $R = \\frac{(k-l)^2}{(k+l)^2}$ y $T = \\frac{4kl}{(k+l)^2}$ la suma da $\\frac{(k-l)^2 + 4kl}{(k+l)^2} = \\frac{(k+l)^2}{(k+l)^2} = 1$ exactamente. Con la definición ingenua $T = |F/A|^2 = \\frac{4k^2}{(k+l)^2}$ la suma solo daría 1 si $k = l$: ese fallo delata el factor de velocidad que falta.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Comprueba que tu $T + R$ da 1 *solo* cuando usas la definición correcta de $T$ con factor de velocidad: si te sale distinto de 1, casi seguro ignoraste la parte (c). Chequeos de límite: $V_0 \\to 0$ debe dar $T \\to 1$, $R \\to 0$; y para $E \\gg V_0$ también $T \\to 1$.',
        application: {
          steps: [
            { title: 'Límites suaves del escalón', text: 'Si $V_0 \\to 0$, entonces $l \\to k$ y $R = \\frac{(k-l)^2}{(k+l)^2} \\to 0$ mientras $T \\to 1$: sin escalón todo se transmite. También $T \\to 1$ cuando $E \\gg V_0$, mientras que $E \\to V_0^{+}$ lleva $l \\to 0$ y $T \\to 0$: al ras del escalón la reflexión vuelve a ser total.' },
            { title: 'Coherencia con el comentario de a', text: 'En (a) obtienes $R = 1$ pese a que $\\psi$ no es cero en $x > 0$: tu comentario debe resolver la paradoja explicando que la penetración evanescente no transporta corriente. Es la misma cola del efecto túnel, pero sin una segunda frontera que la convierta en onda viajera.' },
            { title: 'La unidad como detector de errores', text: 'Reescritos sobre el denominador común $V_0^2$, tu $R$ de (b) y tu $T$ de (d) suman $\\frac{(\\sqrt{E}-\\sqrt{E-V_0})^2}{V_0^2}\\left(\\sqrt{E}+\\sqrt{E-V_0}\\right)^2 = 1$, pues $(\\sqrt{E}-\\sqrt{E-V_0})(\\sqrt{E}+\\sqrt{E-V_0}) = V_0$. Si usas $T = |F/A|^2$ la suma falla: ese es tu detector de errores del apartado (d).' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $R = \\left|\\frac{1 + ik/\\kappa}{1 - ik/\\kappa}\\right|^2 = \\frac{1 + (k/\\kappa)^2}{1 + (k/\\kappa)^2} = 1$: reflexión total (la función de onda penetra en la barrera, pero acaba reflejada por completo). (b) $R = \\frac{(k - l)^2}{(k + l)^2} = \\frac{(\\sqrt{E} - \\sqrt{E - V_0})^4}{V_0^2}$. (c) $T = \\sqrt{\\frac{E - V_0}{E}}\\left|\\frac{F}{A}\\right|^2$; para $E < V_0$, por supuesto, $T = 0$. (d) $T = \\frac{4kl}{(k + l)^2} = \\frac{4\\sqrt{E}\\sqrt{E - V_0}(\\sqrt{E} - \\sqrt{E - V_0})^2}{V_0^2}$, y $T + R = 1$. ✓',
      page: 39,
    },
  },
}
