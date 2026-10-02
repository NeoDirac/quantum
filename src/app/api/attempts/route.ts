import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import type { ErrorType } from '@/lib/content-types'

// POST /api/attempts — record a single exercise attempt
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { studentId, exerciseId, sectionId, conceptId, correct, errorType, hintsUsed, solutionRevealed, timeSpentMs } = body
    if (!studentId || !exerciseId) {
      return NextResponse.json({ error: 'studentId and exerciseId are required' }, { status: 400 })
    }
    // ensure student exists
    let student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) {
      student = await db.student.create({ data: { id: studentId } })
    }
    // record attempt
    await db.exerciseAttempt.create({
      data: {
        studentId, exerciseId, sectionId: sectionId ?? '', conceptId: conceptId ?? null,
        correct: !!correct, errorType: errorType ?? null,
        hintsUsed: hintsUsed ?? 0, solutionRevealed: !!solutionRevealed,
        timeSpentMs: timeSpentMs ?? 0,
      },
    })
    // update concept progress (for the primary concept tested)
    if (conceptId) {
      await updateConceptProgress(studentId, conceptId, !!correct, errorType as ErrorType | null)
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

async function updateConceptProgress(studentId: string, conceptId: string, correct: boolean, errorType: ErrorType | null) {
  let row = await db.conceptProgress.findUnique({ where: { studentId_conceptId: { studentId, conceptId } } })
  if (!row) {
    row = await db.conceptProgress.create({ data: { studentId, conceptId } })
  }
  const breakdown: Record<string, number> = JSON.parse(row.errorBreakdown || '{}')
  if (!correct && errorType) {
    breakdown[errorType] = (breakdown[errorType] || 0) + 1
  }
  const correctCount = row.correctCount + (correct ? 1 : 0)
  const errorsCount = row.errorsCount + (correct ? 0 : 1)
  const total = correctCount + errorsCount
  // simple mastery model: correctRatio*100, weighted by total (caps at 100)
  const ratio = total > 0 ? correctCount / total : 0
  const mastery = Math.min(100, Math.round(ratio * 100))
  await db.conceptProgress.update({
    where: { id: row.id },
    data: { correctCount, errorsCount, errorBreakdown: JSON.stringify(breakdown), mastery, lastSeenAt: new Date() },
  })
}
