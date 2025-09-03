"use client";

import { useNavigation } from "@/lib/navigation";
import GameCard from "../GameCard/GameCard";
import { useGamesByPeriod } from "@/hooks/useGamesByPeriod";

interface GameSectionProps {
  title: string;
  period: "past" | "future";
  pageSize?: number;
}

export default function GameSection({ title, period, pageSize = 12 }: GameSectionProps) {
  const { games } = useGamesByPeriod(period, pageSize);
  const { navigateToGameDetails } = useNavigation();

  return (
    <div className="w-full p-4">
      <h2 className="font-extrabold text-2xl mb-5 text-[#60258A]">{title}</h2>
      <div className="grid grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard
            key={game.id}
            name={game.name}
            released={game.released}
            background_image={game.background_image}
            onClick={() => navigateToGameDetails(game.id)}
            {...(period === "past" && {
                rating: game.rating,
                genres: game.genres,
                platforms: game.platforms
            })}
          />
        ))}
      </div>
    </div>
  );
}
