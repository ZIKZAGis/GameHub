"use client";

import { useGame } from "@/hooks/useGame";
import { Rating } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RatingStars from "@/components/RatingStars/RatingStars";
import defaultGameImage from "@/app/assets/images/default-game-image.jpg";

export default function RatingCard({ rating }: { rating: Rating }) {
  const { game } = useGame(Number(rating.gameId));
  const router = useRouter();

  if (!game) return null;

  const handleCardClick = () => {
    router.push(`/game/${rating.gameId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative aspect-video rounded-xl overflow-hidden flex-shrink-0 group shadow-lg cursor-pointer"
    >
      <Image
        src={game.background_image ?? defaultGameImage.src}
        alt={game.name}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition" />

      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <RatingStars
          gameId={rating.gameId}
          removeClassName="top-[-40px] right-[-25px]"
        />
      </div>

      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-sm font-semibold text-white px-2 truncate max-w-[90%]">
        {game.name}
      </p>
    </div>
  );
}