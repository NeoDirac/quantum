import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/exam — record a finished exam
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { studentId, title, totalQuestions, correctCount, conceptGaps, sectionBreakdown, questionLog, startedAt, finishedAt } = body
    if (!studentId) return NextResponse.json({ error: 'studentId required' }, { status: 400 })
    let student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) student = await db.student.create({ data: { id: studentId } })
    const ex = await db.examResult.create({
      data: {
        studentId, title: title ?? 'Examen',
        totalQuestions: totalQuestions ?? 0, correctCount: correctCount ?? 0,
        conceptGaps: JSON.stringify(conceptGaps ?? {}),
        sectionBreakdown: JSON.stringify(sectionBreakdown ?? {}),
        questionLog: JSON.stringify(questionLog ?? []),
        startedAt: startedAt ? new Date(startedAt) : new Date(),
        finishedAt: finishedAt ? new Date(finishedAt) : new Date(),
      },
    })
    // bump concept mastery downward for concepts with errors (gap reinforcement)
    const gaps: Record<string, number> = conceptGaps ?? {}
    for (const [conceptId, n] of Object.entries(gaps)) {
      let row = await db.conceptProgress.findUnique({ where: { studentId_conceptId: { studentId, conceptId } } })
      if (!row) row = await db.conceptProgress.create({ data: { studentId, conceptId } })
      const breakdown: Record<string, number> = JSON.parse(row.errorBreakdown || '{}')
      breakdown['conceptual'] = (breakdown['conceptual'] || 0) + (n as number)
      const errorsCount = row.errorsCount + (n as number)
      const total = row.correctCount + errorsCount
      const ratio = total > 0 ? row.correctCount / total : 0
      const mastery = Math.max(0, Math.min(100, Math.round(ratio * 100)))
      await db.conceptProgress.update({
        where: { id: row.id },
        data: { errorsCount, errorBreakdown: JSON.stringify(breakdown), mastery },
      })
    }
    return NextResponse.json({ ok: true, id: ex.id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
