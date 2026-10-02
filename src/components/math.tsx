'use client'

import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export function M({ children }: { children: string }) {
  return <InlineMath math={children} />
}

export function MB({ children }: { children: string }) {
  return (
    <div className="my-2 overflow-x-auto">
      <BlockMath math={children} />
    </div>
  )
}
