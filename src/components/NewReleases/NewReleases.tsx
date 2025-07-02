'use client'

import { useNewReleases } from '@/hooks/useNewReleases'
import { useNavigation } from '@/lib/navigation'
import CustomSuspense from '@/app/ui/CustomSuspense/CustomSuspense'
import GameCard from '../GameCard/GameCard'

export default function NewReleases() {
  const { games, loading, error } = useNewReleases('', 12)
  const {navigateToGameDetails} = useNavigation()

  return (
    <CustomSuspense 
        loading={loading } 
        error={error} 
        skeleton={<div>Загрузка...</div>}
    >
      <div className='w-full p-4'>
          <h2 className='font-extrabold text-2xl mb-5 text-[#60258A]'>
              New Releases
          </h2>
          <div className="grid grid-cols-4 gap-4">
              {games.map((game) => (
                <GameCard 
                  key={game.id}
                  name={game.name}
                  released={game.released}
                  platforms={game.platforms}
                  background_image={game.background_image}
                  rating={game.rating}
                  genres={game.genres}
                  onClick={() => navigateToGameDetails(game.id)}
                />
              ))}
          </div>
      </div>
    </CustomSuspense>
  )
}
