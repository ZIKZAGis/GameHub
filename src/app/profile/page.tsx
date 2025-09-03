import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"
import ProfileContent from "./components/ProfileContent";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login?callbackUrl=/profile")
  }

  const user = await prisma.user.findUnique({
    where: {id: session.user.id},
    include: {
      favorites: true,
      ratings: true
    }
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <ProfileContent user={user}/>
  )
}