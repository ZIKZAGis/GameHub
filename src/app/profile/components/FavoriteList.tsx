import { Favorite } from "@prisma/client"
import FavoriteCard from "./FavoriteCard"

type FavoriteListProps = {
  favorites: Favorite[]
}

export default function FavoriteList({ favorites }: FavoriteListProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Favorite games</h2>
        {favorites.length > 0 && (
          <button className="text-sm text-blue-400 hover:underline">Show all</button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorite games</p>
      ) : (
        <div
          className="
            flex gap-4 overflow-x-auto pb-2
            md:grid md:grid-cols-4 md:gap-4 md:overflow-visible
          "
        >
          {favorites.map((fav) => (
            <FavoriteCard key={fav.id} gameId={Number(fav.gameId)} />
          ))}
         </div>
      )}
    </section>
  )
}
