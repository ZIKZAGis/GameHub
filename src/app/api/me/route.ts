import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  const payload = await verifyJwt<{ sub: string }>(token);
  if (!payload?.sub) return NextResponse.json({ user: null }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  if (!user) return NextResponse.json({ user: null }, { status: 404 });

  return NextResponse.json({ user });
}
