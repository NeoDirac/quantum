'use client'

import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'

export interface SessionSummaryData {
  title: string
  sessionType: string  // "Examen" | "Entrenamiento" | "Repaso SM-2" | "Cram"
  date: string
  stats: { label: string; value: string }[]
  details?: { label: string; value: string }[]
  conceptGaps?: { concept: string; count: number }[]
  notes?: string
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function exportSessionSummary(data: SessionSummaryData) {
  const statsHtml = data.stats.map(s =>
    `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee">
      <span style="color:#666">${escapeHtml(s.label)}</span>
      <strong>${escapeHtml(s.value)}</strong>
    </div>`
  ).join('')
  const detailsHtml = data.details && data.details.length > 0
    ? `<h3 style="margin-top:16px;color:#555">Detalles</h3>
       ${data.details.map(d => `<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:13px"><span>${escapeHtml(d.label)}</span><span>${escapeHtml(d.value)}</span></div>`).join('')}`
    : ''
  const gapsHtml = data.conceptGaps && data.conceptGaps.length > 0
    ? `<div style="margin-top:16px;padding:12px;background:#fef2f2;border-radius:6px">
        <h3 style="color:#dc2626;margin:0 0 8px">Conceptos a reforzar</h3>
        ${data.conceptGaps.map(g => `<div style="display:flex;justify-content:space-between;padding:2px 0;font-size:13px"><span>${escapeHtml(g.concept)}</span><span style="color:#dc2626;font-weight:600">${g.count} error${g.count > 1 ? 'es' : ''}</span></div>`).join('')}
      </div>`
    : ''
  const notesHtml = data.notes ? `<div style="margin-top:16px;padding:12px;background:#f0f9ff;border-radius:6px;font-size:13px">${escapeHtml(data.notes)}</div>` : ''

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>${escapeHtml(data.title)}</title>
    <style>
      body{font-family:Georgia,serif;max-width:680px;margin:32px auto;padding:0 16px;line-height:1.6;color:#222}
      h1{color:#0f766e;border-bottom:3px solid #0f766e;padding-bottom:8px;margin-bottom:4px}
      .meta{color:#888;font-size:12px;margin-bottom:20px}
      .badge{display:inline-block;background:#0f766e;color:#fff;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:600}
      @media print{body{margin:0}}
    </style></head>
    <body>
      <div class="meta"><span class="badge">${escapeHtml(data.sessionType)}</span> ${escapeHtml(data.date)}</div>
      <h1>${escapeHtml(data.title)}</h1>
      ${statsHtml}
      ${detailsHtml}
      ${gapsHtml}
      ${notesHtml}
      <div style="margin-top:24px;padding-top:12px;border-top:1px solid #eee;font-size:11px;color:#999">
        Generado por la Plataforma de Mecánica Cuántica · Griffiths Cap. 2
      </div>
    </body></html>`
  const w = window.open('', '_blank')
  if (w) {
    w.document.write(html)
    w.document.close()
    setTimeout(() => w.print(), 400)
  }
}

export function SessionSummaryExportButton({ data }: { data: SessionSummaryData }) {
  return (
    <Button variant="outline" size="sm" onClick={() => exportSessionSummary(data)}>
      <Printer className="mr-1.5 h-3.5 w-3.5" /> Exportar / imprimir resumen
    </Button>
  )
}
