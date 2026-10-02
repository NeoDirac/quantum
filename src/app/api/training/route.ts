import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/training — record a training session
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { studentId, mode, targetSeconds, targetCount, problemsDone, correctCount, conceptsTouched, startedAt, finishedAt } = body
    if (!studentId) return NextResponse.json({ error: 'studentId required' }, { status: 400 })
    let student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) student = await db.student.create({ data: { id: studentId } })
    const t = await db.trainingSession.create({
      data: {
        studentId, mode: mode ?? 'timed-30',
        targetSeconds: targetSeconds ?? null, targetCount: targetCount ?? null,
        problemsDone: problemsDone ?? 0, correctCount: correctCount ?? 0,
        conceptsTouched: JSON.stringify(conceptsTouched ?? []),
        startedAt: startedAt ? new Date(startedAt) : new Date(),
        finishedAt: finishedAt ? new Date(finishedAt) : new Date(),
      },
    })
    return NextResponse.json({ ok: true, id: t.id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
