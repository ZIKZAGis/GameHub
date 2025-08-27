"use client";

import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  gameId: string;
}

export default function FavoriteButton({ gameId }: FavoriteButtonProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isFavorite = favorites.some((f: any) => f.gameId === gameId);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(gameId);
    } else {
      addFavorite(gameId);
    }
  };

  return (
    <button 
        className={`px-4 py-2 rounded-xl transition-all ease-linear hover:bg-[#ED2809] cursor-pointer text-white ${
            isFavorite ? "bg-[#60258A]" : "bg-[#ff5338]"
        }`}
        onClick={toggleFavorite}
    >
        {isFavorite ? "Remove track" : "Add to track"}
    </button>
  );
}
