import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }
        
        const {gameId} = await req.json()
        if (!gameId) {
            return NextResponse.json({ error: "gameId is required" }, { status: 400 })
        }

        const user = await prisma.user.findUnique({where: {email: session.user.email}})
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        let favorite = await prisma.favorite.findFirst({
            where: {
                userId: session.user.id,
                gameId
            }
        })

        if (!favorite) {
            favorite = await prisma.favorite.create({
                data: {
                    userId: session.user.id,
                    gameId
                }
            })
        }

        return NextResponse.json(favorite)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { gameId } = await req.json()
    if (!gameId) {
      return NextResponse.json({ error: "gameId is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    await prisma.favorite.deleteMany({
      where: { userId: user.id, gameId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { favorites: true },
    })

    return NextResponse.json(user?.favorites ?? [])
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}