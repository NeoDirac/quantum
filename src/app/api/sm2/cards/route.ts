import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/sm2/cards?studentId=...
//   Returns ALL SM-2 cards for the student (not just due), with full statistics.
//   Used by the card statistics view.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const studentId = searchParams.get('studentId')
    if (!studentId) return NextResponse.json({ error: 'studentId required' }, { status: 400 })
    let student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) student = await db.student.create({ data: { id: studentId } })

    const cards = await db.sM2Card.findMany({
      where: { studentId },
      orderBy: { dueAt: 'asc' },
    })
    return NextResponse.json({ cards })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
