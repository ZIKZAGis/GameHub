"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDetailedPopularGames } from "@/hooks/useDetailedPopularGames";
import { useNavigation } from "@/lib/navigation";
import defaultGameImage from "@/app/assets/images/default-game-image.jpg";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";

export default function PopularGames() {
  const { games, detailedGames, isLoading, selectedGameId: initialSelectedId } = useDetailedPopularGames("", 8);
  const [selectedGameId, setSelectedGameId] = useState(initialSelectedId);
  const { navigateToGameDetails } = useNavigation();

  const selectedGame = detailedGames.find((game) => game.id === selectedGameId);

  const handleGameClick = (gameId: number) => {
    setSelectedGameId(gameId);
  };

  useEffect(() => {
    if (games.length > 0) {
      setSelectedGameId(games[0].id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games.length])

  return (
    <div className="w-full p-4">
      <h2 className="font-extrabold text-2xl mb-5 text-[#60258A]">
        Popular Games
      </h2>

      <div className="grid grid-cols-[0.4fr_1fr] gap-6">
        <div>
          {selectedGame && !isLoading && (
            <ul className="text-center">
              <li className="font-bold text-xl mb-2">{selectedGame.name}</li>
              <li className="text-gray-500 mb-3">
                {selectedGame.description_raw.length > 400
                  ? `${selectedGame.description_raw.substring(0, 400)}...`
                  : selectedGame.description_raw}
              </li>
              <li className="mb-2">
                {`Rating: ${selectedGame.rating > 0 ? selectedGame.rating : '-'} | Release: ${selectedGame.released} | Genre: ${selectedGame.genres[0]?.name}`}
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
                <FavoriteButton gameId={selectedGameId!.toString()}/>
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
                group
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
                  unoptimized={true}
                  className="object-cover blur-md opacity-70 scale-100 transition-transform duration-300 ease-in-out group-hover:scale-140"
                />
              </div>
              <Image
                src={game.background_image}
                alt={game.name}
                width={500}
                height={500}
                unoptimized={true}
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