"use client"

import { useNavigation } from '@/lib/navigation';
import React from 'react'
import GameCard from '../GameCard/GameCard';
import { useComingSoon } from '@/hooks/useComingSoon';

export default function ComingSoon() {
  const { games } = useComingSoon("", 12);
  const { navigateToGameDetails } = useNavigation();

  return (
    <div className="w-full p-4">
      <h2 className="font-extrabold text-2xl mb-5 text-[#60258A]">
        Coming Soon
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard
            key={game.id}
            name={game.name}
            released={game.released}
            background_image={game.background_image}
            onClick={() => navigateToGameDetails(game.id)}
          />
        ))}
      </div>
    </div>
  )
}
