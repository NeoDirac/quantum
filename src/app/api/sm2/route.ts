import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// SM-2 spaced repetition algorithm.
// Quality q in {0..5}: 0-2 wrong (reset reps, due tomorrow), 3 hard, 4 good, 5 easy.
// Ease factor updated as: ease += (0.1 - (5-q)*(0.08+(5-q)*0.02)), clamped to [1.3, ∞).

// GET /api/sm2?studentId=...
//   Returns: { dueCards: [...], totalCards, reviewedToday, upcoming: [{date,count}] }
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const studentId = searchParams.get('studentId')
    if (!studentId) return NextResponse.json({ error: 'studentId required' }, { status: 400 })
    let student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) student = await db.student.create({ data: { id: studentId } })

    const now = new Date()
    const dueCards = await db.sM2Card.findMany({
      where: { studentId, dueAt: { lte: now }, suspended: false },
      orderBy: { dueAt: 'asc' },
    })
    const totalCards = await db.sM2Card.count({ where: { studentId, suspended: false } })
    const suspendedCount = await db.sM2Card.count({ where: { studentId, suspended: true } })
    const reviewedToday = await db.sM2Card.count({
      where: { studentId, lastReviewAt: { gte: startOfDay(now) } },
    })
    // upcoming: count of cards due in next 7 days (by day)
    const upcoming: { date: string; count: number }[] = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(now)
      d.setDate(d.getDate() + i)
      const dayStart = startOfDay(d)
      const dayEnd = new Date(dayStart)
      dayEnd.setDate(dayEnd.getDate() + 1)
      const count = await db.sM2Card.count({
        where: { studentId, dueAt: { gte: dayStart, lt: dayEnd } },
      })
      upcoming.push({ date: dayStart.toISOString().slice(0, 10), count })
    }
    return NextResponse.json({ dueCards, totalCards, reviewedToday, upcoming, suspendedCount })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// POST /api/sm2 { studentId, exerciseId, quality }
//   Records a review for an exercise card. Creates the card if it doesn't exist.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { studentId, exerciseId, quality } = body
    if (!studentId || !exerciseId || typeof quality !== 'number') {
      return NextResponse.json({ error: 'studentId, exerciseId, quality required' }, { status: 400 })
    }
    let student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) student = await db.student.create({ data: { id: studentId } })

    let card = await db.sM2Card.findUnique({ where: { studentId_exerciseId: { studentId, exerciseId } } })
    const prevEase = card?.easeFactor ?? 2.5
    const prevReps = card?.repetitions ?? 0
    const prevInterval = card?.interval ?? 0

    // compute new state with the actual previous interval
    const q = Math.max(0, Math.min(5, quality))
    let newEase = prevEase
    let newReps: number
    let newInterval: number
    if (q < 3) {
      newReps = 0
      newInterval = 1
    } else {
      newReps = prevReps + 1
      if (newReps === 1) newInterval = 1
      else if (newReps === 2) newInterval = 3
      else newInterval = Math.max(1, Math.round(prevInterval * prevEase))
    }
    newEase = prevEase + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    if (newEase < 1.3) newEase = 1.3
    const due = new Date()
    due.setDate(due.getDate() + newInterval)

    if (card) {
      card = await db.sM2Card.update({
        where: { id: card.id },
        data: {
          easeFactor: Math.round(newEase * 100) / 100,
          interval: newInterval,
          repetitions: newReps,
          dueAt: due,
          lastReviewAt: new Date(),
          totalReviews: { increment: 1 },
        },
      })
    } else {
      card = await db.sM2Card.create({
        data: {
          studentId, exerciseId,
          easeFactor: Math.round(newEase * 100) / 100,
          interval: newInterval,
          repetitions: newReps,
          dueAt: due,
          lastReviewAt: new Date(),
          totalReviews: 1,
        },
      })
    }
    return NextResponse.json({ ok: true, card })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// PATCH /api/sm2 { studentId, exerciseId, suspended: boolean }
//   Suspends or unsuspends a card (temporarily removes from rotation).
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { studentId, exerciseId, suspended } = body
    if (!studentId || !exerciseId || typeof suspended !== 'boolean') {
      return NextResponse.json({ error: 'studentId, exerciseId, suspended required' }, { status: 400 })
    }
    const card = await db.sM2Card.findUnique({ where: { studentId_exerciseId: { studentId, exerciseId } } })
    if (!card) {
      return NextResponse.json({ error: 'card not found' }, { status: 404 })
    }
    const updated = await db.sM2Card.update({
      where: { id: card.id },
      data: { suspended },
    })
    return NextResponse.json({ ok: true, card: updated })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

function startOfDay(d: Date): Date {
  const r = new Date(d)
  r.setHours(0, 0, 0, 0)
  return r
}
