"use client";

import { useGame } from "@/hooks/useGame";
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";
import defaultGameImage from "@/app/assets/images/default-game-image.jpg";
import { motion } from "framer-motion";
import { useState } from "react";

export default function FavoriteCard({ gameId }: { gameId: number }) {
  const { game } = useGame(gameId);
  const { removeFavorite } = useFavorites();
  const [loading, setLoading] = useState(false);

  if (!game) return null;

  async function handleRemove() {
    try {
      setLoading(true);
      await removeFavorite(String(gameId));
    } catch (error) {
      console.error("Failed to remove favorite", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      whileHover={{ backgroundColor: "rgb(31, 41, 55)" }}
      transition={{ duration: 0.2 }}
      className="group min-w-[200px] md:min-w-0 bg-gray-900 rounded-lg p-2 flex-shrink-0 hover:shadow-xl transition cursor-pointer"
    >
      <div className="relative w-full aspect-video overflow-hidden rounded-md">
        <Image
          src={game?.background_image || defaultGameImage.src}
          alt={game?.name || "Game Image"}
          fill
          sizes="(max-width: 768px) 200px, 300px"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = defaultGameImage.src;
          }}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          disabled={loading}
          className="
            absolute top-2 right-2 text-xs bg-red-500/80 hover:bg-red-600 
            text-white px-2 py-1 rounded-md shadow-md cursor-pointer 
            opacity-0 translate-y-2 
            group-hover:opacity-100 group-hover:translate-y-0 
            transition-all duration-300 ease-in-out
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? "..." : "Remove"}
        </button>
      </div>

      <p className="mt-2 text-sm font-medium truncate">{game.name}</p>
    </motion.div>
  );
}