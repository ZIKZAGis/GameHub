import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get("gameId");

  if (!gameId) {
    return NextResponse.json({ error: "gameId is required" }, { status: 400 });
  }

  const ratings = await prisma.rating.findMany({
    where: { gameId },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
    orderBy: { created: "desc" },
  });

  return NextResponse.json(ratings);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { gameId, score, review } = await req.json();

  if (!gameId || !score) {
    return NextResponse.json(
      { error: "gameId and score are required" },
      { status: 400 }
    );
  }

  let rating = await prisma.rating.findFirst({
    where: { userId: session.user.id, gameId },
  });

  if (rating) {
    rating = await prisma.rating.update({
      where: { id: rating.id },
      data: { score, review },
    });
  } else {
    rating = await prisma.rating.create({
      data: {
        userId: session.user.id,
        gameId,
        score,
        review,
      },
    });
  }

  return NextResponse.json(rating);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { gameId } = await req.json();

  if (!gameId) {
    return NextResponse.json({ error: "gameId is required" }, { status: 400 });
  }

  const rating = await prisma.rating.findFirst({
    where: { userId: session.user.id, gameId },
  });

  if (!rating) {
    return NextResponse.json({ error: "Rating not found" }, { status: 404 });
  }

  await prisma.rating.delete({ where: { id: rating.id } });

  return NextResponse.json({ success: true });
}
