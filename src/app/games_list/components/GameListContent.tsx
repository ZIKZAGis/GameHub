"use client";

import { useGameList } from "@/hooks/useGameList";
import { useNavigation } from "@/lib/navigation";
import Pagination from "@/components/Pagination/Pagination";
import Image from "next/image";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GameListContent() {
  const { games, hasNextPage, currentPage } = useGameList();
  const { navigateToGameDetails } = useNavigation();

  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage))
    router.push(`/games_list?${params.toString()}`)
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-[#08040d] rounded-xl p-4 hover:bg-[#ff5338] cursor-pointer transition-all ease-linear"
            onClick={() => navigateToGameDetails(game.id)}
          >
            <Image
              src={game.background_image}
              alt={game.name}
              width={320}
              height={180}
              className="w-full h-auto object-cover"
              priority={false}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = "/default-game-image.jpg";
              }}
            />
            <h3 className="mt-2 text-lg font-semibold">{game.name}</h3>
            <p className="text-gray-600">Рейтинг: {game.rating}</p>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
