import { Rating } from "@prisma/client"
import RatingCard from "./RatingCard"


type RatingListProps = {
  ratings: Rating[]
}

export default function RatingList({ ratings }: RatingListProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">My ratings</h2>
        {ratings.length > 0 && (
          <button className="text-sm text-blue-400 hover:underline">Show all</button>
        )}
      </div>

      {ratings.length === 0 ? (
        <p className="text-gray-400">No ratings yet</p>
      ) : (
        <div
          className="
            flex gap-4 overflow-x-auto pb-2
            md:grid md:grid-cols-3 md:gap-6 md:overflow-visible
          "
        >
          {ratings.map((rating) => (
            <RatingCard key={rating.id} rating={rating} />
          ))}
        </div>
      )}
    </section>
  )
}
