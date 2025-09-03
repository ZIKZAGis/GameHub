"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRatings } from "@/hooks/useRatings";
import { Star } from "lucide-react";

interface RatingStarsProps {
  gameId: string;
}

export default function RatingStars({ gameId }: RatingStarsProps) {
  const { data: session } = useSession();
  const { ratings, addOrUpdateRating, deleteRating } = useRatings(gameId);
  const [hovered, setHovered] = useState(0);

  const myRating = ratings.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (r: any) => r.userId === session?.user?.id
  );

  const handleClick = (score: number) => {
    addOrUpdateRating(score);
  };

  if (!session) {
    return <p className="text-sm text-gray-500">Войдите, чтобы поставить оценку</p>;
  }

  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-6 w-6 cursor-pointer transition ${
            star <= (hovered || myRating?.score || 0)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-400"
          }`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleClick(star)}
        />
      ))}
      {myRating && (
        <button
          className="ml-2 text-sm text-red-500 hover:underline"
          onClick={() => deleteRating()}
        >
          Убрать оценку
        </button>
      )}
    </div>
  );
}

