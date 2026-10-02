// Client-side student identity + progress API helpers.
'use client'

import { useUI } from '@/lib/store'
import { v4 as uuidv4 } from 'uuid'

export function getOrCreateStudentId(): string {
  const existing = useUI.getState().studentId
  if (existing) return existing
  const id = uuidv4()
  useUI.getState().setStudentId(id)
  return id
}

export async function apiPost(path: string, body: any) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API ${path} failed: ${res.status} ${text}`)
  }
  return res.json()
}

export async function apiGet(path: string) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`)
  return res.json()
}
