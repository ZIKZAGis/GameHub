"use client";

import { useGameList } from "@/hooks/useGameList";
import { useNavigation } from "@/lib/navigation";
import Pagination from "@/components/Pagination/Pagination";
import Image from "next/image";
import React, { useState } from "react";

export default function GameListContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const { games, hasNextPage } = useGameList("", currentPage);
  const { navigateToGameDetails } = useNavigation();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <>
            {/* TODO move to a separate component ./GameListCard */}
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
          </>
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
