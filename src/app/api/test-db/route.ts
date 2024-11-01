import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json({ users })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 })
  }
}