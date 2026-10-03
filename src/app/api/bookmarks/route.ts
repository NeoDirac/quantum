import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/bookmarks?studentId=...[&itemType=concept|exercise]
// POST /api/bookmarks { studentId, itemType, itemId, note? }
// DELETE /api/bookmarks { studentId, itemType, itemId }  (via ?studentId=&itemType=&itemId=)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const studentId = searchParams.get('studentId')
    const itemType = searchParams.get('itemType')
    if (!studentId) return NextResponse.json({ error: 'studentId required' }, { status: 400 })
    let student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) student = await db.student.create({ data: { id: studentId } })
    const where: any = { studentId }
    if (itemType) where.itemType = itemType
    const bookmarks = await db.bookmark.findMany({ where, orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ bookmarks })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { studentId, itemType, itemId, note } = body
    if (!studentId || !itemType || !itemId) {
      return NextResponse.json({ error: 'studentId, itemType, itemId required' }, { status: 400 })
    }
    let student = await db.student.findUnique({ where: { id: studentId } })
    if (!student) student = await db.student.create({ data: { id: studentId } })
    // upsert: toggle if exists
    const existing = await db.bookmark.findUnique({
      where: { studentId_itemType_itemId: { studentId, itemType, itemId } },
    })
    if (existing) {
      await db.bookmark.delete({ where: { id: existing.id } })
      return NextResponse.json({ ok: true, bookmarked: false })
    }
    const bm = await db.bookmark.create({
      data: { studentId, itemType, itemId, note: note ?? null },
    })
    return NextResponse.json({ ok: true, bookmarked: true, bookmark: bm })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const studentId = searchParams.get('studentId')
    const itemType = searchParams.get('itemType')
    const itemId = searchParams.get('itemId')
    if (!studentId || !itemType || !itemId) {
      return NextResponse.json({ error: 'studentId, itemType, itemId required' }, { status: 400 })
    }
    await db.bookmark.deleteMany({ where: { studentId, itemType, itemId } })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
