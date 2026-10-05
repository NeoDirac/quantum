// ════════════════════════════════════════════════════════════════════════════
// POTENCIALES DEL LIBRO — Parte C: §2.5 Delta + §2.6 Pozo finito
// ════════════════════════════════════════════════════════════════════════════
// Contenido pedagógico ORIGINAL (español). Las ecuaciones son las estándar
// de la mecánica cuántica. Formato de texto: markdown ligero + LaTeX
// (mismo convenio que las pistas de los problemas: $...$ inline,
// $$...$$ en línea propia para ecuaciones destacadas).

import type { BookPotential } from './types'

export const PART_C_POTENTIALS: BookPotential[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // §2.5 — Potencial delta de Dirac
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'pot-2-5',
    sectionId: '2.5',
    title: 'Potencial delta de Dirac',
    tagline: 'Un pozo «sin ancho y sin fondo» pero de área finita: el potencial extremo que se resuelve exactamente con la mínima álgebra.',
    difficulty: 2,
    graphType: 'delta',
    vignette:
      'Es el potencial **infinitesimalmente estrecho e infinitamente profundo**: todo el pozo concentrado en un punto, con el **área** (con signo) finita. Y aun así se resuelve **exactamente**, con menos álgebra que ningún otro del capítulo. Por eso es un favorito del examen: en cinco líneas comprueba si entiendes de verdad las condiciones de frontera — en particular, qué le pasa a $\\psi\'$ cuando el potencial mete todo su empuje en un solo punto. La técnica del «salto de $\\psi\'$» se aprende aquí o no se aprende.\n\nEs además el laboratorio perfecto para los DOS regímenes del capítulo con el mínimo esfuerzo: con $E<0$ tienes un **estado ligado** (uno solo — y saber explicar *por qué* solo uno vale media pregunta) y con $E>0$ tienes **dispersión** completa — onda incidente, reflejada y transmitida — sin apenas contabilidad de coeficientes. Lo que estrenes aquí es exactamente lo que necesitarás en el pozo finito (§2.6) y en la matriz S (§2.7).',
    setup: [
      'El potencial: todo el pozo concentrado en un solo punto.',
      '$$V(x)=-\\alpha\\,\\delta(x),\\qquad \\alpha>0.$$',
      'La delta de Dirac no es una función, es una **distribución**: vale cero en todas partes salvo en el origen, y su propiedad definitoria es\n$$\\int_{-\\infty}^{\\infty}f(x)\\,\\delta(x)\\,dx=f(0):$$\nal integrarla contra otra función recoge su valor en el origen. Piénsala como el límite de un pozo cada vez más estrecho y más profundo manteniendo el **área** total igual a $\\alpha$.',
      'Con $\\alpha>0$ el delta es **atractivo** (un pozo). Con $V=+\\alpha\\,\\delta(x)$ sería una barrera repulsiva. El cero de energías está en $V(\\pm\\infty)=0$, y eso parte el problema en dos mundos:',
      '**Estados ligados** ($E<0$): $\\psi$ normalizable, concentrada en torno al origen. **Dispersión** ($E>0$): ondas que llegan de lejos, se reflejan y se transmiten. Cada régimen tiene sus propias formas de $\\psi$.',
      'La EDE — con la delta presente solo en el origen; fuera de él, es la ecuación de partícula libre:',
      '$$-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2}-\\alpha\\,\\delta(x)\\,\\psi(x)=E\\,\\psi.$$',
      '**Condiciones de frontera**: $\\psi$ es continua en $x=0$; $\\psi\'$ **no** — sufre un salto proporcional a $\\psi(0)$. Ese salto es la firma del delta y la clave de todo el problema.',
    ],
    derivation: {
      intro:
        'La derivación del **estado ligado** ($E<0$), en orden de examen: dos condiciones de frontera y un poco de álgebra. Intenta anticipar cada paso antes de revelarlo.',
      steps: [
        {
          title: 'Fuera del origen: exponenciales reales',
          text: 'El pozo ocupa un punto, así que «fuera» es todo $x\\ne0$, con $V=0$. Para $E<0$ la EDE queda\n$$\\frac{d^2\\psi}{dx^2}=\\kappa^2\\psi,\\qquad \\kappa\\equiv\\frac{\\sqrt{-2mE}}{\\hbar}.$$\nFíjate en el signo: como $E<0$, la raíz $\\sqrt{-2mE}$ es real y $\\kappa>0$. Las soluciones son exponenciales reales — aquí no hay senos.',
        },
        {
          title: 'Decaimiento a ambos lados',
          text: 'Normalizable significa que $\\psi$ debe morir al alejarse del origen en cualquier dirección. Eso deja exactamente una opción por lado:\n$$\\psi(x)=\\begin{cases}A\\,e^{\\kappa x}, & x<0,\\\\[2pt] B\\,e^{-\\kappa x}, & x>0.\\end{cases}$$\nA la izquierda, $e^{\\kappa x}$ decae cuando $x\\to-\\infty$; a la derecha, $e^{-\\kappa x}$ decae cuando $x\\to+\\infty$. Las exponenciales que crecen están prohibidas por la normalización.',
        },
        {
          title: 'Continuidad de ψ en el origen',
          text: 'La función de onda no puede dar un salto: evaluando a ambos lados, $\\psi(0^-)=A$ y $\\psi(0^+)=B$, así que la continuidad impone\n$$A=B.$$\nA partir de aquí trabaja con una sola constante: $\\psi(0)=A$.',
        },
        {
          title: '⭐ La técnica: integra la EDE a través del delta',
          text: 'No hay «dentro del pozo» que resolver — el pozo es un punto. El movimiento correcto es **integrar la EDE en una vecindad infinitesimal del origen**, $(-\\epsilon,+\\epsilon)$, y luego cerrar el intervalo:\n$$-\\frac{\\hbar^2}{2m}\\int_{-\\epsilon}^{\\epsilon}\\frac{d^2\\psi}{dx^2}\\,dx+\\int_{-\\epsilon}^{\\epsilon}V(x)\\,\\psi(x)\\,dx=E\\int_{-\\epsilon}^{\\epsilon}\\psi\\,dx,\\qquad \\epsilon\\to 0.$$',
        },
        {
          title: 'Qué sobrevive y qué muere cuando ε → 0',
          text: 'Primer término: el telescopio $-\\tfrac{\\hbar^2}{2m}[\\psi\'(+\\epsilon)-\\psi\'(-\\epsilon)]$, es decir, **el salto de la derivada**. Segundo: la delta recoge $-\\alpha\\,\\psi(0)$ y **no se apaga** con $\\epsilon$ — para eso es delta. Tercero: una función acotada integrada sobre un intervalo de longitud $2\\epsilon\\to0$ da cero. En el límite:\n$$\\boxed{\\,\\Delta\\psi\'\\equiv\\psi\'(0^+)-\\psi\'(0^-)=-\\frac{2m\\alpha}{\\hbar^2}\\,\\psi(0)\\,}$$\nEl delta rompe la continuidad de $\\psi\'$ exactamente lo que marca esta fórmula — ni más ni menos.',
        },
        {
          title: 'Aplica el salto a tus exponenciales',
          text: 'Las derivadas laterales de tus funciones: $\\psi\'(0^+)=-\\kappa B$ y $\\psi\'(0^-)=+\\kappa A$. Sustituye en la condición de salto:\n$$-\\kappa B-\\kappa A=-\\frac{2m\\alpha}{\\hbar^2}A.$$\nCon $A=B$ (paso 3) y $A\\ne0$ (si fuera $0$ no habría partícula), se cancela:\n$$-2\\kappa=-\\frac{2m\\alpha}{\\hbar^2}\\quad\\Longrightarrow\\quad \\kappa=\\frac{m\\alpha}{\\hbar^2}.$$\nLa energía quedó fijada — sin ecuación trascendente y sin gráfica: el delta regala lo que en el pozo finito (§2.6) cuesta.',
        },
        {
          title: 'La energía del único estado ligado',
          text: 'Despeja $E$ de la definición $\\kappa=\\sqrt{-2mE}/\\hbar$:\n$$E=-\\frac{\\hbar^2\\kappa^2}{2m}=-\\frac{m\\alpha^2}{2\\hbar^2}.$$\nNegativa (ligada), proporcional a $\\alpha^2$… y única: el procedimiento no deja ningún otro valor donde elegir. **El pozo delta admite exactamente un estado ligado.**',
        },
        {
          title: 'Normalización',
          text: 'Impón $\\int_{-\\infty}^{\\infty}|\\psi|^2\\,dx=1$ con $\\psi=A\\,e^{-\\kappa|x|}$ (ya sabes que $A=B$). La simetría duplica la mitad derecha:\n$$|A|^2\\cdot 2\\int_0^{\\infty}e^{-2\\kappa x}\\,dx=|A|^2\\cdot\\frac{1}{\\kappa}=1\\quad\\Longrightarrow\\quad A=\\sqrt{\\kappa}.$$\n(Usa $\\int_0^{\\infty}e^{-2\\kappa x}dx=\\tfrac{1}{2\\kappa}$ y duplica.)',
        },
        {
          title: 'La autofunción completa',
          text: 'Sustituye $\\kappa=m\\alpha/\\hbar^2$:\n$$\\psi(x)=\\sqrt{\\frac{m\\alpha}{\\hbar^2}}\\;e^{-m\\alpha|x|/\\hbar^2}.$$\nUn pico con **cúspide** en el origen — la huella visible del salto de $\\psi\'$ — y colas exponenciales simétricas. Sin nodos: es el estado fundamental (y el único).',
        },
        {
          title: 'Análisis y repaso de la plantilla',
          text: 'Escalados rápidos: si cuadruplicas $\\alpha$, el estado se hunde $4\\times$ más ($E\\propto-\\alpha^2$) y $\\psi$ se concentra — la longitud de decaimiento $\\hbar^2/m\\alpha$ se reduce a la cuarta parte.\n\n**Repaso**: todo el problema se resolvió con dos condiciones — $\\psi$ continua en el origen y $\\psi\'$ con el salto del delta — más la normalización al final. Es el mismo reparto de trabajo del pozo infinito (§2.2): las fronteras cuantizan, la normalización fija amplitudes. Solo cambia la «segunda frontera»: aquí es el salto.',
        },
      ],
    },
    keyResults: [
      { label: 'Energía del estado ligado', latex: 'E=-\\frac{m\\alpha^2}{2\\hbar^2}', note: 'El único nivel del pozo: más área α, más ligado (E ∝ −α²).' },
      { label: 'Autofunción ligada', latex: '\\psi(x)=\\sqrt{\\frac{m\\alpha}{\\hbar^2}}\\,e^{-m\\alpha|x|/\\hbar^2}', note: 'Cúspide en el origen: ahí ψ′ salta.' },
      { label: 'Salto de la derivada', latex: '\\psi\'(0^+)-\\psi\'(0^-)=-\\frac{2m\\alpha}{\\hbar^2}\\,\\psi(0)', note: 'La condición de frontera exclusiva del delta.' },
      { label: 'Reflexión (E > 0)', latex: 'R=\\frac{\\beta^2}{1+\\beta^2},\\qquad \\beta=\\frac{m\\alpha}{\\hbar^2 k}', note: 'k = √(2mE)/ħ: mayor energía, menos refleja.' },
      { label: 'Transmisión (E > 0)', latex: 'T=\\frac{1}{1+\\beta^2},\\qquad \\beta=\\frac{m\\alpha}{\\hbar^2 k}' },
      { label: 'Balance de probabilidad', latex: 'R+T=1', note: 'Sin absorción: la probabilidad se reparte entre reflejar y transmitir.' },
      { label: 'Barrera delta (V = +αδ)', latex: 'T=\\frac{1}{1+\\beta^2},\\qquad \\beta=\\frac{m|\\alpha|}{\\hbar^2 k}', note: 'Pozo o barrera: R y T dependen de α², no del signo.' },
    ],
    hints: [
      {
        id: 'pdel-1',
        kind: 'reconocimiento',
        title: '¿Qué problema tengo delante?',
        text: 'Señales del delta: el enunciado escribe $\\delta(x)$ dentro de $V$; o habla de un pozo «estrecho y profundo», «de anchura despreciable», «impulso» o «espiga» de potencial. Lo que suelen pedir: el **estado ligado** completo, o los coeficientes $R$ y $T$ de una partícula incidente.',
        application: {
          intro: 'Checklist de reconocimiento antes de escribir nada:',
          steps: [
            { title: 'Confirma el signo de α', text: '$V=-\\alpha\\delta(x)$ con $\\alpha>0$ es **pozo** (puede ligar). Con $V=+\\alpha\\delta(x)$ es **barrera**: no hay estado ligado, solo dispersión — con las mismas fórmulas de dispersión pero $|\\alpha|$.' },
            { title: 'Clasifica la energía que te piden', text: '¿$E<0$ (ligado: exponenciales normalizables) o $E>0$ (dispersión: ondas $e^{\\pm ikx}$)? Decide ANTES de escribir $\\psi$: es la bifurcación principal del problema.' },
            { title: 'Recuerda la propiedad de la delta', text: '$\\int f(x)\\,\\delta(x)\\,dx=f(0)$: la delta «evalúa» en el origen lo que la multiplica. Todo el problema consistirá en usar esa propiedad una vez, y bien.' },
            { title: 'Anticipa las condiciones de frontera', text: 'Aquí no hay paredes: hay UN punto especial ($x=0$) con dos condiciones — $\\psi$ continua y $\\psi\'$ con salto. Nada más. Esa pareja lo resuelve todo.' },
          ],
        },
      },
      {
        id: 'pdel-2',
        kind: 'planteamiento',
        title: 'Los dos regímenes: decide primero',
        text: 'El delta son dos problemas en uno. Con $E<0$ buscas **estados ligados**: $\\psi$ normalizable, espectro discreto (aquí: un solo nivel). Con $E>0$ buscas **dispersión**: ondas que van y vienen, coeficientes $R$ y $T$. Nunca los mezcles: las formas de $\\psi$ son distintas en cada régimen.',
        application: {
          intro: 'Cómo saber cuál te piden:',
          steps: [
            { title: 'Palabras clave de ligado', text: '«Estado ligado», «nivel de energía», «autofunción normalizable», «la partícula atrapada» → régimen $E<0$: fuera del origen $\\psi\'\'=+\\kappa^2\\psi$, exponenciales que decaen.' },
            { title: 'Palabras clave de dispersión', text: '«Partícula incidente», «reflejada y transmitida», «coeficientes R y T», «haz que llega desde la izquierda» → régimen $E>0$: fuera del origen $\\psi\'\'=-k^2\\psi$ con $k=\\sqrt{2mE}/\\hbar$, combinación de $e^{ikx}$ y $e^{-ikx}$.' },
            { title: 'Si el enunciado es ambiguo', text: '«Analice el potencial» = haz los dos regímenes por separado y preséntalos por separado. Es el formato clásico de examen completo con este potencial.' },
            { title: 'Fija el convenio de energías', text: 'Aquí $V=0$ en el infinito, así que ligado equivale a $E<0$. El pozo finito (§2.6) usa el mismo convenio: ligado equivale a $-V_0<E<0$.' },
          ],
        },
      },
      {
        id: 'pdel-3',
        kind: 'tecnica',
        title: '⭐ La integración a través del delta',
        text: 'LA técnica de este potencial — la que el examen quiere comprobar. La derivada $\\psi\'$ **no** es continua en $x=0$ porque ahí $V$ es infinito. Para cuantificar el salto: integra la EDE sobre $(-\\epsilon,+\\epsilon)$ y toma $\\epsilon\\to0$. Del lado del potencial, lo único que sobrevive es el «peso» de la delta.',
        application: {
          intro: 'Por qué funciona y cómo ejecutarlo sin errores:',
          steps: [
            { title: 'Por qué ψ sí y ψ′ no', text: 'La EDE solo contiene UNA delta (la de $V$). Si $\\psi$ diera un salto, $\\psi\'\'$ contendría algo aún más singular que una delta, y no habría quién lo compensara: prohibido. Si $\\psi\'$ da un salto finito, $\\psi\'\'$ contiene exactamente una delta: compensable con la de $V$. Por eso $\\psi$ es continua y $\\psi\'$ salta «lo justo».' },
            { title: 'Integra la EDE', text: '$-\\tfrac{\\hbar^2}{2m}\\int_{-\\epsilon}^{\\epsilon}\\psi\'\'\\,dx+\\int_{-\\epsilon}^{\\epsilon}V\\psi\\,dx=E\\int_{-\\epsilon}^{\\epsilon}\\psi\\,dx$. El primer término es un telescopio: $-\\tfrac{\\hbar^2}{2m}[\\psi\'(+\\epsilon)-\\psi\'(-\\epsilon)]$.' },
            { title: 'Usa la propiedad de la delta', text: '$\\int_{-\\epsilon}^{\\epsilon}(-\\alpha\\,\\delta(x))\\psi(x)\\,dx=-\\alpha\\psi(0)$, independiente de $\\epsilon$. Este término NO muere: es el corazón de la técnica.' },
            { title: 'El término que muere', text: '$E\\int_{-\\epsilon}^{\\epsilon}\\psi\\,dx\\to0$: una función acotada integrada sobre un intervalo de longitud $2\\epsilon\\to0$ da cero.' },
            { title: 'Enuncia la condición de salto', text: '$\\psi\'(0^+)-\\psi\'(0^-)=-\\tfrac{2m\\alpha}{\\hbar^2}\\psi(0)$. Guárdala tal cual: es tu «segunda condición de frontera», válida para el ligado Y para la dispersión.' },
          ],
        },
      },
      {
        id: 'pdel-4',
        kind: 'tecnica',
        title: 'El estado ligado completo, paso a paso',
        text: 'La mini-derivación de examen: cinco minutos si la has practicado. Exponenciales decrecientes a los dos lados, continuidad en el origen, salto de $\\psi\'$, y la energía sale sin ecuación trascendente.',
        application: {
          intro: 'La ruta completa en cinco movimientos:',
          steps: [
            { title: 'Escribe ψ a ambos lados', text: '$\\psi=A\\,e^{\\kappa x}$ ($x<0$) y $\\psi=B\\,e^{-\\kappa x}$ ($x>0$), con $\\kappa=\\sqrt{-2mE}/\\hbar$. Los signos de los exponentes son los que decaen al alejarse del origen.' },
            { title: 'Continuidad', text: 'En $x=0$: $A=B$. Una sola constante a partir de aquí.' },
            { title: 'Derivadas laterales', text: '$\\psi\'(0^+)=-\\kappa B$ y $\\psi\'(0^-)=+\\kappa A$. Deriva cada pieza en SU región y evalúa después: es donde mejor se pierden los signos.' },
            { title: 'Salto de ψ′', text: '$-\\kappa B-\\kappa A=-\\tfrac{2m\\alpha}{\\hbar^2}A$ y con $A=B$: $\\kappa=\\tfrac{m\\alpha}{\\hbar^2}$. Cuenta los DOS $-\\kappa$: ahí se pierde el famoso factor 2.' },
            { title: 'Cierra el problema', text: '$E=-\\tfrac{\\hbar^2\\kappa^2}{2m}=-\\tfrac{m\\alpha^2}{2\\hbar^2}$ y $\\psi=\\sqrt{\\kappa}\\,e^{-\\kappa|x|}$ con $\\kappa=m\\alpha/\\hbar^2$.' },
          ],
        },
      },
      {
        id: 'pdel-5',
        kind: 'tecnica',
        title: 'Dispersión E > 0: ensamblar con el salto',
        text: 'Para $E>0$, fuera del origen la solución general es $e^{ikx}+B\\,e^{-ikx}$ a la izquierda y $F\\,e^{ikx}$ a la derecha (nada «llega» desde $+\\infty$). No hay «dentro»: las condiciones de empalme son las de siempre — continuidad de $\\psi$ y el salto de $\\psi\'$ — pero ahora conectan ondas, no exponenciales.',
        application: {
          intro: 'De las tres ondas a R y T:',
          steps: [
            { title: 'Plantea las tres ondas', text: 'Izquierda: incidente más reflejada, $\\psi=e^{ikx}+B\\,e^{-ikx}$. Derecha: transmitida, $\\psi=F\\,e^{ikx}$. Fija la amplitud incidente a 1: el resultado no puede depender de la intensidad del haz.' },
            { title: 'Las dos condiciones de empalme', text: 'Continuidad: $1+B=F$. Salto de $\\psi\'$ en el origen: $ikF-ik(1-B)=-\\tfrac{2m\\alpha}{\\hbar^2}(1+B)$. Dos ecuaciones, dos incógnitas ($B$ y $F$).' },
            { title: 'Resuelve el sistema', text: 'Sustituye $F=1+B$ y define $\\beta\\equiv m\\alpha/\\hbar^2k$. Resolviendo: $B=\\tfrac{i\\beta}{1-i\\beta}$ y $F=\\tfrac{1}{1-i\\beta}$.' },
            { title: 'Lee R y T', text: 'Con el mismo $k$ a ambos lados del origen, $R=|B|^2$ y $T=|F|^2$:\n$$R=\\frac{\\beta^2}{1+\\beta^2},\\qquad T=\\frac{1}{1+\\beta^2}.$$' },
            { title: 'Comprueba R + T = 1', text: '$\\tfrac{\\beta^2}{1+\\beta^2}+\\tfrac{1}{1+\\beta^2}=1$. ✓ Si no te cuadra, el sospechoso habitual es el signo del término de salto.' },
          ],
        },
      },
      {
        id: 'pdel-6',
        kind: 'interpretacion',
        title: 'Por qué SOLO UN estado ligado',
        text: 'El delta no tiene ancho: no hay sitio para que la función de onda «ondule» dentro. Los niveles de un pozo se distinguen por sus nodos, y los nodos viven en el interior; el interior de un delta es un punto. Un solo sitio, un solo estado: el sin nodos.',
        application: {
          steps: [
            { title: 'Cuenta el espacio disponible', text: 'En un pozo de ancho $L$ caben oscilaciones; cada nivel añade un nodo. El delta tiene $L=0$: cero espacio para nodos, y por tanto solo sobrevive el fundamental (sin nodos).' },
            { title: 'Míralo desde el álgebra', text: 'La forma estaba completamente forzada: dos exponenciales + continuidad + salto. Las condiciones agotaron todas las incógnitas y quedó UN valor de $\\kappa$ — no había ningún parámetro libre con el que construir un segundo estado.' },
            { title: 'Contrasta con el pozo finito', text: 'En §2.6, cuanto más ancho y profundo el pozo, más medias-ondas caben y más niveles aparecen. El delta es el extremo de ancho nulo con área fija: el mínimo pozo posible, un solo nivel.' },
          ],
        },
      },
      {
        id: 'pdel-7',
        kind: 'interpretacion',
        title: 'El delta como límite: α es un área',
        text: 'Piensa en un pozo cuadrado de profundidad $V_0$ y ancho $2a$, y hazlo más estrecho y más profundo manteniendo el **área** $2aV_0=\\alpha$. En ese límite, una $\\psi$ suave no nota la forma del pozo: solo nota el impulso total $\\alpha$. Por eso $\\alpha$ mide el área bajo $V$, no «la profundidad».',
        application: {
          steps: [
            { title: '¿Qué significa α?', text: 'Unidades: $[\\alpha]=\\text{energía}\\times\\text{longitud}$. Es el área (con signo) encerrada por el potencial: el «empujón» integral que sufre la partícula al cruzar el origen.' },
            { title: 'La correspondencia cuantitativa', text: 'El estado ligado del delta cumple $\\kappa=m\\alpha/\\hbar^2$: depende SOLO del área. Un pozo cuadrado estrecho-y-profundo de área $\\alpha$ tiene un fundamental con esa misma $\\kappa$ (aproximadamente): la misma cola, el mismo nivel. Es el contenido del problema 2.30 del libro.' },
            { title: 'Úsalo como detector de errores', text: 'Si al tomar el límite de un potencial «espinoso» tu resultado depende de detalles de la forma y no solo del área cuando el ancho tiende a cero, algo va mal: en ese límite solo el área puede sobrevivir.' },
          ],
        },
      },
      {
        id: 'pdel-8',
        kind: 'interpretacion',
        title: 'El pozo atractivo TAMBIÉN refleja',
        text: 'Clásicamente, una partícula con $E>0$ que llega a un pozo lo atraviesa sin perder nada: no hay de qué rebotar. Cuánticamente $R>0$: el cambio brusco de potencial — aunque sea hacia abajo — genera reflexión parcial. Es el mismo fenómeno de una cuerda cuando cambia bruscamente su densidad: discontinuidad significa reflexión.',
        application: {
          steps: [
            { title: 'Cuantifica la reflexión', text: '$R=\\beta^2/(1+\\beta^2)$ con $\\beta=m\\alpha/\\hbar^2k$: nunca es exactamente cero para $\\alpha\\ne0$ — solo tiende a cero.' },
            { title: 'Cuándo transmite casi todo', text: '$T\\to1$ si $E$ es muy grande ($k\\to\\infty$, $\\beta\\to0$) o si $\\alpha$ es pequeño: las ondas rápidas apenas notan la espiga, y los pozos débiles apenas perturban.' },
            { title: 'Pozo vs. barrera', text: 'Cambia $-\\alpha\\delta$ por $+\\alpha\\delta$ y las probabilidades $R$ y $T$ son las mismas (dependen de $\\alpha^2$): una barrera muy fuerte refleja lo mismo que un pozo igual de intenso atrae — en cuanto a probabilidades.' },
            { title: 'Como respuesta de examen', text: '«¿Refleja un pozo atractivo a una partícula con E>0?» — Sí, parcialmente, salvo en el límite $E\\to\\infty$. Esa línea vale medio punto en muchos exámenes.' },
          ],
        },
      },
      {
        id: 'pdel-9',
        kind: 'verificacion',
        title: 'Comprobaciones de bolsillo',
        text: 'Antes de entregar: **unidades** de $\\kappa=m\\alpha/\\hbar^2$ (1/longitud ✓) y de $E=-m\\alpha^2/2\\hbar^2$ (energía ✓); el **límite** $\\alpha\\to0$ (el pozo desaparece, y con él el ligado; $R\\to0$ en dispersión); y por supuesto $R+T=1$ y $E<0$ para todo estado ligado.',
        application: {
          steps: [
            { title: 'Test del límite α → 0', text: 'Sin pozo no hay ligado: $E=-m\\alpha^2/2\\hbar^2\\to0^-$ y la longitud $\\hbar^2/m\\alpha\\to\\infty$ — la partícula se «desliga» hasta ocupar todo el eje. En dispersión, $\\beta\\to0$ implica $T\\to1$: partícula libre pura. ✓' },
            { title: 'Test de unidades', text: '$m\\alpha/\\hbar^2$ debe ser 1/longitud. Si no te sale, el sospechoso habitual es el factor $2m/\\hbar^2$ del salto (¿perdiste un 2 por el camino?).' },
            { title: 'Test de simetría y de signo', text: 'El pozo es par ⇒ la ligada es par ✓ (tu $e^{-\\kappa|x|}$ lo es). Y el estado ligado debe tener $E<0$ **siempre**: si te sale positivo, mezclaste regímenes.' },
            { title: 'Test de continuidad de ψ', text: 'Tu $\\psi$ no puede dar un salto en el origen. Dibújala: pico simétrico con cúspide. Si en $x=0$ ves dos valores distintos, el fallo está en la continuidad.' },
          ],
        },
      },
      {
        id: 'pdel-10',
        kind: 'reconocimiento',
        title: 'Conexión: el mismo empalme en todo el capítulo',
        text: 'La pareja «continuidad de $\\psi$ + condiciones sobre $\\psi\'$» no es del delta: es el idioma común del capítulo. En el pozo finito (§2.6) empalmas senos con exponenciales en DOS fronteras; en la matriz S (§2.7) ese mismo empalme se convierte en un objeto algebraico. Y el problema del doble delta (2.26) es este potencial dos veces.',
        application: {
          steps: [
            { title: 'De dónde viene', text: 'Pozo infinito (§2.2): continuidad de $\\psi$ en las paredes, con $\\psi=0$ forzado. Delta: continuidad de $\\psi$ + salto de $\\psi\'$. Son las dos únicas «monedas» de frontera que usa el capítulo.' },
            { title: 'Dónde lo volverás a usar', text: 'En el pozo finito: las mismas condiciones pero en $x=\\pm a$ y con funciones distintas a cada lado. Si el delta te sale fluido, el pozo finito es solo más contabilidad.' },
            { title: 'La extensión natural', text: 'Dos deltas separados (problema 2.26 del libro): empalma en cada uno y observa cómo el nivel único se parte en dos. Es el ensayo general de la matriz S de §2.7.' },
          ],
        },
      },
    ],
    examQuestions: [
      { id: 'pe-del-1', q: 'Deriva el único estado ligado del pozo $V(x)=-\\alpha\\delta(x)$: energía y autofunción normalizada, desde la EDE.', hintIndex: 3 },
      { id: 'pe-del-2', q: 'Demuestra la condición de salto $\\psi\'(0^+)-\\psi\'(0^-)=-\\tfrac{2m\\alpha}{\\hbar^2}\\psi(0)$ integrando la EDE en torno al origen.', hintIndex: 2 },
      { id: 'pe-del-3', q: 'Para una partícula con $E>0$ incidente desde la izquierda, obtén $R$ y $T$ del pozo delta y comprueba que $R+T=1$.', hintIndex: 4 },
      { id: 'pe-del-4', q: 'Explica por qué el pozo delta admite exactamente un estado ligado: argumento de nodos y conteo de incógnitas.', hintIndex: 5 },
      { id: 'pe-del-5', q: 'Muestra que el delta es el límite de un pozo cuadrado estrecho y profundo de área $\\alpha$ constante, e interpreta $\\alpha$.', hintIndex: 6 },
      { id: 'pe-del-6', q: 'Una partícula con $E>0$ cruza un pozo delta atractivo: ¿se refleja? ¿Y si $E\\to\\infty$? Contrasta con la predicción clásica.', hintIndex: 7 },
    ],
    commonMistakes: [
      'Suponer que $\\psi\'$ es continua en $x=0$: con el delta NO lo es — el salto $-\\tfrac{2m\\alpha}{\\hbar^2}\\psi(0)$ es la condición de frontera esencial.',
      'Perder el factor 2 del salto: $\\psi\'(0^+)=-\\kappa B$ y $\\psi\'(0^-)=+\\kappa A$ suman $-2\\kappa$; quedarte con $-\\kappa$ te da una energía equivocada por un factor 4.',
      'Confundir $\\alpha$ con «la profundidad»: $\\alpha$ es el **área** bajo $V$ (energía × longitud); la profundidad de un delta no es ningún número finito.',
      'Firmar mal $\\kappa$: solo existe con $E<0$. Si te encuentras usando $\\kappa=\\sqrt{-2mE}/\\hbar$ con $E>0$, estás en el régimen equivocado (ahí van ondas, $k=\\sqrt{2mE}/\\hbar$).',
      'Mezclar los regímenes: exponenciales decrecientes en un problema de dispersión, u ondas $e^{ikx}$ en la búsqueda del ligado — cada forma pertenece a su régimen.',
      'Esperar $R=0$ «porque el pozo es atractivo y $E>0$»: cuánticamente el delta refleja parcialmente ($R=\\beta^2/(1+\\beta^2)$) — ni reflexión total ni cero.',
    ],
    relatedProblemIds: ['bp-2-23', 'bp-2-24', 'bp-2-25', 'bp-2-26', 'bp-2-27', 'bp-2-46', 'bp-2-47'],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // §2.6 — Pozo cuadrado finito
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'pot-2-6',
    sectionId: '2.6',
    title: 'Pozo cuadrado finito',
    tagline: 'Paredes de altura finita: dos fronteras que empalmar, paridad y ecuaciones trascendentes — el examen real de los potenciales por tramos.',
    difficulty: 3,
    graphType: 'finite-well',
    vignette:
      'Es **el examen real** de los potenciales por tramos. En el pozo infinito las paredes hacían todo el trabajo ($\\psi=0$ en los bordes, y a correr); aquí ya no hay atajos: hay que **empalmar en DOS fronteras** ($x=\\pm a$), explotar la simetría, y aceptar que las energías no salen con fórmula cerrada — llegan como **ecuaciones trascendentes** que se resuelven gráfica o numéricamente. Si el enunciado habla de un pozo «de profundidad $V_0$» o pregunta «cuántos estados ligados hay», has caído aquí.\n\nY es el punto de encuentro del capítulo entero: regiones con soluciones distintas (senos dentro, exponenciales fuera — la dicotomía del delta), paridad (como en el pozo infinito simétrico), límites que conectan con §2.2 y §2.5, y de fondo, para $E>0$, la dispersión de §2.7. Si este potencial te sale fluido, el capítulo está dominado.',
    setup: [
      'El potencial: un fondo plano a $-V_0$ entre $\\pm a$, y paredes de altura finita.',
      '$$V(x)=\\begin{cases}-V_0, & |x|<a,\\\\[2pt] 0, & |x|\\ge a,\\end{cases}\\qquad V_0>0.$$',
      'El pozo mide $2a$ de **ancho** (de $-a$ a $a$) y $V_0$ de **profundidad**. El cero de energías está fuera del pozo, en $V=0$.',
      '**Estados ligados**: $-V_0<E<0$. El rango no es capricho: dentro, la energía cinética efectiva es $E+V_0>0$ (ondas); fuera, $V=0>E$ (decaimientos). Con $E>0$ no hay ligadura: es **dispersión**, el trasfondo de §2.7.',
      'La EDE es una sola; lo que cambia por regiones es el valor de $V$:',
      '$$-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2}+V(x)\\,\\psi=E\\,\\psi.$$',
      '**Simetría**: $V(-x)=V(x)$ — el potencial es par. Sus autofunciones se pueden elegir **par** o **impar**: cada familia se resuelve por separado y el trabajo se divide a la mitad.',
      '**Condiciones de frontera**: en $x=\\pm a$ el potencial es finito, así que $\\psi$ **y** $\\psi\'$ son continuas. Nada se anula solo: los empalmes hay que hacerlos a mano.',
    ],
    derivation: {
      intro:
        'La derivación completa de los estados ligados: regiones, paridad, empalmes, cambio de variables y lectura gráfica. Catorce pasos que en el examen son diez minutos si los has practicado.',
      steps: [
        {
          title: 'Divide el espacio en tres regiones',
          text: 'Regla de oro de los potenciales por tramos: una región por tramo de $V$. Aquí: **I** ($x<-a$, $V=0$), **II** ($|x|<a$, $V=-V_0$) y **III** ($x>a$, $V=0$). La solución general se escribe en cada una y luego se empalma.',
        },
        {
          title: 'Dentro: ondas; fuera: decaimientos',
          text: 'En II, con $E+V_0>0$:\n$$\\frac{d^2\\psi}{dx^2}=-k^2\\psi,\\qquad k\\equiv\\frac{\\sqrt{2m(E+V_0)}}{\\hbar}>0$$\n→ senos y cosenos. En I y III, con $E<0$:\n$$\\frac{d^2\\psi}{dx^2}=+\\kappa^2\\psi,\\qquad \\kappa\\equiv\\frac{\\sqrt{-2mE}}{\\hbar}>0$$\n→ exponenciales. La estructura de todo el problema está en esta dicotomía.',
        },
        {
          title: 'Fuera: solo las que decaen',
          text: 'La normalizabilidad prohíbe todo lo que crezca al alejarse. Convención que limpia los empalmes: desplaza los exponentes hasta la frontera,\n$$\\psi_{\\text{I}}=A\\,e^{\\kappa(x+a)}\\ \\ (x<-a),\\qquad \\psi_{\\text{III}}=F\\,e^{-\\kappa(x-a)}\\ \\ (x>a),$$\nde modo que en $x=-a$ y en $x=a$ valgan exactamente $A$ y $F$.',
        },
        {
          title: 'Paridad: divide el problema en dos',
          text: '$V$ es par, así que sus autofunciones se eligen par o impar (la pista 3 desarrolla el porqué). Cada familia trae su forma dentro: **par** → $\\psi_{\\text{II}}=B\\cos(kx)$ con colas simétricas; **impar** → $\\psi_{\\text{II}}=B\\sin(kx)$ con colas antisimétricas. Empalma en $x=a$ y la frontera $x=-a$ queda automática: mitad de ecuaciones.',
        },
        {
          title: 'Familia PAR en la frontera x = a',
          text: 'Dentro $\\psi_{\\text{II}}=B\\cos(kx)$; fuera $\\psi_{\\text{III}}=F\\,e^{-\\kappa(x-a)}$. Las dos condiciones de empalme:\n$$\\psi\\ \\text{continua}:\\quad B\\cos(ka)=F,\\qquad\\qquad \\psi\'\\ \\text{continua}:\\quad -Bk\\sin(ka)=-\\kappa F.$$',
        },
        {
          title: 'La condición trascendente PAR',
          text: 'Divide la segunda ecuación entre la primera: $B$ y $F$ se cancelan de golpe y queda una condición solo sobre la energía (vía $k$ y $\\kappa$):\n$$\\boxed{\\,k\\tan(ka)=\\kappa\\,}$$\nEs la ecuación de cuantización de los estados pares. No es despejable con álgebra — ya veremos cómo se resuelve.',
        },
        {
          title: 'La condición trascendente IMPAR',
          text: 'Repite el empalme con $\\psi_{\\text{II}}=B\\sin(kx)$ y la cola antisimétrica $\\psi_{\\text{III}}=-F\\,e^{-\\kappa(x-a)}$ (a la derecha entra con signo menos):\n$$B\\sin(ka)=-F,\\qquad Bk\\cos(ka)=\\kappa F\\quad\\Longrightarrow\\quad \\boxed{\\,-k\\cot(ka)=\\kappa\\,}$$',
        },
        {
          title: 'El cambio a variables z: geometría pura',
          text: 'Las condiciones mezclan $k$ y $\\kappa$, ambos funciones de $E$. Define\n$$z\\equiv ka,\\qquad z\'\\equiv\\kappa a,\\qquad z_0\\equiv\\frac{a}{\\hbar}\\sqrt{2mV_0}.$$\nSuma los cuadrados de las definiciones de $k$ y $\\kappa$: la $E$ se cancela y queda $k^2+\\kappa^2=2mV_0/\\hbar^2$, es decir\n$$z^2+z\'^2=z_0^2$$\n— un **círculo de radio $z_0$**. El pozo fija $z_0$; cada nivel ligado es un punto de ese círculo.',
        },
        {
          title: 'Las condiciones en forma z',
          text: 'Multiplica las trascendentes por $a$ y usa $z\'=\\sqrt{z_0^2-z^2}$:\n$$\\text{par}:\\;\\; z\\tan z=\\sqrt{z_0^2-z^2},\\qquad\\qquad \\text{impar}:\\;\\; -z\\cot z=\\sqrt{z_0^2-z^2}.$$\nAhora todo es función de $z$ con $z_0$ como único parámetro: una pareja de curvas por pozo.',
        },
        {
          title: 'No hay fórmula cerrada: solución gráfica',
          text: 'Estas ecuaciones no se despejan — y el examen **no espera** que lo hagas. El método: dibuja el lado izquierdo (las ramas de $z\\tan z$ y de $-z\\cot z$) y el derecho (el cuarto de círculo $\\sqrt{z_0^2-z^2}$) en el mismo plano, para $0<z<z_0$. **Cada intersección es un estado ligado.** Subiendo en energía, los niveles alternan par (familia $\\tan$) e impar (familia $\\cot$).',
        },
        {
          title: 'Conteo de estados ligados',
          text: 'Del gráfico salen dos hechos de examen. (i) **Siempre hay al menos uno**: la rama de $z\\tan z$ que nace en el origen arranca por debajo del círculo ($0<z_0$) y termina por encima (se dispara a infinito, o llega con $z\\tan z>0$ cuando el círculo ya murió en $z=z_0$): el corte es inevitable. (ii) El número total de niveles es aproximadamente\n$$N\\approx\\left\\lfloor\\frac{2z_0}{\\pi}\\right\\rfloor+1,$$\nuna estimación práctica (los estados justo al borde, $E\\to0^-$, cuentan según la convención).',
        },
        {
          title: 'Límite z₀ grande: regresa el pozo infinito',
          text: 'Con $V_0\\to\\infty$, $\\kappa\\to\\infty$: las colas se comprimen hasta desaparecer y las paredes se vuelven duras — $\\psi\\to0$ en $\\pm a$, como en §2.2. Las condiciones exigen $\\tan(ka)\\to\\infty$ y $\\cot(ka)\\to-\\infty$, o sea $ka\\to n\\pi/2$, y midiendo desde el fondo del pozo:\n$$E_n+V_0\\;\\approx\\;\\frac{n^2\\pi^2\\hbar^2}{2m(2a)^2},\\qquad n=1,2,3,\\dots$$\nCuidado: el ancho que aparece es $2a$, el ancho **real** de este pozo. Confundirlo con $a$ es el error clásico de este límite.',
        },
        {
          title: 'Límite z₀ pequeño: el pozo casi vacío',
          text: 'Si el pozo es débil o estrecho, solo sobrevive **el estado par más bajo**: en una dimensión, **cualquier pozo atractivo, por débil que sea, tiene al menos un estado ligado**. Su energía ronda $E\\to0^-$ y su cola es larguísima ($\\kappa$ pequeño ⇒ longitud $1/\\kappa$ enorme): la partícula pasa la mayor parte del tiempo «fuera» del pozo. Es el pariente del estado ligado del delta (§2.5).',
        },
        {
          title: 'Penetración: ψ no muere en la frontera',
          text: 'Fuera del pozo, $V=0>E$: región clásicamente prohibida. Clásica: probabilidad cero. Cuántica: $|\\psi|^2\\sim e^{-2\\kappa|x|}$ — una **cola exponencial** que penetra la pared con longitud de decrecimiento\n$$\\ell=\\frac{1}{\\kappa}=\\frac{\\hbar}{\\sqrt{-2mE}}.$$\nNivel profundo ⇒ cola corta; nivel al borde de ligarse ⇒ cola infinita. Este es el germen del efecto túnel.',
        },
      ],
    },
    keyResults: [
      { label: 'Condición PAR', latex: 'k\\tan(ka)=\\kappa', note: 'Familia cos(kx) dentro del pozo.' },
      { label: 'Condición IMPAR', latex: '-k\\cot(ka)=\\kappa', note: 'Familia sin(kx) dentro del pozo.' },
      { label: 'Onda y decaimiento', latex: 'k=\\frac{\\sqrt{2m(E+V_0)}}{\\hbar},\\qquad \\kappa=\\frac{\\sqrt{-2mE}}{\\hbar}', note: 'k real dentro (E > −V₀); κ real fuera (E < 0); con E > 0 sería dispersión (§2.7).' },
      { label: 'Fuerza del pozo', latex: 'z_0=\\frac{a}{\\hbar}\\sqrt{2mV_0},\\qquad z^2+z\'^2=z_0^2', note: 'z₀ ≈ ancho × profundidad: fija el número de niveles.' },
      { label: 'En variables z', latex: 'z\\tan z=\\sqrt{z_0^2-z^2}\\ \\text{(par)},\\qquad -z\\cot z=\\sqrt{z_0^2-z^2}\\ \\text{(impar)}', note: 'Las intersecciones de la gráfica son los niveles.' },
      { label: 'Conteo aproximado', latex: 'N\\approx\\left\\lfloor\\frac{2z_0}{\\pi}\\right\\rfloor+1', note: 'Siempre hay al menos uno (el par más bajo).' },
      { label: 'Límite de pozo infinito', latex: 'E_n+V_0\\approx\\frac{n^2\\pi^2\\hbar^2}{2m(2a)^2}', note: 'z₀ grande; el ancho del pozo es 2a, no a.' },
      { label: 'Penetración en la pared', latex: '\\ell=\\frac{1}{\\kappa}=\\frac{\\hbar}{\\sqrt{-2mE}}', note: 'La cola decae como e^{−κ(x−a)}: la partícula vive un poco «dentro de la pared».' },
    ],
    hints: [
      {
        id: 'pfin-1',
        kind: 'reconocimiento',
        title: '¿Qué problema tengo delante?',
        text: 'Señales del pozo finito: un pozo «de profundidad $V_0$» y semi-ancho $a$ (o ancho $2a$); energías en el rango $-V_0<E<0$; la pregunta «¿cuántos estados ligados hay?»; o una comparación con el pozo infinito. Es el potencial más completo del capítulo: se resuelve con todo el arsenal a la vez.',
        application: {
          intro: 'Checklist de reconocimiento antes de escribir nada:',
          steps: [
            { title: 'Identifica el montaje', text: '¿$V=-V_0$ en $|x|<a$ y $0$ fuera? Apunta $V_0$ (profundidad) y $a$ (semi-ancho): los dos números que controlan todo a través de $z_0$.' },
            { title: 'Verifica que te piden ligados', text: 'Estados ligados: $-V_0<E<0$ con $\\psi$ normalizable. Si el enunciado habla de $E>0$ y partículas incidentes, es dispersión (§2.7): otro problema, otras herramientas.' },
            { title: 'Anticipa el formato de la pregunta', text: 'Tres clásicos: (i) deriva las condiciones de cuantización; (ii) cuenta niveles para un $z_0$ dado; (iii) compara con el pozo infinito o con el delta. Las pistas siguen ese orden.' },
            { title: 'Reconoce las herramientas', text: 'Necesitarás: soluciones por regiones, paridad, empalmes de $\\psi$ y $\\psi\'$, el cambio a $z$ y lectura gráfica. Cada una ya apareció en §2.2 o §2.5 — aquí se usan todas juntas.' },
          ],
        },
      },
      {
        id: 'pfin-2',
        kind: 'planteamiento',
        title: 'El orden correcto de la solución',
        text: 'El error de principiante es escribir $\\psi$ en las tres regiones «y ya veremos». El orden que funciona: **regiones → tipo de solución en cada una → paridad → empalmes → cambio a z → gráfica**. Saltarte la paridad te duplica las ecuaciones; saltarte el cambio de variables te las deja ilegibles.',
        application: {
          intro: 'La checklist, en orden:',
          steps: [
            { title: 'Regiones', text: 'I ($x<-a$), II ($|x|<a$), III ($x>a$). En I y III: $V=0$ con $E<0$ ⇒ exponenciales. En II: $V=-V_0$ con $E+V_0>0$ ⇒ senos y cosenos.' },
            { title: 'Soluciones con el decaimiento ya integrado', text: 'Fuera, escribe directamente las que decaen: $e^{\\kappa(x+a)}$ a la izquierda y $e^{-\\kappa(x-a)}$ a la derecha (desplazadas a la frontera para empalmar limpio). Dentro, $\\cos(kx)$ y $\\sin(kx)$.' },
            { title: 'Paridad ANTES de empalmar', text: '$V$ par ⇒ elige par ($\\cos$) o impar ($\\sin$) dentro, con colas acordes. Empalma solo en $x=a$; $x=-a$ queda automático.' },
            { title: 'Empalmes', text: 'En $x=a$: $\\psi$ y $\\psi\'$ continuas. Dos ecuaciones; al dividirlas, las constantes desaparecen y quedan las condiciones trascendentes.' },
            { title: 'Cambio a z y gráfica', text: 'Pasa todo a $z=ka$ con el círculo $z^2+z\'^2=z_0^2$ y resuelve gráficamente: cada intersección, un nivel.' },
          ],
        },
      },
      {
        id: 'pfin-3',
        kind: 'planteamiento',
        title: 'Por qué la paridad ahorra la mitad del trabajo',
        text: 'Si $V(-x)=V(x)$ y $\\psi(x)$ resuelve la EDE con energía $E$, también la resuelve $\\psi(-x)$. En 1D los niveles ligados no están degenerados, así que ambas deben ser proporcionales: $\\psi(-x)=\\pm\\psi(x)$. Toda autofunción es **par o impar** — y entonces puedes buscar cada familia por separado.',
        application: {
          steps: [
            { title: 'El argumento en dos líneas', text: 'La EDE con $V$ par es idéntica si inviertes $x\\to-x$. Con la misma $E$ tienes dos soluciones, $\\psi(x)$ y $\\psi(-x)$; como en 1D no hay degeneración, $\\psi(-x)=\\pm\\psi(x)$. Par o impar: no hay tercera opción.' },
            { title: 'Las formas de cada familia', text: 'PAR: $\\cos(kx)$ dentro y colas simétricas fuera. IMPAR: $\\sin(kx)$ dentro y colas con signos opuestos. El fundamental es siempre PAR (sin nodos).' },
            { title: 'Lo que te ahorras', text: 'Sin paridad: 6 constantes y 4 ecuaciones de empalme (2 fronteras × 2 condiciones). Con paridad: 2 constantes y 2 ecuaciones por familia — y las comprobaciones se reducen a la mitad por simetría.' },
            { title: 'Si el pozo no está centrado', text: 'Recéntralo primero ($x\\to x-x_{\\text{centro}}$) antes de invocar paridad — o empalma las dos fronteras sin ella. El método no cambia; solo el trabajo.' },
          ],
        },
      },
      {
        id: 'pfin-4',
        kind: 'tecnica',
        title: 'El empalme en x = a sin errores',
        text: 'Es el mismo empalme del delta (§2.5), pero ahora a ambos lados de la frontera hay funciones no triviales. Para la familia par, en $x=a$ se enlazan $B\\cos(kx)$ con $F\\,e^{-\\kappa(x-a)}$. Las cuatro piezas que debes escribir, en orden:',
        application: {
          intro: 'Las cuatro piezas del empalme par:',
          steps: [
            { title: 'Escribe las dos funciones', text: '$\\psi_{\\text{II}}=B\\cos(kx)$ y $\\psi_{\\text{III}}=F\\,e^{-\\kappa(x-a)}$. El exponente desplazado hace que en $x=a$ valga exactamente $F$ — por eso se desplaza.' },
            { title: 'Continuidad de ψ', text: 'Evalúa ambos lados en $x=a$: $B\\cos(ka)=F$. Sin derivar todavía.' },
            { title: 'Deriva CADA función en SU región', text: '$\\psi_{\\text{II}}\'=-Bk\\sin(kx)$ y $\\psi_{\\text{III}}\'=-\\kappa F\\,e^{-\\kappa(x-a)}$. Evaluando en $x=a$: $-Bk\\sin(ka)=-\\kappa F$.' },
            { title: 'No pidas de más', text: 'Aquí NO se anula $\\psi$ ni $\\psi\'$ en la frontera (eso era el pozo infinito): solo continuidad. $\\psi\'(a)\\ne0$ en general — la cola tiene pendiente.' },
            { title: 'Checklist visual', text: 'Dibuja la unión: mismo valor, misma pendiente, curvatura distinta (cambia $V$). Si tu boceto muestra un «codo», violaste la continuidad de $\\psi\'$.' },
          ],
        },
      },
      {
        id: 'pfin-5',
        kind: 'tecnica',
        title: 'La división que elimina las constantes',
        text: 'Tienes dos ecuaciones ($B\\cos(ka)=F$ y $-Bk\\sin(ka)=-\\kappa F$) y tres incógnitas ($B$, $F$, $E$). La salida es **dividir**: las constantes se cancelan y queda una condición solo sobre la energía. La normalización ni se entera: ella solo fija amplitudes.',
        application: {
          steps: [
            { title: 'Divide la segunda entre la primera', text: '$\\tfrac{-Bk\\sin(ka)}{B\\cos(ka)}=\\tfrac{-\\kappa F}{F}$ ⇒ $k\\tan(ka)=\\kappa$. Adiós $B$ y $F$: la condición es solo de $E$.' },
            { title: 'Familia impar: el mismo movimiento', text: 'Con $\\sin$ dentro: $B\\sin(ka)=-F$ (la cola entra con signo menos) y $Bk\\cos(ka)=\\kappa F$. Divide: $k\\cot(ka)=-\\kappa$, es decir, $-k\\cot(ka)=\\kappa$.' },
            { title: 'Por qué NO son despejables', text: '$k=\\sqrt{2m(E+V_0)}/\\hbar$ y $\\kappa=\\sqrt{-2mE}/\\hbar$ son ambas funciones de $E$: la ecuación mezcla la tangente de una función de $E$ con raíces de otra. **Trascendente**: no hay fórmula cerrada. No insistas en despejar: cambia de variables.' },
            { title: 'Filtro de raíces fantasma', text: 'Con $\\kappa>0$: la condición par exige $\\tan(ka)>0$; la impar, $\\cot(ka)<0$. Úsalo para descartar soluciones numéricas imposibles.' },
          ],
        },
      },
      {
        id: 'pfin-6',
        kind: 'tecnica',
        title: 'El cambio a z, z′ y z₀',
        text: 'El truco que vuelve legible el problema: mide las energías en ángulos. Con $z=ka$, $z\'=\\kappa a$ y el número puro $z_0=\\tfrac{a}{\\hbar}\\sqrt{2mV_0}$, la relación entre $k$ y $\\kappa$ se vuelve **geometría**: $z^2+z\'^2=z_0^2$, un círculo. Los niveles ligados son puntos de ese círculo.',
        application: {
          steps: [
            { title: 'Suma los cuadrados', text: 'De las definiciones: $k^2=\\tfrac{2m(E+V_0)}{\\hbar^2}$ y $\\kappa^2=\\tfrac{-2mE}{\\hbar^2}$. Suma: $k^2+\\kappa^2=\\tfrac{2mV_0}{\\hbar^2}$ — la $E$ se cancela y queda un dato puro del pozo.' },
            { title: 'Multiplica por a²', text: '$z^2+z\'^2=z_0^2$: cada nivel es un punto del círculo de radio $z_0$. Al subir la energía, $z$ crece y $z\'$ mengua: del fondo del pozo (todo onda) hasta el borde (cola infinita, $E\\to0^-$).' },
            { title: 'Qué mide z₀ físicamente', text: '$z_0$ es aproximadamente (ancho)×(momento)/$\\hbar$: cuántas longitudes de onda «caben» en el pozo. Ancho+profundo ⇒ $z_0$ grande ⇒ muchos niveles; estrecho+débil ⇒ $z_0$ pequeño ⇒ uno o dos.' },
            { title: 'Reescribe las condiciones', text: 'Multiplicadas por $a$: $z\\tan z=\\sqrt{z_0^2-z^2}$ (par) y $-z\\cot z=\\sqrt{z_0^2-z^2}$ (impar). Todo queda como función de $z$ con $z_0$ de único parámetro: un solo gráfico por pozo.' },
          ],
        },
      },
      {
        id: 'pfin-7',
        kind: 'tecnica',
        title: 'Resolver la trascendente gráficamente',
        text: 'Como no hay fórmula cerrada, el examen espera el **método gráfico**: dibuja el lado izquierdo (las curvas de $z\\tan z$ y $-z\\cot z$) y el derecho (el cuarto de círculo $\\sqrt{z_0^2-z^2}$) en el mismo plano, para $0<z<z_0$. Las intersecciones son los niveles, alternando par (familia $\\tan$) e impar (familia $\\cot$).',
        application: {
          intro: 'Cómo dibujar cada lado y contar lo que importa:',
          steps: [
            { title: 'Dibuja el lado derecho', text: 'Un cuarto de círculo de radio $z_0$: arranca en $(0,z_0)$ y baja hasta $(z_0,0)$. Todo corte tiene que ocurrir debajo de $z_0$ — la raíz vive ahí.' },
            { title: 'Dibuja z·tan z por ramas', text: 'En cada intervalo $(n\\pi,\\;n\\pi+\\tfrac{\\pi}{2})$ la rama sube de $0$ a $+\\infty$. La primera, que nace en el origen, siempre corta al círculo: es el estado fundamental, par.' },
            { title: 'Dibuja −z·cot z por ramas', text: 'En cada intervalo $(n\\pi+\\tfrac{\\pi}{2},\\;(n+1)\\pi)$ sube de $0$ a $+\\infty$; en la primera media-rama $(0,\\tfrac{\\pi}{2})$ es negativa y no corta nada — por eso el fundamental es par.' },
            { title: 'Cuenta intersecciones', text: 'Recorre $z$ de $0$ a $z_0$: cada corte de cualquier rama con el círculo es un nivel, alternando par/impar. El nivel más alto es el corte más cercano a $z_0$ (cola larga, $E\\to0^-$).' },
            { title: 'Si piden un valor numérico', text: 'Elige $z_0$, localiza la rama y itera (bisección entre el arranque y la asíntota de la rama). Dos decimales bastan; no pierdas media hora en el tercero.' },
          ],
        },
      },
      {
        id: 'pfin-8',
        kind: 'interpretacion',
        title: 'Conteo de niveles y el «siempre hay uno»',
        text: 'Dos hechos que caen en examen: (i) el número de niveles crece con $z_0$ — aproximadamente $\\lfloor 2z_0/\\pi\\rfloor+1$; (ii) **siempre hay al menos uno**, por débil que sea el pozo (en 1D). El (ii) es exclusivo de una dimensión; el (i) sale de contar cortes en el gráfico.',
        application: {
          steps: [
            { title: 'Conteo rápido para un z₀ dado', text: 'Divide $2z_0$ entre $\\pi$, redondea por abajo y suma 1. Ejemplo: $z_0=8$ ⇒ $\\lfloor 16/\\pi\\rfloor+1=\\lfloor 5.09\\rfloor+1=6$ niveles: alternando desde el fundamental (par), 3 pares y 3 impares.' },
            { title: 'Por qué siempre hay al menos uno', text: 'Geometría del gráfico: cerca de $z=0$ la rama de $z\\tan z$ vale $0$ y el círculo vale $z_0>0$ (rama por debajo); cerca de $z=z_0$ el círculo muere en $0$ y la rama es positiva (rama por encima). Continuas ambas ⇒ al menos un corte, siempre.' },
            { title: 'Por qué es cosa de 1D', text: 'En 2D y 3D un pozo demasiado débil NO liga: el coste cinético de confinar gana. En 1D el balance siempre se puede inclinar hacia ligar — por eso «cualquier pozo 1D tiene un estado ligado» es frase de examen.' },
            { title: 'Contrasta con el pozo infinito', text: 'Allí los niveles eran infinitos (paredes perfectas). Aquí son finitos: cada nivel tiene que «pagar» su cola exponencial, y solo $z_0$ decide cuántos pueden pagarlo.' },
          ],
        },
      },
      {
        id: 'pfin-9',
        kind: 'interpretacion',
        title: 'Los dos límites: pozo infinito y pozo casi vacío',
        text: 'El pozo finito **contiene** a los otros potenciales: con $z_0$ grande tiende al pozo infinito (§2.2); con $z_0$ pequeño se queda en «un estado apenas ligado», pariente del delta (§2.5). Saber navegar entre límites es media pregunta de examen («compare con…»).',
        application: {
          steps: [
            { title: 'z₀ grande → pozo infinito', text: 'Las condiciones exigen $\\tan(ka)\\to\\infty$ y $\\cot(ka)\\to-\\infty$, o sea $ka\\to n\\pi/2$: dentro quedan las formas de la caja de ancho $2a$, y $E_n+V_0\\to\\tfrac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$. Las colas ($1/\\kappa$) se comprimen hasta desaparecer: $\\psi\\to0$ en la frontera, como debe ser.' },
            { title: 'La trampa del ancho', text: 'El pozo $|x|<a$ mide $2a$ de ancho. Al comparar con la caja de §2.2, no metas $a$ donde va $2a$: es el error nº 1 de este límite.' },
            { title: 'z₀ pequeño → un estado apenas ligado', text: 'Solo sobrevive el fundamental: $E\\to0^-$ y la cola $1/\\kappa\\to\\infty$ — la partícula pasa casi todo el tiempo fuera del pozo. Es el mismo espíritu del estado ligado del delta.' },
            { title: 'Comparación de energías en el caso general', text: 'Para el MISMO ancho $2a$, el nivel $n$ del pozo finito cumple $E_n+V_0<\\tfrac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$: las colas «ensanchan» la caja efectiva ⇒ menos confinamiento ⇒ energías más bajas. Es la comparación cualitativa favorita de examen.' },
          ],
        },
      },
      {
        id: 'pfin-10',
        kind: 'interpretacion',
        title: 'Colas: la partícula entra en la pared',
        text: 'Fuera del pozo, $V>E$: región clásicamente prohibida. La clásica dice «imposible»; la cuántica dice «poco probable pero no cero»: $|\\psi|^2\\sim e^{-2\\kappa|x|}$. La **longitud de penetración** $1/\\kappa$ mide cuánto entra la partícula en la pared.',
        application: {
          steps: [
            { title: 'Cuantifica la cola', text: 'Para $x>a$: $|\\psi|^2\\propto e^{-2\\kappa(x-a)}$. Nivel profundo ⇒ $|E|$ grande ⇒ $\\kappa$ grande ⇒ cola corta. Nivel cercano a $0$ ⇒ cola larguísima.' },
            { title: 'Contraste con el pozo infinito', text: 'Allí $\\psi$ moría exactamente en la pared ($V=\\infty$: prohibición perfecta). Aquí la pared es «blanda» y la función se cuela. La diferencia física entre ambos pozos ES la cola.' },
            { title: 'Consecuencia en las energías', text: 'La cola da «espacio extra» a la partícula: la caja efectiva es más ancha que $2a$ ⇒ energías (desde el fondo) más bajas que las del pozo infinito. Ya lo viste en el límite; vale para todo $z_0$.' },
            { title: 'Puente al efecto túnel', text: 'La misma cola, contra una barrera de ancho finito, la atraviesa de lado a lado: es el efecto túnel (lo ejercita el problema 2.32 del libro). El pozo finito te enseña la mitad del fenómeno: entrar donde está prohibido.' },
          ],
        },
      },
      {
        id: 'pfin-11',
        kind: 'verificacion',
        title: 'Comprobaciones de bolsillo',
        text: 'Antes de entregar: rango $-V_0<E<0$ (un «nivel» fuera de rango es falso); $z_0$ adimensional; el boceto de $\\psi$ continuo y sin codos en $\\pm a$; y nodos: el nivel $n$ tiene $n-1$ nodos **contando solo el interior** (las colas no cuentan).',
        application: {
          steps: [
            { title: 'Test de rangos', text: 'Cada nivel: $-V_0<E_n<0$ ⇒ $k$ real dentro ($E+V_0>0$) y $\\kappa$ real fuera ($-E>0$). Si un «nivel» te cae con $E>0$, es dispersión; si con $E<-V_0$, tu $k$ es imaginario: te fuiste de rango.' },
            { title: 'Test de dimensiones', text: '$z_0=a\\sqrt{2mV_0}/\\hbar$ es adimensional (longitud × momento / acción ✓); $1/\\kappa$ tiene unidades de longitud. Si no, revisa las definiciones de $k$ y $\\kappa$ — son el error más repetido.' },
            { title: 'Test del boceto', text: 'Dibuja $\\psi_n$: seno o coseno dentro con $n-1$ nodos internos, colas suaves que arrancan del valor de la frontera SIN codo (continuidad de $\\psi\'$) y mueren asintóticamente. Paridad correcta respecto al centro.' },
            { title: 'Test de límites', text: 'Con $z_0$ grande debe emerger el pozo infinito (ancho $2a$); con $z_0$ pequeño, un único nivel con cola enorme. Si tu familia de soluciones no reproduce ambos extremos, hay un signo torcido en las trascendentes.' },
          ],
        },
      },
    ],
    examQuestions: [
      { id: 'pe-fin-1', q: 'Deriva la condición de cuantización de los estados pares del pozo finito: desde las soluciones por regiones hasta $k\\tan(ka)=\\kappa$.', hintIndex: 3 },
      { id: 'pe-fin-2', q: 'Justifica que las autofunciones de un potencial par pueden elegirse par o impar, y explica cuánto trabajo te ahorra en el pozo finito.', hintIndex: 2 },
      { id: 'pe-fin-3', q: 'Repite el empalme para la familia impar y obtén la condición $-k\\cot(ka)=\\kappa$.', hintIndex: 4 },
      { id: 'pe-fin-4', q: 'Con $z_0=8$, estima cuántos estados ligados hay y clasifícalos por paridad, explicando el método gráfico que usaste.', hintIndex: 6 },
      { id: 'pe-fin-5', q: 'Demuestra que cualquier pozo atractivo unidimensional, por débil que sea, tiene al menos un estado ligado.', hintIndex: 7 },
      { id: 'pe-fin-6', q: 'En el límite $V_0\\to\\infty$, recupera $E_n+V_0\\approx\\tfrac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$ y explica por qué el ancho que aparece es $2a$.', hintIndex: 8 },
      { id: 'pe-fin-7', q: 'Boceta $\\psi_1$ y $\\psi_2$ del pozo finito: nodos, colas exponenciales y continuidad de $\\psi$ y $\\psi\'$ en $x=\\pm a$.', hintIndex: 9 },
    ],
    commonMistakes: [
      'Firmar mal las energías: ligado exige $-V_0<E<0$ — dentro $E+V_0>0$ (para que $k$ sea real) y fuera $E<0$ (para que $\\kappa$ lo sea). Un signo torcido rompe las DOS regiones.',
      'Comparar con el pozo infinito usando ancho $a$: el pozo finito $|x|<a$ mide $2a$; en el límite profundo, $E_n+V_0\\approx\\tfrac{n^2\\pi^2\\hbar^2}{2m(2a)^2}$.',
      'Exigir $\\psi=0$ o $\\psi\'=0$ en $x=\\pm a$: eso era el pozo **infinito**; con $V$ finito, $\\psi$ y $\\psi\'$ son simplemente continuas — la cola no es cero.',
      'Resolver solo la familia par y declarar terminado: los impares ($-k\\cot(ka)=\\kappa$) aportan (casi) la mitad de los niveles.',
      'Contar mal los niveles: olvidar el «+1» del conteo, o contar intersecciones de ramas fuera de $(0,z_0)$ — una raíz solo existe si $z<z_0$.',
      'Confundir $k$ y $\\kappa$: $k$ es la onda del INTERIOR ($E+V_0$); $\\kappa$, el decaimiento del EXTERIOR ($-E$). Intercambiarlos cruza las regiones.',
    ],
    relatedProblemIds: ['bp-2-28', 'bp-2-29', 'bp-2-30', 'bp-2-31', 'bp-2-32', 'bp-2-33', 'bp-2-41', 'bp-2-44'],
  },
]
