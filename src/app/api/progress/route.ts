import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/progress?studentId=... — fetch aggregated progress for the dashboard
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const studentId = searchParams.get('studentId')
    if (!studentId) return NextResponse.json({ error: 'studentId required' }, { status: 400 })

    let student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) {
      student = await db.student.create({ data: { id: studentId } })
    }

    const [conceptProgress, attempts, exams, trainings] = await Promise.all([
      db.conceptProgress.findMany({ where: { studentId } }),
      db.exerciseAttempt.findMany({ where: { studentId }, orderBy: { createdAt: 'desc' }, take: 50 }),
      db.examResult.findMany({ where: { studentId }, orderBy: { finishedAt: 'desc' }, take: 20 }),
      db.trainingSession.findMany({ where: { studentId }, orderBy: { startedAt: 'desc' }, take: 20 }),
    ])

    const totalAttempts = attempts.length
    const totalCorrect = attempts.filter(a => a.correct).length
    const totalErrors = totalAttempts - totalCorrect

    const cp = conceptProgress.map(p => ({
      conceptId: p.conceptId,
      mastery: p.mastery,
      correctCount: p.correctCount,
      errorsCount: p.errorsCount,
      errorBreakdown: JSON.parse(p.errorBreakdown || '{}') as Record<string, number>,
    }))

    const recent = attempts.slice(0, 20).map(a => ({
      exerciseId: a.exerciseId,
      sectionId: a.sectionId,
      correct: a.correct,
      errorType: a.errorType,
      createdAt: a.createdAt.toISOString(),
    }))

    return NextResponse.json({
      conceptProgress: cp,
      recentAttempts: recent,
      exams: exams.map(e => ({
        id: e.id, title: e.title, totalQuestions: e.totalQuestions,
        correctCount: e.correctCount, finishedAt: e.finishedAt.toISOString(),
      })),
      trainings: trainings.map(t => ({
        id: t.id, mode: t.mode, problemsDone: t.problemsDone, correctCount: t.correctCount,
      })),
      totalAttempts, totalCorrect, totalErrors,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
