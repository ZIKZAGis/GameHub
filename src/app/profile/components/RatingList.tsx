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
            md:grid md:grid-cols-6 md:gap-3 md:overflow-visible
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




// import { Rating } from "@prisma/client"

// type RatingListProps = {
//   ratings: Rating[]
// }

// export default function RatingList({ ratings }: RatingListProps) {
//   return (
//     <section>
//       <h2 className="text-xl font-semibold mb-3">Мои оценки</h2>
//       {ratings.length === 0 ? (
//         <p className="text-gray-400">Нет оценок</p>
//       ) : (
//         <ul className="space-y-3">
//           {ratings.map((rating) => (
//             <li key={rating.id} className="p-3 rounded bg-gray-900">
//               <div className="flex justify-between">
//                 <span>Игра: {rating.gameId}</span>
//                 <span className="font-bold">{rating.score}/5</span>
//               </div>
//               {rating.review && (
//                 <p className="text-gray-300 mt-1">{rating.review}</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </section>
//   )
// }
