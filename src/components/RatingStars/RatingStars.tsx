"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRatings } from "@/hooks/useRatings";
import { Star, X } from "lucide-react";
import clsx from "clsx";

interface RatingStarsProps {
  gameId: string;
  showRemove?: boolean;
  onRemove?: () => void;
  removeClassName?: string;
}

export default function RatingStars({ 
  gameId,
  showRemove = true,
  onRemove,
  removeClassName
}: RatingStarsProps) {
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

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      deleteRating();
    }
  };

  if (!session) {
    return <p className="text-sm text-gray-500">Login to rate</p>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
              className={clsx(
                "cursor-pointer transition",
                "h-[clamp(16px,2vw,28px)] w-[clamp(16px,2vw,28px)]", // динамический размер
                star <= (hovered || myRating?.score || 0)
                  ? "fill-[#ff5338] text-[#ff5338]"
                  : "text-gray-400"
              )}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleClick(star)}
          />
        ))}
      </div>

      {showRemove && myRating && (
        <button
          className={clsx(
            "absolute p-1 rounded-full bg-black/50 hover:bg-[#ED2809] hover:text-white text-red-400 transition cursor-pointer",
            removeClassName
          )}
          onClick={handleRemove}
          title="Remove rating"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}



