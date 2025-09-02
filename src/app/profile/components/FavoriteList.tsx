import { Favorite } from "@prisma/client"

type FavoriteListProps = {
  favorites: Favorite[]
}

export default function FavoriteList({ favorites }: FavoriteListProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Избранные игры</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-400">Нет избранных игр</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((fav) => (
            <li key={fav.id} className="p-2 rounded bg-gray-900">
              {fav.gameId}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
