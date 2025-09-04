// import { useGame } from "@/hooks/useGame"
// import Image from "next/image"
import { Rating } from "@prisma/client"

export default function RatingCard({ rating }: { rating: Rating }) {
//   const { game } = useGame(Number(rating.gameId))

//   if (!game) return null

  return (
    <div>{rating.gameId}</div>
    // <div className="min-w-[160px] md:min-w-0 bg-gray-900 rounded-lg p-2 flex-shrink-0 hover:shadow-md transition">
    //   <Image
    //     src={game.background_image ?? "/placeholder.png"}
    //     alt={game.name}
    //     width={150}
    //     height={200}
    //     className="rounded-md w-full h-auto"
    //   />
    //   <p className="mt-2 text-sm font-medium truncate">{game.name}</p>
    //   <div className="flex items-center gap-1 text-yellow-400 text-sm">
    //     {"★".repeat(rating.score)}
    //     {"☆".repeat(5 - rating.score)}
    //   </div>
    //   <button className="mt-1 text-xs text-red-400 hover:underline">
    //     Remove
    //   </button>
    // </div>
  )
}