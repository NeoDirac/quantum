// Pistas graduadas + respuesta final — PARTE C: problemas 2.34 a 2.49
// Las pistas son contenido pedagógico ORIGINAL de la plataforma.
// Las respuestas finales son transcripción del solucionario oficial de Griffiths (2.ª ed.).

import type { ProblemHintsEntry } from './types'

export const PART_C: Record<string, ProblemHintsEntry> = {
  'bp-2-34': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Dispersión unidimensional sobre un potencial *localizado*, vista desde la matriz S: en vez de perseguir $R$ y $T$ por separado, empaqueta toda la información en la relación lineal entre amplitudes *salientes* ($B$, $F$) y *entrantes* ($A$, $G$). Es la misma física del pozo delta de la sección 2.5, solo que reorganizada.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Es dispersión con $E>0$ sobre el pozo $V(x)=-\\alpha\\delta(x)$ de la Ec. 2.96: la misma física de la sección 2.5, reorganizada en torno a amplitudes entrantes y salientes.' },
            { title: 'Identifica las amplitudes', text: 'A la izquierda: $Ae^{ikx}$ (entrante) y $Be^{-ikx}$ (saliente); a la derecha: $Ge^{-ikx}$ (entrante desde $+\\infty$) y $Fe^{ikx}$ (saliente), con $k=\\sqrt{2mE}/\\hbar$ a ambos lados del origen.' },
            { title: 'Fija el objetivo', text: 'Construir $S$ tal que $B=S_{11}A+S_{12}G$ y $F=S_{21}A+S_{22}G$: bastan las condiciones de frontera en $x=0$, y el estado ligado saldrá después del polo de $S$.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Escribe $\\psi$ por regiones: $Ae^{ikx} + Be^{-ikx}$ a la izquierda del pozo y $Fe^{ikx} + Ge^{-ikx}$ a la derecha. Impón continuidad de $\\psi$ en el origen y el salto de $\\psi\'$ que dicta la Ec. 2.125 (con el signo del pozo, $-2m\\alpha/\\hbar^2$), y despeja $B$ y $F$ en términos de $A$ y $G$.',
        application: {
          steps: [
            { title: 'Escribe las dos regiones', text: 'Para $x<0$: $\\psi=Ae^{ikx}+Be^{-ikx}$; para $x>0$: $\\psi=Fe^{ikx}+Ge^{-ikx}$. Fuera del origen el potencial es cero, así que la $k$ es la misma en ambas zonas.' },
            { title: 'Impón continuidad', text: 'La función de onda de un pozo delta es continua: en $x=0$ queda $A+B=F+G$.' },
            { title: 'Impón el salto', text: 'La Ec. 2.125 con signo de pozo dice que la derivada salta $-\\frac{2m\\alpha}{\\hbar^2}(A+B)$, es decir $ik(F-G-A+B)=-\\frac{2m\\alpha}{\\hbar^2}(A+B)$.' },
            { title: 'Cuenta el sistema', text: 'Son dos ecuaciones lineales para $B$ y $F$ con datos $A$ y $G$: al despejarlas, los coeficientes que aparecen son los cuatro elementos de $S$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Define desde el principio $\\beta \\equiv m\\alpha/\\hbar^2 k$: todas las ecuaciones se limpian. Para despeigar cómodo, reescribe las condiciones de frontera como $F + G = \\dots$ y $F - G = \\dots$ y súmalas/réstalas — así $B$ y $F$ caen casi sin álgebra.',
        application: {
          steps: [
            { title: 'Define beta', text: 'Con $\\beta\\equiv\\frac{m\\alpha}{\\hbar^2k}$, el salto dividido entre $k$ se reduce a $F-G=A-B+2i\\beta(A+B)$.' },
            { title: 'Ordena suma y resta', text: 'Junta las dos condiciones en la forma $F+G=A+B$ y $F-G=A-B+2i\\beta(A+B)$: son literalmente la suma y la resta de $F$ y $G$.' },
            { title: 'Suma y resta', text: 'Sumándolas queda $F=A+i\\beta(A+B)$; restándolas, $G=B-i\\beta(A+B)$.' },
            { title: 'Aísla B', text: 'De la segunda: $(1-i\\beta)B=G+i\\beta A$, o sea $B=\\frac{i\\beta A+G}{1-i\\beta}$.' },
            { title: 'Cierra con F', text: 'Sustituyendo en la primera queda $F=\\frac{A+i\\beta G}{1-i\\beta}$, de modo que $S=\\frac{1}{1-i\\beta}\\begin{pmatrix} i\\beta & 1 \\\\ 1 & i\\beta \\end{pmatrix}$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'El estado ligado debe asomar como un *polo* de $S$ con $k$ imaginario puro ($k = i\\kappa$, $\\kappa > 0$): la energía que salga ahí tiene que coincidir con la Ec. 2.111. Comprueba también que la matriz es unitaria ($|S_{11}|^2 + |S_{21}|^2 = 1$) y que $\\alpha \\to 0$ devuelve la identidad.',
        application: {
          steps: [
            { title: 'Polo en el eje imaginario', text: 'El denominador $1-i\\beta$ se anula con $k=i\\kappa$: $\\kappa=\\frac{m\\alpha}{\\hbar^2}$, así que $E=-\\frac{\\hbar^2\\kappa^2}{2m}=-\\frac{m\\alpha^2}{2\\hbar^2}$, exactamente la Ec. 2.111.' },
            { title: 'Comprueba la unitariedad', text: '$|S_{11}|^2+|S_{21}|^2=\\frac{\\beta^2+1}{|1-i\\beta|^2}=\\frac{1+\\beta^2}{1+\\beta^2}=1$: la probabilidad se conserva.' },
            { title: 'Límite de pozo débil', text: 'Con $\\alpha\\to0$ ($\\beta\\to0$) la matriz tiende a la identidad: sin pozo, $B=G=0$ y $F=A$ — la onda pasa de largo.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$S = \\frac{1}{1 - i\\beta}\\begin{pmatrix} i\\beta & 1 \\\\ 1 & i\\beta \\end{pmatrix}$, con $\\beta \\equiv \\frac{m\\alpha}{\\hbar^2 k}$ ($k = \\sqrt{2mE}/\\hbar$). El estado ligado corresponde al polo en $1 - i\\beta = 0$, es decir $k = i\\,m\\alpha/\\hbar^2$, que da $E = -m\\alpha^2/2\\hbar^2$, de acuerdo con la Ec. 2.111.',
      page: 54,
      note: 'La 2.ª ed. fusiona los antiguos 2.34 y 2.35 en el problema 2.52; su solución oficial se detiene en la S-matrix, y la energía del estado ligado (polo de $S$ en el eje imaginario) se completa aquí para responder al enunciado de la 1.ª ed.',
    },
  },
  'bp-2-35': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'El mismo formalismo S del problema anterior, pero el enunciado te avisa del atajo: como el pozo es *par* ($V(-x) = V(x)$), dispersar desde la derecha es dispersar desde la izquierda con $x \\to -x$ (y $A \\leftrightarrow G$, $B \\leftrightarrow F$). Eso fija dos relaciones entre los elementos de S y reduce el trabajo a la mitad.',
        application: {
          steps: [
            { title: 'Detecta la simetría', text: 'El pozo $V(x)=-V_0$ para $|x|\\le a$ cumple $V(-x)=V(x)$: el experimento espejo ($x\\to-x$) intercambia $A\\leftrightarrow G$ y $B\\leftrightarrow F$.' },
            { title: 'Traduce a restricciones', text: 'Dispersar desde la derecha es el experimento espejo: la reflexión es la misma a ambos lados ($S_{11}=S_{22}$) y también la transmisión ($S_{12}=S_{21}$). Quedan solo dos números por encontrar.' },
            { title: 'Reutiliza la sección 2.6', text: 'Esos dos números son la amplitud transmitida $S_{21}$ y la reflejada $S_{11}$ para incidencia desde la izquierda: exactamente las que ya calculaste para el pozo finito.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Con la convención $\\begin{pmatrix} B \\\\ F \\end{pmatrix} = S\\begin{pmatrix} A \\\\ G \\end{pmatrix}$, la simetría da $S_{11} = S_{22}$ y $S_{12} = S_{21}$. Solo necesitas dos números: la amplitud de transmisión ($S_{21}$) y la de reflexión ($S_{11}$) para incidencia desde la izquierda.',
        application: {
          steps: [
            { title: 'Monta las tres regiones', text: 'Izquierda ($x<-a$): $Ae^{ikx}+Be^{-ikx}$; dentro ($|x|\\le a$): $Ce^{ilx}+De^{-ilx}$; derecha ($x>a$): $Fe^{ikx}+Ge^{-ikx}$, con $k=\\sqrt{2mE}/\\hbar$ y $l=\\sqrt{2m(E+V_0)}/\\hbar$.' },
            { title: 'Fija la convención', text: 'Buscas $B=S_{11}A+S_{12}G$ y $F=S_{21}A+S_{22}G$; la simetría ya te dijo que basta con hallar $S_{11}$ y $S_{21}$.' },
            { title: 'Incidencia izquierda', text: 'Pon $G=0$: entonces $S_{21}=F/A$ y $S_{11}=B/A$, las amplitudes de transmisión y reflexión del cálculo clásico del pozo finito.' },
            { title: 'Anticipa la estructura', text: 'Ambas amplitudes comparten el factor de fase $e^{-2ika}$ (el tiempo de vuelo a través del pozo) y el denominador $\\cos(2la)-i\\,\\frac{k^2+l^2}{2kl}\\sin(2la)$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'No rehagas las condiciones de frontera: son las del pozo finito de la sección 2.6. Recupera del texto la amplitud transmitida y la reflejada; ambas comparten el factor de fase $e^{-2ika}$ y el denominador $\\cos(2la) - i\\,\\frac{k^2 + l^2}{2kl}\\sin(2la)$, con $k = \\sqrt{2mE}/\\hbar$ y $l = \\sqrt{2m(E + V_0)}/\\hbar$.',
        application: {
          steps: [
            { title: 'Recupera la transmisión', text: 'El empalme de las cuatro condiciones en $x=\\pm a$ (la misma álgebra de la sección 2.6) da $S_{21}=\\frac{F}{A}=\\frac{e^{-2ika}}{\\cos(2la)-i\\frac{k^2+l^2}{2kl}\\sin(2la)}$.' },
            { title: 'Recupera la reflexión', text: 'La amplitud reflejada es $S_{11}=\\frac{i\\,e^{-2ika}\\frac{l^2-k^2}{2kl}\\sin(2la)}{\\cos(2la)-i\\frac{k^2+l^2}{2kl}\\sin(2la)}$: solo existe porque dentro del pozo $l\\ne k$.' },
            { title: 'Rellena por simetría', text: 'Sin ningún cálculo nuevo: $S_{22}=S_{11}$ y $S_{12}=S_{21}$, y la matriz queda completamente determinada por esas dos amplitudes.' },
            { title: 'Ensambla la matriz', text: '$$S=\\frac{e^{-2ika}}{\\cos(2la)-i\\frac{k^2+l^2}{2kl}\\sin(2la)}\\begin{pmatrix} i\\frac{l^2-k^2}{2kl}\\sin(2la) & 1 \\\\ 1 & i\\frac{l^2-k^2}{2kl}\\sin(2la) \\end{pmatrix}.$$' },
            { title: 'Separa fase y módulo', text: 'El prefactor común $e^{-2ika}$ es fase pura: no afecta a $R=|S_{11}|^2$ ni a $T=|S_{21}|^2$, solo refleja la distancia recorrida dentro del pozo.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Comprueba la unitariedad ($|S_{11}|^2 + |S_{21}|^2 = 1$) y el límite $V_0 \\to 0$ ($l \\to k$): el denominador se vuelve $e^{-2ila}$ y la matriz S debe reducirse a la identidad — sin pozo no hay dispersión.',
        application: {
          steps: [
            { title: 'Unitariedad explícita', text: 'Con $\\cos^2(2la)=1-\\sin^2(2la)$ se ve que $4k^2l^2+(k^2-l^2)^2\\sin^2(2la)=(k^2+l^2)^2\\sin^2(2la)+4k^2l^2\\cos^2(2la)$: numerador y denominador de $|S_{11}|^2+|S_{21}|^2$ coinciden y la suma es 1.' },
            { title: 'Límite sin pozo', text: 'Con $V_0\\to0$ ($l\\to k$): el numerador de $S_{11}$ se anula y el denominador tiende a $\\cos(2ka)-i\\sin(2ka)=e^{-2ika}$, así que $S_{21}\\to1$ y $S\\to\\mathbb{1}$ — sin pozo no hay dispersión.' },
            { title: 'Resonancias de transparencia', text: 'Cuando $2la=n\\pi$ el pozo se vuelve transparente: $S_{11}=0$ y $|S_{21}|=1$, las mismas resonancias de la sección 2.6.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: 'Por simetría, $S_{11} = S_{22}$ y $S_{12} = S_{21}$, y $$S = \\frac{e^{-2ika}}{\\cos(2la) - i\\,\\frac{k^2+l^2}{2kl}\\sin(2la)}\\begin{pmatrix} i\\,\\frac{l^2-k^2}{2kl}\\sin(2la) & 1 \\\\ 1 & i\\,\\frac{l^2-k^2}{2kl}\\sin(2la) \\end{pmatrix}$$ (con $k = \\sqrt{2mE}/\\hbar$, $l = \\sqrt{2m(E+V_0)}/\\hbar$).',
      page: 54,
      note: 'La 2.ª ed. fusiona este problema con el 2.34 (problema 2.52); la solución oficial toma las amplitudes del pozo finito de las Ecs. 2.167–2.168 de la 2.ª ed. y explota la simetría del potencial.',
    },
  },
  'bp-2-36': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Un estado inicial en el pozo infinito que **no** es estacionario: la jugada siempre es la misma — expandir en la base $\\psi_n$ y colgarle a cada término su fase $e^{-iE_n t/\\hbar}$. La forma $\\sin^3$ es un regalo: esconde una combinación de muy pocos estados.',
        application: {
          steps: [
            { title: 'Detecta estado no estacionario', text: '$\\Psi(x,0)=A\\sin^3(\\pi x/a)$ no es ningún $\\psi_n$ del pozo (Ec. 2.15), así que $\\langle x\\rangle$ puede depender del tiempo: toca expandir en la base $\\psi_n=\\sqrt{2/a}\\,\\sin(n\\pi x/a)$.' },
            { title: 'Explota la forma cúbica', text: 'El cubo de seno se reescribe con senos básicos, $\\sin^3\\theta=\\frac{3\\sin\\theta-\\sin3\\theta}{4}$: la condición inicial será combinación de muy pocos estados, no una serie infinita.' },
            { title: 'Anticipa la estructura', text: 'Tras colgar las fases $e^{-iE_nt/\\hbar}$, $\\langle x\\rangle(t)$ tendrá términos diagonales (constantes) y un término cruzado $1\\leftrightarrow3$ que solo sobrevive si $\\int_0^a x\\,\\psi_1\\psi_3\\,dx\\neq0$.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Primero normaliza $\\Psi(x,0)$ y descomponla: $\\Psi(x,0) = \\sum_n c_n\\psi_n(x)$. Después escribe la evolución general (Ec. 2.17) y forma $|\\Psi(x,t)|^2$: los términos cruzados son los que pueden hacer oscilar $\\langle x \\rangle$.',
        application: {
          steps: [
            { title: 'Normaliza primero', text: 'Calcula $A$ con $\\int_0^a|\\Psi(x,0)|^2dx=1$: como $\\int_0^a\\sin^6(\\pi x/a)dx=\\frac{5a}{16}$, sale $A=\\frac{4}{\\sqrt{5a}}$.' },
            { title: 'Descompón en la base', text: 'Escribe $\\Psi(x,0)=\\sum_n c_n\\psi_n(x)$; por la identidad del triple ángulo, solo $c_1$ y $c_3$ serán distintos de cero.' },
            { title: 'Escribe la evolución', text: 'La Ec. 2.17 da $\\Psi(x,t)=\\sum_n c_n\\psi_n(x)e^{-iE_nt/\\hbar}$ con $E_n=\\frac{n^2\\pi^2\\hbar^2}{2ma^2}$.' },
            { title: 'Monta el valor esperado', text: '$\\langle x\\rangle=\\sum_n|c_n|^2\\langle x\\rangle_n+2\\,\\mathrm{Re}\\left[c_1^*c_3\\,e^{-i(E_3-E_1)t/\\hbar}\\int_0^a x\\,\\psi_1\\psi_3\\,dx\\right]$, con $\\langle x\\rangle_n=\\frac{a}{2}$ para todo $n$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Usa la identidad $\\sin 3\\theta = 3\\sin\\theta - 4\\sin^3\\theta$ para reescribir la condición inicial con senos "buenos" — solo dos estados estacionarios sobreviven. Para el término cruzado de $\\langle x \\rangle$, ataca la integral $\\int x\\,\\psi_1\\psi_3\\,dx$ convirtiendo el producto de senos en suma de cosenos.',
        application: {
          steps: [
            { title: 'Aplica el triple ángulo', text: '$\\Psi(x,0)=\\frac{A}{4}\\left[3\\sin(\\pi x/a)-\\sin(3\\pi x/a)\\right]$: solo intervienen $\\psi_1$ y $\\psi_3$.' },
            { title: 'Lee los coeficientes', text: 'Comparando con $\\psi_n=\\sqrt{2/a}\\,\\sin(n\\pi x/a)$ y usando $A=\\frac{4}{\\sqrt{5a}}$: $c_1=\\frac{3}{\\sqrt{10}}$ y $c_3=-\\frac{1}{\\sqrt{10}}$.' },
            { title: 'Ataca la integral cruzada', text: 'Convierte el producto: $\\sin(\\pi x/a)\\sin(3\\pi x/a)=\\frac12\\left[\\cos(2\\pi x/a)-\\cos(4\\pi x/a)\\right]$, de modo que $\\int_0^a x\\,\\psi_1\\psi_3\\,dx$ se reduce a integrales $\\int_0^a x\\cos(2m\\pi x/a)\\,dx$.' },
            { title: 'Integra por partes', text: '$\\int_0^a x\\cos\\left(\\frac{2m\\pi x}{a}\\right)dx=\\left[\\frac{ax\\sin(2m\\pi x/a)}{2m\\pi}+\\frac{a^2\\cos(2m\\pi x/a)}{(2m\\pi)^2}\\right]_0^a=0$: los senos se anulan y los cosenos valen lo mismo en $0$ y en $a$.' },
            { title: 'Concluye', text: 'El término cruzado es cero y $\\langle x\\rangle(t)=\\left(\\frac{9}{10}+\\frac{1}{10}\\right)\\frac{a}{2}=\\frac{a}{2}$ para todo $t$: la posición media no oscila.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Tu $\\langle x \\rangle(t)$ debe vivir en $[0, a]$ para todo $t$. Como control independiente, evalúala en $t = 0$ directamente con $|\\Psi(x,0)|^2$ y comprueba que tu fórmula general lo reproduce; fíjate también en qué simetría de la condición inicial te permite anticipar ese valor.',
        application: {
          steps: [
            { title: 'Chequea t=0', text: 'Tu resultado da $\\frac{a}{2}$; y en efecto $|\\Psi(x,0)|^2=A^2\\sin^6(\\pi x/a)$ es simétrica respecto a $x=\\frac{a}{2}$, pues $\\sin(\\pi(a-x)/a)=\\sin(\\pi x/a)$.' },
            { title: 'Rango físico', text: 'El valor $\\frac{a}{2}$ vive dentro de $[0,a]$ y no depende de $t$: la densidad nunca rompe su simetría especular respecto al centro del pozo.' },
            { title: 'Entiende la anulación', text: '$\\psi_1$ y $\\psi_3$ son ambas pares respecto al centro y ortogonales: $\\int_0^a x\\,\\psi_1\\psi_3\\,dx=\\frac{a}{2}\\int_0^a\\psi_1\\psi_3\\,dx+\\int_0^a\\left(x-\\frac{a}{2}\\right)\\psi_1\\psi_3\\,dx=0+0$.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$\\Psi(x,0) = \\frac{1}{\\sqrt{10}}\\left[3\\psi_1(x) - \\psi_3(x)\\right]$ (con $A = 4/\\sqrt{5a}$), así que $\\Psi(x,t) = \\frac{1}{\\sqrt{10}}\\left[3\\psi_1(x)e^{-iE_1 t/\\hbar} - \\psi_3(x)e^{-iE_3 t/\\hbar}\\right]$, y como $\\langle x \\rangle_n = a/2$ y $\\int_0^a x\\,\\psi_1\\psi_3\\,dx = 0$: $$\\langle x \\rangle(t) = \\frac{9}{10}\\cdot\\frac{a}{2} + \\frac{1}{10}\\cdot\\frac{a}{2} = \\frac{a}{2}.$$',
      page: 41,
    },
  },
  'bp-2-37': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Valores esperados en el estado estacionario $n$ del oscilador: no hay integrales que valgan — es puro *álgebra de operadores escalera*. El enunciado te regala la estrategia (expresar $x$ y $p$ con $a_\\pm$) y la ortogonalidad hace el resto.',
        application: {
          steps: [
            { title: 'Identifica el estado', text: 'Trabajas sobre el $n$-ésimo estado estacionario $\\psi_n$ del oscilador (sección 2.3): los valores esperados pedidos son constantes, sin dependencia temporal.' },
            { title: 'Cambia integrales por álgebra', text: 'Con $x=\\sqrt{\\frac{\\hbar}{2m\\omega}}(a_++a_-)$ y $p=i\\sqrt{\\frac{\\hbar m\\omega}{2}}(a_+-a_-)$, todo se reduce a las reglas $a_+\\psi_n=\\sqrt{n+1}\\,\\psi_{n+1}$, $a_-\\psi_n=\\sqrt{n}\\,\\psi_{n-1}$ y la ortogonalidad.' },
            { title: 'Anticipa por simetría', text: 'El potencial es par, así que $\\langle x\\rangle=\\langle p\\rangle=0$; el trabajo real está en los cuadrados $\\langle x^2\\rangle$ y $\\langle p^2\\rangle$.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Parte de $x = \\sqrt{\\frac{\\hbar}{2m\\omega}}\\,(a_+ + a_-)$ y $p = i\\sqrt{\\frac{\\hbar m\\omega}{2}}\\,(a_+ - a_-)$, junto con las reglas $a_+\\psi_n = \\sqrt{n+1}\\,\\psi_{n+1}$ y $a_-\\psi_n = \\sqrt{n}\\,\\psi_{n-1}$. Los valores esperados lineales salen a la vista; los cuadrados piden expandir.',
        application: {
          steps: [
            { title: 'Escribe los operadores', text: 'Usa $x=\\sqrt{\\frac{\\hbar}{2m\\omega}}(a_++a_-)$ y $p=i\\sqrt{\\frac{\\hbar m\\omega}{2}}(a_+-a_-)$, con $a_\\pm\\psi_n$ proporcional a $\\psi_{n\\pm1}$.' },
            { title: 'Resuelve los lineales', text: 'En $\\langle x\\rangle$ y $\\langle p\\rangle$ cada término de $\\psi_n^*$ tras el operador contiene $\\psi_{n\\pm1}$: la ortogonalidad con $\\psi_n$ los anula.' },
            { title: 'Expande los cuadrados', text: '$x^2=\\frac{\\hbar}{2m\\omega}(a_++a_-)^2$ y $p^2=-\\frac{\\hbar m\\omega}{2}(a_+-a_-)^2$: al desarrollar quedan $a_\\pm^2$, $a_+a_-$ y $a_-a_+$.' },
            { title: 'Cierra con T y V', text: 'Al final, $\\langle T\\rangle=\\frac{\\langle p^2\\rangle}{2m}$ y $\\langle V\\rangle=\\frac12m\\omega^2\\langle x^2\\rangle$; comprueba además que $\\sigma_x\\sigma_p\\geq\\frac{\\hbar}{2}$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'En $(a_+ \\pm a_-)^2$ trata los cuatro términos por separado: $a_+^2$ y $a_-^2$ te llevan a $\\psi_{n\\pm2}$ (que la ortogonalidad mata al integrar contra $\\psi_n^*$), mientras que $a_+a_-$ y $a_-a_+$ devuelven múltiplos de $\\psi_n$. Ojo: $a_+$ y $a_-$ **no** conmutan, no los agrupes.',
        application: {
          steps: [
            { title: 'Clasifica los términos', text: 'En $(a_++a_-)^2=a_+^2+a_+a_-+a_-a_++a_-^2$, los extremos llevan a $\\psi_{n\\pm2}$ y mueren al integrar contra $\\psi_n^*$.' },
            { title: 'Evalúa los centrales', text: '$a_-a_+\\psi_n=(n+1)\\psi_n$ y $a_+a_-\\psi_n=n\\,\\psi_n$ son los únicos supervivientes (no los agrupes: $a_+$ y $a_-$ no conmutan).' },
            { title: 'Junta la media de x²', text: '$\\langle x^2\\rangle=\\frac{\\hbar}{2m\\omega}\\left[(n+1)+n\\right]=\\left(n+\\frac12\\right)\\frac{\\hbar}{m\\omega}$.' },
            { title: 'Junta la media de p²', text: 'Con $(a_+-a_-)^2=a_+^2-a_+a_--a_-a_++a_-^2$: $\\langle p^2\\rangle=-\\frac{\\hbar m\\omega}{2}\\left[0-n-(n+1)+0\\right]=\\left(n+\\frac12\\right)m\\hbar\\omega$.' },
            { title: 'Completa T, V e incertidumbres', text: '$\\langle T\\rangle=\\frac{E_n}{2}$ y $\\langle V\\rangle=\\frac{E_n}{2}$ con $E_n=\\left(n+\\frac12\\right)\\hbar\\omega$; además $\\sigma_x=\\sqrt{\\left(n+\\frac12\\right)\\frac{\\hbar}{m\\omega}}$ y $\\sigma_p=\\sqrt{\\left(n+\\frac12\\right)m\\hbar\\omega}$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Comprueba que $\\langle T \\rangle + \\langle V \\rangle = E_n = (n + \\frac{1}{2})\\hbar\\omega$ (y el teorema del virial del oscilador exige además que cinética y potencial se repartan $E_n$ a medias), así como que $\\sigma_x\\sigma_p \\geq \\hbar/2$, saturado solo para $n = 0$.',
        application: {
          steps: [
            { title: 'Reparto de energía', text: '$\\langle T\\rangle+\\langle V\\rangle=\\left(n+\\frac12\\right)\\hbar\\omega=E_n$, y cada uno vale $\\frac{E_n}{2}$, como exige el teorema del virial para $V\\propto x^2$.' },
            { title: 'Principio de incertidumbre', text: '$\\sigma_x\\sigma_p=\\left(n+\\frac12\\right)\\hbar\\geq\\frac{\\hbar}{2}$, saturado únicamente en $n=0$.' },
            { title: 'Chequea el fundamental', text: 'Con $n=0$: $\\sigma_x=\\sqrt{\\frac{\\hbar}{2m\\omega}}$, $\\sigma_p=\\sqrt{\\frac{m\\hbar\\omega}{2}}$ y producto $\\frac{\\hbar}{2}$, coherente con la gaussiana mínima del estado base.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$\\langle x \\rangle = \\langle p \\rangle = 0$; $\\langle x^2 \\rangle = \\frac{\\hbar}{2m\\omega}(2n+1) = \\left(n + \\frac{1}{2}\\right)\\frac{\\hbar}{m\\omega}$; $\\langle p^2 \\rangle = \\frac{m\\hbar\\omega}{2}(2n+1) = \\left(n + \\frac{1}{2}\\right)m\\hbar\\omega$; $\\langle T \\rangle = \\frac{\\langle p^2 \\rangle}{2m} = \\frac{1}{2}\\left(n + \\frac{1}{2}\\right)\\hbar\\omega$; $\\sigma_x = \\sqrt{\\left(n+\\frac{1}{2}\\right)\\frac{\\hbar}{m\\omega}}$, $\\sigma_p = \\sqrt{\\left(n+\\frac{1}{2}\\right)m\\hbar\\omega}$, y $\\sigma_x\\sigma_p = \\left(n + \\frac{1}{2}\\right)\\hbar \\geq \\frac{\\hbar}{2}$.',
      page: 22,
      note: 'El manual no evalúa $\\langle V(x) \\rangle$ por separado; se obtiene de $\\langle V \\rangle = E_n - \\langle T \\rangle = \\frac{1}{2}(n + \\frac{1}{2})\\hbar\\omega$, de modo que $\\langle T \\rangle = \\langle V \\rangle = E_n/2$, como exige el teorema del virial.',
    },
  },
  'bp-2-38': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Un oscilador armónico al que le cortaron la mitad izquierda con una pared infinita: la mitad derecha es *literalmente* la del oscilador completo, solo que la pared impone una condición extra en $x = 0$. La pista del enunciado ("muy poca calculación") señala que no hay que resolver nada nuevo.',
        application: {
          steps: [
            { title: 'Recorta el problema', text: 'Para $x>0$ el potencial es el del oscilador ordinario $\\frac12m\\omega^2x^2$: la ecuación diferencial y sus soluciones son las de la sección 2.3.' },
            { title: 'Aísla lo nuevo', text: 'La única novedad es la pared en el origen: $\\psi(0)=0$ y $\\psi=0$ para todo $x<0$. Esa condición filtra las soluciones del oscilador.' },
            { title: 'Ojo con la pista', text: '«Muy poca calculación»: no hay que resolver la ecuación de nuevo, solo decidir cuáles de las $\\psi_n$ ya conocidas sobreviven a la pared.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Para $x > 0$ la ecuación de Schrödinger es idéntica a la del oscilador, así que las soluciones admisibles son las $\\psi_n$ de la sección 2.3. Las condiciones de frontera: $\\psi \\to 0$ cuando $x \\to +\\infty$ (ya cuidada por las $\\psi_n$) y $\\psi(0) = 0$ (la pared nueva).',
        application: {
          steps: [
            { title: 'Solución general a la derecha', text: 'En $x>0$, $\\psi$ debe construirse con las $\\psi_n$ del oscilador, que ya decaen como $e^{-m\\omega x^2/2\\hbar}$ cuando $x\\to+\\infty$.' },
            { title: 'Impón las fronteras', text: 'La condición en $+\\infty$ la cumplen todas las $\\psi_n$; la restrictiva es la de la pared: $\\psi(0)=0$.' },
            { title: 'Clasifica por paridad', text: 'Las $\\psi_n$ del oscilador completo son pares para $n$ par e impares para $n$ impar; solo las impares valen cero en el origen.' },
            { title: 'Enumera las supervivientes', text: 'Quedan $\\psi_1,\\psi_3,\\psi_5,\\dots$ definidas en $x>0$, con energías leídas de $E_n=\\left(n+\\frac12\\right)\\hbar\\omega$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'La pregunta clave es qué familia de $\\psi_n$ se anula en el origen: las de $n$ par (funciones pares) o las de $n$ impar (funciones impares). Selecciona las que sobreviven a la pared y lee sus energías de la fórmula estándar $E_n = (n + \\frac{1}{2})\\hbar\\omega$.',
        application: {
          steps: [
            { title: 'Descarta las pares', text: 'Las funciones pares no se anulan en el origen; por ejemplo $\\psi_0(0)=\\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4}\\neq0$: la pared las elimina todas.' },
            { title: 'Conserva las impares', text: 'Las impares ($n=1,3,5,\\dots$) tienen $\\psi_n(0)=0$ por sus polinomios de Hermite impares: pasan el filtro sin modificación.' },
            { title: 'Lee las energías', text: 'Con $n$ impar: $E=\\frac32\\hbar\\omega,\\frac72\\hbar\\omega,\\frac{11}2\\hbar\\omega,\\dots$, es decir $E_n=\\left(n+\\frac12\\right)\\hbar\\omega$ con $n=1,3,5,\\dots$' },
            { title: 'Identifica el fundamental', text: 'El estado base es $\\psi_1(x)\\propto x\\,e^{-m\\omega x^2/2\\hbar}$ en $x>0$, con $E=\\frac32\\hbar\\omega$: la mitad derecha del primer excitado del oscilador completo.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'La primera energía debe ser más alta que la del estado fundamental del oscilador completo (la pared endurece el sistema), y entre niveles consecutivos admitidos debe haber un espaciado constante, múltiplo entero de $\\hbar\\omega$. El estado fundamental debe tener además la misma forma funcional que un estado excitado del oscilador completo.',
        application: {
          steps: [
            { title: 'La pared endurece', text: 'La energía base sube de $\\frac12\\hbar\\omega$ (oscilador completo) a $\\frac32\\hbar\\omega$: restringir el dominio disponible aumenta la energía cinética — sentido físico correcto.' },
            { title: 'Espaciado constante', text: 'Los niveles admitidos distan $2\\hbar\\omega$ entre sí ($\\frac32\\to\\frac72\\to\\frac{11}2$): espaciado constante, múltiplo entero de $\\hbar\\omega$, como promete la estructura del oscilador.' },
            { title: 'Formas compatibles', text: 'Cada autoestado del semi-oscilador coincide, en $x>0$, con un autoestado impar del oscilador completo: la pared no deforma lo que ya valía cero en el origen.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: 'La pared en $x = 0$ elimina todas las soluciones pares ($n = 0, 2, 4,\\dots$) y deja solo las impares: $$E_n = \\left(n + \\frac{1}{2}\\right)\\hbar\\omega, \\qquad n = 1, 3, 5, \\dots$$',
      page: 45,
    },
  },
  'bp-2-39': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Un pozo infinito de anchura $2a$ con una barrera delta en el centro: problema de condiciones de frontera con simetría de paridad. Como la delta está en el origen y el pozo es simétrico, las soluciones se separan en pares e impares, tal como pide el enunciado. La física interesante: la barrera solo la "sienten" las funciones que no se anulan en el origen.',
        application: {
          steps: [
            { title: 'Detecta la simetría', text: 'El potencial $V(x)=\\alpha\\delta(x)$ dentro de $-a<x<a$ cumple $V(-x)=V(x)$: las soluciones se separan en pares e impares, como pide el enunciado.' },
            { title: '¿Quién siente la delta?', text: 'El salto de la derivada en $x=0$ es proporcional a $\\psi(0)$: las impares ($\\psi(0)=0$) ni se enteran de la barrera; las pares sí la notan.' },
            { title: 'Anticipa los resultados', text: 'Las impares darán energías exactas del pozo de anchura $2a$; las pares, una ecuación trascendente del tipo $\\tan(ka)=-\\dots$ para resolver gráficamente.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Dentro del pozo $\\psi = A\\sin kx + B\\cos kx$ con $\\psi(\\pm a) = 0$; la delta impone continuidad en $x = 0$ más el salto de $\\psi\'$ con signo de *barrera* ($+2m\\alpha/\\hbar^2$). Para las impares $\\psi(0) = 0$ lo simplifica todo; para las pares, usa la paridad y escribe $\\psi$ solo en $(0, a)$.',
        application: {
          steps: [
            { title: 'Escribe dentro del pozo', text: 'Para $|x|<a$ con $V=0$ (salvo el origen): $\\psi=A\\sin kx+B\\cos kx$ con $k=\\sqrt{2mE}/\\hbar$; en $|x|\\ge a$ la función es cero.' },
            { title: 'Impón las paredes exteriores', text: '$\\psi(\\pm a)=0$; por paridad basta imponerlo en $x=a$ y reconstruir el lado negativo con $\\psi(-x)=\\pm\\psi(x)$.' },
            { title: 'Impares: nodo en el origen', text: 'Si $\\psi$ es impar, $B=0$ y $\\psi=A\\sin kx$: la delta es invisible y solo queda por imponer $\\sin(ka)=0$.' },
            { title: 'Pares: salto en el origen', text: 'En $(0,a)$ escribe $\\psi=C\\cos kx+D\\sin kx$; la derivada a la derecha del origen vale $Dk$ y a la izquierda $-Dk$ (paridad), así que el salto de barrera da $2Dk=\\frac{2m\\alpha}{\\hbar^2}C$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'En las pares, el salto de $\\psi\'$ en el origen relaciona $B$ con $A$, y $\\psi(a) = 0$ deja una ecuación trascendente del tipo $\\tan(ka) = -(\\text{recta en } k)$. Resuélvela gráficamente (intersecciones de la tangente con una recta): de ahí salen los niveles permitidos.',
        application: {
          steps: [
            { title: 'Resuelve las impares', text: '$\\psi=A\\sin kx$ con $\\sin(ka)=0$ da $ka=\\frac{n\\pi}{2}$ con $n=2,4,6,\\dots$, es decir $E_n=\\frac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$: exactamente las del pozo sin delta.' },
            { title: 'Salto para las pares', text: 'De $2Dk=\\frac{2m\\alpha}{\\hbar^2}C$ sale $\\frac{D}{C}=\\frac{m\\alpha}{\\hbar^2k}$, o sea $\\psi\\propto\\sin kx+\\frac{\\hbar^2k}{m\\alpha}\\cos kx$ en $(0,a)$, extendida como par.' },
            { title: 'Pared en x=a', text: 'La condición $\\psi(a)=0$ da $C\\cos ka+D\\sin ka=0$ y, con la razón anterior, la trascendente $\\tan(ka)=-\\frac{\\hbar^2k}{m\\alpha}$.' },
            { title: 'Resuelve gráficamente', text: 'Interseca $y=\\tan(ka)$ con la recta $y=-\\frac{\\hbar^2}{m\\alpha}k$: los cortes caen en las ramas de tangente negativa, con $ka$ apenas mayor que $\\frac{(2j-1)\\pi}{2}$.' },
            { title: 'Compara con el pozo limpio', text: 'Al caer los cortes a la derecha de $\\frac{n\\pi}{2}$ ($n$ impar), las energías pares quedan ligeramente por encima de $\\frac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$: la barrera empuja esos niveles hacia arriba.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Estudia los límites que pide el enunciado: $\\alpha \\to 0$ debe recuperar el pozo infinito normal de anchura $2a$ (la recta se vuelve vertical), y $\\alpha \\to \\infty$ debe partir el pozo en dos de anchura $a$. Las impares, en cambio, no deben moverse para nada — asegúrate de entender por qué.',
        application: {
          steps: [
            { title: 'Límite de barrera nula', text: 'Al crecer $\\left|\\frac{\\hbar^2}{m\\alpha}\\right|$ la recta se empina y los cortes convergen a las asíntotas $ka=\\frac{n\\pi}{2}$ ($n$ impar): se recupera el pozo infinito ordinario de anchura $2a$.' },
            { title: 'Límite de barrera dura', text: 'La recta se aplana hacia el eje y los cortes caen en $ka=\\pi,2\\pi,\\dots$: el pozo se parte en dos de anchura $a$, con $E_n\\to\\frac{n^2\\pi^2\\hbar^2}{2ma^2}$ (dos pozos aislados).' },
            { title: 'Impares inmóviles', text: 'Sus nodos en $x=0$ hacen $\\psi(0)=0$, de modo que el salto de la derivada se anula: las energías impares $\\frac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$ no dependen de $\\alpha$ para nada.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: 'Pares: $\\tan(ka) = -\\frac{\\hbar^2 k}{m\\alpha}$, con $\\psi(x) = A\\left[\\sin kx + \\frac{\\hbar^2 k}{m\\alpha}\\cos kx\\right]$ ($0 \\le x \\le a$): las energías quedan ligeramente *por encima* de $E_n = \\frac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$ ($n = 1, 3, 5,\\dots$). Con $\\alpha \\to 0$ se reducen a las del pozo infinito ordinario; con $\\alpha \\to \\infty$, $E_n \\to \\frac{n^2\\pi^2\\hbar^2}{2ma^2}$ (dos pozos aislados de anchura $a$). Impares: $\\psi(x) = A\\sin(kx)$ con $ka = \\frac{n\\pi}{2}$ ($n = 2, 4, 6,\\dots$), es decir $E_n = \\frac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$ exactamente: al anularse en el origen, nunca "sienten" la delta.',
      page: 47,
    },
  },
  'bp-2-40': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'La continuación del paquete gaussiano libre que ya resolviste en el Problema 2.22: mismo andamiaje (normalizar, transformar, evolucionar, medir dispersión), pero el factor $e^{ilx}$ desplaza el contenido en momentos. Reconocer qué piezas son "copia del problema anterior" es el 80% del trabajo.',
        application: {
          steps: [
            { title: 'Reconoce el origen', text: 'Es el Problema 2.22 con el factor extra $e^{ilx}$: como $|e^{ilx}|=1$, el módulo de $\\Psi(x,0)=Ae^{-ax^2}e^{ilx}$ es el mismo y casi todo el andamiaje se recicla.' },
            { title: 'Qué cambia la fase', text: 'El factor $e^{ilx}$ desplaza el contenido de momentos: $|\\phi(k)|^2$ quedará centrado en $k=l$ y el paquete viajará con la velocidad de grupo $\\frac{\\hbar l}{m}$ de la sección 2.4.' },
            { title: 'Anticipa las respuestas', text: 'Las dispersiones $\\sigma_x$ y $\\sigma_p$ deben quedar como en 2.22; lo nuevo es que $\\langle x\\rangle$ avanza linealmente en el tiempo y $\\langle p\\rangle=\\hbar l$.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Normaliza igual que en 2.22(a): el factor de fase $e^{ilx}$ no toca $|\\Psi|^2$. Para $\\phi(k)$ calcula $\\frac{1}{\\sqrt{2\\pi}}\\int \\Psi(x,0)\\,e^{-ikx}dx$ y observa que la gaussiana a integrar es la de antes con el corrimiento $k \\to k - l$.',
        application: {
          steps: [
            { title: 'Normaliza', text: 'El módulo cuadrado es $A^2e^{-2ax^2}$, idéntico al de 2.22(a): $A=\\left(\\frac{2a}{\\pi}\\right)^{1/4}$ sin ningún cálculo nuevo.' },
            { title: 'Transforma', text: 'Calcula $\\phi(k)=\\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty}\\Psi(x,0)e^{-ikx}dx$ y observa que la gaussiana a integrar es la de 2.22 con el corrimiento $k\\to k-l$.' },
            { title: 'Evoluciona', text: 'Reconstruye $\\Psi(x,t)=\\frac{1}{\\sqrt{2\\pi}}\\int\\phi(k)e^{ikx}e^{-i\\hbar k^2t/2m}dk$: cada componente de momento lleva su propia fase.' },
            { title: 'Planea los momentos', text: 'Los $\\langle x\\rangle$ y $\\langle x^2\\rangle$ se leen de la gaussiana $|\\Psi|^2$; los $\\langle p\\rangle$ y $\\langle p^2\\rangle$, de la gaussiana $|\\phi(k)|^2$ centrada en $l$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'En la integral de evolución, completa el cuadrado del exponente en $k$ (centrado ahora en $k = l$, no en $k = 0$); el cambio de variable $k\' = k - l$ reduce todo al caso estacionario, dejando solo fases del tipo $e^{ilx}$. Define $\\theta \\equiv 2\\hbar at/m$ como antes para que $|\\Psi|^2$ salga casi de memoria.',
        application: {
          steps: [
            { title: 'Calcula el espectro', text: 'La integral gaussiana con corrimiento da $\\phi(k)=\\frac{1}{(2\\pi a)^{1/4}}e^{-(k-l)^2/4a}$: centrada en $l$ con la misma anchura que en 2.22.' },
            { title: 'Cambia de variable', text: 'En la integral de evolución pon $k\'=k-l$: sale un factor $e^{ilx}e^{-i\\hbar l^2t/2m}$ y el resto es la integral de 2.22 evaluada en $x-\\frac{\\hbar l}{m}t$.' },
            { title: 'Completa el cuadrado', text: 'Completa el cuadrado del exponente en $k\'$ y define $\\theta\\equiv\\frac{2\\hbar at}{m}$ como en 2.22: todo sale de memoria salvo el corrimiento del centro.' },
            { title: 'Escribe el módulo', text: '$|\\Psi(x,t)|^2=\\sqrt{\\frac{2a}{\\pi}}\\frac{1}{\\sqrt{1+\\theta^2}}\\exp\\left[-\\frac{2a\\left(x-\\frac{\\hbar l}{m}t\\right)^2}{1+\\theta^2}\\right]$: la gaussiana aplanada de 2.22, con el centro viajando.' },
            { title: 'Extrae los momentos', text: 'De la gaussiana: $\\langle x\\rangle=\\frac{\\hbar l}{m}t$ y $\\langle x^2\\rangle=\\frac{1}{4w^2}+\\left(\\frac{\\hbar lt}{m}\\right)^2$ con $w=\\sqrt{\\frac{a}{1+\\theta^2}}$; de $|\\phi|^2$: $\\langle p\\rangle=\\hbar l$ y $\\langle p^2\\rangle=\\hbar^2(l^2+a)$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'En $t = 0$ tu resultado debe ser exactamente $Ae^{-ax^2}e^{ilx}$. Después, $|\\Psi|^2$ debe seguir siendo la gaussiana "aplanada" del problema estacionario, solo que su centro ya no está quieto: se mueve a velocidad constante (la velocidad de grupo de la sección 2.4). Y $\\sigma_x\\sigma_p \\geq \\hbar/2$ debe seguir cumpliéndose con los mismos valores que en 2.22.',
        application: {
          steps: [
            { title: 'Chequea t=0', text: 'Con $t=0$ tu $\\Psi$ se reduce a $\\left(\\frac{2a}{\\pi}\\right)^{1/4}e^{-ax^2}e^{ilx}$: la fase global se vuelve 1 y el corrimiento del centro desaparece.' },
            { title: 'Anchuras inalteradas', text: '$\\sigma_x=\\frac{1}{2w}$ y $\\sigma_p=\\hbar\\sqrt{a}$, idénticos a 2.22: el factor $e^{ilx}$ traslada el paquete pero no cambia sus dispersiones.' },
            { title: 'Incertidumbre y velocidad', text: '$\\sigma_x\\sigma_p=\\frac{\\hbar}{2}\\sqrt{1+\\theta^2}\\geq\\frac{\\hbar}{2}$ (saturado en $t=0$) ✓, y el centro se mueve a $\\frac{\\hbar l}{m}$, la velocidad de grupo $\\frac{dE}{dp}$ evaluada en $k=l$.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $A = (2a/\\pi)^{1/4}$. (b) $\\phi(k) = \\frac{1}{(2\\pi a)^{1/4}}e^{-(k-l)^2/4a}$. (c) $\\Psi(x,t) = \\left(\\frac{2a}{\\pi}\\right)^{1/4}\\frac{e^{-l^2/4a}\\,e^{a(ix + l/2a)^2/(1 + 2i\\hbar at/m)}}{\\sqrt{1 + 2i\\hbar at/m}}$; $|\\Psi|^2$ es igual que en el caso estacionario con $x \\to x - \\frac{\\hbar l}{m}t$: la gaussiana que se aplana, pero ahora con el centro moviéndose a velocidad constante $v = \\hbar l/m$. (d) $\\langle x \\rangle = \\frac{\\hbar l}{m}t$; $\\langle p \\rangle = \\hbar l$; $\\langle x^2 \\rangle = \\frac{1}{4w^2} + \\left(\\frac{\\hbar lt}{m}\\right)^2$; $\\langle p^2 \\rangle = \\hbar^2(a + l^2)$. (e) $\\sigma_x = \\frac{1}{2w}$, $\\sigma_p = \\hbar\\sqrt{a}$: iguales que antes, así que el principio de incertidumbre se sigue cumpliendo (con $\\theta \\equiv 2\\hbar at/m$, $w \\equiv \\sqrt{a/(1+\\theta^2)}$).',
      page: 47,
    },
  },
  'bp-2-41': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Dispersión sobre un escalón de potencial, pero *hacia abajo*: la partícula entra en una región donde hay más energía cinética disponible ($l > k$). El cálculo es el del escalón de la sección 2.5 con los papeles de $k$ y $l$ intercambiados; la sorpresa es que todavía hay reflexión. La parte (b) es física conceptual, no álgebra.',
        application: {
          steps: [
            { title: 'Reconoce el escalón invertido', text: 'Es el escalón de la sección 2.5 con los papeles cambiados: $V=0$ para $x<0$ y $V=-V_0$ para $x>0$ (Figura 2.16), así que $l>k$ — la partícula se acelera al cruzar.' },
            { title: 'La sorpresa cuántica', text: 'Aunque el potencial «ayuda», su discontinuidad sigue reflejando parcialmente la onda: existirá un término $Be^{-ikx}$ con probabilidad de reflexión $R\\neq0$.' },
            { title: 'Divide el trabajo', text: '(a) son dos condiciones de frontera y un despeje; (b) es conceptual: por qué un acantilado real no se comporta como este $V(x)$ abrupto.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Escribe $\\psi = Ae^{ikx} + Be^{-ikx}$ para $x < 0$ y $\\psi = Fe^{ilx}$ para $x > 0$ (a la derecha no hay onda que regrese), con $k = \\sqrt{2mE}/\\hbar$ y $l = \\sqrt{2m(E + V_0)}/\\hbar$. Impón continuidad de $\\psi$ y de $\\psi\'$ en $0$ y despeja $B/A$.',
        application: {
          steps: [
            { title: 'Escribe las regiones', text: '$x<0$: $\\psi=Ae^{ikx}+Be^{-ikx}$ con $k=\\sqrt{2mE}/\\hbar$; $x>0$: $\\psi=Fe^{ilx}$ con $l=\\sqrt{2m(E+V_0)}/\\hbar$, sin onda que regrese.' },
            { title: 'Empalma en el origen', text: 'El escalón es finito, así que $\\psi$ y su derivada son continuas en $x=0$: $A+B=F$ y $k(A-B)=lF$.' },
            { title: 'Despeja B/A', text: 'Sustituyendo $F=A+B$ en la segunda: $k(A-B)=l(A+B)$, de donde $\\frac{B}{A}=\\frac{k-l}{k+l}$.' },
            { title: 'Formula el observable', text: 'El apartado (a) pide $R=\\left|\\frac{B}{A}\\right|^2$: conviene expresarla en $E$ y $V_0$, y solo al final poner $E=\\frac{V_0}{3}$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'El despeje te deja $B/A$ como cociente de diferencias; para expresar $R = |B/A|^2$ en función de $E$ y $V_0$ saca factor común y usa $\\frac{l-k}{l+k} = \\frac{\\sqrt{E+V_0}-\\sqrt{E}}{\\sqrt{E+V_0}+\\sqrt{E}}$. Sustituye $E = V_0/3$ al final, no al principio.',
        application: {
          steps: [
            { title: 'R con k y l', text: 'Del despeje anterior: $R=\\left(\\frac{l-k}{l+k}\\right)^2$, con $l=\\frac{\\sqrt{2m(E+V_0)}}{\\hbar}$ y $k=\\frac{\\sqrt{2mE}}{\\hbar}$.' },
            { title: 'Pásalo a energías', text: 'Factorizando $\\frac{\\sqrt{2m}}{\\hbar}$: $R=\\left[\\frac{\\sqrt{E+V_0}-\\sqrt{E}}{\\sqrt{E+V_0}+\\sqrt{E}}\\right]^2$, o equivalentemente $\\left[\\frac{\\sqrt{1+V_0/E}-1}{\\sqrt{1+V_0/E}+1}\\right]^2$.' },
            { title: 'Sustituye el dato pedido', text: 'Con $E=\\frac{V_0}{3}$: $E+V_0=\\frac{4V_0}{3}=4E$, así que $\\sqrt{E+V_0}=2\\sqrt{E}$ y $R=\\left[\\frac{2-1}{2+1}\\right]^2=\\frac19$.' },
            { title: 'Interpreta', text: 'Aun cayendo hacia abajo, la partícula se refleja con probabilidad $\\frac19$: la reflexión cuántica depende de la brusquedad del cambio, no de su signo.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Con $E = V_0/3$ el número debe salir como fracción sencilla; y en el límite $V_0 \\to 0$ debe irse a cero (sin escalón no hay reflexión). Para (b) pregúntate qué potencial ejerce de verdad la gravedad sobre el coche a lo largo de su trayectoria: ¿es una discontinuidad abrupta como este $V(x)$?',
        application: {
          steps: [
            { title: 'Límite sin escalón', text: 'Con $V_0\\to0$ ($l\\to k$) el cociente $\\frac{l-k}{l+k}$ se anula: $R\\to0$ — sin discontinuidad no hay reflexión.' },
            { title: 'R acotado', text: 'Como $0<\\frac{l-k}{l+k}<1$ para todo $V_0>0$, siempre $R<1$: parte de la amplitud se transmite siempre al caer.' },
            { title: 'Responde (b)', text: 'A lo largo de la trayectoria del coche el potencial gravitatorio es $V(x)=-mgx$ (una rampa lineal, con $x$ la altura), no una discontinuidad: una variación suave apenas refleja cuando es lenta comparada con la longitud de onda.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $R = \\left|\\frac{B}{A}\\right|^2 = \\left[\\frac{l-k}{l+k}\\right]^2 = \\left[\\frac{\\sqrt{E+V_0}-\\sqrt{E}}{\\sqrt{E+V_0}+\\sqrt{E}}\\right]^2 = \\left[\\frac{\\sqrt{1+V_0/E}-1}{\\sqrt{1+V_0/E}+1}\\right]^2$; con $E = V_0/3$: $R = \\left[\\frac{2-1}{2+1}\\right]^2 = \\frac{1}{9}$. (b) El acantilado real es bidimensional, y aun fingiendo que el coche cae en línea recta, el potencial a lo largo de la (retorcida, pero ya unidimensional) trayectoria es $V(x) = -mgx$ (con $x$ la coordenada vertical): una rampa lineal, no una discontinuidad.',
      page: 40,
      note: 'La 2.ª ed. reformuló el problema («M») y añade un apartado (c) numérico con el mismo cociente $V_0/E = 12/4 = 3$, que da $R = 1/9$ y $T = 8/9 = 0.8889$.',
    },
  },
  'bp-2-42': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Una demostración guiada del teorema de unicidad: en una dimensión no hay estados ligados degenerados. La pista del enunciado no es un adorno — *es* la demostración completa si la sigues con cuidado. La herramienta central es una cantidad tipo Wronskiano que resulta ser constante.',
        application: {
          steps: [
            { title: 'Enmarca el teorema', text: '«En una dimensión no hay estados ligados degenerados»: si $\\psi_1$ y $\\psi_2$ normalizables comparten $E$, una es múltiplo constante de la otra y no son estados distintos.' },
            { title: 'Reconoce la herramienta', text: 'El puente entre las dos soluciones es $W=\\psi_2^*\\frac{d\\psi_1}{dx}-\\psi_1\\frac{d\\psi_2^*}{dx}$: la pista del enunciado ya contiene la demostración completa.' },
            { title: 'Ten los contraejemplos a mano', text: 'La partícula libre ($e^{\\pm ikx}$) y el anillo del Problema 2.43 sí son degeneradas: al final deberás señalar qué hipótesis falla en cada caso.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Escribe la ecuación de Schrödinger para $\\psi_1$ y para $\\psi_2$ (con la misma $E$), multiplica la primera por $\\psi_2^*$ y la segunda por $\\psi_1$, y resta: el término con $V$ se cancela y queda una divergencia total, $\\frac{d}{dx}\\left(\\psi_2^*\\frac{d\\psi_1}{dx} - \\psi_1\\frac{d\\psi_2^*}{dx}\\right) = 0$.',
        application: {
          steps: [
            { title: 'Escribe ambas ecuaciones', text: 'Para $\\psi_1$ y $\\psi_2$ con la misma $E$: $-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi_{1,2}}{dx^2}+V\\psi_{1,2}=E\\psi_{1,2}$.' },
            { title: 'Multiplica en cruz', text: 'Multiplica la de $\\psi_1$ por $\\psi_2^*$ y la de $\\psi_2$ (conjungada, que también es solución porque $V$ es real) por $\\psi_1$, y resta: los términos con $V$ y con $E$ se cancelan.' },
            { title: 'Reconoce la derivada total', text: 'Lo que queda es $\\frac{d}{dx}\\left(\\psi_2^*\\frac{d\\psi_1}{dx}-\\psi_1\\frac{d\\psi_2^*}{dx}\\right)=0$: esa cantidad entre paréntesis es una constante.' },
            { title: 'Fija la constante', text: 'Esa constante debe evaluarse donde los estados ligados se apagan: en $x\\to\\pm\\infty$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'La constante que queda debe evaluarse en $\\pm\\infty$, donde los estados ligados se apagan. Para el paso final, separa variables en $\\psi_2^*\\psi_1\' = \\psi_1\\psi_2^{*\\prime}$ (divide entre $\\psi_1\\psi_2^*$) e integra: aparece un logaritmo que te dice que una función es múltiplo constante de la otra.',
        application: {
          steps: [
            { title: 'Ejecuta la resta', text: 'La resta deja $\\psi_2^*\\frac{d^2\\psi_1}{dx^2}-\\psi_1\\frac{d^2\\psi_2^*}{dx^2}=0$, que es exactamente la derivada de $W$ igualada a cero: $W$ es constante.' },
            { title: 'Usa la normalizabilidad', text: 'Para estados ligados $\\psi_1,\\psi_2\\to0$ (con sus derivadas) en $\\pm\\infty$: evaluando $W$ ahí se obtiene $W=0$ en todo $x$.' },
            { title: 'Separa variables', text: 'Con $W=0$: $\\frac{1}{\\psi_1}\\frac{d\\psi_1}{dx}=\\frac{1}{\\psi_2^*}\\frac{d\\psi_2^*}{dx}$ (divide entre $\\psi_1\\psi_2^*$, fuera de los ceros aislados).' },
            { title: 'Integra el logaritmo', text: 'Integrando: $\\ln\\psi_1=\\ln\\psi_2^*+\\text{const}$, es decir $\\psi_1=C\\,\\psi_2^*$ con $C$ constante.' },
            { title: 'Concluye', text: 'Para $V$ real los estados ligados pueden tomarse reales, de modo que $\\psi_1$ es múltiplo constante de $\\psi_2$: no son linealmente independientes y no hay degeneración. QED.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Identifica exactamente dónde usaste cada hipótesis: normalizabilidad, una dimensión, potencial real. Luego ataca el teorema desde fuera: la partícula libre y el anillo del problema siguiente sí son degenerados — localiza con precisión qué hipótesis falla en cada caso.',
        application: {
          steps: [
            { title: 'Audita las hipótesis', text: 'La normalizabilidad entró al evaluar $W(\\pm\\infty)=0$; el potencial real, al poder conjugar la segunda ecuación; la una dimensión, en que la resta fuera una derivada total.' },
            { title: 'Contraejemplo libre', text: 'Los estados $e^{\\pm ikx}$ de la partícula libre comparten $E=\\frac{\\hbar^2k^2}{2m}$ pero no son normalizables: no tienden a cero y $W$ no se anula — el teorema no aplica.' },
            { title: 'Contraejemplo anillo', text: 'En el anillo del Problema 2.43 no existe el $\\pm\\infty$ donde evaluar $W$: la constante queda indeterminada y la degeneración sobrevive.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: 'De la resta de las dos ecuaciones de Schrödinger, $\\frac{d}{dx}\\left(\\psi_2^*\\frac{d\\psi_1}{dx} - \\psi_1\\frac{d\\psi_2^*}{dx}\\right) = 0$, así que esa cantidad es una constante $K$; como $\\psi \\to 0$ en $\\pm\\infty$ para soluciones normalizables, $K = 0$. Entonces $\\frac{1}{\\psi_1}\\frac{d\\psi_1}{dx} = \\frac{1}{\\psi_2}\\frac{d\\psi_2}{dx}$, de donde $\\ln\\psi_1 = \\ln\\psi_2 + \\text{const}$, es decir $\\psi_1 = (\\text{const})\\,\\psi_2$: no son estados distintos. QED',
      page: 48,
    },
  },
  'bp-2-43': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Una partícula libre en una topología nueva: un anillo. La ecuación de Schrödinger es la de la partícula libre, pero la condición $\\psi(x + a) = \\psi(x)$ sustituye a las condiciones de frontera del pozo. La física nueva está en qué valores de $k$ permite la periodicidad — y en la doble solución para cada energía.',
        application: {
          steps: [
            { title: 'Identifica la geometría', text: 'Una cuenta de masa $m$ deslizándose sin fricción por un aro de circunferencia $a$: la coordenada $x$ es periódica y el papel de las paredes lo juega la condición $\\psi(x+a)=\\psi(x)$.' },
            { title: 'Reconoce la ecuación', text: 'En el aro $V=0$ (partícula libre): $\\psi=Ae^{ikx}+Be^{-ikx}$ con $E=\\frac{\\hbar^2k^2}{2m}$; la novedad es qué $k$ permite la periodicidad.' },
            { title: 'Anticipa la doblez', text: 'Para cada $k$ hay dos circulaciones independientes ($e^{\\pm ikx}$, horaria y antihoraria): espera pares degenerados $\\psi_n^{\\pm}$, salvo en el nivel más bajo.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Resuelve como partícula libre: $\\psi = Ae^{ikx} + Be^{-ikx}$ con $E = \\hbar^2k^2/2m$, e impón la condición periódica. Para normalizar, integra sobre una vuelta completa: $\\int_0^a |\\psi|^2 dx = 1$.',
        application: {
          steps: [
            { title: 'Resuelve como libre', text: 'Parte de la solución general $\\psi=Ae^{ikx}+Be^{-ikx}$ con $E=\\frac{\\hbar^2k^2}{2m}$, e impón después la condición periódica $\\psi(x+a)=\\psi(x)$.' },
            { title: 'Normaliza en el aro', text: 'La normalización es sobre una vuelta completa: $\\int_0^a|\\psi|^2dx=1$; para una exponencial pura eso fija el módulo del coeficiente en $\\frac{1}{\\sqrt{a}}$.' },
            { title: 'Formula la energía', text: 'Cada $k$ permitido dará $E=\\frac{\\hbar^2k^2}{2m}$: cuantizar $k$ equivale a cuantizar la energía.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'La periodicidad exige que los coeficientes de $e^{ikx}$ y $e^{-ikx}$ se reproduzcan por separado; evaluar la condición en dos valores de $x$ bien elegidos (por ejemplo $x = 0$ y $x = \\pi/2k$) te lleva a $e^{ika} = 1$, es decir $ka = 2n\\pi$. Ojo con $n = 0$: ahí las dos soluciones se funden en una.',
        application: {
          steps: [
            { title: 'Evalúa en x=0', text: 'De $\\psi(a)=\\psi(0)$: $Ae^{ika}+Be^{-ika}=A+B$.' },
            { title: 'Evalúa en pi/2k', text: 'De $\\psi\\left(\\frac{\\pi}{2k}+a\\right)=\\psi\\left(\\frac{\\pi}{2k}\\right)$, multiplicando por $-i$ para cancelar los factores $\\pm i$: $Ae^{ika}-Be^{-ika}=A-B$.' },
            { title: 'Combina ambas', text: 'Sumando y restando con la anterior: $2Ae^{ika}=2A$ y $2Be^{-ika}=2B$, es decir $e^{ika}=1$.' },
            { title: 'Cuantiza k', text: '$e^{ika}=1$ exige $ka=2n\\pi$ con $n=0,1,2,\\dots$: $\\psi_n^{\\pm}(x)=\\frac{1}{\\sqrt{a}}e^{\\pm i2n\\pi x/a}$ y $E_n=\\frac{2n^2\\pi^2\\hbar^2}{ma^2}$.' },
            { title: 'Cuida n=0', text: 'Para $n=0$ ambas circulaciones colapsan en la misma constante $\\frac{1}{\\sqrt{a}}$ con $E=0$: hay un solo estado, no dos.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Las energías deben ser no negativas y crecer cuadráticamente con $n$, como corresponde a $E = \\hbar^2k^2/2m$; y el caso $n = 0$ debe darte un estado de energía nula. Finalmente, explica la degeneración doble señalando qué hipótesis del teorema del Problema 2.42 se rompe en el anillo.',
        application: {
          steps: [
            { title: 'Energías físicas', text: '$E_n\\geq0$ y crece cuadráticamente con $n$; el nivel $n=0$ tiene energía exactamente cero: un estado constante, sin energía mínima porque $\\psi$ no tiene que anularse en ninguna parte.' },
            { title: 'Degeneración doble', text: 'Para $n\\geq1$, $\\psi_n^{+}$ y $\\psi_n^{-}$ no son múltiplos una de la otra: corriente en sentidos opuestos con la misma energía, degeneración genuina.' },
            { title: 'Por qué falla 2.42', text: 'El teorema del Problema 2.42 usó $\\psi\\to0$ en $\\pm\\infty$; en el anillo $x$ vive en un intervalo finito y esa condición no existe: la constante $W$ no puede fijarse y la degeneración escapa.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '$$\\psi_n^{\\pm}(x) = \\frac{1}{\\sqrt{a}}\\,e^{\\pm i(2n\\pi x/a)}; \\qquad E_n = \\frac{2n^2\\pi^2\\hbar^2}{ma^2}, \\qquad n = 0, 1, 2, 3, \\dots$$ (para $n = 0$ hay una única solución). El teorema falla porque aquí $\\psi$ no tiende a cero en el infinito: $x$ está restringido a un intervalo finito y la constante $K$ del Problema 2.42 no puede determinarse.',
      page: 48,
      note: 'El manual de la 2.ª ed. denomina $L$ a la circunferencia del anillo; aquí se usa $a$, como en el enunciado de la 1.ª ed.',
    },
  },
  'bp-2-44': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Un problema *estrictamente cualitativo*: las herramientas son las reglas de forma de las funciones de onda (continuidad, decaimiento exponencial en región prohibida, nodos que se suman de nivel en nivel, paridad). Los tres regímenes de $b$ son: un pozo simple de anchura $2a$, dos pozos acoplados por una barrera, y dos pozos aislados.',
        application: {
          steps: [
            { title: 'Acepta las reglas del juego', text: 'Problema estrictamente cualitativo: nada de cálculos; las herramientas son las reglas de forma (decaimiento exponencial fuera, senos dentro, cosh/sinh en la barrera, nodos crecientes, paridad).' },
            { title: 'Identifica los regímenes', text: '(i) $b=0$: un pozo finito de anchura $2a$; (ii) $b\\approx a$: dos pozos acoplados por una barrera; (iii) $b\\gg a$: dos pozos casi aislados de anchura $a$.' },
            { title: 'Fija el catálogo', text: '$\\psi_1$ es par y sin nodos; $\\psi_2$ es impar con un nodo: ese catálogo vale en los tres regímenes y ordena los bocetos del apartado (a).' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'En (a), dibuja región por región: fuera de los pozos la función decae exponencialmente; dentro es sinusoidal; en la barrera central (región prohibida) va como coseno hiperbólico (estado par) o seno hiperbólico (impar). Respeta el catálogo: $\\psi_1$ par y sin nodos, $\\psi_2$ impar con un nodo.',
        application: {
          steps: [
            { title: 'Dibuja por regiones', text: 'Fuera de los pozos ($E<V$, región prohibida) la función decae exponencialmente hacia cero; dentro de cada pozo es sinusoidal, con la curvatura hacia el eje.' },
            { title: 'Trata la barrera central', text: 'Entre los pozos también es región prohibida: para el estado par la forma es coseno hiperbólico (máximo en el centro) y para el impar seno hiperbólico (nodo en el centro).' },
            { title: 'Cuenta nodos y paridad', text: '$\\psi_1$: par, cero nodos; $\\psi_2$: impar, un nodo en el origen — esa cuenta no cambia al variar $b$.' },
            { title: 'Ancla las energías para (b)', text: 'Los extremos de $E_1(b)$ y $E_2(b)$ se comparan con las energías de la Ec. 2.157: pozo de anchura $2a$ en $b=0$ y pozos aislados de anchura $a$ cuando $b\\to\\infty$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Para (b) no calcules: usa la Ec. 2.157 — el pozo finito de anchura $2a$ fija las energías de referencia en $b = 0$, y cada pozo aislado de anchura $a$ fija el destino cuando $b \\to \\infty$; entre ambos extremos interpola suavemente y observa que las dos curvas se acercan sin cruzarse.',
        application: {
          steps: [
            { title: 'Boceto (i): b=0', text: 'Pozo finito ordinario: $\\psi_1$ tipo coseno dentro del pozo y decaimiento fuera, sin nodos; $\\psi_2$ tipo seno con su nodo en el centro.' },
            { title: 'Boceto (ii): b≈a', text: 'Senos dentro de cada pozo; en la barrera $\\psi_1$ desciende suavemente en forma de cosh y $\\psi_2$ la cruza por cero como sinh; fuera, decaimiento exponencial.' },
            { title: 'Boceto (iii): b≫a', text: 'La función en la barrera es minúscula: esencialmente dos pozos independientes; $\\psi_1$ y $\\psi_2$ son las combinaciones par e impar de los fundamentales de cada pozo, casi degeneradas.' },
            { title: 'Anclas cuantitativas de (b)', text: 'Con $h\\equiv\\frac{\\pi^2\\hbar^2}{2ma^2}$: en $b=0$, $E_1+V_0\\approx\\frac{h}{4}$ y $E_2+V_0\\approx h$ (pozo de anchura $2a$); en $b\\to\\infty$, ambas tienden a $h$ (pozos de anchura $a$).' },
            { title: 'Traza las curvas', text: '$E_1(b)$ sube desde $\\frac{h}{4}$ hacia $h$ (más confinamiento, más curvatura); $E_2(b)$ parte de $h$ y regresa a $h$: las dos curvas se acercan asintóticamente sin cruzarse.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'La regla de oro cualitativa: dentro de un pozo $\\frac{d^2\\psi}{dx^2} = -\\frac{2m}{\\hbar^2}(V_0 + E)\\psi$, así que a más curvatura, más energía — úsala para ordenar tus bocetos y justificar la forma de las curvas $E_1(b)$ y $E_2(b)$. En (c) responde con tu gráfica de (b): ¿en qué configuración es mínima la energía del electrón?',
        application: {
          steps: [
            { title: 'Aplica la regla de curvatura', text: 'Dentro de un pozo $\\frac{d^2\\psi}{dx^2}=-\\frac{2m}{\\hbar^2}(V_0+E)\\psi$: más curvatura equivale a más energía, y esa regla ordena los bocetos y justifica el sentido de $E_1(b)$.' },
            { title: 'Justifica el ascenso', text: 'Al crecer $b$, el electrón pasa de aprovechar $2a$ de anchura a confinarse en anchura $a$: más curvatura y más energía — de ahí la subida de $\\frac{h}{4}$ hacia $h$.' },
            { title: 'Responde (c)', text: 'El mínimo del estado fundamental (par) está en $b\\to0$: el electrón acerca los núcleos (favorece el enlace); en el primer excitado (impar) la energía baja al separarlos: los empuja.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) (i) $b = 0$: pozo finito ordinario — decae exponencial fuera, sinusoidal dentro (coseno para $\\psi_1$, seno para $\\psi_2$); sin nodos $\\psi_1$, un nodo $\\psi_2$. (ii) $\\psi_1$ par y $\\psi_2$ impar: decaimiento exponencial fuera, senos dentro de los pozos y cosh/senh en la barrera. (iii) $b \\gg a$: función muy pequeña en la barrera — esencialmente dos pozos aislados, con $\\psi_1$ y $\\psi_2$ degenerados: combinaciones par e impar de los estados fundamentales de cada pozo. (b) Para $b = 0$: $E_1 + V_0 \\approx \\frac{\\pi^2\\hbar^2}{2m(2a)^2} = \\frac{h}{4}$ y $E_2 + V_0 \\approx \\frac{4\\pi^2\\hbar^2}{2m(2a)^2} = h$, con $h \\equiv \\frac{\\pi^2\\hbar^2}{2ma^2}$; para $b \\gg a$: $E_1 + V_0 \\approx E_2 + V_0 \\approx \\frac{\\pi^2\\hbar^2}{2ma^2} = h$ (de nuevo ligeramente por debajo): $E_1$ sube desde $h/4$ hasta $h$ y $E_2$ parte de $h$ y vuelve a $h$, acercándose a $E_1$. (c) En el estado fundamental (par) la energía es mínima con $b \\to 0$: el electrón tiende a *acercar* los núcleos (favorece el enlace); en el primer excitado (impar), el electrón *separa* los núcleos.',
      page: 49,
    },
  },
  'bp-2-45': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'El famoso *estado coherente* del oscilador: un paquete gaussiano que no se deforma y cuyo centro oscila como un oscilador clásico. La parte (a) no es "resolver" sino *verificar por sustitución*; las partes (b) y (c) extraen la física del resultado.',
        application: {
          steps: [
            { title: 'Identifica el objeto', text: 'Es el estado coherente: una gaussiana de anchura fija cuyo centro oscila como un oscilador clásico; el enunciado la da construida y pide verificarla, no derivarla.' },
            { title: 'Reparte el trabajo', text: '(a) es sustitución directa en la ecuación dependiente del tiempo (con el potencial de la Ec. 2.38); (b) es tomar módulo cuadrado y completar un cuadrado; (c) son lecturas de la gaussiana resultante.' },
            { title: 'Mira la estructura del exponente', text: 'El exponente agrupa $x^2$, un término $\\frac{a^2}{2}(1+e^{-2i\\omega t})$, uno lineal en $t$ y el cruzado $-2axe^{-i\\omega t}$: el centro del paquete vivirá en ese término cruzado.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'En (a) deriva $\\Psi$ respecto a $t$, $x$ y $x^2$ con la regla de la cadena (el prefactor es constante: solo deriva el exponente). Sustituye todo en $i\\hbar\\,\\partial_t\\Psi = -\\frac{\\hbar^2}{2m}\\partial_x^2\\Psi + \\frac{1}{2}m\\omega^2x^2\\Psi$ y agrupa términos semejantes.',
        application: {
          steps: [
            { title: 'Deriva con la cadena', text: 'El prefactor $\\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4}$ es constante: solo se deriva el exponente, y cada derivada es $\\Psi$ por la derivada del exponente.' },
            { title: 'Calcula las tres derivadas', text: 'Necesitas $\\partial_t\\Psi$, $\\partial_x\\Psi$ y $\\partial_x^2\\Psi$; en la segunda derivada espacial aparece el cuadrado de la primera, más la derivada de esta.' },
            { title: 'Sustituye en la TDSE', text: 'Lleva todo a $i\\hbar\\,\\partial_t\\Psi=-\\frac{\\hbar^2}{2m}\\partial_x^2\\Psi+\\frac12m\\omega^2x^2\\Psi$ y agrupa: constantes, términos en $x$ y exponenciales $e^{-i\\omega t}$.' },
            { title: 'Prepara (b) y (c)', text: 'Para (b) multiplica $\\Psi^*\\Psi$ (los exponentes se suman y lo imaginario se va); para (c), la gaussiana ya centrada entrega los valores esperados sin integrar.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'En (b), al multiplicar $\\Psi^*\\Psi$ el exponente se vuelve real salvo por los términos con $e^{\\pm 2i\\omega t}$: usa $1 + \\cos 2\\omega t = 2\\cos^2\\omega t$ hasta dejar un cuadrado perfecto de la forma $(x - \\text{algo que oscila})^2$. En (c), con $|\\Psi|^2$ ya gaussiano y centrado, los valores esperados salen sin integrar.',
        application: {
          steps: [
            { title: 'Miembro temporal', text: 'Derivando el exponente respecto a $t$: $i\\hbar\\,\\partial_t\\Psi=\\left[\\frac{\\hbar\\omega}{2}+ma\\omega^2xe^{-i\\omega t}-\\frac12m\\omega^2a^2e^{-2i\\omega t}\\right]\\Psi$.' },
            { title: 'Miembro espacial', text: 'Como $\\partial_x\\Psi=-\\frac{m\\omega}{\\hbar}(x-ae^{-i\\omega t})\\Psi$: $-\\frac{\\hbar^2}{2m}\\partial_x^2\\Psi=\\left[\\frac{\\hbar\\omega}{2}-\\frac12m\\omega^2(x-ae^{-i\\omega t})^2\\right]\\Psi$.' },
            { title: 'Suma el potencial', text: 'Al añadir $\\frac12m\\omega^2x^2\\Psi$ los términos $x^2$ se cancelan y queda el mismo corchete del paso 1: la ecuación se cumple y (a) queda verificada.' },
            { title: 'Módulo cuadrado en (b)', text: 'El exponente de $\\Psi^*\\Psi$ es $-\\frac{m\\omega}{\\hbar}\\,\\mathrm{Re}(\\cdot)$; con $1+\\cos2\\omega t=2\\cos^2\\omega t$, la parte real se vuelve $x^2-2ax\\cos\\omega t+a^2\\cos^2\\omega t=(x-a\\cos\\omega t)^2$.' },
            { title: 'Describe y extrae (c)', text: '$|\\Psi|^2=\\sqrt{\\frac{m\\omega}{\\pi\\hbar}}\\,e^{-\\frac{m\\omega}{\\hbar}(x-a\\cos\\omega t)^2}$: gaussiana rígida de centro $a\\cos\\omega t$; por simetría $\\langle x\\rangle=a\\cos\\omega t$ y $\\langle p\\rangle=m\\frac{d\\langle x\\rangle}{dt}=-ma\\omega\\sin\\omega t$.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Comprueba Ehrenfest en (c): $m\\frac{d\\langle x\\rangle}{dt} = \\langle p \\rangle$ y $m\\frac{d\\langle p\\rangle}{dt} = -\\left\\langle\\frac{dV}{dx}\\right\\rangle$ con $V = \\frac{1}{2}m\\omega^2x^2$; y el movimiento del centro debe ser el del oscilador clásico — consistente entre lo que describiste en (b) y lo que calculaste en (c).',
        application: {
          steps: [
            { title: 'Primera de Ehrenfest', text: '$m\\frac{d\\langle x\\rangle}{dt}=-ma\\omega\\sin\\omega t=\\langle p\\rangle$: se cumple la primera mitad de la Ec. 1.38.' },
            { title: 'Segunda de Ehrenfest', text: '$m\\frac{d\\langle p\\rangle}{dt}=-m\\omega^2a\\cos\\omega t=-m\\omega^2\\langle x\\rangle=-\\left\\langle\\frac{dV}{dx}\\right\\rangle$ con $V=\\frac12m\\omega^2x^2$: dinámica clásica del oscilador.' },
            { title: 'Consistencia (b) con (c)', text: 'El movimiento descrito en (b) — centro oscilante con amplitud $a$ y frecuencia $\\omega$, sin deformación — es exactamente el que cuantifican los valores esperados de (c).' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) (Verificación por sustitución: ambos miembros dan $\\left[\\frac{1}{2}\\hbar\\omega + max\\omega^2e^{-i\\omega t} - \\frac{1}{2}m\\omega^2a^2e^{-2i\\omega t}\\right]\\Psi$.) (b) $$|\\Psi(x,t)|^2 = \\sqrt{\\frac{m\\omega}{\\pi\\hbar}}\\;e^{-\\frac{m\\omega}{\\hbar}\\left(x - a\\cos\\omega t\\right)^2}:$$ un paquete gaussiano de forma fija cuyo centro oscila senoidalmente, con amplitud $a$ y frecuencia angular $\\omega$. (c) $\\langle x \\rangle = a\\cos\\omega t$; $\\langle p \\rangle = m\\frac{d\\langle x\\rangle}{dt} = -ma\\omega\\sin\\omega t$; y $\\frac{d\\langle p\\rangle}{dt} = -m\\omega^2a\\cos\\omega t = -\\left\\langle\\frac{dV}{dx}\\right\\rangle$: se satisface el teorema de Ehrenfest.',
      page: 51,
    },
  },
  'bp-2-46': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Un estado *casi* ligado: pared infinita a la izquierda, barrera delta a distancia $a$, y túnel hacia el continuo a la derecha. Es la física de resonancias y decaimiento — y por eso el enunciado pone "energía" entre comillas: prepárate para un valor propio complejo.',
        application: {
          steps: [
            { title: 'Reconoce el régimen', text: 'Estado cuasi-ligado: pared infinita en $x=0$, barrera $\\alpha\\delta(x-a)$, y al exterior solo onda saliente $e^{ikx}$ — la condición típica de un problema de decaimiento por túnel (Figura 2.18).' },
            { title: 'Espera una energía compleja', text: 'La exigencia de solo onda saliente impedirá soluciones con $k$ real: de ahí las comillas de «energía» en el enunciado, anticipando un $E$ complejo.' },
            { title: 'Estructura del cálculo', text: '(a) resolver por regiones y empalmar en $x=a$; (b) señalar qué hipótesis del Problema 2.1a se rompe; (c) traducir la parte imaginaria de $E$ a un tiempo de fuga.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Dentro del pozo ($0 < x < a$) la solución es oscilatoria y debe anularse en $x = 0$; fuera ($x > a$) impón *solo onda saliente*, $\\propto e^{ikx}$. La delta en $x = a$ pide continuidad de $\\psi$ y el salto de $\\psi\'$ correspondiente a una barrera.',
        application: {
          steps: [
            { title: 'Región del pozo', text: 'Para $0<x<a$ (potencial nulo): $\\psi=A\\sin kx$, porque la pared infinita obliga a $\\psi(0)=0$.' },
            { title: 'Región exterior', text: 'Para $x>a$: $\\psi=Be^{ikx}$, onda puramente saliente sin componente entrante $e^{-ikx}$.' },
            { title: 'Empalme en la delta', text: 'En $x=a$ impón continuidad ($A\\sin ka=B$) y el salto de la derivada con signo de barrera: la derivada a la derecha menos la de la izquierda vale $\\frac{2m\\alpha}{\\hbar^2}A\\sin ka$.' },
            { title: 'Cuenta el sistema', text: 'Con $A$ y $B$ como únicas constantes (la escala global es libre), la compatibilidad de las dos condiciones da una ecuación implícita para $k$, y con ella la «energía» $E=\\frac{\\hbar^2k^2}{2m}$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Con dos condiciones en $x = a$ y dos constantes de integración, la compatibilidad te deja una ecuación trascendente para $k$ (y por tanto para $E$) — con la condición de radiación puramente saliente, no tiene soluciones con $k$ real: ahí vive la complejidad.',
        application: {
          steps: [
            { title: 'Sustituye el ansatz', text: 'Con derivada $Ak\\cos kx$ a la izquierda del punto $a$ e $ikB$ a la derecha: $ikB-Ak\\cos ka=\\frac{2m\\alpha}{\\hbar^2}A\\sin ka$.' },
            { title: 'Usa la continuidad', text: 'Sustituye $B=A\\sin ka$ y divide entre $A\\sin ka$: $ik-k\\cot(ka)=\\frac{2m\\alpha}{\\hbar^2}$.' },
            { title: 'Escribe la ecuación implícita', text: 'Reagrupando: $k\\cot(ka)=ik-\\frac{2m\\alpha}{\\hbar^2}$ — esa es la respuesta de (a), con $E=\\frac{\\hbar^2k^2}{2m}$.' },
            { title: 'Detecta la complejidad', text: 'Con $k$ real, la izquierda sería real y la derecha compleja: no hay solución real, así que $k$ y $E$ deben ser complejos, como avisaba el enunciado.' },
            { title: 'Control del límite duro', text: 'Con $\\alpha\\to\\infty$ la ecuación empuja $k\\cot(ka)\\to-\\infty$, o sea $ka\\to\\pi,2\\pi,\\dots$: se recuperan los niveles del pozo infinito de anchura $a$, que el túnel finito desplaza y complejiza.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Para (b), recuerda qué exigía la demostración del Problema 2.1a (autovalores reales): un hamiltoniano hermítico. Revisa cuál de tus condiciones de frontera rompe la hermiticidad (haz la integración por partes de $\\int\\psi^*H\\psi$ y mira los términos de superficie). Para (c), escribe $E = E_0 + i\\Gamma$ y sigue el módulo al cuadrado de la parte del paquete que vive en el pozo: el decaimiento exponencial te da el tiempo $1/e$ — cuidado con el factor exacto entre amplitud y probabilidad.',
        application: {
          steps: [
            { title: 'Localiza la no hermiticidad', text: 'El Problema 2.1a exigía un hamiltoniano hermítico; aquí la condición de solo onda saliente rompe la hermiticidad: el término de superficie de $\\int\\psi^*H\\psi\\,dx$ no se anula (para $e^{ikx}$, $\\psi^*\\frac{d\\psi}{dx}-\\frac{d\\psi^*}{dx}\\psi=2ik\\neq0$).' },
            { title: 'Evoluciona con E compleja', text: 'Con $E=E_0+i\\Gamma$ el estado evoluciona como $\\psi\\,e^{-iE_0t/\\hbar}e^{\\Gamma t/\\hbar}$; la raíz física de (a) tiene $\\Gamma<0$, así que la amplitud en el pozo decae.' },
            { title: 'Tiempo característico 1/e', text: 'La probabilidad de seguir en $(0,a)$ va como el módulo al cuadrado, $e^{2\\Gamma t/\\hbar}$: el tiempo $1/e$ es $\\tau=-\\frac{\\hbar}{2\\Gamma}=\\frac{\\hbar}{2|\\Gamma|}$ — ojo con ese factor 2 entre amplitud y probabilidad.' },
          ],
        },
      },
    ],
  },
  'bp-2-47': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'El estado ligado del pozo delta puesto en movimiento uniforme: un problema de *comprobación*, no de resolución — el enunciado te da la solución exacta y te pide verificarla. Reconocerás la estructura de "boost galileano" en la fase $e^{-i[(E + \\frac{1}{2}mv^2)t - mvx]/\\hbar}$.',
        application: {
          steps: [
            { title: 'Reconoce el boost galileano', text: 'La solución es el estado ligado del pozo delta, $e^{-m\\alpha|x-vt|/\\hbar^2}$, arrastrado a velocidad $v$ y vestido con la fase $e^{-i[(E+\\frac12mv^2)t-mvx]/\\hbar}$.' },
            { title: 'Lee la tarea', text: 'Nada que resolver: en (a) se sustituye $\\Psi$ en la ecuación dependiente del tiempo con $V(x,t)=-\\alpha\\delta(x-vt)$ y se comprueba — usando el Problema 2.24b para la delta.' },
            { title: 'Organiza las derivadas', text: 'Todo el cálculo local está en $|x-vt|$: su primera derivada produce el factor escalón y, al derivar otra vez, aparece la delta — eso es lo que engendra el potencial.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Calcula $\\partial\\Psi/\\partial t$, $\\partial\\Psi/\\partial x$ y $\\partial^2\\Psi/\\partial x^2$ y sustituye en la ecuación de Schrödinger dependiente del tiempo con $V(x,t) = -\\alpha\\delta(x - vt)$. Todo el cálculo local está en las derivadas de $|x - vt|$.',
        application: {
          steps: [
            { title: 'Escribe por piezas', text: 'Con $y\\equiv x-vt$ y $\\phi\\equiv(E+\\frac12mv^2)t-mvx$: $\\Psi=\\frac{\\sqrt{m\\alpha}}{\\hbar}e^{-m\\alpha|y|/\\hbar^2}e^{-i\\phi/\\hbar}$, con $E=-\\frac{m\\alpha^2}{2\\hbar^2}$.' },
            { title: 'Derivadas temporales', text: 'Con $\\sigma\\equiv2\\theta(x-vt)-1$ se tiene $\\frac{\\partial|x-vt|}{\\partial t}=-v\\sigma$, así que $\\partial_t\\Psi=\\Psi\\left[\\frac{m\\alpha v}{\\hbar^2}\\sigma-\\frac{i}{\\hbar}\\left(E+\\frac12mv^2\\right)\\right]$.' },
            { title: 'Derivadas espaciales', text: 'Con $\\frac{\\partial|x-vt|}{\\partial x}=\\sigma$: $\\partial_x\\Psi=\\Psi\\left[-\\frac{m\\alpha}{\\hbar^2}\\sigma+\\frac{imv}{\\hbar}\\right]$; y $\\frac{\\partial\\sigma}{\\partial x}=2\\delta(x-vt)$ aparecerá en $\\partial_x^2\\Psi$.' },
            { title: 'Sustituye y agrupa', text: 'Mete las tres derivadas en la ecuación dependiente del tiempo y agrupa: términos constantes, términos en $\\sigma$ y términos con delta.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'Escribe $\\frac{\\partial}{\\partial t}|x - vt| = -v[2\\theta(x - vt) - 1]$ y $\\frac{\\partial}{\\partial x}|x - vt| = 2\\theta(x - vt) - 1$; en la segunda derivada espacial aparece $\\frac{\\partial}{\\partial x}\\theta(x - vt) = \\delta(x - vt)$ (Problema 2.24b), que es quien engendra la delta del potencial. Agrupa los términos en potencias de $[2\\theta - 1]$ y verifica que se cancelan solos.',
        application: {
          steps: [
            { title: 'Segunda derivada espacial', text: 'Usando $\\sigma^2=1$: $\\partial_x^2\\Psi=\\Psi\\left[\\left(\\frac{m\\alpha}{\\hbar^2}\\right)^2-\\frac{2im^2\\alpha v}{\\hbar^3}\\sigma-\\frac{m^2v^2}{\\hbar^2}-\\frac{2m\\alpha}{\\hbar^2}\\delta(x-vt)\\right]$.' },
            { title: 'Lado derecho', text: 'Al multiplicar por $-\\frac{\\hbar^2}{2m}$ y sumar $V\\Psi=-\\alpha\\delta(x-vt)\\Psi$, la delta cinética $+\\alpha\\delta(x-vt)\\Psi$ se cancela con la del potencial; queda $\\left[E+\\frac12mv^2+\\frac{im\\alpha v}{\\hbar}\\sigma\\right]\\Psi$.' },
            { title: 'Lado izquierdo', text: 'Del planteamiento: $i\\hbar\\,\\partial_t\\Psi=\\left[E+\\frac12mv^2+\\frac{im\\alpha v}{\\hbar}\\sigma\\right]\\Psi$ — exactamente el mismo corchete.' },
            { title: 'Verifica término a término', text: 'Constantes ($E$ y $\\frac12mv^2$) y término en $\\sigma$ coinciden en ambos miembros, y las deltas ya se cancelaron: la solución exacta queda verificada.' },
            { title: 'Recicla para (b)', text: 'Guarda el $i\\hbar\\,\\partial_t\\Psi$ ya calculado: en (b), $\\langle H\\rangle=\\int\\Psi^*(i\\hbar\\,\\partial_t\\Psi)\\,dx$ no exige trabajo nuevo.' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Para (b) usa $\\langle H \\rangle = \\int \\Psi^*(i\\hbar\\,\\partial_t\\Psi)\\,dx$: ya calculaste $i\\hbar\\partial_t\\Psi$ en (a), así que no hay trabajo nuevo (y el término con $[2\\theta - 1]$ es impar en $y = x - vt$, así que su integral se va a cero). Interpreta: en el límite $v \\to 0$ el resultado debe ser la energía de ligadura $E$ del pozo quieto.',
        application: {
          steps: [
            { title: 'Calcula la media de H', text: '$\\langle H\\rangle=\\int|\\Psi|^2\\left[E+\\frac12mv^2+\\frac{im\\alpha v}{\\hbar}\\sigma\\right]dx$: el término con $\\sigma$ es impar en $y=x-vt$ y $|\\Psi|^2$ es par, así que integra cero.' },
            { title: 'Interpreta', text: '$\\langle H\\rangle=E+\\frac12mv^2$ (con $E=-\\frac{m\\alpha^2}{2\\hbar^2}$): energía de ligadura del pozo quieto más la cinética del arrastre — un boost galileano.' },
            { title: 'Chequea el límite quieto', text: 'Con $v\\to0$ la fase se reduce a $e^{-iEt/\\hbar}$ y $\\langle H\\rangle\\to E$: el estado ligado estático de la sección 2.5, con $|\\Psi|^2=\\frac{m\\alpha}{\\hbar^2}e^{-2m\\alpha|x|/\\hbar^2}$ correctamente normalizada.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) (Verificación por sustitución: ambos miembros coinciden.) (b) $|\\Psi|^2 = \\frac{m\\alpha}{\\hbar^2}e^{-2m\\alpha|y|/\\hbar^2}$ (con $y \\equiv x - vt$), correctamente normalizada; $$\\langle H \\rangle = E + \\frac{1}{2}mv^2$$ (con $E = -m\\alpha^2/2\\hbar^2$). Interpretación: el paquete es arrastrado (a velocidad $v$) por el pozo delta; la energía total es la que tendría en un delta estacionario ($E$) más la energía cinética del movimiento ($\\frac{1}{2}mv^2$).',
      page: 52,
    },
  },
  'bp-2-48': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'El potencial de Pöschl–Teller, $-\\frac{\\hbar^2a^2}{m}\\mathrm{sech}^2(ax)$: un pozo célebre porque es *sin reflexión* — transmite todo, a cualquier energía. Tres movimientos: verificar el estado ligado, verificar las soluciones de dispersión y conectar con la matriz S del problema 2.34.',
        application: {
          steps: [
            { title: 'Clasifica el potencial', text: 'Es el pozo de Pöschl–Teller $V(x)=-\\frac{\\hbar^2a^2}{m}\\mathrm{sech}^2(ax)$: célebre por ser sin reflexión — transmite todo, a cualquier energía.' },
            { title: 'Reparte los apartados', text: '(a) verificar el estado ligado $\\psi_0=A\\,\\mathrm{sech}(ax)$ y hallar su $E$; (b) verificar las soluciones de dispersión $\\psi_k$ y sus asintóticos; (c) construir $S$ y leer los polos.' },
            { title: 'Reúne las herramientas', text: 'Las identidades $\\frac{d}{du}\\mathrm{sech}\\,u=-\\mathrm{sech}\\,u\\tanh u$, $\\frac{d}{du}\\tanh u=\\mathrm{sech}^2u$ y $\\tanh^2u+\\mathrm{sech}^2u=1$ hacen toda la álgebra.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'En (a), deriva $\\psi_0 = A\\,\\mathrm{sech}(ax)$ dos veces (regla de la cadena) y sustituye en la ecuación de Schrödinger: debe salir un múltiplo constante de $\\psi_0$, y de ahí $E$. Para normalizar usa $\\frac{d}{du}\\tanh u = \\mathrm{sech}^2 u$.',
        application: {
          steps: [
            { title: 'Deriva dos veces', text: 'Con $u=ax$: la primera derivada de $\\mathrm{sech}(ax)$ trae un $\\tanh(ax)$, y la segunda produce términos con $\\mathrm{sech}$, $\\mathrm{sech}\\cdot\\tanh^2$ y $\\mathrm{sech}^3$.' },
            { title: 'Sustituye en la TISE', text: 'Lleva la segunda derivada a $-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi_0}{dx^2}-\\frac{\\hbar^2a^2}{m}\\mathrm{sech}^2(ax)\\psi_0=E\\psi_0$: los términos con $\\mathrm{sech}^2$ deben cancelarse entre sí para que quede $E$ constante.' },
            { title: 'Normaliza con tanh', text: 'Como $\\frac{d}{dx}\\tanh(ax)=a\\,\\mathrm{sech}^2(ax)$, se tiene $\\int_{-\\infty}^{\\infty}\\mathrm{sech}^2(ax)dx=\\frac{2}{a}$: eso fija $A$.' },
            { title: 'Prepara (b)', text: 'Para $\\psi_k=A\\frac{ik-a\\tanh(ax)}{ik+a}e^{ikx}$ repite el esquema (derivar, sustituir, usar $\\tanh^2+\\mathrm{sech}^2=1$) y saca los asintóticos con $\\tanh z\\to\\pm1$.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'La identidad que lo sostiene todo es $\\tanh^2 u + \\mathrm{sech}^2 u = 1$. En (b), al sustituir $\\psi_k$, los términos con $\\mathrm{sech}^2\\tanh$ van en parejas que se cancelan; para el comportamiento asintótico usa $\\tanh z \\to \\pm 1$ según el signo de $z$, y calcula $R$ y $T$ comparando los módulos al cuadrado de las amplitudes incidente y transmitida.',
        application: {
          steps: [
            { title: 'Derivada segunda de sech', text: 'Reuniendo términos: $\\frac{d^2\\psi_0}{dx^2}=a^2\\psi_0\\left[\\tanh^2(ax)-\\mathrm{sech}^2(ax)\\right]=a^2\\psi_0\\left[1-2\\,\\mathrm{sech}^2(ax)\\right]$, usando $\\tanh^2u+\\mathrm{sech}^2u=1$.' },
            { title: 'Energía del ligado', text: 'Al sustituir, los términos $\\mathrm{sech}^2$ del cinético y del potencial se cancelan y queda $E=-\\frac{\\hbar^2a^2}{2m}$: $\\psi_0$ es autofunción con energía puramente negativa.' },
            { title: 'Normalización', text: '$A^2\\cdot\\frac{2}{a}=1$ da $A=\\sqrt{\\frac{a}{2}}$: $\\psi_0(x)=\\sqrt{\\frac{a}{2}}\\,\\mathrm{sech}(ax)$, una campana centrada que decae a ambos lados.' },
            { title: 'Asintóticos a ambos lados', text: 'Con $x\\to-\\infty$ ($\\tanh\\to-1$): $\\psi_k\\to Ae^{ikx}$, incidente pura sin $e^{-ikx}$; con $x\\to+\\infty$ ($\\tanh\\to+1$): $\\psi_k\\to A\\frac{ik-a}{ik+a}e^{ikx}$, transmitida pura.' },
            { title: 'Reflexión y transmisión', text: 'No hay onda reflejada: $R=0$; y $T=\\left|\\frac{ik-a}{ik+a}\\right|^2=\\frac{k^2+a^2}{k^2+a^2}=1$ para cualquier $k>0$ — el potencial es sin reflexión (la sustitución de $\\psi_k$ en la TISE sigue el patrón de (a): los términos $\\mathrm{sech}^2\\tanh$ se cancelan por parejas).' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Comprueba que $T = 1$ para cualquier $k$ — la firma de un potencial sin reflexión. En (c), los estados ligados viven en los *polos* de los elementos de S con $k$ imaginario ($k = i\\kappa$): localízalos, cuenta cuántos hay y contrasta sus energías con lo que encontraste en (a).',
        application: {
          steps: [
            { title: 'Ensambla la S-matrix', text: 'Con incidencia desde la izquierda ($G=0$): $S_{11}=0$ (nada reflejado) y $S_{21}=\\frac{ik-a}{ik+a}$; por simetría del potencial, $S_{22}=S_{11}=0$ y $S_{12}=S_{21}$.' },
            { title: 'Localiza los polos', text: 'El único denominador, $ik+a=0$, se anula en $k=ia$ (es decir $\\kappa=a$): un solo polo en el eje imaginario positivo, o sea, un único estado ligado.' },
            { title: 'Contrasta con (a)', text: 'El polo reproduce $E=-\\frac{\\hbar^2\\kappa^2}{2m}=-\\frac{\\hbar^2a^2}{2m}$, la misma energía de $\\psi_0$; y la matriz es unitaria de forma trivial ($T=1$, $R=0$).' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $E_0 = -\\frac{\\hbar^2a^2}{2m}$; $\\psi_0(x) = \\sqrt{\\frac{a}{2}}\\,\\mathrm{sech}(ax)$. (b) Para $x \\to +\\infty$: $\\psi_k(x) \\to A\\,\\frac{ik - a}{ik + a}\\,e^{ikx}$ (onda transmitida); $R = 0$ y $T = \\left|\\frac{ik - a}{ik + a}\\right|^2 = \\frac{k^2 + a^2}{k^2 + a^2} = 1$ (potencial sin reflexión). (c) $S = \\begin{pmatrix} 0 & \\frac{ik - a}{ik + a} \\\\ \\frac{ik - a}{ik + a} & 0 \\end{pmatrix}$: un único polo en $ik + a = 0$, es decir $k = ia$ ($\\kappa = a$), que corresponde a **un solo** estado ligado, $E_0 = -\\hbar^2a^2/2m$, consistente con (a).',
      page: 54,
      note: 'La 2.ª ed. reformuló el problema («M») y la solución oficial (2.51) cubre solo (a) y (b); la S-matrix de (c) se reconstruye aquí de las formas asintóticas de (b) (sin onda reflejada, $S_{11} = S_{22} = 0$) y su polo reproduce el estado ligado de (a).',
    },
  },
  'bp-2-49': {
    hints: [
      {
        kind: 'reconocimiento',
        text: 'Un problema de *álgebra lineal de amplitudes*: cambiar de variables entre (salientes/entrantes) y (izquierda/derecha). Casi no hay física nueva — el valor está en que la matriz M se *compone*, lo que convierte un potencial complicado en un producto de piezas simples.',
        application: {
          steps: [
            { title: 'Clasifica el problema', text: 'Es álgebra lineal de amplitudes: dos cambios de variables (salientes/entrantes frente a derecha/izquierda) y fórmulas para $R$ y $T$ — apenas física nueva.' },
            { title: 'Fija las convenciones', text: '$\\begin{pmatrix}B\\\\F\\end{pmatrix}=S\\begin{pmatrix}A\\\\G\\end{pmatrix}$ y $\\begin{pmatrix}F\\\\G\\end{pmatrix}=M\\begin{pmatrix}A\\\\B\\end{pmatrix}$: las mismas cuatro amplitudes ordenadas de dos maneras distintas.' },
            { title: 'Vislumbra la ventaja', text: 'La gracia de $M$ es que se compone: en (b)–(d) un potencial complicado se arma multiplicando las matrices de piezas simples.' },
          ],
        },
      },
      {
        kind: 'planteamiento',
        text: 'Escribe el sistema $B = S_{11}A + S_{12}G$, $F = S_{21}A + S_{22}G$ y despeja $(F, G)$ en función de $(A, B)$: es una eliminación gaussiana 2×2. Para la relación inversa, el mismo juego al revés; conviene verificar que las fórmulas de ida y vuelta se anulan mutuamente.',
        application: {
          steps: [
            { title: 'Despeja en (a)', text: 'De $B=S_{11}A+S_{12}G$ saca $G=\\frac{B-S_{11}A}{S_{12}}$; llévalo a $F=S_{21}A+S_{22}G$ y agrupa los términos en $A$ y en $B$.' },
            { title: 'Recupera la inversa', text: 'El mismo juego al revés (despejar $A$ y $B$ desde las fórmulas de $M$) devuelve $S$ en función de $M$; comprueba que ida y vuelta se anulan mutuamente.' },
            { title: 'Traduce R y T', text: 'Con incidencia desde la izquierda ($G=0$): $R_l=|S_{11}|^2$ y $T_l=|S_{21}|^2$; después se expresan con elementos de $M$.' },
            { title: 'Prepara (b)', text: 'Nombra $(C,D)$ las amplitudes en la zona intermedia entre las dos piezas del potencial: escribe las dos relaciones de $M$ y encadénalas.' },
          ],
        },
      },
      {
        kind: 'tecnica',
        text: 'En (c) ten claro qué fases introduce una delta situada en $x = a$: los elementos fuera de la diagonal llevan $e^{\\mp 2ika}$. En (d), al componer, la matriz del dispersor que la onda encuentra **primero** queda a la **derecha** del producto; y para $T$ usa $T = 1/|M_{22}|^2$ con la $M$ total.',
        application: {
          steps: [
            { title: 'Resultado de (a)', text: 'La eliminación da $M=\\frac{1}{S_{12}}\\begin{pmatrix}-\\det S & S_{22}\\\\ -S_{11} & 1\\end{pmatrix}$; invirtiendo, $S=\\frac{1}{M_{22}}\\begin{pmatrix}-M_{21} & 1\\\\ \\det M & M_{12}\\end{pmatrix}$.' },
            { title: 'R y T con M', text: 'De ahí: $R_l=\\left|\\frac{M_{21}}{M_{22}}\\right|^2$, $T_l=\\left|\\frac{\\det M}{M_{22}}\\right|^2$, $R_r=\\left|\\frac{M_{12}}{M_{22}}\\right|^2$ y $T_r=\\frac{1}{|M_{22}|^2}$.' },
            { title: 'Compón en (b)', text: 'Con $\\begin{pmatrix}C\\\\D\\end{pmatrix}=M_1\\begin{pmatrix}A\\\\B\\end{pmatrix}$ y $\\begin{pmatrix}F\\\\G\\end{pmatrix}=M_2\\begin{pmatrix}C\\\\D\\end{pmatrix}$ sigue $M=M_2M_1$: el dispersor que la onda encuentra primero queda a la derecha del producto.' },
            { title: 'Delta única en (c)', text: 'Para $V(x)=-\\alpha\\delta(x-a)$, empalma en $x=a$ con amplitudes «locales» $Ae^{ika}$, $Be^{-ika}$, $Fe^{ika}$, $Ge^{-ika}$ (la delta es la del 2.34) y desfasa después: $M=\\begin{pmatrix}1+i\\beta & i\\beta e^{-2ika}\\\\ -i\\beta e^{2ika} & 1-i\\beta\\end{pmatrix}$, con $\\beta\\equiv\\frac{m\\alpha}{\\hbar^2k}$.' },
            { title: 'Doble delta en (d)', text: 'Incidendo desde la izquierda la onda toca primero $\\delta(x+a)$: $M=M_+M_-$ (la matriz (c) multiplicada por su gemela con $a\\to-a$). Multiplicando queda $M_{22}=\\beta^2e^{4ika}+(1-i\\beta)^2$ y $T=\\frac{1}{1+4\\beta^2\\left(\\cos2ka-\\beta\\sin2ka\\right)^2}$ (con el orden de composición del manual, el signo del término $\\beta\\sin2ka$ se invierte).' },
          ],
        },
      },
      {
        kind: 'verificacion',
        text: 'Cada matriz de una delta debe tener determinante 1 (¿por qué? piensa en la conservación de la probabilidad al pasar de un lado al otro). La transmisión de la doble delta debe mostrar *resonancias* de transmisión perfecta a ciertos valores de $ka$ — interferencia entre las dos deltas — y reducirse a la de un pozo simple de fuerza $2\\alpha$ cuando las deltas coinciden ($a \\to 0$).',
        application: {
          steps: [
            { title: 'Determinante unitario', text: 'Para una delta: $\\det M=(1+i\\beta)(1-i\\beta)-(i\\beta e^{-2ika})(-i\\beta e^{2ika})=(1+\\beta^2)-\\beta^2=1$, como exige la conservación de probabilidad ($T_l=T_r$ pide $|\\det M|=1$).' },
            { title: 'Resonancias de la doble delta', text: '$T=1$ cuando $\\cos2ka=\\pm\\beta\\sin2ka$, es decir $\\tan2ka=\\frac{1}{\\beta}=\\frac{\\hbar^2k}{m\\alpha}$: interferencia entre las dos deltas con transmisión perfecta.' },
            { title: 'Límite de deltas coincidentes', text: 'Con $a\\to0$ las dos deltas se funden en un pozo de fuerza $2\\alpha$: $M\\to\\begin{pmatrix}1+2i\\beta & 2i\\beta\\\\ -2i\\beta & 1-2i\\beta\\end{pmatrix}$, la matriz de (c) con $\\beta\\to2\\beta$.' },
          ],
        },
      },
    ],
    finalAnswer: {
      answer: '(a) $M = \\frac{1}{S_{12}}\\begin{pmatrix} -\\det(S) & S_{22} \\\\ -S_{11} & 1 \\end{pmatrix}$; a la inversa, $S = \\frac{1}{M_{22}}\\begin{pmatrix} -M_{21} & 1 \\\\ \\det(M) & M_{12} \\end{pmatrix}$; y $R_l = |S_{11}|^2 = \\left|\\frac{M_{21}}{M_{22}}\\right|^2$, $T_l = |S_{21}|^2 = \\left|\\frac{\\det(M)}{M_{22}}\\right|^2$, $R_r = |S_{22}|^2 = \\left|\\frac{M_{12}}{M_{22}}\\right|^2$, $T_r = |S_{12}|^2 = \\frac{1}{|M_{22}|^2}$. (b) Con amplitudes intermedias $(C, D)$: $(C,D)^T = \\mathbf{M}_1(A,B)^T$ y $(F,G)^T = \\mathbf{M}_2(C,D)^T$, de modo que $\\mathbf{M} = \\mathbf{M}_2\\mathbf{M}_1$. (c) $M = \\begin{pmatrix} 1 + i\\beta & i\\beta e^{-2ika} \\\\ -i\\beta e^{2ika} & 1 - i\\beta \\end{pmatrix}$, con $\\beta \\equiv \\frac{m\\alpha}{\\hbar^2 k}$. (d) $M_1$ es la matriz de (c) y $M_2$ la misma con $a \\to -a$: $M = M_2M_1 = \\begin{pmatrix} 1 + 2i\\beta + \\beta^2(e^{4ika} - 1) & 2i\\beta(\\cos 2ka + \\beta\\sin 2ka) \\\\ -2i\\beta(\\cos 2ka + \\beta\\sin 2ka) & 1 - 2i\\beta + \\beta^2(e^{-4ika} - 1) \\end{pmatrix}$, y $$T = T_l = T_r = \\frac{1}{|M_{22}|^2} = \\frac{1}{1 + 4\\beta^2\\left(\\cos 2ka + \\beta\\sin 2ka\\right)^2}.$$',
      page: 56,
      note: 'Ojo en (d): el manual llama $M_1$ a la delta situada en $+a$ y compone $M = M_2M_1$, lo que equivale a intercambiar el orden de los dispersores (o a cambiar $\\alpha \\to -\\alpha$). Con el orden físico (incidiendo desde la izquierda, primero la delta en $-a$) el término $\\beta\\sin 2ka$ sale con signo opuesto: $T = 1/\\left[1 + 4\\beta^2(\\cos 2ka - \\beta\\sin 2ka)^2\\right]$ (verificado resolviendo directamente las condiciones de empalme; sus polos en $k = i\\kappa$ reproducen los estados ligados $\\kappa = \\frac{m\\alpha}{\\hbar^2}(1 \\pm e^{-2\\kappa a})$ de la doble delta, y sus resonancias $T = 1$ ocurren en $\\tan(2ka) = 1/\\beta$).',
    },
  },
}
