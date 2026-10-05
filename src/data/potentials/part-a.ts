// ════════════════════════════════════════════════════════════════════════════
// POTENCIALES DEL LIBRO — Parte A: §2.2 Pozo cuadrado infinito
// ════════════════════════════════════════════════════════════════════════════
// Contenido pedagógico ORIGINAL (español). Las ecuaciones son las estándar
// de la mecánica cuántica. Formato de texto: markdown ligero + LaTeX
// (mismo convenio que las pistas de los problemas: $...$ inline,
// $$...$$ en línea propia para ecuaciones destacadas).

import type { BookPotential } from './types'

export const PART_A_POTENTIALS: BookPotential[] = [
  {
    id: 'pot-2-2',
    sectionId: '2.2',
    title: 'Pozo cuadrado infinito',
    tagline: 'Una partícula encerrada en una caja de paredes perfectamente duras: el único potencial del capítulo que se resuelve de principio a fin con álgebra elemental.',
    difficulty: 1,
    graphType: 'infinite-well',
    vignette:
      'Es **EL potencial del examen**. Si el profesor dice «resuelva este potencial», este es el candidato número uno: toda la maquinaria (cuantización, normalización, expansión en estados estacionarios) aparece aquí sin technically ninguna técnica sofisticada. Domínalo hasta poder reproducirlo en una hoja en cinco minutos: te da la plantilla mental para el pozo finito (§2.6) y el escalón de práctica para el oscilador (§2.3).\n\nLo que lo hace especial: $V=\\infty$ en las paredes fuerza $\\psi=0$ ahí, y esas **dos condiciones de frontera** son las que cuantizan la energía. No hay ningún postulado de cuantización: la discreción de $E_n$ *emerge* del seno que tiene que doblar sus ondas para caber en la caja.',
    setup: [
      'El potencial: paredes infinitas en los bordes, interior libre.',
      '$$V(x)=\\begin{cases}0, & 0<x<a,\\\\[2pt] \\infty, & \\text{en el resto.}\\end{cases}$$',
      '**Fuera del pozo** ($x\\le 0$ o $x\\ge a$): la partícula no puede estar ahí — $\\psi=0$.',
      '**Dentro del pozo** ($0<x<a$): $V=0$ y la ecuación de Schrödinger independiente del tiempo queda',
      '$$-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2}=E\\psi \\qquad (0<x<a),$$',
      'que es la ecuación de una partícula libre: $\\psi\'\'=-k^2\\psi$ con $k\\equiv\\sqrt{2mE}/\\hbar$.',
      '**Condiciones de frontera**: $\\psi(0)=\\psi(a)=0$, porque $\\psi$ debe ser continua y $V$ es infinita en las paredes.',
    ],
    derivation: {
      intro:
        'La derivación completa, pensada para reproducirla en el examen. Cada paso se revela por separado: intenta anticipar el siguiente antes de mostrarlo.',
      steps: [
        {
          title: 'Divide el espacio en regiones',
          text: 'Regla general de todos los potenciales por tramos: lista las regiones donde $V$ es constante. Aquí hay dos: **dentro** ($0<x<a$, con $V=0$) y **fuera** (paredes, $V=\\infty$).',
        },
        {
          title: 'Fuera del pozo: ψ = 0',
          text: 'Con $V=\\infty$, la EDE solo se satisface con $\\psi=0$ ahí: una $\\psi$ distinta de cero donde $V\\to\\infty$ requeriría una curvatura infinita. La partícula **no puede** penetrar una pared perfectamente dura.',
        },
        {
          title: 'Dentro: la ecuación de partícula libre',
          text: 'Con $V=0$ la EDE se reduce a\n$$\\frac{d^2\\psi}{dx^2}=-k^2\\psi,\\qquad k\\equiv\\frac{\\sqrt{2mE}}{\\hbar}.$$\nCon $E>0$, $k$ es real y positivo.',
        },
        {
          title: 'Solución general dentro del pozo',
          text: 'La solución general de $\\psi\'\'=-k^2\\psi$ es\n$$\\psi(x)=A\\sin(kx)+B\\cos(kx)$$\ncon $A$ y $B$ complejos aún por determinar. **No decidas todavía** quién es $A$ ni $B$: primero vienen las condiciones de frontera.',
        },
        {
          title: 'Condición de frontera en x = 0',
          text: '$\\psi(0)=A\\sin(0)+B\\cos(0)=B$. La continuidad exige $\\psi(0)=0$, así que $B=0$: **el coseno muere en la pared izquierda**. Dentro queda solo $\\psi=A\\sin(kx)$.',
        },
        {
          title: 'Condición de frontera en x = a',
          text: '$\\psi(a)=A\\sin(ka)=0$. Podrías «resolverlo» con $A=0$… pero eso da $\\psi\\equiv 0$ en todas partes: no normalizable, no es estado físico. La única salida es\n$$\\sin(ka)=0\\quad\\Longrightarrow\\quad ka=n\\pi,\\qquad n=1,2,3,\\dots$$',
        },
        {
          title: 'La cuantización aparece sola',
          text: 'De $ka=n\\pi$ y $k=\\sqrt{2mE}/\\hbar$:\n$$k_n=\\frac{n\\pi}{a}\\quad\\Longrightarrow\\quad \\boxed{\\,E_n=\\frac{n^2\\pi^2\\hbar^2}{2ma^2}\\,},\\qquad n=1,2,3,\\dots$$\nNadie impuso que la energía fuera discreta: **las ondas tienen que caber en la caja**, y solo caben si tienen un número entero de medios-ondas. Eso es la cuantización.',
        },
        {
          title: 'Por qué n = 0 está prohibido (y los negativos sobran)',
          text: '$n=0$ da $\\psi\\equiv 0$ (no normalizable). Los $n$ negativos solo cambian el signo global de $\\psi$ — y $A$ ya absorbe signos — así que **no aportan estados nuevos**. El espectro es $n=1,2,3,\\dots$ y ya está.',
        },
        {
          title: 'Normalización',
          text: 'Exige $\\int_0^a|\\psi|^2\\,dx=1$:\n$$|A|^2\\int_0^a\\sin^2\\!\\left(\\frac{n\\pi x}{a}\\right)dx=|A|^2\\cdot\\frac{a}{2}=1\\quad\\Longrightarrow\\quad A=\\sqrt{\\frac{2}{a}}.$$\n(La integral de $\\sin^2$ sobre un número entero de medios-períodos vale $a/2$; con la identidad $\\sin^2 u = \\tfrac{1}{2}(1-\\cos 2u)$ sale en una línea.)',
        },
        {
          title: 'Estados estacionarios completos',
          text: 'Cada solución admisible de la EDE, con su fase temporal:\n$$\\psi_n(x)=\\sqrt{\\frac{2}{a}}\\,\\sin\\!\\left(\\frac{n\\pi x}{a}\\right),\\qquad \\Psi_n(x,t)=\\psi_n(x)\\,e^{-iE_n t/\\hbar}.$$',
        },
        {
          title: 'La solución general: superposición',
          text: 'La EDE es lineal, así que la solución más general no es un solo $n$, sino\n$$\\Psi(x,t)=\\sum_{n=1}^{\\infty}c_n\\,\\psi_n(x)\\,e^{-iE_n t/\\hbar},$$\ncon $\\sum|c_n|^2=1$ si $\\Psi$ está normalizada.',
        },
        {
          title: 'Coeficientes cₙ: proyección de Fourier',
          text: 'Dado el estado inicial $\\Psi(x,0)$, los coeficientes se leen proyectando sobre la base (los $\\psi_n$ son ortogonales):\n$$c_n=\\int_0^a\\psi_n^*(x)\\,\\Psi(x,0)\\,dx.$$\nEsta fórmula es la que convierte «la partícula empieza con tal forma» en «tales probabilidades de medir tales energías».',
        },
      ],
    },
    keyResults: [
      { label: 'Energías cuantizadas', latex: 'E_n=\\frac{n^2\\pi^2\\hbar^2}{2ma^2},\\quad n=1,2,3,\\dots', note: 'Crece con n²: los niveles se van separando cada vez más.' },
      { label: 'Autofunciones', latex: '\\psi_n(x)=\\sqrt{\\frac{2}{a}}\\,\\sin\\!\\left(\\frac{n\\pi x}{a}\\right)' },
      { label: 'Estado estacionario completo', latex: '\\Psi_n(x,t)=\\psi_n(x)\\,e^{-iE_n t/\\hbar}', note: '|Ψₙ|² no depende del tiempo.' },
      { label: 'Solución general', latex: '\\Psi(x,t)=\\sum_{n=1}^{\\infty}c_n\\,\\psi_n(x)\\,e^{-iE_n t/\\hbar}' },
      { label: 'Coeficientes (Fourier)', latex: 'c_n=\\int_0^a\\psi_n^*(x)\\,\\Psi(x,0)\\,dx', note: 'P(|E|=Eₙ) = |cₙ|².' },
      { label: 'Valores esperados (estado n)', latex: '\\langle x\\rangle=\\frac{a}{2},\\quad \\langle p\\rangle=0,\\quad \\langle x^2\\rangle=a^2\\!\\left(\\frac{1}{3}-\\frac{1}{2n^2\\pi^2}\\right)' },
      { label: 'Pozo simétrico [−a/2, a/2]', latex: '\\psi_n\\propto\\cos\\!\\left(\\frac{n\\pi x}{a}\\right)\\ (n\\ \\text{impar}),\\qquad \\psi_n\\propto\\sin\\!\\left(\\frac{n\\pi x}{a}\\right)\\ (n\\ \\text{par})', note: 'La paridad se hereda del potencial par.' },
    ],
    hints: [
      {
        id: 'pinf-1',
        kind: 'reconocimiento',
        title: '¿Qué problema tengo delante?',
        text: 'Señales de pozo infinito: la partícula vive «dentro de una caja» con paredes que no puede cruzar, $V$ es 0 en el interior y $\\infty$ fuera. Lo que el profesor suele pedir: **hallar $E_n$ y $\\psi_n$ desde cero**, o partir de un estado inicial $\\Psi(x,0)$ y predecir mediciones de energía.',
        application: {
          intro: 'Checklist de reconocimiento antes de escribir nada:',
          steps: [
            { title: 'Identifica el potencial', text: '¿$V=0$ en un intervalo y $\\infty$ fuera? ¿El intervalo es $[0,a]$ o $[-a/2,a/2]$? La elección cambia las autofunciones pero **no** las energías.' },
            { title: 'Enumera las regiones', text: 'Dentro ($V=0$) y fuera ($V=\\infty$). Fuera: $\\psi=0$ siempre.' },
            { title: 'Enumera las condiciones de frontera', text: 'Cuantas paredes, tantas condiciones: $\\psi=0$ en cada borde. Dos paredes → dos condiciones → cuantización.' },
            { title: 'Clasifica la pregunta', text: '¿(i) derivar el espectro? ¿(ii) expandir un $\\Psi(x,0)$ dado? ¿(iii) valores esperados $\\langle x\\rangle$, $\\langle x^2\\rangle$, $\\langle p\\rangle$? Cada tipo tiene su ruta corta — las pistas siguientes están ordenadas así.' },
          ],
        },
      },
      {
        id: 'pinf-2',
        kind: 'planteamiento',
        title: 'Por qué ψ se anula en las paredes',
        text: 'No es un capricho: $\\psi$ debe ser **continua**, y si $\\psi\\ne 0$ en un punto donde $V=\\infty$, la EDE $\\psi\'\'=\\frac{2m}{\\hbar^2}(V-E)\\psi$ exigiría una segunda derivada infinita — una función así no puede sobrevivir a la continuidad. Conclusión operativa: **pared dura ⇒ $\\psi=0$ en la pared**.',
        application: {
          intro: 'El argumento formal en tres líneas (por si te lo piden demostrado):',
          steps: [
            { title: 'Escribe la EDE fuera del pozo', text: 'Donde $V=\\infty$: $\\psi\'\'=\\frac{2m}{\\hbar^2}\\,(V-E)\\,\\psi$. Si $\\psi$ fuera distinta de cero ahí, $\\psi\'\'$ sería infinita.' },
            { title: 'Piensa en la continuidad', text: 'Una curvatura infinita en un punto rompería la continuidad de $\\psi$ respecto al interior. La única solución continua con $\\psi=0$ dentro de la pared (donde no puede normalizarse nada) es pegarse a cero.' },
            { title: 'Enuncia la regla que vas a usar', text: 'En cada pared $x=0$ y $x=a$: $\\psi=0$. Son tus **dos** condiciones de frontera; todo lo demás (senos, cuantización, normalización) se construye encima.' },
          ],
        },
      },
      {
        id: 'pinf-3',
        kind: 'planteamiento',
        title: 'Dentro del pozo eres una partícula libre',
        text: 'Con $V=0$, la EDE es $\\psi\'\'=-k^2\\psi$ con $k=\\sqrt{2mE}/\\hbar$. La solución general **real** es $A\\sin(kx)+B\\cos(kx)$. Escribirla como exponenciales complejas también vale, pero senos/cosenos casan mejor con las condiciones $\\psi=0$.',
        application: {
          steps: [
            { title: 'Define k antes de escribir ψ', text: '$k\\equiv\\sqrt{2mE}/\\hbar$ te ahorra arrastrar $\\sqrt{2mE}$ por toda la página. Al final, sustituyes $k$ y aparece $E_n$.' },
            { title: 'Escribe la solución general', text: '$\\psi(x)=A\\sin(kx)+B\\cos(kx)$ en $0<x<a$, $\\psi=0$ fuera. **Resiste la tentación** de normalizar ahora: primero las fronteras.' },
            { title: 'Fija E > 0 sin miedo', text: '¿Puede ser $E\\le 0$? Dentro del pozo, $E\\le 0$ da $k$ imaginario → exponenciales reales → no pueden cumplir las dos condiciones $\\psi=0$ (lo ejercita el problema 2.3 del libro). Puedes asumir $E>0$ y seguir.' },
          ],
        },
      },
      {
        id: 'pinf-4',
        kind: 'tecnica',
        title: 'Aplica las fronteras en orden: primero x = 0',
        text: 'El orden importa para no arrastrar ecuaciones: aplica **primero** $\\psi(0)=0$ (mata el coseno de un plumazo: $\\psi(0)=B$), y **después** $\\psi(a)=0$ (que ya solo ve al seno). Si las aplicas al revés o a la vez, acabas con un sistema 2×2 que no necesitas.',
        application: {
          steps: [
            { title: 'Frontera izquierda', text: '$\\psi(0)=B\\cos(0)=B=0$. El coseno desaparece. Queda $\\psi=A\\sin(kx)$.' },
            { title: 'Frontera derecha', text: '$\\psi(a)=A\\sin(ka)=0$. Con $A=0$ no habría estado: exige $\\sin(ka)=0$.' },
            { title: 'Cuenta tus incógnitas', text: 'Tenías $A$, $B$ y $E$ (dentro de $k$). Las fronteras te dieron $B=0$ y una condición sobre $k$ — te queda $A$ para la **normalización**. Ese reparto (fronteras → cuantización, normalización → amplitud) es exactamente el mismo en el pozo finito y en el delta.' },
          ],
        },
      },
      {
        id: 'pinf-5',
        kind: 'tecnica',
        title: 'La cuantización no se impone: sale de ka = nπ',
        text: 'De $\\sin(ka)=0$: $ka=n\\pi$ con $n=1,2,3,\\dots$ Sustituye $k=\\sqrt{2mE}/\\hbar$ y despeja $E$:\n$$E_n=\\frac{n^2\\pi^2\\hbar^2}{2ma^2}.$$\nSi en el examen «te falta» la fórmula de $E_n$, recuerda la fuente: **medio-número de ondas entero dentro de la caja**.',
        application: {
          steps: [
            { title: 'Piensa en longitudes de onda', text: '$k_n=n\\pi/a$ significa $\\lambda_n=2a/n$: en la caja caben $n$ medios-periodos. Dibujar $\\psi_1$, $\\psi_2$, $\\psi_3$ (1, 2, 3 bultos) te graba la fórmula sin memorizarla.' },
            { title: 'Verifica el escalado con a', text: 'Caja más ancha → longitudes de onda más largas → energías más bajas: $E_n\\propto 1/a^2$. Caja más estrecha confina más y sube **toda** la escala de energías.' },
            { title: 'Verifica el escalado con n', text: '$E_n\\propto n^2$: $E_2=4E_1$, $E_3=9E_1$… Los niveles se **espacian** cada vez más al subir, al revés del oscilador armónico (§2.3), que los tiene equiespaciados.' },
          ],
        },
      },
      {
        id: 'pinf-6',
        kind: 'tecnica',
        title: 'Normaliza al final, con la integral de sin²',
        text: 'Con $\\psi=A\\sin(n\\pi x/a)$: $\\int_0^a|\\psi|^2dx=|A|^2\\int_0^a\\sin^2(n\\pi x/a)\\,dx=|A|^2\\,a/2$. Iguala a 1 y sale $A=\\sqrt{2/a}$ — **independiente de $n$**. Truco de una línea para la integral: $\\sin^2 u=\\tfrac12(1-\\cos 2u)$ y el coseno integra a cero sobre períodos completos.',
        application: {
          steps: [
            { title: 'Plantea la condición', text: '$|A|^2\\,a/2=1$ (la integral del seno al cuadrado sobre la caja completa es siempre $a/2$, sea cual sea $n$).' },
            { title: 'Despeja y simplifica', text: '$A=\\sqrt{2/a}$, tomado real y positivo por convención (la fase global global de $\\psi$ no es observable).' },
            { title: 'Comprueba con n = 1', text: 'Para $\\psi_1$, $|\\psi_1|^2$ tiene un solo bulto centrado: su integral con $2/a$ vale 1. ✓ Si tu $A$ dependiera de $n$, algo salió mal.' },
          ],
        },
      },
      {
        id: 'pinf-7',
        kind: 'tecnica',
        title: 'Expansión en estados estacionarios: la pregunta estrella',
        text: 'Formato típico: «en $t=0$ la partícula está en $\\Psi(x,0)=A\\,x(a-x)$ (o una combinación de $\\psi_1$ y $\\psi_3$, o media caja…). ¿Qué probabilidades hay de medir cada energía?» Ruta: **proyecta** sobre la base: $c_n=\\int_0^a\\psi_n^*(x)\\Psi(x,0)\\,dx$ y $P(E_n)=|c_n|^2$.',
        application: {
          intro: 'El método completo, de principio a fin:',
          steps: [
            { title: 'Normaliza Ψ(x, 0) primero', text: 'Si $\\Psi(x,0)$ trae una constante sin fijar (como $A$ en $Ax(a-x)$), normalízala **antes** de proyectar: $\\int_0^a|\\Psi(x,0)|^2dx=1$.' },
            { title: 'Proyecta para obtener cada cₙ', text: '$c_n=\\int_0^a\\psi_n^*(x)\\,\\Psi(x,0)\\,dx$. Como los $\\psi_n$ son reales aquí, $\\psi_n^*=\\psi_n$. Las simetrías del estado inicial anuncian qué $c_n$ serán cero: una función simétrica respecto al centro solo excita $n$ impares en el pozo simétrico… pero cuidado, eso es en $[-a/2,a/2]$; en $[0,a]$ no hay paridad.' },
            { title: 'Escribe la evolución', text: '$\\Psi(x,t)=\\sum_n c_n\\,\\psi_n(x)\\,e^{-iE_n t/\\hbar}$. Cada componente gira a su propia frecuencia — esta fase relativa es la que produce la oscilación de $|\\Psi|^2$ en el tiempo.' },
            { title: 'Responde lo que preguntaron', text: '¿Probabilidad de un nivel? $|c_n|^2$. ¿Valor esperado de la energía? $\\langle H\\rangle=\\sum_n|c_n|^2E_n$. ¿Estado tras medir $E_3$? Colapsa a $\\psi_3$ (y de ahí en adelante evoluciona con su sola fase).' },
            { title: 'Comprueba la unidad total', text: '$\\sum_n|c_n|^2$ debe dar 1: si te sobra o te falta, revisa la normalización del paso 1 — es el error nº 1 de este tipo de ejercicio.' },
          ],
        },
      },
      {
        id: 'pinf-8',
        kind: 'interpretacion',
        title: 'Paridad: el pozo simétrico tiene dos alfabetos',
        text: 'Si el pozo se centra en el origen, $V(-x)=V(x)$: el potencial es **par**, y entonces las autofunciones se pueden elegir par o impar. Con el pozo $[-a/2,a/2]$: $\\psi_n\\propto\\cos(n\\pi x/a)$ para $n$ **impar** y $\\psi_n\\propto\\sin(n\\pi x/a)$ para $n$ **par**. (El suelo «n impar ↔ paridad par» parece al revés, pero así es: el estado fundamental no tiene nodos y es coseno.)',
        application: {
          steps: [
            { title: 'Detecta el centro', text: '¿El enunciado usa $[0,a]$ o $[-a/2,a/2]$? Las energías son idénticas; las funciones, no. Nunca mezcles las formas de un alfabeto con el otro.' },
            { title: 'Usa la simetría para ahorrar integrales', text: 'En el pozo simétrico, $\\langle x\\rangle=0$ «por simetría» para todo estado estacionario, sin integrar. Y un estado inicial par solo excita $\\psi_n$ pares: la mitad de los $c_n$ son cero gratis.' },
            { title: 'Relaciona nodos con n', text: 'El estado $n$ tiene $n-1$ nodos dentro de la caja. Ceros extra o faltantes = índice mal contado; es la comprobación visual más rápida del examen.' },
          ],
        },
      },
      {
        id: 'pinf-9',
        kind: 'interpretacion',
        title: '¿Qué tiene de «estacionario» un estado estacionario?',
        text: 'Para $\\Psi_n=\\psi_n e^{-iE_n t/\\hbar}$: $|\\Psi_n|^2=|\\psi_n|^2$, **no depende del tiempo**. Ni la densidad, ni $\\langle x\\rangle$, ni ninguna $\\langle Q(x)\\rangle$. Lo que sí gira es la fase global — invisible. Solo cuando superpones **dos** $n$ distintos, las fases relativas producen una densidad que late en el tiempo.',
        application: {
          steps: [
            { title: 'Prueba la constancia', text: 'Multiplica $\\Psi_n$ por su conjugada: el módulo de $e^{-iE_nt/\\hbar}$ es 1, así que $|\\Psi_n(x,t)|^2=|\\psi_n(x)|^2$ para todo $t$.' },
            { title: 'Cuenta «corrientes»', text: 'Un estado estacionario del pozo no transporta corriente neta: $\\langle p\\rangle=0$. La partícula «va y viene» con igual peso a derecha e izquierda en cada componente.' },
            { title: 'Anticipa cuándo SÍ hay tiempo', text: 'Solo superposiciones tipo $c_1\\psi_1+c_2\\psi_2\\,e^{-i(E_2-E_1)t/\\hbar}$ muestran latidos. La frecuencia de ese latido la marca la **diferencia** de energías, no su valor absoluto.' },
          ],
        },
      },
      {
        id: 'pinf-10',
        kind: 'interpretacion',
        title: 'Límite clásico: dónde se esconde la partícula clásica',
        text: 'La partícula clásica en la caja es igual de probable en cualquier $x$: densidad uniforme $1/a$. La cuántica $|\\psi_n|^2$ tiene $n$ bultos… pero su **promedio** es $2/a$ y a medida que $n\\to\\infty$ los bultos se apiñan: en promedios sobre regiones no microscópicas, $|\\psi_n|^2\\to$ uniforme. Es el principio de correspondencia funcionando.',
        application: {
          steps: [
            { title: 'Compara probabilidades en un intervalo', text: 'P(region) clásica = longitud/$a$. Cuántica: $\\int$ del intervalo de $|\\psi_n|^2$. Para $n$ pequeño difieren mucho; para $n$ grande se parecen cada vez más.' },
            { title: 'Elige tu región de prueba', text: 'Una región cercana a la pared es el mejor detector de «quantum-ness»: clásica da probabilidad proporcional a su longitud; en $\\psi_1$ es casi cero (el bulto está en el centro).' },
            { title: 'Energía clásica equivalente', text: 'Una clásica con energía $E$ lleva $v=\\sqrt{2E/m}$ y rebota $v/(2a)$ veces por segundo. Si el examen compara frecuencias clásicas de rebote con frecuencias cuánticas $E_n/\\hbar$, esta es la conexión.' },
          ],
        },
      },
      {
        id: 'pinf-11',
        kind: 'verificacion',
        title: 'Comprobaciones de bolsillo (10 segundos)',
        text: 'Antes de entregar: **unidades** de $E_1$ (Julios: $\\hbar^2/(m\\,a^2)$ ✓); $E_1>0$ (energía de confinamiento — no existe el estado $E=0$); $\\langle x\\rangle=a/2$ **por simetría** (si te sale otra cosa, error de signo); $\\langle p\\rangle=0$; y el límite $a\\to\\infty$: $E_n\\to 0$ y los niveles se aglomeran — la caja gigante se comporta como partícula libre.',
        application: {
          steps: [
            { title: 'Test de simetría', text: 'El pozo $[0,a]$ es simétrico respecto a $x=a/2$: todo $\\langle x\\rangle$ de un estado estacionario debe dar $a/2$. Es la verificación más rentable: cero integrales.' },
            { title: 'Test de nodos', text: 'Cuenta los ceros internos de tu $\\psi_n$: deben ser exactamente $n-1$. Si tu $\\psi_3$ tiene 1 nodo, en realidad es $\\psi_2$.' },
            { title: 'Test de dimensiones y límites', text: '$E_n$ con $n^2$, $\\pi^2$, $\\hbar^2$ arriba y $m a^2$ abajo; $E_1$ con $n=1$; $\\psi_n$ adimensional tras multiplicar por $\\sqrt{2/a}$ (unidades de $1/\\sqrt{\\text{longitud}}$).' },
          ],
        },
      },
    ],
    examQuestions: [
      { id: 'pe-inf-1', q: 'Deriva $E_n$ y $\\psi_n$ completos para el pozo $[0,a]$, con normalización, desde la EDE.', hintIndex: 4 },
      { id: 'pe-inf-2', q: 'Para $\\Psi(x,0)=A\\,x(a-x)$, halla $A$, los $c_n$ y la probabilidad de medir el estado fundamental.', hintIndex: 6 },
      { id: 'pe-inf-3', q: 'Calcula $\\langle x\\rangle$, $\\langle x^2\\rangle$ y $\\Delta x$ para el estado $n$; verifica $\\langle x\\rangle$ por simetría.', hintIndex: 10 },
      { id: 'pe-inf-4', q: 'Probabilidad de encontrar la partícula en $[0,a/3]$ para $n=1$; compara con el valor clásico y discute el límite $n\\to\\infty$.', hintIndex: 9 },
      { id: 'pe-inf-5', q: 'Repite la derivación para el pozo simétrico $[-a/2,a/2]$ usando paridad: ¿qué cambia y qué no?', hintIndex: 7 },
      { id: 'pe-inf-6', q: 'Si el pozo se ensancha de $a$ a $2a$ de forma súbita, ¿qué ocurre con $E_1$ y con el estado si era $\\psi_1$ del pozo viejo?', hintIndex: 4 },
      { id: 'pe-inf-7', q: 'Demuestra que no existe solución aceptable con $E\\le 0$ en el pozo infinito.', hintIndex: 2 },
    ],
    commonMistakes: [
      'Admitir $n=0$: da $\\psi\\equiv 0$, que no se puede normalizar (y los $n<0$ solo repiten estados con un signo global).',
      'Escribir $E_n\\propto n$ en lugar de $n^2$ — el espaciado **crece** al subir de nivel.',
      'Usar cosenos como soluciones en el pozo $[0,a]$: solo sobreviven los senos porque $\\psi(0)=0$.',
      'Olvidar la fase $e^{-iE_n t/\\hbar}$ al pasar de $\\psi_n$ a $\\Psi_n(x,t)$ — y con ella, todo el contenido temporal.',
      'Confundir $c_n$ con $|c_n|^2$: la probabilidad es el **módulo al cuadrado** del coeficiente.',
      'En el pozo simétrico, cruzar las paridades (el estado fundamental es el **coseno**, $n$ impar).',
    ],
    relatedProblemIds: ['bp-2-3', 'bp-2-4', 'bp-2-5', 'bp-2-6', 'bp-2-7', 'bp-2-8', 'bp-2-9', 'bp-2-10'],
  },
]
