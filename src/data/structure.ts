import type { Chapter, Section } from '@/lib/content-types'

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'La función de onda',
    subtitle: 'Ecuación de Schrödinger, interpretación estadística, normalización, momento, incertidumbre',
    active: false,
  },
  {
    id: 'ch2',
    number: 2,
    title: 'La ecuación de Schrödinger independiente del tiempo',
    subtitle: 'Estados estacionarios, pozos, oscilador armónico, partícula libre, dispersión',
    active: true,
  },
]

export const SECTIONS: Section[] = [
  {
    id: '2.1',
    chapterId: 'ch2',
    title: 'Estados estacionarios',
    subtitle: 'Separación de variables, ecuación de Schrödinger independiente del tiempo, significado físico',
    order: 1,
    summary: [
      { kind: 'p', text: 'Cuando el potencial V no depende del tiempo, la ecuación de Schrödinger se separa en una parte espacial y una parte temporal. Las soluciones separables son los estados estacionarios: su densidad de probabilidad no cambia con el tiempo.' },
      { kind: 'p', text: 'La parte espacial satisface la ecuación de Schrödinger independiente del tiempo, una ecuación de valores propios (eigenvalues) del Hamiltoniano. La energía E es el valor propio.' },
    ],
  },
  {
    id: '2.2',
    chapterId: 'ch2',
    title: 'El pozo cuadrado infinito',
    subtitle: 'Cuantización de la energía, condiciones de frontera, estados ligados',
    order: 2,
    summary: [
      { kind: 'p', text: 'El primer problema exacto resuelto: una partícula confinada a una región con V = 0 dentro y V = ∞ fuera. Las condiciones de frontera imponen ψ = 0 en los extremos, lo que cuantiza la energía.' },
      { kind: 'p', text: 'Aquí aparece por primera vez la idea de que no toda energía es posible: solo una familia discreta E_n, cada una con su función ψ_n.' },
    ],
  },
  {
    id: '2.3',
    chapterId: 'ch2',
    title: 'El oscilador armónico',
    subtitle: 'Método algebraico (operadores de escalada), método analítico (Hermite)',
    order: 3,
    summary: [
      { kind: 'p', text: 'El potencial V = ½mω²x² es el modelo más importante de la física. Se resuelve de dos formas: el método analítico (serie de potencias, polinomios de Hermite) y el método algebraico (operadores a, a†).' },
      { kind: 'p', text: 'El método algebraico es una herramienta nueva: sustituye el resolver una EDO por manipular operadores que suben y bajan los estados de energía. Aparece el estado fundamental de energía ½ℏω.' },
    ],
  },
  {
    id: '2.4',
    chapterId: 'ch2',
    title: 'La partícula libre',
    subtitle: 'Soluciones oscilatorias, no normalizables, paquetes de onda, superposición',
    order: 4,
    summary: [
      { kind: 'p', text: 'Con V = 0 en todo el espacio no hay confinamiento y no hay estados ligados normalizables. Cada energía positiva es permitida, pero las ondas planas no son normalizables.' },
      { kind: 'p', text: 'La partícula libre física es un paquete de onda: superposición de estados estacionarios. Aparece la integral de Fourier como herramienta para construir y descomponer paquetes.' },
    ],
  },
  {
    id: '2.5',
    chapterId: 'ch2',
    title: 'El potencial delta',
    subtitle: 'Pozo y barrera delta, dispersión, un estado ligado para el pozo',
    order: 5,
    summary: [
      { kind: 'p', text: 'V(x) = -αδ(x) (pozo) o +αδ(x) (barrera). Es el problema de dispersión más simple: una sola condición de continuidad más un salto en la derivada. El pozo admite exactamente un estado ligado.' },
    ],
  },
  {
    id: '2.6',
    chapterId: 'ch2',
    title: 'El pozo cuadrado finito',
    subtitle: 'Estados ligados con dispersión, ecuación trascendental, paridad',
    order: 6,
    summary: [
      { kind: 'p', text: 'V = 0 dentro de |x| < a, V = V₀ fuera. La frontera es finita: la función de onda penetra la región prohibida decaiendo exponencialmente. No todas las energías son permitidas; aparecen por una condición de empate en la frontera.' },
      { kind: 'p', text: 'La paridad del potencial (simetría) permite clasificar las soluciones en pares e impares, simplificando el cálculo.' },
    ],
  },
  {
    id: '2.7',
    chapterId: 'ch2',
    title: 'La matriz de dispersión',
    subtitle: 'Dispersión genérica desde la izquierda/derecha, simetría, matriz S',
    order: 7,
    summary: [
      { kind: 'p', text: 'Un marco compacto para problemas de dispersión unidimensionales: en lugar de resolver cada caso, se encapsulan los coeficientes de transmisión y reflexión en una matriz 2×2. La unidad y la simetría temporal imponen restricciones potentes.' },
    ],
  },
]

export function getActiveChapter() {
  return CHAPTERS.find(c => c.active) ?? CHAPTERS[1]
}
export function getSectionsForChapter(chapterId: string) {
  return SECTIONS.filter(s => s.chapterId === chapterId).sort((a, b) => a.order - b.order)
}
