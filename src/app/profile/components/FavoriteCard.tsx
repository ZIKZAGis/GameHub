// import { useGame } from "@/hooks/useGame"
// import Image from "next/image"
// import defaultGameImage from "@/app/assets/images/default-game-image.jpg";

export default function FavoriteCard({ gameId }: { gameId: number }) {
//   const { game } = useGame(gameId)

//   if (!game) return null

  return (
    <div>{gameId}</div>
    // <div className="min-w-[150px] md:min-w-0 bg-gray-900 rounded-lg p-2 flex-shrink-0 hover:shadow-md transition">
    //   <Image
    //     src={game?.background_image || defaultGameImage.src}
    //     alt={game?.name || "Game Image"}
    //     width={150}
    //     height={200}
    //     className="rounded-md w-full h-auto"
    //     onError={(e) => {
    //       e.currentTarget.src = defaultGameImage.src;
    //     }}
    //   />
    //   <p className="mt-2 text-sm font-medium truncate">{game.name}</p>
    //   <button className="mt-1 text-xs text-red-400 hover:underline">
    //     Remove
    //   </button>
    // </div>
  )
}