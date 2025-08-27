import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"
import Image from "next/image";

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
    <div className="max-w-2xl mx-auto mt-12 space-y-8">
      <h1 className="text-2xl font-semibold mb-4">Профиль</h1>
      <section>
        <div className="flex items-center gap-4">
          <Image
            src={user.image ?? "/default-avatar.png"}
            alt="avatar"
            width={80}
            height={80}
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <p className="font-medium">{user.name ?? "Без имени"}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Избранные игры</h2>
        {user.favorites.length === 0 ? (
          <p className="text-gray-400">Нет избранных игр</p>
        ) : (
          <ul className="space-y-2">
            {user.favorites.map((fav) => (
              <li key={fav.id} className="p-2 rounded bg-gray-900">
                {fav.gameId}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Мои оценки</h2>
        {user.ratings.length === 0 ? (
          <p className="text-gray-400">Нет оценок</p>
        ) : (
          <ul className="space-y-3">
            {user.ratings.map((rating) => (
              <li key={rating.id} className="p-3 rounded bg-gray-900">
                <div className="flex justify-between">
                  <span>Игра: {rating.gameId}</span>
                  <span className="font-bold">{rating.score}/5</span>
                </div>
                {rating.review && (
                  <p className="text-gray-300 mt-1">{rating.review}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}