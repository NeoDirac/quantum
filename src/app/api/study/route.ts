import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/study?studentId=...&days=14
//   Returns last N days of activity + current streak + daily goal status.
// POST /api/study { studentId, activity: "exercise"|"concept"|"goal", count?: 1 }
//   Records an activity for today (upserts the StudyDay row).

function localDate(d = new Date()): string {
  // YYYY-MM-DD in local time
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const studentId = searchParams.get('studentId')
    const days = parseInt(searchParams.get('days') || '14', 10)
    if (!studentId) return NextResponse.json({ error: 'studentId required' }, { status: 400 })
    let student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) student = await db.student.create({ data: { id: studentId } })

    const rows = await db.studyDay.findMany({
      where: { studentId },
      orderBy: { date: 'desc' },
      take: days,
    })
    const byDate = new Map(rows.map(r => [r.date, r]))

    // Build last N days (oldest first), filling gaps with zeros
    const today = new Date()
    const series: { date: string; exercisesDone: number; conceptsRead: number; goalsMet: number; minutesStudied: number; isToday: boolean }[] = []
    for (let i = days - 1; i >= 0; i--) {
      const d = addDays(today, -i)
      const ds = localDate(d)
      const r = byDate.get(ds)
      series.push({
        date: ds,
        exercisesDone: r?.exercisesDone ?? 0,
        conceptsRead: r?.conceptsRead ?? 0,
        goalsMet: r?.goalsMet ?? 0,
        minutesStudied: r?.minutesStudied ?? 0,
        isToday: i === 0,
      })
    }

    // Compute current streak: consecutive days (ending today or yesterday) with any activity.
    // A day "counts" if exercisesDone + conceptsRead > 0.
    let streak = 0
    const todayStr = localDate(today)
    const yesterdayStr = localDate(addDays(today, -1))
    const todayRow = byDate.get(todayStr)
    const yesterdayRow = byDate.get(yesterdayStr)
    // streak starts from today if today has activity, else from yesterday
    let cursor = (todayRow && (todayRow.exercisesDone + todayRow.conceptsRead) > 0) ? today
              : (yesterdayRow && (yesterdayRow.exercisesDone + yesterdayRow.conceptsRead) > 0) ? addDays(today, -1)
              : null
    if (cursor) {
      while (true) {
        const ds = localDate(cursor)
        const r = byDate.get(ds)
        if (r && (r.exercisesDone + r.conceptsRead) > 0) {
          streak++
          cursor = addDays(cursor, -1)
        } else break
      }
    }

    // longest streak across all history
    let longest = 0
    let run = 0
    const allRows = await db.studyDay.findMany({ where: { studentId }, orderBy: { date: 'asc' } })
    let prev: string | null = null
    for (const r of allRows) {
      const active = (r.exercisesDone + r.conceptsRead) > 0
      if (active) {
        if (prev) {
          const prevDate = new Date(prev + 'T00:00:00')
          const curDate = new Date(r.date + 'T00:00:00')
          const diff = Math.round((curDate.getTime() - prevDate.getTime()) / 86400000)
          if (diff === 1) run++
          else run = 1
        } else run = 1
        if (run > longest) longest = run
      } else run = 0
      prev = r.date
    }

    // totals over the series window
    const totals = series.reduce((acc, s) => ({
      exercisesDone: acc.exercisesDone + s.exercisesDone,
      conceptsRead: acc.conceptsRead + s.conceptsRead,
      goalsMet: acc.goalsMet + s.goalsMet,
      minutesStudied: acc.minutesStudied + s.minutesStudied,
    }), { exercisesDone: 0, conceptsRead: 0, goalsMet: 0, minutesStudied: 0 })

    return NextResponse.json({
      series, streak, longestStreak: longest, totals,
      today: series[series.length - 1],
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { studentId, activity, count } = body
    if (!studentId || !activity) {
      return NextResponse.json({ error: 'studentId and activity required' }, { status: 400 })
    }
    let student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) student = await db.student.create({ data: { id: studentId } })
    const today = localDate()
    const n = typeof count === 'number' ? count : 1
    // upsert the day row, incrementing the right field
    const existing = await db.studyDay.findUnique({ where: { studentId_date: { studentId, date: today } } })
    const data: any = { studentId, date: today }
    if (existing) {
      const upd: any = {}
      if (activity === 'exercise') upd.exercisesDone = existing.exercisesDone + n
      if (activity === 'concept') upd.conceptsRead = existing.conceptsRead + n
      if (activity === 'goal') upd.goalsMet = existing.goalsMet + n
      if (activity === 'minutes') upd.minutesStudied = existing.minutesStudied + n
      const updated = await db.studyDay.update({ where: { id: existing.id }, data: upd })
      return NextResponse.json({ ok: true, studyDay: updated })
    }
    if (activity === 'exercise') data.exercisesDone = n
    if (activity === 'concept') data.conceptsRead = n
    if (activity === 'goal') data.goalsMet = n
    if (activity === 'minutes') data.minutesStudied = n
    const created = await db.studyDay.create({ data })
    return NextResponse.json({ ok: true, studyDay: created })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
