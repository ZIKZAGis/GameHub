import { Rating } from "@prisma/client"

type RatingListProps = {
  ratings: Rating[]
}

export default function RatingList({ ratings }: RatingListProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Мои оценки</h2>
      {ratings.length === 0 ? (
        <p className="text-gray-400">Нет оценок</p>
      ) : (
        <ul className="space-y-3">
          {ratings.map((rating) => (
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
  )
}
