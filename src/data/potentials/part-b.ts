// ════════════════════════════════════════════════════════════════════════════
// POTENCIALES DEL LIBRO — Parte B: §2.3 Oscilador armónico + §2.4 Partícula libre
// ════════════════════════════════════════════════════════════════════════════
// Contenido pedagógico ORIGINAL (español). Las ecuaciones son las estándar
// de la mecánica cuántica. Formato de texto: markdown ligero + LaTeX
// (mismo convenio que part-a.ts: $...$ inline, $$...$$ en línea propia).

import type { BookPotential } from './types'

export const PART_B_POTENTIALS: BookPotential[] = [
  {
    id: 'pot-2-3',
    sectionId: '2.3',
    title: 'Oscilador armónico',
    tagline: 'Una partícula en un pozo con forma de parábola: el único potencial de la naturaleza cuyo espectro es una escalera de peldaños perfectamente iguales.',
    difficulty: 3,
    graphType: 'harmonic',
    vignette:
      'Es **el segundo gran potencial del examen** y el más rentable de toda la física: cerca de cualquier mínimo estable, todo potencial se comporta como una parábola, así que el oscilador describe las vibraciones de una molécula diatómica, los fonones de un sólido y, en general, cualquier sistema que «rebote» alrededor de un equilibrio. Si el enunciado menciona una molécula que vibra, un cristal o una frecuencia natural $\\omega$, estás aquí.\n\nEste potencial se puede resolver por **dos caminos independientes**: el analítico (serie de potencias) y el algebraico (operadores escaladera). El examen puede pedir cualquiera de los dos, y el algebraico resuelve además los valores esperados sin tocar una integral. Aquí recorremos el camino analítico paso a paso y guardamos el algebraico como la gran pista (la nº 6): domínalos a los dos.\n\nLa recompensa es el espectro más limpio de la mecánica cuántica: niveles **equiespaciados** $E_n=(n+\\tfrac{1}{2})\\hbar\\omega$, con un suelo que no es cero — la energía de punto cero $E_0=\\tfrac{1}{2}\\hbar\\omega$, la huella digital del principio de incertidumbre hecha fórmula.',
    setup: [
      'El potencial: una parábola con el mínimo en el origen, cada vez más dura al alejarse.',
      '$$V(x)=\\tfrac{1}{2}m\\omega^2x^2$$',
      'La ecuación de Schrödinger independiente del tiempo, ahora con un término $V(x)\\,\\psi$ que **cambia con $x$** en todas partes:',
      '$$-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2}+\\tfrac{1}{2}m\\omega^2x^2\\,\\psi=E\\psi.$$',
      '**Adimensionaliza antes de empezar.** Con el cambio de variable',
      '$$\\xi\\equiv\\sqrt{\\frac{m\\omega}{\\hbar}}\\,x$$',
      'y la constante adimensional $K\\equiv 2E/\\hbar\\omega$, la ecuación queda limpia de todo parámetro físico:',
      '$$\\frac{d^2\\psi}{d\\xi^2}=\\left(\\xi^2-K\\right)\\psi.$$',
      '**Por qué NO valen senos ni cosenos**: en el pozo infinito ganaban porque $k$ era constante en toda la región. Aquí el «$k$ local», $\\sqrt{2m(E-V)}/\\hbar$, cambia a cada punto: los coeficientes de la EDE no son constantes y las funciones trigonométricas dejan de ser soluciones. Hace falta otro plan: serie de potencias — o el atajo algebraico de las escaladoras.',
    ],
    derivation: {
      intro:
        'El método analítico completo, en el orden en que puedes reproducirlo en el examen. La estrategia: mirar primero qué pasa en el infinito, factorizar ese comportamiento y atacar lo que queda con una serie — que tendrá que terminar, o el estado no existe.',
      steps: [
        {
          title: 'La EDE en forma adimensional',
          text: 'Partiendo de la EDE con $V=\\tfrac{1}{2}m\\omega^2x^2$ y cambiando $x\\to\\xi$ con $\\xi=\\sqrt{m\\omega/\\hbar}\\,x$, cada derivada se reescala y toda constante física se concentra en $K=2E/\\hbar\\omega$:\n$$\\frac{d^2\\psi}{d\\xi^2}=\\left(\\xi^2-K\\right)\\psi.$$\nCuantizar la energía = averiguar qué valores de $K$ producen una $\\psi$ normalizable. Todo lo demás es álgebra.',
        },
        {
          title: 'Comportamiento asintótico: mira primero al infinito',
          text: 'Para $|\\xi|$ grande, $\\xi^2\\gg K$ y la ecuación se aproxima por $\\psi\'\'\\approx\\xi^2\\psi$. ¿Qué función es, aproximadamente, su segunda derivada multiplicada por $\\xi^2$? Prueba la exponencial de algo: si $\\psi=e^{f(\\xi)}$, entonces $\\psi\'\'/\\psi=f\'\'+(f\')^2\\approx(f\')^2$; exigiendo $(f\')^2\\approx\\xi^2$ sale $f\'=\\pm\\xi$, o sea $f=\\pm\\xi^2/2$. La rama $+$ explota al infinito; la que sobrevive es la gaussiana:\n$$\\psi\\sim e^{-\\xi^2/2}\\qquad (|\\xi|\\to\\infty).$$\nNo es una conjetura suelta: es la razón por la que el oscilador tiene colas gaussianas y no caídas exponenciales simples como el pozo finito.',
        },
        {
          title: 'Factoriza la gaussiana',
          text: 'Escribe la solución como el producto de la cola asintótica por algo «moderado»:\n$$\\psi(\\xi)=h(\\xi)\\,e^{-\\xi^2/2}.$$\nAl sustituir en la EDE, los términos donde no aparece $h$ se cancelan exactamente (¡compruébalo!) y queda\n$$h\'\'-2\\xi h\'+(K-1)\\,h=0,$$\nla ecuación que decide el problema: si $h$ resulta ser un polinomio, el producto «polinomio × gaussiana» es normalizable y hemos ganado.',
        },
        {
          title: 'Ataca con serie de potencias',
          text: 'Propón\n$$h(\\xi)=\\sum_{j=0}^{\\infty}a_j\\,\\xi^j=a_0+a_1\\xi+a_2\\xi^2+\\cdots$$\nDerivar una serie es trivial (baja el índice y multiplica potencias). Al sustituir $h$, $h\'$ y $h\'\'$, la ecuación $h\'\'-2\\xi h\'+(K-1)h=0$ se convierte en una única suma de potencias de $\\xi$ que debe anularse término a término.',
        },
        {
          title: 'La relación de recurrencia',
          text: 'Agrupando los coeficientes de cada potencia $\\xi^j$ queda la condición\n$$a_{j+2}=\\frac{2j+1-K}{(j+1)(j+2)}\\,a_j,\\qquad j=0,1,2,\\dots$$\nDos cadenas independientes: la de los pares ($a_0\\to a_2\\to a_4\\to\\cdots$) y la de los impares ($a_1\\to a_3\\to a_5\\to\\cdots$), con las semillas $a_0$ y $a_1$ libres. La solución general de la EDE es la suma de las dos.',
        },
        {
          title: 'Si la serie no termina, el estado no existe',
          text: 'Para $j$ grande, la recurrencia se aproxima por $a_{j+2}\\approx\\frac{2}{j}\\,a_j$: los coeficientes crecen igual que los de la serie de $e^{\\xi^2}$ (sus términos pares satisfacen exactamente esa proporción). Si la serie es infinita, $h$ se comporta como $e^{\\xi^2}$ en los extremos, y entonces\n$$\\psi=h\\,e^{-\\xi^2/2}\\sim e^{\\xi^2}\\,e^{-\\xi^2/2}=e^{+\\xi^2/2},$$\nque explota: $\\int|\\psi|^2d\\xi$ diverge y el estado **no es normalizable**. La cadena tiene que morir en algún grado — esa exigencia es la cuantización.',
        },
        {
          title: 'La terminación cuantiza la energía',
          text: 'La cadena de coeficientes se corta cuando algún numerador $2j+1-K$ se anula: a partir de ese $j$, todos los coeficientes siguientes de esa cadena valen cero. Hay que cortar una de las dos cadenas (lo que exige $K=2n+1$ para algún entero $n\\ge 0$) y anular la semilla de la otra ($a_1=0$ si sobrevive la par, $a_0=0$ si sobrevive la impar). Resultado:\n$$K=2n+1\\quad\\Longrightarrow\\quad \\boxed{\\,E_n=\\left(n+\\tfrac{1}{2}\\right)\\hbar\\omega\\,},\\qquad n=0,1,2,\\dots$$\nComo en el pozo infinito, nadie impuso la cuantización: **la exigió la normalizabilidad**.',
        },
        {
          title: 'Los polinomios supervivientes: los Hermite',
          text: 'Lo que queda de $h$ tras el corte, con la convención de normalización estándar, son los **polinomios de Hermite** $H_n(\\xi)$. Los cuatro primeros:\n$$H_0=1,\\qquad H_1=2\\xi,\\qquad H_2=4\\xi^2-2,\\qquad H_3=8\\xi^3-12\\xi.$$\nDos señas para autoverificarlos: el término dominante de $H_n$ es $(2\\xi)^n$, y $H_n$ tiene exactamente $n$ ceros reales.',
        },
        {
          title: 'Autofunciones normalizadas',
          text: 'Volviendo a la variable $x$ (recuerda: $\\xi=\\sqrt{m\\omega/\\hbar}\\,x$) y normalizando — con la integral gaussiana $\\int e^{-\\xi^2}d\\xi=\\sqrt{\\pi}$ y la ortogonalidad de los Hermite — se obtiene\n$$\\psi_n(x)=\\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{\\!1/4}\\frac{1}{\\sqrt{2^n\\,n!}}\\,H_n(\\xi)\\,e^{-\\xi^2/2}.$$\nLa gaussiana ya trae la normalización del estado fundamental; el prefactor $1/\\sqrt{2^n n!}$ ajusta los excitados.',
        },
        {
          title: 'El estado fundamental, explícito',
          text: 'Con $n=0$ ($H_0=1$ y $2^0\\,0!=1$):\n$$\\psi_0(x)=\\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{\\!1/4}e^{-\\frac{m\\omega x^2}{2\\hbar}},\\qquad E_0=\\tfrac{1}{2}\\hbar\\omega.$$\nUna gaussiana pura centrada en el origen: sin nodos, sin oscilaciones, la función más «tranquila» del capítulo. Y aun así su energía no es cero: es la **energía de punto cero**, el precio mínimo que cobra el principio de incertidumbre (pista 8).',
        },
        {
          title: 'Paridad: alterna por construcción',
          text: 'El potencial es par, así que las autofunciones tienen paridad definida. La gaussiana es par y los Hermite alternan ($H_0$ par, $H_1$ impar, $H_2$ par…), de modo que\n$$\\psi_n(-\\xi)=(-1)^n\\,\\psi_n(\\xi):$$\nestados pares para $n$ par e impares para $n$ impar. Encaja con las cadenas de la recurrencia: la semilla $a_0$ genera la familia par, la $a_1$ la impar, y cada $K$ admisible corta exactamente una de las dos.',
        },
      ],
    },
    keyResults: [
      { label: 'Espectro equiespaciado', latex: 'E_n=\\left(n+\\tfrac{1}{2}\\right)\\hbar\\omega,\\qquad n=0,1,2,\\dots', note: 'El único potencial con niveles perfectamente iguales: espaciado ℏω exacto.' },
      { label: 'Autofunciones', latex: '\\psi_n(x)=\\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{\\!1/4}\\frac{1}{\\sqrt{2^n\\,n!}}\\,H_n(\\xi)\\,e^{-\\xi^2/2}', note: 'Con ξ = √(mω/ℏ)·x y Hₙ los polinomios de Hermite.' },
      { label: 'Estado fundamental', latex: '\\psi_0(x)=\\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{\\!1/4}e^{-\\frac{m\\omega x^2}{2\\hbar}}', note: 'Gaussiana pura; su energía es la de punto cero E₀ = ½ℏω.' },
      { label: 'Operadores escaladera', latex: 'a_\\pm=\\frac{1}{\\sqrt{2\\hbar m\\omega}}\\left(\\mp ip+m\\omega x\\right)' },
      { label: 'Hamiltoniano en escaladoras', latex: 'H=\\hbar\\omega\\left(a_+a_-+\\tfrac{1}{2}\\right)', note: 'El conmutador que engrana la escalera: [a₋, a₊] = 1.' },
      { label: 'Acción de las escaladoras', latex: 'a_+\\psi_n=\\sqrt{n+1}\\,\\psi_{n+1},\\qquad a_-\\psi_n=\\sqrt{n}\\,\\psi_{n-1}', note: 'Suben y bajan un peldaño exacto de ℏω.' },
      { label: 'Teorema del virial', latex: '\\langle T\\rangle=\\langle V\\rangle=\\tfrac{1}{2}E_n', note: 'Cinética y potencial se reparten la energía por igual en todo estado estacionario.' },
      { label: 'Valores esperados (estado n)', latex: '\\langle x^2\\rangle=\\frac{\\hbar}{m\\omega}\\left(n+\\tfrac{1}{2}\\right),\\qquad \\langle p^2\\rangle=m\\hbar\\omega\\left(n+\\tfrac{1}{2}\\right)' },
    ],
    hints: [
      {
        id: 'posc-1',
        kind: 'reconocimiento',
        title: '¿Qué problema tengo delante?',
        text: 'Señales de oscilador armónico: el potencial es una **parábola** ($V\\propto x^2$), aparece una frecuencia natural $\\omega$, o el enunciado habla de una molécula diatómica que vibra, fonones en un sólido o un «pozo cuadrático». Si te dan $V=\\frac{1}{2}kx^2$ con constante elástica $k$, convierte primero: $\\omega=\\sqrt{k/m}$.',
        application: {
          intro: 'Checklist de reconocimiento antes de escribir nada:',
          steps: [
            { title: 'Identifica la forma de V', text: '¿$V=\\frac{1}{2}m\\omega^2x^2$? Si viene con constante elástica, $\\omega=\\sqrt{k/m}$. Si el mínimo no está en el origen, desplaza primero la variable ($u=x-x_0$) y resuelve en $u$.' },
            { title: 'Clasifica la pregunta', text: '¿(i) el espectro completo $E_n$? ¿(ii) las primeras autofunciones $\\psi_0,\\psi_1,\\psi_2$? ¿(iii) valores esperados con escaladoras? ¿(iv) probabilidad fuera de la región clásica? Las pistas están ordenadas exactamente así.' },
            { title: 'Cuenta tus herramientas', text: 'Dos métodos disponibles: serie de potencias (pistas 3–5) y escaladoras (pista 6). Si el enunciado dice «con el método algebraico», ve directo a la 6.' },
            { title: 'Comprueba las condiciones', text: 'Aquí no hay paredes ni fronteras que pegar: la única condición física es la normalizabilidad en $\\pm\\infty$. Toda la cuantización nace de ahí — no busques condiciones de frontera que no existen.' },
          ],
        },
      },
      {
        id: 'posc-2',
        kind: 'planteamiento',
        title: 'Por qué aquí no valen senos ni cosenos',
        text: 'El reflejo heredado del pozo infinito — escribir $A\\sin(kx)+B\\cos(kx)$ — fracasa estrepitosamente aquí. Allá $k$ era constante dentro de cada región; con $V(x)=\\frac{1}{2}m\\omega^2x^2$ el «$k$ local» $\\sqrt{2m(E-V)}/\\hbar$ cambia a cada punto. Cuando los **coeficientes de la EDE no son constantes**, las funciones elementales dejan de servir y toca el método general: serie de potencias (o el atajo algebraico).',
        application: {
          steps: [
            { title: 'Diagnostica tu ecuación', text: '¿Los coeficientes que acompañan a $\\psi\'\'$ y a $\\psi$ contienen a $x$? Si sí, olvida senos, cosenos y exponenciales de solución inmediata: este problema no es de esa familia.' },
            { title: 'Mira el signo, no el detalle', text: 'Entre los puntos de retorno ($E>V$) la función oscila; fuera ($E<V$) decae exponencialmente. La parábola da dos regiones prohibidas que se abren hasta el infinito: la solución tendrá forma de onda en el centro y caída gaussiana en los extremos.' },
            { title: 'Elige la estrategia', text: 'Serie de potencias (pistas 3–5): siempre funciona y es la que suele pedir el examen. Escaladoras (pista 6): más rápida para espectro y valores esperados, sin una sola integral.' },
          ],
        },
      },
      {
        id: 'posc-3',
        kind: 'planteamiento',
        title: 'Adimensionaliza PRIMERO: ξ y K',
        text: 'Antes de tocar la serie, limpia la ecuación. Con el cambio $\\xi\\equiv\\sqrt{m\\omega/\\hbar}\\,x$ y la constante $K\\equiv 2E/\\hbar\\omega$, la EDE queda $\\psi\'\'=(\\xi^2-K)\\psi$: sin unidades, sin constantes físicas pegadas a cada término. Todo lo que sigue (asíntótico, recurrencia, terminación) se hace en estas variables, y solo al final traduces $K\\to E$ y $\\xi\\to x$. El examen distingue al que adimensionalizó: su página tiene la mitad de tinta.',
        application: {
          intro: 'Cómo elegir el cambio de variable para que la ecuación quede limpia:',
          steps: [
            { title: 'Mira las dimensiones', text: 'El término cinético aporta $\\hbar^2\\psi/(m\\,x^2)$ y el potencial $m\\omega^2x^2\\psi$. Para que se puedan comparar, $x$ debe medirse en unidades de $\\sqrt{\\hbar/m\\omega}$: esa ES la longitud natural del problema (la anchura del estado fundamental).' },
            { title: 'Define ξ y deriva en cadena', text: 'Con $\\xi=\\sqrt{m\\omega/\\hbar}\\,x$, cada $d/dx$ se convierte en $\\sqrt{m\\omega/\\hbar}\\,d/d\\xi$; dividiendo la ecuación completa por $\\hbar\\omega$ queda exactamente $\\frac{d^2\\psi}{d\\xi^2}=(\\xi^2-K)\\psi$ con $K=2E/\\hbar\\omega$.' },
            { title: 'Anota las dos traducciones', text: 'Trabajas en $K$ y entregas en $E$: la condición de terminación $K=2n+1$ se lee al final como $E_n=(n+\\tfrac{1}{2})\\hbar\\omega$. Las gráficas, en $\\xi$: la gaussiana patrón es $e^{-\\xi^2/2}$.' },
            { title: 'Aprovecha la ventaja oculta', text: 'Con $\\xi$, la solución adimensional no depende de parámetros: hay UN solo oscilador en el mundo de las variables escaladas. Entre una molécula y otra solo cambia la escala de los ejes.' },
          ],
        },
      },
      {
        id: 'posc-4',
        kind: 'tecnica',
        title: 'La cola gaussiana e^{−ξ²/2}: el paso que lo decide todo',
        text: 'El truco central del método analítico: antes de buscar la solución exacta, pregunta cómo se comporta **en el infinito**. Para $|\\xi|$ grande la ecuación es $\\psi\'\'\\approx\\xi^2\\psi$, y eso no lo cumple un seno ni una exponencial simple: lo cumple una gaussiana $e^{-\\xi^2/2}$. Factorízala y todo lo que queda es un polinomio. Sin este paso, la serie de potencias no tiene adónde ir.',
        application: {
          intro: 'Cómo deducir el asíntotico sin adivinarlo:',
          steps: [
            { title: 'Ve al límite ξ grande', text: 'En $\\psi\'\'=(\\xi^2-K)\\psi$, cuando $\\xi^2\\gg K$ la energía es un detalle: $\\psi\'\'\\approx\\xi^2\\psi$. La constante $K$ solo importa cerca del centro; los extremos solo ven a $\\xi^2$.' },
            { title: 'Prueba la forma exponencial', text: 'Con $\\psi=e^{f}$: $\\psi\'\'/\\psi=f\'\'+(f\')^2\\approx(f\')^2$ cuando $f\'$ crece. Igualando $(f\')^2\\approx\\xi^2$ sale $f\'=\\pm\\xi$, es decir $f=\\pm\\xi^2/2$ — sin magia: dos derivadas de la exponencial devuelven el factor $\\xi^2$.' },
            { title: 'Descarta la que explota', text: '$e^{+\\xi^2/2}$ crece sin límite: no normalizable. La cola válida es $e^{-\\xi^2/2}$. (Una solución exacta de $\\psi\'\'=\\xi^2\\psi$ lleva además una corrección lenta $|\\xi|^{-1/2}$; no cambia la conclusión del exponente.)' },
            { title: 'Factoriza y sigue', text: 'Escribe $\\psi=h\\,e^{-\\xi^2/2}$ y sustituye: los términos sin $h$ se cancelan y queda $h\'\'-2\\xi h\'+(K-1)h=0$. Esa ecuación para $h$ es la que se ataca con la serie — pista 5.' },
          ],
        },
      },
      {
        id: 'posc-5',
        kind: 'tecnica',
        title: 'La recurrencia y por qué DEBE terminar',
        text: 'Con la serie $h=\\sum a_j\\xi^j$ sale $a_{j+2}=\\frac{2j+1-K}{(j+1)(j+2)}a_j$: dos cadenas (pares desde $a_0$, impares desde $a_1$). La parte no negociable: si ninguna cadena se corta, la serie reproduce $e^{\\xi^2}$ en los extremos y $\\psi\\sim e^{+\\xi^2/2}$ — no normalizable, estado inexistente. La recurrencia **tiene** que morir en algún $j=n$, y eso solo pasa si $K=2n+1$. Ahí vive toda la cuantización del oscilador.',
        application: {
          intro: 'El argumento completo, para poder defenderlo en el examen:',
          steps: [
            { title: 'Mira la recurrencia para j grande', text: 'Para $j\\gg 1$: $a_{j+2}\\approx\\frac{2}{j}a_j$. Compara con la serie de $e^{\\xi^2}$: sus coeficientes pares cumplen exactamente esa proporción. Serie infinita ⇒ $h$ se comporta como $e^{\\xi^2}$ allá donde $\\xi$ es grande.' },
            { title: 'Consecuencia en ψ', text: '$\\psi=h\\,e^{-\\xi^2/2}\\sim e^{\\xi^2}\\,e^{-\\xi^2/2}=e^{\\xi^2/2}\\to\\infty$: $\\int|\\psi|^2d\\xi$ diverge y el estado no existe. No es una cuestión de elegancia: es normalizabilidad, la única condición física del problema.' },
            { title: 'Cómo se corta una cadena', text: 'Un numerador $2j+1-K=0$ anula $a_{j+2}$ y toda su descendencia. Debes cortar UNA cadena y anular la semilla de la otra: $a_1=0$ con corte en la par, o $a_0=0$ con corte en la impar. Cada $K$ admisible corta exactamente una.' },
            { title: 'Lee el resultado', text: 'La terminación exige $K=2n+1$ con $n=0,1,2,\\dots$ — traducido: $E_n=(n+\\tfrac{1}{2})\\hbar\\omega$. Cuantización = terminación de la serie. Esa es la frase que debe quedarte.' },
            { title: 'Identifica el polinomio', text: 'Lo que queda de $h$ es un polinomio de grado $n$ con $n$ raíces reales: el polinomio de Hermite $H_n$. Con la recurrencia los generas todos: $H_0=1$, $H_1=2\\xi$, $H_2=4\\xi^2-2$, $H_3=8\\xi^3-12\\xi$…' },
          ],
        },
      },
      {
        id: 'posc-6',
        kind: 'tecnica',
        title: '⭐ El método algebraico completo (la gran pista)',
        text: 'El otro camino al espectro — sin series, sin recurrencia, sin integral gaussiana. Se define un par de operadores (las **escaladoras**) que convierten cada solución del oscilador en otra solución con energía subida o bajada en $\\hbar\\omega$ exactos. El espectro entero cae de un puñado de conmutadores. Domina esta pista y resuelves el espectro en media página — y de regalo, los valores esperados (pista 7).',
        application: {
          intro: 'El método algebraico de principio a fin — apréndelo como una coreografía:',
          steps: [
            { title: 'Define las escaladoras', text: '$a_\\pm=\\frac{1}{\\sqrt{2\\hbar m\\omega}}\\left(\\mp ip+m\\omega x\\right)$. Son combinaciones lineales de $x$ y $p$; no son hermíticas (no son observables), pero eso aquí no importa: son herramientas de álgebra.' },
            { title: 'Reescribe el Hamiltoniano', text: 'Multiplicando y reagrupando — los términos cruzados con $xp$ y $px$ se cancelan al restar — el Hamiltoniano queda\n$$H=\\hbar\\omega\\left(a_+a_-+\\tfrac{1}{2}\\right).$$\nEl oscilador entero cabe en un producto de operadores.' },
            { title: 'Calcula el conmutador', text: 'Usando $[x,p]=i\\hbar$ sale $[a_-,a_+]=1$. Ese «1» es el engranaje de toda la escalera: es lo único que queda cuando $a_+$ y $a_-$ intercambian papeles.' },
            { title: 'Demuestra que preservan la EDE', text: 'Si $H\\psi=E\\psi$, entonces, con el conmutador del paso anterior: $H\\left(a_\\pm\\psi\\right)=(E\\pm\\hbar\\omega)\\left(a_\\pm\\psi\\right)$. Es decir: $a_\\pm\\psi$ **también es autoestado**, con la energía desplazada exactamente un peldaño de $\\hbar\\omega$.' },
            { title: 'Razona la escalera', text: 'Desde cualquier solución puedes subir ($a_+$) o bajar ($a_-$) en pasos de $\\hbar\\omega$. Subir no falla nunca; bajar tampoco… salvo que te caigas de la escalera: si en algún punto $a_-\\psi=0$, el descenso se acaba ahí.' },
            { title: 'Encuentra el suelo', text: 'El descenso no puede ser infinito: todo estado cumple $E=\\langle T+V\\rangle>0$ (aquí $V\\ge 0$ siempre), y restando $\\hbar\\omega$ sin parar llegarías a energías negativas. Luego existe un **peldaño más bajo** $\\psi_0$, y se caracteriza por $a_-\\psi_0=0$.' },
            { title: 'Resuelve el suelo', text: '$a_-\\psi_0=0$ es una EDE de **primer** orden. Con $p=-i\\hbar\\,d/dx$ queda\n$$\\left(\\hbar\\frac{d}{dx}+m\\omega x\\right)\\psi_0=0\\qquad\\Rightarrow\\qquad \\frac{d\\psi_0}{dx}=-\\frac{m\\omega}{\\hbar}x\\,\\psi_0,$$\ncuya solución es la gaussiana $\\psi_0=A\\,e^{-m\\omega x^2/2\\hbar}$; normalizando, $A=\\left(m\\omega/\\pi\\hbar\\right)^{1/4}$. Y su energía sale del Hamiltoniano escalado: $H\\psi_0=\\hbar\\omega\\left(a_+a_-+\\tfrac{1}{2}\\right)\\psi_0=\\tfrac{1}{2}\\hbar\\omega\\,\\psi_0$ (el primer término muere porque $a_-\\psi_0=0$), es decir $E_0=\\tfrac{1}{2}\\hbar\\omega$.' },
            { title: 'Sube la escalera', text: 'Aplicando $a_+$ repetidamente sobre $\\psi_0$ se generan todos los estados: $\\psi_n\\propto(a_+)^n\\psi_0$ con $E_n=(n+\\tfrac{1}{2})\\hbar\\omega$. Con las constantes correctas:\n$$a_+\\psi_n=\\sqrt{n+1}\\,\\psi_{n+1},\\qquad a_-\\psi_n=\\sqrt{n}\\,\\psi_{n-1}.$$\nMedia página: espectro completo y autofunciones completas.' },
          ],
        },
      },
      {
        id: 'posc-7',
        kind: 'tecnica',
        title: 'Valores esperados SIN integrar: el truco x ∝ (a₊ + a₋)',
        text: 'Cualquier $\\langle x^2\\rangle$ o $\\langle p^2\\rangle$ del oscilador se hace en cuatro líneas si descompones\n$$x=\\sqrt{\\frac{\\hbar}{2m\\omega}}\\left(a_++a_-\\right),\\qquad p=i\\sqrt{\\frac{\\hbar m\\omega}{2}}\\left(a_+-a_-\\right).$$\nAl expandir los cuadrados, los términos con dobles saltos ($a_\\pm^2$) dan cero en un estado $\\psi_n$ por ortogonalidad, y los mixtos son pura aritmética de escalera. Nada de integrales con Hermite.',
        application: {
          intro: 'El cálculo completo de ⟨x²⟩ — cópialo como plantilla:',
          steps: [
            { title: 'Expande el cuadrado', text: '$\\langle x^2\\rangle=\\frac{\\hbar}{2m\\omega}\\left\\langle a_+^2+a_+a_-+a_-a_++a_-^2\\right\\rangle$. Cuatro términos, y dos van a morir solos.' },
            { title: 'Elimina los dobles saltos', text: '$a_+^2\\psi_n\\propto\\psi_{n+2}$ y $a_-^2\\psi_n\\propto\\psi_{n-2}$ (o cero si $n<2$): ortogonales a $\\psi_n$, así que $\\langle a_\\pm^2\\rangle=0$. Quedan los productos mixtos.' },
            { title: 'Evalúa los mixtos', text: '$\\langle a_+a_-\\rangle=n$ (baja y vuelve a subir) y $\\langle a_-a_+\\rangle=n+1$ (sube y vuelve a bajar). Solo hay que contar peldaños.' },
            { title: 'Suma y concluye', text: '$\\langle x^2\\rangle=\\frac{\\hbar}{2m\\omega}\\left(2n+1\\right)=\\frac{\\hbar}{m\\omega}\\left(n+\\tfrac{1}{2}\\right)$. El mismo guion con $p$ da $\\langle p^2\\rangle=m\\hbar\\omega\\left(n+\\tfrac{1}{2}\\right)$ — y de propina el virial: $\\langle T\\rangle=\\langle V\\rangle=\\tfrac{1}{2}E_n$. ✓' },
          ],
        },
      },
      {
        id: 'posc-8',
        kind: 'interpretacion',
        title: '¿Por qué existe la energía de punto cero?',
        text: 'Clásicamente, el estado de mínima energía es quedarse quieto en el fondo del pozo: $x=0$, $p=0$, $E=0$. Cuánticamente eso está **prohibido**: exigir $x=0$ Y $p=0$ viola $\\sigma_x\\sigma_p\\ge\\hbar/2$. El mejor compromiso posible — la gaussiana, que es el estado de mínima incertidumbre — paga exactamente $E_0=\\tfrac{1}{2}\\hbar\\omega$. La energía de punto cero no es un defecto de la teoría: es el principio de incertidumbre convertido en número.',
        application: {
          steps: [
            { title: 'Formula el compromiso', text: 'Reducir $\\sigma_x$ (partícula bien cerca del mínimo) dispara $\\sigma_p$ y con ella $\\langle T\\rangle$; abrir $\\sigma_x$ abarata la cinética pero encarece $\\langle V\\rangle$. Hay un óptimo intermedio.' },
            { title: 'Estima el mínimo', text: 'Con $\\langle T\\rangle\\approx\\sigma_p^2/2m$, $\\langle V\\rangle\\approx\\frac{1}{2}m\\omega^2\\sigma_x^2$ y $\\sigma_x\\sigma_p\\ge\\hbar/2$, la suma se minimiza en $\\frac{1}{2}\\hbar\\omega$ — y se alcanza justo con la gaussiana $\\psi_0$. El estado fundamental ES el mínimo compatible con Heisenberg.' },
            { title: 'Consecuencias físicas', text: 'Espectroscópicamente, ninguna molécula deja de vibrar al enfriar: la transición más baja parte de $E_0$, no de cero. En un sólido, los modos mantienen $\\frac{1}{2}\\hbar\\omega$ por modo incluso en el cero absoluto — la razón por la que el helio no se solidifica a presión normal.' },
            { title: 'Nótese qué NO dice', text: 'No dice que la partícula «vibre» en el estado fundamental: $\\psi_0$ es estacionario y $|\\psi_0|^2$ no late. Lo que transporta oscilación son las superposiciones de niveles vecinos — y en un cristal, esas excitaciones cuantizadas son los fonones.' },
          ],
        },
      },
      {
        id: 'posc-9',
        kind: 'interpretacion',
        title: 'Espectro equiespaciado: el sello del oscilador',
        text: 'Todos los niveles distan exactamente $\\hbar\\omega$ — ningún otro potencial tiene esa propiedad (el pozo infinito, con $E_n\\propto n^2$, separa sus niveles cada vez más). Consecuencia espectacular: como la diferencia de energía entre **cualquier** par de niveles vecinos es la misma, el oscilador emite y absorbe **fotones de una sola frecuencia**, $\\nu=\\omega/2\\pi$. Es la firma de las vibraciones moleculares en espectroscopía infrarroja y de los fonones de un sólido: cuantos de vibración, todos idénticos.',
        application: {
          steps: [
            { title: 'Compara con el pozo infinito', text: 'Pozo: $E_n\\propto n^2$, los niveles se **separan** al subir. Oscilador: $E_n\\propto n+\\tfrac{1}{2}$, espaciado constante. El examen adora que contrastes estos dos comportamientos de memoria.' },
            { title: 'El fotón del oscilador', text: 'Transición $n\\to n-1$: el sistema entrega $\\Delta E=\\hbar\\omega$ exactos, sea cual sea $n$. Un espectro de UNA sola frecuencia para todas las transiciones vecinas — el sueño del espectroscopista y la firma del potencial parabólico.' },
            { title: 'Cuenta los cuantos', text: 'El número $n$ se lee como «cuántos paquetes de energía $\\hbar\\omega$ hay encima del suelo». En un sólido, el $n$ de cada modo vibracional ES el número de fonones en ese modo — la escalera del oscilador es la puerta de entrada a la física de muchos cuerpos.' },
          ],
        },
      },
      {
        id: 'posc-10',
        kind: 'interpretacion',
        title: 'Puntos de retorno clásicos y penetración cuántica',
        text: 'Una partícula clásica de energía $E$ llega como máximo hasta donde $V(x_t)=E$:\n$$x_t=\\sqrt{\\frac{2E}{m\\omega^2}}=\\sqrt{\\frac{(2n+1)\\hbar}{m\\omega}}.$$\nAhí se frena y regresa. Pero el oscilador cuántico **no se frena**: $|\\psi_n|^2$ es distinto de cero más allá de $x_t$, en la zona donde $E<V$ — clásicamente prohibida. Para $n$ pequeño el efecto es dramático: en el estado fundamental hay probabilidad apreciable de encontrar la partícula «fuera» de donde la física clásica le permite estar.',
        application: {
          steps: [
            { title: 'Localiza los puntos de retorno', text: 'Con $E_n=(n+\\tfrac{1}{2})\\hbar\\omega$, los clásicos serían $x_t=\\pm\\sqrt{(2n+1)\\hbar/m\\omega}$. Son los lugares donde la densidad clásica se acumula (la partícula va lenta ahí) y donde la cuántica empieza su caída gaussiana.' },
            { title: 'Compara con la anchura de la gaussiana', text: 'Para $\\psi_0$, $|\\psi_0|^2\\propto e^{-m\\omega x^2/\\hbar}$ y el retorno está en $x_t^2=\\hbar/m\\omega$: justo donde la densidad ha caído a $e^{-1/2}$ de su máximo. La partícula pasa un tiempo notable «fuera de la ley clásica».' },
            { title: 'Cuantifica si te lo piden', text: 'La probabilidad en zona prohibida es $P_{\\text{fuera}}=2\\int_{x_t}^{\\infty}|\\psi_n|^2\\,dx$ — se resuelve con tablas de Hermite o con las técnicas del problema 2.15 del libro (está en la lista de abajo). Lo cualitativo es lo importante: NO es cero.' },
            { title: 'Piensa el límite clásico', text: 'Al crecer $n$, la penetración absoluta (unos pocos $\\sqrt{\\hbar/m\\omega}$) se vuelve despreciable frente a la excursión total, y $|\\psi_n|^2$ promedia hacia la densidad clásica — que se acumula en los extremos, donde la partícula clásica se mueve más despacio. Correspondencia funcionando.' },
          ],
        },
      },
      {
        id: 'posc-11',
        kind: 'verificacion',
        title: 'Comprobaciones de bolsillo (10 segundos)',
        text: 'Antes de entregar: $E_0=\\tfrac{1}{2}\\hbar\\omega$ **positivo** (¿te falta el medio?); espaciado exactamente $\\hbar\\omega$; paridad de $\\psi_n$ = paridad de $n$, alternada; los tres primeros Hermite de memoria ($1$, $2\\xi$, $4\\xi^2-2$); unidades de $\\psi_0$: $(m\\omega/\\pi\\hbar)^{1/4}$ vive en $1/\\sqrt{\\text{longitud}}$ ✓; y el virial $\\langle T\\rangle=\\langle V\\rangle=E_n/2$ como check cruzado de valores esperados.',
        application: {
          steps: [
            { title: 'Test del medio', text: 'El error nº 1 del tema es escribir $E_n=n\\hbar\\omega$. Comprueba el suelo: con $n=0$ debe quedar $\\tfrac{1}{2}\\hbar\\omega$. Si tu espectro no tiene el $+\\tfrac{1}{2}$, revisa la terminación ($K=2n+1$, no $2n$).' },
            { title: 'Test de paridad y nodos', text: '$\\psi_0$ par y sin nodos; $\\psi_1$ impar con un nodo; $\\psi_2$ par con dos. La paridad debe alternar con $n$ — si tu $\\psi_1$ es par, o es $\\psi_0$ mal indexada o mezclaste las cadenas de la recurrencia.' },
            { title: 'Test del virial', text: 'Para cualquier $n$: $\\tfrac{1}{2}m\\omega^2\\langle x^2\\rangle$ debe dar exactamente $\\tfrac{1}{2}E_n$, y $\\langle p^2\\rangle/2m$ también. Es la verificación más barata: relaciona dos cálculos independientes y cuesta una multiplicación.' },
            { title: 'Test de unidades y límites', text: '$\\hbar\\omega$ es energía ✓; $\\sqrt{\\hbar/m\\omega}$ es longitud ✓; y el límite $\\omega\\to\\infty$ (pozo muy duro): energías enormes y $\\psi_0$ muy estrecho — todo coherente con el confinamiento.' },
          ],
        },
      },
    ],
    examQuestions: [
      { id: 'pe-osc-1', q: 'Resuelve el oscilador armónico por el método de serie de potencias: desde la EDE adimensional hasta $E_n$ y $\\psi_n$ normalizadas.', hintIndex: 4 },
      { id: 'pe-osc-2', q: 'Obtén el espectro completo con el método algebraico (escaladoras), incluyendo $\\psi_0$ y $E_0$ a partir de la condición $a_-\\psi_0=0$.', hintIndex: 5 },
      { id: 'pe-osc-3', q: 'Calcula $\\langle x^2\\rangle$ y $\\langle p^2\\rangle$ en el estado $n$ usando escaladoras y verifica el teorema del virial.', hintIndex: 6 },
      { id: 'pe-osc-4', q: 'Escribe $\\psi_0$, $\\psi_1$ y $\\psi_2$ explícitas, comprueba su paridad y cuenta sus nodos.', hintIndex: 10 },
      { id: 'pe-osc-5', q: 'Para $\\Psi(x,0)=\\frac{1}{\\sqrt{2}}\\left(\\psi_0+\\psi_1\\right)$, calcula $\\langle x\\rangle(t)$ e interpreta la oscilación resultante.', hintIndex: 6 },
      { id: 'pe-osc-6', q: 'Explica físicamente, con el principio de incertidumbre, por qué $E_0\\ne 0$ y estima el valor $\\tfrac{1}{2}\\hbar\\omega$ del mínimo.', hintIndex: 7 },
      { id: 'pe-osc-7', q: 'Calcula los puntos de retorno clásicos del estado $n$, discute la penetración en la zona prohibida y analiza el límite $n\\to\\infty$.', hintIndex: 9 },
    ],
    commonMistakes: [
      'Escribir $E_n=n\\hbar\\omega$ olvidando el $+\\tfrac{1}{2}$: el suelo del oscilador es $E_0=\\tfrac{1}{2}\\hbar\\omega$, no cero.',
      'Confundir $\\xi$ con $x$ al normalizar: el cambio $d\\xi=\\sqrt{m\\omega/\\hbar}\\,dx$ y el prefactor $(m\\omega/\\pi\\hbar)^{1/4}$ ya vienen en unidades de $x$ — si mezclas variables, la norma sale mal.',
      'Suponer que la recurrencia «termina sola»: solo termina si $K$ vale exactamente $2n+1$ — esa exigencia ES la cuantización, no un detalle técnico.',
      'Escaladoras mal normalizadas: $a_+\\psi_n=\\sqrt{n+1}\\,\\psi_{n+1}$ y $a_-\\psi_n=\\sqrt{n}\\,\\psi_{n-1}$ — olvidar las raíces arruina todo cálculo de valores esperados.',
      'Tratar la $\\psi_n$ real como estado físico completo: la solución es $\\Psi_n=\\psi_n\\,e^{-iE_nt/\\hbar}$; sin la fase, cualquier análisis temporal sale mal.',
      'Asignar la paridad al revés: $\\psi_n$ es par para $n$ **par** (el fundamental es par; el primer excitado, impar).',
    ],
    relatedProblemIds: ['bp-2-11', 'bp-2-12', 'bp-2-13', 'bp-2-14', 'bp-2-15', 'bp-2-16', 'bp-2-17', 'bp-2-18', 'bp-2-37', 'bp-2-38', 'bp-2-45'],
  },
  {
    id: 'pot-2-4',
    sectionId: '2.4',
    title: 'Partícula libre',
    tagline: 'El potencial más simple imaginable — ninguno — esconde la paradoja más instructiva del capítulo: sus estados estacionarios no son estados físicos.',
    difficulty: 2,
    graphType: 'free',
    vignette:
      'Parece el problema más tonto del capítulo: $V=0$ en todas partes, la EDE de la onda plana, dos líneas y a casa. La sorpresa: **ninguna solución estacionaria es normalizable** — una onda plana tiene la misma densidad de probabilidad en todo el universo, y eso no puede representar una partícula. La partícula libre real es un **paquete de onda**: una superposición continua de ondas planas con un espectro $\\phi(k)$ que sí se normaliza.\n\nPor eso esta sección es la bisagra conceptual del capítulo: introduce la transformada de Fourier como herramienta física (el estado tiene DOS representaciones, $\\Psi(x,t)$ y $\\phi(k)$) y las dos velocidades que conviven en un paquete (grupo y fase). Todo lo que viene después — la dispersión con delta (§2.5), el pozo finito (§2.6) y la matriz S (§2.7) — se construye con las ondas planas que aprendes a manejar aquí.\n\nEn el examen aparece como pregunta conceptual («¿por qué la partícula libre no tiene estados estacionarios normalizables?») o como pieza inicial de un problema de dispersión. Dominar esta paradoja es entender por qué la teoría de scattering funciona como funciona.',
    setup: [
      'El potencial: nada en ninguna parte — el espacio entero libre.',
      '$$V(x)=0\\qquad \\text{para todo } x.$$',
      'La EDE se reduce en toda la recta a la ecuación de la onda plana:',
      '$$\\frac{d^2\\psi}{dx^2}=-k^2\\psi,\\qquad k\\equiv\\frac{\\sqrt{2mE}}{\\hbar},\\qquad E=\\frac{\\hbar^2k^2}{2m}.$$',
      '**Soluciones**: $\\psi_\\pm(x)=e^{\\pm ikx}$ — ondas planas viajando hacia la derecha (+) y hacia la izquierda (−). No hay fronteras, no hay condiciones de contorno, no hay cuantización: $k$ es un parámetro real continuo y las energías forman un espectro continuo $E\\ge 0$.',
      '**El problema** (y el corazón de la sección): ninguna de estas soluciones, ni senos ni cosenos ni exponenciales de $k$ fijo, es normalizable. La salida real es superponer **todas** las $k$ — un paquete de onda $\\Psi(x,t)$ con espectro $\\phi(k)$. Esa construcción es lo que sigue.',
    ],
    derivation: {
      intro:
        'Corta y sorprendente: cuatro pasos para las «soluciones», y el resto de la derivación para entender por qué no son lo que parecen y qué hay que construir para tener una partícula libre física.',
      steps: [
        {
          title: 'V = 0 en todo el espacio',
          text: 'Sin potencial, la EDE vale con la misma forma en toda la recta:\n$$-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2}=E\\psi.$$\nNo hay regiones que pegar ni fronteras que satisfacer: una sola ecuación para todo $x$. Parece el caso más fácil del capítulo — y lo es, hasta que intentas normalizar.',
        },
        {
          title: 'Las soluciones: ondas planas',
          text: 'Con $k\\equiv\\sqrt{2mE}/\\hbar$ (real si $E>0$), la ecuación $\\psi\'\'=-k^2\\psi$ tiene por soluciones fundamentales\n$$\\psi_\\pm(x)=e^{\\pm ikx},$$\ncon $E=\\hbar^2k^2/2m$. Cada $k>0$ da dos ondas: hacia la derecha y hacia la izquierda. Senos y cosenos son combinaciones de estas — misma familia, mismo problema.',
        },
        {
          title: 'La paradoja: no son normalizables',
          text: 'Prueba normalizar $e^{ikx}$:\n$$\\int_{-\\infty}^{\\infty}|e^{ikx}|^2\\,dx=\\int_{-\\infty}^{\\infty}1\\,dx=\\infty.$$\nEl módulo al cuadrado de una onda plana es 1 **en todas partes**: la partícula estaría uniformemente distribuida por el universo. Con senos y cosenos pasa lo mismo: $|\\sin(kx)|^2$ promedia $\\tfrac{1}{2}$ hasta el infinito. **Ningún estado estacionario del potencial nulo es un estado físico**.',
        },
        {
          title: 'La salida: superposición continua',
          text: 'La EDE es lineal: sumemos ondas planas de distintas $k$ con pesos $\\phi(k)$. Como $k$ es continuo, la suma es una integral — el **paquete de onda**:\n$$\\Psi(x,t)=\\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty}\\phi(k)\\,e^{i(kx-\\omega t)}\\,dk,\\qquad \\omega=\\frac{\\hbar k^2}{2m}.$$\nCada onda plana gira con su frecuencia temporal $\\omega$. El factor $1/\\sqrt{2\\pi}$ es el convenio simétrico de la transformada de Fourier — el equivalente continuo del $\\sqrt{2/a}$ del pozo.',
        },
        {
          title: 'Normalización: ahora en el espacio de k',
          text: 'El paquete SÍ es normalizable, pero la condición se escribe sobre el espectro:\n$$\\int_{-\\infty}^{\\infty}|\\phi(k)|^2\\,dk=1.$$\nInterpretación de Born en versión continua: $|\\phi(k)|^2dk$ es la probabilidad de medir momento entre $\\hbar k$ y $\\hbar(k+dk)$. La función $\\phi$ es el mismo estado, escrito en la base de momentos.',
        },
        {
          title: 'Fourier: dos caras del mismo estado',
          text: '$\\Psi$ y $\\phi$ se contienen mutuamente — transformada y antitransformada de Fourier:\n$$\\phi(k)=\\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty}\\Psi(x,0)\\,e^{-ikx}\\,dx.$$\nUn estado, dos representaciones: posición ($\\Psi$) o momento ($\\phi$). El teorema de Plancherel garantiza que ambas se normalizan a la vez: $\\int|\\Psi|^2dx=\\int|\\phi|^2dk=1$. Esta es la puerta de entrada al formalismo de bases continuas.',
        },
        {
          title: 'Velocidad de grupo: la de la partícula',
          text: 'Un paquete concentrado alrededor de $k_0$ se mueve — ¿a qué velocidad? La envolvente avanza con\n$$v_g=\\frac{d\\omega}{dk}\\bigg|_{k_0}=\\frac{\\hbar k_0}{m}.$$\nCon $p=\\hbar k_0$ queda $v_g=p/m$: **exactamente la velocidad clásica**. La partícula libre cuántica viaja como una bolita newtoniana con ese momento — la envolvente es el mensaje.',
        },
        {
          title: 'Velocidad de fase: la de las crestas internas',
          text: 'Las ondas planas que tejen el paquete viajan cada una a\n$$v_f=\\frac{\\omega}{k}=\\frac{\\hbar k}{2m}.$$\nPara la partícula libre, $v_f=v_g/2$: las crestas individuales se mueven a la **mitad** de la velocidad de la envolvente — las ves atravesar el paquete de atrás hacia adelante. No es una errata: la fase no transporta ni energía ni probabilidad; es la envolvente (el grupo) la que lleva a la partícula.',
        },
        {
          title: 'Dispersión: el paquete se ensancha',
          text: 'La relación $\\omega(k)=\\hbar k^2/2m$ **no es lineal** en $k$. Como $v_g=d\\omega/dk$ depende de $k$, las componentes del paquete viajan a velocidades distintas: las $k$ altas corren más que las bajas, y el bulto que era compacto en $t=0$ se va **ensanchando** con el tiempo. Para una partícula libre no hay forma de evitarlo: la dispersión es inevitable mientras $\\omega\'\'(k)\\ne 0$ — y aquí $\\omega\'\'=\\hbar/m$, constante y distinta de cero.',
        },
        {
          title: 'Conclusión: «partícula libre» = paquete de onda',
          text: 'Recapitula la sección: (i) los estados estacionarios $e^{ikx}$ son herramientas matemáticas, no estados físicos; (ii) un estado físico es un paquete de Fourier $\\Psi(x,t)$ con espectro $\\phi(k)$ normalizable; (iii) el paquete viaja con $v_g=p/m$ clásico y se ensancha por dispersión. Con estas tres ideas ya puedes atacar §2.5–§2.7: allí la onda plana $e^{ikx}$ vuelve a aparecer — como pieza de construcción, exactamente igual que aquí.',
        },
      ],
    },
    keyResults: [
      { label: 'Energía de una onda plana', latex: 'E=\\frac{\\hbar^2k^2}{2m}', note: 'Espectro CONTINUO: todo E ≥ 0 está permitido, sin huecos.' },
      { label: 'El paquete de onda', latex: '\\Psi(x,t)=\\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty}\\phi(k)\\,e^{i(kx-\\omega t)}\\,dk,\\qquad \\omega=\\frac{\\hbar k^2}{2m}' },
      { label: 'Normalización en k', latex: '\\int_{-\\infty}^{\\infty}|\\phi(k)|^2\\,dk=1', note: '|φ(k)|²dk = probabilidad de momento entre ℏk y ℏ(k+dk).' },
      { label: 'Velocidad de grupo', latex: 'v_g=\\frac{d\\omega}{dk}=\\frac{\\hbar k}{m}', note: 'La de la envolvente — coincide con la velocidad clásica p/m.' },
      { label: 'Velocidad de fase', latex: 'v_f=\\frac{\\omega}{k}=\\frac{\\hbar k}{2m}', note: 'La de las crestas internas: aquí v_f = v_g/2; no transporta la partícula.' },
      { label: 'Criterio de dispersión', latex: '\\frac{d^2\\omega}{dk^2}=\\frac{\\hbar}{m}\\neq 0', note: 'ω no lineal ⇒ v_g depende de k ⇒ el paquete se ensancha inevitablemente.' },
    ],
    hints: [
      {
        id: 'plib-1',
        kind: 'reconocimiento',
        title: '¿Qué problema tengo delante?',
        text: 'Señales de partícula libre: $V=0$ en **todo** el espacio (o un problema donde la onda llega «desde el infinito»), las palabras «paquete», «grupo», «dispersión» o «ensanchamiento», o una $\\Psi(x,0)$ dada de la que piden $\\phi(k)$, velocidades o forma en un tiempo posterior.',
        application: {
          intro: 'Checklist de reconocimiento:',
          steps: [
            { title: 'Confirma que V = 0 en todo R', text: 'Si hay alguna región con $V\\ne 0$ (escalón, delta, pozo), es un problema de §2.5–§2.7: la partícula libre es solo la pieza que viaja por las zonas libres del potencial.' },
            { title: 'Clasifica la pregunta', text: '¿(i) demostrar que $e^{ikx}$ no es normalizable? ¿(ii) construir $\\phi(k)$ a partir de $\\Psi(x,0)$? ¿(iii) calcular $v_g$ y $v_f$? ¿(iv) argumentar el ensanchamiento? Las pistas 2–5 cubren cada caso.' },
            { title: 'Recuerda el arsenal', text: 'Transformada de Fourier (ida y vuelta), normalización en $k$, y las dos velocidades. Nada más: esta sección es conceptualmente densa pero técnicamente corta.' },
          ],
        },
      },
      {
        id: 'plib-2',
        kind: 'planteamiento',
        title: 'LA PARADOJA: por qué e^{ikx} no es un estado físico',
        text: 'El punto intelectual de la sección. Una onda plana $e^{ikx}$ resuelve la EDE, pero no puede representar una partícula: su densidad es **uniforme en el universo**. Sin normalización no hay interpretación probabilística; sin interpretación, no hay física. La partícula libre no tiene «estados estacionarios» al estilo del pozo: los $e^{ikx}$ son ladrillos, no casas.',
        application: {
          intro: 'El intento de normalización y su fracaso, paso a paso:',
          steps: [
            { title: 'Escribe la condición', text: 'Normalizar exige $\\int_{-\\infty}^{\\infty}|\\psi|^2\\,dx=1$ — un número finito, ajustable con una constante.' },
            { title: 'Evalúa el integrando', text: '$|e^{ikx}|^2=e^{ikx}\\,e^{-ikx}=1$ para todo $x$. La densidad no decae: la partícula estaría por igual en todas partes, de aquí al infinito.' },
            { title: 'Integra', text: '$\\int_{-\\infty}^{\\infty}1\\,dx=\\infty$. La integral diverge y ningún prefactor $A$ la arregla: $|A|^2\\cdot\\infty$ sigue siendo $\\infty$.' },
            { title: 'Generaliza el fracaso', text: '$\\sin(kx)$, $\\cos(kx)$ y cualquier combinación de UNA sola $k$ promedian una constante no nula en el infinito: nada de $k$ fijo es normalizable. La salida tiene que mezclar infinitas $k$ — pista 3.' },
          ],
        },
      },
      {
        id: 'plib-3',
        kind: 'tecnica',
        title: 'Construir el paquete (y normalizar φ)',
        text: 'El paquete $\\Psi(x,t)=\\frac{1}{\\sqrt{2\\pi}}\\int\\phi(k)e^{i(kx-\\omega t)}dk$ convierte el problema «no puedo normalizar» en «normalizo el espectro»: $\\int|\\phi(k)|^2dk=1$. Las tareas típicas: dada $\\Psi(x,0)$, hallar $\\phi(k)$ (transformada); dada $\\phi(k)$, comprobar la norma y leer probabilidades de momento. La receta de normalización en $k$ es el espejo exacto de la de $x$.',
        application: {
          intro: 'Cómo se normaliza el espectro en un caso concreto:',
          steps: [
            { title: 'Plantea la condición en k', text: 'Si $\\phi(k)=A\\,f(k)$ con $f$ dada (una escalera en $k$, una gaussiana…), exige $|A|^2\\int|f(k)|^2\\,dk=1$.' },
            { title: 'Integra en k, no en x', text: 'Es una integral normal sobre la variable $k$, con las técnicas de siempre; los límites son $\\pm\\infty$ porque el espectro no tiene fronteras.' },
            { title: 'Despeja A y verifica', text: '$A=1/\\sqrt{\\int|f(k)|^2dk}$. Comprobación: por Plancherel, el $\\Psi(x,0)$ correspondiente queda normalizado automáticamente — no hace falta volver a integrar en $x$.' },
            { title: 'Lee las probabilidades', text: 'P(momento entre $\\hbar k_1$ y $\\hbar k_2$) $=\\int_{k_1}^{k_2}|\\phi(k)|^2\\,dk$. Es la versión continua de los $|c_n|^2$ del pozo: cambia la suma por integral.' },
          ],
        },
      },
      {
        id: 'plib-4',
        kind: 'tecnica',
        title: 'Distinguir y calcular la velocidad de grupo y la de fase',
        text: 'Dos velocidades conviven en el paquete: la de la **envolvente** (grupo — la de la partícula) y la de las **crestas internas** (fase — la de las ondas planas). Se calculan distinto: $v_g=d\\omega/dk$ (derivada) y $v_f=\\omega/k$ (cociente), y para la partícula libre dan valores distintos: $v_g=\\hbar k/m$ frente a $v_f=\\hbar k/2m$. Confundirlas es el error conceptual más castigado de la sección.',
        application: {
          intro: 'El cálculo de las dos, paso a paso:',
          steps: [
            { title: 'Identifica la relación de dispersión', text: 'Partícula libre: $\\omega=\\hbar k^2/2m$. Todo lo demás sale de aquí — no hay nada más que derivar ni dividir.' },
            { title: 'Velocidad de grupo', text: '$v_g=\\frac{d\\omega}{dk}=\\frac{d}{dk}\\left(\\frac{\\hbar k^2}{2m}\\right)=\\frac{\\hbar k}{m}$. Con $p=\\hbar k$: $v_g=p/m$, la clásica. Es la respuesta correcta a «¿a qué velocidad viaja la partícula?»' },
            { title: 'Velocidad de fase', text: '$v_f=\\frac{\\omega}{k}=\\frac{\\hbar k^2/2m}{k}=\\frac{\\hbar k}{2m}=\\frac{v_g}{2}$. Las crestas van a la mitad: atraviesan el paquete, pero no transportan ni energía ni probabilidad.' },
            { title: 'Regla nemotécnica', text: 'Grupo = derivada; fase = cociente. Si el problema dice «envolvente», «señal» o «partícula»: grupo. Si dice «cresta» o «frente de onda plana»: fase.' },
          ],
        },
      },
      {
        id: 'plib-5',
        kind: 'tecnica',
        title: 'Por qué ω ∝ k² ensancha el paquete',
        text: 'Que $\\omega$ NO sea lineal en $k$ tiene una consecuencia física directa: cada componente del paquete lleva su propia $v_g$ (porque $v_g=d\\omega/dk$ cambia con $k$). Las rápidas se adelantan, las lentas se quedan, y la envolvente que en $t=0$ era un bulto compacto se va abriendo. ESO es la dispersión del paquete — y en la partícula libre no se puede evitar: $\\omega\'\'(k)=\\hbar/m\\ne 0$ siempre.',
        application: {
          intro: 'El argumento de las dos k vecinas, paso a paso:',
          steps: [
            { title: 'Toma dos componentes vecinas', text: '$k_0$ y $k_0+\\Delta k$, con pesos comparables. En $t=0$ están en fase en el centro del paquete: por eso el paquete tiene su pico ahí.' },
            { title: 'Deja correr el tiempo', text: 'Cada una viaja con su $v_g(k)=\\hbar k/m$: la de $k_0+\\Delta k$ corre $\\Delta v_g=\\frac{\\hbar}{m}\\Delta k$ más rápido que la de $k_0$.' },
            { title: 'Mide la desfasación', text: 'Al cabo de un tiempo $t$, su separación extra es $\\Delta v_g\\,t$. Cuando eso se compara con la anchura inicial del paquete, ya no se refuerzan en el mismo sitio: el pico se degrada y el paquete se ensancha.' },
            { title: 'Conecta con las incertidumbres', text: 'Paquete estrecho en $x$ ⇒ espectro ancho en $k$ ⇒ gran horquilla de $v_g$ ⇒ dispersión rápida. Paquete ancho ⇒ casi una sola $k$ ⇒ apenas se ensancha (y se acerca a la partícula clásica).' },
            { title: 'Comprueba el criterio general', text: 'Dispersión nula solo si $\\omega\'\'(k)=0$ ($\\omega$ lineal). En una cuerda o en el vacío electromagnético, $\\omega=ck$: los pulsos mantienen su forma. Para la partícula libre $\\omega\'\'=\\hbar/m>0$: SIEMPRE dispersa.' },
          ],
        },
      },
      {
        id: 'plib-6',
        kind: 'interpretacion',
        title: 'Espectro continuo: qué cambia respecto al pozo',
        text: 'En el pozo infinito, las condiciones de frontera seleccionaban $k$ discretos y el espectro era una lista: $E_1, E_2, E_3,\\dots$ Aquí no hay fronteras: **todo** $k\\ge 0$ es legítimo y $E=\\hbar^2k^2/2m$ recorre $[0,\\infty)$ sin huecos — un espectro **continuo**. Las probabilidades dejan de ser $|c_n|^2$ con sumas y pasan a ser $|\\phi(k)|^2dk$ con integrales; la «expansión en estados estacionarios» pasa de serie de Fourier a integral de Fourier.',
        application: {
          steps: [
            { title: 'Contrasta los ingredientes', text: 'Pozo: fronteras → cuantización → $\\sum_n$. Libre: sin fronteras → $k$ continuo → $\\int dk$. La frontera es lo único que discretiza — es la lección conceptual de comparar §2.2 con §2.4.' },
            { title: 'Reformula la medida de energía', text: 'P(encontrar $E$ entre $E$ y $E+dE$) se escribe con la densidad de estados en $k$: cambio de variable $E\\to k$ con jacobiano $dk/dE=m/(\\hbar^2 k)$. En los problemas de dispersión este lenguaje aparece siempre.' },
            { title: 'Nota el caso límite', text: 'Pozo infinito cada vez más ancho: los niveles $E_n\\propto 1/a^2$ se apiñan hacia abajo y en $a\\to\\infty$ el espectro discreto se funde en el continuo de la partícula libre. El continuo no es un mundo nuevo: es el límite del encierro que se disuelve.' },
          ],
        },
      },
      {
        id: 'plib-7',
        kind: 'interpretacion',
        title: 'El límite clásico: paquete ancho ≈ bolita newtoniana',
        text: 'Si el paquete es muy ancho comparado con cualquier longitud del problema, $\\Delta k$ es muy pequeño: todas sus componentes viajan casi a la misma $v_g$, apenas dispersa, y su centro se mueve con $v_g=p/m$ — **la ecuación de movimiento de una partícula libre clásica**. La mecánica clásica emerge de la cuántica como el límite de paquetes anchos y bien definidos en momento. Es el principio de correspondencia en acción, y aquí se ve sin cálculo pesado.',
        application: {
          steps: [
            { title: 'Encadena los límites', text: 'Paquete ancho en $x$ ⇒ $\\Delta k$ pequeño (Fourier) ⇒ todas las $v_g\\approx v_g(k_0)$ ⇒ envolvente compacta y estable ⇒ trayectoria definida.' },
            { title: 'Verifica con Ehrenfest', text: 'Para el paquete libre, $\\frac{d\\langle x\\rangle}{dt}=\\frac{\\langle p\\rangle}{m}$: el CENTRO del paquete obedece la segunda ley de Newton exactamente (con $V=0$, ni siquiera es aproximado).' },
            { title: 'Cuantifica la frontera', text: 'El régimen clásico dura mientras el ensanchamiento $\\Delta v_g\\,t$ sea despreciable frente al tamaño del paquete: $t\\ll\\frac{\\Delta x}{\\Delta v_g}$, con $\\Delta v_g=\\frac{\\hbar\\,\\Delta k}{m}$. Ese es el «tiempo de vida clásico» del paquete.' },
          ],
        },
      },
      {
        id: 'plib-8',
        kind: 'verificacion',
        title: 'Comprobaciones de bolsillo (10 segundos)',
        text: 'Antes de entregar: unidades de $v_g$ y $v_f$ ($\\text{m}/\\text{s}$ — desmonta $\\hbar k/m$ y $\\hbar k/2m$ ✓); $E=\\hbar^2k^2/2m\\ge 0$ **siempre** (una energía negativa de partícula libre es señal de error de álgebra); $v_f=v_g/2$ solo vale aquí (¡no lo uses en otros potenciales!); y el límite $\\Delta k\\to 0$: el paquete se vuelve infinitamente ancho y $\\phi$ se vuelve un pico cada vez más alto — la onda plana «pura» es ese límite, y su no-normalizabilidad es exactamente el precio de tomarlo.',
        application: {
          steps: [
            { title: 'Test de unidades', text: '$\\hbar k$ es momento; dividir por $m$ da velocidad ✓. Y $\\omega$ tiene unidades de $1/\\text{tiempo}$: $\\hbar k^2/2m$ las tiene ✓.' },
            { title: 'Test de positividad', text: 'El espectro libre es $E\\ge 0$: $k^2\\ge 0$ no admite otra cosa. Si un cálculo te da $E<0$, revisa los signos de la exponencial o del cambio $k\\leftrightarrow E$.' },
            { title: 'Test del límite Δk → 0', text: 'Cuanto más estrecho el $\\phi(k)$, más ancho el paquete y más lenta la dispersión. El límite extremo es la onda plana: infinitamente ancha, no normalizable — coherente con la pista 2.' },
            { title: 'Test de simetría del espectro', text: 'Si $\\phi(k)$ es simétrico respecto de $k_0$, entonces $\\langle p\\rangle=\\hbar k_0$ por simetría, sin integrar. Úsalo para autoverificar transformadas.' },
          ],
        },
      },
      {
        id: 'plib-9',
        kind: 'reconocimiento',
        title: 'Conexión con lo que viene: §2.5–§2.7 usan TODO esto',
        text: 'La partícula libre no es un tema aislado: es el idioma de la dispersión. Delta (§2.5), pozo finito (§2.6) y matriz S (§2.7) tratan potenciales que se apagan en el infinito: lejos del origen eres SIEMPRE una partícula libre, y las soluciones allí son ondas planas $e^{\\pm ikx}$. Todo lo que esta sección enseña — cómo se combinan, cómo se normalizan los paquetes, qué significa $v_g$ — reaparece allí con nombres nuevos: «onda incidente», «onda transmitida», «onda reflejada».',
        application: {
          steps: [
            { title: 'Identifica las zonas libres', text: 'En dispersión, $V(x)\\to 0$ cuando $|x|\\to\\infty$: fuera de la región del potencial, la EDE es exactamente la de esta sección. Ondas planas garantizadas en los flancos.' },
            { title: 'Anticipa la interpretación', text: 'La $e^{+ikx}$ que llega es la **incidente**; las que salen, la reflejada y la transmitida. Sus coeficientes comparan amplitudes — y sus corrientes de probabilidad comparan flujos: de ahí nacen $R$ y $T$.' },
            { title: 'Recuerda la letra pequeña', text: 'Los estados de dispersión tampoco son normalizables en sentido estricto (son ondas planas en el infinito): se manejan como paquetes, exactamente igual que aquí. La paradoja de esta sección es la que sostiene TODA la teoría de scattering.' },
          ],
        },
      },
    ],
    examQuestions: [
      { id: 'pe-lib-1', q: 'Demuestra que ningún estado estacionario de la partícula libre es normalizable y explica qué implica eso sobre el espectro y sobre qué es un estado físico.', hintIndex: 1 },
      { id: 'pe-lib-2', q: 'Dado un $\\phi(k)$ gaussiano centrado en $k_0$, normalízalo, escribe $\\Psi(x,t)$ e identifica la velocidad del paquete.', hintIndex: 2 },
      { id: 'pe-lib-3', q: 'Calcula las velocidades de grupo y de fase de un paquete con $k_0$ dado; explica por qué difieren y cuál es la de la partícula.', hintIndex: 3 },
      { id: 'pe-lib-4', q: 'Argumenta, con dos componentes de $k$ vecinas, por qué un paquete libre se ensancha con el tiempo; ¿en qué condición NO se ensancharía?', hintIndex: 4 },
      { id: 'pe-lib-5', q: 'Contrasta el espectro de la partícula libre con el del pozo infinito: ¿qué discretiza a uno y no al otro? ¿Qué pasa cuando el pozo se hace infinitamente ancho?', hintIndex: 5 },
      { id: 'pe-lib-6', q: 'Demuestra que el centro del paquete obedece $\\frac{d\\langle x\\rangle}{dt}=\\frac{\\langle p\\rangle}{m}$ y discute cuándo el paquete se comporta como partícula clásica.', hintIndex: 6 },
    ],
    commonMistakes: [
      'Tratar $e^{ikx}$ como estado físico normalizable: su densidad es 1 en todo el espacio — solo sirve como ladrillo para construir paquetes.',
      'Confundir $v_g$ con $v_f$: grupo = $d\\omega/dk$ (la de la partícula, $\\hbar k/m$); fase = $\\omega/k$ (la de las crestas, $\\hbar k/2m$ aquí).',
      'Admitir energías negativas: $E=\\hbar^2k^2/2m\\ge 0$ siempre — con $k$ real no hay otra opción.',
      'Olvidar que el espectro es CONTINUO: escribir sumas $\\sum_n|c_n|^2$ donde van integrales $\\int|\\phi(k)|^2\\,dk$.',
      'Normalizar el paquete en $x$ sin normalizar $\\phi(k)$ (o al revés): por Plancherel es la misma condición — debe cumplirse en las dos representaciones a la vez.',
    ],
    relatedProblemIds: ['bp-2-19', 'bp-2-20', 'bp-2-21', 'bp-2-22', 'bp-2-40', 'bp-2-43'],
  },
]
