"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePopularGames } from "@/hooks/usePopularGames";
import { useNavigation } from "@/lib/navigation";
import defaultGameImage from "@/app/assets/images/default-game-image.jpg";

import { IGame } from "@/types/game";
import { getGameById } from "@/lib/api";

export default function PopularGames() {
  const { games } = usePopularGames("", 8);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const { navigateToGameDetails } = useNavigation();
  const [detailedGames, setDetailedGames] = useState<IGame[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const selectedGame = detailedGames.find((game) => game.id === selectedGameId)

  const previousIdsRef = useRef<number[]>([]);
  
  useEffect(() => {
    if (games.length > 0) {
      const ids = games.map((game) => game.id);
      const prevIds = previousIdsRef.current
      const isSame = ids.length === prevIds.length && ids.every((id, i) => id === prevIds[i])

      if (!isSame) {
        previousIdsRef.current = ids
        setSelectedGameId((prev) => prev ?? ids[0])
        setLoadingDetails(true)

        Promise.all(ids.map(getGameById))
          .then(setDetailedGames)
          .finally(() => setLoadingDetails(false))
      }
    }
  }, [games]);


  const handleGameClick = (gameId: number) => {
    setSelectedGameId(gameId);
  };

  return (
    <div className="w-full p-4">
      <h2 className="font-extrabold text-2xl mb-5 text-[#60258A]">
        Popular Games
      </h2>

      <div className="grid grid-cols-[0.4fr_1fr] gap-6">
        <div>
          {selectedGame && !loadingDetails && (
            <ul className="text-center">
              <li className="font-bold text-xl mb-2">{selectedGame.name}</li>
              <li className="text-gray-500 mb-3">
                {selectedGame.description_raw.length > 400
                  ? `${selectedGame.description_raw.substring(0, 400)}...`
                  : selectedGame.description_raw}
              </li>
              <li className="mb-2">
                {`Rating: ${selectedGame.rating} | Release: ${selectedGame.released} | Genre: ${selectedGame.genres[0]?.name}`}
              </li>
              <li className="mb-4">
                Platforms:{" "}
                {selectedGame.platforms
                  ?.map((pl) => pl.platform.name)
                  .join(" | ")}
              </li>
              <li className="grid grid-cols-2 gap-2">
                <button
                  className="bg-[#ff5338] text-white px-4 py-2 rounded-xl transition-all ease-linear hover:bg-[#ED2809] cursor-pointer"
                  onClick={() => navigateToGameDetails(selectedGameId ?? 0)}
                >
                  More details
                </button>
                <button className="bg-[#ff5338] text-white px-4 py-2 rounded-xl transition-all ease-linear hover:bg-[#ED2809] cursor-pointer">
                  Add to track
                </button>
              </li>
            </ul>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3">
          {games.map((game) => (
            <div
              key={game.id}
              className={`
                relative
                rounded-xl
                overflow-hidden
                h-[250px]
                cursor-pointer
                transition-all
                ${
                  selectedGameId === game.id
                    ? "ring-2 ring-[#ff5338] scale-103"
                    : "hover:scale-102"
                }
                bg-[#10011F]
              `}
              onClick={() => handleGameClick(game.id)}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={game.background_image}
                  alt=""
                  fill
                  className="object-cover blur-md opacity-70 scale-120"
                />
              </div>
              <Image
                src={game.background_image}
                alt={game.name}
                width={500}
                height={500}
                className="relative z-10 w-full h-full object-contain object-center"
                priority={true}
                onError={(e) => {
                  e.currentTarget.src = defaultGameImage.src;
                  e.currentTarget.onerror = null;
                }}
              />
              <div className="absolute z-20 bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white font-medium truncate">{game.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
