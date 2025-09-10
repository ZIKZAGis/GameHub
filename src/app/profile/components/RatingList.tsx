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
        {ratings.length > 6 && (
          <button className="text-sm text-[#ff5338] hover:text-[#ED2809] hover:underline cursor-pointer">Show all</button>
        )}
      </div>

      {ratings.length === 0 ? (
        <p className="text-gray-400">No ratings yet</p>
      ) : (
        <div
          className="
            flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory
            md:grid md:grid-cols-6 md:gap-4 md:overflow-visible
          "
        >
          {ratings.map((rating) => (
            <div key={rating.id} className="snap-start w-64 flex-shrink-0 md:w-auto">
              <RatingCard rating={rating} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}